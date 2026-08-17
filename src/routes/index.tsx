import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  GraduationCap,
  Handshake,
  Package,
  Sparkles,
  Trophy,
  Truck,
  Users,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { categories, formatPrice, popularProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { MagicTrick } from "@/components/site/MagicTrick";
import { Particles } from "@/components/site/Particles";
import { Button } from "@/components/ui/button";
import { WHATSAPP } from "@/components/site/Navbar";
import { useShop } from "@/lib/shop";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DoMagic — магазин фокусов и игральных карт в Казахстане" },
      {
        name: "description",
        content:
          "DoMagic с 2016 года: игральные и трюковые карты, микромагия, гиммики, сценический реквизит. Доставка по Казахстану, школа фокусов в Алматы.",
      },
      { property: "og:title", content: "DoMagic — открой искусство невозможного" },
      {
        property: "og:description",
        content: "Фокусы, карты и реквизит для тех, кто хочет удивлять. Магазин и школа фокусов.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setT({
          x: (e.clientX - r.left) / r.width - 0.5,
          y: (e.clientY - r.top) / r.height - 0.5,
        });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="relative overflow-hidden"
    >
      <Particles count={22} />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: `translate3d(${t.x * -12}px, ${t.y * -8}px, 0)` }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
            <Sparkles className="size-3.5" /> с 2016 года
          </span>
          <h1 className="mt-6 font-display text-6xl leading-[1.05] sm:text-7xl">
            Открой искусство <span className="text-gold">невозможного</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Фокусы, карты и реквизит для тех, кто хочет удивлять.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="gold" size="lg" asChild>
              <Link to="/catalog">Смотреть каталог</Link>
            </Button>
            <Button variant="magic" size="lg" asChild>
              <Link to="/school">Научиться фокусам</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ transform: `translate3d(${t.x * 22}px, ${t.y * 16}px, 0)` }}
        >
          <div className="glass overflow-hidden rounded-[2rem] glow-amethyst">
            <img
              src={heroImg}
              alt="Игральные карты, монеты и магическое свечение"
              width={1600}
              height={1104}
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const advantages = [
  { icon: Award, title: "10+ лет опыта", text: "DoMagic работает с 2016 года." },
  {
    icon: Package,
    title: "Большой ассортимент",
    text: "Игральные карты, трюковые карты, микромагия, гиммики и сценический реквизит.",
  },
  {
    icon: Truck,
    title: "Доставка по Казахстану",
    text: "Заказ можно получить в Алматы и других городах Казахстана.",
  },
  { icon: Handshake, title: "Помощь фокусника", text: "Специалисты помогут подобрать подходящий товар." },
];

function Section({
  title,
  subtitle,
  children,
  id,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-4xl sm:text-5xl">{title}</h2>
        {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </motion.div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Popular() {
  const { add } = useShop();
  return (
    <Section title="Популярное" subtitle="Товары, которые чаще всего выбирают наши покупатели.">
      <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4">
        {popularProducts.map((p) => (
          <article
            key={p.id}
            className="group glass w-64 shrink-0 snap-start overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:glow-gold"
          >
            <Link to="/product/$productId" params={{ productId: p.id }} className="block aspect-square overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </Link>
            <div className="space-y-3 p-4">
              <Link
                to="/product/$productId"
                params={{ productId: p.id }}
                className="line-clamp-2 font-display text-lg hover:text-primary"
              >
                {p.title}
              </Link>
              <p className="text-primary">{formatPrice(p.price)}</p>
              <Button
                variant="gold"
                size="sm"
                className="w-full"
                onClick={() => {
                  add(p.id);
                  toast.success("Товар добавлен в корзину", { description: p.title });
                }}
              >
                Купить
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <Section title="Почему DoMagic">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40"
            >
              <a.icon className="size-7 text-primary" />
              <h3 className="mt-5 font-display text-2xl">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Категории" subtitle="Всё для микромагии, сцены и картовых эффектов.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
            >
              <Link
                to="/catalog"
                search={{ category: c.slug }}
                className="group glass relative block overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:glow-gold"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl">{c.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      <Popular />

      <MagicTrick />

      <Section
        title="Больше, чем магазин"
        subtitle="DoMagic развивает сообщество фокусников: обучение, встречи и конкурсы."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "Школа фокусов", text: "Обучение эффектным фокусам." },
            { icon: Users, title: "Встречи фокусников", text: "Общение и обмен опытом." },
            { icon: Trophy, title: "Конкурсы", text: "Возможность показать свои навыки и выиграть призы." },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:glow-amethyst"
            >
              <c.icon className="mx-auto size-8 text-primary" />
              <h3 className="mt-5 font-display text-2xl">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
          <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-magic)" }} />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl">Школа фокусов DoMagic</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              «Научись удивлять людей своими руками.»
            </p>
            <Button variant="gold" size="lg" className="mt-8" asChild>
              <Link to="/school">Записаться в школу</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section
        title="Что говорят наши покупатели"
        subtitle="Мы публикуем только реальные отзывы клиентов DoMagic."
      >
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
          Раздел отзывов подключается к реальной базе отзывов DoMagic. Вымышленные отзывы мы не размещаем —
          после интеграции здесь появятся имя покупателя, дата, оценка, текст и купленные товары.
        </div>
      </Section>

      <Section title="Как получить заказ" subtitle="Простой путь от выбора товара до получения.">
        <ol className="grid gap-4 md:grid-cols-5">
          {[
            "Выберите товар.",
            "Оформите заказ.",
            "Менеджер свяжется с вами.",
            "Оплатите заказ.",
            "Получите заказ или заберите самостоятельно.",
          ].map((s, i) => (
            <li key={s} className="glass rounded-2xl p-6">
              <span className="font-display text-4xl text-gold">{i + 1}</span>
              <p className="mt-3 text-sm text-muted-foreground">{s}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          {["Самовывоз (Алматы)", "Яндекс", "Kaspi", "СДЭК", "Другие варианты — уточняйте"].map((d) => (
            <span key={d} className="rounded-full border border-border px-4 py-2 text-muted-foreground">
              {d}
            </span>
          ))}
        </div>
        <Button variant="outline" className="mt-8" asChild>
          <Link to="/delivery">Подробнее о доставке и оплате</Link>
        </Button>
      </Section>

      <Section title="Контакты" subtitle="Ответим на вопросы и поможем подобрать реквизит.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass space-y-3 rounded-2xl p-8">
            <p className="font-display text-3xl text-gold">DoMagic</p>
            <p className="text-muted-foreground">Алматы, Казахстан</p>
            <p>
              <a href="tel:+77086109537" className="hover:text-primary">
                +7 (708) 610-95-37
              </a>
            </p>
            <p>
              <a href="mailto:shumakovmagic@mail.ru" className="hover:text-primary">
                shumakovmagic@mail.ru
              </a>
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Button variant="gold" asChild>
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contacts">Все контакты</Link>
              </Button>
            </div>
          </div>
          <div className="glass overflow-hidden rounded-2xl">
            <iframe
              title="Карта — Алматы"
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.82%2C43.19%2C76.99%2C43.29&layer=mapnik"
              className="h-80 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
