/**
 * Благородный Север — приём B2B-заявок с формы на /#presentation.
 *
 * Одна точка приёма для сайта: он шлёт POST сюда, а этот скрипт уже сам
 * рассылает заявку по трём адресам — Telegram, почта, строка в таблице.
 *
 * Почему не напрямую из браузера: api.telegram.org в РФ недоступен без VPN,
 * поэтому у российского посетителя отправка молча падает. Серверам Google
 * Telegram доступен. Плюс токен бота лежит здесь (Script Properties), а не в
 * коде сайта, который скачивает каждый браузер.
 *
 * НАСТРОЙКА (один раз, делает владелец):
 *  1. Project Settings (шестерёнка) → Script Properties → Add:
 *       TELEGRAM_BOT_TOKEN = токен от @BotFather
 *       TELEGRAM_CHAT_IDS  = id чатов через запятую, напр. 1088570591,5139188030
 *       MAIL_TO            = почта для заявок, можно несколько через запятую
 *  2. Выбрать вверху функцию authorize → ▶ Выполнить → разрешить доступ
 *     (включает UrlFetchApp и MailApp; без этого Telegram и почта молча не уйдут).
 *  3. Deploy → New deployment → Web app → Execute as: Me,
 *     Who has access: Anyone → скопировать URL /exec и отдать разработчику.
 *  ВАЖНО: после любой правки кода — Deploy → Manage deployments → карандаш →
 *  Version: New version → Deploy. Иначе /exec продолжит отдавать старую версию.
 */

function doPost(e) {
  var d = JSON.parse(e.postData.contents);

  notifyTelegram(d);   // сначала уведомления: даже если запись упадёт, заявка дойдёт
  notifyEmail(d);
  appendRow(d);

  return ContentService.createTextOutput('ok');
}

/** Человекочитаемый текст заявки — общий для Telegram и письма. */
function buildText(d) {
  return [
    'Новая заявка с сайта noblefarm.ru',
    '',
    'Организация: ' + (d.company || '—'),
    'Сфера деятельности: ' + (d.activity || '—'),
    'Контактное лицо: ' + (d.name || '—'),
    'Город и регион: ' + (d.region || '—'),
    'Телефон: ' + (d.phone || '—'),
    'Почта: ' + (d.email || '—'),
    'Интересующие направления: ' + (d.interests || '—'),
    'Комментарий: ' + (d.comment || '—'),
    'Согласие на обработку ПД: ' + (d.consent || '—'),
    '',
    'Страница: ' + (d.page_url || '—')
  ].join('\n');
}

function notifyTelegram(d) {
  // try/catch, чтобы сбой Telegram не сорвал письмо и запись в таблицу.
  try {
    var props = PropertiesService.getScriptProperties();
    var token = props.getProperty('TELEGRAM_BOT_TOKEN');
    var chats = (props.getProperty('TELEGRAM_CHAT_IDS') || '').split(',');
    if (!token) return;

    var text = buildText(d);
    chats.forEach(function (id) {
      id = id.trim();
      if (!id) return;
      UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
        method: 'post',
        payload: { chat_id: id, text: text },
        muteHttpExceptions: true
      });
    });
  } catch (err) {}
}

function notifyEmail(d) {
  try {
    var to = PropertiesService.getScriptProperties().getProperty('MAIL_TO');
    if (!to) return;

    MailApp.sendEmail({
      to: to,
      subject: 'Заявка с сайта: ' + (d.company || d.name || 'без названия'),
      body: buildText(d),
      // ответ уходит сразу партнёру, а не в пустоту
      replyTo: (d.email || '').indexOf('@') > 0 ? d.email : undefined,
      name: 'Благородный Север'
    });
  } catch (err) {}
}

function appendRow(d) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([
    new Date(),
    d.company || '',
    d.activity || '',
    d.name || '',
    d.region || '',
    "'" + (d.phone || ''),   // апостроф — чтобы «+7…» не превратился в формулу
    d.email || '',
    d.interests || '',
    d.comment || '',
    d.consent || '',
    d.page_url || ''
  ]);
}

/**
 * Запустить один раз кнопкой «Выполнить» — выдать разрешения (UrlFetchApp, MailApp).
 * Если Script Properties заполнены, заодно придёт проверочная заявка в Telegram и на почту.
 */
function authorize() {
  var probe = {
    company: 'Проверка связи',
    name: 'authorize()',
    email: '',
    page_url: 'Apps Script'
  };
  notifyTelegram(probe);
  notifyEmail(probe);
}
