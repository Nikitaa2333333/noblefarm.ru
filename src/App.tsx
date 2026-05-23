/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import {
  Dna, Leaf, Globe,
  Award, ArrowRight, Check, Phone,
  Menu, X, Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Language, TRANSLATIONS } from './translations';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

function Navbar({ lang, setLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('body-lock');
    } else {
      document.body.classList.remove('body-lock');
    }
    return () => {
      document.body.classList.remove('body-lock');
    };
  }, [mobileMenuOpen]);

  const t = TRANSLATIONS[lang].navbar;

  const navLinks = [
    { label: t.genetics, id: 'genetics' },
    { label: t.antlers, id: 'antlers' },
    { label: t.importance, id: 'importance' },
    { label: t.reindeerIntro, id: 'reindeer-intro' },
    { label: t.news, id: 'news' },
    { label: t.media, id: 'media' },
    { label: t.contacts, id: 'contacts' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-500 ${scrolled || mobileMenuOpen
            ? 'h-12 bg-secondary'
            : 'h-16 bg-secondary/95 backdrop-blur-md'
          }`}
      >
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] transition-all shrink-0"
            tabIndex={0}
            onClick={() => {
              scrollTo('about');
              setMobileMenuOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollTo('about');
                setMobileMenuOpen(false);
              }
            }}
          >
            <img src="/logo.png" className={`transition-all duration-500 object-contain w-auto ${scrolled ? 'h-6' : 'h-7'}`} alt="Благородный Север" />
            <span className={`font-serif font-medium text-accent italic tracking-wide leading-none transition-all duration-500 ${scrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'}`}>
              {t.logo}{t.logoItalic}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-[11px] 2xl:text-[13px] font-medium text-text-light">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id)}
                className="hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-300 whitespace-nowrap cursor-pointer px-1.5 py-1 rounded-[6px]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-text-light shrink-0">
            <a
              href="tel:+79258710937"
              className="hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors p-3 rounded-[6px] cursor-pointer flex items-center justify-center w-11 h-11"
              aria-label={t.call}
            >
              <Phone className="w-4 h-4" strokeWidth={1.8} />
            </a>
            
            {/* Interactive language switcher */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold tracking-wider">
              <button
                onClick={() => setLang('RU')}
                className={`transition-colors cursor-pointer focus-visible:outline-none ${lang === 'RU' ? 'text-accent font-bold' : 'text-text-light/60 hover:text-accent'}`}
              >
                RU
              </button>
              <span className="text-text-light/40">/</span>
              <button
                onClick={() => setLang('EN')}
                className={`transition-colors cursor-pointer focus-visible:outline-none ${lang === 'EN' ? 'text-accent font-bold' : 'text-text-light/60 hover:text-accent'}`}
              >
                EN
              </button>
              <span className="text-text-light/40">/</span>
              <button
                onClick={() => setLang('CN')}
                className={`transition-colors cursor-pointer focus-visible:outline-none ${lang === 'CN' ? 'text-accent font-bold' : 'text-text-light/60 hover:text-accent'}`}
              >
                CN
              </button>
            </div>

            {/* Burger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-text-light hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none cursor-pointer transition-colors duration-300 flex items-center justify-center rounded-[6px]"
              aria-label={mobileMenuOpen 
                ? (lang === 'RU' ? 'Закрыть меню' : lang === 'CN' ? '关闭菜单' : 'Close menu') 
                : (lang === 'RU' ? 'Открыть меню' : lang === 'CN' ? '打开菜单' : 'Open menu')}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 top-[48px] bg-secondary z-40 transition-all duration-500 xl:hidden flex flex-col justify-between p-8 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        style={{ height: 'calc(100vh - 48px)' }}
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
            className="flex items-center gap-3 hover:text-accent py-3 text-base font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] cursor-pointer"
          >
            <Phone className="w-5 h-5 text-accent" />
            <span>{t.call}</span>
          </a>
          
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wider py-3">
            <button
              onClick={() => {
                setLang('RU');
                setMobileMenuOpen(false);
              }}
              className={`transition-colors cursor-pointer focus-visible:outline-none ${lang === 'RU' ? 'text-accent font-bold' : 'text-text-light/60 hover:text-accent'}`}
            >
              RU
            </button>
            <span className="text-text-light/40">/</span>
            <button
              onClick={() => {
                setLang('EN');
                setMobileMenuOpen(false);
              }}
              className={`transition-colors cursor-pointer focus-visible:outline-none ${lang === 'EN' ? 'text-accent font-bold' : 'text-text-light/60 hover:text-accent'}`}
            >
              EN
            </button>
            <span className="text-text-light/40">/</span>
            <button
              onClick={() => {
                setLang('CN');
                setMobileMenuOpen(false);
              }}
              className={`transition-colors cursor-pointer focus-visible:outline-none ${lang === 'CN' ? 'text-accent font-bold' : 'text-text-light/60 hover:text-accent'}`}
            >
              CN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Section Props ────────────────────────────────────────────────────────────
interface SectionProps {
  lang: Language;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HERO_BACKGROUNDS = [
  { src: '/enhanced_hero_bg.png', isVertical: false },
  { src: '/enhanced_about_1.png', isVertical: false },
  { src: '/enhanced_about_2.png', isVertical: true },
  { src: '/enhanced_about_3.png', isVertical: true },
  { src: '/enhanced_about_4.png', isVertical: true },
  { src: '/enhanced_about_5.png', isVertical: true },
  { src: '/enhanced_about_6.png', isVertical: true },
  { src: '/enhanced_about_7.png', isVertical: true },
  { src: '/enhanced_about_8.png', isVertical: true },
  { src: '/enhanced_about_9.png', isVertical: true },
  { src: '/enhanced_deer_1.png', isVertical: true },
  { src: '/enhanced_deer_2.png', isVertical: true },
  { src: '/enhanced_deer_3.png', isVertical: true },
];

function Hero({ lang }: SectionProps) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = TRANSLATIONS[lang].hero;

  const heroIcons = [
    { icon: <Dna className="w-5 h-5" />, label: t.breeding },
    { icon: <Leaf className="w-5 h-5" />, label: t.genetics },
    { icon: <Award className="w-5 h-5" />, label: t.antlers },
    { icon: <Globe className="w-5 h-5" />, label: t.intl },
  ];

  const activeBg = HERO_BACKGROUNDS[bgIndex];

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
      {/* Background Image and Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bgIndex}
            src={activeBg.src}
            alt="Благородный олень"
            className="absolute inset-0 md:inset-y-0 md:left-[45%] md:right-0 md:w-[55%] md:h-full w-full h-full object-cover object-center"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: 'easeInOut' },
              scale: { duration: 6.5, ease: 'easeOut' }
            }}
          />
        </AnimatePresence>
        {/* Cinematic gradient: solid dark teal on the left, fading to transparent on the right; responsive vertical layout on mobile */}
        <div className="absolute inset-0 hero-gradient-overlay z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
          className="max-w-[800px] md:max-w-[550px] lg:max-w-[650px] flex flex-col gap-6"
        >
          <div className="text-accent text-sm font-semibold tracking-wider">
            {t.subtitle}
          </div>

          <h1 className="font-serif font-medium text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.1] md:leading-[1.0] tracking-tight text-text-light mt-2">
            {t.titleLine1} <br className="hidden md:inline" />
            <span className="italic text-accent">{t.titleLine2}</span> <br className="hidden md:inline" />
            {t.titleLine3}
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-text-light max-w-2xl leading-relaxed">
            {t.desc}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 md:flex md:flex-wrap md:items-center md:gap-x-6 lg:gap-x-8 md:gap-y-3">
            {heroIcons.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-text-light text-sm font-medium"
              >
                <div className="text-accent shrink-0">{item.icon}</div>
                <span className="leading-tight">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => scrollTo('about')}
              className="btn-primary w-full sm:w-auto text-center justify-center"
            >
              {t.btnAbout}
            </button>
            <button
              onClick={() => scrollTo('news')}
              className="btn-outline-light w-full sm:w-auto text-center justify-center"
            >
              {t.btnNews}
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

// ─── About ("Кто мы") ─────────────────────────────────────────────────────────
function About({ lang }: SectionProps) {
  const t = TRANSLATIONS[lang].about;
  return (
    <section id="about" className="py-12 md:py-20 lg:py-24 bg-primary overflow-hidden scroll-mt-24">
      {/* Text block */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-medium tracking-tight text-text-light leading-[1.15] md:leading-[1.1]">
              {t.titlePart1}
              <span className="italic block mt-2 text-accent">{t.titlePart2}</span>
            </h2>
          </div>

          {/* Right Column: Description & Features */}
          <div className="lg:col-span-6 lg:pl-10 text-text-light">
            <p className="text-text-light text-lg sm:text-xl lg:text-[24px] font-medium leading-relaxed max-w-lg mb-8">
              {t.desc}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4.5 text-text-light/80 max-w-lg">
              {[
                t.item1,
                t.item2,
                t.item3,
                t.item4,
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
function Directions({ lang }: SectionProps) {
  const t = TRANSLATIONS[lang].directions;
  const cards = [
    {
      id: 'genetics',
      title: t.card1.title,
      desc: t.card1.desc,
      image: '/opt/about-2.webp',
      icon: <Dna className="w-5 h-5" />
    },
    {
      id: 'reindeer-intro',
      title: t.card2.title,
      desc: t.card2.desc,
      image: '/opt/about-4.webp',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 'antlers',
      title: t.card3.title,
      desc: t.card3.desc,
      image: '/opt/about-6.webp',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 'international',
      title: t.card4.title,
      desc: t.card4.desc,
      image: '/opt/about-8.webp',
      icon: <Globe className="w-5 h-5" />
    },
  ];

  return (
    <section id="directions" className="py-12 md:py-20 lg:py-24 bg-primary relative z-10 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 mb-10 lg:mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-7xl font-medium tracking-tight text-text-light">
          {t.title}<span className="italic text-accent">{t.titleAccent}</span>
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              id={card.id}
              tabIndex={0}
              className="group relative min-h-[460px] rounded-none rounded-br-[80px] overflow-hidden flex flex-col justify-between p-7 lg:p-8 text-text-light transition-all duration-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none border border-white/5 scroll-mt-24"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Natural, clear gradient overlay: dark at the bottom for text readability, clear at the top */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/45 to-transparent transition-all duration-500 group-hover:from-secondary/98 group-hover:via-secondary/55" />
              </div>

              {/* Text Content (at bottom) */}
              <div className="relative z-10 mt-auto">
                <h3 className="font-serif text-xl sm:text-2xl font-medium mb-3 leading-tight text-text-light">
                  {card.title}
                </h3>
                <p className="text-text-light/80 font-medium text-xs sm:text-sm leading-relaxed mb-6">
                  {card.desc}
                </p>
                <button 
                  onClick={() => scrollTo('contacts')}
                  className="flex items-center gap-1.5 text-accent group-hover:text-text-light text-sm font-semibold group-hover:gap-2.5 transition-all duration-300 cursor-pointer focus-visible:underline focus-visible:outline-none py-1"
                >
                  {t.readMore} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Important ────────────────────────────────────────────────────────────
function WhyImportant({ lang }: SectionProps) {
  const t = TRANSLATIONS[lang].whyImportant;
  const advantages = [
    { title: t.adv1.title, desc: t.adv1.desc },
    { title: t.adv2.title, desc: t.adv2.desc },
    { title: t.adv3.title, desc: t.adv3.desc },
    { title: t.adv4.title, desc: t.adv4.desc },
  ];

  return (
    <section id="importance" className="py-12 md:py-20 lg:py-24 px-6 bg-bg-light text-text-dark relative overflow-hidden scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3.75rem] font-medium tracking-tight leading-[1.15] md:leading-[1.1] mb-10 lg:mb-14 max-w-2xl">
          {t.title}
          <span className="italic">{t.titleAccent}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <p className="text-text-dark font-medium text-base sm:text-lg lg:text-[22px] leading-relaxed self-start">
            {t.desc}
          </p>

          <div>
            {advantages.map((item, i) => (
              <div
                key={i}
                className={`flex gap-6 items-start ${i === 0 ? 'pb-7' : i < advantages.length - 1 ? 'py-7' : 'pt-7'} ${i < advantages.length - 1 ? 'border-b border-border-light' : ''}`}
              >
                <span className="font-serif text-2xl md:text-[2.5rem] leading-none text-accent font-medium shrink-0 w-10 text-right">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-bold text-lg mb-1.5 text-text-dark">{item.title}</p>
                  <p className="text-text-dark/80 font-medium text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface VKPost {
  id: string;
  date: string;
  title: string;
  text: string;
  image: string;
  link: string;
}

const DEFAULT_NEWS: VKPost[] = [
  {
    id: 'kfh_noble_1',
    date: '18 мая 2026',
    title: 'Регистрация бренда «Благородный Север»',
    text: 'Официально зарегистрировали товарный знак нашего фермерского хозяйства. Это важный шаг для защиты бренда и будущего развития линейки пантовой продукции!',
    image: '/about-2.webp',
    link: 'https://vk.com/kfh_noble'
  },
  {
    id: 'kfh_noble_2',
    date: '17 мая 2026',
    title: 'Обустройство новых пастбищ',
    text: 'Завершаем монтаж качественного ограждения для просторных вольеров. Безопасность и естественные условия содержания оленей — наш главный приоритет.',
    image: '/about-4.webp',
    link: 'https://vk.com/kfh_noble'
  },
  {
    id: 'kfh_noble_3',
    date: '16 мая 2026',
    title: 'Адаптация и сезон линьки оленей',
    text: 'Наши благородные олени активно меняют шерсть к лету. Ветеринарные специалисты отмечают отличный аппетит и прекрасное здоровье всего стада.',
    image: '/about-6.webp',
    link: 'https://vk.com/kfh_noble'
  }
];

const SkeletonCard = () => (
  <div className="bg-secondary animate-pulse rounded-none overflow-hidden">
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

function News({ lang }: SectionProps) {
  const t = TRANSLATIONS[lang].news;
  const [posts, setPosts] = useState<VKPost[]>(DEFAULT_NEWS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadNews = async () => {
      try {
        const res = await fetch('/vk-news.json');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && active) {
            setPosts(data);
          }
        }
      } catch (err) {
        console.warn('Failed to load VK news from static JSON, using fallback data.', err);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    loadNews();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="news" className="py-12 md:py-20 lg:py-24 px-6 bg-bg-light scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-7xl font-medium tracking-tight text-text-dark">
              {t.title}<span className="italic">{t.titleAccent}</span>
            </h2>
          </div>
          <a
            href="https://vk.com/kfh_noble"
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-link shrink-0 text-base py-2"
          >
            {t.allNews} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            posts.slice(0, 3).map((article) => (
              <a
                key={article.id}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-secondary flex flex-col overflow-hidden relative rounded-none hover:z-10 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
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
                  <h3 className="font-serif text-xl font-medium text-text-light mb-3 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-text-light/60 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                    {article.text}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    {lang === 'RU' ? 'Читать далее' : lang === 'CN' ? '阅读更多' : 'Read more'} <ArrowRight className="w-4 h-4" />
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
function Media({ lang }: SectionProps) {
  const t = TRANSLATIONS[lang].media;
  const outlets = [
    { name: 'Агроинвестор', image: '/agro.jpg', url: 'https://agroinvestor.ru' },
    { name: 'The Village', image: '/vill.png', url: 'https://www.the-village.ru' },
    { name: 'РБК', image: '/rbk.png', url: 'https://www.rbc.ru' },
    { name: 'Fermer.ru', image: '/channels4_profile.jpg', url: 'https://fermer.ru' },
  ];

  return (
    <section id="media" className="py-12 md:py-20 lg:py-24 px-6 bg-bg-light border-t border-border-light scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3.75rem] font-medium tracking-tight leading-[1.15] md:leading-[1.1] text-text-dark">
            {t.title}<span className="italic">{t.titleAccent}</span>
          </h2>
          <p className="text-text-dark/70 font-medium text-base sm:text-lg leading-relaxed max-w-lg">
            {t.desc}
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {outlets.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-bg-card flex flex-col items-center justify-between p-6 sm:p-8 aspect-square rounded-none border border-border-light hover:border-accent hover:shadow-[0_20px_40px_rgba(27,67,68,0.08)] hover:-translate-y-1.5 transition-all duration-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-none bg-white p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-border-light/30">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="mt-4 text-text-dark/50 group-hover:text-primary text-xs font-bold tracking-widest uppercase transition-colors duration-300">
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
function Footer({ lang }: SectionProps) {
  const t = TRANSLATIONS[lang].footer;
  const menuLinks = [
    { label: TRANSLATIONS[lang].navbar.about, id: 'about' },
    { label: TRANSLATIONS[lang].navbar.genetics, id: 'genetics' },
    { label: TRANSLATIONS[lang].navbar.antlers, id: 'antlers' },
    { label: TRANSLATIONS[lang].navbar.importance, id: 'importance' },
    { label: TRANSLATIONS[lang].navbar.reindeerIntro, id: 'reindeer-intro' },
    { label: TRANSLATIONS[lang].navbar.news, id: 'news' },
    { label: TRANSLATIONS[lang].navbar.media, id: 'media' }
  ];

  return (
    <footer id="contacts" className="bg-secondary text-text-light pt-14 pb-10 px-6 mt-8 border-t border-border-dark scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-border-dark">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" className="h-8 w-auto object-contain" alt="Благородный Север" />
              <span className="font-serif font-medium text-xl text-accent italic tracking-wide leading-none">
                {t.logo}{t.logoItalic}
              </span>
            </div>
            <p className="text-text-light/70 font-medium text-sm leading-relaxed max-w-[200px]">
              {t.desc}
            </p>
          </div>

          <div>
            <div className="text-text-light/70 text-xs mb-5 font-semibold tracking-wider uppercase">{t.nav}</div>
            <ul className="space-y-1.5 text-text-light/70 font-medium text-base">
              {menuLinks.map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => scrollTo(item.id)} 
                    className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] py-2 cursor-pointer text-left w-full block"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-text-light/70 text-xs mb-5 font-semibold tracking-wider uppercase">{t.contacts}</div>
            <ul className="space-y-1.5 text-text-light/70 font-medium text-base">
              <li>
                <a 
                  href="tel:+79258710937" 
                  className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] py-2 cursor-pointer block"
                >
                  +7 (925) 871-09-37
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@blagorodnysever.ru" 
                  className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] py-2 cursor-pointer block"
                >
                  info@blagorodnysever.ru
                </a>
              </li>
              <li className="text-text-light/70 font-medium py-2">{t.region}</li>
            </ul>
          </div>

          <div>
            <div className="text-text-light/70 text-xs mb-5 font-semibold tracking-wider uppercase">{t.socials}</div>
            <ul className="space-y-1.5 text-text-light/70 font-medium text-base">
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
                    className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] py-2 cursor-pointer block"
                  >
                    {soc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-text-light/70 text-xs font-medium">
          <p>{t.copyright}</p>
          <p>{t.region}</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Language>('RU');

  return (
    <main className="min-h-screen selection:bg-primary selection:text-text-light">
      <div className="bg-secondary relative">
        <Navbar lang={lang} setLang={setLang} />
        <Hero lang={lang} />
      </div>
      <About lang={lang} />
      <Directions lang={lang} />
      <WhyImportant lang={lang} />
      <News lang={lang} />
      <Media lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
