import type { Product, Perfume, DbProduct, DbPerfume } from "./types";
import { products as staticProducts } from "./products";
import { perfumes as staticPerfumes } from "./perfumes";

const PRODUCTS_KEY = "sk_admin_products";
const PERFUMES_KEY = "sk_admin_perfumes";

function getLocal<T>(key: string, fallback: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export function getLocalProducts(): Product[] {
  return getLocal<Product>(PRODUCTS_KEY, staticProducts);
}

export function getLocalPerfumes(): Perfume[] {
  return getLocal<Perfume>(PERFUMES_KEY, staticPerfumes);
}

export function saveLocalProduct(product: Product) {
  const list = getLocalProducts();
  const idx = list.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    list[idx] = product;
  } else {
    list.push(product);
  }
  setLocal(PRODUCTS_KEY, list);
}

export function removeLocalProduct(id: string) {
  const list = getLocalProducts();
  setLocal(PRODUCTS_KEY, list.filter((p) => p.id !== id));
}

export function saveLocalPerfume(perfume: Perfume) {
  const list = getLocalPerfumes();
  const idx = list.findIndex((p) => p.id === perfume.id);
  if (idx >= 0) {
    list[idx] = perfume;
  } else {
    list.push(perfume);
  }
  setLocal(PERFUMES_KEY, list);
}

export function removeLocalPerfume(id: string) {
  const list = getLocalPerfumes();
  setLocal(PERFUMES_KEY, list.filter((p) => p.id !== id));
}
