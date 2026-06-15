# Origen Bistro & Bakery

Web administrable para restaurante/bakery creada con Next.js, TypeScript, Tailwind CSS y Supabase.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Conectar Supabase

1. Crea un proyecto en Supabase.
2. Copia `.env.example` como `.env.local`.
3. Completa:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Ejecuta el SQL de `supabase/schema.sql` en el SQL Editor de Supabase.
5. Crea un usuario en Supabase Auth para acceder a `/admin/login`.

## Panel admin

Ruta: `/admin`

Permite editar marca, logos, favicon, hero, ofertas, categorias, productos, galeria, eventos, testimonios, horarios, redes, WhatsApp, direccion y Google Maps.

Las imagenes se suben al bucket publico `origen-media`.

## Estructura publica

- `/` Home resumida y comercial.
- `/es` Home en espanol.
- `/menu` Menu completo por categorias.
- `/es/menu` Menu en espanol.
- `/about` Historia completa, imagenes y valores de marca.
- `/es/sobre-nosotros` Historia en espanol.
- `/offers` Ofertas activas.
- `/offers/[slug]` Pagina individual de cada oferta.
- `/es/ofertas` Ofertas en espanol.
- `/es/ofertas/[slug]` Pagina individual de cada oferta en espanol.
- `/events` Eventos activos.
- `/events/[slug]` Pagina individual de cada evento.
- `/es/eventos` Eventos en espanol.
- `/es/eventos/[slug]` Pagina individual de cada evento en espanol.
- `/contact` Contacto en ingles.
- `/es/contacto` Contacto en espanol.

Los productos que aparecen en la home se controlan marcandolos como `Destacado` en el panel admin. Todos los productos activos siguen apareciendo en `/menu`.

## SEO e idiomas

El idioma principal es ingles para Canada (`en-CA`) y el secundario es espanol (`es-CA`). El header incluye selector EN / ES.

El panel admin incluye:

- `SEO Settings` para SEO global, datos de negocio local y schema LocalBusiness.
- `SEO Pages` para metadata por pagina.
- `Local SEO Content` para bloques visibles de SEO local por pagina.
- `Order Platforms` para enlaces externos de pedido como Uber Eats, DoorDash, Toast, WhatsApp ordering u otros.

Tambien se generan `sitemap.xml` y `robots.txt`.

## Pedido online

No hay checkout interno. Los botones `Order Online` / `Ordenar` abren un selector con las plataformas activas configuradas en `/admin/order-platforms`.

Por defecto se incluyen Uber Eats y DoorDash. Cada plataforma puede tener logo, URL, texto EN/ES, estado activo e indice de orden.
