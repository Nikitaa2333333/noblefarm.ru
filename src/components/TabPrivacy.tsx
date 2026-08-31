import { motion } from 'motion/react';
import { Language } from '../translations';

interface TabPrivacyProps {
  lang: Language;
}

/**
 * Политика обработки персональных данных (152-ФЗ).
 * Оператор и реквизиты — те же, что на вкладке «Контакты» (Реквизиты.docx).
 * Текст юридический: RU — основной, EN/CN — краткое изложение того же смысла.
 */
export default function TabPrivacy({ lang }: TabPrivacyProps) {
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  const sections = isRU
    ? [
        {
          title: '1. Общие положения',
          body: [
            'Настоящая Политика определяет порядок обработки персональных данных посетителей сайта noblefarm.ru и меры по обеспечению их безопасности.',
            'Оператор персональных данных: гК(Ф)Х ИП Дерюгин П.С., ИНН 773170493306, адрес: Российская Федерация, Московская область, Дмитровский городской округ, деревня Василево, д. 38С, электронная почта kfh-noble@inbox.ru.',
            'Отправляя форму на сайте, посетитель подтверждает согласие с настоящей Политикой. Если вы не согласны с её условиями, не заполняйте формы на сайте.',
          ],
        },
        {
          title: '2. Какие данные мы обрабатываем',
          body: [
            'Через форму запроса для партнёров: название организации, сфера деятельности, фамилия, имя и отчество контактного лица, город и регион, номер телефона, адрес электронной почты, выбранные направления сотрудничества и текст комментария.',
            'Специальные категории персональных данных и биометрические персональные данные не собираются и не обрабатываются.',
          ],
        },
        {
          title: '3. Цели обработки',
          body: [
            'Данные обрабатываются исключительно для того, чтобы ответить на запрос, обсудить условия сотрудничества и направить запрошенные материалы о проекте.',
            'Для рекламных рассылок данные не используются, если посетитель отдельно не выразил на это согласие.',
          ],
        },
        {
          title: '4. Правовые основания',
          body: [
            'Обработка осуществляется на основании согласия субъекта персональных данных, которое даётся при отправке формы (пункт 1 части 1 статьи 6 Федерального закона № 152-ФЗ «О персональных данных»).',
          ],
        },
        {
          title: '5. Передача данных',
          body: [
            'Данные формы передаются оператору по защищённому соединению и обрабатываются с использованием технических средств, обеспечивающих их сохранность и ограниченный доступ.',
            'Третьим лицам для самостоятельных целей данные не передаются, за исключением случаев, прямо предусмотренных законодательством Российской Федерации.',
          ],
        },
        {
          title: '6. Сроки хранения',
          body: [
            'Данные хранятся не дольше, чем этого требуют цели обработки, и удаляются по достижении целей либо по отзыву согласия — в срок, не превышающий 30 дней с момента получения обращения.',
          ],
        },
        {
          title: '7. Права посетителя',
          body: [
            'Посетитель вправе получить сведения об обработке своих данных, потребовать их уточнения, блокирования или уничтожения, а также в любой момент отозвать согласие на обработку.',
            'Для этого достаточно направить обращение на электронную почту kfh-noble@inbox.ru. Ответ направляется на адрес, с которого поступило обращение.',
          ],
        },
        {
          title: '8. Файлы cookie и статистика',
          body: [
            'Сайт может использовать файлы cookie и сервисы веб-аналитики для сбора обезличенных сведений о посещаемости. Эти сведения не позволяют установить личность посетителя. Отключить cookie можно в настройках браузера.',
          ],
        },
        {
          title: '9. Изменения Политики',
          body: [
            'Оператор вправе вносить изменения в настоящую Политику. Действующая редакция всегда доступна на этой странице.',
            'Редакция от 31 августа 2026 года.',
          ],
        },
      ]
    : isCN
      ? [
          {
            title: '1. 总则',
            body: [
              '本政策规定了 noblefarm.ru 网站访问者个人数据的处理规则及安全保障措施。',
              '数据处理者：гК(Ф)Х ИП Дерюгин П.С.，纳税人识别号 773170493306，地址：俄罗斯联邦莫斯科州德米特罗夫市василево村38С号，邮箱 kfh-noble@inbox.ru。',
              '提交网站表单即表示访问者同意本政策。若不同意，请勿填写表单。',
            ],
          },
          {
            title: '2. 处理的数据',
            body: [
              '合作伙伴申请表：公司名称、业务领域、联系人姓名、城市与地区、电话、电子邮箱、所选合作方向及备注内容。',
              '不收集特殊类别个人数据与生物识别数据。',
            ],
          },
          {
            title: '3. 处理目的',
            body: [
              '数据仅用于回复咨询、洽谈合作条件并发送项目资料。',
              '未经单独同意，不用于广告推送。',
            ],
          },
          {
            title: '4. 数据传输与存储',
            body: [
              '表单数据通过加密连接传输，并采用可保障数据安全、限制访问权限的技术手段进行处理。',
              '除法律明确规定的情形外，不向第三方转让数据。',
            ],
          },
          {
            title: '5. 访问者权利',
            body: [
              '访问者有权了解其数据的处理情况，要求更正、封存或删除数据，并可随时撤回同意。',
              '请发送邮件至 kfh-noble@inbox.ru。数据保存期不超过实现处理目的所必需的期限。',
            ],
          },
          {
            title: '6. 政策变更',
            body: ['处理者有权修改本政策，最新版本始终发布于本页面。2026 年 8 月 31 日版本。'],
          },
        ]
      : [
          {
            title: '1. General provisions',
            body: [
              'This Policy sets out how personal data of visitors to noblefarm.ru is processed and protected.',
              'Data operator: гК(Ф)Х ИП Дерюгин П.С., INN 773170493306, address: Vasilevo village 38S, Dmitrov district, Moscow Region, Russian Federation, email kfh-noble@inbox.ru.',
              'By submitting a form on the site, the visitor confirms acceptance of this Policy. If you do not agree with it, please do not fill in the forms.',
            ],
          },
          {
            title: '2. Data we process',
            body: [
              'Through the partner request form: company name, field of activity, contact person name, city and region, phone number, email address, selected cooperation directions and comment text.',
              'Special categories of personal data and biometric data are neither collected nor processed.',
            ],
          },
          {
            title: '3. Purposes of processing',
            body: [
              'Data is used solely to reply to the request, discuss cooperation terms and send the requested project materials.',
              'It is not used for marketing mailings unless the visitor has given separate consent.',
            ],
          },
          {
            title: '4. Transfer and storage',
            body: [
              'Form data is transmitted over a secure connection and processed using technical means that ensure its safety and restricted access.',
              'Data is not transferred to third parties for their own purposes, except as required by the law of the Russian Federation.',
            ],
          },
          {
            title: '5. Visitor rights',
            body: [
              'The visitor may request information about the processing of their data, ask for it to be corrected, blocked or deleted, and withdraw consent at any time.',
              'Write to kfh-noble@inbox.ru. Data is kept no longer than the purposes of processing require.',
            ],
          },
          {
            title: '6. Changes to the Policy',
            body: ['The operator may amend this Policy; the current version is always published on this page. Version of 31 August 2026.'],
          },
        ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <section className="hero-side-image">
        <div className="hero-side-image__grid">
          <div className="hero-side-image__text">
            <span className="hero-eyebrow">
              {isRU ? 'Правовая информация' : isCN ? '法律信息' : 'Legal information'}
            </span>
            <h1 className="hero-title">
              {isRU
                ? 'Политика обработки персональных данных'
                : isCN
                  ? '个人数据处理政策'
                  : 'Personal Data Processing Policy'}
            </h1>
            <p className="hero-desc">
              {isRU
                ? 'Как мы собираем, используем и защищаем данные, которые вы оставляете на сайте.'
                : isCN
                  ? '我们如何收集、使用并保护您在本网站留下的数据。'
                  : 'How we collect, use and protect the data you leave on the site.'}
            </p>
          </div>
          <div className="hero-side-image__media">
            <img src="/under_hero.webp" alt={isRU ? 'Ферма' : 'Farm'} />
          </div>
        </div>
      </section>

      <section className="section-calm">
        <div className="section-inner flex flex-col gap-10">
          {sections.map((block) => (
            <div key={block.title} className="flex flex-col gap-4 max-w-[78ch]">
              <h2 className="h-block">{block.title}</h2>
              {block.body.map((p, i) => (
                <p key={i} className="body-sm">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
