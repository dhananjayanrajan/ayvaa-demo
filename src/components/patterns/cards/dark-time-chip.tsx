import type { ReactNode } from 'react'

export function DarkTimeChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-bold tabular-nums tracking-tight text-emerald-100/70">
      {children}
    </span>
  )
}
