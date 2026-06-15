import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { CtaLink, PageHero, PageShell } from "@/components/site-chrome";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("about", "en");
}

export default async function AboutPage() {
  const content = await getSiteContent();
  const { brand, about } = content;
  const values = (about.values || "").split("\n").map((value) => value.trim()).filter(Boolean);

  return (
    <PageShell brand={brand} orderPlatforms={content.orderPlatforms}>
      <PageHero eyebrow="Sobre nosotros" title={about.page_title || about.title} body={about.preview_body || about.body} image={about.image_url} />
      <section className="section-shell py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_0.9fr] md:items-start">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">Historia</p>
            <div className="mt-6 space-y-6 text-lg leading-8 text-ink/75">
              {(about.page_body || about.body).split("\n").filter(Boolean).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {about.cta_label && (
              <div className="mt-9">
                <CtaLink href={about.cta_url || "/menu"}>{about.cta_label}</CtaLink>
              </div>
            )}
          </div>
          <div className="grid gap-5">
            {about.image_url && <Image src={about.image_url} alt={about.title} width={900} height={1100} className="aspect-[4/5] rounded-[2rem] object-cover shadow-soft" />}
            {about.secondary_image_url && <Image src={about.secondary_image_url} alt="Origen Bistro & Bakery" width={900} height={700} className="aspect-[4/3] rounded-[2rem] object-cover shadow-soft" />}
          </div>
        </div>
      </section>
      <section className="bg-cultured py-24">
        <div className="section-shell">
          <p className="font-heading text-sm uppercase tracking-[0.28em] text-spanish">Valores</p>
          <h2 className="mt-4 font-title text-5xl">Lo que guia nuestra mesa</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {values.map((value) => (
              <article key={value} className="rounded-[1.5rem] bg-white p-7 shadow-soft">
                <h3 className="font-heading text-2xl">{value}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
