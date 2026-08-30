import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type PhaseHeroTheme = {
  border: string
  shell: string
  orbA: string
  orbB: string
  hairline: string
  shadow?: string
}

export type PhaseHeroKey =
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'sky'
  | 'blue'
  | 'blueDeep'
  | 'emeraldBright'

export const PHASE_THEME: Record<PhaseHeroKey, PhaseHeroTheme> = {
  emerald: {
    border: 'border-emerald-200/10',
    shell: 'bg-[#0B231C]',
    orbA: 'bg-emerald-400/25',
    orbB: 'bg-teal-300/15',
    hairline: 'via-emerald-200/40',
  },
  amber: {
    border: 'border-amber-200/15',
    shell: 'bg-[#241B0C]',
    orbA: 'bg-amber-400/25',
    orbB: 'bg-orange-400/12',
    hairline: 'via-amber-200/40',
  },
  rose: {
    border: 'border-rose-200/15',
    shell: 'bg-[#230D14]',
    orbA: 'bg-rose-500/25',
    orbB: 'bg-orange-400/10',
    hairline: 'via-rose-300/40',
  },
  sky: {
    border: 'border-sky-200/15',
    shell: 'bg-[#0B1E2B]',
    orbA: 'bg-sky-400/25',
    orbB: 'bg-blue-400/12',
    hairline: 'via-sky-200/40',
  },
  blue: {
    border: 'border-blue-200/10',
    shell: 'bg-[#0B1B2A]',
    orbA: 'bg-blue-400/25',
    orbB: 'bg-sky-300/15',
    hairline: 'via-blue-200/40',
  },
  blueDeep: {
    border: 'border-blue-200/10',
    shell: 'bg-[#0A1B26]',
    orbA: 'bg-blue-400/20',
    orbB: 'bg-sky-300/10',
    hairline: 'via-blue-200/40',
  },
  emeraldBright: {
    border: 'border-emerald-300/20',
    shell: 'bg-[#062419]',
    orbA: 'bg-emerald-400/30',
    orbB: 'bg-teal-300/20',
    hairline: 'via-emerald-300/50',
  },
}

export function PhaseHero({
  theme,
  className,
  children,
}: {
  theme: PhaseHeroTheme
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px] border shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)] transition-colors duration-500',
        theme.border,
        theme.shell,
        theme.shadow,
        className,
      )}
    >
      <div
        aria-hidden
        className={cn('pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500', theme.orbA)}
      />
      <div
        aria-hidden
        className={cn('pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl transition-colors duration-500', theme.orbB)}
      />
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500', theme.hairline)}
      />
      <div className="relative p-5">{children}</div>
    </div>
  )
}
