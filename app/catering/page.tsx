import { CateringPageView } from "@/components/catering-page";
import { getSiteContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("catering", "en");
}

export default async function CateringPage() {
  return <CateringPageView content={await getSiteContent()} lang="en" />;
}
