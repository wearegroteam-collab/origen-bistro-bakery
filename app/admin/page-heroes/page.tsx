import { AdminPanel } from "@/components/admin/admin-panel";
import { getAdminData } from "@/app/admin/dashboard/page";
import { hasSupabaseEnv } from "@/lib/supabase/server";

export default async function AdminPageHeroesPage() {
  const initialData = await getAdminData();
  return <AdminPanel initialData={initialData} hasSupabase={hasSupabaseEnv()} initialSection="pageHeroes" />;
}
