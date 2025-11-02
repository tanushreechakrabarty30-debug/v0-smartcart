"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useCart } from "@/lib/cart"

type Props = {
  id: string
  name: string
  price: number
  discountPct?: number
  eco?: boolean
  image?: string
}

export function RecommendationCard(props: Props) {
  const { addItem } = useCart()
  const { id, name, price, discountPct, eco, image } = props
  const discounted = discountPct ? Math.max(0, price - (price * discountPct) / 100) : price

  return (
    <Card className="p-3 flex items-center gap-3">
      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted">
        <Image
          src={image ?? "/placeholder.svg?height=64&width=64&query=grocery"}
          alt={`${name} image`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-pretty">{name}</p>
          {eco ? <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">Eco</span> : null}
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
      <Button
        className="bg-primary text-primary-foreground"
        onClick={() =>
          addItem({
            id,
            name,
            price: discounted,
            qty: 1,
            image,
            eco,
            discountPct,
          })
        }
        aria-label={`Add ${name} to cart`}
      >
        Add
      </Button>
    </Card>
  )
}
