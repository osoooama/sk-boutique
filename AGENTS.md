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
- **Canonical URL:** https://sk-boutique.pages.dev

### Tech Stack
| Technology | Version |
|------------|---------|
| Next.js | ^14.2.29 |
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
├── components/                       # All React components (12 files)
│   ├── ui/
│   │   ├── Navbar.tsx                # Top nav — search button, wishlist link, cart button (opens drawer), badge counts
│   │   ├── Footer.tsx                # Full dark footer with logo, social links, features, copyright
│   │   ├── Logo.tsx                  # Animated dual-glow logo (gold + white gradients)
│   │   ├── CartDrawer.tsx            # Slide-in cart drawer with AnimatePresence, quantity controls, checkout link
│   │   ├── ToastContainer.tsx        # Fixed toast notifications (success/error/info/warning) with premium animations
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
│
├── context/                          # React Context providers (4 files)
│   ├── Providers.tsx                 # Composes CartProvider + ToastProvider + WishlistProvider
│   ├── CartContext.tsx               # Cart state with localStorage persistence, add/remove/update/clear
│   ├── ToastContext.tsx              # Toast notification state with auto-dismiss (3.5s)
│   └── WishlistContext.tsx           # Wishlist state with localStorage persistence, toggle/isWishlisted
│
├── lib/                              # Data + types
│   ├── types.ts                      # TypeScript interfaces (Product, Perfume, ProductColor, etc.)
│   ├── products.ts                   # 8 products with colors, sizes, descriptions, shipping
│   └── perfumes.ts                   # 8 perfumes with notes, volume, categories
│
├── scripts/                          # Build/utility scripts
│   ├── process-perfumes.js           # Sharp image processor for perfume .webp generation
│   └── optimize-images.js            # Sharp image optimizer (85% quality, 1200px max)
│
├── public/                           # Static assets (51 files total)
│   ├── clothing/                     # 30 product images (.webp, 6 full-size + 24 thumbnails)
│   ├── perfumes/                     # 9 perfume images (.webp)
│   ├── logo/                         # sk-logo.png + sk-logo.webp
│   ├── icons/                        # PWA icons (icon-192.svg, icon-512.svg)
│   ├── manifest.json                 # PWA manifest
│   ├── sw.js                         # Service worker (generated by next-pwa)
│   └── workbox-*.js                  # Workbox runtime (generated by next-pwa)
│
├── context/                          # React Context providers (4 files)
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
  },
}
```

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
- ❌ No feedback section / customer reviews display
- ❌ No about page
- ❌ No Instagram floating button
- ❌ No mobile bottom navigation
- ❌ No animated background
- ❌ Arabic/English language toggle exists but no full translation dictionary (inline throughout)
- `vaya-rose-notes.webp` image generated but not referenced in any data file (notes infographic, not a product)

### Build Status
- `npm run build` — **0 errors, 0 warnings, 11/11 pages generated** (no static export, uses Node server)

---

## 7. CURRENT STATE

### Working Features
- ✅ Next.js 14 App Router with 11 pages (Home, Shop, Perfumes, Product Detail, Cart, Checkout, Order Confirmation, Wishlist, 404, API route)
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
- ✅ **Toast notifications** — Auto-dismiss (3.5s), 4 types (success/error/info/warning), premium animations
- ✅ **Breadcrumbs** — Navigation with home icon + separator on all pages
- ✅ **Size guide** — Modal with XS-XXL measurements in cm
- ✅ **Back-to-top** — Floating button after 600px scroll
- ✅ **Product recommendations** — Related products (same category) on detail page
- ✅ **Recently viewed** — localStorage tracking, shown on detail page
- ✅ **Add-to-cart** from ProductCard, product detail, wishlist, and perfumes pages
- ✅ **Wishlist heart** on ProductCard + product detail with red active state
- ✅ 3 React Contexts (Cart, Toast, Wishlist) with localStorage persistence
- ✅ Perfume add-to-cart with cart drawer open on add

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
