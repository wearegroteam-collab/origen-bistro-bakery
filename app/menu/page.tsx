import { getSiteContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { MenuPageView } from "@/components/menu-page";

export async function generateMetadata() {
  return buildPageMetadata("menu", "en");
}

export default async function MenuPage() {
  return <MenuPageView content={await getSiteContent()} lang="en" />;
}
