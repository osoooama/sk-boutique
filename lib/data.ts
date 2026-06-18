import { useState, useEffect } from "react";
import { products as staticProducts } from "./products";
import { perfumes as staticPerfumes } from "./perfumes";
import {
  getProducts as apiGetProducts,
  getProduct as apiGetProduct,
  getPerfumes as apiGetPerfumes,
  getPerfume as apiGetPerfume,
} from "./products-api";
import type { Product, Perfume } from "./types";

export async function fetchProducts(): Promise<Product[]> {
  try {
    return await apiGetProducts();
  } catch {
    return staticProducts;
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    return await apiGetProduct(id);
  } catch {
    return staticProducts.find((p) => p.id === id) ?? null;
  }
}

export async function fetchPerfumes(): Promise<Perfume[]> {
  try {
    return await apiGetPerfumes();
  } catch {
    return staticPerfumes;
  }
}

export async function fetchPerfume(id: string): Promise<Perfume | null> {
  try {
    return await apiGetPerfume(id);
  } catch {
    return staticPerfumes.find((p) => p.id === id) ?? null;
  }
}

export function useProducts() {
  const [data, setData] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  return { products: data, loading };
}

export function usePerfumes() {
  const [data, setData] = useState<Perfume[]>(staticPerfumes);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPerfumes()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  return { perfumes: data, loading };
}
