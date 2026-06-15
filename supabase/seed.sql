-- Seed data for the single global Origen Bistro & Bakery website.
-- Supabase Auth users are admins only; all content is global.

do $$
declare
  brand_id uuid;
  hero_id uuid;
  about_id uuid;
  seo_id uuid;
begin
  select id into brand_id from public.brand_settings limit 1;

  if brand_id is null then
    insert into public.brand_settings (
      primary_color, accent_color, phone, whatsapp, email, instagram, facebook, tiktok,
      address, address_en, address_es, hours, hours_en, hours_es, google_maps_embed
    )
    values (
      '#798372', '#C89B6A', '+1 905 000 1224', '19050001224', 'hello@origenbakery.com',
      'https://instagram.com', 'https://facebook.com', 'https://tiktok.com',
      '124 Artisan Avenue, St. Catharines, ON',
      '124 Artisan Avenue, St. Catharines, Ontario',
      '124 Artisan Avenue, St. Catharines, Ontario',
      'Mon-Fri 7:30 AM - 6:00 PM
Sat-Sun 8:00 AM - 4:00 PM',
      'Mon-Fri 7:30 AM - 6:00 PM
Sat-Sun 8:00 AM - 4:00 PM',
      'Lun-Vie 7:30 AM - 6:00 PM
Sab-Dom 8:00 AM - 4:00 PM',
      ''
    );
  else
    update public.brand_settings
    set
      primary_color = '#798372',
      accent_color = '#C89B6A',
      phone = '+1 905 000 1224',
      whatsapp = '19050001224',
      email = 'hello@origenbakery.com',
      instagram = 'https://instagram.com',
      facebook = 'https://facebook.com',
      tiktok = 'https://tiktok.com',
      address = '124 Artisan Avenue, St. Catharines, ON',
      address_en = '124 Artisan Avenue, St. Catharines, Ontario',
      address_es = '124 Artisan Avenue, St. Catharines, Ontario',
      hours = 'Mon-Fri 7:30 AM - 6:00 PM
Sat-Sun 8:00 AM - 4:00 PM',
      hours_en = 'Mon-Fri 7:30 AM - 6:00 PM
Sat-Sun 8:00 AM - 4:00 PM',
      hours_es = 'Lun-Vie 7:30 AM - 6:00 PM
Sab-Dom 8:00 AM - 4:00 PM',
      google_maps_embed = coalesce(google_maps_embed, ''),
      updated_at = now()
    where id = brand_id;
  end if;

  select id into hero_id from public.hero_content limit 1;

  if hero_id is null then
    insert into public.hero_content (
      media_url, media_type, title, title_en, title_es, subtitle, subtitle_en, subtitle_es,
      primary_button_label, primary_button_label_en, primary_button_label_es, primary_button_url,
      secondary_button_label, secondary_button_label_en, secondary_button_label_es, secondary_button_url
    )
    values (
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=85',
      'image',
      'Origen Bistro & Bakery',
      'Origen Bistro & Bakery',
      'Origen Bistro & Bakery',
      'Pan artesanal, brunches luminosos y platos de temporada servidos con alma editorial.',
      'Artisan bread, bright brunches and seasonal bistro plates in St. Catharines.',
      'Pan artesanal, brunches luminosos y platos de temporada en St. Catharines.',
      'Reservar mesa',
      'Reserve a table',
      'Reservar mesa',
      '/contact',
      'Ver menu',
      'View menu',
      'Ver menu',
      '/menu'
    );
  else
    update public.hero_content
    set
      media_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=85',
      media_type = 'image',
      title = 'Origen Bistro & Bakery',
      title_en = 'Origen Bistro & Bakery',
      title_es = 'Origen Bistro & Bakery',
      subtitle = 'Pan artesanal, brunches luminosos y platos de temporada servidos con alma editorial.',
      subtitle_en = 'Artisan bread, bright brunches and seasonal bistro plates in St. Catharines.',
      subtitle_es = 'Pan artesanal, brunches luminosos y platos de temporada en St. Catharines.',
      primary_button_label = 'Reservar mesa',
      primary_button_label_en = 'Reserve a table',
      primary_button_label_es = 'Reservar mesa',
      primary_button_url = '/contact',
      secondary_button_label = 'Ver menu',
      secondary_button_label_en = 'View menu',
      secondary_button_label_es = 'Ver menu',
      secondary_button_url = '/menu',
      updated_at = now()
    where id = hero_id;
  end if;

  select id into about_id from public.about_content limit 1;

  if about_id is null then
    insert into public.about_content (
      title, title_en, title_es, body, body_en, body_es, image_url,
      preview_title, preview_title_en, preview_title_es, preview_body, preview_body_en, preview_body_es,
      page_title, page_title_en, page_title_es, page_body, page_body_en, page_body_es,
      secondary_image_url, values, values_en, values_es, cta_label, cta_label_en, cta_label_es, cta_url
    )
    values (
      'Una mesa calida, hecha desde el origen',
      'A warm table, made from origin',
      'Una mesa calida, hecha desde el origen',
      'Origen nace de masas madre lentas, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
      'Origen begins with slow sourdough, thoughtful coffee and bistro cooking built around honest ingredients.',
      'Origen nace de masas madre lentas, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
      'Una mesa calida, hecha desde el origen',
      'A warm table, made from origin',
      'Una mesa calida, hecha desde el origen',
      'Pan artesanal, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
      'Artisan bread, thoughtful coffee and bistro cooking built around honest ingredients.',
      'Pan artesanal, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
      'Nuestra historia',
      'Our story',
      'Nuestra historia',
      'Origen Bistro & Bakery nace como un lugar de encuentro entre la panaderia artesanal y una cocina de bistro luminosa. Trabajamos con masas lentas, ingredientes de temporada y una estetica calida que invita a quedarse.

La marca celebra lo hecho con tiempo: panes de corteza profunda, pasteleria delicada, cafe servido con precision y platos pensados para compartir.',
      'Origen Bistro & Bakery is a meeting place between artisan bakery and bright bistro cooking. We work with slow doughs, seasonal ingredients and a warm boutique aesthetic made for lingering.

The brand celebrates what is made with time: deep-crusted bread, delicate pastry, carefully served coffee and plates designed to share.',
      'Origen Bistro & Bakery nace como un lugar de encuentro entre la panaderia artesanal y una cocina de bistro luminosa. Trabajamos con masas lentas, ingredientes de temporada y una estetica calida que invita a quedarse.

La marca celebra lo hecho con tiempo: panes de corteza profunda, pasteleria delicada, cafe servido con precision y platos pensados para compartir.',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=85',
      'Artesania lenta
Ingredientes honestos
Hospitalidad calida
Estetica boutique',
      'Slow craft
Honest ingredients
Warm hospitality
Boutique aesthetic',
      'Artesania lenta
Ingredientes honestos
Hospitalidad calida
Estetica boutique',
      'Ver menu',
      'View menu',
      'Ver menu',
      '/menu'
    );
  else
    update public.about_content
    set
      title = 'Una mesa calida, hecha desde el origen',
      title_en = 'A warm table, made from origin',
      title_es = 'Una mesa calida, hecha desde el origen',
      body = 'Origen nace de masas madre lentas, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
      body_en = 'Origen begins with slow sourdough, thoughtful coffee and bistro cooking built around honest ingredients.',
      body_es = 'Origen nace de masas madre lentas, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
      image_url = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
      preview_title = 'Una mesa calida, hecha desde el origen',
      preview_title_en = 'A warm table, made from origin',
      preview_title_es = 'Una mesa calida, hecha desde el origen',
      preview_body = 'Pan artesanal, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
      preview_body_en = 'Artisan bread, thoughtful coffee and bistro cooking built around honest ingredients.',
      preview_body_es = 'Pan artesanal, cafe cuidado y una cocina de bistro que celebra ingredientes honestos.',
      page_title = 'Nuestra historia',
      page_title_en = 'Our story',
      page_title_es = 'Nuestra historia',
      page_body = 'Origen Bistro & Bakery nace como un lugar de encuentro entre la panaderia artesanal y una cocina de bistro luminosa. Trabajamos con masas lentas, ingredientes de temporada y una estetica calida que invita a quedarse.

La marca celebra lo hecho con tiempo: panes de corteza profunda, pasteleria delicada, cafe servido con precision y platos pensados para compartir.',
      page_body_en = 'Origen Bistro & Bakery is a meeting place between artisan bakery and bright bistro cooking. We work with slow doughs, seasonal ingredients and a warm boutique aesthetic made for lingering.

The brand celebrates what is made with time: deep-crusted bread, delicate pastry, carefully served coffee and plates designed to share.',
      page_body_es = 'Origen Bistro & Bakery nace como un lugar de encuentro entre la panaderia artesanal y una cocina de bistro luminosa. Trabajamos con masas lentas, ingredientes de temporada y una estetica calida que invita a quedarse.

La marca celebra lo hecho con tiempo: panes de corteza profunda, pasteleria delicada, cafe servido con precision y platos pensados para compartir.',
      secondary_image_url = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=85',
      values = 'Artesania lenta
Ingredientes honestos
Hospitalidad calida
Estetica boutique',
      values_en = 'Slow craft
Honest ingredients
Warm hospitality
Boutique aesthetic',
      values_es = 'Artesania lenta
Ingredientes honestos
Hospitalidad calida
Estetica boutique',
      cta_label = 'Ver menu',
      cta_label_en = 'View menu',
      cta_label_es = 'Ver menu',
      cta_url = '/menu',
      updated_at = now()
    where id = about_id;
  end if;

  select id into seo_id from public.seo_settings limit 1;

  if seo_id is null then
    insert into public.seo_settings (
      site_title_en, site_title_es, site_description_en, site_description_es, business_name, business_type,
      phone, email, address, city, province, country, postal_code, google_maps_url, instagram, facebook, tiktok,
      price_range, cuisine, accepts_reservations
    )
    values (
      'Origen Bistro & Bakery | Bakery, Brunch and Coffee in St. Catharines',
      'Origen Bistro & Bakery | Panaderia, brunch y cafe en St. Catharines',
      'Premium bakery, brunch, coffee and bistro in St. Catharines, Ontario.',
      'Bakery premium, brunch, cafe y bistro en St. Catharines, Ontario.',
      'Origen Bistro & Bakery',
      'Restaurant, Bakery, LocalBusiness',
      '+1 905 000 1224',
      'hello@origenbakery.com',
      '124 Artisan Avenue',
      'St. Catharines',
      'Ontario',
      'Canada',
      '',
      '',
      'https://instagram.com',
      'https://facebook.com',
      'https://tiktok.com',
      '$$',
      'Bakery, Brunch, Coffee, Bistro',
      true
    );
  else
    update public.seo_settings
    set
      site_title_en = 'Origen Bistro & Bakery | Bakery, Brunch and Coffee in St. Catharines',
      site_title_es = 'Origen Bistro & Bakery | Panaderia, brunch y cafe en St. Catharines',
      site_description_en = 'Premium bakery, brunch, coffee and bistro in St. Catharines, Ontario.',
      site_description_es = 'Bakery premium, brunch, cafe y bistro en St. Catharines, Ontario.',
      business_name = 'Origen Bistro & Bakery',
      business_type = 'Restaurant, Bakery, LocalBusiness',
      phone = '+1 905 000 1224',
      email = 'hello@origenbakery.com',
      address = '124 Artisan Avenue',
      city = 'St. Catharines',
      province = 'Ontario',
      country = 'Canada',
      postal_code = '',
      google_maps_url = '',
      instagram = 'https://instagram.com',
      facebook = 'https://facebook.com',
      tiktok = 'https://tiktok.com',
      price_range = '$$',
      cuisine = 'Bakery, Brunch, Coffee, Bistro',
      accepts_reservations = true,
      updated_at = now()
    where id = seo_id;
  end if;
end $$;

insert into public.categories (name, name_en, name_es, slug, slug_en, slug_es, sort_order, is_active)
values
  ('Bakery', 'Bakery', 'Bakery', 'bakery', 'bakery', 'bakery', 1, true),
  ('Breakfast', 'Breakfast', 'Breakfast', 'breakfast', 'breakfast', 'breakfast', 2, true),
  ('Brunch', 'Brunch', 'Brunch', 'brunch', 'brunch', 'brunch', 3, true),
  ('Lunch', 'Lunch', 'Lunch', 'lunch', 'lunch', 'lunch', 4, true),
  ('Desserts', 'Desserts', 'Desserts', 'desserts', 'desserts', 'desserts', 5, true),
  ('Coffee', 'Coffee', 'Coffee', 'coffee', 'coffee', 'coffee', 6, true),
  ('Beverages', 'Beverages', 'Beverages', 'beverages', 'beverages', 'beverages', 7, true)
on conflict (slug) do update
set name = excluded.name,
    name_en = excluded.name_en,
    name_es = excluded.name_es,
    slug_en = excluded.slug_en,
    slug_es = excluded.slug_es,
    sort_order = excluded.sort_order,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.offers (
  slug, slug_en, slug_es, title, title_en, title_es, description, description_en, description_es,
  full_description, full_description_en, full_description_es, conditions, conditions_en, conditions_es,
  image_url, button_label, button_label_en, button_label_es, button_url,
  cta_label, cta_label_en, cta_label_es, cta_url, is_featured, is_active
)
values (
  'brunch-de-temporada',
  'seasonal-brunch',
  'brunch-de-temporada',
  'Brunch de temporada',
  'Seasonal brunch',
  'Brunch de temporada',
  'Nueva carta de brunch con tostadas, bowls, viennoiserie y mocktails frescos.',
  'A seasonal brunch menu with toast, bowls, viennoiserie and fresh mocktails.',
  'Nueva carta de brunch con tostadas, bowls, viennoiserie y mocktails frescos.',
  'Una seleccion de brunch creada para disfrutar con calma: tostadas sobre sourdough, bowls frescos, viennoiserie horneada cada manana y bebidas de temporada.',
  'A brunch selection made to enjoy slowly: sourdough toast, fresh bowls, daily viennoiserie and seasonal drinks.',
  'Una seleccion de brunch creada para disfrutar con calma: tostadas sobre sourdough, bowls frescos, viennoiserie horneada cada manana y bebidas de temporada.',
  'Disponible por tiempo limitado. Sujeto a disponibilidad diaria.',
  'Available for a limited time. Subject to daily availability.',
  'Disponible por tiempo limitado. Sujeto a disponibilidad diaria.',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85',
  'Conocer oferta',
  'View offer',
  'Conocer oferta',
  '/offers/seasonal-brunch',
  'Reservar por WhatsApp',
  'Reserve on WhatsApp',
  'Reservar por WhatsApp',
  '/contact',
  true,
  true
)
on conflict (slug) do update
set slug_en = excluded.slug_en,
    slug_es = excluded.slug_es,
    title = excluded.title,
    title_en = excluded.title_en,
    title_es = excluded.title_es,
    description = excluded.description,
    description_en = excluded.description_en,
    description_es = excluded.description_es,
    full_description = excluded.full_description,
    full_description_en = excluded.full_description_en,
    full_description_es = excluded.full_description_es,
    conditions = excluded.conditions,
    conditions_en = excluded.conditions_en,
    conditions_es = excluded.conditions_es,
    image_url = excluded.image_url,
    button_label = excluded.button_label,
    button_label_en = excluded.button_label_en,
    button_label_es = excluded.button_label_es,
    button_url = excluded.button_url,
    cta_label = excluded.cta_label,
    cta_label_en = excluded.cta_label_en,
    cta_label_es = excluded.cta_label_es,
    cta_url = excluded.cta_url,
    is_featured = excluded.is_featured,
    is_active = excluded.is_active,
    updated_at = now();

-- Menu items are stored in public.products in the application.
insert into public.products (
  name, name_en, name_es, description, description_en, description_es, price, image_url, category_id, is_available, is_featured
)
select
  'Croissant de almendra',
  'Almond croissant',
  'Croissant de almendra',
  'Laminado artesanal, crema de almendra y azucar glass.',
  'Hand-laminated pastry, almond cream and powdered sugar.',
  'Laminado artesanal, crema de almendra y azucar glass.',
  6.50,
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
  (select id from public.categories where slug = 'bakery' limit 1),
  true,
  true
where not exists (select 1 from public.products where name_en = 'Almond croissant');

insert into public.products (
  name, name_en, name_es, description, description_en, description_es, price, image_url, category_id, is_available, is_featured
)
select
  'Origen brunch plate',
  'Origen brunch plate',
  'Plato brunch Origen',
  'Huevos suaves, pan sourdough, vegetales asados y ensalada fresca.',
  'Soft eggs, sourdough bread, roasted vegetables and fresh salad.',
  'Huevos suaves, pan sourdough, vegetales asados y ensalada fresca.',
  18.00,
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85',
  (select id from public.categories where slug = 'brunch' limit 1),
  true,
  true
where not exists (select 1 from public.products where name_en = 'Origen brunch plate');

insert into public.products (
  name, name_en, name_es, description, description_en, description_es, price, image_url, category_id, is_available, is_featured
)
select
  'Latte de la casa',
  'House latte',
  'Latte de la casa',
  'Espresso balanceado con leche sedosa o alternativa vegetal.',
  'Balanced espresso with silky milk or plant-based alternative.',
  'Espresso balanceado con leche sedosa o alternativa vegetal.',
  5.00,
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
  (select id from public.categories where slug = 'coffee' limit 1),
  true,
  false
where not exists (select 1 from public.products where name_en = 'House latte');

insert into public.gallery_images (title, title_en, title_es, image_url, sort_order, is_active)
select 'Mesa Origen', 'Origen table', 'Mesa Origen', 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=900&q=85', 1, true
where not exists (select 1 from public.gallery_images where image_url = 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=900&q=85');

insert into public.gallery_images (title, title_en, title_es, image_url, sort_order, is_active)
select 'Panaderia', 'Bakery', 'Panaderia', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85', 2, true
where not exists (select 1 from public.gallery_images where image_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85');

insert into public.events (
  slug, slug_en, slug_es, title, title_en, title_es, event_date, event_time, location, location_en, location_es,
  description, description_en, description_es, full_description, full_description_en, full_description_es,
  image_url, button_label, button_label_en, button_label_es, button_url, cta_label, cta_label_en, cta_label_es, cta_url,
  is_featured, is_active
)
values (
  'tarde-de-pasteleria-francesa',
  'french-pastry-afternoon',
  'tarde-de-pasteleria-francesa',
  'Tarde de pasteleria francesa',
  'French pastry afternoon',
  'Tarde de pasteleria francesa',
  '2026-07-12',
  '4:00 PM',
  'Origen Bistro & Bakery',
  'Origen Bistro & Bakery',
  'Origen Bistro & Bakery',
  'Degustacion de mini tartes, eclairs y maridaje con cafe filtrado.',
  'Mini tartes, eclairs and filtered coffee pairing.',
  'Degustacion de mini tartes, eclairs y maridaje con cafe filtrado.',
  'Una experiencia de tarde para conocer el lado mas delicado de nuestra pasteleria: mini tartes, eclairs, masas laminadas y cafe filtrado servido en mesa.',
  'An afternoon experience to discover the most delicate side of our pastry: mini tartes, eclairs, laminated doughs and filtered coffee served at the table.',
  'Una experiencia de tarde para conocer el lado mas delicado de nuestra pasteleria: mini tartes, eclairs, masas laminadas y cafe filtrado servido en mesa.',
  'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1000&q=85',
  'Ver evento',
  'View event',
  'Ver evento',
  '/events/french-pastry-afternoon',
  'Reservar',
  'Reserve',
  'Reservar',
  '/contact',
  true,
  true
)
on conflict (slug) do update
set slug_en = excluded.slug_en,
    slug_es = excluded.slug_es,
    title = excluded.title,
    title_en = excluded.title_en,
    title_es = excluded.title_es,
    event_date = excluded.event_date,
    event_time = excluded.event_time,
    location = excluded.location,
    location_en = excluded.location_en,
    location_es = excluded.location_es,
    description = excluded.description,
    description_en = excluded.description_en,
    description_es = excluded.description_es,
    full_description = excluded.full_description,
    full_description_en = excluded.full_description_en,
    full_description_es = excluded.full_description_es,
    image_url = excluded.image_url,
    button_label = excluded.button_label,
    button_label_en = excluded.button_label_en,
    button_label_es = excluded.button_label_es,
    button_url = excluded.button_url,
    cta_label = excluded.cta_label,
    cta_label_en = excluded.cta_label_en,
    cta_label_es = excluded.cta_label_es,
    cta_url = excluded.cta_url,
    is_featured = excluded.is_featured,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.testimonials (name, name_en, name_es, comment, comment_en, comment_es, rating, is_active)
select
  'Mariana L.',
  'Mariana L.',
  'Mariana L.',
  'El lugar se siente cuidado de principio a fin. El brunch y la pasteleria son impecables.',
  'The place feels thoughtful from beginning to end. Brunch and pastry are impeccable.',
  'El lugar se siente cuidado de principio a fin. El brunch y la pasteleria son impecables.',
  5,
  true
where not exists (select 1 from public.testimonials where name = 'Mariana L.');

insert into public.order_platforms (name, order_url, button_text_en, button_text_es, sort_order, is_active)
select 'Uber Eats', 'https://www.ubereats.com', 'Order on Uber Eats', 'Ordenar en Uber Eats', 1, true
where not exists (select 1 from public.order_platforms where name = 'Uber Eats');

insert into public.order_platforms (name, order_url, button_text_en, button_text_es, sort_order, is_active)
select 'DoorDash', 'https://www.doordash.com', 'Order on DoorDash', 'Ordenar en DoorDash', 2, true
where not exists (select 1 from public.order_platforms where name = 'DoorDash');

insert into public.seo_pages (page_key, meta_title_en, meta_title_es, meta_description_en, meta_description_es, index_page, follow_page)
values
  ('home', 'Origen Bistro & Bakery | St. Catharines Bakery and Brunch', 'Origen Bistro & Bakery | Panaderia y brunch en St. Catharines', 'Visit Origen Bistro & Bakery for artisan bakery, brunch, coffee and warm boutique dining in St. Catharines, Ontario.', 'Visita Origen Bistro & Bakery para pan artesanal, brunch, cafe y cocina boutique en St. Catharines, Ontario.', true, true),
  ('menu', 'Menu | Origen Bistro & Bakery', 'Menu | Origen Bistro & Bakery', 'Explore our bakery, brunch, coffee and bistro menu in St. Catharines.', 'Explora nuestro menu de bakery, brunch, cafe y bistro en St. Catharines.', true, true),
  ('about', 'About Origen Bistro & Bakery', 'Sobre Origen Bistro & Bakery', 'Learn about Origen Bistro & Bakery in St. Catharines, Ontario.', 'Conoce la historia de Origen Bistro & Bakery en St. Catharines, Ontario.', true, true),
  ('offers', 'Offers | Origen Bistro & Bakery', 'Ofertas | Origen Bistro & Bakery', 'Seasonal offers from Origen Bistro & Bakery.', 'Ofertas de temporada de Origen Bistro & Bakery.', true, true),
  ('events', 'Events | Origen Bistro & Bakery', 'Eventos | Origen Bistro & Bakery', 'Bakery, brunch and coffee events in St. Catharines.', 'Eventos de bakery, brunch y cafe en St. Catharines.', true, true),
  ('contact', 'Contact | Origen Bistro & Bakery', 'Contacto | Origen Bistro & Bakery', 'Contact and visit Origen Bistro & Bakery in St. Catharines.', 'Contacta y visita Origen Bistro & Bakery en St. Catharines.', true, true)
on conflict (page_key) do update
set meta_title_en = excluded.meta_title_en,
    meta_title_es = excluded.meta_title_es,
    meta_description_en = excluded.meta_description_en,
    meta_description_es = excluded.meta_description_es,
    index_page = excluded.index_page,
    follow_page = excluded.follow_page,
    updated_at = now();

insert into public.local_seo_blocks (page_target, heading_en, heading_es, content_en, content_es, keywords, is_active)
select
  'home',
  'Bakery and brunch in St. Catharines',
  'Bakery y brunch en St. Catharines',
  'Origen Bistro & Bakery brings artisan bread, coffee and seasonal brunch to St. Catharines with a warm boutique bakery experience.',
  'Origen Bistro & Bakery trae pan artesanal, cafe y brunch de temporada a St. Catharines con una experiencia calida de bakery boutique.',
  'best bakery in St. Catharines, brunch in St. Catharines, coffee shop in St. Catharines',
  true
where not exists (select 1 from public.local_seo_blocks where page_target = 'home' and heading_en = 'Bakery and brunch in St. Catharines');
