# Cookie Banner User Guide

## Visual Flow

### 1️⃣ First Visit Experience

```
┌─────────────────────────────────────────────────────────────┐
│                    SBEN Website                              │
│                                                              │
│  [Navigation Bar]                                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │          Website Content (Slightly Blurred)         │    │
│  │                                                      │    │
│  │  ╔══════════════════════════════════════════════╗  │    │
│  │  ║  🍪 We Value Your Privacy                    ║  │    │
│  │  ║                                              ║  │    │
│  │  ║  We use cookies to enhance your browsing    ║  │    │
│  │  ║  experience, provide personalized content,  ║  │    │
│  │  ║  and analyze our traffic. You can customize ║  │    │
│  │  ║  your preferences or reject non-essential   ║  │    │
│  │  ║  cookies. Learn more                        ║  │    │
│  │  ║                                              ║  │    │
│  │  ║  [Accept All] [Reject Non-Essential]        ║  │    │
│  │  ║                            [Customize]       ║  │    │
│  │  ╚══════════════════════════════════════════════╝  │    │
│  │                                                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 2️⃣ Customize Preferences View

```
╔═══════════════════════════════════════════════════════╗
║  🍪 Cookie Preferences                            [X] ║
║                                                       ║
║  Choose which cookies you want to allow.             ║
║  You can change these settings at any time.          ║
║                                                       ║
║  ┌─────────────────────────────────────────────┐    ║
║  │ ✓ Necessary Cookies    [Always Active]      │    ║
║  │ These cookies are essential for the website │    ║
║  │ to function properly.                        │    ║
║  └─────────────────────────────────────────────┘    ║
║                                                       ║
║  ┌─────────────────────────────────────────────┐    ║
║  │ Analytics Cookies              [●──────]    │    ║
║  │ Help us understand how visitors interact    │    ║
║  │ with our website.                           │    ║
║  └─────────────────────────────────────────────┘    ║
║                                                       ║
║  ┌─────────────────────────────────────────────┐    ║
║  │ Marketing Cookies              [──────●]    │    ║
║  │ Used to track visitors for personalized     │    ║
║  │ advertising.                                │    ║
║  └─────────────────────────────────────────────┘    ║
║                                                       ║
║  [Save Preferences]          [Accept All]            ║
╚═══════════════════════════════════════════════════════╝
```

### 3️⃣ Footer Cookie Settings

```
┌─────────────────────────────────────────────────────────────┐
│                         FOOTER                               │
│                                                              │
│  Privacy Policy | Terms of Service | 🍪 Cookie Settings     │
│  | Contact Us                                               │
│                                                              │
│  © 2025 ShineBridge Empowerment Network (SBEN)             │
└─────────────────────────────────────────────────────────────┘
```

Click "🍪 Cookie Settings" → Opens preference dialog

## User Journey

### Scenario 1: First-Time Visitor (Accept All)
1. 👤 User visits website
2. ⏱️ After 1 second, banner appears
3. ✅ User clicks "Accept All"
4. 💾 Preferences saved to localStorage
5. 🎉 Banner disappears
6. 🔄 On next visit: No banner (preferences remembered)

### Scenario 2: First-Time Visitor (Reject Non-Essential)
1. 👤 User visits website
2. ⏱️ After 1 second, banner appears
3. ❌ User clicks "Reject Non-Essential"
4. 💾 Only necessary cookies enabled
5. 🎉 Banner disappears
6. 📊 Analytics/Marketing disabled

### Scenario 3: First-Time Visitor (Customize)
1. 👤 User visits website
2. ⏱️ After 1 second, banner appears
3. ⚙️ User clicks "Customize"
4. 🔧 Preferences panel opens
5. 🎚️ User toggles Analytics ON, Marketing OFF
6. 💾 User clicks "Save Preferences"
7. 🎉 Banner disappears

### Scenario 4: Returning Visitor Changes Mind
1. 👤 User visits website (has already accepted cookies)
2. 🚫 No banner shown
3. 👀 User scrolls to footer
4. 🍪 Clicks "Cookie Settings"
5. ⚙️ Dialog opens with current preferences
6. 🎚️ User toggles preferences
7. 💾 Changes saved automatically
8. ✅ Google Tag Manager updated in real-time

## Technical Behavior

### localStorage Keys Used
```javascript
{
  // Main preference object
  "sben-cookie-consent": {
    "necessary": true,
    "analytics": true,
    "marketing": false
  },
  
  // Timestamp of consent
  "sben-cookie-consent-timestamp": "2025-01-15T10:30:00.000Z",
  
  // Compatibility keys for existing GTM setup
  "silktideCookieChoice_necessary": "true",
  "silktideCookieChoice_analytics": "true",
  "silktideCookieChoice_marketing": "false"
}
```

### When Banner Shows
✅ Shows when:
- No consent found in localStorage
- User clears browser data
- User uses incognito/private mode (each session)
- User switches browsers
- User switches devices

❌ Doesn't show when:
- Consent already given
- User returns to site (same browser)
- User navigates between pages

### Cookie Categories Explained

#### 🔒 Necessary Cookies (Always Active)
**What they do:**
- Remember your cookie preferences
- Keep you logged in (if applicable)
- Enable basic website functionality
- Maintain security

**Cannot be disabled** - Required for website to work

#### 📊 Analytics Cookies (Optional)
**What they do:**
- Track page views
- Monitor user behavior
- Analyze traffic sources
- Measure website performance

**Used for:**
- Google Analytics
- Understanding user needs
- Improving website

**User can:** Enable or Disable

#### 📢 Marketing Cookies (Optional)
**What they do:**
- Track users across websites
- Display personalized ads
- Measure ad effectiveness
- Support fundraising campaigns

**Used for:**
- Remarketing
- Donation campaigns
- Partner advertising

**User can:** Enable or Disable

## Mobile Experience

### Mobile View (Small Screens)
```
┌─────────────────────────┐
│   Mobile Website        │
│                         │
│  ╔═══════════════════╗ │
│  ║ 🍪 We Value Your  ║ │
│  ║    Privacy        ║ │
│  ║                   ║ │
│  ║ We use cookies to ║ │
│  ║ enhance your      ║ │
│  ║ experience...     ║ │
│  ║                   ║ │
│  ║ [Accept All]      ║ │
│  ║                   ║ │
│  ║ [Reject Non-     ║ │
│  ║  Essential]       ║ │
│  ║                   ║ │
│  ║ [Customize]       ║ │
│  ╚═══════════════════╝ │
└─────────────────────────┘
```

Buttons stack vertically on mobile for better UX.

## Accessibility Features

### Keyboard Navigation
- ⌨️ Tab through all interactive elements
- ↵ Enter to activate buttons
- ⎋ Escape to close preference dialog
- Focus indicators on all buttons

### Screen Reader Support
- 🔊 ARIA labels on all buttons
- 📢 Descriptive text for toggles
- 🎯 Proper heading hierarchy
- ♿ Semantic HTML structure

## Color Scheme

The banner uses your existing brand colors:
- **Primary Color**: `primary-600` (main buttons)
- **Secondary Color**: `secondary-400` (links, highlights)
- **Background**: White with shadow
- **Backdrop**: Black with 50% opacity + blur
- **Text**: Gray-700 for body, Gray-900 for headings

## Animation Details

### Banner Entrance
- Slides up from bottom
- Fades in simultaneously
- Spring physics for natural feel
- 300ms duration

### Toggle Switches
- Smooth slide animation
- Color transition: Gray → Primary
- Instant feedback on click
- 200ms transition

### Dialog
- Fade in backdrop
- Slide in content
- Smooth transitions
- Accessible focus management

## Testing Checklist

### Manual Testing
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Reload page
- [ ] Verify banner appears after 1 second
- [ ] Test "Accept All" button
- [ ] Verify preferences saved
- [ ] Reload page - banner should not appear
- [ ] Clear localStorage again
- [ ] Test "Reject Non-Essential"
- [ ] Verify only necessary cookies enabled
- [ ] Clear localStorage again
- [ ] Test "Customize" option
- [ ] Toggle preferences
- [ ] Verify saves correctly
- [ ] Test "Cookie Settings" in footer
- [ ] Verify current preferences shown
- [ ] Toggle and verify real-time updates
- [ ] Test on mobile device
- [ ] Test with keyboard only
- [ ] Test with screen reader

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Chrome
- [ ] Mobile Safari

## FAQ

**Q: Why does the banner show every time in incognito mode?**
A: Incognito mode doesn't persist localStorage, so each session is treated as a new visitor. This is expected behavior.

**Q: Can users delete their consent?**
A: Yes, by clearing browser data or clicking Cookie Settings and changing preferences.

**Q: Does this track users across devices?**
A: No, preferences are stored locally per browser. This is more privacy-friendly.

**Q: Is this GDPR compliant?**
A: Yes, it follows GDPR best practices: clear consent, granular control, easy opt-out, and transparent information.

**Q: What if JavaScript is disabled?**
A: The banner won't show, and no non-essential cookies will be loaded. Website functionality remains intact.

**Q: How often should users re-consent?**
A: Currently, consent never expires. Best practice is to ask for re-consent every 12 months (can be added as enhancement).

## Support

For technical questions or customization requests, see:
- `COOKIE_CONSENT_IMPLEMENTATION.md` - Technical documentation
- `COOKIE_CONSENT_SUMMARY.md` - Implementation summary
- Source code: `src/components/CookieConsent.tsx`

