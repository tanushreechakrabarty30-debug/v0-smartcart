"use client"

import Link from "next/link"
import { SmartNav } from "@/components/smart-nav"
import { CartItemCard } from "@/components/cart-item-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"

export default function CartPage() {
  const { cart, summary, clear } = useCart()

  return (
    <main className="pb-36">
      <header className="mx-auto max-w-md px-4 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Your Cart</h1>
        {cart.items.length > 0 ? (
          <button onClick={clear} className="text-xs text-destructive">
            Clear
          </button>
        ) : null}
      </header>

      <section className="mx-auto max-w-md px-4 grid gap-3">
        {cart.items.length === 0 ? (
          <Card className="p-6 rounded-xl text-center text-sm text-muted-foreground">
            Your cart is empty. Try scanning a product or explore recommendations on Home.
          </Card>
        ) : (
          <div className="grid gap-3">
            {cart.items.map((i) => (
              <CartItemCard
                key={i.id}
                id={i.id}
                name={i.name}
                price={i.price}
                qty={i.qty}
                image={i.image}
                eco={i.eco}
                discountPct={i.discountPct}
              />
            ))}
          </div>
        )}

        <Card className="p-4 rounded-xl">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>
              {"₹"}
              {summary.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Discounts</span>
            <span className="text-green-600">
              -{"₹"}
              {summary.discount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between font-semibold text-base mt-2">
            <span>Total</span>
            <span>
              {"₹"}
              {summary.total.toFixed(2)}
            </span>
          </div>
          <Link href="/checkout">
            <Button className="w-full h-12 mt-3 bg-primary text-primary-foreground">Checkout</Button>
          </Link>
        </Card>
      </section>

      <SmartNav />
    </main>
  )
}
