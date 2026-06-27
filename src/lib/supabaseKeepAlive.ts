import { supabase } from '@/integrations/supabase/client';

// Supabase free-tier projects pause after 7 days of inactivity.
// This service pings the database every 4 days (well within the 7-day window)
// to keep it alive as long as the app is open in any browser.
const PING_INTERVAL_MS = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds

async function pingDatabase(): Promise<void> {
  try {
    const { error } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1);

    if (error) {
      console.warn('[KeepAlive] Supabase ping failed:', error.message);
    } else {
      console.log('[KeepAlive] Supabase ping successful at', new Date().toISOString());
    }
  } catch (err) {
    console.warn('[KeepAlive] Supabase ping error:', err);
  }
}

/**
 * Starts the Supabase keep-alive service.
 * Performs an immediate ping on startup, then repeats every 4 days.
 * This prevents the free-tier Supabase project from pausing due to inactivity.
 */
export function startKeepAlive(): void {
  // Ping immediately on startup
  pingDatabase();

  // Then ping every 4 days
  const intervalId = setInterval(pingDatabase, PING_INTERVAL_MS);

  // Clean up on page unload (optional — mainly for SPA hygiene)
  window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
  });

  console.log('[KeepAlive] Supabase keep-alive service started. Pinging every 4 days.');
}
