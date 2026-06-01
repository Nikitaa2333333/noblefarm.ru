import { useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../translations';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

interface TabIndustryProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

export default function TabIndustry({ lang, onSwitchTab }: TabIndustryProps) {
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Structured information for all 6 active regions on the map (calibrated for ComposableMap viewport 1000 x 500)
  const mapRegions = [
    {
      id: 'na',
      title: isRU ? 'США И КАНАДА' : isCN ? '美国与加拿大' : 'USA & CANADA',
      desc: isRU 
        ? 'Фермерские хозяйства, генетика, развитие пантового направления.' 
        : isCN ? '家庭农场、遗传选育、开发鹿茸加工产业。' : 'Farmed deer breeding, genetics, development of antler production.',
      hotspot: { cx: 268, cy: 244 },
      cardPos: 'lg:left-[2%] lg:top-[42%] lg:w-[22%]',
      linePath: 'M 219,163 Q 215,200 210,220',
      anchor: 'na'
    },
    {
      id: 'eu',
      title: isRU ? 'ЕВРОПА' : isCN ? '欧洲' : 'EUROPE',
      desc: isRU 
        ? 'Исторический центр разведения благородного оленя. Венгрия, Чехия, Германия, Польша, Словения и др. Сильные генетические линии и племенные программы.' 
        : isCN ? '欧洲红鹿繁育的历史中心。匈牙利、捷克、德国、波兰、斯洛文尼亚等。拥有雄厚的遗传基因与良种繁育计划。' : 'Historical center of Red Deer breeding. Hungary, Czech Republic, Germany, Poland, Slovenia, etc. Strong genetics and pedigree programs.',
      hotspot: { cx: 506, cy: 244 },
      cardPos: 'lg:left-[12%] lg:bottom-[4%] lg:w-[26%]',
      linePath: 'M 508,163 Q 450,300 380,450',
      anchor: 'eu'
    },
    {
      id: 'ru',
      title: isRU ? 'РОССИЯ' : isCN ? '俄罗斯' : 'RUSSIA',
      desc: isRU 
        ? 'Рынок благородного оленя только формируется. Ферм единицы, отрасль в начале пути.' 
        : isCN ? '欧洲红鹿消费与繁育市场刚刚兴起。全国红鹿养殖场极少,产业正处于最早期阶段。' : 'The noble deer market is just forming. Few farms, the industry is at the beginning of its journey.',
      hotspot: { cx: 676, cy: 201 },
      cardPos: 'lg:right-[2%] lg:top-[4%] lg:w-[22%]',
      linePath: 'M 713,111 Q 740,90 770,70',
      anchor: 'ru-section'
    },
    {
      id: 'cn',
      title: isRU ? 'КИТАЙ' : isCN ? '中国' : 'CHINA',
      desc: isRU 
        ? 'Крупнейший рынок потребления пантов. Активная переработка и внутреннее производство.' 
        : isCN ? '全球最大鹿茸消费市场。主导原材料精深加工与本土化研发生产。' : 'The largest velvet antler consumption market. Active processing and domestic production.',
      hotspot: { cx: 695, cy: 280 },
      cardPos: 'lg:right-[2%] lg:top-[34%] lg:w-[22%]',
      linePath: 'M 735,207 Q 745,207 755,207',
      anchor: 'asia'
    },
    {
      id: 'kr',
      title: isRU ? 'ЮЖНАЯ КОРЕЯ' : isCN ? '韩国' : 'SOUTH KOREA',
      desc: isRU 
        ? 'Крупнейший мировой импортёр пантов (~80% мирового импорта). Высокий спрос на качественное сырьё.' 
        : isCN ? '全球最大的原料鹿茸进口国（占全球进口份额约80%）。对高品质红鹿原料需求极其旺盛。' : 'The largest global importer of velvet antlers (~80% of global imports). High demand for premium raw materials.',
      hotspot: { cx: 745, cy: 278 },
      cardPos: 'lg:right-[2%] lg:bottom-[4%] lg:w-[22%]',
      linePath: 'M 796,204 Q 780,320 760,440',
      anchor: 'asia'
    },
    {
      id: 'nz',
      title: isRU ? 'НОВАЯ ЗЕЛАНДИЯ' : isCN ? '新西兰' : 'NEW ZEALAND',
      desc: isRU 
        ? 'Мировой лидер отрасли. ~800 тыс. оленей на фермах. ~80% мирового экспорта пантов. Более 10 000 т продукции в год. Глубокая переработка и экспорт в 40+ стран.' 
        : isCN ? '养鹿业世界领头羊。全国农场饲养红鹿约80万头。约占全球原料鹿茸出口的80%。年产量超1万吨。深度加工，畅销全球40多个国家和地区。' : 'Global industry leader. ~800k deer on farms. ~80% of global velvet export. Over 10k tons of products per year. Deep processing and export to 40+ countries.',
      hotspot: { cx: 841, cy: 453 },
      cardPos: 'lg:left-[44%] lg:bottom-[4%] lg:w-[26%]',
      linePath: 'M 913,416 Q 810,430 705,440',
      anchor: 'nz'
    }
  ];

  const getRegionIdForCountry = (name: string): string | null => {
    if (name === "United States of America" || name === "Canada") return "na";
    if (name === "Russia") return "ru";
    if (name === "China") return "cn";
    if (name === "South Korea") return "kr";
    if (name === "New Zealand") return "nz";
    
    const europeanCountries = [
      "Germany", "France", "Italy", "United Kingdom", "Poland", "Austria", 
      "Hungary", "Czechia", "Slovakia", "Slovenia", "Croatia", "Bulgaria", 
      "Greece", "Albania", "Switzerland", "Belgium", "Netherlands", "Portugal", 
      "Spain", "Ireland", "Norway", "Sweden", "Finland", "Denmark", "Iceland", 
      "Bosnia and Herz.", "Macedonia", "Serbia", "Montenegro", "Kosovo", 
      "Romania", "Moldova", "Belarus", "Lithuania", "Latvia", "Estonia", "Ukraine"
    ];
    if (europeanCountries.includes(name)) return "eu";
    return null;
  };

  const getGeographyFill = (name: string, isGeoHovered: boolean) => {
    const rId = getRegionIdForCountry(name);
    const isParentHovered = hoveredRegion === rId;
    const active = isGeoHovered || (rId && isParentHovered);

    if (rId) {
      return active ? 'rgba(208, 177, 138, 0.3)' : 'rgba(255, 255, 255, 0.07)';
    }
    return 'rgba(255, 255, 255, 0.03)';
  };

  const getGeographyStroke = (name: string, isGeoHovered: boolean) => {
    const rId = getRegionIdForCountry(name);
    const isParentHovered = hoveredRegion === rId;
    const active = isGeoHovered || (rId && isParentHovered);

    if (rId) {
      return active ? '#D0B18A' : 'rgba(255, 255, 255, 0.15)';
    }
    return 'rgba(255, 255, 255, 0.05)';
  };

  const getGeographyStrokeWidth = (name: string, isGeoHovered: boolean) => {
    const rId = getRegionIdForCountry(name);
    const isParentHovered = hoveredRegion === rId;
    const active = isGeoHovered || (rId && isParentHovered);

    if (rId) {
      return active ? 1.0 : 0.5;
    }
    return 0.3;
  };

  const regions = [
    { id: 'nz', name: isRU ? 'Новая Зеландия' : isCN ? '新西兰' : 'New Zealand' },
    { id: 'eu', name: isRU ? 'Европа' : isCN ? '欧洲' : 'Europe' },
    { id: 'asia', name: isRU ? 'Азия (Китай и Южная Корея)' : isCN ? '亚洲（中国与韩国）' : 'Asia (China & South Korea)' },
    { id: 'na', name: isRU ? 'Северная Америка' : isCN ? '北美' : 'North America' },
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

  return (
    <div className="w-full">
      {/* ─── Premium Widescreen Interactive Map Hero (Cinematic Section) ────────────────── */}
      <section className="section-cinematic relative min-h-screen h-auto flex flex-col justify-between pt-28 md:pt-32 pb-16 !overflow-visible select-none">
        
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary via-secondary/95 to-primary/60 pointer-events-none" />

        {/* CSS Animations and Map styling embedded locally */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse-glow {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.6); opacity: 0; }
            100% { transform: scale(1); opacity: 0; }
          }
          @keyframes line-flow {
            to { stroke-dashoffset: -20; }
          }
          .pulse-ring {
            animation: pulse-glow 2.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          }
          .pulse-ring-delayed {
            animation: pulse-glow 2.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
            animation-delay: 1.25s;
          }
          .flow-dashed {
            stroke-dasharray: 6 4;
            animation: line-flow 1.5s linear infinite;
          }
          .rsm-geography {
            transition: fill 0.4s ease, stroke 0.4s ease;
          }
        `}} />

        <div className="section-inner z-10 w-full flex-1 flex flex-col justify-between gap-6">
          
          {/* Header block with elegant typography and custom gold eyebrows */}
          <div className="section-header max-w-3xl px-4 md:px-0">
            <span className="label-eyebrow">
              {isRU ? 'Мировые рынки и перспективы' : isCN ? '全球市场与前景' : 'Global Markets & Outlook'}
            </span>
            <h1 className="hero-title-light">
              {isRU ? 'Оленеводство в ' : isCN ? '世界' : 'Deer Husbandry in the '}
              <span className="h-section__accent">
                {isRU ? 'мире' : isCN ? '养鹿业' : 'World'}
              </span>
            </h1>
            <p className="hero-desc-light">
              {isRU
                ? 'Как устроено современное оленеводство в мире и почему Россия только в начале пути'
                : isCN
                  ? '现代养鹿业在全球是如何运作的，以及为什么俄罗斯目前仅处于发展起步阶段'
                  : 'How modern deer farming works worldwide and why Russia is only at the beginning of the road'}
            </p>
          </div>

          {/* Interactive World Map Grid */}
          <div className="w-full my-4">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 120,
                center: [11, 46]
              }}
              width={1000}
              height={500}
              className="w-full h-auto animate-fadeIn block"
            >
              <defs>
                {/* Gold Glow filter */}
                <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <Geographies geography="/world-110m.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const name = geo.properties.name;
                    const rId = getRegionIdForCountry(name);

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          if (rId) setHoveredRegion(rId);
                        }}
                        onMouseLeave={() => {
                          setHoveredRegion(null);
                        }}
                        onClick={() => {
                          if (rId) {
                            const anchor = mapRegions.find(r => r.id === rId)?.anchor;
                            if (anchor) scrollToId(anchor);
                          }
                        }}
                        style={{
                          default: {
                            fill: getGeographyFill(name, false),
                            stroke: getGeographyStroke(name, false),
                            strokeWidth: getGeographyStrokeWidth(name, false),
                            outline: "none"
                          },
                          hover: {
                            fill: getGeographyFill(name, true),
                            stroke: getGeographyStroke(name, true),
                            strokeWidth: getGeographyStrokeWidth(name, true),
                            outline: "none",
                            cursor: rId ? "pointer" : "default"
                          },
                          pressed: {
                            fill: getGeographyFill(name, true),
                            stroke: "#D0B18A",
                            strokeWidth: 1.0,
                            outline: "none"
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* Double pulsing geographic hotspots */}
              <g className="pointer-events-auto">
                {mapRegions.map((region) => {
                  const isActive = hoveredRegion === region.id;
                  return (
                    <g 
                      key={region.id} 
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => scrollToId(region.anchor)}
                    >
                      {/* Pulse ring 1 */}
                      <circle
                        cx={region.hotspot.cx}
                        cy={region.hotspot.cy}
                        r="10"
                        className={`fill-accent/20 pulse-ring origin-center transition-all ${
                          isActive ? 'scale-125' : ''
                        }`}
                        style={{ transformOrigin: `${region.hotspot.cx}px ${region.hotspot.cy}px` }}
                      />
                      {/* Pulse ring 2 */}
                      <circle
                        cx={region.hotspot.cx}
                        cy={region.hotspot.cy}
                        r="18"
                        className="fill-accent/10 pulse-ring-delayed origin-center"
                        style={{ transformOrigin: `${region.hotspot.cx}px ${region.hotspot.cy}px` }}
                      />
                      {/* Center dot */}
                      <circle
                        cx={region.hotspot.cx}
                        cy={region.hotspot.cy}
                        r="4"
                        className={`transition-all duration-300 origin-center ${
                          isActive 
                            ? 'fill-accent scale-110' 
                            : 'fill-text-light/90'
                        }`}
                        style={{ transformOrigin: `${region.hotspot.cx}px ${region.hotspot.cy}px` }}
                      />
                    </g>
                  );
                })}
              </g>
            </ComposableMap>
          </div>

          {/* Large Global Stats — naked numbers on cinematic background */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8 px-4 md:px-0">
            <div className="flex flex-col gap-2">
              <span className="card-stat__value">80%</span>
              <span className="text-sm font-bold text-text-light mt-1">
                {isRU ? 'мирового рынка пантов' : isCN ? '全球鹿茸原料市场' : 'global velvet market'}
              </span>
              <p className="text-base font-medium text-text-light/85 leading-snug mt-1">
                {isRU
                  ? 'контролирует Новая Зеландия как экспортёр сырья.'
                  : isCN ? '由作为原料出口国的新西兰控制。' : 'controlled by New Zealand as a key raw material exporter.'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="card-stat__value">≈80%</span>
              <span className="text-sm font-bold text-text-light mt-1">
                {isRU ? 'мирового импорта' : isCN ? '全球进口额' : 'global imports'}
              </span>
              <p className="text-base font-medium text-text-light/85 leading-snug mt-1">
                {isRU
                  ? 'приходится на Южную Корею — крупнейший рынок потребления.'
                  : isCN ? '由作为最大消费市场的韩国进口。' : 'imported by South Korea — the largest consumption market.'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="card-stat__value">20+</span>
              <span className="text-sm font-bold text-text-light mt-1">
                {isRU ? 'регионов России' : isCN ? '多个俄罗斯联邦主体' : 'regions of Russia'}
              </span>
              <p className="text-base font-medium text-text-light/85 leading-snug mt-1">
                {isRU
                  ? 'занимаются пантовым оленеводством, но отрасль остаётся нишевой.'
                  : isCN ? '从事鹿茸养殖业，但该产业目前仍处于细分的小众领域。' : 'engaged in velvet deer farming, but the industry remains niche.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2. Новая Зеландия ────────────────────────────────────────────── */}
      <section id="nz" className="section-calm scroll-mt-24 pt-0">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 section-header">
              <span className="card-feature__eyebrow">
                {isRU ? 'Мировой лидер' : isCN ? '行业领导者' : 'World Leader'}
              </span>
              <h2 className="h-section">
                {isRU ? 'Новая Зеландия: как оленеводство стало ' : isCN ? '新西兰：养鹿业是如何成长为' : 'New Zealand: How Deer Farming Became an '}
                <span className="h-section__accent">{isRU ? 'индустрией' : isCN ? '产业' : 'Industry'}</span>
              </h2>
              <p className="body-lead">
                {isRU
                  ? 'Новая Зеландия считается мировым лидером современного оленеводства. Именно здесь отрасль была переведена на промышленный уровень: с системной селекцией, ветеринарией, экспортом и глубокой переработкой.'
                  : isCN
                    ? '新西兰是举世公认的现代养鹿业世界领头羊。正是在这里，养鹿业被提升到了规模化、工业化的先进生产水平：拥有全套科学的系统育种、全方位的兽医安检体系、庞大的出口外销机制以及高附加值的深加工技术。'
                    : 'New Zealand is considered the global leader in modern deer farming. It is here that the industry was raised to an industrial level: with systematic selection, veterinary medicine, exports, and deep processing.'}
              </p>
              <p className="body-lead">
                {isRU
                  ? 'Успех отрасли держится на четырёх опорах: сильной генетике, выстроенной десятилетиями системной селекции; научном подходе с современной ветеринарией и исследованиями; экспортной модели с ориентацией на глобальный рынок; и глубокой переработке, где капсулы, порошки и экстракты заменили сырьё.'
                  : isCN
                    ? '产业的成功建立在四大支柱之上：经过数十年系统繁育改良的卓越遗传基因；以高端兽医医疗与学术研究为支撑的前沿科学方法；紧密对接全球消费市场的外向出口导向模式；以及用鹿茸精粉、胶囊、提取物代替初级原料的高价值深加工体系。'
                    : 'The industry’s success rests on four pillars: strong genetics built over decades of systemic selection; a scientific approach backed by veterinary medicine and research; an export-driven model focused on the global market; and deep processing, where capsules, powders, and extracts have replaced raw materials.'}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-10">
              <h3 className="h-block">{isRU ? 'Статистические показатели' : isCN ? '核心产业统计数据' : 'Key Statistics'}</h3>
              <div className="flex flex-col gap-6">
                {nzStats.map((s, idx) => (
                  <div key={idx} className="flex gap-5 items-baseline">
                    <span className="card-stat__value shrink-0">{s.stat}</span>
                    <span className="text-sm font-medium text-text-dark leading-snug">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Европа ─────────────────────────────────────────────────────── */}
      <section id="eu" className="section-calm scroll-mt-24">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <span className="card-feature__eyebrow">
                {isRU ? 'Историческая колыбель' : isCN ? '历史的发源地' : 'Historical Cradle'}
              </span>
              <h2 className="h-section">
                {isRU ? 'Европа: историческая база ' : isCN ? '欧洲：红鹿选育的' : 'Europe: Historical Base of '}
                <span className="h-section__accent">{isRU ? 'благородного оленя' : isCN ? '历史基底' : 'Red Deer'}</span>
              </h2>
              <p className="body-lead">
                {isRU
                  ? 'Именно Европа сформировала многие известные линии благородного европейского оленя. Здесь развивались племенные хозяйства и подходы к качеству стада. Woburn и Warnham — признанные во всем мире генетические стандарты.'
                  : isCN
                    ? '正是欧洲成功培育出了许多世界闻名的欧洲红鹿优良血统品系。在这里，凝聚着历史悠久的良种繁育技术 and 对品质控制的严谨态度。其中最具代表性的血统即是 Woburn 和 Warnham。'
                    : 'It is Europe that formed many famous lines of European Red Deer. Here, breeding farms and systematic approaches to quality were developed, including Woburn and Warnham lines.'}
              </p>
              <p className="body-lead">
                {isRU
                  ? 'Сильная сторона Европы — её генетика; слабая — ограниченность пастбищ и высокая стоимость сельскохозяйственных земель. У России, напротив, огромный земельный ресурс и подходящий климат, но отрасль пока находится на ранней стадии развития.'
                  : isCN
                    ? '欧洲的优势在于其雄厚的遗传基因储备，但其劣势同样明显——牧场空间受限，农业用地成本高昂。俄罗斯则恰恰相反：拥有极为辽阔的土地资源和适宜的自然气候，但产业整体仍处于发展的最早期阶段。'
                    : 'Europe’s strength lies in its genetics; its weakness — limited pastures and the high cost of agricultural land. Russia, by contrast, has vast land resources and a suitable climate, but the industry is still at an early stage of development.'}
              </p>
            </div>
            <div className="lg:col-span-5" />
          </div>
        </div>
      </section>

      {/* ─── 4. Азия ─────────────────────────────────────────────────────── */}
      <section id="asia" className="section-calm scroll-mt-24">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <span className="card-feature__eyebrow">
                {isRU ? 'Потребительский спрос' : isCN ? '最大的消费市场' : 'Consumer Demand'}
              </span>
              <h2 className="h-section">
                {isRU ? 'Азия: крупнейший рынок ' : isCN ? '亚洲：全球最大的鹿茸' : 'Asia: The Largest Consumer '}
                <span className="h-section__accent">{isRU ? 'потребления' : isCN ? '消费驱动力' : 'Market'}</span>
              </h2>
              <p className="body-lead">
                {isRU
                  ? 'Исторически именно Азия сформировала спрос на продукцию пантового направления. В Китае использование пантов насчитывает более 2000 лет, а Южная Корея сегодня остаётся крупнейшим мировым импортёром.'
                  : isCN
                    ? '从历史渊源来看，正是亚洲源源不断地驱动并创造了对鹿茸制品和传统理疗的巨大市场需求。在中国，鹿茸防病强身和传统调理的使用历史已超过2000年，而韩国至今仍是全球最核心的天然鹿茸进口国。'
                    : 'Historically, it is Asia that shaped the demand for velvet antler products. In China, the use of antlers dates back over 2000 years, while South Korea remains the largest global importer.'}
              </p>
              <p className="body-lead">
                {isRU
                  ? 'Южная Корея отличается предпочтением крупным высококачественным пантам и обеспечивает примерно 80% мирового импорта. Китай не только потребляет, но и активно развивает внутреннюю переработку — капсулы, экстракты и functional-продукты.'
                  : isCN
                    ? '韩国的市场特征是极度偏爱并追求饱满、肥大、高品质的特级精选鹿茸，约占全球鹿茸进口份额的80%。中国不仅是终极原料消费者，更在积极构建领先的精细深加工产业，主导鹿茸粉、精细胶囊、高纯度提取液和现代功能性健康调理食品。'
                    : 'South Korea stands out for its preference for large, high-quality antlers and accounts for around 80% of global imports. China not only consumes but also actively develops domestic deep processing — capsules, extracts, and functional products.'}
              </p>
              <p className="body-lead">
                <strong>{isRU ? 'Тренд: ' : isCN ? '全球趋势：' : 'Trend: '}</strong>
                {isRU
                  ? 'рынок постепенно смещается от сырья к продуктам глубокой переработки с высокой добавленной стоимостью.'
                  : isCN ? '鹿茸原料贸易市场正在稳步、大跨步地从初级原料粗加工，向高利润、高附加值的现代精细深加工成品转型。' : 'the market is gradually shifting from raw materials to deep processing products with high added value.'}
              </p>
            </div>
            <div className="lg:col-span-5" />
          </div>
        </div>
      </section>

      {/* ─── 5. Северная Америка (Clean Calm White Section) ────────────────────── */}
      <section id="na" className="section-calm scroll-mt-24 pt-0">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <span className="card-feature__eyebrow">
                {isRU ? 'Североамериканская модель' : isCN ? '北美育种管理模式' : 'North American Model'}
              </span>
              <h2 className="h-section">
                {isRU ? 'США и Канада: развитие ' : isCN ? '美国与加拿大：专业' : 'USA & Canada: Development of '}
                <span className="h-section__accent">{isRU ? 'фермерского оленеводства' : isCN ? '红鹿养殖场' : 'Specialized Farming'}</span>
              </h2>
              <p className="body-lead">
                {isRU
                  ? 'В Северной Америке активно развивается разведение благородных оленей и wapiti (вапити), где большое внимание уделяется качеству генетики, репродуктивным технологиям и развитию животных с выдающимися характеристиками рогов.'
                  : isCN
                    ? '在北美大陆，欧洲红鹿以及马鹿（Wapiti）的科学繁育正呈现蓬勃发展之势。这套体系将核心精力倾注于基因品质改良、前沿辅助生殖繁育技术（如人工授精与胚胎移植）以及培养具有非凡观赏与商业价值的角骨个体。'
                    : 'In North America, Red Deer and wapiti breeding is actively developing, focusing on genetic quality, reproductive technologies, and the growth of animals with outstanding antler characteristics.'}
              </p>
              <p className="body-lead">
                {isRU
                  ? 'США и Канада также входят в число производителей пантов и постепенно увеличивают долю переработанной продукции.'
                  : isCN
                    ? '美国与加拿大也是全球高品质鹿茸和鹿角的重要产地之一，并正在稳步提升高端精深加工产品的市场占比。'
                    : 'USA and Canada are also among key velvet producers and are gradually increasing the share of processed high-value products.'}
              </p>
            </div>
            <div className="lg:col-span-5" />
          </div>
        </div>
      </section>

      {/* ─── 6. Экономика отрасли (5 моделей дохода) ────────────────────── */}
      <section className="section-calm">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <h2 className="h-section">
                {isRU ? 'Современное оленеводство — это не ' : isCN ? '现代养鹿业：' : 'Modern Deer Farming: '}
                <span className="h-section__accent">{isRU ? 'модель одного дохода' : isCN ? '多元化创收模型' : 'Multiple Income Streams'}</span>
              </h2>
              <p className="body-lead">
                {isRU
                  ? 'Современное оленеводство опирается сразу на несколько источников дохода: генетику и племенное направление с высокой стоимостью качественных линий; пантовое направление — сырьё и переработку; репродуктивные технологии — ЭКО и улучшение стада; агротуризм с экскурсиями и открытыми форматами; и глубокую переработку — капсулы, экстракты, wellness.'
                  : isCN
                    ? '现代养鹿业同时依托多元化的创收模型：遗传基因与良种选育（优质繁育亲本血统具有极高的单头商业价值）、鹿茸科学开发（初级鹿茸原材料与高端深加工成品的研发生产）、现代辅助生殖技术（通过人工授精与胚胎移植等科技快速改良升级）、农业生态旅游开发（红鹿生态科普旅行项目和自然观光游览服务），以及高价值深加工链条（高精纯胶囊、生物多肽提取液与健康理疗）。'
                    : 'Modern deer farming draws on multiple income streams: genetics and pedigree breeding with the high commercial value of quality lines; the velvet antler direction — raw materials and processed wellness products; reproductive technologies — IVF and rapid herd improvement; agrotourism with excursions and open farm formats; and deep processing — capsules, extracts, and wellness.'}
              </p>
              <p className="body-lead">
                {isRU
                  ? 'Во многих странах наибольшую добавленную стоимость создаёт не сырьё, а переработка и готовая продукция.'
                  : isCN ? '核心经济逻辑：纵观全球，创造最大化经济附加值和利润收益的不是初级初加工原材料，而是深度加工与高品质精制成品。' : 'Core economic logic: globally, the highest added value is created by deep processing and finished products, not raw materials.'}
              </p>
            </div>
            <div className="lg:col-span-5" />
          </div>
        </div>
      </section>

      {/* ─── 7. Почему Россия имеет потенциал (High-impact summary - strategic green CTA section) ─── */}
      <section id="ru-section" className="section-accent scroll-mt-24">
        <div className="section-inner flex flex-col gap-10">
          <div className="max-w-3xl section-header">
            <h2 className="h-section-light">
              {isRU ? 'Почему Россия может стать ' : isCN ? '为什么俄罗斯具备成为全球' : 'Why Russia Can Become a '}
              <span className="h-section__accent">{isRU ? 'сильным игроком' : isCN ? '核心强国的巨大潜力' : 'Strong Global Player'}</span>
            </h2>
            <p className="body-lead-light">
              {isRU
                ? 'Несмотря на наличие подходящего климата и больших земельных ресурсов, современное оленеводство в России пока находится на ранней стадии развития. При этом мировой опыт показывает: сочетание качественной генетики, технологий, ветеринарного сопровождения и переработки может формировать устойчивую современную отрасль.'
                : isCN
                  ? '尽管拥有极为理想的气候条件和无与伦比的草场土地深度空间，俄罗斯的现代高端红鹿养殖目前仍处于起步阶段。新西兰等国的经验深刻表明：通过将高端育种遗传、辅助繁育科技、全程兽医安全监护以及深加工技术开发紧密结合，必然能构建起一个长期繁荣、可持续的现代战略性产业。'
                  : 'Despite having a suitable climate and vast land resources, modern deer farming in Russia is still in its early stages of development. However, global experience shows that a combination of quality genetics, technology, veterinary support, and processing can shape a sustainable modern industry.'}
            </p>
            <p className="body-lead-light">
              {isRU
                ? 'Россия уступает Европе по зрелости отрасли, но обладает значительно большими возможностями масштабирования.'
                : isCN ? '俄罗斯尽管在产业配套和成熟度上暂时落后于欧洲，但在牧场面积、空间纵深和规模化扩展潜力上，拥有极其巨大的不对称领先优势。' : 'Russia lags Europe in industry maturity but has significantly larger scaling potential.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button
              onClick={() => onSwitchTab('contacts')}
              className="btn-outline-light"
            >
              {isRU ? 'Связаться с нами' : isCN ? '联系我们' : 'Contact Us'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
