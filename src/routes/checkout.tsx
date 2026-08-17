import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/catalog";
import { useShop } from "@/lib/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Оформление заказа — DoMagic" },
      { name: "description", content: "Оформление заказа в магазине фокусов DoMagic: доставка по Казахстану." },
      { property: "og:title", content: "Оформление заказа — DoMagic" },
      { property: "og:description", content: "Заполните данные — менеджер DoMagic свяжется с вами." },
    ],
  }),
  component: CheckoutPage,
});

const delivery = ["Самовывоз (Алматы)", "Яндекс Доставка", "Kaspi Доставка", "СДЭК", "Другой вариант"];
const payment = ["Kaspi", "Перевод / карта", "Наличными при получении"];

function CheckoutPage() {
  const { detailed, total, clear } = useShop();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-5xl text-gold">Заказ отправлен</h1>
        <p className="mt-4 text-muted-foreground">
          Менеджер DoMagic свяжется с вами по указанному номеру для подтверждения и расчёта доставки.
        </p>
        <Button variant="gold" className="mt-8" asChild>
          <Link to="/catalog">Вернуться в каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-5xl">Оформление заказа</h1>

      <form
        className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!detailed.length) {
            toast.error("Корзина пуста");
            return;
          }
          clear();
          setDone(true);
          toast.success("Заказ отправлен менеджеру");
        }}
      >
        <div className="glass space-y-6 rounded-2xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" required placeholder="Ваше имя" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" required type="tel" placeholder="+7 (___) ___-__-__" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="city">Город</Label>
              <Input id="city" required placeholder="Алматы" />
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="mb-2 text-sm font-semibold">Способ доставки</legend>
            <RadioGroup defaultValue={delivery[0]!} className="grid gap-2 sm:grid-cols-2">
              {delivery.map((d) => (
                <label key={d} className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm">
                  <RadioGroupItem value={d} /> {d}
                </label>
              ))}
            </RadioGroup>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="mb-2 text-sm font-semibold">Способ оплаты</legend>
            <RadioGroup defaultValue={payment[0]!} className="grid gap-2 sm:grid-cols-2">
              {payment.map((p) => (
                <label key={p} className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm">
                  <RadioGroupItem value={p} /> {p}
                </label>
              ))}
            </RadioGroup>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <Textarea id="comment" placeholder="Пожелания к заказу" rows={4} />
          </div>
        </div>

        <aside className="glass h-fit rounded-2xl p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Ваш заказ</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {detailed.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {product.title} × {qty}
                </span>
                <span>{formatPrice(product.price * qty)}</span>
              </li>
            ))}
            {!detailed.length && <li className="text-muted-foreground">Корзина пуста</li>}
          </ul>
          <div className="mt-6 flex items-baseline justify-between border-t border-border/60 pt-5">
            <span className="text-muted-foreground">Итого</span>
            <span className="font-display text-3xl text-gold">{formatPrice(total)}</span>
          </div>
          <Button variant="gold" size="lg" type="submit" className="mt-6 w-full">
            Отправить заказ
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Оплата и стоимость доставки подтверждаются менеджером после оформления.
          </p>
        </aside>
      </form>
    </div>
  );
}
