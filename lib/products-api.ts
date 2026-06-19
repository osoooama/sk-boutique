import { getSupabase } from "./supabase";
import type { Product, Perfume, ProductColor, DbProduct, DbPerfume } from "./types";
import {
  getLocalProducts, saveLocalProduct, removeLocalProduct,
  getLocalPerfumes, saveLocalPerfume, removeLocalPerfume,
} from "./local-store";

function toProduct(row: DbProduct): Product {
  return {
    id: row.id,
    title: row.name_ar,
    englishTitle: row.name_en,
    description: row.description_ar ?? "",
    englishDescription: row.description_en ?? "",
    category: row.category as Product["category"],
    basePrice: row.price,
    sizes: row.sizes,
    colors: row.colors as ProductColor[],
    details: row.details_ar ?? "",
    englishDetails: row.details_en ?? "",
    shipping: row.shipping_ar ?? "",
    englishShipping: row.shipping_en ?? "",
    inStock: row.in_stock,
    featured: row.featured,
    createdAt: row.created_at,
  };
}

function toPerfume(row: DbPerfume): Perfume {
  const notes: Perfume["notes"] = row.notes
    ? {
        top: row.notes.top,
        middle: row.notes.middle,
        base: row.notes.base,
      }
    : undefined;

  return {
    id: row.id,
    title: row.name_ar,
    englishTitle: row.name_en,
    description: row.description_ar ?? "",
    englishDescription: row.description_en ?? "",
    image: row.images[0] ?? "",
    category: row.category as Perfume["category"],
    basePrice: row.price,
    volume: row.volume ?? `${row.size_ml}ml`,
    inStock: row.in_stock,
    featured: row.featured,
    notes,
    createdAt: row.created_at,
  };
}

export async function getProducts(): Promise<Product[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data ? toProduct(data as DbProduct) : null;
}

export async function createProduct(
  input: Omit<DbProduct, "id" | "created_at" | "updated_at">
): Promise<Product> {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("products")
      .insert(input)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return toProduct(data as DbProduct);
  } catch {
    const product: Product = {
      id: crypto.randomUUID(),
      title: input.name_ar,
      englishTitle: input.name_en ?? "",
      description: input.description_ar ?? "",
      englishDescription: input.description_en ?? "",
      category: input.category as Product["category"],
      basePrice: input.price,
      sizes: input.sizes ?? [],
      colors: (input.colors ?? []) as ProductColor[],
      details: input.details_ar ?? "",
      englishDetails: input.details_en ?? "",
      inStock: input.in_stock,
      featured: input.featured,
      createdAt: new Date().toISOString().split("T")[0],
    };
    saveLocalProduct(product);
    return product;
  }
}

export async function updateProduct(
  id: string,
  input: Partial<Omit<DbProduct, "id" | "created_at" | "updated_at">>
): Promise<Product> {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("products")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return toProduct(data as DbProduct);
  } catch {
    const local = getLocalProducts().find((p) => p.id === id);
    if (!local) throw new Error("المنتج غير موجود");
    const updated: Product = {
      ...local,
      title: input.name_ar ?? local.title,
      englishTitle: input.name_en ?? local.englishTitle,
      description: input.description_ar ?? local.description,
      englishDescription: input.description_en ?? local.englishDescription,
      category: (input.category as Product["category"]) ?? local.category,
      basePrice: input.price ?? local.basePrice,
      sizes: input.sizes ?? local.sizes,
      colors: (input.colors as ProductColor[]) ?? local.colors,
      inStock: input.in_stock ?? local.inStock,
      featured: input.featured ?? local.featured,
    };
    saveLocalProduct(updated);
    return updated;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const sb = getSupabase();
    const { error } = await sb.from("products").delete().eq("id", id);
    if (error) throw new Error(error.message);
  } catch {
    removeLocalProduct(id);
  }
}

export async function getPerfumes(): Promise<Perfume[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("perfumes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toPerfume);
}

export async function getPerfume(id: string): Promise<Perfume | null> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("perfumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data ? toPerfume(data as DbPerfume) : null;
}

export async function createPerfume(
  input: Omit<DbPerfume, "id" | "created_at" | "updated_at">
): Promise<Perfume> {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("perfumes")
      .insert(input)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return toPerfume(data as DbPerfume);
  } catch {
    const perfume: Perfume = {
      id: crypto.randomUUID(),
      title: input.name_ar,
      englishTitle: input.name_en ?? "",
      description: input.description_ar ?? "",
      englishDescription: input.description_en ?? "",
      image: input.images?.[0] ?? "",
      category: (input.category as Perfume["category"]) ?? "perfume",
      basePrice: input.price,
      volume: input.volume ?? `${input.size_ml ?? 0}ml`,
      inStock: input.in_stock,
      featured: input.featured,
      createdAt: new Date().toISOString().split("T")[0],
    };
    saveLocalPerfume(perfume);
    return perfume;
  }
}

export async function updatePerfume(
  id: string,
  input: Partial<Omit<DbPerfume, "id" | "created_at" | "updated_at">>
): Promise<Perfume> {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("perfumes")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return toPerfume(data as DbPerfume);
  } catch {
    const local = getLocalPerfumes().find((p) => p.id === id);
    if (!local) throw new Error("العطر غير موجود");
    const updated: Perfume = {
      ...local,
      title: input.name_ar ?? local.title,
      englishTitle: input.name_en ?? local.englishTitle,
      description: input.description_ar ?? local.description,
      englishDescription: input.description_en ?? local.englishDescription,
      basePrice: input.price ?? local.basePrice,
      volume: input.volume ?? local.volume,
      inStock: input.in_stock ?? local.inStock,
      featured: input.featured ?? local.featured,
    };
    saveLocalPerfume(updated);
    return updated;
  }
}

export async function deletePerfume(id: string): Promise<void> {
  try {
    const sb = getSupabase();
    const { error } = await sb.from("perfumes").delete().eq("id", id);
    if (error) throw new Error(error.message);
  } catch {
    removeLocalPerfume(id);
  }
}

export async function uploadImage(
  file: Blob | File,
  folder: string
): Promise<string> {
  const sb = getSupabase();
  const ext = file instanceof File ? (file.name.split(".").pop() ?? "webp") : "webp";
  const contentType = file.type || "image/webp";
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await sb.storage.from("products").upload(fileName, file, {
    contentType,
    cacheControl: "31536000",
  });

  if (error) throw new Error(error.message);

  const { data: urlData } = sb.storage.from("products").getPublicUrl(fileName);
  return urlData.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const sb = getSupabase();
  const path = url.split("/").pop();
  if (!path) return;

  const { error } = await sb.storage.from("products").remove([path]);
  if (error) throw new Error(error.message);
}
