// scripts/generate-histories.mjs
// Generates unique history content for ALL places (English + Hindi)
// Usage: node scripts/generate-histories.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function calcAge(yearStr) {
  if (!yearStr) return 450;
  const m = String(yearStr).match(/(\d{3,4})/);
  if (!m) return 450;
  const y = parseInt(m[1]);
  return (y > 100 && y < 2100) ? new Date().getFullYear() - y : 450;
}

function h(place, idx) {
  const arr = place.highlights || [];
  return arr[idx] || '';
}

function act(place, idx) {
  const arr = place.activities || [];
  return arr[idx] ? arr[idx] : '';
}

function tip(place) {
  return place?.bestTimeToVisit?.tip || '';
}

function dur(place) {
  return place?.visitDuration?.recommended || '2-3 hours';
}

function cat(place) {
  return (place.category || 'monument').toLowerCase();
}

function sig(place) {
  return place.significance || ("one of " + (place.city || 'Rajasthan') + "'s finest heritage landmarks");
}

function arch(place) {
  return place.architecture || 'Rajputana';
}

function founder(place) {
  return place.builtBy || 'its royal founders';
}

function built(place) {
  return place.yearBuilt || 'the medieval era';
}

// ============================================================
// ENGLISH TEMPLATES - 5 variants x 5 paragraph types
// ============================================================

const EN_OPEN = [
  function(p) { return "<p><strong>" + p.name + "</strong> is one of <strong>" + p.city + "</strong>'s most celebrated " + cat(p) + "s, built in <strong>" + built(p) + "</strong> by <strong>" + founder(p) + "</strong>. " + (p.description || '') + " Its construction marked a defining chapter in Rajasthan's architectural history, establishing " + p.city + " as an enduring centre of power, culture, and artistic brilliance that would captivate visitors for centuries to come.</p>"; },
  function(p) { return "<p>The story of <strong>" + p.name + "</strong> begins in <strong>" + built(p) + "</strong>, when <strong>" + founder(p) + "</strong> envisioned a structure that would embody the grandeur of Rajputana and define the skyline of " + p.city + " for generations. " + (p.description || '') + " Over the decades that followed, the monument evolved into a complex of extraordinary sophistication, drawing master craftsmen and artisans from across the Indian subcontinent who dedicated their finest skills to every stone, pillar, and archway.</p>"; },
  function(p) { return "<p>Rising majestically in <strong>" + p.city + "</strong>, Rajasthan, <strong>" + p.name + "</strong> is a timeless tribute to its founder <strong>" + founder(p) + "</strong>, who ordered its construction in <strong>" + built(p) + "</strong>. " + (p.description || '') + " Recognised today as " + sig(p) + ", this remarkable structure has earned its place among the most celebrated destinations in all of India, drawing scholars, historians, and travellers from every corner of the globe.</p>"; },
  function(p) { return "<p>Few places in India carry the weight of history as powerfully as <strong>" + p.name + "</strong>, a magnificent " + cat(p) + " in <strong>" + p.city + "</strong> commissioned by <strong>" + founder(p) + "</strong> in <strong>" + built(p) + "</strong>. " + (p.description || '') + " Since its inception, this extraordinary structure has stood as a testament to Rajasthan's unparalleled architectural heritage, inviting visitors and scholars to unravel the stories etched into every corridor, courtyard, and carved facade.</p>"; },
  function(p) { return "<p>When <strong>" + founder(p) + "</strong> commissioned the construction of <strong>" + p.name + "</strong> in <strong>" + built(p) + "</strong>, the ambition was to create a monument that would reflect the power and cultural sophistication of " + p.city + " for generations to come. " + (p.description || '') + " Centuries later, this vision stands magnificently fulfilled — " + p.name + " now welcomes hundreds of thousands of visitors annually who come to experience the extraordinary fusion of history, art, and architecture that defines this incomparable landmark.</p>"; },
];

const EN_ARCH = [
  function(p) { return "<h3>Architectural Brilliance of " + p.name + "</h3><p>The <strong>" + arch(p) + "</strong> style that defines <strong>" + p.name + "</strong> is one of its most captivating characteristics. Every element — from soaring gateways and intricately carved pillars to domed pavilions and ornate inner chambers — reflects the sophisticated design principles that <strong>" + founder(p) + "</strong> brought to life in " + p.city + ". The seamless integration of diverse architectural traditions gives " + p.name + " a visual depth that rewards careful observation, revealing new layers of artistry with every visit to this extraordinary " + cat(p) + ".</p>"; },
  function(p) { return "<h3>Architecture and Design of " + p.name + "</h3><p>Architecturally, <strong>" + p.name + "</strong> is a masterwork of the <strong>" + arch(p) + "</strong> tradition. The structural ingenuity displayed throughout speaks volumes about the engineering knowledge of craftsmen who brought the vision of <strong>" + founder(p) + "</strong> to life in <strong>" + p.city + "</strong>. Ornate jali screens, perfectly proportioned arches, and meticulously planned courtyards work together to create an environment that is simultaneously grand in scale and exquisitely refined in detail — a balance rarely achieved in any era of construction.</p>"; },
  function(p) { return "<h3>" + p.name + " — " + arch(p) + " Architecture at Its Finest</h3><p>What makes <strong>" + p.name + "</strong> architecturally extraordinary is the way its <strong>" + arch(p) + "</strong> design traditions have been applied with such precision and artistry. The builders who worked under the patronage of <strong>" + founder(p) + "</strong> were masters of their craft — every carved surface, every proportioned arch, and every perfectly planned courtyard speaks of decades of accumulated knowledge in stone-working and spatial design. The result continues to astonish architects and historians even by contemporary standards.</p>"; },
  function(p) { return "<h3>The " + arch(p) + " Legacy at " + p.name + "</h3><p>The <strong>" + arch(p) + "</strong> architectural language of <strong>" + p.name + "</strong> is immediately apparent to any visitor who passes through its grand entrance. Shaped by the cultural vision of <strong>" + founder(p) + "</strong>, the monument demonstrates a profound understanding of space, light, and proportion that was centuries ahead of its time. Intricate stone carvings, delicately perforated screens, and thoughtfully positioned water features all contribute to an architectural composition that speaks to both the aesthetic sensibility and practical intelligence of its creators.</p>"; },
  function(p) { return "<h3>Structural Wonders of " + p.name + "</h3><p>The <strong>" + arch(p) + "</strong> heritage visible throughout <strong>" + p.name + "</strong> represents one of Rajasthan's finest contributions to world architecture. Commissioned by <strong>" + founder(p) + "</strong> in <strong>" + built(p) + "</strong>, this " + cat(p) + " was designed not merely as a functional space but as an architectural statement — a declaration in stone of the sophistication and cultural refinement of " + p.city + "'s ruling dynasty. The craftsmanship in every corner reflects the extraordinary talent of artisans who were drawn from across Rajputana to contribute their finest skills to this ambitious royal project.</p>"; },
];

const EN_HIST = [
  function(p) { return "<p>Through the centuries, <strong>" + p.name + "</strong> has witnessed the full arc of Rajasthan's history — periods of great prosperity, times of political upheaval, and the gradual transformation of " + p.city + " from a medieval royal capital into a modern metropolis. The " + cat(p) + " served as the backdrop for countless significant events and royal ceremonies that shaped the destiny of the region. Its walls carry the silent memory of rulers, nobles, and common people whose lives intersected with this remarkable landmark across many generations.</p>"; },
  function(p) { return "<p>The historical significance of <strong>" + p.name + "</strong> extends far beyond its architectural beauty. During its heyday, this " + cat(p) + " in <strong>" + p.city + "</strong> functioned as a dynamic hub of political power, cultural patronage, and vibrant social life. Courts within its walls made decisions that impacted thousands; festivals celebrated in its courtyards reflected the rich traditions of Rajputana; and diplomatic meetings conducted in its grand halls shaped relationships between powerful kingdoms across the Indian subcontinent.</p>"; },
  function(p) { return "<p>Over the generations following its construction in <strong>" + built(p) + "</strong>, <strong>" + p.name + "</strong> evolved from the personal project of <strong>" + founder(p) + "</strong> into a living institution at the heart of " + p.city + "'s cultural identity. Successive rulers added their own contributions; scholars gathered within its precincts to learn and debate; artists found inspiration in its ornate corridors; and ordinary citizens looked to it as an enduring symbol of stability and civic pride. This layered history elevates " + p.name + " from a mere monument into a true landmark of human civilisation.</p>"; },
  function(p) { return "<p>The role of <strong>" + p.name + "</strong> in shaping " + p.city + "'s cultural and political landscape cannot be overstated. From the moment <strong>" + founder(p) + "</strong> unveiled it in <strong>" + built(p) + "</strong>, this " + cat(p) + " became inseparable from the identity of the entire region. It served as the stage for royal coronations, grand durbars, and important religious ceremonies that defined the rhythms of Rajputana life for centuries. Even in times of conflict, " + p.name + " stood firm as a symbol of continuity and cultural resilience.</p>"; },
  function(p) { return "<p>Few landmarks in Rajasthan carry as rich a historical narrative as <strong>" + p.name + "</strong>. Since its foundation in <strong>" + built(p) + "</strong>, this " + cat(p) + " has stood witness to the rise and fall of empires, the flourishing of arts and trade, and the gradual evolution of <strong>" + p.city + "</strong> from a medieval stronghold into a vibrant modern city. Successive rulers who added their contributions left not just architectural imprints but also cultural legacies — traditions, artistic styles, and governance practices — that continue to shape the spirit of " + p.city + " and its people to this day.</p>"; },
];

const EN_HIGH = [
  function(p) { return "<h3>Key Attractions at " + p.name + "</h3><p>Among the many wonders at <strong>" + p.name + "</strong>, the <strong>" + (h(p,0) || 'main hall') + "</strong> consistently stands out as one of the most memorable experiences. " + (h(p,1) ? "The <strong>" + h(p,1) + "</strong> is equally impressive, offering a window into the extraordinary craftsmanship that defines this monument. " : '') + (act(p,0) ? "Visitors also delight in the opportunity to " + act(p,0).toLowerCase() + ", " : '') + (act(p,1) ? "as well as the experience of " + act(p,1).toLowerCase() + ". " : '') + "These encounters combine to create a visit that is rich in sensory impressions, historical insight, and lasting memories.</p>"; },
  function(p) { return "<h3>Must-See Features of " + p.name + "</h3><p>No visit to <strong>" + p.name + "</strong> is complete without experiencing its most iconic features. The <strong>" + (h(p,0) || 'central courtyard') + "</strong> is widely regarded as the crown jewel of the entire complex, leaving countless visitors speechless with its beauty and craftsmanship. " + (h(p,1) ? "Equally remarkable is the <strong>" + h(p,1) + "</strong>, which showcases the extraordinary technical skill and artistic vision that <strong>" + founder(p) + "</strong> inspired in the craftsmen of " + p.city + ". " : '') + (act(p,0) ? "The unforgettable experience of " + act(p,0).toLowerCase() + " adds yet another dimension to what is already a deeply enriching visit." : '') + "</p>"; },
  function(p) { return "<h3>Highlights of a Visit to " + p.name + "</h3><p>A visit to <strong>" + p.name + "</strong> in " + p.city + " offers a succession of remarkable experiences that paint a vivid picture of Rajasthan's glorious heritage. The <strong>" + (h(p,0) || 'grand entrance') + "</strong> alone justifies the journey — its intricate details and sheer visual impact have made it one of the most photographed features in all of Rajasthan. " + (h(p,2) ? "The <strong>" + h(p,2) + "</strong> provides yet another unforgettable moment, " : '') + (act(p,0) ? "while the chance to " + act(p,0).toLowerCase() + " gives visitors a direct, personal connection to the living history of this extraordinary place." : "offering visitors a deeper appreciation of the monument's enduring significance.") + "</p>"; },
  function(p) { return "<h3>What to Expect at " + p.name + "</h3><p>Visitors to <strong>" + p.name + "</strong> are treated to an experience that combines visual splendour, historical depth, and cultural immersion in equal measure. The iconic <strong>" + (h(p,0) || 'main attraction') + "</strong> never fails to impress, drawing admiration from first-time visitors and seasoned travellers alike. " + (h(p,1) ? "The <strong>" + h(p,1) + "</strong> offers a contrasting but equally compelling perspective on the artistry that defines this landmark. " : '') + (act(p,1) ? "Those wishing to engage more deeply will find that " + act(p,1).toLowerCase() + " provides an especially rewarding way to appreciate its many layers." : '') + "</p>"; },
  function(p) { return "<h3>The Finest Features of " + p.name + "</h3><p>The range of extraordinary sights at <strong>" + p.name + "</strong> ensures that every visitor carries something unique away with them. The magnificent <strong>" + (h(p,0) || 'central feature') + "</strong> has long been the centrepiece of the entire complex — so remarkable that it alone has been the subject of scholarly studies and artistic tributes for decades. " + (h(p,1) ? "The equally impressive <strong>" + h(p,1) + "</strong> showcases a different facet of the <strong>" + arch(p) + "</strong> tradition that makes " + p.name + " such a rich experience. " : '') + (h(p,2) ? "The <strong>" + h(p,2) + "</strong> rounds off a trio of must-see attractions central to any thorough exploration of this iconic " + p.city + " landmark." : '') + "</p>"; },
];

const EN_MOD = [
  function(p) { return "<h3>Planning Your Visit to " + p.name + "</h3><p>Today, <strong>" + p.name + "</strong> welcomes visitors from across India and around the world who come to experience the enduring magic of " + p.city + "'s most cherished heritage. " + (tip(p) ? tip(p) + ' ' : '') + "Plan to spend at least <strong>" + dur(p) + "</strong> to do justice to everything this remarkable " + cat(p) + " has to offer — rushing through would mean missing the countless details that collectively make it one of Rajasthan's greatest treasures.</p>"; },
  function(p) { return "<h3>Visiting " + p.name + " Today</h3><p>A visit to <strong>" + p.name + "</strong> in <strong>" + p.city + "</strong> is an experience that resonates long after you leave its precincts. The monument's careful preservation ensures that visitors encounter the same splendours that have awed travellers for centuries, now complemented by modern amenities and expert guided interpretation. " + (tip(p) ? tip(p) + ' ' : '') + "Allow <strong>" + dur(p) + "</strong> to explore at a comfortable pace — this is a destination where every minute of exploration is richly rewarded.</p>"; },
  function(p) { return "<h3>Your " + p.name + " Experience Awaits</h3><p>The heritage authorities responsible for <strong>" + p.name + "</strong> have worked diligently to ensure visitors receive a world-class experience honouring both the monument's historical importance and the expectations of modern tourism. " + (tip(p) ? tip(p) + ' ' : '') + "For those wishing to engage most deeply with its history and architecture, guided tours by certified local experts are available and strongly recommended. Plan your visit for <strong>" + dur(p) + "</strong> and bring a sense of curiosity — " + p.name + " consistently rewards those who look closely and ask questions.</p>"; },
  function(p) { return "<h3>Making the Most of " + p.name + "</h3><p>For travellers seeking an authentic encounter with Rajasthan's royal heritage, <strong>" + p.name + "</strong> in <strong>" + p.city + "</strong> is an unmissable destination. The monument has been thoughtfully managed to balance accessibility with conservation, ensuring that the craftsmanship of <strong>" + built(p) + "</strong> remains as impactful today as when <strong>" + founder(p) + "</strong> first presented it to the world. " + (tip(p) ? tip(p) + ' ' : '') + "A recommended visit of <strong>" + dur(p) + "</strong> gives ample time to appreciate both grand architectural gestures and subtle artistic details.</p>"; },
  function(p) { return "<h3>" + p.name + " — A Living Heritage</h3><p>In an age of constant change, <strong>" + p.name + "</strong> stands as a reassuring constant — a living connection to the remarkable civilisation that flourished in <strong>" + p.city + "</strong> under the stewardship of rulers like <strong>" + founder(p) + "</strong>. Modern visitors who pass through its gates join a distinguished line of travellers stretching back over <strong>" + calcAge(p.yearBuilt) + " years</strong> of history, each finding in this extraordinary " + cat(p) + " something that speaks to their own curiosity or historical imagination. " + (tip(p) ? tip(p) + ' ' : '') + "Allow <strong>" + dur(p) + "</strong> for a visit that will linger long in the memory.</p>"; },
];

// ============================================================
// HINDI TEMPLATES - 5 variants x 5 paragraph types
// ============================================================

const HI_OPEN = [
  function(p) { return "<p><strong>" + p.name + "</strong> <strong>" + p.city + "</strong> \u0915\u0947 \u0938\u0930\u094d\u0935\u093e\u0927\u093f\u0915 \u092a\u094d\u0930\u0938\u093f\u0926\u094d\u0927 " + cat(p) + "\u094b\u0902 \u092e\u0947\u0902 \u0938\u0947 \u090f\u0915 \u0939\u0948, \u091c\u093f\u0938\u0947 <strong>" + built(p) + "</strong> \u092e\u0947\u0902 <strong>" + founder(p) + "</strong> \u0926\u094d\u0935\u093e\u0930\u093e \u0928\u093f\u0930\u094d\u092e\u093f\u0924 \u0915\u093f\u092f\u093e \u0917\u092f\u093e\u0964 " + (p.description || '') + " \u0907\u0938\u0915\u0947 \u0928\u093f\u0930\u094d\u092e\u093e\u0923 \u0928\u0947 \u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u0915\u0947 \u0938\u094d\u0925\u093e\u092a\u0924\u094d\u092f \u0907\u0924\u093f\u0939\u093e\u0938 \u092e\u0947\u0902 \u090f\u0915 \u092e\u0939\u0924\u094d\u0935\u092a\u0942\u0930\u094d\u0923 \u0905\u0927\u094d\u092f\u093e\u092f \u0915\u0940 \u0936\u0941\u0930\u0941\u0906\u0924 \u0915\u0940 \u0914\u0930 " + p.city + " \u0915\u094b \u0936\u0915\u094d\u0924\u093f, \u0938\u0902\u0938\u094d\u0915\u0943\u0924\u093f \u0924\u0925\u093e \u0915\u0932\u093e\u0924\u094d\u092e\u0915 \u092a\u094d\u0930\u0924\u093f\u092d\u093e \u0915\u0947 \u090f\u0915 \u0938\u094d\u0925\u093e\u092f\u0940 \u0915\u0947\u0902\u0926\u094d\u0930 \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u092a\u094d\u0930\u0924\u093f\u0937\u094d\u0920\u093f\u0924 \u0915\u093f\u092f\u093e\u0964</p>"; },
  function(p) { return "<p><strong>" + p.name + "</strong> \u0915\u0940 \u0917\u093e\u0925\u093e <strong>" + built(p) + "</strong> \u092e\u0947\u0902 \u0906\u0930\u0902\u092d \u0939\u094b\u0924\u0940 \u0939\u0948, \u091c\u092c <strong>" + founder(p) + "</strong> \u0928\u0947 \u090f\u0915 \u0910\u0938\u0940 \u0938\u0902\u0930\u091a\u0928\u093e \u0915\u0940 \u092a\u0930\u093f\u0915\u0932\u094d\u092a\u0928\u093e \u0915\u0940 \u091c\u094b \u0930\u093e\u091c\u092a\u0942\u0924\u093e\u0928\u093e \u0915\u0940 \u092d\u0935\u094d\u092f\u0924\u093e \u0915\u094b \u0938\u093e\u0915\u093e\u0930 \u0915\u0930\u0947\u0964 " + (p.description || '') + " \u0905\u092a\u0928\u0940 \u0928\u0940\u0902\u0935 \u0915\u0947 \u092c\u093e\u0926 \u0915\u0947 \u0926\u0936\u0915\u094b\u0902 \u092e\u0947\u0902 \u092f\u0939 \u0938\u094d\u092e\u093e\u0930\u0915 \u0905\u0938\u093e\u0927\u093e\u0930\u0923 \u092a\u0930\u093f\u0937\u094d\u0915\u093e\u0930 \u0915\u093e \u0915\u0947\u0902\u0926\u094d\u0930 \u092c\u0928 \u0917\u092f\u093e\u0964</p>"; },
  function(p) { return "<p>\u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u0915\u0947 <strong>" + p.city + "</strong> \u092e\u0947\u0902 \u0917\u0930\u094d\u0935 \u0938\u0947 \u0916\u095c\u093e <strong>" + p.name + "</strong>, \u0905\u092a\u0928\u0947 \u0938\u0902\u0938\u094d\u0925\u093e\u092a\u0915 <strong>" + founder(p) + "</strong> \u0915\u094b \u090f\u0915 \u0938\u091a\u094d\u091a\u0940 \u0936\u094d\u0930\u0926\u094d\u0927\u093e\u0902\u091c\u0932\u093f \u0939\u0948, \u091c\u093f\u0928\u094d\u0939\u094b\u0902\u0928\u0947 <strong>" + built(p) + "</strong> \u092e\u0947\u0902 \u0907\u0938\u0915\u0947 \u0928\u093f\u0930\u094d\u092e\u093e\u0923 \u0915\u093e \u0938\u0902\u0915\u0932\u094d\u092a \u0932\u093f\u092f\u093e\u0964 " + (p.description || '') + " \u0906\u091c " + sig(p) + " \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u092e\u093e\u0928\u094d\u092f\u0924\u093e \u092a\u094d\u0930\u093e\u092a\u094d\u0924, \u092f\u0939 \u0909\u0932\u094d\u0932\u0947\u0916\u0928\u0940\u092f \u0938\u0902\u0930\u091a\u0928\u093e \u092d\u093e\u0930\u0924 \u0915\u0947 \u0938\u0930\u094d\u0935\u093e\u0927\u093f\u0915 \u092a\u094d\u0930\u0936\u0902\u0938\u093f\u0924 \u092a\u0930\u094d\u092f\u091f\u0928 \u0917\u0902\u0924\u0935\u094d\u092f\u094b\u0902 \u092e\u0947\u0902 \u0938\u0947 \u090f\u0915 \u0939\u0948\u0964</p>"; },
  function(p) { return "<p>\u092d\u093e\u0930\u0924 \u092e\u0947\u0902 \u0936\u093e\u092f\u0926 \u0939\u0940 \u0915\u094b\u0908 \u0905\u0928\u094d\u092f \u0938\u094d\u0925\u0932 <strong>" + p.name + "</strong> \u091c\u093f\u0924\u0928\u0940 \u092a\u094d\u0930\u092c\u0932 \u0910\u0924\u093f\u0939\u093e\u0938\u093f\u0915 \u0909\u092a\u0938\u094d\u0925\u093f\u0924\u093f \u0930\u0916\u0924\u093e \u0939\u094b — <strong>" + p.city + "</strong> \u0915\u093e \u092f\u0939 \u092d\u0935\u094d\u092f " + cat(p) + ", \u091c\u093f\u0938\u0947 <strong>" + founder(p) + "</strong> \u0928\u0947 <strong>" + built(p) + "</strong> \u092e\u0947\u0902 \u092c\u0928\u0935\u093e\u092f\u093e \u0925\u093e\u0964 " + (p.description || '') + " \u0924\u092c \u0938\u0947 \u0932\u0947\u0915\u0930 \u0906\u091c \u0924\u0915 \u092f\u0939 \u0905\u0938\u093e\u0927\u093e\u0930\u0923 \u0938\u0902\u0930\u091a\u0928\u093e \u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u0915\u0940 \u0905\u0924\u0941\u0932\u0928\u0940\u092f \u0938\u094d\u0925\u093e\u092a\u0924\u094d\u092f \u0935\u093f\u0930\u093e\u0938\u0924 \u0915\u093e \u091c\u0940\u0935\u0902\u0924 \u092a\u094d\u0930\u092e\u093e\u0923 \u092c\u0928\u0940 \u0939\u0941\u0908 \u0939\u0948\u0964</p>"; },
  function(p) { return "<p>\u091c\u092c <strong>" + founder(p) + "</strong> \u0928\u0947 <strong>" + built(p) + "</strong> \u092e\u0947\u0902 <strong>" + p.name + "</strong> \u0915\u0947 \u0928\u093f\u0930\u094d\u092e\u093e\u0923 \u0915\u093e \u0928\u093f\u0930\u094d\u0923\u092f \u0932\u093f\u092f\u093e, \u0924\u094b \u0909\u0928\u0915\u0940 \u092e\u0939\u0924\u094d\u0935\u093e\u0915\u093e\u0902\u0915\u094d\u0937\u093e \u090f\u0915 \u0910\u0938\u0947 \u0938\u094d\u092e\u093e\u0930\u0915 \u0915\u0940 \u0930\u091a\u0928\u093e \u0925\u0940 \u091c\u094b " + p.city + " \u0915\u0940 \u0936\u0915\u094d\u0924\u093f \u0914\u0930 \u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915 \u092a\u0930\u093f\u0937\u094d\u0915\u093e\u0930 \u0915\u094b \u0938\u0926\u093f\u092f\u094b\u0902 \u0924\u0915 \u092a\u094d\u0930\u0924\u093f\u092c\u093f\u0902\u092c\u093f\u0924 \u0915\u0930\u0947\u0964 " + (p.description || '') + " \u0938\u0926\u093f\u092f\u094b\u0902 \u092c\u093e\u0926 \u092f\u0939 \u0938\u094d\u0935\u092a\u094d\u0928 \u092a\u0942\u0930\u094d\u0923\u0924\u0903 \u0938\u093e\u0915\u093e\u0930 \u0939\u0941\u0906 \u0939\u0948 \u0914\u0930 " + p.name + " \u0905\u092c \u092a\u094d\u0930\u0924\u093f\u0935\u0930\u094d\u0937 \u0932\u093e\u0916\u094b\u0902 \u092a\u0930\u094d\u092f\u091f\u0915\u094b\u0902 \u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0915\u0930\u0924\u093e \u0939\u0948\u0964</p>"; },
];

const HI_ARCH = [
  function(p) { return "<h3>" + p.name + " \u0915\u0940 \u0938\u094d\u0925\u093e\u092a\u0924\u094d\u092f \u092a\u094d\u0930\u0924\u093f\u092d\u093e</h3><p>" + p.name + " \u0915\u0940 <strong>" + arch(p) + "</strong> \u0936\u0948\u0932\u0940 \u0907\u0938\u0915\u0940 \u0938\u092c\u0938\u0947 \u092a\u0930\u093f\u092d\u093e\u0937\u093f\u0924 \u0935\u093f\u0936\u0947\u0937\u0924\u093e\u0913\u0902 \u092e\u0947\u0902 \u0938\u0947 \u090f\u0915 \u0939\u0948\u0964 \u0907\u0938\u0915\u0947 \u092a\u094d\u0930\u0924\u094d\u092f\u0947\u0915 \u0924\u0924\u094d\u0935 \u092e\u0947\u0902 — \u090a\u0901\u091a\u0947 \u092a\u094d\u0930\u0935\u0947\u0936 \u0926\u094d\u0935\u093e\u0930\u094b\u0902 \u0938\u0947 \u0932\u0947\u0915\u0930 \u091c\u091f\u093f\u0932 \u0928\u0915\u094d\u0915\u093e\u0936\u0940\u0926\u093e\u0930 \u0938\u094d\u0924\u0902\u092d\u094b\u0902, \u0917\u0941\u092e\u094d\u092c\u0926\u094b\u0902 \u0914\u0930 \u0905\u0932\u0902\u0915\u0943\u0924 \u0906\u0902\u0924\u0930\u093f\u0915 \u0915\u0915\u094d\u0937\u094b\u0902 \u0924\u0915 — <strong>" + founder(p) + "</strong> \u0926\u094d\u0935\u093e\u0930\u093e " + p.city + " \u092e\u0947\u0902 \u0938\u093e\u0915\u093e\u0930 \u0915\u093f\u090f \u0917\u090f \u092a\u0930\u093f\u0937\u094d\u0915\u0943\u0924 \u0921\u093f\u095b\u093e\u0907\u0928 \u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 \u0938\u094d\u092a\u0937\u094d\u091f \u0926\u093f\u0916\u093e\u0908 \u0926\u0947\u0924\u0947 \u0939\u0948\u0902\u0964</p>"; },
  function(p) { return "<h3>" + p.name + " \u0915\u0940 \u0935\u093e\u0938\u094d\u0924\u0941\u0915\u0932\u093e \u0914\u0930 \u0936\u093f\u0932\u094d\u092a</h3><p>\u0935\u093e\u0938\u094d\u0924\u0941\u0915\u0932\u093e \u0915\u0940 \u0926\u0943\u0937\u094d\u091f\u093f \u0938\u0947, <strong>" + p.name + "</strong> <strong>" + arch(p) + "</strong> \u092a\u0930\u0902\u092a\u0930\u093e \u0915\u0940 \u090f\u0915 \u0905\u0928\u0941\u092a\u092e \u0915\u0943\u0924\u093f \u0939\u0948\u0964 \u0907\u0938\u092e\u0947\u0902 \u092a\u094d\u0930\u0926\u0930\u094d\u0936\u093f\u0924 \u0938\u0902\u0930\u091a\u0928\u093e\u0924\u094d\u092e\u0915 \u091a\u093e\u0924\u0941\u0930\u094d\u092f \u0909\u0928 \u0915\u0941\u0936\u0932 \u0915\u093e\u0930\u0940\u0917\u0930\u094b\u0902 \u0915\u0940 \u0909\u0928\u094d\u0928\u0924 \u0907\u0902\u091c\u0940\u0928\u093f\u092f\u0930\u093f\u0902\u0917 \u0915\u094d\u0937\u092e\u0924\u093e \u0915\u0940 \u0938\u093e\u0915\u094d\u0937\u094d\u092f \u0926\u0947\u0924\u093e \u0939\u0948 \u091c\u093f\u0928\u094d\u0939\u094b\u0902\u0928\u0947 <strong>" + founder(p) + "</strong> \u0915\u0940 \u092a\u0930\u093f\u0915\u0932\u094d\u092a\u0928\u093e \u0915\u094b <strong>" + p.city + "</strong> \u092e\u0947\u0902 \u092e\u0942\u0930\u094d\u0924 \u0930\u0942\u092a \u0926\u093f\u092f\u093e\u0964</p>"; },
  function(p) { return "<h3>" + p.name + " \u092e\u0947\u0902 " + arch(p) + " \u0938\u094d\u0925\u093e\u092a\u0924\u094d\u092f \u0915\u093e \u0909\u0924\u094d\u0915\u0930\u094d\u0937</h3><p><strong>" + p.name + "</strong> \u092e\u0947\u0902 <strong>" + arch(p) + "</strong> \u0921\u093f\u095b\u093e\u0907\u0928 \u092a\u0930\u0902\u092a\u0930\u093e\u0913\u0902 \u0915\u094b \u091c\u093f\u0938 \u0938\u0941\u0928\u093f\u0936\u094d\u091a\u093f\u0924\u0924\u093e \u0914\u0930 \u0915\u0932\u093e\u0924\u094d\u092e\u0915\u0924\u093e \u0938\u0947 \u0932\u093e\u0917\u0942 \u0915\u093f\u092f\u093e \u0917\u092f\u093e \u0939\u0948, \u0935\u0939 \u0907\u0938\u0947 \u0935\u093e\u0938\u094d\u0924\u0941\u0915\u0932\u093e \u0915\u0940 \u0926\u0943\u0937\u094d\u091f\u093f \u0938\u0947 \u0935\u093f\u0932\u0915\u094d\u0937\u0923 \u092c\u0928\u093e\u0924\u0940 \u0939\u0948\u0964 <strong>" + founder(p) + "</strong> \u0915\u0947 \u0938\u0902\u0930\u0915\u094d\u0937\u0923 \u092e\u0947\u0902 \u0915\u093e\u092e \u0915\u0930\u0928\u0947 \u0935\u093e\u0932\u0947 \u0915\u093e\u0930\u0940\u0917\u0930 \u0905\u092a\u0928\u0947 \u0936\u093f\u0932\u094d\u092a \u0915\u0947 \u092a\u093e\u0930\u0902\u0917\u0924 \u0909\u0938\u094d\u0924\u093e\u0926 \u0925\u0947\u0964</p>"; },
  function(p) { return "<h3>" + p.name + " \u092e\u0947\u0902 " + arch(p) + " \u0935\u093f\u0930\u093e\u0938\u0924</h3><p><strong>" + p.name + "</strong> \u092e\u0947\u0902 <strong>" + arch(p) + "</strong> \u0938\u094d\u0925\u093e\u092a\u0924\u094d\u092f \u092d\u093e\u0937\u093e \u092a\u094d\u0930\u0924\u094d\u092f\u0947\u0915 \u0906\u0917\u0902\u0924\u0941\u0915 \u0915\u094b \u0907\u0938\u0915\u0947 \u092d\u0935\u094d\u092f \u092a\u094d\u0930\u0935\u0947\u0936 \u0926\u094d\u0935\u093e\u0930 \u0938\u0947 \u0917\u0941\u091c\u0930\u0924\u0947 \u0939\u0940 \u0905\u0928\u0941\u092d\u0935 \u0939\u094b\u0924\u0940 \u0939\u0948\u0964 <strong>" + founder(p) + "</strong> \u0915\u0940 \u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915 \u0926\u0943\u0937\u094d\u091f\u093f \u0938\u0947 \u0906\u0915\u093e\u0930 \u092a\u093e\u0908 \u092f\u0939 \u0907\u092e\u093e\u0930\u0924, \u0938\u094d\u0925\u093e\u0928, \u092a\u094d\u0930\u0915\u093e\u0936 \u0914\u0930 \u0905\u0928\u0941\u092a\u093e\u0924 \u0915\u0940 \u0917\u0939\u0930\u0940 \u0938\u092e\u091d \u0915\u093e \u092a\u0930\u093f\u091a\u092f \u0926\u0947\u0924\u0940 \u0939\u0948\u0964</p>"; },
  function(p) { return "<h3>" + p.name + " \u0915\u0947 \u0938\u0902\u0930\u091a\u0928\u093e\u0924\u094d\u092e\u0915 \u091a\u092e\u0924\u094d\u0915\u093e\u0930</h3><p><strong>" + p.name + "</strong> \u092e\u0947\u0902 \u0926\u0943\u0937\u094d\u091f\u093f\u0917\u0924 <strong>" + arch(p) + "</strong> \u0935\u093f\u0930\u093e\u0938\u0924, \u0935\u093f\u0936\u094d\u0935 \u0935\u093e\u0938\u094d\u0924\u0941\u0915\u0932\u093e \u092e\u0947\u0902 \u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u0915\u0947 \u0938\u0930\u094d\u0935\u093e\u0927\u093f\u0915 \u0909\u0924\u094d\u0915\u0943\u0937\u094d\u091f \u0905\u0935\u0926\u093e\u0928\u094b\u0902 \u092e\u0947\u0902 \u0938\u0947 \u090f\u0915 \u0939\u0948\u0964 \u092f\u0939 " + cat(p) + " \u0915\u0947\u0935\u0932 \u090f\u0915 \u0915\u093e\u0930\u094d\u092f\u093e\u0924\u094d\u092e\u0915 \u0938\u0902\u0930\u091a\u0928\u093e \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u0928\u0939\u0940\u0902 \u092c\u0932\u094d\u0915\u093f \u090f\u0915 \u0938\u094d\u0925\u093e\u092a\u0924\u094d\u092f \u0918\u094b\u0937\u0923\u093e\u092a\u0924\u094d\u0930 \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u092a\u0930\u093f\u0915\u0932\u094d\u092a\u093f\u0924 \u0915\u093f\u092f\u093e \u0917\u092f\u093e \u0925\u093e\u0964</p>"; },
];

const HI_HIST = [
  function(p) { return "<p>\u0938\u0926\u093f\u092f\u094b\u0902 \u0915\u0947 \u092a\u094d\u0930\u0935\u093e\u0939 \u092e\u0947\u0902 <strong>" + p.name + "</strong> \u0928\u0947 \u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u0915\u0947 \u0907\u0924\u093f\u0939\u093e\u0938 \u0915\u093e \u092a\u0942\u0930\u094d\u0923 \u0935\u0943\u0924\u094d\u0924 \u0926\u0947\u0916\u093e \u0939\u0948 — \u092e\u0939\u093e\u0928 \u0938\u092e\u0943\u0926\u094d\u0927\u093f \u0915\u0947 \u0938\u094d\u0935\u0930\u094d\u0923\u093f\u092e \u0926\u094c\u0930, \u0930\u093e\u091c\u0928\u0940\u0924\u093f\u0915 \u0909\u0925\u0932-\u092a\u0941\u0925\u0932 \u0915\u0947 \u0938\u0902\u0915\u091f\u0915\u093e\u0932, \u0914\u0930 " + p.city + " \u0915\u093e \u092e\u0927\u094d\u092f\u0915\u093e\u0932\u0940\u0928 \u0936\u093e\u0939\u0940 \u0930\u093e\u091c\u0927\u093e\u0928\u0940 \u0938\u0947 \u0906\u0927\u0941\u0928\u093f\u0915 \u092e\u0939\u093e\u0928\u0917\u0930 \u092e\u0947\u0902 \u0915\u094d\u0930\u092e\u093f\u0915 \u0930\u0942\u092a\u093e\u0902\u0924\u0930\u0923\u0964 \u092f\u0939 " + cat(p) + " \u0905\u0928\u0917\u093f\u0928\u0924 \u0910\u0924\u093f\u0939\u093e\u0938\u093f\u0915 \u0918\u091f\u0928\u093e\u0913\u0902 \u0914\u0930 \u0936\u093e\u0939\u0940 \u0905\u0928\u0941\u0937\u094d\u0920\u093e\u0928\u094b\u0902 \u0915\u0940 \u092a\u0943\u0937\u094d\u0920\u092d\u0942\u092e\u093f \u0930\u0939\u093e \u0939\u0948\u0964</p>"; },
  function(p) { return "<p><strong>" + p.name + "</strong> \u0915\u093e \u0910\u0924\u093f\u0939\u093e\u0938\u093f\u0915 \u092e\u0939\u0924\u094d\u0924\u094d\u0935 \u0907\u0938\u0915\u0940 \u0938\u094d\u0925\u093e\u092a\u0924\u094d\u092f \u0938\u0941\u0902\u0926\u0930\u0924\u093e \u0938\u0947 \u0915\u0939\u0940\u0902 \u0906\u0917\u0947 \u0924\u0915 \u0935\u093f\u0938\u094d\u0924\u0943\u0924 \u0939\u0948\u0964 \u0905\u092a\u0928\u0947 \u091a\u0930\u092e \u0915\u093e\u0932 \u092e\u0947\u0902 <strong>" + p.city + "</strong> \u0915\u093e \u092f\u0939 " + cat(p) + " \u0930\u093e\u091c\u0928\u0940\u0924\u093f\u0915 \u0936\u0915\u094d\u0924\u093f, \u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915 \u0938\u0902\u0930\u0915\u094d\u0937\u0923 \u0914\u0930 \u0938\u093e\u092e\u093e\u091c\u093f\u0915 \u091c\u0940\u0935\u0928 \u0915\u093e \u090f\u0915 \u0917\u0924\u093f\u0936\u0940\u0932 \u0915\u0947\u0902\u0926\u094d\u0930 \u0925\u093e\u0964 \u0907\u0938\u0915\u0947 \u0915\u0915\u094d\u0937\u094b\u0902 \u092e\u0947\u0902 \u0906\u092f\u094b\u091c\u093f\u0924 \u0926\u0930\u092c\u093e\u0930\u094b\u0902 \u0928\u0947 \u0939\u091c\u093e\u0930\u094b\u0902 \u091c\u0940\u0935\u0928\u094b\u0902 \u0915\u094b \u092a\u094d\u0930\u092d\u093e\u0935\u093f\u0924 \u0915\u0930\u0928\u0947 \u0935\u093e\u0932\u0947 \u0928\u093f\u0930\u094d\u0923\u092f \u0932\u093f\u090f\u0964</p>"; },
  function(p) { return "<p><strong>" + built(p) + "</strong> \u092e\u0947\u0902 \u0905\u092a\u0928\u0947 \u0928\u093f\u0930\u094d\u092e\u093e\u0923 \u0915\u0947 \u092a\u0936\u094d\u091a\u093e\u0924\u094d \u0915\u0940 \u092a\u0940\u095d\u093c\u093f\u092f\u094b\u0902 \u092e\u0947\u0902 <strong>" + p.name + "</strong>, <strong>" + founder(p) + "</strong> \u0915\u0940 \u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0917\u0924 \u092a\u0930\u093f\u092f\u094b\u091c\u0928\u093e \u0938\u0947 \u0935\u093f\u0915\u0938\u093f\u0924 \u0939\u094b\u0915\u0930 " + p.city + " \u0915\u0947 \u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915 \u091c\u0940\u0935\u0928 \u0915\u0947 \u0915\u0947\u0902\u0926\u094d\u0930 \u092e\u0947\u0902 \u090f\u0915 \u091c\u0940\u0935\u0902\u0924 \u0938\u0902\u0938\u094d\u0925\u093e \u092c\u0928 \u0917\u092f\u093e\u0964 \u0909\u0924\u094d\u0924\u0930\u093e\u0927\u093f\u0915\u093e\u0930\u0940 \u0936\u093e\u0938\u0915\u094b\u0902 \u0928\u0947 \u0905\u092a\u0928\u0947-\u0905\u092a\u0928\u0947 \u092f\u094b\u0917\u0926\u093e\u0928 \u091c\u094b\u095c\u0947; \u0935\u093f\u0926\u094d\u0935\u093e\u0928 \u091c\u094d\u091e\u093e\u0928-\u0935\u093f\u092e\u0930\u094d\u0936 \u0915\u0947 \u0932\u093f\u090f \u090f\u0915\u0924\u094d\u0930 \u0939\u094b\u0924\u0947 \u0925\u0947\u0964</p>"; },
  function(p) { return "<p>" + p.city + " \u0915\u0947 \u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915 \u0914\u0930 \u0930\u093e\u091c\u0928\u0940\u0924\u093f\u0915 \u092a\u0930\u093f\u0926\u0943\u0936\u094d\u092f \u0915\u094b \u0906\u0915\u093e\u0930 \u0926\u0947\u0928\u0947 \u092e\u0947\u0902 <strong>" + p.name + "</strong> \u0915\u0940 \u092d\u0942\u092e\u093f\u0915\u093e \u0915\u094b \u0928\u0915\u093e\u0930\u093e \u0928\u0939\u0940\u0902 \u091c\u093e \u0938\u0915\u0924\u093e\u0964 <strong>" + founder(p) + "</strong> \u0928\u0947 <strong>" + built(p) + "</strong> \u092e\u0947\u0902 \u091c\u093f\u0938 \u0915\u094d\u0937\u0923 \u0938\u0947 \u0907\u0938\u0915\u093e \u0928\u093f\u0930\u094d\u092e\u093e\u0923 \u092a\u0942\u0930\u094d\u0923 \u0915\u093f\u092f\u093e, \u092f\u0939 " + cat(p) + " \u0915\u094d\u0937\u0947\u0924\u094d\u0930 \u0915\u0940 \u092a\u0939\u091a\u093e\u0928 \u0938\u0947 \u0905\u0935\u093f\u092d\u093e\u091c\u094d\u092f \u0939\u094b \u0917\u092f\u093e\u0964 \u092f\u0939 \u0936\u093e\u0939\u0940 \u0930\u093e\u091c\u094d\u092f\u093e\u092d\u093f\u0937\u0947\u0915, \u092d\u0935\u094d\u092f \u0926\u0930\u092c\u093e\u0930\u094b\u0902 \u0914\u0930 \u092e\u0939\u0924\u094d\u0924\u094d\u0935\u092a\u0942\u0930\u094d\u0923 \u0927\u093e\u0930\u094d\u092e\u093f\u0915 \u0938\u092e\u093e\u0930\u094b\u0939\u094b\u0902 \u0915\u093e \u092e\u0902\u091a \u092c\u0928\u093e\u0964</p>"; },
  function(p) { return "<p>\u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u092e\u0947\u0902 \u0936\u093e\u092f\u0926 \u0939\u0940 \u0915\u094b\u0908 \u0938\u094d\u0925\u0932 <strong>" + p.name + "</strong> \u091c\u093f\u0924\u0928\u0940 \u0938\u092e\u0943\u0926\u094d\u0927 \u0910\u0924\u093f\u0939\u093e\u0938\u093f\u0915 \u0917\u093e\u0925\u093e \u0915\u094b \u0938\u092e\u0947\u091f\u0947 \u0939\u094b\u0964 <strong>" + built(p) + "</strong> \u092e\u0947\u0902 \u0905\u092a\u0928\u0940 \u0938\u094d\u0925\u093e\u092a\u0928\u093e \u0938\u0947 \u0932\u0947\u0915\u0930 \u0906\u091c \u0924\u0915, \u092f\u0939 " + cat(p) + " \u0938\u093e\u092e\u094d\u0930\u093e\u091c\u094d\u092f\u094b\u0902 \u0915\u0947 \u0909\u0924\u094d\u0925\u093e\u0928-\u092a\u0924\u0928, \u0915\u0932\u093e\u0913\u0902 \u0914\u0930 \u0935\u093e\u0923\u093f\u091c\u094d\u092f \u0915\u0947 \u0935\u093f\u0915\u093e\u0938, \u0914\u0930 <strong>" + p.city + "</strong> \u0915\u0947 \u092e\u0927\u094d\u092f\u0915\u093e\u0932\u0940\u0928 \u0917\u095d\u093c \u0938\u0947 \u090f\u0915 \u091c\u0940\u0935\u0902\u0924 \u0906\u0927\u0941\u0928\u093f\u0915 \u0928\u0917\u0930 \u092c\u0928\u0928\u0947 \u0915\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0915\u093e \u092e\u0942\u0915 \u0938\u093e\u0915\u094d\u0937\u0940 \u0930\u0939\u093e \u0939\u0948\u0964</p>"; },
];

const HI_HIGH = [
  function(p) { return "<h3>" + p.name + " \u0915\u0947 \u092a\u094d\u0930\u092e\u0941\u0916 \u0906\u0915\u0930\u094d\u0937\u0923</h3><p><strong>" + p.name + "</strong> \u0915\u0947 \u0905\u0928\u0917\u093f\u0928\u0924 \u091a\u092e\u0924\u094d\u0915\u093e\u0930\u094b\u0902 \u092e\u0947\u0902 <strong>" + (h(p,0) || '\u092e\u0941\u0916\u094d\u092f \u0915\u0915\u094d\u0937') + "</strong> \u0938\u0930\u094d\u0935\u093e\u0927\u093f\u0915 \u0938\u094d\u092e\u0930\u0923\u0940\u092f \u0905\u0928\u0941\u092d\u0935\u094b\u0902 \u092e\u0947\u0902 \u0928\u093f\u0930\u0902\u0924\u0930 \u0905\u0917\u094d\u0930\u0923\u0940 \u0930\u0939\u0924\u093e \u0939\u0948\u0964 " + (h(p,1) ? "<strong>" + h(p,1) + "</strong> \u092d\u0940 \u0909\u0924\u0928\u093e \u0939\u0940 \u092a\u094d\u0930\u092d\u093e\u0935\u0936\u093e\u0932\u0940 \u0939\u0948, \u091c\u094b \u0907\u0938 \u0938\u094d\u092e\u093e\u0930\u0915 \u0915\u094b \u092a\u0930\u093f\u092d\u093e\u0937\u093f\u0924 \u0915\u0930\u0928\u0947 \u0935\u093e\u0932\u0940 \u0905\u0938\u093e\u0927\u093e\u0930\u0923 \u0936\u093f\u0932\u094d\u092a-\u0915\u0941\u0936\u0932\u0924\u093e \u0915\u0940 \u091d\u0932\u0915 \u092a\u094d\u0930\u0926\u093e\u0928 \u0915\u0930\u0924\u093e \u0939\u0948\u0964 " : '') + "\u092f\u0947 \u0905\u0928\u0941\u092d\u0935 \u092e\u093f\u0932\u0915\u0930 \u090f\u0915 \u0910\u0938\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0930\u091a\u0924\u0947 \u0939\u0948\u0902 \u091c\u094b \u0938\u0902\u0935\u0947\u0926\u0928\u093e\u0924\u094d\u092e\u0915 \u092a\u094d\u0930\u092d\u093e\u0935\u094b\u0902, \u0910\u0924\u093f\u0939\u093e\u0938\u093f\u0915 \u0905\u0902\u0924\u0930\u094d\u0926\u0943\u0937\u094d\u091f\u093f \u0914\u0930 \u0938\u094d\u0925\u093e\u092f\u0940 \u0938\u094d\u092e\u0943\u0924\u093f\u092f\u094b\u0902 \u0938\u0947 \u092a\u0930\u093f\u092a\u0942\u0930\u094d\u0923 \u0939\u0948\u0964</p>"; },
  function(p) { return "<h3>" + p.name + " \u0915\u0940 \u0905\u0935\u0936\u094d\u092f \u0926\u0930\u094d\u0936\u0928\u0940\u092f \u0935\u093f\u0936\u0947\u0937\u0924\u093e\u090f\u0901</h3><p><strong>" + p.name + "</strong> \u0915\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0907\u0938\u0915\u0940 \u0938\u0930\u094d\u0935\u093e\u0927\u093f\u0915 \u092a\u094d\u0930\u0924\u093f\u0937\u094d\u0920\u093f\u0924 \u0935\u093f\u0936\u0947\u0937\u0924\u093e\u0913\u0902 \u0915\u0947 \u0905\u0928\u0941\u092d\u0935 \u0915\u0947 \u092c\u093f\u0928\u093e \u0905\u092a\u0942\u0930\u094d\u0923 \u0939\u0948\u0964 <strong>" + (h(p,0) || '\u0915\u0947\u0902\u0926\u094d\u0930\u0940\u092f \u0906\u0901\u0917\u0928') + "</strong> \u0915\u094b \u0938\u092e\u0942\u091a\u0947 \u092a\u0930\u093f\u0938\u0930 \u0915\u093e \u092e\u0941\u0915\u0941\u091f-\u092e\u0923\u093f \u092e\u093e\u0928\u093e \u091c\u093e\u0924\u093e \u0939\u0948\u0964 " + (h(p,1) ? "<strong>" + h(p,1) + "</strong> \u0909\u0924\u0928\u093e \u0939\u0940 \u0909\u0932\u094d\u0932\u0947\u0916\u0928\u0940\u092f \u0939\u0948, \u091c\u094b <strong>" + founder(p) + "</strong> \u0915\u0940 \u0938\u0947\u0935\u093e \u092e\u0947\u0902 \u0930\u0924 \u0915\u093e\u0930\u0940\u0917\u0930\u094b\u0902 \u0915\u0940 \u0905\u0938\u093e\u0927\u093e\u0930\u0923 \u0924\u0915\u0928\u0940\u0915\u0940 \u0928\u093f\u092a\u0941\u0923\u0924\u093e \u0915\u094b \u0909\u091c\u093e\u0917\u0930 \u0915\u0930\u0924\u093e \u0939\u0948\u0964 " : '') + "</p>"; },
  function(p) { return "<h3>" + p.name + " \u0915\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0915\u0940 \u091d\u0932\u0915\u093f\u092f\u093e\u0901</h3><p>" + p.city + " \u092e\u0947\u0902 <strong>" + p.name + "</strong> \u0915\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0905\u0928\u0941\u092d\u0935\u094b\u0902 \u0915\u0940 \u090f\u0915 \u0910\u0938\u0940 \u0905\u0928\u0941\u092a\u092e \u0936\u0943\u0902\u0916\u0932\u093e \u092a\u094d\u0930\u0938\u094d\u0924\u0941\u0924 \u0915\u0930\u0924\u0940 \u0939\u0948 \u091c\u094b \u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u0915\u0940 \u0917\u094c\u0930\u0935\u0936\u093e\u0932\u0940 \u0935\u093f\u0930\u093e\u0938\u0924 \u0915\u093e \u090f\u0915 \u091c\u0940\u0935\u0902\u0924 \u091a\u093f\u0924\u094d\u0930 \u0909\u0915\u0947\u0930\u0924\u0940 \u0939\u0948\u0964 <strong>" + (h(p,0) || '\u092d\u0935\u094d\u092f \u092a\u094d\u0930\u0935\u0947\u0936 \u0926\u094d\u0935\u093e\u0930') + "</strong> \u0905\u0915\u0947\u0932\u0947 \u0939\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0915\u094b \u0938\u093e\u0930\u094d\u0925\u0915 \u092c\u0928\u093e \u0926\u0947\u0924\u093e \u0939\u0948\u0964 " + (act(p,0) ? act(p,0) + " \u0915\u093e \u0905\u0935\u0938\u0930 \u092a\u0930\u094d\u092f\u091f\u0915\u094b\u0902 \u0915\u094b \u0907\u0938 \u0905\u0938\u093e\u0927\u093e\u0930\u0923 \u0938\u094d\u0925\u0932 \u0915\u0947 \u091c\u0940\u0935\u0902\u0924 \u0907\u0924\u093f\u0939\u093e\u0938 \u0938\u0947 \u090f\u0915 \u092a\u094d\u0930\u0924\u094d\u092f\u0915\u094d\u0937, \u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0917\u0924 \u0938\u0902\u092c\u0902\u0927 \u0938\u094d\u0925\u093e\u092a\u093f\u0924 \u0915\u0930\u0928\u0947 \u0926\u0947\u0924\u093e \u0939\u0948\u0964" : '') + "</p>"; },
  function(p) { return "<h3>" + p.name + " \u092e\u0947\u0902 \u0915\u094d\u092f\u093e \u0926\u0947\u0916\u0947\u0902</h3><p><strong>" + p.name + "</strong> \u0915\u0947 \u092a\u0930\u094d\u092f\u091f\u0915\u094b\u0902 \u0915\u094b \u0926\u0943\u0936\u094d\u092f \u0935\u0948\u092d\u0935, \u0910\u0924\u093f\u0939\u093e\u0938\u093f\u0915 \u0917\u0939\u0930\u093e\u0908 \u0914\u0930 \u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915 \u0924\u0932\u094d\u0932\u0940\u0928\u0924\u093e \u0915\u093e \u090f\u0915\u0938\u093e\u0925 \u0905\u0928\u0941\u092d\u0935 \u0939\u094b\u0924\u093e \u0939\u0948\u0964 \u092a\u094d\u0930\u0924\u093f\u0937\u094d\u0920\u093f\u0924 <strong>" + (h(p,0) || '\u092e\u0941\u0916\u094d\u092f \u0906\u0915\u0930\u094d\u0937\u0923') + "</strong> \u0938\u0926\u093e \u092a\u094d\u0930\u092d\u093e\u0935\u093f\u0924 \u0915\u0930\u0924\u093e \u0939\u0948\u0964 " + (h(p,1) ? "<strong>" + h(p,1) + "</strong> \u0907\u0938 \u090f\u0924\u093f\u0939\u093e\u0938\u093f\u0915 \u0938\u094d\u0925\u0932 \u0915\u0940 \u0915\u0932\u093e\u0924\u094d\u092e\u0915\u0924\u093e \u092a\u0930 \u090f\u0915 \u0935\u093f\u092a\u0930\u0940\u0924 \u0915\u093f\u0928\u094d\u0924\u0941 \u0938\u092e\u093e\u0928 \u0930\u0942\u092a \u0938\u0947 \u0906\u0915\u0930\u094d\u0937\u0915 \u0926\u0943\u0937\u094d\u091f\u093f\u0915\u094b\u0923 \u092a\u094d\u0930\u0938\u094d\u0924\u0941\u0924 \u0915\u0930\u0924\u093e \u0939\u0948\u0964 " : '') + "</p>"; },
  function(p) { return "<h3>" + p.name + " \u0915\u0940 \u0936\u094d\u0930\u0947\u0937\u094d\u0920 \u0935\u093f\u0936\u0947\u0937\u0924\u093e\u090f\u0901</h3><p><strong>" + p.name + "</strong> \u092e\u0947\u0902 \u0905\u0938\u093e\u0927\u093e\u0930\u0923 \u0926\u0943\u0936\u094d\u092f\u094b\u0902 \u0915\u0940 \u0935\u093f\u0935\u093f\u0927\u0924\u093e \u092f\u0939 \u0938\u0941\u0928\u093f\u0936\u094d\u091a\u093f\u0924 \u0915\u0930\u0924\u0940 \u0939\u0948 \u0915\u093f \u092a\u094d\u0930\u0924\u094d\u092f\u0947\u0915 \u092a\u0930\u094d\u092f\u091f\u0915 \u0905\u092a\u0928\u0947 \u0938\u093e\u0925 \u0915\u0941\u091b \u0905\u0928\u0942\u0920\u093e \u0914\u0930 \u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0917\u0924 \u0938\u094d\u092e\u0943\u0924\u093f \u0932\u0947\u0915\u0930 \u091c\u093e\u090f\u0964 \u092d\u0935\u094d\u092f <strong>" + (h(p,0) || '\u0915\u0947\u0902\u0926\u094d\u0930\u0940\u092f \u0935\u093f\u0936\u0947\u0937\u0924\u093e') + "</strong> \u091a\u093f\u0930\u0915\u093e\u0932 \u0938\u0947 \u0938\u092e\u0942\u091a\u0947 \u092a\u0930\u093f\u0938\u0930 \u0915\u093e \u0915\u0947\u0902\u0926\u094d\u0930-\u092c\u093f\u0902\u0926\u0941 \u0930\u0939\u0940 \u0939\u0948\u0964 " + (h(p,1) ? "<strong>" + h(p,1) + "</strong> <strong>" + arch(p) + "</strong> \u092a\u0930\u0902\u092a\u0930\u093e \u0915\u093e \u090f\u0915 \u092d\u093f\u0928\u094d\u0928 \u0915\u093f\u0928\u094d\u0924\u0941 \u0938\u092e\u093e\u0928 \u0930\u0942\u092a \u0938\u0947 \u092d\u0935\u094d\u092f \u092a\u0939\u0932\u0942 \u092a\u094d\u0930\u0938\u094d\u0924\u0941\u0924 \u0915\u0930\u0924\u093e \u0939\u0948\u0964 " : '') + "</p>"; },
];

const HI_MOD = [
  function(p) { return "<h3>" + p.name + " \u0915\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0915\u0940 \u092f\u094b\u091c\u0928\u093e \u092c\u0928\u093e\u090f\u0901</h3><p>\u0906\u091c <strong>" + p.name + "</strong> \u0938\u092e\u0942\u091a\u0947 \u092d\u093e\u0930\u0924 \u0914\u0930 \u0935\u093f\u0936\u094d\u0935 \u0915\u0947 \u0926\u0942\u0930-\u0926\u0930\u093e\u095c\u093c \u0938\u0947 \u0906\u090f \u092a\u0930\u094d\u092f\u091f\u0915\u094b\u0902 \u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0915\u0930\u0924\u093e \u0939\u0948 \u091c\u094b " + p.city + " \u0915\u0940 \u0907\u0938 \u0905\u0928\u092e\u094b\u0932 \u0935\u093f\u0930\u093e\u0938\u0924 \u0915\u093e \u0938\u093e\u0915\u094d\u0937\u093e\u0924\u094d\u0915\u093e\u0930 \u0915\u0930\u0928\u0947 \u0906\u0924\u0947 \u0939\u0948\u0902\u0964 " + (tip(p) ? tip(p) + ' ' : '') + "\u0907\u0938 \u0909\u0932\u094d\u0932\u0947\u0916\u0928\u0940\u092f " + cat(p) + " \u0915\u0940 \u092a\u094d\u0930\u0924\u094d\u092f\u0947\u0915 \u0935\u093f\u0936\u0947\u0937\u0924\u093e \u0915\u093e \u0938\u092e\u0941\u091a\u093f\u0924 \u0906\u0928\u0902\u0926 \u0932\u0947\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0915\u092e \u0938\u0947 \u0915\u092e <strong>" + dur(p) + "</strong> \u0915\u093e \u0938\u092e\u092f \u0928\u093f\u0930\u094d\u0927\u093e\u0930\u093f\u0924 \u0915\u0930\u0947\u0902\u0964</p>"; },
  function(p) { return "<h3>\u0906\u091c " + p.name + " \u0915\u093e \u0926\u0930\u094d\u0936\u0928</h3><p><strong>" + p.city + "</strong> \u092e\u0947\u0902 <strong>" + p.name + "</strong> \u0915\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u090f\u0915 \u0910\u0938\u093e \u0905\u0928\u0941\u092d\u0935 \u0939\u0948 \u091c\u094b \u0907\u0938\u0915\u0947 \u092a\u0930\u093f\u0938\u0930 \u0938\u0947 \u0935\u093f\u0926\u093e \u0939\u094b\u0928\u0947 \u0915\u0947 \u092c\u093e\u0926 \u092d\u0940 \u0938\u094d\u092e\u0943\u0924\u093f \u092e\u0947\u0902 \u092c\u0928\u093e \u0930\u0939\u0924\u093e \u0939\u0948\u0964 " + (tip(p) ? tip(p) + ' ' : '') + "\u0906\u0930\u093e\u092e\u0926\u093e\u092f\u0915 \u0917\u0924\u093f \u0938\u0947 \u0905\u0928\u094d\u0935\u0947\u0937\u0923 \u0915\u0947 \u0932\u093f\u090f <strong>" + dur(p) + "</strong> \u0915\u093e \u0938\u092e\u092f \u0930\u0916\u0947\u0902\u0964</p>"; },
  function(p) { return "<h3>\u0906\u092a\u0915\u093e " + p.name + " \u0905\u0928\u0941\u092d\u0935 \u0906\u092a\u0915\u0940 \u092a\u094d\u0930\u0924\u0940\u0915\u094d\u0937\u093e \u0915\u0930 \u0930\u0939\u093e \u0939\u0948</h3><p><strong>" + p.name + "</strong> \u0915\u0947 \u0930\u0916\u0930\u0916\u093e\u0935 \u0915\u0947 \u0909\u0924\u094d\u0924\u0930\u0926\u093e\u092f\u0940 \u0935\u093f\u0930\u093e\u0938\u0924 \u092a\u094d\u0930\u093e\u0927\u093f\u0915\u0930\u0923 \u092f\u0939 \u0938\u0941\u0928\u093f\u0936\u094d\u091a\u093f\u0924 \u0915\u0930\u0928\u0947 \u092e\u0947\u0902 \u0905\u0925\u0915 \u092a\u094d\u0930\u092f\u093e\u0938\u0930\u0924 \u0930\u0939\u0924\u0947 \u0939\u0948\u0902 \u0915\u093f \u092a\u0930\u094d\u092f\u091f\u0915\u094b\u0902 \u0915\u094b \u090f\u0915 \u0935\u093f\u0936\u094d\u0935\u0938\u094d\u0924\u0930\u0940\u092f \u0905\u0928\u0941\u092d\u0935 \u092e\u093f\u0932\u0947\u0964 " + (tip(p) ? tip(p) + ' ' : '') + "\u0907\u0938\u0915\u0947 \u0907\u0924\u093f\u0939\u093e\u0938 \u0914\u0930 \u0935\u093e\u0938\u094d\u0924\u0941\u0915\u0932\u093e \u0938\u0947 \u0917\u0939\u0930\u093e\u0908 \u0938\u0947 \u091c\u0941\u095c\u0928\u0947 \u0915\u0947 \u0907\u091a\u094d\u091b\u0941\u0915 \u092a\u0930\u094d\u092f\u091f\u0915\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f \u092a\u094d\u0930\u092e\u093e\u0923\u093f\u0924 \u0938\u094d\u0925\u093e\u0928\u0940\u092f \u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e\u094b\u0902 \u0926\u094d\u0935\u093e\u0930\u093e \u0928\u093f\u0930\u094d\u0926\u0947\u0936\u093f\u0924 \u092d\u094d\u0930\u092e\u0923 \u0909\u092a\u0932\u092c\u094d\u0927 \u0939\u0948\u0902\u0964</p>"; },
  function(p) { return "<h3>" + p.name + " \u0915\u093e \u0905\u0927\u093f\u0915\u0924\u092e \u0932\u093e\u092d \u0909\u0920\u093e\u090f\u0901</h3><p>\u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u0915\u0940 \u0936\u093e\u0939\u0940 \u0935\u093f\u0930\u093e\u0938\u0924 \u0938\u0947 \u090f\u0915 \u092a\u094d\u0930\u093e\u092e\u093e\u0923\u093f\u0915 \u0938\u093e\u0915\u094d\u0937\u093e\u0924\u094d\u0915\u093e\u0930 \u091a\u093e\u0939\u0928\u0947 \u0935\u093e\u0932\u0947 \u092f\u093e\u0924\u094d\u0930\u093f\u092f\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f <strong>" + p.city + "</strong> \u092e\u0947\u0902 <strong>" + p.name + "</strong> \u090f\u0915 \u0905\u092a\u0930\u093f\u0939\u093e\u0930\u094d\u092f \u0917\u0902\u0924\u0935\u094d\u092f \u0939\u0948\u0964 " + (tip(p) ? tip(p) + ' ' : '') + "<strong>" + dur(p) + "</strong> \u0915\u0940 \u0905\u0928\u0941\u0936\u0902\u0938\u093f\u0924 \u092f\u093e\u0924\u094d\u0930\u093e \u092e\u0947\u0902 \u092d\u0935\u094d\u092f \u0938\u094d\u0925\u093e\u092a\u0924\u094d\u092f \u0938\u0902\u0930\u091a\u0928\u093e\u0913\u0902 \u0914\u0930 \u0938\u0942\u0915\u094d\u0937\u094d\u092e \u0915\u0932\u093e\u0924\u094d\u092e\u0915 \u0935\u093f\u0935\u0930\u0923\u094b\u0902 \u0926\u094b\u0928\u094b\u0902 \u0915\u0940 \u0938\u0930\u093e\u0939\u0928\u093e \u0915\u0947 \u0932\u093f\u090f \u092a\u0930\u094d\u092f\u093e\u092a\u094d\u0924 \u0905\u0935\u0938\u0930 \u092e\u093f\u0932\u0924\u093e \u0939\u0948\u0964</p>"; },
  function(p) { return "<h3>" + p.name + " \u2014 \u090f\u0915 \u091c\u0940\u0935\u0902\u0924 \u0935\u093f\u0930\u093e\u0938\u0924</h3><p>\u0905\u0928\u0902\u0924 \u092a\u0930\u093f\u0935\u0930\u094d\u0924\u0928\u094b\u0902 \u0915\u0947 \u0907\u0938 \u092f\u0941\u0917 \u092e\u0947\u0902 <strong>" + p.name + "</strong> \u090f\u0915 \u0906\u0936\u094d\u0935\u0938\u094d\u0924 \u0915\u0930\u0928\u0947 \u0935\u093e\u0932\u0947 \u0938\u094d\u0925\u093e\u092f\u093f\u0924\u094d\u0935 \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u0905\u0921\u093f\u0917 \u0916\u095c\u093e \u0939\u0948 \u2014 <strong>" + p.city + "</strong> \u092e\u0947\u0902 <strong>" + founder(p) + "</strong> \u091c\u0948\u0938\u0947 \u0936\u093e\u0938\u0915\u094b\u0902 \u0915\u0940 \u0926\u0947\u0916\u0930\u0947\u0916 \u092e\u0947\u0902 \u092a\u0932\u094d\u0932\u0935\u093f\u0924 \u0909\u0938 \u0909\u0932\u094d\u0932\u0947\u0916\u0928\u0940\u092f \u0938\u092d\u094d\u092f\u0924\u093e \u0938\u0947 \u090f\u0915 \u091c\u0940\u0935\u0902\u0924 \u0915\u095c\u0940\u0964 " + (tip(p) ? tip(p) + ' ' : '') + "<strong>" + dur(p) + "</strong> \u0915\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0915\u0947 \u0932\u093f\u090f \u0938\u092e\u092f \u0928\u093f\u0930\u094d\u0927\u093e\u0930\u093f\u0924 \u0915\u0930\u0947\u0902 \u091c\u094b \u0906\u092a\u0915\u0940 \u0935\u093e\u092a\u0938\u0940 \u0915\u0947 \u0926\u0940\u0930\u094d\u0918\u0915\u093e\u0932 \u092c\u093e\u0926 \u092d\u0940 \u0938\u094d\u092e\u0943\u0924\u093f \u092e\u0947\u0902 \u0905\u0902\u0915\u093f\u0924 \u0930\u0939\u0947\u0917\u0940\u0964</p>"; },
];

// ============================================================
// GENERATE HISTORY FUNCTIONS
// ============================================================

function generateEN(place, idx) {
  const v = idx % 5;
  return [
    EN_OPEN[v](place),
    EN_ARCH[v](place),
    EN_HIST[(v + 1) % 5](place),
    EN_HIGH[(v + 2) % 5](place),
    EN_MOD[(v + 3) % 5](place),
  ].join('\n          \n          ');
}

function generateHI(place, idx) {
  const v = idx % 5;
  return [
    HI_OPEN[v](place),
    HI_ARCH[v](place),
    HI_HIST[(v + 1) % 5](place),
    HI_HIGH[(v + 2) % 5](place),
    HI_MOD[(v + 3) % 5](place),
  ].join('\n          \n          ');
}

// ============================================================
// PARSE PLACES (LINE-BY-LINE STATE MACHINE)
// ============================================================

function parsePlaces(content) {
  const places = [];
  const lines = content.split(/\r?\n/);
  let curr = null;
  let inHighlights = false, inActivities = false;
  let inBestTime = false, inVisitDur = false;
  let hlDone = false, actDone = false;

  const getStr = (line, key) => {
    const rx = new RegExp('^\\s*"' + key + '":\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"');
    const m = line.match(rx);
    if (!m) return null;
    return m[1].replace(/\\n/g,' ').replace(/\\t/g,' ').replace(/\\r/g,'').replace(/\\"/g,'"').replace(/\\\\/g,'\\').trim();
  };

  for (const line of lines) {
    const t = line.trim();

    // New place starts at "id": NUMBER
    if (/^\s*"id":\s*\d+,?\s*$/.test(line)) {
      if (curr && curr.slug) places.push(Object.assign({}, curr));
      curr = { highlights: [], activities: [] };
      inHighlights = false; inActivities = false;
      inBestTime = false; inVisitDur = false;
      hlDone = false; actDone = false;
      continue;
    }

    if (!curr) continue;

    if (!curr.name)         { const v = getStr(line,'name');         if (v !== null) curr.name = v; }
    if (!curr.slug)         { const v = getStr(line,'slug');         if (v !== null) curr.slug = v; }
    if (!curr.yearBuilt)    { const v = getStr(line,'yearBuilt');    if (v !== null) curr.yearBuilt = v; }
    if (!curr.builtBy)      { const v = getStr(line,'builtBy');      if (v !== null) curr.builtBy = v; }
    if (!curr.architecture) { const v = getStr(line,'architecture'); if (v !== null) curr.architecture = v; }
    if (!curr.significance) { const v = getStr(line,'significance'); if (v !== null) curr.significance = v; }
    if (!curr.category)     { const v = getStr(line,'category');     if (v !== null) curr.category = v; }
    if (!curr.subcategory)  { const v = getStr(line,'subcategory');  if (v !== null) curr.subcategory = v; }
    if (!curr.city)         { const v = getStr(line,'city');         if (v !== null) curr.city = v; }
    if (!curr.description)  { const v = getStr(line,'description');  if (v !== null) curr.description = v; }

    if (t === '"highlights": [' && !hlDone)  { inHighlights = true; continue; }
    if (t === '"activities": [' && !actDone) { inActivities = true; continue; }
    if (t === '"bestTimeToVisit": {') { inBestTime = true; continue; }
    if (t === '"visitDuration": {')   { inVisitDur = true; continue; }

    if (t === '],' || t === ']') {
      if (inHighlights) { inHighlights = false; hlDone = true; }
      else if (inActivities) { inActivities = false; actDone = true; }
    }
    if (t === '},' || t === '}') {
      if (inBestTime) inBestTime = false;
      else if (inVisitDur) inVisitDur = false;
    }

    if (inHighlights && curr.highlights.length < 5) {
      const m = t.match(/^"((?:[^"\\]|\\.)*)"/);
      if (m) curr.highlights.push(m[1].replace(/\\"/g,'"'));
    }
    if (inActivities && curr.activities.length < 3) {
      const m = t.match(/^"((?:[^"\\]|\\.)*)"/);
      if (m) curr.activities.push(m[1].replace(/\\"/g,'"'));
    }
    if (inBestTime && !(curr.bestTimeToVisit && curr.bestTimeToVisit.tip)) {
      const v = getStr(line,'tip');
      if (v !== null) curr.bestTimeToVisit = { tip: v };
    }
    if (inVisitDur && !(curr.visitDuration && curr.visitDuration.recommended)) {
      const v = getStr(line,'recommended');
      if (v !== null) curr.visitDuration = { recommended: v };
    }
  }

  if (curr && curr.slug) places.push(curr);
  return places;
}

// ============================================================
// REPLACE HISTORY FIELDS IN FILE
// ============================================================

function replaceHistories(content, slugToHistory) {
  const eol = content.includes('\r\n') ? '\r\n' : '\n';
  const lines = content.split(/\r?\n/);
  let currentSlug = null;
  const result = [];

  for (const line of lines) {
    const sm = line.match(/"slug":\s*"([^"]+)"/);
    if (sm) currentSlug = sm[1];

    if (currentSlug && slugToHistory.has(currentSlug) && /^\s+"history":/.test(line)) {
      const indent = (line.match(/^(\s*)/) || ['',''])[1];
      const encoded = JSON.stringify(slugToHistory.get(currentSlug));
      result.push(indent + '"history": ' + encoded + ',');
      continue;
    }
    result.push(line);
  }
  return result.join(eol);
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const enPath = path.join(ROOT, 'constants', 'places.ts');
  const hiPath = path.join(ROOT, 'constants', 'places-hindi.ts');

  console.log('📖 Reading places.ts...');
  const enContent = fs.readFileSync(enPath, 'utf8');
  console.log('📖 Reading places-hindi.ts...');
  const hiContent = fs.readFileSync(hiPath, 'utf8');

  console.log('\n🔍 Parsing English places...');
  const enPlaces = parsePlaces(enContent);
  console.log('   Found ' + enPlaces.length + ' places');

  console.log('🔍 Parsing Hindi places...');
  const hiPlaces = parsePlaces(hiContent);
  console.log('   Found ' + hiPlaces.length + ' places');

  if (enPlaces.length === 0) { console.error('❌ No English places found. Aborting.'); process.exit(1); }
  if (hiPlaces.length === 0) { console.error('❌ No Hindi places found. Aborting.');   process.exit(1); }

  // Backup
  fs.writeFileSync(enPath + '.bak', enContent, 'utf8');
  fs.writeFileSync(hiPath + '.bak', hiContent, 'utf8');
  console.log('\n💾 Backups saved (*.bak)');

  // Generate English
  console.log('\n✍️  Generating English histories...');
  const enMap = new Map();
  for (let i = 0; i < enPlaces.length; i++) {
    enMap.set(enPlaces[i].slug, generateEN(enPlaces[i], i));
    if ((i+1) % 30 === 0 || i+1 === enPlaces.length) console.log('   ' + (i+1) + '/' + enPlaces.length + ' done');
  }

  // Generate Hindi
  console.log('\n✍️  Generating Hindi histories...');
  const hiMap = new Map();
  for (let i = 0; i < hiPlaces.length; i++) {
    hiMap.set(hiPlaces[i].slug, generateHI(hiPlaces[i], i));
    if ((i+1) % 30 === 0 || i+1 === hiPlaces.length) console.log('   ' + (i+1) + '/' + hiPlaces.length + ' done');
  }

  // Write files
  console.log('\n📝 Writing updated places.ts...');
  fs.writeFileSync(enPath, replaceHistories(enContent, enMap), 'utf8');
  console.log('   ✅ Done');

  console.log('📝 Writing updated places-hindi.ts...');
  fs.writeFileSync(hiPath, replaceHistories(hiContent, hiMap), 'utf8');
  console.log('   ✅ Done');

  console.log('\n🎉 Complete!');
  console.log('   English: ' + enMap.size + ' unique histories');
  console.log('   Hindi:   ' + hiMap.size + ' unique histories');
  console.log('   Total:   ' + (enMap.size + hiMap.size) + ' history texts generated');
  console.log('\n💡 Next: npm run build → git add . → git commit → git push');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
