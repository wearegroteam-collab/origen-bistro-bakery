"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { pagePath, t } from "@/lib/i18n";
import type { OrderPlatform } from "@/types/content";
import { OrderOnlineButton } from "@/components/order-online";

type NavItem = {
  label: string;
  href: string;
};

export function MobileNav({ items, lang, orderPlatforms }: { items: NavItem[]; lang: Lang; orderPlatforms: OrderPlatform[] }) {
  const [open, setOpen] = useState(false);
  const copy = t(lang);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink" aria-label="Open menu">
        <Menu size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] bg-ink/45 backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
          <div className="ml-auto flex h-full w-[min(420px,calc(100%-32px))] flex-col bg-seashell p-6 shadow-soft" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <p className="font-title text-3xl">Origen</p>
              <button type="button" onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-5 text-2xl font-heading">
              {items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-ink transition hover:text-spanish">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-10 flex items-center gap-3 text-sm font-bold">
              <Link href="/" onClick={() => setOpen(false)} className={lang === "en" ? "text-ink" : "text-ink/45"}>EN</Link>
              <span className="text-ink/25">/</span>
              <Link href={pagePath("home", "es")} onClick={() => setOpen(false)} className={lang === "es" ? "text-ink" : "text-ink/45"}>ES</Link>
            </div>

            <div className="mt-auto pt-10">
              <OrderOnlineButton platforms={orderPlatforms} lang={lang} label={copy.orderOnline} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
