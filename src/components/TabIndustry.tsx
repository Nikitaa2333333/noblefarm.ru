import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Globe, Award, Sparkles, Layers } from 'lucide-react';
import { Language } from '../translations';

interface TabIndustryProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

export default function TabIndustry({ lang, onSwitchTab }: TabIndustryProps) {
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const regions = [
    { id: 'nz', name: isRU ? 'Новая Зеландия' : '新西兰' },
    { id: 'eu', name: isRU ? 'Европа' : '欧洲' },
    { id: 'asia', name: isRU ? 'Азия (Китай и Южная Корея)' : '亚洲（中国与韩国）' },
    { id: 'na', name: isRU ? 'Северная Америка' : '北美' },
  ];

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
        <div className="mb-16">
          <span className="text-accent text-sm font-semibold tracking-wider block mb-3">
            {isRU ? 'Мировые рынки и перспективы' : isCN ? '全球市场与前景' : 'Global Markets & Outlook'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[4.5rem] font-medium leading-none text-text-dark max-w-4xl">
            {isRU ? 'Оленеводство — глобальная отрасль' : isCN ? '养鹿业是一项全球性产业' : 'Deer Farming is a Global Industry'}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl font-bold text-primary max-w-3xl leading-relaxed">
            {isRU
              ? 'Как устроено современное оленеводство в мире и почему Россия только в начале пути'
              : isCN
                ? '现代养鹿业在全球是如何运作的，以及为什么俄罗斯目前仅处于发展起步阶段'
                : 'How modern deer farming works worldwide and why Russia is only at the beginning of the road'}
          </p>
          <p className="mt-6 text-sm sm:text-base font-semibold text-text-dark max-w-3xl leading-relaxed">
            {isRU
              ? 'Во многих странах мира разведение благородных оленей давно стало частью современного сельского хозяйства, объединяющего генетику, племенную работу, ветеринарное сопровождение, пантовое направление и переработку продукции. При этом разные регионы мира формируют собственные модели развития отрасли: от генетики и племенного разведения до высокомаржинальной переработки.'
              : isCN
                ? '在世界上许多国家，红鹿养殖早已成为现代农业不可分割的一部分，完美整合了遗传基因、良种繁育、兽医全程安全保驾、鹿茸科学收茸与产品深加工开发。与此同时，全球不同地区结合自身资源优势，形成了各具特色的产业发展模式：从基础血统遗传学研究与育种，到高附加值的深加工技术。'
                : 'In many countries, Red Deer breeding has long been part of modern agriculture, combining genetics, pedigree breeding, veterinary support, velvet antlers, and product processing. Different regions shape their own models from genetics to high-margin deep processing.'}
          </p>
        </div>

        {/* ─── Region Selection Grid (Apple / Scandinavian style instead of complex SVG) ─── */}
        <div className="bg-bg-card border border-border-light rounded-none p-6 md:p-8 mb-16 shadow-xs">
          <h3 className="font-serif text-sm font-semibold text-text-dark tracking-widest mb-6 text-center md:text-left">
            {isRU ? 'Выберите интересующий регион для перехода к деталям' : isCN ? '选择感兴趣的地区以查看详情' : 'Select region to view details'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => scrollToId(reg.id)}
                className="p-5 bg-white border border-border-light rounded-[6px] text-center font-bold text-xs sm:text-sm hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer shadow-xs"
              >
                {reg.name}
              </button>
            ))}
          </div>

          {/* Large Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border-light mt-8 pt-8">
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-semibold text-accent leading-none">80% {isRU ? 'мирового рынка пантов' : '全球鹿茸原料市场'}</div>
              <div className="text-[11px] font-bold text-text-dark tracking-wider mt-2.5">
                {isRU ? 'контролирует Новая Зеландия как экспортёр сырья' : '由作为原料出口国的新西兰控制'}
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-semibold text-accent leading-none">≈80% {isRU ? 'мирового импорта' : '全球进口额'}</div>
              <div className="text-[11px] font-bold text-text-dark tracking-wider mt-2.5">
                {isRU ? 'приходится на Южную Корею — крупнейший рынок потребления' : '由作为最大消费市场的韩国进口'}
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-semibold text-accent leading-none">20+ {isRU ? 'регионов России' : '多个俄罗斯联邦主体'}</div>
              <div className="text-[11px] font-bold text-text-dark tracking-wider mt-2.5">
                {isRU ? 'занимаются пантовым оленеводством, но отрасль остаётся нишевой' : '从事鹿茸养殖业，但该产业目前仍处于细分的小众领域'}
              </div>
            </div>
          </div>
        </div>

        {/* ─── 2. Новая Зеландия ────────────────────────────────────────────── */}
        <section id="nz" className="bg-bg-card border border-border-light rounded-none p-8 md:p-12 mb-12 shadow-xs scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-accent text-[11px] font-bold tracking-wider bg-white border border-border-light px-3 py-1.5 rounded-[6px] w-fit shadow-xs">
                {isRU ? 'Мировой лидер' : isCN ? '行业领导者' : 'World Leader'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-medium text-text-dark">
                {isRU ? 'Новая Зеландия: как оленеводство стало индустрией' : isCN ? '新西兰：养鹿业是如何成长为庞大产业 pipeline 的' : 'New Zealand: How Deer Farming Became an Industry'}
              </h2>
              <p className="text-text-dark text-sm sm:text-base leading-relaxed font-semibold">
                {isRU
                  ? 'Новая Зеландия считается мировым лидером современного оленеводства. Именно здесь отрасль была переведена на промышленный уровень: с системной селекцией, ветеринарией, экспортом и глубокой переработкой.'
                  : isCN
                    ? '新西兰是举世公认的现代养鹿业世界领头羊。正是在这里，养鹿业被提升到了规模化、工业化的先进生产水平：拥有全套科学的系统育种、全方位的兽医安检体系、庞大的出口外销机制以及高附加值的深加工技术。'
                    : 'New Zealand is considered the global leader in modern deer farming. It is here that the industry was raised to an industrial level: with systematic selection, veterinary medicine, exports, and deep processing.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  { title: isRU ? 'Сильная генетика' : '卓越遗传基因', desc: isRU ? 'Десятилетия селекции.' : '数十年的系统繁育改良。' },
                  { title: isRU ? 'Научный подход' : '前沿科学方法', desc: isRU ? 'Ветеринария и исследования.' : '高端兽医医疗与学术研究。' },
                  { title: isRU ? 'Экспортная модель' : '外向出口导向', desc: isRU ? 'Ориентация на глобальный рынок.' : '紧密对接并专注于全球消费市场。' },
                  { title: isRU ? 'Глубокая переработка' : '高价值深加工', desc: isRU ? 'Капсулы, порошки, extracts вместо сырья.' : '用鹿茸精粉、胶囊、提取物代替初级原料。' },
                ].map((item, i) => (
                  <div key={i} className="bg-bg-light/60 border border-border-light p-5 rounded-none">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-primary mb-1.5">{item.title}</h4>
                    <p className="text-xs font-semibold text-text-dark">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6 lg:border-l lg:border-border-light lg:pl-10">
              <h3 className="font-serif text-lg font-semibold text-accent">{isRU ? 'Статистические показатели' : isCN ? '核心产业统计数据' : 'Key Statistics'}</h3>
              <div className="flex flex-col gap-4">
                {[
                  { stat: '~800 тыс.', label: isRU ? 'фермерских оленей в стране сегодня' : '今天全国饲养的红鹿总数' },
                  { stat: '≈2 000', label: isRU ? 'ферм разных масштабов' : '各种不同规模的专业红鹿养殖场' },
                  { stat: '80%', label: isRU ? 'мирового рынка пантов по экспорту продукции' : '全球原料鹿茸的出口市场份额' },
                  { stat: '90%+', label: isRU ? 'продукции экспортируется в Азию' : '的高端产品远销亚洲消费市场' },
                ].map((s, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-bg-light/40 border border-border-light/30 p-4 rounded-[6px]">
                    <span className="font-serif text-2xl font-bold text-primary shrink-0">{s.stat}</span>
                    <span className="text-xs font-semibold text-text-dark leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Европа ───────────────────────────────────────────────────── */}
        <section id="eu" className="bg-bg-card border border-border-light rounded-none p-8 md:p-12 mb-12 shadow-xs scroll-mt-24">
          <div className="max-w-3xl mb-8">
            <span className="text-accent text-[11px] font-bold tracking-wider bg-white border border-border-light px-3 py-1.5 rounded-[6px] w-fit shadow-xs">
              {isRU ? 'Историческая колыбель' : isCN ? '历史的发源地' : 'Historical Cradle'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-text-dark mt-4">
              {isRU ? 'Европа: историческая база благородного оленя' : isCN ? '欧洲：红鹿选育的历史基底' : 'Europe: Historical Base of European Red Deer'}
            </h2>
            <p className="text-text-dark text-sm sm:text-base leading-relaxed font-semibold mt-4">
              {isRU
                ? 'Именно Европа сформировала многие известные линии благородного европейского оленя. Здесь развивались племенные хозяйства и подходы к качеству стада. Тут как раз: Woburn и Warnham (без излишней детализации — ссылка на Генетику).'
                : isCN
                  ? '正是欧洲成功培育出了许多世界闻名的欧洲红鹿优良血统品系。在这里，凝聚着历史悠久的良种繁育技术和对品质控制의 严谨态度。其中最具代表性的血统即是：Woburn 和 Warnham（具体细节参见遗传学页面）。'
                  : 'It is Europe that formed many famous lines of European Red Deer. Here, breeding farms and systematic approaches to quality were developed. This includes Woburn and Warnham lines.'}
            </p>
            <p className="text-text-dark text-sm sm:text-base leading-relaxed font-bold mt-4 border-l-2 border-accent pl-4">
              {isRU
                ? 'Европа обладает сильной генетической базой, однако ограничена земельными ресурсами и высокой стоимостью сельскохозяйственных земель.'
                : isCN
                  ? '尽管欧洲拥有极为雄厚的基因改良资产，但不可避免地面临着土地空间有限和农业用地价格极其高昂的瓶颈局限。'
                  : 'Europe has a very strong genetic asset base, but is severely limited by land space constraints and the high cost of agricultural land.'}
            </p>
          </div>

          {/* Comparison Grid (Europe vs Russia) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-bg-light/60 border border-border-light rounded-none p-6">
              <h4 className="font-serif text-xl font-bold text-primary mb-4 border-b border-border-light pb-3">
                {isRU ? 'Европа' : '欧洲'}
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-2.5 items-start text-xs sm:text-sm font-semibold text-text-dark">
                  <span className="text-accent font-bold">•</span>
                  {isRU ? 'сильная генетика' : '底蕴深厚的良种繁育基因库'}
                </li>
                <li className="flex gap-2.5 items-start text-xs sm:text-sm font-semibold text-text-dark">
                  <span className="text-primary font-bold">−</span>
                  {isRU ? 'ограниченность пастбищ' : '严重缺乏自然放牧空间与牧场'}
                </li>
              </ul>
            </div>
            <div className="bg-bg-light/60 border border-border-light rounded-none p-6">
              <h4 className="font-serif text-xl font-bold text-accent mb-4 border-b border-border-light pb-3">
                {isRU ? 'Россия' : '俄罗斯'}
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-2.5 items-start text-xs sm:text-sm font-semibold text-text-dark">
                  <span className="text-primary font-bold">+</span>
                  {isRU ? 'огромный земельный ресурс' : '极其辽阔、广袤的自然牧场土地资源'}
                </li>
                <li className="flex gap-2.5 items-start text-xs sm:text-sm font-semibold text-text-dark">
                  <span className="text-primary font-bold">+</span>
                  {isRU ? 'подходящий климат' : '非常适合红鹿栖息与繁衍的自然气候'}
                </li>
                <li className="flex gap-2.5 items-start text-xs sm:text-sm font-semibold text-text-dark">
                  <span className="text-accent font-bold">−</span>
                  {isRU ? 'ранняя стадия развития отрасли' : '产业整体处于发展建设的最早期阶段'}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 4. Азия ─────────────────────────────────────────────────────── */}
        <section id="asia" className="bg-bg-card border border-border-light rounded-none p-8 md:p-12 mb-12 shadow-xs scroll-mt-24">
          <div className="max-w-3xl">
            <span className="text-accent text-[11px] font-bold tracking-wider bg-white border border-border-light px-3 py-1.5 rounded-[6px] w-fit shadow-xs">
              {isRU ? 'Потребительский спрос' : isCN ? '最大的消费市场' : 'Consumer Demand'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-text-dark mt-4">
              {isRU ? 'Азия: крупнейший рынок потребления' : isCN ? '亚洲：全球最大的鹿茸消费驱动力' : 'Asia: The Largest Consumer Market'}
            </h2>
            <p className="text-text-dark text-sm sm:text-base leading-relaxed font-semibold mt-4">
              {isRU
                ? 'Исторически именно Азия сформировала спрос на продукцию пантового направления. В Китае использование пантов насчитывает более 2000 лет, а Южная Корея сегодня остаётся крупнейшим мировым импортёром.'
                : isCN
                  ? '从历史渊源来看，正是亚洲源源不断地驱动并创造了对鹿茸制品和传统理疗的巨大市场需求。在中国，鹿茸防病强身 and 传统调理的使用历史已超过2000年，而韩国至今仍是全球最核心的天然鹿茸进口国。'
                  : 'Historically, it is Asia that shaped the demand for velvet antler products. In China, the use of antlers dates back over 2000 years, while South Korea remains the largest global importer.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-bg-light/60 border border-border-light rounded-none p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-primary mb-2.5">{isRU ? 'Южная Корея' : '韩国'}</h4>
                  <p className="text-xs sm:text-sm font-semibold text-text-dark">
                    {isRU ? 'Особенность: предпочтение крупным высококачественным пантам.' : '市场特征：极度偏爱并追求饱满、肥大、高品质的特级精选鹿茸。'}
                  </p>
                </div>
                <span className="text-accent font-bold text-sm tracking-wide bg-white px-3 py-1.5 rounded-[6px] border border-border-light w-fit mt-4">
                  {isRU ? '≈80% мирового импорта пантов' : '约占全球鹿茸进口份额的 80%'}
                </span>
              </div>
              <div className="bg-bg-light/60 border border-border-light rounded-none p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-primary mb-2.5">{isRU ? 'Китай' : '中国'}</h4>
                  <p className="text-xs sm:text-sm font-semibold text-text-dark">
                    {isRU
                      ? 'Ключевая мысль: не только потребляет, но и активно развивает внутреннюю переработку, капсулы, экстракты и functional-продукты.'
                      : '核心战略：不仅是终极原料消费者，更在积极构建领先的精细深加工产业，主导鹿茸粉、精细胶囊、高纯度提取液和现代功能性健康调理食品。'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-primary text-text-light rounded-none shadow-sm flex items-center justify-between border-y border-white/10">
              <span className="font-bold text-xs sm:text-sm">
                {isRU
                  ? 'Тренд: Рынок постепенно смещается от сырья к продуктам глубокой переработки с высокой добавленной стоимостью.'
                  : '全球趋势：鹿茸原料贸易市场正在稳步、大跨步地从初级原料粗加工，向高利润、高附加值的现代精细深加工成品转型。'}
              </span>
            </div>
          </div>
        </section>

        {/* ─── 5. Северная Америка ─────────────────────────────────────────── */}
        <section id="na" className="bg-bg-card border border-border-light rounded-none p-8 md:p-12 mb-12 shadow-xs scroll-mt-24">
          <div className="max-w-3xl">
            <span className="text-accent text-[11px] font-bold tracking-wider bg-white border border-border-light px-3 py-1.5 rounded-[6px] w-fit shadow-xs">
              {isRU ? 'Североамериканская модель' : isCN ? '北美育种管理模式' : 'North American Model'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-text-dark mt-4">
              {isRU ? 'США и Канада: развитие фермерского оленеводства' : isCN ? '美国与加拿大：专业红鹿养殖场的发展' : 'USA & Canada: Development of Specialized Deer Farming'}
            </h2>
            <p className="text-text-dark text-sm sm:text-base leading-relaxed font-semibold mt-4">
              {isRU
                ? 'В Северной Америке активно развивается разведение благородных оленей и wapiti (вапити), где большое внимание уделяется качеству генетики, репродуктивным технологиям и развитию животных с выдающимися характеристиками рогов.'
                : isCN
                  ? '在北美大陆，欧洲红鹿以及马鹿（Wapiti）的科学繁育正呈现蓬勃发展之势。这套体系将核心精力倾注于基因品质改良、前沿辅助生殖繁育技术（如人工授精与胚胎移植）以及培养具有非凡观赏与商业价值的角骨个体。'
                  : 'In North America, Red Deer and wapiti breeding is actively developing, focusing on genetic quality, reproductive technologies, and the growth of animals with outstanding antler characteristics.'}
            </p>
            <p className="text-text-dark text-sm sm:text-base leading-relaxed font-bold mt-4 border-l-2 border-accent pl-4">
              {isRU
                ? 'Важно: США и Канада также входят в число производителей пантов и постепенно увеличивают долю переработанной продукции.'
                : isCN
                  ? '产业现状：美国与加拿大也是全球高品质鹿茸和鹿角的重要产地之一，并正在稳步提升高端精深加工产品的市场占比。'
                  : 'Note: USA and Canada are also among key velvet producers and are gradually increasing the share of processed high-value products.'}
            </p>
          </div>
        </section>

        {/* ─── 6. Экономика отрасли (5 моделей дохода) ────────────────────── */}
        <section className="bg-bg-card border border-border-light rounded-none p-8 md:p-12 mb-12 shadow-xs">
          <div className="max-w-3xl mb-8">
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-text-dark">
              {isRU ? 'Современное оленеводство — это не одна модель дохода' : isCN ? '现代养鹿业：多元化、高收益的商业创收模型' : 'Modern Deer Farming: Multiple Income Streams'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                icon: <TrendingUp className="w-5 h-5 text-accent" />,
                title: isRU ? 'Генетика и племенное направление' : '遗传基因与良种选育',
                desc: isRU ? 'Высокая стоимость качественных линий.' : '优质繁育亲本血统具有极高的单头商业价值。',
              },
              {
                icon: <Award className="w-5 h-5 text-accent" />,
                title: isRU ? 'Пантовое направление' : '鹿茸科学开发',
                desc: isRU ? 'Сырьё и переработка.' : '初级鹿茸原材料与高端深加工成品的研发生产。',
              },
              {
                icon: <Layers className="w-5 h-5 text-accent" />,
                title: isRU ? 'Репродуктивные технологии' : '现代辅助生殖技术',
                desc: isRU ? 'ЭКО и улучшение стада.' : '通过人工授精与胚胎移植等科技快速改良升级。',
              },
              {
                icon: <Sparkles className="w-5 h-5 text-accent" />,
                title: isRU ? 'Агротуризм и знакомство с хозяйством' : '农业生态旅游开发',
                desc: isRU ? 'Экскурсии и открытые форматы.' : '红鹿生态科普旅行项目和自然观光游览服务。',
              },
              {
                icon: <Globe className="w-5 h-5 text-accent" />,
                title: isRU ? 'Глубокая переработка' : '高价值深加工链条',
                desc: isRU ? 'Капсулы, extracts, wellness.' : '高精纯胶囊、生物多肽提取液与健康理疗。',
              },
            ].map((card, i) => (
              <div key={i} className="bg-bg-light/60 border border-border-light rounded-none p-6 hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="w-9 h-9 bg-primary/5 text-primary rounded-none flex items-center justify-center mb-4 border border-primary/10">
                    {card.icon}
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-text-dark mb-2">{card.title}</h4>
                  <p className="text-[11px] font-semibold text-text-dark leading-normal">{card.desc}</p>
                </div>
                <span className="text-[10px] font-serif text-accent font-bold mt-4">0{i+1}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-border-light pt-6">
            <p className="text-xs sm:text-sm font-bold text-primary">
              {isRU
                ? 'Во многих странах наибольшую добавленную стоимость создаёт не сырьё, а переработка и готовая продукция.'
                : '核心经济逻辑：纵观全球，创造最大化经济附加值和利润收益的不是初级初加工原材料，而是深度加工与高品质精制成品。'}
            </p>
          </div>
        </section>

        {/* ─── 7. Почему Россия имеет потенциал ───────────────────────────── */}
        <section className="bg-primary text-text-light rounded-none p-8 md:p-12 shadow-lg border-y border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-accent">
                {isRU ? 'Почему Россия может стать сильным игроком' : isCN ? '为什么俄罗斯具备成为全球核心强国的巨大潜力' : 'Why Russia Can Become a Strong Global Player'}
              </h2>
              <p className="text-text-light text-sm sm:text-base leading-relaxed font-semibold">
                {isRU
                  ? 'Несмотря на наличие подходящего климата и больших земельных ресурсов, современное оленеводство в России пока находится на ранней стадии развития. При этом мировой опыт показывает: сочетание качественной генетики, технологий, ветеринарного сопровождения и переработки может формировать устойчивую современную отрасль.'
                  : isCN
                    ? '尽管拥有极为理想的气候条件和无与伦比的草场土地深度空间，俄罗斯的现代高端红鹿养殖目前仍处于起步阶段。新西兰等国的经验深刻表明：通过将高端育种遗传、辅助繁育科技、全程兽医安全监护以及深加工技术开发紧密结合，必然能构建起一个长期繁荣、可持续的现代战略性产业。'
                    : 'Despite having a suitable climate and vast land resources, modern deer farming in Russia is still in its early stages of development. However, global experience shows that a combination of quality genetics, technology, veterinary support, and processing can shape a sustainable modern industry.'}
              </p>
              <p className="text-text-light text-sm sm:text-base leading-relaxed font-bold border-l-2 border-accent pl-4 mt-2">
                {isRU
                  ? 'Россия уступает Европе по зрелости отрасли, но обладает значительно большими возможностями масштабирования.'
                  : isCN
                    ? '核心对比：俄罗斯尽管在产业配套和成熟度上暂时落后于欧洲，但在牧场面积、空间纵深和规模化扩展潜力上，拥有极其巨大的不对称领先优势。'
                    : 'Russia lags Europe in industry maturity but has significantly larger scaling potential.'}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <button
                onClick={() => onSwitchTab('contacts')}
                className="btn-primary cursor-pointer flex items-center justify-center gap-1.5 w-full lg:w-auto"
              >
                {isRU ? 'Связаться с нами' : isCN ? '联系我们' : 'Contact Us'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
