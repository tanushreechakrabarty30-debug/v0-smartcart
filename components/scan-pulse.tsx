"use client"

export function ScanPulse() {
  return (
    <div className="relative w-40 h-40 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-accent/80"></div>
      <div className="absolute inset-0 rounded-full scan-pulse"></div>
      <div className="absolute inset-8 rounded-xl border-2 border-accent/60"></div>
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        <div className="border-t-2 border-l-2 border-accent/70 rounded-tl-xl"></div>
        <div></div>
        <div className="border-t-2 border-r-2 border-accent/70 rounded-tr-xl"></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="border-b-2 border-l-2 border-accent/70 rounded-bl-xl"></div>
        <div></div>
        <div className="border-b-2 border-r-2 border-accent/70 rounded-br-xl"></div>
      </div>
    </div>
  )
}
