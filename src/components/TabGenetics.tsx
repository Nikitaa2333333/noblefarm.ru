import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Heart, Home, Activity, Award, ArrowRight, Dna, Layers, Sparkles } from 'lucide-react';
import { Language } from '../translations';

interface TabGeneticsProps {
  lang: Language;
}

const DEER_CARDS = [
  {
    name: 'Цезарь (Caesar)',
    line: 'Woburn Farm',
    pedigree: 'WB-105-A',
    ancestors: 'Потомок Woburn Red Giant',
    photo: '/enhanced_deer_1.webp',
  },
  {
    name: 'Гектор (Hector)',
    line: 'Warnham Farm',
    pedigree: 'WH-084-B',
    ancestors: 'Потомок линии Warnham трофейного типа',
    photo: '/enhanced_deer_2.webp',
  },
  {
    name: 'Оскар (Oscar)',
    line: 'Woburn / Warnham Hybrid',
    pedigree: 'HY-201-C',
    ancestors: 'Объединяет качества Woburn и Warnham',
    photo: '/enhanced_deer_3.webp',
  },
];

const CRITERIA_DATA = [
  {
    id: 'mothers',
    title: { RU: 'Подбор материнских линий', CN: '母系血统选择' },
    desc:  { RU: 'Как оценивается самка.',  CN: '母鹿是如何评估的。' },
  },
  {
    id: 'sires',
    title: { RU: 'Подбор производителей',     CN: '公鹿选择' },
    desc:  { RU: 'По каким критериям подбирается отец.', CN: '公鹿是按什么标准选择的。' },
  },
  {
    id: 'health',
    title: { RU: 'Здоровье и ветеринарный контроль', CN: '健康与兽医监管' },
    desc:  { RU: 'Показатели здоровья и развития.',  CN: '健康和发育指标。' },
  },
  {
    id: 'weight',
    title: { RU: 'Вес и физические показатели', CN: '体重与身体指标' },
    desc:  { RU: 'Оценка развития животных.',   CN: '动物发育评估。' },
  },
  {
    id: 'antlers',
    title: { RU: 'Развитие рогов',                 CN: '鹿角发育' },
    desc:  { RU: 'Что считается сильной генетикой.', CN: '什么被认为是强大的遗传基因。' },
  },
];

const ANTLER_SPECS = [
  {
    title: 'Симметрия и баланс',
    desc: 'Оценка равномерности левой и правой сторон рогов, правильности углов отхождения отростков.',
    stat: 'Показатель: 95%+',
  },
  {
    title: 'Вес и плотность',
    desc: 'Масса и минерализация костной структуры, определяющие прочность и трофейную ценность рогов.',
    stat: 'Вес: до 15-20 кг',
  },
  {
    title: 'Количество отростков',
    desc: 'Многовершинность кроны и наличие всех ключевых отростков (надглазничный, ледяной, средний).',
    stat: 'Отростков: 24-40+',
  },
];

export default function TabGenetics({ lang }: TabGeneticsProps) {
  const [subTab, setSubTab] = useState<number>(0);
  const [criteriaId, setCriteriaId] = useState<string>('mothers');

  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  const subTabTitles = isRU
    ? ['Родословные и происхождение животных', 'Трофейный тип', 'Формирование стада', 'Племенные линии']
    : isCN
      ? ['谱系与来源', '展示品级', '种群培育', '优良血统']
      : ['Pedigree & Origin', 'Trophy Type', 'Herd Formation', 'Breeding Lines'];

  const selectedCriteria = CRITERIA_DATA.find(c => c.id === criteriaId) || CRITERIA_DATA[0];

  const qualityItems = [
    { icon: <ShieldCheck className="w-5 h-5 text-accent" />, text: isRU ? 'Ветеринарный контроль' : isCN ? '兽医安全监管' : 'Veterinary Control' },
    { icon: <Activity   className="w-5 h-5 text-accent" />, text: isRU ? 'Мониторинг здоровья'   : isCN ? '健康科学监测' : 'Health Monitoring' },
    { icon: <Home       className="w-5 h-5 text-accent" />, text: isRU ? 'Условия содержания'    : isCN ? '优越饲养环境' : 'Housing Conditions' },
    { icon: <Heart      className="w-5 h-5 text-accent" />, text: isRU ? 'Развитие животных'     : isCN ? '科学动物繁育' : 'Animal Development' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ─── Hero (side-image — text left, photo right) ──────────────── */}
      <section className="hero-side-image">
        <div className="hero-side-image__grid">
          <div className="hero-side-image__text">
            <span className="hero-eyebrow">
              {isRU ? 'Генетика и племенная работа' : isCN ? '遗传学与良种繁育' : 'Genetics & Pedigree Breeding'}
            </span>
            <h1 className="hero-title">
              {isRU ? 'Генетика и ' : isCN ? '遗传学与' : 'Genetics & '}
              <span className="h-section__accent">
                {isRU ? 'племенная работа' : isCN ? '良种繁育' : 'pedigree breeding'}
              </span>
            </h1>
            <p className="hero-desc">
              {isRU
                ? 'Формирование качественного стада благородных европейских оленей на основе происхождения, племенных линий и системного отбора.'
                : isCN
                  ? '基于来源、良种血统和系统性选育，构建优质欧洲红鹿种群。'
                  : 'Formation of a high-quality breeding herd of European Red Deer based on pedigree, breeding lines, and systematic selection.'}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-primary font-bold text-xs sm:text-sm border-t border-border-light pt-5">
              <span>{isRU ? 'Племенные линии' : isCN ? '优良血统' : 'Breeding Lines'}</span>
              <span className="text-primary/40">•</span>
              <span>{isRU ? 'Родословные' : isCN ? '系谱记录' : 'Pedigrees'}</span>
              <span className="text-primary/40">•</span>
              <span>{isRU ? 'Трофейный тип' : isCN ? '展示品级' : 'Trophy Type'}</span>
              <span className="text-primary/40">•</span>
              <span>{isRU ? 'Качество пантов' : isCN ? '高品质鹿茸' : 'Antler Quality'}</span>
            </div>
          </div>
          <div className="hero-side-image__media">
            <img src="/enhanced_about_1.webp" alt={isRU ? 'Благородный олень' : 'Red deer'} loading="eager" />
          </div>
        </div>
      </section>

      {/* ─── Why Genetics + Quality Control (accent green section, two columns) ──── */}
      <section className="section-accent">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="h-section-light">
              {isRU ? 'Почему ' : isCN ? '为什么' : 'Why '}
              <span className="h-section__accent">
                {isRU ? 'генетика имеет значение' : isCN ? '遗传基因如此重要' : 'genetics matters'}
              </span>
            </h2>
            <div className="text-text-light text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-medium">
              <p>
                {isRU
                  ? 'Качество стада формируется годами и напрямую зависит от происхождения животных, племенных линий и подхода к отбору.'
                  : isCN
                    ? '群体的品质非一日之功，而是直接取决于动物的来源、优良血统以及系统科学的选育方法。'
                    : 'Herd quality is shaped over years and directly depends on the animal origin, breeding lines, and the systematic approach to selection.'}
              </p>
              <p>
                {isRU
                  ? 'В формировании нашего стада используются сильные племенные линии благородных европейских оленей (Англия) Woburn Farm, Warnham Farm, оказавшие влияние на развитие современного оленеводства.'
                  : isCN
                    ? '在构建我们农场群体时, 引进了英国著名牧场 Woburn Farm 和 Warnham Farm 的强壮欧洲红鹿血统, 这对现代世界驯鹿业的发展起到了关键作用。'
                    : 'In forming our herd, we utilize strong breeding lines of European Red Deer from England (Woburn Farm, Warnham Farm), which have influenced the development of modern deer farming.'}
              </p>
              <p>
                {isRU
                  ? 'Благородный европейский олень считается одним из наиболее перспективных видов для развития пантового направления благодаря качеству, структуре и потенциалу роста рогов.'
                  : isCN
                    ? '欧洲红鹿因其鹿茸和鹿角的高质量、卓越结构及巨大生长潜力, 被认为是发展高端鹿茸制品产业最具前景的品种。'
                    : 'European Red Deer is considered one of the most promising species for the velvet antler industry due to the superb quality, structure, and growth potential of their antlers.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6 lg:border-l lg:border-border-dark lg:pl-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-accent leading-tight">
              {isRU ? 'Контроль качества стада' : isCN ? '种群质量控制' : 'Herd Quality Control'}
            </h3>
            <p className="text-text-light text-base sm:text-lg leading-relaxed font-medium">
              {isRU
                ? 'Развитие качественного поголовья невозможно без постоянного контроля. Мы уделяем внимание ветеринарному сопровождению, условиям содержания, мониторингу состояния животных и долгосрочному развитию стада.'
                : isCN
                  ? '没有持续的监控就无法培育出优质种群。我们高度重视全方位的兽医陪护、自然的饲养条件、个体健康状态监测以及种群的长期稳步发展。'
                  : 'Developing a premium herd is impossible without constant monitoring. We pay attention to veterinary care, natural keeping conditions, health monitoring, and long-term herd development.'}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {qualityItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-secondary/40">
                  <div className="shrink-0">{item.icon}</div>
                  <span className="text-sm md:text-base font-semibold text-text-light leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sub-tabs Section (calm white) ──────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner">
          <h2 className="h-section mb-10 lg:mb-14 max-w-3xl">
            {isRU ? 'Системный ' : isCN ? '系统化的' : 'Systematic '}
            <span className="h-section__accent">
              {isRU ? 'подход к селекции' : isCN ? '育种方法' : 'breeding approach'}
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Sticky Sub-tab Menu */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 z-20">
              <div className="bg-bg-card shadow-soft rounded-[6px] p-2 flex flex-col gap-1">
                {subTabTitles.map((title, idx) => {
                  let icon = <Layers className="w-4 h-4 shrink-0" />;
                  if (idx === 1) icon = <Award    className="w-4 h-4 shrink-0" />;
                  if (idx === 2) icon = <Sparkles className="w-4 h-4 shrink-0" />;
                  if (idx === 3) icon = <Dna      className="w-4 h-4 shrink-0" />;

                  const active = subTab === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSubTab(idx)}
                      className={`flex items-center gap-3 py-3 px-5 text-sm font-semibold text-left rounded-[6px] border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                        active
                          ? 'bg-primary text-text-light border-primary'
                          : 'bg-transparent text-text-dark border-transparent hover:border-primary/40 hover:text-primary'
                      }`}
                    >
                      {icon}
                      <span className="leading-snug">{title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Sub-tab Content */}
            <div className="lg:col-span-8 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={subTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-10"
                >
                  {/* ── 1. Pedigrees & Origin ─────────────────────────── */}
                  {subTab === 0 && (
                    <>
                      <div className="max-w-3xl flex flex-col gap-4">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark leading-tight">
                          {isRU ? 'Родословные и происхождение стада' : isCN ? '种群系谱与非凡来源' : 'Pedigrees & Origin of the Herd'}
                        </h3>
                        <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                          {isRU
                            ? 'Каждое животное в хозяйстве имеет документированное происхождение. Вместе с животными были переданы родословные, позволяющие проследить линии происхождения, ключевых предков и особенности племенного потенциала.'
                            : isCN
                              ? '我们农场的每一只红鹿都拥有清晰记录的文件来源。这些正式系谱证明可追溯其血统源流、核心先祖特征及巨大的种质改良潜力。'
                              : 'Every animal on the farm has a documented origin. Along with the animals, official pedigrees were transferred, allowing us to trace lineage lines, key ancestors, and breeding potential features.'}
                        </p>
                        <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                          {isRU
                            ? 'Для части животных доступны фотографии наиболее выдающихся представителей линий, что позволяет оценивать развитие породных качеств и перспективы дальнейшей селекционной работы.'
                            : isCN
                              ? '此外, 还有部分明星公鹿的高清图像供我们分析和归档，从而能够评估系谱性状的发展并开展长期的选育繁育工作。'
                              : 'For some animals, photographs of outstanding representatives are available to assess breed traits and selection work prospects.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {DEER_CARDS.map((deer, i) => (
                          <div key={i} className="card-feature group">
                            <div className="card-feature__media aspect-[4/3]">
                              <img src={deer.photo} alt={deer.name} loading="lazy" />
                            </div>
                            <div className="card-feature__body">
                              <span className="card-feature__eyebrow">{deer.line}</span>
                              <h4 className="card-feature__title">{deer.name}</h4>
                              <div className="text-xs font-bold text-secondary bg-accent px-3 py-1.5 rounded-[6px] w-fit">
                                {isRU ? 'Родословная: ' : isCN ? '系谱编号: ' : 'Pedigree ID: '}{deer.pedigree}
                              </div>
                              <p className="card-feature__desc">
                                {isRU ? 'Известные предки: ' : isCN ? '核心先祖: ' : 'Famous Ancestors: '}{deer.ancestors}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ── 2. Trophy Type ────────────────────────────────── */}
                  {subTab === 1 && (
                    <>
                      <div className="max-w-3xl flex flex-col gap-4">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark leading-tight">
                          {isRU ? 'Трофейный тип и качество рогов' : isCN ? '展示品级与精美鹿角' : 'Trophy Type & Antler Quality'}
                        </h3>
                        <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                          {isRU
                            ? 'Наше стадо формируется на основе животных трофейного типа — направления, где особое внимание уделяется качеству, симметрии и развитию рогов.'
                            : isCN
                              ? '我们致力于培育展示品级（Trophy Type）的红鹿群体，在这一繁育方向上，鹿角的高品质、对称美和多向分叉是最核心的衡量标准。'
                              : 'Our herd is formed based on trophy-type animals — a direction where special attention is paid to the quality, symmetry, and development of antlers.'}
                        </p>
                        <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                          {isRU
                            ? 'Для благородного европейского оленя высоко ценятся мощные, гармонично развитые рога с правильной архитектурой и равномерными отростками. Такие характеристики являются важным показателем качества линий и многолетней племенной работы.'
                            : isCN
                              ? '对于欧洲红鹿，强壮、对称美观且结构完整的鹿角具有极高价值。这些特质是优秀品系和长期繁育选择的重要体现。'
                              : 'For European Red Deer, powerful, harmoniously developed antlers with correct architecture and even tines are highly valued. These characteristics are key indicators of line quality and years of breeding work.'}
                        </p>
                        <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                          {isRU
                            ? 'Именно развитие качественных рогов также напрямую связано с потенциалом пантового направления, поскольку сильная генетика и качество животных отражаются на развитии пантов.'
                            : isCN
                              ? '精美鹿角的发展也与鹿茸产业潜力直接相关，因为强大的遗传基因和动物品质直接体现在鹿茸的长势上。'
                              : 'The development of high-quality antlers is also directly linked to the potential of velvet antler harvesting, as strong genetics and animal quality are reflected in velvet growth.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ANTLER_SPECS.map((spec, i) => (
                          <div key={i} className="card-flat flex flex-col justify-between min-h-[220px]">
                            <div>
                              <Award className="w-7 h-7 text-primary mb-5" strokeWidth={1.5} />
                              <h4 className="font-serif text-xl font-bold text-text-dark mb-2 leading-tight">{spec.title}</h4>
                              <p className="text-sm font-medium text-text-dark leading-relaxed">{spec.desc}</p>
                            </div>
                            <div className="mt-5 text-secondary font-bold text-xs bg-accent px-3 py-1.5 rounded-[6px] w-fit">
                              {spec.stat}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ── 3. Herd Formation ─────────────────────────────── */}
                  {subTab === 2 && (
                    <>
                      <div className="max-w-3xl flex flex-col gap-4">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark leading-tight">
                          {isRU ? 'Как формируется стадо' : isCN ? '优质种群培育体系' : 'How the Herd is Formed'}
                        </h3>
                        <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                          {isRU
                            ? 'Племенная работа — это долгосрочный процесс, где каждое решение влияет на развитие будущих поколений животных.'
                            : isCN
                              ? '选育配种工作是一项长期复杂的工程，每一次繁育配种的选择，都将深刻影响并决定下一代红鹿的质量。'
                              : 'Breeding work is a long-term process where each selection decision directly affects the development of future animal generations.'}
                        </p>
                        <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                          {isRU
                            ? 'При формировании стада учитываются происхождение, характеристики родительских линий, состояние здоровья, экстерьер, развитие рогов, показатели веса и общее качество животных.'
                            : isCN
                              ? '在构建群体时，我们会综合评估谱系来源、父母系特质、健康状态、骨架形态、角骨长势、体重大小和动物的整体品质。'
                              : 'When forming the herd, origin, parental lineage traits, health, body build, antler development, weight, and general quality are analyzed.'}
                        </p>
                      </div>

                      <div className="bg-bg-card shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8">
                        <div className="lg:col-span-5 flex flex-col gap-2">
                          {CRITERIA_DATA.map((item) => {
                            const active = criteriaId === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => setCriteriaId(item.id)}
                                className={`flex items-center gap-3 py-3 px-5 text-sm font-semibold text-left rounded-[6px] border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                                  active
                                    ? 'bg-primary text-text-light border-primary'
                                    : 'bg-transparent text-text-dark border-transparent hover:border-primary/40 hover:text-primary'
                                }`}
                              >
                                <span className="leading-snug">
                                  {item.title[lang as 'RU' | 'CN'] || item.title.RU}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="lg:col-span-7 bg-bg-light p-6 md:p-8 flex flex-col justify-center min-h-[260px]">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={criteriaId}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="flex flex-col gap-3"
                            >
                              <h4 className="font-serif text-xl sm:text-2xl font-bold text-text-dark leading-tight">
                                {selectedCriteria.title[lang as 'RU' | 'CN'] || selectedCriteria.title.RU}
                              </h4>
                              <p className="text-text-dark text-base font-medium leading-relaxed border-l-2 border-accent pl-4">
                                {selectedCriteria.desc[lang as 'RU' | 'CN'] || selectedCriteria.desc.RU}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ── 4. Breeding Lines ─────────────────────────────── */}
                  {subTab === 3 && (
                    <>
                      <div className="max-w-3xl flex flex-col gap-4">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark leading-tight">
                          {isRU ? 'Племенные линии стада' : isCN ? '红鹿的传奇家族血统' : 'Breeding Lines of the Herd'}
                        </h3>
                        <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                          {isRU
                            ? 'Для благородного европейского оленя особенно важны породные характеристики, здоровье, развитие рогов и потенциал животного. Именно генетическая база во многом определяет качество будущего стада и перспективы пантового направления.'
                            : isCN
                              ? '对于顶级欧洲红鹿而言，高贵的品种特质、免疫健康、角骨发育以及繁育潜力至关重要。这也正是决定我们未来种群品质和高端开发潜力的磐石基底。'
                              : 'For European Red Deer, breed characteristics, health, antler development, and breeding potential are especially important. It is this genetic base that largely determines the quality of the future herd and the prospects of the velvet antler industry.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Woburn Farm */}
                        <div className="card-feature group">
                          <div className="card-feature__media aspect-[16/10]">
                            <img src="/enhanced_about_2.webp" alt="Woburn line" loading="lazy" />
                          </div>
                          <div className="card-feature__body">
                            <span className="card-feature__eyebrow">
                              {isRU ? 'Племенная линия' : isCN ? '优良血统' : 'Breeding Line'}
                            </span>
                            <h4 className="card-feature__title">Woburn Farm</h4>
                            <p className="card-feature__desc">
                              {isRU
                                ? 'Коротко: исторически значимая линия, известная сильными породными качествами.'
                                : isCN
                                  ? '简介：享有盛誉的英国古典品系，以雄壮高耸的体态和超一流的亲本遗传稳定性闻名。'
                                  : 'Briefly: a historically significant line known for strong breed qualities.'}
                            </p>
                            <a
                              href="https://www.woburnabbeydeerfarm.co.uk/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="card-feature__cta"
                            >
                              {isRU ? 'Посетить Woburn Abbey Deer Farm' : isCN ? '访问 Woburn 官方网站' : 'Visit Woburn Abbey website'}
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        {/* Warnham Farm */}
                        <div className="card-feature group">
                          <div className="card-feature__media aspect-[16/10]">
                            <img src="/enhanced_about_3.webp" alt="Warnham line" loading="lazy" />
                          </div>
                          <div className="card-feature__body">
                            <span className="card-feature__eyebrow">
                              {isRU ? 'Племенная линия' : isCN ? '优良血统' : 'Breeding Line'}
                            </span>
                            <h4 className="card-feature__title">Warnham Farm</h4>
                            <p className="card-feature__desc">
                              {isRU
                                ? 'Коротко: линия, оказавшая влияние на развитие животных трофейного типа.'
                                : isCN
                                  ? '简介：在当今全球特级鹿角及展示品级红鹿培养中，Warnham 品系扮演着极其关键的奠基角色。'
                                  : 'Briefly: a line that has had a huge influence on the breeding of outstanding trophy type.'}
                            </p>
                            <div className="flex flex-col gap-2 mt-auto">
                              <a
                                href="https://wanderlog.com/place/details/11429447/warnham-park"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-feature__cta"
                              >
                                {isRU ? 'Посетить Warnham Park' : isCN ? '查看 Warnham Park 资料' : 'Visit Warnham Park details'}
                                <ArrowRight className="w-4 h-4" />
                              </a>
                              <a
                                href="http://www.warnhampark.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-feature__cta"
                              >
                                {isRU ? 'Сайт Warnham Park (в разработке)' : isCN ? 'Warnham Park 官方网站' : 'Warnham Park website'}
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
