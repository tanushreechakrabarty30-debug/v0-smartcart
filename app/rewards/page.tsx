"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SmartNav } from "@/components/smart-nav"
import { PointsBadge } from "@/components/points-badge"

export default function RewardsPage() {
  const leaderboard = [
    { name: "Aarav", saved: 840, badge: "Budget Boss" },
    { name: "Diya", saved: 720, badge: "Eco Hero" },
    { name: "Rohit", saved: 610, badge: "Deal Hunter" },
    { name: "Isha", saved: 580, badge: "Smart Saver" },
  ]

  const my = { points: 265, weekGoal: 1000, saved: 420 }

  const progress = Math.min(100, Math.round((my.saved / my.weekGoal) * 100))

  return (
    <main className="pb-28">
      <header className="mx-auto max-w-md px-4 pt-6 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-balance">Rewards</h1>
          <p className="text-xs text-muted-foreground">Top Savers of the Week</p>
        </div>
        <PointsBadge points={my.points} />
      </header>

      <section className="mx-auto max-w-md px-4 grid gap-4">
        <Card className="p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your weekly savings</p>
              <p className="text-2xl font-bold">
                {"₹"}
                {my.saved}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Goal</p>
              <p className="text-base font-semibold">
                {"₹"}
                {my.weekGoal}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <Progress value={progress} className="h-2 rounded-full" />
            <p className="text-xs text-muted-foreground mt-1">{progress}% of weekly goal</p>
          </div>
        </Card>

        <Card className="p-4 rounded-xl">
          <h2 className="text-sm font-semibold mb-3">Top Savers</h2>
          <div className="grid gap-2">
            {leaderboard.map((p, idx) => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center">{idx + 1}</span>
                  <span className="font-medium">{p.name}</span>
                  <span className="text-[11px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">{p.badge}</span>
                </div>
                <span className="font-semibold">
                  {"₹"}
                  {p.saved}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 rounded-xl">
          <h3 className="text-sm font-semibold">Badges</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-[11px] px-2 py-1 rounded-full bg-primary text-primary-foreground">Eco Hero</span>
            <span className="text-[11px] px-2 py-1 rounded-full bg-accent text-accent-foreground">Budget Boss</span>
            <span className="text-[11px] px-2 py-1 rounded-full bg-muted text-foreground">Deal Hunter</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Earn badges by choosing eco-friendly or budget-friendly products.
          </p>
        </Card>
      </section>

      <SmartNav />
    </main>
  )
}
