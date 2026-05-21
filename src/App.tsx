/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  Dna, Leaf, Globe,
  Award, ArrowRight, Check, Phone,
  Menu, X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Генетика', id: 'directions' },
    { label: 'Пантовая продукция', id: 'directions' },
    { label: 'Современное оленеводство', id: 'importance' },
    { label: 'Познакомиться с оленеводством', id: 'guests' },
    { label: 'Новости проекта', id: 'news' },
    { label: 'Контакты и сотрудничество', id: 'contacts' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-500 ${scrolled || mobileMenuOpen
            ? 'h-14 bg-secondary'
            : 'h-[72px] bg-secondary/95 backdrop-blur-md'
          }`}
      >
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between">
          <div
            className="font-serif font-medium text-lg text-text-light cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded transition-all shrink-0"
            tabIndex={0}
            onClick={() => {
              scrollTo('hero');
              setMobileMenuOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollTo('hero');
                setMobileMenuOpen(false);
              }
            }}
          >
            Благородный<span className="text-accent italic"> Север</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[12px] font-medium text-text-light">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id)}
                className="hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-300 whitespace-nowrap cursor-pointer px-1.5 py-1 rounded"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-text-light shrink-0">
            <a
              href="tel:+79258710937"
              className="hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors p-1.5 rounded cursor-pointer"
              aria-label="Позвонить"
            >
              <Phone className="w-4 h-4" strokeWidth={1.8} />
            </a>
            <span className="text-[11px] hidden md:block font-medium">Ru / En</span>

            {/* Burger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text-light hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none cursor-pointer transition-colors duration-300 flex items-center justify-center rounded-lg"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 top-[56px] bg-secondary z-40 transition-all duration-500 lg:hidden flex flex-col justify-between p-8 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        style={{ height: 'calc(100vh - 56px)' }}
      >
        <div className="flex flex-col gap-6 mt-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                scrollTo(link.id);
                setMobileMenuOpen(false);
              }}
              className="text-left text-text-light hover:text-accent py-3 text-xl font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors cursor-pointer border-b border-border-dark w-full"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between text-text-light border-t border-border-dark pt-6 pb-12">
          <a
            href="tel:+79258710937"
            className="flex items-center gap-3 hover:text-accent py-3 text-base font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded cursor-pointer"
          >
            <Phone className="w-5 h-5 text-accent" />
            <span>Позвонить</span>
          </a>
          <span className="text-sm font-medium py-3">Ru / En</span>
        </div>
      </div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const heroIcons = [
    { icon: <Dna className="w-5 h-5" />, label: 'Племенная работа' },
    { icon: <Leaf className="w-5 h-5" />, label: 'Генетика' },
    { icon: <Award className="w-5 h-5" />, label: 'Пантовое направление' },
    { icon: <Globe className="w-5 h-5" />, label: 'Международный опыт' },
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
      {/* Background Image and Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero-bg.png"
          alt="Благородный олень"
          className="w-full h-full object-cover object-[70%_50%] md:object-right"
        />
        {/* Cinematic gradient: solid dark teal on the left, fading to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-transparent lg:from-secondary/95 lg:via-secondary/50 lg:to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
          className="max-w-[800px] flex flex-col gap-6"
        >
          <div className="text-accent text-sm font-medium">
            Московская область
          </div>

          <h1 className="font-serif font-medium text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.0] tracking-tight text-text-light mt-2">
            Современное<br />
            <span className="italic text-accent">оленеводство</span><br />
            в России
          </h1>

          <p className="mt-4 text-lg md:text-xl font-medium text-text-light max-w-2xl leading-relaxed">
            Разведение благородных европейских оленей, племенная работа, генетика стада и развитие пантового направления в Московской области.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 lg:gap-x-5 gap-y-2">
            {heroIcons.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-text-light text-sm font-medium"
              >
                <div className="text-accent shrink-0">{item.icon}</div>
                <span className="leading-tight whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => scrollTo('about')}
              className="btn-primary"
            >
              О хозяйстве
            </button>
            <button
              onClick={() => scrollTo('news')}
              className="btn-outline-light"
            >
              Новости проекта
            </button>
          </div>
        </motion.div>
      </div>


    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const images = [
    '/about-1.webp',
    '/about-2.webp',
    '/about-3.webp',
    '/about-4.webp',
    '/about-5.webp',
    '/about-6.webp',
    '/about-7.webp',
    '/about-8.webp',
    '/about-9.webp',
  ];

  return (
    <section className="w-full bg-bg-light overflow-hidden">
      <div className="relative w-full overflow-hidden select-none">
        <div className="flex flex-nowrap w-max animate-marquee hover:[animation-play-state:paused]">
          {/* First set of images */}
          <div className="flex gap-0 shrink-0">
            {images.map((src, index) => (
              <div
                key={`gallery-1-${index}`}
                className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[55vh] md:h-[65vh] shrink-0 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Галерея Благородный Север ${index + 1}`}
                  className="w-full h-full object-cover block pointer-events-none transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
          {/* Second set of images for loop */}
          <div className="flex gap-0 shrink-0">
            {images.map((src, index) => (
              <div
                key={`gallery-2-${index}`}
                className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[55vh] md:h-[65vh] shrink-0 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Галерея Благородный Север ${index + 1}`}
                  className="w-full h-full object-cover block pointer-events-none transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ("Кто мы") ─────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-10 lg:py-14 bg-primary overflow-hidden">
      {/* Text block */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[4.2rem] font-medium tracking-tight text-text-light leading-[1.1]">
              Создаём культуру{' '}
              <span className="italic block mt-2 text-accent">современного оленеводства</span>
            </h2>
          </div>

          {/* Right Column: Description & Features */}
          <div className="lg:col-span-6 lg:pl-10 text-text-light">
            <p className="text-text-light text-[24px] font-medium leading-relaxed max-w-lg mb-8">
              Современное хозяйство с инженерным подходом к содержанию и разведению благородного европейского оленя. Работаем по международным стандартам, опираясь на опыт ведущих хозяйств Новой Зеландии и Европы.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-text-light/80 max-w-lg">
              {[
                'Современное хозяйство',
                'Инженерный подход',
                'Международный опыт',
                'Развитие новой отрасли',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-4.5 h-4.5 text-accent shrink-0" strokeWidth={2.5} />
                  <span className="text-base font-medium text-text-light/90 leading-none">{item}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Directions ───────────────────────────────────────────────────────────────
function Directions() {
  const cards = [
    {
      title: 'Генетика и племенная работа',
      desc: 'Формирование высокопродуктивного стада на основе отбора по генетическим показателям.',
      image: '/about-2.webp'
    },
    {
      title: 'Ветеринарное сопровождение',
      desc: 'Системная ветеринарная работа, профилактика и постоянный мониторинг здоровья животных.',
      image: '/about-4.webp'
    },
    {
      title: 'Пантовое направление',
      desc: 'Производство и переработка пантов благородного оленя — востребованный продукт мирового рынка.',
      image: '/about-6.webp'
    },
    {
      title: 'Международный опыт',
      desc: 'Партнёрство с хозяйствами Новой Зеландии и Европы. Лучшие практики оленеводства — в России.',
      image: '/about-8.webp'
    },
  ];

  return (
    <section id="directions" className="pt-10 lg:pt-14 bg-primary relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 mb-8 lg:mb-10">
        <h2 className="font-serif text-5xl lg:text-7xl font-medium tracking-tight text-text-light">
          Направления <span className="italic text-accent">проекта</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full relative z-10 shadow-[0_25px_50px_rgba(0,0,0,0.45)]">
        {cards.map((card, i) => (
          <div
            key={i}
            tabIndex={0}
            className="group relative min-h-[480px] lg:min-h-[560px] rounded-none overflow-hidden flex flex-col justify-between p-8 lg:p-12 text-text-light transition-all duration-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Natural, clear gradient overlay: dark at the bottom for text readability, clear at the top */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/25 to-transparent transition-all duration-500 group-hover:from-secondary/95 group-hover:via-secondary/35" />
            </div>

            {/* Text Content */}
            <div className="relative z-10 mt-auto">
              <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-4 leading-tight text-text-light">
                {card.title}
              </h3>
              <p className="text-text-light/85 font-medium text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
                {card.desc}
              </p>
              <button className="flex items-center gap-2 text-accent group-hover:text-text-light text-base font-medium group-hover:gap-3 transition-all duration-300 cursor-pointer focus-visible:underline focus-visible:outline-none">
                Подробнее <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Why Important ────────────────────────────────────────────────────────────
function WhyImportant() {
  const advantages = [
    { title: 'Ответственное содержание', desc: 'Открытые вольеры, естественный выпас, минимальный стресс.' },
    { title: 'Системный подход', desc: 'Каждый процесс задокументирован и оптимизирован.' },
    { title: 'Ветеринарный контроль', desc: 'Постоянный мониторинг здоровья каждого животного.' },
    { title: 'Прозрачность процессов', desc: 'Открыты для партнёров, СМИ и отраслевых экспертов.' },
  ];

  return (
    <section id="importance" className="py-10 lg:py-14 px-6 bg-bg-light text-text-dark relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-serif text-5xl lg:text-[3.75rem] font-medium tracking-tight leading-[1.1] mb-10 lg:mb-14 max-w-2xl">
          Новая отрасль для{' '}
          <span className="italic">региона и страны</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <p className="text-text-dark font-medium text-[22px] leading-relaxed self-start">
            В мире оленеводство — зрелая, технологичная отрасль. В России оно пока ограничено традиционным северным форматом. Наш проект создаётся в Московской области как модель для будущего развития.
          </p>

          <div>
            {advantages.map((item, i) => (
              <div
                key={i}
                className={`flex gap-6 items-start ${i === 0 ? 'pb-7' : i < advantages.length - 1 ? 'py-7' : 'pt-7'} ${i < advantages.length - 1 ? 'border-b border-border-light' : ''}`}
              >
                <span className="font-serif text-[2.5rem] leading-none text-accent font-medium shrink-0 w-10 text-right">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-bold text-lg mb-1.5 text-text-dark">{item.title}</p>
                  <p className="text-text-dark font-medium text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── News ─────────────────────────────────────────────────────────────────────
interface TelegramPost {
  id: string;
  date: string;
  title: string;
  text: string;
  image: string;
  link: string;
}

const DEFAULT_NEWS: TelegramPost[] = [
  {
    id: 'kfhNoble/236',
    date: '18 мая 2026',
    title: 'Факты о пантах: свадебные традиции Азии',
    text: 'Ценность оленьих рогов отражалась не только в медицине, но и в культурных традициях. В некоторых регионах Китая части рога входили в свадебные ритуалы как символ жизненной силы и семейного счастья.',
    image: 'https://cdn4.telesco.pe/file/tXNWe4XQ-vFSZt3Yni4OuzbJxSPjnoI_sqA8y2cqeU9fBL2nFwHamWyaE_jWpIEW3X1LSUWpG00UL9K4B3fGs4ORLX2fVL859pwc1zfv7WCHBQ_RNfKFaeYHO6ysgL0UfdkN9D0jO0pSq0c77AoCpS07zlAUzwN3yGR52eyUbe2RyLlseuhCBVrdaxLsy443HDRpa0t8Cxk7KBb4FJKbzyQNwHEbmDegh271PZHS5Nws_pTyNmNyLZAyb_QYR1VnhF-MU7-voWOhc6WjPBp89JoiH7XmMcJImIC6iw7VQNDZMhtou-6Z0Hodqf62SGip3xfGz9-n7OgnkWcU13UJ1Q.jpg',
    link: 'https://t.me/kfhNoble/236'
  },
  {
    id: 'kfhNoble/235',
    date: '17 мая 2026',
    title: 'Ожидаем, наблюдаем',
    text: 'С нетерпением следим за событиями на ферме. Природа делает своё дело — остаётся только ждать и наблюдать.',
    image: 'https://cdn4.telesco.pe/file/fp4m3fMi7hzlf-G5DTUsMjHDpk8lTi20Kqnp9cCZxDF_Ud0srltn2ljSGYkGlwZs4iAHpAoG4fj2DiZyGMeKaZBhXAISSlF7O3-LkXKCkRu769IN0LbAfufDZ7MD2xrhjtA-IPsB2ECTPpPnc9A5JpFs6t52BO5Vlnfgrw9JRHevN1U8rqqN4Ce1ITX63ew5bCrNKdSK06Wro8R1EpL3WNklQ78_VlaSu0y8WJt0CUoTaLxVr3Zz96wk4mneBt-WCmTZm5zeRVNE2ehIiY1G_IZFDfhntwVU9Zl-QoijUqptRLgVNmykS-3I2znDzSWdCPjXBe08I4TSt4FQmm-_Rw.jpg',
    link: 'https://t.me/kfhNoble/235'
  },
  {
    id: 'kfhNoble/234',
    date: '16 мая 2026',
    title: 'Факты об оленях: сезонное поведение',
    text: 'Зимой олень пуглив — преобладает осторожность из-за хищников. К лету картина меняется: голод выходит на первый план, и поведение животного становится совершенно другим.',
    image: 'https://cdn4.telesco.pe/file/thAUchSR5aXr1FwFJRaBI2yh1n7EfeshdNJzfhzeSU-VwHOQxFTm8p3yhBvjFBRpHORgAwAeXjr-HZmlMNGOf6_ZZsA3bBLTxC15z9cG3oIv0cpnu1udaJZDX15ZVeAB-cBvjwFMmUdMEdvB4ewCiTn3ONZrHDh-iNTO90pOrKCOUceGHivJaFq8U8oM5tGINK6ghKBPchxYueOQYI6k0-CJvuqtFIYtX7TvOY-hJSB7U99U7Tt6snuSnoEpPLDvvrS7Kf8Vr9JneIjZtI_CqDt-3P-67LUxAYwCdKqa27Z8KD1Q02hdg1LNEnV28x-xQb1a91IIa_ZEhrMNq5L4WA.jpg',
    link: 'https://t.me/kfhNoble/234'
  }
];

const SkeletonCard = () => (
  <div className="bg-secondary animate-pulse">
    <div className="bg-primary/20 aspect-[16/10]" />
    <div className="p-7">
      <div className="h-3 bg-primary/20 w-1/4 mb-4" />
      <div className="h-6 bg-primary/20 w-3/4 mb-3" />
      <div className="h-4 bg-primary/20 w-full mb-2" />
      <div className="h-4 bg-primary/20 w-5/6 mb-8" />
      <div className="h-4 bg-primary/20 w-1/3" />
    </div>
  </div>
);

function News() {
  const [posts, setPosts] = useState<TelegramPost[]>(DEFAULT_NEWS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadNews = async () => {
      const channelUrl = 'https://t.me/s/kfhNoble';
      let html = '';
      
      // Попытка 1: corsproxy.io (возвращает чистый HTML, работает стабильно и быстро)
      try {
        const res = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(channelUrl)}`);
        if (res.ok) {
          html = await res.text();
        } else {
          console.warn('corsproxy.io returned status:', res.status);
        }
      } catch (e) {
        console.warn('corsproxy.io failed, trying allorigins:', e);
      }
      
      // Попытка 2: allorigins (fallback прокси)
      if (!html) {
        try {
          const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(channelUrl)}`);
          if (res.ok) {
            const data = await res.json();
            html = data.contents;
          } else {
            console.warn('allorigins returned status:', res.status);
          }
        } catch (e) {
          console.error('allorigins failed as well:', e);
        }
      }
      
      if (!html) {
        throw new Error('All CORS proxies failed to load Telegram channel');
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const messages = doc.querySelectorAll('.tgme_widget_message_wrap');
      
      const parsedPosts: TelegramPost[] = [];
      
      // Проходим с конца, чтобы получить новые посты
      for (let i = messages.length - 1; i >= 0; i--) {
        const msgWrap = messages[i];
        const msg = msgWrap.querySelector('.tgme_widget_message');
        if (!msg) continue;

        // Пропускаем видео посты
        const hasVideo = msg.querySelector('.tgme_widget_message_video_player, .tgme_widget_message_video, .tgme_widget_message_roundvideo');
        if (hasVideo) continue;

        const textEl = msg.querySelector('.tgme_widget_message_text');
        if (!textEl) continue;

        const fullText = textEl.textContent?.trim() || '';
        if (!fullText) continue;

        // Извлекаем картинку. В DOMParser стили не вычисляются, поэтому читаем атрибут style напрямую как строку!
        let imageUrl: string | null = null;
        
        const photoEl = msg.querySelector('.tgme_widget_message_photo_wrap, .tgme_widget_message_grouped_wrap .tgme_widget_message_photo_wrap') as HTMLElement;
        if (photoEl) {
          const styleAttr = photoEl.getAttribute('style') || '';
          const match = styleAttr.match(/background-image\s*:\s*url\(\s*['"]?([^'")]+)['"]?\s*\)/i);
          if (match && match[1]) {
            imageUrl = match[1];
          }
        }

        // Согласно ТЗ, берем посты только с фотографией
        if (!imageUrl) continue;

        const linkEl = msg.querySelector('.tgme_widget_message_date') as HTMLAnchorElement;
        const link = linkEl?.href || `https://t.me/kfhNoble/${msg.getAttribute('data-post')?.split('/').pop()}`;
        const id = msg.getAttribute('data-post') || Math.random().toString();

        const timeEl = msg.querySelector('.tgme_widget_message_date time');
        let dateStr = '';
        if (timeEl) {
          const datetime = timeEl.getAttribute('datetime');
          if (datetime) {
            const date = new Date(datetime);
            dateStr = date.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
          }
        }
        if (!dateStr) dateStr = 'Недавно';

        // Выделяем заголовок и текст
        const lines = fullText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let title = '';
        let text = '';

        if (lines.length > 0) {
          title = lines[0];
          if (title.length > 80) {
            const spaceIndex = title.lastIndexOf(' ', 80);
            const cutIndex = spaceIndex > 20 ? spaceIndex : 80;
            title = title.substring(0, cutIndex) + '...';
            text = fullText;
          } else {
            text = lines.slice(1).join('\n');
            if (!text) text = title;
          }
        } else {
          title = 'Новость проекта';
          text = fullText;
        }

        parsedPosts.push({
          id,
          date: dateStr,
          title,
          text,
          image: imageUrl,
          link
        });

        // Выводим последние 3 новости с фото
        if (parsedPosts.length >= 3) {
          break;
        }
      }

      if (parsedPosts.length > 0 && active) {
        setPosts(parsedPosts);
      }
    };

    loadNews()
      .catch((err) => {
        console.error('Failed to fetch Telegram news, using fallback:', err);
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="news" className="py-14 lg:py-20 px-6 bg-bg-light">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-5xl lg:text-7xl font-medium tracking-tight text-text-dark">
              Новости <span className="italic">проекта</span>
            </h2>
          </div>
          <a
            href="https://t.me/kfhNoble"
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-link shrink-0 text-base"
          >
            Все новости в Telegram <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 shadow-[0_25px_50px_rgba(0,0,0,0.35)]">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            posts.map((article) => (
              <a
                key={article.id}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-secondary flex flex-col overflow-hidden relative hover:z-10 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <div className="overflow-hidden aspect-[16/10]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="text-accent text-xs font-medium mb-3 tracking-wide uppercase">{article.date}</div>
                  <h3 className="font-serif text-xl font-medium text-text-light mb-3 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-text-light/60 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                    {article.text}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    Читать далее <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Media ────────────────────────────────────────────────────────────────────
function Media() {
  const outlets = [
    { name: 'Агроинвестор', domain: 'agroinvestor.ru', url: 'https://agroinvestor.ru' },
    { name: 'The Village', domain: 'the-village.ru', url: 'https://www.the-village.ru' },
    { name: 'РБК', domain: 'rbc.ru', url: 'https://www.rbc.ru' },
    { name: 'Fermer.ru', domain: 'fermer.ru', url: 'https://fermer.ru' },
  ];

  return (
    <section id="media" className="py-14 lg:py-20 px-6 bg-bg-light border-t border-border-light">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-14">
          <h2 className="font-serif text-5xl lg:text-[3.75rem] font-medium tracking-tight leading-[1.1] text-text-dark">
            О нас <span className="italic">пишут</span>
          </h2>
          <p className="text-text-dark/70 font-medium text-lg leading-relaxed max-w-lg">
            Проект «Благородный Север» привлекает внимание ведущих отраслевых и деловых изданий России. Мы открыты к сотрудничеству со СМИ и экспертным сообществом.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-light">
          {outlets.map((item) => (
            <a
              key={item.domain}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-bg-card hover:bg-primary flex flex-col items-center justify-center gap-4 py-12 px-8 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <img
                src={`https://logo.clearbit.com/${item.domain}`}
                alt={item.name}
                className="h-10 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="text-text-dark/50 group-hover:text-text-light text-xs font-medium tracking-widest uppercase transition-colors duration-300">
                {item.name}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const menuLinks = ['Генетика', 'Пантовая продукция', 'Современное оленеводство', 'Познакомиться с оленеводством', 'Новости проекта', 'В СМИ'];

  return (
    <footer id="contacts" className="bg-secondary text-text-light pt-14 pb-10 px-6 rounded-t-[60px] lg:rounded-t-[80px] mt-8 border-t border-border-dark">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-border-dark">
          <div>
            <div className="font-serif text-xl font-medium mb-4">
              Благородный<span className="italic text-accent"> Север</span>
            </div>
            <p className="text-text-light/70 font-medium text-sm leading-relaxed max-w-[200px]">
              Современное оленеводство и развитие пантового направления в России.
            </p>
          </div>

          <div>
            <div className="text-text-light/70 text-xs mb-5 font-medium">Навигация</div>
            <ul className="space-y-3 text-text-light/70 font-medium text-base">
              {menuLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded px-1 py-0.5 cursor-pointer">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-text-light/70 text-xs mb-5 font-medium">Контакты</div>
            <ul className="space-y-3 text-text-light/70 font-medium text-base">
              <li><a href="tel:+79258710937" className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded px-1 py-0.5 cursor-pointer">+7 (925) 871-09-37</a></li>
              <li><a href="mailto:info@" className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded px-1 py-0.5 cursor-pointer">info@blagorodnysever.ru</a></li>
              <li className="text-text-light/70 font-medium">Московская область</li>
            </ul>
          </div>

          <div>
            <div className="text-text-light/70 text-xs mb-5 font-medium">Соцсети</div>
            <ul className="space-y-3 text-text-light/70 font-medium text-base">
              {[
                { name: 'ВКонтакте', url: 'https://vk.ru/kfh_noble?t2fs=cf2fdf36ee78a94985_3' },
                { name: 'Telegram', url: 'https://t.me/kfhNoble' },
                { name: 'YouTube', url: '#' }
              ].map((soc) => (
                <li key={soc.name}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded px-1 py-0.5 cursor-pointer"
                  >
                    {soc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-text-light/70 text-xs font-medium">
          <p>© 2026 Благородный Север</p>
          <p>Московская область</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-text-light">
      <div className="bg-secondary relative">
        <Navbar />
        <Hero />
      </div>
      <Gallery />
      <About />
      <Directions />
      <WhyImportant />
      <News />
      <Media />
      <Footer />
    </main>
  );
}
