-- Create event_categories table
CREATE TABLE IF NOT EXISTS public.event_categories (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;

-- Public can read all categories
CREATE POLICY "Public event categories are viewable by everyone"
  ON public.event_categories FOR SELECT USING (true);

-- Authenticated users (admins) can insert categories
CREATE POLICY "Admins can insert event categories"
  ON public.event_categories FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users (admins) can update categories
CREATE POLICY "Admins can update event categories"
  ON public.event_categories FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Authenticated users (admins) can delete categories
CREATE POLICY "Admins can delete event categories"
  ON public.event_categories FOR DELETE
  USING (auth.role() = 'authenticated');

-- Seed default SBEN-relevant categories
INSERT INTO public.event_categories (name) VALUES
  ('Workshop'),
  ('Seminar'),
  ('Community Outreach'),
  ('Fundraiser'),
  ('General Meeting'),
  ('Training'),
  ('Health Outreach'),
  ('Youth Program'),
  ('Environmental Activity'),
  ('Women Empowerment')
ON CONFLICT (name) DO NOTHING;
