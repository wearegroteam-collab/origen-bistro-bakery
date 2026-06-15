import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { CtaLink, PageHero, PageShell } from "@/components/site-chrome";
import { buildPageMetadata } from "@/lib/seo";
import { offerPath } from "@/lib/i18n";

export async function generateMetadata() {
  return buildPageMetadata("offers", "en");
}

export default async function OffersPage() {
  const content = await getSiteContent();
  const { brand, offers } = content;

  return (
    <PageShell brand={brand} orderPlatforms={content.orderPlatforms}>
      <PageHero eyebrow="Ofertas" title="Ofertas activas de temporada" body="Especiales, combos y propuestas limitadas de Origen Bistro & Bakery." image="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1800&q=85" />
      <section className="section-shell py-20">
        <div className="grid gap-7 md:grid-cols-2">
          {offers.map((offer) => (
            <article key={offer.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
              {offer.image_url && <Image src={offer.image_url} alt={offer.title} width={900} height={560} className="h-80 w-full object-cover" />}
              <div className="p-8">
                <p className="text-sm text-spanish">{offer.start_date || "Activa"} - {offer.end_date || "Sin fecha final"}</p>
                <h2 className="mt-3 font-title text-4xl">{offer.title}</h2>
                <p className="mt-4 leading-7 text-ink/70">{offer.description}</p>
                <div className="mt-7">
                  <CtaLink href={offerPath(offer, "en")}>{offer.button_label_en || offer.button_label || "View offer"}</CtaLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
