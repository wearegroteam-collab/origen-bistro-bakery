import { getSiteContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ContactBlock, InternalPageHero, PageShell } from "@/components/site-chrome";
import { pageHero } from "@/lib/page-heroes";

export async function generateMetadata() {
  return buildPageMetadata("contact", "es");
}

export default async function SpanishContactPage() {
  const content = await getSiteContent();
  const { brand } = content;
  return (
    <PageShell brand={brand} lang="es" orderPlatforms={content.orderPlatforms}>
      <InternalPageHero hero={pageHero(content, "contact")} pageKey="contact" lang="es" eyebrow="Contacto" />
      <ContactBlock brand={brand} lang="es" />
    </PageShell>
  );
}
