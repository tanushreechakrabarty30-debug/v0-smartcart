"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Mouse as House, ShoppingCart, Trophy, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SmartNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border">
      <div className="mx-auto max-w-md relative">
        {/* floating scan */}
        <div className="absolute -top-6 left-0 right-0 flex justify-center pointer-events-none">
          <Link href="/scan" className="pointer-events-auto">
            <Button
              size="lg"
              className="h-14 w-14 rounded-full p-0 bg-accent text-accent-foreground shadow-lg scan-pulse"
              aria-label="Scan"
            >
              <Scan className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* bar */}
        <div className="grid grid-cols-3 px-6 py-3 items-center text-sm">
          <Link
            href="/"
            className={cn(
              "flex flex-col gap-1 items-center py-1",
              isActive("/") ? "text-primary" : "text-muted-foreground",
            )}
            aria-label="Home"
          >
            <House className="h-5 w-5" />
            <span>Home</span>
          </Link>

          <Link
            href="/rewards"
            className={cn(
              "flex flex-col gap-1 items-center py-1",
              isActive("/rewards") ? "text-primary" : "text-muted-foreground",
            )}
            aria-label="Rewards"
          >
            <Trophy className="h-5 w-5" />
            <span>Rewards</span>
          </Link>

          <Link
            href="/cart"
            className={cn(
              "flex flex-col gap-1 items-center py-1",
              isActive("/cart") ? "text-primary" : "text-muted-foreground",
            )}
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
