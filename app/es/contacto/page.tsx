import { getSiteContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ContactBlock, PageHero, PageShell } from "@/components/site-chrome";

export async function generateMetadata() {
  return buildPageMetadata("contact", "es");
}

export default async function SpanishContactPage() {
  const content = await getSiteContent();
  const { brand } = content;
  return (
    <PageShell brand={brand} lang="es" orderPlatforms={content.orderPlatforms}>
      <PageHero eyebrow="Contacto" title="Reserva, escribe o ven por cafe" body="Informacion de ubicacion, horarios, WhatsApp y redes sociales." image="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=85" />
      <ContactBlock brand={brand} lang="es" />
    </PageShell>
  );
}
