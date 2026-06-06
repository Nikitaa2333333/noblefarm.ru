import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface TabMediaProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

interface Publication {
  id: string;
  title: string;
  outlet: string;
  date: string;
  desc: string;
  image: string;
  url: string;
}

const PUBLICATIONS: Publication[] = [
  {
    id: 'minselhoz-vk',
    title: 'В Подмосковье впервые начали разводить оленей новой породы',
    outlet: 'Минсельхоз МО',
    date: '25 декабря 2025',
    desc: 'В Дмитровском округе открылась первая ферма по разведению благородных оленей. Ветеринарный осмотр прошли 16 животных, в планах — пантовое направление.',
    image: '/enhanced_about_5.webp',
    url: 'https://vk.com/wall-217122567_4534',
  },
  {
    id: 'regions-dmitrov',
    title: 'Пантовая продукция и личные экскурсии: почему «Благородный Север» станет новым трендом Подмосковья',
    outlet: 'Regions.ru — Дмитров',
    date: '28 мая 2026',
    desc: 'Семейное хозяйство Павла Дерюгина и Екатерины Валовой в Дмитровском округе — необычный для региона проект: ферма благородных европейских оленей.',
    image: '/pub-regions-dmitrov.jpg',
    url: 'https://regions.ru/dmitrov/obschestvo/pantovaja-produktsija-i-lichnye-ekskursii-pochemu-blagorodnyj-sever-stanet-novym-trendom-podmoskovja',
  },
  {
    id: 'mosreg-fawn',
    title: 'Первый оленёнок благородного оленя родился на ферме в Подмосковье',
    outlet: 'Правительство Московской области',
    date: '',
    desc: 'Новость о рождении первого оленёнка на ферме «Благородный Север» в Дмитровском округе.',
    image: '/enhanced_deer_2.webp',
    url: 'https://mosreg.ru/sobytiya/novosti/news-submoscow/pervyi-olenenok-blagorodnogo-olenya-rodilsya-na-ferme-v-podmoskove',
  },
  {
    id: 'invest-mosreg',
    title: 'Инвестпортал Подмосковья — о ферме «Благородный Север»',
    outlet: 'Инвестпортал Подмосковья',
    date: '',
    desc: 'Публикация о развитии проекта и инвестиционном потенциале современного оленеводства в Дмитровском округе.',
    image: '/enhanced_about_8.webp',
    url: 'https://invest.mosreg.ru/press/news/6439',
  },
  {
    id: 'radio1-vk',
    title: 'Интервью на «Радио 1» с основателем «Благородный Север»',
    outlet: 'Радио 1',
    date: '',
    desc: 'Беседа с основателем фермы о запуске разведения благородных европейских оленей в Подмосковье.',
    image: '/enhanced_about_3.webp',
    url: 'https://vk.com/wall-50051746_57748',
  },
];

export default function TabMedia({ lang, onSwitchTab }: TabMediaProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';
  const ctaSource = isRU ? 'Читать на источнике' : isCN ? '查看原文' : 'Read at source';

  const topics = isRU
    ? [
        'Современное оленеводство',
        'Благородный европейский олень',
        'Пантовое направление',
        'Развитие новых сельскохозяйственных направлений в России',
        'Сельский туризм и открытые хозяйства',
      ]
    : isCN
    ? [
        '现代养鹿业',
        '欧洲红鹿品系',
        '鹿茸与鹿角开发',
        '俄罗斯新兴农业方向',
        '乡村旅游与生态科普农场',
      ]
    : [
        'Modern deer farming',
        'European Red Deer',
        'Velvet antler direction',
        'Development of new agricultural sectors in Russia',
        'Rural tourism and open eco-farms',
      ];

  const outlets = [
    { name: 'Агроинвестор', nameEN: 'Agroinvestor', nameCN: 'Agroinvestor', image: '/agro.jpg', url: 'https://agroinvestor.ru' },
    { name: 'The Village', nameEN: 'The Village', nameCN: 'The Village', image: '/vill.png', url: 'https://www.the-village.ru' },
    { name: 'РБК', nameEN: 'RBC', nameCN: 'RBC', image: '/rbk.png', url: 'https://www.rbc.ru' },
    { name: 'Fermer.ru', nameEN: 'Fermer.ru', nameCN: 'Fermer.ru', image: '/channels4_profile.jpg', url: 'https://fermer.ru' },
  ];

  return (
    <div className="w-full">
      {/* ─── Hero / Header ────────────────────────────────────────────────── */}
      <section className="hero-side-image">
        <div className="hero-side-image__grid">
          <div className="hero-side-image__text">
            <span className="hero-eyebrow">
              {isRU ? 'Публикации и интервью' : isCN ? '媒体报道与访谈' : 'Publications & Interviews'}
            </span>
            <h1 className="hero-title">
              {isRU ? 'В ' : isCN ? '媒体' : 'In the '}
              <span className="h-section__accent">
                {isRU ? 'СМИ' : isCN ? '报道' : 'Media'}
              </span>
            </h1>
            <p className="hero-desc">
              {isRU
                ? 'Публикации, интервью и материалы о проекте «Благородный Север» и развитию современного оленеводства в России.'
                : isCN
                  ? '关于“高贵北方”项目以及俄罗斯现代养鹿业发展的出版物、采访与报道资料。'
                  : 'Publications, interviews, and materials about the "Noble Sever" project and the development of modern deer farming in Russia.'}
            </p>
          </div>
          <div className="hero-side-image__media">
            <img src="/enhanced_about_7.webp" alt="Media" />
          </div>
        </div>
      </section>

      {/* ─── Publications Section ─────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <h2 className="h-section">
                {isRU ? 'Главные ' : isCN ? '重点' : 'Key '}
                <span className="h-section__accent">{isRU ? 'публикации' : isCN ? '报道' : 'Publications'}</span>
              </h2>
            </div>
            <div className="lg:col-span-5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Feature Video Card using canonical card-feature styling */}
            <div className="card-feature group">
              <div 
                className="card-feature__media aspect-[16/10] cursor-pointer"
                onClick={() => !isVideoPlaying && setIsVideoPlaying(true)}
              >
                {isVideoPlaying ? (
                  <iframe 
                    src="https://vk.com/video_ext.php?oid=-236675004&id=456239040&autoplay=1" 
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" 
                    frameBorder="0" 
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src="/enhanced_about_1.webp" alt="Video Preview" />
                    <div className="absolute inset-0 bg-secondary/20 transition-opacity duration-300 group-hover:bg-secondary/15" />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-bg-card/95 rounded-full flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-primary ml-1" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="card-feature__body">
                <span className="card-feature__eyebrow">
                  {isRU ? 'Источник • VKontakte • 24–25 января 2026' : isCN ? '来源 • VK 视频 • 2026年1月24日至25日' : 'Source • VKontakte • Jan 24–25, 2026'}
                </span>
                <h3 className="card-feature__title">
                  {isRU ? 'Интервью «Бизнес ланч»' : isCN ? '《商业午餐》节目专访' : 'Business Lunch Interview'}
                </h3>
                <p className="card-feature__desc">
                  {isRU
                    ? 'О развитии благородного оленеводства в Московской области. Программа «Бизнес ланч» 24-01-2026 и 25-01-2026.'
                    : isCN
                      ? '深入探讨莫斯科州欧洲红鹿养殖业的现代化发展。收录于2026年1月24日至25日播出的《商业午餐》节目。'
                      : 'On the development of European Red Deer farming in the Moscow region. Featured on the "Business Lunch" program on Jan 24-25, 2026.'}
                </p>
                <button 
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)} 
                  className="card-feature__cta cursor-pointer bg-transparent border-none text-left p-0 text-accent font-semibold flex items-center gap-1.5 focus:outline-none focus:ring-0 focus-visible:outline-none"
                >
                  {isVideoPlaying 
                    ? (isRU ? 'Закрыть видеоплеер' : isCN ? '关闭视频播放器' : 'Close Player')
                    : (isRU ? 'Смотреть интервью' : isCN ? '观看采访视频' : 'Watch Interview')
                  }
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* First publication — Минсельхоз — sits next to video as second feature */}
            <a
              href={PUBLICATIONS[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-feature group"
            >
              <div className="card-feature__media aspect-[16/10]">
                <img src={PUBLICATIONS[0].image} alt={PUBLICATIONS[0].title} loading="lazy" />
              </div>
              <div className="card-feature__body">
                <span className="card-feature__eyebrow">
                  {PUBLICATIONS[0].outlet}
                  {PUBLICATIONS[0].date ? ` • ${PUBLICATIONS[0].date}` : ''}
                </span>
                <h3 className="card-feature__title line-clamp-3">{PUBLICATIONS[0].title}</h3>
                <p className="card-feature__desc line-clamp-3">{PUBLICATIONS[0].desc}</p>
                <span className="card-feature__cta">
                  {ctaSource} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>

          {/* Остальные публикации — 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PUBLICATIONS.slice(1).map((pub) => (
              <a
                key={pub.id}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-feature group"
              >
                <div className="card-feature__media aspect-[16/10]">
                  <img src={pub.image} alt={pub.title} loading="lazy" />
                </div>
                <div className="card-feature__body">
                  <span className="card-feature__eyebrow">
                    {pub.outlet}
                    {pub.date ? ` • ${pub.date}` : ''}
                  </span>
                  <h3 className="card-feature__title line-clamp-3">{pub.title}</h3>
                  <p className="card-feature__desc line-clamp-3">{pub.desc}</p>
                  <span className="card-feature__cta">
                    {ctaSource} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Outlets Logos Section ─── */}
      <section className="section-calm pt-0">
        <div className="section-inner flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <h2 className="h-section">
                {isRU ? 'В партнёрстве с профессиональными изданиями' : isCN ? '与专业行业媒体紧密合作' : 'In Partnership with Professional Publications'}
              </h2>
            </div>
            <div className="lg:col-span-5" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {outlets.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-6 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <div className="w-full aspect-square flex items-center justify-center p-8 md:p-10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-sm font-medium text-text-dark text-center">
                  {isRU ? item.name : isCN ? item.nameCN : item.nameEN}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── For Journalists Section (High-impact concluding green block) ─────── */}
      <section className="section-accent">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="section-header">
                <h2 className="h-section-light">
                  {isRU ? 'Для СМИ и ' : isCN ? '媒体与' : 'For Media & '}
                  <span className="h-section__accent">{isRU ? 'журналистов' : isCN ? '记者专区' : 'Journalists'}</span>
                </h2>
                <p className="body-lead-light">
                  {isRU
                    ? 'Открыты к профессиональному общению, предоставлению актуальной информации и организации съёмок по темам:'
                    : isCN
                      ? '我们对专业交流、提供最新行业资讯以及围绕以下主题组织媒体拍摄持全面开放态度：'
                      : 'We are open to professional communication, providing up-to-date information, and organizing shoots on the following topics:'}
                </p>
              </div>
              <ul className="flex flex-col gap-3 pl-2">
                {topics.map((t, idx) => (
                  <li key={idx} className="flex gap-3 items-center text-sm font-semibold text-text-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 lg:pt-14">
              <div className="flex flex-col gap-6 bg-secondary/40 p-8 rounded-[6px]">
                <span className="h-block-light">
                  {isRU ? 'Запросы прессы' : isCN ? '采访申请' : 'Press Enquiries'}
                </span>
                <p className="text-base font-medium text-text-light/85 leading-snug">
                  {isRU
                    ? 'Мы рады делиться новостями и организовывать визиты для представителей медиа.'
                    : isCN ? '我们乐于为媒体代表共享新闻资讯并安排农场实地考察。' : 'We are glad to share news and organize farm visits for media representatives.'}
                </p>
                <button onClick={() => onSwitchTab('contacts')} className="btn-outline-light w-full">
                  {isRU ? 'Связаться с нами' : isCN ? '与我们联系' : 'Contact Us'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}