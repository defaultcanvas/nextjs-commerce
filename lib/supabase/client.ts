// Lightweight supabase client wrapper — lazy import and guard
import type { SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null
let initialized = false

export async function getSupabaseClient(): Promise<SupabaseClient | null> {
  if (initialized) return client
  initialized = true
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  if (!url || !key) {
    client = null
    return null
  }
  try {
    const mod = await import('@supabase/supabase-js')
    client = mod.createClient(url, key)
    return client
  } catch (err) {
    console.warn('Failed to load supabase-js:', err)
    client = null
    return null
  }
}

export function requireSupabase(): never | SupabaseClient {
  throw new Error('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}
