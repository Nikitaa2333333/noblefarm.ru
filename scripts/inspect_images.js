import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'c:/Users/User/Downloads/oooo_template/17.06.2026';
async function inspect() {
  const files = fs.readdirSync(dir).filter(f => /\.(png|jpe?g)$/i.test(f));
  for (const file of files) {
    const full = path.join(dir, file);
    try {
      const meta = await sharp(full).metadata();
      console.log(`${file}: ${meta.width}x${meta.height} (${meta.height > meta.width ? 'vertical' : 'horizontal'})`);
    } catch (e) {
      console.error(`Error on ${file}: ${e.message}`);
    }
  }
}
inspect();
