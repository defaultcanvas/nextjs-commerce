import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number().nullable().optional(),
  cost_price: z.number().nullable().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  images: z.array(z.string()).optional(),
  variants: z.any().optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const CategorySchema = z.object({ id: z.string(), name: z.string(), image: z.string().optional(), order_index: z.number().optional() })

export const SubcategorySchema = z.object({ id: z.string(), category_id: z.string(), name: z.string(), order_index: z.number().optional() })

export const OrderSchema = z.object({ id: z.string(), items: z.any(), total: z.number().optional(), status: z.string().optional(), customer_info: z.any().optional(), created_at: z.string().optional() })

export type Product = z.infer<typeof ProductSchema>
export type Category = z.infer<typeof CategorySchema>
export type Subcategory = z.infer<typeof SubcategorySchema>
export type Order = z.infer<typeof OrderSchema>
