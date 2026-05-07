// EN translation of assets/js/data/digital-platforms.js
// Sync source: assets/js/data/digital-platforms.js
// Glossary: research/i18n_glossary_draft.md
// Editorial rules: research/i18n_locked_decisions.md

// Platform comparison data — messengers, video, etc.
// All numbers as of October 2025 (Mediascope, Alfa-kurs).
window.MESSENGER_DATA = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: '#25D366',
    mau: 96.2,
    dau: 82.1,
    coverage: 78,
    note: 'Owned by Meta (organisation designated extremist under Russian law); voice calls restricted from 13.08.2025; Roskomnadzor threatened full block on 28.11.2025; speeds reduced by 70–80% from 22.12.2025',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    color: '#229ED9',
    mau: 91,
    dau: 68,
    coverage: 74,
    note: 'IDO (information dissemination organiser) status since 2017; voice calls restricted from 13.08.2025; blogger register applies to channels with 10 000+ subscribers from 01.11.2024',
  },
  {
    id: 'max',
    name: 'MAX',
    color: '#B91C1C',
    mau: 48,
    dau: 18.9,
    coverage: 39,
    note: 'Mandatory pre-installation from 01.09.2025; does not use end-to-end encryption; integrated with the FSB, MVD, Federal Tax Service, and Central Bank of Russia; top channels are 60× smaller than Telegram (MaxStat.IO); banned by Russian Armed Forces at the front (iStories, 23.02.2026)',
  },
];

// YouTube throttling — Google Transparency Report.
// Exact data points 12.07.2024 (48,759/6,228) and 23.12.2024 (7.78/9.994) — from consensus.
// Intermediate points — trend interpolation between the two exact points; marked estimated=true.
window.YOUTUBE_TIMELINE = [
  { date: '2024-07-12', ru: 48.759, nl: 6.228, estimated: false },
  { date: '2024-07-25', ru: 46.0, nl: 6.4, estimated: true },
  { date: '2024-08-01', ru: 32.0, nl: 6.8, estimated: true },
  { date: '2024-08-15', ru: 22.0, nl: 7.1, estimated: true },
  { date: '2024-09-01', ru: 17.5, nl: 7.5, estimated: true },
  { date: '2024-10-01', ru: 13.0, nl: 8.1, estimated: true },
  { date: '2024-11-15', ru: 9.5, nl: 8.7, estimated: true },
  { date: '2024-12-23', ru: 7.78, nl: 9.994, estimated: false },
];
