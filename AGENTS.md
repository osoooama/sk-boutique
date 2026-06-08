# SK BOUTIQUE — Project Summary

## Tech Stack
- **Framework:** Next.js 16.2.7 (App Router)
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS v4
- **Icons:** Font Awesome 6.4.0 (CDN)
- **Fonts:** Cairo (Arabic), Outfit (English), Cinzel (Display) — Google Fonts
- **Image Processing:** jimp (dev utility)
- **Linting:** ESLint 9 with `eslint-config-next`
- **Build:** Static Export (`output: 'export'`) — deployed to Netlify
- **Deployment:** Cloudflare Pages / Netlify

## Project Structure

```
sk-boutique/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles, theme vars, animations
│   ├── layout.js           # Root layout (meta, SEO, fonts, schema)
│   └── page.js             # Main single-page app (all state management)
├── components/             # 17 React components
│   ├── Navbar.js           # Top navigation (fixed, glassmorphism)
│   ├── HeroSection.js      # Hero with promo card
│   ├── FeaturesStrip.js    # 4 feature cards (delivery, payment, etc.)
│   ├── VideoSection.js     # YouTube embed + promo card
│   ├── CatalogSection.js   # Product grid with filter/sort/search
│   ├── ProductModal.js     # Product detail modal (size/color/qty)
│   ├── CartDrawer.js       # Slide-in cart with promo code input
│   ├── CheckoutModal.js    # Multi-step checkout (address → payment → confirm)
│   ├── WelcomeSplash.js    # First-visit splash screen
│   ├── BottomNav.js        # Mobile bottom navigation
│   ├── MobileSearch.js     # Mobile fullscreen search overlay
│   ├── ConfettiOverlay.js  # Order success confetti animation
│   ├── ToastNotifications.js # Toast notifications
│   ├── AboutSection.js     # Brand story & features
│   ├── FeedbackSection.js  # Customer reviews (image-based, paginated)
│   ├── Footer.js           # Footer with links, social, newsletter
│   └── WhatsAppButton.js   # Fixed WhatsApp float button
├── data/
│   ├── products.js         # 5 products with sizes, colors, prices
│   └── translations.js     # Full AR/EN translation dictionary
├── lib/
│   └── utils.js            # Price calc, discount, order ID, confetti, card formatting
├── public/
│   └── assets/             # Product images, logos, feedback screenshots, video
└── config files            # next.config.mjs, postcss, eslint, jsconfig, opencode.json
```

## Pages (Single Page App)
| Section | Component | Purpose |
|---------|-----------|---------|
| `#hero` | HeroSection | Landing hero with promo code card |
| `#catalog` | CatalogSection | Product grid with filtering |
| `#about` | AboutSection | Brand story & identity |
| `#contact` | Footer | Contact info & newsletter |

## All Components & Purpose

| Component | Purpose |
|-----------|---------|
| Navbar | Fixed top nav with logo, links, theme/lang toggle, search, cart icon |
| HeroSection | Hero image, tagline, action buttons, promo card |
| FeaturesStrip | 4 service features (delivery, COD, returns, materials) |
| VideoSection | YouTube embed + discount promo card |
| CatalogSection | Product grid, category tabs, sort, search, wishlist |
| ProductModal | Full product details: images, sizes, colors, qty, tabs |
| CartDrawer | Slide-in cart from right with quantity controls |
| CheckoutModal | Multi-step: address form → payment method → success |
| WelcomeSplash | Full-screen welcome on first visit |
| BottomNav | Mobile-only bottom nav (home, shop, cart, search, theme) |
| MobileSearch | Full-screen search overlay for mobile |
| ConfettiOverlay | Confetti particles on order success |
| ToastNotifications | Stack of toast messages (success/danger/info) |
| AboutSection | Brand story with feature grid |
| FeedbackSection | Customer review screenshots (pagination + mobile swipe) |
| Footer | Links, social, contact info, newsletter form |
| WhatsAppButton | Floating WhatsApp chat button |

## Color Scheme & Design System

### Colors
| Role | Dark Theme | Light Theme |
|------|-----------|-------------|
| Background Primary | `#0a0a0a` | `#fcfbf9` |
| Background Secondary | `#121212` | `#ffffff` |
| Background Elevated | `#1a1a1a` | `#f7f6f2` |
| Text Primary | `#ffffff` | `#1c1c1e` |
| Text Secondary | `#d4d4d8` | `#3a3a3c` |
| Text Muted | `#a1a1aa` | `#8e8e93` |
| Gold (Accent) | `#cfa850` | `#cfa850` |
| Shemagh Red | `#cc0000` | `#cc0000` |
| Petra Red | `#b53a2b` | `#b53a2b` |
| Desert Sand | `#d4b896` | `#d4b896` |

### Typography
- **Arabic:** Cairo (sans-serif) — headings/body
- **English:** Outfit (sans-serif) — body
- **Display:** Cinzel (serif) — brand name "BOUTIQUE"

### Design Patterns
- Glassmorphism: `glass-effect` class with backdrop-blur
- Gold accent throughout (`#cfa850`)
- Rounded corners (`rounded-xl`, `rounded-2xl`, `rounded-3xl`)
- Dark theme default
- Smooth transitions (300-500ms)
- Scroll animations via IntersectionObserver (`[data-reveal]`)

## Known Issues & TODOs

### Code Quality
1. **Unused import:** `useState` imported but not used in `CatalogSection.js:3`
2. **Missing isEnglish prop:** `MobileSearch` component doesn't receive `isEnglish` — placeholder is always Arabic
3. **Hardcoded Arabic text:** `MobileSearch.js:33,41` — search placeholder and helper text are always Arabic
4. **Undefined animation:** `WelcomeSplash.js:35` uses `animate-spin-slow` class not defined in globals.css
5. **alert() usage:** `Footer.js:8` uses `alert()` for newsletter feedback — poor UX
6. **No form validation:** Checkout form has `required` attributes but no client-side validation UI
7. **Duplicate `overflow-hidden`:** `ProductModal.js:19` has both `overflow-y-auto` and `overflow-y-visible` on same element (conflicting)

### Performance
1. **Font Awesome CDN:** Loaded via CDN in layout.js — consider self-hosting or tree-shaking
2. **No image lazy loading config:** Images use `next/image` with fill but some could benefit from explicit `loading="lazy"`
3. **No bundle analysis:** Consider running `next bundle-analyzer` to check size

### Deployment
1. **Cloudflare Pages:** `next.config.mjs` could add `trailingSlash: true` for better static hosting compatibility
2. **No .env.example:** Environment variables not documented
3. **Duplicate `.vercel` in .gitignore** (appears twice)

### SEO
1. **No hreflang tags:** Arabic/English alternates not declared in layout head
2. **No sitemap.xml:** Not generated for static export

### Security
1. **Credit card form:** Card details collected client-side (no real processing — appears to be UI demo)
2. **No CSP headers:** No Content Security Policy configured

## Products (5)
| Product | Price | Sizes | Colors |
|---------|-------|-------|--------|
| Luxury Velvet Pearl Set | 15 JD | S/M/L/XL | Royal Burgundy |
| Elegant Side-Wrap Set | 14 JD | S/M/L | Petroleum Blue, Royal Black |
| Classic Belted Wrap Blazer | 15 JD | S/M/L/XL | Dark Brown |
| Luxury Satin Mock-Neck Blouse | 12 JD | S/M/L/XL | Champagne, Royal Black, Royal Blue, Pearl White |
| Side-Tie Classic Wrap Shirt | 10 JD | S/M/L | Chocolate, Royal Burgundy, Classic Beige |

## Discount Codes
- `NASHAMA` → 15% off
- `JORDAN`, `SK10`, `WELCOME10` → 10% off
