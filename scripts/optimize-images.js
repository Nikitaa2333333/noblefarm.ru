import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');
const HORIZONTAL = { width: 1920, height: 1080 };
const VERTICAL = { width: 1080, height: 1280 };
const QUALITY = 82;

async function isVertical(srcPath) {
  const { width, height } = await sharp(srcPath).metadata();
  return height > width;
}

async function processFile(srcPath, force) {
  const ext = path.extname(srcPath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null;

  const dir = path.dirname(srcPath);
  const base = path.basename(srcPath, ext);
  const destPath = path.join(dir, `${base}.webp`);

  if (!force && fs.existsSync(destPath)) return { srcPath, destPath, skipped: true };

  const vertical = await isVertical(srcPath);
  const target = vertical ? VERTICAL : HORIZONTAL;

  await sharp(srcPath)
    .resize({ width: target.width, height: target.height, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(destPath);

  return { srcPath, destPath, skipped: false, before: fs.statSync(srcPath).size, after: fs.statSync(destPath).size };
}

async function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const explicit = args.filter(a => !a.startsWith('--'));

  const targets = explicit.length
    ? explicit.map(p => path.resolve(p))
    : (await walk(PUBLIC_DIR)).filter(p => /\.(png|jpe?g)$/i.test(p));

  if (!targets.length) {
    console.log('No images to process.');
    return;
  }

  console.log(`Scanning ${targets.length} candidate(s)...`);
  let savedTotal = 0, converted = 0, skipped = 0;

  for (const src of targets) {
    if (!fs.existsSync(src)) {
      console.warn(`[skip] not found: ${src}`);
      continue;
    }
    try {
      const result = await processFile(src, force);
      if (!result) continue;
      if (result.skipped) {
        skipped++;
        continue;
      }
      converted++;
      const saved = result.before - result.after;
      savedTotal += saved;
      const pct = ((saved / result.before) * 100).toFixed(1);
      console.log(`[ok] ${path.relative(process.cwd(), result.destPath)}  -${pct}%  (${(result.after / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`[err] ${src}:`, err.message);
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} already had .webp, saved ${(savedTotal / 1024 / 1024).toFixed(2)} MB.`);
}

main();
