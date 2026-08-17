import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { categoryTitle, formatPrice, getProduct, products } from "@/lib/catalog";
import { useShop } from "@/lib/shop";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Товар не найден — DoMagic" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.product.title} — DoMagic`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.product.short },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.product.short },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useShop();
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);

  const gallery = [product.image, product.image, product.image];
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Главная
        </Link>{" "}
        /{" "}
        <Link to="/catalog" className="hover:text-foreground">
          Каталог
        </Link>{" "}
        /{" "}
        <Link to="/catalog" search={{ category: product.category }} className="hover:text-foreground">
          {categoryTitle(product.category)}
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div
            className="glass relative aspect-square overflow-hidden rounded-3xl"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <img
              src={gallery[active]}
              alt={product.title}
              width={900}
              height={900}
              className="size-full object-cover transition-transform duration-300"
              style={
                zoom
                  ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            />
          </div>
          <div className="mt-4 flex gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`size-20 overflow-hidden rounded-xl border transition-colors ${
                  active === i ? "border-primary" : "border-border"
                }`}
              >
                <img src={g} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">{product.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-primary text-primary" /> {product.rating}
            </span>
            <span className={product.inStock ? "text-emerald-400" : "text-muted-foreground"}>
              {product.inStock ? "В наличии" : "Под заказ"}
            </span>
            <span className="text-muted-foreground">Артикул: {product.id}</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl text-gold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 text-muted-foreground">{product.short}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button
                className="grid size-10 place-items-center"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Уменьшить"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                className="grid size-10 place-items-center"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Увеличить"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              variant="gold"
              size="lg"
              onClick={() => {
                add(product.id, qty);
                toast.success("Добавлено в корзину", { description: product.title });
              }}
            >
              <ShoppingBag className="size-4" /> Добавить в корзину
            </Button>
            <Button variant="magic" size="lg" asChild onClick={() => add(product.id, qty)}>
              <Link to="/checkout">Купить сейчас</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="glass flex items-center gap-3 rounded-xl p-4">
              <Truck className="size-5 text-primary" /> Доставка по Казахстану
            </div>
            <div className="glass flex items-center gap-3 rounded-xl p-4">
              <ShieldCheck className="size-5 text-primary" /> Поможем подобрать реквизит
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="desc" className="mt-16">
        <TabsList className="flex-wrap">
          <TabsTrigger value="desc">Описание</TabsTrigger>
          <TabsTrigger value="specs">Характеристики</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
        </TabsList>
        <TabsContent value="desc" className="glass mt-6 rounded-2xl p-6 leading-relaxed text-muted-foreground">
          {product.description}
        </TabsContent>
        <TabsContent value="specs" className="glass mt-6 rounded-2xl p-6">
          <dl className="divide-y divide-border/60">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between py-3 text-sm">
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>
        <TabsContent value="reviews" className="glass mt-6 rounded-2xl p-6 text-muted-foreground">
          Отзывы к этому товару появятся после подключения реальной базы отзывов DoMagic. Мы не публикуем
          вымышленные отзывы.
        </TabsContent>
      </Tabs>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl">Похожие товары</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
