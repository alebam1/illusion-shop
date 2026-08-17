import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/catalog";
import { useShop } from "@/lib/shop";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Избранное — DoMagic" },
      { name: "description", content: "Сохранённые товары для фокусов в магазине DoMagic." },
      { property: "og:title", content: "Избранное — DoMagic" },
      { property: "og:description", content: "Ваш список желаемого реквизита и колод." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, hydrated } = useShop();
  const list = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-5xl">Избранное</h1>
      {hydrated && list.length === 0 ? (
        <div className="glass mt-10 rounded-3xl p-16 text-center">
          <p className="text-muted-foreground">Вы ещё ничего не добавили в избранное.</p>
          <Button variant="gold" className="mt-6" asChild>
            <Link to="/catalog">В каталог</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
