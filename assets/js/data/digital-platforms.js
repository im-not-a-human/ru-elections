// Platform comparison data — messengers, video, etc.
// All numbers as of October 2025 (Mediascope, Альфа-курс).
window.MESSENGER_DATA = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: '#25D366',
    mau: 96.2,
    dau: 82.1,
    coverage: 78,
    note: 'Принадлежит Meta (организация, признанная экстремистской); голосовые ограничены с 13.08.2025; РКН угрожал полной блокировкой 28.11.2025; скорость снижена на 70–80% с 22.12.2025',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    color: '#229ED9',
    mau: 91,
    dau: 68,
    coverage: 74,
    note: 'ОРИ-статус с 2017 года; голосовые ограничены с 13.08.2025; реестр блогеров с >10 тыс. подписчиков с 01.11.2024',
  },
  {
    id: 'max',
    name: 'MAX',
    color: '#B91C1C',
    mau: 48,
    dau: 18.9,
    coverage: 39,
    note: 'Обязательная предустановка с 01.09.2025; не использует сквозного шифрования; интегрирован с ФСБ, МВД, ФНС, ЦБ; топ-каналы в 60× меньше Telegram (MaxStat.IO); запрещён ВС РФ на фронте (iStories, 23.02.2026)',
  },
];

// YouTube throttling — Google Transparency Report.
// Точные точки 12.07.2024 (48,759/6,228) и 23.12.2024 (7,78/9,994) — из консенсуса.
// Промежуточные точки — интерполяция тренда между двумя точками; помечены estimated=true.
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
