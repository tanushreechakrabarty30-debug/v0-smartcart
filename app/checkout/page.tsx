"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { SmartNav } from "@/components/smart-nav"
import { useCart } from "@/lib/cart"
import { useToast } from "@/components/ui/use-toast"
import { ConfettiOverlay } from "@/components/confetti"

export default function CheckoutPage() {
  const { summary, clear } = useCart()
  const { toast } = useToast()
  const [method, setMethod] = useState<"upi" | "card">("upi")
  const [paying, setPaying] = useState(false)
  const [done, setDone] = useState(false)

  const pay = async () => {
    setPaying(true)
    await new Promise((r) => setTimeout(r, 1200))
    setPaying(false)
    setDone(true)
    toast({
      title: "Payment Successful",
      description: `You saved ₹${summary.discount.toFixed(2)} this trip! +${summary.ecoPoints} pts`,
    })
    setTimeout(() => clear(), 500)
  }

  return (
    <main className="pb-28">
      <header className="mx-auto max-w-md px-4 pt-6 pb-2">
        <h1 className="text-lg font-semibold">Checkout</h1>
        <p className="text-xs text-muted-foreground">Select a payment method</p>
      </header>

      <section className="mx-auto max-w-md px-4 grid gap-4">
        <Card className="p-4 rounded-xl">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total to pay</span>
            <span className="text-base font-semibold">
              {"₹"}
              {summary.total.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">You saved</span>
            <span className="text-green-600">
              -{"₹"}
              {summary.discount.toFixed(2)}
            </span>
          </div>
        </Card>

        <Card className="p-4 rounded-xl">
          <RadioGroup value={method} onValueChange={(v) => setMethod(v as any)} className="grid gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RadioGroupItem id="upi" value="upi" />
                <Label htmlFor="upi" className="cursor-pointer">
                  <div className="font-medium">UPI</div>
                  <div className="text-xs text-muted-foreground">GPay, PhonePe, Paytm</div>
                </Label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RadioGroupItem id="card" value="card" />
                <Label htmlFor="card" className="cursor-pointer">
                  <div className="font-medium">Card</div>
                  <div className="text-xs text-muted-foreground">Visa, Mastercard</div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        <Button className="h-12 bg-primary text-primary-foreground" onClick={pay} disabled={paying}>
          {paying ? "Processing..." : `Pay ${"₹"}${summary.total.toFixed(2)}`}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By paying, you agree to the Terms and acknowledge rewards policies.
        </p>
      </section>

      <ConfettiOverlay active={done && summary.discount > 0} />
      <SmartNav />
    </main>
  )
}
