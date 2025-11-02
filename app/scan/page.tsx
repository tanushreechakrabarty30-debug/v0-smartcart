"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanPulse } from "@/components/scan-pulse"
import { SmartNav } from "@/components/smart-nav"
import { useCart } from "@/lib/cart"
import { useToast } from "@/components/ui/use-toast"
import { ConfettiOverlay } from "@/components/confetti"
import Image from "next/image"

export default function ScanPage() {
  const [scanned, setScanned] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const item = {
    id: "green-apple",
    name: "Green Apple (4pc)",
    price: 129,
    discountPct: 12,
    eco: true,
    image: "/single-green-apple.png",
    nutrition: { calories: 95, protein_g: 0.5, carbs_g: 25, fat_g: 0.3 },
  }

  function simulateScan() {
    setScanned(true)
    addItem({
      id: item.id,
      name: item.name,
      price: Math.round(item.price * (1 - (item.discountPct ?? 0) / 100)),
      qty: 1,
      image: item.image,
      eco: item.eco,
      discountPct: item.discountPct,
    })
    setConfetti(true)
    toast({
      title: "Added to cart",
      description: "Eco-friendly choice! +5 pts",
    })
    setTimeout(() => setConfetti(false), 1600)
  }

  return (
    <main className="pb-28">
      <header className="mx-auto max-w-md px-4 pt-6 pb-2">
        <h1 className="text-lg font-semibold">Scan Product</h1>
        <p className="text-xs text-muted-foreground">Align barcode within frame</p>
      </header>

      <section className="mx-auto max-w-md px-4 grid gap-4">
        <div className="rounded-2xl bg-muted h-64 grid place-content-center relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/barcode-overlay.jpg" alt="" fill className="object-cover opacity-20" />
          </div>
          <ScanPulse />
        </div>

        <Button className="h-12 bg-accent text-accent-foreground" onClick={simulateScan}>
          Simulate Scan & Add
        </Button>

        {scanned && (
          <Card className="p-4 rounded-xl">
            <div className="flex gap-3">
              <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted">
                <Image src={item.image || "/placeholder.svg"} alt="Green Apple" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {"₹"}
                    {(item.price * (1 - (item.discountPct ?? 0) / 100)).toFixed(2)}
                  </span>
                  <span className="text-xs line-through text-muted-foreground">
                    {"₹"}
                    {item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-primary">-{item.discountPct}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.nutrition?.calories} cal • {item.nutrition?.protein_g}g protein • {item.nutrition?.carbs_g}g
                  carbs
                </p>
              </div>
            </div>
          </Card>
        )}
      </section>

      <ConfettiOverlay active={confetti} />
      <SmartNav />
    </main>
  )
}
