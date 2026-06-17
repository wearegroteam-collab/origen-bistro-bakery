import { CateringPageView } from "@/components/catering-page";
import { getSiteContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("catering", "es");
}

export default async function SpanishCateringPage() {
  return <CateringPageView content={await getSiteContent()} lang="es" />;
}
