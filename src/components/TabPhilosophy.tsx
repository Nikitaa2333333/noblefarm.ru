import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Language } from '../translations';

interface TabPhilosophyProps {
  lang: Language;
  onSwitchTab: (tabId: string) => void;
}

const CONTENT = {
  RU: {
    hero: {
      eyebrow: 'О проекте',
      title: 'Философия',
      titleAccent: 'проекта',
      desc: 'Мы создаём современное хозяйство благородных европейских оленей, объединяя системный подход, международный опыт и уважение к животным.',
      intro1:
        'Для многих жителей центральной России олени чаще ассоциируются с парковыми пространствами, зимними сюжетами или туристическими форматами знакомства с животными. Само оленеводство обычно связывают исключительно с северными регионами и традиционным укладом жизни коренных народов.',
      intro2:
        'Однако мировой опыт показывает: разведение благородного европейского оленя давно стало самостоятельной современной отраслью, объединяющей генетику, ветеринарное сопровождение, племенную работу и развитие пантового направления.',
      tags: [
        'Генетика',
        'Племенная работа',
        'Ответственное содержание',
        'Пантовое направление',
      ],
    },
    why: {
      eyebrow: 'Зачем мы это делаем',
      title: 'Почему мы',
      titleAccent: 'этим занимаемся',
      p1: 'Мы видим большой потенциал развития культуры современного оленеводства в России — особенно в регионах с подходящим климатом и земельными ресурсами.',
      p2: 'Московская область обладает хорошими условиями для содержания благородного европейского оленя и при этом находится рядом с крупнейшим потребительским рынком страны.',
      p3: 'При наличии сильной генетики, системного подхода и долгосрочного планирования это направление может стать полноценной частью современного сельского хозяйства.',
    },
    family: {
      eyebrow: 'Семья',
      title: 'Семейный',
      titleAccent: 'проект',
      p1: '«Благородный Север» создаём мы — семья, объединённая интересом к современному оленеводству и долгосрочному развитию хозяйства.',
      p2: 'До запуска проекта мы работали в высокотехнологичных и инженерных сферах, где системный подход, ответственность и внимание к деталям являются основой работы.',
      p3: 'Этот опыт мы переносим и в оленеводство: рассматривая его не как сезонное увлечение, а как серьёзное направление с долгосрочной стратегией развития.',
      principlesTitle: 'Наши принципы',
      principles: [
        'Долгосрочный подход',
        'Ответственное содержание животных',
        'Ветеринарное сопровождение',
        'Прозрачность процессов',
        'Развитие культуры оленеводства',
      ],
    },
    species: {
      eyebrow: 'Виды и направления',
      title: 'Почему именно',
      titleAccent: 'благородный европейский олень',
      p1: 'Благородного европейского оленя часто путают с северным оленем или маралом, однако это разные направления разведения и разные виды.',
      p2: 'Во многих странах именно благородный европейский олень является основой современного фермерского оленеводства благодаря сильной генетике, качеству племенных линий и высокому потенциалу пантового направления.',
      cards: [
        {
          name: 'Северный олень',
          desc: 'Север России',
        },
        {
          name: 'Марал',
          desc: 'Алтай',
        },
        {
          name: 'Благородный европейский олень',
          desc: 'Современное фермерское направление',
          highlight: true,
        },
      ],
    },
    russia: {
      eyebrow: 'Регион и страна',
      title: 'Почему мы верим в ',
      titleAccent: 'потенциал России',
      p1: 'В отличие от многих европейских стран, ограниченных земельными ресурсами, Россия обладает значительными возможностями для развития современных оленьих хозяйств.',
      p2: 'Центральная часть страны сочетает подходящий климат, земельный потенциал и близость крупных рынков сбыта, что создаёт условия для формирования нового направления в сельском хозяйстве.',
    },
    open: {
      eyebrow: 'Открытость',
      title: 'Открытое',
      titleAccent: 'хозяйство',
      p1: 'Мы открыто показываем развитие проекта — от формирования стада и жизни фермы до изучения международного опыта и развития пантового направления.',
      p2: 'Нам важно не только развивать хозяйство, но и популяризировать современное оленеводство в России.',
      ctaPrimary: 'Генетика и племенная работа',
      ctaSecondary: 'Познакомиться с оленеводством',
    },
  },
};

export default function TabPhilosophy({ lang, onSwitchTab }: TabPhilosophyProps) {
  // RU first; EN/CN inherit RU content as placeholder until translation pass.
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
            <p className="body-lead">{t.hero.intro1}</p>
            <p className="body-lead">{t.hero.intro2}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-primary font-bold text-sm pt-5">
              {t.hero.tags.map((tag, i) => (
                <span key={tag} className="contents">
                  {i > 0 && <span className="text-primary/40">•</span>}
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="hero-side-image__media">
            <img src="/enhanced_about_4.webp" alt="Благородный Север" />
          </div>
        </div>
      </section>

      {/* ─── Why we do this ───────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-5 section-header">
            <span className="label-eyebrow">{t.why.eyebrow}</span>
            <h2 className="h-section">
              {t.why.title} <span className="h-section__accent">{t.why.titleAccent}</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-14 flex flex-col gap-6">
            <p className="body-lead">{t.why.p1}</p>
            <p className="body-lead">{t.why.p2}</p>
            <p className="body-lead">{t.why.p3}</p>
          </div>
        </div>
      </section>

      {/* ─── Family project ──────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="section-header">
              <span className="label-eyebrow">{t.family.eyebrow}</span>
              <h2 className="h-section">
                {t.family.title} <span className="h-section__accent">{t.family.titleAccent}</span>
              </h2>
              <p className="body-lead">{t.family.p1}</p>
              <p className="body-lead">{t.family.p2}</p>
              <p className="body-lead">{t.family.p3}</p>
            </div>
            <div className="aspect-[16/10] overflow-hidden shadow-soft">
              <img
                src="/enhanced_about_7.webp"
                alt="Семья — основатели проекта"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-14 flex flex-col gap-6">
            <h3 className="h-block">{t.family.principlesTitle}</h3>
            <ul className="flex flex-col gap-4">
              {t.family.principles.map((principle) => (
                <li key={principle} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-text-dark shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="body-sm">{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Why European Red Deer ───────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner flex flex-col gap-10">
          <div className="max-w-3xl section-header">
            <span className="label-eyebrow">{t.species.eyebrow}</span>
            <h2 className="h-section">
              {t.species.title}{' '}
              <span className="h-section__accent">{t.species.titleAccent}</span>
            </h2>
            <p className="body-lead">{t.species.p1}</p>
            <p className="body-lead">{t.species.p2}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.species.cards.map((card) => (
              <div
                key={card.name}
                className={
                  card.highlight
                    ? 'bg-primary rounded-none p-7 md:p-8 shadow-soft min-h-[280px] flex flex-col justify-end gap-3'
                    : 'card-flat min-h-[280px] flex flex-col justify-end gap-3'
                }
              >
                {card.highlight && (
                  <span className="label-eyebrow">Наше направление</span>
                )}
                <h3 className={card.highlight ? 'h-block-light' : 'h-block'}>
                  {card.name}
                </h3>
                <p className={card.highlight ? 'body-sm-light' : 'body-sm'}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Russia potential ─────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-5 section-header">
            <span className="label-eyebrow">{t.russia.eyebrow}</span>
            <h2 className="h-section">
              {t.russia.title}
              <span className="h-section__accent">{t.russia.titleAccent}</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-14 flex flex-col gap-6">
            <p className="body-lead">{t.russia.p1}</p>
            <p className="body-lead">{t.russia.p2}</p>
          </div>
        </div>
      </section>

      {/* ─── Open farm — navy CTA close, buttons under text ───────────────── */}
      <section className="section-accent">
        <div className="section-inner flex flex-col gap-10">
          <div className="max-w-3xl section-header">
            <span className="label-eyebrow">{t.open.eyebrow}</span>
            <h2 className="h-section-light">
              {t.open.title} <span className="h-section__accent">{t.open.titleAccent}</span>
            </h2>
            <p className="body-lead-light">{t.open.p1}</p>
            <p className="body-lead-light">{t.open.p2}</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button
              onClick={() => onSwitchTab('genetics')}
              className="btn-outline-light"
            >
              {t.open.ctaPrimary}
            </button>
            <button
              onClick={() => onSwitchTab('reindeer-intro')}
              className="btn-outline-light"
            >
              {t.open.ctaSecondary}
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
