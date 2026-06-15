import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import { pagePath, pick } from "@/lib/i18n";
import { getSiteContent } from "@/lib/content";
import type { SeoPage, SiteContent } from "@/types/content";

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://origenbistrobakery.ca";
}

export async function buildPageMetadata(pageKey: string, lang: Lang): Promise<Metadata> {
  const content = await getSiteContent();
  const seo = content.seoPages.find((page) => page.page_key === pageKey);
  const global = content.seoSettings;
  const title = localizedSeo(seo, "meta_title", lang) || localizedGlobal(global, "site_title", lang) || "Origen Bistro & Bakery";
  const description = localizedSeo(seo, "meta_description", lang) || localizedGlobal(global, "site_description", lang) || "Bakery, brunch and bistro in St. Catharines, Ontario.";
  const path = pagePath(pageKey, lang);
  const url = `${siteUrl()}${path}`;
  const robots = seo ? { index: seo.index_page, follow: seo.follow_page } : { index: true, follow: true };

  return {
    title,
    description,
    keywords: localizedSeo(seo, "keywords", lang),
    alternates: {
      canonical: seo?.canonical_url || url,
      languages: {
        "en-CA": `${siteUrl()}${pagePath(pageKey, "en")}`,
        "es-CA": `${siteUrl()}${pagePath(pageKey, "es")}`,
        "x-default": `${siteUrl()}${pagePath(pageKey, "en")}`
      }
    },
    openGraph: {
      title: localizedSeo(seo, "og_title", lang) || title,
      description: localizedSeo(seo, "og_description", lang) || description,
      images: seo?.og_image || global.default_og_image ? [seo?.og_image || global.default_og_image || ""] : undefined,
      type: "website",
      url
    },
    robots
  };
}

export function localBusinessJsonLd(content: SiteContent) {
  const seo = content.seoSettings;
  const sameAs = [seo.instagram, seo.facebook, seo.tiktok].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "Bakery", "LocalBusiness"],
    name: seo.business_name || "Origen Bistro & Bakery",
    telephone: seo.phone || content.brand.phone,
    email: seo.email || content.brand.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: seo.address || content.brand.address,
      addressLocality: seo.city || "St. Catharines",
      addressRegion: seo.province || "Ontario",
      postalCode: seo.postal_code || "",
      addressCountry: seo.country || "Canada"
    },
    geo: seo.latitude && seo.longitude ? { "@type": "GeoCoordinates", latitude: seo.latitude, longitude: seo.longitude } : undefined,
    openingHours: seo.opening_hours_schema || content.brand.hours || undefined,
    priceRange: seo.price_range || "$$",
    servesCuisine: seo.cuisine || "Bakery, Brunch, Bistro, Coffee",
    sameAs,
    potentialAction: content.orderPlatforms
      .filter((platform) => platform.is_active)
      .map((platform) => ({
        "@type": "OrderAction",
        target: platform.order_url,
        name: platform.name
      })),
    menu: `${siteUrl()}/menu`,
    acceptsReservations: seo.accepts_reservations ?? true,
    url: siteUrl()
  };
}

function localizedSeo(page: SeoPage | undefined, field: string, lang: Lang) {
  if (!page) return "";
  return pick(page as unknown as Record<string, unknown>, field, lang);
}

function localizedGlobal(global: Record<string, unknown>, field: string, lang: Lang) {
  return pick(global, field, lang);
}
