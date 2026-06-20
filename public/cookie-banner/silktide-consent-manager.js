// This is a placeholder file to suppress GTM 404 errors.
// The Google Tag Manager container is trying to load this file.
// If you intend to use Silktide Consent Manager, replace this with the actual validation script.

console.log('Silktide Consent Manager placeholder loaded.');

// Mock the global object expected by GTM to prevent ReferenceErrors and TypeErrors
window.silktideCookieBannerManager = new Proxy({
    init: function () { console.log('Mock Silktide init'); },
    reset: function () { console.log('Mock Silktide reset'); }
}, {
    get: function (target, prop) {
        if (prop in target) {
            return target[prop];
        }
        // Dynamically return a dummy function for any undefined method accessed to prevent "not a function" TypeErrors
        return function () {
            console.log(`Mock Silktide dummy fallback called for: ${String(prop)}`);
            return true;
        };
    }
});
