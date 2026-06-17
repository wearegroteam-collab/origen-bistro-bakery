import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import type { BrandSettings, OrderPlatform, PageHeroConfig } from "@/types/content";
import { safeHref, whatsappUrl } from "@/lib/utils";
import type { Lang } from "@/lib/i18n";
import { pagePath, pick, t } from "@/lib/i18n";
import { OrderOnlineButton, OrderOnlineProvider } from "@/components/order-online";
import { MobileNav } from "@/components/mobile-nav";

function navItems(lang: Lang) {
  const copy = t(lang);
  return [
    { label: copy.home, href: pagePath("home", lang) },
    { label: copy.menu, href: pagePath("menu", lang) },
    { label: copy.offers, href: pagePath("offers", lang) },
    { label: copy.events, href: pagePath("events", lang) },
    { label: copy.catering, href: pagePath("catering", lang) },
    { label: copy.about, href: pagePath("about", lang) },
    { label: copy.contact, href: pagePath("contact", lang) }
  ];
}

export function SiteHeader({ brand, lang = "en", orderPlatforms = [] }: { brand: BrandSettings; lang?: Lang; orderPlatforms?: OrderPlatform[] }) {
  const alternateHome = lang === "en" ? "/es" : "/";
  const copy = t(lang);
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-seashell/90 backdrop-blur">
      <div className="section-shell flex h-20 items-center justify-between gap-3">
        <Link href={pagePath("home", lang)} className="flex min-w-0 items-center gap-3">
          {brand.logo_url ? (
            <Image src={brand.logo_url} alt="Origen Bistro & Bakery" width={132} height={48} className="max-h-12 w-auto" />
          ) : (
            <span className="truncate font-title text-3xl text-ink">Origen</span>
          )}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 lg:flex">
          {navItems(lang).map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 text-xs font-bold lg:flex">
          <Link href="/" className={lang === "en" ? "text-ink" : "text-ink/40"}>EN</Link>
          <span className="text-ink/25">/</span>
          <Link href={alternateHome} className={lang === "es" ? "text-ink" : "text-ink/40"}>ES</Link>
        </div>
        <div className="hidden lg:block">
          <OrderOnlineButton platforms={orderPlatforms} lang={lang} />
        </div>
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <div className="flex items-center gap-1 text-xs font-bold">
            <Link href="/" className={lang === "en" ? "text-ink" : "text-ink/40"}>EN</Link>
            <span className="text-ink/25">/</span>
            <Link href={alternateHome} className={lang === "es" ? "text-ink" : "text-ink/40"}>ES</Link>
          </div>
          <OrderOnlineButton platforms={orderPlatforms} lang={lang} variant="icon" label={copy.orderOnline} />
          <MobileNav items={navItems(lang)} lang={lang} orderPlatforms={orderPlatforms} />
        </div>
      </div>
    </header>
  );
}

export function ContactBlock({ brand, lang = "en" }: { brand: BrandSettings; lang?: Lang }) {
  const copy = t(lang);
  return (
    <section className="bg-white py-24">
      <div className="section-shell grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-heading text-sm uppercase tracking-[0.28em] text-ochre">{copy.visitUs}</p>
          <h2 className="mt-4 font-title text-5xl">{copy.locationTitle}</h2>
          <p className="mt-6 flex gap-3 text-lg text-ink/75">
            <MapPin className="mt-1" /> {pick(brand as unknown as Record<string, unknown>, "address", lang)}
          </p>
          <pre className="mt-6 whitespace-pre-wrap font-body text-lg leading-8 text-ink/70">{pick(brand as unknown as Record<string, unknown>, "hours", lang)}</pre>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappUrl(brand.whatsapp)} className="inline-flex items-center gap-2 rounded-full bg-spanish px-6 py-3 text-sm font-bold text-white">
              <MessageCircle size={18} /> WhatsApp
            </a>
            {brand.instagram && (
              <a href={brand.instagram} className="inline-flex items-center gap-2 rounded-full border border-pastel px-6 py-3 text-sm font-bold text-ink">
                <Instagram size={18} /> Instagram
              </a>
            )}
          </div>
        </div>
        <div className="min-h-[360px] overflow-hidden rounded-[2rem] bg-cultured shadow-soft">
          {brand.google_maps_embed ? (
            <iframe src={brand.google_maps_embed} className="h-full min-h-[360px] w-full border-0" loading="lazy" />
          ) : (
            <div className="flex h-full min-h-[360px] items-center justify-center p-10 text-center text-ink/50">Agrega el enlace embed de Google Maps desde el panel.</div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ brand, lang = "en" }: { brand: BrandSettings; lang?: Lang }) {
  return (
    <footer className="bg-ink py-12 text-seashell">
      <div className="section-shell flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-title text-3xl">Origen</p>
          <p className="mt-2 text-white/60">
            {brand.email} · {brand.phone}
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-white/60">
          {navItems(lang).map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} Origen Bistro & Bakery.</p>
      </div>
    </footer>
  );
}

export function PageShell({ brand, children, lang = "en", orderPlatforms = [] }: { brand: BrandSettings; children: React.ReactNode; lang?: Lang; orderPlatforms?: OrderPlatform[] }) {
  return (
    <main className="bg-seashell text-ink">
      <OrderOnlineProvider platforms={orderPlatforms} lang={lang}>
        <SiteHeader brand={brand} lang={lang} orderPlatforms={orderPlatforms} />
        {children}
        <SiteFooter brand={brand} lang={lang} />
      </OrderOnlineProvider>
    </main>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  image,
  video,
  overlayOpacity = 65,
  style = "medium",
  imagePosition = "center",
  ctaLabel,
  ctaUrl,
  showCta = false
}: {
  eyebrow: string;
  title: string;
  body?: string | null;
  image?: string | null;
  video?: string | null;
  overlayOpacity?: number;
  style?: "large" | "medium" | "compact";
  imagePosition?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  showCta?: boolean;
}) {
  const styles = {
    compact: {
      section: "py-16 md:py-20",
      title: "text-5xl md:text-6xl",
      body: "mt-5 text-lg leading-7"
    },
    medium: {
      section: "py-24 md:py-28",
      title: "text-6xl md:text-8xl",
      body: "mt-7 text-xl leading-8"
    },
    large: {
      section: "py-36 md:py-44",
      title: "text-7xl md:text-9xl",
      body: "mt-8 text-2xl leading-9"
    }
  };
  const selectedStyle = styles[style];
  const overlay = Math.min(100, Math.max(0, overlayOpacity)) / 100;

  return (
    <section className={`relative overflow-hidden bg-ink text-seashell ${selectedStyle.section}`}>
      {video ? (
        <video className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: imagePosition || "center" }} autoPlay muted loop playsInline src={video} />
      ) : (
        image && <Image src={image} alt={title} fill priority className="object-cover" style={{ objectPosition: imagePosition || "center" }} />
      )}
      <div className="absolute inset-0 bg-ink" style={{ opacity: overlay }} />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/10" />
      <div className="section-shell relative">
        <p className="font-heading text-sm uppercase tracking-[0.28em] text-sand">{eyebrow}</p>
        <h1 className={`mt-5 max-w-4xl font-title leading-none ${selectedStyle.title}`}>{title}</h1>
        {body && <p className={`max-w-2xl font-light text-white/80 ${selectedStyle.body}`}>{body}</p>}
        {showCta && ctaLabel && (
          <div className="mt-9">
            <CtaLink href={ctaUrl || "/contact"} variant="light">{ctaLabel}</CtaLink>
          </div>
        )}
      </div>
    </section>
  );
}

export function InternalPageHero({ hero, pageKey, lang, eyebrow }: { hero?: PageHeroConfig; pageKey: string; lang: Lang; eyebrow?: string }) {
  if (!hero?.is_enabled) return null;
  const heroStyle = hero.hero_style || heightToStyle(hero.height);
  if (heroStyle === "none") return null;
  const title = pick(hero as unknown as Record<string, unknown>, "title", lang);
  if (!title) return null;

  return (
    <PageHero
      eyebrow={eyebrow || pageKey}
      title={title}
      body={pick(hero as unknown as Record<string, unknown>, "subtitle", lang)}
      image={hero.background_image_url}
      video={hero.background_video_url}
      overlayOpacity={hero.overlay_opacity}
      style={heroStyle}
      imagePosition={hero.image_position}
      showCta={hero.show_cta}
      ctaLabel={pick(hero as unknown as Record<string, unknown>, "cta_label", lang)}
      ctaUrl={hero.cta_url}
    />
  );
}

function heightToStyle(height?: "small" | "medium" | "large") {
  if (height === "small") return "compact";
  if (height === "large") return "large";
  return "medium";
}

export function CtaLink({ href, children, variant = "dark" }: { href?: string | null; children: React.ReactNode; variant?: "dark" | "light" | "outline" | "glass" }) {
  const classes = {
    dark: "bg-ink text-white hover:bg-spanish",
    light: "bg-ochre text-white hover:bg-ink",
    outline: "border border-pastel text-ink hover:bg-white",
    glass: "border border-white/70 bg-white/10 text-white hover:bg-white hover:text-ink"
  };

  return (
    <Link href={safeHref(href, "/")} className={`inline-flex rounded-full px-6 py-3 text-sm font-bold transition ${classes[variant]}`}>
      {children}
    </Link>
  );
}
