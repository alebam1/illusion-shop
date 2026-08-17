import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/catalog";
import { useShop } from "@/lib/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Корзина — DoMagic" },
      { name: "description", content: "Ваша корзина в магазине фокусов DoMagic." },
      { property: "og:title", content: "Корзина — DoMagic" },
      { property: "og:description", content: "Оформите заказ реквизита для фокусов в DoMagic." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, total, hydrated } = useShop();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);

  const discount = applied ? Math.round(total * 0.05) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-5xl">Корзина</h1>

      {!hydrated ? (
        <div className="shimmer mt-10 h-40 rounded-2xl" />
      ) : detailed.length === 0 ? (
        <div className="glass mt-10 rounded-3xl p-16 text-center">
          <p className="text-muted-foreground">Корзина пока пуста.</p>
          <Button variant="gold" className="mt-6" asChild>
            <Link to="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-4">
            {detailed.map(({ product, qty }) => (
              <li key={product.id} className="glass flex flex-wrap items-center gap-4 rounded-2xl p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="size-24 rounded-xl object-cover"
                />
                <div className="min-w-40 flex-1">
                  <Link
                    to="/product/$productId"
                    params={{ productId: product.id }}
                    className="font-display text-xl hover:text-primary"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                </div>
                <div className="flex items-center rounded-full border border-border">
                  <button className="grid size-9 place-items-center" onClick={() => setQty(product.id, qty - 1)}>
                    <Minus className="size-4" />
                  </button>
                  <span className="w-9 text-center text-sm">{qty}</span>
                  <button className="grid size-9 place-items-center" onClick={() => setQty(product.id, qty + 1)}>
                    <Plus className="size-4" />
                  </button>
                </div>
                <div className="w-28 text-right font-semibold text-primary">
                  {formatPrice(product.price * qty)}
                </div>
                <button
                  className="grid size-9 place-items-center rounded-full text-muted-foreground hover:text-destructive"
                  onClick={() => {
                    remove(product.id);
                    toast("Товар удалён из корзины");
                  }}
                  aria-label="Удалить"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          <aside className="glass h-fit rounded-2xl p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl">Итого</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Товары</span>
                <span>{formatPrice(total)}</span>
              </div>
              {applied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Промокод</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доставка</span>
                <span className="text-muted-foreground">рассчитает менеджер</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <Input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Промокод"
                className="rounded-full"
              />
              <Button
                variant="outline"
                onClick={() => {
                  if (promo.trim().toUpperCase() === "MAGIC") {
                    setApplied(true);
                    toast.success("Промокод применён: −5%");
                  } else {
                    toast.error("Промокод не найден");
                  }
                }}
              >
                Применить
              </Button>
            </div>

            <div className="mt-6 flex items-baseline justify-between border-t border-border/60 pt-5">
              <span className="text-muted-foreground">К оплате</span>
              <span className="font-display text-3xl text-gold">{formatPrice(total - discount)}</span>
            </div>

            <Button variant="gold" size="lg" className="mt-6 w-full" asChild>
              <Link to="/checkout">Оформить заказ</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
