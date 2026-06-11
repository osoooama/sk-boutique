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
