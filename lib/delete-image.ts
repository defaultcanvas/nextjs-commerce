// DEV MOCK ACTIVE — Supabase disabled because no env vars provided.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const BUCKET = "product-images";

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
    supabase = null; // mock mode
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  if (!url) return false;

  await initSupabase();

  // In mock mode, don't attempt network calls — treat delete as succeeded/no-op
  if (!supabase) {
    console.warn("DEV MOCK: skipping delete for", url);
    return true;
  }

  const prefix = `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/`;
  let path = url;
  if (url.startsWith(prefix)) {
    path = url.slice(prefix.length);
  } else {
    const i = url.indexOf(`/${BUCKET}/`);
    if (i > -1) {
      path = url.slice(i + (`/${BUCKET}/`).length);
    }
  }

  if (!path) return false;

  try {
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) {
      console.error("Supabase delete error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default deleteImage;
