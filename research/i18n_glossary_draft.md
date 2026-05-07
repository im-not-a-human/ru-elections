# i18n Glossary Draft — Голосование без выбора
## English/Russian Translation Reference (First Pass)

**Prepared:** 2026-05-04  
**Scope:** Three-page static site (`index.html`, `vybory.html`, `tsenzura.html`) plus all JS data/component files.  
**Architecture target:** Sibling-page `/en/` mirror; parallel data files in `assets/js/data/en/`; UI labels extracted to `assets/js/data/i18n-ui.js`.

---

## 1. Style Preamble

### British English
All translations use British English spelling and conventions:
- `-ise` endings: analyse, legalise, recognise, summarise, characterise
- `-our`: colour, behaviour, neighbour, favour, labour
- `-re`: centre, litre, theatre
- `-ll-`: travelling, modelling, councillor
- Double quotes in prose: "like this"; single quotes for nested: 'like this'
- Dates: day month year without ordinal suffixes in most contexts (4 May 2026), or DD.MM.YYYY for tables
- Thousand separator: thin space or comma (align with existing data)

### Tone
Neutral-analytical. The Russian original is measured and evidence-led, occasionally sardonic (e.g. section titles like "A machine of guaranteed victory"). Match the register: dry, precise, un-polemical in exposition, but do not soften section headings that carry editorial irony — they are intentional and load-bearing.

### Parenthetical Glosses on First Mention
Use the form: **Full English name (Russian: Полное русское название)** on first occurrence in any given page. On the `/en/` index page, treat all terms as first occurrences. Subsequent mentions use the short English form only.

Example: State Duma (Государственная Дума) → subsequent: the Duma  
Example: Roskomnadzor (Russia's media and telecommunications regulator) → subsequent: Roskomnadzor  
Example: SOZD (the State Duma's legislative database, sozd.duma.gov.ru) → subsequent: SOZD

### Politician Names on First Mention
Per editorial rule: first mention gives full transliterated name + Russian in parentheses: **Andrei Klishas (Андрей Клишас)**. Subsequent mentions: **Klishas**.

### Quotes
Politicians' quotes: keep Russian original; add `textTranslation` field alongside. Rendered as: *"English translation"* ("Русский оригинал"). The glossary therefore does not translate quotes in full but flags phrases requiring stable renderings (see §9).

---

## 2. Parties — All Duma Factions

| Russian name | Full English | Short / abbrev. | Notes |
|---|---|---|---|
| Единая Россия | United Russia | UR | Standard international rendering (Meduza EN, BBC, Reuters). Do not use "One Russia". |
| КПРФ (Коммунистическая партия Российской Федерации) | Communist Party of the Russian Federation | CPRF | The abbreviation КПРФ can remain in Cyrillic in tables; use CPRF in prose EN. |
| ЛДПР (Либерально-демократическая партия России) | Liberal Democratic Party of Russia | LDPR | LDPR is already the de-facto English abbreviation used internationally. |
| Справедливая Россия — За правду | A Just Russia — For Truth | SR / SRZP | Use "A Just Russia — For Truth" on first full mention. Abbreviation in tables: SR (matching code in data). Note: Meduza EN uses "A Just Russia". The "За правду" suffix is routinely dropped in EN — flag for editorial decision (see §9). |
| Новые люди | New People | NL | Standard rendering. |
| Яблоко | Yabloko | — | Non-parliamentary; appears in vybory.html electoral data. "Yabloko" is the accepted international rendering (do not translate as "Apple"). |
| Коммунисты России | Communists of Russia | — | Non-parliamentary; appears in barrier data. |
| Партия пенсионеров | Party of Pensioners | — | Non-parliamentary; appears in barrier data. |
| Партия Роста | Party of Growth | — | Non-parliamentary; appears in barrier data. |
| Зелёные | The Greens | — | Non-parliamentary; appears in barrier data. |
| Родина | Rodina | — | Non-parliamentary; transliterate, do not translate ("Homeland" would be literal but not the accepted EN form). |
| Зелёная альтернатива | Green Alternative | — | Non-parliamentary; appears in barrier data. |
| Гражданская инициатива | Civic Initiative | — | Nadyozhdin's party, vybory.html. |
| РПСС (Российская партия свободы и справедливости) | Russian Party of Freedom and Justice | RPFJ | Non-parliamentary; appears in barrier data only. |
| Гражданская платформа | Civil Platform | — | Non-parliamentary; appears in barrier data. |

---

## 3. State Institutions, Agencies, Registers

| Russian | English (first-mention form) | Subsequent | Notes |
|---|---|---|---|
| Государственная Дума | State Duma (the lower chamber of Russia's Federal Assembly) | the Duma / State Duma | "Russian Parliament's lower house" acceptable in meta descriptions but not preferred in body text. |
| Совет Федерации | Federation Council (the upper chamber) | Federation Council | |
| Администрация Президента | Presidential Administration / Kremlin administration | AP / the Kremlin | "АП" in source data; use "the Kremlin" colloquially where context is political direction. |
| Роскомнадзор | Roskomnadzor (Russia's federal media and telecommunications regulator) | Roskomnadzor | Do not translate. OVD-Info EN and Meduza EN both use this spelling. |
| РКН | RKN | RKN | Abbreviation used in charts/tables; spell out Roskomnadzor in prose. |
| СОЗД ГД РФ | SOZD (the State Duma's legislative database) | SOZD | First-mention gloss; URL sozd.duma.gov.ru stays as-is. |
| ЦИК (Центральная избирательная комиссия) | CEC (Russia's Central Election Commission) | CEC | Meduza EN uses "CEC" or "the Central Election Commission". |
| Генпрокуратура | Prosecutor General's Office | Prosecutor General's Office | |
| ФСБ | FSB (Russia's Federal Security Service) | FSB | Universally known abbreviation; no gloss needed beyond the first. |
| МВД | MVD (Ministry of Internal Affairs) / Ministry of Internal Affairs | MVD | |
| Минцифры (Министерство цифрового развития, связи и массовых коммуникаций) | Ministry of Digital Development, Communications and Mass Media | Mincifry / Ministry of Digital Development | Use full English name on first mention; "Mincifry" or "the ministry" subsequently. |
| Минюст | Ministry of Justice | Ministry of Justice | |
| Конституционный суд | Constitutional Court | Constitutional Court | |
| Верховный суд | Supreme Court | Supreme Court | |
| Мосгоризбирком | Moscow City Election Commission | — | Appears in DEG/vybory context. |
| ФНС (Федеральная налоговая служба) | Federal Tax Service | FTS | |
| ФСО (Федеральная служба охраны) | Federal Protective Service | FSO | |
| ЦБ РФ (Центральный банк) | Central Bank of Russia | CBR | |
| АТС-1 / АТС-2 / ВЧ / ПС | Government telephone exchanges ATS-1 / ATS-2 / high-frequency (VCh) / PS secure lines | — | These are proper names of classified communication systems; transliterate (ATS-1, ATS-2, VCh) with a gloss on first mention: "government secure telephone exchanges". |
| ОРИ (организатор распространения информации) | information dissemination organiser (IDO) | IDO | Russian regulatory category; use the gloss "internet service organiser under Russian law" if context permits. |

---

## 4. Legal and Political Terminology

| Russian term | Proposed English | Notes / Russia-watcher press standard |
|---|---|---|
| иноагент / иностранный агент | foreign agent | Use lower-case "foreign agent" in running text; "Foreign Agent" when referencing the formal register or act. Meduza EN, OVD-Info EN both use "foreign agent". Do **not** soften to "foreign-funded organisation" — that would conceal the political loading. |
| реестр иноагентов | foreign-agent register | |
| нежелательная организация | undesirable organisation | OVD-Info EN standard rendering. British spelling: "organisation". |
| суверенный Рунет | sovereign Runet / sovereign Russian internet | "Runet" is an accepted EN term (BBC, Reuters). On first mention: "sovereign Runet (Russia's nationally controlled internet infrastructure)". |
| ТСПУ (технические средства противодействия угрозам) | TSPU (deep-packet-inspection infrastructure for traffic filtering) / threat-countermeasure technical equipment | Transliterate as TSPU with a gloss; the English description "DPI filtering infrastructure" is clearer in prose. |
| суверенный интернет | sovereign internet | |
| фейки (о деятельности ВС РФ) | "fake news" (about the activities of the Russian Armed Forces) | Quote marks are warranted because the Russian law uses the term pejoratively; in EN keep the quote marks on first mention to signal the legal register. Alternatively: "false information" (the more literal rendering used in legal texts). Flag for editorial decision — see §9. |
| дискредитация Вооружённых Сил РФ | discrediting the Russian Armed Forces | OVD-Info EN uses "discrediting the army". "Discrediting the Russian Armed Forces" is more precise. |
| экстремизм / экстремистская организация | extremism / extremist organisation | Standard. Note: Meta/Instagram is designated as an "extremist organisation" under Russian law; this is an official Russian designation, not a factual characterisation. Mark with "Russia-designated extremist" on first mention. |
| запрет пропаганды ЛГБТ | ban on LGBT "propaganda" | Quote marks on "propaganda" signal the Russian legal term; this is standard in HRW, Amnesty, Meduza EN reporting. |
| ЛГБТ-движение | LGBT movement | The Russian law designates the "LGBT movement" as an extremist organisation; use "LGBT movement (designated extremist under Russian law)" on first mention in that context. |
| традиционные ценности | "traditional values" | Quote marks warranted as this is a political/legal framing in Russian law; do not sanitise. |
| запрет смены пола | ban on gender reassignment | "gender reassignment" is the standard British EN medical/legal term; preferred over "sex change". |
| цифровой рубль | digital rouble | British spelling: "rouble" (not "ruble"). |
| единый реестр | unified register | Context-dependent: "unified register of foreign agents", "unified register of conscripts", etc. |
| белый список | whitelist | One word in EN technical context; "white list" in regulatory/policy prose. |
| чёрный список | blocklist / blacklist | "Blocklist" is preferred in technical contexts (more neutral); "blacklist" is acceptable in policy prose. |
| деанон / деанонимизация | deanonymisation | British spelling: "-isation". |
| приземление иностранных IT-компаний | "landing" requirement for foreign IT companies / local presence requirement | The Russian term "приземление" (lit. "landing") is the accepted Russian-law shorthand; in EN use "local presence requirement" or "landing requirement" in quotes on first mention. |
| принудительная локализация данных | mandatory data localisation | Standard regulatory EN term. British spelling: "localisation". |
| реестр блогеров | blogger register | |
| период охлаждения SIM | SIM cool-down period | Transliteration of the official phrase; quote marks on first mention: "'cool-down period' for SIM cards". |
| белый список Минцифры | Mincifry whitelist / the Ministry of Digital Development's whitelist | Context: list of Russian-hosted services permitted during mobile shutdowns. |
| мобильный шатдаун | mobile internet shutdown | "Shutdown" is widely used in EN (Access Now, NetBlocks usage); can also be written "internet shutdown". |
| ДЭГ (дистанционное электронное голосование) | DEG (remote electronic voting) / online voting | "DEG" as an abbreviation is specific to Russia; use "online voting" or "remote electronic voting (DEG)" on first mention. |
| Умное голосование | Smart Voting | Navalny's tactical-voting system; "Smart Voting" is the standard EN name used by international media. |
| двойники / паровозы | dopplegangers [candidates] / locomotive candidates | "Locomotive candidate" is the accepted EN term for the Russian "паровоз" technique (candidate who headlines the list then relinquishes the seat). "Doppelganger candidate" is widely used for "двойник". |
| муниципальный фильтр | municipal filter | |
| лепестковая нарезка | petal-shaped districting / gerrymandering | "Petal-shaped gerrymandering" captures the Russian coinage; in body text use "petal-shaped constituency delimitation" or "petal gerrymandering". Note: "gerrymandering" is the international standard; the Russian coinage is a specific subtype. |
| метод Хэйра-Нимейера | Hare-Niemeyer method | Standard EN name; also known as Hamilton method or largest-remainder method. |
| конституционное большинство | constitutional majority (two-thirds majority, 300+ of 450 seats) | Gloss required: in Russian usage this is 2/3 of the Duma (300 seats), not 50%+1. |
| простое большинство | simple majority | |
| цифровой суверенитет | digital sovereignty | |
| иноагентское законодательство | foreign-agent legislation | |
| принудительная предустановка | mandatory pre-installation | |
| реестр военнообязанных | conscript register / military service register | |
| режим высылки | deportation regime | |
| реестр контролируемых лиц | register of supervised persons | |
| спецсчёт | special-purpose account | |
| поимённое голосование | roll-call vote | Standard parliamentary EN term. |
| бюджетники | public-sector employees / state-employed workers | "Бюджетники" is a Russian colloquial category meaning those on government payroll; "public-sector employees" is the closest EN equivalent. |
| административный ресурс | administrative resource / state resources | "Administrative resource" (borrowed from Russian) is used by Meduza EN and academic sources; "state resources" is more accessible. |
| пенсионная реформа | pension reform | |

---

## 5. Vote Terms (Display Labels)

These map to the machine values in `VOTE_LABELS` and `VOTE_FULL` in `assets/js/lib/dom.js`.

| Machine value | Russian (short, `VOTE_LABELS`) | Russian (full, `VOTE_FULL`) | EN short (for matrix cells) | EN full (for tooltips) |
|---|---|---|---|---|
| `za` | ЗА | Голосовали "за" фракционно | FOR | Voted in favour (bloc) |
| `against` | ПРОТИВ | Голосовали "против" фракционно | AGAINST | Voted against (bloc) |
| `abstain` | ВОЗД. | Воздержались (фракционно) | ABS. | Abstained (bloc) |
| `partial-against` | ЧАСТЬ | Часть фракции голосовала "против", часть "за" | SPLIT | Faction split — part voted against |
| `didnt-vote` | НЕ ГОЛ. | Не голосовали — тактика "не присутствовать" | ABSENT* | Did not vote — tactical non-attendance |
| `absent` | НЕТ | Партии не было в Думе на момент голосования | N/A | Party not yet in the Duma |

> *Note: `didnt-vote` (tactical non-attendance) and `absent` (party didn't exist yet) are **different** concepts and must have distinct English labels. The current RU short form НЕ ГОЛ. / НЕТ already distinguishes them; the EN labels above maintain that distinction. Consider "DIDN'T VOTE" and "NOT IN DUMA" as alternatives if four-character cell space is available.

Category labels (from `CAT_LABELS`):

| Russian | English |
|---|---|
| Цифровые свободы | Digital freedoms |
| Гражданские свободы | Civil liberties |

---

## 6. Named Individuals

Transliterations follow BGN/PCGN where no dominant journalistic form exists. Meduza EN / OVD-Info EN / BBC spellings take priority where available.

### Party Leaders and Senior Officials

| Russian name | Canonical English | Role in site |
|---|---|---|
| Андрей Клишас | Andrei Klishas | Federation Council senator; lead author of "Klishas package" |
| Людмила Бокова | Lyudmila Bokova | Federation Council senator; co-author of Sovereign Runet law |
| Андрей Луговой | Andrei Lugovoy | LDPR deputy; lead reporter on unified foreign-agent law |
| Александр Хинштейн | Alexander Khinshtein | UR deputy; author of blogger register, "landing" law, DEG register |
| Сергей Боярский | Sergei Boyarsky | UR deputy; chair of Duma information-policy committee; co-author landing law |
| Антон Горелкин | Anton Gorelkin | UR deputy; author of recommendation-algorithm law |
| Максим Пискарёв | Maxim Piskarev | UR deputy; security committee |
| Ирина Яровая | Irina Yarovaya | UR deputy; author of "Yarovaya package" / Yarovaya Law |
| Дмитрий Вяткин | Dmitry Vyatkin | UR deputy; co-author "Klishas package", rally-ban law |
| Анатолий Аксаков | Anatoly Aksakov | SR deputy; chair of financial markets committee; author of digital-rouble law |
| Геннадий Зюганов | Gennady Zyuganov | CPRF leader |
| Леонид Слуцкий | Leonid Slutsky | LDPR leader (post-Zhirinovsky) |
| Сергей Миронов | Sergei Mironov | SR leader |
| Алексей Нечаев | Alexei Nechayev | New People leader |
| Владимир Васильев | Vladimir Vasilyev | UR faction leader in the Duma |
| Вячеслав Жириновский | Vladimir Zhirinovsky | LDPR founder; died April 2022. Standard EN spelling: Zhirinovsky (Meduza, BBC). |
| Вячеслав Володин | Vyacheslav Volodin | Speaker of the State Duma |
| Андрей Картаполов | Andrei Kartapolov | UR deputy; chair of Duma defence committee; co-author draft conscription age law |
| Андрей Красов | Andrei Krasov | UR deputy; co-author draft conscription age law |
| Юрий Швыткин | Yuri Shvytkin | UR deputy; co-author draft conscription age law |
| Андрей Турчак | Andrei Turchak | UR secretary-general |
| Элла Памфилова | Ella Pamfilova | CEC chair |
| Дмитрий Реут | Dmitry Reut | Deputy chair, Moscow City Election Commission |
| Калашников (ЕР) | Kalashnikov | UR deputy; co-author citizenship amendment |
| Затулин (ЕР) | Zatуlin / Konstantin Zatulin | UR deputy; co-author citizenship amendment |

### Opposition Deputies / Individual Dissenters

| Russian name | Canonical English | Notes |
|---|---|---|
| Ксения Горячева | Ksenia Goryacheva | New People deputy; among few to vote against inoagent law |
| Роза Авксентьева | Roza Avksentyeva | New People deputy; voted against confiscation law I reading |
| Владислав Даванков | Vladislav Davankov | New People deputy (vice-speaker); publicly opposed VPN law; 2024 presidential candidate |
| Нина Останина | Nina Ostanina | CPRF deputy; children's issues; proposed harsher LGBT penalties |
| Юрий Синельщиков | Yuri Sinelshchikov | CPRF deputy; quote on army-fake law |
| Сергей Иванов | Sergei Ivanov | LDPR deputy; opposed Sovereign Runet |
| Вячеслав Мархаев | Vyacheslav Makhayev | CPRF deputy; voted against recommendation-algorithm law (one of eight) |
| Николай Коломейцев | Nikolai Kolomeitsev | CPRF deputy; criticised e-conscription procedure |
| Артём Прокофьев | Artyom Prokofyev | CPRF deputy; proposed SIM-limit amendment for migrants |
| Сергей Чемериз | Sergei Chemeriz | New People deputy; supported e-conscription |
| Дмитрий Кузнецов | Dmitry Kuznetsov | SR deputy; sole abstention on e-conscription (claimed button error) |
| Сергей Шаргунов | Sergei Shargunov | CPRF deputy; voted against confiscation law I reading |
| Людмила Нарусова | Lyudmila Narusova | Federation Council senator; sole dissenter on inoagent election ban |
| Валерий Рашкин | Valery Rashkin | CPRF deputy; lost paper ballot in Moscow 197 district; later lost mandate over elk-hunting case |
| Михаил Лобанов | Mikhail Lobanov | CPRF / Smart Voting candidate; Moscow 197 |
| Дмитрий Парфёнов | Dmitry Parfyonov | CPRF candidate; Moscow |
| Анастасия Удальцова | Anastasia Udaltsova | CPRF candidate; Moscow |
| Сергей Обухов | Sergei Obukhov | CPRF deputy; Moscow |
| Александр Гребенник | Alexander Grebennik | CPRF candidate; Moscow |
| Анастасия Брюханова | Anastasia Bryukhanova | Independent candidate; Moscow (DEG flip) |
| Сергей Митрохин | Sergei Mitrokhin | Yabloko candidate; Moscow |
| Александр Ющенко | Alexander Yushchenko | CPRF deputy; co-author of "landing" law |
| Максим Кудрявцев | Maxim Kudryavtsev | UR deputy; co-author of "landing" law |

### Experts, Analysts, Commentators (cited in site)

| Russian name | Canonical English | Role |
|---|---|---|
| Сергей Шпилькин | Sergei Shpilkin | Physicist; election-anomaly analyst; "Shpilkin method" |
| Екатерина Шульман | Yekaterina Schulmann | Political scientist (Meduza EN standard: Schulmann) |
| Аббас Галлямов | Abbas Gallyamov | Political analyst |
| Александр Кынев | Alexander Kynev | Electoral systems analyst |
| Максим Кац | Maxim Katz | Politician / opposition commentator |
| Аркадий Любарев | Arkady Lyubarev | Electoral law expert |
| Дмитрий Кобак | Dmitry Kobak | Neuroscientist (Tübingen); co-author "Putin's peaks" paper |
| Кирилл Калинин | Kirill Kalinin | Political scientist (Hoover Institution, Stanford) |
| Фуад Алескеров | Fuad Aleskerov | Academic; critic of Shpilkin method (HSE) |
| Борис Надеждин | Boris Nadezhdin | Former Duma deputy; 2024 presidential candidate (refused registration) |
| Екатерина Дунцова | Yekaterina Duntsova | 2024 presidential candidate (refused registration, documentation stage) |

### Other Named Individuals (officials, quote-givers)

| Russian name | Canonical English | Notes |
|---|---|---|
| Маргарита Симоньян | Margarita Simonyan | RT editor-in-chief (Meduza EN: Simonyan) |
| Екатерина Мизулина | Yekaterina Mizulina | Head of League of Safe Internet; not to be confused with her mother Elena Mizulina (senator) |
| Сергей Шойгу | Sergei Shoigu | Security Council secretary (Meduza EN: Shoigu) |
| Сергей Бескрестнов | Sergei Beskrestnov | Ukrainian MoD adviser ("Flash"); cited on drone SIM usage |
| Элла Памфилова | Ella Pamfilova | CEC chair (listed above) |
| Дмитрий Песков | Dmitry Peskov | Kremlin spokesperson |
| Анна Кузнецова | Anna Kuznetsova | Former children's ombudsman; locomotive candidate (Duma 2021) |
| Виктор Вишневский | Viktor Vishnevsky | St Petersburg deputy; "doppelganger" case (three candidates with his name and face) |
| Андрей Турчак | Andrei Turchak | UR secretary-general (listed above) |
| Вячеслав Быков | — | Identified only as hockey coach in locomotive-candidate list; minor. |
| Лавров | Sergei Lavrov | Foreign Minister; declined Duma seat (locomotive) |
| Яровая | Irina Yarovaya | (see above) |

---

## 7. Recurring Law / Document Names

| Russian shorthand | English equivalent | Notes |
|---|---|---|
| Пакет Клишаса | Klishas package | Two laws (ФЗ № 27-ФЗ etc., 2019): fake-news fines + disrespect for authorities. Standard shorthand in Russian media; "Klishas package" is usable in EN with first-mention attribution "the Klishas package (authored by Federation Council senator Andrei Klishas)". |
| Суверенный Рунет | Sovereign Runet law (ФЗ № 90-ФЗ, 2019) | Shorthand in use internationally. |
| Закон Яровой / Пакет Яровой | Yarovaya Law / Yarovaya package | Formally: 2016 amendments to counter-terrorism legislation requiring communication-provider data retention. "Yarovaya Law" is used by EFF, Meduza EN, Access Now. The site references Yarovaya by name; the specific 2016 law is context in `parties.js`. |
| Закон Димы Яковлева | Dima Yakovlev Law | 2012 law banning US adoption of Russian children; not directly featured in the site's main data but may appear in commentary context. Standard EN name (HRW, NYT). |
| Единый закон об иноагентах | Unified Foreign Agents Law (ФЗ № 255-ФЗ, 2022) | |
| ДЭГ | DEG / remote electronic voting | See §4 above. |
| Закон о VPN / ФЗ № 281-ФЗ | VPN law (ФЗ № 281-ФЗ, 2025) | No established English shorthand yet; use "the 2025 VPN law" or "ФЗ № 281-ФЗ" in tables. |
| Закон о МАХ / Национальный мессенджер MAX | MAX Messenger Law (ФЗ № 156-ФЗ, 2025) | "MAX" is a proper brand name; retain in EN. |
| Закон о приземлении | Landing law (ФЗ № 236-ФЗ, 2021) | "Local presence requirement law" is the descriptive EN form. |
| Закон о реестре блогеров | Blogger-register law (ФЗ № 303-ФЗ, 2024) | |
| Закон о цифровом рубле | Digital Rouble Law (ФЗ № 339-ФЗ, 2023) | |
| Пакет Клишаса по иноагентам (физлица) | Inoagent-individuals law (ФЗ № 481-ФЗ, 2020) | Site refers to this as "Иноагенты-физлица"; EN: "Foreign-agent individuals law". |
| Лепестковая нарезка | Petal-shaped redistricting / petal gerrymandering | See §4. |
| Метод Шпилькина | Shpilkin method | |

---

## 8. Site-Specific UI Vocabulary

### Brand / Titles

| Russian | Proposed English | Notes |
|---|---|---|
| Голосование без выбора | Voting Without a Choice | Site title and brand. Do not use "Voting Without Choice" (definite article required). |
| Машина гарантированной победы | The Machine of Guaranteed Victory | `vybory.html` title/hero |
| Белые списки вместо интернета | Whitelists Instead of the Internet | `tsenzura.html` title/hero |
| Аналитический отчёт | Analytical Report | Hero meta tag |
| VII—VIII созывы Госдумы | 7th–8th convocations of the State Duma | Use ordinal numerals in EN: 7th–8th. |

### Navigation Labels

| Russian | English |
|---|---|
| Голосования | Votes / Voting |
| Математика выборов | Electoral Maths |
| Цифровые ограничения | Digital Restrictions |
| Дума (short nav) | Duma |
| Выборы (short nav) | Elections |
| Рунет (short nav) | Runet |
| Матрица | Matrix |
| Партии | Parties |
| Парадокс | Paradox |
| Хроника | Chronicle |
| Округа | Districts |
| Барьер | Barrier |
| ДЭГ | DEG |
| Калькулятор | Calculator |
| Цирк | Circus (§6 of vybory.html: "Двойники, паровозы, фильтр") |
| Противоречия | Contradictions |
| VPN | VPN |
| БПЛА | Drones |
| Сравнение | Comparison |

### Filter Buttons (Matrix — `index.html`)

| Russian | English |
|---|---|
| Фильтр: | Filter: |
| Все законы | All laws |
| Только цифровые свободы | Digital freedoms only |
| Только гражданские свободы | Civil liberties only |
| Где была оппозиция | Where opposition voted against |

### Contradiction Matrix Filter Chips (`tsenzura.html`)

| Russian | English |
|---|---|
| Все 18 | All 18 |
| VPN | VPN |
| БПЛА · SIM | Drones · SIM |
| Белые списки | Whitelists |
| Платформы | Platforms |
| Бизнес | Business |
| Право | Law |
| Экономика | Economy |
| Сравнение | Comparison |

### Matrix / Table Column Headers

| Russian | English |
|---|---|
| Закон | Law |
| Декларируется | Declared |
| Реализуется | Implemented |
| Противоречие | Contradiction |
| Сценарий угрозы | Threat scenario |
| SIM-охлаждение | SIM cool-down |
| Региональный mobile shutdown | Regional mobile shutdown |
| Белый список | Whitelist |
| VPN-блокировка | VPN block |
| Закрывает | Closes |
| Частично | Partially closes |
| Не закрывает | Does not close |
| Побочный ущерб | Collateral harm |

### Legend Labels (Voting Matrix)

| Russian | English |
|---|---|
| За (фракционно) | In favour (bloc) |
| Против (фракционно) | Against (bloc) |
| Воздержались | Abstained |
| Часть фракции против | Faction split |
| Не голосовали (тактика) | Did not vote (tactical) |
| Партии не было в Думе | Party not yet in the Duma |

### Party Modal Labels

| Russian | English |
|---|---|
| Партия | Party |
| Лидер фракции | Faction leader |
| мест в Думе | seats in the Duma |
| поддержки ограничений | support for restrictions |
| «за» из N ограничительных законов | voted in favour of N restrictive laws |
| случаев фракционного отступления | instances of faction deviation |
| Что декларирует и что делает | Declared positions vs. actual voting |
| Риторика | Rhetoric |
| Реальные голосования | Actual voting record |
| Портрет | Profile |
| Случаи отступления от провластной линии | Instances of deviation from the pro-government line |
| Официальный сайт | Official website |

### Law Modal Labels

| Russian | English |
|---|---|
| Что это значит | What this means |
| Как голосовали фракции | How each faction voted |
| Авторы и инициаторы | Authors and sponsors |
| Инициатор | Sponsor |
| Цитаты с трибуны | Quotes from the floor |
| Что важно знать | Key notes |
| Источники | Sources |
| Итог III чтения: за N · против N · возд. N | Third-reading result: for N · against N · abstained N |

### Section Labels and Headings (recurring)

| Russian | English |
|---|---|
| О методике | Methodology |
| Как читать этот отчёт | How to read this report |
| Опорные источники | Key sources |
| Источники, оговорки и ограничения | Sources, caveats and limitations |
| Об авторе и позиции | About the author and editorial position |
| О критериях источников | Source criteria |
| Главная карта | Main map |
| Матрица голосований | Voting matrix |
| Пять портретов | Five profiles |
| Главный парадокс | The central paradox |
| Свободы — единый блок. Социалка — настоящий конфликт. | On freedoms — a united bloc. On social policy — a real conflict. |
| Цифровые и гражданские свободы | Digital and civil freedoms |
| Социально-экономическая политика | Socio-economic policy |
| Поддержка ограничений интернета и свобод | Support for internet and freedom restrictions |
| Поддержка ограничительной соцполитики | Support for restrictive social policy |
| Хроника | Chronicle |
| Семь лет, пять цветов | Seven years, five colours |
| Динамика по годам | Trends by year |
| Семь лет в столбик | Seven years in bar form |
| Выводы | Conclusions |
| Что показывают цифры | What the numbers show |
| Главный паттерн | The central pattern |
| Что это значит для избирателя | What this means for voters |
| О методике (в разных разделах) | Methodology note |

### `vybory.html` Section Labels

| Russian | English |
|---|---|
| Раздел сайта | Site section |
| Расчёты с первоисточниками | Calculations from primary sources |
| 01 · Деформация на старте | 01 · Distortion at the start |
| Голоса не равны местам | Votes do not equal seats |
| 02 · Главный механизм | 02 · The main mechanism |
| 225 округов, 198 — ЕР | 225 districts, 198 — UR |
| «Победитель забирает всё» | "Winner takes all" |
| 03 · Барьер 5% | 03 · The 5% threshold |
| 04 · Лепестковая нарезка | 04 · Petal-shaped districting |
| География против демографии | Geography versus demography |
| 05 · Электронное голосование | 05 · Electronic voting |
| ДЭГ — последний штрих | DEG — the final touch |
| 06 · Двойники, паровозы, фильтр | 06 · Dopplegangers, locomotive candidates, and the filter |
| 06b · Кейс Надеждин 2024 | 06b · The Nadezhdin case, 2024 |
| 07 · Метод Шпилькина | 07 · The Shpilkin method |
| Когда математика видит аномалии | When mathematics sees anomalies |
| 08 · Админресурс и бюджетники | 08 · Administrative resources and state employees |
| 09 · Голоса самой власти | 09 · The authorities' own voices |
| 10 · Калькулятор сценариев | 10 · Scenario calculator |
| 11 · Лестница большинств | 11 · Majority ladder |
| 12 · История изменений 2005–2025 | 12 · History of electoral changes 2005–2025 |
| Спорная оценка · нажмите, чтобы открыть | Contested estimate · click to expand |
| Оценка реальной поддержки | Estimated real support |
| Реальный пример — посчитаем сами | A worked example — let's calculate |
| Подробно | Detailed explanation |

### `tsenzura.html` Section Labels

| Russian | English |
|---|---|
| Открытые источники | Open-source data |
| Главное противоречие | The central contradiction |
| Декларация и архитектура | Declaration and architecture |
| Официальная формула | Official rationale |
| Фактическая архитектура | Actual architecture |
| 01 · Карта противоречий | 01 · Map of contradictions |
| 18 сюжетов, в которых архитектура шире цели | 18 cases where implementation exceeds the stated goal |
| 02 · VPN | 02 · VPN |
| Сословный VPN | Tiered-access VPN |
| 03 · SIM-карты, БПЛА | 03 · SIM cards, drones |
| Антидроновая логика частично реальна | The anti-drone logic is partly real |
| 04 · Белые списки | 04 · Whitelists |
| Переворот логики интернета | A reversal of internet logic |
| 05 · Meta, YouTube, Discord, MAX | 05 · Meta, YouTube, Discord, MAX |
| 06 · Провалы по заявленной цели | 06 · Failures by the stated metric |
| 07 · Четыре уровня правоприменения | 07 · Four tiers of enforcement |
| 08 · Международное сравнение | 08 · International comparison |
| 09 · Хронология 2021–2026 | 09 · Timeline 2021–2026 |
| Этическая рамка | Ethical framing note |

### Selectivity Cards (Four Enforcement Tiers)

| Russian | English |
|---|---|
| Высшие чиновники и силовики | Senior officials and security services |
| Госкомпании и крупный бизнес | State-owned enterprises and large businesses |
| Частные пользователи | Private users |
| Иноагенты | Foreign agents |

### Feedback Widget (`feedback.js`)

| Russian | English |
|---|---|
| Предложить идею или сообщить об ошибке | Suggest an idea or report an error |
| Обратная связь | Feedback |
| Идея или замечание? | An idea or a comment? |
| Сообщение придёт автору сайта как issue в открытом GitHub-репозитории. Регистрация не нужна. | Your message will be sent to the site author as an issue in the public GitHub repository. No registration required. |
| Что предлагаете или что не так? | What would you like to suggest, or what is wrong? |
| Контакт (необязательно) | Contact (optional) |
| Минимум 10 символов, максимум 5000. Поддерживается Markdown. | Minimum 10 characters, maximum 5 000. Markdown supported. |
| Email, Telegram, ник на GitHub — если хотите ответ | Email, Telegram, or GitHub username — if you would like a reply |
| Важно. | Important. |
| Сообщение становится публичным GitHub issue | Your message will become a public GitHub issue |
| Не оставляйте паролей, личных данных и конфиденциальной информации. | Do not include passwords, personal data, or confidential information. |
| Отправить | Submit |
| Отправляем… | Submitting… |
| Отправлено | Submitted |
| Спасибо. Сообщение получено. | Thank you. Message received. |
| Создан issue | Issue created |
| в репозитории. Автор увидит его и сможет отреагировать. | in the repository. The author will see it and be able to respond. |
| Закрыть | Close |
| Слишком быстро — попробуйте ещё раз. | Too fast — please try again. |
| Сообщение слишком короткое — минимум 10 символов. | Message too short — minimum 10 characters. |
| Сообщение слишком длинное — максимум 5000 символов. | Message too long — maximum 5 000 characters. |
| Не получилось отправить | Failed to send |
| Сетевая ошибка. Проверьте подключение и попробуйте снова. | Network error. Please check your connection and try again. |

### Intro Popup (`intro.js`)

| Russian | English |
|---|---|
| Для читателя | For readers |
| Для стрима / эфира | For streamers / broadcasts |
| Об этом материале | About this content |
| Обращение автора | Author's note |
| независимое исследование на основе открытых данных | independent research based on open-source data |
| Каждое фактическое утверждение сопровождается ссылкой на первоисточник | Every factual claim is accompanied by a link to the primary source |
| О позиции автора | About the author's position |
| не политолог и не социолог | not a political scientist or sociologist |
| экспериментальный проект | experimental project |
| аналитика по публичным данным, а не политическая агитация | analysis of public data, not political agitation |
| О критериях источников | Source criteria |
| первичные документы | primary documents |
| Материал носит информационно-просветительский характер. | This material is for informational and educational purposes. |
| Понятно | Understood / Got it |
| скопировать обращение | Copy the author's note |
| ✓ скопировано | ✓ Copied |
| Исходники сайта | Site source code |

### `noscript` Messages

| Russian | English |
|---|---|
| JavaScript отключён. Текстовые разделы доступны; интерактивная матрица голосований, модалки партий и графики недоступны. | JavaScript is disabled. Text sections are accessible; the interactive voting matrix, party modals, and charts are unavailable. |
| JavaScript отключён. Текстовые разделы и таблицы доступны полностью; интерактивный калькулятор и графики (heatmap, лестница большинств) недоступны. | JavaScript is disabled. Text sections and tables are fully accessible; the interactive calculator and charts (heatmap, majority ladder) are unavailable. |
| JavaScript отключён. Текстовые разделы и числа доступны полностью; интерактивные виджеты (карта противоречий, threat-model, калькулятор) недоступны. | JavaScript is disabled. Text sections and statistics are fully accessible; interactive widgets (map of contradictions, threat model, calculator) are unavailable. |

### Skip Link and Accessibility

| Russian | English |
|---|---|
| К содержанию | Skip to content |
| Разделы сайта | Site sections |
| Закрыть | Close |
| (aria-label on modal close button) | Close |

### Footer

| Russian | English |
|---|---|
| Об этом отчёте | About this report |
| Все данные собраны из публичных источников. Этот отчёт — не партийная агитация, а попытка показать реальную картину голосований без интерпретаций. | All data are drawn from public sources. This report is not party propaganda but an attempt to present a factual picture of voting records without editorial spin. |
| Лицензия: CC BY 4.0. Можно копировать, изменять, переиспользовать со ссылкой на источник. | Licence: CC BY 4.0. May be copied, modified, and reused with attribution. |
| Официальные источники | Official sources |
| Голосования ГД | Duma voting records |
| Сайты партий | Party websites |
| обновлено | updated |

### `vybory.html` Calculator Outputs

| Russian | English |
|---|---|
| Дней ограничений | Days of restrictions |
| Базовая ставка ущерба, ₽/день | Base damage rate, ₽/day |
| Региональный коэффициент | Regional coefficient |
| Москва (1,0) | Moscow (1.0) |
| Уральский ФО (0,6) | Ural Federal District (0.6) |
| Северо-Кавказский ФО (0,3) | North Caucasus Federal District (0.3) |
| Малый регион (0,15) | Small region (0.15) |
| Доля бизнеса, завязанного на мобильный интернет | Share of business dependent on mobile internet |
| Минимум ущерба бизнесу | Minimum business loss |
| Максимум ущерба бизнесу | Maximum business loss |

### Heatmap Legend Labels (`heatmap.js`)

| Russian | English |
|---|---|
| Нет даже простого | No simple majority |
| Простое большинство | Simple majority |
| Конституционное (⅔) | Constitutional majority (⅔) |
| Сверх (¾) | Super-majority (¾) |

---

## 9. Tricky Cases and Open Questions

1. **"Фейки"** — The Russian law uses "фейки" (fake news) as a legal term. Two EN rendering options: (a) **"false information"** (closer to the legal text of Art. 207.3 Criminal Code), or (b) **"fake news"** (in quotes, matching the informal register). The site uses "фейки" colloquially throughout. Recommendation: use "false information" in law-card formal fields (`title`, `fzCode`, `summary`); use "fake news" (with quotes) in descriptive prose, matching the slightly sardonic register of the original. **Needs editorial decision.**

2. **"Справедливая Россия — За правду" short form** — Internationally Meduza EN, OVD-Info EN, and Reuters use "A Just Russia" and routinely drop "For Truth". However, the post-2021 merger with Prilepin's "Za Pravdu" party is factually significant for the site's argument (it made the faction more loyal). Recommendation: use "A Just Russia — For Truth" on first mention; "A Just Russia (SR)" thereafter; note the 2021 merger in the party profile. **Needs editorial decision on whether to preserve the full name.**

3. **"Иноагент" — Translation scope** — The term is politically loaded in Russian; the US origin (FARA) gave it a pejorative connotation when applied to journalists, academics, and activists. EN "foreign agent" carries its own US-FARA connotation that is not identical. Some EN outlets use "foreign-funded outlet" (softer) or keep "inoagent" (transliterated) as an untranslatable Russian concept. OVD-Info and Meduza EN use "foreign agent". **Recommendation: use "foreign agent" throughout but consider a one-line explanatory note on first appearance in the `/en/` intro text.**

4. **"Дискредитация ВС РФ"** — The law uses "discrediting" (дискредитация), which sounds weaker in EN than the actual use (prosecuted for anti-war statements, social-media posts). Some journalists translate as "bringing into disrepute". "Discrediting the Russian Armed Forces" is the most literal rendering. **Flag: does not fully convey the breadth of prosecution scope.**

5. **"Суверенный Рунет"** — The phrase sounds almost ironic in Russian tech circles. In EN "sovereign Runet" preserves that ambiguity. "Sovereign internet law" is flatter but more readable to non-specialist readers. Both are used internationally. **Recommendation: "sovereign Runet" in short-form headings, "sovereign internet law" in expository prose.**

6. **ЛГБТ-движение как экстремистское** — The Russian Supreme Court designated the "LGBT movement" as extremist in 2023. In EN, writing "LGBT movement" without qualification could read as endorsing that designation. Standard Western practice (HRW, Amnesty): "the so-called LGBT 'movement', designated as extremist by Russian courts" or simply noting the designation. **Recommendation: on first reference in the EN version, add "(designated extremist by Russia's Supreme Court in 2023)" to the phrase "LGBT movement".**

7. **"Бюджетники" as a voting bloc** — There is no precise EN equivalent of this Russian socio-political category. "Public-sector employees" is functionally correct but loses the Russian connotation (of institutional pressure on these employees to vote a certain way). Consider a gloss: "public-sector employees (a significant portion of whom face institutional voting pressure)". **May require a brief explanatory note in the EN version of the admin-resource section.**

8. **"Паровоз" (locomotive candidate) rendering** — The Russian metaphor is vivid; "locomotive candidate" is the established EN translation in comparative politics literature. However, the English idiom "to carry the ticket" covers the same concept. On the site, the vybory.html section on this technique lists real historical examples (Lavrov, Shoigu, Yarovaya). Use "locomotive candidate" as the consistent term with a one-line gloss: "a high-profile candidate who heads the party list to attract votes, then relinquishes the seat."

9. **"Цифровой концлагерь"** — A polemical Russian phrase ("digital concentration camp") that appears in a quote context (critics of the digital-rouble law). When translating quotes containing this phrase, render literally: "digital concentration camp" — do not soften to "digital surveillance state". The editorial rules require maintaining the original valence of quotes.

10. **Names in `DIGITAL_TIMELINE` events** — The `digital-events.js` file contains ~30+ timeline events, each with a `title` and `summary` string, plus `details` (multi-paragraph). These are the largest single block of prose translation work on the site. Each entry needs: translated `title`, `summary`, and `details`. The `details` field can run to 3–5 sentences with technical DPI/ISP vocabulary. Flag for a dedicated digital-rights translation pass.

11. **"ДЭГ" abbreviation rendering** — "DEG" (from Russian initials) is not self-explanatory in EN. Options: (a) always spell out "online voting (DEG)" on first use and use "DEG" thereafter; (b) replace with "e-voting" throughout; (c) use "remote electronic voting (REV)". Meduza EN and Western academic sources use "online voting" or "e-voting". **Recommendation: "online voting (Russian: ДЭГ)" on first mention, "online voting" or "DEG" subsequently. Needs editorial decision.**

12. **"Лестница большинств" title** — Literally "ladder of majorities"; could also be "majority ladder" or "majority thresholds ladder". The `MAJORITY_THRESHOLDS` data uses EN labels already: "Простое большинство / Конституционное / Сверх". Those internal labels need EN translations (provided in §8 above). The section title: "Majority Ladder" is the cleanest.

---

## 10. Inventory Summary Table

| File path | Category | Approx. translatable strings | Complexity notes |
|---|---|---|---|
| `index.html` | HTML | ~120 | Title, meta description, OG/Twitter tags, noscript, skip-link, nav, hero, all section headings + body paragraphs, legend, filter buttons, footer, modal skeleton aria-labels. Multi-paragraph body prose in methodology/author/sources sections. |
| `vybory.html` | HTML | ~200 | Title, meta, noscript, nav, hero, 12 section headings + body, DEG table headers, calculator labels, heatmap legend, counterfactual labels, majority-threshold labels, Nadezhdin case table, expert-quote attribution lines, numerous `method-note` blocks. |
| `tsenzura.html` | HTML | ~180 | Title, meta, noscript, nav, hero, 9 section headings + body prose, contradiction-matrix column headers, VPN asymmetry panel, whitelist diagrams, calculator labels, threat-matrix legend, international comparison table headers, timeline section labels. |
| `assets/js/data/laws.js` | Data | ~18 law entries × 6 fields | Each law has: `title`, `shortTitle`, `summary`, `fullDescription` (multi-paragraph), `initiator`, `authors[]`, `note`, `quotes[]`. `fullDescription` blocks are the most complex (300–500 chars each, with bullet lists). Total ~18 000 chars of prose. |
| `assets/js/data/parties.js` | Data | 5 party entries × 5 fields | `summary`, `rhetoric`, `reality` per party. Medium complexity; culturally loaded. |
| `assets/js/data/social-laws.js` | Data | 4 entries × 2 fields | `title`, `shortTitle`, `summary`, `note`. Low volume, low complexity. |
| `assets/js/data/elections.js` | Data | ~100 strings | `POWER_QUOTES` (9 quotes, Russian source only — need `textTranslation`), `SYSTEM_HISTORY` (13 entries × 3 fields), `MAJORITY_THRESHOLDS` (3 entries × 3 fields), `SYSTEM_COUNTERFACTUALS` (5 entries), `BUDGETNIKI` labels, `DEG_FLIPS_2021` district names + candidate names + notes (8 entries). |
| `assets/js/data/digital-events.js` | Data | ~35 timeline events × 3 fields | Each event has `title`, `summary`, `details`. `details` is typically 2–5 sentences with technical DPI/ISP/legal vocabulary. Estimated ~20 000 chars total. High complexity: requires digital-rights domain knowledge. |
| `assets/js/data/digital-numbers.js` | Data | 4 hero-number entries × 2 fields | `label` and `source` per entry. Low volume. Numbers and currency symbols stay as-is. |
| `assets/js/data/contradictions.js` | Data | 18 contradiction entries × 4 fields + 9 filter tags | Each entry: `declared`, `actual`, `contradiction`, `detail`. `detail` is 3–6 sentences with legal references. Tags: 9 short labels. Estimated ~15 000 chars. High complexity. |
| `assets/js/data/threat-matrix.js` | Data | 8 threat rows + 4 countermeasure cols + cell tooltips | `THREAT_ROWS[].label` (8 strings), `THREAT_COLS[].label` (4 strings), cell `tip` strings (32 tooltips). Medium complexity; technical threat-model vocabulary. |
| `assets/js/data/digital-quotes.js` | Data | 10 quotes × 3 fields | `text`, `author`, `context` for VPN/drone/Discord quotes. Quotes need `textTranslation` field; `context` needs full EN translation. Medium complexity. |
| `assets/js/data/digital-sources.js` | Data | ~40 source entries | `cat` labels (7 categories), `name` strings. Per editorial rule §4, source names (СОЗД, РБК etc.) stay in Cyrillic in EN too. Only category labels need translation. Low volume. |
| `assets/js/data/digital-platforms.js` | Data | 3 messenger entries × 1 field + YouTube timeline | `note` per messenger (medium-length descriptive string). YouTube timeline labels: `estimated` flag text. Low-medium volume. |
| `assets/js/data/digital-fraud.js` | Data | Chart marker labels (4) | `ANTIFRAUD_MARKERS[].label`. Short strings. Low volume. |
| `assets/js/data/whitelist.js` | Data | Date/label strings (7) | `label` per data point (month abbreviations). Low volume. |
| `assets/js/data/intl-comparison.js` | Data | ~15 strings | `FON_LEADERBOARD` country names (13, already in Russian — need EN), `REG_COMPARE` framework names and scope descriptions (6 entries), `SELECTIVITY_LAYERS` (4 entries × 3 fields). Medium complexity. |
| `assets/js/lib/dom.js` | UI/lib | 13 strings | `VOTE_LABELS` (6), `VOTE_FULL` (6), `CAT_LABELS` (2). Low volume; high visibility — these labels appear in every vote cell and tooltip across the entire matrix. |
| `assets/js/lib/intro.js` | UI/lib | ~30 strings (hardcoded in template literal) | Multi-paragraph intro disclaimer (reader + streamer modes), tab labels, button labels, copy-toast. The "streamer" mode text is an informal personal letter — translation must preserve colloquial register. High cultural complexity. |
| `assets/js/lib/feedback.js` | UI/lib | ~25 strings | Form labels, error messages, success messages, placeholder text. Medium volume, standard UX vocabulary. |
| `assets/js/lib/tooltip.js` | UI/lib | 0 strings | No hardcoded user-visible text; uses `VOTE_FULL` from dom.js. |
| `assets/js/lib/spoiler.js` | UI/lib | 0 strings | No user-visible text; aria attributes only (handled at HTML level). |
| `assets/js/lib/counter.js` | UI/lib | 0 strings | No user-visible text; uses `ru-RU` locale for number formatting — needs to switch to `en-GB` in EN version. **Flag: locale code in counter.js is hardcoded as `'ru-RU'` and must be parameterised.** |
| `assets/js/lib/reading-progress.js` | UI/lib | 0 strings | No user-visible text. |
| `assets/js/lib/scroll-steps.js` | UI/lib | 0 strings | No user-visible text. |
| `assets/js/lib/page-toggle-ping.js` | UI/lib | 0 strings | No user-visible text. |
| `assets/js/components/matrix.js` | Component | 0 strings | Uses globals from `dom.js` and `LAWS`/`PARTIES`. |
| `assets/js/components/law-modal.js` | Component | ~10 strings | `modal-section-label` values: "Что это значит", "Как голосовали фракции", "Авторы и инициаторы", "Инициатор:", "Цитаты с трибуны", "Что важно знать", "Источники". Also the `Итог III чтения:` summary line. Medium visibility. |
| `assets/js/components/party-modal.js` | Component | ~12 strings | Party header labels, stat labels, rhetoric/reality labels, "Официальный сайт", "Случаи отступления от провластной линии", no-deviation message. Medium visibility. |
| `assets/js/components/party-cards.js` | Component | Reads from `PARTIES` data | No hardcoded strings beyond what PARTIES supplies. |
| `assets/js/components/comparison-bars.js` | Component | Reads from `PARTIES`/`SOCIAL_LAWS` | No hardcoded user-visible strings. |
| `assets/js/components/timeline.js` | Component | Reads from `LAWS` data | No hardcoded user-visible strings. |
| `assets/js/components/contradiction-matrix.js` | Component | ~6 strings | Column headers: "№", "Декларируется", "Реализуется", "Противоречие". aria-label template string. Also uses `CONTRADICTION_TAGS[].label`. |
| `assets/js/components/threat-matrix.js` | Component | ~4 state labels | `labels` object: "Закрывает", "Частично", "Не закрывает", "Побочный ущерб". Also aria-label templates. High visibility in threat-matrix. |
| `assets/js/components/digital-numbers.js` | Component | Reads from `DIGITAL_HERO_NUMBERS` | No hardcoded strings. |
| `assets/js/components/digital-timeline.js` | Component | Filter/kind labels | Timeline kind labels: 'law', 'tech', 'event', 'statement' — these may be rendered as chips or legend items; check implementation for hardcoded labels. |
| `assets/js/components/digital-sources.js` | Component | Category filter labels (7) | Source categories: 'law', 'tech', 'rights', 'biz', 'state', 'state-media', 'indep', 'expert' — likely rendered as filter chips or section headers. |
| `assets/js/components/digital-modal.js` | Component | Modal section labels | Will contain modal section labels analogous to `law-modal.js`; inspect for hardcoded strings. |
| `assets/js/components/selectivity-cards.js` | Component | Reads from `SELECTIVITY_LAYERS` | No hardcoded strings. |
| `assets/js/charts/calculator.js` | Chart | ~15 strings | Calculator output labels, majority-threshold annotations, error/warning messages, chart axis labels. Medium volume. |
| `assets/js/charts/heatmap.js` | Chart | ~8 strings | Zone labels, legend text, axis header "P %\\Y", district abbreviation "окр.". |
| `assets/js/charts/ladder.js` | Chart | ~5 strings | `MAJORITY_THRESHOLDS` labels (sourced from data), "Сейчас у ЕР", counterfactual system names, history row format strings. |
| `assets/js/charts/shpilkin-chart.js` | Chart | Chart axis + legend strings | Depends on Chart.js config — check for hardcoded Russian labels in dataset/axis config. |
| `assets/js/charts/years-chart.js` | Chart | Chart axis + legend strings | Year axis is numeric; vertical axis label and legend may be hardcoded Russian. |
| `assets/js/charts/opposition-chart.js` | Chart | Chart axis + legend strings | Party names (from `PARTIES`), axis labels. |
| `assets/js/charts/distortion.js` | Chart | Chart axis + labels | "Голоса %", "Места %", party short names. |
| `assets/js/charts/waffle.js` | Chart | Legend labels | Waffle segments use labels from `elections.js` waffle segments array in `elections.js` (hardcoded in `pages/elections.js`). |
| `assets/js/charts/flow.js` | Chart | Flow label strings | Left/right column labels hardcoded in `elections.js` init code. |
| `assets/js/charts/gauge.js` | Chart | Label strings from caller | `label` property passed from `elections.js`: "мест в Думе у ЕР", "оценка реальной поддержки". |
| `assets/js/charts/vpn-growth.js` | Chart | Axis + legend strings | Check for hardcoded Russian axis labels. |
| `assets/js/charts/whitelist-growth.js` | Chart | Axis + legend strings | RKN/vc.ru series labels. |
| `assets/js/charts/messenger-comparison.js` | Chart | Axis + legend strings | Messenger names, metric labels (MAU/DAU/coverage). |
| `assets/js/charts/youtube-throttling.js` | Chart | Axis + legend strings | "Россия / Нидерланды" series labels; axis labels. |
| `assets/js/charts/fraud-vs-laws.js` | Chart | Axis + marker labels | Vertical marker labels from `ANTIFRAUD_MARKERS`; axis labels. |
| `assets/js/charts/drone-attacks.js` | Chart | Axis labels | Short chart. |
| `assets/js/charts/it-crime.js` | Chart | Axis labels | Short chart. |
| `assets/js/charts/child-suicide.js` | Chart | Axis labels + title | Short chart. |
| `assets/js/charts/freedom-on-net.js` | Chart | Country labels + axis labels | `FON_LEADERBOARD` country names (Russian); axis label. |
| `assets/js/charts/regulation-compare.js` | Chart | Column headers + boolean cell labels | `REG_COMPARE` framework scopes already in Russian; column headers ("Судебный надзор?", etc.) likely hardcoded. |
| `assets/js/charts/shutdown-cost-calc.js` | Chart | Calculator output strings | See calculator labels above. |
| `assets/js/pages/home.js` | Page init | 0 strings | No user-visible text. |
| `assets/js/pages/elections.js` | Page init | ~15 strings | Waffle-segment labels, flow labels, gauge labels, DEG table column format strings, waffle legend labels — hardcoded in the init function. |
| `assets/js/pages/tsenzura.js` | Page init | 0 strings | No user-visible text; all strings delegated to components. |

---

### Summary Notes on Scope

**Highest-priority translation surfaces (most visible, high reuse):**
1. `assets/js/lib/dom.js` — VOTE_LABELS, VOTE_FULL, CAT_LABELS (6+6+2 = 14 strings, appear everywhere)
2. `assets/js/lib/intro.js` — intro popup (first thing every user sees; culturally complex)
3. HTML `<title>`, `<meta description>`, OG/Twitter tags for all three pages
4. Nav labels and filter buttons in all three HTML files
5. Law modal and party modal component labels

**Largest prose translation blocks (need subject-matter knowledge):**
1. `assets/js/data/laws.js` — 18 `fullDescription` blocks (~18 000 chars)
2. `assets/js/data/digital-events.js` — 35 `details` fields (~20 000 chars)
3. `assets/js/data/contradictions.js` — 18 `detail` fields (~15 000 chars)
4. `index.html` and `vybory.html` body prose (methodology, paradox, conclusion sections)

**Localisation gotcha:** `counter.js` hardcodes `'ru-RU'` locale for number formatting (controls thousand separators and decimal points). This must be parameterised — either via a `window.LOCALE` global set per-page, or by passing the locale into a function — before the EN version can display numbers correctly.
