"use client";

import Image from "next/image";
import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingBag, X } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { OrderPlatform } from "@/types/content";

type OrderOnlineContextValue = {
  platforms: OrderPlatform[];
  lang: Lang;
  openModal: () => void;
};

const OrderOnlineContext = createContext<OrderOnlineContextValue | null>(null);

export function OrderOnlineProvider({ platforms, lang = "en", children }: { platforms: OrderPlatform[]; lang?: Lang; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const active = useMemo(() => platforms.filter((platform) => platform.is_active), [platforms]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <OrderOnlineContext.Provider value={{ platforms: active, lang, openModal: () => setOpen(true) }}>
      {children}
      {mounted && open && createPortal(<OrderOnlineModal platforms={active} lang={lang} onClose={() => setOpen(false)} />, document.body)}
    </OrderOnlineContext.Provider>
  );
}

export function OrderOnlineButton({ platforms, lang = "en", variant = "dark", label }: { platforms?: OrderPlatform[]; lang?: Lang; variant?: "dark" | "light" | "outline" | "glass" | "small" | "icon"; label?: string }) {
  const context = useContext(OrderOnlineContext);
  const copy = t(context?.lang || lang);
  const active = context?.platforms || platforms?.filter((platform) => platform.is_active) || [];
  const classes = {
    dark: "bg-ink text-white hover:bg-spanish",
    light: "bg-ochre text-white hover:bg-ink",
    outline: "border border-pastel text-ink hover:bg-white",
    glass: "border border-white/70 bg-white/10 text-white hover:bg-white hover:text-ink",
    small: "border border-pastel bg-white px-4 py-2 text-ink hover:bg-cultured",
    icon: "h-11 w-11 justify-center bg-ink p-0 text-white hover:bg-spanish"
  };

  if (!active.length) return null;

  return (
    <button type="button" onClick={() => context?.openModal()} className={`inline-flex items-center gap-2 rounded-full text-sm font-bold transition ${variant === "icon" ? "" : "px-6 py-3"} ${classes[variant]}`} aria-label={copy.orderOnline}>
      <ShoppingBag size={18} />
      {variant === "icon" ? <span className="sr-only">{copy.orderOnline}</span> : label || copy.orderOnline}
    </button>
  );
}

function OrderOnlineModal({ platforms, lang, onClose }: { platforms: OrderPlatform[]; lang: Lang; onClose: () => void }) {
  const copy = t(lang);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="max-h-[90vh] w-[calc(100%-32px)] max-w-[760px] overflow-y-auto rounded-[2rem] bg-seashell p-6 shadow-soft" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.24em] text-ochre">{copy.orderOnline}</p>
            <h2 className="mt-2 font-title text-4xl text-ink">{copy.choosePlatform}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-white p-3 text-ink transition hover:bg-cultured" aria-label="Close order online modal">
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid gap-3">
          {platforms.map((platform) => (
            <a key={platform.id} href={platform.order_url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 text-ink shadow-soft transition hover:-translate-y-0.5">
              <span className="flex min-w-0 items-center gap-3 font-bold">
                {platform.logo_url ? (
                  <Image src={platform.logo_url} alt={platform.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cultured">
                    <ShoppingBag size={18} />
                  </span>
                )}
                <span className="truncate">{lang === "es" ? platform.button_text_es || platform.button_text_en || platform.name : platform.button_text_en || platform.button_text_es || platform.name}</span>
              </span>
              <span className="shrink-0 text-sm text-spanish">{platform.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrderPlatformStrip({ platforms, lang = "en" }: { platforms: OrderPlatform[]; lang?: Lang }) {
  const copy = t(lang);
  const active = platforms.filter((platform) => platform.is_active);
  if (!active.length) return null;

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-soft">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-heading text-sm uppercase tracking-[0.24em] text-ochre">{copy.orderOnline}</p>
          <h2 className="mt-2 font-title text-4xl">{copy.orderFavourites}</h2>
          <p className="mt-2 text-ink/65">{copy.choosePlatform}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {active.map((platform) => (
            <a key={platform.id} href={platform.order_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-pastel px-5 py-3 text-sm font-bold text-ink transition hover:bg-cultured">
              {platform.logo_url && <Image src={platform.logo_url} alt="" width={22} height={22} className="h-5 w-5 rounded-full object-cover" />}
              {lang === "es" ? platform.button_text_es || platform.button_text_en || platform.name : platform.button_text_en || platform.button_text_es || platform.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
