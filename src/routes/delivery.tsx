import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Доставка и оплата — DoMagic" },
      {
        name: "description",
        content:
          "Как получить заказ в DoMagic: самовывоз в Алматы, Яндекс, Kaspi, СДЭК и другие варианты доставки по Казахстану.",
      },
      { property: "og:title", content: "Доставка и оплата — DoMagic" },
      { property: "og:description", content: "Простой путь от выбора товара до получения заказа." },
    ],
  }),
  component: DeliveryPage,
});

const steps = [
  "Выберите товар.",
  "Оформите заказ.",
  "Менеджер свяжется с вами.",
  "Оплатите заказ.",
  "Получите заказ или заберите самостоятельно.",
];

function DeliveryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-6xl">Как получить заказ</h1>

      <ol className="mt-10 space-y-4">
        {steps.map((s, i) => (
          <li key={s} className="glass flex items-center gap-5 rounded-2xl p-6">
            <span className="font-display text-4xl text-gold">{i + 1}</span>
            <span className="text-muted-foreground">{s}</span>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-4xl">Варианты доставки</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {["Самовывоз (Алматы)", "Яндекс Доставка", "Kaspi Доставка", "СДЭК", "Другие доступные варианты"].map(
          (d) => (
            <div key={d} className="glass rounded-2xl p-6">
              {d}
            </div>
          ),
        )}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Стоимость и сроки доставки зависят от города и выбранной службы — их подтверждает менеджер при
        оформлении заказа. Мы не публикуем условия, которые не подтверждены компанией.
      </p>

      <Button variant="gold" className="mt-10" asChild>
        <Link to="/catalog">Перейти в каталог</Link>
      </Button>
    </div>
  );
}
