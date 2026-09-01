import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, ChevronDown, Clock, Loader2, PauseCircle, PlayCircle, ShieldCheck, UserCheck, X } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Card, Chip, Kicker, Panel } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { StaffMember } from '@/data/types'
import { SheetShell } from '@/components/phone/SheetShell'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { Row } from '@/components/phone/Row'

interface StaffApprovalCardProps {
  member: StaffMember
  onApprove: (id: string) => void
  onDecline: (id: string) => void
}

export function StaffApprovalCard({ member, onApprove, onDecline }: StaffApprovalCardProps) {
  const [processing, setProcessing] = useState<'approve' | 'decline' | null>(null)

  const handleApprove = () => {
    if (processing) return
    setProcessing('approve')
    onApprove(member.id)
  }

  const handleDecline = () => {
    if (processing) return
    setProcessing('decline')
    onDecline(member.id)
  }

  return (
    <Card intent="warning">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/70">
            Approval request
          </span>
          <Chip intent="warning" dot icon={Clock}>
            Waiting
          </Chip>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full ring-4 ring-amber-500/20">
            <AgentAvatar seed={member.name} size={52} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-extrabold tracking-tight text-[#0B211B]">{member.name}</div>
            <div className="truncate text-xs font-semibold text-[#0B211B]/55">{member.role}</div>
          </div>
        </div>

        <Panel intent="warning" className="mt-4 p-3.5">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/70">Why they want in</div>
          <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{member.note}</p>
        </Panel>

        <div className="mt-4 rounded-2xl bg-amber-500/[0.06] p-3.5">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#0B211B]/70">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" aria-hidden />
            Verification progress
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-1.5 flex-1 rounded-full bg-amber-500" />
            <span className="h-1.5 flex-1 rounded-full bg-amber-500/30" />
            <span className="h-1.5 flex-1 rounded-full bg-amber-500/30" />
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-semibold text-[#0B211B]/40">
            <span>Submitted</span>
            <span>Background</span>
            <span>Decision</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={processing ? undefined : { scale: 0.97 }}
            onClick={handleDecline}
            disabled={processing !== null}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.1] py-3.5 text-[13px] font-bold text-rose-600 transition-opacity',
              processing && 'opacity-50',
            )}
          >
            {processing === 'decline' ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            )}
            <span className="truncate">{processing === 'decline' ? 'Declining…' : 'Decline'}</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={processing ? undefined : { scale: 0.97 }}
            onClick={handleApprove}
            disabled={processing !== null}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-opacity',
              processing && 'opacity-50',
            )}
          >
            {processing === 'approve' ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            )}
            <span className="truncate">{processing === 'approve' ? 'Approving…' : 'Approve'}</span>
          </motion.button>
        </div>
      </div>
    </Card>
  )
}

interface StaffDetailSheetProps {
  member: StaffMember | null
  onClose: () => void
  onStatusChange: (id: string, newStatus: 'active' | 'paused') => void
}

export function StaffDetailSheet({ member, onClose, onStatusChange }: StaffDetailSheetProps) {
  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <SheetShell onClose={onClose} height="auto">
            <div>
              <div className="flex items-start gap-4">
                <span className="rounded-full ring-4 ring-emerald-500/20">
                  <AgentAvatar seed={member.name} size={56} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{member.name}</h3>
                  <p className="mt-0.5 truncate text-[13px] font-semibold text-[#0B211B]/60">{member.role}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip intent={member.status === 'active' ? 'success' : 'neutral'} dot>
                      {member.status === 'active' ? 'Active' : 'Paused'}
                    </Chip>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                      Joined {member.joinedAt ?? '—'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/5 text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/10 focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  aria-label="Close staff details"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Note</div>
                  <p className="mt-1 text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{member.note}</p>
                </div>
              </div>

              <div className="mt-5">
                {member.status === 'active' ? (
                  <button
                    type="button"
                    onClick={() => onStatusChange(member.id, 'paused')}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500/[0.1] py-3.5 text-[13px] font-bold text-amber-700 transition-transform active:scale-[0.98]"
                  >
                    <PauseCircle className="h-4 w-4" aria-hidden />
                    Pause staff member
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onStatusChange(member.id, 'active')}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-transform active:scale-[0.98]"
                  >
                    <PlayCircle className="h-4 w-4" aria-hidden />
                    Resume staff member
                  </button>
                )}
              </div>
            </div>
          </SheetShell>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

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
  theme: (typeof PHASE_THEME)[keyof typeof PHASE_THEME]
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
    theme: PHASE_THEME.emerald,
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
    theme: PHASE_THEME.amber,
    tint: 'bg-amber-400/20',
    kicker: 'text-amber-300/80',
    titleGradient: 'from-amber-300 to-orange-200',
    subtitle: 'text-amber-100/55',
    ring: 'ring-[#241B0C]',
    total: 'text-amber-100/40',
    filterActiveBg: 'bg-amber-400/20',
    filterActiveText: 'text-white',
    filterInactiveText: 'text-amber-100/60 hover:text-amber-100',
    focusRing: 'focus-visible:ring-amber-300/50 focus-visible:ring-offset-[#241B0C]',
  },
  paused: {
    theme: PHASE_THEME.rose,
    tint: 'bg-rose-400/20',
    kicker: 'text-rose-300/80',
    titleGradient: 'from-rose-300 to-red-200',
    subtitle: 'text-rose-100/55',
    ring: 'ring-[#230D14]',
    total: 'text-rose-100/40',
    filterActiveBg: 'bg-rose-400/20',
    filterActiveText: 'text-white',
    filterInactiveText: 'text-rose-100/60 hover:text-rose-100',
    focusRing: 'focus-visible:ring-rose-300/50 focus-visible:ring-offset-[#230D14]',
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
  const counts: Record<StaffFilter, number> = {
    all: activeMembers.length + pendingCount + pausedCount,
    active: activeMembers.length,
    pending: pendingCount,
    paused: pausedCount,
  }

  const currentFilter: Exclude<StaffFilter, 'all'> =
    activeFilter === 'all' ? 'pending' : activeFilter
  const theme = themeMap[currentFilter]

  return (
    <PhaseHero theme={theme.theme}>
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
    </PhaseHero>
  )
}

interface StaffListProps {
  members: StaffMember[]
  variant: 'active' | 'paused'
  onOpenStaff: (member: StaffMember) => void
}

export function StaffList({ members, variant, onOpenStaff }: StaffListProps) {
  return (
    <Card>
      {members.map((s, i) => (
        <div key={s.id}>
          {i > 0 && (
            <div
              aria-hidden
              className={cn(
                'h-px',
                              )}
            />
          )}
          <Row
            leading={
              variant === 'active' ? (
                <span className="relative shrink-0">
                  <AgentAvatar seed={s.name} size={44} />
                  <span className="absolute -bottom-0.5 -right-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                    <BadgeCheck className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                  </span>
                </span>
              ) : (
                <AgentAvatar seed={s.name} size={44} />
              )
            }
            title={s.name}
            titleClassName={variant === 'active' ? 'text-[13.5px] leading-snug' : 'text-[13px]'}
            subtitle={variant === 'active' ? s.role : s.note}
            subtitleClassName={variant === 'active' ? 'text-[11px] font-semibold' : 'text-[11px] font-medium'}
            trailing={
              variant === 'active' ? undefined : (
                <Chip intent="neutral" icon={PauseCircle}>
                  Paused
                </Chip>
              )
            }
            onClick={() => onOpenStaff(s)}
            showChevron={variant === 'active'}
          />
        </div>
      ))}
    </Card>
  )
}

export function StaffVerificationNote() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-start gap-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
            Every staff member is verified by Ayvaa before their first session. You approve who joins under Sunrise — approvals and
            declines are both logged.
          </span>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="block overflow-hidden"
              >
                <span className="mt-2 block border-t border-[#0B211B]/[0.06] pt-2 text-[10.5px] font-medium leading-relaxed text-[#0B211B]/45">
                  Verification includes licence checks, background screening, and a short onboarding call. You can pause or resume
                  access at any time from the staff details.
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <ChevronDown
          className={cn(
            'mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B211B]/40 transition-transform',
            expanded && 'rotate-180',
          )}
          aria-hidden
        />
      </button>
    </div>
  )
}
