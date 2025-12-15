-- Fix missing date column in events table
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'events' and column_name = 'date') then
        alter table public.events add column date timestamp with time zone;
    end if;
end $$;
