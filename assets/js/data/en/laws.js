// EN translation of assets/js/data/laws.js
// Sync source: assets/js/data/laws.js
// Glossary: research/i18n_glossary_draft.md
// Editorial rules: research/i18n_locked_decisions.md

// Vote values — 'za' (in favour), 'against' (against), 'abstain' (abstained),
// 'partial-against' (part of faction against), 'didnt-vote' (tactical non-attendance),
// 'absent' (party not in the Duma), 'unanimous' (entire faction unanimous)

const LAWS = [
  {
    id: '608767-7',
    year: 2019,
    date: '16.04.2019',
    title: 'Sovereign Runet',
    shortTitle: 'Sovereign Runet',
    fzCode: 'ФЗ № 90-ФЗ',
    category: 'digital',
    severity: 5,
    summary: 'Created the infrastructure for centralised control of Runet: installation of DPI equipment at telecommunications operators, with the capability to block traffic and "disconnect from the global internet" by order of Roskomnadzor.',
    fullDescription: `The law established the technical and legal framework for centralised control over internet traffic in Russia. Telecommunications operators are required to install specialist DPI (Deep Packet Inspection) equipment — the TSPU (deep-packet-inspection infrastructure for traffic filtering) — operated by Roskomnadzor (Russia's federal media and telecommunications regulator).

What this means for ordinary people: the state acquired the technical capability to block any websites, protocols (including VPN) and applications at the level of backbone networks — without the involvement of operators. In the event of "threats to stability", the sovereign Runet (law on internet sovereignty) can be disconnected from the global internet.

The cost of the infrastructure runs to tens of billions of roubles, borne by operators and the state budget.`,
    authors: ['Andrei Klishas (Federation Council)', 'Lyudmila Bokova (Federation Council)', 'Andrei Lugovoy (LDPR)'],
    initiator: 'Formally a cross-faction initiative; in practice developed by the Presidential Administration',
    votes: {
      ER: 'za',
      KPRF: 'against',
      LDPR: 'didnt-vote',
      SR: 'partial-against',
      NL: 'absent',
    },
    voteResults: { za: 307, against: 68, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/608767-7' },
      { name: 'Pravo.ru', url: 'https://pravo.ru/news/210856/' },
      { name: 'Roskomsvoboda', url: 'https://roskomsvoboda.org/46530/' },
      { name: 'Fontanka', url: 'https://www.fontanka.ru/2019/04/15/077/' },
    ],
    quotes: [
      {
        author: 'Zhirinovsky (LDPR)',
        text: 'попытка установления контроля над интернетом',
        textTranslation: 'an attempt to establish control over the internet',
        context: 'в письме Роскомсвободе',
        contextTranslation: 'in a letter to Roskomsvoboda',
      },
      {
        author: 'Sergei Ivanov (LDPR)',
        text: 'пакет приведёт к коллапсу интернета',
        textTranslation: 'the package will lead to the collapse of the internet',
        context: 'выступление с трибуны',
        contextTranslation: 'speech from the floor',
      },
    ],
    note: 'This was the last vote (before the 2025 VPN law) at which the opposition genuinely resisted digital restrictions.',
  },
  {
    id: '606595-7',
    year: 2019,
    date: '07.03.2019',
    title: 'Klishas Package: fake news and disrespect for authority',
    shortTitle: 'Klishas Package',
    fzCode: 'ФЗ № 27-ФЗ и др.',
    category: 'digital',
    severity: 4,
    summary: 'Fines of up to 1.5 million roubles for "unreliable socially significant information" and up to 300,000 roubles for "disrespect towards state symbols and government bodies"; extrajudicial blocking on the orders of the Prosecutor General.',
    fullDescription: `Four related laws introduced:

• Fines of up to 1.5 million roubles for publishing 'false information' of public significance. The blocking decision is extrajudicial — issued at the request of the Prosecutor General.

• Fines of up to 300,000 roubles for "disrespect towards state symbols, the Constitution and government bodies". Up to 15 days' administrative arrest for repeat offences.

What this means for ordinary people: for the first time in Russian legislation, legal constructs were introduced under which an ordinary social-media post could cost hundreds of thousands of roubles. The concept of "disrespect" is determined by the court on a case-by-case basis.`,
    authors: ['Andrei Klishas (Federation Council)', 'Dmitry Vyatkin (UR)'],
    initiator: 'Federation Council, UR',
    votes: {
      ER: 'za',
      KPRF: 'against',
      LDPR: 'against',
      SR: 'against',
      NL: 'absent',
    },
    voteResults: { za: 322, against: 78, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД (606593-7)', url: 'https://sozd.duma.gov.ru/bill/606593-7' },
      { name: 'СОЗД ГД (606595-7)', url: 'https://sozd.duma.gov.ru/bill/606595-7' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/13/03/2019/5c88dac19a79478c5ee98b52' },
      { name: 'Roskomsvoboda', url: 'https://roskomsvoboda.org/en/44508/' },
    ],
    quotes: [
      {
        author: 'Sergei Ivanov (LDPR)',
        text: 'пакет Клишаса приведёт к коллапсу интернета',
        textTranslation: 'the Klishas package will lead to the collapse of the internet',
      },
    ],
    note: 'The second and last episode in the 2019–2024 period with a coherent opposition from three factions.',
  },
  {
    id: '1057914-7',
    year: 2020,
    date: '23.12.2020',
    title: 'Foreign agents — individuals',
    shortTitle: 'Foreign agents — individuals',
    fzCode: 'ФЗ № 481-ФЗ',
    category: 'civil',
    severity: 5,
    summary: 'Extension of the grounds for designating private individuals as "foreign agents". Criminal liability for failure to comply with labelling requirements.',
    fullDescription: `The law enabled the foreign agent designation to be applied to ordinary citizens — journalists, activists, bloggers, academics. It is sufficient to have "received funds or other support from abroad" (including income from Google AdSense, a fee for an article in a foreign outlet, or a grant).

Consequences for a person assigned this status:
• Mandatory labelling of all publications (even personal social-media posts)
• Mandatory financial reporting every three months
• Criminal liability for "persistent" failure to fulfil obligations
• Prohibition on civil service, teaching, and simplified tax arrangements

What this means for ordinary people: the foreign-agent register became a tool of political pressure. By 2025 it contained over 600 individuals.`,
    authors: ['A group of deputies from United Russia (UR)'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'absent',
    },
    voteResults: { za: 389, against: 1, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/1057914-7' },
      { name: 'Lenta.ru', url: 'https://lenta.ru/news/2020/12/23/inoagentu/' },
      { name: 'API стенограммы', url: 'http://api.duma.gov.ru/api/transcript/1057914-7' },
    ],
    quotes: [],
    note: 'Passed with 389 in favour, 1 against, 60 did not vote — the single dissenting deputy has not been publicly identified.',
  },
  {
    id: '1176731-7',
    year: 2021,
    date: '17.06.2021',
    title: '"Landing" requirement for foreign IT companies',
    shortTitle: 'Landing of IT companies',
    fzCode: 'ФЗ № 236-ФЗ',
    category: 'digital',
    severity: 3,
    summary: 'Foreign internet services with a daily Russian audience of more than 500,000 users are required to open a local office in Russia; failure to comply results in blocking, throttling, or an advertising ban.',
    fullDescription: `Foreign internet services (Google, Meta, X/Twitter, TikTok, and others) that reach 500,000 Russian daily users are required to:
• Open a legal presence ("branch") in Russia
• Register in a dedicated Roskomnadzor register
• Create a contact form for citizen complaints

Non-compliance triggers: an advertising ban on the platform, throttling, and partial or full blocking.

What this means for ordinary people: a mechanism of pressure on foreign platforms was created, up to and including their blocking. By 2025 it had been applied against Meta (Facebook and Instagram are blocked), X (blocked), Discord (blocked), and Viber (blocked).`,
    authors: ['Alexander Khinshtein (UR)', 'Sergei Boyarsky (UR)', 'Maxim Kudryavtsev (UR)', 'Alexander Yushchenko (CPRF)'],
    initiator: 'UR, with a co-author from the CPRF',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'absent',
    },
    voteResults: { za: 'единогласно', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/1176731-7' },
      { name: 'Forbes', url: 'https://www.forbes.ru/newsroom/biznes/432451-gosduma-prinyala-zakon-o-prizemlenii-inostrannyh-it-gigantov' },
      { name: 'Habr', url: 'https://habr.com/ru/news/563278/' },
      { name: 'Interfax', url: 'https://www.interfax.ru/russia/772581' },
    ],
    quotes: [],
    note: 'The law was supported by all four factions of the 7th convocation. There was virtually no public criticism from the opposition.',
  },
  {
    id: '80714-8',
    year: 2022,
    date: '04.03.2022',
    title: 'Criminal penalties for false information about the army',
    shortTitle: 'Army "fake news" law',
    fzCode: 'ФЗ № 32-ФЗ',
    category: 'civil',
    severity: 5,
    summary: 'New articles introduced: Article 207.3 of the Criminal Code (up to 15 years for false information about the Russian Armed Forces), Article 280.3 CC (\'discrediting\' the army), Article 284.2 CC (calls for sanctions). Passed in a single day.',
    fullDescription: `Passed in a single day — 4 March 2022, one week after the start of military operations in Ukraine.

Criminal articles introduced:
• Article 207.3 CC — "public dissemination of knowingly false information" about the actions of the Russian Armed Forces. Up to 15 years' imprisonment.
• Article 280.3 CC — "public actions aimed at 'discrediting'" (a charge prosecuting ordinary anti-war social-media posts) the use of the Russian Armed Forces. Up to 7 years.
• Article 284.2 CC — "calls for the imposition of sanctions". Up to 5 years.

What this means for ordinary people: any publication (including a repost, comment, placard, like, or song) that does not conform to the official Ministry of Defence position on the conduct of the "special military operation" formally falls under a criminal article. By 2025, over 1,500 criminal cases and tens of thousands of administrative cases had been opened under these articles.`,
    authors: ['A group of deputies from all five factions'],
    initiator: 'UR, with the support of all factions',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 401, against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/80714-8' },
      { name: 'Interfax', url: 'https://www.interfax.ru/russia/826193' },
      { name: 'Sostav.ru', url: 'https://www.sostav.ru/publication/gosduma-53052.html' },
      { name: 'Radio Svoboda', url: 'https://www.svoboda.org/a/gosduma-edinoglasno-odobrila-zakonoproekt-nakazyvayuschiy-za-feyki-o-rossiyskoy-armii/31735641.html' },
    ],
    quotes: [
      {
        author: 'Yuri Sinelshchikov (CPRF)',
        text: 'надежда, что закон не будет применяться к журналистам',
        textTranslation: 'hope that the law will not be applied to journalists',
        context: 'фракция при этом голосовала «за»',
        contextTranslation: 'the faction voted in favour nonetheless',
      },
    ],
    note: 'All five factions voted unanimously in favour, including New People. One of the defining votes of the convocation.',
  },
  {
    id: '122131-8',
    year: 2022,
    date: '29.06.2022',
    title: 'Unified Foreign Agents Law',
    shortTitle: 'Foreign agents law',
    fzCode: 'ФЗ № 255-ФЗ',
    category: 'civil',
    severity: 5,
    summary: 'Consolidated five registers. Foreign-agent status can now be assigned without foreign funding — on the basis of "foreign influence". Prohibitions include: teaching, civil service, and organising public assemblies.',
    fullDescription: `The law consolidated all categories of "foreign agents" (NGOs, media outlets, private individuals, unregistered associations, and affiliated structures) into a single register. The key innovation: status can be assigned without any foreign funding — on the basis of "foreign influence", a concept defined in extremely vague terms.

Prohibitions for foreign agents:
• Teaching in schools and universities
• Civil service
• Organising public assemblies
• Receiving state support and grants
• Simplified tax arrangements
• The right to stand for election (introduced by a separate law in 2024)

What this means for ordinary people: anyone who publicly expresses an opinion at odds with the official position, and has any "contacts" with foreigners, may potentially receive the designation.`,
    authors: ['Andrei Lugovoy (LDPR, lead rapporteur)', 'A group of deputies'],
    initiator: 'Cross-faction (UR, LDPR, SR)',
    votes: {
      ER: 'za',
      KPRF: 'partial-against',
      LDPR: 'za',
      SR: 'za',
      NL: 'abstain',
    },
    voteResults: { za: 346, against: 17, abstain: 18 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/122131-8' },
      { name: 'Pravo.ru', url: 'https://pravo.ru/news/241566/' },
      { name: 'Forbes', url: 'https://www.forbes.ru/society/470121-gosduma-prinala-raskritikovannyj-spc-zakon-ob-inoagentah' },
      { name: 'Interfax', url: 'https://www.interfax.ru/russia/845163' },
    ],
    quotes: [
      {
        author: 'Andrei Lugovoy (LDPR)',
        text: 'попытки концептуально раскритиковать законопроект считаю предательством',
        textTranslation: 'I regard any attempt to criticise the bill on its merits as an act of betrayal',
      },
      {
        author: 'Ksenia Goryacheva (New People)',
        text: 'три чтения — и мы все рискуем стать иноагентами',
        textTranslation: 'three readings — and we all risk becoming foreign agents',
      },
    ],
    note: 'A rare case in which the CPRF voted against as a bloc and New People abstained. By the second reading, all factions, with the exception of individual deputies, had supported the law.',
  },
  {
    id: '156017-8',
    year: 2022,
    date: '05.12.2022',
    title: 'Ban on protests near schools and government buildings',
    shortTitle: 'Protest ban',
    fzCode: 'ФЗ № 498-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Banned public assemblies near railway stations, schools, hospitals, and government buildings. Extended restrictions to solo pickets.',
    fullDescription: `The law banned public events (rallies, pickets, demonstrations) near:
• Buildings of state and municipal authorities
• Schools, kindergartens, and hospitals
• Railway stations, airports, and ports
• Religious sites

In practice this amounts to a ban on almost any rally in the centre of any city. Police powers to disperse "mass simultaneous gatherings of citizens" were also extended — a concept that can be applied even to a queue of people holding solo pickets.`,
    authors: ['Dmitry Vyatkin (UR)'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'единогласно', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/156017-8' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/05/07/2022/62c460189a7947875d758561' },
    ],
    quotes: [],
    note: 'All five factions voted unanimously in favour.',
  },
  {
    id: '217471-8',
    year: 2022,
    date: '24.11.2022',
    title: 'Ban on LGBT "propaganda" for all age groups',
    shortTitle: 'Ban on LGBT "propaganda"',
    fzCode: 'ФЗ № 478-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Ban on "propaganda of non-traditional sexual relations" for all age groups; fines of up to 5 million roubles; blocking of online content.',
    fullDescription: `An extension of the 2013 ban on "propaganda among minors" to all age groups. Prohibited:
• "Propaganda of non-traditional relations" in any form (books, films, advertising, social media)
• Depictions liable to "arouse interest" in such relations
• Dissemination of information about gender reassignment

Fines: up to 400,000 roubles for individuals, up to 5 million roubles for legal entities; for foreign nationals — deportation.

What this means for ordinary people: censorship affected thousands of books, films, television series, and musical works. Publishers are self-censoring classical literature.`,
    authors: ['Co-authored by 390 deputies, including the leaders of all five factions (Vasilyev, Zyuganov, Slutsky, Mironov, Nechayev)'],
    initiator: 'All five factions',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'единогласно', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/217471-8' },
      { name: 'Известия', url: 'https://iz.ru/1430548/2022-11-24/gosduma-priniala-zakon-o-zaprete-propagandy-lgbt-pedofilii-i-smeny-pola' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/21/11/2022/637b686f9a794714323fc01b' },
      { name: 'Forbes', url: 'https://www.forbes.ru/society/481552-gosduma-prinala-zakon-o-polnom-zaprete-propagandy-lgbt' },
    ],
    quotes: [
      {
        author: 'Nina Ostanina (CPRF)',
        text: 'предложила добавить уголовную ответственность',
        textTranslation: 'proposed adding criminal liability',
        context: 'критика «недостаточной жёсткости»',
        contextTranslation: 'a critique of "insufficient severity"',
      },
    ],
    note: 'The only public dissent was from Ksenia Goryacheva (New People), who did not sign the initiative.',
  },
  {
    id: '200645-8',
    year: 2023,
    date: '28.04.2023',
    title: 'Life sentence for state treason',
    shortTitle: 'Life sentence for treason',
    fzCode: 'ФЗ № 56-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Life imprisonment for state treason (Article 275 CC); up to 20 years for terrorist acts and sabotage.',
    fullDescription: `Toughening of sentences under the Criminal Code articles on state crimes:
• Article 275 CC (state treason) — life imprisonment (previously up to 20 years)
• Article 205 CC (terrorist act) — up to 20 years
• Article 281 CC (sabotage) — up to 20 years

Expanded scope: state treason can now encompass the passing of any information "in foreign interests", including work as a journalist.`,
    authors: ['A group of deputies from United Russia (UR)'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'единогласно', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/200645-8' },
      { name: 'ТАСС', url: 'https://tass.ru/obschestvo/17640125' },
      { name: 'Известия', url: 'https://iz.ru/1505650/2023-04-28/putin-podpisal-zakon-o-pozhiznennom-zakliuchenii-za-gosizmenu' },
    ],
    quotes: [],
    note: 'Unanimous across all factions.',
  },
  {
    id: '270838-8',
    year: 2023,
    date: '11.07.2023',
    title: 'Digital rouble',
    shortTitle: 'Digital rouble',
    fzCode: 'ФЗ № 339-ФЗ',
    category: 'digital',
    severity: 3,
    summary: 'A third form of the national currency, issued by the Central Bank. All transactions are technically visible to the Bank of Russia.',
    fullDescription: `Introduction of a "third form of the rouble" — the digital rouble. The issuer is the Bank of Russia. Technically, each coin carries a unique identifier; all transactions are tracked.

State capabilities:
• Full transparency of citizen and business transactions
• "Earmarked" money (for example, welfare payments that can only be spent on specified goods)
• The ability to automatically block or revoke funds

What this means for ordinary people: with wide-scale introduction (from 2025–2026), financial privacy will disappear. Social-rating systems linked to spending patterns become technically feasible.`,
    authors: ['Anatoly Aksakov (A Just Russia – For Truth), chair of the financial markets committee'],
    initiator: 'A Just Russia – For Truth (Aksakov), with the support of UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'единогласно', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД (270838-8)', url: 'https://sozd.duma.gov.ru/bill/270838-8' },
      { name: 'СОЗД ГД (270852-8)', url: 'https://sozd.duma.gov.ru/bill/270852-8' },
      { name: 'Гарант', url: 'https://www.garant.ru/hotlaw/federal/1637235/' },
    ],
    quotes: [],
    note: 'The law was supported by all factions. Criticism of a "digital concentration camp" appeared only in the commentary of individual Communists (Rashkin), but not in the vote.',
  },
  {
    id: '387593-8',
    year: 2023,
    date: '26.07.2023',
    title: 'Regulation of recommendation algorithms',
    shortTitle: 'Algorithms',
    fzCode: 'ФЗ № 408-ФЗ',
    category: 'digital',
    severity: 2,
    summary: 'Platforms are required to disclose their recommendation rules; Roskomnadzor may block a resource for lack of transparency.',
    fullDescription: `The law obliges all information resources (social networks, marketplaces, and aggregators) using recommendation algorithms to publish the rules governing those algorithms and to inform users which data are used to generate recommendations.

Non-compliance results in blocking by order of Roskomnadzor, without a court ruling.

What this means for ordinary people: formally, greater transparency. In practice, yet another instrument of pressure on platforms — primarily foreign ones.`,
    authors: ['Anton Gorelkin (UR)'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'partial-against',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'большинство', against: 8, abstain: 1 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/387593-8' },
      { name: 'Forbes', url: 'https://www.forbes.ru/tekhnologii/491560-strana-sovetov-kak-deputat-gorelkin-nameren-regulirovat-rekomendatel-nye-algoritmy' },
      { name: 'Гарант', url: 'https://www.garant.ru/news/1648907/' },
    ],
    quotes: [],
    note: '8 votes against, 1 abstention. The main opponents were individual CPRF deputies (Vyacheslav Makhayev); there was no unified faction-level vote against.',
  },
  {
    id: '533912-8',
    year: 2024,
    date: '31.01.2024',
    title: 'Asset confiscation for false information about the army',
    shortTitle: 'Confiscation for "fake news"',
    fzCode: 'ФЗ № 11-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Enables the confiscation of property under articles covering false information about the army, rehabilitation of Nazism, and calls for sanctions.',
    fullDescription: `The law permits the confiscation of assets (flats, cars, bank accounts, and business stakes) from those convicted under:
• Article 207.3 CC — false information about the army
• Article 280.3 CC — 'discrediting' the armed forces
• Article 280.4 CC — calls for extremism
• Article 354.1 CC — rehabilitation of Nazism

Confiscation extends to property that was "used" or "obtained as a result" of the offence — an interpretation applied broadly.

What this means for ordinary people: the extension of Article 207.3 CC to include confiscation means that an anti-war social-media post could result in losing one's home.`,
    authors: ['Leaders of all factions except New People: Vasilyev, Zyuganov, Slutsky, Mironov'],
    initiator: '4 of 5 faction leaders signed as co-authors',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'abstain',
    },
    voteResults: { za: 395, against: 3, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/533912-8' },
      { name: 'Vedomosti', url: 'https://www.vedomosti.ru/politics/articles/2024/01/25/1016646-gosduma-prinyala-v-pervom-chtenii-zakonoproekt-o-konfiskatsii' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/19/01/2024/65aa5db19a7947009b9afbb3' },
      { name: 'Известия', url: 'https://iz.ru/1636489/2024-01-18/v-gosdume-razrabotan-zakonoproekt-o-lishenii-imushchestva-za-feiki-o-vs-rf' },
      { name: 'Коммерсантъ', url: 'https://www.kommersant.ru/doc/6480296' },
    ],
    quotes: [
      {
        author: 'New People press office',
        text: 'размытые понятия в законопроекте могут вызвать злоупотребления, отъём собственности, сведение счётов',
        textTranslation: 'the vague concepts in the bill could lead to abuses, asset seizure, and settling of scores',
      },
      {
        author: 'Volodin (UR)',
        text: 'закон о негодяях, поимённое голосование пообещал учесть на переизбрании',
        textTranslation: 'a law about scoundrels; he promised that the roll-call vote would be taken into account at the time of re-election',
        context: 'угроза депутатам, голосовавшим против',
        contextTranslation: 'a threat to deputies who voted against',
      },
    ],
    note: 'One of two episodes in 2022–2025 in which New People broke with unanimous voting. Avksentyeva and Goryacheva (New People), and Shargunov (CPRF) voted against in the first reading.',
  },
  {
    id: '553750-8',
    year: 2024,
    date: '28.02.2024',
    title: 'Ban on advertising by foreign agents',
    shortTitle: 'Advertising ban for foreign agents',
    fzCode: 'ФЗ № 42-ФЗ',
    category: 'civil',
    severity: 3,
    summary: 'Ban on placing advertising on the resources of foreign agents and on advertising them in the media.',
    fullDescription: `The law prohibited:
• Placing advertising on any resource (websites, YouTube channels, social-media pages) belonging to persons designated as foreign agents
• Advertising foreign agents themselves and their products in the media

What this means for ordinary people: stripping foreign agents of the ability to earn advertising revenue — an economic pressure that supplements the legal pressure.`,
    authors: ['Co-authored by 395 deputies from all factions except New People'],
    initiator: 'Cross-faction (UR, CPRF, LDPR, SR)',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'большинство', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/553750-8' },
      { name: 'Гарант', url: 'https://www.garant.ru/news/1686000/' },
      { name: 'РГ', url: 'https://rg.ru/2024/03/11/putin-podpisal-zakon-o-zaprete-reklamy-u-inoagentov.html' },
    ],
    quotes: [],
    note: 'New People did not sign as co-authors but voted in favour.',
  },
  {
    id: '487583-8',
    year: 2024,
    date: '06.05.2024',
    title: 'Ban on foreign agents standing for election',
    shortTitle: 'Foreign agents banned from elections',
    fzCode: 'ФЗ № 102-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Foreign agents are banned from standing for election at any level.',
    fullDescription: `Persons designated as foreign agents (even without foreign funding) are barred from standing for any elected office — from municipal deputy to president.

What this means for ordinary people: foreign-agent status becomes an instrument of political disqualification. An opinion on international affairs that differs from the official position may be sufficient grounds for potentially losing one's right to stand for election.`,
    authors: ['A group of deputies from all factions'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'единогласно', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/487583-8' },
      { name: 'РИА Новости', url: 'https://crimea.ria.ru/20240506/inoagentam-zapretili-uchastvovat-v-vyborakh--gosduma-prinyala-popravki-1137076400.html' },
      { name: 'Pravo.ru', url: 'https://pravo.ru/news/252883/' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/06/05/2024/6638a8609a79472c01075a2c' },
    ],
    quotes: [],
    note: 'Third reading 06.05.2024 — unanimous. In the Federation Council, only Lyudmila Narusova (Людмила Нарусова) voted against.',
  },
  {
    id: '647048-8',
    year: 2024,
    date: '30.07.2024',
    title: 'Deanonymisation of bloggers and SIM cards',
    shortTitle: 'Blogger register',
    fzCode: 'ФЗ № 303-ФЗ',
    category: 'digital',
    severity: 4,
    summary: 'Bloggers with an audience exceeding 10,000 subscribers are required to submit their full name, phone number, and email address to Roskomnadzor. A limit of 20 SIM cards per Russian citizen, 10 per foreign national.',
    fullDescription: `The law created a public blogger register, maintained by Roskomnadzor. All owners of channels on social networks or messaging apps with an audience of more than 10,000 subscribers are required to:
• Submit full name, phone number, and email to RKN
• Obtain an identifier from the register
• Label their publications with that identifier

Without registration, advertising, donations, and reposts of the channel by others are prohibited.

An additional SIM-card limit was introduced: 20 per Russian citizen, 10 per foreign national. For foreign nationals, mandatory biometrics are required when purchasing a SIM.

What this means for ordinary people: anonymity on Telegram channels, YouTube, and other platforms has become legally impossible for popular authors.`,
    authors: ['Alexander Khinshtein (UR) and a group of deputies'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'большинство', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/647048-8' },
      { name: 'Forbes', url: 'https://www.forbes.ru/svoi-biznes/518013-pometki-i-strafy-sem-voprosov-o-novom-zakonoproekte-dla-blogerov' },
      { name: 'ComNews', url: 'https://www.comnews.ru/content/234550/2024-07-31/2024-w31/1007/gosduma-ogranichila-vydachu-sim-kart' },
      { name: 'Pgplaw', url: 'https://www.pgplaw.ru/analytics-and-brochures/alerts/prinyat-zakon-ob-obyazannosti-blogerov-s-auditoriey-bolee-10-000-polzovateley-soobshchat-svedeniya-o/' },
    ],
    quotes: [
      {
        author: 'Khinshtein (UR)',
        text: 'Робинзон Крузо не может подписываться "аборигеном"',
        textTranslation: 'Robinson Crusoe cannot sign himself "an aborigine"',
        context: 'защищая идею деанонимизации',
        contextTranslation: 'defending the idea of deanonymisation',
      },
      {
        author: 'Artyom Prokofyev (CPRF)',
        text: 'предложил сократить лимит SIM для мигрантов',
        textTranslation: 'proposed reducing the SIM limit for migrants',
        context: 'поправка отклонена; КПРФ голосовала «за»',
        contextTranslation: 'amendment rejected; CPRF voted in favour',
      },
    ],
    note: 'All five factions voted in favour.',
  },
  {
    id: '765128-8',
    year: 2024,
    date: 'December 2024',
    title: 'Special-purpose accounts for foreign agents',
    shortTitle: 'Foreign agent special accounts',
    fzCode: 'ФЗ № 414-ФЗ',
    category: 'civil',
    severity: 3,
    summary: 'Rouble-denominated special-purpose accounts for foreign agents; funds may only be accessed after the designation is lifted.',
    fullDescription: `All income earned in Russia by persons designated as foreign agents is now credited to special-purpose rouble accounts. Access to these funds is only possible after the foreign-agent designation has been officially lifted.

What this means for ordinary people: a de facto freeze on the finances of foreign agents within Russia. Many of them live abroad, so the economic effect is smaller than the political one.`,
    authors: ['A group of deputies'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'большинство', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/765128-8' },
      { name: 'Forbes', url: 'https://www.forbes.ru/society/527368-gosduma-prinala-zakon-o-rublevyh-specscetah-dla-vyplat-inoagentam' },
      { name: 'ОВД-Инфо', url: 'https://ovd.info/express-news/2024/11/14/v-gosdumu-vnesli-zakonoproekt-o-specschetakh-dlya-inoagentov-deputaty' },
      { name: 'Госдума', url: 'http://duma.gov.ru/news/60332/' },
    ],
    quotes: [],
    note: 'All five factions voted in favour.',
  },
  {
    id: '679980-8',
    year: 2025,
    date: '10.06.2025',
    title: 'National messenger MAX',
    shortTitle: 'MAX messenger',
    fzCode: 'ФЗ № 156-ФЗ',
    category: 'digital',
    severity: 5,
    summary: 'Created a "national multifunctional service" — the MAX application from VK, combining a messenger, digital ID, and government services. Mandatory pre-installation from 1 September 2025.',
    fullDescription: `The law established the legal framework for a "national digital service" — the MAX application (developed by VK), which combines:
• A messenger (as a potential replacement for WhatsApp/Telegram)
• A digital passport (replacing the physical document)
• An electronic signature
• Government-services and official chats
• School educational chats
• Age verification for alcohol and tobacco purchases
• Residential building (MKD) community chats

Mandatory pre-installation on all smartphones in Russia from 1 September 2025. By December 2025: blocking of voice calls in WhatsApp; a law enacted requiring all residential building community chats to move to MAX.

What this means for ordinary people: the creation of a single digital control centre. All communications, documents, and payments in one application, under state control.`,
    authors: ['A group of deputies from United Russia (UR)'],
    initiator: 'UR, coordinated with the Presidential Administration',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 407, against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/679980-8' },
      { name: 'Госдума', url: 'http://duma.gov.ru/news/62704/' },
      { name: 'Interfax', url: 'https://www.interfax.ru/russia/1030583' },
      { name: 'Парламентская газета', url: 'https://www.pnp.ru/social/sovet-federacii-odobril-zakon-o-sozdanii-nacionalnogo-cifrovogo-servisa.html' },
      { name: 'RTVI', url: 'https://rtvi.com/news/prinyat-zakon-o-naczionalnom-messendzhere-chto-eto-takoe-i-kak-budet-rabotat/' },
    ],
    quotes: [
      {
        author: 'Boyarsky (UR) on WhatsApp',
        text: 'может продолжать доживать свой век',
        textTranslation: 'it can carry on living out its days',
      },
    ],
    note: 'Third reading 10.06.2025: 407 in favour, unanimous. All five factions, including New People, voted in favour. A defining case of the gap between rhetoric and action.',
  },
  {
    id: 'fkz-2022-territories',
    year: 2022,
    date: '03.10.2022',
    title: 'Accession of the DNR, LNR, Zaporizhzhia, and Kherson oblasts',
    shortTitle: 'Accession of 4 regions',
    fzCode: 'ФКЗ № 5–8-ФКЗ',
    category: 'civil',
    severity: 5,
    summary: 'Four federal constitutional laws on the accession of new constituent entities to Russia. All 5 factions — 412/0/0, not a single vote against or abstention. The most unanimous vote of the 8th convocation.',
    fullDescription: `On 3 October 2022, the Duma passed four federal constitutional laws in a single day — on the accession to Russia of the DNR, LNR, Zaporizhzhia Oblast, and Kherson Oblast.

Vote on the DNR: 412 in favour, 0 against, 0 abstentions. The same result was recorded for each of the other three entities. Prior to the vote, Vyacheslav Volodin (Вячеслав Володин) held a meeting with faction leaders at which unanimous assent was agreed (Yaroslav Nilov, LDPR: "the vote will be unanimous across all factions").

This is the most unanimous vote of the 8th-convocation Duma — not one of the five factions recorded a single deviation. It is a key reference point for understanding "total unanimity".

A contrasting episode: on 15 February 2022, nine days before the start of the military operation, the Duma voted on a resolution to recognise the DNR/LNR — 351 in favour, 16 against, 1 abstention. Those voting against were predominantly from New People, who declared "the Russian people are not ready to pay for political games with their lives". After 24 February that position disappeared entirely.`,
    authors: ['Vladimir Putin (President)', 'Federation Council'],
    initiator: 'President',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 412, against: 0, abstain: 0 },
    sources: [
      { name: 'РБК', url: 'https://www.rbc.ru/politics/03/10/2022/633ae06f9a79475288ea3cbc' },
      { name: 'Lenta.ru', url: 'https://lenta.ru/news/2022/10/03/konstgd/' },
    ],
    quotes: [],
    note: '412/0/0 — the most unanimous vote of the 8th-convocation Duma. A key reference point: not one faction recorded a single deviation.',
  },
  {
    id: '361804-7',
    year: 2023,
    date: '11.04.2023',
    title: 'Electronic call-up notices and military service register',
    shortTitle: 'Electronic call-up notices',
    fzCode: 'ФЗ № 127-ФЗ',
    category: 'civil',
    severity: 5,
    summary: 'A unified digital military service register. A notice is deemed served 7 days after publication in the register. A ban on leaving Russia takes effect from the moment a notice is issued.',
    fullDescription: `The law created a unified digital military service register and a regime of electronic call-up notices. Key provisions:
• A notice is published in the register and deemed served after 7 days — regardless of whether the recipient has opened it
• From the moment the notice is published, the citizen is automatically barred from leaving Russia
• Failure to appear triggers staged restrictions: ban on driving, obtaining credit, registering as a sole trader, and conducting real-estate transactions

Third-reading vote on 11.04.2023: 394 in favour, 0 against, 1 abstention (Dmitry Kuznetsov (Дмитрий Кузнецов), A Just Russia – For Truth — who later said he "pressed the wrong button").

The CPRF (Nikolai Kolomeitsev (Николай Коломейцев), Artyom Prokofyev (Артём Прокофьев)) raised verbal objections to the procedure: 56 pages of amendments for the second reading were published just one and a half hours before the vote. New People (Sergei Chemeriz (Сергей Чемериз)) publicly expressed support: "the faction is progressive and supports digitalisation". In the end, all five factions voted in favour.

What this means for ordinary people: evading mobilisation becomes technically harder. A conscript does not need to sign a notice — it is automatically deemed served.`,
    authors: ['Andrei Kartapolov (UR)', 'Andrei Krasov (UR)'],
    initiator: 'UR, defence committee',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 394, against: 0, abstain: 1 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/361804-7' },
      { name: 'Фонтанка', url: 'https://www.fontanka.ru/2023/04/11/72212408/' },
    ],
    quotes: [
      {
        author: 'Chemeriz (New People)',
        text: 'фракция передовая, поддерживает цифровизацию',
        textTranslation: 'the faction is progressive and supports digitalisation',
        context: 'публичная поддержка от НЛ',
        contextTranslation: 'public endorsement from New People',
      },
      {
        author: 'Dmitry Kuznetsov (A Just Russia – For Truth)',
        text: 'нажал не ту кнопку',
        textTranslation: 'pressed the wrong button',
        context: 'единственный «воздержался»',
        contextTranslation: 'the sole abstention',
      },
    ],
    note: 'All five factions voted in favour. The sole abstention (1) was explained as a button error. The CPRF expressed verbal objections to the procedure but voted in favour.',
  },
  {
    id: '49269-8',
    year: 2023,
    date: '18.04.2023',
    title: 'Russian citizenship + revocation for \'discrediting\' the armed forces',
    shortTitle: 'Citizenship and revocation',
    fzCode: 'ФЗ № 138-ФЗ',
    category: 'civil',
    severity: 5,
    summary: 'Reform of Russian citizenship legislation. An amendment added in the second reading introduced Article 24 — termination of acquired citizenship for \'discrediting\' the armed forces, false information, or desertion. The decision is taken by the MVD.',
    fullDescription: `A presidential bill introduced in December 2021, originally addressing reform of the citizenship framework. In the second reading, Volodin, Kalashnikov, and Zatulin (UR) added Article 24 — termination of acquired citizenship for committing acts constituting offences under:
• Article 207.3 CC — false information about the army
• Article 280.3 CC — 'discrediting' the armed forces (a charge prosecuting ordinary anti-war social-media posts)
• Article 354.1 CC — rehabilitation of Nazism
• Desertion, voluntary surrender
• Violations of foreign-agent obligations

The decision is taken by the MVD on the basis of an FSB opinion. The institution of citizenship restoration has been abolished.

Third-reading vote on 18.04.2023: 408 in favour, 0 against, 1 abstention. All five factions — in favour.

What this means for ordinary people: naturalised citizens (former migrants, repatriates, and those who acquired citizenship other than by birth) can now be stripped of citizenship for a political statement — without a court ruling on the deprivation itself.

A textbook case of the "quiet second-reading amendment": a provision with radical effect was inserted into a presidential bill dealing with an entirely different subject.`,
    authors: ['President of the Russian Federation (original bill)', 'Volodin, Kalashnikov, Zatulin (UR) — second-reading amendment'],
    initiator: 'President + UR second-reading amendment',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 408, against: 0, abstain: 1 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/49269-8' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/18/04/2023/643e7da19a79472b96737d91' },
    ],
    quotes: [],
    note: 'A textbook case of the "quiet second-reading amendment": the radical citizenship-revocation provision was inserted into a presidential citizenship-reform bill. All five factions voted in favour.',
  },
  {
    id: '376846-8',
    year: 2023,
    date: '14.07.2023',
    title: 'Ban on gender reassignment',
    shortTitle: 'Ban on gender reassignment',
    fzCode: 'ФЗ № 386-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Any medical intervention for gender reassignment is prohibited. Marriages with a transgender spouse are annulled; adoption is banned. 386/0/0 — all 5 factions were co-authors.',
    fullDescription: `The law prohibited:
• Any medical interventions for gender reassignment (surgical and hormonal), with the exception of congenital conditions in children
• Changes to gender in official documents
• Adoption by transgender persons
• Marriages with a transgender spouse — annulled automatically

Third-reading vote on 14.07.2023: 386 in favour, 0 against, 0 abstentions — all five factions were co-authors (approximately 400 deputies).

What this means for ordinary people: transgender citizens are entirely excluded from legal recognition. The Ministry of Health raised objections in its official opinion (regarding medical interventions for adolescents with gender dysphoria), but no one spoke against the bill in the chamber.`,
    authors: ['Co-authored by approximately 400 deputies from all five factions'],
    initiator: 'All 5 factions',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 386, against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/376846-8' },
      { name: 'РГ', url: 'https://rg.ru/documents/2023/07/26/fz386-site-dok.html' },
    ],
    quotes: [],
    note: 'All 5 factions were co-authors. 386 in favour, 0 against, 0 abstentions. The Ministry of Health raised objections in its opinion, but no one publicly voted against.',
  },
  {
    id: '312507-8',
    year: 2023,
    date: '25.07.2023',
    title: 'Conscription age raised to 30',
    shortTitle: 'Conscription age 30',
    fzCode: 'ФЗ № 439-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Upper conscription age raised from 27 to 30. The only military law of the 8th convocation with a significant vote against: 13 votes against, 28 abstentions.',
    fullDescription: `The law raised the upper conscription age — from 27 to 30 — without lowering the lower limit. Authors: Andrei Kartapolov (Андрей Картаполов), Andrei Krasov (Андрей Красов), and Yuri Shvytkin (Юрий Швыткин) (UR), chair of the defence committee.

Third-reading vote on 25.07.2023: 335 in favour, 13 against, 28 abstentions — the only genuinely divided military vote of the 8th convocation. The 13 votes against came predominantly from the New People faction; Oksana Dmitrieva (at that point an independent deputy) also voted against. Part of the A Just Russia – For Truth faction abstained. Nina Ostanina (Нина Останина) (CPRF) introduced an amendment granting a deferral for fathers of three or more children — rejected.

What this means for ordinary people: the pool of conscripts was expanded by approximately 700,000 people. Some had deferred service until the age of 27 — the law closes that option.`,
    authors: ['Andrei Kartapolov (UR)', 'Andrei Krasov (UR)', 'Yuri Shvytkin (UR)'],
    initiator: 'UR, defence committee',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'partial-against',
      NL: 'against',
    },
    voteResults: { za: 335, against: 13, abstain: 28 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/312507-8' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/28/07/2023/64c3916e9a794755f0ab1885' },
    ],
    quotes: [
      {
        author: 'Nina Ostanina (CPRF)',
        text: 'предложила отсрочку для отцов 3+ детей',
        textTranslation: 'proposed a deferral for fathers of 3 or more children',
        context: 'поправка отклонена',
        contextTranslation: 'amendment rejected',
      },
    ],
    note: 'The only military law of the 8th convocation with a significant vote against. New People voted against as a faction; part of A Just Russia – For Truth abstained.',
  },
  {
    id: '615003-8',
    year: 2024,
    date: '23.07.2024',
    title: 'Deportation regime and register of supervised persons',
    shortTitle: 'Deportation regime and register',
    fzCode: 'ФЗ № 260-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'The most radical immigration law of 2024. Persons in the register cannot purchase property, open bank accounts, or marry. Passed unanimously by all five factions.',
    fullDescription: `The law created a deportation regime and a register of supervised persons — for foreign nationals whose legal basis for residence has lapsed. Persons in the register:
• Cannot purchase property or motor vehicles
• Cannot open bank accounts (cash transactions limited to 30,000 roubles/month)
• Cannot register a marriage
• Cannot register as a sole trader or legal entity
• Cannot obtain a driving licence

The MVD gains the right to enter a residence without a court order, the right to geolocation, and the right to demand banking and tax data. The visa-free stay period is reduced from 90 days in every six months to 90 days per year.

Third-reading vote on 23.07.2024 — unanimous. All five factions were co-authors or voted in favour.

What this means for ordinary people (a migrant): effective blocking of social integration and coercion to leave. For a Russian citizen: expanded police powers in the course of document checks.`,
    authors: ['A group of deputies from all five factions', 'Volodin, Yarovaya (UR)'],
    initiator: 'Cross-faction',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 'единогласно', against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/615003-8' },
      { name: 'ТАСС', url: 'https://tass.ru/obschestvo/21562695' },
      { name: 'Парламентская газета', url: 'https://www.pnp.ru/social/' },
    ],
    quotes: [],
    note: 'The most radical immigration law of 2024, passed unanimously with all factions as co-authors. A point of consensus on the immigration agenda.',
  },
  {
    id: '724769-8',
    year: 2024,
    date: '12.11.2024',
    title: 'Ban on "childfree propaganda"',
    shortTitle: 'Childfree ban',
    fzCode: 'ФЗ № 411-ФЗ + 401-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Ban on "propaganda of refusal to have children" in the media, advertising, cinema, and online. The defining case of "rhetorical dissent without a real vote": New People openly criticised the law — and then voted in favour.',
    fullDescription: `Third reading 12.11.2024: 403 in favour, 0 against, 0 abstentions — unanimous. By analogy with the LGBT "propaganda" law, "propaganda of refusal to have children" is banned in the media, advertising, cinema, and online. Fines of up to 5 million roubles for legal entities.

The defining case of "rhetorical dissent without a real vote" of the 8th convocation. New People, through Ksenia Goryacheva (Ксения Горячева) and Alexander Plyakin, introduced three amendments (exemptions for medical indications, religious convictions, and material hardship) — all three rejected. Sardana Avksentyeva (Сардана Авксентьева) publicly described the law as "obscurantism that will open the door to a million unfounded denunciations".

On 02.10.2024, Vyacheslav Volodin (Вячеслав Володин) publicly threatened the faction, calling opponents of the law "test-tube babies" (a reference to Alexei Nechayev as co-founder of L'Étoile). Despite this, at the final vote New People voted in favour in full.

What this means for ordinary people: a further layer of self-censorship in the media. Also — an illustration of the mechanism by which the New People faction, by the end of 2024, had shifted from actually voting against (laws 439-ФЗ, 11-ФЗ) to purely rhetorical dissent.`,
    authors: ['Leaders of all five factions', 'Volodin, Kuznetsova, Ostanina'],
    initiator: 'All 5 factions',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 403, against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/724769-8' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/12/11/2024/67333a049a7947fc8afafaaa' },
      { name: 'Володин угрожает', url: 'https://www.rbc.ru/politics/02/10/2024/66fd8b889a79475fa3037458' },
    ],
    quotes: [
      {
        author: 'Sardana Avksentyeva (New People)',
        text: 'мракобесие, которое откроет путь к миллиону необоснованных доносов',
        textTranslation: 'obscurantism that will open the door to a million unfounded denunciations',
      },
      {
        author: 'Volodin (UR)',
        text: 'противники закона — рождённые в пробирке',
        textTranslation: 'opponents of the law are test-tube babies',
        context: 'публичная угроза НЛ',
        contextTranslation: 'a public threat to New People',
      },
    ],
    note: 'A textbook case of "rhetorical dissent without a real vote". Open disagreement from New People + Volodin\'s threats + three rejected amendments — yet the final result was 403/0/0.',
  },
  {
    id: '40921-8',
    year: 2022,
    date: '11.03.2022',
    title: 'DEG and the electoral legislation reform package',
    shortTitle: 'DEG and elections',
    fzCode: 'ФЗ № 60-ФЗ',
    category: 'civil',
    severity: 4,
    summary: 'Established the DEG (remote electronic voting) framework, permitted the consolidation of polling stations, and removed advisory-vote members from election commissions at local level. 338 in favour, 82 against — three factions voted against.',
    fullDescription: `The law established the framework for DEG (remote electronic voting) at the federal level. In addition:
• It permitted the consolidation of polling stations
• It removed election commission members with advisory voting rights from local-level commissions (UIK and TIK)
• It expanded the CEC's powers to conduct experiments with electronic voting

Vote: 338 in favour, 82 against. **The CPRF, LDPR, and A Just Russia – For Truth voted against** — one of the rare occasions in the 8th convocation when three factions simultaneously adopted a public oppositional stance on a digital issue.

What this means for ordinary people: the technical transfer of voting to a format in which observers have no tools for independent verification (see the "Electoral Maths" section — the Moscow 2021 DEG case).`,
    authors: ['A group of deputies from United Russia (UR)', 'CEC (Pamfilova) — lobbying'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'against',
      LDPR: 'against',
      SR: 'against',
      NL: 'za',
    },
    voteResults: { za: 338, against: 82, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/40921-8' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/11/03/2022/622aac549a7947a6a9dd6bc7' },
    ],
    quotes: [],
    note: 'One of the few digital laws of the 8th convocation in which three factions (CPRF, LDPR, A Just Russia – For Truth) recorded a faction-level vote against. A direct link to the "Electoral Maths" section.',
  },
  {
    id: '211535-8',
    year: 2022,
    date: '21.12.2022',
    title: 'Unified Biometric System',
    shortTitle: 'Biometrics (UBS)',
    fzCode: 'ФЗ № 572-ФЗ',
    category: 'digital',
    severity: 4,
    summary: 'State infrastructure for biometric data (facial image, voice). Collection, storage, and use — centralised under the Central Bank and the Ministry of Digital Development. 295 in favour, 93 against — a large bloc against from the CPRF.',
    fullDescription: `The law created the Unified Biometric System (UBS) — a state infrastructure for collecting, storing, and using citizens' biometric data (facial image, voice). The operator is a state entity, overseen by the Central Bank of Russia and the Ministry of Digital Development, Communications and Mass Media.

Vote: 295 in favour, 93 against, 1 abstention — an unusually high bloc against for the 8th convocation. The main body of votes against came from the CPRF faction; part of the A Just Russia – For Truth faction also voted against. The principal argument against: a centralised biometric database is a high-risk asset for leaks and abuse; alternatives (distributed storage, opt-in) were rejected.

What this means for ordinary people: banks, government services, and private services can identify a user by face or voice through a single register. Some data are collected without explicit consent (for example, during remote customer service). It is possible to refuse, but this limits access to certain services.

Important: this is one of two cases ("biometrics" and "DEG") in the broad field of "digital state" legislation in which the opposition recorded genuine faction-level votes against.`,
    authors: ['A group of deputies from United Russia (UR)', 'Ministry of Digital Development, Communications and Mass Media'],
    initiator: 'Government + UR',
    votes: {
      ER: 'za',
      KPRF: 'against',
      LDPR: 'za',
      SR: 'partial-against',
      NL: 'za',
    },
    voteResults: { za: 295, against: 93, abstain: 1 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/211535-8' },
      { name: 'API стенограммы', url: 'https://api.duma.gov.ru/api/transcript/211535-8' },
    ],
    quotes: [],
    note: 'A rare case of a faction-level vote against from the CPRF on a digital issue. Corrects the oversimplified reading that "the opposition never voted against digital restrictions".',
  },
  {
    id: '778084-8',
    year: 2024,
    date: '11.12.2024',
    title: 'Migrant children: school entry only after a Russian language test',
    shortTitle: 'Migrant children in schools',
    fzCode: 'ФЗ № 463-ФЗ',
    category: 'civil',
    severity: 3,
    summary: 'Admission of foreign nationals\' children to schools is subject to verification of lawful residence and a Russian language test. Co-authored by all 5 factions. 409 in favour, 1 against.',
    fullDescription: `Admission of foreign nationals' children to state and municipal schools is now conditional on two requirements:
1. Verification of the family's lawful residence in Russia (parents' documents)
2. A Russian language test for the child

Failure to meet either condition results in a refusal of admission. An amendment by Konstantin Zatulin (Константин Затулин) (UR) providing for free Russian language preparatory courses was rejected at the plenary session.

Third-reading vote on 11.12.2024: 409 in favour, 1 against, 0 abstentions. Co-authored by Volodin, Yarovaya, and deputies from all five factions. The identity of the single dissenter has not been disclosed in public sources.

What this means for ordinary people: children from migrant families who fail the Russian language test are effectively excluded from the general education system. The obligation to improve their language skills falls on the family, without state support.`,
    authors: ['Volodin, Yarovaya (UR)', 'Co-authors from all 5 factions'],
    initiator: 'Cross-faction',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 409, against: 1, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/778084-8' },
      { name: 'Парламентская газета', url: 'https://www.pnp.ru/social/gosduma-prinyala-zakon-o-testirovanii-detey-migrantov-na-znanie-russkogo-yazyka.html' },
      { name: 'РБК', url: 'https://www.rbc.ru/society/11/12/2024/675968029a794718521612c8' },
    ],
    quotes: [],
    note: 'A rare single "against" vote in the 2024 immigration package; the deputy has not been publicly identified. All 5 factions were co-authors.',
  },
  {
    id: '652920-8',
    year: 2025,
    date: '25.03.2025',
    title: 'Ban on advertising by blocked and undesirable resources',
    shortTitle: 'Advertising at blocked resources',
    fzCode: 'ФЗ № 72-ФЗ',
    category: 'digital',
    severity: 3,
    summary: 'Ban on placing advertising on resources blocked by RKN and on resources of organisations designated "undesirable" or "extremist". 383 in favour, 14 against — isolated votes against within New People.',
    fullDescription: `A logical extension of the advertising ban for foreign agents (42-ФЗ, 2024). The law extended economic pressure to:
• Websites blocked by Roskomnadzor (Instagram, Facebook, X, Discord, and others)
• Resources of organisations designated "undesirable"
• Resources of organisations designated "extremist" (Russia-designated extremist)

Placing advertising on such platforms is prohibited; violations carry fines. This means Russian businesses cannot advertise, for example, on Instagram, even where their main audience is there.

Third-reading vote on 25.03.2025: 383 in favour, 14 against, 0 abstentions. The 14 votes against came predominantly from the New People faction (according to media reports), but the exact list of names requires downloading from vote.duma.gov.ru.

What this means for ordinary people: a further step towards the effective isolation of Russia's media landscape from global platforms. Businesses and bloggers lose the ability to monetise through the most popular channels.`,
    authors: ['A group of deputies from United Russia (UR)'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'partial-against',
    },
    voteResults: { za: 383, against: 14, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/652920-8' },
      { name: 'Лев Московкин (стенограмма)', url: 'https://leo-mosk.livejournal.com/11253463.html' },
    ],
    quotes: [],
    note: '14 votes against in the third reading — predominantly New People; the exact names are not disclosed in secondary sources. A logical continuation of the foreign-agent advertising package.',
  },
  {
    id: '928725-8',
    year: 2025,
    date: '16.12.2025',
    title: 'MAX as the mandatory channel for housing management communications',
    shortTitle: 'MAX housing chats',
    fzCode: 'ФЗ № 466-ФЗ',
    category: 'digital',
    severity: 4,
    summary: 'Management companies, utility suppliers, and waste operators are required to communicate with residents via chats in the national MAX messenger. 412 in favour, 0 against. Extension of MAX infrastructure into everyday life.',
    fullDescription: `The law obliged management companies (MCs), utility suppliers (electricity, water, gas, heat), and municipal solid-waste operators to use chats in the national MAX messenger as their channel of communication with residents:
• Notices about works
• Notifications of debts
• Residents' votes on building management issues
• Requests and enquiries

Third-reading vote on 16.12.2025: 412 in favour, 0 against, 0 abstentions — all five factions in favour.

What this means for ordinary people: de facto compulsion to install MAX as a condition for participating in the management of one's own home. Another phase in moving mandatory everyday communication into the state messenger — following school chats, government services, and age verification.`,
    authors: ['A group of deputies from United Russia (UR)'],
    initiator: 'UR',
    votes: {
      ER: 'za',
      KPRF: 'za',
      LDPR: 'za',
      SR: 'za',
      NL: 'za',
    },
    voteResults: { za: 412, against: 0, abstain: 0 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/928725-8' },
      { name: 'Ведомости', url: 'https://www.vedomosti.ru/technology/news/2025/12/16/1163737-gosduma-prinyala' },
    ],
    quotes: [],
    note: 'An extension of the base MAX law (156-ФЗ): now covering mandatory housing management communication. All 5 factions in favour, 412 votes — close to maximum unanimity.',
  },
  {
    id: '755710-8',
    year: 2025,
    date: '22.07.2025',
    title: 'Fines for searching for extremist content and advertising VPNs',
    shortTitle: 'VPN and extremist search',
    fzCode: 'ФЗ № 281-ФЗ',
    category: 'digital',
    severity: 5,
    summary: 'Fine of 3,000–5,000 roubles for the "deliberate search" for extremist materials online, including via VPN. Fines of up to 500,000 roubles for advertising VPNs.',
    fullDescription: `Amendments were introduced in the second reading of a technical bill on freight forwarding. Introduced:
• Article 13.53 of the Code of Administrative Offences — fine of 3,000–5,000 roubles for the "deliberate search" for extremist materials (the Ministry of Justice register contains more than 5,000 entries), including via VPN
• Fines of up to 500,000 roubles for legal entities for advertising VPN services
• Use of a VPN when committing an offence — an aggravating circumstance
• Fines for transferring SIM cards

What this means for ordinary people: reading materials from the extremist register (including individual songs, posts, and Wikipedia articles) is an administrative offence. In practice the law is difficult to enforce, but it creates a legal threat.`,
    authors: ['Piskarev, Moskvichyov, Khinshtein, Valeyev, Vyborny (UR)', 'Terentyev (A Just Russia – For Truth)'],
    initiator: 'UR + A Just Russia – For Truth',
    votes: {
      ER: 'za',
      KPRF: 'against',
      LDPR: 'za',
      SR: 'abstain',
      NL: 'against',
    },
    voteResults: { za: 306, against: 67, abstain: 22 },
    sources: [
      { name: 'СОЗД ГД', url: 'https://sozd.duma.gov.ru/bill/755710-8' },
      { name: 'Стенограмма ГД', url: 'http://api.duma.gov.ru/api/transcriptFull/2025-07-22' },
      { name: 'Forbes', url: 'https://www.forbes.ru/tekhnologii/541958-v-rossii-mogut-nacat-strafovat-za-poisk-ekstremistckih-materialov-i-reklamu-vpn' },
      { name: 'Lenta.ru', url: 'https://lenta.ru/articles/2025/07/24/chto-izvestno-pro-novyy-zakon-o-shtrafah-za-poisk-ekstremistskih-materialov-i-reklamu-vpn/' },
      { name: 'РБК', url: 'https://www.rbc.ru/politics/22/07/2025/687f78609a79473cd84b48bd' },
    ],
    quotes: [
      {
        author: 'Vladislav Davankov (Deputy Speaker, New People)',
        text: 'я не видел такого неприятия инициативы со времён ковидных QR-кодов',
        textTranslation: 'I have not seen such rejection of an initiative since the Covid QR codes',
      },
      {
        author: 'Boyarsky (UR)',
        text: 'направлен на узкий круг лиц, в телефоны лезть не будут',
        textTranslation: 'it is aimed at a narrow circle of individuals; they will not be looking at people\'s phones',
      },
      {
        author: 'Margarita Simonyan (RT)',
        text: 'а как нам клеймить ФБК, если запрещено их даже читать?',
        textTranslation: 'and how are we supposed to denounce FBK if we are not even allowed to read them?',
        context: 'критика «справа», за избыточность',
        contextTranslation: 'criticism from the right, for excessive overreach',
      },
    ],
    note: 'A sharply anomalous picture for the 8th convocation. Both the CPRF and New People voted against as factions. A New People survey showed 72% against. The first episode in 2022–2025 with genuine public opposition from two factions simultaneously.',
  },
];
