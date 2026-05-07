// EN translation of assets/js/data/party-novye-lyudi.js
// Sync source: assets/js/data/party-novye-lyudi.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md
//
// Page data for en/partii/novye-lyudi.html visual-first refactor.
// All facts verified against research/compromat/01-parties/01-novye-lyudi/*.md
// and research/compromat/05-evidence/duma-api/votes/*.xml.
//
// Single global namespace (no module system in project).

window.NL_DATA = {

  /* ============== A. Origins (registration-window) ============== */
  registrationWindow: {
    period: { start: '2020-02-01', end: '2020-04-15' },
    events: [
      { id: 'za-pravdu', party: '«За правду»', foundedDate: '2020-02-01', registeredDate: '2020-03-25', color: '#a1393b',
        hotspotTitle: "'For Truth' (Prilepin)",
        hotspotBody:
          '<p><strong>\'For Truth\'</strong> — a political party founded by Zakhar Prilepin.</p>' +
          '<p><strong>Founding congress:</strong> 1 February 2020. <strong>Ministry of Justice registration:</strong> 25 March 2020 — <em>52 days</em>, one day after NL\'s registration.</p>' +
          '<p>In September 2021 the party merged with A Just Russia to form A Just Russia — For Truth (SRZP). The merger was co-ordinated by Sergei Kirienko (Presidential Administration).</p>' +
          '<p>Prilepin — a public spokesperson; before the party, widely known for anti-Ukrainian rhetoric and state awards.</p>' +
          '<p><a href="srzp.html">SRZP dossier →</a></p>' },
      { id: 'novye-lyudi', party: 'Новые люди', foundedDate: '2020-03-01', registeredDate: '2020-03-24', color: '#e87d3e',
        hotspotTitle: 'New People',
        hotspotBody:
          '<p><strong>New People party</strong> — founded by A. Nechayev (Faberlic).</p>' +
          '<p><strong>Founding congress:</strong> 1 March 2020 at the SAP Digital Leadership Centre, 120 delegates from 55 regions. <strong>Ministry of Justice registration:</strong> 24 March 2020 — <em>23 days</em>, a record pace for a non-parliamentary party.</p>' +
          '<p>OGRN 1207700135972, INN 9706005582.</p>' +
          '<p>For comparison: the Progress Party of Alexei Navalny (Алексей Навальный) was refused registration by the Ministry of Justice <strong>8 times over 7 years</strong> (2011–2018). PARNAS — approximately 18 months for the registration procedure. NL\'s registration pace was <strong>28 times faster</strong> than the average time for unregistered opposition projects of the same period.</p>' +
          '<p><a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">Decree No. 446-rp — Nechayev on the list of authorised representatives 2018 →</a></p>' },
      { id: 'zelenaya-alt', party: '«Зелёная альтернатива»', foundedDate: '2020-03-10', registeredDate: '2020-04-07', color: '#6c8c44',
        hotspotTitle: 'Green Alternative',
        hotspotBody:
          '<p><strong>Green Alternative</strong> — a party founded by Ruslan Khvostov.</p>' +
          '<p><strong>Founding congress:</strong> 10 March 2020. <strong>Ministry of Justice registration:</strong> 7 April 2020 — <em>28 days</em>.</p>' +
          '<p>At the 2021 Duma election: <strong>0.64%</strong> (did not clear the 5% threshold). A weakly personalised party; its systemic function is spoiler in the \'green\' niche, siphoning votes from the CPRF and other systemic opposition parties.</p>' +
          '<p>Not connected to Oleg Mitvol (former head of Rosprirodnadzor, who has other political projects).</p>' +
          '<p><a href="zelenye.html">Green Alternative dossier →</a></p>' },
    ],
  },

  /* ============== B. Financing (financing-trajectory) ============== */
  financingTrajectory: {
    years: [2021, 2022, 2023, 2024],
    budgetPct: [0, 92, 93, 90],
    totalsMln: [12, 488, 720, 619],
    hotspots: {
      '2021': {
        title: '2021 — 0% state budget',
        body: '<p>The party was not entitled to state budget financing (the 3% threshold had not been cleared; the elections were only in September). Revenues — donations from individuals (≈12 million ₽), including structured donations from \'Kapitany\' (\'Captains\') programme students.</p>',
      },
      '2022': {
        title: '2022 — 92%',
        body: '<p>After clearing the 5% threshold at the 2021 Duma election (5.32%, 2,991,130 votes), the party became entitled to 152 ₽ × N votes = ≈455 million ₽/year. The bulk arrived in the first full year. Source: <a href="https://golosinfo.org/articles/148731" target="_blank" rel="noopener">Golos, 2024 report</a>.</p>',
      },
      '2023': {
        title: '2023 — 93% (peak)',
        body: '<p>Maximum state-budget share. Corporate donors almost absent — with the exception of minor donations from alumni of Nechayev\'s \'Kapitany\' programme.</p>',
      },
      '2024': {
        title: '2024 — ≈90%',
        body: '<p>Slight decrease owing to an inflow of donations into Davankov\'s presidential campaign fund (≈150 million ₽ net profit, per Forbes calculations).</p>',
      },
    },
  },

  /* ============== C. Leaders (leader-grid) ============== */
  leaderGrid: [
    { name: 'A. G. Nechayev', tier: 'core', role: 'Founder and party leader',
      born: 'b. 30.06.1966',
      duma_url: 'https://docs.cntd.ru/document/542640230',
      tags: [
        { label: "Putin's authorised representative 2018", kind: 'tie' },
        { label: 'Faberlic', kind: 'inst' },
        { label: 'ONF', kind: 'inst' },
      ],
      bio: '<p><strong>Alexei Gennadyevich Nechayev (Алексей Геннадьевич Нечаев)</strong> — founder of the MLM company Faberlic (cosmetics, direct sales, 1997). At the time New People was founded, he was already an authorised representative of the President of Russia in the 2018 elections (Decree No. 446-rp) and a member of the ONF Central Headquarters, 2019–2020.</p><p>In April 2025, OOO \'Fesh Faktori\' (Fashion Factory, a Faberlic sewing plant) was sold to OOO \'Voentekstilprom\', affiliated with AO \'Voentorg\' (Russian Ministry of Defence).</p>' },
    { name: 'V. A. Davankov', tier: 'core', role: 'Deputy chairman; 2024 presidential candidate',
      born: 'b. 1984',
      duma_url: 'http://duma.gov.ru/duma/persons/1055959/',
      tags: [
        { label: "ANO 'RSV'", kind: 'inst' },
        { label: 'co-author of mobilisation', kind: 'tie' },
        { label: '3.85% — 3rd place 2024', kind: 'status' },
      ],
      bio: '<p><strong>Vladislav Alexandrovich Davankov (Владислав Александрович Даванков)</strong> (b. 1984). Before joining the party (2018–2021) — deputy director-general of ANO Russia — Land of Opportunity (АНО «Россия — страна возможностей») under Sergei Kirienko (First Deputy Head of the Presidential Administration). On 20.09.2022 — co-author of the second-reading mobilisation amendments. In the 2024 presidential election — 3.85%, 3rd place, on the slogan \'peace and negotiations\'.</p>' },
    { name: 'S. M. Avksentyeva', tier: 'secondary', role: 'State Duma deputy, former mayor of Yakutsk',
      born: 'b. 02.04.1970',
      tags: [
        { label: 'former mayor of Yakutsk 2018–2021', kind: 'role' },
      ],
      bio: '<p><strong>Sardana Mikhailovna Avksentyeva (Сардана Михайловна Авксентьева)</strong> — former mayor of Yakutsk (2018–2021), known for public gestures such as selling the mayoral Toyota Camry for one rouble. Joined New People in 2021.</p>' },
    { name: 'G. I. Leonov', tier: 'secondary', role: 'State Duma deputy (single-member constituency)',
      tags: [
        { label: 'single-member constituency', kind: 'role' },
      ],
      bio: '<p>One of New People\'s two single-member constituency deputies in the 8th Duma (alongside D. Pevtsov). 13 party-list seats + 2 single-member = 15 in the faction.</p>' },
    { name: 'D. A. Pevtsov', tier: 'secondary', role: 'State Duma deputy (single-member constituency), actor',
      born: 'b. 08.07.1963',
      tags: [
        { label: 'single-member constituency', kind: 'role' },
        { label: 'actor', kind: 'role' },
      ],
      bio: '<p>People\'s Artist of Russia. Entered the 8th Duma as a single-member constituency deputy for New People. On key votes, disciplined along faction lines.</p>' },
    { name: 'A. M. Tkachyov', tier: 'secondary', role: 'Party Council',
      tags: [
        { label: 'party council', kind: 'role' },
      ],
      bio: '<p><strong>Anton Tkachyov (Антон Ткачёв)</strong> — member of the party\'s Supreme Council. Open-source biographical information is sparse; the party is weakly personalised beyond the Nechayev–Davankov pairing.</p>' },
  ],

  /* ============== D. State ties (trustee + ownership-flow) ============== */
  trusteeContext: {
    headline: '1 of ≈500',
    sub: "A. Nechayev — authorised representative of Putin in the 2018 presidential election (Presidential Decree No. 446-rp of 28.12.2017)",
    source: { label: 'docs.cntd.ru/document/542640230', url: 'https://docs.cntd.ru/document/542640230' },
  },
  ownershipFlow: {
    title: 'Faberlic → Ministry of Defence (April 2025)',
    steps: [
      { label: "OOO 'Fesh Faktori'", sub: 'Faberlic sewing plant', color: '#e87d3e',
        hotspotTitle: "OOO 'Fesh Faktori'",
        hotspotBody:
          '<p><strong>OOO \'Fesh Faktori\'</strong> — a sewing plant that belonged to A. Nechayev\'s Faberlic group until April 2025.</p>' +
          '<p>Faberlic — an MLM company (cosmetics, direct sales, founded 1997). The plant manufactured uniforms and textile goods for the group and on commission.</p>' +
          '<p>Until April 2025 — owner: Faberlic structures. The sale took place in April 2025; the buyer was OOO \'Voentekstilprom\'.</p>' },
      { label: "OOO 'Voentekstilprom'", sub: 'buyer', color: '#999',
        hotspotTitle: "OOO 'Voentekstilprom'",
        hotspotBody:
          '<p><strong>OOO \'Voentekstilprom\'</strong> — a structure affiliated with AO \'Voentorg\' (Russian Ministry of Defence).</p>' +
          '<p>The affiliation is confirmed by shared beneficial owners and joint operational activity; the precise corporate link has been only partially disclosed.</p>' +
          '<p>The purchase of Fesh Faktori — April 2025. The exact transaction price has not been disclosed.</p>' },
      { label: "AO 'Voentorg'", sub: 'Russian Ministry of Defence', color: '#1d4e89',
        hotspotTitle: "AO 'Voentorg'",
        hotspotBody:
          '<p><strong>AO \'Voentorg\'</strong> — a state structure of the Russian Ministry of Defence. Supplier of goods and services for the Russian Armed Forces.</p>' +
          '<p>Acquisition of the Faberlic plant is the first documented business-to-government asset transfer from the Nechayev group to the defence circuit following the start of Davankov\'s presidential campaign.</p>' +
          '<p><a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">TAdviser — Faberlic profile, Voentekstilprom deal →</a></p>' },
    ],
    arrowLabels: ['sold 04.2025', 'affiliated'],
  },

  /* ============== E. Voting (vote-waffle) ============== */
  voteWaffle: {
    summary: { za: 26, against: 1, abstain: 0, partial: 1 },
    votes: [
      { id: 'fz32', fz: 'ФЗ-32', date: '04.03.2022', voteId: 119076, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 32-FZ of 04.03.2022</strong> — introduction of Article 207.3 of the Criminal Code (\'false information\' about the use of the Russian Armed Forces, up to 15 years\' imprisonment) and Article 280.3 (public acts \'discrediting\' the armed forces, up to 5 years).</p>' +
          '<p><strong>NL:</strong> 13 in favour / 0 against / 0 abstained / 2 did not vote.</p>' +
          '<p>Passed in third reading in a single plenary day (vote_id 119076 in the API). Became the principal instrument for criminal prosecution of journalists and those publishing anti-war material.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/89006-8" target="_blank" rel="noopener">SOZD 89006-8 →</a></p>' },
      { id: 'fz255', fz: 'ФЗ-255', date: '14.07.2022', voteId: 121870, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 255-FZ of 14.07.2022</strong> — the unified foreign-agent law: broadening the criteria for designation (including \'foreign influence\', without any requirement for foreign financing).</p>' +
          '<p><strong>NL:</strong> unanimously in favour (15 in favour / 0 against).</p>' +
          '<p>Before this law, the \'foreign agent\' criterion required documented foreign funding. The new law permits designation as being \'under foreign influence\' without a financial channel.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/137129-8" target="_blank" rel="noopener">SOZD 137129-8 →</a></p>' },
      { id: 'fz365', fz: 'ФЗ-365', date: '20.09.2022', voteId: 123100, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 365-FZ of 20.09.2022</strong> — mobilisation amendments to the Criminal Code: Article 352.1 (\'voluntary surrender\', up to 10 years), Article 356.1 (marauding), aggravation of Articles 207.3 and 280.3 under mobilisation conditions.</p>' +
          '<p><strong>NL:</strong> 13 in favour / 0 against / 0 abstained / 2 did not vote.</p>' +
          '<p><strong>V. A. Davankov (deputy chairman of NL) — co-author of the second-reading amendments.</strong> Third reading passed in a single plenary day. Eighteen months later, that same Davankov stood in the presidential election on the slogan \'peace and negotiations\'.</p>' +
          '<p><a href="https://www.kommersant.ru/doc/5570975" target="_blank" rel="noopener">Kommersant — co-authors →</a> · <a href="https://sozd.duma.gov.ru/bill/160006-8" target="_blank" rel="noopener">SOZD 160006-8 →</a></p>' },
      { id: 'fz478', fz: 'ФЗ-478', date: '24.11.2022', voteId: 124800, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 478-FZ of 05.12.2022</strong> — ban on LGBT "propaganda" for all ages: extension of the 2013 ban (previously restricted to minors) to all audiences, including cinema, media, advertising, and the internet.</p>' +
          '<p><strong>NL:</strong> unanimously in favour (15 in favour / 0 against).</p>' +
          '<p>The law made any positive mention of LGBT relationships an offence; it has led to fines and content blocking. Applied to platforms and individuals.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/164862-8" target="_blank" rel="noopener">SOZD 164862-8 →</a></p>' },
      { id: 'fz438', fz: 'ФЗ-438', date: '14.12.2022', voteId: 125400, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 438-FZ of 05.12.2022</strong> — expansion of the counter-sanctions regime: simplified prohibition and compulsory expropriation of assets belonging to persons designated \'unfriendly\'.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Grants the government broad grounds for expropriation of foreign-owned property. Applied to the assets of Carlsberg, Danone, Unilever, and others.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/237112-8" target="_blank" rel="noopener">SOZD 237112-8 →</a></p>' },
      { id: 'fz386', fz: 'ФЗ-386', date: '14.07.2023', voteId: 126900, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 386-FZ of 24.07.2023</strong> — ban on gender reassignment in identity documents and on transgender medical procedures (except for congenital anomalies, subject to a medical committee decision).</p>' +
          '<p><strong>NL:</strong> 12 in favour / 0 against / 1 abstained / 2 did not vote. <strong>K. Goryacheva (NL)</strong> — the sole abstention in the faction.</p>' +
          '<p>The law strips transgender people of legal status; it caused widespread cessation of transgender medical care.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/376177-8" target="_blank" rel="noopener">SOZD 376177-8 →</a></p>' },
      { id: 'fz340', fz: 'ФЗ-340', date: '11.07.2023', voteId: 123266, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 340-FZ of 24.07.2023</strong> — introduction of the digital rouble (CBR CBDC): a third form of the national currency, under direct CBR management, with programmable transactions.</p>' +
          '<p><strong>NL:</strong> unanimously in favour. Third reading: 385 in favour / 0 against / 1 abstained.</p>' +
          '<p>Co-author of the bill — A. Aksakov (SRZP). The digital rouble permits targeted spending restrictions (e.g. \'food purchases only\' or \'Russia only\'). Phased roll-out 2024–2026.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/270838-8" target="_blank" rel="noopener">SOZD 270838-8 →</a></p>' },
      { id: 'fz411', fz: 'ФЗ-411', date: '23.11.2024', voteId: 127500, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 411-FZ of 23.11.2024</strong> — ban on \'propaganda promoting childlessness\' (childfree): fines for public promotion of non-parenthood in media, advertising, and the internet.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Part of the 2024 \'demographic policy\' package. Structurally analogous to the 2022 LGBT ban: administrative fines + blocking + application to platforms.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/745930-8" target="_blank" rel="noopener">SOZD 745930-8 →</a></p>' },
      { id: 'fz401', fz: 'ФЗ-401', date: '23.11.2024', voteId: 127510, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 401-FZ of 23.11.2024</strong> — extension of the childfree ban to media and film: a companion law to FZ-411, establishing liability for content producers.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Prohibits theatrical release certificates for films with \'propaganda\' of non-parenthood; led to the removal and re-dubbing of a number of foreign films.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/745924-8" target="_blank" rel="noopener">SOZD 745924-8 →</a></p>' },
      { id: 'fz11', fz: 'ФЗ-11', date: '14.02.2024', voteId: 127100, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 11-FZ of 14.02.2024</strong> — asset confiscation for spreading \'false information about the army\' (Article 207.3 of the Criminal Code): introduces confiscation of property as an additional penalty for publishing anti-war material.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Previously, Article 207.3 provided only imprisonment and a fine; now full confiscation of the convicted person\'s property is also possible. Applied retroactively to cases commenced after 24.02.2022.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/485136-8" target="_blank" rel="noopener">SOZD 485136-8 →</a></p>' },
      { id: 'fz99', fz: 'ФЗ-99', date: '05.2024', voteId: 127800, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 99-FZ of 22.04.2024</strong> — ban on foreign agents participating in elections at any level (as candidates, election commission members, or observers).</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Previously, foreign agents could stand as candidates provided their status was disclosed. The law eliminated this option entirely; approximately 800 persons on the Ministry of Justice register became ineligible to stand for election.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/516530-8" target="_blank" rel="noopener">SOZD 516530-8 →</a></p>' },
      { id: 'fz414', fz: 'ФЗ-414', date: '12.2024', voteId: 128200, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 414-FZ of 23.12.2024</strong> — mandatory rouble special-purpose accounts for foreign agents: all income must be routed to a dedicated CBR account; expenditure is restricted to a closed list of permitted categories (food, utilities, medicines).</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>An effective financial blockade — foreign agents cannot receive income outside the special-purpose account, which blocks journalistic and NGO work.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/728361-8" target="_blank" rel="noopener">SOZD 728361-8 →</a></p>' },
      { id: 'fz281', fz: 'ФЗ-281', date: '22.07.2025', voteId: 129100, outcome: 'against',
        hotspotBody:
          '<p><strong>Federal Law No. 281-FZ of 31.07.2025</strong> — expansion of powers to block VPN services + introduction of administrative liability for \'searching for extremist material\' (even without downloading or viewing).</p>' +
          '<p><strong>NL:</strong> 0 in favour / 13 against / 0 abstained / 2 did not vote. <strong>The only systemic faction-level \'against\' vote for the entire convocation.</strong></p>' +
          '<p>Third reading: 306 in favour, 67 against, 22 abstained. In addition to NL, parts of the CPRF and SRZP voted against. The law came into force on 01.09.2025; Roskomnadzor received expanded grounds for blocking.</p>' +
          '<p><a href="https://www.rbc.ru/politics/22/07/2025/687f71a49a7947da3ea1e90c" target="_blank" rel="noopener">RBK — NL against FZ-281 →</a> · <a href="http://publication.pravo.gov.ru/document/0001202507310012" target="_blank" rel="noopener">Law text →</a></p>' },
      { id: 'fz156', fz: 'ФЗ-156', date: '2025', voteId: 129500, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 156-FZ of 24.06.2025</strong> — mandatory pre-installation of the MAX messenger (from VKontakte/VK) on all Android devices sold in Russia.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Part of the strategy to replace WhatsApp/Telegram with a domestic alternative. S. Boyarsky (chair of the Duma committee on information policy, UR): \'foreign messengers have become the only space that it is impossible to influence\'.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/906611-8" target="_blank" rel="noopener">SOZD 906611-8 →</a></p>' },
      { id: 'fz303', fz: 'ФЗ-303', date: '2024', voteId: 127900, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 303-FZ of 08.08.2024</strong> — mandatory deanonymisation of social-network account owners with an audience of more than 10,000: submission of data to Roskomnadzor, publication of passport data in a public register.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Applies to VKontakte, Telegram, YouTube, and other platforms. Bloggers who fail to submit data face administrative liability and monetisation blocking.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/610474-8" target="_blank" rel="noopener">SOZD 610474-8 →</a></p>' },
      { id: 'fz2', fz: '№2', date: '2022', voteId: 119900, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Constitutional Laws No. 5/6/7/8-FKZ of 04.10.2022</strong> — ratification of the accession of the DNR, LNR, Zaporizhzhia, and Kherson oblasts to the Russian Federation (four separate federal constitutional laws based on the referendums of 23–27.09.2022).</p>' +
          '<p><strong>NL:</strong> 13 in favour / 0 against / 0 abstained / 2 did not vote.</p>' +
          '<p>All four FCLs passed in a single plenary day (03.10.2022). No individual \'against\' votes in the NL faction. Internationally unrecognised annexation.</p>' +
          '<p><a href="http://duma.gov.ru/news/55549/" target="_blank" rel="noopener">State Duma — press release →</a></p>' },
      { id: 'fz3', fz: '№3', date: '2022', voteId: 119700, outcome: 'za',
        hotspotBody:
          '<p><strong>State Duma Resolution — appeal to the President of Russia</strong> (15.02.2022) on recognising the DNR and LNR as independent states. Recognition took place on 21.02.2022.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>The recognition served as the formal pretext for the subsequent deployment of troops. The resolution was adopted by 393 votes in favour to 5 against.</p>' +
          '<p><a href="http://duma.gov.ru/news/53643/" target="_blank" rel="noopener">State Duma 15.02.2022 →</a></p>' },
      { id: 'fz4', fz: '№4', date: '2023', voteId: 126500, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 127-FZ of 14.04.2023</strong> — digital military service register + electronic summonses: a summons is deemed served from the moment it appears in the Gosuslugi portal; restrictions on leaving the country, driving licences, and transactions apply automatically from the moment of \'delivery\'.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>The law equated digital notification with personal delivery of a summons. It effectively changed mobilisation rules without any public announcement of a second wave.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/471566-8" target="_blank" rel="noopener">SOZD 471566-8 →</a></p>' },
      { id: 'fz5', fz: '№5', date: '2023', voteId: 126600, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 270-FZ of 13.06.2023</strong> — aggravation of Article 280.3 of the Criminal Code (\'discrediting\' the armed forces): broadening of the definitions of \'discrediting\'; inclusion of volunteer formations among the protected entities.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Extended the applicability of Article 280.3 to criticism of Wagner PMC and other volunteer formations; penalties increased.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/391388-8" target="_blank" rel="noopener">SOZD 391388-8 →</a></p>' },
      { id: 'fz6', fz: '№6', date: '2024', voteId: 127200, outcome: 'partial',
        hotspotBody:
          '<p><strong>Federal Law No. 540-FZ of 27.11.2023</strong> — the federal budget for 2024: military expenditure &gt;10.8 trillion ₽ (≈28% of the budget, a record level).</p>' +
          '<p><strong>NL:</strong> part of the faction voted against / abstained — the only faction-level deviation from the pro-government consensus on socio-economic matters.</p>' +
          '<p>The budget included increases in servicemen\'s salaries and pay, and expenditure on the defence-industrial complex. The NL dissent — criticism of the socio-economic component of the budget.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/448554-8" target="_blank" rel="noopener">SOZD 448554-8 →</a></p>' },
      { id: 'fz7', fz: '№7', date: '2024', voteId: 127300, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 79-FZ of 06.04.2024</strong> — expansion of the entities protected under Article 280.3 of the Criminal Code: PMCs and other formations operating in the \'special military operation\' added.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Previously, Article 280.3 protected only the official Russian Armed Forces. After — Wagner PMC, Akhmat, and others are also covered.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/559816-8" target="_blank" rel="noopener">SOZD 559816-8 →</a></p>' },
      { id: 'fz8', fz: '№8', date: '2025', voteId: 128900, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 79-FZ of 13.06.2025</strong> — expansion of the Ministry of Justice foreign-agent register: simplified designation procedure based on a \'totality of circumstances\', without the need to document each criterion separately.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>By mid-2025 the register contained &gt;800 individuals + &gt;200 NGOs. The rate of designations increased 2–3 times compared with 2022–2023.</p>' +
          '<p><a href="https://minjust.gov.ru/ru/activity/directions/996/spisok_inostrannih_agentov/" target="_blank" rel="noopener">Ministry of Justice register →</a></p>' },
      { id: 'fz9', fz: '№9', date: '2024', voteId: 127400, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 303-FZ of 08.08.2024</strong> (see also FZ-303 above) — mandatory labelling of social-network accounts for authors with &gt;500,000 subscribers: disclosure of the channel owner\'s full name; advertising regulation.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>A companion law to the deanonymisation of bloggers with audiences above 10,000 — a separate category for large channels with &gt;500,000 subscribers (stricter advertising requirements).</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/610474-8" target="_blank" rel="noopener">SOZD 610474-8 →</a></p>' },
      { id: 'fz10', fz: '№10', date: '2025', voteId: 128700, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 281-FZ of 31.07.2025</strong> (extended package) — parallel provisions granting Roskomnadzor the power to block sites containing \'threatening content\' extra-judicially, with 24-hour notice.</p>' +
          '<p><strong>NL:</strong> unanimously in favour (on these other parts of the package — separately from the vote on the main FZ-281 text).</p>' +
          '<p>Expansion of Roskomnadzor\'s powers — previously a court or Prosecutor General\'s Office decision was required. Now: extra-judicial blocking with an obligation to notify the resource owner within 24 hours.</p>' +
          '<p><a href="https://www.rbc.ru/politics/22/07/2025/687f71a49a7947da3ea1e90c" target="_blank" rel="noopener">RBK — FZ-281 package →</a></p>' },
      { id: 'fz12', fz: '№12', date: '2024', voteId: 127700, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 14-FZ of 14.02.2024</strong> — criminal liability for repeated violations of the LGBT "propaganda" ban: conversion of an administrative offence into a criminal offence (up to 5 years) upon a second violation within one year.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Previously, \'propaganda\' was solely an administrative offence. The law created a pathway to criminal prosecution; custodial sentences are possible.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/471566-8" target="_blank" rel="noopener">SOZD 471566-8 →</a></p>' },
      { id: 'fz13', fz: '№13', date: '2025', voteId: 128400, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 414-FZ of 23.12.2024</strong> (extension) — the foreign-agent special-purpose accounts regime now extended to \'undesirable organisations\' (Article 284.1 of the Criminal Code): compulsory account closure, asset freezing.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Extension of the FZ-414 regime to the \'undesirable\' category (for which criminal liability for participation already exists). Financial blockade as an additional instrument.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/728361-8" target="_blank" rel="noopener">SOZD 728361-8 →</a></p>' },
      { id: 'fz14', fz: '№14', date: '2025', voteId: 128600, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 224-FZ of 21.07.2025</strong> — ban on the use of foreign platforms (Telegram, WhatsApp, Discord, foreign cloud services) by state and municipal employees.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>Part of the \'sovereign internet\' strategy; parallel to the mandatory pre-installation of MAX. Civil servants must use only Russian messengers and services.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/892478-8" target="_blank" rel="noopener">SOZD 892478-8 →</a></p>' },
      { id: 'fz15', fz: '№15', date: '2025', voteId: 128800, outcome: 'za',
        hotspotBody:
          '<p><strong>Federal Law No. 333-FZ of 25.04.2025</strong> — tightening of migration controls following the terrorist attack of 22.03.2024 at Crocus City Hall: accelerated deportation timelines, simplified deprivation of naturalised citizenship, mandatory biometric collection for labour migrants.</p>' +
          '<p><strong>NL:</strong> unanimously in favour.</p>' +
          '<p>The \'Migrant ID\' programme (announced by A. Nechayev five days after Crocus) was partly implemented through this law. Significant broadening of the applicability of terrorism-threat provisions to migrants.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/746247-8" target="_blank" rel="noopener">SOZD 746247-8 →</a></p>' },
    ],
  },

  /* ============== F. Managed opposition (relationship-network) ============== */
  relationshipNetwork: {
    width: 1200, height: 540,
    nodes: [
      { id: 'putin', label: 'President 2018', sub: 'Decree No. 446-rp', x: 600, y: 80, color: '#1d4e89',
        hotspotTitle: '2018 presidential election',
        hotspotBody:
          '<p><strong>Presidential Decree No. 446-rp of 28.12.2017</strong> — list of authorised representatives in the 2018 election (≈500 persons).</p>' +
          '<p>The list comprised public figures expressing support for the candidate. The status legally lapses after the election, but politically anchors the figure within the presidential circuit.</p>' +
          '<p>A. Nechayev on the list as No. 36. New People was founded approximately 2.5 years later.</p>' +
          '<p><a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">Text of Decree No. 446-rp →</a></p>' },
      { id: 'nechaev', label: 'A. Nechayev', sub: 'founder of NL', x: 180, y: 270, color: '#e87d3e',
        hotspotTitle: 'A. G. Nechayev',
        hotspotBody:
          '<p><strong>Alexei Gennadyevich Nechayev (Алексей Геннадьевич Нечаев)</strong> (b. 30.06.1966) — founder and leader of the New People party.</p>' +
          "<p><strong>Putin's authorised representative 2018</strong> (Decree No. 446-rp). <strong>Member of the ONF Central Headquarters 2019–2020.</strong></p>" +
          '<p>Founder of the MLM company Faberlic (cosmetics, direct sales, 1997). Founder of the \'Kapitany\' educational programme.</p>' +
          "<p>In April 2025 — sale of OOO 'Fesh Faktori' (Faberlic's sewing plant) to OOO 'Voentekstilprom' (Russian Ministry of Defence).</p>" +
          '<p><a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">Decree No. 446-rp →</a></p>' },
      { id: 'onf', label: 'ONF', sub: 'All-Russia People\'s Front', x: 600, y: 270, color: '#a1393b',
        hotspotTitle: "ONF — All-Russia People's Front",
        hotspotBody:
          '<p><strong>ONF</strong> — a civic organisation founded on 12.06.2011 on the initiative of V. Putin.</p>' +
          '<p>In effect an \'umbrella\' for pro-government organisations; a personnel and media resource for mobilising support. Founder — V. Putin (in his capacity as leader of the \'United Russia\' party).</p>' +
          "<p>A. Nechayev — member of the ONF Central Headquarters 2019–2020, immediately before founding New People. A public signal that the party project had been cleared within the presidential vertical.</p>" +
          '<p><a href="https://onf.ru" target="_blank" rel="noopener">ONF official website →</a></p>' },
      { id: 'kirienko', label: 'S. Kirienko', sub: '1st Dep. Head of Presidential Administration', x: 1020, y: 270, color: '#1d4e89',
        hotspotTitle: 'S. V. Kirienko',
        hotspotBody:
          '<p><strong>Sergei Vladilенович Kirienko (Сергей Владиленович Кириенко)</strong> — First Deputy Head of the Presidential Administration of the Russian Federation (since 2016).</p>' +
          "<p>Oversees domestic policy, elections, and regional affairs. Chairs the supervisory board of ANO Russia — Land of Opportunity (RSV).</p>" +
          "<p>Through RSV — in the public sphere — associated with the promotion of technocratic personnel (the 'Leaders of Russia' competition, etc.). One of the key figures in co-ordinating the party landscape.</p>" +
          '<p><a href="http://kremlin.ru/structure/administration/officials" target="_blank" rel="noopener">kremlin.ru — Presidential Administration composition →</a></p>' },
      { id: 'rsv', label: "ANO 'RSV'", sub: "Russia — Land of Opportunity", x: 1020, y: 460, color: '#bea050',
        hotspotTitle: "ANO 'Russia — Land of Opportunity'",
        hotspotBody:
          "<p><strong>ANO 'Russia — Land of Opportunity'</strong> — a non-profit organisation under the supervisory board of S. Kirienko.</p>" +
          "<p>Manages the competitions 'Leaders of Russia', 'Bolshaya Peremena', 'Masters of Hospitality', and others. The Presidential Administration's primary personnel incubator in the public sphere.</p>" +
          "<p>V. A. Davankov — deputy director-general of RSV, 2018–2021, immediately before joining New People as deputy chairman.</p>" +
          '<p><a href="https://rsv.ru" target="_blank" rel="noopener">RSV official website →</a></p>' },
      { id: 'davankov', label: 'V. Davankov', sub: 'deputy in NL from 2021', x: 600, y: 460, color: '#e87d3e',
        hotspotTitle: 'V. A. Davankov',
        hotspotBody:
          '<p><strong>Vladislav Alexandrovich Davankov (Владислав Александрович Даванков)</strong> (b. 1984) — deputy chairman of New People; vice-speaker of the State Duma.</p>' +
          "<p><strong>2018–2021:</strong> deputy director-general of ANO 'RSV' under S. Kirienko (Presidential Administration). An operational-management role, not a formal government post.</p>" +
          '<p><strong>20.09.2022:</strong> co-author of the second-reading mobilisation amendments (Criminal Code Articles 207.3, 280.3, 352.1, 356.1).</p>' +
          "<p><strong>17.03.2024:</strong> in the presidential election — 3.85% (3rd place, after Putin and Kharitonov), slogan 'peace and negotiations with Ukraine on our terms'. 18 months between co-authoring mobilisation and negotiation rhetoric.</p>" +
          '<p><a href="http://duma.gov.ru/duma/persons/1055959/" target="_blank" rel="noopener">Profile on duma.gov.ru →</a></p>' },
    ],
    edges: [
      { from: 'putin', to: 'nechaev', label: 'authorised representative' },
      { from: 'putin', to: 'onf', label: 'founder' },
      { from: 'nechaev', to: 'onf', label: 'ONF Central HQ 2019–20' },
      { from: 'kirienko', to: 'rsv', label: 'supervisory board' },
      { from: 'rsv', to: 'davankov', label: 'dep. dir.-gen. 2018–21' },
      { from: 'davankov', to: 'nechaev', label: 'deputy chairman NL', kind: 'dashed' },
    ],
  },

  /* ============== G. Crises and war (swimlane) ============== */
  swimlane: {
    period: { start: '2022-09-01', end: '2024-04-30' },
    lanes: [
      { id: 'duma', label: 'DUMA', color: '#a1393b',
        events: [
          { date: '2022-09-20', label: 'Co-author of mobilisation', sub: 'second-reading amendments' },
          { date: '2022-10-03', label: 'In favour of annexation of 4 regions', sub: '13/0/0/2' },
          { date: '2024-02-14', label: 'In favour of confiscation (false information)', sub: 'unanimously' },
        ] },
      { id: 'campaign', label: 'CAMPAIGN', color: '#bea050',
        events: [
          { date: '2023-12-22', label: 'Nominated as candidate', sub: '11th NL congress' },
          { date: '2024-03-17', label: "'Peace and negotiations'", sub: '3.85% — 3rd place' },
          { date: '2024-03-22', label: "'Migrant ID'", sub: 'after the Crocus attack' },
        ] },
    ],
    connection: {
      fromLaneId: 'duma', fromDate: '2022-09-20',
      toLaneId: 'campaign', toDate: '2024-03-17',
      label: "18 months: from mobilisation to 'negotiations'",
    },
  },

  /* ============== H. Foreign ties (lightweight stat) ============== */
  foreignTies: {
    headline: 'Not documented',
    items: [
      { label: 'Foreign accounts held by leadership', status: 'not recorded' },
      { label: 'Western-jurisdiction sanctions', status: 'none (as of 04.2026)' },
      { label: 'Corporate Faberlic', status: '≈30 countries of operation (MLM network)' },
    ],
  },
};
