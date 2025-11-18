"use client"
import React from 'react'

export default function ProductTable() {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <button>Create product</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="/placeholder.svg" alt="" width={64} /></td>
            <td>Sample Product</td>
            <td>Default</td>
            <td>$9.99</td>
            <td>12</td>
            <td>active</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
