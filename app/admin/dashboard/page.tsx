import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/admin/admin-panel";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { fallbackContent } from "@/lib/fallback-content";

export async function getAdminData() {
  if (!hasSupabaseEnv()) return fallbackContent;

  const supabase = await createSupabaseServerClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/admin/login");
  }

  const [brand, hero, about, offers, categories, products, gallery, events, testimonials, seoSettings, seoPages, localSeoBlocks, orderPlatforms] = await Promise.all([
    supabase.from("brand_settings").select("*").single(),
    supabase.from("hero_content").select("*").single(),
    supabase.from("about_content").select("*").single(),
    supabase.from("offers").select("*").order("is_featured", { ascending: false }).order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("sort_order"),
    supabase.from("products").select("*, category:categories(*)").order("created_at", { ascending: false }),
    supabase.from("gallery_images").select("*").order("sort_order"),
    supabase.from("events").select("*").order("event_date", { ascending: true }),
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    supabase.from("seo_settings").select("*").single(),
    supabase.from("seo_pages").select("*").order("page_key"),
    supabase.from("local_seo_blocks").select("*").order("created_at", { ascending: false }),
    supabase.from("order_platforms").select("*").order("sort_order")
  ]);

  return {
    brand: brand.data ?? fallbackContent.brand,
    hero: hero.data ?? fallbackContent.hero,
    about: about.data ?? fallbackContent.about,
    offers: offers.data ?? [],
    categories: categories.data ?? [],
    products: products.data ?? [],
    gallery: gallery.data ?? [],
    events: events.data ?? [],
    testimonials: testimonials.data ?? [],
    seoSettings: seoSettings.data ?? fallbackContent.seoSettings,
    seoPages: seoPages.data ?? [],
    localSeoBlocks: localSeoBlocks.data ?? [],
    orderPlatforms: orderPlatforms.data ?? []
  };
}

export default async function DashboardPage() {
  const initialData = await getAdminData();
  return <AdminPanel initialData={initialData} hasSupabase={hasSupabaseEnv()} />;
}
