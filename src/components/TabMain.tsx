import { motion, AnimatePresence } from 'motion/react';
import { Dna, Leaf, Award, Globe, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Language, TRANSLATIONS } from '../translations';

interface TabMainProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

const HERO_BACKGROUNDS = [
  { src: '/enhanced_hero_bg.webp', isVertical: false },
  { src: '/enhanced_about_1.webp', isVertical: false },
  { src: '/enhanced_about_2.webp', isVertical: true },
  { src: '/enhanced_about_3.webp', isVertical: true },
  { src: '/enhanced_about_4.webp', isVertical: true },
  { src: '/enhanced_about_5.webp', isVertical: true },
  { src: '/enhanced_about_6.webp', isVertical: true },
  { src: '/enhanced_about_7.webp', isVertical: true },
  { src: '/enhanced_about_8.webp', isVertical: true },
  { src: '/enhanced_about_9.webp', isVertical: true },
  { src: '/enhanced_deer_1.webp', isVertical: true },
  { src: '/enhanced_deer_2.webp', isVertical: true },
  { src: '/enhanced_deer_3.webp', isVertical: true },
];

export default function TabMain({ lang, onSwitchTab }: TabMainProps) {
  const [bgIndex, setBgIndex] = useState(0);

  // Preload background images
  useEffect(() => {
    HERO_BACKGROUNDS.forEach((bg) => {
      const img = new Image();
      img.src = bg.src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = TRANSLATIONS[lang];
  const activeBg = HERO_BACKGROUNDS[bgIndex];

  const heroIcons = [
    { icon: <Dna className="w-5 h-5" />, label: t.hero.breeding },
    { icon: <Leaf className="w-5 h-5" />, label: t.hero.genetics },
    { icon: <Award className="w-5 h-5" />, label: t.hero.antlers },
    { icon: <Globe className="w-5 h-5" />, label: t.hero.intl },
  ];

  const directions = [
    {
      id: 'genetics',
      title: t.directions.card1.title,
      desc: t.directions.card1.desc,
      image: '/about-2.webp',
      icon: <Dna className="w-6 h-6 text-accent" />
    },
    {
      id: 'reindeer-intro',
      title: t.directions.card2.title,
      desc: t.directions.card2.desc,
      image: '/about-4.webp',
      icon: <Sparkles className="w-6 h-6 text-accent" />
    },
    {
      id: 'antlers',
      title: t.directions.card3.title,
      desc: t.directions.card3.desc,
      image: '/about-6.webp',
      icon: <Award className="w-6 h-6 text-accent" />
    },
    {
      id: 'industry',
      title: t.directions.card4.title,
      desc: t.directions.card4.desc,
      image: '/about-8.webp',
      icon: <Globe className="w-6 h-6 text-accent" />
    },
  ];

  const advantages = [
    { title: t.whyImportant.adv1.title, desc: t.whyImportant.adv1.desc },
    { title: t.whyImportant.adv2.title, desc: t.whyImportant.adv2.desc },
    { title: t.whyImportant.adv3.title, desc: t.whyImportant.adv3.desc },
    { title: t.whyImportant.adv4.title, desc: t.whyImportant.adv4.desc },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
        <div className="absolute top-0 left-0 w-full h-[50vh] md:top-0 md:left-[45%] md:w-[55%] md:h-full z-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={bgIndex}
              src={activeBg.src}
              alt="Благородный олень"
              className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] object-cover object-center"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: 'easeInOut' },
                scale: { duration: 6.5, ease: 'easeOut' }
              }}
              loading="eager"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 top-0 bottom-[-4px] bg-gradient-to-t from-secondary via-secondary/50 to-transparent md:hidden z-10 pointer-events-none" />
        </div>
        <div className="hidden md:block absolute inset-0 hero-gradient-overlay z-10 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 pt-[42vh] md:pt-28 pb-20">
          <div className="max-w-[800px] md:max-w-[550px] lg:max-w-[650px] flex flex-col gap-6">
            <div className="label-eyebrow">
              {t.hero.subtitle}
            </div>

            <img
              src="/logo.webp"
              alt={`${t.hero.brandName} ${t.hero.brandNameAccent}`}
              className="h-20 md:h-24 w-auto object-contain"
              loading="eager"
            />

            <h1 className="hero-title-light">
              {t.hero.brandName}{' '}
              <span className="italic text-accent">{t.hero.brandNameAccent}</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-text-light max-w-2xl leading-relaxed">
              {t.hero.descBefore}
              <span className="text-accent font-semibold">{t.hero.descAccent}</span>
              {t.hero.descAfter}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 md:flex md:flex-wrap md:items-center md:gap-x-6 lg:gap-x-8 md:gap-y-3">
              {heroIcons.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-text-light text-sm font-medium">
                  <div className="text-accent shrink-0">{item.icon}</div>
                  <span className="leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
              <a
                href="#genetics"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchTab('genetics');
                }}
                className="btn-primary w-full sm:w-auto text-center justify-center flex items-center"
              >
                {lang === 'RU' ? 'Племенная работа' : lang === 'CN' ? '良种繁育' : 'Pedigree breeding'}
              </a>
              <a
                href="#news"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchTab('news');
                }}
                className="btn-outline-light w-full sm:w-auto text-center justify-center flex items-center"
              >
                {t.hero.btnNews}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-primary overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight text-text-light leading-[1.15] md:leading-[1.1]">
                {t.about.titlePart1}
                <span className="italic block mt-2 text-accent">{t.about.titlePart2}</span>
              </h2>
            </div>

            <div className="lg:col-span-6 lg:pl-10 text-text-light">
              <p className="text-text-light text-lg sm:text-xl lg:text-[22px] font-medium leading-relaxed max-w-lg mb-8">
                <strong className="font-bold text-accent">{t.about.descBrand}</strong>
                {t.about.descRest}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-text-light max-w-lg">
                {[
                  t.about.item1,
                  t.about.item2,
                  t.about.item3,
                  t.about.item4,
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" strokeWidth={2.5} />
                    <span className="text-base font-semibold text-text-light leading-none">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Advantages row — moved from "Новая отрасль" section.
              Visually separates this block from "Направления проекта" below. */}
          <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {advantages.map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                <span className="font-serif text-3xl md:text-4xl leading-none text-accent font-semibold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-serif font-bold text-lg md:text-xl text-text-light leading-tight">
                  {item.title}
                </h4>
                <p className="text-text-light/85 font-medium text-sm sm:text-base leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Directions Section ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-primary relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 mb-10 lg:mb-16">
          <h2 className="h-section-xl-light">
            {t.directions.title}<span className="italic text-accent">{t.directions.titleAccent}</span>
          </h2>
        </div>

        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directions.map((card) => (
              <div
                key={card.id}
                tabIndex={0}
                onClick={() => onSwitchTab(card.id)}
                className="group relative min-h-[460px] rounded-[24px] overflow-hidden flex flex-col justify-between p-8 text-text-light transition-all duration-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none border border-white/5 shadow-lg hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/45 to-transparent transition-all duration-500 group-hover:from-secondary/98 group-hover:via-secondary/55" />
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="w-11 h-11 bg-secondary/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                    {card.icon}
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium mb-3 leading-tight text-text-light">
                    {card.title}
                  </h3>
                  <p className="text-text-light/85 font-medium text-base leading-snug mb-6">
                    {card.desc}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSwitchTab(card.id);
                    }}
                    className="flex items-center gap-1.5 text-accent group-hover:text-text-light text-sm font-semibold group-hover:gap-2.5 transition-all duration-300 cursor-pointer"
                  >
                    {t.directions.readMore} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Important Section ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-bg-light text-text-dark relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="h-section-xl mb-10 lg:mb-14 max-w-2xl">
            {t.whyImportant.title}
            <span className="h-section__accent">{t.whyImportant.titleAccent}</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <p className="text-text-dark font-medium text-base sm:text-lg lg:text-[22px] leading-relaxed self-start lg:self-center">
              {t.whyImportant.desc}
            </p>

            <div className="relative">
              <img
                src="/russia-map.svg"
                alt={lang === 'RU' ? 'Карта России с отмеченной Московской областью' : lang === 'CN' ? '俄罗斯地图，标注莫斯科州' : 'Map of Russia with Moscow Region highlighted'}
                className="w-full h-auto"
                loading="lazy"
              />
              <span className="block mt-4 text-sm font-bold text-accent">
                {lang === 'RU' ? 'Московская область' : lang === 'CN' ? '莫斯科州' : 'Moscow Region'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
