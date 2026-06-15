import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { PageHero, PageShell } from "@/components/site-chrome";
import type { SiteContent } from "@/types/content";
import { OrderOnlineButton, OrderPlatformStrip } from "@/components/order-online";
import { t } from "@/lib/i18n";

export function MenuPageView({ content, lang }: { content: SiteContent; lang: Lang }) {
  const { brand, categories, products } = content;
  const copy = t(lang);
  return (
    <PageShell brand={brand} lang={lang} orderPlatforms={content.orderPlatforms}>
      <PageHero eyebrow={lang === "es" ? "Menu completo" : "Full menu"} title={lang === "es" ? "Bakery, brunch y bistro de temporada" : "Bakery, brunch and seasonal bistro"} body={lang === "es" ? "Explora nuestro menu organizado por categorias." : "Explore our full menu organized by category."} image="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1800&q=85" />
      <section className="section-shell pt-16">
        <OrderPlatformStrip platforms={content.orderPlatforms} lang={lang} />
      </section>
      <section className="section-shell py-20">
        <div className="space-y-16">
          {categories.map((category) => {
            const categoryProducts = products.filter((product) => product.category_id === category.id || product.category?.id === category.id);
            if (!categoryProducts.length) return null;
            return (
              <div key={category.id}>
                <div className="mb-8 flex items-end justify-between border-b border-pastel pb-4">
                  <h2 className="font-title text-5xl">{pick(category as unknown as Record<string, unknown>, "name", lang)}</h2>
                  <span className="font-heading text-sm uppercase tracking-[0.22em] text-spanish">{categoryProducts.length} {lang === "es" ? "productos" : "items"}</span>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {categoryProducts.map((product) => (
                    <article key={product.id} className="grid grid-cols-[112px_1fr] gap-5 rounded-[1.5rem] bg-white p-4 shadow-soft">
                      {product.image_url ? <Image src={product.image_url} alt={pick(product as unknown as Record<string, unknown>, "name", lang)} width={240} height={240} className="aspect-square rounded-[1rem] object-cover" /> : <div className="aspect-square rounded-[1rem] bg-cultured" />}
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-heading text-2xl">{pick(product as unknown as Record<string, unknown>, "name", lang)}</h3>
                          <p className="font-heading text-lg text-ochre">{formatPrice(Number(product.price))}</p>
                        </div>
                        <p className="mt-3 leading-6 text-ink/65">{pick(product as unknown as Record<string, unknown>, "description", lang)}</p>
                        <div className="mt-4">
                          <OrderOnlineButton platforms={content.orderPlatforms} lang={lang} variant="small" label={copy.order} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
