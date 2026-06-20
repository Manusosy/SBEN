-- Ensure events table exists with all required columns
CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  time text,
  location text,
  description text,
  category text,
  registration_link text,
  image_url text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add missing columns if table already exists (safe ALTER TABLE)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'category'
  ) THEN
    ALTER TABLE public.events ADD COLUMN category text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'registration_link'
  ) THEN
    ALTER TABLE public.events ADD COLUMN registration_link text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE public.events ADD COLUMN image_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'time'
  ) THEN
    ALTER TABLE public.events ADD COLUMN time text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'location'
  ) THEN
    ALTER TABLE public.events ADD COLUMN location text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'description'
  ) THEN
    ALTER TABLE public.events ADD COLUMN description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'status'
  ) THEN
    ALTER TABLE public.events ADD COLUMN status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived'));
  END IF;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Public events are viewable by everyone'
  ) THEN
    CREATE POLICY "Public events are viewable by everyone" ON public.events FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Admins can insert events'
  ) THEN
    CREATE POLICY "Admins can insert events" ON public.events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Admins can update events'
  ) THEN
    CREATE POLICY "Admins can update events" ON public.events FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Admins can delete events'
  ) THEN
    CREATE POLICY "Admins can delete events" ON public.events FOR DELETE USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Ensure event_registrations table exists with all columns
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'event_registrations' AND policyname = 'Anyone can register for events'
  ) THEN
    CREATE POLICY "Anyone can register for events" ON public.event_registrations FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'event_registrations' AND policyname = 'Admins can view registrations'
  ) THEN
    CREATE POLICY "Admins can view registrations" ON public.event_registrations FOR SELECT USING (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'event_registrations' AND policyname = 'Admins can update registrations'
  ) THEN
    CREATE POLICY "Admins can update registrations" ON public.event_registrations FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'event_registrations' AND policyname = 'Admins can delete registrations'
  ) THEN
    CREATE POLICY "Admins can delete registrations" ON public.event_registrations FOR DELETE USING (auth.role() = 'authenticated');
  END IF;
END $$;
