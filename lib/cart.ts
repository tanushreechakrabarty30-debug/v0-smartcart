"use client"

import useSWR from "swr"
import { useCallback, useMemo } from "react"
import type { CartItem, CartState } from "./types"

const CART_KEY = "smartcart:cart:v1"

const defaultCart: CartState = {
  items: [],
  currency: "₹",
}

function readCart(): CartState {
  if (typeof window === "undefined") return defaultCart
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return defaultCart
    return JSON.parse(raw)
  } catch {
    return defaultCart
  }
}

function writeCart(cart: CartState) {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function useCart() {
  const { data, mutate } = useSWR<CartState>(CART_KEY, async () => readCart(), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  const cart = data ?? defaultCart

  const setCart = useCallback(
    (updater: (c: CartState) => CartState) => {
      const next = updater(readCart())
      writeCart(next)
      mutate(next, false)
    },
    [mutate],
  )

  const addItem = useCallback(
    (item: CartItem) => {
      setCart((c) => {
        const idx = c.items.findIndex((i) => i.id === item.id)
        if (idx >= 0) {
          const items = [...c.items]
          items[idx] = { ...items[idx], qty: items[idx].qty + item.qty }
          return { ...c, items }
        }
        return { ...c, items: [...c.items, item] }
      })
    },
    [setCart],
  )

  const removeItem = useCallback(
    (id: string) => {
      setCart((c) => ({ ...c, items: c.items.filter((i) => i.id !== id) }))
    },
    [setCart],
  )

  const updateQty = useCallback(
    (id: string, qty: number) => {
      setCart((c) => ({
        ...c,
        items: c.items.map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0),
      }))
    },
    [setCart],
  )

  const clear = useCallback(() => setCart(() => defaultCart), [setCart])

  const summary = useMemo(() => {
    const subtotal = cart.items.reduce((s, i) => s + i.price * i.qty, 0)
    const discount = cart.items.reduce((d, i) => {
      const pct = i.discountPct ?? 0
      return d + (i.price * i.qty * pct) / 100
    }, 0)
    const total = Math.max(0, subtotal - discount)
    const ecoPoints = cart.items.reduce((p, i) => p + (i.eco ? i.qty * 5 : 0), 0)
    return { subtotal, discount, total, ecoPoints, count: cart.items.length }
  }, [cart.items])

  return {
    cart,
    addItem,
    removeItem,
    updateQty,
    clear,
    summary,
  }
}
