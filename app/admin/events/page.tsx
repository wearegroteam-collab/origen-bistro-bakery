import { AdminPanel } from "@/components/admin/admin-panel";
import { hasSupabaseEnv } from "@/lib/supabase/server";
import { getAdminData } from "@/app/admin/dashboard/page";

export default async function AdminEventsPage() {
  const initialData = await getAdminData();
  return <AdminPanel initialData={initialData} hasSupabase={hasSupabaseEnv()} initialSection="events" />;
}
