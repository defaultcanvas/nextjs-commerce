"use client"
import React from 'react'

export default function ModalRoot({ children }: { children?: React.ReactNode }) {
  return <div id="modal-root">{children}</div>
}
