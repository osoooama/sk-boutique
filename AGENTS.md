# SK BOUTIQUE — Permanent Memory

---

## 1. Project Identity

- **Store:** SK BOUTIQUE — Sara Krishan Store (متجر سارة كريشان)
- **Tagline:** European Design · Locally Crafted (تصميم أوروبي · صناعة محلية)
- **Location:** Amman, Jordan
- **Instagram:** @sk_boutique977
- **WhatsApp:** +962 7 9892 1123
- **Email:** sk_boutique977@outlook.com

### Deployment
- **GitHub:** https://github.com/osoooama/sk-boutique
- **Live Site:** https://sk-boutique.osamakreshan352.workers.dev
- **Worker Name:** sk-boutique (Cloudflare Workers + OpenNext adapter)
- **Deploy command:** `npm run deploy` (runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy`)

### Tech Stack
| Technology | Version |
|------------|---------|
| Next.js | ^15.5.19 |
| React | ^18.3.1 |
| Tailwind CSS | ^3.4.17 |
| TypeScript | ^5.7.3 |
| Framer Motion | ^11.18.0 |
| GSAP | ^3.12.7 |
| next-pwa | ^5.6.0 |
| sharp | ^0.33.5 |
| ESLint | ^8.57.1 |
| Prettier | ^3.4.2 |
| @opennextjs/cloudflare | ^1.19.11 |
| Font Awesome | 6.x (CDN) |
| Google Fonts | Alexandria (AR), Inter (EN) |

---

## 2. File Structure

```
sk-boutique/
├── app/                              # Next.js App Router
│   ├── globals.css                   # Tailwind v3 + CSS variables (dark/light themes)
│   ├── layout.tsx                    # Root layout — fonts, metadata, PWA, JSON-LD, Providers + AmbientBackground
│   ├── not-found.tsx                 # 404 page
│   ├── page.tsx                      # Homepage — HeroSlider + Products + Perfumes + FeedbackGallery
│   ├── api/create-order/route.ts     # POST endpoint for logging orders
│   ├── shop/page.tsx                 # Product grid + category filter + breadcrumbs
│   ├── perfumes/page.tsx             # Perfume grid + category filter + TiltCard + add-to-cart
│   ├── cart/page.tsx                 # Full cart + quantity controls + discount code SK30
│   ├── checkout/page.tsx             # Shipping form (36 Jordan cities) → WhatsApp redirect
│   ├── order-confirmation/page.tsx   # Success page with animated SVG checkmark
│   ├── wishlist/page.tsx             # Wishlist grid (products + perfumes)
│   └── product/[id]/page.tsx         # Product detail — images, colors, sizes, related, recently viewed
│
├── components/
│   ├── ui/                           # Shared UI components
│   │   ├── Navbar.tsx                # Pill-shaped nav — scroll hide/show, search, cart/wishlist badges, theme/lang toggle
│   │   ├── Footer.tsx                # Full footer — logo, social links, features, copyright
│   │   ├── Logo.tsx                  # Animated dual-glow logo (framer-motion)
│   │   ├── HeroSlider.tsx            # Full-screen hero — 6 crossfade images, CTA, promo card SK10
│   │   ├── CartDrawer.tsx            # Slide-in cart drawer — quantity controls, discount SK30
│   │   ├── SearchOverlay.tsx         # Full-screen search — live filtering, keyboard shortcut
│   │   ├── Breadcrumbs.tsx           # Navigation breadcrumbs
│   │   ├── SizeGuideModal.tsx        # Modal with XS-XXL size table
│   │   └── BackToTop.tsx             # Floating back-to-top after 600px scroll
│   ├── product/                      # Product-related components
│   │   ├── ProductCard.tsx           # Product card — wishlist heart, quick-add-to-cart
│   │   ├── ColorSwatches.tsx         # Circular color swatches — gold ring, tooltip
│   │   ├── SizeSelector.tsx          # Size grid — gold active state
│   │   └── TiltCard.tsx             # 3D tilt wrapper (use3DTilt hook)
│   ├── Toast/
│   │   ├── ToastContext.tsx          # Single-toast context — 3s auto-dismiss, progress bar
│   │   └── Toast.tsx                 # Glass morphism toast — 4 types, spring animation
│   ├── AmbientBackground.tsx         # 3 floating orbs (fixed, z-0) — CSS variable colors
│   └── FeedbackGallery.tsx           # 20 customer photos — lightbox + mobile carousel
│
├── context/
│   ├── Providers.tsx                 # Composes: ToastProvider > CartProvider > WishlistProvider > ThemeProvider
│   ├── CartContext.tsx               # Cart state — localStorage, add/remove/update/clear, discount SK30
│   ├── WishlistContext.tsx           # Wishlist state — localStorage, toggle/isWishlisted
│   └── ThemeContext.tsx              # Dark/light theme — View Transitions API + ripple animation
│
├── hooks/
│   ├── use3DTilt.ts                  # 3D tilt tracking (mouse → rotateX/Y, touch detection disables on mobile)
│   └── useScrollAnimation.ts         # Wrapper around framer-motion useInView
│
├── lib/
│   ├── types.ts                      # TypeScript interfaces (Product, Perfume, ProductColor, etc.)
│   ├── products.ts                   # 8 static products (fallback data)
│   ├── perfumes.ts                   # 8 static perfumes + getPerfumePrice helper
│   ├── data.ts                       # Unified data hooks — tries Supabase, falls back to static
│   ├── supabase.ts                   # Lazy getSupabase() client
│   ├── products-api.ts               # 12 Supabase CRUD/Storage functions
│   ├── supabase-schema.sql           # SQL migration reference
│   ├── animations.ts                 # Shared framer-motion variants (mobile-aware values)
│   ├── blur-placeholder.ts           # Reusable base64 blur placeholder for <Image>
│   ├── jordan-cities.ts              # 36 cities + getDeliveryFee helper
│   └── phone-validation.ts           # Jordan phone validation (077/078/079)
│
├── scripts/
│   ├── migrate-data.ts               # Upload static data + images to Supabase
│   ├── *.js                          # Build/utility scripts (sharp-based)
├── public/
│   ├── clothing/                     # 30 product images (.webp)
│   ├── perfumes/                     # 8 perfume images (.webp)
│   ├── feedback/                     # 20 customer photos (.webp)
│   ├── logo/sk-logo.webp             # Brand logo
│   ├── icons/icon-192.png + icon-512.png  # PWA icons
│   └── manifest.json                 # PWA manifest
│
├── next.config.js                    # PWA, images, security headers
├── tailwind.config.ts                # Luxury colors, animations, semantic color groups
├── tsconfig.json                     # TypeScript config
├── wrangler.jsonc                    # Cloudflare Workers config
└── AGENTS.md                         # THIS FILE
```

---

## 3. Key Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Build for production — **0 errors required** |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run preview` | Build + local preview on Cloudflare |
| `npx tsc --noEmit` | Type check without emitting |

**After any code edit, always run `npm run build` to verify 0 errors, 0 warnings, 15/15 pages.**

---

## 4. Architecture Notes

### Theme System (Critical)
- Theme uses CSS variables in `:root` (dark) + `.light` class (warm cream #FFFDF7)
- **Do NOT use Tailwind `dark:` modifier** — all theming is via CSS variables
- Theme toggled via `useTheme()` from `context/ThemeContext.tsx`
- Provider wraps in `context/Providers.tsx` (outermost: ToastProvider > CartProvider > WishlistProvider > ThemeProvider)
- Flash prevention: inline `<script>` in layout.tsx reads `localStorage("sk_theme")` and adds `.light` before React hydrates

### Background & Orbs Stacking (Important)
- `html` has `background: var(--bg-primary)` — this is the solid background layer
- `body` has `background: transparent`
- `AmbientBackground` renders at `z-0` (fixed) — orbs float above html background
- Content wrapper at `z-[1]` — pages render above orbs
- **Do NOT add `bg-[var(--page-bg)]`** to page wrappers — this was removed to let orbs show through

### Context Layer Order
```
ToastProvider (outermost)
  └─ CartProvider
       └─ WishlistProvider
            └─ ThemeProvider
                 └─ {children}
```

### Data Layer (lib/data.ts)
- All pages use React hooks from `lib/data.ts` (`useProducts`, `usePerfumes`)
- Tries Supabase API first via `lib/products-api.ts`; catches errors → falls back to static data from `lib/products.ts` / `lib/perfumes.ts`
- Static data is the initial value (no loading flash); Supabase data replaces it silently when available
- Async fetchers (`fetchProducts`, `fetchPerfumes`, `fetchProduct`, `fetchPerfume`) available for non-hook usage
- Admin dashboard uses static data for display + API functions for mutations (writes fail gracefully until Supabase configured)

### Discount Code
- `SK30` = 20% off
- Persisted in localStorage via CartContext
- Applied in CartDrawer, CartPage, Checkout, and WhatsApp message

### Perfume Pricing (lib/perfumes.ts)
- Musk: 5 JD
- Perfume 50ml: 8 JD, 12ml: 6 JD
- Sample: 3 JD
- **Use `getPerfumePrice(perfume)` from `lib/perfumes.ts`** — do NOT define local price functions

---

## 5. Design System

### CSS Variables (globals.css)
All component colors use CSS variables in `:root` + `.light`. Key groups:
- `--bg-primary`, `--bg-secondary`, `--bg-card`, `--bg-card-hover` — backgrounds
- `--text-primary`, `--text-secondary`, `--text-muted`, `--text-on-accent` — text
- `--accent-gold`, `--accent-gold-hover`, `--accent-gold-muted` — gold accents
- `--border-color`, `--border-color-strong` — borders
- `--button-primary-bg`, `--button-primary-text`, `--button-secondary-*` — buttons
- `--nav-bg`, `--nav-border`, `--footer-bg` — navigation/footer
- `--input-bg`, `--input-border`, `--input-text`, `--input-placeholder` — form inputs
- `--shadow-card`, `--shadow-button` — shadows
- `--nav-bg-ghost` — used in Navbar pill bg and mobile menu
- `--toast-bg` — used in Toast component
- `--orb-1`, `--orb-2`, `--orb-3` — ambient background orbs

### CSS Component Classes (globals.css)
| Class | Purpose |
|-------|---------|
| `.glass-card` | Glassmorphism card with hover glow |
| `.gold-gradient` | Gold gradient text/background |
| `.gold-glow` | Gold text-shadow |
| `.section-padding` | Responsive horizontal padding |
| `.btn-primary` | Gold gradient button |
| `.btn-secondary` | Glass border button |
| `.scrollbar-none` | Hide scrollbar |
| `.min-touch-target` | 48px minimum touch target |
| `.line-clamp-1` / `.line-clamp-2` | Text truncation |
| `.title-tooltip` | Hover tooltip on truncated titles |

### Fonts
| Font | Usage |
|------|-------|
| **Alexandria** | Arabic body, headings |
| **Inter** | English body, headings |
| **Font Awesome 6** | Icons (CDN) |

---

## 6. Known Gotchas

### Do NOT Do These
- Do NOT use `dark:` Tailwind modifier — use CSS variables instead
- Do NOT add `bg-[var(--page-bg)]` to page wrappers — breaks orb visibility
- Do NOT define local `getPrice`/`getPerfumePrice` functions — use the one from `lib/perfumes.ts`
- Do NOT import `useTheme` from `@/hooks/useTheme` — the file was deleted; import from `@/context/ThemeContext`
- Do NOT add `overflow-hidden` to AmbientBackground container — orbs need to render freely

### Image Conventions
- All images use `next/image` `<Image>` component (never raw `<img>`)
- All images use `fill` prop with `sizes` attribute
- All images use `placeholder="blur"` + `blurDataURL={BLUR_PLACEHOLDER}` from `lib/blur-placeholder.ts`
- Bilingual alt text: `isEnglish ? englishTitle : title`

### Build Notes
- No `output: 'export'` — needs Cloudflare Workers or Node.js server
- PWA service worker auto-generated by next-pwa at build time
- `npm run deploy` = build + upload to Cloudflare Workers
- Build output goes to `.next/` (default)
- No testing framework configured — verify via `npm run build`

### Mobile Optimization
- `use3DTilt` hook disables 3D tilt on touch devices (prevents sticky hover)
- `lib/animations.ts` uses `IS_MOBILE` check to reduce animation intensity on small screens
- `touch-action: manipulation` on all interactive elements (prevents 300ms delay)
- `-webkit-text-size-adjust: 100%` on body (prevents iOS text inflation)

---

## 7. Data Structure

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
| ID | Category | Price | Sizes |
|----|----------|-------|-------|
| `luxury-velvet-set` | sets | 15 JD | S/M/L/XL |
| `elegant-wrap-set` | sets | 14 JD | S/M/L |
| `belted-wrap-blazer` | outerwear | 15 JD | S/M/L/XL |
| `satin-mockneck-blouse` | blouses | 12 JD | S/M/L/XL |
| `side-tie-wrap-shirt` | blouses | 10 JD | S/M/L |
| `floral-evening-dress` | sets | 18 JD | S/M/L |
| `classic-blazer-set` | sets | 20 JD | S/M/L |
| `printed-top-set` | blouses | 8 JD | S/M/L |

### Perfumes (8 products, 8 images)
| ID | Category | Volume |
|----|----------|--------|
| `perf-vaya-rose` | perfume | 50ml |
| `perf-berry-musk` | musk | 30ml |
| `perf-pomegranate-musk` | musk | 30ml |
| `perf-bride-musk` | musk | 30ml |
| `perf-rose-musk` | musk | 30ml |
| `perf-berry-blend` | perfume | 12ml |
| `perf-bergamot-violet` | perfume | 12ml |
| `perf-vaya-samples` | sample | 2ml |

---

## 8. Project History (Summary)

| Session | Date | What |
|---------|------|------|
| 1 | Old project | SPA with glassmorphism, deleted and replaced |
| 2 | Jun 10, 2026 | New Next.js 14 project foundation, 8 products, 8 perfumes, imagery from SK V.1 |
| 3 | Jun 11, 2026 | Complete store features — cart, checkout, toasts, search, wishlist, breadcrumbs |
| 4 | Jun 11, 2026 | Upgrade to Next.js 15, deploy to Cloudflare Workers, Light/Dark theme |
| 5 | Jun 11, 2026 | UI polish — feedback gallery, pill navbar, checkout upgrade, discount code SK30 |
| 6 | Jun 11, 2026 | CSS variable refactor — all hardcoded colors → semantic CSS variables |
| 7 | Jun 13, 2026 | Bugfix, ambient orbs, toast system replacement, product name truncation |
| 8 | Jun 13, 2026 | Performance — blur placeholders, `<Image>` conversions, mobile optimization |
| 9 | Jun 15, 2026 | ThemeContext provider refactor, CSS cleanup, dead code removal |
| 10 | Jun 15, 2026 | Orbs z-index fix — html background, z-0 orbs, z-1 content wrapper |
| 11 | Jun 15, 2026 | Full dead code audit — 16 CSS classes, 26 files, duplicate logic, broken icons |
| 12 | Jun 18, 2026 | Data layer — `lib/data.ts` hooks + `lib/products-api.ts` CRUD, admin panel, migration script, currency popup |
| 13 | Jun 18, 2026 | **Deploy to production:** Supabase SQL schema, migration (8 products, 8 perfumes, 16 images), env vars in Cloudflare Dashboard, npm run deploy, git commit + push |
