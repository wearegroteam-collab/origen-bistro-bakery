import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { CtaLink, PageHero, PageShell } from "@/components/site-chrome";
import { buildPageMetadata } from "@/lib/seo";
import { eventPath, pick } from "@/lib/i18n";

export async function generateMetadata() {
  return buildPageMetadata("events", "en");
}

export default async function EventsPage() {
  const content = await getSiteContent();
  const { brand, events } = content;

  return (
    <PageShell brand={brand} orderPlatforms={content.orderPlatforms}>
      <PageHero eyebrow="Events" title="Experiences to live Origen" body="Tastings, special brunches, workshops and gatherings managed from the admin panel." image="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1800&q=85" />
      <section className="section-shell py-20">
        <div className="grid gap-7 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
              {event.image_url && <Image src={event.image_url} alt={pick(event as unknown as Record<string, unknown>, "title", "en")} width={900} height={560} className="h-80 w-full object-cover" />}
              <div className="p-8">
                <div className="flex flex-wrap gap-4 text-sm text-spanish">
                  <span className="inline-flex items-center gap-2"><Calendar size={16} /> {event.event_date || "Date to be announced"}</span>
                  {event.event_time && <span className="inline-flex items-center gap-2"><Clock size={16} /> {event.event_time}</span>}
                  {pick(event as unknown as Record<string, unknown>, "location", "en") && <span className="inline-flex items-center gap-2"><MapPin size={16} /> {pick(event as unknown as Record<string, unknown>, "location", "en")}</span>}
                </div>
                <h2 className="mt-4 font-title text-4xl">{pick(event as unknown as Record<string, unknown>, "title", "en")}</h2>
                <p className="mt-4 leading-7 text-ink/70">{pick(event as unknown as Record<string, unknown>, "description", "en")}</p>
                <div className="mt-7">
                  <CtaLink href={eventPath(event, "en")}>{pick(event as unknown as Record<string, unknown>, "button_label", "en") || "View event"}</CtaLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
