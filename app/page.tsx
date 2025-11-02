"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PointsBadge } from "@/components/points-badge"
import { RecommendationCard } from "@/components/recommendation-card"
import { SmartNav } from "@/components/smart-nav"
import { useCart } from "@/lib/cart"

export default function HomePage() {
  const { summary } = useCart()

  const weeklyGoal = 100 // Rs goal savings
  const savedSoFar = Math.round(summary.discount)
  const progress = Math.min(100, Math.round((savedSoFar / weeklyGoal) * 100))

  const recs = [
    { id: "oats", name: "Rolled Oats 1kg", price: 149, discountPct: 10, eco: true },
    { id: "lentils", name: "Organic Lentils 500g", price: 119, discountPct: 15, eco: true },
    { id: "olive-oil", name: "Olive Oil 1L", price: 999, discountPct: 5, eco: false },
  ]

  return (
    <main className="pb-28">
      <header className="mx-auto max-w-md px-4 pt-6 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-balance">Smart Cart</h1>
          <p className="text-xs text-muted-foreground">Scan • Save • Sustain</p>
        </div>
        <PointsBadge points={summary.ecoPoints + 20} />
      </header>

      <section className="mx-auto max-w-md px-4 grid gap-4">
        <Card className="p-4 rounded-xl bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Savings this week</p>
              <p className="text-2xl font-bold">
                {"₹"}
                {savedSoFar}
              </p>
            </div>
            <Link href="/rewards">
              <Button variant="secondary">View Rewards</Button>
            </Link>
          </div>
          <div className="mt-3">
            <Progress value={progress} className="h-2 rounded-full" />
            <p className="text-xs text-muted-foreground mt-1">
              {progress}% towards your ₹{weeklyGoal} goal
            </p>
          </div>
        </Card>

        <Card className="p-4 rounded-xl bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In your cart</p>
              <p className="text-xl font-semibold">
                {"₹"}
                {summary.total.toFixed(2)}
              </p>
            </div>
            <Link href="/cart">
              <Button className="bg-primary text-primary-foreground">View Cart</Button>
            </Link>
          </div>
        </Card>

        <div className="mt-2">
          <h2 className="text-sm font-semibold mb-2">Smart Recommendations</h2>
          <div className="grid gap-3">
            {recs.map((r) => (
              <RecommendationCard key={r.id} {...r} />
            ))}
          </div>
        </div>

        <Link href="/scan" className="mt-2">
          <Button className="w-full h-12 bg-accent text-accent-foreground">Scan a product</Button>
        </Link>
      </section>

      <SmartNav />
    </main>
  )
}
