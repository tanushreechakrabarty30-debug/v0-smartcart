"use client"

import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function PointsBadge({ points }: { points: number }) {
  return (
    <Badge
      className="relative gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1"
      aria-label={`You have ${points} points`}
    >
      <Sparkles className="h-3.5 w-3.5" />
      <span className="text-xs font-medium">{points} pts</span>
      <span aria-hidden="true" className="absolute inset-0 rounded-full badge-shimmer" />
    </Badge>
  )
}
