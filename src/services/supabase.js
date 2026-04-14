import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL     || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Projects ───────────────────────────────────────────────────────────────
export const projectsService = {
  getAll:    ()          => supabase.from('projects').select('*').order('created_at', { ascending: false }),
  insert:    (data)      => supabase.from('projects').insert(data).select().single(),
  update:    (id, data)  => supabase.from('projects').update(data).eq('id', id).select().single(),
  delete:    (id)        => supabase.from('projects').delete().eq('id', id),
  getFeatured: ()        => supabase.from('projects').select('*').eq('featured', true).order('created_at', { ascending: false }),
};

// ─── Testimonials ────────────────────────────────────────────────────────────
export const testimonialsService = {
  getAll:  ()          => supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
  insert:  (data)      => supabase.from('testimonials').insert(data).select().single(),
  update:  (id, data)  => supabase.from('testimonials').update(data).eq('id', id).select().single(),
  delete:  (id)        => supabase.from('testimonials').delete().eq('id', id),
};

// ─── Portfolio ───────────────────────────────────────────────────────────────
export const portfolioService = {
  getAll:  ()          => supabase.from('portfolio').select('*').order('created_at', { ascending: false }),
  insert:  (data)      => supabase.from('portfolio').insert(data).select().single(),
  update:  (id, data)  => supabase.from('portfolio').update(data).eq('id', id).select().single(),
  delete:  (id)        => supabase.from('portfolio').delete().eq('id', id),
};

// ─── Contacts / Leads ────────────────────────────────────────────────────────
export const contactsService = {
  getAll:        ()               => supabase.from('contacts').select('*').order('created_at', { ascending: false }),
  getNew:        ()               => supabase.from('contacts').select('*').eq('status', 'new').order('created_at', { ascending: false }),
  insert:        (data)           => supabase.from('contacts').insert(data).select().single(),
  updateStatus:  (id, status)     => supabase.from('contacts').update({ status }).eq('id', id),
  delete:        (id)             => supabase.from('contacts').delete().eq('id', id),
};

// ─── Services ────────────────────────────────────────────────────────────────
export const servicesService = {
  getAll:  ()          => supabase.from('services').select('*').order('sort_order', { ascending: true }),
  insert:  (data)      => supabase.from('services').insert(data).select().single(),
  update:  (id, data)  => supabase.from('services').update(data).eq('id', id).select().single(),
  delete:  (id)        => supabase.from('services').delete().eq('id', id),
};

// ─── Why Choose Us ───────────────────────────────────────────────────────────
export const whyChooseUsService = {
  getAll:  ()          => supabase.from('why_choose_us').select('*').order('sort_order', { ascending: true }),
  insert:  (data)      => supabase.from('why_choose_us').insert(data).select().single(),
  update:  (id, data)  => supabase.from('why_choose_us').update(data).eq('id', id).select().single(),
  delete:  (id)        => supabase.from('why_choose_us').delete().eq('id', id),
};

// ─── Site Settings (key-value store) ─────────────────────────────────────────
export const settingsService = {
  getAll:  ()             => supabase.from('site_settings').select('*'),
  upsert:  (key, value)   => supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' }),
  upsertMany: (rows)      => supabase.from('site_settings').upsert(rows, { onConflict: 'key' }),
};

// ─── SEO Settings ────────────────────────────────────────────────────────────
export const seoService = {
  getAll:       ()          => supabase.from('seo_settings').select('*').order('page', { ascending: true }),
  getByPage:    (page)      => supabase.from('seo_settings').select('*').eq('page', page).single(),
  upsert:       (data)      => supabase.from('seo_settings').upsert(data, { onConflict: 'page' }),
};
