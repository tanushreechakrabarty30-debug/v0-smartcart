"use client"

import { useEffect, useRef } from "react"

export type ConfettiHandle = {
  burst: () => void
}

type Props = {
  active?: boolean
}

export function ConfettiOverlay({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    const colors = ["#0ea5a6", "#1e90ff", "#22c55e", "#f59e0b", "#ef4444"]

    function burst() {
      const out: typeof particlesRef.current = []
      const count = 120
      for (let i = 0; i < count; i++) {
        out.push({
          x: width / 2,
          y: height / 3,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 1) * 7,
          size: Math.random() * 3 + 2,
          color: colors[(Math.random() * colors.length) | 0],
        })
      }
      particlesRef.current.push(...out)
    }
    ;(canvas as any).burst = burst

    const loop = () => {
      ctx.clearRect(0, 0, width, height)
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)
      })
      particlesRef.current = particlesRef.current.filter((p) => p.y < height && p.x > -50 && p.x < width + 50)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("resize", onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current as any
    if (active && canvas?.burst) {
      canvas.burst()
    }
  }, [active])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />
}
