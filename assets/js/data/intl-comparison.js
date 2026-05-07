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
  { country: 'Исландия', score: 95, tier: 'hi' },
  { country: 'Эстония', score: 94, tier: 'hi' },
  { country: 'Канада', score: 86, tier: 'hi' },
  { country: 'Великобритания', score: 79, tier: 'hi' },
  { country: 'Германия', score: 78, tier: 'hi' },
  { country: 'США', score: 75, tier: 'hi' },
  { country: 'Бразилия', score: 64, tier: 'mid' },
  { country: 'Индия', score: 49, tier: 'mid' },
  { country: 'Турция', score: 30, tier: 'lo' },
  { country: 'Беларусь', score: 20, tier: 'lo' },
  { country: 'Россия', score: 17, tier: 'lo', highlight: true },
  { country: 'Иран', score: 13, tier: 'lo' },
  { country: 'Китай', score: 9, tier: 'lo' },
];

// Democratic regulators comparison — what differs from RU
window.REG_COMPARE = [
  {
    framework: 'GDPR (ЕС, 2018)',
    scope: 'Защита персональных данных',
    judicial: 'yes',
    appeal: 'yes',
    userCrim: 'no',
    block: 'no',
  },
  {
    framework: 'NetzDG (Германия, 2017)',
    scope: 'Удаление противоправного контента в 24 ч / 7 дней',
    judicial: 'yes',
    appeal: 'yes',
    userCrim: 'no',
    block: 'no',
  },
  {
    framework: 'Online Safety Act (UK, 2023)',
    scope: 'Защита детей, age verification',
    judicial: 'yes',
    appeal: 'yes',
    userCrim: 'no',
    block: 'partial',
  },
  {
    framework: 'DSA (ЕС, 2024)',
    scope: 'Прозрачность алгоритмов, оценки рисков',
    judicial: 'yes',
    appeal: 'yes',
    userCrim: 'no',
    block: 'no',
  },
  {
    framework: 'Section 230 (США, 1996)',
    scope: 'Иммунитет платформ от ответственности за контент пользователей',
    judicial: 'partial',
    appeal: 'partial',
    userCrim: 'no',
    block: 'no',
  },
  {
    framework: 'РФ: ФЗ-149, ФЗ-281, реестр иноагентов, реестр блогеров, ТСПУ, MAX',
    scope: 'Контроль информации, идентификация, юрисдикционный фильтр',
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
    title: 'Высшие чиновники и силовики',
    summary: 'Параллельная защищённая инфраструктура связи: АТС-1 (~1 000 высших), АТС-2 (5–7 тыс. от уровня замминистра), ВЧ (~5 000 региональных), ПС (~100 абонентов). Спецсвязь ФСО. Telegram-каналы продолжают вести Кадыров, Захарова, Малофеев, ряд депутатов — без регистрации в реестре. Песков: «У нас есть канал в Max. И остаётся канал в Telegram… в наших интересах эту повестку доводить до них».',
    tags: ['АТС-1', 'АТС-2', 'ВЧ', 'ПС', 'Telegram у Кадырова, Захаровой', 'Никонов из Вашингтона'],
  },
  {
    level: 2,
    title: 'Госкомпании и крупный бизнес',
    summary: 'Легальный VPN через «белый список» РКН: 1 730 компаний, 57 000+ адресов и подсетей. Госорганы потратили 14,1 млрд ₽ на VPN в 2025 году. С 04.2026 — 20+ ИТ-компаний (Сбер, Яндекс, VK, Ozon, Wildberries) обязаны блокировать пользователей с непризнанными VPN, но сами имеют доступ для собственной инфраструктуры.',
    tags: ['1 730 компаний', '57 000+ IP', '14,1 млрд ₽ госзакупок', '20+ ИТ-компаний'],
  },
  {
    level: 3,
    title: 'Частные пользователи',
    summary: 'Полный режим штрафов и ТСПУ: ст. 13.53 КоАП — 3–5 тыс. ₽ за «умышленный поиск экстремизма» через VPN; ст. 14.3 — 80/150/500 тыс. ₽ за «рекламу» VPN. Throttling YouTube (×6,3 раза), блокировка Discord, ограничения голосовых вызовов, обязательный MAX, 24-часовое SIM-охлаждение после возвращения из-за границы.',
    tags: ['ст. 13.53 КоАП', 'ст. 14.3 КоАП', 'ТСПУ', 'throttling', '«период охлаждения»'],
  },
  {
    level: 4,
    title: 'Иноагенты',
    summary: 'Полное поражение в политических правах: 1 138 позиций в реестре на январь 2026 года. ФЗ № 60-ФЗ + поправки 06.05.2024: запрет участвовать в выборах всех уровней, быть наблюдателями, доверенными лицами. Действующим выборным лицам — 180 дней для исключения из реестра под угрозой досрочного прекращения полномочий. ОВД-Инфо: 142 организации ликвидированы.',
    tags: ['1 138 позиций', '142 организации ликвидированы', 'запрет на выборы'],
  },
];
