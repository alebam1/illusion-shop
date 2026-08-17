import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories, products, type CategorySlug } from "@/lib/catalog";
import { ProductCard, ProductCardSkeleton } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["popular", "new", "price-asc", "price-desc", "rating"]).optional(),
});

export const Route = createFileRoute("/catalog")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Каталог фокусов и игральных карт — DoMagic" },
      {
        name: "description",
        content:
          "Каталог DoMagic: игральные и трюковые карты, микромагия, гиммики, сценический реквизит, аксессуары и костюмы.",
      },
      { property: "og:title", content: "Каталог фокусов и игральных карт — DoMagic" },
      {
        property: "og:description",
        content: "Сотни товаров для фокусников: карты, гиммики, микромагия и сценический реквизит.",
      },
    ],
  }),
  component: CatalogPage,
});

const MAX_PRICE = Math.max(...products.map((p) => p.price));

function CatalogPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/catalog" });
  const [query, setQuery] = useState(search.q ?? "");
  const [price, setPrice] = useState<number[]>([0, MAX_PRICE]);
  const [onlyStock, setOnlyStock] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const category = search.category as CategorySlug | undefined;
  const sort = search.sort ?? "popular";

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [category, sort]);

  useEffect(() => setQuery(search.q ?? ""), [search.q]);

  const list = useMemo(() => {
    let items = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (p.price < price[0]! || p.price > price[1]!) return false;
      if (onlyStock && !p.inStock) return false;
      if (onlyNew && !p.isNew) return false;
      return true;
    });
    items = [...items].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "new":
          return Number(b.isNew) - Number(a.isNew) || b.popularity - a.popularity;
        default:
          return b.popularity - a.popularity;
      }
    });
    return items;
  }, [category, query, price, onlyStock, onlyNew, sort]);

  const setCategory = (value?: string) =>
    navigate({ search: (prev) => ({ ...prev, category: value }) });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Каталог</p>
        <h1 className="mt-3 font-display text-5xl">Товары для фокусников</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Карты, гиммики, микромагия и сценический реквизит. Наличие и точные характеристики уточняйте
          у менеджера DoMagic.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="glass h-fit space-y-7 rounded-2xl p-6 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="size-4 text-primary" /> Фильтры
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по товарам"
              className="rounded-full pl-9"
            />
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Категории</p>
            <div className="space-y-1">
              <button
                onClick={() => setCategory(undefined)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60 ${
                  !category ? "bg-secondary/70 text-primary" : ""
                }`}
              >
                Все категории
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCategory(c.slug)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60 ${
                    category === c.slug ? "bg-secondary/70 text-primary" : ""
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Цена, ₸</p>
            <Slider
              min={0}
              max={MAX_PRICE}
              step={500}
              value={price}
              onValueChange={setPrice}
              className="mt-4"
            />
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>{price[0]!.toLocaleString("ru-KZ")}</span>
              <span>{price[1]!.toLocaleString("ru-KZ")}</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm">
              <Checkbox checked={onlyStock} onCheckedChange={(v) => setOnlyStock(Boolean(v))} />
              Только в наличии
            </label>
            <label className="flex items-center gap-3 text-sm">
              <Checkbox checked={onlyNew} onCheckedChange={(v) => setOnlyNew(Boolean(v))} />
              Новинки
            </label>
          </div>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setQuery("");
              setPrice([0, MAX_PRICE]);
              setOnlyStock(false);
              setOnlyNew(false);
              navigate({ search: {} });
            }}
          >
            Сбросить фильтры
          </Button>
        </aside>

        <section>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <p className="text-sm text-muted-foreground">Найдено товаров: {list.length}</p>
            <div className="ml-auto w-52">
              <Select
                value={sort}
                onValueChange={(v) => navigate({ search: (prev) => ({ ...prev, sort: v as never }) })}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="new">Сначала новые</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : list.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-16 text-center text-muted-foreground">
              По вашему запросу ничего не найдено.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
