import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CalendarDays, GraduationCap, Layers, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP } from "@/components/site/Navbar";
import { Particles } from "@/components/site/Particles";

export const Route = createFileRoute("/school")({
  head: () => ({
    meta: [
      { title: "Школа фокусов DoMagic — обучение в Алматы" },
      {
        name: "description",
        content:
          "Школа фокусов DoMagic: обучение картовым и близким фокусам, уровни сложности, занятия с практикующим фокусником.",
      },
      { property: "og:title", content: "Школа фокусов DoMagic" },
      { property: "og:description", content: "Научись удивлять людей своими руками." },
    ],
  }),
  component: SchoolPage,
});

const levels = [
  { title: "Начальный", text: "Первые эффекты, работа с колодой и уверенность перед зрителем." },
  { title: "Средний", text: "Техника рук, картовые приёмы и построение номера." },
  { title: "Продвинутый", text: "Сценическая подача, авторские эффекты и выступления." },
];

function SchoolPage() {
  return (
    <div className="relative">
      <Particles count={14} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
            <GraduationCap className="size-3.5" /> Обучение
          </span>
          <h1 className="mt-6 font-display text-6xl leading-tight">Школа фокусов DoMagic</h1>
          <p className="mt-5 max-w-2xl text-xl text-muted-foreground">
            «Научись удивлять людей своими руками.»
          </p>
          <Button variant="gold" size="lg" className="mt-8" asChild>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              Записаться в школу
            </a>
          </Button>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <h2 className="font-display text-4xl">Уровни сложности</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {levels.map((l, i) => (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:glow-gold"
            >
              <Layers className="size-6 text-primary" />
              <h3 className="mt-4 font-display text-2xl">{l.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{l.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div className="glass rounded-2xl p-8">
          <CalendarDays className="size-6 text-primary" />
          <h3 className="mt-4 font-display text-2xl">Занятия</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Индивидуальные и групповые занятия.</li>
            <li>• Практика с реквизитом из каталога DoMagic.</li>
            <li>• Разбор ошибок и постановка номера.</li>
            <li>• Расписание и стоимость — уточняются у менеджера.</li>
          </ul>
        </div>
        <div className="glass rounded-2xl p-8">
          <UserRound className="size-6 text-primary" />
          <h3 className="mt-4 font-display text-2xl">Преподаватель</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Занятия ведёт практикующий фокусник команды DoMagic. Полная информация о преподавателе —
            уточняется.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="glass relative overflow-hidden rounded-3xl p-12 text-center">
          <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-magic)" }} />
          <div className="relative">
            <Sparkles className="mx-auto size-7 text-primary" />
            <h2 className="mt-4 font-display text-4xl">Готовы начать?</h2>
            <p className="mt-3 text-muted-foreground">
              Напишите нам — подберём формат обучения под ваш уровень.
            </p>
            <Button variant="gold" size="lg" className="mt-8" asChild>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                Записаться в школу
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
