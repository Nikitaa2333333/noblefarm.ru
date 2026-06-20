import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'c:/Users/User/Downloads/oooo_template/17.06.2026';
const PUBLIC_DIR = 'c:/Users/User/Downloads/oooo_template/public';

const HORIZONTAL = { width: 1920, height: 1080 };
const VERTICAL = { width: 1080, height: 1280 };
const QUALITY = 82;

const MAPPINGS = [
  // 1. Hero backgrounds (Main page)
  { src: '1.1 DSC_0384.jpg', dest: ['hero_1.webp'], type: 'horizontal' },
  { src: '1.2 DSC_0471.jpg', dest: ['hero_2.webp'], type: 'horizontal' },
  { src: '1.3 DSC_0577.jpg', dest: ['hero_3.webp'], type: 'horizontal' },
  
  // 2. Under hero image
  { src: '2.png', dest: ['under_hero.webp'], type: 'horizontal' },

  // 3. Project Directions (Main page cards)
  { src: '2.1 DSC_0679.jpg', dest: ['about-2.webp', 'opt/about-2.webp'], type: 'horizontal', crop: 'attention' },
  { src: '2.2 DSC_9858.jpg', dest: ['about-4.webp', 'opt/about-4.webp'], type: 'horizontal', crop: 'attention' },
  { src: '2.3 DSC_0554.jpg', dest: ['about-6.webp', 'opt/about-6.webp'], type: 'horizontal', crop: 'attention' },
  { src: '2.4 DSC_9223.jpg', dest: ['about-8.webp', 'opt/about-8.webp'], type: 'horizontal', crop: 'attention' },

  // 4. Philosophy
  { src: '3.1 DSC_9484.jpg', dest: ['philosophy_1.webp'], type: 'horizontal' },
  { src: '3.2 DSC_9485.jpg', dest: ['philosophy_2.webp'], type: 'horizontal' },
  { src: '3.3 DSC_9486.jpg', dest: ['philosophy_3.webp'], type: 'horizontal' },
  { src: '3.4 DSC_9480.jpg', dest: ['family_project.webp'], type: 'vertical' },
  { src: '3.5 DSC_9466.jpg', dest: ['principles_bg.webp'], type: 'horizontal' },
  { src: '3.6 Марал.jpg', dest: ['Maral.jpg', 'Maral.webp'], type: 'custom-maral' },
  { src: '3.7 Европейский.jpg', dest: ['enhanced_deer_1.webp'], type: 'vertical' },
  { src: '3.8.png', dest: ['russia_future.webp'], type: 'horizontal' },

  // 5. Industry regions
  { src: '4.1.jpg', dest: ['industry_nz_1.webp'], type: 'horizontal' },
  { src: '4.2.jpg', dest: ['industry_nz_2.webp'], type: 'horizontal' },
  { src: '4.3.jpg', dest: ['industry_nz_3.webp'], type: 'horizontal' },
  { src: '4.4.jpg', dest: ['industry_nz_4.webp'], type: 'horizontal' },
  { src: '4.5.jpg', dest: ['industry_nz_5.webp'], type: 'horizontal' },
  { src: '5.1.jpg', dest: ['industry_eu_1.webp'], type: 'horizontal' },
  { src: '5.2.jpg', dest: ['industry_eu_2.webp'], type: 'horizontal' },
  { src: '5.3.jpg', dest: ['industry_eu_3.webp'], type: 'horizontal' },
  { src: '5.4.jpg', dest: ['industry_eu_4.webp'], type: 'horizontal' },
  { src: '6.1.jpg', dest: ['industry_asia_1.webp'], type: 'horizontal' },
  { src: '6.2.jpg', dest: ['industry_asia_2.webp'], type: 'horizontal' },
  { src: '7.1.jpg', dest: ['industry_na_1.webp'], type: 'horizontal' },
  { src: '7.2.jpg', dest: ['industry_na_2.webp'], type: 'horizontal' },
  { src: '7.3.jpg', dest: ['industry_na_3.webp'], type: 'horizontal' },
  { src: '7.4.jpg', dest: ['industry_na_4.webp'], type: 'horizontal' },
  { src: '8.png', dest: ['russia_player.webp'], type: 'horizontal' },

  // 6. Contacts
  { src: '9..jpg', dest: ['contacts_hero.webp'], type: 'horizontal' },

  // 7. Media
  { src: '10.jpg', dest: ['media_hero.webp'], type: 'horizontal' },

  // 8. Popularization
  { src: '11.1 DSC_9289.jpg', dest: ['pop_hero_1.webp'], type: 'horizontal' },
  { src: '11.2 DSC_9290.jpg', dest: ['pop_hero_2.webp'], type: 'horizontal' },
  { src: '11.3 DSC_9291.jpg', dest: ['pop_hero_3.webp'], type: 'horizontal' },
  { src: '12 DSC_0800.jpg', dest: ['pop_excursions.webp'], type: 'horizontal' },
  { src: '13.1 DSC_0504.jpg', dest: ['pop_carousel_1.webp'], type: 'horizontal' },
  { src: '13.2 DSC_9430.jpg', dest: ['pop_carousel_2.webp'], type: 'horizontal' },
  { src: '13.3 DSC_0479.jpg', dest: ['pop_carousel_3.webp'], type: 'horizontal' },
  { src: '13.4 DSC_9244.jpg', dest: ['pop_carousel_4.webp'], type: 'horizontal' },
  { src: '13.5.jpg', dest: ['pop_carousel_5.webp'], type: 'horizontal' },

  // 9. Antlers
  { src: '14..jpg', dest: ['antlers_hero.webp'], type: 'horizontal' },
];

async function processImage(mapping) {
  const srcPath = path.join(SOURCE_DIR, mapping.src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`[warning] Source file not found: ${srcPath}`);
    return;
  }

  for (const destFile of mapping.dest) {
    const destPath = path.join(PUBLIC_DIR, destFile);
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    let pipeline = sharp(srcPath);

    if (mapping.type === 'horizontal') {
      pipeline = pipeline.resize({
        width: HORIZONTAL.width,
        height: HORIZONTAL.height,
        fit: mapping.crop ? 'cover' : 'inside',
        position: mapping.crop === 'attention' ? sharp.strategy.attention : 'center',
        withoutEnlargement: true
      });
    } else if (mapping.type === 'vertical') {
      pipeline = pipeline.resize({
        width: VERTICAL.width,
        height: VERTICAL.height,
        fit: 'cover',
        withoutEnlargement: true
      });
    } else if (mapping.type === 'custom-maral') {
      // 3.6 Марал.jpg has dimensions 750x693, we keep its dimensions and fit inside.
      pipeline = pipeline.resize({
        width: 750,
        height: 693,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    const isWebp = destFile.endsWith('.webp');
    if (isWebp) {
      pipeline = pipeline.webp({ quality: QUALITY, effort: 4 });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY });
    }

    await pipeline.toFile(destPath);
    const beforeSize = (fs.statSync(srcPath).size / 1024).toFixed(1);
    const afterSize = (fs.statSync(destPath).size / 1024).toFixed(1);
    console.log(`[ok] Processed: ${mapping.src} -> ${destFile} (${beforeSize} KB -> ${afterSize} KB)`);
  }
}

async function main() {
  console.log('Starting custom image processing and optimization...');
  for (const mapping of MAPPINGS) {
    try {
      await processImage(mapping);
    } catch (err) {
      console.error(`[err] Failed to process ${mapping.src}: ${err.message}`);
    }
  }
  console.log('All images processed successfully.');
}

main();
