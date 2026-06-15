"use client";

import { useMemo, useState } from "react";
import { LogOut, Plus, Save, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SiteContent } from "@/types/content";
import { slugify } from "@/lib/utils";

type FieldType = "text" | "textarea" | "number" | "date" | "checkbox" | "image" | "select";
type Field = { name: string; label: string; type?: FieldType; required?: boolean; options?: { label: string; value: string }[] };
type SectionKey = "brand" | "hero" | "about" | "offers" | "categories" | "products" | "gallery" | "events" | "testimonials" | "seoSettings" | "seoPages" | "localSeoBlocks" | "orderPlatforms";

const singleTables: Record<string, string> = {
  brand: "brand_settings",
  hero: "hero_content",
  about: "about_content",
  seoSettings: "seo_settings"
};

const collectionTables: Record<string, string> = {
  offers: "offers",
  categories: "categories",
  products: "products",
  gallery: "gallery_images",
  events: "events",
  testimonials: "testimonials",
  seoPages: "seo_pages",
  localSeoBlocks: "local_seo_blocks",
  orderPlatforms: "order_platforms"
};

const tabs: { key: SectionKey; label: string }[] = [
  { key: "brand", label: "Marca" },
  { key: "hero", label: "Hero" },
  { key: "offers", label: "Ofertas" },
  { key: "categories", label: "Categorias" },
  { key: "products", label: "Menu" },
  { key: "gallery", label: "Galeria" },
  { key: "events", label: "Eventos" },
  { key: "testimonials", label: "Testimonios" },
  { key: "about", label: "Nosotros" },
  { key: "seoSettings", label: "SEO Settings" },
  { key: "seoPages", label: "SEO Pages" },
  { key: "localSeoBlocks", label: "Local SEO Content" },
  { key: "orderPlatforms", label: "Order Platforms" }
];

const fieldMap: Record<SectionKey, Field[]> = {
  brand: [
    { name: "logo_url", label: "Logo principal", type: "image" },
    { name: "secondary_logo_url", label: "Logo secundario", type: "image" },
    { name: "favicon_url", label: "Favicon", type: "image" },
    { name: "primary_color", label: "Color principal", required: true },
    { name: "accent_color", label: "Color acento", required: true },
    { name: "phone", label: "Telefono" },
    { name: "whatsapp", label: "WhatsApp" },
    { name: "email", label: "Correo" },
    { name: "instagram", label: "Instagram" },
    { name: "facebook", label: "Facebook" },
    { name: "tiktok", label: "TikTok" },
    { name: "address", label: "Direccion", type: "textarea" },
    { name: "address_en", label: "Address EN", type: "textarea" },
    { name: "address_es", label: "Direccion ES", type: "textarea" },
    { name: "hours", label: "Horarios", type: "textarea" },
    { name: "hours_en", label: "Hours EN", type: "textarea" },
    { name: "hours_es", label: "Horarios ES", type: "textarea" },
    { name: "google_maps_embed", label: "Google Maps embed" }
  ],
  hero: [
    { name: "media_url", label: "Imagen o video", type: "image" },
    { name: "media_type", label: "Tipo de media", type: "select", options: [{ label: "Imagen", value: "image" }, { label: "Video", value: "video" }] },
    { name: "title", label: "Titulo", required: true },
    { name: "title_en", label: "Title EN" },
    { name: "title_es", label: "Titulo ES" },
    { name: "subtitle", label: "Subtitulo", type: "textarea", required: true },
    { name: "subtitle_en", label: "Subtitle EN", type: "textarea" },
    { name: "subtitle_es", label: "Subtitulo ES", type: "textarea" },
    { name: "primary_button_label", label: "Boton principal", required: true },
    { name: "primary_button_label_en", label: "Primary button EN" },
    { name: "primary_button_label_es", label: "Boton principal ES" },
    { name: "primary_button_url", label: "Enlace principal", required: true },
    { name: "secondary_button_label", label: "Boton secundario", required: true },
    { name: "secondary_button_label_en", label: "Secondary button EN" },
    { name: "secondary_button_label_es", label: "Boton secundario ES" },
    { name: "secondary_button_url", label: "Enlace secundario", required: true }
  ],
  about: [
    { name: "preview_title", label: "Titulo preview home" },
    { name: "preview_title_en", label: "Preview title EN" },
    { name: "preview_title_es", label: "Preview title ES" },
    { name: "preview_body", label: "Texto preview home", type: "textarea" },
    { name: "title", label: "Titulo base", required: true },
    { name: "title_en", label: "Title EN" },
    { name: "title_es", label: "Titulo ES" },
    { name: "body", label: "Texto base", type: "textarea", required: true },
    { name: "page_title", label: "Titulo pagina About" },
    { name: "page_title_en", label: "About page title EN" },
    { name: "page_title_es", label: "Titulo About ES" },
    { name: "page_body", label: "Texto completo pagina About", type: "textarea" },
    { name: "image_url", label: "Imagen principal", type: "image" },
    { name: "secondary_image_url", label: "Imagen secundaria", type: "image" },
    { name: "values", label: "Valores o caracteristicas (uno por linea)", type: "textarea" },
    { name: "values_en", label: "Values EN", type: "textarea" },
    { name: "values_es", label: "Valores ES", type: "textarea" },
    { name: "cta_label", label: "Texto CTA opcional" },
    { name: "cta_url", label: "Enlace CTA opcional" }
  ],
  offers: [
    { name: "title", label: "Titulo", required: true },
    { name: "slug", label: "Slug editable" },
    { name: "slug_en", label: "Slug EN" },
    { name: "slug_es", label: "Slug ES" },
    { name: "description", label: "Descripcion corta", type: "textarea" },
    { name: "title_en", label: "Title EN" },
    { name: "title_es", label: "Titulo ES" },
    { name: "description_en", label: "Short description EN", type: "textarea" },
    { name: "description_es", label: "Descripcion corta ES", type: "textarea" },
    { name: "full_description", label: "Descripcion completa", type: "textarea" },
    { name: "conditions", label: "Condiciones", type: "textarea" },
    { name: "image_url", label: "Imagen", type: "image" },
    { name: "button_label", label: "Texto del boton en listados" },
    { name: "button_url", label: "URL pagina oferta (se autocompleta)" },
    { name: "cta_label", label: "Texto CTA pagina individual" },
    { name: "cta_url", label: "Destino CTA pagina individual" },
    { name: "start_date", label: "Fecha inicio", type: "date" },
    { name: "end_date", label: "Fecha fin", type: "date" },
    { name: "is_featured", label: "Destacada en home", type: "checkbox" },
    { name: "is_active", label: "Activo", type: "checkbox" }
  ],
  categories: [
    { name: "name", label: "Nombre", required: true },
    { name: "name_en", label: "Name EN" },
    { name: "name_es", label: "Nombre ES" },
    { name: "slug", label: "Slug", required: true },
    { name: "sort_order", label: "Orden", type: "number" },
    { name: "is_active", label: "Activo", type: "checkbox" }
  ],
  products: [
    { name: "name", label: "Nombre", required: true },
    { name: "name_en", label: "Name EN" },
    { name: "name_es", label: "Nombre ES" },
    { name: "description", label: "Descripcion", type: "textarea" },
    { name: "description_en", label: "Description EN", type: "textarea" },
    { name: "description_es", label: "Descripcion ES", type: "textarea" },
    { name: "price", label: "Precio", type: "number", required: true },
    { name: "image_url", label: "Imagen", type: "image" },
    { name: "category_id", label: "Categoria", type: "select" },
    { name: "is_available", label: "Disponible", type: "checkbox" },
    { name: "is_featured", label: "Destacado", type: "checkbox" }
  ],
  gallery: [
    { name: "title", label: "Titulo" },
    { name: "title_en", label: "Title EN" },
    { name: "title_es", label: "Titulo ES" },
    { name: "image_url", label: "Imagen", type: "image", required: true },
    { name: "sort_order", label: "Orden", type: "number" },
    { name: "is_active", label: "Activo", type: "checkbox" }
  ],
  events: [
    { name: "title", label: "Titulo", required: true },
    { name: "title_en", label: "Title EN" },
    { name: "title_es", label: "Titulo ES" },
    { name: "slug", label: "Slug editable" },
    { name: "slug_en", label: "Slug EN" },
    { name: "slug_es", label: "Slug ES" },
    { name: "image_url", label: "Imagen", type: "image" },
    { name: "event_date", label: "Fecha", type: "date" },
    { name: "event_time", label: "Hora" },
    { name: "location", label: "Ubicacion" },
    { name: "location_en", label: "Location EN" },
    { name: "location_es", label: "Ubicacion ES" },
    { name: "description", label: "Descripcion", type: "textarea" },
    { name: "description_en", label: "Description EN", type: "textarea" },
    { name: "description_es", label: "Descripcion ES", type: "textarea" },
    { name: "full_description", label: "Descripcion completa", type: "textarea" },
    { name: "button_label", label: "Texto del boton en listados" },
    { name: "button_url", label: "URL pagina evento (se autocompleta)" },
    { name: "cta_label", label: "Texto CTA pagina individual" },
    { name: "cta_url", label: "Destino CTA pagina individual" },
    { name: "is_featured", label: "Destacado en home", type: "checkbox" },
    { name: "is_active", label: "Activo", type: "checkbox" }
  ],
  testimonials: [
    { name: "name", label: "Nombre", required: true },
    { name: "name_en", label: "Name EN" },
    { name: "name_es", label: "Nombre ES" },
    { name: "comment", label: "Comentario", type: "textarea", required: true },
    { name: "comment_en", label: "Comment EN", type: "textarea" },
    { name: "comment_es", label: "Comentario ES", type: "textarea" },
    { name: "photo_url", label: "Foto", type: "image" },
    { name: "rating", label: "Calificacion", type: "number", required: true },
    { name: "is_active", label: "Activo", type: "checkbox" }
  ],
  seoSettings: [
    { name: "site_title_en", label: "Site title EN" },
    { name: "site_title_es", label: "Site title ES" },
    { name: "site_description_en", label: "Site description EN", type: "textarea" },
    { name: "site_description_es", label: "Site description ES", type: "textarea" },
    { name: "default_og_image", label: "Default OG image", type: "image" },
    { name: "business_name", label: "Business name" },
    { name: "business_type", label: "Business type" },
    { name: "phone", label: "Phone" },
    { name: "email", label: "Email" },
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "province", label: "Province" },
    { name: "country", label: "Country" },
    { name: "postal_code", label: "Postal code" },
    { name: "google_maps_url", label: "Google Maps URL" },
    { name: "instagram", label: "Instagram" },
    { name: "facebook", label: "Facebook" },
    { name: "tiktok", label: "TikTok" },
    { name: "latitude", label: "Latitude" },
    { name: "longitude", label: "Longitude" },
    { name: "price_range", label: "Price range" },
    { name: "cuisine", label: "Cuisine" },
    { name: "accepts_reservations", label: "Accepts reservations", type: "checkbox" },
    { name: "opening_hours_schema", label: "Opening hours schema", type: "textarea" }
  ],
  seoPages: [
    { name: "page_key", label: "Page key", required: true },
    { name: "meta_title_en", label: "Meta title EN" },
    { name: "meta_title_es", label: "Meta title ES" },
    { name: "meta_description_en", label: "Meta description EN", type: "textarea" },
    { name: "meta_description_es", label: "Meta description ES", type: "textarea" },
    { name: "og_title_en", label: "OG title EN" },
    { name: "og_title_es", label: "OG title ES" },
    { name: "og_description_en", label: "OG description EN", type: "textarea" },
    { name: "og_description_es", label: "OG description ES", type: "textarea" },
    { name: "og_image", label: "OG image", type: "image" },
    { name: "keywords_en", label: "Keywords EN", type: "textarea" },
    { name: "keywords_es", label: "Keywords ES", type: "textarea" },
    { name: "canonical_url", label: "Canonical URL" },
    { name: "index_page", label: "Index", type: "checkbox" },
    { name: "follow_page", label: "Follow", type: "checkbox" }
  ],
  localSeoBlocks: [
    { name: "page_target", label: "Page target", required: true },
    { name: "heading_en", label: "Heading EN" },
    { name: "heading_es", label: "Heading ES" },
    { name: "content_en", label: "Content EN", type: "textarea" },
    { name: "content_es", label: "Content ES", type: "textarea" },
    { name: "keywords", label: "Keywords", type: "textarea" },
    { name: "is_active", label: "Active", type: "checkbox" }
  ],
  orderPlatforms: [
    { name: "name", label: "Nombre", required: true },
    { name: "logo_url", label: "Logo o icono", type: "image" },
    { name: "order_url", label: "URL del pedido", required: true },
    { name: "button_text_en", label: "Button text EN" },
    { name: "button_text_es", label: "Texto boton ES" },
    { name: "sort_order", label: "Orden", type: "number" },
    { name: "is_active", label: "Activo", type: "checkbox" }
  ]
};

const emptyBySection: Partial<Record<SectionKey, Record<string, unknown>>> = {
  offers: { title: "", slug: "", description: "", full_description: "", conditions: "", image_url: "", button_label: "Ver oferta", button_url: "", cta_label: "Reservar", cta_url: "/contact", start_date: "", end_date: "", is_featured: false, is_active: true },
  categories: { name: "", slug: "", sort_order: 0, is_active: true },
  products: { name: "", description: "", price: 0, image_url: "", category_id: "", is_available: true, is_featured: false },
  gallery: { title: "", image_url: "", sort_order: 0, is_active: true },
  events: { title: "", slug: "", image_url: "", event_date: "", event_time: "", location: "", description: "", full_description: "", button_label: "Ver evento", button_url: "", cta_label: "Reservar", cta_url: "/contact", is_featured: false, is_active: true },
  testimonials: { name: "", comment: "", photo_url: "", rating: 5, is_active: true },
  seoPages: { page_key: "", index_page: true, follow_page: true },
  localSeoBlocks: { page_target: "home", heading_en: "", heading_es: "", content_en: "", content_es: "", keywords: "", is_active: true },
  orderPlatforms: { name: "", logo_url: "", order_url: "", button_text_en: "", button_text_es: "", sort_order: 0, is_active: true }
};

export function AdminPanel({ initialData, hasSupabase, initialSection = "brand" }: { initialData: SiteContent; hasSupabase: boolean; initialSection?: SectionKey }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [active, setActive] = useState<SectionKey>(initialSection);
  const initialValue = singleTables[initialSection] ? initialData[initialSection as "brand" | "hero" | "about" | "seoSettings"] : emptyBySection[initialSection];
  const [form, setForm] = useState<Record<string, unknown>>(initialValue as Record<string, unknown>);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const stats = [
    ["Ofertas activas", data.offers.filter((item) => item.is_active).length],
    ["Eventos activos", data.events.filter((item) => item.is_active).length],
    ["Productos destacados", data.products.filter((item) => item.is_featured).length],
    ["Imagenes galeria", data.gallery.length]
  ];

  const fields = useMemo(() => {
    if (active !== "products") return fieldMap[active];
    return fieldMap.products.map((field) =>
      field.name === "category_id"
        ? { ...field, options: data.categories.map((category) => ({ label: category.name, value: category.id })) }
        : field
    );
  }, [active, data.categories]);

  function openSection(section: SectionKey) {
    setActive(section);
    setMessage("");
    const value = singleTables[section] ? data[section as "brand" | "hero" | "about" | "seoSettings"] : emptyBySection[section];
    setForm({ ...(value as Record<string, unknown>) });
  }

  function editRecord(record: Record<string, unknown>) {
    setForm({ ...record });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateField(name: string, value: unknown) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function uploadFile(name: string, file?: File) {
    if (!file || !hasSupabase) return;
    setSaving(true);
    const supabase = createSupabaseBrowserClient();
    const path = `${name}/${Date.now()}-${file.name.replaceAll(" ", "-")}`;
    const { error } = await supabase.storage.from("origen-media").upload(path, file, { upsert: true });
    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }
    const { data: publicUrl } = supabase.storage.from("origen-media").getPublicUrl(path);
    updateField(name, publicUrl.publicUrl);
    setSaving(false);
  }

  async function saveForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasSupabase) {
      setMessage("Conecta Supabase en .env.local para guardar cambios reales.");
      return;
    }

    const missing = fields.find((field) => field.required && !form[field.name]);
    if (missing) {
      setMessage(`Completa el campo: ${missing.label}`);
      return;
    }

    setSaving(true);
    setMessage("");
    const supabase = createSupabaseBrowserClient();
    const table = singleTables[active] ?? collectionTables[active];
    const payload = normalizePayload(form);
    if (active === "offers" || active === "events") {
      const slug = String(payload.slug || slugify(String(payload.title || "")));
      payload.slug = slug;
      payload.button_url = payload.button_url || `/${active}/${slug}`;
    }
    const query = payload.id ? supabase.from(table).update(payload).eq("id", payload.id) : supabase.from(table).insert(payload);
    const { error } = await query;

    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Cambios guardados.");
    router.refresh();
  }

  async function deleteRecord(id: string) {
    if (!hasSupabase || !collectionTables[active]) return;
    const confirmed = window.confirm("Quieres eliminar este elemento?");
    if (!confirmed) return;

    setSaving(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from(collectionTables[active]).delete().eq("id", id);
    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setData((current) => ({ ...current, [active]: (current[active] as { id: string }[]).filter((item) => item.id !== id) }));
    setForm({ ...(emptyBySection[active] || {}) });
  }

  async function signOut() {
    if (hasSupabase) {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
    router.refresh();
  }

  const list = collectionTables[active] ? (data[active] as Record<string, unknown>[]) : [];

  return (
    <main className="min-h-screen bg-cultured text-ink">
      <div className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-title text-4xl">Origen Admin</p>
            <p className="text-sm text-ink/60">Panel para editar contenido, menu, imagenes y configuracion.</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-bold">
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          {!hasSupabase && (
            <div className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Modo demo: agrega tus variables de Supabase en <strong>.env.local</strong> para activar login, guardado y subida de imagenes.
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => openSection(tab.key)} className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${active === tab.key ? "bg-ink text-white" : "bg-white text-ink/70 hover:text-ink"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-4">
            {stats.map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white p-5 shadow-soft">
                <p className="text-sm text-ink/50">{label}</p>
                <p className="mt-2 font-title text-4xl">{value}</p>
              </div>
            ))}
          </div>

          <form onSubmit={saveForm} className="rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="font-heading text-3xl">{tabs.find((tab) => tab.key === active)?.label}</h1>
              <div className="flex gap-3">
                {collectionTables[active] && (
                  <button type="button" onClick={() => setForm({ ...(emptyBySection[active] || {}) })} className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-bold">
                    <Plus size={16} /> Nuevo
                  </button>
                )}
                <button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-spanish px-5 py-2 text-sm font-bold text-white disabled:opacity-60">
                  <Save size={16} /> {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <FieldControl key={field.name} field={field} value={form[field.name]} onChange={(value) => updateField(field.name, value)} onUpload={(file) => uploadFile(field.name, file)} disabled={!hasSupabase || saving} />
              ))}
            </div>
            {message && <p className="mt-5 rounded-xl bg-cultured p-3 text-sm text-ink/70">{message}</p>}
          </form>

          {collectionTables[active] && (
            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <h2 className="font-heading text-2xl">Elementos</h2>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[680px] border-separate border-spacing-y-2 text-left text-sm">
                  <thead className="text-ink/45">
                    <tr>
                      <th className="px-4 py-2">Nombre</th>
                      <th className="px-4 py-2">Detalle</th>
                      <th className="px-4 py-2">Estado</th>
                      <th className="px-4 py-2 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((record) => (
                      <tr key={String(record.id)} className="bg-cultured">
                        <td className="rounded-l-xl px-4 py-3 font-bold">{String(record.title || record.name || "Sin titulo")}</td>
                        <td className="px-4 py-3 text-ink/60">{String(record.description || record.comment || record.slug || record.event_date || "")}</td>
                        <td className="px-4 py-3 text-ink/60">{record.is_active === false || record.is_available === false ? "Inactivo" : "Activo"}</td>
                        <td className="rounded-r-xl px-4 py-3 text-right">
                          <button type="button" onClick={() => editRecord(record)} className="mr-2 rounded-full bg-white px-4 py-2 font-bold">Editar</button>
                          <button type="button" onClick={() => deleteRecord(String(record.id))} className="inline-flex rounded-full bg-red-50 px-3 py-2 text-red-700"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function FieldControl({ field, value, onChange, onUpload, disabled }: { field: Field; value: unknown; onChange: (value: unknown) => void; onUpload: (file?: File) => void; disabled: boolean }) {
  const baseClass = "mt-2 w-full rounded-xl border border-pastel bg-cultured px-4 py-3 outline-none focus:border-spanish";

  return (
    <label className={field.type === "textarea" ? "md:col-span-2" : ""}>
      <span className="text-sm font-bold text-ink/75">{field.label}</span>
      {field.type === "textarea" ? (
        <textarea required={field.required} value={String(value || "")} onChange={(event) => onChange(event.target.value)} className={`${baseClass} min-h-32`} />
      ) : field.type === "checkbox" ? (
        <span className="mt-3 flex items-center gap-3 rounded-xl bg-cultured p-4">
          <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
          <span className="text-sm text-ink/60">Activado</span>
        </span>
      ) : field.type === "select" ? (
        <select required={field.required} value={String(value || "")} onChange={(event) => onChange(event.target.value || null)} className={baseClass}>
          <option value="">Selecciona una opcion</option>
          {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : field.type === "image" ? (
        <div className="mt-2 space-y-3">
          <input value={String(value || "")} onChange={(event) => onChange(event.target.value)} className={baseClass} placeholder="URL de imagen o video" />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-bold">
            <Upload size={16} /> Subir archivo
            <input type="file" accept="image/*,video/*" disabled={disabled} onChange={(event) => onUpload(event.target.files?.[0])} className="hidden" />
          </label>
        </div>
      ) : (
        <input required={field.required} type={field.type || "text"} value={String(value ?? "")} onChange={(event) => onChange(field.type === "number" ? Number(event.target.value) : event.target.value)} className={baseClass} />
      )}
    </label>
  );
}

function normalizePayload(form: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(form)
      .filter(([key]) => key !== "category")
      .map(([key, value]) => [key, value === "" ? null : value])
  );
}
