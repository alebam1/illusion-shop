import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, MessageCircle, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/lib/shop";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { products, formatPrice } from "@/lib/catalog";

export const WHATSAPP = "https://wa.me/77086109537";

const links = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/catalog", label: "Карты", search: { category: "cards" } },
  { to: "/catalog", label: "Фокусы", search: { category: "micromagic" } },
  { to: "/school", label: "Школа фокусов" },
  { to: "/about", label: "О нас" },
  { to: "/contacts", label: "Контакты" },
] as const;

function QuickSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const found = q.trim()
    ? products.filter((p) => p.title.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6)
    : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Поиск по каталогу">
          <Search className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass top-24 max-w-xl translate-y-0 border-border/60 p-0">
        <DialogTitle className="sr-only">Быстрый поиск</DialogTitle>
        <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
          <Search className="size-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setOpen(false);
                navigate({ to: "/catalog", search: { q: q.trim() } });
              }
            }}
            placeholder="Найти колоду, гиммик, реквизит…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {found.map((p) => (
            <li key={p.id}>
              <Link
                to="/product/$productId"
                params={{ productId: p.id }}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-secondary/60"
              >
                <img src={p.image} alt="" className="size-10 rounded-md object-cover" loading="lazy" />
                <span className="flex-1 text-sm">{p.title}</span>
                <span className="text-sm text-primary">{formatPrice(p.price)}</span>
              </Link>
            </li>
          ))}
          {q && !found.length && (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">Ничего не найдено</li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export function Navbar() {
  const { count, favorites, hydrated } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-border/60" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20">
        <Link to="/" className="group flex items-center gap-2">
          <Sparkles className="size-5 text-primary transition-transform duration-500 group-hover:rotate-12" />
          <span className="font-display text-2xl font-semibold tracking-tight text-gold">DoMagic</span>
        </Link>

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                {...("search" in l ? { search: l.search as never } : {})}
                activeOptions={{ exact: l.to === "/", includeSearch: false }}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <QuickSearch />
          <Button variant="ghost" size="icon" asChild aria-label="Избранное">
            <Link to="/favorites" className="relative">
              <Heart className="size-5" />
              {hydrated && favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">
                  {favorites.length}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Корзина">
            <Link to="/cart" className="relative">
              <ShoppingBag className="size-5" />
              {hydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="magic" size="sm" className="hidden sm:inline-flex" asChild>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Меню">
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] border-border/60 bg-background/95 backdrop-blur-xl">
              <div className="mt-10 flex flex-col gap-1 px-4">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    {...("search" in l ? { search: l.search as never } : {})}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 font-display text-2xl transition-colors hover:bg-secondary/60"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button variant="gold" className="mt-6" asChild>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" /> Написать в WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
