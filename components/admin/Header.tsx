"use client"
import React from 'react'

export default function Header() {
  return (
    <header style={{ padding: 12, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <strong>Admin Hub</strong>
      </div>
      <div>
        <input placeholder="Search products..." style={{ padding: 6 }} />
        <button style={{ marginLeft: 8 }}>Actions</button>
      </div>
    </header>
  )
}
