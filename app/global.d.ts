declare module "@/components/AnimatedBackground" {
  const Component: React.FC;
  export default Component;
}

declare module "@/components/HeroSection" {
  interface Props { isEnglish: boolean }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/CatalogSection" {
  interface Props { isEnglish: boolean; searchQuery: string; activeCategory: string; sortBy: string; onSetActiveCategory: (c: string) => void; onSetSortBy: (s: string) => void; onAddToCart: (id: string, size: string, color: string, image: string, qty: number) => void; onOpenDetails: (prod: any) => void }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/ProductModal" {
  interface Props { product: any; isEnglish: boolean; onClose: () => void; onAddToCart: (id: string, size: string, color: string, image: string, qty: number) => void }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/CartDrawer" {
  interface Props { isOpen: boolean; isEnglish: boolean; onClose: () => void; onProceedCheckout: () => void }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/CheckoutModal" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/WelcomeSplash" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/Footer" {
  interface Props { isEnglish: boolean; onNewsletterSubscribe?: (email: string) => void }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/Navbar" {
  interface NavbarProps { isEnglish: boolean; isThemeDark: boolean; searchQuery: string; cartCount: number; cartWobble: boolean; onToggleTheme: () => void; onToggleLang: () => void; onSearchChange: (v: string) => void; onCartOpen: () => void; onSizeGuideOpen: () => void; onWishlistOpen: () => void; searchInputRef: React.RefObject<HTMLInputElement | null> }
  const Component: React.FC<NavbarProps>;
  export default Component;
}

declare module "@/components/BottomNav" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/MobileSearch" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/ToastNotifications" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/FeedbackSection" {
  interface Props { isEnglish: boolean }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/FeaturesStrip" {
  interface Props { isEnglish: boolean }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/AboutSection" {
  interface Props { isEnglish: boolean }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/WishlistSection" {
  interface Props { isEnglish: boolean; onOpenDetails: (prod: any) => void; onAddToCart: (id: string, size: string, color: string, image: string, qty: number) => void }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/VideoSection" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/SizeGuideModal" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/ProductSkeleton" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/ConfettiOverlay" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/InstagramFAB" {
  const Component: React.FC;
  export default Component;
}

declare module "@/components/BackToTop" {
  const Component: React.FC;
  export default Component;
}

declare module "@/context/FavoritesContext" {
  export function FavoritesProvider(props: { children: React.ReactNode }): React.ReactElement;
  export function useFavorites(): { favorites: string[]; toggleFavorite: (id: string) => void; isFavorite: (id: string) => boolean };
}

declare module "@/context/ThemeContext" {
  export function useTheme(): { isDark: boolean; isEnglish: boolean; toggleTheme: () => void; toggleLang: () => void };
  export default function ThemeProvider(props: { children: React.ReactNode }): React.ReactElement;
}

declare module "@/context/WishlistContext" {
  export function useWishlist(): { ids: string[]; favorites: string[]; count: number; toggle: (id: string) => boolean; toggleFavorite: (id: string) => void; has: (id: string) => boolean; isFavorite: (id: string) => boolean };
  export default function WishlistProvider(props: { children: React.ReactNode }): React.ReactElement;
}

declare module "@/context/CartContext" {
  interface CartItem { id: string; title: string; price: number; image: string; size: string; color: string; quantity: number }
  export function useCart(): { items: CartItem[]; count: number; subtotal: number; discountRate: number; discountAmount: number; total: number; appliedPromo: string | null; promoInput: string; setPromoInput: (v: string) => void; addItem: (id: string, size: string, color: string, image: string, qty?: number) => void; changeQty: (index: number, delta: number) => void; removeItem: (index: number) => void; clearCart: () => void; applyPromo: (code?: string) => boolean; wobble: boolean };
  export default function CartProvider(props: { children: React.ReactNode }): React.ReactElement;
}

declare module "@/hooks/useMouseTracking" {
  export default function useMouseTracking(): { x: number; y: number };
}

declare module "@/hooks/useScrollAnimation" {
  interface Options { threshold?: number; rootMargin?: string; animationClass?: string }
  export default function useScrollAnimation(selector?: string, options?: Options): { observe: () => void };
}

declare module "@/data/products" {
  interface ProductColor { name: string; englishName: string; value: string; image: string; surcharge: number }
  interface Product { id: string; title: string; englishTitle: string; description: string; englishDescription: string; category: string; price: number; sizes: string[]; colors: ProductColor[]; details: string; englishDetails: string; shipping: string; englishShipping: string }
  const products: Product[];
  export const CITIES_AR: string[];
  export const CITIES_EN: string[];
  export default products;
}

declare module "@/data/translations" {
  const translations: { ar: Record<string, string>; en: Record<string, string> };
  export default translations;
}

declare module "@/lib/utils" {
  export function getProductPrice(product: any, size: string, colorName: string): number;
  export function getSizeSurchargeText(size: string, isEnglish: boolean): string;
  export function getColorSurchargeText(color: any, isEnglish: boolean): string;
  export function getDiscountRate(code: string): number;
  export function generateConfetti(count: number): Array<{ x: number; color: string; delay: number; rotation: number }>;
  export function getCategoryLabel(category: string, isEnglish: boolean): string;
  export function formatCardNumber(value: string): string;
  export function detectCardType(number: string): string;
  export function generateOrderId(): string;
}
