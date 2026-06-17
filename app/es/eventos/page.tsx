import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { eventPath, pick } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { CtaLink, InternalPageHero, PageShell } from "@/components/site-chrome";
import { pageHero } from "@/lib/page-heroes";

export async function generateMetadata() {
  return buildPageMetadata("events", "es");
}

export default async function SpanishEventsPage() {
  const content = await getSiteContent();
  const { brand, events } = content;
  return (
    <PageShell brand={brand} lang="es" orderPlatforms={content.orderPlatforms}>
      <InternalPageHero hero={pageHero(content, "events")} pageKey="events" lang="es" eyebrow="Eventos" />
      <section className="section-shell py-20">
        <div className="grid gap-7 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
              {event.image_url && <Image src={event.image_url} alt={pick(event as unknown as Record<string, unknown>, "title", "es")} width={900} height={560} className="h-80 w-full object-cover" />}
              <div className="p-8">
                <div className="flex flex-wrap gap-4 text-sm text-spanish">
                  <span className="inline-flex items-center gap-2"><Calendar size={16} /> {event.event_date || "Fecha por anunciar"}</span>
                  {event.event_time && <span className="inline-flex items-center gap-2"><Clock size={16} /> {event.event_time}</span>}
                  {event.location && <span className="inline-flex items-center gap-2"><MapPin size={16} /> {pick(event as unknown as Record<string, unknown>, "location", "es")}</span>}
                </div>
                <h2 className="mt-4 font-title text-4xl">{pick(event as unknown as Record<string, unknown>, "title", "es")}</h2>
                <p className="mt-4 leading-7 text-ink/70">{pick(event as unknown as Record<string, unknown>, "description", "es")}</p>
                <div className="mt-7"><CtaLink href={eventPath(event, "es")}>{pick(event as unknown as Record<string, unknown>, "button_label", "es") || "Ver evento"}</CtaLink></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
