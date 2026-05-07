// Hero numbers for the digital restrictions page.
// Each entry: { value, label, source, tone }
// tone: '' (neutral) | 'alert' (red) | 'warn' (gold) | 'green'
window.DIGITAL_HERO_NUMBERS = [
  {
    value: '29,3 млрд ₽',
    label: 'Похищено у граждан со счетов в 2025 — рекорд в эпоху антифрод-законов',
    source: 'ЦБ РФ; Сбербанк (Совфед, янв. 2026): 295 млрд ₽/год с учётом наличных',
    tone: 'alert',
    counter: { target: 29.3, decimals: 1, suffix: ' млрд ₽' },
  },
  {
    value: '23 000+',
    label: 'Атак БПЛА на территорию РФ в 2025 (×3,7 к 2024 году)',
    source: 'Совбез РФ (Шойгу, март 2026)',
    tone: 'alert',
    counter: { target: 23000, decimals: 0, suffix: '+' },
  },
  {
    value: '$11,9 млрд',
    label: 'Стоимость интернет-шатдаунов в РФ за 2025 — мировой максимум',
    source: 'Top10VPN, методика NetBlocks COST',
    tone: 'warn',
    counter: { target: 11.9, decimals: 1, prefix: '$', suffix: ' млрд' },
  },
  {
    value: '1 730',
    label: 'Компаний с легальным VPN-доступом (57+ тыс. IP, апр. 2026)',
    source: 'РКН через «Интерфакс», 22.04.2026',
    tone: '',
    counter: { target: 1730, decimals: 0 },
  },
];
