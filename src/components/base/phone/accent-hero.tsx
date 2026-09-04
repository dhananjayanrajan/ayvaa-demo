import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AccentTone = 'emerald' | 'amber' | 'rose' | 'sky'

const toneClasses: Record<AccentTone, { wrapper: string; orbTop: string; orbBottom: string; topLine: string }> = {
  emerald: {
    wrapper: 'border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]',
    orbTop: 'bg-emerald-400/25',
    orbBottom: 'bg-teal-300/15',
    topLine: 'via-emerald-200/40',
  },
  amber: {
    wrapper: 'border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,42,8,0.7)]',
    orbTop: 'bg-amber-400/25',
    orbBottom: 'bg-orange-400/10',
    topLine: 'via-amber-200/40',
  },
  rose: {
    wrapper: 'border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]',
    orbTop: 'bg-rose-500/25',
    orbBottom: 'bg-orange-400/10',
    topLine: 'via-rose-300/40',
  },
  sky: {
    wrapper: 'border border-sky-200/10 bg-[#0A1B26] shadow-[0_28px_64px_-30px_rgba(6,22,32,0.7)]',
    orbTop: 'bg-sky-400/25',
    orbBottom: 'bg-cyan-300/10',
    topLine: 'via-sky-200/40',
  },
}

interface AccentHeroProps {
  tone?: AccentTone
  className?: string
  children: ReactNode
}

export function AccentHero({ tone = 'emerald', className, children }: AccentHeroProps) {
  const t = toneClasses[tone]
  return (
    <div className={cn('relative overflow-hidden rounded-[26px] transition-colors duration-500', t.wrapper, className)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500', t.orbTop)} />
      <div aria-hidden className={cn('pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl transition-colors duration-500', t.orbBottom)} />
      <div aria-hidden className={cn('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500', t.topLine)} />
      <div className="relative p-5">{children}</div>
    </div>
  )
}
