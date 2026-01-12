export type UserRole = "user" | "admin"

export interface User {
  id: string
  email: string
  role: UserRole
  name: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: "supplements" | "equipment" | "food-drinks"
  subcategory: string | null
  image_url: string | null
  stripe_price_id: string | null
  stock: number
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
  product?: Product
}
