import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useShop } from "@/lib/shop";
import { Button } from "@/components/ui/button";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, toggleFavorite, favorites, hydrated } = useShop();
  const fav = hydrated && favorites.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
      className="group glass relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:glow-gold"
    >
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="relative block aspect-square overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          width={900}
          height={900}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.isNew && (
            <span className="rounded-full bg-accent/90 px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
              Новинка
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              Под заказ
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        aria-label="В избранное"
        onClick={() => {
          toggleFavorite(product.id);
          toast(fav ? "Удалено из избранного" : "Добавлено в избранное");
        }}
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/60 backdrop-blur transition-colors hover:bg-background"
      >
        <Heart className={`size-4 ${fav ? "fill-accent text-accent" : "text-foreground"}`} />
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-xs">
          <span className={product.inStock ? "text-emerald-400" : "text-muted-foreground"}>
            {product.inStock ? "В наличии" : "Нет в наличии"}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
            <Star className="size-3.5 fill-primary text-primary" />
            {product.rating}
          </span>
        </div>

        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          className="font-display text-lg leading-snug transition-colors hover:text-primary"
        >
          {product.title}
        </Link>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-semibold text-primary">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="gold"
            size="sm"
            className="flex-1"
            onClick={() => {
              add(product.id);
              toast.success("Товар добавлен в корзину", { description: product.title });
            }}
          >
            <ShoppingBag className="size-4" /> В корзину
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/product/$productId" params={{ productId: product.id }}>
              Подробнее
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="shimmer aspect-square w-full" />
      <div className="space-y-3 p-4">
        <div className="shimmer h-3 w-1/3 rounded" />
        <div className="shimmer h-5 w-3/4 rounded" />
        <div className="shimmer h-5 w-1/2 rounded" />
        <div className="shimmer h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}
