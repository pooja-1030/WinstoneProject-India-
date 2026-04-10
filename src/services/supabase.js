import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Projects ──────────────────────────────────────────────
export const projectsService = {
  getAll: () => supabase.from('projects').select('*').order('created_at', { ascending: false }),
  insert: (data) => supabase.from('projects').insert(data).select().single(),
  update: (id, data) => supabase.from('projects').update(data).eq('id', id).select().single(),
  delete: (id) => supabase.from('projects').delete().eq('id', id),
};

// ─── Testimonials ──────────────────────────────────────────
export const testimonialsService = {
  getAll: () => supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
  insert: (data) => supabase.from('testimonials').insert(data).select().single(),
  update: (id, data) => supabase.from('testimonials').update(data).eq('id', id).select().single(),
  delete: (id) => supabase.from('testimonials').delete().eq('id', id),
};

// ─── Portfolio ─────────────────────────────────────────────
export const portfolioService = {
  getAll: () => supabase.from('portfolio').select('*').order('created_at', { ascending: false }),
  insert: (data) => supabase.from('portfolio').insert(data).select().single(),
  update: (id, data) => supabase.from('portfolio').update(data).eq('id', id).select().single(),
  delete: (id) => supabase.from('portfolio').delete().eq('id', id),
};

// ─── Contacts ──────────────────────────────────────────────
export const contactsService = {
  getAll: () => supabase.from('contacts').select('*').order('created_at', { ascending: false }),
  insert: (data) => supabase.from('contacts').insert(data).select().single(),
  delete: (id) => supabase.from('contacts').delete().eq('id', id),
};
