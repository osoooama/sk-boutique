# SK BOUTIQUE — الذاكرة الدائمة للمشروع

---

## 1. PROJECT IDENTITY

- **Store Name:** SK BOUTIQUE (متجر سارة كريشان — Sara Krishan Store)
- **Owner:** Sara Krishan — تحت إشراف أسامة كريشان
- **Tagline:** European Design · Locally Crafted (تصميم أوروبي · صناعة محلية)
- **Brand Positioning:** أزياء نسائية عصرية — تصاميم أوروبية تُصنع محلياً بخامات إيطالية وفرنسية بمعايير الجودة الأوروبية
- **Instagram:** @sk_boutique977
- **WhatsApp:** +962 7 9892 1123
- **Email:** sk_boutique977@outlook.com
- **Location:** Amman, Jordan
- **Since:** 2021

### Deployment
- **GitHub:** https://github.com/osoooama/sk-boutique
- **Live Site:** https://sk-boutique.pages.dev/
- **Platform:** Cloudflare Pages (static export via `next.config.mjs` output: 'export')
- **Canonical URL:** https://sk-boutique.pages.dev
- **Old deployments:** Netlify (https://sk-boutique-977.netlify.app) — [REMOVED] Vercel (deleted)

### Tech Stack
| Technology | Version |
|------------|---------|
| Next.js | 16.2.7 |
| React | 19.2.4 |
| React DOM | 19.2.4 |
| Tailwind CSS | ^4 |
| @tailwindcss/postcss | ^4 |
| PostCSS | via Next.js |
| ESLint | ^9.39.4 |
| eslint-config-next | 16.2.7 |
| Prettier | ^3.8.3 |
| Terser | ^5.48.0 |
| Font Awesome | 6.4.0 (CDN) |
| Google Fonts | Cairo, Cinzel, Outfit, Playfair Display |

---

## 2. FILE TREE

```
sk-boutique/
├── app/                          # Next.js App Router pages
│   ├── globals.css               # Global styles, CSS variables, Tailwind v4, all animations
│   ├── layout.js                 # Root layout — HTML, metadata, OG tags, schema.org JSON-LD
│   ├── not-found.js              # 404 page with gold styling
│   └── page.js                   # Main SPA (single page) — all state, all components
│
├── components/                   # All React components (22 files)
│   ├── AboutSection.js           # "Our Story" brand identity section
│   ├── AnimatedBackground.js     # Parallax floating orbs background effect
│   ├── BackToTop.js              # Floating scroll-to-top button
│   ├── BottomNav.js              # Mobile bottom nav bar (Home, Shop, Cart, Search, Theme)
│   ├── CartDrawer.js             # Slide-in cart drawer with promo codes
│   ├── CatalogSection.js         # Product grid with filters, sorting, search
│   ├── CheckoutModal.js          # 3-step checkout (Shipping → Payment → Confirmation)
│   ├── ConfettiOverlay.js        # Confetti particle animation overlay
│   ├── FavoritesDrawer.js        # Slide-in wishlist/favorites drawer
│   ├── FeaturesStrip.js          # 4-column feature grid (Delivery, COD, Returns, EU Quality)
│   ├── FeedbackSection.js        # Customer reviews/image gallery (17 feedback images)
│   ├── Footer.js                 # Full footer with links, social, newsletter, payment methods
│   ├── HeroSection.js            # Hero with background image, CTA buttons, promo card
│   ├── InstagramFAB.js           # Floating Instagram icon (bottom-left)
│   ├── MobileSearch.js           # Full-screen mobile search overlay
│   ├── Navbar.js                 # Top navigation with logo, links, search, cart, wishlist, theme
│   ├── ProductModal.js           # Product detail modal with size/color/qty selection
│   ├── ProductSkeleton.js        # Loading skeleton cards for products
│   ├── SizeGuideModal.js         # Size guide table (S/M/L/XL in cm)
│   ├── ToastNotifications.js     # Toast notification stack (success/danger/info)
│   ├── VideoSection.js           # YouTube video embed + promo code display
│   └── WelcomeSplash.js          # First-visit welcome splash screen
│
├── context/                      # React Context providers
│   └── FavoritesContext.js       # Favorites/wishlist state (localStorage persisted)
│
├── data/                         # Static data files
│   ├── products.js               # 5 products with prices, sizes, colors, descriptions
│   └── translations.js           # Full AR/EN translation dictionary (~145 keys per language)
│
├── lib/                          # Utility functions
│   └── utils.js                  # Price calc, discount codes, card formatters, order ID, confetti
│
├── public/                       # Static assets
│   ├── assets/                   # All images (74 files)
│   │   ├── logo_gold.png         # Gold logo
│   │   ├── logo_white.png        # White logo
│   │   ├── sk.png                # Hero background image
│   │   ├── hero.png              # Hero alternative
│   │   ├── feedback-1.webp .. 17 # Customer feedback photos (both .jpg and .webp)
│   │   ├── sk_boutique977-*      # Product images (photo + thumbnail, .jpg and .webp)
│   │   └── (legacy PNGs)         # Unused legacy product images (cashmere_blazer, velvet_abaya, etc.)
│   └── sitemap.xml               # Points to Netlify URL (outdated)
│
├── .opencode/                    # OpenCode configuration
│   ├── config.json               # OpenCode agent config
│   └── rules.md                  # Permanent session rules
├── .vscode/                      # VS Code workspace settings
│   ├── settings.json             # Formatter, ESLint, Tailwind CSS settings
│   └── extensions.json           # Recommended extensions
│
├── package.json                  # Dependencies & scripts
├── next.config.mjs               # Next.js config (output: 'export', images unoptimized)
├── postcss.config.mjs            # PostCSS with @tailwindcss/postcss
├── eslint.config.mjs             # ESLint flat config with next/core-web-vitals
├── jsconfig.json                 # Path alias: @/* → ./*
├── opencode.json                 # OpenCode agent config
├── opencode.bat                  # Launch opencode in project dir
├── تشغيل_المتجر.bat              # Launch dev server + public URL via PowerShell
├── .pagesignore                  # Cloudflare Pages ignore rules
└── AGENTS.md                     # THIS FILE — permanent project memory
```

---

## 3. COMPONENTS MAP

| Component | Purpose | Props |
|-----------|---------|-------|
| `Navbar` | Top navigation bar with logo, links, search, cart/wishlist buttons, theme/language toggles | `isEnglish`, `isThemeDark`, `searchQuery`, `cartCount`, `cartWobble`, `onToggleTheme`, `onToggleLang`, `onSearchChange`, `onCartOpen`, `onSizeGuideOpen`, `onWishlistOpen`, `searchInputRef` |
| `HeroSection` | Hero banner with background image, CTA buttons, promo card (10% off SK10) | `isEnglish` |
| `CatalogSection` | Product grid with category tabs (All/Sets/Outerwear/Blouses), sort dropdown, search filtering | `isEnglish`, `wishlist`, `searchQuery`, `activeCategory`, `sortBy`, `onSetActiveCategory`, `onSetSortBy`, `onToggleWishlist`, `onAddToCart`, `onOpenDetails` |
| `CartDrawer` | Slide-in cart with items, quantity controls, promo code input, subtotal/discount/total | `isOpen`, `isEnglish`, `cart`, `promoInput`, `appliedPromo`, `cartSubtotal`, `cartDiscountAmount`, `cartTotalPrice`, `cartCount`, `onClose`, `onSetPromoInput`, `onApplyPromo`, `onChangeQty`, `onRemoveItem`, `onProceedCheckout` |
| `ProductModal` | Product detail modal with size/color/qty selection, features & shipping tabs | `product`, `isEnglish`, `onClose`, `onAddToCart` |
| `CheckoutModal` | 3-step checkout: Shipping form → Payment method (COD/Card) → Order confirmation with confetti | `isOpen`, `isEnglish`, `cartTotalPrice`, `onClose`, `onOrderSuccess`, `onTriggerConfetti` |
| `FavoritesDrawer` | Slide-in wishlist with favorited products, add-to-cart, remove | `isOpen`, `onClose`, `isEnglish`, `onOpenDetails`, `onAddToCart` |
| `WelcomeSplash` | First-visit welcome screen with logo, brand message, enter button | `visible`, `isEnglish`, `onEnter` |
| `Footer` | Full footer: brand info, links, customer service, newsletter, social, payment badges | `isEnglish`, `onNewsletterSubscribe` |
| `BottomNav` | Mobile bottom navigation (Home/Shop/Cart/Search/Theme) | `isEnglish`, `isThemeDark`, `cartCount`, `onCartOpen`, `onToggleTheme`, `onMobileSearchOpen` |
| `AnimatedBackground` | Parallax floating orbs with mouse tracking and scroll parallax | (none — self-contained) |
| `FeaturesStrip` | 4-column feature grid (Delivery, COD, Returns, EU Certified) | `isEnglish` |
| `VideoSection` | YouTube video embed + promo code card (10% SK10) | `isEnglish` |
| `AboutSection` | Brand identity section with features grid and logo display | `isEnglish` |
| `FeedbackSection` | Customer reviews gallery (17 images, desktop dual-view + mobile horizontal scroll) | `isEnglish`, `feedbackPage`, `onSetFeedbackPage` |
| `SizeGuideModal` | Size chart table (S/M/L/XL, bust/waist/hips/length in cm) | `isOpen`, `isEnglish`, `onClose` |
| `MobileSearch` | Full-screen mobile search overlay with auto-focus | `isOpen`, `isEnglish`, `searchQuery`, `onSearchChange`, `onClose` |
| `ToastNotifications` | Stack of toast notifications (success green, danger red, info gold) | `toasts` |
| `ProductSkeleton` | Loading skeleton cards (animated shimmer) | `count` (default 4) |
| `ConfettiOverlay` | Confetti particle animation on order success | `particles` |
| `InstagramFAB` | Floating Instagram button with gradient background | (none) |
| `BackToTop` | Floating scroll-to-top button with visibility toggle | (none) |

---

## 4. DATA STRUCTURE

### Products (5 active)

| ID | Name (AR) | Name (EN) | Category | Base Price | Sizes | Colors |
|----|-----------|-----------|----------|-----------|-------|--------|
| `prod-pearl-set` | طقم اللؤلؤ المخملي الفاخر | Luxury Velvet Pearl Set | `sets` | 15 JD | S/M/L/XL | Royal Burgundy (+1.5 JD) |
| `prod-wrap-set` | طقم الغزال الكلاسيكي بلفة جانبية | Elegant Side-Wrap Trousers Set | `sets` | 14 JD | S/M/L | Petroleum Blue (+0), Royal Black (+1.5) |
| `prod-belted-blazer` | بليزر الحزام المخملي الكلاسيكي | Classic Belted Wrap Blazer | `outerwear` | 15 JD | S/M/L/XL | Dark Brown (+1.0 JD) |
| `prod-satin-blouse` | بلوزة الساتان الفاخرة بربطة الخصر | Luxury Satin Mock-Neck Blouse | `blouses` | 12 JD | S/M/L/XL | Champagne Beige (+0), Royal Black (+2.0), Royal Blue (+1.5), Pearl White (+1.0) |
| `prod-side-tie-blouse` | قميص الكلاسيك بربطة جانبية وسلاسل | Side-Tie Classic Wrap Shirt | `blouses` | 10 JD | S/M/L | Chocolate Brown (+0), Royal Burgundy (+2.0), Classic Beige (+1.0) |

**Size surcharges:** S=+0, M=+1, L=+2, XL=+3, XXL=+4

### Promo Codes
| Code | Discount | Status |
|------|----------|--------|
| `SK10` | 10% | Active |
| `JORDAN` | 10% | Active |
| `WELCOME10` | 10% | Active |

### Cities for Shipping
**AR:** عمان, إربد, الزرقاء, العقبة, البلقاء, مادبا, الكرك, معان, المفرق, جرش, عجلون, الطفيلة
**EN:** Amman, Irbid, Zarqa, Aqaba, Balqa, Madaba, Karak, Ma'an, Mafraq, Jerash, Ajloun, Tafilah

### FavoritesContext State Shape
```js
{
  favorites: string[],        // Array of product IDs
  toggleFavorite: (id) => void,
  isFavorite: (id) => boolean
}
```
- Persisted to `localStorage` key: `sk_wishlist` (also reads legacy key `favorites`)

### Cart State Shape (in page.js)
```js
{
  id: string,
  title: string,
  price: number,
  image: string,
  size: string,
  color: string,
  quantity: number
}[]
```
- Persisted to `localStorage` key: `sk_cart`

---

## 5. DESIGN SYSTEM

### CSS Custom Properties

**Dark Theme (Default: `:root`)**
```css
--bg-primary: #0a0a0a
--bg-secondary: #121212
--bg-tertiary: #0d0d0d
--bg-elevated: #1a1a1a
--bg-glass: rgba(10, 10, 10, 0.75)
--bg-subtle: rgba(255, 255, 255, 0.05)
--bg-subtle-hover: rgba(255, 255, 255, 0.1)
--text-primary: #ffffff
--text-secondary: #d4d4d8
--text-muted: #a1a1aa
--text-dim: #71717a
--border-subtle: rgba(255, 255, 255, 0.05)
--border-light: rgba(255, 255, 255, 0.08)
```

**Light Theme (`.light-theme`)**
```css
--bg-primary: #FDFBF7
--bg-secondary: #ffffff
--bg-tertiary: #f6f3ed
--bg-elevated: #fffefa
--bg-glass: rgba(253, 251, 247, 0.82)
--bg-subtle: rgba(207, 168, 80, 0.05)
--bg-subtle-hover: rgba(207, 168, 80, 0.1)
--text-primary: #1a1612
--text-secondary: #4a4236
--text-muted: #7a7062
--text-dim: #a89e8e
--border-subtle: rgba(207, 168, 80, 0.1)
--border-light: rgba(207, 168, 80, 0.18)
```

**Named Colors (via `@theme` in CSS — Tailwind v4)**
```css
--color-gold: #cfa850
--color-gold-light: #e8d5a3
--color-champagne: #f7e7ce
--color-shemagh-red: #cc0000
--color-petra-red: #b53a2b
--color-desert-sand: #d4b896
--color-obsidian: #050505
```

### Fonts
| Font | Usage | CSS Variable |
|------|-------|-------------|
| **Cairo** | Arabic body text, headings | `--font-cairo` |
| **Outfit** | English body text | `--font-outfit` |
| **Cinzel** | Brand logo "BOUTIQUE", luxury serif headings | `--font-cinzel` |
| **Playfair Display** | Elegant serif text, light theme headings | `--font-playfair` |
| **Font Awesome 6** | Icons (CDN) | via CDN |

### Custom CSS Classes (in globals.css)
| Class | Purpose |
|-------|---------|
| `.glass-effect` | Glassmorphism with backdrop blur |
| `.gold-divider` | Horizontal gold gradient divider |
| `.card-elegant` | Card with border, shadow, hover glow |
| `.skeleton-shimmer` | Loading skeleton with moving gradient |
| `.toast-animation` | Toast slide-in + fade-out animation |
| `.color-cycle-gradient` | Animated gold gradient |
| `.color-cycle-logo` | Logo hue shift animation |
| `.font-luxury-serif` | Playfair Display serif |
| `.font-luxury-mono` | Cinzel monospace |
| `.min-touch-target` | Minimum 48x48px touch target |
| `.pt-safe`, `.pb-safe`, etc. | Safe area insets for iOS notch |
| `.ios-safe-area` | `env(safe-area-inset-*)` support |
| `.apple-modal-scroll` | iOS smooth scroll within modals |
| `.hover-lift` | Hover lift effect (desktop only) |

### Animations (via `@theme` + `@keyframes`)
| Name | Keyframes | Duration |
|------|-----------|----------|
| `wobble` | Cart icon shake | 0.6s |
| `pulse-glow` | Scale + gold glow | 2s infinite |
| `fade-in` | Opacity 0→1 | 0.4s |
| `slide-up` | TranslateY 30px→0 + opacity | 0.5s |
| `slide-in-right` | TranslateX 100%→0 | 0.4s |
| `confetti-fall` | Top→bottom + rotation | 3s linear |
| `scale-in` | Scale 0.95→1 + opacity | 0.3s |
| `shimmer` | Background position shift | 2s infinite |
| `orb-float` | Floating orb parallax | continuous |
| `heart-pulse` | Heart icon scale bounce | 0.4s |
| `counter-bounce` | Counter badge scale | 0.3s |
| `logo-hue-shift` | Logo filter animation | 8s infinite |
| `skeleton-slide` | Skeleton shimmer | 1.8s infinite |
| `toast-slide-in` | Toast enter | 0.3s |
| `toast-fade-out` | Toast exit | 0.3s (delayed 3.7s) |

### Easing
```css
--ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
--duration-luxury: 0.6s;
```

---

## 6. KNOWN ISSUES

### Bugs Found
1. **Wishlist broken — heart button doesn't work on first click in CatalogSection**
   - The `onToggleWishlist` prop calls `e.stopPropagation()` then `toggleFavorite(id)` from context
   - Context `toggleFavorite` updates state but the heart icon only switches from `far fa-heart` to `fas fa-heart` based on `wishlist.includes(prod.id)` — the `wishlist` prop comes from `favorites` in page.js
   - The issue is that the heart icon animation class `animate-heart-pulse` is added based on `isLiked` which relies on the `wishlist` array passed from page.js
   - If favorites persists to localStorage correctly but the UI doesn't update, it could be a stale closure issue in the `toggleWishlist` callback

2. **~~Sitemap references old Netlify URL~~** ✅ **FIXED** — updated to Vercel URL

3. **Unused legacy product images in `public/assets/`**
   - PNG files like `cashmere_blazer.png`, `velvet_abaya.png`, `wool_coat.png`, `silk_dress.png`, `leather_jacket.png`, `linen_shirt.png`, `tailored_trousers.png`, `shemagh_shawl.png` are NOT referenced in the current product data — they are legacy assets

4. **~~`preload` attribute on `<Image>` in HeroSection~~** ✅ **FIXED** — changed to `priority`

5. **`localStorage` errors silently caught**
   - If localStorage throws (e.g. private browsing), errors are silently swallowed with empty catch blocks

6. **~~CSS `scrollbar-none` class used but not defined~~** ✅ **FIXED** — added to globals.css

7. **Footer Privacy Policy / Terms links point to `#hero`**
   - Not real pages — placeholder anchors

8. **Mobile feedback horizontal scroll has no drag indicator/dots**
   - Only has "swipe to view" text hint

### No TypeScript Errors
- Project uses JavaScript (.js files), no TypeScript config exists (tsconfig.json was attempted but not found)

### No Build Warnings (currently)
- Project builds successfully with `next build` (static export to `/out`)

---

## 7. CURRENT STATE

### Working Features
- ✅ Dark/Light theme toggle (persisted to localStorage)
- ✅ Arabic/English language toggle (persisted to localStorage)
- ✅ Product catalog with category filters (All/Sets/Outerwear/Blouses)
- ✅ Product sorting (Featured/Price Low-High/Price High-Low)
- ✅ Product search (desktop inline + mobile fullscreen)
- ✅ Product detail modal (size, color, quantity selection)
- ✅ Shopping cart (add, remove, change quantity, persisted to localStorage)
- ✅ Promo codes (SK10, JORDAN, WELCOME10 — 10% off)
- ✅ Wishlist/favorites (add/remove, persisted to localStorage)
- ✅ Checkout flow (shipping form → payment method → order confirmation)
- ✅ Cash on Delivery + Credit Card payment options
- ✅ Card number formatting (Visa/MasterCard detection)
- ✅ Confetti animation on order success
- ✅ Toast notifications (success, danger, info)
- ✅ Welcome splash screen (first-time visitors only)
- ✅ Customer feedback gallery (17 images, desktop dual-view + mobile scroll)
- ✅ Size guide modal (S/M/L/XL in cm)
- ✅ Scroll-to-top button
- ✅ Instagram FAB button
- ✅ Mobile bottom navigation
- ✅ Newsletter subscription (toast only — no backend)
- ✅ Animated background (parallax floating orbs)
- ✅ YouTube video embed
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ iOS safe area support
- ✅ Reduced motion support
- ✅ Schema.org JSON-LD structured data
- ✅ Open Graph meta tags
- ✅ Static export (output: 'export')

### Incomplete / Missing Features
- ❌ **Wishlist heart button unreliable** — see Known Issues
- ❌ No real backend/API — cart, orders, newsletter are client-side only
- ❌ No payment gateway integration (card form is UI-only, no real processing)
- ❌ No order tracking system
- ❌ No admin panel
- ❌ No product inventory management
- ❌ No real privacy policy / terms pages (placeholder anchors)
- ❌ No analytics/tracking
- ❌ Sitemap URL outdated (points to old Netlify)
- ❌ No PWA support (no service worker, no manifest)

### Recently Changed (this session)
→ **Part 1:** Created AGENTS.md + .opencode/rules.md
→ **Part 2 (Cleanup):**
- Created `.opencode/config.json` — agent config with deploy/dev/build commands
- Created `.vscode/settings.json` — formatter, ESLint, Tailwind CSS settings
- Created `.vscode/extensions.json` — recommended VS Code extensions
- Fixed `preload` → `priority` in HeroSection.js (Next.js Image prop fix)
- Added `.scrollbar-none` CSS class to globals.css (was missing — used in CatalogSection & FeedbackSection)
- Fixed `sitemap.xml` URL from old Netlify to current Vercel URL
- Built successfully with `npm run build` — **zero errors, zero warnings**
- Verified all imports in all 27 source files — no unused imports, no wrong paths

---

## 8. OPENCODE INSTRUCTIONS

### Commands
| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (http://localhost:3000) |
| `npm run build` | Build for production (static export to `/out`) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `.\تشغيل_المتجر.bat` | Launch dev server (Arabic-friendly batch script) |
| `git push` | Deploy to Cloudflare Pages (auto-deploys from GitHub) |
| `opencode` | Launch OpenCode CLI (use `opencode.bat` shortcut) |

### Build Notes
- Project uses `output: 'export'` in `next.config.mjs`
- Images must be unoptimized (`images.unoptimized: true`)
- No API routes or server components (fully static SPA)
- Cloudflare Pages deploys automatically on git push to main branch
- Deployment config: `opencode.json` has `deploy` and `deploy-draft` commands

### Testing
- No testing framework configured
- Verify changes by running `npm run build` after any edit

---

## 9. SESSION HISTORY

### Session 1 — Tue Jun 9, 2026 (Part 1)
- **Task:** Create permanent memory system for SK BOUTIQUE project
- **Files read:** All 27 source files (4 pages, 22 components, 1 context, 2 data files, 1 lib, 9 config files, plus public assets)
- **Created:** `AGENTS.md` — comprehensive project documentation
- **Created:** `.opencode/rules.md` — permanent session rules
- **Key findings documented:**
  - 5 products with full pricing structure (base + size surcharges + color surcharges)
  - 3 active promo codes (SK10, JORDAN, WELCOME10 — all 10%)
  - 7 known issues including wishlist bug and legacy assets
  - Full design system with dark/light themes, 4 fonts, 12 animations
  - Complete component map with props for all 22 components
      - Full translation dictionary (~145 keys AR/EN)

### Session 1 — Tue Jun 9, 2026 (Part 2 — Cleanup)
- **Task:** Clean up project — add missing configs, fix bugs, clean imports
- **Added:**
  - `.opencode/config.json` — OpenCode agent configuration
  - `.vscode/settings.json` — VS Code workspace settings
  - `.vscode/extensions.json` — recommended extensions
- **Fixed:**
  - `HeroSection.js:44` — changed `preload` to `priority` (valid Next.js Image prop)
  - `globals.css:413-419` — added `.scrollbar-none` class (was missing — breaks scrollbar hiding on mobile catalog/feedback)
  - `sitemap.xml:4` — updated URL from old Netlify `sk-boutique-977.netlify.app` to current Cloudflare `sk-boutique.pages.dev`
- **Verified:**
  - `npm run build` — **0 errors, 0 warnings** — all pages generate statically
  - All 27 source files' imports checked — **no unused imports, no wrong paths**
- **Deleted:** none (no junk files found — no .DS_Store, thumbs.db, or temp files in source)
