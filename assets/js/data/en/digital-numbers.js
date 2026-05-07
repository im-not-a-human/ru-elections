// EN translation of assets/js/data/digital-numbers.js
// Sync source: assets/js/data/digital-numbers.js
// Glossary: research/i18n_glossary_draft.md
// Editorial rules: research/i18n_locked_decisions.md

// Hero numbers for the digital restrictions page.
// Each entry: { value, label, source, tone }
// tone: '' (neutral) | 'alert' (red) | 'warn' (gold) | 'green'
window.DIGITAL_HERO_NUMBERS = [
  {
    value: '29.3 bn ₽',
    label: 'Stolen from citizens\' accounts in 2025 — a record in the era of anti-fraud legislation',
    source: 'ЦБ РФ; Сбербанк (Совфед, янв. 2026): 295 млрд ₽/год с учётом наличных',
    tone: 'alert',
    counter: { target: 29.3, decimals: 1, suffix: ' bn ₽' },
  },
  {
    value: '23,000+',
    label: 'Drone attacks on Russian territory in 2025 (×3.7 vs 2024)',
    source: 'Совбез РФ (Шойгу, март 2026)',
    tone: 'alert',
    counter: { target: 23000, decimals: 0, suffix: '+' },
  },
  {
    value: '$11.9 bn',
    label: 'Cost of internet shutdowns in Russia in 2025 — a global maximum',
    source: 'Top10VPN, NetBlocks COST methodology',
    tone: 'warn',
    counter: { target: 11.9, decimals: 1, prefix: '$', suffix: ' bn' },
  },
  {
    value: '1,730',
    label: 'Companies with lawful VPN access (57,000+ IPs, Apr. 2026)',
    source: 'РКН через «Интерфакс», 22.04.2026',
    tone: '',
    counter: { target: 1730, decimals: 0 },
  },
];
