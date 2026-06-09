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
  interface Props { isEnglish: boolean; wishlist: string[]; searchQuery: string; activeCategory: string; sortBy: string; onSetActiveCategory: (c: string) => void; onSetSortBy: (s: string) => void; onToggleWishlist: (e: React.MouseEvent, id: string) => void; onAddToCart: (id: string, size: string, color: string, image: string, qty: number) => void; onOpenDetails: (prod: any) => void }
  const Component: React.FC<Props>;
  export default Component;
}

declare module "@/components/CartDrawer" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/ProductModal" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/CheckoutModal" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/FavoritesDrawer" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/WelcomeSplash" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/Footer" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/Navbar" {
  const Component: React.FC<any>;
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
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/FeaturesStrip" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/VideoSection" {
  const Component: React.FC<any>;
  export default Component;
}

declare module "@/components/AboutSection" {
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
  export function getDiscountRate(code: string): number;
  export function generateConfetti(count: number): Array<{ x: number; color: string; delay: number; rotation: number }>;
  export function getCategoryLabel(category: string, isEnglish: boolean): string;
  export function formatCardNumber(value: string): string;
  export function detectCardType(number: string): string;
  export function generateOrderId(): string;
}
