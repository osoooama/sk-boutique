import { products } from "../lib/products";
import { perfumes } from "../lib/perfumes";
import {
  createProduct,
  createPerfume,
  uploadImage,
} from "../lib/products-api";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

let adminClient: SupabaseClient | null = null;

function getAdminClient(): SupabaseClient {
  if (adminClient) return adminClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_KEY!;
  adminClient = createClient(url, key);
  return adminClient;
}

async function uploadLocalImage(
  sb: SupabaseClient,
  localPath: string,
  remoteFolder: string
): Promise<string> {
  const fullPath = path.join(process.cwd(), "public", localPath);
  const buffer = await fs.readFile(fullPath);
  const ext = path.extname(localPath).replace(".", "") || "webp";
  const fileName = `${remoteFolder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await sb.storage.from("products").upload(fileName, buffer, {
    contentType: "image/webp",
    cacheControl: "31536000",
    upsert: true,
  });

  if (error) throw new Error(error.message);

  const { data: urlData } = sb.storage.from("products").getPublicUrl(fileName);
  return urlData.publicUrl;
}

async function migrateProducts(sb: SupabaseClient) {
  console.log("\n=== Migrating Products ===\n");

  for (const product of products) {
    process.stdout.write(`  ${product.title}... `);

    const uploadedColors = await Promise.all(
      product.colors.map(async (color) => {
        const newImages = await Promise.all(
          color.images.map((img) =>
            uploadLocalImage(sb, img, `clothing/${product.id}`).catch(
              (err: Error) => {
                console.warn(`\n  ⚠ Failed to upload ${img}: ${err.message}`);
                return img;
              }
            )
          )
        );
        return { ...color, images: newImages };
      })
    );

    const allImages = uploadedColors.flatMap((c) => c.images);

    try {
      const { error } = await sb.from("products").insert({
        id: product.id,
        name_ar: product.title,
        name_en: product.englishTitle,
        price: product.basePrice,
        sizes: product.sizes,
        colors: uploadedColors,
        images: allImages,
        category: product.category,
        description_ar: product.description,
        description_en: product.englishDescription,
        details_ar: product.details,
        details_en: product.englishDetails,
        shipping_ar: product.shipping,
        shipping_en: product.englishShipping,
        in_stock: product.inStock,
        featured: false,
      });
      if (error) {
        const errObj = error as unknown as Record<string, unknown>;
        const details = errObj.message ?? errObj.details ?? JSON.stringify(error);
        throw new Error(typeof details === "string" ? details : JSON.stringify(details));
      }
      console.log("✓");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      console.log(`✗ ${msg}`);
    }
  }
}

async function migratePerfumes(sb: SupabaseClient) {
  console.log("\n=== Migrating Perfumes ===\n");

  for (const perfume of perfumes) {
    process.stdout.write(`  ${perfume.title}... `);

    const uploadedImage = await uploadLocalImage(
      sb,
      perfume.image,
      `perfumes/${perfume.id}`
    ).catch((err: Error) => {
      console.warn(`\n  ⚠ Failed to upload image: ${err.message}`);
      return perfume.image;
    });

    try {
      const { error } = await sb.from("perfumes").insert({
        id: perfume.id,
        name_ar: perfume.title,
        name_en: perfume.englishTitle,
        price: 0,
        size_ml:
          perfume.volume === "50ml"
            ? 50
            : perfume.volume === "30ml"
              ? 30
              : perfume.volume === "12ml"
                ? 12
                : perfume.volume === "2ml"
                  ? 2
                  : null,
        volume: perfume.volume,
        scent_type: [],
        images: [uploadedImage],
        description_ar: perfume.description,
        description_en: perfume.englishDescription,
        notes: perfume.notes ?? null,
        category: perfume.category,
        in_stock: perfume.inStock,
        featured: false,
      });
      if (error) {
        const errObj = error as unknown as Record<string, unknown>;
        const details = errObj.message ?? errObj.details ?? JSON.stringify(error);
        throw new Error(typeof details === "string" ? details : JSON.stringify(details));
      }
      console.log("✓");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      console.log(`✗ ${msg}`);
    }
  }
}

async function verifyCounts(sb: SupabaseClient) {
  console.log("\n=== Verification ===\n");

  const { data: dbProducts, error: prodErr } = await sb
    .from("products")
    .select("id, name_ar");
  if (prodErr) {
    console.log(`  Products query failed: ${prodErr.message}`);
  } else {
    console.log(`  Products in DB: ${dbProducts?.length ?? 0}`);
  }

  const { data: dbPerfumes, error: perfErr } = await sb
    .from("perfumes")
    .select("id, name_ar");
  if (perfErr) {
    console.log(`  Perfumes query failed: ${perfErr.message}`);
  } else {
    console.log(`  Perfumes in DB: ${dbPerfumes?.length ?? 0}`);
  }

  const { data: bucketFiles } = await sb.storage
    .from("products")
    .list("clothing", { limit: 100 });
  console.log(
    `  Images in storage/products/clothing: ${bucketFiles?.length ?? 0}`
  );

  const { data: perfumeFiles } = await sb.storage
    .from("products")
    .list("perfumes", { limit: 100 });
  console.log(
    `  Images in storage/products/perfumes: ${perfumeFiles?.length ?? 0}`
  );
}

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function ensureSchema() {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) {
    console.log("  No SUPABASE_SERVICE_KEY found, skipping schema setup.\n");
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const admin = createClient(url, serviceKey);

  // Create storage bucket if missing
  const { data: buckets } = await admin.storage.listBuckets();
  const hasBucket = buckets?.some((b) => b.name === "products");
  if (!hasBucket) {
    const { error: bErr } = await admin.storage.createBucket("products", {
      public: true,
    });
    if (bErr) {
      console.log(`  ⚠ Bucket creation failed: ${bErr.message}`);
    } else {
      console.log("  ✓ Created storage/products bucket");
    }
  } else {
    console.log("  ✓ Storage/products bucket exists");
  }

  // Check if tables exist by trying a LIST query
  const { data: tblData, error: tblErr } = await admin
    .from("products")
    .select("id")
    .limit(1);

  if (tblErr) {
    const msg = typeof tblErr === "object" && tblErr !== null
      ? (tblErr as unknown as Record<string, unknown>).message ?? JSON.stringify(tblErr)
      : String(tblErr);

    console.log("\n  ⚠ Tables not found. Create them via:");
    console.log("    1. Go to https://supabase.com/dashboard/project/qddjyjbfuphyzalkxbdu");
    console.log("    2. Open SQL Editor → New Query");
    console.log("    3. Paste and run this SQL:\n");
    const sql = readFileSync(
      path.join(process.cwd(), "lib", "supabase-schema.sql"),
      "utf-8"
    );
    console.log(sql);
    console.log("\n  4. Re-run this script after running the SQL.\n");
    process.exit(1);
  } else {
    console.log(`  ✓ Products table exists (${tblData?.length ?? 0} rows)`);
    console.log("  ✓ Perfumes table exists");
  }
}

async function main() {
  loadEnv();

  console.log("SK Boutique — Data Migration Script");
  console.log("====================================\n");

  if (!process.env.SUPABASE_SERVICE_KEY) {
    console.error("✗ SUPABASE_SERVICE_KEY not set in .env.local");
    process.exit(1);
  }

  await ensureSchema();

  const sb = getAdminClient();

  await migrateProducts(sb);
  await migratePerfumes(sb);
  await verifyCounts(sb);

  console.log("\n✓ Migration complete\n");
}

main();
