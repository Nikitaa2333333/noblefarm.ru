import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Share2, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface TabContactsProps {
  lang: Language;
}

export default function TabContacts({ lang }: TabContactsProps) {
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  const directions = [
    {
      title: isRU ? 'Профессиональное взаимодействие' : isCN ? '专业级行业互动' : 'Professional Interaction',
      desc: isRU ? 'Обмен опытом с хозяйствами и специалистами.' : isCN ? '与同业牧场及专家开展深度经验交流。' : 'Sharing experience with other farms and specialists.',
    },
    {
      title: isRU ? 'Генетика и племенная работа' : isCN ? '遗传基因与良种选育' : 'Genetics & Breeding',
      desc: isRU ? 'Развитие качественного стада.' : isCN ? '构建发展优质、高抗病性的红鹿种群。' : 'Development of a high-quality pedigree herd.',
    },
    {
      title: isRU ? 'Научные и образовательные проекты' : isCN ? '前沿科学与教育项目' : 'Scientific & Educational Projects',
      desc: isRU ? 'Популяризация отрасли.' : isCN ? '推动现代科学养鹿业的社会化普及。' : 'Popularization of the modern deer farming industry.',
    },
    {
      title: isRU ? 'Пантовое направление' : isCN ? '鹿茸与鹿角产业方向' : 'Velvet Antler Direction',
      desc: isRU ? 'Исследования и развитие.' : isCN ? '深耕产业研发，推动深加工技术落地。' : 'Research and development of deep processing.',
    },
    {
      title: isRU ? 'Сельский туризм и экскурсии' : isCN ? '乡村生态旅游与导览' : 'Rural Tourism & Tours',
      desc: isRU ? 'Перспективные форматы сотрудничества.' : isCN ? '共同开拓具有极高前景的农场观光新模式。' : 'Promising formats of collaborative ecotourism.',
    },
  ];

  const community = [
    {
      title: isRU ? 'Репродуктивные технологии' : isCN ? '辅助生殖繁育技术' : 'Reproductive Technologies',
      region: isRU ? 'Владимирская область' : isCN ? '弗拉基米尔州' : 'Vladimir Region',
      desc: isRU ? 'Обмен опытом в области репродуктивных технологий и развития стада.' : isCN ? '在辅助生殖与种群良种选育领域的经验共享。' : 'Experience sharing in reproductive tech and herd development.',
      photo: '/enhanced_about_2.webp',
    },
    {
      title: isRU ? 'Инфраструктура хозяйств' : isCN ? '牧场基础设施建设' : 'Farm Infrastructure',
      region: isRU ? 'Решения для ферм' : isCN ? '现代化牧场方案' : 'Farm Infrastructure Solutions',
      desc: isRU ? 'Решения для профессионального обустройства современных оленьих хозяйств.' : isCN ? '为现代专业养鹿场提供一流的围栏与基建设计方案。' : 'Professional solutions for setting up modern deer farming environments.',
      photo: '/enhanced_about_3.webp',
    },
    {
      title: isRU ? 'Пантовое направление' : isCN ? '马鹿茸产业实践' : 'Velvet Antler Direction',
      region: isRU ? 'Костромской центр мараловодства' : isCN ? '科斯特罗马马鹿养殖中心' : 'Kostroma Maral Center',
      desc: isRU ? 'Практический опыт в развитии пантового направления и мараловодства.' : isCN ? '在马鹿养殖以及鹿茸科学收茸领域的丰富实践经验。' : 'Practical experience in velvet antler harvesting and maral breeding.',
      photo: '/enhanced_about_6.webp',
    },
  ];

  return (
    <div className="w-full">
      {/* ─── Hero / Header ────────────────────────────────────────────────── */}
      <section className="hero-side-image">
        <div className="hero-side-image__grid">
          <div className="hero-side-image__text">
            <span className="hero-eyebrow">
              {isRU ? 'Обратная связь и диалог' : isCN ? '联系与合作' : 'Contacts & Cooperation'}
            </span>
            <h1 className="hero-title">
              {isRU ? 'Контакты и ' : isCN ? '联系与' : 'Contacts & '}
              <span className="h-section__accent">
                {isRU ? 'партнёрство' : isCN ? '合作' : 'Partnership'}
              </span>
            </h1>
            <p className="hero-desc">
              {isRU
                ? 'Открыты к профессиональному общению, сотрудничеству и развитию современного оленеводства в России.'
                : isCN
                  ? '我们热忱欢迎各界同行、科研机构与商业伙伴开展专业交流、深层合作，共同推动俄罗斯现代养鹿产业的繁荣发展。'
                  : 'We are open to professional communication, cooperation, and the development of modern deer farming in Russia.'}
            </p>
          </div>
          <div className="hero-side-image__media">
            <img src="/enhanced_about_9.webp" alt="Farm gate" />
          </div>
        </div>
      </section>

      {/* ─── 2. Связаться с нами (milky cards, shadow-soft, no borders) ────────── */}
      <section className="section-calm">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Адрес */}
            <a
              href="https://yandex.ru/maps/?text=Московская+область+Дмитров"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-flat flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-8 h-8 text-primary flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="h-block">{isRU ? 'Адрес' : isCN ? '地址' : 'Address'}</h4>
                <p className="body-sm font-semibold mt-2">
                  {isRU ? 'МО, г. Дмитров' : isCN ? '莫斯科州，德米特罗夫市' : 'Moscow region, Dmitrov'}
                </p>
              </div>
              <span className="text-sm font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-4">
                {isRU ? 'Открыть карту' : isCN ? '查看地图位置' : 'Open Map'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Общие вопросы */}
            <a
              href="mailto:kfh-noble@inbox.ru"
              className="group card-flat flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-8 h-8 text-primary flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="h-block">{isRU ? 'Общие вопросы' : isCN ? '电子邮箱' : 'General Enquiries'}</h4>
                <p className="body-sm font-semibold mt-2">
                  kfh-noble@inbox.ru
                </p>
              </div>
              <span className="text-sm font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-4">
                {isRU ? 'Написать письмо' : isCN ? '发送电子邮件' : 'Write Email'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Социальные сети */}
            <div className="card-flat flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-8 h-8 text-primary flex items-center justify-center mb-6">
                  <Share2 className="w-6 h-6" />
                </div>
                <h4 className="h-block">{isRU ? 'Социальные сети' : isCN ? '社交媒体' : 'Social Media'}</h4>
                <div className="flex gap-3 mt-3">
                  <a
                    href="https://vk.ru/kfh_noble?t2fs=cf2fdf36ee78a94985_3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-accent hover:underline transition-colors"
                  >
                    VK
                  </a>
                  <span className="text-text-dark/20">/</span>
                  <a
                    href="https://t.me/kfhNoble"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-accent hover:underline transition-colors"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>

            {/* По вопросам сотрудничества */}
            <a
              href="tel:+79258710937"
              className="group card-flat flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-8 h-8 text-primary flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="h-block">{isRU ? 'По вопросам сотрудничества' : isCN ? '合作热线' : 'Cooperation Hotline'}</h4>
                <p className="body-sm font-semibold mt-2">
                  +7 (925) 871-09-37
                </p>
              </div>
              <span className="text-sm font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-4">
                {isRU ? 'Позвонить сейчас' : isCN ? '即刻拨打电话' : 'Call Now'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 3. Направления сотрудничества (Calm spacious White Section) ───────── */}
      <section className="section-calm pt-0">
        <div className="section-inner flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <h2 className="h-section">
                {isRU ? 'Открыты к ' : isCN ? '诚邀全方位深度' : 'Open to '}
                <span className="h-section__accent">{isRU ? 'сотрудничеству' : isCN ? '合作' : 'Cooperation'}</span>
              </h2>
            </div>
            <div className="lg:col-span-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {directions.map((card, i) => (
              <div key={i} className="card-flat flex flex-col justify-between min-h-[180px] bg-bg-card">
                <h4 className="font-serif text-base font-bold text-text-dark leading-tight">{card.title}</h4>
                <p className="body-sm mt-3">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Профессиональное сообщество (BEM card-feature, aspect-16/10) ──── */}
      <section className="section-calm pt-0">
        <div className="section-inner flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <h2 className="h-section">
                {isRU ? 'Развивая отрасль ' : isCN ? '携手并肩 • 共同开发' : 'Developing the Industry '}
                <span className="h-section__accent">{isRU ? 'вместе' : isCN ? '产业' : 'Together'}</span>
              </h2>
              <p className="body-lead">
                {isRU
                  ? 'Мы ценим профессиональное взаимодействие и считаем, что развитие современного оленеводства возможно только через обмен опытом, открытый диалог и сотрудничество специалистов разных направлений.'
                  : isCN
                    ? '我们高度重视专业领域的精诚互动，并深信，俄罗斯现代高端养鹿产业的发展，只有通过广泛的经验共享、真诚透明的对话以及跨学科专家团队的深度合作，才能够最终变为现实。'
                    : 'We value professional interaction and believe that the development of modern deer farming is possible only through experience exchange, open dialogue, and cooperation of specialists.'}
              </p>
            </div>
            <div className="lg:col-span-5 lg:pt-14">
              <h3 className="h-block">
                {isRU ? 'Наши коллеги и профессиональное окружение' : isCN ? '我们的业内同仁与专业生态圈' : 'Our colleagues and professional environment'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {community.map((item, idx) => (
              <div key={idx} className="card-feature group">
                <div className="card-feature__media aspect-[16/10]">
                  <img src={item.photo} alt={item.title} />
                </div>
                <div className="card-feature__body">
                  <span className="card-feature__eyebrow">{item.region}</span>
                  <h4 className="card-feature__title leading-snug">{item.title}</h4>
                  <p className="card-feature__desc mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center md:text-left">
            <p className="body-sm">
              {isRU
                ? 'Мы считаем важным развитие профессионального сообщества современного оленеводства в России.'
                : isCN
                  ? '我们认为，在俄罗斯推动现代高端红鹿养殖专业化社区的建立与稳步成长具有极其深远的战略意义。'
                  : 'We consider the development of a professional modern deer farming community in Russia to be important.'}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 5. Финальный блок (Strategic Concluding Accent Section / CTA) ──────────── */}
      <section className="section-accent">
        <div className="section-inner flex flex-col gap-10">
          <div className="max-w-3xl section-header">
            <h2 className="h-section-light">
              {isRU ? 'Будем рады ' : isCN ? '诚挚期待与您' : 'We Will Be Glad to '}
              <span className="h-section__accent">{isRU ? 'знакомству' : isCN ? '结识' : 'Connect'}</span>
            </h2>
            <p className="body-lead-light">
              {isRU
                ? 'Если вам близка тема современного оленеводства, развития сельских территорий, генетики или пантового направления — будем рады общению.'
                : isCN
                  ? '如果您也对现代养鹿业开发、乡村生态地区可持续振兴、高端遗传改良或鹿茸精深加工方向怀有浓厚兴趣——我们随时恭候与您开展真诚对话。'
                  : 'If you are interested in modern deer farming, rural development, genetics, or velvet antlers, we would be glad to connect.'}
            </p>
          </div>
          <div className="flex">
            <a
              href="mailto:kfh-noble@inbox.ru"
              className="btn-outline-light"
            >
              {isRU ? 'Связаться с нами' : isCN ? '即刻建立联系' : 'Contact Us'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
