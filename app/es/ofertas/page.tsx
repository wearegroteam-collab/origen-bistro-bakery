import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { offerPath, pick } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { CtaLink, InternalPageHero, PageShell } from "@/components/site-chrome";
import { pageHero } from "@/lib/page-heroes";

export async function generateMetadata() {
  return buildPageMetadata("offers", "es");
}

export default async function SpanishOffersPage() {
  const content = await getSiteContent();
  const { brand, offers } = content;
  return (
    <PageShell brand={brand} lang="es" orderPlatforms={content.orderPlatforms}>
      <InternalPageHero hero={pageHero(content, "offers")} pageKey="offers" lang="es" eyebrow="Ofertas" />
      <section className="section-shell py-20"><div className="grid gap-7 md:grid-cols-2">
        {offers.map((offer) => (
          <article key={offer.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
            {offer.image_url && <Image src={offer.image_url} alt={pick(offer as unknown as Record<string, unknown>, "title", "es")} width={900} height={560} className="h-80 w-full object-cover" />}
            <div className="p-8"><p className="text-sm text-spanish">{offer.start_date || "Activa"} - {offer.end_date || "Sin fecha final"}</p><h2 className="mt-3 font-title text-4xl">{pick(offer as unknown as Record<string, unknown>, "title", "es")}</h2><p className="mt-4 leading-7 text-ink/70">{pick(offer as unknown as Record<string, unknown>, "description", "es")}</p><div className="mt-7"><CtaLink href={offerPath(offer, "es")}>{pick(offer as unknown as Record<string, unknown>, "button_label", "es") || "Ver oferta"}</CtaLink></div></div>
          </article>
        ))}
      </div></section>
    </PageShell>
  );
}
