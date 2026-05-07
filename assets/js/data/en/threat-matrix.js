// EN translation of assets/js/data/threat-matrix.js
// Sync source: assets/js/data/threat-matrix.js
// Glossary: research/i18n_glossary_draft.md
// Editorial rules: research/i18n_locked_decisions.md

// Threat-model matrix data: which countermeasures actually close which threats.
// Cell value: 'closes' | 'partial' | 'no' | 'side'
// Each cell can have a tooltip explanation.
window.THREAT_ROWS = [
  { id: 'foreign-sim', label: 'Drone with a foreign SIM card that has just crossed the border' },
  { id: 'ru-sim', label: 'Drone with a Russian SIM card already active beforehand' },
  { id: 'radio', label: 'Drone using a radio channel' },
  { id: 'starlink', label: 'Drone using satellite communications (Starlink)' },
  { id: 'autopilot', label: 'Drone with autopilot / pre-programmed route' },
  { id: 'inertial', label: 'Drone with inertial / visual navigation' },
  { id: 'fraud', label: 'Mass fraud via messaging applications' },
  { id: 'civic', label: 'Citizens\' access to independent media / global platforms' },
];

window.THREAT_COLS = [
  { id: 'sim-cool', label: 'SIM cool-down' },
  { id: 'shutdown', label: 'Regional mobile internet shutdown' },
  { id: 'whitelist', label: 'Whitelist' },
  { id: 'vpn-block', label: 'VPN block' },
];

// Cells: [rowId][colId] = { state, tip }
window.THREAT_CELLS = {
  'foreign-sim': {
    'sim-cool':   { state: 'partial', tip: 'The primary scenario the measure was formally designed for. Closes only the narrow case of an active SIM at the moment of crossing the border.' },
    'shutdown':   { state: 'partial', tip: 'A regional mobile internet shutdown can interrupt connectivity to the operator, but not a pre-activated SIM or one in a zone with partial coverage.' },
    'whitelist':  { state: 'partial', tip: 'Not directly relevant; helps only if the drone relies on specific online services.' },
    'vpn-block':  { state: 'no', tip: 'Not relevant for a device using cellular connectivity.' },
  },
  'ru-sim': {
    'sim-cool':   { state: 'partial', tip: 'Weak. If the SIM is a regular active SIM on the network, the cool-down will not trigger; if the SIM has been inactive for a long period or in roaming, it may knock out a subset of scenarios. FSB via Vzglyad (21.04.2026): 19 "SIM-box" organisers detained across 12 regions, 2,000 SIM cards seized.' },
    'shutdown':   { state: 'partial', tip: 'Depends on the specific channel and the drone\'s backup channels.' },
    'whitelist':  { state: 'partial', tip: 'Blocks access to some services, but not the command channel.' },
    'vpn-block':  { state: 'no', tip: 'Not relevant: cellular connectivity does not route through VPN.' },
  },
  'radio': {
    'sim-cool':   { state: 'no', tip: 'The mobile network is not the primary channel.' },
    'shutdown':   { state: 'no', tip: 'The radio channel is independent of the mobile network.' },
    'whitelist':  { state: 'no', tip: 'Not relevant to a radio channel.' },
    'vpn-block':  { state: 'no', tip: 'Not relevant to a radio channel.' },
  },
  'starlink': {
    'sim-cool':   { state: 'no', tip: 'Disabling mobile connectivity does not disable the satellite channel.' },
    'shutdown':   { state: 'no', tip: 'Satellite communications operate above and beyond a mobile shutdown. Meduza (06.02.2026): SpaceX has begun disabling unauthorised terminals, but this is not a systemic measure.' },
    'whitelist':  { state: 'no', tip: 'Not relevant to the satellite channel.' },
    'vpn-block':  { state: 'no', tip: 'Not relevant to the satellite channel.' },
  },
  'autopilot': {
    'sim-cool':   { state: 'no', tip: 'Online connectivity may not be required at all.' },
    'shutdown':   { state: 'no', tip: 'The autopilot is independent of mobile internet.' },
    'whitelist':  { state: 'no', tip: 'The autopilot does not use networked services.' },
    'vpn-block':  { state: 'no', tip: 'Not relevant to autonomous operation.' },
  },
  'inertial': {
    'sim-cool':   { state: 'no', tip: 'Navigation is independent of mobile internet.' },
    'shutdown':   { state: 'no', tip: 'Inertial and visual navigation are autonomous.' },
    'whitelist':  { state: 'no', tip: 'Navigation does not use networked services.' },
    'vpn-block':  { state: 'no', tip: 'Not relevant to autonomous navigation.' },
  },
  'fraud': {
    'sim-cool':   { state: 'no', tip: 'Social engineering does not depend on whether the subscriber is in roaming.' },
    'shutdown':   { state: 'partial', tip: 'Temporarily shifts the attack channel; ComNews 20.08.2025: rise in fraud from foreign numbers following restrictions on messaging applications.' },
    'whitelist':  { state: 'no', tip: 'Does not close social engineering.' },
    'vpn-block':  { state: 'no', tip: 'Does not close social engineering; total fraud losses per the Central Bank of Russia rose from ₽14.2bn (2022) to ₽29.3bn (2025).' },
  },
  'civic': {
    'sim-cool':   { state: 'side', tip: 'The effect is reliably achieved: 24 hours after returning from abroad — no mobile internet and no SMS.' },
    'shutdown':   { state: 'side', tip: 'Direct disruption of communications. AKIT: ₽3–5bn in business losses over 5 days in Moscow.' },
    'whitelist':  { state: 'side', tip: 'A jurisdictional filter: only Russian-hosted services remain, including state platforms and MAX.' },
    'vpn-block':  { state: 'side', tip: 'Direct restriction of citizens\' access to the global internet; in parallel — corporate VPN carve-outs for 1,730 companies.' },
  },
};
