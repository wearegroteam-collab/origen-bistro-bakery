import { getSiteContent } from "@/lib/content";
import { ContactBlock, InternalPageHero, PageShell } from "@/components/site-chrome";
import { buildPageMetadata } from "@/lib/seo";
import { pageHero } from "@/lib/page-heroes";

export async function generateMetadata() {
  return buildPageMetadata("contact", "en");
}

export default async function ContactPage() {
  const content = await getSiteContent();
  const { brand } = content;

  return (
    <PageShell brand={brand} orderPlatforms={content.orderPlatforms}>
      <InternalPageHero hero={pageHero(content, "contact")} pageKey="contact" lang="en" eyebrow="Contact" />
      <ContactBlock brand={brand} />
    </PageShell>
  );
}
