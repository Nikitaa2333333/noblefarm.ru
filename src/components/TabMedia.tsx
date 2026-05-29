import { motion } from 'motion/react';
import { ArrowRight, FileText, Mic, Globe } from 'lucide-react';
import { Language } from '../translations';

interface TabMediaProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

export default function TabMedia({ lang, onSwitchTab }: TabMediaProps) {
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  const topics = isRU
    ? [
        'Современное оленеводство',
        'Благородный европейский олень',
        'Пантовое направление',
        'Развитие новых сельскохозяйственных направлений в России',
        'Сельский туризм и открытые хозяйства',
      ]
    : isCN
    ? [
        '现代养鹿业',
        '欧洲红鹿品系',
        '鹿茸与鹿角开发',
        '俄罗斯新兴农业方向',
        '乡村旅游与生态科普农场',
      ]
    : [
        'Modern deer farming',
        'European Red Deer',
        'Velvet antler direction',
        'Development of new agricultural sectors in Russia',
        'Rural tourism and open eco-farms',
      ];

  const outlets = [
    { name: 'Агроинвестор', nameEN: 'Agroinvestor', nameCN: 'Agroinvestor', image: '/agro.jpg', url: 'https://agroinvestor.ru' },
    { name: 'The Village', nameEN: 'The Village', nameCN: 'The Village', image: '/vill.png', url: 'https://www.the-village.ru' },
    { name: 'РБК', nameEN: 'RBC', nameCN: 'RBC', image: '/rbk.png', url: 'https://www.rbc.ru' },
    { name: 'Fermer.ru', nameEN: 'Fermer.ru', nameCN: 'Fermer.ru', image: '/channels4_profile.jpg', url: 'https://fermer.ru' },
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

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <span className="text-accent text-sm font-semibold tracking-wider block mb-3">
              {isRU ? 'Публикации и интервью' : isCN ? '媒体报道与访谈' : 'Publications & Interviews'}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[4.5rem] font-medium leading-none text-text-dark">
              {isRU ? 'В СМИ' : isCN ? '媒体报道' : 'In the Media'}
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-medium text-text-dark max-w-3xl leading-relaxed">
              {isRU
                ? 'Публикации, интервью и материалы о проекте «Благородный Север» и развитии современного оленеводства в России.'
                : isCN
                  ? '关于“高贵北方”项目以及俄罗斯现代养鹿业发展的出版物、采访与报道资料。'
                  : 'Publications, interviews, and materials about the "Noble Sever" project and the development of modern deer farming in Russia.'}
            </p>
          </div>
          <div className="lg:col-span-4 overflow-hidden rounded-none rounded-br-[40px] lg:rounded-br-[80px] shadow-lg border border-border-light aspect-[4/3] bg-white">
            <img src="/enhanced_about_7.webp" className="w-full h-full object-cover" alt="Media" />
          </div>
        </div>

        {/* Publications section */}
        <section className="bg-bg-card border border-border-light rounded-none p-8 md:p-12 mb-12 shadow-xs">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-dark mb-8 border-b border-border-light pb-4">
            {isRU ? 'Главные публикации' : isCN ? '重点报道' : 'Published Materials'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-border-light rounded-none p-6 flex flex-col justify-between shadow-xs">
              <div className="flex flex-col gap-4">
                <div className="aspect-[16/10] bg-secondary rounded-none relative overflow-hidden flex items-center justify-center border border-border-light shadow-inner group">
                  <img src="/enhanced_about_1.webp" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-103 transition-transform duration-500" alt="Video" />
                  <div className="absolute inset-0 bg-secondary/30" />
                  <div className="relative z-10 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-primary ml-1" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-text-dark">
                    {isRU ? 'Интервью «Бизнес ланч»' : isCN ? '《商业午餐》节目专访' : 'Business Lunch Interview'}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed mt-2">
                    {isRU
                      ? 'О развитии благородного оленеводства в Московской области. Программа «Бизнес ланч» 24-01-2026 и 25-01-2026.'
                      : isCN
                        ? '深入探讨莫斯科州欧洲红鹿养殖业的现代化发展。收录于2026年1月24日至25日播出的《商业午餐》节目。'
                        : 'On the development of European Red Deer farming in the Moscow region. Featured on the "Business Lunch" program on Jan 24-25, 2026.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-border-light">
                <span className="text-xs font-bold text-text-dark">
                  {isRU ? 'Источник • VKontakte • 24–25 января 2026' : isCN ? '来源 • VK 视频 • 2026年1月24日至25日' : 'Source • VKontakte • Jan 24–25, 2026'}
                </span>
                <a href="https://vkvideo.ru/video-236675004_456239040" target="_blank" rel="noopener noreferrer"
                   className="btn-outline-dark text-xs py-3 px-6 w-fit leading-none mt-2 flex items-center justify-center gap-1.5 font-bold cursor-pointer">
                  {isRU ? 'Смотреть интервью' : isCN ? '观看采访视频' : 'Watch Interview'} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="bg-bg-light/40 border border-dashed border-border-light rounded-none p-6 flex flex-col justify-center items-center text-center gap-4">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-medium text-text-dark italic">
                {isRU ? 'Новые публикации ожидаются' : isCN ? '更多报道敬请期待' : 'New Publications Expected'}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-text-dark italic max-w-sm leading-relaxed">
                {isRU
                  ? 'Здесь появятся другие публикации и репортажи по мере их выхода.'
                  : isCN
                    ? '随着项目的推进，其他媒体出版物和专题报道将在此陆续呈现。'
                    : 'Other publications and reports will appear here as they are released.'}
              </p>
            </div>
          </div>
        </section>

        {/* Outlets logos */}
        <section className="mb-12">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-text-dark mb-8 text-center">
            {isRU ? 'В партнёрстве с профессиональными изданиями' : isCN ? '与专业行业媒体紧密合作' : 'In Partnership with Professional Publications'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outlets.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                 className="group bg-bg-card flex flex-col items-center justify-between p-6 sm:p-8 aspect-square rounded-none border border-border-light hover:border-accent hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500">
                <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-none bg-white p-6 border border-border-light/30">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <span className="mt-4 text-text-dark group-hover:text-primary text-xs font-bold tracking-widest transition-colors duration-300">
                  {isRU ? item.name : isCN ? item.nameCN : item.nameEN}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* For journalists */}
        <section className="bg-primary text-text-light rounded-none p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <Mic className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-accent">
                  {isRU ? 'Для СМИ и журналистов' : isCN ? '媒体与记者专区' : 'For Media & Journalists'}
                </h2>
              </div>
              <p className="text-text-light text-sm sm:text-base leading-relaxed font-semibold">
                {isRU
                  ? 'Открыты к профессиональному общению, предоставлению актуальной информации и организации съёмок по темам:'
                  : isCN
                    ? '我们对专业交流、提供最新行业资讯以及围绕以下主题组织媒体拍摄持全面开放态度：'
                    : 'We are open to professional communication, providing up-to-date information, and organizing shoots on the following topics:'}
              </p>
              <ul className="flex flex-col gap-2.5 mt-2">
                {topics.map((t, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm font-semibold text-text-light">
                    <span className="text-accent font-bold mt-0.5">—</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4 items-start lg:items-end">
              <div className="flex items-center gap-2 text-text-light text-sm font-semibold">
                <Globe className="w-4 h-4 text-accent shrink-0" />
                <span>
                  {isRU
                    ? 'Принимаем запросы от изданий и блогеров'
                    : isCN
                      ? '欢迎各大媒体、期刊与博客主的采访申请'
                      : 'We accept requests from media and bloggers'}
                </span>
              </div>
              <button onClick={() => onSwitchTab('contacts')} className="btn-primary cursor-pointer flex items-center justify-center gap-1.5 w-full lg:w-auto">
                {isRU ? 'Связаться с нами' : isCN ? '与我们联系' : 'Contact Us'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}