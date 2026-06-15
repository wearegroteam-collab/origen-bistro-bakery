import { CtaLink, PageShell } from "@/components/site-chrome";
import type { BrandSettings, OrderPlatform } from "@/types/content";
import type { Lang } from "@/lib/i18n";

export function ContentNotFound({ brand, orderPlatforms, lang = "en", type }: { brand: BrandSettings; orderPlatforms: OrderPlatform[]; lang?: Lang; type: "offer" | "event" }) {
  const isSpanish = lang === "es";
  const listingHref = type === "offer" ? (isSpanish ? "/es/ofertas" : "/offers") : (isSpanish ? "/es/eventos" : "/events");
  const title = isSpanish
    ? type === "offer" ? "Oferta no encontrada" : "Evento no encontrado"
    : type === "offer" ? "Offer not found" : "Event not found";
  const body = isSpanish
    ? "Es posible que el contenido haya expirado o ya no este activo. Puedes volver al listado para ver opciones disponibles."
    : "This item may have expired or may no longer be active. You can return to the listing to see what is currently available.";
  const button = isSpanish ? "Volver al listado" : "Back to listing";

  return (
    <PageShell brand={brand} lang={lang} orderPlatforms={orderPlatforms}>
      <section className="section-shell flex min-h-[60vh] items-center py-24">
        <div className="max-w-2xl rounded-[2rem] bg-white p-10 shadow-soft">
          <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">Origen Bistro & Bakery</p>
          <h1 className="mt-4 font-title text-6xl leading-none">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-ink/70">{body}</p>
          <div className="mt-8">
            <CtaLink href={listingHref}>{button}</CtaLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
