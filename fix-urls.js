const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, fileList);
        } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const targetDirs = ['constants', 'app', 'components'];
let files = [];
for (const dir of targetDirs) {
    if (fs.existsSync(dir)) {
        files = files.concat(getFiles(dir));
    }
}

let counter = 1;
let replacedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /https:\/\/(images\.unsplash\.com|upload\.wikimedia\.org)[^\"'\`\s]*/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, () => {
            const replacement = 'https://picsum.photos/seed/raj-' + counter + '/800/600';
            counter++;
            replacedCount++;
            return replacement;
        });
        
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + file);
    }
}
console.log('Total URLs replaced: ' + replacedCount);
