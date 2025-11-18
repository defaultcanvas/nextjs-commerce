import { getSupabaseClient } from './client'
import { ProductSchema } from './schemas'

export async function fetchProducts() {
  const client = await getSupabaseClient()
  if (!client) return []
  const { data, error } = await client.from('products').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('Supabase fetchProducts error:', error)
    return []
  }
  return data
}

export async function fetchCategories() {
  const client = await getSupabaseClient()
  if (!client) return []
  const { data } = await client.from('categories').select('*').order('order_index')
  return data || []
}
