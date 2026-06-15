import type { SiteContent } from "@/types/content";

export const fallbackContent: SiteContent = {
  brand: {
    primary_color: "#798372",
    accent_color: "#C89B6A",
    phone: "+1 905 000 1224",
    whatsapp: "19050001224",
    email: "hello@origenbakery.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    address: "124 Artisan Avenue, St. Catharines, ON",
    address_en: "124 Artisan Avenue, St. Catharines, Ontario",
    address_es: "124 Artisan Avenue, St. Catharines, Ontario",
    hours: "Mon-Fri 7:30 AM - 6:00 PM\nSat-Sun 8:00 AM - 4:00 PM",
    hours_en: "Mon-Fri 7:30 AM - 6:00 PM\nSat-Sun 8:00 AM - 4:00 PM",
    hours_es: "Lun-Vie 7:30 AM - 6:00 PM\nSab-Dom 8:00 AM - 4:00 PM",
    google_maps_embed: ""
  },
  hero: {
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=85",
    title: "Origen Bistro & Bakery",
    title_en: "Origen Bistro & Bakery",
    title_es: "Origen Bistro & Bakery",
    subtitle: "Pan artesanal, brunches luminosos y platos de temporada servidos con alma editorial.",
    subtitle_en: "Artisan bread, bright brunches and seasonal bistro plates in St. Catharines.",
    subtitle_es: "Pan artesanal, brunches luminosos y platos de temporada en St. Catharines.",
    primary_button_label: "Reservar mesa",
    primary_button_label_en: "Reserve a table",
    primary_button_label_es: "Reservar mesa",
    primary_button_url: "/contact",
    secondary_button_label: "Ver menu",
    secondary_button_label_en: "View menu",
    secondary_button_label_es: "Ver menu",
    secondary_button_url: "/menu"
  },
  about: {
    title: "Una mesa calida, hecha desde el origen",
    body: "Origen nace de masas madre lentas, cafe cuidado y una cocina de bistro que celebra ingredientes honestos. Cada detalle esta pensado para sentirse cercano, premium y artesanal.",
    image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85",
    preview_title: "Una mesa calida, hecha desde el origen",
    preview_body: "Pan artesanal, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.",
    page_title: "Nuestra historia",
    page_body:
      "Origen Bistro & Bakery nace como un lugar de encuentro entre la panaderia artesanal y una cocina de bistro luminosa. Trabajamos con masas lentas, ingredientes de temporada y una estetica calida que invita a quedarse.\n\nLa marca celebra lo hecho con tiempo: panes de corteza profunda, pasteleria delicada, cafe servido con precision y platos pensados para compartir.",
    secondary_image_url: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=85",
    values: "Artesania lenta\nIngredientes honestos\nHospitalidad calida\nEstetica boutique",
    cta_label: "Ver menu",
    cta_url: "/menu"
  },
  offers: [
    {
      id: "seed-offer",
      slug: "brunch-de-temporada",
      slug_en: "seasonal-brunch",
      slug_es: "brunch-de-temporada",
      title: "Brunch de temporada",
      title_en: "Seasonal brunch",
      title_es: "Brunch de temporada",
      description: "Nueva carta de brunch con tostadas, bowls, viennoiserie y mocktails frescos.",
      description_en: "A seasonal brunch menu with toast, bowls, viennoiserie and fresh mocktails.",
      description_es: "Nueva carta de brunch con tostadas, bowls, viennoiserie y mocktails frescos.",
      full_description:
        "Una seleccion de brunch creada para disfrutar con calma: tostadas sobre sourdough, bowls frescos, viennoiserie horneada cada manana y bebidas de temporada.",
      conditions: "Disponible por tiempo limitado. Sujeto a disponibilidad diaria.",
      image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85",
      button_label: "Conocer oferta",
      button_label_en: "View offer",
      button_label_es: "Conocer oferta",
      button_url: "/offers/brunch-de-temporada",
      cta_label: "Reservar por WhatsApp",
      cta_label_en: "Reserve on WhatsApp",
      cta_label_es: "Reservar por WhatsApp",
      cta_url: "/contact",
      is_featured: true,
      is_active: true
    }
  ],
  categories: ["Bakery", "Breakfast", "Brunch", "Lunch", "Desserts", "Coffee", "Beverages"].map((name, index) => ({
    id: `seed-category-${index}`,
    name,
    name_en: name,
    name_es: name,
    slug: name.toLowerCase().replaceAll(" ", "-"),
    sort_order: index,
    is_active: true
  })),
  products: [
    {
      id: "seed-product-1",
      name: "Croissant de almendra",
      name_en: "Almond croissant",
      name_es: "Croissant de almendra",
      description: "Laminado artesanal, crema de almendra y azucar glass.",
      description_en: "Hand-laminated pastry, almond cream and powdered sugar.",
      description_es: "Laminado artesanal, crema de almendra y azucar glass.",
      price: 6.5,
      image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85",
      category_id: "seed-category-0",
      is_available: true,
      is_featured: true
    },
    {
      id: "seed-product-2",
      name: "Origen brunch plate",
      name_en: "Origen brunch plate",
      name_es: "Plato brunch Origen",
      description: "Huevos suaves, pan sourdough, vegetales asados y ensalada fresca.",
      description_en: "Soft eggs, sourdough bread, roasted vegetables and fresh salad.",
      description_es: "Huevos suaves, pan sourdough, vegetales asados y ensalada fresca.",
      price: 18,
      image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",
      category_id: "seed-category-2",
      is_available: true,
      is_featured: true
    },
    {
      id: "seed-product-3",
      name: "Latte de la casa",
      name_en: "House latte",
      name_es: "Latte de la casa",
      description: "Espresso balanceado con leche sedosa o alternativa vegetal.",
      description_en: "Balanced espresso with silky milk or plant-based alternative.",
      description_es: "Espresso balanceado con leche sedosa o alternativa vegetal.",
      price: 5,
      image_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
      category_id: "seed-category-5",
      is_available: true,
      is_featured: false
    }
  ],
  gallery: [
    {
      id: "seed-gallery-1",
      title: "Mesa Origen",
      image_url: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=900&q=85",
      sort_order: 1,
      is_active: true
    },
    {
      id: "seed-gallery-2",
      title: "Panaderia",
      image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85",
      sort_order: 2,
      is_active: true
    }
  ],
  events: [
    {
      id: "seed-event-1",
      slug: "tarde-de-pasteleria-francesa",
      slug_en: "french-pastry-afternoon",
      slug_es: "tarde-de-pasteleria-francesa",
      title: "Tarde de pasteleria francesa",
      title_en: "French pastry afternoon",
      title_es: "Tarde de pasteleria francesa",
      event_date: "2026-07-12",
      event_time: "4:00 PM",
      location: "Origen Bistro & Bakery",
      location_en: "Origen Bistro & Bakery",
      location_es: "Origen Bistro & Bakery",
      description: "Degustacion de mini tartes, eclairs y maridaje con cafe filtrado.",
      description_en: "Mini tartes, eclairs and filtered coffee pairing.",
      description_es: "Degustacion de mini tartes, eclairs y maridaje con cafe filtrado.",
      full_description: "Una experiencia de tarde para conocer el lado mas delicado de nuestra pasteleria: mini tartes, eclairs, masas laminadas y cafe filtrado servido en mesa.",
      image_url: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1000&q=85",
      button_label: "Ver evento",
      button_label_en: "View event",
      button_label_es: "Ver evento",
      button_url: "/events/tarde-de-pasteleria-francesa",
      cta_label: "Reservar",
      cta_label_en: "Reserve",
      cta_label_es: "Reservar",
      cta_url: "/contact",
      is_featured: true,
      is_active: true
    }
  ],
  testimonials: [
    {
      id: "seed-testimonial-1",
      name: "Mariana L.",
      name_en: "Mariana L.",
      name_es: "Mariana L.",
      comment: "El lugar se siente cuidado de principio a fin. El brunch y la pasteleria son impecables.",
      comment_en: "The place feels thoughtful from beginning to end. Brunch and pastry are impeccable.",
      comment_es: "El lugar se siente cuidado de principio a fin. El brunch y la pasteleria son impecables.",
      rating: 5,
      is_active: true
    }
  ],
  seoSettings: {
    site_title_en: "Origen Bistro & Bakery | Bakery, Brunch and Coffee in St. Catharines",
    site_title_es: "Origen Bistro & Bakery | Panaderia, brunch y cafe en St. Catharines",
    site_description_en: "Premium bakery, brunch, coffee and bistro in St. Catharines, Ontario.",
    site_description_es: "Bakery premium, brunch, cafe y bistro en St. Catharines, Ontario.",
    business_name: "Origen Bistro & Bakery",
    business_type: "Restaurant, Bakery, LocalBusiness",
    phone: "+1 905 000 1224",
    email: "hello@origenbakery.com",
    address: "124 Artisan Avenue",
    city: "St. Catharines",
    province: "Ontario",
    country: "Canada",
    postal_code: "",
    google_maps_url: "",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    price_range: "$$",
    cuisine: "Bakery, Brunch, Coffee, Bistro",
    accepts_reservations: true
  },
  seoPages: [
    {
      id: "seo-home",
      page_key: "home",
      meta_title_en: "Origen Bistro & Bakery | St. Catharines Bakery and Brunch",
      meta_title_es: "Origen Bistro & Bakery | Panaderia y brunch en St. Catharines",
      meta_description_en: "Visit Origen Bistro & Bakery for artisan bakery, brunch, coffee and warm boutique dining in St. Catharines, Ontario.",
      meta_description_es: "Visita Origen Bistro & Bakery para pan artesanal, brunch, cafe y cocina boutique en St. Catharines, Ontario.",
      index_page: true,
      follow_page: true
    }
  ],
  localSeoBlocks: [
    {
      id: "local-seo-home",
      page_target: "home",
      heading_en: "Bakery and brunch in St. Catharines",
      heading_es: "Bakery y brunch en St. Catharines",
      content_en: "Origen Bistro & Bakery brings artisan bread, coffee and seasonal brunch to St. Catharines with a warm boutique bakery experience.",
      content_es: "Origen Bistro & Bakery trae pan artesanal, cafe y brunch de temporada a St. Catharines con una experiencia calida de bakery boutique.",
      keywords: "best bakery in St. Catharines, brunch in St. Catharines, coffee shop in St. Catharines",
      is_active: true
    }
  ],
  orderPlatforms: [
    {
      id: "uber-eats",
      name: "Uber Eats",
      order_url: "https://www.ubereats.com",
      button_text_en: "Order on Uber Eats",
      button_text_es: "Ordenar en Uber Eats",
      is_active: true,
      sort_order: 1
    },
    {
      id: "doordash",
      name: "DoorDash",
      order_url: "https://www.doordash.com",
      button_text_en: "Order on DoorDash",
      button_text_es: "Ordenar en DoorDash",
      is_active: true,
      sort_order: 2
    }
  ]
};
