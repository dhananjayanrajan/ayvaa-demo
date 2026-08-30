import { AnimatePresence, motion } from 'motion/react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Kicker } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { StaffMember } from '@/data/types'

export type StaffFilter = 'all' | 'active' | 'pending' | 'paused'

interface StaffHeroProps {
  activeMembers: StaffMember[]
  pendingCount: number
  pausedCount: number
  activeFilter: StaffFilter
  onFilterChange: (filter: StaffFilter) => void
}

const filterMeta: { key: StaffFilter; label: string; dot: string }[] = [
  { key: 'active', label: 'Active', dot: 'bg-emerald-300' },
  { key: 'pending', label: 'Pending', dot: 'bg-amber-300' },
  { key: 'paused', label: 'Paused', dot: 'bg-rose-300' },
]

const themeMap: Record<Exclude<StaffFilter, 'all'>, {
  cardBg: string
  tint: string
  kicker: string
  titleGradient: string
  subtitle: string
  ring: string
  total: string
  filterActiveBg: string
  filterActiveText: string
  filterInactiveText: string
  focusRing: string
}> = {
  active: {
    cardBg: 'bg-[#0B231C]',
    tint: 'bg-emerald-400/20',
    kicker: 'text-emerald-300/80',
    titleGradient: 'from-emerald-300 to-teal-200',
    subtitle: 'text-emerald-100/55',
    ring: 'ring-[#0B231C]',
    total: 'text-emerald-100/40',
    filterActiveBg: 'bg-emerald-400/20',
    filterActiveText: 'text-white',
    filterInactiveText: 'text-emerald-100/60 hover:text-emerald-100',
    focusRing: 'focus-visible:ring-emerald-300/50 focus-visible:ring-offset-[#0B231C]',
  },
  pending: {
    cardBg: 'bg-[#3A2A0B]',
    tint: 'bg-amber-400/20',
    kicker: 'text-amber-300/80',
    titleGradient: 'from-amber-300 to-orange-200',
    subtitle: 'text-amber-100/55',
    ring: 'ring-[#3A2A0B]',
    total: 'text-amber-100/40',
    filterActiveBg: 'bg-amber-400/20',
    filterActiveText: 'text-white',
    filterInactiveText: 'text-amber-100/60 hover:text-amber-100',
    focusRing: 'focus-visible:ring-amber-300/50 focus-visible:ring-offset-[#3A2A0B]',
  },
  paused: {
    cardBg: 'bg-[#4A1A1A]',
    tint: 'bg-rose-400/20',
    kicker: 'text-rose-300/80',
    titleGradient: 'from-rose-300 to-red-200',
    subtitle: 'text-rose-100/55',
    ring: 'ring-[#4A1A1A]',
    total: 'text-rose-100/40',
    filterActiveBg: 'bg-rose-400/20',
    filterActiveText: 'text-white',
    filterInactiveText: 'text-rose-100/60 hover:text-rose-100',
    focusRing: 'focus-visible:ring-rose-300/50 focus-visible:ring-offset-[#4A1A1A]',
  },
}

function AnimatedCount({ value }: { value: number }) {
  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="block text-xl font-extrabold tracking-tight"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function StaffHero({ activeMembers, pendingCount, pausedCount, activeFilter, onFilterChange }: StaffHeroProps) {
  const total = activeMembers.length + pendingCount + pausedCount
  const counts: Record<Exclude<StaffFilter, 'all'>, number> = {
    active: activeMembers.length,
    pending: pendingCount,
    paused: pausedCount,
  }

  const currentFilter: Exclude<StaffFilter, 'all'> =
    activeFilter === 'all' ? 'pending' : activeFilter
  const theme = themeMap[currentFilter]

  return (
    <div className={cn('relative overflow-hidden rounded-[26px] p-5 shadow-xl', theme.cardBg)}>
      <div
        aria-hidden
        className={cn('pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full blur-3xl', theme.tint)}
      />
      <div className="relative">
        <Kicker className={theme.kicker}>Team roster · Sunrise panel</Kicker>
        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Your people,{' '}
          <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', theme.titleGradient)}>on Ayvaa</span>
        </h2>
        <p className={cn('mt-1 text-[12px] font-medium leading-relaxed', theme.subtitle)}>
          You approve who represents Sunrise. Ayvaa verifies everyone before their first session.
        </p>

        <div className="mt-4 flex items-center">
          <AnimatePresence>
            {activeMembers.slice(0, 3).map((s, i) => (
              <motion.span
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={cn('rounded-full ring-2', theme.ring, i > 0 && '-ml-2.5')}
              >
                <AgentAvatar seed={s.name} size={36} />
              </motion.span>
            ))}
          </AnimatePresence>
          {activeMembers.length > 3 && (
            <span className={cn('-ml-2.5 grid h-9 w-9 place-items-center rounded-full text-[10px] font-extrabold ring-2', theme.ring, 'bg-white/[0.1] text-white')}>
              +{activeMembers.length - 3}
            </span>
          )}
          <span className={cn('ml-auto text-[9px] font-extrabold uppercase tracking-[0.16em]', theme.total)}>
            {total} total
          </span>
        </div>

        <div className="mt-5 flex gap-1 rounded-2xl bg-white/[0.06] p-1.5">
          {filterMeta.map((meta) => {
            const isActive = activeFilter === meta.key
            return (
              <motion.button
                key={meta.key}
                type="button"
                onClick={() => onFilterChange(meta.key)}
                whileTap={{ scale: 0.96 }}
                aria-pressed={isActive}
                className={cn(
                  'relative flex-1 rounded-xl px-2 py-2.5 text-left outline-none transition-colors',
                  theme.focusRing,
                  isActive ? theme.filterActiveText : theme.filterInactiveText,
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="staff-filter-bg"
                    className={cn('absolute inset-0 rounded-xl', theme.filterActiveBg)}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span className={cn('h-1.5 w-1.5 rounded-full', meta.dot)} />
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.14em]">{meta.label}</span>
                </span>
                <span className="relative mt-1">
                  <AnimatedCount value={counts[meta.key]} />
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
