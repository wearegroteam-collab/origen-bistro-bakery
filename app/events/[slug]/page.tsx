import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getEventBySlug, getSiteContent } from "@/lib/content";
import { safeHref } from "@/lib/utils";
import { CtaLink, PageShell } from "@/components/site-chrome";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [content, event] = await Promise.all([getSiteContent(), getEventBySlug(slug)]);

  if (!event) notFound();

  return (
    <PageShell brand={content.brand} orderPlatforms={content.orderPlatforms}>
      <section className="section-shell py-16">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
          {event.image_url && <Image src={event.image_url} alt={event.title} width={1600} height={850} priority className="h-[520px] w-full object-cover" />}
          <div className="grid gap-10 p-8 md:grid-cols-[1fr_320px] md:p-12">
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">Evento</p>
              <h1 className="mt-4 font-title text-6xl leading-none">{event.title}</h1>
              <p className="mt-6 text-xl leading-8 text-ink/70">{event.full_description || event.description}</p>
            </div>
            <aside className="rounded-[1.5rem] bg-seashell p-6">
              <p className="font-heading text-sm uppercase tracking-[0.22em] text-spanish">Detalles</p>
              <div className="mt-4 space-y-3 text-ink/70">
                <p className="flex gap-2"><Calendar size={18} /> {event.event_date || "Fecha por anunciar"}</p>
                {event.event_time && <p className="flex gap-2"><Clock size={18} /> {event.event_time}</p>}
                {event.location && <p className="flex gap-2"><MapPin size={18} /> {event.location}</p>}
              </div>
              <div className="mt-8">
                <CtaLink href={safeHref(event.cta_url, "/contact")}>{event.cta_label || "Reservar"}</CtaLink>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
