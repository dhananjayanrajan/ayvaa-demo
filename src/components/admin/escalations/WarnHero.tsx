import type { ReactNode } from 'react'

interface WarnHeroProps {
  children: ReactNode
}

export function WarnHero({ children }: WarnHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,42,8,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
      <div className="relative p-5">{children}</div>
    </div>
  )
}
