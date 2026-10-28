// ------------------------------------------------------------
// download-images.mjs
// One-time helper that downloads every painting image into
// public/images/<id>.jpg so the website does not depend on
// another website's image server.
//
// The images come from Wikimedia Commons (public-domain copies of
// the Art Institute of Chicago paintings).
//
// Run it with:  node scripts/download-images.mjs
// (Files that already exist in public/images are skipped.)
// (It is also run automatically by .github/workflows/download-images.yml)
// ------------------------------------------------------------
import fs from 'node:fs';

const OUT_DIR = 'public/images';
const USER_AGENT = 'ArtMindAI-eProject/1.0 (https://github.com/paulademolaa/ArtMind-AI-eProject; student project)';

// id: [words that must be in the file name, artist search words, image width,
//      pattern the file name must match, pattern it must NOT match]  (patterns are regular expressions)
const wanted = {
  'improvisation-no-30': ['Improvisation No. 30', 'Kandinsky'],
  'painting-with-green-center': ['Green Center', 'Kandinsky'],
  'composition-no-1-gray-red': ['Gray-Red', 'Mondrian Composition No. 1'],
  'landscape-with-two-poplars': ['Two Poplars', 'Kandinsky'],
  'water-lily-pond': ['Water Lily Pond', 'Monet 1933.441', 1280, '1933.441'],
  'cliff-walk-at-pourville': ['Cliff Walk at Pourville', 'Monet'],
  'auvers-panoramic-view': ['Auvers, Panoramic View', 'Cezanne'],
  'view-of-genoa': ['View of Genoa', 'Corot'],
  'landscape-sunset': ['Landscape, Sunset', 'Inness'],
  'valley-of-aosta': ['Valley of Aosta', 'Turner'],
  'still-life-with-flowers': ['Still Life with Flowers', 'Redon 1988.141'],
  'bouquet-in-earthenware-vase': ['Earthenware Vase', 'Brueghel'],
  'chrysanthemums': ['Chrysanthemums', 'Renoir 1933'],
  'magnolias-on-blue-velvet': ['Magnolias on Light Blue Velvet', 'Heade'],
  'roses-in-a-bowl': ['Roses in a Bowl', 'Fantin-Latour 1964.203'],
  'view-of-cotopaxi': ['Cotopaxi', 'Frederic Edwin Church 1857'],
  'home-of-the-heron': ['Home of the Heron', 'Inness'],
  'distant-view-of-niagara-falls': ['Distant View of Niagara Falls', 'Thomas Cole'],
  'pond-in-the-woods': ['Pond in the Woods', 'Diaz'],
  'mist-rising-in-the-catskills': ['Mist Rising at Sunset', 'Gifford'],
  'the-herring-net': ['The Herring Net', 'Winslow Homer'],
  'two-sisters-on-the-terrace': ['Two Sisters', 'Renoir 1933.455'],
  'the-childs-bath': ["Child's Bath", 'Cassatt'],
  'la-grande-jatte-oil-sketch': ['Oil Sketch', 'Seurat Grande Jatte', 1280, 'Jatte'],
  'interrupted-reading': ['Interrupted Reading', 'Corot'],
  'on-a-balcony': ['On a Balcony', 'Cassatt'],
  'virgin-and-child-with-two-angels': ['Two Angels', 'Botticelli Virgin and Child'],
  'the-annunciation': ['Annunciation', 'George Hitchcock'],
  'saint-martin-and-the-beggar': ['Saint Martin and the Beggar', 'El Greco'],
  'the-crucifixion': ['Crucifixion', 'Carlo Crivelli'],
  'the-adoration-of-the-magi': ['Adoration of the Magi', 'Botticini'],
  // ---- Added to reach 60 paintings ----
  // Abstract
  'composition-vii': ['Composition 7', 'Vassily Kandinsky 1913', 1280, '1913'],
  'composition-viii': ['Composition 8', 'Vassily Kandinsky 1923 Guggenheim', 1280, '1923'],
  'edtaonisl': ['Edtaonisl', 'Francis Picabia'],
  'champs-de-mars-red-tower': ['Delaunay', 'Robert Delaunay Champs de Mars The Red Tower Art Institute', 1280, 'Champs|Red Tower|Tour', 'detail'],
  'black-square': ['Square', 'Kazimir Malevich 1915 Black Suprematic Square Tretyakov', 1280, 'Malevich', 'detail|Red|1923|1929|copy'],
  // Landscape
  'stacks-of-wheat-end-of-summer': ['Stacks of Wheat', 'Claude Monet', 1280, 'End of Summer'],
  'starry-night-over-the-rhone': ['Starry Night', 'Vincent van Gogh Google Art Project', 1280, 'Google Art Project', 'detail'],
  'wheat-field-with-cypresses': ['Wheat Field with Cypresses', 'Vincent van Gogh 1889', 1280, 'Gogh', 'detail|drawing'],
  'impression-sunrise': ['Impression', 'Claude Monet Sunrise soleil levant', 1280, 'Sunrise|soleil'],
  'the-hay-wain': ['Hay Wain', 'John Constable'],
  // Flower
  'sunflowers': ['Sunflowers', 'Vincent van Gogh 1888', 1280, 'Gogh'],
  'irises': ['Irises', 'Vincent van Gogh 1889 Getty', 1280, 'Gogh'],
  'flowers-in-a-vase-ruysch': ['Ruysch', 'Rachel Ruysch Flowers in a Vase', 1280, 'Flower'],
  'flowers-in-an-urn': ['Flowers in an Urn', 'Jan van Huysum'],
  'bouquet-of-sunflowers': ['Sunflowers', 'Claude Monet Bouquet of Sunflowers 1881 Metropolitan', 1280, 'Monet', 'detail|Claude Monet Bouquet of Sunflowers\\.jpg|Gogh'],
  // Nature
  'among-the-sierra-nevada': ['Among the Sierra Nevada', 'Albert Bierstadt'],
  'wanderer-above-the-sea-of-fog': ['Wanderer above the', 'Caspar David Friedrich'],
  'grand-canyon-of-the-yellowstone': ['Moran', 'Thomas Moran The Grand Canyon of the Yellowstone 1872', 1280, 'Grand Canyon of the Yellowstone', 'detail|1893|photo'],
  'twilight-in-the-wilderness': ['Twilight in the Wilderness', 'Frederic Edwin Church'],
  'the-fighting-temeraire': ['Fighting Temeraire', 'J. M. W. Turner'],
  // Figurative
  'girl-with-a-pearl-earring': ['Pearl Earring', 'Johannes Vermeer Girl with a Pearl Earring Mauritshuis', 1280, 'Vermeer|1665|Meisje', 'detail|copy|parody|Vouet'],
  'paris-street-rainy-day': ['Rainy Day', 'Gustave Caillebotte Paris Street'],
  'a-sunday-on-la-grande-jatte': ['Grande Jatte', 'Georges Seurat A Sunday on La Grande Jatte 1884', 1280, 'Sunday|Dimanche', 'sketch|study|rawpixel|detail|Oil|Joy of Museums|frame'],
  'luncheon-of-the-boating-party': ['Luncheon of the Boating Party', 'Pierre-Auguste Renoir'],
  'van-gogh-self-portrait-1887': ['Self-Portrait', 'Vincent van Gogh 1887 Art Institute of Chicago', 1280, 'Art Institute|1954\\.326'],
  // Religious
  'annunciation-leonardo': ['Leonardo', 'Leonardo da Vinci Annunciation Uffizi', 1280, 'Annunc', 'detail|study|drawing|Louvre|restor'],
  'sistine-madonna': ['Madonna', 'Raphael Sistine Madonna Dresden', 1280, 'Sixtin|Sistine', 'detail|cherub|putti'],
  'the-assumption-of-the-virgin': ['Assumption of the Virgin', 'El Greco Art Institute of Chicago', 1280, 'Greco'],
  'the-calling-of-saint-matthew': ['Calling of', 'Caravaggio Saint Matthew', 1280, 'Matth', 'detail'],

  'hero-water-lily-pond': ['Water Lily Pond', 'Monet 1917-19 1982.825', 1920, '1982.825'],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(res.status + ' ' + url);
  return res.json();
}

// Search Commons for files and return them in search order.
async function search(text, width) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=20' +
    '&gsrsearch=' + encodeURIComponent(text) +
    '&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=' + width;
  const data = await getJson(url);
  if (!data.query) return [];
  return Object.values(data.query.pages).sort((a, b) => a.index - b.index);
}

const normal = (s) => s.toLowerCase().replace(/[’']/g, "'");

async function findFile(key, who, width, must = '', avoid = '') {
  let pages = [];
  for (const q of [`${who} ${key} Art Institute of Chicago`, `${who} ${key}`, key + ' Art Institute of Chicago']) {
    pages = pages.concat(await search(q, width));
    await sleep(300);
  }
  const good = pages.filter((p) => {
    const info = p.imageinfo && p.imageinfo[0];
    return (
      info &&
      normal(p.title).includes(normal(key)) &&
      (!must || new RegExp(must, 'i').test(p.title)) &&
      (!avoid || !new RegExp(avoid, 'i').test(p.title)) &&
      /image\/(jpeg|png)/.test(info.mime) &&
      info.width >= 900 &&
      !/detail|frame/i.test(p.title)
    );
  });
  // Prefer the museum's own upload (file names with "Art Institute" or an accession number)
  return good.find((p) => /art institute|\d{4}\.\d+/i.test(p.title)) || good[0];
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const credits = ['# Image credits', '', 'Downloaded from Wikimedia Commons (public domain).', '', '| File | Source |', '|---|---|'];
const missing = [];

for (const [id, [key, who, width = 1280, must, avoid]] of Object.entries(wanted)) {
  const target = `${OUT_DIR}/${id}.jpg`;
  try {
    const file = await findFile(key, who, width, must, avoid);
    if (!file) {
      missing.push(id);
      console.log('MISSING', id);
      continue;
    }
    const info = file.imageinfo[0];
    credits.push(`| ${id}.jpg | [${file.title.replace('File:', '')}](${info.descriptionurl}) |`);
    if (!fs.existsSync(target)) {
      const res = await fetch(info.thumburl || info.url, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) throw new Error('download ' + res.status);
      fs.writeFileSync(target, Buffer.from(await res.arrayBuffer()));
    }
    console.log('OK', id, '<-', file.title);
    await sleep(500);
  } catch (error) {
    missing.push(id);
    console.log('ERROR', id, error.message);
  }
}

if (missing.length) credits.push('', 'Missing: ' + missing.join(', '));
fs.writeFileSync(`${OUT_DIR}/CREDITS.md`, credits.join('\n') + '\n');
console.log('Done. Missing:', missing.length ? missing.join(', ') : 'none');
