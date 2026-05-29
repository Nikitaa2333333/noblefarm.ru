import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Language } from '../translations';

interface TabNewsProps {
  lang: Language;
}

const NEWS_DATA = [
  // Seeded articles from Вкладки 6.7.8.md - Born first calf ❤️ is ALWAYS first!
  {
    id: 'news_calf',
    category: 'Olenyata',
    categoryLabel: { RU: 'Оленята', CN: '小鹿幼崽' },
    date: { RU: '15 мая 2026', CN: '2026年5月15日' },
    title: { RU: 'Родился первый оленёнок ❤️', CN: '迎来第一只小鹿幼崽诞生 ❤️' },
    text: {
      RU: 'Первый малыш от одной из ключевых самок нашего стада.',
      CN: '这是我们农场核心母红鹿所产下的第一只小生命。',
    },
    image: '/enhanced_about_4.webp',
  },
  {
    id: 'news_pasture_exit',
    category: 'Stado',
    categoryLabel: { RU: 'Стадо', CN: '鹿群' },
    date: { RU: '10 мая 2026', CN: '2026年5月10日' },
    title: { RU: 'Первый выход на пастбище', CN: '鹿群首次进入春季牧场' },
    text: {
      RU: 'Первое знакомство стада с новыми весенними пастбищами.',
      CN: '鹿群首次与春暖花开的新牧场进行亲密接触。',
    },
    image: '/enhanced_about_8.webp',
  },
  {
    id: 'news_antlers_growth',
    category: 'Panty',
    categoryLabel: { RU: 'Панты', CN: '鹿茸' },
    date: { RU: '08 мая 2026', CN: '2026年5月8日' },
    title: { RU: 'Как растут панты', CN: '探秘鹿茸是如何生长的' },
    text: {
      RU: 'Наблюдаем за началом активной фазы ежегодного роста молодых рогов.',
      CN: '实时记录观察每年幼角开始活跃生长的最初始阶段。',
    },
    image: '/enhanced_about_6.webp',
  },
  {
    id: 'news_infra',
    category: 'Stroitelstvo',
    categoryLabel: { RU: 'Строительство', CN: '牧场基建' },
    date: { RU: '05 мая 2026', CN: '2026年5月5日' },
    title: { RU: 'Подготовка инфраструктуры', CN: '现代牧场基础设施建设' },
    text: {
      RU: 'Завершаем обустройство надежных ограждений и загонов.',
      CN: '高标准的安全护栏与围网设施的搭建工作已全部顺利完工。',
    },
    image: '/enhanced_about_9.webp',
  },
  {
    id: 'news_maral_diff',
    category: 'Otrasl',
    categoryLabel: { RU: 'Отрасль', CN: '行业知识' },
    date: { RU: '03 мая 2026', CN: '2026年5月3日' },
    title: { RU: 'Почему благородного оленя часто путают с маралом', CN: '为什么欧洲红鹿常被误认为是阿尔泰马鹿' },
    text: {
      RU: 'Разбираемся в видовых особенностях и биологических отличиях.',
      CN: '系统剖析红鹿与马鹿在物种品系、体态特征和生物学层面的本质区别。',
    },
    image: '/enhanced_deer_1.webp',
  },
  {
    id: 'news_one_day',
    category: 'Zhizn_fermy',
    categoryLabel: { RU: 'Жизнь фермы', CN: '农场日常' },
    date: { RU: '01 мая 2026', CN: '2026年5月1日' },
    title: { RU: 'Один день на ферме', CN: '探秘农场平凡而忙碌的一天' },
    text: {
      RU: 'Рассказываем о повседневных ветеринарных заботах и жизни нашего стада.',
      CN: '为您细细讲述繁育人员日常的兽医健康护理与鹿群悠闲的日常生活。',
    },
    image: '/enhanced_about_1.webp',
  },
  // Real posts from kfh_noble VK channel as additional seeded news
  {
    id: 'news_brand_reg',
    category: 'Otrasl',
    categoryLabel: { RU: 'Отрасль', CN: '行业知识' },
    date: { RU: '18 мая 2026', CN: '2026年5月18日' },
    title: { RU: 'Регистрация бренда «Благородный Север»', CN: '“高贵北方”自主品牌商标顺利注册' },
    text: {
      RU: 'Официально зарегистрировали товарный знак нашего фермерского хозяйства. Это важный шаг для защиты бренда и будущего развития линейки пантовой продукции!',
      CN: '我们农场正式完成了官方商标和品牌注册。这是保护我们自主品牌、推进后续鹿茸和鹿角精深加工制品开发迈出的极其关键的战略性一步！',
    },
    image: '/enhanced_about_2.webp',
  },
  {
    id: 'news_new_pastures',
    category: 'Stroitelstvo',
    categoryLabel: { RU: 'Строительство', CN: '牧场基建' },
    date: { RU: '17 мая 2026', CN: '2026年5月17日' },
    title: { RU: 'Обустройство новых пастбищ', CN: '春季广袤新草场围网搭建' },
    text: {
      RU: 'Завершаем монтаж качественного ограждения для просторных вольеров. Безопасность и естественные условия содержания оленей — наш главный приоритет.',
      CN: '我们正在加紧完成宽敞生态围栏的高质量护栏安装。确保鹿群的绝对安全和还原最自然的生存繁衍环境，是我们农场始终如一的首要宗旨。',
    },
    image: '/enhanced_about_3.webp',
  },
  {
    id: 'news_molt_season',
    category: 'Stado',
    categoryLabel: { RU: 'Стадо', CN: '鹿群' },
    date: { RU: '16 мая 2026', CN: '2026年5月16日' },
    title: { RU: 'Адаптация и сезон линьки оленей', CN: '鹿群完全适应环境与春季换毛期' },
    text: {
      RU: 'Наши благородные олени активно меняют шерсть к лету. Ветеринарные специалисты отмечают отличный аппетит и прекрасное здоровье всего стада.',
      CN: '我们引进的红鹿开始褪去厚重的冬毛，长出光滑亮丽的夏毛。随行兽医专家评估指出，整个群体食欲极为旺盛，展现出极其健康的生命体征。',
    },
    image: '/enhanced_deer_2.webp',
  },
];

export default function TabNews({ lang }: TabNewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  const categories = [
    { id: 'all', label: { RU: 'Все', CN: '全部' } },
    { id: 'Zhizn_fermy', label: { RU: 'Жизнь фермы', CN: '农场日常' } },
    { id: 'Olenyata', label: { RU: 'Оленята', CN: '小鹿幼崽' } },
    { id: 'Stado', label: { RU: 'Стадо', CN: '鹿群' } },
    { id: 'Panty', label: { RU: 'Панты', CN: '鹿茸' } },
    { id: 'Stroitelstvo', label: { RU: 'Строительство', CN: '牧场基建' } },
    { id: 'Otrasl', label: { RU: 'Отрасль', CN: '行业知识' } },
  ];

  // Filter logic
  const filteredNews = selectedCategory === 'all'
    ? NEWS_DATA
    : NEWS_DATA.filter(item => item.category === selectedCategory);

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <span className="text-accent text-sm font-semibold tracking-wider block mb-3">
              {isRU ? 'События и репортажи' : isCN ? '新闻动态' : 'News & Events'}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[4.5rem] font-medium leading-none text-text-dark">
              {isRU ? 'Новости хозяйства' : isCN ? '农场动态' : 'Farm News'}
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-medium text-text-dark max-w-3xl leading-relaxed">
              {isRU
                ? 'Развитие проекта, жизнь стада, рождение оленят, формирование хозяйства и наблюдения из мира современного оленеводства.'
                : isCN
                  ? '为您带来项目最新建设进展、鹿群繁育生活、首批小鹿诞生喜讯，以及关于现代科学养鹿产业的第一手前沿行业科普观察。'
                  : 'Project progress, herd life, fawn births, farm development, and observations from the world of modern deer farming.'}
            </p>
          </div>
          <div className="lg:col-span-4 overflow-hidden rounded-none rounded-br-[40px] lg:rounded-br-[80px] shadow-lg border border-border-light aspect-[4/3] bg-white">
            <img src="/enhanced_deer_3.webp" className="w-full h-full object-cover" alt="Calf" />
          </div>
        </div>

        {/* ─── Categories Filter Bar ────────────────────────────────────────── */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-bg-card rounded-[8px] border border-border-light shadow-sm w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-3 rounded-[6px] text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-text-light shadow-sm'
                    : 'text-text-dark hover:text-primary hover:bg-primary/5'
                }`}
              >
                {cat.label[lang as 'RU' | 'CN'] || cat.label.RU}
              </button>
            ))}
          </div>
        </div>

        {/* ─── News Grid with Layout Transitions ────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <motion.a
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                href="https://vk.com/kfh_noble"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-bg-card border border-border-light rounded-none overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-accent hover:-translate-y-1.5 transition-all duration-500"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-white">
                    <img
                      src={item.image}
                      alt={item.title[lang as 'RU' | 'CN'] || item.title.RU}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center text-[10px] font-bold text-accent tracking-wider mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date[lang as 'RU' | 'CN'] || item.date.RU}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{item.categoryLabel[lang as 'RU' | 'CN'] || item.categoryLabel.RU}</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-text-dark group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {item.title[lang as 'RU' | 'CN'] || item.title.RU}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed mt-3 line-clamp-3">
                      {item.text[lang as 'RU' | 'CN'] || item.text.RU}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-accent group-hover:gap-2.5 transition-all duration-300 mt-auto">
                    {isRU ? 'Читать далее' : isCN ? '阅读详细报道' : 'Read More'} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ─── Footer CTA ───────────────────────────────────────────────────── */}
        <div className="mt-16 text-center border-t border-border-light pt-8">
          <p className="font-serif text-base sm:text-lg font-medium text-text-dark italic">
            {isRU
              ? 'Следите за развитием современного оленеводства в России'
              : isCN
                ? '关注俄罗斯现代高端养鹿产业的发展动向'
                : 'Follow the development of modern deer farming in Russia'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
