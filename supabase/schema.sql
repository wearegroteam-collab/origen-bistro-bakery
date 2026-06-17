create extension if not exists "pgcrypto";

create table if not exists public.brand_settings (
  id uuid primary key default gen_random_uuid(),
  logo_url text,
  secondary_logo_url text,
  favicon_url text,
  primary_color text not null default '#798372',
  accent_color text not null default '#C89B6A',
  phone text,
  whatsapp text,
  email text,
  instagram text,
  facebook text,
  tiktok text,
  address text,
  google_maps_embed text,
  hours text,
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_content (
  id uuid primary key default gen_random_uuid(),
  media_url text,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  title text not null,
  subtitle text not null,
  primary_button_label text not null default 'Reservar',
  primary_button_url text not null default '#ubicacion',
  secondary_button_label text not null default 'Ver menu',
  secondary_button_url text not null default '#menu',
  updated_at timestamptz not null default now()
);

create table if not exists public.about_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_url text,
  preview_title text,
  preview_body text,
  page_title text,
  page_body text,
  secondary_image_url text,
  values text,
  cta_label text,
  cta_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.catering_content (
  id uuid primary key default gen_random_uuid(),
  hero_image_url text,
  title text not null default '',
  title_en text,
  title_es text,
  subtitle text,
  subtitle_en text,
  subtitle_es text,
  description text,
  description_en text,
  description_es text,
  image_url text,
  gallery_urls text,
  service_types text,
  service_types_en text,
  service_types_es text,
  packages text,
  packages_en text,
  packages_es text,
  cta_label text,
  cta_label_en text,
  cta_label_es text,
  cta_url text,
  whatsapp_cta text,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  description text,
  full_description text,
  conditions text,
  image_url text,
  button_label text,
  button_url text,
  cta_label text,
  cta_url text,
  start_date date,
  end_date date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  description text,
  full_description text,
  conditions text,
  image_url text,
  button_label text,
  button_url text,
  cta_label text,
  cta_url text,
  start_date date,
  end_date date,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.about_content add column if not exists preview_title text;
alter table public.about_content add column if not exists preview_body text;
alter table public.about_content add column if not exists page_title text;
alter table public.about_content add column if not exists page_body text;
alter table public.about_content add column if not exists secondary_image_url text;
alter table public.about_content add column if not exists values text;
alter table public.about_content add column if not exists cta_label text;
alter table public.about_content add column if not exists cta_url text;

alter table public.banners add column if not exists slug text;
alter table public.banners add column if not exists full_description text;
alter table public.banners add column if not exists conditions text;
alter table public.banners add column if not exists cta_label text;
alter table public.banners add column if not exists cta_url text;
create unique index if not exists banners_slug_unique on public.banners(slug) where slug is not null;

alter table public.offers add column if not exists slug text;
alter table public.offers add column if not exists full_description text;
alter table public.offers add column if not exists conditions text;
alter table public.offers add column if not exists cta_label text;
alter table public.offers add column if not exists cta_url text;
alter table public.offers add column if not exists is_featured boolean not null default false;
create unique index if not exists offers_slug_unique on public.offers(slug) where slug is not null;

update public.hero_content
set primary_button_url = '/contact'
where primary_button_url is null or primary_button_url in ('#ubicacion', '#contact', '#');

update public.hero_content
set secondary_button_url = '/menu'
where secondary_button_url is null or secondary_button_url in ('#menu', '#');

update public.banners
set slug = trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'))
where slug is null and title is not null;

update public.banners
set button_url = '/promotions/' || slug
where slug is not null and (button_url is null or button_url = '' or button_url like '#%');

update public.banners
set cta_label = coalesce(cta_label, 'Reservar'), cta_url = coalesce(cta_url, '/contact')
where cta_label is null or cta_url is null;

insert into public.offers (slug, title, description, full_description, conditions, image_url, button_label, button_url, cta_label, cta_url, start_date, end_date, is_featured, is_active, created_at, updated_at)
select slug, title, description, full_description, conditions, image_url, coalesce(button_label, 'Ver oferta'), replace(coalesce(button_url, '/offers/' || slug), '/promotions/', '/offers/'), coalesce(cta_label, 'Reservar'), coalesce(cta_url, '/contact'), start_date, end_date, false, is_active, created_at, updated_at
from public.banners
where slug is not null
on conflict (slug) do nothing;

update public.offers
set button_url = '/offers/' || slug
where slug is not null and (button_url is null or button_url = '' or button_url like '#%' or button_url like '/promotions/%');

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  image_url text,
  category_id uuid references public.categories(id) on delete set null,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  image_url text,
  event_date date,
  event_time text,
  location text,
  description text,
  full_description text,
  button_label text,
  button_url text,
  cta_label text,
  cta_url text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events add column if not exists slug text;
alter table public.events add column if not exists event_time text;
alter table public.events add column if not exists location text;
alter table public.events add column if not exists full_description text;
alter table public.events add column if not exists cta_label text;
alter table public.events add column if not exists cta_url text;
alter table public.events add column if not exists is_featured boolean not null default false;
create unique index if not exists events_slug_unique on public.events(slug) where slug is not null;

update public.events
set slug = trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'))
where slug is null and title is not null;

update public.events
set button_url = '/events/' || slug
where slug is not null and (button_url is null or button_url = '' or button_url like '#%' or button_url like '/promotions/%');

update public.events
set cta_label = coalesce(cta_label, 'Reservar'), cta_url = coalesce(cta_url, '/contact')
where cta_label is null or cta_url is null;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  comment text not null,
  photo_url text,
  rating integer not null default 5 check (rating between 1 and 5),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.brand_settings (primary_color, accent_color, phone, whatsapp, email, address, hours)
select '#798372', '#C89B6A', '+1 555 000 1224', '15550001224', 'hello@origenbakery.com', '124 Artisan Avenue, Coral Harbour', 'Mon-Fri 7:30 AM - 6:00 PM
Sat-Sun 8:00 AM - 4:00 PM'
where not exists (select 1 from public.brand_settings);

insert into public.hero_content (title, subtitle, primary_button_label, primary_button_url, secondary_button_label, secondary_button_url)
select 'Origen Bistro & Bakery', 'Pan artesanal, brunches luminosos y platos de temporada servidos con alma editorial.', 'Reservar mesa', '/contact', 'Ver menu', '/menu'
where not exists (select 1 from public.hero_content);

insert into public.about_content (title, body, preview_title, preview_body, page_title, page_body, values, cta_label, cta_url)
select
  'Una mesa calida, hecha desde el origen',
  'Origen nace de masas madre lentas, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
  'Una mesa calida, hecha desde el origen',
  'Pan artesanal, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
  'Nuestra historia',
  'Origen Bistro & Bakery nace como un lugar de encuentro entre la panaderia artesanal y una cocina de bistro luminosa.',
  'Artesania lenta
Ingredientes honestos
Hospitalidad calida
Estetica boutique',
  'Ver menu',
  '/menu'
where not exists (select 1 from public.about_content);

insert into public.categories (name, slug, sort_order)
values
  ('Bakery', 'bakery', 1),
  ('Breakfast', 'breakfast', 2),
  ('Brunch', 'brunch', 3),
  ('Lunch', 'lunch', 4),
  ('Desserts', 'desserts', 5),
  ('Coffee', 'coffee', 6),
  ('Beverages', 'beverages', 7)
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public)
values ('origen-media', 'origen-media', true)
on conflict (id) do nothing;

alter table public.brand_settings enable row level security;
alter table public.hero_content enable row level security;
alter table public.about_content enable row level security;
alter table public.catering_content enable row level security;
alter table public.banners enable row level security;
alter table public.offers enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.gallery_images enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "Public can read brand settings" on public.brand_settings;
drop policy if exists "Public can read hero" on public.hero_content;
drop policy if exists "Public can read about" on public.about_content;
drop policy if exists "Public can read active catering" on public.catering_content;
drop policy if exists "Public can read active banners" on public.banners;
drop policy if exists "Public can read active offers" on public.offers;
drop policy if exists "Public can read active categories" on public.categories;
drop policy if exists "Public can read available products" on public.products;
drop policy if exists "Public can read active gallery" on public.gallery_images;
drop policy if exists "Public can read active events" on public.events;
drop policy if exists "Public can read active testimonials" on public.testimonials;
drop policy if exists "Authenticated admins manage brand" on public.brand_settings;
drop policy if exists "Authenticated admins manage hero" on public.hero_content;
drop policy if exists "Authenticated admins manage about" on public.about_content;
drop policy if exists "Authenticated admins manage catering" on public.catering_content;
drop policy if exists "Authenticated admins manage banners" on public.banners;
drop policy if exists "Authenticated admins manage offers" on public.offers;
drop policy if exists "Authenticated admins manage categories" on public.categories;
drop policy if exists "Authenticated admins manage products" on public.products;
drop policy if exists "Authenticated admins manage gallery" on public.gallery_images;
drop policy if exists "Authenticated admins manage events" on public.events;
drop policy if exists "Authenticated admins manage testimonials" on public.testimonials;

create policy "Public can read brand settings" on public.brand_settings for select using (true);
create policy "Public can read hero" on public.hero_content for select using (true);
create policy "Public can read about" on public.about_content for select using (true);
create policy "Public can read active catering" on public.catering_content for select using (is_active = true);
create policy "Public can read active banners" on public.banners for select using (is_active = true);
create policy "Public can read active offers" on public.offers for select using (is_active = true);
create policy "Public can read active categories" on public.categories for select using (is_active = true);
create policy "Public can read available products" on public.products for select using (is_available = true);
create policy "Public can read active gallery" on public.gallery_images for select using (is_active = true);
create policy "Public can read active events" on public.events for select using (is_active = true);
create policy "Public can read active testimonials" on public.testimonials for select using (is_active = true);

create policy "Authenticated admins manage brand" on public.brand_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage hero" on public.hero_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage about" on public.about_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage catering" on public.catering_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage banners" on public.banners for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage offers" on public.offers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage categories" on public.categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage products" on public.products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage gallery" on public.gallery_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage events" on public.events for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public media read" on storage.objects;
drop policy if exists "Authenticated media insert" on storage.objects;
drop policy if exists "Authenticated media update" on storage.objects;
drop policy if exists "Authenticated media delete" on storage.objects;

create policy "Public media read" on storage.objects for select using (bucket_id = 'origen-media');
create policy "Authenticated media insert" on storage.objects for insert with check (bucket_id = 'origen-media' and auth.role() = 'authenticated');
create policy "Authenticated media update" on storage.objects for update using (bucket_id = 'origen-media' and auth.role() = 'authenticated');
create policy "Authenticated media delete" on storage.objects for delete using (bucket_id = 'origen-media' and auth.role() = 'authenticated');

alter table public.brand_settings add column if not exists address_en text;
alter table public.brand_settings add column if not exists address_es text;
alter table public.brand_settings add column if not exists hours_en text;
alter table public.brand_settings add column if not exists hours_es text;

alter table public.hero_content add column if not exists title_en text;
alter table public.hero_content add column if not exists title_es text;
alter table public.hero_content add column if not exists subtitle_en text;
alter table public.hero_content add column if not exists subtitle_es text;
alter table public.hero_content add column if not exists primary_button_label_en text;
alter table public.hero_content add column if not exists primary_button_label_es text;
alter table public.hero_content add column if not exists secondary_button_label_en text;
alter table public.hero_content add column if not exists secondary_button_label_es text;

alter table public.about_content add column if not exists title_en text;
alter table public.about_content add column if not exists title_es text;
alter table public.about_content add column if not exists body_en text;
alter table public.about_content add column if not exists body_es text;
alter table public.about_content add column if not exists preview_title_en text;
alter table public.about_content add column if not exists preview_title_es text;
alter table public.about_content add column if not exists preview_body_en text;
alter table public.about_content add column if not exists preview_body_es text;
alter table public.about_content add column if not exists page_title_en text;
alter table public.about_content add column if not exists page_title_es text;
alter table public.about_content add column if not exists page_body_en text;
alter table public.about_content add column if not exists page_body_es text;
alter table public.about_content add column if not exists values_en text;
alter table public.about_content add column if not exists values_es text;
alter table public.about_content add column if not exists cta_label_en text;
alter table public.about_content add column if not exists cta_label_es text;

alter table public.offers add column if not exists slug_en text;
alter table public.offers add column if not exists slug_es text;
alter table public.offers add column if not exists title_en text;
alter table public.offers add column if not exists title_es text;
alter table public.offers add column if not exists description_en text;
alter table public.offers add column if not exists description_es text;
alter table public.offers add column if not exists full_description_en text;
alter table public.offers add column if not exists full_description_es text;
alter table public.offers add column if not exists conditions_en text;
alter table public.offers add column if not exists conditions_es text;
alter table public.offers add column if not exists button_label_en text;
alter table public.offers add column if not exists button_label_es text;
alter table public.offers add column if not exists cta_label_en text;
alter table public.offers add column if not exists cta_label_es text;

alter table public.events add column if not exists slug_en text;
alter table public.events add column if not exists slug_es text;
alter table public.events add column if not exists title_en text;
alter table public.events add column if not exists title_es text;
alter table public.events add column if not exists description_en text;
alter table public.events add column if not exists description_es text;
alter table public.events add column if not exists full_description_en text;
alter table public.events add column if not exists full_description_es text;
alter table public.events add column if not exists location_en text;
alter table public.events add column if not exists location_es text;
alter table public.events add column if not exists button_label_en text;
alter table public.events add column if not exists button_label_es text;
alter table public.events add column if not exists cta_label_en text;
alter table public.events add column if not exists cta_label_es text;

alter table public.categories add column if not exists name_en text;
alter table public.categories add column if not exists name_es text;
alter table public.categories add column if not exists slug_en text;
alter table public.categories add column if not exists slug_es text;

alter table public.products add column if not exists name_en text;
alter table public.products add column if not exists name_es text;
alter table public.products add column if not exists description_en text;
alter table public.products add column if not exists description_es text;

alter table public.gallery_images add column if not exists title_en text;
alter table public.gallery_images add column if not exists title_es text;

alter table public.testimonials add column if not exists name_en text;
alter table public.testimonials add column if not exists name_es text;
alter table public.testimonials add column if not exists comment_en text;
alter table public.testimonials add column if not exists comment_es text;

create table if not exists public.seo_settings (
  id uuid primary key default gen_random_uuid(),
  site_title_en text,
  site_title_es text,
  site_description_en text,
  site_description_es text,
  default_og_image text,
  business_name text,
  business_type text,
  phone text,
  email text,
  address text,
  city text default 'St. Catharines',
  province text default 'Ontario',
  country text default 'Canada',
  postal_code text,
  google_maps_url text,
  instagram text,
  facebook text,
  tiktok text,
  latitude text,
  longitude text,
  price_range text default '$$',
  cuisine text,
  accepts_reservations boolean default true,
  opening_hours_schema text,
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  meta_title_en text,
  meta_title_es text,
  meta_description_en text,
  meta_description_es text,
  og_title_en text,
  og_title_es text,
  og_description_en text,
  og_description_es text,
  og_image text,
  keywords_en text,
  keywords_es text,
  canonical_url text,
  index_page boolean not null default true,
  follow_page boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.local_seo_blocks (
  id uuid primary key default gen_random_uuid(),
  page_target text not null,
  heading_en text,
  heading_es text,
  content_en text,
  content_es text,
  keywords text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.seo_settings (site_title_en, site_title_es, site_description_en, site_description_es, business_name, business_type, phone, email, address, city, province, country, cuisine)
select 'Origen Bistro & Bakery | Bakery, Brunch and Coffee in St. Catharines', 'Origen Bistro & Bakery | Panaderia, brunch y cafe en St. Catharines', 'Premium bakery, brunch, coffee and bistro in St. Catharines, Ontario.', 'Bakery premium, brunch, cafe y bistro en St. Catharines, Ontario.', 'Origen Bistro & Bakery', 'Restaurant, Bakery, LocalBusiness', '+1 905 000 1224', 'hello@origenbakery.com', '124 Artisan Avenue', 'St. Catharines', 'Ontario', 'Canada', 'Bakery, Brunch, Coffee, Bistro'
where not exists (select 1 from public.seo_settings);

insert into public.seo_pages (page_key, meta_title_en, meta_title_es, meta_description_en, meta_description_es)
values
  ('home', 'Origen Bistro & Bakery | St. Catharines Bakery and Brunch', 'Origen Bistro & Bakery | Panaderia y brunch en St. Catharines', 'Artisan bakery, brunch, coffee and bistro in St. Catharines, Ontario.', 'Pan artesanal, brunch, cafe y bistro en St. Catharines, Ontario.'),
  ('menu', 'Menu | Origen Bistro & Bakery', 'Menu | Origen Bistro & Bakery', 'Explore our bakery, brunch, coffee and bistro menu in St. Catharines.', 'Explora nuestro menu de bakery, brunch, cafe y bistro en St. Catharines.'),
  ('about', 'About Origen Bistro & Bakery', 'Sobre Origen Bistro & Bakery', 'Learn about Origen Bistro & Bakery in St. Catharines, Ontario.', 'Conoce la historia de Origen Bistro & Bakery en St. Catharines, Ontario.'),
  ('offers', 'Offers | Origen Bistro & Bakery', 'Ofertas | Origen Bistro & Bakery', 'Seasonal offers from Origen Bistro & Bakery.', 'Ofertas de temporada de Origen Bistro & Bakery.'),
  ('events', 'Events | Origen Bistro & Bakery', 'Eventos | Origen Bistro & Bakery', 'Bakery, brunch and coffee events in St. Catharines.', 'Eventos de bakery, brunch y cafe en St. Catharines.'),
  ('catering', 'Catering | Origen Bistro & Bakery', 'Catering | Origen Bistro & Bakery', 'Bakery boxes, brunch catering and corporate catering in St. Catharines.', 'Bakery boxes, brunch catering y catering corporativo en St. Catharines.'),
  ('contact', 'Contact | Origen Bistro & Bakery', 'Contacto | Origen Bistro & Bakery', 'Contact and visit Origen Bistro & Bakery in St. Catharines.', 'Contacta y visita Origen Bistro & Bakery en St. Catharines.')
on conflict (page_key) do nothing;

insert into public.local_seo_blocks (page_target, heading_en, heading_es, content_en, content_es, keywords)
select 'home', 'Bakery and brunch in St. Catharines', 'Bakery y brunch en St. Catharines', 'Origen Bistro & Bakery brings artisan bread, brunch and coffee to St. Catharines with a warm boutique bakery experience.', 'Origen Bistro & Bakery trae pan artesanal, brunch y cafe a St. Catharines con una experiencia calida de bakery boutique.', 'best bakery in St. Catharines, brunch in St. Catharines, coffee shop in St. Catharines'
where not exists (select 1 from public.local_seo_blocks);

alter table public.seo_settings enable row level security;
alter table public.seo_pages enable row level security;
alter table public.local_seo_blocks enable row level security;

drop policy if exists "Public can read seo settings" on public.seo_settings;
drop policy if exists "Public can read seo pages" on public.seo_pages;
drop policy if exists "Public can read active local seo blocks" on public.local_seo_blocks;
drop policy if exists "Authenticated admins manage seo settings" on public.seo_settings;
drop policy if exists "Authenticated admins manage seo pages" on public.seo_pages;
drop policy if exists "Authenticated admins manage local seo blocks" on public.local_seo_blocks;

create policy "Public can read seo settings" on public.seo_settings for select using (true);
create policy "Public can read seo pages" on public.seo_pages for select using (true);
create policy "Public can read active local seo blocks" on public.local_seo_blocks for select using (is_active = true);
create policy "Authenticated admins manage seo settings" on public.seo_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage seo pages" on public.seo_pages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated admins manage local seo blocks" on public.local_seo_blocks for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists public.order_platforms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  order_url text not null,
  button_text_en text,
  button_text_es text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.order_platforms (name, order_url, button_text_en, button_text_es, sort_order, is_active)
values
  ('Uber Eats', 'https://www.ubereats.com', 'Order on Uber Eats', 'Ordenar en Uber Eats', 1, true),
  ('DoorDash', 'https://www.doordash.com', 'Order on DoorDash', 'Ordenar en DoorDash', 2, true)
on conflict do nothing;

alter table public.order_platforms enable row level security;

drop policy if exists "Public can read active order platforms" on public.order_platforms;
drop policy if exists "Authenticated admins manage order platforms" on public.order_platforms;

create policy "Public can read active order platforms" on public.order_platforms for select using (is_active = true);
create policy "Authenticated admins manage order platforms" on public.order_platforms for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
