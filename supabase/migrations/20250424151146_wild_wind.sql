/*
  # Initial Schema for Artisan Management System

  1. New Tables
     - `profiles`: Stores artisan business profiles
     - `clients`: Manages client information (individuals and companies)
     - `quotes`: Handles quote management
     - `quote_items`: Line items for quotes
     - `invoices`: Manages invoices
     - `invoice_items`: Line items for invoices
     - `trades`: Categories of construction/craft trades
     - `categories`: Subcategories within trades
     - `services`: Services offered by artisans
     - `service_options`: Customization options for services

  2. Security
     - Row Level Security enabled on all tables
     - Authentication policies to ensure users only access their own data
     - Public policies for reference data
*/

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  updated_at TIMESTAMPTZ,
  username TEXT,
  full_name TEXT,
  company_name TEXT,
  address TEXT,
  postal_code TEXT,
  city TEXT,
  country TEXT,
  phone TEXT,
  website TEXT,
  siret TEXT,
  vat_number TEXT,
  logo_url TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  iban TEXT,
  bic TEXT,
  quote_prefix TEXT NOT NULL DEFAULT 'DEV-',
  invoice_prefix TEXT NOT NULL DEFAULT 'FAC-',
  terms_and_conditions TEXT
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- CLIENTS TABLE
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('individual', 'company')),
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  siret TEXT,
  vat_number TEXT,
  notes TEXT,
  billing_address TEXT,
  billing_city TEXT,
  billing_postal_code TEXT,
  billing_country TEXT,
  same_address BOOLEAN DEFAULT TRUE
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clients"
  ON clients
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clients"
  ON clients
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clients"
  ON clients
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own clients"
  ON clients
  FOR DELETE
  USING (auth.uid() = user_id);

-- TRADES TABLE (Corps d'état)
CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  description TEXT
);

ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view trades"
  ON trades
  FOR SELECT
  TO authenticated
  USING (true);

-- CATEGORIES TABLE (Familles)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  trade_id UUID REFERENCES trades NOT NULL,
  name TEXT NOT NULL,
  description TEXT
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  category_id UUID REFERENCES categories NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  technical_details TEXT,
  unit TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 20.0,
  is_custom BOOLEAN DEFAULT FALSE
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create custom services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND is_custom = TRUE);

CREATE POLICY "Users can update own custom services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND is_custom = TRUE);

-- SERVICE OPTIONS TABLE
CREATE TABLE IF NOT EXISTS service_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  service_id UUID REFERENCES services ON DELETE CASCADE NOT NULL,
  option_type TEXT NOT NULL CHECK (option_type IN ('color', 'material', 'finish', 'dimension', 'other')),
  name TEXT NOT NULL,
  values TEXT[] NOT NULL
);

ALTER TABLE service_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view service options"
  ON service_options
  FOR SELECT
  TO authenticated
  USING (true);

-- QUOTES TABLE
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES clients NOT NULL,
  number TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'invoiced')) DEFAULT 'draft',
  issue_date DATE NOT NULL,
  valid_until DATE NOT NULL,
  title TEXT NOT NULL,
  notes TEXT,
  global_discount DECIMAL(5, 2),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_total DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quotes"
  ON quotes
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quotes"
  ON quotes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quotes"
  ON quotes
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own quotes"
  ON quotes
  FOR DELETE
  USING (auth.uid() = user_id);

-- QUOTE ITEMS TABLE
CREATE TABLE IF NOT EXISTS quote_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  quote_id UUID REFERENCES quotes ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services,
  title TEXT NOT NULL,
  description TEXT,
  quantity DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(5, 2),
  tax_rate DECIMAL(5, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  position INTEGER NOT NULL
);

ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quote items"
  ON quote_items
  FOR SELECT
  USING (
    quote_id IN (
      SELECT id FROM quotes WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own quote items"
  ON quote_items
  FOR INSERT
  WITH CHECK (
    quote_id IN (
      SELECT id FROM quotes WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own quote items"
  ON quote_items
  FOR UPDATE
  USING (
    quote_id IN (
      SELECT id FROM quotes WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own quote items"
  ON quote_items
  FOR DELETE
  USING (
    quote_id IN (
      SELECT id FROM quotes WHERE user_id = auth.uid()
    )
  );

-- INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES clients NOT NULL,
  quote_id UUID REFERENCES quotes,
  number TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')) DEFAULT 'draft',
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  title TEXT NOT NULL,
  notes TEXT,
  global_discount DECIMAL(5, 2),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_total DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_date DATE
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own invoices"
  ON invoices
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invoices"
  ON invoices
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invoices"
  ON invoices
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own invoices"
  ON invoices
  FOR DELETE
  USING (auth.uid() = user_id);

-- INVOICE ITEMS TABLE
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  invoice_id UUID REFERENCES invoices ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services,
  title TEXT NOT NULL,
  description TEXT,
  quantity DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(5, 2),
  tax_rate DECIMAL(5, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  position INTEGER NOT NULL
);

ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own invoice items"
  ON invoice_items
  FOR SELECT
  USING (
    invoice_id IN (
      SELECT id FROM invoices WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own invoice items"
  ON invoice_items
  FOR INSERT
  WITH CHECK (
    invoice_id IN (
      SELECT id FROM invoices WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own invoice items"
  ON invoice_items
  FOR UPDATE
  USING (
    invoice_id IN (
      SELECT id FROM invoices WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own invoice items"
  ON invoice_items
  FOR DELETE
  USING (
    invoice_id IN (
      SELECT id FROM invoices WHERE user_id = auth.uid()
    )
  );

-- Insert base data for trades
INSERT INTO trades (name, description) VALUES
  ('Rénovation générale', 'Travaux de démolition, préparation et installation du chantier'),
  ('Second œuvre', 'Plâtrerie, pose de cloisons et de faux-plafonds'),
  ('Toiture & Couverture', 'Pose de tuiles, ardoises, zinc, étanchéité, charpente et zinguerie'),
  ('Isolation', 'Isolation thermique et phonique (ITI, ITE, combles, sols)'),
  ('Plomberie', 'Installation de sanitaires, tuyauterie et raccordements'),
  ('Électricité', 'Installation générale, tableaux, prises, éclairage et domotique'),
  ('Peinture', 'Peinture intérieure & extérieure, préparation et finitions'),
  ('Menuiserie', 'Pose de portes, fenêtres, parquet, placards et agencements sur-mesure'),
  ('Carrelage & Revêtements', 'Pose de carrelage, faïence, ragréage, chapes'),
  ('Chauffage & Climatisation', 'Installation et entretien de systèmes de chauffage et de climatisation'),
  ('Maçonnerie', 'Fondations, élévation de murs, création d''ouvertures, terrasses'),
  ('Aménagements extérieurs', 'Terrassement, pavage, clôtures et aménagement paysager'),
  ('VMC & Ventilation', 'Systèmes de ventilation simple/double flux, gaines, réglages'),
  ('Serrurerie & Métallerie', 'Garde-corps, portails, structures et travaux de métallerie'),
  ('Nettoyage & Finitions', 'Nettoyage de fin de chantier, évacuation des déchets, finitions finales');