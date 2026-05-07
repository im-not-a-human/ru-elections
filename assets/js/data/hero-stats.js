// Hero stat hooks for index.html — replaces "2/18" / "100%" / "6%" / "407/450"
// after research found stronger compromat-relevant numbers.
// Source: research/compromat/02-cross-cutting/09-betrayal-cases.md §«Hero-блок».
window.HERO_STATS = [
  {
    n: '300',
    nUnit: 'тыс.',
    alert: true,
    label: 'мужчин призваны за 36 часов после <strong>мобилизации 20.09.2022</strong>. Все четыре «оппозиционные» фракции — «за», <strong>ноль голосов против</strong> (КПРФ 51/0, ЛДПР 18/0, СРЗП 21/0, НЛ 13/0).',
    source: { label: 'vote/119076 (api.duma.gov.ru)', href: 'research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml' }
  },
  {
    n: '32,5',
    nUnit: '%',
    alert: true,
    label: 'бюджета‑2025 — на оборону. <strong>13,5 трлн ₽</strong> против 1,86 трлн на здравоохранение и 1,58 трлн на образование. ЛДПР и НЛ — «за»; КПРФ и СРЗП воздержались, но <strong>не заблокировали</strong> военные статьи.',
    source: { label: 'ФЗ‑419 от 30.11.2024', href: 'research/compromat/02-cross-cutting/09-betrayal-cases.md' }
  },
  {
    n: '385',
    nUnit: '/0/1',
    alert: false,
    label: '<strong>Цифровой рубль ФЗ‑340</strong> — даёт ЦБ видимость каждой транзакции каждого гражданина. Автор — <strong>А.Г. Аксаков (СРЗП)</strong>, председатель Комитета ГД по финрынку. Все четыре «оппозиции» — «за».',
    source: { label: 'vote/124183 + bill 270838-8', href: 'research/compromat/05-evidence/duma-api/votes/digital-ruble-1.xml' }
  },
  {
    n: '700',
    nUnit: '+',
    alert: true,
    label: 'уголовных дел по <strong>ст. 207.3 УК «фейки об армии»</strong> к 2025 г. (до 15 лет колонии). Соавторы закона — <strong>Г.А. Зюганов (КПРФ)</strong> и <strong>С.М. Миронов (СРЗП)</strong>, лидеры самых крупных «оппозиционных» фракций.',
    source: { label: 'bill 464757-7 (sozd.duma.gov.ru)', href: 'research/compromat/05-evidence/sozd-bills/464757-7.html' }
  }
];
