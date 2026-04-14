-- ═══════════════════════════════════════════════════════════════════
-- WINSTONE PROJECTS — Admin CMS Upgrade SQL
-- Run this in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. Add status column to existing contacts table ──────────────
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'closed'));

-- ── 2. Add extra fields to testimonials ──────────────────────────
ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS rating      INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS designation TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS location    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS image_url   TEXT    DEFAULT '';

-- ── 3. Add extra fields to projects ──────────────────────────────
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS featured      BOOLEAN   DEFAULT false,
  ADD COLUMN IF NOT EXISTS rera_number   TEXT      DEFAULT '',
  ADD COLUMN IF NOT EXISTS price_min     BIGINT    DEFAULT 0,
  ADD COLUMN IF NOT EXISTS price_max     BIGINT    DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tags          TEXT[]    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS publish_at    TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS maps_url      TEXT      DEFAULT '',
  ADD COLUMN IF NOT EXISTS bhk_config    TEXT      DEFAULT '',
  ADD COLUMN IF NOT EXISTS area_sqft     TEXT      DEFAULT '';

-- ── 4. Services table ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  description TEXT        DEFAULT '',
  icon        TEXT        DEFAULT 'Star',
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── 5. Why Choose Us table ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS why_choose_us (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  description TEXT        DEFAULT '',
  icon        TEXT        DEFAULT 'Award',
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── 6. Site Settings (key-value store) ───────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT        PRIMARY KEY,
  value      TEXT        DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── 7. SEO Settings ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS seo_settings (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  page             TEXT        UNIQUE NOT NULL,
  meta_title       TEXT        DEFAULT '',
  meta_description TEXT        DEFAULT '',
  keywords         TEXT        DEFAULT '',
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE services      ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings  ENABLE ROW LEVEL SECURITY;

-- Public read (website fetches these to display)
CREATE POLICY "Public read services"
  ON services FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read why_choose_us"
  ON why_choose_us FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read site_settings"
  ON site_settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read seo_settings"
  ON seo_settings FOR SELECT TO anon, authenticated USING (true);

-- Authenticated write (admin panel only)
CREATE POLICY "Authenticated manage services"
  ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated manage why_choose_us"
  ON why_choose_us FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated manage site_settings"
  ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated manage seo_settings"
  ON seo_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated users to update contact status
CREATE POLICY "Authenticated update contacts"
  ON contacts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated delete contacts"
  ON contacts FOR DELETE TO authenticated USING (true);

-- ═══════════════════════════════════════════════════════════════════
-- SEED DATA — Default site settings
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO site_settings (key, value) VALUES
  ('company_name',        'Winstone Projects'),
  ('company_tagline',     'Redefining Luxury Living in Bangalore'),
  ('company_established', '2018'),
  ('company_description', 'Winstone Projects is a Bangalore-based real estate developer focused on delivering premium residential and commercial developments across India.'),
  ('company_mission',     'Deliver world-class living experiences across India'),
  ('company_vision',      'To be the most trusted luxury real estate developer in India'),
  ('contact_phone',       '+91 98450 12345'),
  ('contact_email',       'info@winstoneprojects.in'),
  ('contact_address',     'Prestige Tech Park, Outer Ring Road, Bangalore – 560 103'),
  ('contact_whatsapp',    '919845012345'),
  ('contact_whatsapp_message', 'Hello, I am interested in learning more about your luxury properties in Bangalore.'),
  ('social_instagram',    'https://instagram.com/winstoneprojects'),
  ('social_facebook',     'https://facebook.com/winstoneprojects'),
  ('social_linkedin',     'https://linkedin.com/company/winstoneprojects'),
  ('social_twitter',      'https://twitter.com/winstoneprojects'),
  ('social_youtube',      '')
ON CONFLICT (key) DO NOTHING;

-- Seed default SEO for each page
INSERT INTO seo_settings (page, meta_title, meta_description, keywords) VALUES
  ('home',      'Luxury Real Estate in Bangalore | Winstone Projects',
                'Discover premium villas, apartments & plots across Bangalore by Winstone Projects. Award-winning real estate developer since 2018.',
                'luxury real estate India, premium villas Bangalore, property investment India, luxury apartments Bangalore, gated community Bangalore'),
  ('about',     'About Us | Winstone Projects — Premium Real Estate Bangalore',
                'Learn about Winstone Projects — a luxury real estate developer founded in 2018, building iconic homes across Bangalore, Mysore and Hyderabad.',
                'Winstone Projects, luxury real estate developer Bangalore, premium housing India'),
  ('projects',  'Our Projects | Luxury Villas & Apartments | Winstone Projects',
                'Explore our portfolio of luxury residential and commercial projects across Bangalore, Mysore and Hyderabad.',
                'luxury villas Bangalore, premium apartments, real estate projects Bangalore India'),
  ('portfolio', 'Portfolio | Winstone Projects',
                'View the gallery of our completed luxury developments and premium living spaces.',
                'luxury home interiors Bangalore, real estate portfolio India, premium property gallery'),
  ('services',  'Our Services | Luxury Real Estate Services | Winstone Projects',
                'From villa sales to commercial leasing — explore the full range of premium real estate services by Winstone Projects.',
                'real estate services Bangalore, luxury property services India, commercial leasing Bangalore'),
  ('contact',   'Contact Us | Winstone Projects Bangalore',
                'Get in touch with Winstone Projects for premium property enquiries. Call, email or visit us at our Bangalore office.',
                'contact Winstone Projects, real estate enquiry Bangalore, luxury property contact India')
ON CONFLICT (page) DO NOTHING;
