import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface TabPopularizationProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

export default function TabPopularization({ lang, onSwitchTab }: TabPopularizationProps) {
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  return (
    <div className="w-full">
      {/* ─── Hero / Header ────────────────────────────────────────────────── */}
      <section className="hero-side-image">
        <div className="hero-side-image__grid">
          <div className="hero-side-image__text">
            <span className="hero-eyebrow">
              {isRU ? 'Экскурсии и популяризация' : isCN ? '科普宣传与观光' : 'Tours & Popularization'}
            </span>
            <h1 className="hero-title">
              {isRU ? 'Познакомиться с ' : isCN ? '认识现代' : 'Discover '}
              <span className="h-section__accent">
                {isRU ? 'оленеводством' : isCN ? '养鹿业' : 'Deer Farming'}
              </span>
            </h1>
            <p className="hero-desc">
              {isRU
                ? 'Экскурсии, знакомство с оленями на ферме и популяризация современного оленеводства.'
                : isCN
                  ? '开展牧场导览游、在农场与可爱的红鹿进行直接亲密接触，以及推广普及现代科学养鹿业。'
                  : 'Farm tours, contact with deer, and popularization of modern deer farming.'}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => onSwitchTab('contacts')}
                className="btn-primary cursor-pointer flex items-center justify-center gap-2"
              >
                {isRU ? 'Запланировать визит' : isCN ? '预约参观农场' : 'Schedule a Visit'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="hero-side-image__media">
            <img src="/enhanced_about_4.webp" alt="Meet the Deer" />
          </div>
        </div>
      </section>

      {/* ─── Section 1: Detailed view & contacts ───────────────────────────── */}
      <section className="section-accent">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-[16/10] overflow-hidden rounded-none shadow-soft-lg">
                <img src="/enhanced_about_5.webp" className="w-full h-full object-cover" alt="Pasture view" />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h2 className="h-section-light">
                {isRU ? 'Популяризация ' : isCN ? '科普宣传 ' : 'Popularization '}
                <span className="h-section__accent">
                  {isRU ? '(Знакомство с оленями)' : isCN ? '（亲近红鹿）' : '(Meet the Deer)'}
                </span>
              </h2>
              <p className="text-text-light text-base sm:text-lg leading-relaxed font-medium">
                {isRU
                  ? 'Экскурсии, знакомство с оленями на ферме и популяризация современного оленеводства.'
                  : isCN
                    ? '开展牧场导览游、在农场与可爱的红鹿进行直接亲密接触，以及推广普及现代科学养鹿业。'
                    : 'Farm tours, contact with deer, and popularization of modern deer farming.'}
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => onSwitchTab('contacts')}
                  className="btn-outline-light cursor-pointer flex items-center justify-center gap-2"
                >
                  {isRU ? 'Запланировать визит' : isCN ? '预约参观农场' : 'Schedule a Visit'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
