-- ═══════════════════════════════════════════════════════════
-- Winstone Projects – Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  location    TEXT NOT NULL,
  image       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ────────────────────────────────────
-- Enable RLS on all tables
ALTER TABLE projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts    ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects and testimonials
CREATE POLICY "Public can read projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Public can read testimonials"
  ON testimonials FOR SELECT USING (true);

-- Allow anyone to insert contacts (contact form)
CREATE POLICY "Anyone can submit contact"
  ON contacts FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admins) full access
CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage contacts"
  ON contacts FOR ALL USING (auth.role() = 'authenticated');

-- ─── Seed Sample Data ──────────────────────────────────────
INSERT INTO projects (title, description, location, image) VALUES
  ('Winstone Arcadia Villas', 'Architecturally stunning independent villas in Whitefield featuring private pools, smart home systems, and Vastu-compliant designs.', 'Whitefield, Bangalore', '/hero_villa.png'),
  ('The Residences at Koramangala', 'Premium high-rise residences with panoramic city views, sky lounge, gym, and concierge services in Koramangala.', 'Koramangala, Bangalore', '/project_apartments.png'),
  ('Winstone Greens Township', 'Integrated 120-acre township on Sarjapur Road with villas, plots, clubhouse, and schools.', 'Sarjapur Road, Bangalore', '/project_farms.png');

INSERT INTO testimonials (name, message) VALUES
  ('Rajesh Nair', 'Winstone Projects delivered beyond our expectations. The villa we purchased in Whitefield is an absolute masterpiece — the attention to detail and smart home features are truly world-class.'),
  ('Priya Venkatesh', 'Exceptional professionalism from start to finish. The team's deep knowledge of Bangalore's real estate market and transparent approach made our investment seamless. Highly recommend.'),
  ('Anand Krishnaswamy', 'The Sarjapur township exceeded all expectations. The green spaces, clubhouse, and community feel make it a perfect home. Nayaz and his team truly understand modern Indian living.');

-- 4. Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  description TEXT NOT NULL,
  image       TEXT,
  status      TEXT DEFAULT 'Completed',
  year        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read portfolio"
  ON portfolio FOR SELECT USING (true);

CREATE POLICY "Admins can manage portfolio"
  ON portfolio FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO portfolio (title, category, description, image, status, year) VALUES
  ('Arcadia Villas — Whitefield', 'Villa', 'Exclusive collection of 24 independent villas with private pools, smart home automation, and Vastu-compliant layouts.', '/hero_villa.png', 'Completed', '2023'),
  ('The Residences — Koramangala', 'Residential', 'Premium high-rise with sky lounge, gym, concierge, and panoramic city views in the heart of Koramangala.', '/project_apartments.png', 'Completed', '2022'),
  ('Winstone Greens Township', 'Township', 'Integrated 120-acre township on Sarjapur Road featuring villas, plots, clubhouse, and school campus.', '/project_farms.png', 'Ongoing', '2025'),
  ('Indiranagar Business Hub', 'Commercial', 'Grade-A office and retail spaces with modern amenities, ample parking, and a prime 100 Feet Road address.', '/hero_villa.png', 'Completed', '2021');
