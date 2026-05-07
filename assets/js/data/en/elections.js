// EN translation of assets/js/data/elections.js
// Sync source: assets/js/data/elections.js
// Glossary: research/i18n_glossary_draft.md
// Editorial rules: research/i18n_locked_decisions.md

// Figure sources are listed in the footer of vybory.html.
// All data are official results of Russia's CEC (2021 State Duma elections)
// and estimates by independent researchers.
// In-depth analysis: research/vybory-mathematics-research.md

const ELECTION_2021 = {
  meta: {
    name: 'State Duma elections',
    year: 2021,
    turnout: 51.72,
    registered: 109_204_662, // registered on electoral rolls
    voted: 56_484_685,       // total ballots cast
    seatsTotal: 450,
    seatsList: 225,
    seatsDistrict: 225,
  },
  parties: [
    { code: 'ER', name: 'United Russia', short: 'UR', color: '#1A4584',
      pctList: 49.82, seatsList: 126, seatsDistrict: 198, total: 324 },
    { code: 'KPRF', name: 'CPRF', short: 'CPRF', color: '#CC0000',
      pctList: 18.93, seatsList: 48, seatsDistrict: 9, total: 57 },
    { code: 'SR', name: 'SRZP', short: 'SRZP', color: '#C71F1F',
      pctList: 7.46, seatsList: 19, seatsDistrict: 8, total: 27 },
    { code: 'LDPR', name: 'LDPR', short: 'LDPR', color: '#B8860B',
      pctList: 7.55, seatsList: 19, seatsDistrict: 2, total: 21 },
    { code: 'NL', name: 'New People', short: 'NL', color: '#5046E5',
      pctList: 5.32, seatsList: 13, seatsDistrict: 0, total: 13 },
    { code: 'OTHER', name: 'Independents and parties < 5%', short: 'oth.', color: '#8E887E',
      pctList: 0, seatsList: 0, seatsDistrict: 8, total: 8 },
  ],
  // Distribution of votes that did not reach the Duma in 2021:
  //   ~8.84% — for parties below the 5% threshold (see list below)
  //   ~2.08% — invalid / other
  // Total ≈10.92% not reflected in the final seat allocation.
  belowBarrier: [
    { name: 'Party of Pensioners', pct: 2.45 },
    { name: 'Yabloko', pct: 1.34 },
    { name: 'Communists of Russia', pct: 1.27 },
    { name: 'The Greens', pct: 0.92 },
    { name: 'Rodina', pct: 0.80 },
    { name: 'RPFJ', pct: 0.77 },
    { name: 'Green Alternative', pct: 0.64 },
    { name: 'Party of Growth', pct: 0.52 },
    { name: 'Civil Platform', pct: 0.15 },
  ],
};

// Shpilkin: estimates of "drawn" votes by election year
const SHPILKIN = [
  { year: 2011, kind: 'State Duma', anomalous: 14, official: 49.3, real: 30 },
  { year: 2016, kind: 'State Duma', anomalous: 10, official: 54.2, real: 40 },
  { year: 2018, kind: 'Presidential', anomalous: 10, official: 76.7, real: 67 },
  { year: 2020, kind: 'Constitutional amendments', anomalous: 22, official: 78.0, real: 65 },
  { year: 2021, kind: 'State Duma', anomalous: 13.8, official: 49.8, real: 32 },
  { year: 2024, kind: 'Presidential', anomalous: 22, official: 87.3, real: 80 },
];

// Moscow 2021: ALL EIGHT districts where opposition candidates led on paper ballots
// and lost after DEG (remote electronic voting) results were published.
// Source for figures: Mediazona raw data,
// https://raw.githubusercontent.com/mediazona/data-el2021-deg-moscow-singles/main/deg.json
// Fields: paper / deg / finalPct — three layers of voting.
// The eight: 6 CPRF candidates (Rashkin, Lobanov, Parfyonov, Udaltsova, Obukhov, Grebennik)
// + Bryukhanova (independent) + Mitrokhin (Yabloko). Tarantsov is NOT in this group —
// on paper he was not first (Romanenko led by ~650 votes).
const DEG_FLIPS_2021 = [
  {
    district: 'No. 197 Kuntsevsky',
    opposition: 'M. Lobanov (CPRF / Smart Voting)',
    winner: 'Ye. Popov (UR)',
    paper: { opposition: 46_129, winner: 34_305 },
    deg: { opposition: 26_676, winner: 46_589 },
    finalPct: { opposition: 31.65, winner: 35.17 },
    note: 'On paper Lobanov led by 11,800; in the DEG layer Popov reversed this with +19,900; final margin in his favour ~8,000.',
  },
  {
    district: 'No. 201 Nagatinsky',
    opposition: 'A. Udaltsova (CPRF)',
    winner: 'S. Razvorоtneva (UR)',
    paper: { opposition: 35_537, winner: 33_931 },
    deg: { opposition: 22_303, winner: 47_733 },
    finalPct: { opposition: 25.3, winner: 35.72 },
    note: 'On paper Udaltsova led by 1,606 votes; in the DEG layer Razvorotneva received an additional +25,400.',
  },
  {
    district: 'No. 198 Leningradsky',
    opposition: 'A. Bryukhanova (independent)',
    winner: 'G. Khovanskaya (SRZP, backed by the mayor\'s office)',
    paper: { opposition: 32_405, winner: 30_500 },
    deg: { opposition: 23_359, winner: 38_459 },
    finalPct: { opposition: 23.28, winner: 28.78 },
    note: 'On paper Bryukhanova led by ~1,900; in the DEG layer Khovanskaya received an additional +15,000.',
  },
  {
    district: 'No. 196 Babushkinsky',
    opposition: 'V. Rashkin (CPRF)',
    winner: 'T. Bazhenov (UR)',
    paper: { opposition: '38 357 (~33.3% of valid paper ballots)', winner: '36 719 (~31.9%)' },
    deg: { opposition: '~17.3% in DEG layer', winner: '~46.6% in DEG layer' },
    finalPct: { opposition: 24.53, winner: 38.4 },
    note: 'Final percentages are calculated from all ballots; paper percentages from valid ballots only. Two months later Rashkin lost his mandate over an elk-poaching case.',
  },
  {
    district: 'No. 208 Tsentralny',
    opposition: 'S. Mitrokhin (Yabloko)',
    winner: 'O. Leonov (independent → NL)',
    paper: { opposition: 32_184, winner: 26_174 },
    deg: { opposition: 15_631, winner: 31_331 },
    finalPct: { opposition: 21.85, winner: 26.28 },
    note: 'A petal-shaped constituency — central Moscow was outweighed by industrial south-eastern districts + DEG.',
  },
  {
    district: 'No. 200 Medvedkovsky',
    opposition: 'D. Parfyonov (CPRF)',
    winner: 'D. Pevtsov (independent → NL)',
    paper: { opposition: 34_538, winner: 32_133 },
    deg: { opposition: 23_504, winner: 52_460 },
    finalPct: { opposition: 26.23, winner: 38.23 },
    note: 'On paper Parfyonov led by ~2,400; in the DEG layer Pevtsov received an additional +29,000.',
  },
  {
    district: 'No. 205 Preobrazhenskoye',
    opposition: 'S. Obukhov (CPRF)',
    winner: 'A. Vasserman (independent → SRZP)',
    paper: { opposition: 34_398, winner: 32_831 },
    deg: { opposition: 19_575, winner: 42_431 },
    finalPct: { opposition: 24.15, winner: 33.68 },
    note: 'On paper Obukhov led by 1,567 votes; DEG gave Vasserman an additional +22,900.',
  },
  {
    district: 'No. 206 Tushinsky',
    opposition: 'A. Grebennik (CPRF)',
    winner: 'A. Mazhuga (UR)',
    paper: { opposition: 35_105, winner: 29_886 },
    deg: { opposition: 21_476, winner: 49_469 },
    finalPct: { opposition: 24.78, winner: 34.76 },
    note: 'On paper Grebennik led by 5,200; DEG gave Mazhuga an additional +28,000 votes.',
  },
];


// Doppelganger candidates — the St Petersburg 2021 case: three "Boris Vishnevskys" on one ballot
const DOUBLES_CASE = {
  original: 'Boris Lazarevich Vishnevsky (Yabloko)',
  doubles: [
    'Viktor Ivanovich Bykov, who changed his name to "Boris Ivanovich Vishnevsky" (aide to United Russia deputies in the St Petersburg Legislative Assembly)',
    'Alexei Shmelyov, who renamed himself "Boris Gennadyevich Vishnevsky"',
  ],
  trick: 'In the district election commission posters all three appeared with identical beards and hairstyles. Neither doppelganger was removed from the ballot.',
  outcome: 'B. L. Vishnevsky lost. Pamfilova: "This is simply a disgrace, an outrage… the lowest point ever reached by the political technologists who serve their clients."',
};

// "Deal" constituencies — where UR deliberately fielded no candidate.
// Of the 5 winning independents, only Reznik and Babashov joined the UR faction;
// Pevtsov and Leonov joined the New People faction; Vasserman joined SRZP.
const DEAL_DISTRICTS_2021 = [
  { district: 'Tambov region', winner: 'Alexei Zhuravlyov', party: '"Rodina"' },
  { district: 'Bashkortostan', winner: 'Rifat Shaikhutdinov', party: '"Civil Platform"' },
  { district: 'St Petersburg 217', winner: 'Oksana Dmitrieva', party: 'Party of Growth' },
  { district: 'St Petersburg', winner: 'Yelena Drапeko', party: 'SRZP' },
  { district: 'Adygea', winner: 'Vladislav Reznik', party: 'independent → UR faction' },
  { district: 'Crimea', winner: 'Leonid Babashov', party: 'independent → UR faction' },
];

// Locomotive candidates — top 5 of the UR party list 2021
const LOCOMOTIVES_2021 = [
  { name: 'Sergei Shoigu', role: 'Defence Minister', tookSeat: false },
  { name: 'Sergei Lavrov', role: 'Foreign Minister', tookSeat: false },
  { name: 'Anna Kuznetsova', role: "Children's Ombudsman", tookSeat: true },
  { name: 'Denis Protsenko', role: 'Chief physician, Kommunarka hospital', tookSeat: false },
  { name: 'Yelena Shmelyova', role: 'Sirius educational centre', tookSeat: false },
];

// Public-sector employees and budget-dependent Russians
const BUDGETNIKI = [
  { label: 'MVD (Ministry of Internal Affairs)', count: 938_856, source: 'as of 1 Jan 2025' },
  { label: 'Armed Forces', count: 2_389_130, source: 'Putin decree 16.09.2024 (1.5 million service personnel)' },
  { label: 'School teachers', count: 1_250_000, source: 'Rosstat' },
  { label: 'Nursery/kindergarten staff', count: 625_000, source: 'Rosstat' },
  { label: 'Physicians', count: 758_800, source: 'Rosstat' },
  { label: 'Nurses', count: 1_470_000, source: 'Rosstat' },
  { label: 'Civil servants', count: 978_990, source: 'Rosstat, end of 2022' },
  { label: 'Russian Railways (employees)', count: 700_000, source: '~700,000' },
  { label: 'Gazprom Group', count: 498_100, source: 'Interfax' },
  { label: 'Rosneft', count: 320_000, source: '~320,000' },
];

// Party funding: roubles per vote received, per year (Article 33, Federal Law No. 95-FZ)
const PARTY_FUNDING_2024 = [
  { party: 'UR', total: 10_900, budget: 4_270, donations: 4_550, fees: 298, loans: 1_560 },
  { party: 'CPRF', total: 1_600, budget: 1_376, donations: 200, fees: 24, loans: 0 },
  { party: 'LDPR', total: 741, budget: 644, donations: 80, fees: 17, loans: 0 },
  { party: 'SRZP', total: 755, budget: 634, donations: 100, fees: 21, loans: 0 },
  { party: 'NL', total: 495, budget: 456, donations: 30, fees: 9, loans: 0 },
];

// Quotes from those in power
const POWER_QUOTES = [
  {
    author: 'Vyacheslav Volodin',
    role: 'Speaker of the State Duma',
    text: 'Нельзя, будучи во власти, при этом быть ей же в оппозиции',
    textTranslation: 'You cannot be in power while simultaneously being in opposition to it.',
    context: 'Открытие VIII созыва, 12.10.2021',
    contextTranslation: 'Opening of the 8th convocation, 12 October 2021',
    source: 'duma.gov.ru/news/52348/',
  },
  {
    author: 'Vyacheslav Volodin',
    role: 'First Deputy Head of the Presidential Administration (2014)',
    text: 'Есть Путин — есть Россия, нет Путина — нет России',
    textTranslation: 'There is Putin — there is Russia; no Putin — no Russia.',
    context: 'Валдайский клуб, октябрь 2014',
    contextTranslation: 'Valdai Club, October 2014',
    source: 'https://www.rbc.ru/politics/24/10/2014/544a640ecbb20fc19f9f6fda',
  },
  {
    author: 'Ella Pamfilova',
    role: 'CEC Chair',
    text: 'Категорически против применения на выборах технологии ДЭГ выступают люди с пещерным сознанием',
    textTranslation: 'Those who are categorically opposed to the use of DEG (remote electronic voting) in elections are people with a cave-dweller mentality.',
    context: 'ТАСС, 20.07.2021',
    contextTranslation: 'TASS, 20 July 2021',
    source: 'https://tass.ru/politika/11941697',
  },
  {
    author: 'Ella Pamfilova',
    role: 'CEC Chair',
    text: 'Это просто позорище, безобразие… крайняя, низшая точка падения тех политтехнологов, которые обслуживают заказчиков',
    textTranslation: 'This is simply a disgrace, an outrage… the lowest point ever reached by the political technologists who serve their clients.',
    context: 'О двойниках Вишневского, Коммерсантъ FM',
    contextTranslation: 'On the Vishnevsky doppelgangers, Kommersant FM',
    source: 'kommersant.ru/doc/4975934',
  },
  {
    author: 'Ella Pamfilova',
    role: 'CEC Chair',
    text: 'Правда в том, что система переголосования предполагала целый ряд опций, которые вызвали недоверие к ДЭГ',
    textTranslation: 'The truth is that the re-voting system included a range of options that undermined trust in DEG.',
    context: 'Постфактум, 16.03.2022 (после критики)',
    contextTranslation: 'Post-factum statement, 16 March 2022 (following criticism)',
    source: 'interfax.ru/russia/828499',
  },
  {
    author: 'Andrei Turchak',
    role: 'Secretary-General of the UR General Council',
    text: 'Дорогие друзья, позвольте мне поздравить всех вас с чистой и честной победой',
    textTranslation: 'Dear friends, allow me to congratulate you all on a clean and honest victory.',
    context: 'Интерфакс, 19.09.2021',
    contextTranslation: 'Interfax, 19 September 2021',
    source: 'interfax.ru',
  },
  {
    author: 'Andrei Turchak',
    role: 'Secretary-General of the UR General Council',
    text: 'Для «Единой России» единый день голосования 2020 года — это генеральная репетиция выборов в Госдуму',
    textTranslation: 'For United Russia, the 2020 unified voting day is a full dress rehearsal for the State Duma elections.',
    context: 'ТАСС, 13.09.2020',
    contextTranslation: 'TASS, 13 September 2020',
    source: 'tass.ru',
  },
  {
    author: 'Dmitry Reut',
    role: 'Deputy Chair, Moscow City Election Commission',
    text: 'Нравится это Зюганову или нет, избиратели в Москве сделали именно такой выбор',
    textTranslation: 'Whether Zyuganov likes it or not, voters in Moscow made exactly this choice.',
    context: 'Ответ КПРФ по ДЭГ Москвы 2021',
    contextTranslation: 'Response to CPRF over Moscow DEG results, 2021',
    source: 'rbc.ru/rbcfreenews/614875969a79478b835010f7',
  },
  {
    author: 'Andrei Lugovoy',
    role: 'LDPR deputy; lead reporter of the foreign-agent law',
    text: 'Попытки концептуально раскритиковать законопроект считаю неконструктивными, а в нынешних политических условиях считаю их просто обыкновенным предательством',
    textTranslation: 'I regard attempts to criticise the bill on a conceptual level as unconstructive, and in the current political climate I consider them simply ordinary treason.',
    context: 'Дума, июнь 2022',
    contextTranslation: 'State Duma, June 2022',
    source: 'https://www.kommersant.ru/doc/5393609',
  },
];

// History of electoral-system changes, 2005–2024
const SYSTEM_HISTORY = [
  { year: 2005, fz: '№ 51-ФЗ', what: 'Fully proportional system; 7% threshold', effect: 'Elimination of the single-mandate threat' },
  { year: 2006, fz: '№ 107-ФЗ', what: 'Abolition of the "against all" ballot option', effect: 'Protest vote made impossible' },
  { year: 2006, fz: '№ 225-ФЗ', what: 'Abolition of the minimum-turnout threshold', effect: 'Elections deemed valid regardless of turnout' },
  { year: 2011, fz: '—', what: 'Threshold reduced from 7% to 5% (from 2016)', effect: 'Nominal liberalisation while the system remained intact' },
  { year: 2012, fz: '№ 40-ФЗ', what: 'Restoration of gubernatorial elections with municipal filter', effect: 'Managed competition' },
  { year: 2014, fz: '№ 20-ФЗ', what: 'Restoration of the mixed system: 225 + 225 seats', effect: 'The principal multiplier of distortion' },
  { year: 2015, fz: 'Пост. ЦИК 304/1740-6, ФЗ № 300-ФЗ', what: 'Petal-shaped constituency delimitation', effect: 'Urban protest vote diluted' },
  { year: 2020, fz: '№ 154-ФЗ, 152-ФЗ', what: 'Introduction of DEG (remote electronic voting)', effect: 'Opaque results channel' },
  { year: 2020, fz: '№ 267-ФЗ', what: 'Three-day voting period + at-home voting', effect: 'Reduced observability' },
  { year: 2021, fz: '№ 89-ФЗ', what: 'Labelling requirement for candidates affiliated with foreign agents', effect: 'Stigmatisation' },
  { year: 2021, fz: '№ 157-ФЗ', what: 'Bar on those "linked to extremism" standing as candidates (law targeting FBK)', effect: 'Elimination of Smart Voting' },
  { year: 2024, fz: '№ 99-ФЗ', what: 'Requirement to renounce foreign-agent status before registering as a candidate; restrictions on observers and authorised representatives', effect: 'Whole category of candidates barred' },
  { year: 2025, fz: '№ 107-ФЗ', what: 'New constituency delimitation for 2026–2030', effect: 'Reproduction of the petal-shaped model' },
];

// Majority thresholds in the State Duma — requirements for different decisions
const MAJORITY_THRESHOLDS = [
  { seats: 226, label: 'Simple majority', what: 'Adoption of federal laws, budget, vote of no confidence in the government', article: 'Art. 105 § 2' },
  { seats: 300, label: 'Constitutional majority (⅔)', what: 'Federal constitutional laws, amendments to Chapters 3–8 of the Constitution, overriding a presidential veto, impeachment', article: 'Art. 108, 136, 105 § 5' },
  { seats: 338, label: 'Super-majority (¾)', what: 'Extremely rare cases (Federation Council threshold for constitutional amendments)', article: 'Art. 136' },
];

// Counterfactual comparison: what would have happened under different systems
// (2021 election, same 49.82% vote share for UR)
const SYSTEM_COUNTERFACTUALS = [
  { name: 'Pure proportional — no threshold', seats: 224, pct: 49.8, note: 'Not even a simple majority' },
  { name: 'Pure proportional — 5% threshold', seats: 252, pct: 56.0, note: 'Simple majority; no constitutional majority' },
  { name: 'Mixed 225 + 225 (actual 2021)', seats: 324, pct: 72.0, isReal: true, note: 'Constitutional majority' },
  { name: '+ 2 independents who joined the UR faction', seats: 326, pct: 72.4, note: 'Constitutional majority (including affiliated members)' },
  { name: 'Pure majoritarian (88% of districts)', seats: 396, pct: 88.0, note: 'Super-constitutional majority' },
];

// Key sources (for the vybory.html footer) — extended list
const ELECTION_SOURCES = [
  { cat: 'Law', name: 'ФЗ № 20-ФЗ (22.02.2014) — возврат смешанной системы', url: 'http://www.kremlin.ru/acts/bank/38146' },
  { cat: 'Law', name: 'ФЗ № 40-ФЗ (02.05.2012) — мунфильтр', url: 'https://base.garant.ru/70169404/' },
  { cat: 'Law', name: 'ФЗ № 154-ФЗ (23.05.2020) — ДЭГ и почтовое голосование', url: 'https://base.garant.ru/74060096/' },
  { cat: 'Law', name: 'ФЗ № 267-ФЗ (31.07.2020) — голосование до трёх дней', url: 'http://publication.pravo.gov.ru/Document/View/0001202007310034' },
  { cat: 'Law', name: 'ФЗ № 157-ФЗ (04.06.2021) — запрет «причастным к экстремизму»', url: 'http://www.kremlin.ru/acts/bank/46795' },
  { cat: 'Law', name: 'ФЗ № 99-ФЗ (15.05.2024) — иноагенты вне выборов', url: 'https://publication.pravo.gov.ru/document/0001202405150026' },
  { cat: 'Law', name: 'ФЗ № 95-ФЗ — финансирование партий, 152 ₽/голос', url: 'https://base.garant.ru/183523/79232c367b45a2128d6a8d7ae0217075/' },
  { cat: 'CEC', name: 'ЦИК РФ — итоги Госдумы 2021', url: 'http://www.cikrf.ru/analog/ediny-den-golosovaniya-2021/p_itogi/' },
  { cat: 'CEC', name: 'Постановление ЦИК 304/1740-6 (02.09.2015) — нарезка округов 2016–2025', url: 'http://cikrf.ru/activity/docs/postanovleniya/27656/' },
  { cat: 'CEC', name: 'ЦИК — сведения по одномандатным округам', url: 'http://www.cikrf.ru/analog/ediny-den-golosovaniya-2021/kategorii-viborov/vibori-deputatov-gosdumi/svedeniya-ob-odnomandatnykh-izbiratelnykh-okrugakh/svedeniya/' },
  { cat: 'Analysis', name: 'Любарев / Electoral Politics — стат. характеристики 2021', url: 'https://electoralpolitics.org/ru/articles/statisticheskie-kharakteristiki-vyborov-v-gosudarstvennuiu-dumu-2021-goda/' },
  { cat: 'Analysis', name: '«Голос» — нарезка округов и герримендеринг', url: 'https://golosinfo.org/articles/54731' },
  { cat: 'Analysis', name: '«Голос» — 22 млн голосов вброшено за Путина в 2024', url: 'https://golosinfo.org/articles/146796' },
  { cat: 'Analysis', name: 'Новая газета — Шпилькин о 14 млн аномальных голосов 2021', url: 'https://novayagazeta.ru/articles/2021/09/21/shpilkin-edinaia-rossiia-poluchila-14-mln-anomalnykh-golosov-bez-falsifikatsii-partiia-vlasti-nabiraet-31-33-news' },
  { cat: 'Analysis', name: 'iStories — 22 млн фальсифицированных голосов за Путина 2024', url: 'https://istories.media/news/2024/03/18/pochti-22-mln-golosov-poluchennikh-vladimirom-putinim-bili-sfalsifitsirovani-podschitali-vazhnie-istorii-po-metodu-shpilkina/' },
  { cat: 'Analysis', name: 'Meduza — «Самые нечестные выборы в истории России»', url: 'https://meduza.io/feature/2024/03/20/eto-byli-samye-nechestnye-vybory-v-istorii-rossii' },
  { cat: 'Media', name: 'РБК — переворот результата Кунцевского округа №197', url: 'https://www.rbc.ru/rbcfreenews/614793d19a794741288c0037' },
  { cat: 'Media', name: 'РБК — расхождения ДЭГ Москва-2021', url: 'https://www.rbc.ru/politics/20/09/2021/61482aa19a7947645b86be50' },
  { cat: 'Media', name: 'Коммерсантъ — итоги выборов 2021 по одномандатным округам', url: 'https://www.kommersant.ru/doc/4994681' },
  { cat: 'Media', name: 'Коммерсантъ — ДЭГ-расхождения, Нагатинский округ', url: 'https://www.kommersant.ru/doc/4996309' },
  { cat: 'Media', name: 'Фонтанка — двойники Вишневского', url: 'https://www.fontanka.ru/2021/07/17/70030205/' },
  { cat: 'Media', name: 'РГ — Лавров и Шойгу не приняли мандаты', url: 'https://rg.ru/2021/09/29/cik-lavrov-i-shojgu-ne-priniali-dumskie-mandaty.html' },
  { cat: 'Academic', name: 'Levitsky & Way — Competitive Authoritarianism', url: 'https://scholar.harvard.edu/files/levitsky/files/SL_elections.pdf' },
  { cat: 'Academic', name: 'В. Гельман — Rise & Decline of Electoral Authoritarianism in Russia', url: 'https://eusp.org/sites/default/files/archive/M_center/503-522_Gelman.pdf' },
];
