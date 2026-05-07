// EN translation of assets/js/data/whitelist.js
// Sync source: assets/js/data/whitelist.js
// Glossary: research/i18n_glossary_draft.md
// Editorial rules: research/i18n_locked_decisions.md

// Corporate VPN whitelist growth — Roskomnadzor + vc.ru.
// Exact data points (estimated=false): October 2024 (~12 000 RKN) and April 2026
// (57 000 RKN / 75 000 vc.ru). All others — trend interpolation.
window.WHITELIST_GROWTH = [
  { date: '2024-10-01', label: 'Oct. 2024', rkn: 12000, vc: 12000, estimated: false },
  { date: '2025-01-01', label: 'Jan. 2025', rkn: 18000, vc: 22000, estimated: true },
  { date: '2025-04-01', label: 'Apr. 2025', rkn: 24000, vc: 30000, estimated: true },
  { date: '2025-07-01', label: 'Jul. 2025', rkn: 32000, vc: 41000, estimated: true },
  { date: '2025-10-01', label: 'Oct. 2025', rkn: 42000, vc: 55000, estimated: true },
  { date: '2026-01-01', label: 'Jan. 2026', rkn: 50000, vc: 67000, estimated: true },
  { date: '2026-04-01', label: 'Apr. 2026', rkn: 57000, vc: 75000, estimated: false },
];

// VPN growth (demand side) — Sensor Tower top-5 active users (millions).
// Exact data points from consensus: Q3 2025 ~6 million, Q4 2025 ~7.3 million.
// Q1/Q2 2025 and Q1 2026 — extrapolation (estimated=true), indicating order of magnitude.
window.VPN_GROWTH = [
  { period: 'Q1 2025', users: 0.25, estimated: true },
  { period: 'Q2 2025', users: 0.4, estimated: true },
  { period: 'Q3 2025', users: 6.0, estimated: false },
  { period: 'Q4 2025', users: 7.3, estimated: false },
  { period: 'Q1 2026', users: 9.5, estimated: true },
];

// Companies with allowed corporate VPN — Roskomnadzor (via Interfax, 22.04.2026 — 469 blocked).
window.CORP_VPN = {
  blockedVpns: 469,
  companies: 1730,
  ipsAndSubnets: 57000,
  govExpense: 14.1, // billion RUB in 2025
};
