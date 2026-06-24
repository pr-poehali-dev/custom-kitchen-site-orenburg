import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';

const KITCHEN_1 =
  'https://cdn.poehali.dev/projects/cc694f34-7c98-4bce-a285-96cad079f09e/files/02fe2414-73ba-46a6-b463-960a544d75a8.jpg';
const KITCHEN_2 =
  'https://cdn.poehali.dev/projects/cc694f34-7c98-4bce-a285-96cad079f09e/files/8ef3b25b-0790-41ad-b65f-f4dc10a64d34.jpg';

const NAV = [
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'process', label: 'Процесс' },
  { id: 'about', label: 'О нас' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const SERVICES = [
  {
    icon: 'Ruler',
    title: 'Бесплатный замер',
    text: 'Мастер приедет в удобное время и снимет точные размеры вашего помещения.',
  },
  {
    icon: 'Box',
    title: '3D-проект',
    text: 'Покажем будущую кухню в объёме до начала работ — с цветами и материалами.',
  },
  {
    icon: 'Hammer',
    title: 'Производство',
    text: 'Собственный цех в Оренбурге. Контроль качества на каждом этапе.',
  },
  {
    icon: 'Truck',
    title: 'Монтаж под ключ',
    text: 'Доставка, сборка и подключение техники. Вы получаете готовую кухню.',
  },
];

const PROCESS = [
  { n: '01', title: 'Заявка', text: 'Оставляете заявку — мы перезваниваем в течение 15 минут.' },
  { n: '02', title: 'Замер', text: 'Выезжаем на бесплатный замер и обсуждаем пожелания.' },
  { n: '03', title: 'Проект', text: 'Создаём 3D-визуализацию и согласовываем смету.' },
  { n: '04', title: 'Изготовление', text: 'Производим кухню в собственном цехе за 20–30 дней.' },
  { n: '05', title: 'Монтаж', text: 'Привозим и устанавливаем. Готово к использованию!' },
];

const PORTFOLIO = [
  { img: KITCHEN_1, title: 'Скандинавия', tag: 'Светлый минимализм' },
  { img: KITCHEN_2, title: 'Эмеральд', tag: 'Зелёный модерн' },
  { img: KITCHEN_1, title: 'Лофт-кухня', tag: 'Дерево + бетон' },
];

const REVIEWS = [
  {
    name: 'Анна К.',
    city: 'ЖК «Звёздный»',
    text: 'Сделали кухню мечты! Точно в срок, ровно по проекту. Отдельное спасибо за 3D — увидели всё заранее.',
  },
  {
    name: 'Дмитрий П.',
    city: 'ул. Терешковой',
    text: 'Профессионалы. Замер бесплатный, цена не выросла в процессе. Качество фурнитуры на высоте.',
  },
  {
    name: 'Елена В.',
    city: 'пр. Гагарина',
    text: 'Заказывала угловую кухню. Использовали каждый сантиметр пространства. Очень довольна!',
  },
];

const FAQ = [
  { q: 'Сколько стоит замер?', a: 'Замер абсолютно бесплатный по всему Оренбургу и пригороду.' },
  { q: 'Сколько изготавливается кухня?', a: 'В среднем 20–30 дней с момента согласования проекта.' },
  { q: 'Даёте ли гарантию?', a: 'Да, гарантия 3 года на корпус и фурнитуру известных брендов.' },
  { q: 'Можно в рассрочку?', a: 'Да, оформляем рассрочку 0% на срок до 12 месяцев.' },
];

const SEND_LEAD_URL = 'https://functions.poehali.dev/c74c8f92-ca90-449c-af68-67cb385b58c5';

function BookingForm({ onDone, source }: { onDone: () => void; source?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error('Заполните имя и телефон');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, source: source || 'Сайт' }),
      });
      if (!res.ok) throw new Error();
      toast.success('Заявка принята! Перезвоним в течение 15 минут.');
      setName('');
      setPhone('');
      onDone();
    } catch {
      toast.error('Не удалось отправить. Позвоните нам по телефону.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-12 rounded-xl bg-background"
      />
      <Input
        placeholder="+7 (___) ___-__-__"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-12 rounded-xl bg-background"
      />
      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-secondary text-secondary-foreground font-semibold text-base hover:bg-secondary/90"
      >
        {loading ? 'Отправляем...' : 'Записаться на замер'}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </form>
  );
}

function BookingDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-3xl border-primary/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Запись на замер
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Оставьте контакты — подберём удобное время для бесплатного замера.
        </p>
        <BookingForm onDone={() => setOpen(false)} source="Окно записи" />
      </DialogContent>
    </Dialog>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background grain text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <a href="#top" className="font-display text-xl font-black tracking-tight">
            КУХНЯ<span className="text-secondary">.56</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <BookingDialog
            trigger={
              <Button className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                Записаться
              </Button>
            }
          />
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-float-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-4 py-1.5 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Производство в Оренбурге
              </div>
              <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Кухни,
                <br />
                в которых
                <br />
                <span className="text-secondary bg-primary px-3 rounded-2xl inline-block mt-2">
                  хочется жить
                </span>
              </h1>
              <p className="mt-7 max-w-md text-lg text-muted-foreground">
                Дизайнерские кухни на заказ под ключ. Бесплатный замер, 3D-проект
                и монтаж от собственного цеха.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BookingDialog
                  trigger={
                    <Button className="h-14 rounded-full bg-secondary px-8 text-base font-bold text-secondary-foreground hover:bg-secondary/90">
                      Бесплатный замер
                      <Icon name="ArrowRight" className="ml-1" size={20} />
                    </Button>
                  }
                />
                <a
                  href="#portfolio"
                  className="flex h-14 items-center rounded-full border border-primary/20 px-8 text-base font-semibold transition-colors hover:bg-card"
                >
                  Смотреть работы
                </a>
              </div>
              <div className="mt-10 flex gap-8">
                {[
                  ['12+', 'лет на рынке'],
                  ['800+', 'кухонь сделано'],
                  ['3 года', 'гарантия'],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-2xl font-bold">{num}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-float-up [animation-delay:200ms] opacity-0">
              <div className="overflow-hidden rounded-[2.5rem] border-4 border-primary shadow-2xl">
                <img
                  src={KITCHEN_1}
                  alt="Современная кухня на заказ"
                  className="h-[520px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-secondary p-5 shadow-xl">
                <div className="font-display text-3xl font-black text-secondary-foreground">
                  20-30
                </div>
                <div className="text-sm font-medium text-secondary-foreground">
                  дней изготовление
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-primary/10 bg-primary py-4 text-primary-foreground overflow-hidden">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-lg font-semibold">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-8">
              {['МДФ', 'Эмаль', 'Шпон', 'Пластик', 'Массив', 'Акрил', 'Стекло'].map(
                (t) => (
                  <span key={t} className="flex items-center gap-8">
                    {t}
                    <span className="text-secondary">✦</span>
                  </span>
                ),
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Услуги
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight lg:text-5xl">
              Всё под одной крышей
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="group rounded-3xl border border-primary/10 bg-card p-7 transition-all hover:border-secondary hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-secondary transition-colors group-hover:bg-secondary group-hover:text-primary">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
                <span className="mt-4 inline-block font-display text-3xl font-black text-muted/40">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Портфолио
              </span>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight lg:text-5xl">
                Наши работы
              </h2>
            </div>
            <p className="max-w-xs text-muted-foreground">
              Каждая кухня уникальна и создана под конкретное помещение и образ
              жизни.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO.map((p, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-primary/10"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-sm font-medium text-secondary">
                    {p.tag}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-primary-foreground">
                    {p.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Процесс
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight lg:text-5xl">
              Как мы работаем
            </h2>
          </div>
          <div className="mt-14 space-y-4">
            {PROCESS.map((p) => (
              <div
                key={p.n}
                className="group flex flex-col gap-3 rounded-3xl border border-primary/10 bg-card p-7 transition-colors hover:bg-primary hover:text-primary-foreground sm:flex-row sm:items-center sm:gap-8"
              >
                <span className="font-display text-4xl font-black text-secondary sm:w-24">
                  {p.n}
                </span>
                <h3 className="font-display text-xl font-bold sm:w-56">
                  {p.title}
                </h3>
                <p className="text-muted-foreground transition-colors group-hover:text-primary-foreground/80">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-secondary">
              О нас
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight lg:text-5xl">
              Мебельная мастерская
              <br />
              из сердца Оренбурга
            </h2>
            <p className="mt-6 max-w-lg text-lg text-primary-foreground/80">
              Уже 12 лет мы создаём кухни, которые служат десятилетиями. Свой цех,
              своя команда дизайнеров и мастеров — мы отвечаем за результат на
              каждом этапе.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                ['Собственное производство', 'Box'],
                ['Немецкая фурнитура', 'Cog'],
                ['Договор и смета', 'FileText'],
                ['Гарантия 3 года', 'ShieldCheck'],
              ].map(([t, icon]) => (
                <div key={t} className="flex items-center gap-3">
                  <Icon name={icon} className="text-secondary" size={22} />
                  <span className="font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] border-4 border-secondary">
            <img
              src={KITCHEN_2}
              alt="Кухня от мастерской"
              className="h-[460px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Отзывы
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight lg:text-5xl">
              Что говорят клиенты
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="flex flex-col rounded-3xl border border-primary/10 bg-card p-7"
              >
                <div className="flex gap-1 text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-foreground/90">{r.text}</p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="font-display font-bold">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.city}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 rounded-3xl border border-primary/10 bg-card p-8 md:grid-cols-2 lg:p-12">
            <div>
              <span className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Вопросы
              </span>
              <h3 className="mt-3 font-display text-3xl font-extrabold">
                Частые вопросы
              </h3>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-display font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contacts / CTA */}
      <section id="contacts" className="py-24">
        <div className="container mx-auto px-6">
          <div className="overflow-hidden rounded-[2.5rem] bg-secondary">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
              <div>
                <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-secondary-foreground lg:text-5xl">
                  Запишитесь
                  <br />
                  на бесплатный замер
                </h2>
                <p className="mt-5 max-w-md text-lg text-secondary-foreground/80">
                  Оставьте заявку — приедем в удобное время, снимем размеры и
                  бесплатно подготовим 3D-проект вашей кухни.
                </p>
                <div className="mt-8 space-y-4">
                  <a
                    href="tel:+89962557733"
                    className="flex items-center gap-3 font-display text-xl font-bold text-secondary-foreground"
                  >
                    <Icon name="Phone" size={22} />
                    8 (996) 255-77-33
                  </a>
                  <div className="flex items-center gap-3 text-secondary-foreground/90">
                    <Icon name="MapPin" size={22} />
                    г. Оренбург, ул. Шевченко, 20
                  </div>
                  <div className="flex items-center gap-3 text-secondary-foreground/90">
                    <Icon name="Clock" size={22} />
                    Ежедневно с 9:00 до 20:00
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-background p-7">
                <h3 className="font-display text-xl font-bold">Оставить заявку</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Перезвоним в течение 15 минут
                </p>
                <div className="mt-5">
                  <BookingForm onDone={() => {}} source="Блок контактов" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <a href="#top" className="font-display text-xl font-black">
            КУХНЯ<span className="text-secondary">.56</span>
          </a>
          <nav className="flex flex-wrap justify-center gap-6">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-sm text-primary-foreground/70 transition-colors hover:text-secondary"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="text-sm text-primary-foreground/60">
            © 2026 Кухни на заказ в Оренбурге
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;