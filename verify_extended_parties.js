// Manually check the extended-parties.js file

const fs = require('fs');
const content = fs.readFileSync('assets/js/data/extended-parties.js', 'utf8');

// Extract the EXTENDED_PARTIES array by parsing it
const match = content.match(/window\.EXTENDED_PARTIES = \[([\s\S]*?)\];/);
if (!match) {
  console.error('Could not parse EXTENDED_PARTIES');
  process.exit(1);
}

const arrayContent = match[1];

// Count entries (each starts with a leading comment or directly with {)
const entries = arrayContent.match(/\n\s*\{[^}]*\}/g) || [];
console.log('Entry count (by regex):', entries.length);

// Check for required fields in each entry
const requiredFields = ['id', 'slug', 'category', 'name', 'leader', 'mandates', 'supportPct', 'budgetPct', 'income2025', 'stripeColor', 'hookBadge', 'href'];

console.log('\n=== FIELD VERIFICATION (line by line) ===');

const lines = content.split('\n');
let entryNum = 0;
let currentEntry = {};
let inEntry = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Detect entry start
  if (line.startsWith('{ id:')) {
    inEntry = true;
    currentEntry = {};
    entryNum++;
  }
  
  if (inEntry) {
    // Look for field assignments
    if (line.includes('id:')) currentEntry.id = true;
    if (line.includes('slug:')) currentEntry.slug = true;
    if (line.includes('category:')) currentEntry.category = true;
    if (line.includes('name:')) currentEntry.name = true;
    if (line.includes('leader:')) currentEntry.leader = true;
    if (line.includes('mandates:')) currentEntry.mandates = true;
    if (line.includes('supportPct:')) currentEntry.supportPct = true;
    if (line.includes('budgetPct:')) currentEntry.budgetPct = true;
    if (line.includes('income2025:')) currentEntry.income2025 = true;
    if (line.includes('stripeColor:')) currentEntry.stripeColor = true;
    if (line.includes('hookBadge:')) currentEntry.hookBadge = true;
    if (line.includes('href:')) currentEntry.href = true;
    
    // Detect entry end
    if (line.startsWith('}')) {
      const missing = requiredFields.filter(f => !currentEntry[f]);
      if (missing.length > 0) {
        console.log(`Entry ${entryNum}: MISSING ${missing.join(', ')}`);
      } else {
        console.log(`Entry ${entryNum}: ✓ All fields present`);
      }
      inEntry = false;
      currentEntry = {};
    }
  }
}

console.log('\n=== CATEGORIES ===');
const catMatch = content.match(/window\.EXTENDED_PARTY_CATEGORIES = \[([\s\S]*?)\];/);
if (catMatch) {
  const catContent = catMatch[1];
  const catCount = (catContent.match(/id:/g) || []).length;
  console.log('Categories count:', catCount);
  console.log('✓ Expected: 3');
}

