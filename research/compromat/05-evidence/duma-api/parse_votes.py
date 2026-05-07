#!/usr/bin/env python3
"""Parse all downloaded vote XMLs and produce:
   1) per-vote summary (factions, individual dissidents)
   2) consolidated CSV
   3) INDEX.md
"""
import os, re, json, csv
from collections import defaultdict

VOTES_DIR = os.path.join(os.path.dirname(__file__), "votes")
OUT_CSV   = os.path.join(os.path.dirname(__file__), "votes-summary.csv")
OUT_INDEX = os.path.join(os.path.dirname(__file__), "INDEX.md")
OUT_DISSIDENTS = os.path.join(os.path.dirname(__file__), "dissidents.md")

# Mapping faction code -> short label
FACTION_MAP = {
    "72100024": "ER",
    "72100004": "KPRF",
    "72100005": "LDPR",
    "72100027": "SR",   # convocation 6/7
    "72100029": "SR",   # convocation 8 (renamed but same)
    "72100028": "NL",   # New People (conv 8)
    "72100011": "NoFaction",
}

# Reverse for richer naming
FACTION_RU = {
    "ER":   "ЕР",
    "KPRF": "КПРФ",
    "LDPR": "ЛДПР",
    "SR":   "СРЗП",
    "NL":   "НЛ",
    "NoFaction": "Вне фракций",
}

# Order to display
ORDER = ["ER", "KPRF", "LDPR", "SR", "NL", "NoFaction"]

# Vote metadata (must match download_votes.py)
VOTE_IDS = {
    "sov-runet": "107479",
    "klishas-fakes": "107127",
    "klishas-disrespect": "107129",
    "inoagent-fizlitsa": "113228",
    "it-landing": "115415",
    "army-fakes": "117350",
    "inoagent-united": "118599",
    "digital-ruble-1": "123266",
    "digital-ruble-2": "123339",
    "rec-algorithms": "123895",
    "fake-confiscation": "126036",
    "deanonymization": "127912",
    "max-messenger": "131111",
    "vpn-ban": "131816",
    "lnr-ratification": "117239",
    "dnr-ratification": "117240",
    "annex-dnr": "119237",
    "annex-lnr": "119239",
    "annex-zaporozhye": "119241",
    "annex-kherson": "119243",
    "mobilization-uk": "119076",
    "lgbt-propaganda": "120074",
    "gender-transition": "123408",
    "conscription-30": "123855",
    "volunteer-discreditation": "121229",
    "migrant-control": "130868",
    "constitution-2020": "110468",
    "electoral-reform-2022": "118159",
}

VOTES_META = [
    ("sov-runet",         "608767-7",  "ФЗ-90",  "2019-04-16", "Суверенный Рунет",                            "цифровые свободы"),
    ("klishas-fakes",     "606593-7",  "ФЗ-31",  "2019-03-07", "Пакет Клишаса (фейки)",                       "цифровые свободы"),
    ("klishas-disrespect","606594-7",  "ФЗ-30",  "2019-03-07", "Пакет Клишаса (неуважение к власти)",         "цифровые свободы"),
    ("inoagent-fizlitsa", "1057914-7", "ФЗ-481", "2020-12-23", "Иноагенты-физлица",                           "иноагенты"),
    ("it-landing",        "1176731-7", "ФЗ-236", "2021-06-17", "Приземление иностранных IT",                  "цифровые свободы"),
    ("army-fakes",        "464757-7",  "ФЗ-32",  "2022-03-04", "Фейки об армии (УК 207.3)",                   "военные"),
    ("inoagent-united",   "113045-8",  "ФЗ-255", "2022-06-29", "Единый закон об иноагентах",                  "иноагенты"),
    ("digital-ruble-1",   "270838-8",  "ФЗ-339", "2023-07-11", "Цифровой рубль ч.1 (банковский)",            "цифровые свободы"),
    ("digital-ruble-2",   "270852-8",  "ФЗ-340", "2023-07-13", "Цифровой рубль ч.2 (ГК)",                    "цифровые свободы"),
    ("rec-algorithms",    "387593-8",  "ФЗ-408", "2023-07-26", "Регулирование рекомендательных алгоритмов",  "цифровые свободы"),
    ("fake-confiscation", "533912-8",  "ФЗ-11",  "2024-01-31", "Конфискация имущества за фейки",             "военные/конфискация"),
    ("deanonymization",   "647048-8",  "ФЗ-303", "2024-07-30", "Деанонимизация блогеров и SIM",              "цифровые свободы"),
    ("max-messenger",     "679980-8",  "ФЗ-156", "2025-06-10", "Национальный мессенджер MAX",                "цифровые свободы"),
    ("vpn-ban",           "755710-8",  "ФЗ-281", "2025-07-22", "Запрет VPN",                                 "цифровые свободы"),
    ("lnr-ratification",  "75577-8",   None,     "2022-02-22", "Ратификация Договора о ЛНР",                 "военные"),
    ("dnr-ratification",  "75578-8",   None,     "2022-02-22", "Ратификация Договора о ДНР",                 "военные"),
    ("annex-dnr",         "203816-8",  "ФКЗ-5",  "2022-10-03", "Принятие ДНР в РФ (ФКЗ)",                    "военные"),
    ("annex-lnr",         "203817-8",  "ФКЗ-6",  "2022-10-03", "Принятие ЛНР в РФ (ФКЗ)",                    "военные"),
    ("annex-zaporozhye",  "203818-8",  "ФКЗ-7",  "2022-10-03", "Принятие Запорожской области в РФ (ФКЗ)",   "военные"),
    ("annex-kherson",     "203819-8",  "ФКЗ-8",  "2022-10-03", "Принятие Херсонской области в РФ (ФКЗ)",    "военные"),
    ("mobilization-uk",   "160006-8",  "ФЗ-365", "2022-09-20", "Мобилизационные поправки в УК",              "военные"),
    ("lgbt-propaganda",   "217471-8",  "ФЗ-479", "2022-11-24", "Запрет ЛГБТ-пропаганды (информация)",        "культурные"),
    ("gender-transition", "369814-8",  "ФЗ-261", "2023-07-14", "Запрет смены пола",                          "культурные"),
    ("conscription-30",   "312507-8",  "ФЗ-326", "2023-07-25", "Призывной возраст до 30",                    "военные"),
    ("volunteer-discreditation","253972-8","ФЗ-58","2023-03-14","Дискредитация добровольцев",                "военные"),
    ("migrant-control",   "859523-8",  None,     "2025-05-20", "Цифровой контроль мигрантов",                "миграция"),
    ("constitution-2020", "885214-7",  None,     "2020-03-11", "Поправки к Конституции (одобрение)",         "электоральные"),
    ("electoral-reform-2022","61957-8",None,     "2022-06-08", "Электоральная реформа (укрупнение, иноагенты)","электоральные"),
]


def parse_vote_xml(path):
    """Return dict with: meta + factions list + per-deputy results"""
    with open(path) as f:
        txt = f.read()

    out = {}
    # vote_id is not embedded in the XML — passed externally
    out["vote_id"] = None
    m = re.search(r"<date>([^<]+)</date>", txt)
    out["date"] = m.group(1) if m else None
    m = re.search(r"<lawNumber>([^<]+)</lawNumber>", txt)
    out["bill"] = m.group(1) if m else None
    m = re.search(r"<subject>([^<]*)</subject>", txt, re.DOTALL)
    out["subject"] = (m.group(1) if m else "").replace("&quot;", '"').replace("&amp;","&").strip()
    for fld in ["for", "against", "abstain", "absent"]:
        m = re.search(rf"^.*?<{fld}>(\d+)</{fld}>", txt[:2000])
        # only first occurrence (top-level)
        m2 = re.match(rf".*?<{fld}>(\d+)</{fld}>", txt[:2000], re.DOTALL)
        out[f"total_{fld}"] = int(m2.group(1)) if m2 else 0

    # factions: <resultsByFaction>
    out["factions"] = []
    for fm in re.finditer(r"<resultsByFaction>(.*?)</resultsByFaction>", txt, re.DOTALL):
        chunk = fm.group(1)
        code = re.search(r"<code>(\d+)</code>", chunk)
        total = re.search(r"<total>(\d+)</total>", chunk)
        f_ = re.search(r"<for>(\d+)</for>", chunk)
        a_ = re.search(r"<against>(\d+)</against>", chunk)
        ab_= re.search(r"<abstain>(\d+)</abstain>", chunk)
        abs_=re.search(r"<absent>(\d+)</absent>", chunk)
        name=re.search(r"<name>([^<]+)</name>", chunk)
        abbr=re.search(r"<abbr>([^<]+)</abbr>", chunk)
        if not code:
            continue
        c = code.group(1)
        out["factions"].append({
            "code": c,
            "label": FACTION_MAP.get(c, c),
            "name":  name.group(1) if name else "",
            "abbr":  abbr.group(1) if abbr else "",
            "total": int(total.group(1)) if total else 0,
            "for":     int(f_.group(1))  if f_ else 0,
            "against": int(a_.group(1))  if a_ else 0,
            "abstain": int(ab_.group(1)) if ab_ else 0,
            "absent":  int(abs_.group(1))if abs_ else 0,
        })

    # per-deputy results
    out["deputies"] = []
    for dm in re.finditer(r"<resultsByDeputy>(.*?)</resultsByDeputy>", txt, re.DOTALL):
        chunk = dm.group(1)
        dcode = re.search(r"<code>(\d+)</code>", chunk)
        fcode = re.search(r"<factionCode>(\d+)</factionCode>", chunk)
        result= re.search(r"<result>(\w+)</result>", chunk)
        family= re.search(r"<family>([^<]+)</family>", chunk)
        name  = re.search(r"<name>([^<]+)</name>", chunk)
        patron= re.search(r"<patronymic>([^<]+)</patronymic>", chunk)
        out["deputies"].append({
            "deputy_id": dcode.group(1) if dcode else None,
            "faction_code": fcode.group(1) if fcode else None,
            "faction_label": FACTION_MAP.get(fcode.group(1) if fcode else "", "?"),
            "result": result.group(1) if result else None,  # for|against|abstain|absent
            "family": family.group(1) if family else "",
            "name":   name.group(1)   if name   else "",
            "patronymic": patron.group(1) if patron else "",
            "fullname":   f"{family.group(1) if family else ''} {name.group(1) if name else ''} {patron.group(1) if patron else ''}".strip(),
        })

    return out


def faction_majority(faction_results):
    """Return the dominant choice (for/against/abstain/absent)"""
    if not faction_results:
        return None
    fields = {"for": faction_results["for"], "against": faction_results["against"],
              "abstain": faction_results["abstain"], "absent": faction_results["absent"]}
    return max(fields, key=fields.get)


def find_dissidents(parsed, include_tactical=False):
    """Find deputies who voted differently from their faction's majority.
    `include_tactical=True` also includes 'absent' when majority was active vote.
    """
    fmap = {f["code"]: faction_majority(f) for f in parsed["factions"]}
    diss = []
    for d in parsed["deputies"]:
        fc = d["faction_code"]
        if not fc or fc == "72100011":  # skip "вне фракций"
            continue
        majority = fmap.get(fc)
        if not majority:
            continue
        if d["result"] == majority:
            continue
        # always exclude "absent" when faction majority was also some "absent" mode
        if d["result"] == "absent" and not include_tactical:
            continue
        # also exclude "for"/"against"/"abstain" votes when majority was "absent" — these
        # are not dissidents, just members of a partly-quorum faction
        if majority == "absent":
            # we keep these but mark as "vote_when_faction_absent"
            diss.append({**d, "majority": majority, "kind": "vote_when_faction_absent"})
            continue
        # active dissent: voted differently while faction had a clear majority
        if d["result"] in ("for", "against", "abstain"):
            diss.append({**d, "majority": majority, "kind": "active_dissent"})
        elif d["result"] == "absent" and include_tactical:
            diss.append({**d, "majority": majority, "kind": "tactical_absent"})
    return diss


def main():
    rows = []
    summaries = []  # for INDEX.md
    dissidents_all = []  # for dissidents.md

    for short, bill, fz, date_str, descr, kind in VOTES_META:
        path_xml = os.path.join(VOTES_DIR, f"{short}.xml")
        if not os.path.exists(path_xml):
            print(f"[MISSING] {short}.xml")
            continue
        try:
            p = parse_vote_xml(path_xml)
        except Exception as e:
            print(f"[ERR parse] {short}: {e}")
            continue

        # Quickly compute per-faction columns
        f_by_label = {f["label"]: f for f in p["factions"]}
        def col(label, what):
            f = f_by_label.get(label)
            return f.get(what, 0) if f else 0

        diss = find_dissidents(p, include_tactical=True)
        # Active dissenters (for our headlines): excludes vote_when_faction_absent
        active = [d for d in diss if d["kind"] == "active_dissent"]
        tactical = [d for d in diss if d["kind"] == "tactical_absent"]
        # In INDEX.md we want signal — exclude ЕР from tactical absenteeism (it's just discipline noise)
        tactical_signal = [d for d in tactical if d["faction_label"] != "ER"]
        dissident_names = "; ".join(
            f"{d['family']} {d['name']} ({FACTION_RU.get(d['faction_label'], d['faction_label'])}: {d['result']} vs maj {d['majority']})"
            for d in active
        )
        tactical_names = "; ".join(
            f"{d['family']} {d['name']} ({FACTION_RU.get(d['faction_label'], d['faction_label'])})"
            for d in tactical_signal
        )

        row = {
            "short_name": short,
            "vote_id":    VOTE_IDS.get(short, p["vote_id"] or ""),
            "bill_id":    p["bill"] or bill,
            "fz_number":  fz or "",
            "date":       p["date"] or date_str,
            "kind":       kind,
            "descr":      descr,
            "total_for":     p["total_for"],
            "total_against": p["total_against"],
            "total_abstain": p["total_abstain"],
            "total_absent":  p["total_absent"],
            "ER_for":     col("ER","for"),
            "ER_against": col("ER","against"),
            "ER_abstain": col("ER","abstain"),
            "ER_absent":  col("ER","absent"),
            "KPRF_for":     col("KPRF","for"),
            "KPRF_against": col("KPRF","against"),
            "KPRF_abstain": col("KPRF","abstain"),
            "KPRF_absent":  col("KPRF","absent"),
            "LDPR_for":     col("LDPR","for"),
            "LDPR_against": col("LDPR","against"),
            "LDPR_abstain": col("LDPR","abstain"),
            "LDPR_absent":  col("LDPR","absent"),
            "SR_for":     col("SR","for"),
            "SR_against": col("SR","against"),
            "SR_abstain": col("SR","abstain"),
            "SR_absent":  col("SR","absent"),
            "NL_for":     col("NL","for"),
            "NL_against": col("NL","against"),
            "NL_abstain": col("NL","abstain"),
            "NL_absent":  col("NL","absent"),
            "individual_dissidents": dissident_names,
            "dissident_count": len(active),
            "tactical_absent": tactical_names,
            "tactical_absent_count": len(tactical_signal),
            "tactical_absent_count_total": len(tactical),
        }
        rows.append(row)
        summaries.append((short, p, row, kind, descr, fz))
        for d in diss:
            dissidents_all.append({**d, "vote_short": short, "vote_descr": descr, "vote_date": p["date"], "fz": fz})
        # vote_when_faction_absent are NOT logged in dissidents.md — they're noise

    # ---- CSV ----
    if rows:
        with open(OUT_CSV, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader()
            for r in rows:
                w.writerow(r)
        print(f"[CSV] {OUT_CSV}: {len(rows)} rows")

    # ---- INDEX.md ----
    md_lines = ["# Карта голосований (api.duma.gov.ru, raw XML+JSON)\n"]
    md_lines.append("> Сгенерировано из `votes/*.xml` (raw API), которые скачаны с `api.duma.gov.ru` через VPS-2 anonymity layer (см. `00-methodology/access-notes.md`).\n")
    md_lines.append(f"Всего голосований: **{len(rows)}**\n")
    md_lines.append("Файлы хранят полные `<resultsByDeputy>` поимённо — можно перепроверить позиции каждого депутата.\n")

    # by category
    by_kind = defaultdict(list)
    for short, p, r, kind, descr, fz in summaries:
        by_kind[kind].append((short, p, r, descr, fz))

    for kind in ["цифровые свободы","военные","военные/конфискация","иноагенты","культурные","миграция","электоральные"]:
        if kind not in by_kind:
            continue
        md_lines.append(f"\n## {kind}\n")
        for short, p, r, descr, fz in by_kind[kind]:
            fz_str = f" {fz}" if fz else ""
            md_lines.append(f"### {descr}{fz_str}")
            md_lines.append(f"- Файлы: [`votes/{short}.xml`](./votes/{short}.xml), [`votes/{short}.json`](./votes/{short}.json)")
            md_lines.append(f"- Vote ID: **{r['vote_id']}**, Bill: **{r['bill_id']}**, Дата: **{r['date']}**")
            md_lines.append(f"- Итог: **{r['total_for']}/{r['total_against']}/{r['total_abstain']}** (за/против/возд.); отсутствовали {r['total_absent']}")
            md_lines.append(f"- Subject: _{p['subject'][:200]}_")
            md_lines.append(f"- По фракциям:")
            md_lines.append(f"  - **ЕР**: {r['ER_for']}/{r['ER_against']}/{r['ER_abstain']}/{r['ER_absent']} (за/против/возд./отс.)")
            md_lines.append(f"  - **КПРФ**: {r['KPRF_for']}/{r['KPRF_against']}/{r['KPRF_abstain']}/{r['KPRF_absent']}")
            md_lines.append(f"  - **ЛДПР**: {r['LDPR_for']}/{r['LDPR_against']}/{r['LDPR_abstain']}/{r['LDPR_absent']}")
            md_lines.append(f"  - **СРЗП**: {r['SR_for']}/{r['SR_against']}/{r['SR_abstain']}/{r['SR_absent']}")
            md_lines.append(f"  - **НЛ**: {r['NL_for']}/{r['NL_against']}/{r['NL_abstain']}/{r['NL_absent']}")
            if r["dissident_count"]:
                md_lines.append(f"- Активные диссиденты ({r['dissident_count']}): {r['individual_dissidents']}")
            if r["tactical_absent_count"]:
                md_lines.append(f"- «Тактическое отсутствие» оппозиционных депутатов при «за» большинства фракции ({r['tactical_absent_count']}; ЕР исключены как шум — всего по таблице {r['tactical_absent_count_total']}): {r['tactical_absent']}")
            md_lines.append("")

    with open(OUT_INDEX, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines))
    print(f"[MD] {OUT_INDEX}")

    # ---- dissidents.md ----
    md_d = ["# Индивидуальные диссиденты в Думе 2019–2025\n",
            "> Депутаты, чей голос отличался от мажоритарной позиции своей фракции (по API-данным `resultsByDeputy`).\n",
            "> Категории: **активный диссент** — голос «против»/«воздержался», когда фракция массово голосовала «за»; **тактическое отсутствие** — депутат «отсутствовал», когда фракция массово голосовала «за».\n"]

    # Split into active and tactical
    active_all = [d for d in dissidents_all if d.get("kind") == "active_dissent"]
    # Tactical absent: exclude ЕР noise (ЕР absenteeism is just discipline, not dissent)
    tactical_all = [d for d in dissidents_all if d.get("kind") == "tactical_absent" and d["faction_label"] != "ER"]

    by_dep_a = defaultdict(list)
    for d in active_all:
        by_dep_a[d["fullname"]].append(d)
    by_dep_t = defaultdict(list)
    for d in tactical_all:
        by_dep_t[d["fullname"]].append(d)

    md_d.append(f"Активных диссидентских голосов: **{len(active_all)}** у **{len(by_dep_a)}** депутатов.")
    md_d.append(f"Случаев «тактического отсутствия»: **{len(tactical_all)}** у **{len(by_dep_t)}** депутатов.\n")

    md_d.append("## Активный диссент (голосование против фракционной линии)\n")
    sorted_deps = sorted(by_dep_a.items(), key=lambda x: -len(x[1]))
    for name, votes in sorted_deps:
        if not votes: continue
        faction_label = votes[0]["faction_label"]
        faction_ru = FACTION_RU.get(faction_label, faction_label)
        md_d.append(f"### {name} ({faction_ru}) — {len(votes)} случаев")
        for v in votes:
            fz = f" {v['fz']}" if v.get("fz") else ""
            md_d.append(f"- {v['vote_date']} · {v['vote_descr']}{fz} · фракция голосовала **{v['majority']}**, депутат **{v['result']}** ([{v['vote_short']}](./votes/{v['vote_short']}.xml))")
        md_d.append("")

    md_d.append("\n## Тактическое отсутствие (депутат не нажал кнопку, когда фракция массово «за»)\n")
    sorted_t = sorted(by_dep_t.items(), key=lambda x: -len(x[1]))
    for name, votes in sorted_t:
        if not votes: continue
        faction_label = votes[0]["faction_label"]
        faction_ru = FACTION_RU.get(faction_label, faction_label)
        md_d.append(f"### {name} ({faction_ru}) — {len(votes)} случаев")
        for v in votes:
            fz = f" {v['fz']}" if v.get("fz") else ""
            md_d.append(f"- {v['vote_date']} · {v['vote_descr']}{fz} · фракция голосовала **for**, депутат **отсутствовал** ([{v['vote_short']}](./votes/{v['vote_short']}.xml))")
        md_d.append("")

    with open(OUT_DISSIDENTS, "w", encoding="utf-8") as f:
        f.write("\n".join(md_d))
    print(f"[MD] {OUT_DISSIDENTS}")


if __name__ == "__main__":
    main()
