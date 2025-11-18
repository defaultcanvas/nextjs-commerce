import React from 'react'
import ProductTable from '../../../components/admin/ProductTable'
import { fetchProducts } from '../../../lib/supabase/api'

export default async function ProductsPage() {
  const products = await fetchProducts()
  // pass products as prop to client table in future; for now render table
  return (
    <section>
      <h1>Products</h1>
      <ProductTable />
    </section>
  )
}
