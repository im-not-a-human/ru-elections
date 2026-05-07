// Extended party metadata for the 14-party hub on index.html.
// Includes parliamentary, extra-parliamentary, and spoiler categories.
// Source for figures: research/compromat/04-summary-tables/final-comparison-table.md.
window.EXTENDED_PARTIES = [
  // Parliamentary
  { id: 'er', slug: 'er', category: 'parliamentary', name: 'Единая Россия', leader: 'Медведев', mandates: 325,
    supportPct: 100, budgetPct: 39, income2025: '8,8 млрд ₽', stripeColor: 'var(--party-er)',
    hookBadge: 'партия власти', href: 'partii/er.html' },
  { id: 'kprf', slug: 'kprf', category: 'parliamentary', name: 'КПРФ', leader: 'Зюганов', mandates: 57,
    supportPct: 94, budgetPct: 84, income2025: '1,8 млрд ₽', stripeColor: 'var(--party-kprf)',
    hookBadge: 'Зюганов — соавтор ФЗ-32 и ФЗ-386', href: 'partii/kprf.html' },
  { id: 'ldpr', slug: 'ldpr', category: 'parliamentary', name: 'ЛДПР', leader: 'Слуцкий', mandates: 23,
    supportPct: 98, budgetPct: 89, income2025: '767 млн ₽', stripeColor: 'var(--party-ldpr)',
    hookBadge: 'Луговой — соавтор ФЗ-255 (иноагенты)', href: 'partii/ldpr.html' },
  { id: 'srzp', slug: 'srzp', category: 'parliamentary', name: 'СРЗП', leader: 'Миронов', mandates: 27,
    supportPct: 98, budgetPct: 76, income2025: '726 млн ₽', stripeColor: 'var(--party-sr)',
    hookBadge: 'Аксаков — автор ФЗ-340 (цифровой рубль)', href: 'partii/srzp.html' },
  { id: 'nl', slug: 'novye-lyudi', category: 'parliamentary', name: 'Новые люди', leader: 'Нечаев', mandates: 15,
    supportPct: 92, budgetPct: 93, income2025: '719 млн ₽', stripeColor: 'var(--party-nl)',
    hookBadge: 'Даванков — соавтор моб. поправок 09.2022', href: 'partii/novye-lyudi.html' },

  // Extra-parliamentary
  { id: 'yabloko', slug: 'yabloko', category: 'extra-parliamentary', name: 'Яблоко', leader: 'Рыбаков / Явлинский',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '189 млн ₽', stripeColor: '#777',
    hookBadge: '11+ членов в реестре иноагентов', href: 'partii/yabloko.html' },
  { id: 'partiya-rosta', slug: 'partiya-rosta', category: 'extra-parliamentary', name: 'Партия Роста', leader: 'Титов',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '—', stripeColor: 'var(--ink-muted)',
    hookBadge: 'ликвидирована ВС 20.11.2025', href: 'partii/partiya-rosta.html' },
  { id: 'gi', slug: 'grazhdanskaya-initsiativa', category: 'extra-parliamentary', name: 'Гражданская инициатива',
    leader: 'А. Нечаев', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: 'var(--ink-muted)', hookBadge: 'ликвидирована ВС 17.06.2025', href: 'partii/grazhdanskaya-initsiativa.html' },
  { id: 'partiya-dela', slug: 'partiya-dela', category: 'extra-parliamentary', name: 'Партия дела', leader: 'Бабкин',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '—', stripeColor: 'var(--ink-muted)',
    hookBadge: 'ликвидирована ВС 27.11.2024', href: 'partii/partiya-dela.html' },

  // Spoilers
  { id: 'kr', slug: 'kommunisty-rossii', category: 'spoiler', name: 'Коммунисты России',
    leader: 'Сурайкин (до 2022)', mandates: null, supportPct: null, budgetPct: 0, income2025: '5,6 млн ₽',
    stripeColor: '#999', hookBadge: 'спойлер КПРФ — двойники в 7/15 округах Москвы', href: 'partii/kommunisty-rossii.html' },
  { id: 'rppss', slug: 'pensionery', category: 'spoiler', name: 'Партия пенсионеров',
    leader: '— нишевая', mandates: null, supportPct: null, budgetPct: 0, income2025: '16,7 млн ₽',
    stripeColor: '#999', hookBadge: '2,45% на ГД-2021 (ниже 3%-ного барьера)', href: 'partii/pensionery.html' },
  { id: 'green-alt', slug: 'zelenye', category: 'spoiler', name: 'Зелёная альтернатива',
    leader: '— проектная', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: '#999', hookBadge: 'регистрация Минюст 07.04.2020 в одну неделю с НЛ', href: 'partii/zelenye.html' },
  { id: 'rpss', slug: 'rpss', category: 'spoiler', name: 'РПСС', leader: 'Богданов', mandates: null,
    supportPct: null, budgetPct: 0, income2025: '5 млн ₽', stripeColor: '#999',
    hookBadge: 'бывшая КПСС — «лаборатория Богданова»', href: 'partii/rpss.html' },
  { id: 'gp', slug: 'grazhdanskaya-platforma', category: 'spoiler', name: 'Гражданская платформа',
    leader: 'Шайхутдинов', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: '#999', hookBadge: '«спящая» партия — 0,15% на ГД-2021', href: 'partii/grazhdanskaya-platforma.html' }
];

window.EXTENDED_PARTY_CATEGORIES = [
  { id: 'parliamentary', title: 'Парламентские', meta: '5 фракций · 100% мандатов VIII Думы (450/450)' },
  { id: 'extra-parliamentary', title: 'Внепарламентские', meta: '3 ликвидированы ВС в 2024–2025 · 1 удерживается под давлением' },
  { id: 'spoiler', title: 'Спойлеры и проекты', meta: '5 партий · отъём голосов у конкурентов' }
];
