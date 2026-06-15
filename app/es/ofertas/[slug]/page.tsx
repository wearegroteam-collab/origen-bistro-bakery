import Image from "next/image";
import { notFound } from "next/navigation";
import { getOfferBySlug, getSiteContent } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { safeHref } from "@/lib/utils";
import { CtaLink, PageShell } from "@/components/site-chrome";
import { OrderOnlineButton } from "@/components/order-online";

export default async function SpanishOfferDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [content, offer] = await Promise.all([getSiteContent(), getOfferBySlug(slug)]);
  if (!offer) notFound();
  return (
    <PageShell brand={content.brand} lang="es" orderPlatforms={content.orderPlatforms}>
      <section className="section-shell py-16"><div className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
        {offer.image_url && <Image src={offer.image_url} alt={pick(offer as unknown as Record<string, unknown>, "title", "es")} width={1600} height={850} priority className="h-[520px] w-full object-cover" />}
        <div className="grid gap-10 p-8 md:grid-cols-[1fr_320px] md:p-12"><div><p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">Oferta activa</p><h1 className="mt-4 font-title text-6xl leading-none">{pick(offer as unknown as Record<string, unknown>, "title", "es")}</h1><p className="mt-6 text-xl leading-8 text-ink/70">{pick(offer as unknown as Record<string, unknown>, "full_description", "es") || pick(offer as unknown as Record<string, unknown>, "description", "es")}</p></div><aside className="rounded-[1.5rem] bg-seashell p-6"><p className="font-heading text-sm uppercase tracking-[0.22em] text-spanish">Vigencia</p><p className="mt-3 text-lg text-ink/70">{offer.start_date || "Activa"} - {offer.end_date || "Sin fecha final"}</p><div className="mt-8">{offer.cta_url ? <CtaLink href={safeHref(offer.cta_url, "/es/contacto")}>{pick(offer as unknown as Record<string, unknown>, "cta_label", "es") || "Reservar"}</CtaLink> : <OrderOnlineButton platforms={content.orderPlatforms} lang="es" />}</div></aside></div>
      </div></section>
    </PageShell>
  );
}
