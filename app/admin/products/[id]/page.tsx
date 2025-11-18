import React from 'react'

interface Props { params: { id: string } }

export default async function ProductDetail({ params }: Props) {
  const { id } = params
  return (
    <section>
      <h1>Product: {id}</h1>
      <p>Detail and edit UI will be loaded here (client modals).</p>
    </section>
  )
}
