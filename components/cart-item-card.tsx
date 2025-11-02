"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart"

type Props = {
  id: string
  name: string
  price: number
  qty: number
  image?: string
  eco?: boolean
  discountPct?: number
}

export function CartItemCard(props: Props) {
  const { updateQty, removeItem } = useCart()
  const { id, name, price, qty, image, eco, discountPct } = props

  const discounted = discountPct ? Math.max(0, price - (price * discountPct) / 100) : price

  return (
    <Card className="p-3 flex items-center gap-3">
      <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-muted">
        <Image
          src={image ?? "/placeholder.svg?height=56&width=56&query=product"}
          alt={`${name} image`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-pretty">{name}</p>
          {eco ? <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Eco</span> : null}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {discountPct ? (
            <>
              <span className="text-sm font-semibold">
                {"₹"}
                {discounted.toFixed(2)}
              </span>
              <span className="text-xs line-through text-muted-foreground">
                {"₹"}
                {price.toFixed(2)}
              </span>
              <span className="text-xs text-primary">-{discountPct}%</span>
            </>
          ) : (
            <span className="text-sm font-semibold">
              {"₹"}
              {price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="secondary" onClick={() => updateQty(id, qty - 1)} aria-label="Decrease quantity">
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center text-sm">{qty}</span>
        <Button size="icon" variant="secondary" onClick={() => updateQty(id, qty + 1)} aria-label="Increase quantity">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="destructive" onClick={() => removeItem(id)} aria-label="Remove item">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
