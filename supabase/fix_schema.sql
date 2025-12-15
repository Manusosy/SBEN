-- Fix missing columns for Admin functionality

-- 1. Add 'updated_at' to site_settings if it doesn't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'site_settings' and column_name = 'updated_at') then
        alter table public.site_settings add column updated_at timestamp with time zone;
    end if;
end $$;

-- 2. Add 'display_order' to programs if it doesn't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'programs' and column_name = 'display_order') then
        alter table public.programs add column display_order integer default 0;
    end if;
end $$;

-- 3. Verify other tables have display_order
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'team_members' and column_name = 'display_order') then
        alter table public.team_members add column display_order integer default 0;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'gallery_images' and column_name = 'display_order') then
        alter table public.gallery_images add column display_order integer default 0;
    end if;
end $$;
