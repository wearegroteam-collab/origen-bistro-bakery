import Image from "next/image";
import { CtaLink, InternalPageHero, PageShell } from "@/components/site-chrome";
import { OrderPlatformStrip } from "@/components/order-online";
import { pagePath, pick, t, type Lang } from "@/lib/i18n";
import type { SiteContent } from "@/types/content";
import { whatsappUrl } from "@/lib/utils";
import { pageHero } from "@/lib/page-heroes";

export function CateringPageView({ content, lang = "en" }: { content: SiteContent; lang?: Lang }) {
  const copy = t(lang);
  const { brand, catering } = content;
  const title = pick(catering as unknown as Record<string, unknown>, "title", lang) || "Catering by Origen";
  const subtitle = pick(catering as unknown as Record<string, unknown>, "subtitle", lang);
  const description = pick(catering as unknown as Record<string, unknown>, "description", lang);
  const services = lines(pick(catering as unknown as Record<string, unknown>, "service_types", lang));
  const packages = lines(pick(catering as unknown as Record<string, unknown>, "packages", lang));
  const gallery = lines(catering.gallery_urls || "");
  const ctaLabel = pick(catering as unknown as Record<string, unknown>, "cta_label", lang) || (lang === "es" ? "Solicitar catering" : "Request catering");
  const ctaUrl = catering.cta_url || pagePath("contact", lang);

  return (
    <PageShell brand={brand} lang={lang} orderPlatforms={content.orderPlatforms}>
      <InternalPageHero hero={pageHero(content, "catering")} pageKey="catering" lang={lang} eyebrow={copy.cateringEyebrow} />

      <section className="section-shell py-24">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">{copy.catering}</p>
            {description && (
              <div className="mt-6 space-y-6 text-lg leading-8 text-ink/75">
                {description.split("\n").filter(Boolean).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaLink href={ctaUrl}>{ctaLabel}</CtaLink>
              {catering.whatsapp_cta && (
                <CtaLink href={whatsappUrl(catering.whatsapp_cta)} variant="outline">
                  WhatsApp
                </CtaLink>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {catering.image_url && <Image src={catering.image_url} alt={title} width={900} height={1000} className="aspect-[4/5] rounded-[2rem] object-cover shadow-soft sm:row-span-2" />}
            {gallery.slice(0, 2).map((image, index) => (
              <Image key={image} src={image} alt={`${title} ${index + 1}`} width={700} height={520} className="aspect-[4/3] rounded-[1.5rem] object-cover shadow-soft" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cultured py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-2">
          <EditorialList title={copy.cateringServices} items={services} />
          <EditorialList title={copy.cateringPackages} items={packages} />
        </div>
      </section>

      <section className="section-shell py-20">
        <OrderPlatformStrip platforms={content.orderPlatforms} lang={lang} />
      </section>
    </PageShell>
  );
}

function EditorialList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <article className="rounded-[2rem] bg-white p-8 shadow-soft">
      <p className="font-heading text-sm uppercase tracking-[0.24em] text-spanish">{title}</p>
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <div key={item} className="rounded-[1.25rem] border border-pastel/70 bg-seashell px-5 py-4 font-heading text-xl">
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}
