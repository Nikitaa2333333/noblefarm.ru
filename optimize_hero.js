import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const HERO_BACKGROUNDS = [
  { name: 'enhanced_hero_bg.png', isVertical: false },
  { name: 'enhanced_about_1.png', isVertical: false },
  { name: 'enhanced_about_2.png', isVertical: true },
  { name: 'enhanced_about_3.png', isVertical: true },
  { name: 'enhanced_about_4.png', isVertical: true },
  { name: 'enhanced_about_5.png', isVertical: true },
  { name: 'enhanced_about_6.png', isVertical: true },
  { name: 'enhanced_about_7.png', isVertical: true },
  { name: 'enhanced_about_8.png', isVertical: true },
  { name: 'enhanced_about_9.png', isVertical: true },
  { name: 'enhanced_deer_1.png', isVertical: true },
  { name: 'enhanced_deer_2.png', isVertical: true },
  { name: 'enhanced_deer_3.png', isVertical: true },
];

const publicDir = 'c:/Users/User/Downloads/oooo_template/public';

async function optimize() {
  console.log('--- Начинаем оптимизацию изображений для слайдера ---');
  let totalSaved = 0;

  for (const item of HERO_BACKGROUNDS) {
    const srcPath = path.join(publicDir, item.name);
    const destName = item.name.replace('.png', '.webp');
    const destPath = path.join(publicDir, destName);

    if (!fs.existsSync(srcPath)) {
      console.warn(`[WARNING] Файл не найден: ${srcPath}`);
      continue;
    }

    const startSize = fs.statSync(srcPath).size;
    console.log(`\nОбработка ${item.name} (${(startSize / 1024 / 1024).toFixed(2)} MB)...`);

    try {
      let pipeline = sharp(srcPath);

      if (item.isVertical) {
        // Вертикальное изображение: ограничим по высоте до 1280px или по ширине до 1080px
        pipeline = pipeline.resize({
          width: 1080,
          height: 1280,
          fit: 'inside',
          withoutEnlargement: true
        });
      } else {
        // Горизонтальное изображение: ограничим по ширине до 1920px
        pipeline = pipeline.resize({
          width: 1920,
          height: 1080,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      await pipeline
        .webp({ quality: 80, effort: 4 })
        .toFile(destPath);

      const endSize = fs.statSync(destPath).size;
      const saved = startSize - endSize;
      totalSaved += saved;

      console.log(`[SUCCESS] Сжато: ${destName}`);
      console.log(`  До:   ${(startSize / 1024).toFixed(1)} KB`);
      console.log(`  После: ${(endSize / 1024).toFixed(1)} KB`);
      console.log(`  Экономия: ${((saved / startSize) * 100).toFixed(1)}% (${(saved / 1024).toFixed(1)} KB)`);
    } catch (error) {
      console.error(`[ERROR] Ошибка при сжатии ${item.name}:`, error);
    }
  }

  console.log('\n--- Оптимизация завершена ---');
  console.log(`Всего сохранено трафика: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimize();
