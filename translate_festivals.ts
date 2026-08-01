import fs from 'fs';
import { FESTIVALS } from './constants/festivals';
import https from 'https';

function translate(text: string): Promise<string> {
    if (!text) return Promise.resolve(text);
    return new Promise((resolve, reject) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    let translatedText = '';
                    if (json[0]) {
                        json[0].forEach((part: any) => {
                            if (part[0]) translatedText += part[0];
                        });
                    }
                    resolve(translatedText);
                } catch (e) {
                    resolve(text); // fallback to original on error
                }
            });
        }).on('error', (err) => {
            resolve(text); // fallback
        });
    });
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function translateArray(arr: string[]): Promise<string[]> {
    if (!arr) return arr;
    const res = [];
    for (const item of arr) {
        res.push(await translate(item));
        await delay(50);
    }
    return res;
}

async function run() {
    console.log("Starting full translation of", FESTIVALS.length, "festivals...");
    const translatedFestivals = [];
    let count = 1;

    for (const festival of FESTIVALS) {
        console.log(`Translating [${count}/${FESTIVALS.length}]: ${festival.name}`);
        const p: any = { ...festival };
        
        try {
            p.name = await translate(p.name); await delay(50);
            p.location = await translate(p.location); await delay(50);
            p.month = await translate(p.month); await delay(50);
            p.duration = await translate(p.duration); await delay(50);
            p.description = await translate(p.description); await delay(50);
            p.history = await translate(p.history); await delay(50);
            
            if (p.highlights) {
                p.highlights = await translateArray(p.highlights);
            }
        } catch (e) {
            console.error("Error translating festival:", festival.name);
        }
        
        translatedFestivals.push(p);
        count++;
    }

    const fileContent = `export const FESTIVALS_HINDI = ${JSON.stringify(translatedFestivals, null, 4)};\n`;

    fs.writeFileSync('./constants/festivals-hindi.ts', fileContent, 'utf8');
    console.log("Successfully wrote translations to festivals-hindi.ts!");
}

run();
