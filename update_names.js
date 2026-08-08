const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = [...walk('app'), ...walk('components'), ...walk('constants')];
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace 'Royal Rajasthan Tourism'
    content = content.replace(/Royal Rajasthan Tourism/g, 'Rajasthan Tourism Places');
    
    // Replace '| Royal Rajasthan' (often in titles)
    content = content.replace(/\| Royal Rajasthan/g, '| Rajasthan Tourism Places');
    
    // Replace 'Royal Rajasthan' in Navbar specifically
    if (file.includes('Navbar.tsx')) {
        content = content.replace(/>\s*Royal Rajasthan\s*<\/div>/g, '>Rajasthan Tourism Places</div>');
        content = content.replace(/\{language === 'hi' \? \"पर्यटन\" : \"Tourism\"\}/g, '{""}'); 
    }
    
    // Replace 'Royal Rajasthan' in Footer specifically
    if (file.includes('Footer.tsx')) {
        content = content.replace(/>\s*Royal Rajasthan\s*<\/div>/g, '>Rajasthan Tourism Places</div>');
    }
    
    // Also in PlanTripClient.tsx line 450 "Royal Rajasthan Trip Itinerary"
    if (file.includes('PlanTripClient.tsx')) {
        content = content.replace(/Royal Rajasthan Trip Itinerary/g, 'Rajasthan Tourism Places Trip Itinerary');
        content = content.replace(/ROYAL RAJASTHAN TRIP ITINERARY/g, 'RAJASTHAN TOURISM PLACES TRIP ITINERARY');
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        changedFiles++;
        console.log('Updated', file);
    }
});
console.log('Total files changed:', changedFiles);
