const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'constants', 'data.ts'), 'utf8');

// Parse CATEGORIES
const catMatch = content.match(/export const CATEGORIES = \s*\[([\s\S]*?)\];/);
const categories = catMatch ? catMatch[1].split(',').map(s => s.replace(/["'\s]/g, '')).filter(Boolean) : [];

// Parse categories inside PLACES objects
const placesMatches = content.match(/export const PLACES[\s\S]*?=\s*\[([\s\S]*?)\];/);
const placesBlock = placesMatches ? placesMatches[1] : '';

const catRegex = /category:\s*["']([^"']+)["']/g;
const uniqueCats = new Set();
let match;
while ((match = catRegex.exec(placesBlock)) !== null) {
    uniqueCats.add(match[1]);
}

console.log('CATEGORIES defined:', categories);
console.log('Categories found in PLACES block:', Array.from(uniqueCats));

const missing = [];
for (const cat of uniqueCats) {
    if (!categories.includes(cat)) {
        missing.push(cat);
    }
}
console.log('Categories in PLACES missing from CATEGORIES defined:', missing);
