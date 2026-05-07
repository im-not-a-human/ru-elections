// EN translation of assets/js/data/digital-sources.js
// Sync source: assets/js/data/digital-sources.js
// Glossary: research/i18n_glossary_draft.md
// Editorial rules: research/i18n_locked_decisions.md

// Source bibliography for the digital restrictions page.
// cat: 'law' (statutory instruments), 'tech' (technical measurements), 'rights' (human rights),
//      'biz' (business media), 'state' (government sources), 'state-media' (state media),
//      'indep' (independent media), 'expert' (experts)
window.DIGITAL_SOURCES = [
  // Statutory instruments
  { cat: 'law', name: 'ФЗ № 281-ФЗ от 31.07.2025', url: 'http://publication.pravo.gov.ru/document/0001202507310012' },
  { cat: 'law', name: 'ФЗ № 303-ФЗ от 08.08.2024 (лимит SIM, биометрия)', url: 'http://publication.pravo.gov.ru/document/0001202408080127' },
  { cat: 'law', name: 'sozd.duma.gov.ru', url: 'https://sozd.duma.gov.ru' },
  { cat: 'law', name: 'kremlin.ru — указы и законы', url: 'http://www.kremlin.ru/acts' },
  { cat: 'law', name: 'Тверской суд, дело 02-2473/2022 (запрет Meta)', url: 'https://www.rbc.ru/technology_and_media/20/06/2022/62b076d99a79474b3991e5b4' },

  // Technical measurements
  { cat: 'tech', name: 'Top10VPN — Cost of Internet Shutdowns', url: 'https://www.top10vpn.com/research/cost-of-internet-shutdowns/' },
  { cat: 'tech', name: 'Tor Metrics', url: 'https://metrics.torproject.org' },
  { cat: 'tech', name: 'OONI (Open Observatory of Network Interference)', url: 'https://ooni.org' },
  { cat: 'tech', name: 'Google Transparency Report — YouTube', url: 'https://transparencyreport.google.com/traffic/' },
  { cat: 'tech', name: 'Cloudflare Radar', url: 'https://radar.cloudflare.com' },
  { cat: 'tech', name: 'Mediascope', url: 'https://mediascope.net' },
  { cat: 'tech', name: 'Sensor Tower', url: 'https://sensortower.com' },
  { cat: 'tech', name: 'NetBlocks', url: 'https://netblocks.org' },

  // Human rights / research organisations
  { cat: 'rights', name: 'Freedom House — Freedom on the Net 2025: Russia', url: 'https://freedomhouse.org/country/russia/freedom-net/2025' },
  { cat: 'rights', name: 'Freedom House — China 2025', url: 'https://freedomhouse.org/country/china/freedom-net/2025' },
  { cat: 'rights', name: 'Freedom House — Iran 2025', url: 'https://freedomhouse.org/country/iran/freedom-net/2025' },
  { cat: 'rights', name: 'HRW — Russia 30.07.2025', url: 'https://www.hrw.org/news/2025/07/30/russia-internet-blocking-disruptions-and-increasing-isolation' },
  { cat: 'rights', name: 'HRW — Russia: Shutdowns Escalate, 31.03.2026', url: 'https://www.hrw.org/news/2026/03/31/russia-internet-shutdowns-escalate' },
  { cat: 'rights', name: 'Access Now — Russia\'s war on connectivity', url: 'https://www.accessnow.org/russias-record-war-on-connectivity/' },
  { cat: 'rights', name: 'Access Now — Internet Shutdowns 2025', url: 'https://www.accessnow.org/internet-shutdowns-2025/' },
  { cat: 'rights', name: 'RSF Press Freedom Index', url: 'https://rsf.org/en/index' },

  // Business media
  { cat: 'biz', name: 'Коммерсант — период охлаждения SIM, 07.11.2025', url: 'https://www.kommersant.ru/doc/8181485' },
  { cat: 'biz', name: 'Коммерсант — снижение мошеннических звонков, 22.10.2025', url: 'https://www.kommersant.ru/doc/8140609' },
  { cat: 'biz', name: 'Ведомости — новые правила интернета, 09.08.2025', url: 'https://www.vedomosti.ru/technology/articles/2025/08/09/1130511-novie-pravila-ispolzovaniya-interneta' },
  { cat: 'biz', name: 'РБК — закон о приостановке связи по требованию ФСБ, 20.02.2026', url: 'https://www.rbc.ru/rbcfreenews/6998bacd9a7947720c215815' },
  { cat: 'biz', name: 'РБК — Хинштейн о YouTube, 26.07.2024', url: 'https://www.rbc.ru/technology_and_media/26/07/2024/66a393d79a794754343bc1de' },
  { cat: 'biz', name: 'РБК — Google опроверг, 02.08.2024', url: 'https://www.rbc.ru/technology_and_media/02/08/2024/66ac42089a79470ef13d71eb' },
  { cat: 'biz', name: 'РБК — ограничение звонков, 13.08.2025', url: 'https://www.rbc.ru/politics/13/08/2025/689c8c7c9a79479b1087586d' },
  { cat: 'biz', name: 'РБК — иностранные SIM, 28.11.2025', url: 'https://www.rbc.ru/rbcfreenews/692985d69a79471457093cc8' },
  { cat: 'biz', name: 'Forbes — потери бюджета от запрета рекламы, 27.08.2025', url: 'https://www.forbes.ru/biznes/544703-eksperty-sprognozirovali-poteri-budzeta-iz-za-zapreta-na-reklamu-v-instagram' },
  { cat: 'biz', name: 'Forbes — белый список 500+ сервисов, 23.04.2026', url: 'https://www.forbes.ru/tekhnologii/559771-mincifry-rassirilo-belyj-spisok-dostupnyh-pri-otklucenii-interneta-sajtov' },
  { cat: 'biz', name: 'Интерфакс — РКН и 1 730 компаний, 22.04.2026', url: 'https://www.interfax.ru/russia/1085410' },
  { cat: 'biz', name: 'Интерфакс — белый список еженедельно, 19.09.2025', url: 'https://www.interfax.ru/russia/1048120' },
  { cat: 'biz', name: 'Интерфакс — Шадаев о трафике соцсетей, 16.06.2022', url: 'https://www.interfax.ru/forumspb/846512' },
  { cat: 'biz', name: 'Интерфакс — MAX обязателен, 21.08.2025', url: 'https://www.interfax.ru/digital/1043261' },
  { cat: 'biz', name: 'Интерфакс — МВД о киберпреступлениях, 18.02.2026', url: 'https://www.interfax.ru/digital/1073418' },
  { cat: 'biz', name: 'CNews — блокировка после возвращения, 11.11.2025', url: 'https://www.cnews.ru/news/top/2025-11-11_rossiyanevernuvshiesya_iz-za' },
  { cat: 'biz', name: 'ComNews — мошенники перетекли в трубу, 20.08.2025', url: 'https://www.comnews.ru/content/240797/2025-08-20/2025-w34/1007/moshenniki-telegram-i-whatsapp-peretekli-trubu' },
  { cat: 'biz', name: 'Газета.Ru — потери Instagram, 23.04.2022', url: 'https://www.gazeta.ru/business/2022/04/23/14768558.shtml' },
  { cat: 'biz', name: 'Pravo.ru — поправки об отключении связи, 17.02.2026', url: 'https://pravo.ru/news/262459/' },
  { cat: 'biz', name: 'AP — отключения мобильного интернета', url: 'https://apnews.com/article/russia-internet-outage-cellphone-app-disruptions-1792cfb177c26682efdb8046e0f9b063' },
  { cat: 'biz', name: 'Reuters — белый список 05.09.2025', url: 'https://www.reuters.com/technology/russia-lists-local-apps-that-will-survive-its-internet-blackouts-2025-09-05/' },
  { cat: 'biz', name: 'АКИТ — ущерб столичному бизнесу', url: 'https://www.akit.ru/news/kak-massovye-otklyucheniya-interneta-povliyali-na-stolichnyj-biznes' },

  // Government sources
  { cat: 'state', name: 'ЦБ РФ', url: 'https://www.cbr.ru' },
  { cat: 'state', name: 'МВД РФ', url: 'https://мвд.рф' },
  { cat: 'state', name: 'Роскомнадзор', url: 'https://rkn.gov.ru' },
  { cat: 'state', name: 'Роскомнадзор — старый сайт', url: 'https://old.rkn.gov.ru/news/rsoc/news73836.htm' },
  { cat: 'state', name: 'Минцифры', url: 'https://digital.gov.ru' },
  { cat: 'state', name: 'Минюст — реестр иноагентов', url: 'https://minjust.gov.ru' },

  // State media
  { cat: 'state-media', name: 'РИА Новости', url: 'https://ria.ru' },
  { cat: 'state-media', name: 'ТАСС — РАЭК о малом бизнесе и Instagram, 18.05.2022', url: 'https://tass.ru/ekonomika/14655339' },
  { cat: 'state-media', name: 'Российская газета', url: 'https://rg.ru' },
  { cat: 'state-media', name: 'Парламентская газета', url: 'https://www.pnp.ru' },

  // Independent media
  { cat: 'indep', name: 'Meduza — расследования', url: 'https://meduza.io' },
  { cat: 'indep', name: 'iStories — Starlink, MAX на фронте, бюджет', url: 'https://istories.media' },
  { cat: 'indep', name: 'The Bell — IT-эмиграция', url: 'https://thebell.io' },
  { cat: 'indep', name: 'Новая газета Европа', url: 'https://novayagazeta.eu' },
  { cat: 'indep', name: 'Радио Свобода / Krym.Realii', url: 'https://www.svoboda.org' },
  { cat: 'indep', name: 'BBC Russian', url: 'https://www.bbc.com/russian' },
  { cat: 'indep', name: 'ОВД-Инфо', url: 'https://ovdinfo.org' },
  { cat: 'indep', name: 'Verstka.media', url: 'https://verstka.media' },

  // Experts
  { cat: 'expert', name: 'Андрей Солдатов (RFE/RL)', url: 'https://www.rferl.org' },
  { cat: 'expert', name: 'Михаил Климарёв («Общество защиты интернета»)', url: 'https://ozi.global' },
  { cat: 'expert', name: 'IFRI — MilTech War 2026', url: 'https://www.ifri.org/en/studies/mapping-miltech-war-eight-lessons-ukraines-battlefield' },
  { cat: 'expert', name: 'Carnegie Politika', url: 'https://carnegie.ru' },
];

window.DIGITAL_SOURCE_CATS = [
  { id: 'law',          label: 'Statutory instruments' },
  { id: 'tech',         label: 'Technical measurements' },
  { id: 'rights',       label: 'Human rights organisations' },
  { id: 'biz',          label: 'Business media' },
  { id: 'state',        label: 'Government sources' },
  { id: 'state-media',  label: 'State media' },
  { id: 'indep',        label: 'Independent media' },
  { id: 'expert',       label: 'Experts and analysts' },
];
