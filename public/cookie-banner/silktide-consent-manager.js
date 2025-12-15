// This is a placeholder file to suppress GTM 404 errors.
// The Google Tag Manager container is trying to load this file.
// If you intend to use Silktide Consent Manager, replace this with the actual validation script.

console.log('Silktide Consent Manager placeholder loaded.');

// Mock the global object expected by GTM to prevent ReferenceErrors
window.silktideCookieBannerManager = {
    // Add minimal methods if GTM calls them, for now just existence is enough specifically for the ReferenceError
    init: function () { console.log('Mock Silktide init'); },
    reset: function () { console.log('Mock Silktide reset'); }
};
