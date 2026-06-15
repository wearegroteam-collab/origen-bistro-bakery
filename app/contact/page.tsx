import { getSiteContent } from "@/lib/content";
import { ContactBlock, PageHero, PageShell } from "@/components/site-chrome";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("contact", "en");
}

export default async function ContactPage() {
  const content = await getSiteContent();
  const { brand } = content;

  return (
    <PageShell brand={brand} orderPlatforms={content.orderPlatforms}>
      <PageHero eyebrow="Contacto" title="Reserva, escribe o ven por cafe" body="Toda la informacion de ubicacion, horarios, WhatsApp y redes sociales se edita desde el panel admin." image="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=85" />
      <ContactBlock brand={brand} />
    </PageShell>
  );
}
