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

    </div>
  );
}
