const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const projectRoot = path.join(__dirname, '..');
const htmlPath = path.join(projectRoot, 'index.html');
const imagesDir = path.join(projectRoot, 'images');
const optimizedDir = path.join(imagesDir, 'optimized');

if (!fs.existsSync(htmlPath)) {
  console.error('index.html not found');
  process.exit(1);
}

if (!fs.existsSync(optimizedDir)) {
  console.warn('No optimized directory found. Run the optimize-images script first.');
  process.exit(0);
}

const optimizedFiles = fs.readdirSync(optimizedDir);
// map baseName -> list of files
const map = {};
optimizedFiles.forEach(f => {
  const m = f.match(/^(.*?)(?:-(\d+))?\.(jpe?g|webp)$/i);
  if (!m) return;
  const base = m[1];
  map[base] = map[base] || [];
  map[base].push(f);
});

let html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// Replace <img src="images/..."> that do NOT already have data-full
$('img[src^="images/"]').each((i, el) => {
  const $img = $(el);
  if ($img.attr('data-full')) return; // skip carousel images (already processed)

  const src = $img.attr('src');
  const alt = $img.attr('alt') || '';
  const fileName = path.basename(src);
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);

  const available = map[base];
  if (!available) {
    // no optimized files for this image
    console.warn(`No optimized files found for ${fileName}`);
    return;
  }

  // Build picture element using available optimized files
  const webp = available.find(f => /\.webp$/i.test(f));
  const jpg800 = available.find(f => /-800\.jpg$/i.test(f));
  const jpg400 = available.find(f => /-400\.jpg$/i.test(f));

  // fallback to any jpg if 800/400 missing
  let fallback = jpg800 || jpg400 || available.find(f => /\.jpe?g$/i.test(f));
  if (!fallback && webp) fallback = webp;
  if (!fallback) {
    console.warn(`No suitable fallback found for ${fileName}`);
    return;
  }

  const encode = (s) => encodeURIComponent(s).replace(/%20/g, '%20');

  let sourceWebp = webp ? `images/optimized/${encode(webp)}` : null;
  let sourceJpegSrcset = (jpg800 || jpg400) ?
    `images/optimized/${encode(jpg800 || jpg400)} 800w, images/optimized/${encode(jpg400 || jpg800)} 400w` :
    null;

  const picture = ['<picture>'];
  if (sourceWebp) picture.push(`  <source type="image/webp" srcset="${sourceWebp}">`);
  if (sourceJpegSrcset) picture.push(`  <source type="image/jpeg" srcset="${sourceJpegSrcset}" sizes="(max-width: 600px) 400px, 800px">`);
  picture.push(`  <img src="images/optimized/${encode(path.basename(fallback))}" alt="${alt}" loading="lazy" data-full="${src}">`);
  picture.push('</picture>');

  $img.replaceWith(picture.join('\n'));
  console.log(`Replaced ${src} → picture (optimized)`);
});

fs.writeFileSync(htmlPath, $.html(), 'utf8');
console.log('index.html updated with optimized <picture> elements where available.');
