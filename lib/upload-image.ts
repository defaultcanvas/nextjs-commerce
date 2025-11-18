// DEV MOCK ACTIVE — Supabase disabled because no env vars provided.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const BUCKET = "product-images";
const MAX_BYTES = 3 * 1024 * 1024; // 3 MB

let supabase: any = null;
let _supabaseInit = false;

async function initSupabase() {
  if (_supabaseInit) return;
  _supabaseInit = true;
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const mod = await import("@supabase/supabase-js");
      supabase = mod.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (err) {
      console.warn("Failed to import/create Supabase client:", err);
      supabase = null;
    }
  } else {
    // leave supabase null -> trigger mock mode
    supabase = null;
  }
}

function uuid() {
  try {
    if (typeof crypto !== "undefined" && (crypto as any).randomUUID) return (crypto as any).randomUUID();
  } catch (_) {}
  return String(Date.now()) + Math.floor(Math.random() * 1000000);
}

export async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;
  if (file.size > MAX_BYTES) return null;

  const ext = file.name.split(".").pop() || "jpg";
  const id = uuid();
  const filename = `${id}.${ext}`;
  const path = `products/${filename}`;

  await initSupabase();

  // Mock mode when supabase client isn't available
  if (!supabase) {
    console.warn("DEV MOCK: returning mock URL for", file.name);
    return `/mock-storage/${filename}`;
  }

  try {
    const { error } = await supabase.storage.from(BUCKET).upload(path, file as any, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      console.error("Supabase upload error:", error);
      return null;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data?.publicUrl ?? null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default uploadImage;
