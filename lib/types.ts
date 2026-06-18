export interface ProductColor {
  name: string;
  englishName: string;
  hex: string;
  images: string[];
  surcharge?: number;
}

export interface Product {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  englishDescription: string;
  category: "sets" | "outerwear" | "blouses";
  basePrice: number;
  sizes: string[];
  colors: ProductColor[];
  details: string;
  englishDetails: string;
  shipping: string;
  englishShipping: string;
  inStock: boolean;
  createdAt: string;
}

export interface Perfume {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  englishDescription: string;
  image: string;
  category: "musk" | "perfume" | "sample";
  basePrice: number;
  volume: string;
  inStock: boolean;
  notes?: {
    top?: string[];
    middle?: string[];
    base?: string[];
  };
  createdAt: string;
}

export interface NavLink {
  href: string;
  label: string;
  englishLabel: string;
  icon?: string;
}

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  ar: Translation;
  en: Translation;
}

// --- Supabase row types ---

export interface DbColor {
  name: string;
  englishName: string;
  hex: string;
  images: string[];
  surcharge?: number;
}

export interface DbProduct {
  id: string;
  name_ar: string;
  name_en: string;
  price: number;
  sizes: string[];
  colors: DbColor[];
  images: string[];
  category: string;
  description_ar: string | null;
  description_en: string | null;
  details_ar: string | null;
  details_en: string | null;
  shipping_ar: string | null;
  shipping_en: string | null;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbPerfume {
  id: string;
  name_ar: string;
  name_en: string;
  price: number;
  size_ml: number | null;
  volume: string | null;
  scent_type: string[];
  images: string[];
  description_ar: string | null;
  description_en: string | null;
  notes: Record<string, string[]> | null;
  category: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
