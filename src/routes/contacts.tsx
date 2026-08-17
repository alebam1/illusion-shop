import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP } from "@/components/site/Navbar";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты DoMagic — Алматы, Казахстан" },
      {
        name: "description",
        content: "Контакты магазина фокусов DoMagic: телефон +7 (708) 610-95-37, e-mail, WhatsApp, Алматы.",
      },
      { property: "og:title", content: "Контакты DoMagic" },
      { property: "og:description", content: "Свяжитесь с DoMagic: телефон, почта, WhatsApp, Алматы." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-6xl">Контакты</h1>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="glass space-y-5 rounded-3xl p-8">
          <p className="font-display text-3xl text-gold">DoMagic</p>
          <p className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="size-5 text-primary" /> Алматы, Казахстан
          </p>
          <p className="flex items-center gap-3">
            <Phone className="size-5 text-primary" />
            <a href="tel:+77086109537" className="hover:text-primary">
              +7 (708) 610-95-37
            </a>
          </p>
          <p className="flex items-center gap-3">
            <Mail className="size-5 text-primary" />
            <a href="mailto:shumakovmagic@mail.ru" className="hover:text-primary">
              shumakovmagic@mail.ru
            </a>
          </p>
          <p className="flex items-start gap-3 text-muted-foreground">
            <Clock className="mt-0.5 size-5 text-primary" />
            <span>
              Часы работы: уточняются — напишите нам в WhatsApp, мы ответим и подтвердим удобное время.
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Точный адрес пункта самовывоза уточняйте у менеджера при оформлении заказа.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="gold" asChild>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> Написать в WhatsApp
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Almaty%2C+Kazakhstan"
                target="_blank"
                rel="noreferrer"
              >
                <RouteIcon className="size-4" /> Проложить маршрут
              </a>
            </Button>
          </div>
        </div>

        <div className="glass overflow-hidden rounded-3xl">
          <iframe
            title="Карта — Алматы, Казахстан"
            src="https://www.openstreetmap.org/export/embed.html?bbox=76.82%2C43.19%2C76.99%2C43.29&layer=mapnik"
            className="h-full min-h-96 w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
