-- Supabase migration: initial schema for admin
-- products
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  cost_price NUMERIC,
  category TEXT,
  subcategory TEXT,
  images TEXT[],
  variants JSONB,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  order_index INTEGER DEFAULT 0
);

-- subcategories
CREATE TABLE IF NOT EXISTS subcategories (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- inventory
CREATE TABLE IF NOT EXISTS inventory (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  variant_id TEXT,
  stock INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  items JSONB,
  total NUMERIC,
  status TEXT DEFAULT 'pending',
  customer_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- settings
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB
);
