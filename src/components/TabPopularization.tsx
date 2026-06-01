import { motion } from 'motion/react';
import { ExternalLink, GraduationCap } from 'lucide-react';
import { Language } from '../translations';

interface TabPopularizationProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

const CONTENT = {
  RU: {
    hero: {
      eyebrow: 'Открытое хозяйство',
      title: 'Познакомиться с',
      titleAccent: 'оленеводством',
      desc: 'Мы верим, что современное оленеводство должно быть понятным и открытым. Поэтому одна из задач «Благородного Севера» — рассказывать людям об отрасли, о благородных оленях и о том, как устроено современное хозяйство.',
      intro:
        'Для многих жителей центральной России оленеводство остаётся малоизвестной сферой. Чаще оленей воспринимают как часть парков или зимних развлечений, тогда как во многих странах мира это полноценная современная отрасль.',
      outro: 'Нам важно показывать её настоящей: живой, ответственной и современной.',
      cta: 'Узнать о хозяйстве',
    },
    mission: {
      eyebrow: 'Наша миссия',
      title: 'Популяризация оленеводства —',
      titleAccent: 'часть нашей миссии',
      p1: 'Мы считаем важным рассказывать людям, как на самом деле устроено разведение благородных оленей:',
      items: [
        'чем благородный европейский олень отличается от других видов;',
        'как формируется стадо;',
        'зачем нужна генетика и ветеринарное сопровождение;',
        'что такое панты;',
        'почему оленеводство — перспективная отрасль для России.',
      ],
      p2: 'Нам хочется, чтобы больше людей узнали об этой сфере не через стереотипы, а через реальные знания и живой опыт.',
    },
    excursions: {
      eyebrow: 'Экскурсии',
      title: 'В перспективе —',
      titleAccent: 'знакомство с хозяйством',
      p1: 'Мы постепенно развиваем формат открытого хозяйства и в будущем планируем проводить экскурсии, посвящённые современному оленеводству и жизни благородных оленей.',
      p2: 'Это будут не просто прогулки, а возможность увидеть, как устроена ферма, познакомиться с животными и узнать больше об отрасли.',
      listTitle: 'Что можно будет увидеть',
      cards: [
        {
          image: '/enhanced_about_3.webp',
          title: 'Жизнь стада',
          desc: 'Как живут благородные европейские олени.',
        },
        {
          image: '/enhanced_about_5.webp',
          title: 'Пастбища. Раскол. Их содержание',
          desc: 'Как устроено современное хозяйство.',
        },
        {
          image: '/enhanced_about_8.webp',
          title: 'Сезоны оленеводства',
          desc: 'Рождение оленят, рост пантов, жизнь стада.',
        },
        {
          image: '/enhanced_deer_1.webp',
          title: 'Истории и знания',
          desc: 'Как развивается отрасль в мире.',
        },
      ],
    },
    preparation: {
      eyebrow: 'Подготовка',
      title: 'Мы подходим к этому',
      titleAccent: 'профессионально',
      p1: 'Для подготовки будущего экскурсионного направления мы уже начали обучение и изучение лучших практик сельского туризма.',
      p2: 'Один из основателей проекта прошёл государственное профессиональное обучение по направлению ',
      pAccent: 'сельского туризма,',
      p3: ' что позволит в будущем создавать содержательные и качественные экскурсионные программы.',
      diplomaCaption: 'Диплом о профессиональном обучении — сельский туризм',
    },
    park: {
      eyebrow: 'Гостевой дом',
      title: 'Парк',
      titleAccent: 'Север',
      p1Before: 'На территории хозяйства расположен небольшой гостевой дом ',
      p1LinkLabel: '«Парк Север»',
      p1After: ' — пространство для спокойного отдыха на природе.',
      p2: 'Уже сейчас для гостей мы проводим небольшие ознакомительные встречи и мини-знакомство с хозяйством.',
      link: 'https://park-sever.ru',
      linkLabel: 'Перейти на park-sever.ru',
    },
    open: {
      eyebrow: 'Прозрачность',
      title: 'Открытое',
      titleAccent: 'хозяйство',
      p1: 'Мы хотим, чтобы люди могли наблюдать развитие современного оленеводства в России практически в реальном времени — видеть, как растёт стадо, рождаются оленята и развивается новое направление.',
      p2: 'Поэтому мы открыто рассказываем о жизни хозяйства, делимся опытом, наблюдениями и этапами развития проекта.',
      tg: 'https://t.me/kfhNoble',
      tgLabel: 'Подписаться в Telegram',
      vk: 'https://vk.ru/kfh_noble?t2fs=cf2fdf36ee78a94985_3',
      vkLabel: 'Подписаться во ВКонтакте',
    },
    finalCta: {
      eyebrow: 'Следите за развитием',
      title: 'Хотите познакомиться с',
      titleAccent: 'оленеводством ближе?',
      p: 'Следите за развитием проекта — по мере развития хозяйства мы будем рассказывать о будущих возможностях посещения.',
      cta: 'Новости хозяйства',
    },
  },
};

export default function TabPopularization({ lang, onSwitchTab }: TabPopularizationProps) {
  void lang;
  const t = CONTENT.RU;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-side-image">
        <div className="hero-side-image__grid">
          <div className="hero-side-image__text">
            <span className="hero-eyebrow">{t.hero.eyebrow}</span>
            <h1 className="hero-title">
              {t.hero.title} <span className="h-section__accent">{t.hero.titleAccent}</span>
            </h1>
            <p className="hero-desc">{t.hero.desc}</p>
            <p className="body-lead">{t.hero.intro}</p>
            <p className="body-lead">{t.hero.outro}</p>
            <div className="mt-2">
              <button
                onClick={() => onSwitchTab('contacts')}
                className="btn-primary"
              >
                {t.hero.cta}
              </button>
            </div>
          </div>
          <div className="hero-side-image__media">
            <img src="/enhanced_about_4.webp" alt="Познакомиться с оленеводством" />
          </div>
        </div>
      </section>

      {/* ─── Mission ──────────────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="section-header">
              <span className="label-eyebrow">{t.mission.eyebrow}</span>
              <h2 className="h-section">
                {t.mission.title}{' '}
                <span className="h-section__accent">{t.mission.titleAccent}</span>
              </h2>
              <p className="body-lead">{t.mission.p1}</p>
              <p className="body-lead">{t.mission.p2}</p>
            </div>
            <ul className="flex flex-col gap-3 pl-1">
              {t.mission.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent shrink-0 leading-none pt-1">●</span>
                  <span className="body-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5"></div>
        </div>
      </section>

      {/* ─── Excursions ───────────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <span className="label-eyebrow">{t.excursions.eyebrow}</span>
              <h2 className="h-section">
                {t.excursions.title}{' '}
                <span className="h-section__accent">{t.excursions.titleAccent}</span>
              </h2>
              <p className="body-lead">{t.excursions.p1}</p>
              <p className="body-lead">{t.excursions.p2}</p>
            </div>
            <div className="lg:col-span-5" />
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="h-block">{t.excursions.listTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.excursions.cards.map((card) => (
                <div key={card.title} className="card-feature group">
                  <div className="card-feature__media aspect-[4/3]">
                    <img src={card.image} alt={card.title} loading="lazy" />
                  </div>
                  <div className="card-feature__body">
                    <h4 className="card-feature__title">{card.title}</h4>
                    <p className="card-feature__desc">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Preparation / diploma (accent — trust-building) ──────────────── */}
      <section className="section-accent">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-7 section-header">
            <span className="label-eyebrow">{t.preparation.eyebrow}</span>
            <h2 className="h-section-light">
              {t.preparation.title}{' '}
              <span className="h-section__accent">{t.preparation.titleAccent}</span>
            </h2>
            <p className="body-lead-light">{t.preparation.p1}</p>
            <p className="body-lead-light">
              {t.preparation.p2}
              <strong>{t.preparation.pAccent}</strong>
              {t.preparation.p3}
            </p>
          </div>
          <div className="lg:col-span-5 lg:pt-14">
            <div className="aspect-[3/4] bg-secondary/40 flex flex-col items-center justify-center p-8 gap-4 text-center">
              <GraduationCap className="w-12 h-12 text-accent" strokeWidth={1.6} />
              <p className="body-sm-light max-w-xs">{t.preparation.diplomaCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Park Sever ───────────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-7 section-header">
            <span className="label-eyebrow">{t.park.eyebrow}</span>
            <h2 className="h-section">
              {t.park.title} <span className="h-section__accent">{t.park.titleAccent}</span>
            </h2>
            <p className="body-lead">
              {t.park.p1Before}
              <a
                href={t.park.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-semibold"
              >
                {t.park.p1LinkLabel}
              </a>
              {t.park.p1After}
            </p>
            <p className="body-lead">{t.park.p2}</p>
          </div>
          <div className="lg:col-span-5 lg:pt-14">
            <a
              href={t.park.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:gap-3 font-semibold transition-all duration-300 w-fit"
            >
              {t.park.linkLabel} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Open farm + socials — buttons below text ─────────────────────── */}
      <section className="section-calm">
        <div className="section-inner flex flex-col gap-10">
          <div className="max-w-3xl section-header">
            <span className="label-eyebrow">{t.open.eyebrow}</span>
            <h2 className="h-section">
              {t.open.title} <span className="h-section__accent">{t.open.titleAccent}</span>
            </h2>
            <p className="body-lead">{t.open.p1}</p>
            <p className="body-lead">{t.open.p2}</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href={t.open.tg}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t.open.tgLabel}
            </a>
            <a
              href={t.open.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
            >
              {t.open.vkLabel}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Final CTA — navy close, button below text ────────────────────── */}
      <section className="section-accent">
        <div className="section-inner flex flex-col gap-10">
          <div className="max-w-3xl section-header">
            <span className="label-eyebrow">{t.finalCta.eyebrow}</span>
            <h2 className="h-section-light">
              {t.finalCta.title}{' '}
              <span className="h-section__accent">{t.finalCta.titleAccent}</span>
            </h2>
            <p className="body-lead-light">{t.finalCta.p}</p>
          </div>
          <div className="flex">
            <button
              onClick={() => onSwitchTab('news')}
              className="btn-outline-light"
            >
              {t.finalCta.cta}
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
