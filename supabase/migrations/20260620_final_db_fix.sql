-- 1. Add missing columns to the events table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS time text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS registration_link text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS image_url text;

-- 2. Add missing name column to the event_registrations table
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS name text;

-- 3. Force PostgREST to reload the schema cache so the changes take effect immediately
NOTIFY pgrst, 'reload schema';
