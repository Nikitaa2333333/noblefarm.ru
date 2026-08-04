import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../translations';
import ImageCarousel from './ImageCarousel';

interface TabPresentationProps {
  lang: Language;
}

const PDF_URL = '/prez/blagorodny-sever-prezentaciya.pdf';

// Заявки уходят в Telegram напрямую из браузера (у статичного хостинга нет бэкенда).
// Токен в бандле виден любому — это осознанный компромисс; при злоупотреблении
// токен перевыпускается у @BotFather. Получатели должны нажать Start у @noblefarmrubot.
const TG_TOKEN = '8841429754:AAF7OzPqKBuqDTDL0azyG8XYn1gZ2PYUTus';
const TG_CHAT_IDS = ['5139188030', '1088570591'];

const SLIDES = Array.from({ length: 12 }, (_, i) => ({ image: `/prez/slide-${i + 1}.webp` }));

export default function TabPresentation({ lang }: TabPresentationProps) {
  const isRU = lang === 'RU';
  const isCN = lang === 'CN';

  const interests = [
    { id: 'cosmetics', label: 'Premium Cosmetics' },
    { id: 'mens-health', label: "Men's Health" },
    { id: 'longevity', label: 'Longevity' },
    { id: 'wellness', label: 'Wellness' },
    {
      id: 'invest',
      label: isRU ? 'Инвестиционное сотрудничество' : isCN ? '投资合作' : 'Investment Cooperation',
    },
    { id: 'other', label: isRU ? 'Другое' : isCN ? '其他' : 'Other' },
  ];

  const [form, setForm] = useState({
    company: '',
    activity: '',
    name: '',
    phone: '+7 ',
    email: '',
    comment: '',
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  // Русский номер: всегда с +7, цифры группируются как +7 900 000-00-00
  const formatPhone = (raw: string) => {
    let d = raw.replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (d.startsWith('7')) d = d.slice(1);
    d = d.slice(0, 10);
    let out = '+7';
    if (d.length > 0) out += ' ' + d.slice(0, 3);
    if (d.length > 3) out += ' ' + d.slice(3, 6);
    if (d.length > 6) out += '-' + d.slice(6, 8);
    if (d.length > 8) out += '-' + d.slice(8, 10);
    return out;
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const validate = () => {
    const errs: { phone?: string; email?: string } = {};
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length > 1 && phoneDigits.length < 11) {
      errs.phone = isRU
        ? 'Введите номер полностью: +7 900 000-00-00'
        : isCN
          ? '请输入完整号码：+7 900 000-00-00'
          : 'Enter the full number: +7 900 000-00-00';
    }
    if (!form.email.trim()) {
      errs.email = isRU
        ? 'Укажите электронную почту — без неё мы не сможем ответить'
        : isCN
          ? '请填写电子邮箱，否则我们无法回复您'
          : 'Email is required — we cannot reply without it';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errs.email = isRU
        ? 'Проверьте адрес почты: например, name@company.ru'
        : isCN
          ? '请检查邮箱格式，例如 name@company.ru'
          : 'Check the email address: e.g. name@company.ru';
    }
    return errs;
  };

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs.phone || errs.email) {
      setErrors(errs);
      const firstId = errs.phone ? 'req-phone' : 'req-email';
      document.getElementById(firstId)?.focus();
      return;
    }
    const picked = interests.filter((i) => selected.includes(i.id)).map((i) => i.label).join(', ');
    const phoneDigits = form.phone.replace(/\D/g, '');
    const lines = [
      `Организация: ${form.company}`,
      `Сфера деятельности: ${form.activity}`,
      `Контактное лицо: ${form.name}`,
      `Телефон: ${phoneDigits.length === 11 ? form.phone : '—'}`,
      `Почта: ${form.email}`,
      `Интересующие направления: ${picked || '—'}`,
      `Комментарий: ${form.comment || '—'}`,
    ];
    const text = ['Новая заявка с сайта noblefarm.ru', '', ...lines].join('\n');
    setStatus('sending');
    try {
      const results = await Promise.all(
        TG_CHAT_IDS.map((chatId) =>
          fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text }),
          })
            .then((r) => r.json())
            .then((d) => !!d.ok)
            .catch(() => false)
        )
      );
      if (results.some(Boolean)) {
        setStatus('sent');
        return;
      }
      throw new Error('all recipients failed');
    } catch {
      // Telegram недоступен — запасной путь: письмо через почтовый клиент
      setStatus('error');
      const subject = encodeURIComponent('Запрос на сотрудничество — Благородный Север');
      const body = encodeURIComponent(lines.join('\r\n'));
      window.location.href = `mailto:kfh-noble@inbox.ru?subject=${subject}&body=${body}`;
    }
  };

  const scrollToRequest = () => {
    const el = document.getElementById('request');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
            <span className="hero-eyebrow">Deer Bioresources</span>
            <h1 className="hero-title">
              {isRU ? 'Презентация проекта' : isCN ? '项目演示' : 'Project Presentation'}
            </h1>
            <p className="hero-desc">
              {isRU
                ? 'Создание сырьевой базы на основе благородного европейского оленя английских племенных линий для производства продуктов высокой добавленной стоимости.'
                : isCN
                  ? '以英国血统的欧洲马鹿为基础，建立原料基地，用于生产高附加值产品。'
                  : 'Building a raw-material base on English bloodlines of European red deer for high value-added products.'}
            </p>
            <div className="flex gap-4 flex-wrap mt-2">
              <a
                href={PDF_URL}
                download="Благородный Север — Презентация.pdf"
                className="btn-primary"
              >
                {isRU ? 'Скачать в PDF' : isCN ? '下载 PDF' : 'Download PDF'}
              </a>
              <button type="button" onClick={scrollToRequest} className="btn-outline-dark">
                {isRU ? 'Оставить запрос' : isCN ? '提交合作请求' : 'Leave a Request'}
              </button>
            </div>
          </div>
          <div className="hero-side-image__media">
            <img src="/antlers_hero.webp" alt={isRU ? 'Панты благородного оленя' : 'Velvet antlers'} />
          </div>
        </div>
      </section>

      {/* ─── Slides ───────────────────────────────────────────────────────── */}
      <section className="section-calm">
        <div className="section-inner flex flex-col gap-10">
          <div className="section-header">
            <span className="label-eyebrow">{isRU ? 'Материалы' : isCN ? '资料' : 'Materials'}</span>
            <h2 className="h-section">
              {isRU ? 'Слайды презентации' : isCN ? '演示幻灯片' : 'Presentation Slides'}
            </h2>
          </div>
          <div className="w-full max-w-[1000px] mx-auto">
            <ImageCarousel
              slides={SLIDES}
              alt={isRU ? 'Слайд презентации' : 'Presentation slide'}
              aspect="aspect-video"
            />
            <a
              href={PDF_URL}
              download="Благородный Север — Презентация.pdf"
              className="btn-link mt-6"
            >
              {isRU ? 'Скачать презентацию в PDF' : isCN ? '下载 PDF 演示文稿' : 'Download the PDF deck'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── B2B request form ─────────────────────────────────────────────── */}
      <section className="section-accent" id="request">
        <div className="section-inner flex flex-col gap-10">
          <div className="section-header w-full max-w-[640px] mx-auto">
            <span className="label-eyebrow">{isRU ? 'Партнёрство' : isCN ? '合作' : 'Partnership'}</span>
            <h2 className="h-section-light">
              {isRU ? 'Оставить запрос' : isCN ? '提交合作请求' : 'Leave a Request'}
            </h2>
            <p className="body-lead-light max-w-[64ch]">
              {isRU
                ? 'Мы формируем пул стратегических партнёров на этапе развития проекта. Расскажите о себе и отметьте направления, которые вам интересны, — мы ответим на указанную почту.'
                : isCN
                  ? '我们正在项目发展阶段组建战略合作伙伴库。请介绍您的公司并选择感兴趣的方向，我们将通过您留下的邮箱回复。'
                  : 'We are building a pool of strategic partners at the project development stage. Tell us about your company and pick the directions you are interested in — we will reply to the email you provide.'}
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit} className="w-full max-w-[640px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="req-company" className="input-label">
                  {isRU ? 'Название организации' : isCN ? '公司名称' : 'Company name'}
                </label>
                <input
                  id="req-company"
                  required
                  value={form.company}
                  onChange={set('company')}
                  className="input-field"
                  placeholder={isRU ? 'ООО «Компания»' : isCN ? '公司名称' : 'Company LLC'}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="req-activity" className="input-label">
                  {isRU ? 'Сфера деятельности' : isCN ? '业务领域' : 'Field of activity'}
                </label>
                <input
                  id="req-activity"
                  value={form.activity}
                  onChange={set('activity')}
                  className="input-field"
                  placeholder={isRU ? 'Косметика, фарма, дистрибуция…' : isCN ? '化妆品、医药、分销…' : 'Cosmetics, pharma, distribution…'}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="req-name" className="input-label">
                  {isRU ? 'ФИО контактного лица' : isCN ? '联系人姓名' : 'Contact person'}
                </label>
                <input
                  id="req-name"
                  required
                  value={form.name}
                  onChange={set('name')}
                  className="input-field"
                  placeholder={isRU ? 'Иванов Иван Иванович' : isCN ? '姓名' : 'Full name'}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="req-phone" className="input-label">
                  {isRU ? 'Телефон' : isCN ? '电话' : 'Phone'}
                </label>
                <input
                  id="req-phone"
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={onPhoneChange}
                  aria-invalid={!!errors.phone}
                  className={`input-field ${errors.phone ? 'ring-2 ring-accent' : ''}`}
                  placeholder="+7 900 000-00-00"
                />
                {errors.phone && (
                  <p className="text-sm font-bold text-accent">{errors.phone}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="req-email" className="input-label">
                  {isRU ? 'Электронная почта (обязательно)' : isCN ? '电子邮箱（必填）' : 'Email (required)'}
                </label>
                <input
                  id="req-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onEmailChange}
                  aria-invalid={!!errors.email}
                  className={`input-field ${errors.email ? 'ring-2 ring-accent' : ''}`}
                  placeholder="name@company.ru"
                />
                {errors.email && (
                  <p className="text-sm font-bold text-accent">{errors.email}</p>
                )}
              </div>
            </div>

            <fieldset className="flex flex-col gap-4">
              <legend className="input-label mb-4">
                {isRU
                  ? 'Какие направления вам интересны?'
                  : isCN
                    ? '您对哪些方向感兴趣？'
                    : 'Which directions are you interested in?'}
              </legend>
              <div className="flex flex-wrap gap-3">
                {interests.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected.includes(item.id)}
                    onClick={() => toggle(item.id)}
                    className={`chip-toggle ${selected.includes(item.id) ? 'chip-toggle--on' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="req-comment" className="input-label">
                {isRU ? 'Комментарий' : isCN ? '备注' : 'Comment'}
              </label>
              <textarea
                id="req-comment"
                rows={4}
                value={form.comment}
                onChange={set('comment')}
                className="input-field resize-y"
                placeholder={
                  isRU
                    ? 'Коротко о задаче или интересе к проекту'
                    : isCN
                      ? '简要说明您的需求或合作意向'
                      : 'Briefly describe your request or interest'
                }
              />
            </div>

            <div className="flex flex-col gap-4">
              {status === 'sent' ? (
                <p className="body-lead-light font-bold text-accent">
                  {isRU
                    ? 'Заявка отправлена. Мы свяжемся с вами по указанной почте.'
                    : isCN
                      ? '申请已发送。我们将通过您留下的邮箱与您联系。'
                      : 'Request sent. We will contact you at the email provided.'}
                </p>
              ) : (
                <button type="submit" disabled={status === 'sending'} className="btn-outline-light disabled:opacity-60 disabled:cursor-wait">
                  {status === 'sending'
                    ? isRU ? 'Отправляем…' : isCN ? '发送中…' : 'Sending…'
                    : isRU ? 'Отправить запрос' : isCN ? '发送请求' : 'Send Request'}
                </button>
              )}
              <p className="body-sm-light max-w-[68ch]">
                {isRU
                  ? 'Заявка уходит нам напрямую с сайта. Либо напишите на почту: '
                  : isCN
                    ? '申请将直接从网站发送给我们。您也可以直接写信至：'
                    : 'Your request is sent to us directly from the site. Or write to us by email: '}
                <a href="mailto:kfh-noble@inbox.ru" className="text-accent hover:underline font-semibold">
                  kfh-noble@inbox.ru
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </motion.div>
  );
}
