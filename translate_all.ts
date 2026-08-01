import fs from 'fs';
import { PLACES_HINDI } from './constants/places-hindi';
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
    console.log("Starting full translation of remaining fields for", PLACES_HINDI.length, "places...");
    const translatedPlaces = [];
    let count = 1;

    for (const place of PLACES_HINDI) {
        console.log(`Translating remaining fields [${count}/${PLACES_HINDI.length}]: ${place.name}`);
        const p: any = { ...place };
        
        try {
            // Already translated: name, city, category, description, highlights
            // Now translating the rest:
            
            p.subcategory = await translate(p.subcategory); await delay(50);
            p.history = await translate(p.history); await delay(50);
            p.architecture = await translate(p.architecture); await delay(50);
            p.significance = await translate(p.significance); await delay(50);
            
            p.tags = await translateArray(p.tags);
            p.facilities = await translateArray(p.facilities);
            p.nearbyPlaces = await translateArray(p.nearbyPlaces);
            p.dos = await translateArray(p.dos);
            p.donts = await translateArray(p.donts);
            
            if (p.timing && p.timing.note) {
                p.timing.note = await translate(p.timing.note); await delay(50);
                p.timing.closedOn = await translate(p.timing.closedOn); await delay(50);
            }
            if (p.ticket && p.ticket.note) {
                p.ticket.note = await translate(p.ticket.note); await delay(50);
            }
            if (p.bestTimeToVisit) {
                p.bestTimeToVisit.season = await translate(p.bestTimeToVisit.season); await delay(50);
                p.bestTimeToVisit.weather = await translate(p.bestTimeToVisit.weather); await delay(50);
                p.bestTimeToVisit.tip = await translate(p.bestTimeToVisit.tip); await delay(50);
            }
            if (p.location) {
                p.location.nearestAirport = await translate(p.location.nearestAirport); await delay(50);
                p.location.nearestRailway = await translate(p.location.nearestRailway); await delay(50);
                p.location.distanceFromCity = await translate(p.location.distanceFromCity); await delay(50);
            }

        } catch (e) {
            console.error("Error translating place:", place.name);
        }
        
        translatedPlaces.push(p);
        count++;
    }

    const fileContent = `// constants/data.ts
import { Place, Destination } from "../types";
export type { Place, Destination };

export const PLACES_HINDI: Place[] = ${JSON.stringify(translatedPlaces, null, 4)};
`;

    fs.writeFileSync('./constants/places-hindi.ts', fileContent, 'utf8');
    console.log("Successfully wrote ALL remaining translations to places-hindi.ts!");
}

run();
