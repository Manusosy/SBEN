-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Events Table
create table if not exists public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  date date not null,
  time text,
  location text,
  description text,
  category text,
  registration_link text,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Team Members Table
create table if not exists public.team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  bio text,
  image_url text,
  social_links jsonb default '{}'::jsonb,
  display_order integer default 0,
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Site Settings Table
create table if not exists public.site_settings (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure existing tables exist (if they don't already)
-- Programs
create table if not exists public.programs (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  short_description text,
  description text,
  icon_name text,
  initiatives jsonb default '[]'::jsonb,
  image_url text,
  display_order integer default 0,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog Posts
create table if not exists public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique,
  excerpt text,
  content jsonb default '[]'::jsonb,
  author text,
  category text,
  image_url text,
  keywords text[],
  meta_description text,
  status text default 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Gallery Images
create table if not exists public.gallery_images (
  id uuid default uuid_generate_v4() primary key,
  title text,
  alt_text text,
  image_url text not null,
  category text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on all tables
alter table public.events enable row level security;
alter table public.team_members enable row level security;
alter table public.site_settings enable row level security;
alter table public.programs enable row level security;
alter table public.blog_posts enable row level security;
alter table public.gallery_images enable row level security;

-- Create Policies
-- Allow public read access
create policy "Public events are viewable by everyone" on public.events for select using (true);
create policy "Public team members are viewable by everyone" on public.team_members for select using (true);
create policy "Public settings are viewable by everyone" on public.site_settings for select using (true);
create policy "Public programs are viewable by everyone" on public.programs for select using (true);
create policy "Public blog posts are viewable by everyone" on public.blog_posts for select using (true);
create policy "Public gallery images are viewable by everyone" on public.gallery_images for select using (true);

-- Allow authenticated users (admins) to do everything
-- Note: In a real app, you might want a specific 'admin' role check. 
-- For now, we assume any logged in user is an admin based on the signup restriction.
create policy "Admins can insert events" on public.events for insert with check (auth.role() = 'authenticated');
create policy "Admins can update events" on public.events for update using (auth.role() = 'authenticated');
create policy "Admins can delete events" on public.events for delete using (auth.role() = 'authenticated');

create policy "Admins can insert team members" on public.team_members for insert with check (auth.role() = 'authenticated');
create policy "Admins can update team members" on public.team_members for update using (auth.role() = 'authenticated');
create policy "Admins can delete team members" on public.team_members for delete using (auth.role() = 'authenticated');

create policy "Admins can insert settings" on public.site_settings for insert with check (auth.role() = 'authenticated');
create policy "Admins can update settings" on public.site_settings for update using (auth.role() = 'authenticated');
create policy "Admins can delete settings" on public.site_settings for delete using (auth.role() = 'authenticated');

create policy "Admins can insert programs" on public.programs for insert with check (auth.role() = 'authenticated');
create policy "Admins can update programs" on public.programs for update using (auth.role() = 'authenticated');
create policy "Admins can delete programs" on public.programs for delete using (auth.role() = 'authenticated');

create policy "Admins can insert blog posts" on public.blog_posts for insert with check (auth.role() = 'authenticated');
create policy "Admins can update blog posts" on public.blog_posts for update using (auth.role() = 'authenticated');
create policy "Admins can delete blog posts" on public.blog_posts for delete using (auth.role() = 'authenticated');

create policy "Admins can insert gallery images" on public.gallery_images for insert with check (auth.role() = 'authenticated');
create policy "Admins can update gallery images" on public.gallery_images for update using (auth.role() = 'authenticated');
create policy "Admins can delete gallery images" on public.gallery_images for delete using (auth.role() = 'authenticated');

-- Storage Bucket for Media
insert into storage.buckets (id, name, public) 
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Media is publicly accessible" on storage.objects for select using (bucket_id = 'media');
create policy "Admins can upload media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "Admins can update media" on storage.objects for update using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "Admins can delete media" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
