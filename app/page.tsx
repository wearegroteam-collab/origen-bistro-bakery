import { getSiteContent } from "@/lib/content";
import { PublicSite } from "@/components/public-site";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("home", "en");
}

export default async function Home() {
  const content = await getSiteContent();
  return <PublicSite content={content} lang="en" />;
}
