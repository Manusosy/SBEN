
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary';
import { startKeepAlive } from './lib/supabaseKeepAlive';

// Keep Supabase free-tier project alive (prevents 7-day inactivity pause)
startKeepAlive();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </HelmetProvider>
);
