# Locked editorial decisions for the EN translation

This file is the supplement to `research/i18n_glossary_draft.md`. Both must be read by every translation subagent. Where they conflict, **this file wins**. The user has signed off on every rule below; do not deviate without surfacing the question first.

## Architectural rules

1. **British English.** `-ise`/`-isation` (organise, organisation, recognise), `-our` (colour, behaviour), `programme` (not program, except for software), `defence` (not defense), `analyse` (not analyze), single quotes acceptable. Tone: neutral-analytical, not polemical, not sardonic. The site's positioning is "we just describe what the votes were" — preserve that restraint.
2. **Quote handling.** In `quotes[]` arrays (e.g. `laws.js[*].quotes[*]`), **keep the original Russian `text` field unchanged** AND add a sibling field `textTranslation` containing the English. Do not delete the Russian. Likewise add `contextTranslation` if a Russian `context` field exists. Quote authors: transliterate per glossary.
3. **Names of people.** In short-form data fields (`authors[]`, `quotes[].author`, `leader`, etc.) just use the English transliteration from the glossary — no Cyrillic gloss. In running prose fields (`summary`, `fullDescription`, `note`, `rhetoric`, `reality`) apply journalistic style: first mention within that field uses `Andrei Klishas (Андрей Клишас)`, subsequent mentions in the same field just `Klishas`. Reset per field.
4. **`sources[].name` stays in Cyrillic** (СОЗД ГД, РБК, Фонтанка, Roskomsvoboda, etc.). Do not translate or transliterate. URLs unchanged.
5. **OG meta tags out of scope.** Do not invent new image paths.
6. **Lang preference is handled at the page level**, not in data. Don't add language fields to data records.

## Editorial calls (the 10 questions)

1. **«фейки» / «фейк-ньюс»**
   - In legal/statutory context (article names, formal descriptions): `'false information'`.
   - In authorial / register-shifted prose where the term is used sceptically about the law itself: `'fake news'` in single quotes (preserves the irony).
   - Choose by surrounding register, not mechanically.

2. **«Справедливая Россия — За правду»**: keep `'A Just Russia – For Truth'` (full form, em-dash). Short form `SRZP`.

3. **«иноагент»**: `'foreign agent'`. No transliteration. The FARA-style connotation is appropriate for journalistic English.

4. **«ДЭГ»**: first mention `'DEG (remote electronic voting)'`, then `DEG`. Don't invent a new acronym.

5. **«Суверенный Рунет»**: `'sovereign Runet'`. First mention add `(law on internet sovereignty)`. Preserves the irony.

6. **«ЛГБТ-движение» as designated extremist**: first mention `"the so-called 'LGBT movement', designated extremist by Russia's Supreme Court in 2023"`. Subsequent: `"the 'LGBT movement' (designated extremist)"`. Always with quotes around 'LGBT movement' to mark that it is a state-constructed category, not a real organisation.

7. **«дискредитация ВС РФ»**: `"'discrediting' the Russian Armed Forces"` — quotes around 'discrediting' because the legal category is a euphemism. On first mention add a brief gloss like `(a charge prosecuting ordinary anti-war social-media posts)`. Later mentions: `'discrediting' the armed forces`.

8. **`digital-events.js` `details` fields**: translate **fully**. Do not summarise. The detail prose is the substance of the site.

9. **References to Russian legal articles** (e.g. `Статья 20.3.3 КоАП`): keep the article number, render as `'Article 20.3.3 of the Code of Administrative Offences'`. Don't fabricate new URLs — same source URLs apply.

10. **`tsenzura.html` ethical-framing disclaimer**: translate in full. The audience for the EN version includes Russians abroad with ongoing exposure to Russian law; do not soften.

## What to translate vs preserve in JS data files

**Translate (user-visible text):**
- `title`, `shortTitle`, `summary`, `fullDescription`, `note`, `rhetoric`, `reality`, `details`, `description`, `quote`, `caption`, `label`, `name` (for parties/factions/UI items, NOT for people-names which use glossary transliteration, NOT for `sources[].name` which stays Cyrillic), `context` for quotes (translate to `contextTranslation`).
- Top-of-file comments: translate to English so future EN maintainers can read them.

**Preserve unchanged:**
- All object keys (`title`, not `название`).
- All IDs (`'608767-7'`).
- URLs (`https://...`).
- Vote machine values (`'za'`, `'against'`, `'abstain'`, `'partial-against'`, `'didnt-vote'`, `'absent'`, `'unanimous'`, `'unknown'`).
- Category codes (`'digital'`, `'civil'`, etc.).
- ФЗ codes inside strings (`'ФЗ № 90-ФЗ'`) — leave Cyrillic.
- Numbers, dates, percentages.
- Hex colour codes.
- HTML/markdown inside template literals (preserve `<strong>`, line breaks, lists, etc.).
- `\n` and template-literal indentation.
- Variable names (`const LAWS = ...`).

**Add fields:**
- For each `{ author, text, context? }` quote object: add `textTranslation`, and if `context` exists, `contextTranslation`. Russian `text` and `context` stay.

## File header

Each translated file starts with:

```js
// EN translation of assets/js/data/<original>.js
// Sync source: assets/js/data/<original>.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md
```

## Unknown terms

If you encounter a Russian term not in the glossary AND not covered above, take your best journalistic-press call (consult Meduza EN, OVD-Info EN, Roskomsvoboda EN conventions) and at the very end of your reply list every such term with the rendering you chose. We will fold them back into the glossary for HTML translation later.
