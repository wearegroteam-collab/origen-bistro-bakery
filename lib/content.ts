import { fallbackContent } from "@/lib/fallback-content";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import type { EventItem, Offer, SiteContent } from "@/types/content";

export async function getSiteContent(): Promise<SiteContent> {
  if (!hasSupabaseEnv()) return fallbackContent;

  const supabase = await createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);

  const [
    brand,
    hero,
    about,
    offers,
    categories,
    products,
    gallery,
    events,
    testimonials,
    seoSettings,
    seoPages,
    localSeoBlocks,
    orderPlatforms
  ] = await Promise.all([
    supabase.from("brand_settings").select("*").single(),
    supabase.from("hero_content").select("*").single(),
    supabase.from("about_content").select("*").single(),
    supabase
      .from("offers")
      .select("*")
      .eq("is_active", true)
      .or(`start_date.is.null,start_date.lte.${today}`)
      .or(`end_date.is.null,end_date.gte.${today}`)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase.from("categories").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("products").select("*, category:categories(*)").eq("is_available", true).order("created_at", { ascending: false }),
    supabase.from("gallery_images").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("events").select("*").eq("is_active", true).order("is_featured", { ascending: false }).order("event_date", { ascending: true }),
    supabase.from("testimonials").select("*").eq("is_active", true).order("created_at", { ascending: false }),
    supabase.from("seo_settings").select("*").single(),
    supabase.from("seo_pages").select("*"),
    supabase.from("local_seo_blocks").select("*").eq("is_active", true),
    supabase.from("order_platforms").select("*").eq("is_active", true).order("sort_order")
  ]);

  return {
    brand: brand.data ?? fallbackContent.brand,
    hero: hero.data ?? fallbackContent.hero,
    about: about.data ?? fallbackContent.about,
    offers: offers.data?.length ? offers.data : fallbackContent.offers,
    categories: categories.data?.length ? categories.data : fallbackContent.categories,
    products: products.data?.length ? products.data : fallbackContent.products,
    gallery: gallery.data?.length ? gallery.data : fallbackContent.gallery,
    events: events.data?.length ? events.data : fallbackContent.events,
    testimonials: testimonials.data?.length ? testimonials.data : fallbackContent.testimonials,
    seoSettings: seoSettings.data ?? fallbackContent.seoSettings,
    seoPages: seoPages.data?.length ? seoPages.data : fallbackContent.seoPages,
    localSeoBlocks: localSeoBlocks.data?.length ? localSeoBlocks.data : fallbackContent.localSeoBlocks,
    orderPlatforms: orderPlatforms.data?.length ? orderPlatforms.data : fallbackContent.orderPlatforms
  };
}

export async function getOfferBySlug(slug: string): Promise<Offer | null> {
  if (!hasSupabaseEnv()) {
    return fallbackContent.offers.find((offer) => offer.slug === slug || offer.slug_en === slug || offer.slug_es === slug || offer.id === slug) ?? null;
  }

  const supabase = await createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);
  const query = supabase
    .from("offers")
    .select("*")
    .or(`slug.eq.${slug},slug_en.eq.${slug},slug_es.eq.${slug}`)
    .eq("is_active", true)
    .or(`start_date.is.null,start_date.lte.${today}`)
    .or(`end_date.is.null,end_date.gte.${today}`);
  const { data } = await query.maybeSingle();

  if (data) return data;
  if (!isUuid(slug)) return null;

  const { data: dataById } = await supabase
    .from("offers")
    .select("*")
    .eq("id", slug)
    .eq("is_active", true)
    .or(`start_date.is.null,start_date.lte.${today}`)
    .or(`end_date.is.null,end_date.gte.${today}`)
    .maybeSingle();
  return dataById ?? null;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  if (!hasSupabaseEnv()) {
    return fallbackContent.events.find((event) => event.slug === slug || event.slug_en === slug || event.slug_es === slug || event.id === slug) ?? null;
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("events").select("*").or(`slug.eq.${slug},slug_en.eq.${slug},slug_es.eq.${slug}`).eq("is_active", true).maybeSingle();

  if (data) return data;
  if (!isUuid(slug)) return null;

  const { data: dataById } = await supabase.from("events").select("*").eq("id", slug).eq("is_active", true).maybeSingle();
  return dataById ?? null;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
