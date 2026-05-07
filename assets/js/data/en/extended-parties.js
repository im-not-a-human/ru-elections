// EN translation of assets/js/data/extended-parties.js
// Sync source: assets/js/data/extended-parties.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Extended party metadata for the 14-party hub on index.html.
// Includes parliamentary, extra-parliamentary, and spoiler categories.
// Source for figures: research/compromat/04-summary-tables/final-comparison-table.md.
window.EXTENDED_PARTIES = [
  // Parliamentary
  { id: 'er', slug: 'er', category: 'parliamentary', name: 'United Russia', leader: 'Medvedev', mandates: 325,
    supportPct: 100, budgetPct: 39, income2025: '8.8 bn ₽', stripeColor: 'var(--party-er)',
    hookBadge: 'the party of power', href: 'partii/er.html' },
  { id: 'kprf', slug: 'kprf', category: 'parliamentary', name: 'CPRF', leader: 'Zyuganov', mandates: 57,
    supportPct: 94, budgetPct: 84, income2025: '1.8 bn ₽', stripeColor: 'var(--party-kprf)',
    hookBadge: 'Zyuganov — co-author of ФЗ-32 and ФЗ-386', href: 'partii/kprf.html' },
  { id: 'ldpr', slug: 'ldpr', category: 'parliamentary', name: 'LDPR', leader: 'Slutsky', mandates: 23,
    supportPct: 98, budgetPct: 89, income2025: '767 mn ₽', stripeColor: 'var(--party-ldpr)',
    hookBadge: 'Lugovoy — co-author of ФЗ-255 (foreign agents)', href: 'partii/ldpr.html' },
  { id: 'srzp', slug: 'srzp', category: 'parliamentary', name: 'A Just Russia – For Truth', leader: 'Mironov', mandates: 27,
    supportPct: 98, budgetPct: 76, income2025: '726 mn ₽', stripeColor: 'var(--party-sr)',
    hookBadge: 'Aksakov — author of ФЗ-340 (digital rouble)', href: 'partii/srzp.html' },
  { id: 'nl', slug: 'novye-lyudi', category: 'parliamentary', name: 'New People', leader: 'Nechayev', mandates: 15,
    supportPct: 92, budgetPct: 93, income2025: '719 mn ₽', stripeColor: 'var(--party-nl)',
    hookBadge: 'Davankov — co-author of mobilisation amendments, Sept 2022', href: 'partii/novye-lyudi.html' },

  // Extra-parliamentary
  { id: 'yabloko', slug: 'yabloko', category: 'extra-parliamentary', name: 'Yabloko', leader: 'Rybakov / Yavlinsky',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '189 mn ₽', stripeColor: '#777',
    hookBadge: '11+ members on the foreign-agent register', href: 'partii/yabloko.html' },
  { id: 'partiya-rosta', slug: 'partiya-rosta', category: 'extra-parliamentary', name: 'Party of Growth', leader: 'Titov',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '—', stripeColor: 'var(--ink-muted)',
    hookBadge: 'dissolved by Supreme Court, 20.11.2025', href: 'partii/partiya-rosta.html' },
  { id: 'gi', slug: 'grazhdanskaya-initsiativa', category: 'extra-parliamentary', name: 'Civic Initiative',
    leader: 'A. Nechayev', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: 'var(--ink-muted)', hookBadge: 'dissolved by Supreme Court, 17.06.2025', href: 'partii/grazhdanskaya-initsiativa.html' },
  { id: 'partiya-dela', slug: 'partiya-dela', category: 'extra-parliamentary', name: 'Party of Business', leader: 'Babkin',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '—', stripeColor: 'var(--ink-muted)',
    hookBadge: 'dissolved by Supreme Court, 27.11.2024', href: 'partii/partiya-dela.html' },

  // Spoilers
  { id: 'kr', slug: 'kommunisty-rossii', category: 'spoiler', name: 'Communists of Russia',
    leader: 'Suraikin (until 2022)', mandates: null, supportPct: null, budgetPct: 0, income2025: '5.6 mn ₽',
    stripeColor: '#999', hookBadge: 'CPRF spoiler — doppelganger candidates in 7/15 Moscow districts', href: 'partii/kommunisty-rossii.html' },
  { id: 'rppss', slug: 'pensionery', category: 'spoiler', name: 'Party of Pensioners',
    leader: '— niche party', mandates: null, supportPct: null, budgetPct: 0, income2025: '16.7 mn ₽',
    stripeColor: '#999', hookBadge: '2.45% in the 2021 Duma election (below the 3% threshold)', href: 'partii/pensionery.html' },
  { id: 'green-alt', slug: 'zelenye', category: 'spoiler', name: 'Green Alternative',
    leader: '— project party', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: '#999', hookBadge: 'registered by the Ministry of Justice, 07.04.2020 — the same week as New People', href: 'partii/zelenye.html' },
  { id: 'rpss', slug: 'rpss', category: 'spoiler', name: 'RPSS', leader: 'Bogdanov', mandates: null,
    supportPct: null, budgetPct: 0, income2025: '5 mn ₽', stripeColor: '#999',
    hookBadge: 'formerly the CPSU — "Bogdanov\'s laboratory"', href: 'partii/rpss.html' },
  { id: 'gp', slug: 'grazhdanskaya-platforma', category: 'spoiler', name: 'Civil Platform',
    leader: 'Shaikhutdinov', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: '#999', hookBadge: '"dormant" party — 0.15% in the 2021 Duma election', href: 'partii/grazhdanskaya-platforma.html' }
];

window.EXTENDED_PARTY_CATEGORIES = [
  { id: 'parliamentary', title: 'Parliamentary', meta: '5 factions · 100% of seats in the 8th Duma (450/450)' },
  { id: 'extra-parliamentary', title: 'Extra-parliamentary', meta: '3 dissolved by the Supreme Court in 2024–2025 · 1 persisting under pressure' },
  { id: 'spoiler', title: 'Spoilers and project parties', meta: '5 parties · siphoning votes from competitors' }
];
