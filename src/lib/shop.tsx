import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./catalog";

export type CartItem = { id: string; qty: number };

type ShopState = {
  items: CartItem[];
  favorites: string[];
  hydrated: boolean;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleFavorite: (id: string) => void;
  count: number;
  total: number;
  detailed: { product: Product; qty: number }[];
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "domagic.cart";
const FAV_KEY = "domagic.favorites";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const f = localStorage.getItem(FAV_KEY);
      if (c) setItems(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const add = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
  }, []);

  const remove = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((p) =>
      qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }, []);

  const detailed = useMemo(
    () =>
      items
        .map((i) => {
          const product = products.find((p) => p.id === i.id);
          return product ? { product, qty: i.qty } : null;
        })
        .filter(Boolean) as { product: Product; qty: number }[],
    [items],
  );

  const value: ShopState = {
    items,
    favorites,
    hydrated,
    add,
    remove,
    setQty,
    clear,
    toggleFavorite,
    count: items.reduce((s, i) => s + i.qty, 0),
    total: detailed.reduce((s, d) => s + d.product.price * d.qty, 0),
    detailed,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
