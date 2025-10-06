import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CookieSettings = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Load saved preferences
    const cookieConsent = localStorage.getItem('sben-cookie-consent');
    if (cookieConsent) {
      try {
        const saved = JSON.parse(cookieConsent);
        setPreferences(saved);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
      }
    }
  }, []);

  const updateGoogleConsent = (prefs: typeof preferences) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        ad_user_data: prefs.marketing ? 'granted' : 'denied',
        ad_personalization: prefs.marketing ? 'granted' : 'denied',
      });
    }
  };

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('sben-cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('sben-cookie-consent-timestamp', new Date().toISOString());
    localStorage.setItem('silktideCookieChoice_necessary', 'true');
    localStorage.setItem('silktideCookieChoice_analytics', prefs.analytics.toString());
    localStorage.setItem('silktideCookieChoice_marketing', prefs.marketing.toString());
    updateGoogleConsent(prefs);
  };

  const handleSave = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        [key]: !prev[key],
      };
      savePreferences(updated);
      return updated;
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-gray-300 hover:text-secondary-400 transition-colors text-sm">
          <Cookie className="w-4 h-4" />
          Cookie Settings
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Cookie className="w-6 h-6 text-primary-600" />
            Cookie Preferences
          </DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. You can enable or disable different types of cookies below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Necessary Cookies */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">Necessary Cookies</h4>
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                    Always Active
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  These cookies are essential for the website to function properly and cannot be disabled.
                </p>
              </div>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="font-semibold text-gray-900 mb-1">Analytics Cookies</h4>
                <p className="text-sm text-gray-600">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <button
                onClick={() => togglePreference('analytics')}
                className={`flex-shrink-0 w-12 h-6 rounded-full transition-colors ${
                  preferences.analytics ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                aria-label="Toggle analytics cookies"
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    preferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="font-semibold text-gray-900 mb-1">Marketing Cookies</h4>
                <p className="text-sm text-gray-600">
                  Used to track visitors for personalized advertising.
                </p>
              </div>
              <button
                onClick={() => togglePreference('marketing')}
                className={`flex-shrink-0 w-12 h-6 rounded-full transition-colors ${
                  preferences.marketing ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                aria-label="Toggle marketing cookies"
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    preferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Last updated: {localStorage.getItem('sben-cookie-consent-timestamp') 
            ? new Date(localStorage.getItem('sben-cookie-consent-timestamp')!).toLocaleDateString()
            : 'Never'}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettings;

