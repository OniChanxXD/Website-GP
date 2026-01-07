/*
 * optimize-images.js
 * Usage: npm install && npm run optimize-images
 * Generates optimized images in images/optimized
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'images');
const outputDir = path.join(inputDir, 'optimized');
const sizes = [400, 800];
const quality = 80;

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

(async () => {
  try {
    const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png)$/i.test(f));
    for (const file of files) {
      const filePath = path.join(inputDir, file);
      const ext = path.extname(file).toLowerCase();
      const base = path.basename(file, ext);

      // Generate resized JPGs
      for (const w of sizes) {
        const out = path.join(outputDir, `${base}-${w}.jpg`);
        await sharp(filePath)
          .resize({ width: w })
          .jpeg({ quality })
          .toFile(out);
        console.log(`Generated: ${out}`);
      }

      // Generate WebP
      const outWebp = path.join(outputDir, `${base}.webp`);
      await sharp(filePath).webp({ quality }).toFile(outWebp);
      console.log(`Generated: ${outWebp}`);
    }
    console.log('Image optimization complete — check images/optimized');
  } catch (err) {
    console.error('Error optimizing images:', err);
  }
})();