// Quick verification script
import fs from 'fs';

const enContent = fs.readFileSync('constants/places.ts', 'utf8');
const hiContent = fs.readFileSync('constants/places-hindi.ts', 'utf8');

function extractSamples(content, lang) {
  const lines = content.split('\n');
  let slug = '';
  let count = 0;
  const results = [];
  for (const line of lines) {
    const sm = line.match(/"slug":\s*"([^"]+)"/);
    if (sm) slug = sm[1];
    if (slug && /^\s+"history":/.test(line)) {
      const hm = line.match(/"history":\s*"(.{0,300})/);
      if (hm) {
        results.push({ slug, preview: hm[1].replace(/\\n/g, ' ').substring(0, 280) });
        count++;
        slug = '';
        if (count >= 6) break;
      }
    }
  }
  return results;
}

console.log('=== ENGLISH HISTORY PREVIEWS (first 6 places) ===\n');
extractSamples(enContent, 'EN').forEach((r, i) => {
  console.log(`${i+1}. [${r.slug}]`);
  console.log(`   ${r.preview}...`);
  console.log();
});

console.log('=== HINDI HISTORY PREVIEWS (first 6 places) ===\n');
extractSamples(hiContent, 'HI').forEach((r, i) => {
  console.log(`${i+1}. [${r.slug}]`);
  console.log(`   ${r.preview}...`);
  console.log();
});

// Check that histories are not duplicate across places
console.log('=== DUPLICATE CHECK ===');
const historyLines = enContent.split('\n').filter(l => /^\s+"history":/.test(l));
const uniqueHistories = new Set(historyLines);
console.log(`Total history fields: ${historyLines.length}`);
console.log(`Unique histories: ${uniqueHistories.size}`);
console.log(historyLines.length === uniqueHistories.size ? '✅ ALL UNIQUE - No duplicates!' : `⚠️ ${historyLines.length - uniqueHistories.size} duplicates found`);
