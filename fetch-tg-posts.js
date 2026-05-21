import fs from 'fs';
import path from 'path';

const channelUrl = 'https://t.me/s/kfhNoble';

async function fetchTelegramNews() {
  console.log('Fetching Telegram posts from:', channelUrl);
  try {
    const res = await fetch(channelUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch page: ${res.status} ${res.statusText}`);
    }

    const html = await res.text();
    
    // Разделяем HTML по блокам сообщений
    const messageBlocks = html.split('<div class="tgme_widget_message_wrap');
    // Первый элемент - это шапка страницы, убираем его
    messageBlocks.shift();

    const posts = [];

    // Проходим с конца к началу, чтобы получить самые новые посты сначала
    for (let i = messageBlocks.length - 1; i >= 0; i--) {
      const block = messageBlocks[i];

      // Пропускаем видео посты
      const hasVideo = /tgme_widget_message_video|tgme_widget_message_roundvideo|tgme_widget_message_video_player/.test(block);
      if (hasVideo) continue;

      // Извлекаем текст
      const textMatch = block.match(/<div class="tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/);
      if (!textMatch) continue;

      let textHtml = textMatch[1];
      // Очищаем текст от HTML тегов
      let text = textHtml
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?[^>]+(>|$)/g, '')
        .trim();

      if (!text) continue;

      // Извлекаем изображение
      // Картинка может быть в tgme_widget_message_photo_wrap
      const photoMatch = block.match(/class="[^"]*tgme_widget_message_photo_wrap[^"]*"[^>]*style="[^"]*background-image\s*:\s*url\(\s*['"]?([^'")]+)['"]?\s*\)/i);
      
      let imageUrl = null;
      if (photoMatch && photoMatch[1]) {
        imageUrl = photoMatch[1];
      }

      // Если нет изображения, пропускаем по ТЗ
      if (!imageUrl) continue;

      // Ссылка на пост
      const linkMatch = block.match(/href="([^"]*t\.me\/kfhNoble\/\d+)"/);
      let link = linkMatch ? linkMatch[1] : 'https://t.me/kfhNoble';

      // Извлекаем ID поста
      const postIdMatch = link.match(/\/(\d+)$/);
      const id = postIdMatch ? `post-${postIdMatch[1]}` : `post-${Math.random().toString(36).substr(2, 9)}`;

      // Извлекаем дату
      const timeMatch = block.match(/<time[^>]*datetime="([^"]*)"/);
      let dateStr = 'Недавно';
      if (timeMatch && timeMatch[1]) {
        const date = new Date(timeMatch[1]);
        dateStr = date.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }

      // Выделяем заголовок (первая строка текста)
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

      posts.push({
        id,
        date: dateStr,
        title,
        text: textBody,
        image: imageUrl,
        link
      });

      // Нам нужно 3 поста
      if (posts.length >= 6) {
        break;
      }
    }

    const outputPath = path.join('c:/Users/User/Downloads/oooo_template/public', 'telegram-news.json');
    fs.writeFileSync(outputPath, JSON.stringify(posts.slice(0, 3), null, 2), 'utf-8');
    console.log(`Successfully wrote ${posts.length} posts to ${outputPath}`);
    console.log('Preview of posts:');
    console.log(JSON.stringify(posts.slice(0, 3), null, 2));

  } catch (error) {
    console.error('Error fetching Telegram news:', error);
  }
}

fetchTelegramNews();
