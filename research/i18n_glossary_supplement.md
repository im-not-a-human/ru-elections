# Glossary supplement — terms surfaced during data-file translation

This file extends `i18n_glossary_draft.md` with terms that subagents encountered and rendered during the data-translation phase. Folded back here so the UI-label and HTML-translation phases stay consistent.

## Names (BGN/PCGN, journalistic English)

- Ярослав Нилов → Yaroslav Nilov
- Оксана Дмитриева → Oksana Dmitrieva
- Александр Плякин → Alexander Plyakin
- Москвичёв → Moskvichyov
- Валеев → Valeyev
- Выборный → Vyborny
- Терентьев → Terentyev
- Максут Шадаев → Maksut Shadayev
- Эльвира Набиуллина → Elvira Nabiullina
- Маргарита Симоньян → Margarita Simonyan (editor-in-chief of RT)

## Institutions and registers

- ОРИ (организатор распространения информации) → IDO (information dissemination organiser)
- ЕБС (единая биометрическая система) → Unified Biometric System (EBS)
- ЕСИА → ESIA (the state authentication portal)
- СКР (Следственный комитет) → Investigative Committee of Russia
- Совбез РФ → Security Council of Russia
- ФБК → FBK (Anti-Corruption Foundation, founded by Navalny)
- Лига безопасного интернета → League of Safe Internet
- Опора России → Opora Rossii (kept as the lobby's own brand)
- АКИТ → AKIT (Russia's e-commerce association)
- РАЭК → RAEK (Russian Association for Electronic Communications)
- Кибердом → Kyberdom
- объясняем.рф → obyasnyaem.rf
- ИНСОМАР / INSOOMAR → Insoomar
- iStories (Важные истории) → iStories
- Коммунарка → Kommunarka hospital

## Tech / infrastructure

- ТСПУ → TSPU (deep-packet-inspection filtering infrastructure) on first mention; subsequent: TSPU
- ВЧ → VCh (high-frequency secure communication lines) on first mention; subsequent: VCh
- ПС → PS (secure presidential lines) on first mention; subsequent: PS

## Country names (short forms suitable for tables/leaderboards)

- КНР / Китай → China
- США → USA (in tables) / United States (in prose)
- РФ → Russia

## Roles / categories

- бюджетники → public-sector employees
- госслужащие → civil servants
- воспитатели д/с → nursery / kindergarten staff
- ресурсоснабжающие организации → utility suppliers
- управляющие компании (УК) → management companies (MCs)
- операторы ТКО → municipal solid-waste operators
- главред → editor-in-chief

## Idioms / register

- фронда → public opposition
- мракобесие → obscurantism
- концлагерь → concentration camp (literal — do not soften, per locked rules)
- запрещальщики → 'ban-merchants' (preserve the sardonic register)
- «Герани» (drones) → 'Geran' drones
- чугунная жопа реальности → 'iron-hard arse of reality' (do not soften — quote-translation rule)
- цифровой концлагерь → 'digital concentration camp' (with quotes, as it's a CPRF rhetorical phrase)

## UI / category labels

- Закон → Law
- ЦИК → CEC
- Анализ → Analysis
- СМИ → Media
- Нормативные акты → Regulations
- Правозащитные организации → Human-rights organisations
- БПЛА → Drones (in filter chips); UAVs (in formal prose)
- SIM (фильтрация) → SIM filtering
- (filter) Все → All
- (filter) Цифровые → Digital
- (filter) Гражданские → Civil
- (filter) С оппозицией → Opposed

## Outstanding data issue

- `digital-numbers.js` `DIGITAL_HERO_NUMBERS[*].value` contains Russian-formatted numbers with Cyrillic suffixes (`29,3 млрд ₽`, `$11,9 млрд`). These were preserved in the EN file as-is. They need a follow-up pass: either split into `value` + `unit` fields (and have the unit be locale-aware), or swap commas for full stops and translate `млрд` → `bn`. **Mark for resolution during UI extraction phase, since these are effectively display labels.**

## Outstanding data issue 2

- `THREAT_ROWS` / `THREAT_COLS` / `THREAT_CELLS` (in `threat-matrix.js`) — verify with the threat-matrix component that the EN file's keys match what the component reads.
