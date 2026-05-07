// EN translation of assets/js/data/party-srzp.js
// Sync source: assets/js/data/party-srzp.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md
//
// Page data for en/partii/srzp.html visual-first refactor.
// All facts verified against research/compromat/01-parties/05-srzp/*.md
// + research/compromat/02-cross-cutting/05-srzp-prilepin.md.
//
// Single global namespace (no module system in project).

window.SRZP_DATA = {

  /* ============== A. Origins (relationship-network — three waves of mergers) ============== */
  // Uses relationship-network to display the merger of three parties into SRZP
  // under the oversight of Kirienko (Presidential Administration), 2006/2021/2025.
  originsNetwork: {
    width: 1300, height: 600,
    nodes: [
      { id: 'surkov', label: 'V. Surkov', sub: 'Dep. Head of Presidential Administration 2006', x: 200, y: 80, color: '#1d4e89',
        hotspotTitle: 'V. Yu. Surkov',
        hotspotBody:
          '<p><strong>Vladislav Yuryevich Surkov (Владислав Юрьевич Сурков)</strong> — as of 28 October 2006, First Deputy Head of the Presidential Administration of the Russian Federation.</p>' +
          '<p>According to publications in Forbes, RBK, Kommersant, and the academic work of Kynev and Golosov, the merger of three parties on 28 October 2006 into \'A Just Russia\' was co-ordinated with the Presidential Administration under Surkov\'s direction. The goal: a managed \'left flank\' in the architecture of a two-party system.</p>' +
          '<p>\'Rodina\' (2003–2006), which was absorbed into the new party, was a documented Presidential Administration project under Surkov: as political consultant Marat Gelman admitted to Kommersant, \'Rodina\'s\' purpose was "to take as many votes as possible from the CPRF".</p>' +
          '<p><a href="https://bigenc.ru/c/spravedlivaia-rossiia-c69b2e" target="_blank" rel="noopener">Большая российская энциклопедия →</a></p>' },
      { id: 'kirienko', label: 'S. Kirienko', sub: '1st Dep. Head of Presidential Administration 2021/2025', x: 1100, y: 80, color: '#1d4e89',
        hotspotTitle: 'S. V. Kirienko',
        hotspotBody:
          '<p><strong>Sergei Vladilенович Kirienko (Сергей Владиленович Кириенко)</strong> — First Deputy Head of the Presidential Administration of the Russian Federation (since 2016).</p>' +
          '<p><strong>2021 merger:</strong> Prilepin publicly stated that the merger of A Just Russia + \'For Truth\' + \'Patriots of Russia\' was co-ordinated with the Presidential Administration through Kirienko (journalistic reconstruction).</p>' +
          '<p><strong>Congress of 25 October 2025:</strong> Kirienko delivered greetings from President V. V. Putin. This is a rare public signal — the First Deputy Head of the Presidential Administration does not ordinarily address the congresses of \'opposition\' parties on behalf of the President.</p>' +
          '<p><a href="https://www.svoboda.org/a/spravedlivaya-rossiya---za-pravdu-stala-prosto-spravedlivoy-rossiey-/33570300.html" target="_blank" rel="noopener">Радио Свобода — congress of 25 October 2025 →</a></p>' },
      { id: 'pj', label: '\'Party of Life\'', sub: 'Mironov, reg. 2002', x: 130, y: 290, color: '#a1393b',
        hotspotTitle: '\'Russian Party of Life\'',
        hotspotBody:
          '<p><strong>\'Russian Party of Life\' (Российская партия жизни, RPZh)</strong> — chairman Sergei Mikhailovich Mironov (Сергей Михайлович Миронов); registered by the Ministry of Justice on 23 December 2002.</p>' +
          '<p>At the time of the merger on 28 October 2006, Mironov had already served for five years (from 5 December 2001) as Chairman of the Federation Council (nominated by the President).</p>' +
          '<p>The foundation of the 2006 merger. The RPZh retained its legal entity, which was renamed \'A Just Russia\'.</p>' },
      { id: 'pp', label: '\'Party of Pensioners\'', sub: 'Zotov', x: 350, y: 290, color: '#bea050',
        hotspotTitle: '\'Russian Party of Pensioners\'',
        hotspotBody:
          '<p><strong>\'Russian Party of Pensioners\' (Российская партия пенсионеров)</strong> — chairman Igor Zotov.</p>' +
          '<p>A party with an established niche in \'pensioners\' social protection\'. Through its absorption into A Just Russia in 2006, the pensioners\' electorate was captured. Separately, in 2012, the spoiler \'Party of Pensioners for Justice\' was registered — a functional competitor in the same niche.</p>' },
      { id: 'rodina', label: '\'Rodina\'', sub: 'Babakov (after Rogozin)', x: 590, y: 290, color: '#a1393b',
        hotspotTitle: '\'Rodina\' party 2003–2006',
        hotspotBody:
          '<p><strong>\'Rodina\' (Родина)</strong> — chairman, following Dmitry Rogozin\'s departure to the Presidential Administration: Alexander Babakov (Александр Бабаков).</p>' +
          '<p>A documented Presidential Administration project under Surkov. According to Marat Gelman\'s admission to Kommersant, \'Rodina\'s\' purpose was <em>"to take as many votes as possible from the CPRF"</em>.</p>' +
          '<p>In the elections of 7 December 2003, \'Rodina\' won <strong>9.02%</strong> (a 36-seat faction) — twice its allocated quota — after which Glazyev was removed and the party was absorbed into A Just Russia in 2006.</p>' },
      { id: 'sr', label: '\'A Just Russia\'', sub: 'SR, 28.10.2006', x: 350, y: 480, color: '#a1393b',
        hotspotTitle: '\'A Just Russia\' (SR)',
        hotspotBody:
          '<p><strong>\'A Just Russia\' (Справедливая Россия)</strong> — founded on 28 October 2006 in Moscow at a unifying congress.</p>' +
          '<p>Merger of three parties: the Party of Life (Mironov) + the Party of Pensioners (Zotov) + Rodina (Babakov). Co-ordinated with the Presidential Administration under Surkov\'s direction.</p>' +
          '<p>2007 — incorporation of the Social Democratic Party of Russia (further expansion). 2007 (5th convocation), 2011 (6th convocation) — present in the State Duma as a faction.</p>' +
          '<p>Functional purpose: a managed \'left flank\' within the two-party system; channelling part of the CPRF\'s protest electorate into a party format that is safe for the system.</p>' },
      { id: 'zp', label: '\'For Truth\'', sub: 'Prilepin, reg. 25.03.2020', x: 830, y: 290, color: '#a1393b',
        hotspotTitle: '\'For Truth\' (Prilepin)',
        hotspotBody:
          '<p><strong>\'For Truth\' (За правду)</strong> — founded by Zakhar Prilepin (Захар Прилепин) on <strong>1 February 2020</strong>; registered by the Ministry of Justice on <strong>25 March 2020</strong>.</p>' +
          '<p>Registered in the same week as Alexei Nechayev\'s \'New People\' (Новые люди) — a structural signal of co-ordinated party-building by the Kremlin ahead of the 2021 elections.</p>' +
          '<p>A military-patriotic project with emphasis on \'Russian Donbas\' and national sovereignty. Prilepin — former OMON commander, former DPR army major (2016–2018, deputy battalion commander of the DPR People\'s Militia).</p>' +
          '<p><a href="novye-lyudi.html" target="_blank">New People dossier — parallel registration →</a></p>' },
      { id: 'pr', label: '\'Patriots of Russia\'', sub: 'Semigin', x: 1080, y: 290, color: '#a1393b',
        hotspotTitle: '\'Patriots of Russia\' (Semigin)',
        hotspotBody:
          '<p><strong>\'Patriots of Russia\' (Патриоты России)</strong> — founded and led by Gennady Semigin (Геннадий Семигин); registered in 2005.</p>' +
          '<p>Semigin was the <strong>principal financial donor to the CPRF from 1996 to 2004</strong>; expelled by Zyuganov in 2004, he left the CPRF and founded his own project.</p>' +
          '<p>The party never cleared the electoral threshold at Duma elections; in 2021 it was absorbed into SRZP.</p>' },
      { id: 'srzp', label: 'SRZP', sub: '26.03.2021 — 25.10.2025', x: 720, y: 480, color: '#a1393b',
        hotspotTitle: '\'A Just Russia — For Truth\' (SRZP)',
        hotspotBody:
          '<p><strong>SRZP</strong> — a single legal entity after the merger. The Ministry of Justice registered the changes to the charter on <strong>26 March 2021</strong>.</p>' +
          '<p>In the elections of 17–19 September 2021 — <strong>7.46%</strong> (4,201,058 votes), 27 seats in the 8th Duma.</p>' +
          '<p>The military-patriotic dimension supplemented Mironov\'s \'social justice\' platform. From the time of the merger until the congress of 25 October 2025, the institution of co-chairs operated: Mironov + Prilepin (+ Babakov, + Semigin in various forms).</p>' +
          '<p><a href="https://tass.ru/politika/11005289" target="_blank" rel="noopener">ТАСС — SRZP charter registered 26.03.2021 →</a></p>' },
      { id: 'sr2025', label: '\'A Just Russia\'', sub: '25.10.2025 — present', x: 1100, y: 480, color: '#a1393b',
        hotspotTitle: 'Third wave — congress of 25 October 2025',
        hotspotBody:
          '<p>On <strong>25 October 2025</strong>, at the 12th congress, the party was renamed back to \'A Just Russia\' (without the \'For Truth\' suffix).</p>' +
          '<p>The institution of co-chairs was abolished; <strong>Prilepin was demoted to deputy chairman</strong>. The party consolidates control under Sergei Mironov.</p>' +
          '<p>At the congress, <strong>Sergei Kirienko delivered greetings from President V. V. Putin</strong> — a public demonstration of the Presidential Administration overseer.</p>' +
          '<p><a href="https://www.svoboda.org/a/spravedlivaya-rossiya---za-pravdu-stala-prosto-spravedlivoy-rossiey-/33570300.html" target="_blank" rel="noopener">Радио Свобода — rebrand of 25 October 2025 →</a></p>' },
    ],
    edges: [
      { from: 'surkov', to: 'sr', label: 'co-ordination 2006' },
      { from: 'pj', to: 'sr', label: 'foundation' },
      { from: 'pp', to: 'sr', label: 'merger' },
      { from: 'rodina', to: 'sr', label: 'merger' },
      { from: 'sr', to: 'srzp', label: 'foundation 2021' },
      { from: 'zp', to: 'srzp', label: 'merger 26.03.2021' },
      { from: 'pr', to: 'srzp', label: 'merger' },
      { from: 'kirienko', to: 'srzp', label: 'co-ordination 2021', kind: 'dashed' },
      { from: 'srzp', to: 'sr2025', label: 'rebrand 25.10.2025' },
      { from: 'kirienko', to: 'sr2025', label: 'greetings from Putin' },
    ],
  },

  /* ============== B. Financing (financing-trajectory) ============== */
  financingTrajectory: {
    years: [2021, 2022, 2023, 2024],
    budgetPct: [0, 70, 75, 76],
    totalsMln: [428, 720, 800, 839],
    hotspots: {
      '2021': {
        title: '2021 — campaign fund ≈428 million ₽',
        body: '<p>SRZP\'s campaign fund for the 2021 Duma election: <strong>≈428 million ₽</strong> (comprising the party\'s own funds + donations from individuals and legal entities). In the elections of 17–19 September 2021 — <strong>7.46%</strong> (4,201,058 votes), 27 seats.</p><p>Source: <a href="https://www.cikrf.ru/" target="_blank" rel="noopener">CEC report on the 8th Duma elections</a>.</p>',
      },
      '2022': {
        title: '2022 — ≈720 million ₽',
        body: '<p>First full year of budget funding under Article 33 of Federal Law No. 95-FZ (ФЗ-95) after clearing the 5% threshold. Standard rate: <strong>152 ₽ × 4,201,058 votes ≈ 638.6 million ₽/year</strong>. Plus donations and other income.</p>',
      },
      '2023': {
        title: '2023 — ≈800 million ₽',
        body: '<p>Stabilisation of the financial infrastructure. Defence-industry donors channelled through V. Hartung (Chelyabinsk Forging and Pressing Plant, ПАО ЧКПЗ), investment companies (IC \'RUSS-INVEST\'), and LLC \'Investstroy-N\' (5 million ₽ + 3 million ₽ loan in 2023).</p>',
      },
      '2024': {
        title: '2024 — 839 million ₽; 76.2% state budget',
        body: '<p>According to the 2024 report: <strong>total income 839 million ₽; state budget share 76.2%</strong> (≈639 million ₽). Loans from legal entities — 17 million ₽.</p><p>This is the <strong>lowest budget share</strong> among parliamentary opposition parties: CPRF — 84.4%, LDPR — 89.4%, New People — ≈92–93%, Yabloko — 0%.</p><p>SRZP <strong>did not field a candidate</strong> in the 2024 presidential election; the party publicly backed Putin. There was no separate campaign fund from the party in the 2024 election.</p>',
      },
    },
  },

  /* ============== C. Leaders (leader-grid) ============== */
  leaderGrid: [
    { name: 'S. M. Mironov', tier: 'core', role: 'Party chairman (since 2006)',
      born: 'b. 14.02.1953, Pushkin',
      duma_url: 'https://declarator.org/person/80/',
      tags: [
        { label: 'Federation Council 2001–2011', kind: 'inst' },
        { label: 'Security Council of Russia', kind: 'inst' },
        { label: 'State Council from 2012', kind: 'inst' },
        { label: 'Putin\'s 2000 campaign HQ', kind: 'tie' },
        { label: 'co-author LGBT ban', kind: 'tie' },
      ],
      bio: '<p><strong>Sergei Mikhailovich Mironov (Сергей Михайлович Миронов)</strong> (b. 14 February 1953, Pushkin, Leningrad Oblast). Airborne Forces (1971–1973); Leningrad Mining Institute (1980, geophysicist).</p>' +
        '<p><strong>2000</strong> — deputy head of V. V. Putin\'s electoral campaign headquarters in St Petersburg. <strong>5 December 2001</strong> — elected Chairman of the Federation Council (recommended by the President); held the post until recall on 18 May 2011. <strong>2002–2011 — permanent member of the Security Council of Russia</strong> (by virtue of the Federation Council chairmanship). <strong>From 11 July 2012 — member of the State Council of Russia</strong> (by Presidential Decree).</p>' +
        '<p>Under international sanctions (EU, UK, USA, Canada, Australia, Switzerland, Japan) since 2022.</p>' +
        '<p><strong>Co-author of the law banning LGBT \'propaganda\'</strong> (No. 217471-8, Federal Law No. 478-FZ of 5 December 2022) and the law banning gender reassignment (No. 376846-8, Federal Law No. 386-FZ of 24 July 2023). Co-author of immigration restrictions 2024–2025.</p>' +
        '<p>Mironov\'s biography is a classic \'parliamentary leader with a firm state trajectory\': Airborne Forces → Putin 2000 HQ → Federation Council → Security Council → MP → State Council.</p>' },
    { name: 'Z. Prilepin', tier: 'core', role: 'Deputy chairman (from 25.10.2025); previously co-chairman',
      born: 'b. 07.07.1975, Ilyinka',
      tags: [
        { label: 'writer + Z-patriot', kind: 'role' },
        { label: 'founder of \'For Truth\' 2020', kind: 'inst' },
        { label: 'DPR battalion 2016–2018', kind: 'tie' },
        { label: 'Rosgvardiya from 01.2023', kind: 'tie' },
        { label: 'Order of Courage', kind: 'status' },
      ],
      bio: '<p><strong>Zakhar Prilepin (Захар Прилепин)</strong> (Yevgeny Nikolayevich Prilepin, b. 7 July 1975, Ilyinka, Ryazan Oblast). Graduated from the philology department of Nizhny Novgorod State University (2003). Former member of Eduard Limonov\'s National Bolshevik Party (formally unregistered).</p>' +
        '<p><strong>1996, 1999</strong> — OMON commander in Chechnya (Nizhny Novgorod unit). <strong>2014</strong> — humanitarian missions to Donbas. <strong>2016–2018 — DPR army major</strong>, deputy commander of a DPR People\'s Militia battalion.</p>' +
        '<p><strong>January 2023</strong> — signed a contract with Rosgvardiya (the National Guard), deputy commander of the special-purpose regiment \'Oplot\'.</p>' +
        '<p><strong>6 May 2023</strong>, in the village of Pionerskoye, Nizhny Novgorod Oblast — explosion of Prilepin\'s Audi Q7. Driver Alexander Shubin (former \'Oplot\' fighter) was killed; Prilepin sustained fractures to both legs and serious injuries. Suspect Alexander Permyakov was sentenced to life imprisonment; the \'Atesh\' group claimed responsibility.</p>' +
        '<p><strong>Order of Courage from the President of Russia</strong> — Presidential Decree No. 416 of 6 June 2023 (presented in the Kremlin; the same decoration was awarded posthumously to driver A. Shubin).</p>' +
        '<p>From the 2021 merger until 25 October 2025 — co-chairman of the party. After the 12th congress — <strong>deputy chairman</strong> (demoted; institution of co-chairs abolished). In SRZP, Prilepin served as the symbolic instrument of the party\'s rebranding as a military-patriotic force.</p>' },
    { name: 'A. G. Aksakov', tier: 'core', role: 'Chairman of the Duma Committee on the Financial Market',
      born: 'b. 28.11.1957',
      duma_url: 'https://declarator.org/person/33/',
      tags: [
        { label: 'Duma MP for 6 convocations since 1999', kind: 'role' },
        { label: 'author of Federal Law No. 340-FZ \'On the Digital Rouble\'', kind: 'tie' },
        { label: 'chairman, Association of Russian Banks', kind: 'inst' },
        { label: 'board of RSPP (Russian Union of Industrialists)', kind: 'inst' },
      ],
      bio: '<p><strong>Anatoly Gennадьевич Aksakov (Анатолий Геннадьевич Аксаков)</strong> (b. 28 November 1957). <strong>Member of the State Duma for six consecutive convocations</strong> since 1999 (over 25 years continuously — a record for a non-partisan functionary).</p>' +
        '<p><strong>From 5 October 2016 — chairman of the Duma Committee on the Financial Market</strong>; re-elected 12 October 2021 (8th convocation). 2002–2009 — member of the National Banking Council of the Central Bank of Russia (by Presidential appointment). Since 2006 — chairman of the Association of Russian Banks. Member of the RSPP board.</p>' +
        '<p><strong>Aksakov is the author</strong> of <a href="http://publication.pravo.gov.ru/Document/View/0001202307240024" target="_blank" rel="noopener">Federal Law No. 340-FZ of 24 July 2023 \'On the Digital Rouble\'</a> (bills No. 270838-8 and No. 270852-8). The law established the Central Bank as the operator of the digital-rouble platform; the Duma vote of 11 July 2023 (third reading) — unanimous approval by all five factions.</p>' +
        '<p>2024 declaration: income 14.4 million ₽; real estate 1,262 m². No controlled legal entities with state contracts recorded; functional role exercised through the chairmanship of the Association of Russian Banks and RSPP board membership.</p>' +
        '<p>Structurally, a major-capital functionary with parliamentary support; the \'opposition\' party, through him, actively <em>creates</em> the infrastructure of digital financial control.</p>' },
    { name: 'A. M. Babakov', tier: 'secondary', role: 'Deputy chairman of the party; Deputy Speaker of the Duma (8th convocation)',
      born: 'b. 08.02.1963',
      tags: [
        { label: 'former leader of \'Rodina\' 2003–2006', kind: 'inst' },
        { label: 'sanctions: USA/EU/UK/Canada', kind: 'status' },
        { label: 'ties to Ukrainian energy sector (iStories)', kind: 'tie' },
      ],
      bio: '<p><strong>Alexander Mikhailovich Babakov (Александр Михайлович Бабаков)</strong> (b. 8 February 1963) — former leader of the \'Rodina\' party from 2003 to 2006 (after Dmitry Rogozin\'s departure to the Presidential Administration); joined \'A Just Russia\' in 2006.</p>' +
        '<p>Deputy chairman of the party, Duma MP; in the 8th convocation — <strong>Deputy Speaker of the State Duma</strong>. Under sanctions from the USA, EU, Canada, and the United Kingdom.</p>' +
        '<p>According to iStories investigations, Babakov has documented ties to Ukraine\'s energy sector (energy enterprises, former assets); the investigations claim that some Ukrainian assets survived after 2014 (open verification point).</p>' +
        '<p>Chairman of the State Council Commission on High-Technology Medicine (specific periods).</p>' },
    { name: 'V. K. Hartung', tier: 'secondary', role: 'Chairman of the Duma Committee on Competition Protection',
      born: 'b. 12.11.1960, Chelyabinsk',
      tags: [
        { label: 'co-owner of Chelyabinsk Forging and Pressing Plant (CKPZ)', kind: 'inst' },
        { label: 'defence-industry contractor (MoD, Rostec, Almaz-Antey)', kind: 'tie' },
        { label: 'chairman, Chelyabinsk branch of SRZP', kind: 'role' },
      ],
      bio: '<p><strong>Valery Karlovich Hartung (Валерий Карлович Гартунг)</strong> (b. 12 November 1960, Chelyabinsk) — co-owner of Chelyabinsk Forging and Pressing Plant (ПАО ЧКПЗ, INN 7449006184) — a major <strong>defence-industry contractor</strong>.</p>' +
        '<p>Duma MP for several convocations (since 2003); co-chairman of the party 2007–2011; chairman of the SRZP Chelyabinsk regional branch. In the 8th convocation — chairman of the Duma Committee on Competition Protection.</p>' +
        '<p>CKPZ holds regular government contracts via the EIS zakupki.gov.ru procurement portal — the Russian Ministry of Defence, the Almaz-Antey Air Defence Concern, and Rostec. Hartung is a direct example of a \'party leader\'s business with state contracts\' inside a parliamentary party.</p>' +
        '<p>Publicly criticises the Central Bank for high interest rates: "the shortcomings of the first reading carried over into the third" (on the 2025 budget).</p>' },
    { name: 'O. A. Nilov', tier: 'secondary', role: 'Duma MP since 2011',
      tags: [
        { label: 'co-author of mobilisation law 20.09.2022', kind: 'tie' },
        { label: 'co-author of immigration restrictions 2024–2025', kind: 'tie' },
      ],
      bio: '<p><strong>Oleg Anatolyevich Nilov (Олег Анатольевич Нилов)</strong> — Duma MP since 2011, member of the SRZP faction.</p>' +
        '<p><strong>Co-author of the mobilisation amendments of 20 September 2022</strong> (No. 160006-8, Federal Law No. 365-FZ of 24 September 2022), together with LDPR\'s Slutsky: the only instance of joint authorship between two \'opposition\' parties on military legislation. The law introduces the concepts of \'mobilisation\' and \'martial law\', and toughens penalties for desertion, voluntary surrender (up to 10 years) and looting (up to 15 years).</p>' +
        '<p>In 2024–2025, actively co-authored immigration restrictions; SRZP, through Nilov, was <strong>the most active faction in initiatives to tighten the immigration regime</strong>.</p>' },
    { name: 'G. Yu. Semigin', tier: 'secondary', role: 'From \'Patriots of Russia\' into SRZP leadership',
      born: 'b. 23.03.1964, Epping (Australia)',
      tags: [
        { label: 'founder of \'Patriots of Russia\'', kind: 'inst' },
        { label: 'former CPRF donor 1996–2004', kind: 'tie' },
      ],
      bio: '<p><strong>Gennady Yuryevich Semigin (Геннадий Юрьевич Семигин)</strong> (b. 23 March 1964, Epping, Australia). <strong>Former principal financial donor to the CPRF from 1996 to 2004</strong>; expelled by Zyuganov in 2004; founder and chairman of \'Patriots of Russia\' (registered in 2005).</p>' +
        '<p>After the 2021 merger — in SRZP in leadership positions. Business biography: significant commercial assets in investment and media spheres.</p>' },
    { name: 'D. A. Kuznetsov', tier: 'secondary', role: 'Duma MP, 8th convocation',
      tags: [
        { label: '"pressed the wrong button" 11.04.2023', kind: 'role' },
      ],
      bio: '<p><strong>Dmitry Anatolyevich Kuznetsov (Дмитрий Анатольевич Кузнецов)</strong> — Duma MP, 8th convocation, SRZP faction.</p>' +
        '<p>Known as the <em>sole \'abstainer\'</em> in the vote on electronic summonses (Federal Law No. 127-FZ) on 11 April 2023: the vote was 395/0/1. Kuznetsov <strong>publicly stated that he \'pressed the wrong button\'</strong>, declining to offer any political interpretation of the episode.</p>' +
        '<p>Included in this dossier as an illustration of the complete absence of systemic dissent within the faction: even the sole technical error in a vote was accompanied by a public refusal to interpret it politically.</p>' },
  ],

  /* ============== D. State ties (trustee + ownership-flow) ============== */
  // trustee-context — key indicator: four lines of integration
  trusteeContext: {
    headline: '4 lines',
    sub: 'SRZP is the most multi-dimensionally state-integrated party in the parliamentary five (after United Russia). Each key leader sits on one of four axes: supreme state bodies (Mironov: Federation Council/Security Council/State Council) · parliamentary-regulatory vertical (Aksakov: Duma Committee on Financial Market) · security-service axis (Prilepin: Rosgvardiya + Order of Courage) · defence-industry sector (Hartung: CKPZ).',
    source: { label: 'research/compromat/01-parties/05-srzp/D-state-ties.md', url: '../research/compromat/01-parties/05-srzp/D-state-ties.md' },
  },
  // ownership-flow — specific chain of military-patriotic wing integration:
  // Prilepin → Rosgvardiya contract (\'Oplot\' regiment) → Order of Courage from the President
  ownershipFlow: {
    title: 'Prilepin → Rosgvardiya → state decoration',
    steps: [
      { label: 'Z. Prilepin', sub: 'SRZP co-chairman (until 25.10.2025)', color: '#a1393b',
        hotspotTitle: 'Z. Prilepin — public face of the party',
        hotspotBody:
          '<p><strong>Zakhar Prilepin (Захар Прилепин)</strong> — the face of the party\'s military-patriotic wing since the 2021 merger. Former OMON commander in Chechnya (1996, 1999), former DPR army major (2016–2018, deputy battalion commander of the DPR People\'s Militia).</p>' +
          '<p>As of 25 October 2025, demoted to deputy chairman; the institution of co-chairs was abolished.</p>' },
      { label: 'Rosgvardiya', sub: '\'Oplot\' regiment, from January 2023', color: '#1d4e89',
        hotspotTitle: 'Contract with Rosgvardiya',
        hotspotBody:
          '<p><strong>January 2023</strong> — Prilepin signed a contract with <strong>Rosgvardiya (the National Guard); deputy commander of the special-purpose regiment \'Oplot\'</strong>.</p>' +
          '<p>The \'Oplot\' regiment is a Rosgvardiya formation operating in the zone of the military operation. The regiment\'s financial flows are an open verification point.</p>' +
          '<p>The contract represents the formal integration of an active public leader of a parliamentary party into the state security vertical.</p>' +
          '<p><a href="https://www.kommersant.ru/doc/6136681" target="_blank" rel="noopener">Коммерсантъ — Prilepin\'s contract with Rosgvardiya →</a></p>' },
      { label: 'Order of Courage', sub: 'Presidential Decree No. 416 of 06.06.2023', color: '#bea050',
        hotspotTitle: 'Order of Courage — Decree No. 416 of 06.06.2023',
        hotspotBody:
          '<p><strong>6 May 2023</strong>, in the village of Pionerskoye, Nizhny Novgorod Oblast — explosion of Prilepin\'s Audi Q7. Driver Alexander Shubin (former \'Oplot\' fighter) was killed; Prilepin sustained fractures to both legs and serious injuries. Suspect A. Permyakov — life imprisonment; the \'Atesh\' group claimed responsibility.</p>' +
          '<p><strong>Presidential Decree No. 416 of 6 June 2023</strong> — the Order of Courage to Prilepin; the same decoration was awarded <em>posthumously</em> to the late driver A. Shubin. Presentation by Putin in the Kremlin.</p>' +
          '<p>A state decoration at Presidential level — formal public recognition of service to the state. Cementing the integration of the party\'s military-patriotic wing into the state system.</p>' +
          '<p><a href="../research/compromat/05-evidence/kremlin-decrees/decree-416-2023-06-06-state-awards-incl-prilepin.pdf" target="_blank">Decree No. 416 (PDF) →</a></p>' },
    ],
    arrowLabels: ['contract 01.2023', 'decoration 06.06.2023'],
  },

  /* ============== E. Voting (vote-waffle) ============== */
  // 18 key votes 2019–2025; for the 8th convocation (SRZP — 27 seats).
  voteWaffle: {
    summary: { za: 14, against: 0, abstain: 3, partial: 1 },
    votes: [
      { id: 'army-fakes', fz: 'FZ-32', date: '04.03.2022', voteId: 80714, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 32-FZ of 4 March 2022</strong> — introduction of Article 207.3 of the Criminal Code ("deliberately false information" about the use of Russian Armed Forces, up to 15 years) and Article 280.3 CC (public actions \'discrediting\' the Armed Forces, a charge prosecuting ordinary anti-war social-media posts, up to 5 years).</p>' +
          '<p><strong>SRZP:</strong> voted in favour as a full faction. Total Duma vote — 401/0/0 (unanimous).</p>' +
          '<p>Faction chairman (Mironov) publicly backed the law. Became the primary instrument for bringing criminal charges against journalists and those publishing anti-war material.</p>' +
          '<p><a href="../research/compromat/05-evidence/duma-api/votes/army-fakes.xml" target="_blank">raw XML →</a> · <a href="https://sozd.duma.gov.ru/bill/80714-8" target="_blank" rel="noopener">SOZD 80714-8 →</a></p>' },
      { id: 'recogn-dnr', fz: 'Recognition of DPR/LPR', date: '22.02.2022', outcome: 'za',
        hotspotBody:
          '<p><strong>State Duma declaration of 22 February 2022</strong> on recognising the DPR and LPR as independent states. Recognition took place on 21–22 February 2022.</p>' +
          '<p><strong>SRZP:</strong> voted in favour (together with all parliamentary factions).</p>' +
          '<p>The recognition served as the formal pretext for the subsequent troop deployment on 24 February 2022. Prilepin was one of the most publicly vocal supporters of the military operation among political leaders at that time.</p>' +
          '<p><a href="../research/compromat/05-evidence/duma-api/votes/dnr-ratification.xml" target="_blank">raw XML →</a></p>' },
      { id: 'fz-255', fz: 'FZ-255', date: '14.07.2022', outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 255-FZ of 14 July 2022</strong> — the unified foreign-agent law (No. 122131-8): expansion of the criteria for designating \'foreign agent\' status (including \'foreign influence\', without the need to receive foreign funding).</p>' +
          '<p><strong>SRZP:</strong> voted in favour.</p>' +
          '<p>Allows designation as \'foreign agent\' on the basis of \'foreign influence\' without a financial channel. As of mid-2025, the Ministry of Justice register contains over 800 individuals.</p>' +
          '<p><a href="../research/compromat/05-evidence/sozd-bills/113045-8.html" target="_blank">bill 113045-8 →</a></p>' },
      { id: 'mobilization', fz: 'FZ-365', date: '20.09.2022', voteId: 160006, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 365-FZ of 24 September 2022</strong> — mobilisation amendments to the Criminal Code: Article 352.1 (\'voluntary surrender\', up to 10 years), Article 356.1 (looting), aggravation of Articles 207.3 and 280.3 in conditions of mobilisation. Third reading on 20 September 2022 — passed in a single plenary day.</p>' +
          '<p><strong>SRZP:</strong> voted in favour (unanimously). <strong>Oleg Nilov (SRZP) — co-author</strong> of the amendments, together with Slutsky of the LDPR: the only instance of joint authorship between two \'opposition\' parties on military legislation.</p>' +
          '<p>The law was signed on the day partial mobilisation was announced (21 September 2022).</p>' +
          '<p><a href="../research/compromat/05-evidence/sozd-bills/160006-8.html" target="_blank">bill 160006-8 (Nilov co-author) →</a> · <a href="../research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml" target="_blank">raw XML →</a></p>' },
      { id: 'annex-4', fz: 'Annexation of 4 regions', date: '03.10.2022', outcome: 'za',
        hotspotBody:
          '<p><strong>Four Federal Constitutional Laws of 4 October 2022</strong> — ratification of the accession of the DPR, LPR, Zaporizhzhia Oblast, and Kherson Oblast to Russia (four separate Federal Constitutional Laws based on the referendums of 23–27 September 2022).</p>' +
          '<p><strong>SRZP:</strong> voted in favour unanimously. Mironov at a press conference (Kommersant): <em>"the Duma faction unanimously backed the military operation"</em>.</p>' +
          '<p>All four Federal Constitutional Laws were adopted in a single plenary day on 3 October 2022. No individual votes against within the SRZP faction. Internationally unrecognised annexation.</p>' +
          '<p><a href="../research/compromat/05-evidence/duma-api/votes/annex-dnr.xml" target="_blank">DNR XML →</a> · <a href="../research/compromat/05-evidence/duma-api/votes/annex-lnr.xml" target="_blank">LNR XML →</a></p>' },
      { id: 'lgbt-ban', fz: 'FZ-478', date: '24.11.2022', outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 478-FZ of 5 December 2022</strong> — ban on \'propaganda\' of non-traditional sexual relations for all age groups (No. 217471-8). Third reading on 24 November 2022 — unanimous.</p>' +
          '<p><strong>SRZP:</strong> voted in favour. <strong>S. M. Mironov — co-author of the law</strong>. Among the 390 co-authors — leaders of all five factions.</p>' +
          '<p>Extension of the 2013 ban (previously applicable only to minors) to all audiences. Mironov shifts from a \'voter for\' to an <em>authorial figure</em> on the cultural-conservative agenda.</p>' +
          '<p><a href="../research/compromat/05-evidence/sozd-bills/217471-8.html" target="_blank">bill 217471-8 (Mironov co-author) →</a> · <a href="../research/compromat/05-evidence/duma-api/votes/lgbt-propaganda.xml" target="_blank">raw XML →</a></p>' },
      { id: 'e-summons', fz: 'FZ-127', date: '11.04.2023', outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 127-FZ of 14 April 2023</strong> — military conscript register in electronic form + digital summonses. Third reading on 11 April 2023 — 395/0/1.</p>' +
          '<p><strong>SRZP:</strong> voted in favour. The <strong>sole \'abstainer\' — Dmitry Kuznetsov (SRZP)</strong>, who publicly stated that he "pressed the wrong button", declining to offer any political interpretation of the episode.</p>' +
          '<p>The episode illustrates the complete absence of systemic dissent within the faction: even the sole technical error in a vote was accompanied by a public refusal to interpret it politically.</p>' },
      { id: 'gender-trans', fz: 'FZ-386', date: '14.07.2023', outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 386-FZ of 24 July 2023</strong> — ban on gender reassignment in official documents and medical transgender care (No. 376846-8). Third reading on 14 July 2023 — unanimous (365/0/0).</p>' +
          '<p><strong>SRZP:</strong> voted in favour. <strong>S. M. Mironov — co-author of the law.</strong></p>' +
          '<p>The law strips transgender people of legal status and triggered the mass termination of transgender medical care.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/376846-8" target="_blank" rel="noopener">SOZD 376846-8 →</a> · <a href="../research/compromat/05-evidence/duma-api/votes/gender-transition.xml" target="_blank">raw XML →</a></p>' },
      { id: 'digital-ruble', fz: 'FZ-340', date: '11.07.2023', outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 340-FZ of 24 July 2023</strong> \'On the Digital Rouble\' (No. 270838-8 + 270852-8). Third reading on 11 July 2023 — unanimous approval by all five factions.</p>' +
          '<p><strong>A. G. Aksakov (SRZP) — author of the law.</strong> The law established the Central Bank as operator of the digital-rouble platform; introduced the concepts of \'digital-rouble account\' and recovery procedures.</p>' +
          '<p>The paradox: the \'opposition\' party, through the chairman of the Duma Committee on the Financial Market, <em>actively creates</em> the infrastructure of digital financial control — an instrument for total verification of citizens\' transactions.</p>' +
          '<p><a href="http://publication.pravo.gov.ru/Document/View/0001202307240024" target="_blank" rel="noopener">pravo.gov.ru — text of FZ-340 →</a> · <a href="../research/compromat/05-evidence/sozd-bills/270838-8.html" target="_blank">bill 270838-8 →</a></p>' },
      { id: 'conscript-30', fz: 'FZ-439', date: '25.07.2023', outcome: 'abstain',
        hotspotBody:
          '<p><strong>Federal Law No. 439-FZ of 4 August 2023</strong> — raising the conscription age to 30. Third reading on 25 July 2023.</p>' +
          '<p><strong>SRZP:</strong> approximately 23 faction members <em>abstained</em> en masse (a tactic of moderate disagreement).</p>' +
          '<p>In Duma practice, a mass abstention is not public opposition but a <strong>tactical avoidance of formal responsibility</strong>: with no votes against, the law passes through United Russia\'s majority, but the faction shields itself from direct association with the unpopular measure of expanding the conscription pool. This is not opposition — it is <strong>neutralisation of political responsibility whilst maintaining the overall course</strong>.</p>' +
          '<p><a href="../research/compromat/05-evidence/duma-api/votes/conscription-30.xml" target="_blank">raw XML →</a></p>' },
      { id: 'budget-2024', fz: 'Budget 2024–2026', date: '17.11.2023', outcome: 'partial',
        hotspotBody:
          '<p><strong>Federal Law No. 540-FZ</strong> — federal budget for 2024–2026 (No. 448554-8). Third reading on 17 November 2023.</p>' +
          '<p><strong>SRZP:</strong> the faction voted against (together with the CPRF; contradicting United Russia, LDPR, and New People).</p>' +
          '<p><strong>Socio-economic opposition</strong> is the only dimension in which the faction systematically expresses disagreement. On freedoms and war — zero opposition.</p>' },
      { id: 'budget-2025', fz: 'Budget 2025–2027', date: '21.11.2024', outcome: 'abstain',
        hotspotBody:
          '<p><strong>Federal budget for 2025–2027</strong> (No. 727320-8). Third reading on 21 November 2024.</p>' +
          '<p><strong>SRZP:</strong> abstained (together with the CPRF).</p>' +
          '<p>Hartung (SRZP): <em>"the shortcomings of the first reading carried over into the third"</em>. Socio-economic criticism without blocking the law.</p>' },
      { id: 'lgbt-criminal', fz: 'LGBT — criminal penalties', date: '14.02.2024', outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 14-FZ of 14 February 2024</strong> — criminal liability for repeat violations of the LGBT \'propaganda\' ban: the administrative offence becomes a criminal one (up to 5 years) upon a repeat violation within a year.</p>' +
          '<p><strong>SRZP:</strong> voted in favour.</p>' +
          '<p>Part of the 2024 package: strengthening the LGBT ban by enabling actual custodial sentences.</p>' },
      { id: 'confiscation', fz: 'FZ — confiscation', date: '14.02.2024', outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 11-FZ of 14 February 2024</strong> (No. 533912-8) — confiscation of property for "false information about the army" (Article 207.3 CC): introduces property confiscation as an additional penalty.</p>' +
          '<p><strong>SRZP:</strong> voted in favour.</p>' +
          '<p>Previously Article 207.3 provided only for imprisonment and a fine; it now also allows for the full confiscation of the convicted person\'s property. Applied retroactively to cases from 24 February 2022.</p>' },
      { id: 'migrant-control', fz: 'Digital migrant control', date: '20.05.2025', outcome: 'za',
        hotspotBody:
          '<p><strong>Law of 20 May 2025</strong> on digital monitoring of labour migrants in Moscow and the Moscow Oblast.</p>' +
          '<p><strong>SRZP:</strong> voted in favour. Among the 22 abstainers — representatives of New People, but not SRZP.</p>' +
          '<p>SRZP is the most active faction in initiatives to tighten the immigration regime in 2024–2025; the key co-authors are O. Nilov and S. Mironov.</p>' +
          '<p><a href="../research/compromat/05-evidence/duma-api/votes/migrant-control.xml" target="_blank">raw XML →</a></p>' },
      { id: 'max-mess', fz: 'MAX Messenger', date: '10.06.2025', outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 156-FZ of 24 June 2025</strong> (No. 679980-8) — mandatory pre-installation of the MAX messenger (from VKontakte/VK) on all Android devices sold in Russia.</p>' +
          '<p><strong>SRZP:</strong> voted in favour (407 unanimous across the Duma).</p>' +
          '<p>Part of the strategy to replace WhatsApp/Telegram with a domestic alternative.</p>' },
      { id: 'vpn-ban', fz: 'FZ-281 (VPN)', date: '22.07.2025', voteId: 755710, outcome: 'partial',
        hotspotBody:
          '<p><strong>Federal Law No. 281-FZ of 31 July 2025</strong> (No. 755710-8) — expanded powers to block VPN services + introduction of administrative liability for "searching for extremist materials".</p>' +
          '<p><strong>SRZP:</strong> a split vote — partly in favour, partly against, with most <em>abstaining</em> (together with part of the CPRF). <strong>The only instance of a split faction vote</strong> during the crisis period 2022–2025.</p>' +
          '<p>Third reading: 306 in favour, 67 against, 22 abstained.</p>' +
          '<p><a href="../research/compromat/05-evidence/sozd-bills/755710-8.html" target="_blank">bill 755710-8 →</a></p>' },
      { id: 'klish-2019', fz: 'Klishas package', date: '07.03.2019', outcome: 'against',
        hotspotBody:
          '<p><strong>Klishas package</strong> (No. 606595-7) — \'fake news\' and insult to the state; package adopted on 7 March 2019.</p>' +
          '<p><strong>SRZP (\'A Just Russia\'):</strong> part of the faction voted against — one of <strong>two episodes before 2022</strong> in which the faction deviated from the pro-government line (the second being a partial split on the \'sovereign Runet\' law in 2019).</p>' +
          '<p>After 2022 — the only separate deviation episode was the VPN law of 2025.</p>' },
    ],
  },

  /* ============== F. Managed opposition (relationship-network) ============== */
  // Network graph — curatorial connection of Surkov (2006) → Kirienko (2021/2025) over three waves
  // of mergers, and the connection with the parallel project \'New People\' (same registration week, March 2020).
  relationshipNetwork: {
    width: 1300, height: 660,
    nodes: [
      { id: 'ap', label: 'Presidential Administration', sub: 'overseer of party-building', x: 650, y: 80, color: '#1d4e89',
        hotspotTitle: 'Presidential Administration of the Russian Federation',
        hotspotBody:
          '<p><strong>The Presidential Administration of the Russian Federation (Администрация Президента РФ)</strong> — the central organ for co-ordinating domestic policy. It oversees elections, regional policy, and the party landscape.</p>' +
          '<p>In three SRZP waves, publicly documented involvement of Presidential Administration representatives has been recorded: Surkov 2006 (documented), Kirienko 2021 (journalistic reconstruction via Prilepin), Kirienko 2025 (documented at the congress, with greetings from Putin).</p>' },
      { id: 'surkov', label: 'V. Surkov', sub: 'Dep. Head of Presidential Administration 2006', x: 200, y: 260, color: '#1d4e89',
        hotspotTitle: 'V. Yu. Surkov (2006)',
        hotspotBody:
          '<p>First Deputy Head of the Presidential Administration in 2006; overseer of the merger of three parties into \'A Just Russia\' on 28 October 2006.</p>' +
          '<p>Surkov\'s 2006 concept of \'sovereign democracy\' envisaged <strong>two</strong> relatively large parties loyal to the Kremlin; A Just Russia was designed as the \'second leg\' of this system.</p>' +
          '<p>\'Rodina\' (2003–2006), absorbed into A Just Russia, was a documented Presidential Administration project aimed at "taking as many votes as possible from the CPRF" (Gelman).</p>' },
      { id: 'kirienko', label: 'S. Kirienko', sub: '1st Dep. Head of Presidential Administration 2021/2025', x: 1100, y: 260, color: '#1d4e89',
        hotspotTitle: 'S. V. Kirienko (2021/2025)',
        hotspotBody:
          '<p>First Deputy Head of the Presidential Administration (since 2016). Overseer of the party landscape, elections, and regional policy.</p>' +
          '<p><strong>2021:</strong> Prilepin publicly stated that the merger of A Just Russia + \'For Truth\' + \'Patriots of Russia\' into SRZP was co-ordinated with the Presidential Administration through Kirienko.</p>' +
          '<p><strong>25 October 2025:</strong> delivered greetings from President V. V. Putin at the party congress — a public demonstration of the overseer at the podium (Surkov in 2006 worked \'behind the scenes\'; Kirienko in 2025 — publicly).</p>' +
          '<p><a href="https://www.svoboda.org/a/spravedlivaya-rossiya---za-pravdu-stala-prosto-spravedlivoy-rossiey-/33570300.html" target="_blank" rel="noopener">Радио Свобода →</a></p>' },
      { id: 'mironov', label: 'S. Mironov', sub: 'party chairman', x: 350, y: 480, color: '#a1393b',
        hotspotTitle: 'S. M. Mironov',
        hotspotBody:
          '<p>Chairman of A Just Russia / SRZP at all stages since 2006. Before 2001 — deputy head of Putin\'s electoral campaign headquarters in St Petersburg (2000); Federation Council 2001–2011, Security Council 2002–2011, State Council from 2012.</p>' +
          '<p>Co-author of the law banning LGBT \'propaganda\' (FZ-478) and the law banning gender reassignment (FZ-386). Social-patriotic leader.</p>' },
      { id: 'prilepin', label: 'Z. Prilepin', sub: 'military-patriotic wing', x: 700, y: 480, color: '#a1393b',
        hotspotTitle: 'Z. Prilepin',
        hotspotBody:
          '<p>Co-chairman of SRZP 2021–25 October 2025; after the 12th congress — deputy chairman.</p>' +
          '<p>Former DPR army major (2016–2018); from January 2023 — contract with Rosgvardiya (\'Oplot\' regiment). Order of Courage (Presidential Decree No. 416 of 6 June 2023).</p>' +
          '<p>The symbolic instrument of the party\'s rebranding as a military-patriotic force. After 25 October 2025, this role was curtailed.</p>' },
      { id: 'aksakov', label: 'A. Aksakov', sub: 'chairman, Duma Committee on Financial Market', x: 1080, y: 480, color: '#a1393b',
        hotspotTitle: 'A. G. Aksakov',
        hotspotBody:
          '<p>Duma MP for 6 convocations since 1999; chairman of the Duma Committee on the Financial Market since 2016; chairman of the Association of Russian Banks; RSPP board member.</p>' +
          '<p>Author of Federal Law No. 340-FZ of 24 July 2023 \'On the Digital Rouble\'. Major-capital functionary with parliamentary support.</p>' },
      { id: 'nl', label: '\'New People\'', sub: 'parallel project', x: 200, y: 600, color: '#e87d3e',
        hotspotTitle: 'Parallel registration 25.03.2020',
        hotspotBody:
          '<p><strong>\'For Truth\'</strong> (Prilepin) was registered by the Ministry of Justice on <strong>25 March 2020</strong>. <strong>\'New People\'</strong> (Nechayev) — on <strong>24 March 2020</strong>. One day apart.</p>' +
          '<p>The parallel registration of two new parties is a structural signal of co-ordinated party-building by the Kremlin ahead of the 2021 elections: \'For Truth\' expands the military-patriotic space; \'New People\' opens the niche of \'technocratic liberalism\'.</p>' +
          '<p>Both projects clear the 5% threshold in the 2021 elections; both enter the 8th Duma.</p>' +
          '<p><a href="novye-lyudi.html">New People dossier →</a></p>' },
    ],
    edges: [
      { from: 'ap', to: 'surkov', label: '2006' },
      { from: 'ap', to: 'kirienko', label: '2016+' },
      { from: 'surkov', to: 'mironov', label: 'merger 28.10.2006' },
      { from: 'kirienko', to: 'mironov', label: 'merger 26.03.2021' },
      { from: 'kirienko', to: 'prilepin', label: 'co-ordination', kind: 'dashed' },
      { from: 'kirienko', to: 'nl', label: 'same week 25.03.2020', kind: 'dashed' },
      { from: 'mironov', to: 'prilepin', label: 'until 25.10.2025' },
      { from: 'kirienko', to: 'aksakov', label: 'co-ordination', kind: 'dashed' },
    ],
  },

  /* ============== G. Crises and war (swimlane) ============== */
  // Two-lane timeline: WAR (faction votes + co-authorship) vs PARTY (mergers, rebrand, decorations)
  swimlane: {
    period: { start: '2022-02-01', end: '2025-11-30' },
    lanes: [
      { id: 'duma', label: 'WAR (Duma)', color: '#a1393b',
        events: [
          { date: '2022-03-04', label: 'FZ-32 false information', sub: 'unanimous in favour' },
          { date: '2022-09-20', label: 'Mobilisation', sub: 'Nilov co-author' },
          { date: '2022-10-03', label: 'Annexation of 4 regions', sub: '"faction unanimously backed the operation"' },
          { date: '2022-11-24', label: 'LGBT ban', sub: 'Mironov co-author' },
          { date: '2023-07-11', label: 'Digital rouble FZ-340', sub: 'Aksakov author' },
          { date: '2023-07-25', label: 'Conscription age raised to 30', sub: 'faction abstained en masse' },
          { date: '2024-02-14', label: 'Confiscation (false information)', sub: 'unanimous in favour' },
          { date: '2025-07-22', label: 'FZ-281 on VPN', sub: 'split faction vote' },
        ] },
      { id: 'party', label: 'PARTY', color: '#bea050',
        events: [
          { date: '2023-01-15', label: 'Prilepin joins Rosgvardiya', sub: '\'Oplot\' regiment' },
          { date: '2023-05-06', label: 'Assassination attempt on Prilepin', sub: 'Audi Q7 explosion' },
          { date: '2023-06-06', label: 'Order of Courage', sub: 'Decree No. 416' },
          { date: '2024-03-17', label: '2024 presidential election', sub: 'no candidate fielded; backed Putin' },
          { date: '2025-10-25', label: 'SR rebrand', sub: 'Prilepin demoted; Kirienko at congress' },
        ] },
    ],
    connection: {
      fromLaneId: 'duma', fromDate: '2022-09-20',
      toLaneId: 'party', toDate: '2025-10-25',
      label: 'from co-authorship of mobilisation to a public congress with the Presidential Administration overseer',
    },
  },

  /* ============== H. Foreign ties (lightweight static) ============== */
  foreignTies: {
    headline: 'No foreign funding identified · sanctions profile distributed across the leadership',
    items: [
      { label: 'Foreign donations to the party', status: 'not identified (prohibited by Article 30 of Federal Law No. 95-FZ)' },
      { label: 'Grant databases: NED, OSF, Heinrich Böll, Friedrich Ebert et al.', status: '0 matches (12 databases checked)' },
      { label: 'Sanctions (UK, US, EU, CA, AU, CH, JP)', status: 'Mironov, Babakov, Aksakov, Prilepin, Kabyshev' },
      { label: 'Babakov\'s ties to the Ukrainian energy sector (iStories)', status: 'open verification point' },
    ],
  },
};
