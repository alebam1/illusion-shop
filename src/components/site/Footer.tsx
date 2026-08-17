import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { categories } from "@/lib/catalog";
import { WHATSAPP } from "./Navbar";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <span className="font-display text-2xl font-semibold text-gold">DoMagic</span>
          </div>
          <p className="mt-3 max-w-xs font-display text-xl text-muted-foreground">
            «Открой искусство невозможного.»
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Магазин фокусов и игральных карт. Работаем с 2016 года.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Каталог</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/catalog"
                  search={{ category: c.slug }}
                  className="transition-colors hover:text-foreground"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Покупателям</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/delivery" className="transition-colors hover:text-foreground">
                Доставка и оплата
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition-colors hover:text-foreground">
                Корзина
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="transition-colors hover:text-foreground">
                Избранное
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="transition-colors hover:text-foreground">
                Все товары
              </Link>
            </li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">Компания</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors hover:text-foreground">
                О нас
              </Link>
            </li>
            <li>
              <Link to="/school" className="transition-colors hover:text-foreground">
                Школа фокусов
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Контакты</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              <a href="tel:+77086109537" className="hover:text-foreground">
                +7 (708) 610-95-37
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              <a href="mailto:shumakovmagic@mail.ru" className="hover:text-foreground">
                shumakovmagic@mail.ru
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              Алматы, Казахстан
            </li>
            <li>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Написать в WhatsApp
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Официальные аккаунты в соцсетях — уточняются.
          </p>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DoMagic. Демо-каталог: товары и цены показаны как пример.
      </div>
    </footer>
  );
}
