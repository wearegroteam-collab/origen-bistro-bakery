import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export function whatsappUrl(value?: string | null) {
  if (!value) return "#";
  const cleaned = value.replace(/\D/g, "");
  return `https://wa.me/${cleaned}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function safeHref(value?: string | null, fallback = "/") {
  return value && value.trim() ? value : fallback;
}

export function offerHref(offer: { slug?: string | null; id: string }) {
  return offer.slug ? `/offers/${offer.slug}` : "/offers";
}

export function eventHref(event: { slug?: string | null; id: string }) {
  return event.slug ? `/events/${event.slug}` : "/events";
}
