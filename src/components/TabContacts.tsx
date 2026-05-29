import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Share2, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface TabContactsProps {
  lang: Language;
}

export default function TabContacts({ lang }: TabContactsProps) {
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  const directions = [
    {
      title: isRU ? 'Профессиональное взаимодействие' : '专业级行业互动',
      desc: isRU ? 'Обмен опытом с хозяйствами и специалистами.' : '与同业牧场及专家开展深度经验交流。',
    },
    {
      title: isRU ? 'Генетика и племенная работа' : '遗传基因与良种选育',
      desc: isRU ? 'Развитие качественного стада.' : '构建发展优质、高抗病性的红鹿种群。',
    },
    {
      title: isRU ? 'Научные и образовательные проекты' : '前沿科学与教育项目',
      desc: isRU ? 'Популяризация отрасли.' : '推动现代科学养鹿业的社会化普及。',
    },
    {
      title: isRU ? 'Пантовое направление' : '鹿茸与鹿角产业方向',
      desc: isRU ? 'Исследования и развитие.' : '深耕产业研发，推动深加工技术落地。',
    },
    {
      title: isRU ? 'Сельский туризм и экскурсии' : '乡村生态旅游与导览',
      desc: isRU ? 'Перспективные форматы сотрудничества.' : '共同开拓具有极高前景的农场观光新模式。',
    },
  ];

  const community = [
    {
      title: isRU ? 'Репродуктивные технологии' : '辅助生殖繁育技术',
      region: isRU ? 'Владимирская область' : '弗拉基米尔州',
      desc: isRU ? 'Обмен опытом в области репродуктивных технологий и развития стада.' : '在辅助生殖与种群良种选育领域的经验共享。',
      photo: '/enhanced_about_2.webp',
    },
    {
      title: isRU ? 'Инфраструктура хозяйств' : '牧场基础设施建设',
      region: isRU ? 'Решения для ферм' : '现代化牧场方案',
      desc: isRU ? 'Решения для профессионального обустройства современных оленьих хозяйств.' : '为现代专业养鹿场提供一流的围栏与基建设计方案。',
      photo: '/enhanced_about_3.webp',
    },
    {
      title: isRU ? 'Пантовое направление' : '马鹿茸产业实践',
      region: isRU ? 'Костромской центр мараловодства' : '科斯特罗马马鹿养殖中心',
      desc: isRU ? 'Практический опыт в развитии пантового направления и мараловодства.' : '在马鹿养殖以及鹿茸科学收茸领域的丰富实践经验。',
      photo: '/enhanced_about_6.webp',
    },
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <span className="text-accent text-sm font-semibold tracking-wider block mb-3">
              {isRU ? 'Обратная связь и диалог' : isCN ? '联系与合作' : 'Contacts & Cooperation'}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[4.5rem] font-medium leading-none text-text-dark">
              {isRU ? 'Контакты и партнёрство' : isCN ? '联系与合作' : 'Contacts & Partnership'}
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-medium text-text-dark max-w-3xl leading-relaxed">
              {isRU
                ? 'Открыты к профессиональному общению, сотрудничеству и развитию современного оленеводства в России.'
                : isCN
                  ? '我们热忱欢迎各界同行、科研机构与商业伙伴开展专业交流、深层合作，共同推动俄罗斯现代养鹿产业的繁荣发展。'
                  : 'We are open to professional communication, cooperation, and the development of modern deer farming in Russia.'}
            </p>
          </div>
          <div className="lg:col-span-4 overflow-hidden rounded-none rounded-br-[40px] lg:rounded-br-[80px] shadow-lg border border-border-light aspect-[4/3] bg-white">
            <img src="/enhanced_about_9.webp" className="w-full h-full object-cover" alt="Farm gate" />
          </div>
        </div>

        {/* ─── 2. Связаться с нами (Apple/Scandinavian 32px rounded cards) ──────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Адрес */}
          <a
            href="https://yandex.ru/maps/?text=Московская+область+Дмитров"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-bg-card border border-border-light rounded-none p-8 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-300 min-h-[220px]"
          >
            <div>
              <div className="w-9 h-9 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-serif text-base font-bold text-text-dark">{isRU ? 'Адрес' : '地址'}</h4>
              <p className="text-xs sm:text-sm font-semibold text-text-dark mt-2 leading-relaxed">
                {isRU ? 'МО, г. Дмитров' : '莫斯科州，德米特罗夫市'}
              </p>
            </div>
            <span className="text-[10px] font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-4">
              {isRU ? 'Открыть карту' : '查看地图位置'} <ArrowRight className="w-3 h-3" />
            </span>
          </a>

          {/* Общие вопросы */}
          <a
            href="mailto:kfh-noble@inbox.ru"
            className="group bg-bg-card border border-border-light rounded-none p-8 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-300 min-h-[220px]"
          >
            <div>
              <div className="w-9 h-9 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-serif text-base font-bold text-text-dark">{isRU ? 'Общие вопросы' : '电子邮箱'}</h4>
              <p className="text-xs sm:text-sm font-semibold text-text-dark mt-2 leading-relaxed">
                kfh-noble@inbox.ru
              </p>
            </div>
            <span className="text-[10px] font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-4">
              {isRU ? 'Написать письмо' : '发送电子邮件'} <ArrowRight className="w-3 h-3" />
            </span>
          </a>

          {/* Социальные сети */}
          <div className="bg-bg-card border border-border-light rounded-none p-8 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-9 h-9 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6">
                <Share2 className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-serif text-base font-bold text-text-dark">{isRU ? 'Социальные сети' : '社交媒体'}</h4>
              <div className="flex gap-3 mt-3">
                <a
                  href="https://vk.ru/kfh_noble?t2fs=cf2fdf36ee78a94985_3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-accent hover:underline transition-colors"
                >
                  VK
                </a>
                <span className="text-text-dark/20">/</span>
                <a
                  href="https://t.me/kfhNoble"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-accent hover:underline transition-colors"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>

          {/* По вопросам сотрудничества */}
          <a
            href="tel:+79258710937"
            className="group bg-bg-card border border-border-light rounded-none p-8 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-300 min-h-[220px]"
          >
            <div>
              <div className="w-9 h-9 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-serif text-base font-bold text-text-dark">{isRU ? 'По вопросам сотрудничества' : '合作热线'}</h4>
              <p className="text-xs sm:text-sm font-semibold text-text-dark mt-2 leading-relaxed">
                8-925-871-0937
              </p>
            </div>
            <span className="text-[10px] font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-4">
              {isRU ? 'Позвонить сейчас' : '即刻拨打电话'} <ArrowRight className="w-3 h-3" />
            </span>
          </a>
        </section>

        {/* ─── 3. Направления сотрудничества ─────────────────────────────────── */}
        <section className="bg-bg-card border border-border-light rounded-none p-8 md:p-12 mb-16 shadow-xs">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-dark mb-8 border-b border-border-light pb-4">
            {isRU ? 'Открыты к сотрудничеству' : isCN ? '诚邀全方位深度合作' : 'Open to Cooperation'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {directions.map((card, i) => (
              <div key={i} className="bg-bg-light/60 border border-border-light rounded-none p-6 flex flex-col justify-between min-h-[180px]">
                <h4 className="font-serif text-sm font-bold text-primary leading-tight">{card.title}</h4>
                <p className="text-[11px] font-semibold text-text-dark leading-relaxed mt-2">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. Профессиональное сообщество (Apple / Scandinavian style) ────── */}
        <section className="bg-bg-card border border-border-light rounded-none p-8 md:p-12 mb-16 shadow-xs">
          <div className="max-w-3xl mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-dark mb-4">
              {isRU ? 'Развивая отрасль вместе' : isCN ? '携手并肩 • 共同开发产业' : 'Developing the Industry Together'}
            </h2>
            <p className="text-text-dark text-sm sm:text-base leading-relaxed font-semibold">
              {isRU
                ? 'Мы ценим профессиональное взаимодействие и считаем, что развитие современного оленеводства возможно только через обмен опытом, открытый диалог и сотрудничество специалистов разных направлений.'
                : isCN
                  ? '我们高度重视专业领域的精诚互动，并深信，俄罗斯现代高端养鹿产业的发展，只有通过广泛的经验共享、真诚透明的对话以及跨学科专家团队的深度合作，才能够最终变为现实。'
                  : 'We value professional interaction and believe that the development of modern deer farming is possible only through experience exchange, open dialogue, and cooperation of specialists.'}
            </p>
            <h3 className="font-serif text-lg font-semibold text-primary mt-6">
              {isRU ? 'Наши коллеги и профессиональное окружение' : isCN ? '我们的业内同仁与专业生态圈' : 'Our colleagues and professional environment'}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {community.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-border-light rounded-none p-6 hover:shadow-xl hover:border-primary transition-all duration-500 flex flex-col gap-5"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-none">
                  <img src={item.photo} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <span className="text-accent text-[10px] font-bold tracking-wider block">{item.region}</span>
                    <h4 className="font-serif text-lg font-medium text-text-dark mt-1 leading-snug">{item.title}</h4>
                    <p className="text-xs font-semibold text-text-dark mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-border-light pt-6 text-center md:text-left">
            <p className="text-[11px] font-semibold text-text-dark italic">
              {isRU
                ? 'Мы считаем важным развитие профессионального сообщества современного оленеводства в России.'
                : isCN
                  ? '我们认为，在俄罗斯推动现代高端红鹿养殖专业化社区的建立与稳步成长具有极其深远的战略意义。'
                  : 'We consider the development of a professional modern deer farming community in Russia to be important.'}
            </p>
          </div>
        </section>

        {/* ─── 5. Финальный блок ────────────────────────────────────────────── */}
        <section className="bg-primary text-text-light rounded-none p-8 md:p-12 shadow-lg text-center md:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-accent mb-4">
            {isRU ? 'Будем рады знакомству' : isCN ? '诚挚期待与您结识' : 'We Will Be Glad to Meet You'}
          </h2>
          <p className="text-text-light text-sm sm:text-base leading-relaxed font-semibold max-w-3xl mb-8">
            {isRU
              ? 'Если вам близка тема современного оленеводства, развития сельских территорий, генетики или пантового направления — будем рады общению.'
              : isCN
                ? '如果您也对现代养鹿业开发、乡村生态地区可持续振兴、高端遗传改良或鹿茸精深加工方向怀有浓厚兴趣——我们随时恭候与您开展真诚对话。'
                : 'If you are interested in modern deer farming, rural development, genetics, or velvet antlers, we would be glad to connect.'}
          </p>
          <a
            href="mailto:kfh-noble@inbox.ru"
            className="btn-primary cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            {isRU ? 'Связаться с нами' : isCN ? '即刻建立联系' : 'Contact Us'} <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </div>
    </motion.div>
  );
}
