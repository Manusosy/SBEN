-- Add image_url column to events table
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS image_url text;

-- Create event_registrations table for RSVPs
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on event_registrations
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for event_registrations
-- 1. Public can RSVP (insert)
CREATE POLICY "Anyone can register for events" ON public.event_registrations
FOR INSERT WITH CHECK (true);

-- 2. Admins (authenticated users) can manage registrations
CREATE POLICY "Admins can view registrations" ON public.event_registrations
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update registrations" ON public.event_registrations
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete registrations" ON public.event_registrations
FOR DELETE USING (auth.role() = 'authenticated');
