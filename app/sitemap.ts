import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";
import { eventPath, offerPath, pagePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const base = siteUrl();
  const pageKeys = ["home", "menu", "about", "offers", "events", "contact"];
  const pages = pageKeys.flatMap((key) => [
    { url: `${base}${pagePath(key, "en")}`, alternates: { languages: { "en-CA": `${base}${pagePath(key, "en")}`, "es-CA": `${base}${pagePath(key, "es")}`, "x-default": `${base}${pagePath(key, "en")}` } } },
    { url: `${base}${pagePath(key, "es")}`, alternates: { languages: { "en-CA": `${base}${pagePath(key, "en")}`, "es-CA": `${base}${pagePath(key, "es")}`, "x-default": `${base}${pagePath(key, "en")}` } } }
  ]);
  const offers = content.offers.flatMap((offer) => [
    { url: `${base}${offerPath(offer, "en")}` },
    { url: `${base}${offerPath(offer, "es")}` }
  ]);
  const events = content.events.flatMap((event) => [
    { url: `${base}${eventPath(event, "en")}` },
    { url: `${base}${eventPath(event, "es")}` }
  ]);

  return [...pages, ...offers, ...events];
}
