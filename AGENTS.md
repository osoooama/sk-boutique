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
- **Live Site:** https://sk-boutique.osamakreshan352.workers.dev
- **Worker Name:** sk-boutique (Cloudflare Workers + OpenNext adapter)

### Tech Stack
| Technology | Version |
|------------|---------|
| Next.js | ^15.5.19 |
| React | ^18.3.1 |
| React DOM | ^18.3.1 |
| Tailwind CSS | ^3.4.17 |
| TypeScript | ^5.7.3 |
| Framer Motion | ^11.18.0 |
| GSAP | ^3.12.7 |
| next-pwa | ^5.6.0 |
| sharp | ^0.33.5 |
| ESLint | ^8.57.1 |
| Prettier | ^3.4.2 |
| @opennextjs/cloudflare | ^1.19.11 |
| Font Awesome | 6.x (CDN via `<link>`) |
| Google Fonts | Alexandria (AR), Inter (EN) |

---

## 2. FILE TREE

```
sk-boutique/
├── app/                              # Next.js App Router (11 pages)
│   ├── globals.css                   # Tailwind v3 directives, @layer components/utilities
│   ├── layout.tsx                    # Root layout — fonts, metadata, PWA, schema.org JSON-LD + Providers wrapper
│   ├── not-found.tsx                 # 404 page
│   ├── page.tsx                      # Homepage (HeroSlider + Featured Clothing + Perfumes Teaser + Features bar)
│   ├── api/
│   │   └── create-order/
│   │       └── route.ts             # POST endpoint for logging orders
│   ├── shop/
│   │   └── page.tsx                  # Product grid with category filters + breadcrumbs
│   ├── perfumes/
│   │   └── page.tsx                  # Perfume grid with category filters + notes + add-to-cart
│   ├── cart/
│   │   └── page.tsx                  # Full cart page with quantity controls + order summary
│   ├── checkout/
│   │   └── page.tsx                  # Checkout form (name/phone/address/city) → WhatsApp redirect
│   ├── order-confirmation/
│   │   └── page.tsx                  # Success page after placing order
│   ├── wishlist/
│   │   └── page.tsx                  # Wishlist grid with products + perfumes
│   └── product/
│       └── [id]/
│           └── page.tsx              # Product detail (images, colors, sizes, cart/wishlist, size guide, related, recently viewed)
│
├── components/                       # All React components (13 files)
│   ├── Toast/
│   │   ├── ToastContext.tsx          # Single-toast state, 3s auto-dismiss with progress bar (spring entrance)
│   │   └── Toast.tsx                 # Glass morphism toast with framer-motion, progress bar, 4 types
│   ├── ui/
│   │   ├── Navbar.tsx                # Top nav — search button, wishlist link, cart button (opens drawer), badge counts
│   │   ├── Footer.tsx                # Full dark footer with logo, social links, features, copyright
│   │   ├── Logo.tsx                  # Animated dual-glow logo (gold + white gradients)
│   │   ├── CartDrawer.tsx            # Slide-in cart drawer with AnimatePresence, quantity controls, checkout link
│   │   ├── SearchOverlay.tsx         # Full-screen search with keyboard shortcut, live product filtering
│   │   ├── Breadcrumbs.tsx           # Navigation breadcrumbs with home icon + separator
│   │   ├── SizeGuideModal.tsx        # Modal with size table (XS-XXL, bust/waist/hips in cm)
│   │   └── BackToTop.tsx            # Floating back-to-top button, visible after 600px scroll
│   ├── sections/
│   │   └── HeroSlider.tsx            # Full-screen hero with 6 photos, crossfade + ken-burns, CTA buttons, promo card (SK10)
│   └── product/
│       ├── ProductCard.tsx           # Product card with wishlist heart, quick-add-to-cart, image zoom
│       ├── ColorSwatches.tsx         # Circular color swatches with tooltip + gold ring on active
│       └── SizeSelector.tsx          # Size grid with gold states + framer-motion

├── context/                          # React Context providers (3 files)
│   ├── Providers.tsx                 # Composes CartProvider + ToastProvider + WishlistProvider
│   ├── CartContext.tsx               # Cart state with localStorage persistence, add/remove/update/clear
│   └── WishlistContext.tsx           # Wishlist state with localStorage persistence, toggle/isWishlisted
│
├── hooks/                            # Custom React hooks (3 files)
│   ├── use3DTilt.ts                 # 3D tilt tracking (mouse position → rotateX/Y, touch detection)
│   ├── useTheme.ts                  # Theme toggle with View Transitions API + ripple animation
│   ├── useScrollAnimation.ts        # Wrapper around framer-motion `useInView`
│   └── useToast.ts                  # Re-exports useToast from @/components/Toast/ToastContext
│
├── lib/                              # Data + types + utilities
│   ├── types.ts                      # TypeScript interfaces (Product, Perfume, ProductColor, etc.)
│   ├── products.ts                   # 8 products with colors, sizes, descriptions, shipping
│   ├── perfumes.ts                   # 8 perfumes with notes, volume, categories
│   ├── animations.ts                # Shared framer-motion variants (fadeUp, fadeLeft, stagger, perfumeCard)
│   ├── blur-placeholder.ts          # Reusable base64 blur placeholder for Image components
│   ├── jordan-cities.ts             # 36 Jordan cities with delivery fees
│   └── phone-validation.ts          # Phone number validation (077/078/079)
│
├── scripts/                          # Build/utility scripts
│   ├── process-perfumes.js           # Sharp image processor for perfume .webp generation
│   ├── optimize-images.js            # Sharp image optimizer (85% quality, 1200px max)
│   ├── extract-colors.js            # Color extraction utility
│   └── convert-feedback.js          # Convert feedback .jpg → .webp (80 quality)
│
├── public/                           # Static assets (71+ files)
│   ├── clothing/                     # 30 product images (.webp)
│   ├── perfumes/                     # 9 perfume images (.webp)
│   ├── feedback/                     # 20 customer photos (.webp, converted from .jpg)
│   ├── logo/                         # sk-logo.png + sk-logo.webp
│   ├── icons/                        # PWA icons (icon-192.svg, icon-512.svg, icon-192.png, icon-512.png)
│   ├── manifest.json                 # PWA manifest
│   ├── sw.js                         # Service worker (generated by next-pwa)
│   └── workbox-*.js                  # Workbox runtime (generated by next-pwa)
│
├── context/                          # React Context providers (3 files)
├── .opencode/                        # OpenCode configuration
├── .vscode/                          # VS Code workspace settings
├── package.json                      # Dependencies (v2.0.0)
├── next.config.js                    # Next.js config (PWA, images, security headers, bundle analyzer)
├── tailwind.config.ts                # Tailwind v3 config (luxury colors, animations, fonts)
├── postcss.config.js                 # PostCSS (tailwindcss + autoprefixer)
├── tsconfig.json                     # TypeScript config
├── opencode.json                     # OpenCode agent config
├── opencode.bat                      # Launch opencode in project dir
└── AGENTS.md                         # THIS FILE — permanent project memory
```

---

## 3. COMPONENTS MAP

| Component | File | Purpose | Props |
|-----------|------|---------|-------|
| `Navbar` | `components/ui/Navbar.tsx` | Top nav — SK BOUTIQUE logo, 3 links (Home/Shop/Perfumes), search bar, theme/lang toggles | `isEnglish`, `isDark`, `searchQuery`, `onSearchChange`, `onToggleLang`, `onToggleTheme` |
| `Hero` | `components/sections/Hero.tsx` | Full-screen hero — tagline, description, 2 CTA buttons (Collection/Perfumes), promo card SK10 | `isEnglish` |
| `Footer` | `components/ui/Footer.tsx` | Footer section | `isEnglish` |
| `Logo` | `components/ui/Logo.tsx` | Animated logo — dual glow effect via framer-motion, gold SK + white BOUTIQUE gradient text | `className?`, `showText?`, `size?` (sm/md/lg) |
| `ProductCard` | `components/product/ProductCard.tsx` | Product card — links to `/product/[id]`, shows sizes + color swatches | `product: Product`, `isEnglish` |
| `ToastContext` | `components/Toast/ToastContext.tsx` | Single-toast state, 3s auto-dismiss with progress bar (spring entrance) | — |
| `Toast` | `components/Toast/Toast.tsx` | Glass morphism toast with framer-motion, progress bar, 4 types | — |

### Page Components (in `app/`)

| Page | Route | Features |
|------|-------|----------|
| `HomePage` | `/` | Navbar + Hero + Footer |
| `ShopPage` | `/shop` | Navbar + category filter (All/Sets/Outerwear/Blouses) + ProductCard grid (2→3→4 cols) + Footer |
| `PerfumesPage` | `/perfumes` | Navbar + category filter (All/Musk/Perfumes/Samples) + perfume cards with notes + Footer |
| `ProductDetailPage` | `/product/[id]` | Navbar + product detail (image placeholder, title, description, sizes, details, shipping) + Footer |
| `NotFoundPage` | `/*` | Basic 404 |

---

## 4. DATA STRUCTURE

### Types (lib/types.ts)
```typescript
interface ProductColor { name, englishName, hex, images[], surcharge? }
interface Product { id, title, englishTitle, description, englishDescription,
  category: "sets"|"outerwear"|"blouses", basePrice, sizes[], colors[],
  details, englishDetails, shipping, englishShipping, inStock, createdAt }
interface Perfume { id, title, englishTitle, description, englishDescription,
  image, category: "musk"|"perfume"|"sample", basePrice, volume, inStock,
  notes?: { top?[], middle?[], base?[] }, createdAt }
```

### Products (8 active, 30 images)

| ID | AR Name | EN Name | Category | Price | Sizes | Colors |
|----|---------|---------|----------|-------|-------|--------|
| `luxury-velvet-set` | طقم اللؤلؤ المخملي الفاخر | Luxury Velvet Pearl Set | sets | 15 JD | S/M/L/XL | Royal Burgundy (+1.5), Deep Black |
| `elegant-wrap-set` | طقم الغزال الكلاسيكي بلفة جانبية | Elegant Side-Wrap Trousers Set | sets | 14 JD | S/M/L | Petroleum Blue, Royal Black (+1.5) |
| `belted-wrap-blazer` | بليزر الحزام المخملي الكلاسيكي | Classic Belted Wrap Blazer | outerwear | 15 JD | S/M/L/XL | Dark Brown (+1.0) |
| `satin-mockneck-blouse` | بلوزة الساتان الفاخرة بربطة الخصر | Luxury Satin Mock-Neck Blouse | blouses | 12 JD | S/M/L/XL | Champagne Beige, Royal Black (+2.0), Pearl White (+1.0) |
| `side-tie-wrap-shirt` | قميص الكلاسيك بربطة جانبية وسلاسل | Side-Tie Classic Wrap Shirt | blouses | 10 JD | S/M/L | Chocolate Brown, Royal Burgundy (+2.0), Classic Beige (+1.0) |
| `floral-evening-dress` | فستان سهرة أنيق بتصميم عصري | Elegant Modern Evening Dress | sets | 18 JD | S/M/L | Navy Blue |
| `classic-blazer-set` | طقم بليزر وتنورة رسمي | Classic Blazer & Skirt Set | sets | 20 JD | S/M/L | Charcoal |
| `printed-top-set` | طوق أنيق بموديلات متنوعة | Stylish Printed Top Set | blouses | 8 JD | S/M/L | Sapphire Blue |

**Color surcharges** are per-variant (not per-size). Size surcharges are handled at display level only.

### Perfumes (8 products, 9 images)

| ID | AR Name | EN Name | Category | Volume | Notes |
|----|---------|---------|----------|--------|-------|
| `perf-vaya-rose` | عطر Vaya Rose | Vaya Rose Perfume | perfume | 50ml | Top: كرامبولا/فاوانيا/منديرن, Heart: لوتس/ورد, Base: عنبر/خشب الصندل/باتشولي |
| `perf-berry-musk` | مسك التوت | Berry Musk | musk | 30ml | — |
| `perf-pomegranate-musk` | مسك الرمان | Pomegranate Musk | musk | 30ml | — |
| `perf-bride-musk` | مسك العروس | Bride's Musk | musk | 30ml | — |
| `perf-rose-musk` | مسك الورد | Rose Musk | musk | 30ml | — |
| `perf-berry-blend` | مخمرية برائحة التوت | Berry Blend Perfume Oil | perfume | 12ml | — |
| `perf-bergamot-violet` | مخمريه البرغموت والفانيليا وأوراق البنفسج | Bergamot Vanilla Violet | perfume | 12ml | — |
| `perf-vaya-samples` | عينات عطرية من SK | SK Perfume Samples | sample | 2ml | — |

### Perfume Image Mapping
| Image file → | Perfume ID |
|--------------|-----------|
| `vaya-rose.webp` + `vaya-rose-notes.webp` | `perf-vaya-rose` |
| `berry-musk.webp` | `perf-berry-musk` |
| `pomegranate-musk.webp` | `perf-pomegranate-musk` |
| `brides-musk.webp` | `perf-bride-musk` |
| `rose-musk.webp` | `perf-rose-musk` |
| `berry-blend.webp` | `perf-berry-blend` |
| `bergamot-vanilla-violet.webp` | `perf-bergamot-violet` |
| `perfume-samples.webp` | `perf-vaya-samples` |

### Source Images (from `C:\Users\osama\Desktop\SK V.1\`)
- **Clothing:** 30 images (6 `photo-*` + 24 `thumbnail-*`) → 8 products
- **Perfumes:** 9 images (Arabic filenames with emojis) → 8 perfumes + 1 notes infographic
- **Logo:** `SK V.1.png` → `public/logo/sk-logo.webp`

---

## 5. DESIGN SYSTEM

### Tailwind Custom Colors (tailwind.config.ts)
```js
colors: {
  luxury: {
    black:  "#0A0A0A",
    white:  "#FFFFFF",
    gold:   "#C9A84C",
    gold-light: "#E8C97A",
    gold-dark:  "#A07830",
    cream:  "#F5F0E8",
    charcoal: "#1A1A1A",
    beige:  "#EDE7DC",
  },
  gold: {
    DEFAULT: "#C9A84C",
    light:  "#E8C96B",
    dark:   "#A8873A",
  },
  surface: { primary, secondary, card, "card-hover", nav, footer, page },
  content: { primary, secondary, muted, "on-accent" },
  accent:  { gold, "gold-hover", "gold-muted" },
  border:  { DEFAULT, strong },
  input:   { bg, border, text, placeholder },
  button:  { "primary-bg", "primary-text", "secondary-bg", "secondary-border", "secondary-text" },
}
```

### CSS Variables (globals.css)
All component colors use CSS variables defined in `:root` (dark) + `.light` (warm cream). Key variables:
- `--bg-primary` / `--bg-secondary` / `--bg-card` / `--bg-card-hover` — backgrounds
- `--text-primary` / `--text-secondary` / `--text-muted` / `--text-on-accent` — text
- `--accent-gold` / `--accent-gold-hover` / `--accent-gold-muted` — gold accents
- `--border-color` / `--border-color-strong` — borders
- `--button-primary-bg` / `--button-primary-text` — primary buttons
- `--nav-bg` / `--nav-border` / `--footer-bg` — navigation + footer
- `--input-bg` / `--input-border` / `--input-text` / `--input-placeholder` — form inputs
- `--shadow-card` / `--shadow-button` — shadows
- `--success-bg` / `--success-text` / `--success-border` — success states

### Fonts
| Font | Usage | CSS Variable |
|------|-------|-------------|
| **Alexandria** | Arabic body, headings | `--font-alexandria` |
| **Inter** | English body, headings | `--font-inter` |
| **Font Awesome 6** | Icons (CDN) | via `<link>` in layout |

### Tailwind Animations (keyframes)
| Name | Purpose | Duration |
|------|---------|----------|
| `fade-in` | Fade in | 0.5s |
| `fade-up` | Fade + slide up | 0.6s |
| `shimmer` | Skeleton loading | 2s infinite |
| `float` | Hover float | 6s infinite |
| `pulse-glow` | Gold glow pulse | 2s infinite |
| `slide-in-right` | Slide from right | 0.4s |
| `slide-in-left` | Slide from left | 0.4s |
| `scale-in` | Scale in | 0.3s |

### CSS Component Classes (in globals.css)
| Class | Purpose |
|-------|---------|
| `.glass` | Backdrop blur nav bar |
| `.glass-card` | Glassmorphism card |
| `.gold-gradient` | Gold gradient text/background |
| `.btn-primary` | Gold gradient button |
| `.btn-secondary` | Glass border button |
| `.section-padding` | Responsive horizontal padding |
| `.scrollbar-none` | Hide scrollbar |
| `.min-touch-target` | 48px minimum touch target |
| `.pt-safe` / `.pb-safe` | Safe area insets |

### Layout Conventions
- All pages: `min-h-screen bg-luxury-black text-luxury-white` with conditional `dir={isEnglish ? "ltr" : "rtl"}`
- Page structure: `Navbar` → `main` (pt-28 pb-20) → `Footer`
- Product grid: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6`
- Cards: `glass-card` with `hover:border-luxury-gold/20 transition-all duration-500`

---

## 6. KNOWN ISSUES

### Minor / Non-Critical
- ❌ No about page
- ❌ No Instagram floating button
- ❌ No mobile bottom navigation
- ❌ Arabic/English language toggle exists but no full translation dictionary (inline throughout)
- `vaya-rose-notes.webp` image generated but not referenced in any data file (notes infographic, not a product)

### Build Status
- `npm run build` — **0 errors, 0 warnings, 11/11 pages generated** (no static export, uses Node server)

---

## 7. CURRENT STATE

### Working Features
- ✅ Next.js 15 App Router with 11 pages (Home, Shop, Perfumes, Product Detail, Cart, Checkout, Order Confirmation, Wishlist, 404, API route)
- ✅ TypeScript throughout (all components/pages are .tsx)
- ✅ Tailwind CSS v3 with luxury gold/black design system
- ✅ Alexandria + Inter Google Fonts
- ✅ PWA support via next-pwa (service worker, manifest, icons)
- ✅ Full OG metadata, schema.org JSON-LD, SEO tags
- ✅ Security headers (X-Frame-Options, X-Content-Type, Referrer-Policy, XSS)
- ✅ Image caching headers (1 year immutable for media)
- ✅ 30 clothing images processed and mapped to 8 products
- ✅ 9 perfume images processed (8 perfume products + 1 notes infographic)
- ✅ Dual-glow animated logo component (framer-motion)
- ✅ glass-card / glass / btn-primary / btn-secondary CSS components
- ✅ Reduced motion support (CSS-level)
- ✅ iOS safe area support
- ✅ Responsive product grid (2→3→4 columns)
- ✅ Language toggle (isEnglish/isDark) via useState on each page
- ✅ Scrollbar hiding utility class
- ✅ **Cart system** — Context + localStorage + drawer + full cart page + quantity controls
- ✅ **Checkout flow** — Shipping form → validation → WhatsApp redirect → API order logging → confirmation page
- ✅ **Wishlist** — Context + localStorage + heart toggle + dedicated wishlist page
- ✅ **Search** — Full-screen overlay with live product filtering
- ✅ **Toast notifications** — Auto-dismiss (3.5s), 4 types (success/error/info/warning), premium animations, progress bar
- ✅ **Breadcrumbs** — Navigation with home icon + separator on all pages
- ✅ **Size guide** — Modal with XS-XXL measurements in cm
- ✅ **Back-to-top** — Floating button after 600px scroll
- ✅ **Product recommendations** — Related products (same category) on detail page
- ✅ **Recently viewed** — localStorage tracking, shown on detail page
- ✅ **Add-to-cart** from ProductCard, product detail, wishlist, and perfumes pages
- ✅ **Wishlist heart** on ProductCard + product detail with red active state
- ✅ 3 React Contexts (Cart, Toast, Wishlist) with localStorage persistence
- ✅ Perfume add-to-cart with cart drawer open on add
- ✅ **3D tilt** on perfume cards via `use3DTilt` + `TiltCard` component
- ✅ **Scroll entrance animations** via framer-motion shared variants (fadeUp, fadeLeft, stagger)
- ✅ **Magic ripple theme transition** via View Transitions API + clip-path circle
- ✅ **Smart navbar** — scroll hide/show, pill morph, cart badge spring+flip, hamburger→X
- ✅ **Animated CartDrawer** + **SVG order confirmation** animation sequence
- ✅ **Ambient background** — 3 CSS-variable-driven floating orbs
- ✅ **Mobile optimization** — touch detection disables 3D tilt, lighter animations (reduced y/duration/stagger)
- ✅ **All images use `<Image>`** — WebP, blur placeholders, `sizes`, `loading="lazy"`, bilingual alt text
- ✅ **Feedback gallery** — 20 WebP customer photos, lightbox modal, mobile carousel
- ✅ **CSS variable theme** — `:root` (dark) + `.light` (warm cream), no hardcoded colors

---

## 8. OPENCODE INSTRUCTIONS

### Commands
| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `node scripts/process-perfumes.js` | Process perfume images to .webp |
| `node scripts/convert-feedback.js` | Convert feedback .jpg to .webp |
| `opencode` | Launch OpenCode CLI (use `opencode.bat` shortcut) |

### Build Notes
- No `output: 'export'` in next.config.js — needs Node.js server (Vercel) or Cloudflare adapter
- Images are optimized by default (Next.js built-in optimizer)
- PWA service worker generated at build time by next-pwa
- Build output goes to `.next/` (default Next.js output)

### Testing
- No testing framework configured
- Verify changes by running `npm run build` after any edit

---

## 9. SESSION HISTORY

### Session 1 (Retroactive) — Old Project
- Original SK BOUTIQUE project built as SPA with glassmorphism design
- Next.js 16, React 19, Tailwind v4, TypeScript, framer-motion, 22 JS components
- Static export on Cloudflare Pages
- Deleted and replaced with clean Next.js 14 project

### Session 2 — Wed Jun 10, 2026 (Part 1 — New Project Foundation)
- **Task:** Replace old project with clean Next.js 14 project with PWA, TypeScript, and imagery from SK V.1
- **Source images:** `C:\Users\osama\Desktop\SK V.1\` (30 clothing + 9 perfume + 1 logo)
- **Clothing images:** processed via sharp → `public/clothing/*.webp` (600×800, quality 90, effort 6)
- **Logo:** `SK V.1.png` → `public/logo/sk-logo.webp` (via manual conversion, 80px)
- **Created:**
  - `lib/types.ts` — TypeScript interfaces for Product, Perfume, ProductColor, NavLink, Translations
  - `lib/products.ts` — 8 products grouped from 30 images with colors, sizes, descriptions
  - `lib/perfumes.ts` — 8 perfumes with notes, volumes, categories (image refs fixed to .webp)
  - `components/ui/Logo.tsx` — Animated dual-glow logo with framer-motion
  - `components/ui/Navbar.tsx` — Top nav with search, theme/lang toggles, 3 links
  - `components/sections/Hero.tsx` — Full-screen hero with CTA + promo card
  - `components/product/ProductCard.tsx` — Product card linking to detail page
  - `app/shop/page.tsx` — Product grid page with category filter
  - `app/perfumes/page.tsx` — Perfume page with category filter + notes display
  - `app/product/[id]/page.tsx` — Product detail page with sizes/details/shipping
  - `scripts/process-perfumes.js` — Sharp-based perfume image processor
  - `tailwind.config.ts` — Luxury color scheme + animations
  - `postcss.config.js`, `next.config.js` — Build configs (PWA, images, security)
- **Verified:** `npm run build` — **0 errors, 6/6 pages generate**

### Session 3 — Thu Jun 11, 2026 (Part 2 — Complete Store Features)
- **Task:** Build all missing store functionality — cart, checkout, toasts, search, wishlist, breadcrumbs, size guide, back-to-top, recently viewed, recommendations
- **New architecture:** React Context API — `context/CartContext.tsx`, `context/ToastContext.tsx`, `context/WishlistContext.tsx` composed by `context/Providers.tsx` wrapping root layout
- **Pages created (4):**
  - `app/cart/page.tsx` — Full cart with quantity controls, order summary, clear cart, AnimatePresence
  - `app/checkout/page.tsx` — Shipping form (name/phone/address/city/notes) with validation, WhatsApp redirect + order API logging
  - `app/order-confirmation/page.tsx` — Success page with WhatsApp redirect confirmation
  - `app/wishlist/page.tsx` — Wishlist grid supporting both products + perfumes, add-to-cart button
- **API route:**
  - `app/api/create-order/route.ts` — POST endpoint logging order data
- **Components created (5):**
  - `components/ui/CartDrawer.tsx` — Slide-in drawer with AnimatePresence, quantity controls, cart badge sync, checkout link
  - `components/ui/ToastContainer.tsx` — Centered auto-dismiss toasts (success/error/info/warning) with premium animations
  - `components/ui/SearchOverlay.tsx` — Full-screen search with live product filtering (title/englishTitle)
  - `components/ui/Breadcrumbs.tsx` — Navigation breadcrumbs with home icon
  - `components/ui/SizeGuideModal.tsx` — Modal with XS-XXL size table (bust/waist/hips in cm) + measuring tips
  - `components/ui/BackToTop.tsx` — Floating button visible after 600px scroll, smooth scroll
- **Existing components enhanced:**
  - `Navbar.tsx` — Search button, wishlist link with badge, cart badge from real CartContext, mobile menu now has wishlist/cart links
  - `ProductCard.tsx` — Wishlist heart toggle with red state, "Add to Cart" quick-add button opening drawer, toast feedback
  - `product/[id]/page.tsx` — Real add-to-cart with size validation, wishlist heart, "Buy Now" opens drawer, "in cart" badge, size guide trigger, recently viewed (localStorage), related products (same category), breadcrumbs, BackToTop
- **Existing pages enhanced:**
  - `app/layout.tsx` — Wraps with `<Providers>` for Cart/Toast/Wishlist contexts
  - `app/page.tsx` — CartDrawer, SearchOverlay, ToastContainer, BackToTop, search-open Navbar
  - `app/shop/page.tsx` — Same + Breadcrumbs
  - `app/perfumes/page.tsx` — Same + Breadcrumbs + add-to-cart for perfumes
- **State management:** 3 React Contexts with localStorage persistence, auto-dismiss toasts (3.5s), cart with add/remove/update/clear
- **Data flow:** Cart drawer opens on add-item, toasts appear at top center, search filters 8 products, wishlist syncs heart state across ProductCard + detail + wishlist page
- **Verified:** `npx tsc --noEmit` = **0 errors** | `npm run build` = **0 errors, 0 warnings, 11/11 pages generated**

### Session 4 — Thu Jun 11, 2026 (Part 3 — Deploy + Bugfix + Polish)
- **Task:** Upgrade Next.js 14.2.29 → 15.5.19, install OpenNext Cloudflare adapter, deploy to Cloudflare Workers, fix OS compatibility bugs, add Light/Dark theme + color swatch fixes
- **Upgrade:** `next` 14.2.29 → 15.5.19, `react`/`react-dom` 18.3.1, `@opennextjs/cloudflare` 1.19.11, `next.config.js` updated (PWA, images, headers), `wrangler.jsonc` created (nodejs_compat, images binding)
- **Deploy:** `npm run deploy` → site live at `https://sk-boutique.osamakreshan352.workers.dev`
- **GitHub:** Commit + push all sessions (v2.0 features + OpenNext/Next.js 15 config)
- **Bugfixes (5):**
  - ToastContainer missing on 5 pages (cart, checkout, wishlist, product/[id], order-confirmation) — added
  - SearchOverlay missing on shop, perfumes pages — added
  - Perfume image path double-slash (`/perfumes//berry-musk.webp`) — fixed Image src
  - Navbar `lastScroll` refactored from `let` to `useRef` (stale closure bug)
  - Dead `getPerfumePrice` function in product detail — removed
- **Light/Dark theme (working):** `isDark` toggle adds/removes `light` class on `<html>`, CSS variables switch backgrounds, glass becomes translucent white, text inverts, localStorage persists `sk_theme`, inline init script prevents flash
- **Color swatches:** Updated hex values to match actual fabric colors (burgundy #6B1D2F, petroleum blue #2A5C6E, chocolate brown #4A2C2A, champagne beige #E8CEB5)
- **Perfume pricing:** Updated to 5–10 JD range (musk 5 JD, perfume 6–8 JD, samples 3 JD)
- **Pages domain cleanup:** Deleted old `sk-boutique` Pages project; final URL is `sk-boutique.osamakreshan352.workers.dev`
- **Verified:** `npm run build` = **0 errors, 0 warnings, 11/11 pages** | Worker deployed & serving correctly

### Session 5 — Thu Jun 11, 2026 (Part 4 — UI Polish + Checkout Upgrade)
- **Task:** 6 sections of modifications: photo gallery feedback, warm cream light mode, color swatch refinement, floating pill header, checkout upgrade, cart behavior + discount code + credit line
- **Section 1 — Feedback Gallery:** Replaced text reviews with `FeedbackGallery.tsx` (20 customer photos, lightbox modal, mobile carousel, 2→3→4 cols)
- **Section 2 — Light Mode:** Warm cream (#FFFDF7) CSS variables, gold shadows, premium buttons/cards, gold dividers
- **Section 3 — Color Swatches:** 28px circles, gold ring selection, tooltip above
- **Section 4 — Floating Pill Header:** Rounded pill (20px), scroll detection at 60px, dynamic bg/blur/border/shadow, gold gradient cart badge with pop animation
- **Section 5 — Checkout Upgrade:** 36 Jordan cities dropdown with delivery fees (2/3 JD), phone validation (077/078/079 only), backup phone field, delivery fee badge in summary
- **Section 6 — Cart + Discount + Credit:**
  - Cart drawer opens ONLY on icon click (removed auto-open from ProductCard, perfumes, product detail, wishlist)
  - Discount code SK30 = 20% off in CartContext with localStorage persistence, applied in CartDrawer, CartPage, Checkout (with WhatsApp message)
  - Footer credit line: animated "قام بإنشاء هذه الصفحة @osamakreishan" with Instagram link
- **New files:** `components/FeedbackGallery.tsx`, `lib/jordan-cities.ts`, `lib/phone-validation.ts`, `hooks/useTheme.ts`, `public/feedback/` (20 images)
- **Modified files (16):** `app/cart/page.tsx`, `app/checkout/page.tsx`, `app/globals.css`, `app/page.tsx`, `app/perfumes/page.tsx`, `app/product/[id]/page.tsx`, `app/wishlist/page.tsx`, `components/product/ColorSwatches.tsx`, `components/product/ProductCard.tsx`, `components/ui/CartDrawer.tsx`, `components/ui/Footer.tsx`, `components/ui/Navbar.tsx`, `context/CartContext.tsx`, `tailwind.config.ts`, `public/sw.js`, `scripts/extract-colors.js`
- **Discount code:** SK30 — 20% off, persists in localStorage, shown in drawer/cart/checkout/WhatsApp
- **RTL preserved:** All Arabic layout and dir attributes maintained
- **Verified:** `npm run build` = **0 errors, 0 warnings, 11/11 pages**

### Session 6 — Thu Jun 11, 2026 (Part 5 — CSS Variable Dark Theme Refactor)
- **Task:** Replace ALL hardcoded color values (luxury-black/white/gold, border-white/*, text-gray-*, hex colors) with semantic CSS variables across all 11 pages and 12+ components
- **Foundation:** `app/globals.css` rewritten with 35+ CSS variables in `:root` (dark) + `.light` (warm cream) for backgrounds, text, borders, accents, inputs, buttons, nav, footer, cards, badges, shadows, success states
- **Tailwind config:** Added 6 new semantic color groups (`surface`, `content`, `accent`, `border`, `input`, `button`) mapped to `var(--...)` for use in component className attributes
- **Body tag cleanup:** Removed `bg-luxury-black text-luxury-white selection:bg-luxury-gold/30` from `layout.tsx` — CSS variables in globals.css handle these
- **Component updates (parallel via task agents):**
  - `components/ui/` (9 files): Navbar, Footer, Logo, CartDrawer, ToastContainer, SearchOverlay, Breadcrumbs, SizeGuideModal, BackToTop
  - `components/sections/` (2 files): HeroSlider, Hero (promo card + badge colors)
  - `components/product/` (3 files): ProductCard, ColorSwatches, SizeSelector
  - `components/FeedbackGallery.tsx` — card bgs, hover borders, nav buttons
- **Page updates (7 files):** Home, Shop, Perfumes, Product Detail, Cart, Checkout, Wishlist, Order Confirmation, 404
- **Replacement patterns:** ~150+ color classes replaced across all files with patterns like `bg-luxury-black→bg-surface-primary`, `text-luxury-gold→text-accent-gold`, `border-white/10→border-border`, `bg-luxury-gold/10→bg-accent-gold-muted`, `text-gray-400→text-content-secondary`
- **Built-in globals.css component classes:** `glass`, `glass-card`, `btn-primary`, `btn-secondary`, `card-product`, `size-btn`, `filter-btn`, `add-to-cart-btn`, `gold-divider`, `pill-badge`, `gold-gradient`, `aurora-bg`, custom scrollbar, selection color
- **Opacity overlays kept:** `bg-black/50`, `bg-black/60`, `bg-black/80`, `bg-black/85` for lightbox modals and image overlays (these overlay images, not theme backgrounds)
- **Verified:** `npm run build` = **0 errors, 0 warnings, 11/11 pages** | `npm run lint` = **0 warnings/errors** | `npx tsc --noEmit` = **0 errors**

### Session 7 — Sat Jun 13, 2026 (Part 6 — Bugfix + UI Polish + Toast Replacement)
- **Task:** Fix CSS variable/theme bugs, fix product name truncation, add ambient background orbs, replace toast system with single-toast + progress bar + spring animation
- **Bugfixes (6):** Removed `dark:` modifier leftovers in 4 files (checkout, Navbar, ToastContainer, CartDrawer), replaced hardcoded rgba with CSS variables in Navbar pill bg and ToastContainer, fixed `isEnglish` defaults from true→false in 4 pages (cart, checkout, wishlist, order-confirmation), changed `from-luxury-black/60`→`from-surface-primary/60` in page.tsx, removed broken `ignoreDeprecations: "6.0"` from tsconfig.json
- **Product name truncation:** Added `.line-clamp-1/2/3` CSS classes + `.title-tooltip` hover overlay + `[dir="rtl"]` rules in globals.css; updated ProductCard.tsx and all 7+ card layouts (homepage, perfumes, wishlist, product detail, cart, cart drawer, search overlay) with `line-clamp-2` (clothing) or `line-clamp-1` (perfumes) + hover tooltip
- **Ambient Background:** Added `--orb-1/2/3` CSS variables (dark: gold/purple/blue; light: soft gold/pink/lavender) + `@keyframes float-orb` in globals.css; created `components/AmbientBackground.tsx` with 3 fixed floating orbs (blur 90-120px, float animation 22-35s, z-index -1); added to layout.tsx
- **Toast system replacement:** Removed old `context/ToastContext.tsx` and `components/ui/ToastContainer.tsx` (multi-toast, no progress bar). Created new `components/Toast/ToastContext.tsx` (single-toast state, 3s auto-dismiss with `setInterval` progress tracking, spring animation via framer-motion), `components/Toast/Toast.tsx` (glass morphism UI, progress bar, 4 type styles), `hooks/useToast.ts` (re-export). Updated all 8 pages/components using toast to import from new path. Build = 0 errors.
- **Cleanup:** Removed `console.log` from `app/api/create-order/route.ts`; removed unused `searchQuery`/`setSearchQuery` state from home, shop, perfumes pages
- **APK generation:** Directed user to `https://pwabuilder.com/pwa?url=https://sk-boutique.osamakreshan352.workers.dev` for Android APK (no Android SDK available locally)
- **Verified:** `npm run build` = **0 errors, 0 warnings, 11/11 pages**

### Session 10 — Sat Jun 13, 2026 (Part 7 — Final Optimization + Performance + Mobile Polish)
- **Task:** Fix canonical URLs, convert all `<img>` to `<Image>`, add blur placeholders, fix bilingual alt text, mobile touch detection, lighter mobile animations, feedback gallery WebP conversion
- **URL fixes (layout.tsx):** Changed all `pages.dev` → `workers.dev` (canonical, OpenGraph, schema.org JSON-LD, search action URL). Fixed viewport `themeColor` from `#0A0A0A` → `#C9A96E` to match manifest.
- **Blur placeholders:** Created `lib/blur-placeholder.ts` with reusable base64 `BLUR_PLACEHOLDER`. Added `placeholder="blur"` + `blurDataURL` to all 3 existing `<Image>` components (ProductCard, HeroSlider, Logo) + all 14 new `<Image>` conversions.
- **Bilingual alt text:** Fixed 10 instances of Arabic-only `alt` text across 7 files (cart, perfumes, search overlay, wishlist × 2, homepage, product detail × 4, cart drawer) to use `isEnglish ? englishTitle : title` pattern.
- **15 `<img>`→`<Image>` conversions:** Converted native HTML `<img>` tags in perfumes page (1), wishlist page (2), homepage (1), product detail page (4), cart page (1), cart drawer (1), search overlay (1), feedback gallery (3). All use `fill` with `sizes` prop, `loading="lazy"`, `placeholder="blur"`.
- **Mobile touch detection:** `hooks/use3DTilt.ts` now checks `IS_TOUCH_DEVICE` on init; returns empty `tiltStyle`/`shimmerStyle` on touch devices, skips event listeners entirely. No sticky hover states on mobile.
- **Lighter mobile animations:** `lib/animations.ts` uses `IS_MOBILE` check (`window.innerWidth < 768`) to halve `y` values (40→20), reduce duration (0.5→0.35), reduce stagger delays, disable `rotateZ` on perfume cards.
- **Feedback gallery WebP:** 20 customer photos converted from .jpg→.webp (24–43% smaller via `scripts/convert-feedback.js`, quality 80). All `FeedbackGallery.tsx` image references updated to `.webp`, converted from `<img>` to `<Image>` with blur placeholders.
- **Deployed:** `npm run deploy` → 0 errors, live at `https://sk-boutique.osamakreshan352.workers.dev`
- **Verified:** `npm run build` = **0 errors, 0 warnings, 11/11 pages**

## Key Decisions
- `use3DTilt` hook returns `tiltStyle` + `shimmerStyle` as React.CSSProperties rather than using framer-motion (avoids conflict with scroll entrance variants)
- `TiltCard` component wraps inner div (not `motion.div`) to separate scroll entrance animation from 3D tilt hover effect
- Mobile touch detection disables 3D tilt via `IS_TOUCH_DEVICE` constant in `use3DTilt` to prevent sticky hover states
- Toast placed at `components/Toast/` not `context/` — separates UI from context logic, aligns with component folder structure
- CSS variables for theme (+ `.light` class) instead of Tailwind `dark:` modifier — prevents class pollution and enables smooth view-transition animation
- `will-change: transform` on animated cards with `overflow: hidden` on parent to prevent clipping
- Blur placeholder uses 1×1 gray base64 PNG (~68 bytes) for all images — consistent, minimal overhead
- Mobile animation values computed at module init time for zero runtime check overhead during animations
