"use client"
import create from 'zustand'

type UIState = {
  productModalOpen: boolean
  openProductModal: () => void
  closeProductModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  productModalOpen: false,
  openProductModal: () => set({ productModalOpen: true }),
  closeProductModal: () => set({ productModalOpen: false }),
}))

export default useUIStore
