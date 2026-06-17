import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { CtaLink, InternalPageHero, PageShell } from "@/components/site-chrome";
import { buildPageMetadata } from "@/lib/seo";
import { offerPath, pick } from "@/lib/i18n";
import { pageHero } from "@/lib/page-heroes";

export async function generateMetadata() {
  return buildPageMetadata("offers", "en");
}

export default async function OffersPage() {
  const content = await getSiteContent();
  const { brand, offers } = content;

  return (
    <PageShell brand={brand} orderPlatforms={content.orderPlatforms}>
      <InternalPageHero hero={pageHero(content, "offers")} pageKey="offers" lang="en" eyebrow="Offers" />
      <section className="section-shell py-20">
        <div className="grid gap-7 md:grid-cols-2">
          {offers.map((offer) => (
            <article key={offer.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
              {offer.image_url && <Image src={offer.image_url} alt={pick(offer as unknown as Record<string, unknown>, "title", "en")} width={900} height={560} className="h-80 w-full object-cover" />}
              <div className="p-8">
                <p className="text-sm text-spanish">{offer.start_date || "Active"} - {offer.end_date || "No end date"}</p>
                <h2 className="mt-3 font-title text-4xl">{pick(offer as unknown as Record<string, unknown>, "title", "en")}</h2>
                <p className="mt-4 leading-7 text-ink/70">{pick(offer as unknown as Record<string, unknown>, "description", "en")}</p>
                <div className="mt-7">
                  <CtaLink href={offerPath(offer, "en")}>{pick(offer as unknown as Record<string, unknown>, "button_label", "en") || "View offer"}</CtaLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
