import React from 'react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <nav style={{ padding: 16 }}>
      <h2>Admin</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link href="/admin/products">Products</Link></li>
        <li><Link href="/admin/categories">Categories</Link></li>
        <li><Link href="/admin/inventory">Inventory</Link></li>
        <li><Link href="/admin/orders">Orders</Link></li>
        <li><Link href="/admin/analytics">Analytics</Link></li>
        <li><Link href="/admin/settings">Settings</Link></li>
      </ul>
    </nav>
  )
}
