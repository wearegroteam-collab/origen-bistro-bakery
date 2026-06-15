import Image from "next/image";
import { Calendar, Star } from "lucide-react";
import type { EventItem, Offer, SiteContent } from "@/types/content";
import { formatPrice, safeHref } from "@/lib/utils";
import { ContactBlock, CtaLink, PageShell } from "@/components/site-chrome";
import { OrderOnlineButton, OrderPlatformStrip } from "@/components/order-online";
import type { Lang } from "@/lib/i18n";
import { eventPath, offerPath, pick, t } from "@/lib/i18n";
import { localBusinessJsonLd } from "@/lib/seo";

export function PublicSite({ content, lang = "en" }: { content: SiteContent; lang?: Lang }) {
  const { brand, hero, offers, events, products, gallery, testimonials, orderPlatforms } = content;
  const copy = t(lang);
  const featuredOffer = pickFeaturedOffer(offers);
  const featuredEvent = pickFeaturedEvent(events);
  const featuredProducts = products.filter((product) => product.is_featured).slice(0, 6);
  const previewGallery = gallery.slice(0, 5);
  const localBlocks = content.localSeoBlocks.filter((block) => block.page_target === "home");

  return (
    <PageShell brand={brand} lang={lang} orderPlatforms={orderPlatforms}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(content)) }} />
      <section className="relative min-h-[760px] overflow-hidden">
        {hero.media_type === "video" && hero.media_url ? (
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline src={hero.media_url} />
        ) : (
          <Image src={hero.media_url || "/hero-placeholder.jpg"} alt={pick(hero as unknown as Record<string, unknown>, "title", lang)} fill priority className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-seashell" />
        <div className="section-shell relative flex min-h-[760px] items-end pb-24 pt-40">
          <div className="soft-reveal max-w-3xl text-white">
            <p className="mb-5 font-heading text-sm uppercase tracking-[0.28em] text-sand">Bistro artesanal y bakery boutique</p>
            <h1 className="font-title text-6xl leading-[0.95] md:text-8xl">{pick(hero as unknown as Record<string, unknown>, "title", lang)}</h1>
            <p className="mt-7 max-w-2xl text-xl font-light leading-8 text-white/90">{pick(hero as unknown as Record<string, unknown>, "subtitle", lang)}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <CtaLink href={safeHref(hero.primary_button_url, lang === "es" ? "/es/contacto" : "/contact")} variant="light">{pick(hero as unknown as Record<string, unknown>, "primary_button_label", lang)}</CtaLink>
              <CtaLink href={safeHref(hero.secondary_button_url, lang === "es" ? "/es/menu" : "/menu")} variant="glass">{pick(hero as unknown as Record<string, unknown>, "secondary_button_label", lang)}</CtaLink>
              <OrderOnlineButton platforms={orderPlatforms} lang={lang} variant="glass" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">{copy.offersEvents}</p>
            <h2 className="mt-3 font-title text-5xl">{copy.seasonBest}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href={lang === "es" ? "/es/ofertas" : "/offers"} variant="outline">{copy.viewOffers}</CtaLink>
            <CtaLink href={lang === "es" ? "/es/eventos" : "/events"} variant="outline">{copy.viewEvents}</CtaLink>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredOffer && <FeatureColumn type={copy.featuredOffer} title={pick(featuredOffer as unknown as Record<string, unknown>, "title", lang)} description={pick(featuredOffer as unknown as Record<string, unknown>, "description", lang)} image={featuredOffer.image_url} meta={offerMeta(featuredOffer)} href={offerPath(featuredOffer, lang)} button={pick(featuredOffer as unknown as Record<string, unknown>, "button_label", lang) || copy.viewOffers} />}
          {featuredEvent && <FeatureColumn type={copy.featuredEvent} title={pick(featuredEvent as unknown as Record<string, unknown>, "title", lang)} description={pick(featuredEvent as unknown as Record<string, unknown>, "description", lang)} image={featuredEvent.image_url} meta={eventMeta(featuredEvent, lang)} href={eventPath(featuredEvent, lang)} button={pick(featuredEvent as unknown as Record<string, unknown>, "button_label", lang) || copy.viewEvents} />}
        </div>
      </section>

      <section className="section-shell py-24">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">{copy.featuredProducts}</p>
            <h2 className="mt-4 font-title text-5xl">{copy.houseFavorites}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href={lang === "es" ? "/es/menu" : "/menu"} variant="outline">{copy.viewMenu}</CtaLink>
            <OrderOnlineButton platforms={orderPlatforms} lang={lang} variant="dark" />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.id} className="rounded-[1.5rem] bg-white p-4 shadow-soft">
              {product.image_url && <Image src={product.image_url} alt={pick(product as unknown as Record<string, unknown>, "name", lang)} width={700} height={520} className="aspect-[4/3] rounded-[1.1rem] object-cover" />}
              <div className="p-3">
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="font-heading text-2xl">{pick(product as unknown as Record<string, unknown>, "name", lang)}</h3>
                  <span className="font-heading text-lg text-ochre">{formatPrice(Number(product.price))}</span>
                </div>
                <p className="mt-3 leading-6 text-ink/65">{pick(product as unknown as Record<string, unknown>, "description", lang)}</p>
                <div className="mt-5">
                  <OrderOnlineButton platforms={orderPlatforms} lang={lang} variant="small" label={copy.order} />
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <OrderPlatformStrip platforms={orderPlatforms} lang={lang} />
        </div>
      </section>

      <section className="bg-ink py-24 text-seashell">
        <div className="section-shell">
          <div className="mb-12 max-w-2xl">
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-sand">{copy.gallery}</p>
            <h2 className="mt-4 font-title text-5xl">{copy.galleryTitle}</h2>
          </div>
          <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
            {previewGallery.map((image, index) => (
              <Image
                key={image.id}
                src={image.image_url}
                alt={pick(image as unknown as Record<string, unknown>, "title", lang) || "Origen gallery"}
                width={900}
                height={900}
                className={`h-full w-full rounded-[1.5rem] object-cover ${index === 0 ? "col-span-2 row-span-2" : ""} ${index === 3 ? "md:row-span-2" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-24">
        <h2 className="font-title text-5xl">{copy.reviewsTitle}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((item) => (
            <article key={item.id} className="rounded-[1.5rem] bg-white p-7 shadow-soft">
              <div className="flex gap-1 text-ochre">{Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={18} fill="currentColor" />)}</div>
              <p className="mt-5 leading-7 text-ink/70">&ldquo;{pick(item as unknown as Record<string, unknown>, "comment", lang)}&rdquo;</p>
              <p className="mt-6 font-heading text-xl">{pick(item as unknown as Record<string, unknown>, "name", lang)}</p>
            </article>
          ))}
        </div>
      </section>

      {localBlocks.length > 0 && (
        <section className="bg-cultured py-20">
          <div className="section-shell grid gap-5 md:grid-cols-2">
            {localBlocks.map((block) => (
              <article key={block.id} className="rounded-[1.5rem] bg-white p-8 shadow-soft">
                <h2 className="font-heading text-3xl">{pick(block as unknown as Record<string, unknown>, "heading", lang)}</h2>
                <p className="mt-4 leading-7 text-ink/70">{pick(block as unknown as Record<string, unknown>, "content", lang)}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <ContactBlock brand={brand} lang={lang} />
    </PageShell>
  );
}

function FeatureColumn({ type, title, description, image, meta, href, button }: { type: string; title: string; description?: string | null; image?: string | null; meta: string; href: string; button: string }) {
  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
      {image && <Image src={image} alt={title} width={900} height={620} className="h-80 w-full object-cover" />}
      <div className="p-8">
        <p className="font-heading text-xs uppercase tracking-[0.24em] text-ochre">{type}</p>
        <h3 className="mt-4 font-title text-4xl">{title}</h3>
        <p className="mt-4 leading-7 text-ink/70">{description}</p>
        <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-spanish">
          <Calendar size={16} /> {meta}
        </p>
        <div className="mt-8">
          <CtaLink href={href}>{button}</CtaLink>
        </div>
      </div>
    </article>
  );
}

function pickFeaturedOffer(offers: Offer[]) {
  return offers.find((offer) => offer.is_featured) ?? offers[0];
}

function pickFeaturedEvent(events: EventItem[]) {
  return events.find((event) => event.is_featured) ?? events[0];
}

function offerMeta(offer: Offer) {
  return `${offer.start_date || "Activa"} - ${offer.end_date || "sin fecha final"}`;
}

function eventMeta(event: EventItem, lang: Lang) {
  return [event.event_date, event.event_time, pick(event as unknown as Record<string, unknown>, "location", lang)].filter(Boolean).join(" · ") || "Date to be announced";
}
