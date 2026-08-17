import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CARDS = ["♠", "♥", "♦"];

export function MagicTrick() {
  const [stage, setStage] = useState<"idle" | "pick" | "reveal">("idle");
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center">
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{ background: "var(--gradient-veil)" }}
        />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Интерактив</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Попробуй магию</h2>

          <AnimatePresence mode="wait">
            {stage === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="mt-8"
              >
                <Button variant="gold" size="lg" onClick={() => setStage("pick")}>
                  <Wand2 className="size-4" /> Попробуй магию
                </Button>
              </motion.div>
            )}

            {stage === "pick" && (
              <motion.div
                key="pick"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-10"
              >
                <p className="text-muted-foreground">Выбери одну карту — только мысленно не подсказывай.</p>
                <div className="mt-8 flex justify-center gap-4 sm:gap-8">
                  {CARDS.map((c, i) => (
                    <motion.button
                      key={c}
                      whileHover={{ y: -14, rotate: i === 1 ? 0 : i === 0 ? -4 : 4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setPicked(i);
                        setTimeout(() => setStage("reveal"), 500);
                      }}
                      className="grid h-40 w-28 place-items-center rounded-2xl border border-primary/30 bg-gradient-to-b from-secondary to-background text-4xl text-primary shadow-[var(--shadow-card)] transition-shadow hover:glow-amethyst sm:h-56 sm:w-40 sm:text-6xl"
                    >
                      {picked === i ? c : "✦"}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === "reveal" && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.8, rotateX: 60 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <div className="mx-auto grid h-56 w-40 place-items-center rounded-2xl border border-primary/50 bg-gradient-to-b from-primary/20 to-background text-6xl text-primary glow-gold">
                  {picked !== null ? CARDS[picked] : "✦"}
                </div>
                <p className="mt-8 font-display text-3xl text-gold">
                  «Мы знали, какую карту ты выберешь.»
                </p>
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => {
                    setPicked(null);
                    setStage("pick");
                  }}
                >
                  <Sparkles className="size-4" /> Ещё раз
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
