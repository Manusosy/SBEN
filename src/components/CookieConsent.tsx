import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Cookie preferences state
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('sben-cookie-consent');
    const consentTimestamp = localStorage.getItem('sben-cookie-consent-timestamp');
    
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(cookieConsent);
        setPreferences(saved);
        updateGoogleConsent(saved);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
      }
    }
  }, []);

  const updateGoogleConsent = (prefs: typeof preferences) => {
    // Update Google Tag Manager consent
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
    
    // Store individual preferences for compatibility with existing code
    localStorage.setItem('silktideCookieChoice_necessary', 'true');
    localStorage.setItem('silktideCookieChoice_analytics', prefs.analytics.toString());
    localStorage.setItem('silktideCookieChoice_marketing', prefs.marketing.toString());
    
    updateGoogleConsent(prefs);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    savePreferences(onlyNecessary);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
            onClick={() => !showPreferences && setShowBanner(false)}
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          >
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {!showPreferences ? (
                  // Main Banner
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <Cookie className="w-6 h-6 text-primary-600" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          We Value Your Privacy
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base mb-4">
                          We use cookies to enhance your browsing experience, provide personalized content, 
                          and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                          You can customize your preferences or reject non-essential cookies.{' '}
                          <Link 
                            to="/privacy-policy" 
                            className="text-primary-600 hover:text-primary-700 underline font-medium"
                            onClick={() => setShowBanner(false)}
                          >
                            Learn more
                          </Link>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            onClick={handleAcceptAll}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                          >
                            Accept All
                          </Button>
                          <Button
                            onClick={handleRejectAll}
                            variant="outline"
                            className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
                          >
                            Reject Non-Essential
                          </Button>
                          <Button
                            onClick={() => setShowPreferences(true)}
                            variant="ghost"
                            className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-6 py-2.5 rounded-lg font-medium transition-colors"
                          >
                            Customize
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Preferences Panel
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Cookie Preferences
                      </h3>
                      <button
                        onClick={() => setShowPreferences(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close preferences"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mb-6">
                      Choose which cookies you want to allow. You can change these settings at any time.
                    </p>

                    <div className="space-y-4">
                      {/* Necessary Cookies */}
                      <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">Necessary Cookies</h4>
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                              Always Active
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            These cookies are essential for the website to function properly. 
                            They enable basic functions like page navigation and access to secure areas.
                          </p>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-start justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                        <div className="flex-1 pr-4">
                          <h4 className="font-semibold text-gray-900 mb-1">Analytics Cookies</h4>
                          <p className="text-sm text-gray-600">
                            These cookies help us understand how visitors interact with our website, 
                            which pages are most popular, and how visitors move around the site.
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

                      {/* Marketing Cookies */}
                      <div className="flex items-start justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                        <div className="flex-1 pr-4">
                          <h4 className="font-semibold text-gray-900 mb-1">Marketing Cookies</h4>
                          <p className="text-sm text-gray-600">
                            These cookies are used to track visitors across websites to display 
                            relevant advertisements and encourage donations to our cause.
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

                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                      <Button
                        onClick={handleSavePreferences}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                      >
                        Save Preferences
                      </Button>
                      <Button
                        onClick={handleAcceptAll}
                        variant="outline"
                        className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
                      >
                        Accept All
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

