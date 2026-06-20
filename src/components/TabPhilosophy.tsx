import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
          latin: 'Rangifer tarandus',
          desc: 'Север России',
          image: '/Reindeer.jpg',
          modal: [
            '**Северный олень (лат. Rangifer tarandus)** в Северной Америке — кари́бу. Обитает в тундре и тайге Евразии и Северной Америки, на ряде островов Северного Ледовитого океана. Существует как в диком, так и в домашнем состоянии. Северный олень в далёком прошлом дал возможность человеку освоить Север, в настоящее время остаётся важнейшим биологическим ресурсом более двадцати народов Евразии и Северной Америки.',
            'В результате приручения и одомашнивания северного оленя возникло северное оленеводство, то есть разведение северных оленей для получения мяса, шкур, молока и использования в качестве ездового и вьючного транспорта.',
            'Отличен от других оленей тем, что рога имеют как самцы, так и самки.',
            'Именно девять Северных оленей тянут повозку Санта-Клауса, развозящего рождественские подарки.',
          ],
        },
        {
          name: 'Марал',
          latin: 'Cervus elaphus sibiricus',
          desc: 'Алтай',
          image: '/Maral.jpg',
          modal: [
            '**Марал (лат. Cervus elaphus sibiricus)** — подвид благородного оленя, крупный. В зимнее время самцы имеют серовато-буровато-желтоватый окрас, причём шея, плечи и брюхо темнее. Самки — серовато-бурые. Летний окрас у обоих полов — буровато-коричневый. Зеркало (светлое пятно шерсти вокруг хвоста) широкое, от тускло-рыжеватого до соломенно-жёлтого цвета, часто имеет чёрную границу.',
            'Рога большие — длина основных стволов может достигать 150 см, на каждом по 6—7 отростков; венца или короны не образуют. Размах рогов часто превосходит 100 см. Высота в холке до 160 см. Масса до 350 кг.',
            'Распространились маралы на территории от Азии до Алтая. Обитают в горных регионах Сибири, Забайкалья, Монголии. Встречаются в Северной Америке недалеко от севера Калифорнии и юга Аризоны. В качестве среды обитания предпочитают населять горные лесные массивы.',
          ],
        },
        {
          name: 'Благородный европейский олень',
          latin: 'Cervus elaphus',
          desc: 'Современное фермерское направление',
          image: '/enhanced_deer_1.webp',
          highlight: true,
          modal: [
            '**Европейский благородный олень (лат. Cervus elaphus)** — подвид благородного оленя, обитает в большей части Европы, на Кавказе, в Малой Азии, Иране, в некоторых частях Западной и Центральной Азии. Также его можно встретить в регионе Атласских гор между Марокко и Тунисом на северо-запада Африки, являясь единственным видом оленей, обитающих в Африке. Благородные олени были завезены в другие районы, включая Австралию, Новую Зеландию, США, Канаду, Перу, Уругвай, Чили и Аргентину.',
            'Это один из самых крупных подвидов благородного оленя.',
            'Окрас у взрослых животных чаще всего однотонный, летом он более яркий — от коричневого с сероватым или рыжеватым оттенком до ярко-рыжего. Зимой же общий тон окраса — сероватый или песчано-серый.',
            'В средневековье в некоторых Европейских регионах охота на оленя была привилегией знати и членов королевских семей.',
          ],
        },
      ],
    },
    russia: {
      eyebrow: 'Регион и страна',
      title: 'Почему мы верим в ',
      titleAccent: 'будущее оленеводства в России',
      p1: 'Россия имеет более чем 800-летнюю историю оленеводства и уникальный опыт взаимодействия с этими животными. Немногие страны мира обладают столь глубоким пониманием оленя как части культуры, хозяйства и образа жизни.',
      p2: 'В то же время Европа и Новая Зеландия создали современную модель оленеводства, где развитие отрасли строится на генетике, селекции, ветеринарии и технологиях управления стадом.',
      p3: 'Мы верим, что объединение многовекового российского опыта и современных мировых подходов способно дать новый импульс развитию оленеводства в России. Именно на этом принципе строится проект «Благородный Север».',
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

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function TabPhilosophy({ lang, onSwitchTab }: TabPhilosophyProps) {
  // RU first; EN/CN inherit RU content as placeholder until translation pass.
  void lang;
  const t = CONTENT.RU;
  const [openSpecies, setOpenSpecies] = useState<number | null>(null);

  useEffect(() => {
    if (openSpecies === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenSpecies(null);
    };
    document.body.classList.add('body-lock');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('body-lock');
      window.removeEventListener('keydown', onKey);
    };
  }, [openSpecies]);

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
            <img src="/philosophy_1.webp" alt="Благородный Север" />
          </div>
        </div>
      </section>

      {/* ─── Family project ──────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
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
            <div className="flex flex-col gap-6">
              <h3 className="h-block">{t.family.principlesTitle}</h3>
              <ul className="flex flex-col gap-2.5">
                {t.family.principles.map((principle) => (
                  <li key={principle} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-text-dark shrink-0" strokeWidth={2.5} />
                    <span className="body-sm">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-14">
            <div className="aspect-[16/10] overflow-hidden shadow-soft">
              <img
                src="/family_project.webp"
                alt="Семья — основатели проекта"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why European Red Deer ───────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              <span className="label-eyebrow">{t.species.eyebrow}</span>
              <h2 className="h-section">
                {t.species.title}{' '}
                <span className="h-section__accent">{t.species.titleAccent}</span>
              </h2>
              <p className="body-lead">{t.species.p1}</p>
              <p className="body-lead">{t.species.p2}</p>
            </div>
            <div className="lg:col-span-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.species.cards.map((card, idx) => (
              <button
                key={card.name}
                type="button"
                onClick={() => setOpenSpecies(idx)}
                className="card-feature group text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <div className="card-feature__media aspect-[4/3]">
                  <img src={card.image} alt={card.name} loading="lazy" />
                </div>
                <div className="card-feature__body">
                  {card.highlight && (
                    <span className="card-feature__eyebrow">Наше направление</span>
                  )}
                  <h3 className="card-feature__title">
                    {card.name}{' '}
                    <span className="font-medium text-text-dark">
                      (лат. {card.latin})
                    </span>
                  </h3>
                  <p className="card-feature__desc">{card.desc}</p>
                  <span className="card-feature__cta">Подробнее</span>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {openSpecies !== null && (
              <motion.div
                key="species-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed inset-0 z-[100] bg-secondary/80 flex items-center justify-center p-4 md:p-8"
                onClick={() => setOpenSpecies(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="bg-bg-light shadow-soft max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setOpenSpecies(null)}
                    aria-label="Закрыть"
                    className="absolute top-4 right-4 z-10 p-2 text-text-dark hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-[6px] cursor-pointer bg-bg-light/90"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={t.species.cards[openSpecies].image}
                      alt={t.species.cards[openSpecies].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-7 md:p-10 flex flex-col gap-4">
                    <h3 className="h-block">
                      {t.species.cards[openSpecies].name}{' '}
                      <span className="font-medium text-text-dark">
                        (лат. {t.species.cards[openSpecies].latin})
                      </span>
                    </h3>
                    {t.species.cards[openSpecies].modal.map((paragraph, i) => (
                      <p key={i} className="body-sm">
                        {renderBold(paragraph)}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Russia potential ─────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-7 section-header">
            <span className="label-eyebrow">{t.russia.eyebrow}</span>
            <h2 className="h-section">
              {t.russia.title}
              <span className="h-section__accent">{t.russia.titleAccent}</span>
            </h2>
            <p className="body-lead">{t.russia.p1}</p>
            <p className="body-lead">{t.russia.p2}</p>
            <p className="body-lead">{t.russia.p3}</p>
          </div>
          <div className="lg:col-span-5" />
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
