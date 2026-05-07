// EN translation of assets/js/data/party-kprf.js
// Sync source: assets/js/data/party-kprf.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

window.KPRF_DATA = {

  /* ============== B. Financing (financing-trajectory) ============== */
  // State share of party revenues 2021–2024.
  financingTrajectory: {
    years: [2021, 2022, 2023, 2024],
    budgetPct: [80, 86, 94, 84],
    totalsMln: [1800, 1900, 1700, 2600],
    hotspots: {
      '2021': {
        title: '2021 — ≈80% (election year)',
        body:
          '<p><strong>2021 was the year of the Duma elections.</strong> Revenues — ≈1.8 bn ₽; state budget share ≈80%.</p>' +
          '<p>In election years the volume of donations rises, so the budget share is relatively lower.</p>' +
          '<p>At the 2021 Duma elections (17–19 September) KPRF received <strong>18.93% (10,660,669 votes)</strong> — the best result in 13 years; this forms the basis for calculating the annual state subsidy for the next five years.</p>' +
          '<p><a href="https://golosinfo.org/articles/148731" target="_blank" rel="noopener">Golos — party financing 2020–2023 →</a></p>',
      },
      '2022': {
        title: '2022 — 86%',
        body:
          '<p><strong>First full year after the elections.</strong> Revenues — ≈1.9 bn ₽; state budget share 86%.</p>' +
          '<p>Calculation under Art. 33 of ФЗ-95: 152 ₽ × 10,660,669 votes = <strong>≈1.62 bn ₽/year</strong> in annual budget transfers until the next Duma elections.</p>' +
          '<p>This explains why the party\'s total revenues in 2022–2024 fluctuate around 1.7–1.9 bn ₽: the main revenue source between elections is the ФЗ-95 state subsidy.</p>' +
          '<p><a href="https://www.consultant.ru/document/cons_doc_LAW_32459/" target="_blank" rel="noopener">ФЗ № 95-ФЗ Art. 33 →</a></p>',
      },
      '2023': {
        title: '2023 — 94% (record state dependency)',
        body:
          '<p><strong>Record state dependency in the party\'s post-Soviet history.</strong> Revenues — ≈1.7 bn ₽; state budget share — <strong>94%</strong>.</p>' +
          '<p>Structural paradox: a party that ideologically declares an anti-capitalist course is materially sustained 94% by the state budget of the very capitalist system it formally opposes.</p>' +
          '<p>The party\'s electoral function becomes a self-sustaining mechanism for maintaining the financial flow: any fall below the 5% threshold automatically cuts the party off from ≈1.6 bn ₽/year.</p>' +
          '<p><a href="https://www.kommersant.ru/doc/6551787" target="_blank" rel="noopener">Коммерсантъ — party CEC reports →</a></p>',
      },
      '2024': {
        title: '2024 — 84.4% (including the presidential campaign)',
        body:
          '<p><strong>2024 — the year of Kharitonov\'s presidential campaign.</strong> Revenues — ≈2.6 bn ₽; state budget share 84.4%.</p>' +
          '<p>The lower share is due to the inflow of donations to Kharitonov\'s campaign fund (≈560 m ₽ in the fund; less than 200 m ₽ actually spent).</p>' +
          '<p>According to Forbes calculations, the party\'s net profit from the presidential campaign was <strong>≈407 m ₽</strong> — more than LDPR (≈220 m) and New People (≈150 m). Yet Kharitonov\'s result (4.31%) was the worst in 25 years.</p>' +
          '<p><a href="https://www.forbes.ru/finansy/508487-kprf-ldpr-i-novye-ludi-smogli-zarabotat-na-vyborah-prezidenta" target="_blank" rel="noopener">Forbes — party earnings in 2024 →</a></p>',
      },
    },
  },

  /* ============== C. Leaders (leader-grid) ============== */
  leaderGrid: [
    { name: 'G. A. Zyuganov', tier: 'core', role: 'Chairman of the KPRF Central Committee since 22.01.1995',
      born: 'b. 26.06.1944',
      duma_url: 'http://duma.gov.ru/duma/persons/99100330/',
      tags: [
        { label: 'CC Chairman since 1995', kind: 'role' },
        { label: 'State Council of Russia since 2012', kind: 'tie' },
        { label: 'Hero of Labour of Russia 2024', kind: 'status' },
        { label: 'co-author ФЗ-478 LGBT ban', kind: 'tie' },
        { label: 'co-author ФЗ-386 gender-reassignment ban', kind: 'tie' },
        { label: 'co-author ФЗ-11 confiscation', kind: 'tie' },
      ],
      bio:
        '<p><strong>Gennady Andreyevich Zyuganov (Геннадий Андреевич Зюганов)</strong> (b. 26.06.1944, village of Mymrino, Oryol Oblast) — Chairman of the KPRF Central Committee since 22 January 1995 and a member of the State Duma for convocations I–VIII continuously since 1993. Trained as a maths teacher (Oryol Pedagogical Institute, 1969). Before the Soviet collapse — Deputy Head of the Ideology Department of the CPSU (Communist Party of the Soviet Union) Central Committee.</p>' +
        '<p><strong>Uninterrupted leadership of more than 30 years</strong> — a record for any post-Soviet Russian party. Zyuganov\'s status as an irremovable leader was legally cemented in 2014 by amendments to the party\'s rules permitting re-election of the CC Chairman an unlimited number of times.</p>' +
        '<p><strong>Member of the State Council of Russia since 5 June 2012.</strong> Following the 2020 constitutional reform, the State Council\'s status was elevated to that of a constitutional body (Art. 83 of the Constitution as amended).</p>' +
        '<p><strong>Awards.</strong> Orders of Merit for the Fatherland (grades IV in 1999, III in 2004, II in 2014); Order of Alexander Nevsky (2019); Orders of Friendship and of Honour; Order of St Daniel of Moscow (Russian Orthodox Church). On 26 June 2024, on the occasion of his 80th birthday — the title Hero of Labour of the Russian Federation (Decree No. 544 of 26.06.2024). Fellow recipients of the title include Igor Sechin, Ramzan Kadyrov, and Sergei Lavrov.</p>' +
        '<p><strong>Co-author of repressive legislation.</strong> Zyuganov personally signed as co-author: ФЗ № 478-ФЗ of 05.12.2022 (ban on LGBT "propaganda"); ФЗ № 386-ФЗ of 24.07.2023 (ban on gender reassignment); ФЗ № 11-ФЗ of 14.02.2024 (confiscation of assets for spreading false information).</p>',
    },
    { name: 'Yu. V. Afonin', tier: 'core', role: 'First Deputy Chairman of the KPRF Central Committee since 2017',
      born: 'b. 22.04.1977, Tula',
      duma_url: 'http://duma.gov.ru/duma/persons/99100340/',
      tags: [
        { label: 'First Deputy CC Chairman since 2017', kind: 'role' },
        { label: 'Duma deputy since 2004', kind: 'role' },
        { label: 'annexation 03.10.2022 — from the floor', kind: 'tie' },
      ],
      bio:
        '<p><strong>Yuri Vyacheslavovich Afonin</strong> (b. 22.04.1977, Tula) — Candidate of Economic Sciences. Active in Komsomol and party structures since the 1990s. State Duma deputy since 2004; First Deputy Chairman of the KPRF Central Committee since 2017. One of the party\'s main public spokespeople on military-patriotic affairs.</p>' +
        '<p><strong>On 3 October 2022</strong>, during ratification of the treaties incorporating the DNR, LNR, Zaporizhzhia, and Kherson oblasts into the Russian Federation, Afonin\'s speech recorded the party\'s position: <em>"Confidently, unanimously, and with great hope and joy, we shall adopt this decision."</em></p>',
    },
    { name: 'I. I. Melnikov', tier: 'secondary', role: 'First Deputy Speaker of the State Duma',
      born: 'b. 07.08.1950',
      tags: [
        { label: 'Duma deputy since 1995', kind: 'role' },
        { label: 'academic wing', kind: 'role' },
      ],
      bio:
        '<p><strong>Ivan Ivanovich Melnikov</strong> (b. 07.08.1950) — Professor of Mathematical Cybernetics at Moscow State University, where he has worked since 1973. State Duma deputy since 1995; First Deputy Speaker of the State Duma in several convocations since 2011. Zyuganov\'s ally since 1995.</p>' +
        '<p>A functionary of the "academic" wing of the KPRF, providing the party with connections to the natural-science community and the loyalty of part of Moscow State University. In the key votes of 2022–2025 — voting with the faction in favour, without any publicly articulated dissenting positions.</p>',
    },
    { name: 'N. A. Ostanina', tier: 'secondary', role: 'Chair, Duma Committee on the Protection of the Family',
      born: 'b. 26.12.1955',
      tags: [
        { label: 'co-author ФЗ-478 LGBT ban', kind: 'tie' },
        { label: 'co-author "childfree" ban', kind: 'tie' },
        { label: 'critique from the right', kind: 'tie' },
      ],
      bio:
        '<p><strong>Nina Alexandrovna Ostanina (Нина Александровна Останина)</strong> (b. 26.12.1955) — State Duma deputy in convocations V and VIII. Since 2021 — Chair of the State Duma Committee for the Protection of the Family, Maternity, Fatherhood, and Childhood.</p>' +
        '<p><strong>Co-author of the law banning LGBT "propaganda" for all audiences</strong> (ФЗ № 478-ФЗ of 05.12.2022). In February 2024 she promoted criminal liability for repeat LGBT "propaganda" (according to РБК reports); the amendments were not included in the final legislation, but the KPRF\'s "toughening from the right" position is on the record.</p>' +
        '<p><strong>Co-author of the laws banning "childfree propaganda"</strong> (ФЗ № 411-ФЗ + 401-ФЗ of 23.11.2024). Co-author of an amendment imposing criminal liability for childfree propaganda (rejected by the government as excessive).</p>' +
        '<p>The public face of KPRF as "critique from the right": the party does not oppose restrictions but frequently demands that they be tightened.</p>',
    },
    { name: 'L. I. Kalashnikov', tier: 'secondary', role: 'Chair, Duma Committee on CIS Affairs',
      tags: [
        { label: 'co-author of the DNR/LNR recognition appeal', kind: 'tie' },
      ],
      bio:
        '<p><strong>Leonid Ivanovich Kalashnikov</strong> — Chair of the State Duma Committee on CIS Affairs, Eurasian Integration, and Relations with Compatriots.</p>' +
        '<p><strong>Co-author of the appeal for recognition of the DNR and LNR</strong> — submitted jointly with Zyuganov; adopted on 15 February 2022, nine days before the start of the military operation. It was the KPRF\'s draft that was adopted, not United Russia\'s alternative proposal.</p>',
    },
    { name: 'Yu. P. Sinelshchikov', tier: 'secondary', role: 'Deputy Chair, Duma Committee on State Construction',
      tags: [
        { label: 'defended ФЗ-32 "false information" law', kind: 'tie' },
      ],
      bio:
        '<p><strong>Yuri Petrovich Sinelshchikov</strong> — Deputy Chair of the State Duma Committee on State Construction and Legislation.</p>' +
        '<p><strong>On 4 March 2022 he defended ФЗ № 32-ФЗ on false information about the army from the Duma floor</strong>: "the law will prevent discrediting information about the Russian Armed Forces; we expect the law to be applied selectively and not to affect journalists" (according to Interfax reporting). During the vote on the unified foreign-agent law (ФЗ-255) in its first reading on 07.06.2022 — position: "there are questions about certain provisions".</p>',
    },
    { name: 'A. V. Kurinnyi', tier: 'secondary', role: 'Duma deputy, healthcare policy',
      tags: [
        { label: 'voted against ФЗ-90 (sovereign Runet 2019)', kind: 'tie' },
        { label: 'voted against ФЗ-281 (VPN 2025)', kind: 'tie' },
      ],
      bio:
        '<p><strong>Alexei Vladimirovich Kurinnyi</strong> — State Duma deputy since 2016; one of the faction\'s most active public spokespeople on healthcare and social policy.</p>' +
        '<p><strong>One of the few KPRF deputies to speak substantively against</strong> the 2019 sovereign Runet law (citing costs running into tens of billions of roubles and unrestricted powers for Roskomnadzor). During the vote on the VPN/extremism-search law on 22 July 2025 — among those in the KPRF faction who voted against.</p>',
    },
    { name: 'S. A. Shargunov', tier: 'secondary', role: 'Writer; editor-in-chief of Svobodnaya Pressa',
      born: 'b. 12.05.1980',
      tags: [
        { label: 'voted against ФЗ-11 confiscation', kind: 'tie' },
        { label: 'formally outside the party', kind: 'role' },
      ],
      bio:
        '<p><strong>Sergei Alexandrovich Shargunov (Сергей Александрович Шаргунов)</strong> (b. 12.05.1980) — writer, journalist, editor-in-chief of the magazine Svobodnaya Pressa. State Duma deputy since 2016, elected on the KPRF list (formally not a party member). Son of the Russian Orthodox priest Alexander Shargunov, a representative of the conservative-patriotic tendency within the Russian Orthodox Church.</p>' +
        '<p><strong>One of three deputies in the entire State Duma who voted against in the first reading</strong> of the law on confiscating assets for spreading false information (24 January 2024; ФЗ № 11-ФЗ). The other two were Sardana Avksentyeva and Ksenia Goryacheva from New People.</p>' +
        '<p>Within KPRF he functions as a "safety valve" for culturally patriotic intellectuals: his deviations from the faction are limited to questions of free expression in literary and journalistic spheres.</p>',
    },
    { name: 'M. N. Matveyev', tier: 'secondary', role: 'KPRF Duma deputy (Samara single-mandate district)',
      born: 'b. 30.05.1968',
      tags: [
        { label: 'sole "against" on the ECHR law', kind: 'tie' },
        { label: 'voted against ФЗ-63 (false information abroad)', kind: 'tie' },
      ],
      bio:
        '<p><strong>Mikhail Nikolayevich Matveyev</strong> (b. 30.05.1968) — KPRF State Duma deputy since 2021 (Samara single-mandate district). Candidate of Historical Sciences. One of the most publicly active KPRF deputies on social media.</p>' +
        '<p>The faction\'s only systemic "dissenter": <strong>the sole deputy in the entire State Duma to vote against the law on Russia\'s non-compliance with ECHR rulings</strong> (June 2022). The sole "against" vote in the Duma on ФЗ № 63-ФЗ of 22.03.2022 (extension of "false information" offences to state bodies abroad). Did not vote on digital migrant control on 20.05.2025.</p>' +
        '<p>Matveyev\'s retention in the faction at this level of divergence is a structural argument for understanding the faction as a container for diversified positions within a disciplined overall line.</p>',
    },
    { name: 'N. M. Kharitonov', tier: 'secondary', role: 'KPRF presidential candidate 2024',
      born: 'b. 30.10.1948',
      tags: [
        { label: '4.31% — 2nd place 2024', kind: 'status' },
        { label: 'worst result in 25 years', kind: 'status' },
      ],
      bio:
        '<p><strong>Nikolai Mikhailovich Kharitonov</strong> (b. 30.10.1948) — State Duma deputy since 1993 (with a break).</p>' +
        '<p>KPRF presidential candidate — in 2004 (13.69%, 2nd place) and in 2024 (<strong>4.31%, 2nd place</strong>). The 2024 presidential campaign was the weakest in the party\'s 25-year history (since Zyuganov\'s first campaign in 1996, when he received 32% in the first round).</p>' +
        '<p>Kharitonov\'s nomination at the age of 75 — after the neutralisation of Grudinin (2021), Levchenko (2019), and Rashkin (2022) — reflects the KPRF\'s abandonment of any attempt to present an electorally serious alternative to Vladimir Putin.</p>',
    },
    { name: 'Leonid Zyuganov', tier: 'secondary', role: 'Leader of the KPRF faction in the Moscow City Duma',
      born: 'b. 27.12.1988',
      tags: [
        { label: 'grandson of G. A. Zyuganov', kind: 'tie' },
        { label: 'Moscow mayoral candidate 2023 — 8.11%', kind: 'status' },
      ],
      bio:
        '<p><strong>Leonid Andreyevich Zyuganov</strong> (b. 27.12.1988) — grandson of G. A. Zyuganov (son of Andrei Zyuganov from his first marriage). Graduate of MGIMO.</p>' +
        '<p>Moscow City Duma deputy for three convocations: V (2009–2014, at 21 the youngest MCD deputy at the time of election), VI, VII. Since 2024 — leader of the KPRF faction in the Moscow City Duma.</p>' +
        '<p><strong>Candidate for Mayor of Moscow in the elections of 8–10 September 2023.</strong> Result — 8.11% (320,070 votes), 2nd place after Sobyanin (76.4%). The campaign centred on criticism of the mayor\'s high-density development and renovation policies.</p>' +
        '<p>In March 2026 he publicly withdrew from the 2026 Duma candidacy, retaining his Moscow mandate and leadership of the KPRF faction in the Moscow City Duma (Vedomosti).</p>',
    },
    { name: 'Mikhail Zyuganov', tier: 'secondary', role: 'Deputy Minister of Economic Development, Rostov Oblast',
      tags: [
        { label: 'grandson of G. A. Zyuganov', kind: 'tie' },
        { label: 'executive branch of a federation subject since 08.2025', kind: 'tie' },
      ],
      bio:
        '<p><strong>Mikhail Zyuganov</strong> — second grandson of G. A. Zyuganov. <strong>Since August 2025 he has held the post of Deputy Minister of Economic Development of Rostov Oblast</strong> (according to РБК reporting).</p>' +
        '<p>The Ministry of Economic Development of Rostov Oblast is a structure of the executive branch of a large industrial region (population ~4 m, GDP in the top ten regions, well-developed agricultural and defence industries).</p>' +
        '<p>The appointment could only have occurred with the institutional approval of Governor Yu. Slyusar (re-elected in September 2025). Structurally, this is a <strong>pattern unique for a parliamentary "opposition" party</strong>: no comparable appointment of the family members of other parliamentary faction leaders (LDPR, SRZP, New People) to deputy-minister posts in regional administrations has been recorded in open sources.</p>',
    },
  ],

  /* ============== D. State ties (trustee-context) ============== */
  // One large stat-card: "6 orders + Hero of Labour" — the scale of state recognition.
  trusteeContext: {
    headline: '6 orders + Hero of Labour of Russia',
    sub: 'G. A. Zyuganov is the holder of six major state decorations (1999–2019) and the title Hero of Labour of the Russian Federation (Decree of the President of Russia No. 544 of 26.06.2024, on his 80th birthday). Member of the State Council of Russia since 5 June 2012.',
    source: { label: 'kremlin.ru — Decree No. 544 of 26.06.2024', url: 'http://www.kremlin.ru/acts/bank/50782' },
  },

  /* ============== E. Voting (vote-waffle) ============== */
  // 23 key votes 2018–2025.
  // Outcome: 'za' — faction voted in favour (supported the restriction);
  // 'against' — faction voted against (bloc);
  // 'abstain' — bloc abstention;
  // 'partial' — faction split / position shifted between readings.
  voteWaffle: {
    summary: { za: 14, against: 6, abstain: 2, partial: 1 },
    votes: [
      { id: 'fz350-pension', fz: 'ФЗ-350', date: '03.10.2018', voteId: null, outcome: 'against',
        hotspotBody:
          '<p><strong>ФЗ № 350-ФЗ of 03.10.2018 (bill No. 489161-7)</strong> — pension-age increase.</p>' +
          '<p><strong>KPRF faction:</strong> 0 in favour / <strong>42 against</strong> — all deputies in full.</p>' +
          '<p>The party organised flash-mobs and regional protest events; Shargunov spoke at street rallies. The last vote in the modern history of the State Duma at which three "opposition" factions (KPRF, LDPR, SRZP) collectively opposed United Russia on a major social question.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/489161-7" target="_blank" rel="noopener">СОЗД 489161-7 →</a></p>' },
      { id: 'fz31-klishas', fz: 'Klishas package', date: '07.03.2019', voteId: null, outcome: 'against',
        hotspotBody:
          '<p><strong>Klishas package of 07.03.2019</strong> — ФЗ Nos. 27, 28, 30, 31-ФЗ: fines for "false socially significant information", out-of-court blocking of fake news, fines for "disrespect towards state symbols, the Constitution, and state bodies".</p>' +
          '<p><strong>KPRF faction:</strong> against in full. Third-reading vote on the fake-news law — 322 for, 78 against.</p>' +
          '<p>The last episode of a full faction-level "against" vote by KPRF on digital freedoms before the systematic shift to supporting restrictions in 2022. Kurinnyi, Pletneva, and Ganzya spoke substantively from the floor.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/606595-7" target="_blank" rel="noopener">СОЗД 606595-7 →</a></p>' },
      { id: 'fz90-runet', fz: 'ФЗ-90 sovereign Runet', date: '16.04.2019', voteId: null, outcome: 'against',
        hotspotBody:
          '<p><strong>ФЗ № 90-ФЗ of 01.05.2019 (bill No. 608767-7)</strong> — the sovereign Runet law: centralisation of traffic routing, expanded powers for Roskomnadzor.</p>' +
          '<p><strong>KPRF faction:</strong> against (bloc). Third reading 16.04.2019 — 307 for, 68 against.</p>' +
          '<p>Kurinnyi (KPRF) and Shein (SRZP) spoke substantively: the law grants unrestricted powers to Roskomnadzor and will cost tens of billions of roubles. The second instance of genuine faction-level resistance by KPRF to digital restrictions in the 7th convocation.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/608767-7" target="_blank" rel="noopener">СОЗД 608767-7 →</a></p>' },
      { id: 'const-2020', fz: 'Constitution (amendments)', date: '11.03.2020', voteId: null, outcome: 'abstain',
        hotspotBody:
          '<p><strong>Constitutional amendments (bill No. 885214-7)</strong> — third reading in the Duma, 11.03.2020.</p>' +
          '<p><strong>Duma vote:</strong> 383 for, 0 against, 43 abstained. <strong>The KPRF faction was the only parliamentary faction not to support the amendments</strong>: it abstained in full. At the all-Russian vote on 1 July 2020, the KPRF Central Committee officially called for a "no" vote.</p>' +
          '<p>The only systemic episode of full public opposition by KPRF on a politically central question during the entire 2019–2025 period. The faction\'s substantive objection was to the resetting of presidential term limits.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/885214-7" target="_blank" rel="noopener">СОЗД 885214-7 →</a></p>' },
      { id: 'dnr-recognition', fz: 'Recognition of the DNR/LNR', date: '15.02.2022', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>State Duma appeal to the President of Russia for recognition of the independence of the DNR and LNR, 15.02.2022</strong> — nine days before the start of the military operation.</p>' +
          '<p><strong>Authorship:</strong> it was the KPRF draft (submitted by Zyuganov and Kalashnikov) that was adopted, not United Russia\'s alternative proposal. Vote: 351 for, 16 against, 1 abstained. <strong>KPRF faction:</strong> in favour in full.</p>' +
          '<p>The KPRF\'s active authorial role in the recognition of the DNR and LNR is a structurally critical moment: the party was not merely supporting a state course but was the initiator of the political act that formed one of the formal pretexts for the commencement of hostilities on 24.02.2022.</p>' +
          '<p><a href="http://duma.gov.ru/news/53643/" target="_blank" rel="noopener">State Duma — 15.02.2022 →</a></p>' },
      { id: 'dnr-ratification', fz: 'Ratification — DNR/LNR', date: '22.02.2022', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>Ratification of the treaties of friendship and mutual assistance with the DNR and LNR, 22.02.2022.</strong></p>' +
          '<p><strong>Vote:</strong> 400 for, 0 against, 0 abstained. <strong>KPRF faction:</strong> in favour in full.</p>' +
          '<p>Zyuganov and Obukhov were officially recorded as absent from the chamber — reportedly ill with COVID — yet appear as "for" in the minutes (Radio Svoboda). The episode of "voting for the absent" politically documents the party\'s institutional support.</p>' +
          '<p><a href="https://www.svoboda.org/a/za-priznanie-dnr-i-lnr-golosovali-i-deputaty-kotoryh-ne-bylo-v-zale/31705043.html" target="_blank" rel="noopener">Радио Свобода →</a></p>' },
      { id: 'fz32-fakes', fz: 'ФЗ-32 "false information about the army"', date: '04.03.2022', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ № 32-ФЗ of 04.03.2022 (bill No. 464757-7)</strong> — introduction of Art. 207.3 of the Criminal Code (up to 15 years for "knowingly false information" about the armed forces), Art. 280.3 CC (\'discrediting\' the armed forces), Art. 284.2 CC (calls for sanctions).</p>' +
          '<p><strong>Third-reading vote:</strong> 401 for, 0 against, 0 abstained. <strong>KPRF faction:</strong> in favour in full.</p>' +
          '<p>The key behavioural test. A party with an electorate of 10.66 million voters, at a critical moment following the outbreak of war, voted unanimously to criminalise anti-war speech for up to 15 years. Yuri Sinelshchikov (KPRF) defended the bill from the floor: "the law will prevent discrediting information about the Russian Armed Forces".</p>' +
          '<p><a href="https://www.interfax.ru/russia/826193" target="_blank" rel="noopener">Интерфакс — 04.03.2022 →</a></p>' },
      { id: 'electoral-reform', fz: 'Electoral reform', date: '11.03.2022', voteId: null, outcome: 'against',
        hotspotBody:
          '<p><strong>Package of electoral legislation amendments, 11.03.2022.</strong> Ban on foreign agents standing in elections, simplification of online voting (DEG), expanded powers for electoral commissions.</p>' +
          '<p><strong>Third-reading vote:</strong> 338 for, 82 against. <strong>KPRF, LDPR, and SRZP factions — against</strong> in unison. This is a unique instance of three-faction electoral opposition in the 8th convocation.</p>' +
          '<p>Electoral reform is the only politically significant case in 2022 where the KPRF, LDPR, and SRZP factions voted against in unison. Structural priority: the parties are willing to risk public opposition only when their own electoral prospects are at stake.</p>' +
          '<p><a href="https://www.rbc.ru/politics/11/03/2022/622aac549a7947a6a9dd6bc7" target="_blank" rel="noopener">РБК — 11.03.2022 →</a></p>' },
      { id: 'fz63-fakes-foreign', fz: 'ФЗ-63 (false information about state bodies abroad)', date: '22.03.2022', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ № 63-ФЗ of 22.03.2022</strong> — extension of "false information" offences to Russian state bodies abroad.</p>' +
          '<p><strong>Vote:</strong> unanimous. <strong>KPRF faction:</strong> in favour (except M. Matveyev — the sole "against" vote in the entire Duma).</p>' +
          '<p>KPRF attempted to remove the bill from discussion on procedural grounds, but the faction ultimately voted in favour. Matveyev — a symbolic "voice of conscience", but not one capable of becoming the nucleus of an intra-faction group.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/82211-8" target="_blank" rel="noopener">СОЗД 82211-8 →</a></p>' },
      { id: 'fz255-foreign-agents', fz: 'ФЗ-255 unified foreign-agent law', date: '14.07.2022', voteId: null, outcome: 'partial',
        hotspotBody:
          '<p><strong>ФЗ № 255-ФЗ of 14.07.2022 (bill No. 113045-8)</strong> — the unified foreign-agent law: expanded grounds for designation (no longer requiring foreign funding — "foreign influence" now suffices).</p>' +
          '<p><strong>Faction behaviour:</strong> in the first reading on 07.06.2022 — faction-level against (346/17/18). In the third reading on 29.06.2022 — predominantly in favour with a small number of abstentions (331/5/11).</p>' +
          '<p>Lead rapporteur — Lugovoy (LDPR): "Any attempt to criticise this bill conceptually I consider to be betrayal." A pattern unique for the 8th convocation: the KPRF faction shifts from "against" in the first reading to "for" in the third reading while retaining 5 "against" and 11 abstentions in the final vote.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/113045-8" target="_blank" rel="noopener">СОЗД 113045-8 →</a></p>' },
      { id: 'echr', fz: 'Non-compliance with ECHR rulings', date: '06.2022', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>Law on Russia\'s non-compliance with ECHR rulings</strong>, June 2022 (in connection with Russia\'s withdrawal from the Council of Europe).</p>' +
          '<p><strong>KPRF faction:</strong> in favour (M. Matveyev — the sole deputy in the entire State Duma to vote against).</p>' +
          '<p>Matveyev\'s vote is a singular anomaly, not the nucleus of an intra-faction group. Matveyev\'s retention in the faction at this level of individual divergence is a structural argument for understanding the faction as a container for diversified positions within a disciplined overall line.</p>' +
          '<p><a href="../research/compromat/01-parties/02-kprf/E-voting.md" target="_blank">Full analysis in dossier E-voting.md →</a></p>' },
      { id: 'fz365-mobilization', fz: 'ФЗ-365 mobilisation', date: '20.09.2022', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ № 365-ФЗ of 24.09.2022 (bill No. 160006-8)</strong> — mobilisation amendments to the Criminal Code: Art. 352.1 "Voluntary surrender" (up to 10 years), Art. 356.1 "Looting" (up to 15 years), tougher penalties for desertion.</p>' +
          '<p><strong>Third-reading vote on 20.09.2022:</strong> 389 for, 0 against, 0 abstained. <strong>KPRF faction:</strong> in favour in full.</p>' +
          '<p>The law was signed by the President on 24.09.2022 and published on the day partial mobilisation was announced (21.09.2022, Decree No. 647). A party ideologically rooted in the socialist tradition — which historically viewed compulsory military service as a form of state coercion — supporting mobilisation legislation is a structurally significant behavioural moment.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/160006-8" target="_blank" rel="noopener">СОЗД 160006-8 →</a></p>' },
      { id: 'annexation-4', fz: 'Annexation of 4 regions', date: '03.10.2022', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>Ratification of the four Federal Constitutional Laws on the incorporation of the DNR, LNR, Zaporizhzhia, and Kherson oblasts into the Russian Federation, 03.10.2022.</strong></p>' +
          '<p><strong>Vote:</strong> 412 for, 0 against, 0 abstained (DNR); identical for the other three. <strong>KPRF faction:</strong> in favour in full.</p>' +
          '<p>Afonin spoke for KPRF from the floor: <em>"Confidently, unanimously, and with great hope and joy, we shall adopt this decision."</em> Deputy Smolin (visually impaired) accidentally pressed "against"; the vote was re-run to record unanimity.</p>' +
          '<p>The most unanimous politically significant vote of the 8th Duma convocation. Before the vote, Volodin held a meeting with faction leaders at which unanimous support was agreed.</p>' +
          '<p><a href="http://duma.gov.ru/news/55549/" target="_blank" rel="noopener">State Duma — press release →</a></p>' },
      { id: 'fz478-lgbt', fz: 'ФЗ-478 LGBT "propaganda" ban', date: '24.11.2022', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ № 478-ФЗ of 05.12.2022 (bill No. 217471-8)</strong> — extension of the ban on "propaganda of non-traditional sexual relations" from minors to all audiences; fines of up to 5 m ₽.</p>' +
          '<p><strong>Third-reading vote on 24.11.2022:</strong> unanimous. <strong>The leaders of all five factions were co-authors</strong> (Vasilyev — UR; <strong>Zyuganov — KPRF</strong>; Slutsky — LDPR; Mironov — SRZP; Nechayev — NL) along with more than 300 deputies.</p>' +
          '<p><strong>Zyuganov personally — co-author of the law</strong>: the first in a series of 2022–2024 bills on which Zyuganov personally signed a culturally conservative repressive norm. N. Ostanina (KPRF) proposed tightening the provisions — adding criminal liability for repeat "propaganda" — but those changes were not included.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/217471-8" target="_blank" rel="noopener">СОЗД 217471-8 →</a></p>' },
      { id: 'fz340-cbdc', fz: 'ФЗ-340 digital rouble', date: '11.07.2023', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ Nos. 339, 340-ФЗ of 24.07.2023 (bill No. 270838-8)</strong> — the digital rouble (CBDC): a third form of the national currency issued by the Central Bank; all transactions are technically visible to the Bank of Russia.</p>' +
          '<p><strong>Third-reading vote on 11.07.2023:</strong> unanimous. <strong>KPRF faction:</strong> in favour in full. Ostanina — co-author. Lead author — Aksakov (SRZP).</p>' +
          '<p>A characteristic case of "rhetorical split without real dissent in the vote": the party publicly criticised a "digital concentration camp" (Rashkin and others) but voted in favour in the chamber.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/270838-8" target="_blank" rel="noopener">СОЗД 270838-8 →</a></p>' },
      { id: 'fz386-gender', fz: 'ФЗ-386 ban on gender reassignment', date: '14.07.2023', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ № 386-ФЗ of 24.07.2023 (bill No. 376846-8)</strong> — ban on any medical procedures for gender reassignment; marriages with a transgender spouse are annulled; adoption banned.</p>' +
          '<p><strong>Third-reading vote on 14.07.2023:</strong> 386 for, 0 against, 0 abstained. <strong>KPRF faction:</strong> in favour in full.</p>' +
          '<p><strong>Zyuganov personally — one of the official co-authors of the law</strong>, alongside Volodin, Mironov, and Slutsky. The second, after the 2022 LGBT law, instance of a restrictive law personally signed by Zyuganov. The law contradicts the classical Soviet and post-Soviet medical tradition (surgical gender-transition procedures had been permitted in Russia since the 1990s).</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/376846-8" target="_blank" rel="noopener">СОЗД 376846-8 →</a></p>' },
      { id: 'budget-2024', fz: '2024 Budget', date: '17.11.2023', voteId: null, outcome: 'against',
        hotspotBody:
          '<p><strong>ФЗ № 540-ФЗ of 27.11.2023 (bill No. 448554-8)</strong> — the federal budget for 2024–2026.</p>' +
          '<p><strong>Third-reading vote on 17.11.2023:</strong> UR, LDPR, NL — for; <strong>KPRF and SRZP — against</strong> (bloc).</p>' +
          '<p>Zyuganov on the 2025 budget (a year later): "the idiotic central-bank rate is strangling production". Criticism is not ideological but specific monetary-policy objection.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/448554-8" target="_blank" rel="noopener">СОЗД 448554-8 →</a></p>' },
      { id: 'fz11-confiscation', fz: 'ФЗ-11 confiscation for false information', date: '31.01.2024', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ № 11-ФЗ of 14.02.2024 (bill No. 521381-8)</strong> — extension of Art. 104.1 CC to Arts. 207.3 and 280.4: confiscation of assets for false information about the army + forfeiture of honorary titles.</p>' +
          '<p><strong>First-reading vote on 24.01.2024:</strong> 395 for, 3 against. Among the three "against" — Shargunov (KPRF), Avksentyeva, and Goryacheva (NL). Third reading 31.01.2024: 377 for, 0 against, ~15 abstained.</p>' +
          '<p><strong>Zyuganov — co-author of the law</strong> (alongside Vasilyev of UR, Slutsky of LDPR, Mironov of SRZP). The third instance of a repressive law personally signed by Zyuganov. The only faction leader to refuse to sign — Nechayev (NL).</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/521381-8" target="_blank" rel="noopener">СОЗД 521381-8 →</a></p>' },
      { id: 'fz411-childfree', fz: 'ФЗ-411 "childfree" ban', date: '12.11.2024', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ Nos. 411-ФЗ + 401-ФЗ of 23.11.2024 (bills Nos. 724769-8, 724905-8)</strong> — ban on "propaganda of the refusal to have children" (the so-called "childfree" ideology).</p>' +
          '<p><strong>Third-reading vote on 12.11.2024:</strong> 403 for, 0 against, 0 abstained. <strong>KPRF faction:</strong> in favour in full. <strong>N. Ostanina (KPRF) — co-author.</strong></p>' +
          '<p>Ostanina initiated an amendment introducing criminal liability for promoting the "childfree" ideology — rejected by the government as excessive. The party demands tighter restrictions, not looser ones.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/724769-8" target="_blank" rel="noopener">СОЗД 724769-8 →</a></p>' },
      { id: 'budget-2025', fz: '2025 Budget', date: '21.11.2024', voteId: null, outcome: 'abstain',
        hotspotBody:
          '<p><strong>Federal budget 2025–2027 (bill No. 727320-8)</strong>, third reading 21.11.2024.</p>' +
          '<p><strong>Vote:</strong> UR, LDPR, NL — for; <strong>KPRF and SRZP — bloc abstention</strong>.</p>' +
          '<p>Unlike 2024 (when the faction voted against), in 2025 the faction abstained: the critique is softer. Zyuganov: "the idiotic central-bank rate is strangling production". Military spending >10.8 tn ₽ (≈28% of the budget — a record level).</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/727320-8" target="_blank" rel="noopener">СОЗД 727320-8 →</a></p>' },
      { id: 'migrant-control', fz: 'Digital migrant control', date: '20.05.2025', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>Law on digital control of migrants in Moscow and Moscow Oblast, 20.05.2025.</strong></p>' +
          '<p><strong>Vote:</strong> 340 for, 0 against, 22 did not vote. <strong>KPRF faction:</strong> in favour. M. Matveyev (KPRF) — among the 22 who did not vote.</p>' +
          '<p>Part of the package of migration laws adopted after the terrorist attack at Crocus City Hall on 22.03.2024 (according to Volodin\'s statement — at least 21 migration laws in 2024). KPRF, which historically has declared "friendship of peoples" in the Soviet tradition, votes for a repressive migration regime.</p>' +
          '<p><a href="https://www.kommersant.ru/doc/7736794" target="_blank" rel="noopener">Коммерсантъ — 20.05.2025 →</a></p>' },
      { id: 'fz281-vpn', fz: 'ФЗ-281 VPN/extremism search', date: '22.07.2025', voteId: null, outcome: 'against',
        hotspotBody:
          '<p><strong>ФЗ № 281-ФЗ of 31.07.2025 (bill No. 755710-8)</strong> — a fine of 3,000–5,000 ₽ for "intentional searching" for extremist material (even via a VPN); fines for advertising VPNs; VPN use as an aggravating circumstance.</p>' +
          '<p><strong>Third-reading vote on 22.07.2025:</strong> 306 for, 67 against, 22 abstained — the largest split in the 8th convocation on digital matters. <strong>KPRF faction — against (bloc)</strong>: for the first time since 2022 it returned to consolidated voting against a digital-freedoms restriction.</p>' +
          '<p>The substance of KPRF\'s objections was not liberal but legal: the faction cited violations of the Constitution and the impossibility of effectively combating extremism. In parallel, New People — against (bloc); SRZP — partly against, partly abstained.</p>' +
          '<p><a href="https://www.rbc.ru/politics/22/07/2025/687f71a49a7947da3ea1e90c" target="_blank" rel="noopener">РБК — 22.07.2025 →</a></p>' },
      { id: 'fz260-migration', fz: 'ФЗ-260 deportation regime', date: '08.08.2024', voteId: null, outcome: 'za',
        hotspotBody:
          '<p><strong>ФЗ № 260-ФЗ of 08.08.2024 (bill No. 615003-8)</strong> — deportation regime + register of supervised persons. Persons on the register may not purchase property, open accounts, register as self-employed, or obtain driving licences; the MVD gains the right to enter dwellings, track location, and access banking and tax data.</p>' +
          '<p><strong>KPRF faction:</strong> in favour in full.</p>' +
          '<p>Part of the post-Crocus City Hall migration package of 2024. Prokofyev (KPRF) proposed reducing the SIM-card limit for migrants from 10 to 5 — the amendment was rejected; the party voted in favour of the law at the first reading. KPRF systematically advocates for a tighter migration regime.</p>' +
          '<p><a href="https://sozd.duma.gov.ru/bill/615003-8" target="_blank" rel="noopener">СОЗД 615003-8 →</a></p>' },
    ],
  },

  /* ============== F. Managed opposition (relationship-network) ============== */
  // Graph: KPKR spoiler + neutralisation industry (Grudinin, Rashkin, Levchenko, Bondarenko, Semigin, Seleznev) + KPRF itself.
  relationshipNetwork: {
    width: 1300, height: 600,
    nodes: [
      { id: 'kprf', label: 'KPRF', sub: 'Zyuganov since 1995', x: 700, y: 90, color: '#a1393b',
        hotspotTitle: 'KPRF',
        hotspotBody:
          '<p><strong>Communist Party of the Russian Federation</strong> — re-established 13–14.02.1993; entered the EGRYUL register on 9.09.2002.</p>' +
          '<p>CC Chairman since 22.01.1995 — G. A. Zyuganov. The party passively cooperates with the mechanisms used to neutralise its own rivals: not one of the six neutralisations was initiated by KPRF itself, yet in all cases the party played a passively cooperative role by not blocking them.</p>' +
          '<p><a href="https://kprf.ru" target="_blank" rel="noopener">kprf.ru →</a></p>' },
      { id: 'kpkr', label: '"Communists of Russia" (CPKR)', sub: 'spoiler since 07.06.2012', x: 200, y: 90, color: '#bea050',
        hotspotTitle: '"Communist Party Communists of Russia" (CPKR)',
        hotspotBody:
          '<p><strong>Communist Party Communists of Russia (CPKR)</strong> — registered by the Ministry of Justice on 7 June 2012, within a record-short time following the liberalisation of the law on parties.</p>' +
          '<p>Chairman until March 2022 — M. Suraykin (2018 presidential election: 0.68%, 499,342 votes). Since March 2022 — S. Malinkovich (the Ministry of Justice approved the leadership change without delay).</p>' +
          '<p><strong>"Name-clone spoiler" case at the 2021 Duma elections:</strong> in 7 of the 15 Moscow single-mandate constituencies, CPKR fielded candidates with names identical or near-identical to those of KPRF candidates. In the Lyublinsky constituency — an exact name-clone of V. Rashkin (KPRF).</p>' +
          '<p>CEC Chair Pamfilova publicly called the practice of "named" spoilers "a disgrace" in 2021, but the clones were not removed — the law does not prohibit changing one\'s surname via a registry office.</p>' +
          '<p><a href="https://www.vedomosti.ru/politics/articles/2021/07/08/877494-kandidatam-ot-kprf-nashli-spoilerov-odnofamiltsev" target="_blank" rel="noopener">Vedomosti 08.07.2021 →</a></p>' },
      { id: 'grudinin', label: 'P. Grudinin', sub: '2018 presidential — 11.77%', x: 200, y: 290, color: '#a1393b',
        hotspotTitle: 'The Pavel Grudinin case (exclusion 2021)',
        hotspotBody:
          '<p><strong>Pavel Nikolayevich Grudinin</strong> — chairman of the board of directors of ZAO Sovkhoz imeni Lenina (Vidnoye); a non-party presidential candidate for KPRF in 2018.</p>' +
          '<p><strong>2018 presidential election:</strong> 11.77% (8,659,206 votes) — the best KPRF result in presidential elections since 2008. The campaign was built on the "strong manager" image and socialist slogans.</p>' +
          '<p><strong>24.07.2021 — CEC Resolution No. 30/258-8</strong>: excluded from KPRF\'s federal party list two months before the elections. Grounds — a letter from his former wife Irina Grudinina and information from the Prosecutor General\'s Office about ownership of 16,667 shares in the offshore company Bontro LTD (Belize).</p>' +
          '<p>In 2018 the same information had not prevented him from standing as a presidential candidate — an instance of selective application of disqualification mechanisms. KPRF did not mount an active public confrontation with the CEC.</p>' +
          '<p><a href="https://www.rbc.ru/politics/09/08/2021/6111368a9a79473e47a893c9" target="_blank" rel="noopener">РБК 09.08.2021 →</a></p>' },
      { id: 'rashkin', label: 'V. Rashkin', sub: '"elk case" 2021–22', x: 500, y: 290, color: '#a1393b',
        hotspotTitle: 'The Valery Rashkin case (mandate revoked 25.05.2022)',
        hotspotBody:
          '<p><strong>Valery Fyodorovich Rashkin</strong> — Duma deputy for convocations V–VII; organiser of protest events in Moscow in 2021 after the Duma elections; leader of the "street" wing of KPRF.</p>' +
          '<p><strong>28.10.2021</strong> — in the Lysogorsky district of Saratov Oblast the carcass of an elk was found in the boot of Rashkin\'s car. Police opened a criminal case under Art. 258 of the Criminal Code (illegal hunting).</p>' +
          '<p><strong>25.11.2021</strong> — the State Duma stripped Rashkin of parliamentary immunity (343/49). <strong>22.04.2022</strong> — sentence: 3 years suspended. <strong>25.05.2022</strong> — the State Duma revoked Rashkin\'s mandate (305/68/3); the KPRF faction voted against, but took no independent public action in his defence.</p>' +
          '<p>The speed with which the criminal case was opened (within a few hours of the car being stopped) and the swiftness of the immunity-stripping and final mandate revocation are atypical for a routine illegal-hunting case.</p>' +
          '<p><a href="https://lenta.ru/news/2022/05/25/rashkinn/" target="_blank" rel="noopener">Lenta.ru — 25.05.2022 →</a></p>' },
      { id: 'levchenko', label: 'S. Levchenko', sub: 'resignation 12.12.2019', x: 800, y: 290, color: '#a1393b',
        hotspotTitle: 'The Sergei Levchenko case (Irkutsk Oblast, 2019–2022)',
        hotspotBody:
          '<p><strong>Sergei Georgiyevich Levchenko</strong> — Governor of Irkutsk Oblast from 18.09.2015. <strong>The first elected Communist governor</strong> of Irkutsk Oblast.</p>' +
          '<p>Irkutsk Oblast was the only region in which KPRF consistently won regional elections. This created a precedent that was dangerous for the system.</p>' +
          '<p><strong>12.12.2019</strong> — Levchenko submitted his resignation "of his own accord" a year and a half before the end of his term. In parallel, a criminal case was opened against his son Andrei Levchenko (a deputy of the Irkutsk Oblast Legislative Assembly). <strong>28.07.2022</strong> — the Kuybyshevsky District Court of Irkutsk sentenced Andrei Levchenko to 9 years in a general-regime colony for embezzlement of 185 m ₽ from the Regional Capital Repairs Fund.</p>' +
          '<p>The clearest example of systemic pressure on a family to neutralise a regionally successful Communist.</p>' },
      { id: 'bondarenko', label: 'N. Bondarenko', sub: 'mandate revoked 28.02.2022', x: 1080, y: 290, color: '#a1393b',
        hotspotTitle: 'The Nikolai Bondarenko case (Saratov, 28.02.2022)',
        hotspotBody:
          '<p><strong>Nikolai Nikolayevich Bondarenko</strong> — Saratov Oblast Duma deputy for KPRF; YouTube blogger with an audience of over 1 million subscribers. Campaigns — demonstrating a consumer basket on the minimum wage, food vouchers.</p>' +
          '<p><strong>28.02.2022</strong> — the Saratov Oblast Duma stripped Bondarenko of his mandate on the basis of an "incomplete declaration": YouTube donations were classified as income not declared in his asset declaration.</p>' +
          '<p>The date of the stripping was the fourth day after the start of the military operation, at a moment of rapid restrictive measures against the media and bloggers. He was the only public YouTube blogger from KPRF with an audience capable of generating independent political content outside the control of the party apparatus.</p>' },
      { id: 'semigin', label: 'G. Semigin', sub: 'expelled 2004', x: 440, y: 490, color: '#999',
        hotspotTitle: 'The Gennady Semigin case (expulsion 2004)',
        hotspotBody:
          '<p><strong>Gennady Ivanovich Semigin</strong> — KPRF\'s main financial donor from 1996 to 2004, channelled through the People\'s Patriotic Union of Russia (NPSR), whose executive committee he headed.</p>' +
          '<p><strong>18.05.2004</strong> — expelled from KPRF by the CC Presidium "for splitting the party" after attempting to stand for the presidency against Zyuganov\'s wishes. The NPSR property under Semigin\'s control was lost to KPRF.</p>' +
          '<p>Leader of the Patrioty Rossii party; in February 2021 the party merged with A Just Russia and Za Pravdu to form SRZP. <strong>In 2021 Semigin returned to the State Duma via SRZP</strong> — a characteristic reintegration of a dismissed functionary into the system through another parliamentary party.</p>' },
      { id: 'seleznev', label: 'G. Seleznev', sub: 'expelled 25.05.2002', x: 700, y: 490, color: '#999',
        hotspotTitle: 'The Gennady Seleznev case (expulsion 2002)',
        hotspotBody:
          '<p><strong>Gennady Nikolayevich Seleznev</strong> — Speaker of the State Duma, 3rd convocation (from 2000).</p>' +
          '<p>After his election as Speaker, Seleznev came into conflict with Zyuganov: KPRF demanded he resign from the post following the 2002 inter-faction "package deal" under which major Duma committees went to United Russia.</p>' +
          '<p><strong>25.05.2002</strong> — expelled from KPRF by the CC Presidium after his refusal to resign. He founded the Party of Russia\'s Revival; it failed to clear the 5% threshold at the 2003 elections and was subsequently liquidated.</p>' +
          '<p>The first post-Soviet example of the neutralisation of a figure within KPRF who had moved beyond Zyuganov\'s control.</p>' },
      { id: 'cik', label: 'CEC', sub: 'Resolution 30/258-8', x: 200, y: 490, color: '#1d4e89',
        hotspotTitle: 'CEC — instrument of exclusion',
        hotspotBody:
          '<p><strong>Central Election Commission (CEC)</strong> — by Resolution No. 30/258-8 of 24.07.2021, excluded P. Grudinin from KPRF\'s federal party list on the basis of information from the Prosecutor General\'s Office about ownership of shares in the offshore company Bontro LTD (Belize).</p>' +
          '<p>In 2018 the same information had not prevented him from standing as a presidential candidate — selective application. CEC Chair Pamfilova publicly called "named" spoilers "a disgrace" but the clones were not removed.</p>' },
      { id: 'genpro', label: "Prosecutor General's Office", sub: 'criminal proceedings', x: 1080, y: 490, color: '#1d4e89',
        hotspotTitle: "Prosecutor General's Office — instrument of criminal pressure",
        hotspotBody:
          '<p><strong>Prosecutor General\'s Office of the Russian Federation</strong> — initiator of the information submitted to the CEC in the Grudinin case; initiator of the removal of V. Rashkin\'s immunity (25.11.2021); initiator of criminal proceedings against A. Levchenko (son of S. Levchenko, 9 years colony 28.07.2022).</p>' +
          '<p>All six neutralisation cases (Seleznev, Semigin, Grudinin, Rashkin, Levchenko, Bondarenko) share a common structure: external instrument (Prosecutor General\'s Office, Investigative Committee, CEC) — passively cooperative role by KPRF itself — reintegration or marginalisation of the displaced figure.</p>' },
    ],
    edges: [
      { from: 'kprf', to: 'kpkr', label: 'spoiler / clones', kind: 'dashed' },
      { from: 'kprf', to: 'grudinin', label: 'excluded 2021' },
      { from: 'kprf', to: 'rashkin', label: 'mandate 2022' },
      { from: 'kprf', to: 'levchenko', label: 'resignation 2019' },
      { from: 'kprf', to: 'bondarenko', label: 'mandate 28.02.2022' },
      { from: 'kprf', to: 'semigin', label: 'expelled 2004' },
      { from: 'kprf', to: 'seleznev', label: 'expelled 2002' },
      { from: 'cik', to: 'grudinin', label: '30/258-8' },
      { from: 'genpro', to: 'rashkin', label: 'Art. 258 CC' },
      { from: 'genpro', to: 'levchenko', label: 'case against son' },
    ],
  },

  /* ============== G. Crises and war (swimlane) ============== */
  // Two lanes: DUMA (support for military-repressive norms) and SOCIAL-ECON (opposition).
  swimlane: {
    period: { start: '2022-02-01', end: '2025-08-01' },
    lanes: [
      { id: 'duma-war', label: 'MILITARY-REPRESSIVE', color: '#a1393b',
        events: [
          { date: '2022-02-15', label: 'Recognition of DNR/LNR', sub: 'for; KPRF submitted the bill' },
          { date: '2022-02-22', label: 'Ratification DNR/LNR', sub: '400/0/0; Zyuganov "for" — reportedly ill' },
          { date: '2022-03-04', label: 'ФЗ-32 "false information about the army"', sub: 'for; Sinelshchikov defended it' },
          { date: '2022-09-20', label: 'Mobilisation', sub: 'for — unanimous' },
          { date: '2022-10-03', label: 'Annexation of 4 regions', sub: 'Afonin: "confidently, unanimously"' },
          { date: '2022-11-24', label: 'ФЗ-478 LGBT ban', sub: 'Zyuganov — co-author' },
          { date: '2023-07-14', label: 'ФЗ-386 gender-reassignment ban', sub: 'Zyuganov — co-author' },
          { date: '2024-01-31', label: 'ФЗ-11 confiscation', sub: 'Zyuganov — co-author' },
          { date: '2024-11-12', label: 'ФЗ-411 "childfree" ban', sub: 'Ostanina — co-author' },
          { date: '2025-07-22', label: 'ФЗ-281 VPN', sub: 'against — bloc' },
        ] },
      { id: 'soc-econ', label: 'SOCIO-ECONOMIC OPPOSITION', color: '#6c8c44',
        events: [
          { date: '2022-03-11', label: 'Electoral reform', sub: 'against — with LDPR + SRZP' },
          { date: '2023-11-17', label: '2024 Budget', sub: 'against — bloc' },
          { date: '2024-03-17', label: 'Presidential: Kharitonov 4.31%', sub: 'worst in 25 years; +407 m ₽ profit' },
          { date: '2024-06-26', label: 'Zyuganov — Hero of Labour of Russia', sub: 'Decree No. 544' },
          { date: '2024-11-21', label: '2025 Budget', sub: 'bloc abstention' },
          { date: '2025-08-01', label: 'Mikhail Zyuganov — Deputy Minister', sub: 'Rostov Oblast' },
        ] },
    ],
    connection: {
      fromLaneId: 'duma-war', fromDate: '2022-03-04',
      toLaneId: 'soc-econ', toDate: '2024-06-26',
      label: 'functional split: for repression, against the budget',
    },
  },

  /* ============== H. Foreign ties (lightweight stat) ============== */
  foreignTies: {
    headline: 'Not documented',
    items: [
      { label: 'Foreign accounts held by leadership', status: 'none recorded; the only parliamentary faction that ideologically rejects its leaders living abroad' },
      { label: 'Grant databases: NED, OSF, Heinrich Böll, FES, FNS, MacArthur, Ford, Carnegie', status: 'no data on KPRF funding found' },
      { label: 'Ban under Art. 30 of ФЗ-95', status: 'foreign donations to Russian parties are expressly prohibited' },
    ],
  },
};
