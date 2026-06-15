import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { eventHref } from "@/lib/utils";
import { CtaLink, PageHero, PageShell } from "@/components/site-chrome";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("events", "en");
}

export default async function EventsPage() {
  const content = await getSiteContent();
  const { brand, events } = content;

  return (
    <PageShell brand={brand} orderPlatforms={content.orderPlatforms}>
      <PageHero eyebrow="Eventos" title="Experiencias para vivir Origen" body="Catas, brunches especiales, talleres y encuentros editables desde el panel admin." image="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1800&q=85" />
      <section className="section-shell py-20">
        <div className="grid gap-7 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
              {event.image_url && <Image src={event.image_url} alt={event.title} width={900} height={560} className="h-80 w-full object-cover" />}
              <div className="p-8">
                <div className="flex flex-wrap gap-4 text-sm text-spanish">
                  <span className="inline-flex items-center gap-2"><Calendar size={16} /> {event.event_date || "Fecha por anunciar"}</span>
                  {event.event_time && <span className="inline-flex items-center gap-2"><Clock size={16} /> {event.event_time}</span>}
                  {event.location && <span className="inline-flex items-center gap-2"><MapPin size={16} /> {event.location}</span>}
                </div>
                <h2 className="mt-4 font-title text-4xl">{event.title}</h2>
                <p className="mt-4 leading-7 text-ink/70">{event.description}</p>
                <div className="mt-7">
                  <CtaLink href={eventHref(event)}>{event.button_label || "Ver evento"}</CtaLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
