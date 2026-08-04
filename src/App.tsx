/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import {
  Dna, Leaf, Globe,
  Award, ArrowRight, Check, Phone,
  Menu, X, Sparkles,
  Calendar, Tag, ChevronDown,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Language, TRANSLATIONS } from './translations';

// Import modular tab components
import TabGenetics from './components/TabGenetics';
import TabAntlers from './components/TabAntlers';
import TabIndustry from './components/TabIndustry';
import TabPopularization from './components/TabPopularization';
import TabPhilosophy from './components/TabPhilosophy';
import TabMedia from './components/TabMedia';
import TabNews from './components/TabNews';
import TabContacts from './components/TabContacts';
import TabPresentation from './components/TabPresentation';

// ─── Navbar ───────────────────────────────────────────────────────────────────
interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  navigateAndScroll: (id: string) => void;
  activeTab: string;
}

function Navbar({ lang, setLang, navigateAndScroll, activeTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

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

  // Close dropdown on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenGroup(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const t = TRANSLATIONS[lang].navbar;

  const navGroups = [
    {
      label: t.groupAbout,
      items: [
        { label: t.philosophy, id: 'philosophy' },
        { label: t.importance, id: 'importance' },
        { label: t.presentation, id: 'presentation' },
      ],
    },
    {
      label: t.groupProduction,
      items: [
        { label: t.genetics, id: 'genetics' },
        { label: t.antlers, id: 'antlers' },
        { label: t.reindeerIntro, id: 'reindeer-intro' },
      ],
    },
    {
      label: t.groupOpenness,
      items: [
        { label: t.media, id: 'media' },
        { label: t.news, id: 'news' },
      ],
    },
  ];

  const contactsLink = { label: t.contactsShort, id: 'contacts' };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 h-20 bg-secondary">
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] shrink-0"
            tabIndex={0}
            onClick={() => {
              if (window.location.hash && window.location.hash !== '#') {
                window.location.hash = '';
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              setMobileMenuOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (window.location.hash && window.location.hash !== '#') {
                  window.location.hash = '';
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                setMobileMenuOpen(false);
              }
            }}
          >
            <img src="/logo.png" className="h-10 w-auto object-contain" alt="Благородный Север" />
            <span className="font-serif font-medium text-accent leading-none text-lg md:text-xl">
              {t.logo}{t.logoItalic}
            </span>
          </div>

          <div className="hidden xl:flex flex-1 items-center justify-center gap-2 2xl:gap-4 text-[14px] 2xl:text-[15px] font-medium text-text-light">
            {navGroups.map((group) => {
              const isActive = group.items.some((it) => it.id === activeTab);
              const isOpen = openGroup === group.label;
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className={`flex items-center gap-1.5 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-300 whitespace-nowrap cursor-pointer px-2 py-1 rounded-[6px] ${
                      isActive ? 'text-accent font-bold' : ''
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      strokeWidth={2}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                      >
                        <div className="min-w-[260px] bg-secondary shadow-soft rounded-[6px] py-2 flex flex-col">
                          {group.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                navigateAndScroll(item.id);
                                setOpenGroup(null);
                              }}
                              className={`text-left px-5 py-2.5 text-[15px] hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                                activeTab === item.id ? 'text-accent font-bold' : 'text-text-light'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <button
              onClick={() => navigateAndScroll(contactsLink.id)}
              className={`hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-300 whitespace-nowrap cursor-pointer px-2 py-1 rounded-[6px] ${
                activeTab === contactsLink.id ? 'text-accent font-bold' : ''
              }`}
            >
              {contactsLink.label}
            </button>
          </div>

          <div className="flex items-center gap-4 text-text-light shrink-0">
            <a
              href="tel:+79258710937"
              className="hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors p-2 rounded-[6px] cursor-pointer flex items-center justify-center"
              aria-label={t.call}
            >
              <Phone className="w-5 h-5" strokeWidth={1.8} />
            </a>

            {/* Interactive language switcher */}
            <div className="hidden md:flex items-center gap-1.5 text-sm font-semibold">
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
        className={`fixed inset-0 top-20 bg-secondary z-40 transition-all duration-500 xl:hidden flex flex-col justify-between p-8 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        style={{ height: 'calc(100vh - 5rem)' }}
      >
        <div className="flex flex-col gap-6 mt-8 overflow-y-auto pr-2">
          {[...navGroups.flatMap((g) => g.items), contactsLink].map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigateAndScroll(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left hover:text-accent py-3 text-xl font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors cursor-pointer w-full ${
                activeTab === link.id ? 'text-accent font-bold' : 'text-text-light'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between text-text-light pt-8 pb-12">
          <a
            href="tel:+79258710937"
            className="flex items-center gap-3 hover:text-accent py-3 text-base font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] cursor-pointer"
          >
            <Phone className="w-5 h-5 text-accent" />
            <span>{t.call}</span>
          </a>
          
          <div className="flex items-center gap-2 text-sm font-semibold py-3">
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
  navigateAndScroll?: (id: string) => void;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HERO_BACKGROUNDS = [
  { src: '/hero_2.webp', isVertical: false },
  { src: '/hero_3.webp', isVertical: false },
  { src: '/enhanced_deer_1.webp', isVertical: true },
  { src: '/enhanced_deer_2.webp', isVertical: true },
  { src: '/enhanced_deer_3.webp', isVertical: true },
];

function Hero({ lang, navigateAndScroll }: SectionProps) {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
          className="max-w-[800px] md:max-w-[550px] lg:max-w-[650px] flex flex-col gap-6"
        >
          <div className="text-sm font-bold text-text-light">
            {t.subtitle}
          </div>

          <h1 className="font-serif font-medium tracking-tight text-accent flex items-center gap-5 md:gap-8">
            <img
              src="/logo.webp"
              alt={`${t.brandName} ${t.brandNameAccent}`}
              className="h-24 sm:h-32 md:h-44 lg:h-52 w-auto object-contain shrink-0"
              loading="eager"
            />
            <span className="flex flex-col leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              <span>{t.brandName}</span>
              <span>{t.brandNameAccent}</span>
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-text-light max-w-2xl leading-relaxed">
            {t.descBefore}
            <span className="text-accent font-semibold">{t.descAccent}</span>
            {t.descAfter}
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
              onClick={() => navigateAndScroll && navigateAndScroll('about')}
              className="btn-primary w-full sm:w-auto text-center justify-center cursor-pointer"
            >
              {t.btnAbout}
            </button>
            <button
              onClick={() => navigateAndScroll && navigateAndScroll('news')}
              className="btn-outline-light w-full sm:w-auto text-center justify-center cursor-pointer"
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
  const tw = TRANSLATIONS[lang].whyImportant;
  const advantages = [
    { title: tw.adv1.title, desc: tw.adv1.desc },
    { title: tw.adv2.title, desc: tw.adv2.desc },
    { title: tw.adv3.title, desc: tw.adv3.desc },
    { title: tw.adv4.title, desc: tw.adv4.desc },
  ];
  return (
    <section id="about" className="py-12 md:py-20 lg:py-24 bg-primary overflow-hidden scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6 flex flex-col gap-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-medium tracking-tight text-text-light leading-[1.15] md:leading-[1.1]">
              {t.titlePart1}
              <span className="block mt-2">{t.titlePart2}</span>
            </h2>
            <img
              src="/decor-deer.webp"
              alt=""
              aria-hidden="true"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-6 lg:pl-10 text-text-light">
            <p className="text-text-light text-lg sm:text-xl lg:text-[24px] font-medium leading-relaxed max-w-lg mb-8">
              <strong className="font-bold text-accent">{t.descBrand}</strong>
              {t.descRest}
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

        {/* Advantages row — moved from "Новая отрасль". Separates this block from "Направления проекта" below. */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, i) => (
            <div key={i} className="bg-accent text-secondary px-5 py-4 rounded-[6px] flex flex-col gap-1.5">
              <span className="font-serif text-2xl md:text-3xl leading-none font-semibold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="font-serif font-bold text-base md:text-lg leading-tight">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Directions ───────────────────────────────────────────────────────────────
function Directions({ lang, navigateAndScroll }: SectionProps) {
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
      id: 'importance',
      title: t.card4.title,
      desc: t.card4.desc,
      image: '/opt/about-8.webp',
      icon: <Globe className="w-5 h-5" />
    },
  ];

  return (
    <section id="directions" className="py-12 md:py-20 lg:py-24 bg-primary relative z-10 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 mb-10 lg:mb-16">
        <h2 className="h-section-light">
          {t.title}<span>{t.titleAccent}</span>
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              id={card.id}
              tabIndex={0}
              onClick={() => navigateAndScroll && navigateAndScroll(card.id)}
              className="card-feature group scroll-mt-24"
            >
              <div className="card-feature__media aspect-[4/3]">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="card-feature__body">
                <h3 className="card-feature__title">{card.title}</h3>
                <p className="card-feature__desc">{card.desc}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateAndScroll && navigateAndScroll(card.id);
                  }}
                  className="card-feature__cta"
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

  return (
    <section id="importance" className="py-12 md:py-20 lg:py-24 px-6 bg-bg-light text-text-dark relative overflow-hidden scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="h-section max-w-2xl">
              {t.title}
              <span className="h-section__accent">{t.titleAccent}</span>
            </h2>
            <p className="text-text-dark font-medium text-base sm:text-lg lg:text-[22px] leading-relaxed">
              {t.desc}
            </p>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-[520px] mx-auto">
              <img
                src="/dmitrov-map.webp"
                alt={lang === 'RU' ? 'Силуэт Московской области' : lang === 'CN' ? '莫斯科州轮廓' : 'Moscow Region silhouette'}
                className="w-full h-auto"
                loading="lazy"
                width={900}
                height={849}
              />
              {/* Метка Дмитров: точка на городе + подпись на плашке поверх района */}
              <span
                className="absolute block w-3 h-3 rounded-full bg-secondary ring-2 ring-bg-light shadow-soft"
                style={{ left: '49%', top: '23%', transform: 'translate(-50%, -50%)' }}
              />
              <div
                className="absolute bg-bg-light shadow-soft px-2.5 py-1.5 flex flex-col items-center leading-tight"
                style={{ left: '49%', top: '23%', transform: 'translate(-50%, 14px)' }}
              >
                <span className="font-serif font-bold text-sm md:text-base text-text-dark">
                  {lang === 'RU' ? 'Дмитров' : lang === 'CN' ? '德米特罗夫' : 'Dmitrov'}
                </span>
                <span className="font-serif text-xs md:text-sm text-accent font-semibold whitespace-nowrap">
                  {lang === 'RU' ? 'Благородный Север' : lang === 'CN' ? '高贵北方' : 'Noble Sever'}
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <img
                src="/moscow-region-coat.png"
                alt={lang === 'RU' ? 'Герб Московской области' : lang === 'CN' ? '莫斯科州徽章' : 'Moscow Region coat of arms'}
                className="h-10 w-auto object-contain shrink-0"
                loading="lazy"
              />
              <span className="text-lg md:text-xl font-bold text-text-dark">
                {lang === 'RU'
                  ? 'РФ, Московская область, Дмитровский район'
                  : lang === 'CN'
                  ? '俄罗斯，莫斯科州，德米特罗夫区'
                  : 'Russia, Moscow Region, Dmitrov District'}
              </span>
            </div>
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
  category?: string;
}

const resolveField = (field: string | { RU: string; CN: string; EN: string } | undefined, lang: Language): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.RU || '';
};

const CATEGORY_LABELS: Record<string, { RU: string; CN: string; EN: string }> = {
  Zhizn_fermy: { RU: 'Жизнь фермы', CN: '农场日常', EN: 'Farm Life' },
  Olenyata: { RU: 'Оленята', CN: '小鹿幼崽', EN: 'Fawns' },
  Stado: { RU: 'Стадо', CN: '鹿群', EN: 'Herd' },
  Panty: { RU: 'Панты', CN: '鹿茸', EN: 'Antlers' },
  Stroitelstvo: { RU: 'Строительство', CN: '牧场基建', EN: 'Infrastructure' },
  Otrasl: { RU: 'Отрасль', CN: '行业知识', EN: 'Industry Insights' },
};

const DEFAULT_NEWS: VKPost[] = [
  {
    id: 'kfh_noble_1',
    date: '18 мая 2026',
    title: 'Регистрация бренда «Благородный Север»',
    text: 'Официально зарегистрировали товарный знак нашего фермерского хозяйства. Это важный шаг для защиты бренда и будущего развития линейки пантовой продукции!',
    image: '/about-2.webp',
    link: 'https://vk.com/kfh_noble',
    category: 'Otrasl'
  },
  {
    id: 'kfh_noble_2',
    date: '17 мая 2026',
    title: 'Обустройство новых пастбищ',
    text: 'Завершаем монтаж качественного ограждения для просторных вольеров. Безопасность и естественные условия содержания оленей — наш главный приоритет.',
    image: '/about-4.webp',
    link: 'https://vk.com/kfh_noble',
    category: 'Stroitelstvo'
  },
  {
    id: 'kfh_noble_3',
    date: '16 мая 2026',
    title: 'Адаптация и сезон линьки оленей',
    text: 'Наши благородные олени активно меняют шерсть к лету. Ветеринарные специалисты отмечают отличный аппетит и прекрасное здоровье всего стада.',
    image: '/about-6.webp',
    link: 'https://vk.com/kfh_noble',
    category: 'Stado'
  }
];

const SkeletonCard = () => (
  <div className="bg-bg-card shadow-soft animate-pulse rounded-none overflow-hidden flex flex-col">
    <div className="bg-primary/5 aspect-[16/10]" />
    <div className="p-7 flex-1 flex flex-col gap-3">
      <div className="h-3.5 bg-primary/10 w-1/4 mb-2" />
      <div className="h-6 bg-primary/10 w-3/4 mb-1" />
      <div className="h-4 bg-primary/10 w-full" />
      <div className="h-4 bg-primary/10 w-5/6 mb-4" />
      <div className="h-4 bg-primary/10 w-1/3 mt-auto" />
    </div>
  </div>
);

function News({ lang, navigateAndScroll }: SectionProps) {
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
            <h2 className="h-section">
              {t.title}<span className="h-section__accent">{t.titleAccent}</span>
            </h2>
          </div>
          <button
            onClick={() => navigateAndScroll && navigateAndScroll('news')}
            className="group btn-link shrink-0 text-base py-2 cursor-pointer flex items-center gap-1.5"
          >
            {t.allNews} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
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
                className="card-feature group"
              >
                <div className="card-feature__media aspect-[16/10]">
                  <img
                    src={article.image}
                    alt={resolveField(article.title, lang)}
                    loading="lazy"
                  />
                </div>
                <div className="card-feature__body">
                  <div className="flex justify-between items-center label-eyebrow mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{resolveField(article.date, lang)}</span>
                    </div>
                    {article.category && CATEGORY_LABELS[article.category] && (
                      <div className="flex items-center gap-1.5 text-primary">
                        <Tag className="w-4 h-4" />
                        <span>{resolveField(CATEGORY_LABELS[article.category], lang)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="card-feature__title line-clamp-2">
                    {resolveField(article.title, lang)}
                  </h3>
                  <p className="card-feature__desc line-clamp-3">
                    {resolveField(article.text, lang)}
                  </p>
                  <span className="card-feature__cta">
                    {lang === 'RU' ? 'Читать далее' : lang === 'CN' ? '阅读更多' : 'Read more'} <ArrowRight className="w-4 h-4" />
                  </span>
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
function Media({ lang, navigateAndScroll }: SectionProps) {
  const t = TRANSLATIONS[lang].media;
  const outlets = [
    { name: 'Агроинвестор', image: '/agro.jpg', url: 'https://agroinvestor.ru' },
    { name: 'The Village', image: '/vill.png', url: 'https://www.the-village.ru' },
    { name: 'РБК', image: '/rbk.png', url: 'https://www.rbc.ru' },
    { name: 'Fermer.ru', image: '/channels4_profile.jpg', url: 'https://fermer.ru' },
  ];

  return (
    <section id="media" className="py-12 md:py-20 lg:py-24 px-6 bg-bg-light scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-14">
          <h2 className="h-section">
            {t.title}<span className="h-section__accent">{t.titleAccent}</span>
          </h2>
          <p className="text-text-dark font-medium text-base sm:text-lg leading-relaxed max-w-lg">
            {t.desc}
          </p>
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
interface FooterProps {
  lang: Language;
  navigateAndScroll: (id: string) => void;
}

function Footer({ lang, navigateAndScroll }: FooterProps) {
  const t = TRANSLATIONS[lang].footer;
  const menuLinks = [
    { label: TRANSLATIONS[lang].navbar.about, id: 'about' },
    { label: TRANSLATIONS[lang].navbar.philosophy, id: 'philosophy' },
    { label: TRANSLATIONS[lang].navbar.genetics, id: 'genetics' },
    { label: TRANSLATIONS[lang].navbar.antlers, id: 'antlers' },
    { label: TRANSLATIONS[lang].navbar.importance, id: 'importance' },
    { label: TRANSLATIONS[lang].navbar.reindeerIntro, id: 'reindeer-intro' },
    { label: TRANSLATIONS[lang].navbar.news, id: 'news' },
    { label: TRANSLATIONS[lang].navbar.media, id: 'media' }
  ];

  return (
    <footer id="contacts" className="bg-secondary text-text-light pt-14 pb-10 px-6 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" className="h-8 w-auto object-contain" alt="Благородный Север" />
              <span className="font-serif font-medium text-xl text-accent leading-none">
                {t.logo}{t.logoItalic}
              </span>
            </div>
            <p className="text-text-light font-medium text-base leading-snug max-w-[200px]">
              {t.desc}
            </p>
          </div>

          <div>
            <div className="text-text-light text-sm mb-5 font-bold">{t.nav}</div>
            <ul className="space-y-1.5 text-text-light font-medium text-base">
              {menuLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigateAndScroll(item.id)}
                    className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] py-2 cursor-pointer text-left w-full block"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-text-light text-sm mb-5 font-bold">{t.contacts}</div>
            <ul className="space-y-1.5 text-text-light font-medium text-base">
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
              <li className="text-text-light font-medium py-2">{t.region}</li>
            </ul>
          </div>

          <div>
            <div className="text-text-light text-sm mb-5 font-bold">{t.socials}</div>
            <ul className="space-y-1.5 text-text-light font-medium text-base">
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

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-text-light text-sm font-medium">
          <p>{t.copyright}</p>
          <p>{t.owner}</p>
          <p>{t.region}</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Language>('RU');
  const [activeTab, setActiveTab] = useState<string>('main');

  // Unified routing sync via URL Hash
  const navigateAndScroll = (id: string) => {
    const validTabs = ['philosophy', 'genetics', 'antlers', 'importance', 'reindeer-intro', 'news', 'media', 'contacts', 'presentation'];
    if (validTabs.includes(id)) {
      window.location.hash = `#${id}`;
    } else {
      // Switch to main landing page first and then scroll smoothly to ID
      if (window.location.hash !== '' && window.location.hash !== '#') {
        window.location.hash = '';
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['philosophy', 'genetics', 'antlers', 'importance', 'reindeer-intro', 'news', 'media', 'contacts', 'presentation'];
      
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('main');
      }
      
      // Auto scroll to top of page on tab switches
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHash);
    handleHash(); // Run once on initial load

    return () => {
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  return (
    <main className="min-h-screen selection:bg-primary selection:text-text-light">
      <Navbar lang={lang} setLang={setLang} navigateAndScroll={navigateAndScroll} activeTab={activeTab} />
      
      {activeTab === 'main' && (
        <div key="main" className="w-full">
          <div className="bg-secondary relative">
            <Hero lang={lang} navigateAndScroll={navigateAndScroll} />
          </div>
          <About lang={lang} />
          <Directions lang={lang} navigateAndScroll={navigateAndScroll} />
          <WhyImportant lang={lang} />
          <News lang={lang} navigateAndScroll={navigateAndScroll} />
          <Media lang={lang} navigateAndScroll={navigateAndScroll} />
        </div>
      )}

      {/* Dynamic modular page containers */}
      {activeTab === 'philosophy' && (
        <TabPhilosophy key="philosophy" lang={lang} onSwitchTab={navigateAndScroll} />
      )}

      {activeTab === 'genetics' && (
        <TabGenetics key="genetics" lang={lang} />
      )}
      
      {activeTab === 'antlers' && (
        <TabAntlers key="antlers" lang={lang} onSwitchTab={navigateAndScroll} />
      )}
      
      {activeTab === 'importance' && (
        <TabIndustry key="industry" lang={lang} onSwitchTab={navigateAndScroll} />
      )}
      
      {activeTab === 'reindeer-intro' && (
        <TabPopularization key="reindeer-intro" lang={lang} onSwitchTab={navigateAndScroll} />
      )}
      
      {activeTab === 'media' && (
        <TabMedia key="media" lang={lang} onSwitchTab={navigateAndScroll} />
      )}
      
      {activeTab === 'news' && (
        <TabNews key="news" lang={lang} />
      )}
      
      {activeTab === 'presentation' && (
        <TabPresentation key="presentation" lang={lang} />
      )}

      {activeTab === 'contacts' && (
        <TabContacts key="contacts" lang={lang} />
      )}

      <Footer lang={lang} navigateAndScroll={navigateAndScroll} />
    </main>
  );
}
