import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const files = [
  'photo_1_2026-05-21_19-48-40.jpg',
  'photo_4_2026-05-21_19-48-40.jpg',
  'photo_5_2026-05-21_19-48-40.jpg',
  'photo_6_2026-05-21_19-48-40.jpg',
  'photo_7_2026-05-21_19-48-40.jpg',
  'photo_8_2026-05-21_19-48-40.jpg',
  'photo_9_2026-05-21_19-48-40.jpg',
  'photo_10_2026-05-21_19-48-40.jpg',
  'photo_11_2026-05-21_19-48-40.jpg'
];

const sourceDir = 'c:/Users/User/Downloads/oooo_template';
const targetDir = path.join(sourceDir, 'public');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function convert() {
  console.log('Начало конвертации изображений в WebP...');
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const sourcePath = path.join(sourceDir, filename);
    const targetFilename = `about-${i + 1}.webp`;
    const targetPath = path.join(targetDir, targetFilename);

    if (fs.existsSync(sourcePath)) {
      try {
        await sharp(sourcePath)
          .webp({ quality: 85 })
          .toFile(targetPath);
        console.log(`Успешно сконвертировано: ${filename} -> public/${targetFilename}`);
      } catch (err) {
        console.error(`Ошибка при конвертации ${filename}:`, err);
      }
    } else {
      console.warn(`Файл не найден: ${sourcePath}`);
    }
  }
  console.log('Конвертация завершена.');
}

convert();
