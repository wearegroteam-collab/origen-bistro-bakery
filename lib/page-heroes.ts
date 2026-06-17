import type { PageHeroConfig, SiteContent } from "@/types/content";

export function pageHero(content: SiteContent, pageKey: string): PageHeroConfig | undefined {
  return content.pageHeroes.find((hero) => hero.page_key === pageKey);
}
