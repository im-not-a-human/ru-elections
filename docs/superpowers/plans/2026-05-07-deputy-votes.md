# Поимённые голосования депутатов — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** При клике на закон в матрице на главной добавить кнопку, открывающую полноэкранную панель с пофамильным голосованием каждого депутата по 5 фракциям, с цветовой кодировкой голоса и сортировкой «диссиденты сверху».

**Architecture:** Статический сайт без билда; данные хранятся как JSON-файлы (`assets/data/votes/{lawId}.json`), один файл на закон, ленивая загрузка по клику. Скачивание через скрипт `tools/fetch-votes.py` с api.duma.gov.ru (token из `.env`, через прокси). Фронт — vanilla JS компонент `deputy-panel.js`, новый layer поверх существующего модала. Источники в UI — публичные `vote.duma.gov.ru` / `sozd.duma.gov.ru` без токена.

**Tech Stack:** Python 3 (`requests`), vanilla JS, CSS. CDN Chart.js не нужен. Тестов нет (соответствует конвенции проекта) — верификация ручная через локальный HTTP-сервер + `--verify` режим в Python-скрипте.

**Спека:** `docs/superpowers/specs/2026-05-07-deputy-votes-design.md`

---

## Файловая структура

| Файл | Создать/Изменить | Ответственность |
|---|---|---|
| `.gitignore` | M | добавить `.env` |
| `.env.example` | C | пример переменных (`DUMA_APP_TOKEN`, `DUMA_PROXY`) |
| `tools/fetch-votes.py` | C | mapping LAWS→votes, скачивание XML, генерация JSON для фронта, верификация |
| `assets/data/votes/{lawId}.json` | C (×30) | компактные данные, по одному на закон |
| `assets/js/data/vote-mapping.js` | C | `VOTE_MAPPING = { lawId: [{voteId, billId, tabLabel}], ... }` (для фронта — определяет, есть ли данные у закона) |
| `assets/js/components/deputy-panel.js` | C | `window.openDeputyPanel(lawId)`: fetch + render + focus trap + ESC + tabs + sorting |
| `assets/css/components.css` | M | секция `/* Deputy panel */`: панель, колонки, ряды, табы, цвета голосов, mobile chips |
| `assets/js/components/law-modal.js` | M | кнопка «Посмотреть поимённо» если для закона есть mapping |
| `index.html` | M | подключить `vote-mapping.js` и `deputy-panel.js` |
| `assets/css/tokens.css` | M | добавить `--vote-for/against/abstain/absent` |

---

## Task 1: Bootstrap — gitignore, .env example, tools/

**Files:**
- Modify: `.gitignore`
- Create: `.env.example`
- Create: `tools/.gitkeep`

- [ ] **Step 1: Добавить `.env` в gitignore**

В конце `/home/dev/elections/.gitignore` добавить:
```
# Secrets
.env
```

- [ ] **Step 2: Создать `.env.example`**

```
# Токен для api.duma.gov.ru (получить на https://api.duma.gov.ru/registration)
DUMA_APP_TOKEN=

# Опционально: SOCKS5/HTTPS прокси для обхода геоблока
# Формат как для requests: socks5h://host:port  или  http://user:pass@host:port
DUMA_PROXY=
```

- [ ] **Step 3: Создать пустой `tools/`**

```bash
mkdir -p /home/dev/elections/tools
touch /home/dev/elections/tools/.gitkeep
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore .env.example tools/.gitkeep
git commit -m "chore: scaffold tools/ + .env.example for deputy-votes feature"
```

---

## Task 2: tools/fetch-votes.py — mapping LAWS→votes (статический справочник)

**Files:**
- Create: `tools/fetch-votes.py`

Цель этого таска — записать в скрипт **VOTE_MAPPING** для всех 30 законов из `LAWS[]`. Для известных голосований берём `voteId` из `research/compromat/05-evidence/duma-api/parse_votes.py:VOTE_IDS`. Для остальных оставляем placeholder `None` — следующая таска научит скрипт находить voteId через voteSearch.

- [ ] **Step 1: Создать скелет с mapping**

```python
#!/usr/bin/env python3
"""tools/fetch-votes.py — pull per-deputy vote data from api.duma.gov.ru

Usage:
    python3 tools/fetch-votes.py           # download missing + (re)build JSON for frontend
    python3 tools/fetch-votes.py --verify  # smoke-check known totals (Sov-Runet 307/68/0 etc.)

Reads DUMA_APP_TOKEN and (optional) DUMA_PROXY from .env or environment.
"""
from __future__ import annotations
import os, sys, re, json, argparse
from pathlib import Path

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

    # требуется voteSearch (на следующих тасках скрипт научится их искать)
    "80714-8":    [{"voteId": None, "billId": "80714-8"}],    # Фейки об армии (УК 207.3)
    "122131-8":   [{"voteId": None, "billId": "122131-8"}],   # Закон об иноагентах (единый)
    "156017-8":   [{"voteId": None, "billId": "156017-8"}],   # Запрет митингов
    "200645-8":   [{"voteId": None, "billId": "200645-8"}],   # Пожизненное за госизмену
    "553750-8":   [{"voteId": None, "billId": "553750-8"}],   # Запрет рекламы у иноагентов
    "487583-8":   [{"voteId": None, "billId": "487583-8"}],   # Иноагенты на выборах
    "765128-8":   [{"voteId": None, "billId": "765128-8"}],   # Спецсчета иноагентов
    "361804-7":   [{"voteId": None, "billId": "361804-7"}],   # Электронные повестки
    "49269-8":    [{"voteId": None, "billId": "49269-8"}],    # Гражданство и лишение
    "376846-8":   [{"voteId": None, "billId": "376846-8"}],   # Запрет смены пола
    "615003-8":   [{"voteId": None, "billId": "615003-8"}],   # Высылка и реестр
    "724769-8":   [{"voteId": None, "billId": "724769-8"}],   # Запрет чайлдфри
    "40921-8":    [{"voteId": None, "billId": "40921-8"}],    # ДЭГ и выборы
    "211535-8":   [{"voteId": None, "billId": "211535-8"}],   # Биометрия
    "778084-8":   [{"voteId": None, "billId": "778084-8"}],   # Дети мигрантов в школах
    "652920-8":   [{"voteId": None, "billId": "652920-8"}],   # Реклама у заблокированных
    "928725-8":   [{"voteId": None, "billId": "928725-8"}],   # MAX-домовые чаты
}


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--verify", action="store_true")
    args = p.parse_args()

    print(f"[mapping] {len(VOTE_MAPPING)} laws total, "
          f"{sum(1 for v in VOTE_MAPPING.values() for b in v if b['voteId'])} ballots known, "
          f"{sum(1 for v in VOTE_MAPPING.values() for b in v if not b['voteId'])} need lookup")

    if args.verify:
        return verify_known()

    return 0


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
    """Find the local XML by vote_id. Уже скачанные файлы хранят имя по shortname,
    а не vote_id, поэтому нужен обратный mapping."""
    # импортируем VOTE_IDS из существующего parse_votes.py
    import importlib.util
    spec = importlib.util.spec_from_file_location("parse_votes", PARSE_VOTES)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    for short, vid in mod.VOTE_IDS.items():
        if vid == vote_id:
            return RAW_VOTES_DIR / f"{short}.xml"
    return None


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 2: Запустить smoke-check**

```bash
cd /home/dev/elections && python3 tools/fetch-votes.py --verify
```

Ожидаемый вывод (3 строки `[OK]`):
```
[mapping] 30 laws total, 16 ballots known, 18 need lookup
[OK]   vote 107479: (307, 68, 0)
[OK]   vote 131111: (407, 0, 0)
[OK]   vote 131816: (306, 67, 22)
```

(числа «16 known / 18 need lookup» проверь — допускается небольшое расхождение если в LAWS добавятся записи).

- [ ] **Step 3: Commit**

```bash
git add tools/fetch-votes.py
git commit -m "feat(tools): scaffold fetch-votes.py with VOTE_MAPPING and verify mode"
```

---

## Task 3: tools/fetch-votes.py — voteSearch и скачивание

Скрипт должен уметь: (а) загрузить токен/прокси из `.env`, (б) для `voteId=None` найти его через `voteSearch.xml?lawNumber=<billId>`, (в) скачать `vote/{voteId}.xml` если файл отсутствует. Headers подставляем как в `research/compromat/00-methodology/access-notes.md` — User-Agent обычного браузера.

**Files:**
- Modify: `tools/fetch-votes.py`

- [ ] **Step 1: Добавить env-loader, http helper, voteSearch**

В верх файла (после импортов) добавить:

```python
import urllib.request, urllib.parse, urllib.error, ssl, time

API_BASE = "https://api.duma.gov.ru/api"
HEADERS  = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/xml,text/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
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
    for k in ("DUMA_APP_TOKEN", "DUMA_PROXY"):
        env.setdefault(k, os.environ.get(k, ""))
    return env


def http_get(url: str, env: dict, retries: int = 3) -> bytes:
    """GET с прокси (если задан) и retries."""
    proxy = env.get("DUMA_PROXY") or ""
    handlers = []
    if proxy:
        handlers.append(urllib.request.ProxyHandler({"http": proxy, "https": proxy}))
    handlers.append(urllib.request.HTTPSHandler(context=ssl.create_default_context()))
    opener = urllib.request.build_opener(*handlers)
    req = urllib.request.Request(url, headers=HEADERS)
    last_err = None
    for i in range(retries):
        try:
            with opener.open(req, timeout=30) as r:
                return r.read()
        except (urllib.error.URLError, TimeoutError) as e:
            last_err = e
            time.sleep(2 ** i)
    raise RuntimeError(f"GET {url} failed after {retries} tries: {last_err}")


def vote_search(bill_id: str, env: dict) -> str | None:
    """Найти vote_id для последнего (третьего) чтения по bill_number=lawNumber.
    Возвращает строку voteId или None.
    """
    token = env["DUMA_APP_TOKEN"]
    if not token:
        raise SystemExit("DUMA_APP_TOKEN не задан (см. .env.example)")
    qs = urllib.parse.urlencode({
        "lawNumber": bill_id,
        "app_token": token,
    })
    url = f"{API_BASE}/{token}/voteSearch.xml?{qs}"
    body = http_get(url, env).decode("utf-8", errors="replace")
    # voteSearch возвращает список <vote> с <id>, <subject>, <result>; нам нужно «третье чтение» с result=accepted
    candidates = []
    for m in re.finditer(r"<vote>(.*?)</vote>", body, re.DOTALL):
        chunk = m.group(1)
        vid = re.search(r"<id>(\d+)</id>", chunk)
        subj = re.search(r"<subject>([^<]*)</subject>", chunk)
        if not vid:
            continue
        s = (subj.group(1) if subj else "").lower()
        # фильтр: «третье чтение», «3 чтение», «в целом»
        if any(x in s for x in ("трет", "3 чтение", "3-е чтение", "в целом")):
            candidates.append((vid.group(1), s))
    if not candidates:
        return None
    # последний по списку = последнее по дате чтение «в целом»
    return candidates[-1][0]


def download_vote_xml(vote_id: str, env: dict) -> Path:
    """Скачать vote/{voteId}.xml в RAW_VOTES_DIR. Имя файла = vote_<id>.xml.
    Если уже есть локальный файл (в т.ч. с shortname из существующего набора) — возвращаем его."""
    # сначала ищем существующий
    existing = guess_xml_path(vote_id)
    if existing:
        return existing
    out = RAW_VOTES_DIR / f"vote_{vote_id}.xml"
    if out.exists() and out.stat().st_size > 1000:
        return out
    token = env["DUMA_APP_TOKEN"]
    url = f"{API_BASE}/{token}/vote/{vote_id}.xml?app_token={token}"
    body = http_get(url, env)
    out.write_bytes(body)
    print(f"[fetched] {out.name} ({len(body)} bytes)")
    return out
```

- [ ] **Step 2: Расширить `main()` — discovery + download**

Заменить `main()` на:

```python
def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--verify", action="store_true")
    p.add_argument("--dry-run", action="store_true",
                   help="не скачивать, только показать, что бы скачали")
    args = p.parse_args()

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

    # сохранить обновлённый mapping (резолвленные voteId) обратно в код
    save_resolved_mapping()
    return 0


def save_resolved_mapping() -> None:
    """Перезаписать VOTE_MAPPING в текущем файле, проставив найденные voteId.
    Простая текстовая замена строк '"voteId": None' на найденные значения."""
    src = Path(__file__).read_text()
    for law_id, ballots in VOTE_MAPPING.items():
        for b in ballots:
            if b["voteId"] is None:
                continue
            # ищем строку вида:  "voteId": None, "billId": "{billId}"
            pat = re.compile(
                r'(\{"voteId":\s*)None(\s*,\s*"billId":\s*"' + re.escape(b["billId"]) + r'")'
            )
            new_src, n = pat.subn(rf'\1"{b["voteId"]}"\2', src, count=1)
            if n:
                src = new_src
    Path(__file__).write_text(src)
```

- [ ] **Step 3: Dry-run проверка (без сети)**

```bash
cd /home/dev/elections && python3 tools/fetch-votes.py --dry-run
```

Ожидаемо:
```
[plan] 18 need voteSearch, 0 need download
  [lookup] 80714-8 (bill 80714-8)
  ...
```

Точные числа могут отличаться — проверка на то, что скрипт парсит свой mapping без ошибок.

- [ ] **Step 4: Commit**

```bash
git add tools/fetch-votes.py
git commit -m "feat(tools): voteSearch + download_vote_xml + dry-run plan"
```

---

## Task 4: tools/fetch-votes.py — конвертер XML → frontend JSON

Этот таск — ядро. Берём raw XML, превращаем в компактный JSON для фронта по формату из спеки.

**Files:**
- Modify: `tools/fetch-votes.py`

- [ ] **Step 1: Добавить parser и builder**

В скрипт добавить:

```python
def parse_vote_xml(path: Path) -> dict:
    """Парсит один vote XML → нормализованную структуру."""
    txt = path.read_text(encoding="utf-8", errors="replace")
    out = {}
    m = re.search(r"<date>([^<]+)</date>", txt);     out["date"]    = m.group(1) if m else None
    m = re.search(r"<lawNumber>([^<]+)</lawNumber>", txt); out["billId"] = m.group(1) if m else None
    m = re.search(r"<subject>([^<]*)</subject>", txt, re.DOTALL)
    subj = (m.group(1) if m else "").replace("&quot;", '"').replace("&amp;", "&").strip()
    out["subject"] = subj

    def first_int(tag: str) -> int:
        m = re.match(rf".*?<{tag}>(\d+)</{tag}>", txt[:2000], re.DOTALL)
        return int(m.group(1)) if m else 0

    out["totals"] = {
        "for": first_int("for"),
        "against": first_int("against"),
        "abstain": first_int("abstain"),
        "absent": first_int("absent"),
    }

    # фракции
    factions = []
    for fm in re.finditer(r"<resultsByFaction>(.*?)</resultsByFaction>", txt, re.DOTALL):
        chunk = fm.group(1)
        code  = (re.search(r"<code>(\d+)</code>", chunk) or [None, ""])[1]
        if not code: continue
        label = FACTION_MAP.get(code, code)
        if label in ("NoFaction",): continue  # «вне фракций» в фронт не выводим
        f_  = int((re.search(r"<for>(\d+)</for>", chunk) or [0,0])[1] or 0)
        a_  = int((re.search(r"<against>(\d+)</against>", chunk) or [0,0])[1] or 0)
        ab_ = int((re.search(r"<abstain>(\d+)</abstain>", chunk) or [0,0])[1] or 0)
        abs_= int((re.search(r"<absent>(\d+)</absent>", chunk) or [0,0])[1] or 0)
        majority = max({"for":f_,"against":a_,"abstain":ab_,"absent":abs_}.items(),
                       key=lambda kv: kv[1])[0]
        factions.append({"code": label, "majority": majority,
                         "for": f_, "against": a_, "abstain": ab_, "absent": abs_})

    # стабильный порядок ER → KPRF → LDPR → SR → NL
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
```

- [ ] **Step 2: Подключить builder в main()**

В `main()` после блока «2. Скачать недостающие XML» и `save_resolved_mapping()` добавить:

```python
    # 3. Сгенерировать frontend JSON
    build_frontend_json()
    return 0
```

И в начало `main()` добавить флаг:

```python
    p.add_argument("--build-only", action="store_true",
                   help="не качать ничего, просто пересобрать JSON-ы из локальных XML")
```

И после `args = p.parse_args()`:

```python
    if args.build_only:
        return build_frontend_json()
```

- [ ] **Step 3: Запустить build-only (работает на 13 уже скачанных XML)**

```bash
cd /home/dev/elections && python3 tools/fetch-votes.py --build-only
```

Ожидаемо: `[build] 13 written, 18 ballots skipped` (или близко к этому).

Проверить:
```bash
ls /home/dev/elections/assets/data/votes/ | head
cat /home/dev/elections/assets/data/votes/608767-7.json | python3 -m json.tool | head -25
```

Должны увидеть валидный JSON с `lawId`, `ballots[0].totals.for == 307`, ~450 элементов в `deputies`.

- [ ] **Step 4: Commit JSON-ы и скрипт**

```bash
git add tools/fetch-votes.py assets/data/votes/
git commit -m "feat(data): build frontend JSON for 13 laws with cached XML"
```

---

## Task 5: Скачать недостающие голосования

**Prerequisite (ручной шаг пользователя):** в `.env` положить:
```
DUMA_APP_TOKEN=<токен>
DUMA_PROXY=socks5h://...   # либо http://...   (если запросы пойдут с не-RU IP)
```

- [ ] **Step 1: Запустить полный pipeline**

```bash
cd /home/dev/elections && python3 tools/fetch-votes.py
```

Ожидаемо:
- `[plan] 18 need voteSearch, 0 need download`
- 18 строк `[found] ...: bill X → vote Y` (или `[NOT FOUND]` для тех, что переоформлены)
- 18 строк `[fetched] vote_<id>.xml`
- `save_resolved_mapping()` — без вывода
- `[build] 31 written, ...`

- [ ] **Step 2: Проверить, что найдено и скачано**

```bash
ls /home/dev/elections/assets/data/votes/ | wc -l
ls /home/dev/elections/research/compromat/05-evidence/duma-api/votes/vote_*.xml 2>/dev/null | wc -l
```

Ожидаемо: `assets/data/votes/` содержит все или почти все 30 файлов (некоторые могут отсутствовать если voteSearch не нашёл — это нормально, такие законы просто не получат кнопки «поимённо»).

- [ ] **Step 3: Проверить, что mapping в скрипте обновился**

```bash
grep -c '"voteId": None' /home/dev/elections/tools/fetch-votes.py
```

Должно быть 0 для билов, которые нашлись (или равно числу `[NOT FOUND]`).

- [ ] **Step 4: Commit**

```bash
git add tools/fetch-votes.py assets/data/votes/ research/compromat/05-evidence/duma-api/votes/
git commit -m "data: download remaining vote XMLs and rebuild frontend JSON"
```

Если какие-то законы не нашлись — они просто не получат кнопки на следующих тасках. Это OK.

---

## Task 6: Frontend — `assets/js/data/vote-mapping.js`

Чтобы фронт знал, для каких законов есть данные (и сколько вкладок), нужен лёгкий список доступных законов. Сгенерируем файл из скрипта.

**Files:**
- Modify: `tools/fetch-votes.py`
- Create: `assets/js/data/vote-mapping.js` (генерируется)

- [ ] **Step 1: Добавить функцию генерации в fetch-votes.py**

После `build_frontend_json()` добавить:

```python
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
```

В `main()` и в `--build-only` ветке после `build_frontend_json()` вызвать:
```python
    build_frontend_mapping()
```

- [ ] **Step 2: Перегенерировать**

```bash
cd /home/dev/elections && python3 tools/fetch-votes.py --build-only
cat /home/dev/elections/assets/js/data/vote-mapping.js | head -20
```

Должны увидеть `window.VOTE_MAPPING = { "608767-7": { "ballots": 1, "tabs": [] }, ... }`.

- [ ] **Step 3: Commit**

```bash
git add tools/fetch-votes.py assets/js/data/vote-mapping.js
git commit -m "feat(data): generate vote-mapping.js for frontend feature gating"
```

---

## Task 7: CSS — токены цветов и каркас панели

**Files:**
- Modify: `assets/css/tokens.css`
- Modify: `assets/css/components.css`

- [ ] **Step 1: Добавить токены голосов**

В `assets/css/tokens.css` найти блок `:root { ... }` и добавить (рядом с другими токенами цветов):

```css
  /* Vote result colors (для panel поимённого голосования) */
  --vote-for:     #2A8B3E;
  --vote-for-bg:  #E6F1E8;
  --vote-against: #C0392B;
  --vote-against-bg: #FAEAE7;
  --vote-abstain: #D89B2D;
  --vote-abstain-bg: #FBF1DE;
  --vote-absent:  #9B958B;
  --vote-absent-bg: #F0EEEA;
```

(Если в `tokens.css` другая структура — вставь рядом с другими `--*-bg` токенами.)

- [ ] **Step 2: Добавить стили панели в `components.css`**

В конец `assets/css/components.css` дописать:

```css
/* ========== Deputy panel ========== */
.deputy-panel {
  position: fixed; inset: 0;
  background: var(--bg, #FCFAF6);
  z-index: 1100; /* выше modal (1000) */
  display: flex; flex-direction: column;
  overflow: hidden;
  opacity: 0; pointer-events: none;
  transition: opacity .18s ease;
}
.deputy-panel.is-open { opacity: 1; pointer-events: auto; }

.deputy-panel-head {
  padding: 18px 24px 14px;
  border-bottom: 1px solid var(--rule, #E7E1D5);
  flex-shrink: 0;
  display: grid; grid-template-columns: 1fr auto; gap: 6px 24px;
  align-items: start;
}
.deputy-panel-back {
  grid-column: 1; grid-row: 1;
  background: none; border: 0; padding: 4px 0;
  font: inherit; color: var(--ink-muted, #6F6A60);
  cursor: pointer; text-decoration: underline;
}
.deputy-panel-close {
  grid-column: 2; grid-row: 1 / span 3;
  background: none; border: 0; padding: 4px 8px;
  font-size: 24px; line-height: 1; color: var(--ink, #1F1B16);
  cursor: pointer; align-self: start;
}
.deputy-panel-title  { grid-column: 1; font-size: 22px; font-weight: 600; margin: 2px 0; }
.deputy-panel-meta   { grid-column: 1; font-size: 13px; color: var(--ink-muted, #6F6A60); display: flex; gap: 16px; flex-wrap: wrap; }
.deputy-panel-meta a { color: inherit; text-decoration: underline; }
.deputy-panel-meta .mono { font-family: var(--mono, ui-monospace, monospace); }

.deputy-panel-tabs   { grid-column: 1; display: flex; gap: 2px; margin-top: 10px; flex-wrap: wrap; }
.deputy-panel-tab    {
  background: var(--bg-soft, #F4EFE5); border: 0;
  padding: 6px 14px; font: inherit; cursor: pointer;
  border-radius: 4px; color: var(--ink-muted, #6F6A60);
}
.deputy-panel-tab.is-active { background: var(--ink, #1F1B16); color: var(--bg, #FCFAF6); }

.deputy-panel-legend {
  display: flex; gap: 18px; padding: 10px 24px;
  font-size: 12px; color: var(--ink-muted, #6F6A60);
  border-bottom: 1px solid var(--rule, #E7E1D5);
  flex-wrap: wrap;
}
.deputy-legend-dot {
  display: inline-block; width: 10px; height: 10px; border-radius: 50%;
  margin-right: 6px; vertical-align: middle;
}
.deputy-legend-dot.for     { background: var(--vote-for); }
.deputy-legend-dot.against { background: var(--vote-against); }
.deputy-legend-dot.abstain { background: var(--vote-abstain); }
.deputy-legend-dot.absent  { background: var(--vote-absent); }

.deputy-panel-cols {
  flex: 1 1 auto; overflow: hidden;
  display: grid; grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1px; background: var(--rule, #E7E1D5);
}
.deputy-col {
  background: var(--bg, #FCFAF6);
  display: flex; flex-direction: column;
  min-width: 0;
}
.deputy-col-head {
  padding: 12px 14px 10px;
  border-top: 3px solid var(--col-color, var(--ink, #1F1B16));
  flex-shrink: 0;
}
.deputy-col-name  { font-size: 14px; font-weight: 600; color: var(--col-color, var(--ink, #1F1B16)); }
.deputy-col-stats { font-size: 11px; color: var(--ink-muted, #6F6A60); margin-top: 4px;
                    font-family: var(--mono, ui-monospace, monospace); }

.deputy-col-body { flex: 1 1 auto; overflow-y: auto; padding: 6px 0 12px; }

.deputy-group-label {
  font-size: 10px; letter-spacing: .08em; text-transform: uppercase;
  color: var(--ink-muted, #6F6A60);
  padding: 10px 14px 4px;
}

.deputy-row {
  padding: 4px 12px 4px 16px;
  border-left: 3px solid transparent;
  font-size: 13px; line-height: 1.3;
  color: var(--ink, #1F1B16);
  position: relative;
}
.deputy-row.for     { border-left-color: var(--vote-for); }
.deputy-row.against { border-left-color: var(--vote-against); background: var(--vote-against-bg); }
.deputy-row.abstain { border-left-color: var(--vote-abstain); background: var(--vote-abstain-bg); }
.deputy-row.absent  { border-left-color: var(--vote-absent); color: var(--ink-muted, #6F6A60); }

.deputy-row .chip {
  display: inline-block; margin-left: 6px; font-size: 10px; padding: 1px 6px;
  border-radius: 3px; vertical-align: middle;
  background: var(--ink, #1F1B16); color: var(--bg, #FCFAF6);
}

@media (prefers-reduced-motion: reduce) {
  .deputy-panel { transition: none; }
}

@media (max-width: 880px) {
  .deputy-panel-cols { grid-template-columns: 1fr; }
  .deputy-col { display: none; }
  .deputy-col.is-active { display: flex; }
  .deputy-faction-chips {
    display: flex; gap: 4px; padding: 8px 12px;
    overflow-x: auto; flex-shrink: 0;
    border-bottom: 1px solid var(--rule, #E7E1D5);
  }
  .deputy-faction-chip {
    background: var(--bg-soft, #F4EFE5); border: 0;
    padding: 6px 12px; font: inherit; cursor: pointer; white-space: nowrap;
    border-radius: 999px; font-size: 12px;
    border-left: 3px solid var(--col-color, var(--ink, #1F1B16));
  }
  .deputy-faction-chip.is-active { background: var(--ink, #1F1B16); color: var(--bg, #FCFAF6); }
}
@media (min-width: 881px) { .deputy-faction-chips { display: none; } }
```

- [ ] **Step 3: Локально посмотреть в браузере, что CSS не сломал ничего**

```bash
cd /home/dev/elections && python3 -m http.server 8765 &
sleep 1
# открыть http://127.0.0.1:8765/ — главная должна выглядеть как раньше
```

- [ ] **Step 4: Commit**

```bash
git add assets/css/tokens.css assets/css/components.css
git commit -m "style(css): tokens + skeleton styles for deputy panel"
```

---

## Task 8: `deputy-panel.js` — открытие, закрытие, focus trap

**Files:**
- Create: `assets/js/components/deputy-panel.js`

- [ ] **Step 1: Создать файл со скелетом**

```javascript
// Поимённое голосование — полноэкранная панель из law-modal.
// Точка входа: window.openDeputyPanel(lawId).

(function () {
  let panelEl = null;
  let activeBallotIdx = 0;
  let activeFactionIdx = 0;       // для mobile chips
  let lastFocusedBeforeOpen = null;
  let dataCache = {};             // lawId → fetched JSON

  const FACTION_LABELS = { ER: 'Единая Россия', KPRF: 'КПРФ', LDPR: 'ЛДПР', SR: 'СРЗП', NL: 'Новые люди' };
  const FACTION_ORDER  = ['ER', 'KPRF', 'LDPR', 'SR', 'NL'];
  const RESULT_LABELS  = { for: 'за', against: 'против', abstain: 'воздержался', absent: 'не голосовал' };
  const GROUP_ORDER    = ['against', 'abstain', 'absent', 'for'];   // диссидентский порядок

  function ensurePanel() {
    if (panelEl) return panelEl;
    panelEl = document.createElement('div');
    panelEl.className = 'deputy-panel';
    panelEl.setAttribute('role', 'dialog');
    panelEl.setAttribute('aria-modal', 'true');
    panelEl.setAttribute('aria-labelledby', 'deputy-panel-title');
    panelEl.tabIndex = -1;
    document.body.appendChild(panelEl);
    panelEl.addEventListener('keydown', onKey);
    return panelEl;
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'Tab') {
      const focusables = panelEl.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  }

  async function loadData(lawId) {
    if (dataCache[lawId]) return dataCache[lawId];
    const r = await fetch(`assets/data/votes/${lawId}.json`);
    if (!r.ok) throw new Error(`Не удалось загрузить ${lawId}.json: ${r.status}`);
    const j = await r.json();
    dataCache[lawId] = j;
    return j;
  }

  function close() {
    if (!panelEl) return;
    panelEl.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedBeforeOpen && lastFocusedBeforeOpen.focus) lastFocusedBeforeOpen.focus();
  }

  window.openDeputyPanel = async function (lawId) {
    lastFocusedBeforeOpen = document.activeElement;
    ensurePanel();
    panelEl.innerHTML = '<div style="padding:40px;text-align:center;color:var(--ink-muted)">Загружаю...</div>';
    panelEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    let data;
    try {
      data = await loadData(lawId);
    } catch (e) {
      panelEl.innerHTML = `<div style="padding:40px"><p>${e.message}</p>
        <button class="deputy-panel-close" onclick="window.__closeDeputyPanel()">Закрыть</button></div>`;
      return;
    }
    activeBallotIdx = 0;
    activeFactionIdx = 0;
    render(data);
    panelEl.focus();
  };

  window.__closeDeputyPanel = close;

  // render() — заглушка, наполнится в Task 9
  function render(data) {
    panelEl.innerHTML = '<div style="padding:40px">Render TBD (data has '
      + data.ballots.length + ' ballot(s), '
      + data.ballots[0].deputies.length + ' deputies in first ballot)</div>';
  }
})();
```

- [ ] **Step 2: Подключить скрипт в `index.html`**

В `/home/dev/elections/index.html` найти блок `<script>` тегов с компонентами. Добавить **перед** `<script src="assets/js/pages/home.js">`:

```html
<script src="assets/js/data/vote-mapping.js"></script>
<script src="assets/js/components/deputy-panel.js"></script>
```

- [ ] **Step 3: Тест в консоли браузера**

```bash
cd /home/dev/elections && python3 -m http.server 8765
```

В консоли: `window.openDeputyPanel('608767-7')` → должна открыться панель «Render TBD (data has 1 ballot(s), 416 deputies in first ballot)». Esc закрывает.

- [ ] **Step 4: Commit**

```bash
git add assets/js/components/deputy-panel.js index.html
git commit -m "feat(panel): scaffold deputy-panel.js with open/close/focus-trap"
```

---

## Task 9: `deputy-panel.js` — рендер колонок и депутатов

**Files:**
- Modify: `assets/js/components/deputy-panel.js`

- [ ] **Step 1: Заменить `render()` на полноценный**

Удалить заглушку `function render(data)` и вставить:

```javascript
  function render(data) {
    const ballot = data.ballots[activeBallotIdx];
    const law = (window.LAWS || []).find(l => l.id === data.lawId);
    const lawTitle = law ? law.title : data.lawId;
    const tot = ballot.totals;

    panelEl.innerHTML = `
      <div class="deputy-panel-head">
        <button class="deputy-panel-back" type="button" data-act="back">← Закон</button>
        <button class="deputy-panel-close" type="button" data-act="close" aria-label="Закрыть">✕</button>
        <h2 class="deputy-panel-title" id="deputy-panel-title">${escape(lawTitle)}</h2>
        <div class="deputy-panel-meta">
          <span class="mono">${escape(ballot.date || '')}</span>
          <span class="mono">за ${tot.for} · против ${tot.against} · возд. ${tot.abstain} · отс. ${tot.absent}</span>
          <span>Источники:
            <a href="${ballot.voteUrl}" target="_blank" rel="noopener">vote.duma.gov.ru</a> ·
            <a href="${ballot.sozdUrl}" target="_blank" rel="noopener">sozd.duma.gov.ru</a> ·
            данные API ГД РФ
          </span>
        </div>
        ${renderTabs(data)}
      </div>
      <div class="deputy-panel-legend">
        <span><i class="deputy-legend-dot for"></i>за</span>
        <span><i class="deputy-legend-dot against"></i>против</span>
        <span><i class="deputy-legend-dot abstain"></i>воздержался</span>
        <span><i class="deputy-legend-dot absent"></i>не голосовал / отсутствовал</span>
      </div>
      ${renderFactionChips(ballot)}
      <div class="deputy-panel-cols">
        ${FACTION_ORDER.map((fc, i) => renderColumn(ballot, fc, i)).join('')}
      </div>
    `;

    // wire
    panelEl.querySelector('[data-act="close"]').addEventListener('click', close);
    panelEl.querySelector('[data-act="back"]').addEventListener('click', close);
    panelEl.querySelectorAll('.deputy-panel-tab').forEach(b => {
      b.addEventListener('click', () => {
        activeBallotIdx = parseInt(b.dataset.idx, 10);
        activeFactionIdx = 0;
        render(data);
      });
    });
    panelEl.querySelectorAll('.deputy-faction-chip').forEach(b => {
      b.addEventListener('click', () => {
        activeFactionIdx = parseInt(b.dataset.idx, 10);
        applyMobileActive();
      });
    });
    applyMobileActive();
  }

  function renderTabs(data) {
    if (data.ballots.length < 2) return '';
    return `<div class="deputy-panel-tabs" role="tablist">
      ${data.ballots.map((b, i) => `
        <button class="deputy-panel-tab ${i === activeBallotIdx ? 'is-active' : ''}"
                role="tab" aria-selected="${i === activeBallotIdx}" data-idx="${i}">
          ${escape(b.tabLabel || `Голосование ${i+1}`)}
        </button>`).join('')}
    </div>`;
  }

  function renderFactionChips(ballot) {
    return `<div class="deputy-faction-chips">
      ${FACTION_ORDER.map((fc, i) => {
        const f = ballot.factions.find(x => x.code === fc);
        if (!f) return '';
        const color = (window.PARTIES && window.PARTIES[fc]) ? window.PARTIES[fc].color : '#888';
        return `<button class="deputy-faction-chip ${i === activeFactionIdx ? 'is-active' : ''}"
                       data-idx="${i}" style="--col-color:${color}">${FACTION_LABELS[fc]}</button>`;
      }).join('')}
    </div>`;
  }

  function renderColumn(ballot, factionCode, idx) {
    const f = ballot.factions.find(x => x.code === factionCode);
    const color = (window.PARTIES && window.PARTIES[factionCode]) ? window.PARTIES[factionCode].color : '#888';
    if (!f) {
      return `<div class="deputy-col" data-faction="${factionCode}" data-idx="${idx}" style="--col-color:${color}">
        <div class="deputy-col-head">
          <div class="deputy-col-name">${FACTION_LABELS[factionCode]}</div>
          <div class="deputy-col-stats">не было в Думе на момент голосования</div>
        </div>
        <div class="deputy-col-body"></div>
      </div>`;
    }
    const deps = ballot.deputies.filter(d => d.factionCode === factionCode);
    // группируем
    const groups = { for: [], against: [], abstain: [], absent: [] };
    for (const d of deps) (groups[d.result] || groups.absent).push(d);
    for (const k of Object.keys(groups)) {
      groups[k].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }
    // порядок: сначала «отличающиеся», потом мажоритарный голос
    const order = GROUP_ORDER.slice().sort((a, b) => {
      if (a === f.majority) return 1;
      if (b === f.majority) return -1;
      return GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b);
    });
    return `<div class="deputy-col" data-faction="${factionCode}" data-idx="${idx}" style="--col-color:${color}">
      <div class="deputy-col-head">
        <div class="deputy-col-name">${FACTION_LABELS[factionCode]}</div>
        <div class="deputy-col-stats">${f.for}/${f.against}/${f.abstain}/${f.absent} (за/прот/возд/отс)</div>
      </div>
      <div class="deputy-col-body">
        ${order.map(g => renderGroup(g, groups[g], f.majority)).join('')}
      </div>
    </div>`;
  }

  function renderGroup(result, deps, majority) {
    if (!deps.length) return '';
    const isMajority = result === majority;
    const label = (isMajority ? '' : '↗ ') + RESULT_LABELS[result] +
                  (isMajority ? ` · мажоритарно (${deps.length})` : ` (${deps.length})`);
    const chip = isMajority ? '' : '<span class="chip">против фракции</span>';
    return `<div class="deputy-group-label">${label}</div>
      ${deps.map(d => `<div class="deputy-row ${d.result}"
                              title="${escape(d.name)} · ${RESULT_LABELS[d.result]}">${escape(d.name)}${chip}</div>`).join('')}`;
  }

  function applyMobileActive() {
    if (!panelEl) return;
    panelEl.querySelectorAll('.deputy-col').forEach((col, i) => {
      col.classList.toggle('is-active', i === activeFactionIdx);
    });
    panelEl.querySelectorAll('.deputy-faction-chip').forEach((c, i) => {
      c.classList.toggle('is-active', i === activeFactionIdx);
    });
  }

  function escape(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
```

- [ ] **Step 2: Тест в браузере**

```bash
cd /home/dev/elections && python3 -m http.server 8765
```

В консоли поочередно:
- `window.openDeputyPanel('608767-7')` — Суверенный Рунет: ЕР колонка ~302 «за», КПРФ колонка ~33 «против»
- `window.openDeputyPanel('606595-7')` — Клишас: должно быть 2 таба
- `window.openDeputyPanel('fkz-2022-territories')` — должно быть 4 таба
- `window.openDeputyPanel('755710-8')` — VPN: видимы диссиденты в СРЗП и НЛ

Проверить:
- цветные полоски слева у депутатов
- группа «против фракции» сверху, после неё мажоритарная
- ссылки `vote.duma.gov.ru` и `sozd.duma.gov.ru` рабочие
- ESC закрывает

- [ ] **Step 3: Уменьшить ширину окна до 480px → должны появиться chip-tabs фракций, одна колонка видна.**

- [ ] **Step 4: Commit**

```bash
git add assets/js/components/deputy-panel.js
git commit -m "feat(panel): full render — columns, grouping, tabs, mobile chips"
```

---

## Task 10: Кнопка «Посмотреть поимённо» в law-modal

**Files:**
- Modify: `assets/js/components/law-modal.js`

- [ ] **Step 1: Добавить кнопку в modal-content**

В `/home/dev/elections/assets/js/components/law-modal.js`, в шаблон `content.innerHTML = ...`, найти секцию `<!-- modal-vote-grid -->` (после `</div>` закрывающего `.modal-vote-grid` и `${law.voteResults ? ...}`). После закрывающего `</div>` секции «Как голосовали фракции» вставить:

Найти строку:
```javascript
        ${law.voteResults ? `<p style="font-size:13px; color:var(--ink-muted); margin-top:14px;" class="mono">Итог III чтения: за ${law.voteResults.za} · против ${law.voteResults.against} · возд. ${law.voteResults.abstain}</p>` : ''}
      </div>
```

Заменить на:
```javascript
        ${law.voteResults ? `<p style="font-size:13px; color:var(--ink-muted); margin-top:14px;" class="mono">Итог III чтения: за ${law.voteResults.za} · против ${law.voteResults.against} · возд. ${law.voteResults.abstain}</p>` : ''}
        ${(window.VOTE_MAPPING && window.VOTE_MAPPING[law.id]) ? `
          <button type="button" class="modal-deputy-btn" data-law-id="${law.id}">
            Посмотреть поимённо →
          </button>` : ''}
      </div>
```

- [ ] **Step 2: Wire-up в конце функции `openLawModal`**

Перед `openModal();` добавить:

```javascript
  const btn = content.querySelector('.modal-deputy-btn');
  if (btn) btn.addEventListener('click', () => {
    if (typeof window.openDeputyPanel === 'function') window.openDeputyPanel(btn.dataset.lawId);
  });
```

- [ ] **Step 3: Стиль кнопки**

В `assets/css/components.css` добавить (рядом с другими `.modal-*`):

```css
.modal-deputy-btn {
  margin-top: 14px;
  background: var(--ink, #1F1B16); color: var(--bg, #FCFAF6);
  border: 0; padding: 10px 16px; font: inherit;
  cursor: pointer; border-radius: 4px;
}
.modal-deputy-btn:hover { background: var(--ink-soft, #3A332C); }
```

- [ ] **Step 4: Тест**

```bash
cd /home/dev/elections && python3 -m http.server 8765
```

Открыть главную, кликнуть по строке закона «Суверенный Рунет» → в модале появилась кнопка «Посмотреть поимённо →» → клик открывает панель.

Проверить также закон, для которого данных нет (например, если какие-то billы не нашлись в voteSearch) — кнопка не должна появляться.

- [ ] **Step 5: Commit**

```bash
git add assets/js/components/law-modal.js assets/css/components.css
git commit -m "feat(modal): add 'Посмотреть поимённо' button when vote data exists"
```

---

## Task 11: Финальная верификация

- [ ] **Step 1: Smoke pass по 6 законам**

```bash
cd /home/dev/elections && python3 -m http.server 8765
```

В браузере проверить:
1. **608767-7 Суверенный Рунет** — Луговой в ЛДПР наверху колонки (диссидент, голосовал «за» при «против» фракции).
2. **755710-8 VPN** — НЛ: 2 «за», 12 «против», 1 «возд» — диссиденты Леонов / Чемерис «за», Певцов «возд».
3. **fkz-2022-territories** — 4 таба, все ~410 «за».
4. **606595-7 Пакет Клишаса** — 2 таба «Фейки» / «Неуважение».
5. **679980-8 MAX** — 407/0/0, тактическое отсутствие в КПРФ.
6. **312507-8 Призыв 30** — НЛ голосует «против», КПРФ диссиденты «воздержался».

В каждом случае:
- Цвета строк правильные (зелёный/красный/охра/серый)
- Ссылки vote.duma.gov.ru открываются
- ESC закрывает
- Mobile (~360px ширина DevTools) — chips переключают колонки

- [ ] **Step 2: Проверить, что без JS кнопки нет (no-JS fallback не сломан)**

DevTools → Settings → Disable JavaScript → перезагрузить → главная страница рендерит матрицу из HTML (если она там захардкожена) либо плейсхолдер; модалов не появляется. Кнопка «Посмотреть поимённо» отсутствует. Никакой ошибки в консоли.

- [ ] **Step 3: Проверить prefers-reduced-motion**

DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce` → клик «поимённо» — панель появляется без анимации opacity.

- [ ] **Step 4: Финальный commit (если в процессе верификации что-то поправили)**

```bash
git status
# если есть правки:
git add -p
git commit -m "fix: deputy panel polish from smoke testing"
```

---

## Self-review summary

**Coverage против спеки:**
- ✅ полноэкранная панель из модала — Tasks 8–10
- ✅ сортировка «диссиденты сверху» — Task 9 (`renderColumn` `order`)
- ✅ табы для составных законов — Task 9 (`renderTabs`) + mapping в Task 2
- ✅ один JSON на закон — Task 4
- ✅ ссылки на `vote.duma.gov.ru` / `sozd.duma.gov.ru` — Task 9 (`deputy-panel-meta`)
- ✅ токен только локально, в `.env` — Tasks 1, 3
- ✅ цветовые токены голосов — Task 7
- ✅ a11y (focus trap, ESC, role=dialog, prefers-reduced-motion) — Tasks 7, 8
- ✅ mobile (chip-tabs) — Tasks 7, 9
- ✅ feature gating (кнопка появляется только если есть данные) — Task 10

**Открытые риски:**
- voteSearch может не найти переоформленные билы (например, LAWS.id `80714-8` ↔ реальный bill `464757-7` для «Фейки об армии»). В этом случае Task 5 выведет `[NOT FOUND]` и для такого закона кнопка не появится. Это **acceptable** — ручную правку mapping добавит пользователь по итогам Task 5.
- `vote_search()` фильтр «третье чтение / в целом» — эвристика. Если на каком-то билле она ошибётся, проверка в Task 11 это покажет (не совпадут тоталы с теми, что в `LAWS[].voteResults`).
