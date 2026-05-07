// EN translation of assets/js/data/hero-stats.js
// Sync source: assets/js/data/hero-stats.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Hero stat hooks for index.html — four betrayal-case framings replacing the
// generic "2/18" / "100%" / "6%" / "407/450" statistics.
// Source: research/compromat/02-cross-cutting/09-betrayal-cases.md §«Hero-блок».
window.HERO_STATS = [
  {
    n: '300',
    nUnit: 'k',
    alert: true,
    label: 'men mobilised in 36 hours after <strong>the mobilisation decree of 20 September 2022</strong>. All four "opposition" factions voted <strong>in favour — zero votes against</strong> (CPRF 51/0, LDPR 18/0, SR 21/0, NL 13/0).',
    source: { label: 'vote/119076 (api.duma.gov.ru)', href: 'research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml' }
  },
  {
    n: '32.5',
    nUnit: '%',
    alert: true,
    label: 'of the 2025 federal budget allocated to defence. <strong>13.5 trillion ₽</strong> versus 1.86 trillion for healthcare and 1.58 trillion for education. LDPR and New People voted <strong>in favour</strong>; CPRF and A Just Russia abstained but <strong>did not block the defence appropriations</strong>.',
    source: { label: 'ФЗ-419 of 30.11.2024', href: 'research/compromat/02-cross-cutting/09-betrayal-cases.md' }
  },
  {
    n: '385',
    nUnit: '/0/1',
    alert: false,
    label: '<strong>Digital Rouble Act (ФЗ-340)</strong> — gives the Central Bank of Russia visibility over every transaction of every citizen. Author: <strong>Anatoly Aksakov (A Just Russia – For Truth)</strong>, chair of the Duma\'s financial-markets committee. All four "opposition" factions voted <strong>in favour</strong>.',
    source: { label: 'vote/124183 + bill 270838-8', href: 'research/compromat/05-evidence/duma-api/votes/digital-ruble-1.xml' }
  },
  {
    n: '700',
    nUnit: '+',
    alert: true,
    label: 'criminal cases under <strong>Article 207.3 of the Criminal Code — \'false information about the army\'</strong> (a charge prosecuting ordinary anti-war social-media posts) by 2025 (up to 15 years in a penal colony). Co-authors of the law: <strong>Gennady Zyuganov (CPRF)</strong> and <strong>Sergei Mironov (A Just Russia – For Truth)</strong> — leaders of the two largest "opposition" factions.',
    source: { label: 'bill 464757-7 (sozd.duma.gov.ru)', href: 'research/compromat/05-evidence/sozd-bills/464757-7.html' }
  }
];
