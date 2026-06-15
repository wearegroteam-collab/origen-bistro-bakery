import Image from "next/image";
import { notFound } from "next/navigation";
import { getOfferBySlug, getSiteContent } from "@/lib/content";
import { safeHref } from "@/lib/utils";
import { CtaLink, PageShell } from "@/components/site-chrome";
import { OrderOnlineButton } from "@/components/order-online";

export default async function OfferDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [content, offer] = await Promise.all([getSiteContent(), getOfferBySlug(slug)]);

  if (!offer) notFound();

  return (
    <PageShell brand={content.brand} orderPlatforms={content.orderPlatforms}>
      <section className="section-shell py-16">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
          {offer.image_url && <Image src={offer.image_url} alt={offer.title} width={1600} height={850} priority className="h-[520px] w-full object-cover" />}
          <div className="grid gap-10 p-8 md:grid-cols-[1fr_320px] md:p-12">
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">Oferta activa</p>
              <h1 className="mt-4 font-title text-6xl leading-none">{offer.title}</h1>
              <p className="mt-6 text-xl leading-8 text-ink/70">{offer.full_description || offer.description}</p>
              {offer.conditions && (
                <div className="mt-10 rounded-[1.5rem] bg-cultured p-6">
                  <h2 className="font-heading text-2xl">Condiciones</h2>
                  <p className="mt-3 leading-7 text-ink/65">{offer.conditions}</p>
                </div>
              )}
            </div>
            <aside className="rounded-[1.5rem] bg-seashell p-6">
              <p className="font-heading text-sm uppercase tracking-[0.22em] text-spanish">Vigencia</p>
              <p className="mt-3 text-lg text-ink/70">{offer.start_date || "Activa"} - {offer.end_date || "Sin fecha final"}</p>
              <div className="mt-8">
                {offer.cta_url ? <CtaLink href={safeHref(offer.cta_url, "/contact")}>{offer.cta_label || "Reserve"}</CtaLink> : <OrderOnlineButton platforms={content.orderPlatforms} lang="en" />}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
