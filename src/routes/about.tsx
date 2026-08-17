import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Users, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании DoMagic — магазин фокусов с 2016 года" },
      {
        name: "description",
        content:
          "DoMagic — магазин товаров для фокусников и иллюзионистов в Казахстане. Работаем с 2016 года, развиваем школу фокусов, встречи и конкурсы.",
      },
      { property: "og:title", content: "О компании DoMagic" },
      { property: "og:description", content: "Магазин фокусов, школа и сообщество фокусников Казахстана." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-6xl leading-tight">О нас</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        DoMagic — магазин товаров для фокусников, иллюзионистов, начинающих и профессиональных артистов.
        Компания работает с 2016 года.
      </p>
      <p className="mt-4 text-muted-foreground">
        В каталоге — игральные и трюковые карты, микромагия, сценический инвентарь, гиммики, аксессуары,
        сувениры, костюмы и другие товары для фокусников. Помимо интернет-магазина DoMagic развивает школу
        фокусов, проводит встречи фокусников и конкурсы.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {[
          { icon: Wand2, title: "Школа фокусов", text: "Обучение эффектным фокусам." },
          { icon: Users, title: "Встречи фокусников", text: "Общение и обмен опытом." },
          { icon: Trophy, title: "Конкурсы", text: "Показать навыки и выиграть призы." },
        ].map((c) => (
          <div key={c.title} className="glass rounded-2xl p-6">
            <c.icon className="size-6 text-primary" />
            <h2 className="mt-4 font-display text-2xl">{c.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button variant="gold" asChild>
          <Link to="/catalog">В каталог</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contacts">Связаться с нами</Link>
        </Button>
      </div>
    </div>
  );
}
