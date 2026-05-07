// Corporate VPN whitelist growth — РКН + vc.ru.
// Точные точки (estimated=false): октябрь 2024 (~12 тыс. РКН) и апрель 2026
// (57 тыс. РКН / 75 тыс. vc.ru). Остальные — интерполяция тренда.
window.WHITELIST_GROWTH = [
  { date: '2024-10-01', label: 'окт. 2024', rkn: 12000, vc: 12000, estimated: false },
  { date: '2025-01-01', label: 'янв. 2025', rkn: 18000, vc: 22000, estimated: true },
  { date: '2025-04-01', label: 'апр. 2025', rkn: 24000, vc: 30000, estimated: true },
  { date: '2025-07-01', label: 'июль 2025', rkn: 32000, vc: 41000, estimated: true },
  { date: '2025-10-01', label: 'окт. 2025', rkn: 42000, vc: 55000, estimated: true },
  { date: '2026-01-01', label: 'янв. 2026', rkn: 50000, vc: 67000, estimated: true },
  { date: '2026-04-01', label: 'апр. 2026', rkn: 57000, vc: 75000, estimated: false },
];

// VPN growth (demand side) — Sensor Tower top-5 active users (млн).
// Точные точки из консенсуса: Q3 2025 ~6 млн, Q4 2025 ~7,3 млн.
// Q1/Q2 2025 и Q1 2026 — экстраполяция (estimated=true), показывают порядок.
window.VPN_GROWTH = [
  { period: 'Q1 2025', users: 0.25, estimated: true },
  { period: 'Q2 2025', users: 0.4, estimated: true },
  { period: 'Q3 2025', users: 6.0, estimated: false },
  { period: 'Q4 2025', users: 7.3, estimated: false },
  { period: 'Q1 2026', users: 9.5, estimated: true },
];

// Companies with allowed corporate VPN — РКН (через «Интерфакс», 22.04.2026 — 469 заблокировано).
window.CORP_VPN = {
  blockedVpns: 469,
  companies: 1730,
  ipsAndSubnets: 57000,
  govExpense: 14.1, // billion RUB in 2025
};
