import { motion } from 'motion/react';
import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface TabAntlersProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

export default function TabAntlers({ lang, onSwitchTab }: TabAntlersProps) {
  const [activePhase, setActivePhase] = useState(0);
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  // Timelines & lists word-for-word
  const timelineGrowth = [
    { season: isRU ? 'Весна' : '春天', phase: isRU ? 'начало роста' : '开始生长' },
    { season: isRU ? 'Начало лета' : '初夏', phase: isRU ? 'активный рост' : '快速生长' },
    { season: isRU ? 'Середина лета' : '仲夏', phase: isRU ? 'максимальное развитие' : '最大发育' },
    { season: isRU ? 'Конец сезона' : '季末', phase: isRU ? 'формирование рогов' : '鹿角成型' },
  ];

  const historicalTimeline = [
    { title: isRU ? 'Древний Китай' : '古代中国', desc: '' },
    { title: isRU ? 'Традиции Восточной Азии' : '东亚传统', desc: '' },
    { title: isRU ? 'Мараловодство Алтая' : '阿尔泰马鹿养殖', desc: '' },
    { title: isRU ? 'Современные технологии Новой Зеландии' : '新西兰现代技术', desc: '' },
    { title: isRU ? 'Современное пантовое направление' : '现代鹿茸产业', desc: '' },
  ];

  const whatIsStudied = [
    isRU ? 'процессы регенерации тканей' : '组织再生过程',
    isRU ? 'восстановительные механизмы организма' : '身体恢复机制',
    isRU ? 'иммунные процессы' : '免疫调节过程',
    isRU ? 'антиоксидантная активность' : '抗氧化活性',
    isRU ? 'энергообеспечение и адаптация к нагрузкам' : '能量供应与负荷适应',
    isRU ? 'состояние мышц, суставов и костной ткани' : '肌肉、关节和骨骼组织状态',
    isRU ? 'косметологические и regenerative-направления' : '美容与再生医学方向',
  ];

  const applications = [
    {
      title: isRU ? 'Спорт и высокие нагрузки' : '体育与高负荷',
      desc: isRU ? 'Поддержка восстановительных процессов и выносливости.' : '支持身体恢复过程并提高耐力。',
    },
    {
      title: isRU ? 'Реабилитационные направления' : '康复医学方向',
      desc: isRU ? 'Изучение восстановительных механизмов.' : '研究机体恢复机制。',
    },
    {
      title: isRU ? 'Косметология и wellness' : '美容与健康养生',
      desc: isRU ? 'Экстракты, уходовые продукты, SPA-практики.' : '提取物、护理产品和水疗养生。',
    },
    {
      title: isRU ? 'Курортология' : '疗养学与温泉疗法',
      desc: isRU ? 'Традиционные форматы восстановительных программ.' : '传统的机体恢复理疗项目。',
    },
    {
      title: isRU ? 'Активный образ жизни' : '积极健康的生活方式',
      desc: isRU ? 'Поддержание общего ресурса организма.' : '保持身体的整体活力资源。',
    },
  ];

  const composition = [
    isRU ? 'Аминокислоты' : '氨基酸',
    isRU ? 'Пептиды' : '活性肽',
    isRU ? 'Коллагеновые соединения' : '胶原蛋白化合物',
    isRU ? 'Макро- и микроэлементы' : '常量与微量元素',
    isRU ? 'Липиды' : '脂质类化合物',
    isRU ? 'Биологически активные вещества' : '生物活性物质',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ─── Hero / Header ────────────────────────────────────────────────── */}
      <section className="hero-side-image">
        <div className="hero-side-image__grid">
          <div className="hero-side-image__text">
            <span className="hero-eyebrow">
              {isRU ? 'Биологические ресурсы' : isCN ? '生物资源开发' : 'Biological Resources'}
            </span>
            <h1 className="hero-title">
              {isRU ? 'Пантовое ' : isCN ? '鹿茸' : 'Velvet Antler '}
              <span className="h-section__accent">
                {isRU ? 'направление' : isCN ? '产业方向' : 'Direction'}
              </span>
            </h1>
            <p className="hero-desc">
              {isRU
                ? 'Одно из наиболее перспективных направлений современного оленеводства, основанное на уникальных биологических свойствах молодых рогов благородного оленя.'
                : isCN
                  ? '基于欧洲红鹿幼角独特的生物学特性，这是现代养鹿业最具前景的发展方向之一。'
                  : 'One of the most promising directions of modern deer farming, based on the unique biological properties of young European Red Deer antlers.'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-primary font-bold text-sm mt-2">
              <span>{isRU ? 'Наука' : isCN ? '科学研究' : 'Science'}</span>
              <span>•</span>
              <span>{isRU ? 'Биоресурсы' : isCN ? '生物资源' : 'Bioresources'}</span>
              <span>•</span>
              <span>{isRU ? 'Исследования' : isCN ? '学术探索' : 'Research'}</span>
              <span>•</span>
              <span>{isRU ? 'Международный опыт' : isCN ? '国际经验' : 'International Experience'}</span>
            </div>
          </div>
          <div className="hero-side-image__media">
            <img src="/enhanced_about_6.webp" alt="Velvet Antlers" />
          </div>
        </div>
      </section>

      {/* ─── Unique Biological Phenomenon ─────────────────────────────────── */}
      <section className="section-accent">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h2 className="h-section-light">
                {isRU ? 'Уникальность, которой почти ' : isCN ? '自然界几乎独一无二的' : 'Uniqueness Almost Unseen in '}
                <span className="h-section__accent">{isRU ? 'нет в природе' : isCN ? '独特性' : 'Nature'}</span>
              </h2>
              <div className="text-text-light text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-medium">
                <p>
                  {isRU
                    ? 'Панты — это молодые неокостеневшие рога благородного оленя в фазе активного роста. В этот период они имеют мягкую структуру, интенсивное кровоснабжение и покрыты бархатистой тканью.'
                    : isCN
                      ? '鹿茸是欧洲红鹿处于快速生长阶段的未骨化幼角。在此期间，它们结构柔软，血液循环极其丰富，并覆有一层丝绒状的软皮组织。'
                      : 'Velvet antlers are the young, unossified antlers of Red Deer in the active growth phase. During this period, they have a soft structure, intensive blood supply, and are covered with velvet fabric.'}
                </p>
                <p>
                  {isRU
                    ? 'Их уникальность заключается в способности к полной ежегодной регенерации. После естественного сброса рогов олень ежегодно заново формирует новую структуру — процесс, практически не встречающийся среди млекопитающих.'
                    : isCN
                      ? '其独特之处在于具有每年完全再生的神奇能力。在老角自然脱落后，红鹿每年都会重新生长出完整的全新鹿角结构——这一再生过程在哺乳动物中几乎绝无仅有。'
                      : 'Their uniqueness lies in the ability to undergo complete annual regeneration. After the natural shedding of hard antlers, the deer rebuilds a new structure every year—a process virtually unseen in other mammals.'}
                </p>
                <p>
                  {isRU
                    ? 'Молодые рога растут с невероятной скоростью — от 1 до 4 см в сутки, а полный цикл развития занимает около 4 месяцев. Благодаря такой интенсивности роста и сложности формирования тканей панты давно вызывают интерес исследователей в области регенерации, биологии роста и восстановительных процессов.'
                    : isCN
                      ? '幼角以惊人的速度生长——每天生长1至4厘米，完整的生长周期仅需约4个月。得益于如此惊人的生长速度和复杂的组织形成，鹿茸长期以来一直吸引着组织再生、生长生物学和身体修复机制领域研究人员的极大兴趣。'
                      : 'Young antlers grow at an incredible rate of 1 to 4 cm per day, with the full development cycle taking about 4 months. Due to this high intensity, they have long intrigued scientists.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Stats Grid inside accent section - use bg-secondary/40 tiles for dark bg! */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-secondary/40 p-6 rounded-none flex flex-col gap-2">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accent leading-none">
                    1–4 {isRU ? 'см в день' : '厘米/天'}
                  </span>
                  <span className="text-xs font-bold text-text-light/90 tracking-wider mt-1">
                    {isRU ? 'скорость роста' : '生长速度'}
                  </span>
                </div>
                <div className="bg-secondary/40 p-6 rounded-none flex flex-col gap-2">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accent leading-none">
                    ≈ 4 {isRU ? 'месяца' : '个月'}
                  </span>
                  <span className="text-xs font-bold text-text-light/90 tracking-wider mt-1">
                    {isRU ? 'полный цикл формирования' : '完整生长周期'}
                  </span>
                </div>
                <div className="bg-secondary/40 p-6 rounded-none flex flex-col gap-2">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accent leading-none">
                    100% {isRU ? 'регенерация' : '每年完全再生'}
                  </span>
                  <span className="text-xs font-bold text-text-light/90 tracking-wider mt-1">
                    {isRU ? 'уникальная способность среди млекопитающих' : '哺乳动物中罕见的再生机制'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Growth Timeline */}
          <div className="mt-16 border-t border-border-dark pt-10">
            <h3 className="font-serif text-xl font-semibold text-text-light mb-8 text-center md:text-left">
              {isRU ? 'Таймлайн роста пантов' : isCN ? '鹿茸生长时间线' : 'Antler Growth Timeline'}
            </h3>

            {/* Timeline Stepper Container */}
            <div className="relative flex flex-col gap-10">
              {/* Stepper nodes */}
              <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0 z-10">
                {/* Horizontal line underneath nodes */}
                <div className="absolute top-[16px] left-[10%] right-[10%] h-[2px] bg-border-dark/30 hidden md:block z-0">
                  <div 
                    className="h-full bg-accent transition-all duration-500 ease-out"
                    style={{ width: `${(activePhase / (timelineGrowth.length - 1)) * 100}%` }}
                  />
                </div>

                {timelineGrowth.map((t, idx) => {
                  const isActive = idx === activePhase;
                  const isCompleted = idx <= activePhase;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePhase(idx)}
                      className="relative z-10 flex flex-col items-center md:items-start gap-3 md:gap-0 md:w-1/4 text-center md:text-left group cursor-pointer focus-visible:outline-none"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm font-bold shrink-0 md:mb-4 transition-all duration-500 border ${
                        isActive
                          ? 'bg-accent text-secondary border-accent scale-110 shadow-soft-lg ring-4 ring-accent/30'
                          : isCompleted
                            ? 'bg-accent/80 text-secondary border-accent'
                            : 'bg-secondary border-border-dark text-text-light/50 group-hover:border-accent group-hover:text-accent/90'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive || isCompleted ? 'bg-secondary' : 'bg-text-light/40 group-hover:bg-accent'}`} />
                      </div>
                      <div className="flex flex-col items-center md:items-start">
                        <h4 className={`font-serif text-lg font-bold mb-1 transition-colors duration-300 ${
                          isActive ? 'text-accent' : 'text-text-light'
                        }`}>
                          {t.season}
                        </h4>
                        <p className={`text-xs font-semibold px-2.5 py-1 rounded-[6px] w-fit leading-none transition-all duration-300 ${
                          isActive ? 'bg-accent text-secondary' : 'bg-secondary/40 text-text-light/80'
                        }`}>
                          {t.phase}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-secondary/40 py-5 px-6 md:py-5 md:px-7 rounded-none shadow-soft max-w-3xl"
              >
                <div className="flex-1">
                  <span className="text-accent text-xs font-bold tracking-wider block mb-1">
                    {isRU ? 'Текущая фаза развития' : isCN ? '当前生长阶段' : 'Active Growth Phase'}
                  </span>
                  <h4 className="font-serif text-xl md:text-2xl font-bold text-text-light mb-2 leading-tight">
                    {timelineGrowth[activePhase].season} — <span className="text-accent">{timelineGrowth[activePhase].phase}</span>
                  </h4>
                  <p className="text-sm text-text-light/85 max-w-2xl leading-relaxed">
                    {activePhase === 0 && (
                      isRU 
                        ? 'С наступлением весны начинается новый годовой цикл. После сброса старых рогов запускается процесс стремительной регенерации и формирования молодых пантов.' 
                        : isCN
                          ? '随着春天的到来，新的年度周期开始。老角脱落后，幼角开始进入极其迅速的再生与形成过程。'
                          : 'With the arrival of spring, a new annual cycle begins. After the shedding of old antlers, the process of rapid regeneration starts.'
                    )}
                    {activePhase === 1 && (
                      isRU 
                        ? 'Период максимальной интенсивности роста. Молодые панты насыщаются микроэлементами, а скорость деления клеток достигает наивысших показателей.' 
                        : isCN
                          ? '生长强度达到巅峰的时期。新生的鹿茸中富含各种微量元素，细胞分裂速度达到全年的最高水平。'
                          : 'The period of maximum growth intensity. Young antlers are saturated with trace elements, and cell division reaches its peak.'
                    )}
                    {activePhase === 2 && (
                      isRU 
                        ? 'Завершающий этап активного накопления полезных биологически активных веществ. Панты достигают своего максимального объема и ценности.' 
                        : isCN
                          ? '活性生物营养物质积累的最后阶段。鹿茸在此期间达到最大的体积与极高药用价值。'
                          : 'The final phase of active accumulation of beneficial bio-compounds. Antlers reach their maximum size and value.'
                    )}
                    {activePhase === 3 && (
                      isRU 
                        ? 'Происходит естественное окостенение структуры рогов. Завершается фаза регенерации и роста до следующего сезона.' 
                        : isCN
                          ? '鹿角结构开始自然骨化。再生与生长阶段完全结束，直至下一个年度周期的到来。'
                          : 'Natural ossification of the antler structure begins. The regeneration and growth phase concludes until the next season.'
                    )}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── History & Centuries-Old Value ─────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner">
          <div className="max-w-3xl mb-12">
            <h2 className="h-section mb-4">
              {isRU ? 'Ценность, известная на протяжении ' : isCN ? '流传数个世纪的' : 'Value Known for '}
              <span className="h-section__accent">{isRU ? 'столетий' : isCN ? '珍贵价值' : 'Centuries'}</span>
            </h2>
            <div className="text-text-dark text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-medium">
              <p>
                {isRU
                  ? 'Панты оленя ценились на протяжении многих веков и занимали особое место в культурах Азии. Исторические упоминания об их использовании встречаются в традициях Китая, Кореи, Монголии и других регионов, где олень воспринимался как символ силы, жизненной энергии и восстановления.'
                  : isCN
                    ? '数世纪以来，鹿茸一直备受推崇，并在亚洲传统文化中占有特殊地位。关于其使用的历史记载广泛见于中国、韩国、蒙古等地区的传统典籍中，在这些文化中，红鹿被视为力量、蓬勃生命力和元气恢复的象征。'
                    : 'Deer antlers have been valued for many centuries and held a special place in Asian cultures. Historical mentions are found in traditions of China, Korea, Mongolia, and other regions.'}
              </p>
              <p>
                {isRU
                  ? 'В XX–XXI веках интерес к пантам вышел далеко за рамки традиционных практик. Сегодня они являются объектом исследований и частью индустрии природных биоресурсов в ряде стран мира.'
                  : isCN
                    ? '进入20至21世纪，对鹿茸的关注已远远超出了传统习俗的范畴。今天，它们不仅是现代科学深入研究的对象，也已成为全球多个国家自然生物资源开发产业的重要组成部分。'
                    : 'In the 20th and 21st centuries, interest in velvet antlers went far beyond traditional practices. Today, they are objects of research and part of the natural bioresource industry in several countries.'}
              </p>
            </div>
          </div>

          {/* Historical timeline cards */}
          <div className="border-t border-border-light pt-8">
            <h3 className="font-serif text-sm font-semibold text-accent tracking-wider mb-8">
              {isRU ? 'Исторический путь' : isCN ? '历史发展轨迹' : 'Historical Path'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {historicalTimeline.map((item, idx) => (
                <div key={idx} className="card-flat flex gap-4 items-center group hover:-translate-y-1 hover:shadow-soft-lg transition-all duration-300">
                  <span className="font-serif text-lg font-bold text-accent shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="font-bold text-xs md:text-sm text-text-dark leading-snug">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Scientific Interest ───────────────────────────────────────────── */}
      <section className="section-accent">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Intro */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <h2 className="h-section-light">
                {isRU ? 'Почему панты изучают ' : isCN ? '为什么科学家热衷于' : 'Why Scientists Study '}
                <span className="h-section__accent">{isRU ? 'учёные' : isCN ? '研究鹿茸' : 'Velvet Antlers'}</span>
              </h2>
              <p className="text-text-light text-base sm:text-lg leading-relaxed font-medium">
                {isRU
                  ? 'Благодаря способности к регулярной регенерации и высокой скорости роста панты стали объектом научного интереса в различных областях — от биологии тканей до восстановительных процессов организма. Исследования посвящены изучению биологического состава пантов, механизмов роста тканей и потенциальной роли отдельных компонентов в процессах восстановления и адаптации организма.'
                  : isCN
                    ? '得益于其定期再生能力 and 极快的生长速度，鹿茸已成为从组织生物学到人体机能恢复等多个科学领域的研究热点。相关学术探索致力于深入揭示鹿茸的复杂生物化学成分、组织生长的细胞分子机制，以及特定活性成分在促进人体损伤修复和环境适应中的潜在效能。'
                    : 'Due to their ability for regular regeneration and rapid growth, velvet antlers have become an object of scientific interest in fields from tissue biology to recovery processes. Research is devoted to analyzing their bio-composition and role in adaptation.'}
              </p>
              
              <div className="mt-4 p-6 bg-secondary/40 rounded-none">
                <h4 className="font-serif text-base sm:text-lg font-bold text-accent mb-4">
                  {isRU ? 'Где применяется в мировой практике' : isCN ? '全球主要应用领域' : 'Global Application Practice'}
                </h4>
                <div className="flex flex-col gap-4">
                  {applications.map((app, i) => (
                    <div key={i} className="text-sm font-semibold leading-relaxed text-text-light border-b border-white/5 last:border-0 pb-3 last:pb-0">
                      <span className="text-accent font-bold block">{app.title}</span>
                      <span className="text-text-light/95 block mt-0.5">{app.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Checklist */}
            <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-10">
              <h3 className="font-serif text-xl sm:text-2xl text-accent font-medium mb-2">
                {isRU ? 'Что изучается' : isCN ? '核心科研探索方向' : 'What is Studied'}
              </h3>
              <div className="flex flex-col gap-3">
                {whatIsStudied.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-secondary/40 p-4 rounded-none">
                    <Check className="w-5 h-5 text-accent shrink-0" strokeWidth={2.5} />
                    <span className="text-xs md:text-sm font-semibold text-text-light">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-border-dark pt-6 flex flex-col gap-4">
                <button className="btn-outline-light cursor-not-allowed opacity-60 text-xs py-3.5 px-7 w-fit leading-none">
                  {isRU ? 'Научные исследования (в разработке)' : isCN ? '学术研究论著（开发中）' : 'Scientific Research (In Development)'}
                </button>
                <p className="text-[10px] font-semibold text-text-light/70 leading-relaxed max-w-md italic">
                  {isRU
                    ? '*Представленная информация носит ознакомительный характер и не является медицинским утверждением.'
                    : isCN
                      ? '*本网站所载信息仅供科普参考，不构成任何医疗诊断或治疗建议。'
                      : '*The presented information is for educational purposes only and is not a medical claim.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Biological Composition ────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner">
          <div className="max-w-3xl mb-8">
            <h2 className="h-section mb-4">
              {isRU ? 'Биологический состав ' : isCN ? '鹿茸的天然' : 'Biological '}
              <span className="h-section__accent">{isRU ? 'пантов' : isCN ? '生物化学成分' : 'Composition'}</span>
            </h2>
            <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
              {isRU
                ? 'Исследования показывают наличие в пантах комплекса природных компонентов, включая:'
                : isCN
                  ? '多项现代科学检测表明，鹿茸中蕴含着极为丰富的天然营养活性复合物，主要包括：'
                  : 'Studies reveal a rich complex of natural compounds in velvet antlers, including:'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {composition.map((item, idx) => (
              <div key={idx} className="card-flat flex items-center justify-between min-h-[90px] group hover:-translate-y-1 hover:shadow-soft-lg transition-all duration-300">
                <span className="font-serif text-sm sm:text-base font-bold text-text-dark leading-snug">{item}</span>
                <span className="text-xs font-serif text-accent font-bold ml-2">{(idx+1).toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-border-light pt-6">
            <p className="text-[11px] font-semibold text-text-dark/80 italic">
              {isRU
                ? 'Состав зависит от генетики животного, периода роста, условий содержания и технологии переработки.'
                : isCN
                  ? '其具体的化学组成比例与动物品系基因、生长期阶段、自然放牧环境以及科学精细的加工收茸技术密切相关。'
                  : 'The specific composition depends on animal genetics, growth period, keeping conditions, and processing technology.'}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Quality Starts with Genetics ─────────────────────────────────── */}
      <section className="section-accent">
        <div className="section-inner flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="h-section-light mb-4">
              {isRU ? 'Качество пантов начинается с ' : isCN ? '高品质鹿茸源于优质种群' : 'Antler Quality Starts with '}
              <span className="h-section__accent">{isRU ? 'качества стада' : isCN ? '优质种群' : 'Herd Quality'}</span>
            </h2>
            <div className="text-text-light text-base sm:text-lg leading-relaxed flex flex-col gap-3 font-medium">
              <p>
                {isRU
                  ? 'Потенциал развития пантов напрямую связан с происхождением животных, качеством племенных линий, здоровьем стада и подходом к селекции.'
                  : isCN
                    ? '鹿茸丰产和高品质的长势潜力，与红鹿个体的纯正血统来源、核心种公牛遗传素质、整体健康状况以及长期的科学配种密不可分。'
                    : 'The growth potential of velvet antlers is directly linked to the origin of animals, the quality of breeding lines, herd health, and the selection approach.'}
              </p>
              <p>
                {isRU
                  ? 'Благородный европейский олень отличается мощным развитием рогов и высоким потенциалом для развития пантового направления. Именно поэтому генетика и племенная работа являются фундаментом качества.'
                  : isCN
                    ? '欧洲红鹿以其角骨生长极为粗壮和巨大的鹿茸开发前景著称。因此，长期的遗传改良和纯血选育是我们无可动摇的品质基石。'
                    : 'European Red Deer is characterized by powerful antler development and a high potential for the industry. That is why genetics is the foundation of quality.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSwitchTab('genetics')}
            className="btn-outline-light shrink-0 self-start md:self-auto flex items-center justify-center gap-2"
          >
            {isRU ? 'Генетика и племенная работа' : isCN ? '遗传学与良种繁育' : 'Genetics & Pedigree'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ─── Our Approach ─────────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner">
          <h2 className="h-section mb-6">
            {isRU ? 'Наш взгляд на ' : isCN ? '我们对该领域的' : 'Our Approach to the '}
            <span className="h-section__accent">{isRU ? 'развитие направления' : isCN ? '长远愿景' : 'Industry'}</span>
          </h2>
          <div className="text-text-dark text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-medium max-w-3xl">
            <p>
              {isRU
                ? 'В «Благородном Севере» мы рассматриваем пантовое направление как долгосрочную часть развития хозяйства, основанную на качестве животных, ответственном подходе, ветеринарном сопровождении и системной племенной работе.'
                : isCN
                  ? '在“高贵北方”，我们将高品质鹿茸产业视为农场长远发展战略的核心一环。这一方向牢固建立在红鹿卓越的种质遗传、极其负责的人道养殖模式、全天候的兽医安全保障和系统化选育工作之上。'
                  : 'At "Noble Sever", we view the velvet antler direction as a long-term part of the farm development, based on animal quality, responsible approach, veterinary support, and systematic pedigree breeding.'}
            </p>
            <p>
              {isRU
                ? 'В перспективе мы планируем развитие собственного пантового направления и изучение современных подходов к переработке и созданию качественной продукции.'
                : isCN
                  ? '展望未来，我们计划逐步开发自身的鹿茸深加工提取模块，深入探究国际领先的高附加值深加工提取技术，力求为市场奉献高纯度、高品质的精制深加工产品。'
                  : 'In the future, we plan to develop our own velvet harvesting capacities and study modern approaches to deep processing and high-value product creation.'}
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
