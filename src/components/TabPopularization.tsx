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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-light pt-24 pb-20 text-text-dark"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* ─── Hero / Header ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-accent text-sm font-semibold tracking-wider block">
              {isRU ? 'Экскурсии и популяризация' : isCN ? '科普宣传与观光' : 'Tours & Popularization'}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[4rem] font-medium leading-tight text-text-dark">
              {isRU ? 'Познакомиться с оленеводством' : isCN ? '认识现代养鹿业' : 'Discover Deer Farming'}
            </h1>
            
            <div className="bg-bg-card border border-border-light rounded-none p-8 shadow-xs mt-4">
              <h3 className="font-serif text-lg font-semibold text-primary mb-3">
                {isRU ? 'Популяризация (Знакомство с оленями)' : isCN ? '科普宣传（亲近红鹿）' : 'Popularization (Meet the Deer)'}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-text-dark leading-relaxed">
                {isRU
                  ? 'Экскурсии, знакомство с оленями на ферме и популяризация современного оленеводства.'
                  : isCN
                    ? '开展牧场导览游、在农场与可爱的红鹿进行直接亲密接触，以及推广普及现代科学养鹿业。'
                    : 'Farm tours, contact with deer, and popularization of modern deer farming.'}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => onSwitchTab('contacts')}
                className="btn-primary cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isRU ? 'Запланировать визит' : isCN ? '预约参观农场' : 'Schedule a Visit'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="overflow-hidden rounded-none rounded-br-[40px] lg:rounded-br-[80px] shadow-lg border border-border-light aspect-[4/3] bg-white">
              <img src="/enhanced_about_4.webp" className="w-full h-full object-cover" alt="Meet the Deer" />
            </div>
            <div className="overflow-hidden rounded-none shadow-md border border-border-light aspect-[16/10] bg-white">
              <img src="/enhanced_about_5.webp" className="w-full h-full object-cover" alt="Pasture view" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
