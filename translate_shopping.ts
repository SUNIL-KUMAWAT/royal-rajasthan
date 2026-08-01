import fs from 'fs';
import { RAJASTHAN_SHOPPING } from './constants/shopping';
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
    console.log("Starting full translation of", RAJASTHAN_SHOPPING.districts.length, "shopping districts...");
    
    const translatedShopping = {
        districts: [] as any[]
    };
    
    let count = 1;

    for (const dist of RAJASTHAN_SHOPPING.districts) {
        console.log(`Translating district [${count}/${RAJASTHAN_SHOPPING.districts.length}]: ${dist.district}`);
        const pDist: any = { ...dist };
        
        try {
            pDist.district = await translate(pDist.district); await delay(50);
            pDist.description = await translate(pDist.description); await delay(50);
            
            pDist.shoppingPlaces = [];
            for (const place of dist.shoppingPlaces) {
                const pPlace: any = { ...place };
                pPlace.name = await translate(pPlace.name); await delay(50);
                pPlace.type = await translate(pPlace.type); await delay(50);
                pPlace.description = await translate(pPlace.description); await delay(50);
                pPlace.timings = await translate(pPlace.timings); await delay(50);
                pPlace.closedOn = await translate(pPlace.closedOn); await delay(50);
                
                if (pPlace.category) {
                    pPlace.category = await translateArray(pPlace.category);
                }
                if (pPlace.famousFor) {
                    pPlace.famousFor = await translateArray(pPlace.famousFor);
                }
                pDist.shoppingPlaces.push(pPlace);
            }
        } catch (e) {
            console.error("Error translating district:", dist.district);
        }
        
        translatedShopping.districts.push(pDist);
        count++;
    }

    const fileContent = `export const RAJASTHAN_SHOPPING_HINDI = ${JSON.stringify(translatedShopping, null, 4)};\n`;

    fs.writeFileSync('./constants/shopping-hindi.ts', fileContent, 'utf8');
    console.log("Successfully wrote translations to shopping-hindi.ts!");
}

run();
