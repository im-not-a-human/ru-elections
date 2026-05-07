// Tiny DOM helpers. Globals attached to window so other scripts can use them.
window.$ = (s, ctx = document) => ctx.querySelector(s);
window.$$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

window.VOTE_LABELS = {
  'za': 'ЗА',
  'against': 'ПРОТИВ',
  'abstain': 'ВОЗД.',
  'partial-against': 'ЧАСТЬ',
  'didnt-vote': 'НЕ ГОЛ.',
  'absent': 'НЕТ',
};

window.VOTE_FULL = {
  'za': 'Голосовали "за" фракционно',
  'against': 'Голосовали "против" фракционно',
  'abstain': 'Воздержались (фракционно)',
  'partial-against': 'Часть фракции голосовала "против", часть "за"',
  'didnt-vote': 'Не голосовали — тактика "не присутствовать"',
  'absent': 'Партии не было в Думе на момент голосования',
};

window.CAT_LABELS = { 'digital': 'Цифровые свободы', 'civil': 'Гражданские свободы' };

window.PARTY_CODES = ['ER', 'KPRF', 'LDPR', 'SR', 'NL'];
