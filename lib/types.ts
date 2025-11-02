export type Nutrition = {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
}

export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  image?: string
  eco?: boolean
  discountPct?: number
  nutrition?: Nutrition
}

export type CartState = {
  items: CartItem[]
  currency: "₹" | "$"
}
