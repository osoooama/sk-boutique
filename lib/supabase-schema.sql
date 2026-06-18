-- SK BOUTIQUE — Supabase Schema
-- Run this SQL in Supabase Dashboard: SQL Editor > New Query

-- 1. Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  sizes TEXT[] DEFAULT '{}',
  colors JSONB DEFAULT '[]',
  images TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'clothing',
  description_ar TEXT,
  description_en TEXT,
  details_ar TEXT,
  details_en TEXT,
  shipping_ar TEXT,
  shipping_en TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Perfumes table
CREATE TABLE perfumes (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  size_ml INTEGER,
  volume TEXT,
  scent_type TEXT[],
  images TEXT[] DEFAULT '{}',
  description_ar TEXT,
  description_en TEXT,
  notes JSONB DEFAULT '{}',
  category TEXT DEFAULT 'perfume',
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfumes ENABLE ROW LEVEL SECURITY;

-- 4. Policies: public read, authenticated write
CREATE POLICY "Public read products"
ON products FOR SELECT TO anon USING (true);

CREATE POLICY "Public read perfumes"
ON perfumes FOR SELECT TO anon USING (true);

CREATE POLICY "Auth write products"
ON products FOR ALL TO authenticated USING (true);

CREATE POLICY "Auth write perfumes"
ON perfumes FOR ALL TO authenticated USING (true);

CREATE POLICY "Public storage read"
ON storage.objects FOR SELECT TO anon USING (bucket_id = 'products');

CREATE POLICY "Auth storage write"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'products');

CREATE POLICY "Anon storage write"
ON storage.objects FOR INSERT TO anon
WITH CHECK (bucket_id = 'products');
