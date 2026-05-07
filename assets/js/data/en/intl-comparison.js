// EN translation of assets/js/data/intl-comparison.js
// Sync source: assets/js/data/intl-comparison.js
// Glossary: research/i18n_glossary_draft.md
// Editorial rules: research/i18n_locked_decisions.md

// International comparison — Freedom on the Net + RSF.

// Freedom on the Net — annual scores (Russia trajectory + neighbours)
window.FON_RUSSIA = [
  { year: 2021, score: 30 },
  { year: 2022, score: 23 },
  { year: 2023, score: 21 },
  { year: 2024, score: 20 },
  { year: 2025, score: 17 },
];

// Country leaderboard 2025 (selected) — Freedom House
window.FON_LEADERBOARD = [
  { country: 'Iceland', score: 95, tier: 'hi' },
  { country: 'Estonia', score: 94, tier: 'hi' },
  { country: 'Canada', score: 86, tier: 'hi' },
  { country: 'United Kingdom', score: 79, tier: 'hi' },
  { country: 'Germany', score: 78, tier: 'hi' },
  { country: 'USA', score: 75, tier: 'hi' },
  { country: 'Brazil', score: 64, tier: 'mid' },
  { country: 'India', score: 49, tier: 'mid' },
  { country: 'Turkey', score: 30, tier: 'lo' },
  { country: 'Belarus', score: 20, tier: 'lo' },
  { country: 'Russia', score: 17, tier: 'lo', highlight: true },
  { country: 'Iran', score: 13, tier: 'lo' },
  { country: 'China', score: 9, tier: 'lo' },
];

// Democratic regulators comparison — what differs from Russia
window.REG_COMPARE = [
  {
    framework: 'GDPR (EU, 2018)',
    scope: 'Personal data protection',
    judicial: 'yes',
    appeal: 'yes',
    userCrim: 'no',
    block: 'no',
  },
  {
    framework: 'NetzDG (Germany, 2017)',
    scope: 'Removal of unlawful content within 24 hours / 7 days',
    judicial: 'yes',
    appeal: 'yes',
    userCrim: 'no',
    block: 'no',
  },
  {
    framework: 'Online Safety Act (UK, 2023)',
    scope: 'Child protection, age verification',
    judicial: 'yes',
    appeal: 'yes',
    userCrim: 'no',
    block: 'partial',
  },
  {
    framework: 'DSA (EU, 2024)',
    scope: 'Algorithmic transparency, risk assessments',
    judicial: 'yes',
    appeal: 'yes',
    userCrim: 'no',
    block: 'no',
  },
  {
    framework: 'Section 230 (USA, 1996)',
    scope: 'Platform immunity from liability for user-generated content',
    judicial: 'partial',
    appeal: 'partial',
    userCrim: 'no',
    block: 'no',
  },
  {
    framework: 'Russia: ФЗ-149, ФЗ-281, foreign-agent register, blogger register, TSPU, MAX',
    scope: 'Information control, identification, jurisdictional filter',
    judicial: 'no',
    appeal: 'no',
    userCrim: 'yes',
    block: 'yes',
    highlight: true,
  },
];

// Selectivity layers — 4 tiers of enforcement
window.SELECTIVITY_LAYERS = [
  {
    level: 1,
    title: 'Senior officials and security services',
    summary: 'Parallel protected communications infrastructure: government telephone exchange ATS-1 (approx. 1,000 senior officials), ATS-2 (5,000–7,000 officials from deputy-minister level), high-frequency VCh lines (approx. 5,000 regional), PS secure lines (approx. 100 subscribers). Federal Protective Service (FSO) secure communications. Telegram channels continue to be operated by Kadyrov, Zakharova, Malofeyev, and a number of deputies — without registration in any register. Kremlin spokesman Dmitry Peskov (Дмитрий Песков): "We have a channel on MAX. And there remains a channel on Telegram… it is in our interests to bring this agenda to them."',
    tags: ['ATS-1', 'ATS-2', 'VCh', 'PS', 'Telegram — Kadyrov, Zakharova', 'Nikonov from Washington'],
  },
  {
    level: 2,
    title: 'State-owned enterprises and large businesses',
    summary: 'Legal VPN access via Roskomnadzor (RKN) "whitelist": 1,730 companies, 57,000+ addresses and subnets. Government agencies spent 14.1 billion roubles on VPN services in 2025. From April 2026, 20+ IT companies (Sber, Yandex, VK, Ozon, Wildberries) are required to block users with non-approved VPN services, while retaining access for their own infrastructure.',
    tags: ['1,730 companies', '57,000+ IPs', '14.1 bn rouble procurement spend', '20+ IT companies'],
  },
  {
    level: 3,
    title: 'Private users',
    summary: 'Full regime of fines and TSPU (deep-packet-inspection filtering infrastructure): Article 13.53 of the Code of Administrative Offences — 3,000–5,000 roubles for "intentional search for extremist content" via VPN; Article 14.3 — 80,000/150,000/500,000 roubles for "advertising" VPN services. YouTube throttled (×6.3 times slower), Discord blocked, voice-call restrictions, mandatory MAX messenger, 24-hour SIM cool-down period after return from abroad.',
    tags: ['Art. 13.53 CAO', 'Art. 14.3 CAO', 'TSPU', 'throttling', '"cool-down period"'],
  },
  {
    level: 4,
    title: 'Foreign agents',
    summary: 'Complete deprivation of political rights: 1,138 entries in the register as of January 2026. ФЗ № 60-ФЗ plus amendments of 06.05.2024: ban on participation in elections at all levels, and on serving as observers or trusted representatives. Elected officials have 180 days to be removed from the register, or face early termination of their mandate. OVD-Info: 142 organisations liquidated.',
    tags: ['1,138 register entries', '142 organisations liquidated', 'election ban'],
  },
];
