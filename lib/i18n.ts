export type Lang = "en" | "es";

export const defaultLang: Lang = "en";

export const labels = {
  en: {
    home: "Home",
    menu: "Menu",
    offers: "Offers",
    events: "Events",
    about: "About",
    contact: "Contact",
    reserve: "Reserve",
    offersEvents: "Offers + Events",
    seasonBest: "The best of the season",
    viewOffers: "View offers",
    viewEvents: "View events",
    featuredOffer: "Featured offer",
    featuredEvent: "Featured event",
    featuredProducts: "Featured products",
    houseFavorites: "House favorites",
    viewMenu: "View menu",
    gallery: "Gallery",
    galleryTitle: "Textures, tables and Origen moments",
    reviewsTitle: "What guests are saying",
    locationTitle: "Location and hours",
    visitUs: "Visit us",
    orderOnline: "Order Online",
    order: "Order",
    choosePlatform: "Choose your preferred delivery platform",
    orderFavourites: "Order your favourites online"
  },
  es: {
    home: "Inicio",
    menu: "Menu",
    offers: "Ofertas",
    events: "Eventos",
    about: "Sobre nosotros",
    contact: "Contacto",
    reserve: "Reservar",
    offersEvents: "Ofertas + Eventos",
    seasonBest: "Lo mejor de la temporada",
    viewOffers: "Ver ofertas",
    viewEvents: "Ver eventos",
    featuredOffer: "Oferta destacada",
    featuredEvent: "Evento destacado",
    featuredProducts: "Productos destacados",
    houseFavorites: "Favoritos de la casa",
    viewMenu: "Ver menu",
    gallery: "Galeria",
    galleryTitle: "Texturas, mesas y momentos Origen",
    reviewsTitle: "Lo que dicen nuestros clientes",
    locationTitle: "Ubicacion y horarios",
    visitUs: "Visitanos",
    orderOnline: "Ordenar",
    order: "Ordenar",
    choosePlatform: "Elige tu plataforma de pedido",
    orderFavourites: "Ordena tus favoritos online"
  }
};

export function t(lang: Lang) {
  return labels[lang];
}

export function pick<T extends Record<string, unknown>>(item: T, field: string, lang: Lang) {
  const localized = item[`${field}_${lang}`];
  const english = item[`${field}_en`];
  const base = item[field];
  return String(localized || english || base || "");
}

export function localizedSlug(item: { slug?: string | null; slug_en?: string | null; slug_es?: string | null; id: string }, lang: Lang) {
  return (lang === "es" ? item.slug_es : item.slug_en) || item.slug || "";
}

export function pagePath(key: string, lang: Lang) {
  const paths: Record<string, { en: string; es: string }> = {
    home: { en: "/", es: "/es" },
    menu: { en: "/menu", es: "/es/menu" },
    about: { en: "/about", es: "/es/sobre-nosotros" },
    offers: { en: "/offers", es: "/es/ofertas" },
    events: { en: "/events", es: "/es/eventos" },
    contact: { en: "/contact", es: "/es/contacto" }
  };
  return paths[key]?.[lang] || "/";
}

export function offerPath(item: { slug?: string | null; slug_en?: string | null; slug_es?: string | null; id: string }, lang: Lang) {
  const slug = localizedSlug(item, lang);
  return slug ? `${pagePath("offers", lang)}/${slug}` : pagePath("offers", lang);
}

export function eventPath(item: { slug?: string | null; slug_en?: string | null; slug_es?: string | null; id: string }, lang: Lang) {
  const slug = localizedSlug(item, lang);
  return slug ? `${pagePath("events", lang)}/${slug}` : pagePath("events", lang);
}

export function alternatePath(pathKey: string, currentLang: Lang) {
  return pagePath(pathKey, currentLang === "en" ? "es" : "en");
}
