import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { BadgeCheck, Check, ChevronDown, ChevronLeft, ChevronRight, Download, Loader2, Lock, Star, TrendingUp, X } from 'lucide-react'
import { Card, Chip, Hero, Ring } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { FeedbackEntry, PerformanceData, PerformanceMonth } from '@/data/partnerPerformanceTypes'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { SheetShell } from '@/components/phone/SheetShell'
import AgentAvatar from '@/components/smoothui/agent-avatar'

interface CareGoalsCardProps {
  data: PerformanceData
}

export function CareGoalsCard({ data }: CareGoalsCardProps) {
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null)
  const { goalsMet, goalsTotal } = data
  const progress = goalsMet / goalsTotal

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">Recovery plan</span>
              <span className="text-[13px] font-extrabold tabular-nums text-[#0B211B]/60">
                {goalsMet}
                <span className="text-[#0B211B]/35">/{goalsTotal} met</span>
              </span>
            </div>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: goalsTotal }, (_, i) => (
                <motion.span
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.25 }}
                  className={cn(
                    'h-2.5 min-w-0 flex-1 rounded-full',
                    i < goalsMet ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-amber-400/80',
                  )}
                />
              ))}
            </div>
          </div>
          <Ring value={progress} size={56} stroke={5} id="care-goals-ring">
            <span className="text-[12px] font-extrabold tabular-nums leading-none text-[#0B211B]">{Math.round(progress * 100)}%</span>
          </Ring>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {data.goals.map((g) => {
            const isExpanded = expandedGoal === g.label
            return (
              <div key={g.label}>
                <motion.button
                  type="button"
                  onClick={() => setExpandedGoal(isExpanded ? null : g.label)}
                  className="flex w-full items-center gap-2.5 rounded-xl px-1 py-1 text-left outline-none transition-colors hover:bg-[#0B211B]/[0.03] focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  whileTap={{ scale: 0.99 }}
                >
                  <span
                    className={cn(
                      'grid h-4 w-4 shrink-0 place-items-center rounded-full',
                      g.done ? 'bg-emerald-500 text-white' : 'bg-amber-400/25',
                    )}
                  >
                    {g.done ? (
                      <Star className="h-2.5 w-2.5 fill-white" aria-hidden />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    )}
                  </span>
                  <span
                    className={cn(
                      'min-w-0 flex-1 truncate text-[12px] font-bold',
                      g.done ? 'text-[#0B211B]/70' : 'text-[#0B211B]/45',
                    )}
                  >
                    {g.label}
                  </span>
                  <Chip intent={g.done ? 'success' : 'warning'}>{g.done ? 'Met' : 'Open'}</Chip>
                  <ChevronDown
                    className={cn(
                      'h-3 w-3 shrink-0 text-[#0B211B]/30 transition-transform',
                      isExpanded && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </motion.button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <p className="ml-6 mt-1 text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                        {g.note}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

interface FamilyFeedbackCardProps {
  data: PerformanceData
  onOpen: (feedbackIndex: number) => void
}

export function FamilyFeedbackCard({ data }: FamilyFeedbackCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const feedback = data.feedbacks[currentIndex]

  const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? data.feedbacks.length - 1 : prev - 1))
  const goNext = () => setCurrentIndex((prev) => (prev === data.feedbacks.length - 1 ? 0 : prev + 1))

  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <div className="relative">
        <div className="flex items-center justify-between">
          <Stars />
          <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">
            {feedback.rating.toFixed(1)} · verbatim
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2.5 min-h-[80px]"
          >
            <p className="text-pretty text-[14px] font-semibold leading-relaxed text-white/90">
              &ldquo;{feedback.quote}&rdquo;
            </p>
            <div className="mt-3.5 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] font-extrabold text-emerald-200">
                {feedback.family.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/80">{feedback.family}</span>
              <span className="text-[9px] font-semibold text-emerald-100/40">{feedback.date}</span>
              <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-100/30" aria-hidden />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {data.feedbacks.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  idx === currentIndex ? 'w-4 bg-emerald-300' : 'w-1.5 bg-white/20',
                )}
                aria-label={`Show feedback ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={goPrev}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] text-emerald-100/60 transition-colors hover:bg-white/[0.12]"
              aria-label="Previous feedback"
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] text-emerald-100/60 transition-colors hover:bg-white/[0.12]"
              aria-label="Next feedback"
            >
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </PhaseHero>
  )
}

interface PerformanceFeedbackSheetProps {
  feedback: FeedbackEntry | null
  onClose: () => void
}

export function PerformanceFeedbackSheet({ feedback, onClose }: PerformanceFeedbackSheetProps) {
  return (
    <AnimatePresence>
      {feedback && (
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
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-lg font-extrabold text-emerald-700">
                  {feedback.family.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{feedback.family}</h3>
                  <p className="mt-0.5 text-[12px] font-semibold text-[#0B211B]/50">Verified family feedback · {feedback.date}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Stars />
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                      {feedback.rating.toFixed(1)} rating
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/5 text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/10 focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  aria-label="Close feedback details"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <div className="mt-5 rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <p className="text-pretty text-[14px] font-semibold leading-relaxed text-[#0B211B]/80">
                  &ldquo;{feedback.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                <Lock className="h-3.5 w-3.5" aria-hidden />
                Shared with partner consent
              </div>
            </div>
          </SheetShell>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface PerformanceFooterProps {
  onExport: () => void
}

export function PerformanceFooter({ onExport }: PerformanceFooterProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleClick = () => {
    setLoading(true)
    onExport()
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1200)
  }

  return (
    <motion.button
      type="button"
      whileTap={loading || success ? undefined : { scale: 0.97 }}
      onClick={handleClick}
      disabled={loading || success}
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-opacity disabled:opacity-80"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : success ? (
        <Check className="h-4 w-4" aria-hidden />
      ) : (
        <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {loading ? 'Preparing report…' : success ? 'Report queued!' : 'Export performance report'}
    </motion.button>
  )
}

interface PerformanceHeroProps {
  data: PerformanceData
  activeMonth: PerformanceMonth
  onMonthChange: (month: PerformanceMonth) => void
  onOpenFeedback: () => void
}

export function PerformanceHero({ data, activeMonth, onMonthChange, onOpenFeedback }: PerformanceHeroProps) {
  const months: PerformanceMonth[] = ['March', 'February']
  return (
    <Hero>
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <AgentAvatar seed="Dr. Venkatesh" size={56} />
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[#0B231C] shadow-md">
            <BadgeCheck className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Performance · {data.month}</div>
          <h2 className="mt-1.5 text-[19px] font-extrabold leading-tight tracking-tight text-white">Dr. Venkatesh</h2>
          <p className="mt-0.5 text-[11.5px] font-semibold text-emerald-100/55">Physiotherapist · Sunrise panel</p>
          <p className="text-[10.5px] font-medium text-emerald-100/40">{data.week}</p>
        </div>
        <Ring value={data.rating / 5} size={72} stroke={6} id="pt06-ring">
          <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">{data.rating}</span>
          <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.16em] text-emerald-200/50">rating</span>
        </Ring>
      </div>

      <div className="mt-4 flex gap-1 rounded-2xl bg-white/[0.06] p-1">
        {months.map((month) => {
          const isActive = activeMonth === month
          return (
            <motion.button
              key={month}
              type="button"
              onClick={() => onMonthChange(month)}
              whileTap={{ scale: 0.97 }}
              aria-pressed={isActive}
              className={cn(
                'relative flex-1 rounded-xl px-2 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.12em] outline-none transition-colors',
                isActive ? 'text-white' : 'text-emerald-100/60 hover:text-emerald-100',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="performance-month-bg"
                  className="absolute inset-0 rounded-xl bg-white/[0.12]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{month}</span>
            </motion.button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onOpenFeedback}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white/[0.06] px-3.5 py-3 text-left outline-none transition-colors hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-emerald-300/50"
      >
        <div className="min-w-0">
          <Stars />
          <div className="mt-1 truncate text-[10.5px] font-bold text-emerald-100/60">
            Family-rated across every completed visit
          </div>
        </div>
        <Chip intent="success" light icon={TrendingUp} className="shrink-0 border-transparent">
          {data.ratingChange}
        </Chip>
      </button>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip intent="success" light className="border-transparent">{data.incidentsResolved}</Chip>
        <Chip intent="warning" light className="border-transparent">{data.goalsInProgress}</Chip>
      </div>
    </Hero>
  )
}

interface Kpi {
  icon: LucideIcon
  value: string
  label: string
  tint: string
  iconBg: string
  detail: string
}

interface PerformanceKpiSheetProps {
  kpi: Kpi | null
  onClose: () => void
}

export function PerformanceKpiSheet({ kpi, onClose }: PerformanceKpiSheetProps) {
  return (
    <AnimatePresence>
      {kpi && (
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
                <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl', kpi.iconBg)}>
                  <kpi.icon className="h-6 w-6" strokeWidth={2.4} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{kpi.label}</h3>
                  <p className="mt-1 text-2xl font-extrabold tabular-nums text-[#0B211B]">{kpi.value}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/5 text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/10 focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  aria-label="Close details"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <div className="mt-5 rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <p className="text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/70">{kpi.detail}</p>
              </div>
            </div>
          </SheetShell>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface Kpi {
  icon: LucideIcon
  value: string
  label: string
  tint: string
  iconBg: string
  detail: string
}

interface PerformanceKpisProps {
  kpis: Kpi[]
  onSelect: (kpi: Kpi) => void
}

export function PerformanceKpis({ kpis, onSelect }: PerformanceKpisProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {kpis.map((k) => (
        <motion.button
          key={k.label}
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(k)}
          className={cn(
            'rounded-2xl p-4 text-left outline-none transition-colors hover:bg-opacity-80 focus-visible:ring-2 focus-visible:ring-emerald-500/40',
            k.tint,
          )}
        >
          <span className={cn('flex h-8 w-8 items-center justify-center rounded-xl', k.iconBg)}>
            <k.icon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </span>
          <div className="mt-3 text-[22px] font-extrabold tabular-nums leading-none tracking-tight text-[#0B211B]">{k.value}</div>
          <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/45">{k.label}</div>
        </motion.button>
      ))}
    </div>
  )
}

export function PerformancePrivacyNote() {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3">
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
      <p className="min-w-0 flex-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
        Feedback reaches partners only after the family approves sharing. Reviews are never edited.
      </p>
    </div>
  )
}

export function Stars({ className, size = 'h-3.5 w-3.5' }: { className?: string; size?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label="5 star rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={cn(size, 'fill-amber-300 text-amber-300')} aria-hidden />
      ))}
    </span>
  )
}
