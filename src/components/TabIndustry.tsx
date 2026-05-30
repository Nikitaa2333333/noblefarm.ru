import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Globe, Award, Sparkles, Layers, Check } from 'lucide-react';
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
    { id: 'nz', name: isRU ? 'Новая Зеландия' : isCN ? '新西兰' : 'New Zealand' },
    { id: 'eu', name: isRU ? 'Европа' : isCN ? '欧洲' : 'Europe' },
    { id: 'asia', name: isRU ? 'Азия (Китай и Южная Корея)' : isCN ? '亚洲（中国与韩国）' : 'Asia (China & South Korea)' },
    { id: 'na', name: isRU ? 'Северная Америка' : isCN ? '北美' : 'North America' },
  ];

  const successPillars = [
    {
      title: isRU ? 'Сильная генетика' : isCN ? '卓越遗传基因' : 'Strong Genetics',
      desc: isRU ? 'Десятилетия селекции.' : isCN ? '数十年的系统繁育改良。' : 'Decades of systemic selection.',
    },
    {
      title: isRU ? 'Научный подход' : isCN ? '前沿科学方法' : 'Scientific Approach',
      desc: isRU ? 'Ветеринария и исследования.' : isCN ? '高端兽医医疗与学术研究。' : 'Veterinary medicine and research.',
    },
    {
      title: isRU ? 'Экспортная модель' : isCN ? '外向出口导向' : 'Export Model',
      desc: isRU ? 'Ориентация на глобальный рынок.' : isCN ? '紧密对接并专注于全球消费市场。' : 'Focus on the global market.',
    },
    {
      title: isRU ? 'Глубокая переработка' : isCN ? '高价值深加工' : 'Deep Processing',
      desc: isRU ? 'Капсулы, порошки, extracts вместо сырья.' : isCN ? '用鹿茸精粉、胶囊、提取物代替初级原料。' : 'Capsules, powders, and extracts instead of raw materials.',
    },
  ];

  const nzStats = [
    {
      stat: isRU ? '~800 тыс.' : isCN ? '约80万只' : '~800k',
      label: isRU ? 'фермерских оленей в стране сегодня' : isCN ? '今天全国饲养 of 红鹿总数' : 'farmed deer in the country today',
    },
    {
      stat: isRU ? '≈2 000' : isCN ? '约2000家' : '≈2,000',
      label: isRU ? 'ферм разных масштабов' : isCN ? '各种不同规模的专业红鹿养殖场' : 'farms of different scales',
    },
    {
      stat: '80%',
      label: isRU ? 'мирового рынка пантов по экспорту продукции' : isCN ? '全球原料鹿茸的出口市场份额' : 'of the global velvet export market',
    },
    {
      stat: '90%+',
      label: isRU ? 'продукции экспортируется в Азию' : isCN ? '的高端产品远销亚洲消费市场' : 'of products exported to Asia',
    },
  ];

  const comparisonEurope = [
    { 
      isPro: true, 
      text: isRU ? 'сильная генетика' : isCN ? '底蕴深厚的良种繁育基因库' : 'strong genetics' 
    },
    { 
      isPro: false, 
      text: isRU ? 'ограниченность пастбищ' : isCN ? '严重缺乏自然放牧空间与牧场' : 'limited pastures' 
    },
  ];

  const comparisonRussia = [
    { 
      isPro: true, 
      text: isRU ? 'огромный земельный ресурс' : isCN ? '极其辽阔、广袤的自然牧场土地资源' : 'vast land resources' 
    },
    { 
      isPro: true, 
      text: isRU ? 'подходящий климат' : isCN ? '非常适合红鹿栖息与繁衍的自然气候' : 'suitable climate' 
    },
    { 
      isPro: false, 
      text: isRU ? 'ранняя стадия развития отрасли' : isCN ? '产业整体处于发展建设的最早期阶段' : 'early stage of industry development' 
    },
  ];

  const economyModels = [
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: isRU ? 'Генетика и племенное направление' : isCN ? '遗传基因与良种选育' : 'Genetics & Pedigree Breeding',
      desc: isRU ? 'Высокая стоимость качественных линий.' : isCN ? '优质繁育亲本血统具有极高的单头商业价值。' : 'High commercial value of quality breeding lines.',
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: isRU ? 'Пантовое направление' : isCN ? '鹿茸科学开发' : 'Velvet Antler Direction',
      desc: isRU ? 'Сырьё и переработка.' : isCN ? '初级鹿茸原材料与高端深加工成品的研发生产。' : 'Raw materials and processed wellness products.',
    },
    {
      icon: <Layers className="w-6 h-6 text-primary" />,
      title: isRU ? 'Репродуктивные технологии' : isCN ? '现代辅助生殖技术' : 'Reproductive Technologies',
      desc: isRU ? 'ЭКО и улучшение стада.' : isCN ? '通过人工授精与胚胎移植等科技快速改良升级。' : 'IVF and rapid herd improvement.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: isRU ? 'Агротуризм и знакомство с хозяйством' : isCN ? '农业生态旅游开发' : 'Agrotourism & Tours',
      desc: isRU ? 'Экскурсии и открытые форматы.' : isCN ? '红鹿生态科普旅行项目和自然观光游览服务。' : 'Excursions and open farm formats.',
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: isRU ? 'Глубокая переработка' : isCN ? '高价值深加工链条' : 'Deep Processing',
      desc: isRU ? 'Капсулы, extracts, wellness.' : isCN ? '高精纯胶囊、生物多肽提取液与健康理疗。' : 'Capsules, extracts, and wellness cosmetics.',
    },
  ];

  return (
    <div className="w-full">
      {/* ─── Hero / Header ────────────────────────────────────────────────── */}
      <section className="hero-side-image">
        <div className="hero-side-image__grid">
          <div className="hero-side-image__text">
            <span className="hero-eyebrow">
              {isRU ? 'Мировые рынки и перспективы' : isCN ? '全球市场与前景' : 'Global Markets & Outlook'}
            </span>
            <h1 className="hero-title">
              {isRU ? 'Оленеводство — ' : isCN ? '养鹿业是一项' : 'Deer Farming is a '}
              <span className="h-section__accent">
                {isRU ? 'глобальная отрасль' : isCN ? '全球性产业' : 'Global Industry'}
              </span>
            </h1>
            <p className="hero-desc">
              {isRU
                ? 'Как устроено современное оленеводство в мире и почему Россия только в начале пути'
                : isCN
                  ? '现代养鹿业在全球是如何运作的，以及为什么俄罗斯目前仅处于发展起步阶段'
                  : 'How modern deer farming works worldwide and why Russia is only at the beginning of the road'}
            </p>
            <p className="text-sm sm:text-base font-medium text-text-dark leading-relaxed mt-2">
              {isRU
                ? 'Во многих странах мира разведение благородных оленей давно стало частью современного сельского хозяйства, объединяющего генетику, племенную работу, ветеринарное сопровождение, пантовое направление и переработку продукции. При этом разные регионы мира формируют собственные модели развития отрасли: от генетики и племенного разведения до высокомаржинальной переработки.'
                : isCN
                  ? '在世界上许多国家，红鹿养殖早已成为现代农业不可分割的一部分，完美整合了遗传基因、良种繁育、兽医全程安全保驾、鹿茸科学收茸与产品深加工开发。与此同时，全球不同地区结合自身资源优势，形成了各具特色的产业发展模式：从基础血统遗传学研究与育种，到高附加值的深加工技术。'
                  : 'In many countries, Red Deer breeding has long been part of modern agriculture, combining genetics, pedigree breeding, veterinary support, velvet antlers, and product processing. Different regions shape their own models from genetics to high-margin deep processing.'}
            </p>
          </div>
          <div className="hero-side-image__media">
            <img src="/enhanced_about_8.webp" alt="Global Industry" />
          </div>
        </div>
      </section>

      {/* ─── Region Selection & Global Stats (Spacious White Background) ─────── */}
      <section className="section-calm">
        <div className="section-inner">
          <div className="flex flex-col items-center gap-6 mb-12">
            <span className="card-feature__eyebrow text-center">
              {isRU ? 'Выберите интересующий регион для перехода к деталям' : isCN ? '选择感兴趣的地区以查看详情' : 'Select a region to go to details'}
            </span>
            <div className="bg-bg-card shadow-soft rounded-[6px] p-1.5 inline-flex flex-wrap justify-center gap-1 max-w-full">
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => scrollToId(reg.id)}
                  className="px-4 py-2 rounded-[6px] text-sm font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap text-text-dark bg-transparent hover:bg-primary hover:text-text-light"
                >
                  {reg.name}
                </button>
              ))}
            </div>
          </div>

          {/* Large Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">
            <div className="flex flex-col gap-2">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accent leading-none">80%</div>
              <div className="text-xs font-bold text-text-dark tracking-wider mt-1">
                {isRU ? 'мирового рынка пантов' : isCN ? '全球鹿茸原料市场' : 'global velvet market'}
              </div>
              <p className="text-sm text-text-dark mt-1 leading-relaxed font-medium">
                {isRU 
                  ? 'контролирует Новая Зеландия как экспортёр сырья' 
                  : isCN ? '由作为原料出口国的新西兰控制' : 'controlled by New Zealand as a key raw material exporter'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accent leading-none">≈80%</div>
              <div className="text-xs font-bold text-text-dark tracking-wider mt-1">
                {isRU ? 'мирового импорта' : isCN ? '全球进口额' : 'global imports'}
              </div>
              <p className="text-sm text-text-dark mt-1 leading-relaxed font-medium">
                {isRU 
                  ? 'приходится на Южную Корею — крупнейший рынок потребления' 
                  : isCN ? '由作为最大消费市场的韩国进口' : 'imported by South Korea — the largest consumption market'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accent leading-none">20+</div>
              <div className="text-xs font-bold text-text-dark tracking-wider mt-1">
                {isRU ? 'регионов России' : isCN ? '多个俄罗斯联邦主体' : 'regions of Russia'}
              </div>
              <p className="text-sm text-text-dark mt-1 leading-relaxed font-medium">
                {isRU 
                  ? 'занимаются пантовым оленеводством, но отрасль остаётся нишевой' 
                  : isCN ? '从事鹿茸养殖业，但该产业目前仍处于细分的小众领域' : 'engaged in velvet deer farming, but the industry remains niche'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Новая Зеландия ────────────────────────────────────────────── */}
      <section id="nz" className="section-calm scroll-mt-24 pt-0">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="card-feature__eyebrow">
                {isRU ? 'Мировой лидер' : isCN ? '行业领导者' : 'World Leader'}
              </span>
              <h2 className="h-section">
                {isRU ? 'Новая Зеландия: как оленеводство стало ' : isCN ? '新西兰：养鹿业是如何成长为' : 'New Zealand: How Deer Farming Became an '}
                <span className="h-section__accent">{isRU ? 'индустрией' : isCN ? '产业' : 'Industry'}</span>
              </h2>
              <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
                {isRU
                  ? 'Новая Зеландия считается мировым лидером современного оленеводства. Именно здесь отрасль была переведена на промышленный уровень: с системной селекцией, ветеринарией, экспортом и глубокой переработкой.'
                  : isCN
                    ? '新西兰是举世公认的现代养鹿业世界领头羊。正是在这里，养鹿业被提升到了规模化、工业化的先进生产水平：拥有全套科学的系统育种、全方位的兽医安检体系、庞大的出口外销机制以及高附加值的深加工技术。'
                    : 'New Zealand is considered the global leader in modern deer farming. It is here that the industry was raised to an industrial level: with systematic selection, veterinary medicine, exports, and deep processing.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {successPillars.map((item, i) => (
                  <div key={i} className="card-flat">
                    <h4 className="font-serif text-lg font-bold text-primary mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm font-semibold text-text-dark">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-10">
              <h3 className="font-serif text-lg font-bold text-accent">{isRU ? 'Статистические показатели' : isCN ? '核心产业统计数据' : 'Key Statistics'}</h3>
              <div className="flex flex-col gap-10 lg:gap-12">
                {nzStats.map((s, idx) => (
                  <div key={idx} className="flex gap-5 items-baseline">
                    <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-accent leading-none shrink-0">{s.stat}</span>
                    <span className="text-sm font-medium text-text-dark leading-snug">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Европа (Investor emphasis - strategic green section) ───────────── */}
      <section id="eu" className="section-accent scroll-mt-24">
        <div className="section-inner">
          <div className="max-w-3xl mb-10">
            <span className="card-feature__eyebrow">
              {isRU ? 'Историческая колыбель' : isCN ? '历史的发源地' : 'Historical Cradle'}
            </span>
            <h2 className="h-section-light mt-4 mb-6">
              {isRU ? 'Европа: историческая база ' : isCN ? '欧洲：红鹿选育的' : 'Europe: Historical Base of '}
              <span className="h-section__accent">{isRU ? 'благородного оленя' : isCN ? '历史基底' : 'Red Deer'}</span>
            </h2>
            <div className="text-text-light text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-medium">
              <p>
                {isRU
                  ? 'Именно Европа сформировала многие известные линии благородного европейского оленя. Здесь развивались племенные хозяйства и подходы к качеству стада. Woburn и Warnham — признанные во всем мире генетические стандарты.'
                  : isCN
                    ? '正是欧洲成功培育出了许多世界闻名的欧洲红鹿优良血统品系。在这里，凝聚着历史悠久的良种繁育技术 and 对品质控制的严谨态度。其中最具代表性的血统即是 Woburn 和 Warnham。'
                    : 'It is Europe that formed many famous lines of European Red Deer. Here, breeding farms and systematic approaches to quality were developed, including Woburn and Warnham lines.'}
              </p>
            </div>
            <div className="mt-6 p-6 bg-secondary/40 text-text-light font-bold rounded-none">
              {isRU
                ? 'Европа обладает сильной генетической базой, однако ограничена земельными ресурсами и высокой стоимостью сельскохозяйственных земель.'
                : isCN
                  ? '尽管欧洲拥有极为雄厚的基因改良资产，但不可避免地面临着土地空间有限和农业用地价格极其高昂的瓶颈局限。'
                  : 'Europe has a very strong genetic asset base, but is severely limited by land space constraints and the high cost of agricultural land.'}
            </div>
          </div>

          {/* Comparison Grid (Europe vs Russia) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-secondary/40 p-8 rounded-none">
              <h4 className="font-serif text-xl font-bold text-accent mb-5">
                {isRU ? 'Европа' : isCN ? '欧洲' : 'Europe'}
              </h4>
              <ul className="flex flex-col gap-4">
                {comparisonEurope.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-center text-sm font-semibold text-text-light">
                    {item.isPro ? (
                      <Check className="w-5 h-5 text-accent shrink-0" strokeWidth={2.5} />
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center text-accent font-bold text-lg shrink-0">−</span>
                    )}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary/40 p-8 rounded-none">
              <h4 className="font-serif text-xl font-bold text-accent mb-5">
                {isRU ? 'Россия' : isCN ? '俄罗斯' : 'Russia'}
              </h4>
              <ul className="flex flex-col gap-4">
                {comparisonRussia.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-center text-sm font-semibold text-text-light">
                    {item.isPro ? (
                      <Check className="w-5 h-5 text-accent shrink-0" strokeWidth={2.5} />
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center text-accent font-bold text-lg shrink-0">−</span>
                    )}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Азия ─────────────────────────────────────────────────────── */}
      <section id="asia" className="section-calm scroll-mt-24">
        <div className="section-inner">
          <div className="max-w-3xl mb-10">
            <span className="card-feature__eyebrow">
              {isRU ? 'Потребительский спрос' : isCN ? '最大的消费市场' : 'Consumer Demand'}
            </span>
            <h2 className="h-section">
              {isRU ? 'Азия: крупнейший рынок ' : isCN ? '亚洲：全球最大的鹿茸' : 'Asia: The Largest Consumer '}
              <span className="h-section__accent">{isRU ? 'потребления' : isCN ? '消费驱动力' : 'Market'}</span>
            </h2>
            <p className="text-text-dark text-base sm:text-lg leading-relaxed font-medium">
              {isRU
                ? 'Исторически именно Азия сформировала спрос на продукцию пантового направления. В Китае использование пантов насчитывает более 2000 лет, а Южная Корея сегодня остаётся крупнейшим мировым импортёром.'
                : isCN
                  ? '从历史渊源来看，正是亚洲源源不断地驱动并创造了对鹿茸制品和传统理疗的巨大市场需求。在中国，鹿茸防病强身和传统调理的使用历史已超过2000年，而韩国至今仍是全球最核心的天然鹿茸进口国。'
                  : 'Historically, it is Asia that shaped the demand for velvet antler products. In China, the use of antlers dates back over 2000 years, while South Korea remains the largest global importer.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat flex flex-col justify-between min-h-[200px]">
              <div>
                <h4 className="font-serif text-xl font-bold text-primary mb-3">{isRU ? 'Южная Корея' : isCN ? '韩国' : 'South Korea'}</h4>
                <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed">
                  {isRU ? 'Особенность: предпочтение крупным высококачественным пантам.' : isCN ? '市场特征：极度偏爱并追求饱满、肥大、高品质的特级精选鹿茸。' : 'Key feature: preference for large high-quality antlers.'}
                </p>
              </div>
              <span className="text-accent font-bold text-xs tracking-wider bg-accent/15 px-3 py-1.5 rounded-[6px] w-fit mt-4">
                {isRU ? '≈80% мирового импорта пантов' : isCN ? '约占全球鹿茸进口份额的 80%' : '≈80% of global velvet imports'}
              </span>
            </div>
            
            <div className="card-flat flex flex-col justify-between min-h-[200px]">
              <div>
                <h4 className="font-serif text-xl font-bold text-primary mb-3">{isRU ? 'Китай' : isCN ? '中国' : 'China'}</h4>
                <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed">
                  {isRU
                    ? 'Ключевая мысль: не только потребляет, но и активно развивает внутреннюю переработку, капсулы, экстракты и functional-продукты.'
                    : isCN ? '核心战略：不仅是终极原料消费者，更在积极构建领先的精细深加工产业，主导鹿茸粉、精细胶囊、高纯度提取液和现代功能性健康调理食品。' : 'Key thought: not only consumes but also actively develops domestic deep processing, capsules, extracts, and functional products.'}
                </p>
              </div>
            </div>
          </div>

          {/* Trend banner */}
          <div className="bg-bg-card shadow-soft rounded-[6px] p-6 mt-8">
            <p className="font-bold text-xs sm:text-sm text-primary">
              {isRU
                ? 'Тренд: Рынок постепенно смещается от сырья к продуктам глубокой переработки с высокой добавленной стоимостью.'
                : isCN ? '全球趋势：鹿茸原料贸易市场正在稳步、大跨步地从初级原料粗加工，向高利润、高附加值的现代精细深加工成品转型。' : 'Trend: The market is gradually shifting from raw materials to deep processing products with high added value.'}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 5. Северная Америка (Clean Calm White Section) ────────────────────── */}
      <section id="na" className="section-calm scroll-mt-24 pt-0">
        <div className="section-inner">
          <div className="max-w-3xl">
            <span className="card-feature__eyebrow">
              {isRU ? 'Североамериканская модель' : isCN ? '北美育种管理模式' : 'North American Model'}
            </span>
            <h2 className="h-section mt-4 mb-6">
              {isRU ? 'США и Канада: развитие ' : isCN ? '美国与加拿大：专业' : 'USA & Canada: Development of '}
              <span className="h-section__accent">{isRU ? 'фермерского оленеводства' : isCN ? '红鹿养殖场' : 'Specialized Farming'}</span>
            </h2>
            <div className="text-text-dark text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-medium mb-6">
              <p>
                {isRU
                  ? 'В Северной Америке активно развивается разведение благородных оленей и wapiti (вапити), где большое внимание уделяется качеству генетики, репродуктивным технологиям и развитию животных с выдающимися характеристиками рогов.'
                  : isCN
                    ? '在北美大陆，欧洲红鹿以及马鹿（Wapiti）的科学繁育正呈现蓬勃发展之势。这套体系将核心精力倾注于基因品质改良、前沿辅助生殖繁育技术（如人工授精与胚胎移植）以及培养具有非凡观赏与商业价值的角骨个体。'
                    : 'In North America, Red Deer and wapiti breeding is actively developing, focusing on genetic quality, reproductive technologies, and the growth of animals with outstanding antler characteristics.'}
              </p>
            </div>
            <div className="card-flat font-bold border-l-4 border-accent pl-5 p-6 bg-bg-card shadow-soft rounded-[6px]">
              <p className="text-text-dark text-sm leading-relaxed">
                {isRU
                  ? 'Важно: США и Канада также входят в число производителей пантов и постепенно увеличивают долю переработанной продукции.'
                  : isCN
                    ? '产业现状：美国与加拿大也是全球高品质鹿茸和鹿角的重要产地之一，并正在稳步提升高端精深加工产品的市场占比。'
                    : 'Note: USA and Canada are also among key velvet producers and are gradually increasing the share of processed high-value products.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Экономика отрасли (5 моделей дохода) ────────────────────── */}
      <section className="section-calm">
        <div className="section-inner">
          <div className="max-w-3xl mb-10">
            <h2 className="h-section">
              {isRU ? 'Современное оленеводство — это не ' : isCN ? '现代养鹿业：' : 'Modern Deer Farming: '}
              <span className="h-section__accent">{isRU ? 'модель одного дохода' : isCN ? '多元化创收模型' : 'Multiple Income Streams'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {economyModels.map((card, i) => (
              <div key={i} className="card-flat flex flex-col justify-between min-h-[240px]">
                <div>
                  <div className="text-primary mb-4">
                    {card.icon}
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-text-dark mb-2">{card.title}</h4>
                  <p className="text-xs font-semibold text-text-dark leading-normal">{card.desc}</p>
                </div>
                <span className="text-xs font-serif text-accent font-bold mt-4">{(i+1).toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6">
            <p className="text-xs sm:text-sm font-bold text-primary">
              {isRU
                ? 'Во многих странах наибольшую добавленную стоимость создаёт не сырьё, а переработка и готовая продукция.'
                : isCN ? '核心经济逻辑：纵观全球，创造最大化经济附加值和利润收益的不是初级初加工原材料，而是深度加工与高品质精制成品。' : 'Core economic logic: globally, the highest added value is created by deep processing and finished products, not raw materials.'}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 7. Почему Россия имеет потенциал (High-impact summary - strategic green section) ─── */}
      <section className="section-accent">
        <div className="section-inner flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="max-w-3xl flex flex-col gap-4">
            <h2 className="h-section-light">
              {isRU ? 'Почему Россия может стать ' : isCN ? '为什么俄罗斯具备成为全球' : 'Why Russia Can Become a '}
              <span className="h-section__accent">{isRU ? 'сильным игроком' : isCN ? '核心强国的巨大潜力' : 'Strong Global Player'}</span>
            </h2>
            <div className="text-text-light text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-medium">
              <p>
                {isRU
                  ? 'Несмотря на наличие подходящего климата и больших земельных ресурсов, современное оленеводство в России пока находится на ранней стадии развития. При этом мировой опыт показывает: сочетание качественной генетики, технологий, ветеринарного сопровождения и переработки может формировать устойчивую современную отрасль.'
                  : isCN
                    ? '尽管拥有极为理想的气候条件和无与伦比的草场土地深度空间，俄罗斯的现代高端红鹿养殖目前仍处于起步阶段。新西兰等国的经验深刻表明：通过将高端育种遗传、辅助繁育科技、全程兽医安全监护以及深加工技术开发紧密结合，必然能构建起一个长期繁荣、可持续的现代战略性产业。'
                    : 'Despite having a suitable climate and vast land resources, modern deer farming in Russia is still in its early stages of development. However, global experience shows that a combination of quality genetics, technology, veterinary support, and processing can shape a sustainable modern industry.'}
              </p>
            </div>
            <div className="border-l-2 border-accent pl-4 mt-2">
              <p className="text-text-light text-base sm:text-lg font-bold">
                {isRU
                  ? 'Россия уступает Европе по зрелости отрасли, но обладает значительно большими возможностями масштабирования.'
                  : isCN ? '核心对比：俄罗斯尽管在产业配套和成熟度上暂时落后于欧洲，但在牧场面积、空间纵深和规模化扩展潜力上，拥有极其巨大的不对称领先优势。' : 'Russia lags Europe in industry maturity but has significantly larger scaling potential.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 self-start md:self-auto">
            <button
              onClick={() => onSwitchTab('contacts')}
              className="btn-outline-light flex items-center justify-center gap-2"
            >
              {isRU ? 'Связаться с нами' : isCN ? '联系我们' : 'Contact Us'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
