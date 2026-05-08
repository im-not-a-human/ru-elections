#!/usr/bin/env python3
"""tools/fetch-votes.py — pull per-deputy vote data from api.duma.gov.ru

Usage:
    python3 tools/fetch-votes.py           # download missing + (re)build JSON for frontend
    python3 tools/fetch-votes.py --verify  # smoke-check known totals (Sov-Runet 307/68/0 etc.)

Reads DUMA_APP_KEY, DUMA_USER_KEY, and optional DUMA_COOKIE / DUMA_PROXY
from .env or environment. None of those are committed.
"""
from __future__ import annotations
import os, sys, re, json, argparse
from pathlib import Path
import urllib.request, urllib.parse, urllib.error, ssl, time

API_BASE = "http://api.duma.gov.ru/api"   # HTTP, not HTTPS
# Cookie берём из DUMA_COOKIE (.env) — не коммитим, чтобы не светить чужую сессию.
BASE_HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "ru,en;q=0.9",
    "Cache-Control": "max-age=0",
    "DNT": "1",
    "Proxy-Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 YaBrowser/26.3.0.0 Safari/537.36",
}


def _headers(env: dict) -> dict:
    h = dict(BASE_HEADERS)
    cookie = (env or {}).get("DUMA_COOKIE", "").strip()
    if cookie:
        h["Cookie"] = cookie
    return h

ROOT = Path(__file__).resolve().parent.parent
RAW_VOTES_DIR = ROOT / "research/compromat/05-evidence/duma-api/votes"
OUT_DIR       = ROOT / "assets/data/votes"
PARSE_VOTES   = ROOT / "research/compromat/05-evidence/duma-api/parse_votes.py"

# Faction code → short label (copy of mapping in parse_votes.py)
FACTION_MAP = {
    "72100024": "ER",
    "72100004": "KPRF",
    "72100005": "LDPR",
    "72100027": "SR",
    "72100029": "SR",
    "72100028": "NL",
    "72100011": "NoFaction",
}

# LAWS.id → list of ballots {voteId, billId, tabLabel?}
# voteId=None означает «нужен voteSearch»
VOTE_MAPPING = {
    # уже скачано в research/compromat/05-evidence/duma-api/votes/
    "608767-7":   [{"voteId": "107479", "billId": "608767-7"}],   # Суверенный Рунет
    "606595-7":   [
        {"voteId": "107127", "billId": "606593-7", "tabLabel": "Фейки"},
        {"voteId": "107129", "billId": "606594-7", "tabLabel": "Неуважение к власти"},
    ],
    "1057914-7":  [{"voteId": "113228", "billId": "1057914-7"}],  # Иноагенты-физлица
    "1176731-7":  [{"voteId": "115415", "billId": "1176731-7"}],  # Приземление IT
    "217471-8":   [{"voteId": "120074", "billId": "217471-8"}],   # ЛГБТ-пропаганда
    "270838-8":   [{"voteId": "123266", "billId": "270838-8"}],   # Цифровой рубль
    "387593-8":   [{"voteId": "123895", "billId": "387593-8"}],   # Алгоритмы
    "533912-8":   [{"voteId": "126036", "billId": "533912-8"}],   # Конфискация за фейки
    "647048-8":   [{"voteId": "127912", "billId": "647048-8"}],   # Реестр блогеров (деанонимизация)
    "679980-8":   [{"voteId": "131111", "billId": "679980-8"}],   # MAX
    "312507-8":   [{"voteId": "123855", "billId": "312507-8"}],   # Призыв 30
    "755710-8":   [{"voteId": "131816", "billId": "755710-8"}],   # VPN
    "fkz-2022-territories": [
        {"voteId": "119237", "billId": "203816-8", "tabLabel": "ДНР"},
        {"voteId": "119239", "billId": "203817-8", "tabLabel": "ЛНР"},
        {"voteId": "119241", "billId": "203818-8", "tabLabel": "Запорожье"},
        {"voteId": "119243", "billId": "203819-8", "tabLabel": "Херсон"},
    ],

    # Ранее отмечены как «требуется voteSearch»; voteId теперь проставлены вручную.
    # Примечание: некоторые законопроекты в API числятся под другим номером
    # (так называемая «тихая поправка» ко 2 чтению другого законопроекта).
    # billId в ballots — это СОЗД-номер (используется для sozdUrl), не обязательно совпадает
    # с номером в XML (который отражает API-номер проголосованного законопроекта).
    "80714-8":    [{"voteId": "117350", "billId": "80714-8"}],    # Фейки об армии (УК 207.3) — API bill 464757-7
    "122131-8":   [{"voteId": "118599", "billId": "122131-8"}],   # Закон об иноагентах (единый) — API bill 113045-8
    "156017-8":   [{"voteId": None,     "billId": "156017-8"}],   # Запрет митингов — НЕ НАЙДЕН в API
    "200645-8":   [{"voteId": "122197",  "billId": "200645-8"}],   # Пожизненное за госизмену — API bill 232768-8
    "553750-8":   [{"voteId": "126234", "billId": "553750-8"}],   # Запрет рекламы у иноагентов
    "487583-8":   [{"voteId": "126628", "billId": "487583-8"}],   # Иноагенты на выборах — API bill 501159-8
    "765128-8":   [{"voteId": "129672", "billId": "765128-8"}],   # Спецсчета иноагентов — API bill 769486-8
    "361804-7":   [{"voteId": "121878", "billId": "361804-7"}],   # Электронные повестки
    "49269-8":    [{"voteId": "122190", "billId": "49269-8"}],    # Гражданство и лишение
    "376846-8":   [{"voteId": "123408", "billId": "376846-8"}],   # Запрет смены пола — API bill 369814-8
    "615003-8":   [{"voteId": "127597", "billId": "615003-8"}],   # Высылка и реестр
    "724769-8":   [{"voteId": "129033", "billId": "724769-8"}],   # Запрет чайлдфри
    "40921-8":    [{"voteId": "117448", "billId": "40921-8"}],    # ДЭГ и выборы
    "211535-8":   [{"voteId": "120607", "billId": "211535-8"}],   # Биометрия
    "778084-8":   [{"voteId": "129541", "billId": "778084-8"}],   # Дети мигрантов в школах
    "652920-8":   [{"voteId": "130477", "billId": "652920-8"}],   # Реклама у заблокированных
    "928725-8":   [{"voteId": "133392", "billId": "928725-8"}],   # MAX-домовые чаты
}


def load_env() -> dict:
    env = {}
    p = ROOT / ".env"
    if p.exists():
        for line in p.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    for k in ("DUMA_APP_KEY", "DUMA_USER_KEY", "DUMA_PROXY", "DUMA_COOKIE"):
        env.setdefault(k, os.environ.get(k, ""))
    return env


def http_get(url: str, env: dict, retries: int = 3) -> bytes:
    """GET с прокси (если задан DUMA_PROXY, иначе наследуется HTTP_PROXY/HTTPS_PROXY).
    Использует HTTP (не HTTPS) — api.duma.gov.ru отвечает по plain http.
    """
    proxy = env.get("DUMA_PROXY") or ""
    handlers = []
    if proxy:
        handlers.append(urllib.request.ProxyHandler({"http": proxy, "https": proxy}))
    # build_opener auto-adds default ProxyHandler() that reads env if не задан явный
    opener = urllib.request.build_opener(*handlers)
    req = urllib.request.Request(url, headers=_headers(env))
    last_err = None
    for i in range(retries):
        try:
            with opener.open(req, timeout=30) as r:
                return r.read()
        except (urllib.error.URLError, TimeoutError) as e:
            last_err = e
            time.sleep(2 ** i)
    raise RuntimeError(f"GET {url} failed after {retries} tries: {last_err}")


def _check_keys(env: dict) -> None:
    if not env.get("DUMA_APP_KEY") or not env.get("DUMA_USER_KEY"):
        raise SystemExit("DUMA_APP_KEY и/или DUMA_USER_KEY не заданы (см. .env.example)")


def vote_search(bill_id: str, env: dict) -> str | None:
    """Найти vote_id для последнего (третьего) чтения по lawNumber.
    Возвращает строку voteId или None.
    """
    _check_keys(env)
    app_key  = env["DUMA_APP_KEY"]
    user_key = env["DUMA_USER_KEY"]
    qs = urllib.parse.urlencode({
        "number": bill_id,
        "app_token": app_key,
    })
    url = f"{API_BASE}/{user_key}/voteSearch.xml?{qs}"
    body = http_get(url, env).decode("utf-8", errors="replace")
    candidates = []
    for m in re.finditer(r"<vote>(.*?)</vote>", body, re.DOTALL):
        chunk = m.group(1)
        vid = re.search(r"<id>(\d+)</id>", chunk)
        subj = re.search(r"<subject>([^<]*)</subject>", chunk)
        if not vid:
            continue
        s = (subj.group(1) if subj else "").lower()
        if any(x in s for x in ("трет", "3 чтение", "3-е чтение", "в целом")):
            candidates.append((vid.group(1), s))
    if not candidates:
        return None
    return candidates[-1][0]


def download_vote_xml(vote_id: str, env: dict) -> Path:
    """Скачать vote/{voteId}.xml в RAW_VOTES_DIR. Имя файла = vote_<id>.xml.
    Если уже есть локальный файл (в т.ч. с shortname из существующего набора) — возвращаем его."""
    _check_keys(env)
    existing = guess_xml_path(vote_id)
    if existing:
        return existing
    out = RAW_VOTES_DIR / f"vote_{vote_id}.xml"
    if out.exists() and out.stat().st_size > 1000:
        return out
    app_key  = env["DUMA_APP_KEY"]
    user_key = env["DUMA_USER_KEY"]
    qs = urllib.parse.urlencode({"app_token": app_key})
    url = f"{API_BASE}/{user_key}/vote/{vote_id}.xml?{qs}"
    body = http_get(url, env)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(body)
    print(f"[fetched] {out.name} ({len(body)} bytes)")
    return out


def parse_vote_xml(path: Path) -> dict:
    """Парсит один vote XML → нормализованную структуру."""
    txt = path.read_text(encoding="utf-8", errors="replace")
    out = {}
    m = re.search(r"<date>([^<]+)</date>", txt);            out["date"]   = m.group(1) if m else None
    m = re.search(r"<lawNumber>([^<]+)</lawNumber>", txt);  out["billId"] = m.group(1) if m else None
    m = re.search(r"<subject>([^<]*)</subject>", txt, re.DOTALL)
    subj = (m.group(1) if m else "").replace("&quot;", '"').replace("&amp;", "&").strip()
    out["subject"] = subj

    def first_int(tag: str) -> int:
        m = re.match(rf".*?<{tag}>(\d+)</{tag}>", txt[:2000], re.DOTALL)
        return int(m.group(1)) if m else 0

    out["totals"] = {
        "for":     first_int("for"),
        "against": first_int("against"),
        "abstain": first_int("abstain"),
        "absent":  first_int("absent"),
    }

    # фракции
    factions = []
    for fm in re.finditer(r"<resultsByFaction>(.*?)</resultsByFaction>", txt, re.DOTALL):
        chunk = fm.group(1)
        code_m = re.search(r"<code>(\d+)</code>", chunk)
        if not code_m:
            continue
        code = code_m.group(1)
        label = FACTION_MAP.get(code, code)
        if label == "NoFaction":
            continue  # «вне фракций» в фронт не выводим
        def grab(tag: str) -> int:
            m = re.search(rf"<{tag}>(\d+)</{tag}>", chunk)
            return int(m.group(1)) if m else 0
        f_, a_, ab_, abs_ = grab("for"), grab("against"), grab("abstain"), grab("absent")
        majority = max(
            {"for": f_, "against": a_, "abstain": ab_, "absent": abs_}.items(),
            key=lambda kv: kv[1],
        )[0]
        factions.append({
            "code": label, "majority": majority,
            "for": f_, "against": a_, "abstain": ab_, "absent": abs_,
        })

    # стабильный порядок: ER → KPRF → LDPR → SR → NL
    order = {"ER": 0, "KPRF": 1, "LDPR": 2, "SR": 3, "NL": 4}
    factions.sort(key=lambda x: order.get(x["code"], 99))
    out["factions"] = factions

    # депутаты
    deps = []
    for dm in re.finditer(r"<resultsByDeputy>(.*?)</resultsByDeputy>", txt, re.DOTALL):
        chunk  = dm.group(1)
        fcode  = re.search(r"<factionCode>(\d+)</factionCode>", chunk)
        result = re.search(r"<result>(\w+)</result>", chunk)
        family = re.search(r"<family>([^<]+)</family>", chunk)
        name   = re.search(r"<name>([^<]+)</name>", chunk)
        patron = re.search(r"<patronymic>([^<]+)</patronymic>", chunk)
        flbl = FACTION_MAP.get(fcode.group(1) if fcode else "", "")
        if flbl in ("", "NoFaction"):
            continue
        fam = family.group(1) if family else ""
        ini1 = (name.group(1)[:1] + ".") if name else ""
        ini2 = (patron.group(1)[:1] + ".") if patron else ""
        deps.append({
            "name": f"{fam} {ini1}{ini2}".strip(),
            "factionCode": flbl,
            "result": result.group(1) if result else "absent",  # for|against|abstain|absent
        })
    out["deputies"] = deps
    return out


def build_frontend_json() -> int:
    """Сгенерировать assets/data/votes/{lawId}.json для всех laws с известными voteId."""
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    written = 0
    skipped = 0
    for law_id, ballots in VOTE_MAPPING.items():
        rendered_ballots = []
        for b in ballots:
            if not b["voteId"]:
                skipped += 1
                continue
            xml_path = guess_xml_path(b["voteId"])
            if not xml_path or not xml_path.exists():
                print(f"[skip] {law_id}: vote {b['voteId']} XML missing")
                skipped += 1
                continue
            data = parse_vote_xml(xml_path)
            rendered_ballots.append({
                "voteId":   b["voteId"],
                "tabLabel": b.get("tabLabel"),
                "billId":   data["billId"] or b["billId"],
                "date":     data["date"],
                "subject":  data["subject"],
                "voteUrl":  f"https://vote.duma.gov.ru/vote/{b['voteId']}",
                "sozdUrl":  f"https://sozd.duma.gov.ru/bill/{b['billId']}",
                "totals":   data["totals"],
                "factions": data["factions"],
                "deputies": data["deputies"],
            })
        if not rendered_ballots:
            continue
        out_path = OUT_DIR / f"{law_id}.json"
        out_path.write_text(json.dumps(
            {"lawId": law_id, "ballots": rendered_ballots},
            ensure_ascii=False, separators=(",", ":")
        ), encoding="utf-8")
        written += 1
    print(f"[build] {written} written, {skipped} ballots skipped")
    return 0


def build_frontend_mapping() -> int:
    """Сгенерировать assets/js/data/vote-mapping.js со списком LAWS.id, для которых есть JSON."""
    out_path = ROOT / "assets/js/data/vote-mapping.js"
    available = {}
    for law_id, ballots in VOTE_MAPPING.items():
        json_file = OUT_DIR / f"{law_id}.json"
        if not json_file.exists():
            continue
        # количество табов = число ballots с воталId
        tabs = [b.get("tabLabel") for b in ballots if b["voteId"]]
        available[law_id] = {
            "ballots": len([b for b in ballots if b["voteId"]]),
            "tabs": [t for t in tabs if t],
        }
    body = "// Auto-generated by tools/fetch-votes.py — не редактировать вручную.\n"
    body += "// Карта: LAWS.id → { ballots, tabs } для законов, у которых есть данные поимённого голосования.\n"
    body += "window.VOTE_MAPPING = " + json.dumps(available, ensure_ascii=False, indent=2) + ";\n"
    out_path.write_text(body, encoding="utf-8")
    print(f"[mapping.js] {len(available)} entries")
    return 0


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--verify", action="store_true")
    p.add_argument("--dry-run", action="store_true",
                   help="не скачивать, только показать, что бы скачали")
    p.add_argument("--build-only", action="store_true",
                   help="не качать ничего, просто пересобрать JSON-ы из локальных XML")
    args = p.parse_args()

    if args.build_only:
        r = build_frontend_json()
        build_frontend_mapping()
        return r

    print(f"[mapping] {len(VOTE_MAPPING)} laws total, "
          f"{sum(1 for v in VOTE_MAPPING.values() for b in v if b['voteId'])} ballots known, "
          f"{sum(1 for v in VOTE_MAPPING.values() for b in v if not b['voteId'])} need lookup")

    if args.verify:
        return verify_known()

    env = load_env()
    pending_lookup = []
    pending_download = []

    for law_id, ballots in VOTE_MAPPING.items():
        for b in ballots:
            if b["voteId"] is None:
                pending_lookup.append((law_id, b))
            elif not guess_xml_path(b["voteId"]):
                pending_download.append((law_id, b))

    print(f"[plan] {len(pending_lookup)} need voteSearch, "
          f"{len(pending_download)} need download")

    if args.dry_run:
        for lid, b in pending_lookup:
            print(f"  [lookup] {lid} (bill {b['billId']})")
        for lid, b in pending_download:
            print(f"  [dl]     {lid} → vote {b['voteId']}")
        return 0

    # 1. Найти отсутствующие voteId
    for lid, b in pending_lookup:
        try:
            vid = vote_search(b["billId"], env)
        except Exception as e:
            print(f"  [ERR lookup] {lid}/{b['billId']}: {e}")
            continue
        if vid:
            b["voteId"] = vid
            print(f"  [found] {lid}: bill {b['billId']} → vote {vid}")
        else:
            print(f"  [NOT FOUND] {lid}/{b['billId']} — voteSearch вернул пусто")

    # 2. Скачать недостающие XML
    for ballots in VOTE_MAPPING.values():
        for b in ballots:
            if b["voteId"] and not guess_xml_path(b["voteId"]):
                try:
                    download_vote_xml(b["voteId"], env)
                except Exception as e:
                    print(f"  [ERR dl] vote {b['voteId']}: {e}")

    save_resolved_mapping()

    # 3. Сгенерировать frontend JSON
    build_frontend_json()
    build_frontend_mapping()
    return 0


def save_resolved_mapping() -> None:
    """Перезаписать VOTE_MAPPING в текущем файле, проставив найденные voteId.
    Простая текстовая замена строк '"voteId": None' на найденные значения."""
    src = Path(__file__).read_text()
    for law_id, ballots in VOTE_MAPPING.items():
        for b in ballots:
            if b["voteId"] is None:
                continue
            pat = re.compile(
                r'(\{"voteId":\s*)None(\s*,\s*"billId":\s*"' + re.escape(b["billId"]) + r'")'
            )
            new_src, n = pat.subn(rf'\1"{b["voteId"]}"\2', src, count=1)
            if n:
                src = new_src
    Path(__file__).write_text(src)


def verify_known() -> int:
    """Smoke-check: убедиться, что mapping ссылается на существующий XML и тоталы сходятся."""
    expected = {
        "107479": (307, 68, 0),    # Суверенный Рунет
        "131111": (407, 0, 0),     # MAX
        "131816": (306, 67, 22),   # VPN
    }
    fails = 0
    for vid, (f, a, ab) in expected.items():
        path = guess_xml_path(vid)
        if not path or not path.exists():
            print(f"[FAIL] vote {vid}: XML not found")
            fails += 1
            continue
        txt = path.read_text()
        m_for     = re.match(r".*?<for>(\d+)</for>",         txt[:2000], re.DOTALL)
        m_against = re.match(r".*?<against>(\d+)</against>", txt[:2000], re.DOTALL)
        m_abstain = re.match(r".*?<abstain>(\d+)</abstain>", txt[:2000], re.DOTALL)
        got = (int(m_for.group(1)) if m_for else -1,
               int(m_against.group(1)) if m_against else -1,
               int(m_abstain.group(1)) if m_abstain else -1)
        if got != (f, a, ab):
            print(f"[FAIL] vote {vid}: got {got}, expected ({f}, {a}, {ab})")
            fails += 1
        else:
            print(f"[OK]   vote {vid}: {got}")
    return 0 if fails == 0 else 1


def guess_xml_path(vote_id: str) -> Path | None:
    """Find the local XML by vote_id.
    Checks two naming conventions:
      1. shortname.xml via VOTE_IDS from parse_votes.py (legacy files)
      2. vote_{vote_id}.xml (new files downloaded by this script)
    """
    # 1. Check legacy shortname files via parse_votes.py VOTE_IDS
    import importlib.util
    spec = importlib.util.spec_from_file_location("parse_votes", PARSE_VOTES)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    for short, vid in mod.VOTE_IDS.items():
        if vid == vote_id:
            candidate = RAW_VOTES_DIR / f"{short}.xml"
            if candidate.exists():
                return candidate
    # 2. Check vote_{vote_id}.xml fallback
    fallback = RAW_VOTES_DIR / f"vote_{vote_id}.xml"
    if fallback.exists() and fallback.stat().st_size > 1000:
        return fallback
    return None


if __name__ == "__main__":
    sys.exit(main())
