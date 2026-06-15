import { getSiteContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { MenuPageView } from "@/components/menu-page";

export async function generateMetadata() {
  return buildPageMetadata("menu", "es");
}

export default async function SpanishMenuPage() {
  return <MenuPageView content={await getSiteContent()} lang="es" />;
}
