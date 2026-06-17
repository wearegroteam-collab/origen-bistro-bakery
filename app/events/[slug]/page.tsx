import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getEventBySlug, getSiteContent } from "@/lib/content";
import { safeHref } from "@/lib/utils";
import { CtaLink, PageShell } from "@/components/site-chrome";
import { ContentNotFound } from "@/components/content-not-found";
import { pick } from "@/lib/i18n";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [content, event] = await Promise.all([getSiteContent(), getEventBySlug(slug)]);

  if (!event) return <ContentNotFound brand={content.brand} orderPlatforms={content.orderPlatforms} type="event" />;
  const title = pick(event as unknown as Record<string, unknown>, "title", "en");
  const location = pick(event as unknown as Record<string, unknown>, "location", "en");

  return (
    <PageShell brand={content.brand} orderPlatforms={content.orderPlatforms}>
      <section className="section-shell py-16">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
          {event.image_url && <Image src={event.image_url} alt={title} width={1600} height={850} priority className="h-[520px] w-full object-cover" />}
          <div className="grid gap-10 p-8 md:grid-cols-[1fr_320px] md:p-12">
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">Event</p>
              <h1 className="mt-4 font-title text-6xl leading-none">{title}</h1>
              <p className="mt-6 text-xl leading-8 text-ink/70">{pick(event as unknown as Record<string, unknown>, "full_description", "en") || pick(event as unknown as Record<string, unknown>, "description", "en")}</p>
            </div>
            <aside className="rounded-[1.5rem] bg-seashell p-6">
              <p className="font-heading text-sm uppercase tracking-[0.22em] text-spanish">Details</p>
              <div className="mt-4 space-y-3 text-ink/70">
                <p className="flex gap-2"><Calendar size={18} /> {event.event_date || "Date to be announced"}</p>
                {event.event_time && <p className="flex gap-2"><Clock size={18} /> {event.event_time}</p>}
                {location && <p className="flex gap-2"><MapPin size={18} /> {location}</p>}
              </div>
              <div className="mt-8">
                <CtaLink href={safeHref(event.cta_url, "/contact")}>{pick(event as unknown as Record<string, unknown>, "cta_label", "en") || "Reserve"}</CtaLink>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
