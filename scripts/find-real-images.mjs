// Replaces picsum.photos placeholder images with real, freely-licensed photos
// (the lead image of a hand-picked Wikipedia article for that exact place / festival venue).
//
//   node scripts/find-real-images.mjs           -> looks them up, writes scripts/real-images.json (review it)
//   node scripts/find-real-images.mjs --apply   -> writes the found URLs into constants/*.ts
//
// Only Wikimedia Commons files are accepted (free licences). Items with no reliable article are left
// alone; the map shows a category icon for them instead of a placeholder photo.
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "scripts", "real-images.json");
const UA = "RajasthanPlacesImageFinder/1.0 (build script)";
const PLACEHOLDER = /https:\/\/picsum\.photos\/[^"]+/;

/** Wikipedia article titles to try, in order. Venue articles are used for festivals held at a landmark. */
const CANDIDATES = {
    // places
    "place:keoladeo-national-park": ["Keoladeo National Park"],
    "place:garbhaji-waterfall": ["Garbhaji Falls", "Garbhaji Waterfall"],
    "place:pandu-pol-temple": ["Pandupol", "Pandupol Hanuman Temple", "Pandupole"],
    "place:vintage-car-museum": ["Vintage and Classic Car Collection", "Vintage Car Museum, Udaipur"],
    "place:khuri-sand-dunes": ["Khuri, Rajasthan", "Khuri, Jaisalmer"],
    "place:vyas-chhatri": ["Vyas Chhatri"],
    "place:balsamand-lake": ["Balsamand Lake", "Balsamand Lake Palace"],
    "place:adhai-din-ka-jhopra": ["Adhai Din Ka Jhonpra"],
    "place:beneshwar-dham": ["Baneshwar", "Beneshwar Dham", "Baneshwar Fair"],
    "place:bhimlat-waterfall": ["Bhimlat Falls", "Bhimlat Waterfall"],
    "place:chuliya-waterfall": ["Chuliya Falls", "Chuliya Waterfall"],
    "place:longewala-war-memorial": ["Longewala War Memorial", "Longewala"],
    "place:khaba-fort-jaisalmer": ["Khaba Fort"],
    "place:amar-sagar-lake": ["Amar Sagar Lake", "Amar Sagar, Jaisalmer", "Amar Sagar"],
    "place:kolayat-lake": ["Kolayat", "Kolayat Lake"],
    "place:devyani-kund": ["Devyani Sarovar", "Devyani Kund"],
    "place:chandlai-lake": ["Chandlai Lake"],
    "place:gatore-ki-chhatriyan": ["Gaitore", "Gatore Ki Chhatriyan", "Gaitor"],
    "place:charbhuja-temple-rajsamand": ["Charbhuja Temple", "Charbhuja"],
    "place:badnor-fort": ["Badnore Fort", "Badnore"],
    // festivals (own article first, else the venue)
    "festival:18": ["Baneshwar Fair", "Baneshwar"],
    "festival:20": ["Nakki Lake"],
    "festival:21": ["Mount Abu"],
    "festival:27": ["Mehrangarh"],
    "festival:32": ["Gavari"],
    "festival:37": ["Baneshwar Fair", "Baneshwar"],
    "festival:39": ["Keshoraipatan", "Keshorai Patan"],
    "festival:52": ["Holi"],
    "festival:63": ["Chand Baori"],
    "festival:64": ["Holi"],
    "festival:68": ["Ghotia Amba"],
    "festival:73": ["Jeen Mata", "Jeen Mata Temple"],
    "festival:77": ["Mukam, Bikaner", "Mukam", "Guru Jambheshwar"],
    "festival:78": ["Gautameshwar Mahadev Temple", "Gautameshwar"],
    "festival:79": ["Haldighati"],
    "festival:83": ["Machkund"],
    "festival:84": ["Matrikundiya"],
    "festival:87": ["Katariasar"],
    "festival:89": ["Khetlaji", "Khetlaji Temple"],
    "festival:95": ["Bhadariya", "Bhadriya Mata Temple"],
    "festival:97": ["Holi"],
    "festival:100": ["Mahansar"],
    "festival:104": ["Sachiya Mata Temple", "Osian"],
    "festival:110": ["Rishabhdeo", "Rishabhdeo Temple"],
    "festival:112": ["Sanwaliya Seth Temple", "Sanwariya Seth Temple", "Sanwaliyaji Temple"],
    "festival:117": ["Pandupol", "Pandupol Hanuman Temple"],
};

async function api(params) {
    const url = `https://en.wikipedia.org/w/api.php?${new URLSearchParams({ format: "json", ...params })}`;
    for (let i = 0; i < 5; i++) {
        try {
            const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) });
            if (res.ok) return res.json();
            if (res.status === 429) {
                const wait = Number(res.headers.get("retry-after")) || 60;
                console.log(`  rate-limited, waiting ${wait}s…`);
                await new Promise((r) => setTimeout(r, wait * 1000));
                continue;
            }
        } catch {
            // network hiccup: retry
        }
        await new Promise((r) => setTimeout(r, 3000 * (i + 1)));
    }
    throw new Error("Wikipedia API unavailable — try again later");
}

const isCommonsPhoto = (u) =>
    /(upload|thumb)\.wikimedia\.org\/wikipedia\/commons\//.test(u || "") &&
    /\.(jpe?g|png|webp)/i.test(u) &&
    !/(map|locator|logo|flag|emblem|icon|seal|diagram)/i.test(u);

/** Strip tracking params. (thumb.wikimedia.org is where Wikipedia serves thumbnails now.) */
const normalise = (u) => u.replace(/\?.*$/, "");

/** For articles without a lead image: the first photo used in the article body. */
async function articlePhotos(titles) {
    const out = new Map();
    for (const t of titles) {
        const imgs = await api({ action: "query", titles: t, redirects: "1", prop: "images", imlimit: "40" });
        const files = Object.values(imgs?.query?.pages || {})
            .flatMap((p) => p.images || [])
            .map((i) => i.title)
            .filter((f) => /\.jpe?g$/i.test(f) && !/(map|locator|logo|flag|emblem|icon|seal|diagram)/i.test(f));
        if (files.length) {
            const info = await api({ action: "query", titles: files.slice(0, 20).join("|"), prop: "imageinfo", iiprop: "url|size", iiurlwidth: "960" });
            const best = Object.values(info?.query?.pages || {})
                .filter((p) => p.imagerepository === "shared" && isCommonsPhoto(p.imageinfo?.[0]?.thumburl))
                .sort((a, b) => files.indexOf(a.title) - files.indexOf(b.title))[0];
            if (best) out.set(t, { url: normalise(best.imageinfo[0].thumburl), source: `${t} (article photo: ${best.title})` });
        }
        await new Promise((r) => setTimeout(r, 1200));
    }
    return out;
}

/** Free lead images for many exact titles at once (redirects followed): Map<requested title, {url, source}>. */
async function leadImages(titles) {
    const out = new Map();
    for (let i = 0; i < titles.length; i += 40) {
        const chunk = titles.slice(i, i + 40);
        const data = await api({ action: "query", titles: chunk.join("|"), redirects: "1", prop: "pageimages", piprop: "thumbnail", pithumbsize: "960", pilicense: "free", pilimit: "50" });
        const q = data?.query || {};
        // requested -> final title, through normalisation and redirects
        const hop = new Map([...(q.normalized || []), ...(q.redirects || [])].map((x) => [x.from, x.to]));
        const byTitle = new Map(Object.values(q.pages || {}).map((p) => [p.title, p]));
        for (const t of chunk) {
            let final = t;
            for (let n = 0; n < 3 && hop.has(final); n++) final = hop.get(final);
            const src = byTitle.get(final)?.thumbnail?.source;
            if (isCommonsPhoto(src)) out.set(t, { url: normalise(src), source: final });
        }
        await new Promise((r) => setTimeout(r, 1500));
    }
    return out;
}

async function collect() {
    const items = [];
    const places = await fs.readFile(path.join(ROOT, "constants/places.ts"), "utf8");
    const placeRe = /"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)"[\s\S]*?"images":\s*\[\s*"([^"]+)"/g;
    for (let m; (m = placeRe.exec(places)); ) if (PLACEHOLDER.test(m[3])) items.push({ key: `place:${m[2]}`, name: m[1], placeholder: m[3] });
    const fests = await fs.readFile(path.join(ROOT, "constants/festivals.ts"), "utf8");
    const festRe = /"id":\s*(\d+),[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"image":\s*"([^"]+)"/g;
    for (let m; (m = festRe.exec(fests)); ) if (PLACEHOLDER.test(m[3])) items.push({ key: `festival:${m[1]}`, name: m[2], placeholder: m[3] });
    return items;
}

async function find() {
    const items = await collect();
    const titles = [...new Set(items.flatMap((it) => CANDIDATES[it.key] || []))];
    const found = await leadImages(titles);
    // Second pass, only for items still without a photo: photos inside their first candidate article
    const missing = items.filter((it) => !(CANDIDATES[it.key] || []).some((t) => found.has(t))).map((it) => (CANDIDATES[it.key] || [])[0]);
    for (const [t, hit] of await articlePhotos([...new Set(missing.filter(Boolean))])) found.set(t, hit);
    const results = [];
    for (const it of items) {
        const hit = (CANDIDATES[it.key] || []).map((t) => found.get(t)).find(Boolean) ?? null;
        results.push({ ...it, url: hit?.url ?? null, source: hit?.source ?? null });
        console.log(`${hit ? "✓" : "·"} ${it.name.padEnd(36)} ${hit ? `← ${hit.source}` : "(no reliable photo — map shows an icon)"}`);
    }
    await fs.writeFile(OUT, JSON.stringify(results, null, 2));
    console.log(`\n${results.filter((r) => r.url).length}/${results.length} found -> ${path.relative(ROOT, OUT)}`);
}

async function apply() {
    const results = JSON.parse(await fs.readFile(OUT, "utf8")).filter((r) => r.url && !r.skip);
    for (const rel of ["constants/places.ts", "constants/places-hindi.ts", "constants/festivals.ts", "constants/festivals-hindi.ts"]) {
        const f = path.join(ROOT, rel);
        let s = await fs.readFile(f, "utf8");
        let n = 0;
        for (const r of results) {
            const parts = s.split(r.placeholder);
            n += parts.length - 1;
            s = parts.join(r.url);
        }
        await fs.writeFile(f, s);
        console.log(`${rel}: ${n} replaced`);
    }
}

if (process.argv.includes("--apply")) await apply();
else await find();
