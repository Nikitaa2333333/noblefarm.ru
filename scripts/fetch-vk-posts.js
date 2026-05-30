import fs from 'fs';
import path from 'path';
import https from 'https';

const ownerId = -236675004; // ID группы «Благородный Север»
const token = process.env.VK_SERVICE_TOKEN;

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', (err) => reject(err));
  });
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function detectCategory(text) {
  if (!text) return 'Zhizn_fermy';
  const t = text.toLowerCase();
  if (t.includes('#оленята') || t.includes('#олененок') || t.includes('#оленёнок') || t.includes('#малыши')) {
    return 'Olenyata';
  }
  if (t.includes('#панты') || t.includes('#пантовое') || t.includes('#рога')) {
    return 'Panty';
  }
  if (t.includes('#стадо') || t.includes('#выпас') || t.includes('#пастбище')) {
    return 'Stado';
  }
  if (t.includes('#строительство') || t.includes('#загон') || t.includes('#ограждение') || t.includes('#инфраструктура') || t.includes('#вольер') || t.includes('#пастбищ')) {
    return 'Stroitelstvo';
  }
  if (t.includes('#отрасль') || t.includes('#оленеводство') || t.includes('#селекция') || t.includes('#генетика') || t.includes('#бренд') || t.includes('#товарныйзнак')) {
    return 'Otrasl';
  }
  return 'Zhizn_fermy';
}

async function run() {
  if (!token) {
    console.error('Error: VK_SERVICE_TOKEN environment variable is not defined.');
    console.log('Skipping VK news fetch. The website will continue to use DEFAULT_NEWS fallback data.');
    process.exit(0);
  }

  console.log(`Fetching VK posts for owner_id: ${ownerId}...`);
  const apiUrl = `https://api.vk.com/method/wall.get?owner_id=${ownerId}&count=20&access_token=${token}&v=5.131`;

  try {
    const data = await fetchUrl(apiUrl);
    
    if (data.error) {
      throw new Error(`VK API Error: ${data.error.error_msg} (code: ${data.error.error_code})`);
    }

    const items = data.response.items;
    const posts = [];

    for (const item of items) {
      // Пропускаем посты без текста
      if (!item.text) continue;

      // Ищем картинку в прикреплениях
      let imageUrl = null;
      if (item.attachments && Array.isArray(item.attachments)) {
        const photoAttachment = item.attachments.find(att => att.type === 'photo');
        if (photoAttachment && photoAttachment.photo && photoAttachment.photo.sizes) {
          // Сортируем размеры по ширине по убыванию, чтобы взять максимальное разрешение
          const sortedSizes = [...photoAttachment.photo.sizes].sort((a, b) => b.width - a.width);
          if (sortedSizes.length > 0) {
            imageUrl = sortedSizes[0].url;
          }
        }
      }

      // Согласно ТЗ, берем посты только с фотографией
      if (!imageUrl) continue;

      const link = `https://vk.com/wall${ownerId}_${item.id}`;
      const dateStr = formatDate(item.date);

      // Извлекаем заголовок из первой строки текста
      const text = item.text.trim();
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      let title = '';
      let textBody = '';

      if (lines.length > 0) {
        title = lines[0];
        if (title.length > 80) {
          const spaceIndex = title.lastIndexOf(' ', 80);
          const cutIndex = spaceIndex > 20 ? spaceIndex : 80;
          title = title.substring(0, cutIndex) + '...';
          textBody = text;
        } else {
          textBody = lines.slice(1).join('\n');
          if (!textBody) textBody = title;
        }
      } else {
        title = 'Новость проекта';
        textBody = text;
      }

      const category = detectCategory(text);

      posts.push({
        id: `vk_post_${item.id}`,
        date: dateStr,
        title,
        text: textBody,
        image: imageUrl,
        link,
        category
      });

      // Нам нужно до 6 последних новостей
      if (posts.length >= 6) {
        break;
      }
    }

    const outputPath = path.join('public', 'vk-news.json');
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2), 'utf-8');
    console.log(`Successfully fetched and wrote ${posts.length} VK posts to ${outputPath}`);

  } catch (err) {
    console.error('Error fetching VK posts:', err.message);
    console.warn('WARNING: VK news fetch failed. Continuing deployment using existing/fallback news data.');
    process.exit(0);
  }
}

run();
