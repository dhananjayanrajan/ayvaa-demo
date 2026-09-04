import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Check, CheckCircle2, ChevronDown, Clock, Eye, FileText, Info, Lock, MessageSquare, Milestone, Pause, Play, ShieldCheck, Stethoscope, UserCheck } from 'lucide-react'
import type { TileTone } from '@/components/base/phone/kit'
import { Card, Chip, Expand, Hero, Panel, Tile, TimeChip, rise } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import AgentAvatar from '@/components/base/smoothui/agent-avatar'

interface JourneyStep {
  title: string
  body: string
  state: 'done' | 'now' | 'next'
}

interface PartnerCarePathwayProps {
  journey: JourneyStep[]
  latestVisit: {
    date: string
    quote: string
    by: string
  }
}

interface StateConfig {
  tone: TileTone
  icon: LucideIcon
  chipIntent: 'success' | 'warning' | 'neutral'
  chipLabel: string
  panelIntent: 'warning' | 'neutral'
}

const stateConfigs: Record<JourneyStep['state'], StateConfig> = {
  now: {
    tone: 'warning',
    icon: Clock,
    chipIntent: 'warning',
    chipLabel: 'In Progress',
    panelIntent: 'warning',
  },
  done: {
    tone: 'success',
    icon: CheckCircle2,
    chipIntent: 'success',
    chipLabel: 'Completed',
    panelIntent: 'neutral',
  },
  next: {
    tone: 'ink',
    icon: Milestone,
    chipIntent: 'neutral',
    chipLabel: 'Upcoming',
    panelIntent: 'neutral',
  },
}

export function PartnerCarePathway({ journey, latestVisit }: PartnerCarePathwayProps) {
  const activeIndex = journey.findIndex((s) => s.state === 'now')
  const [expandedId, setExpandedId] = useState<string | null>(
    activeIndex >= 0 ? `step-${activeIndex}` : 'step-0'
  )

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="relative p-2">
          {journey.map((s, i) => {
            const stepId = `step-${i}`
            const open = expandedId === stepId
            const config = stateConfigs[s.state]
            const Icon = config.icon

            const isNow = s.state === 'now'
            const isDone = s.state === 'done'
            const isNext = s.state === 'next'
            const isLast = i === journey.length - 1

            return (
              <div key={s.title} className="relative">
                {!isLast && (
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-[27px] top-[48px] bottom-0 w-0.5 z-0 transition-colors duration-200',
                      isDone ? 'bg-emerald-500/25' : 'bg-[#0B211B]/[0.08]'
                    )}
                  />
                )}

                <button
                  type="button"
                  onClick={() => setExpandedId(open ? null : stepId)}
                  className={cn(
                    'relative z-10 flex w-full items-start gap-3 p-3 text-left transition-colors rounded-xl',
                    isNow && 'bg-amber-500/[0.04]'
                  )}
                >
                  <Tile
                    icon={Icon}
                    tone={config.tone}
                    className={cn('shrink-0 mt-0.5', isNext && 'opacity-40')}
                  />

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <TimeChip className={cn('shrink-0', isNext && 'opacity-50')}>
                        Step 0{i + 1}
                      </TimeChip>
                      <Chip
                        intent={config.chipIntent}
                        icon={isDone ? Check : undefined}
                        dot={isNow}
                        className={cn('shrink-0 max-w-[140px] truncate', isNext && 'opacity-50')}
                      >
                        {config.chipLabel}
                      </Chip>
                    </span>

                    <span
                      className={cn(
                        'mt-1.5 block text-sm font-bold tracking-tight text-[#0B211B] truncate',
                        isNext && 'text-[#0B211B]/40'
                      )}
                      title={s.title}
                    >
                      {s.title}
                    </span>

                    {!open && (
                      <span
                        className={cn(
                          'mt-0.5 block text-xs font-medium leading-relaxed text-[#0B211B]/55 truncate',
                          isNext && 'text-[#0B211B]/35'
                        )}
                        title={s.body}
                      >
                        {s.body}
                      </span>
                    )}
                  </span>

                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 pt-1"
                  >
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-colors',
                        isNow ? 'text-amber-600/70' : 'text-[#0B211B]/30'
                      )}
                      aria-hidden
                    />
                  </motion.span>
                </button>

                <Expand open={open}>
                  <div className="pt-1 pb-3 pl-[52px] pr-3">
                    <Panel intent={config.panelIntent} className="p-3.5 sm:p-4 space-y-3.5">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#0B211B]/40 mb-1">
                          Overview
                        </span>
                        <p className="text-xs font-medium leading-relaxed text-[#0B211B]/80 break-words">
                          {s.body}
                        </p>
                      </div>

                      {isNow && (
                        <div className="pt-3 border-t border-amber-900/10 space-y-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 shrink-0">
                              Clinical Update
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#0B211B]/40 shrink-0">
                              <Lock className="h-3 w-3" aria-hidden />
                              {latestVisit.date}
                            </span>
                          </div>

                          <p className="text-xs font-medium leading-relaxed text-[#0B211B]/85 bg-amber-500/10 rounded-lg p-2.5 break-words">
                            &ldquo;{latestVisit.quote}&rdquo;
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 pt-0.5 text-[11px]">
                            <span
                              className="inline-flex items-center gap-1.5 font-semibold text-[#0B211B]/70 min-w-0 max-w-[60%] truncate"
                              title={latestVisit.by}
                            >
                              <UserCheck className="h-3.5 w-3.5 text-amber-700 shrink-0" aria-hidden />
                              <span className="truncate">{latestVisit.by}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 shrink-0">
                              <ShieldCheck className="h-3.5 w-3.5 stroke-[2] shrink-0" aria-hidden />
                              Verified
                            </span>
                          </div>
                        </div>
                      )}
                    </Panel>
                  </div>
                </Expand>
              </div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}

export function PartnerChartConsentNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3"
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
        <Eye className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
      </span>
      <p className="min-w-0 flex-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
        Sunrise sees this chart because the guardian consented to sharing. Entries are verbatim and visible only after each visit
        is verified.
      </p>
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B211B]/30" aria-hidden />
    </motion.div>
  )
}

interface PartnerPatientFooterProps {
  onDischargeFile: () => void
  onMessageCareTeam: () => void
}

export function PartnerPatientFooter({ onDischargeFile, onMessageCareTeam }: PartnerPatientFooterProps) {
  return (
    <div className="flex gap-2.5">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={onDischargeFile}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        <FileText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Discharge file</span>
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={onMessageCareTeam}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
      >
        <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Send a Message</span>
      </motion.button>
    </div>
  )
}

interface PartnerPatientHeroProps {
  patient: {
    name: string
    condition: string
    age: number
    referredBy: string
    caregiver: string
    progress: string
    refCode: string
    day: number
    totalDays: number
    visitsDone: number
  }
  onInfo: () => void
}

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const progress = Math.min((timestamp - startRef.current) / duration, 1)
      setValue(Math.round(progress * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return value
}

function getProgressTheme(pct: number) {
  if (pct >= 75) return { bar: 'from-emerald-400 to-teal-300', text: 'text-emerald-300', ring: 'ring-emerald-400/40' }
  if (pct >= 50) return { bar: 'from-sky-400 to-blue-300', text: 'text-sky-300', ring: 'ring-sky-400/40' }
  if (pct >= 25) return { bar: 'from-amber-400 to-orange-300', text: 'text-amber-300', ring: 'ring-amber-400/40' }
  return { bar: 'from-rose-400 to-red-300', text: 'text-rose-300', ring: 'ring-rose-400/40' }
}

export function PartnerPatientHero({ patient, onInfo }: PartnerPatientHeroProps) {
  const recoveryPercent = Math.round((patient.day / patient.totalDays) * 100)
  const theme = getProgressTheme(recoveryPercent)
  const animatedDay = useCountUp(patient.day)
  const animatedVisits = useCountUp(patient.visitsDone)

  const stats = [
    { value: `Day ${animatedDay}`, label: `of ${patient.totalDays}` },
    { value: `${animatedVisits}`, label: 'visits done' },
    { value: patient.caregiver.split(' ')[0], label: 'caregiver' },
  ]

  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Patient chart</div>
          <h2 className="mt-1.5 truncate text-[19px] font-extrabold leading-tight tracking-tight text-white">{patient.name}</h2>
          <div className="mt-0.5">
            <p className="text-[11.5px] font-semibold text-emerald-100/55">
              {patient.condition} · age {patient.age}
            </p>
            <p className="text-[11.5px] font-semibold text-emerald-100/55 mt-0.5">
              Referred by {patient.referredBy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onInfo}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] text-emerald-200/70 transition-colors hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            aria-label="View patient details"
          >
            <Info className="h-4 w-4" aria-hidden />
          </motion.button>
          <AgentAvatar seed={patient.name} size={48} />
        </div>
      </div>

      <div className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
        </span>
        <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-100/70">{patient.refCode}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.4, ease: 'easeOut' }}
            className="rounded-2xl bg-white/[0.06] px-3 py-2.5"
          >
            <div className="truncate text-[13px] font-extrabold tabular-nums leading-none text-white">{stat.value}</div>
            <div className="mt-1 truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
          <Stethoscope className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/85">{patient.caregiver}</span>
        <Chip intent="live" light dot className="border-transparent">
          {patient.progress}
        </Chip>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-100/40">
          <span>Recovery progress</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={recoveryPercent}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className={cn('text-emerald-100/70', theme.text)}
            >
              {recoveryPercent}%
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${recoveryPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full bg-gradient-to-r', theme.bar)}
          />
        </div>
      </div>
    </Hero>
  )
}

interface TrajectoryPoint {
  wk: number
  pct: number
  proj?: boolean
}

interface PartnerRecoveryTrajectoryProps {
  trajectory: TrajectoryPoint[]
}

const X = (wk: number) => 10 + (wk / 6) * 280
const Y = (pct: number) => 118 - pct * 0.95

type ViewMode = 'actual' | 'projected' | 'combined'

interface StatusTheme {
  label: string
  bgSoft: string
  borderClass: string
  textClass: string
  strokeColor: string
  buttonClass: string
  badgeClass: string
  isFull: boolean
}

function getTheme(pct: number): StatusTheme {
  if (pct >= 100) {
    return {
      label: 'Optimal',
      bgSoft: 'rgba(16, 185, 129, 0.08)',
      borderClass: 'border-emerald-500/50 shadow-sm',
      textClass: 'text-emerald-700',
      strokeColor: '#10b981',
      buttonClass: 'bg-emerald-600 hover:bg-emerald-500 focus-visible:ring-emerald-500/40',
      badgeClass: 'bg-emerald-600 text-white',
      isFull: true,
    }
  }

  if (pct < 30) {
    return {
      label: 'Critical',
      bgSoft: 'rgba(244, 63, 94, 0.04)',
      borderClass: 'border-rose-200/40 shadow-sm',
      textClass: 'text-rose-600',
      strokeColor: '#f43f5e',
      buttonClass: 'bg-rose-600 hover:bg-rose-500 focus-visible:ring-rose-500/40',
      badgeClass: 'bg-rose-500/10 text-rose-700',
      isFull: false,
    }
  }

  if (pct < 60) {
    return {
      label: 'Moderate',
      bgSoft: 'rgba(245, 158, 11, 0.04)',
      borderClass: 'border-amber-200/40 shadow-sm',
      textClass: 'text-amber-600',
      strokeColor: '#f59e0b',
      buttonClass: 'bg-amber-500 hover:bg-amber-400 focus-visible:ring-amber-500/40',
      badgeClass: 'bg-amber-500/10 text-amber-700',
      isFull: false,
    }
  }

  return {
    label: 'Advanced',
    bgSoft: 'rgba(2, 132, 199, 0.04)',
    borderClass: 'border-sky-200/40 shadow-sm',
    textClass: 'text-sky-600',
    strokeColor: '#0284c7',
    buttonClass: 'bg-sky-600 hover:bg-sky-500 focus-visible:ring-sky-500/40',
    badgeClass: 'bg-sky-500/10 text-sky-700',
    isFull: false,
  }
}

export function PartnerRecoveryTrajectory({ trajectory }: PartnerRecoveryTrajectoryProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('combined')
  const [selectedWeek, setSelectedWeek] = useState(3)
  const [isPlaying, setIsPlaying] = useState(false)
  const animationRef = useRef<number | null>(null)

  const visibleActual = viewMode !== 'projected'
  const visibleProjected = viewMode !== 'actual'

  const selectedPoint = trajectory.find((t) => t.wk === selectedWeek) || trajectory[0]
  const currentTheme = getTheme(selectedPoint.pct)

  const solidPts = trajectory.filter((t) => !t.proj).map((t) => `${X(t.wk)},${Y(t.pct)}`).join(' ')
  const projPts = [
    `${X(3)},${Y(33)}`,
    ...trajectory.filter((t) => t.proj).map((t) => `${X(t.wk)},${Y(t.pct)}`),
  ].join(' ')

  const stopPlayback = () => {
    if (animationRef.current !== null) {
      clearInterval(animationRef.current)
      animationRef.current = null
    }
    setIsPlaying(false)
  }

  const startPlayback = () => {
    if (isPlaying) return
    setIsPlaying(true)

    if (selectedWeek >= 6) {
      setSelectedWeek(0)
    }

    animationRef.current = window.setInterval(() => {
      setSelectedWeek((prev) => {
        if (prev >= trajectory.length - 1) {
          stopPlayback()
          return prev
        }
        return prev + 1
      })
    }, 1100)
  }

  useEffect(() => {
    return () => stopPlayback()
  }, [])

  const tabs = [
    { key: 'actual', label: 'ACTUAL' },
    { key: 'projected', label: 'PROJECTED' },
    { key: 'combined', label: 'COMBINED' },
  ] as const

  return (
    <Card className={cn('transition-all duration-300 border overflow-hidden', currentTheme.borderClass)}>
      <motion.div
        className="p-4 rounded-[inherit]"
        animate={{ backgroundColor: currentTheme.bgSoft }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/50">
              6-WEEK PLAN
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={selectedPoint.wk}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em]',
                  currentTheme.badgeClass
                )}
              >
                {currentTheme.isFull && <CheckCircle2 className="h-2.5 w-2.5" />}
                {currentTheme.label}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.div
            className="flex items-baseline gap-1"
            key={selectedPoint.pct}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <span className={cn('text-[15px] font-extrabold tabular-nums transition-colors duration-300', currentTheme.textClass)}>
              {selectedPoint.pct}%
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">TARGET</span>
          </motion.div>
        </div>

        <div className="mt-3 flex rounded-xl bg-[#0B211B]/[0.05] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setViewMode(tab.key)}
              className="relative flex-1 rounded-lg py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              {viewMode === tab.key && (
                <motion.span
                  layoutId="trajectoryView"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              <span
                className={cn(
                  'relative z-10 transition-colors duration-200',
                  viewMode === tab.key ? 'text-[#0B211B]' : 'text-[#0B211B]/50 hover:text-[#0B211B]/80'
                )}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <svg viewBox="0 0 300 130" className="mt-2 h-32 w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="clinicalGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {[25, 50, 75, 100].map((g) => (
            <line
              key={g}
              x1={10}
              x2={290}
              y1={Y(g)}
              y2={Y(g)}
              stroke="rgba(11,33,27,0.07)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          ))}

          <line
            x1={X(3)}
            x2={X(3)}
            y1={16}
            y2={122}
            stroke={selectedWeek === 3 ? currentTheme.strokeColor : 'rgba(11,33,27,0.15)'}
            strokeWidth={selectedWeek === 3 ? '2' : '1.5'}
            strokeDasharray="4 3"
          />

          {visibleActual && (
            <motion.polyline
              points={solidPts}
              fill="none"
              stroke="url(#clinicalGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {visibleProjected && (
            <motion.polyline
              points={projPts}
              fill="none"
              stroke="url(#clinicalGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {trajectory.map((t) => {
            const isSelected = t.wk === selectedWeek
            const theme = getTheme(t.pct)

            return (
              <g key={t.wk} onClick={() => setSelectedWeek(t.wk)} className="cursor-pointer">
                {isSelected && (
                  <motion.circle
                    cx={X(t.wk)}
                    cy={Y(t.pct)}
                    r={10}
                    fill={theme.strokeColor}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <motion.circle
                  cx={X(t.wk)}
                  cy={Y(t.pct)}
                  r={isSelected ? 6.5 : 4}
                  fill={theme.strokeColor}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? '2' : '1.5'}
                  animate={{ scale: isSelected ? 1.15 : 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                />
              </g>
            )
          })}

          <text
            x={X(3)}
            y={10}
            textAnchor="middle"
            className={cn(
              'text-[8px] font-extrabold uppercase transition-colors duration-200',
              selectedWeek === 3 ? currentTheme.textClass : 'fill-[#0B211B]/40'
            )}
            letterSpacing="1"
          >
            TODAY
          </text>
        </svg>

        <div className="mt-2 flex items-center justify-between">
          {trajectory.map((t) => {
            const isSelected = selectedWeek === t.wk
            const theme = getTheme(t.pct)
            return (
              <motion.button
                key={t.wk}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedWeek(t.wk)}
                className={cn(
                  'rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
                  isSelected
                    ? `${theme.buttonClass} text-white shadow-sm`
                    : 'text-[#0B211B]/40 hover:bg-[#0B211B]/[0.05] hover:text-[#0B211B]/80'
                )}
              >
                W{t.wk}
              </motion.button>
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#0B211B]/[0.04] p-2.5 px-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/50">
              WEEK {selectedPoint.wk} TARGET
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={selectedPoint.wk}
                initial={{ opacity: 0, x: -3 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 3 }}
                transition={{ duration: 0.15 }}
                className={cn('text-[13px] font-extrabold tabular-nums transition-colors duration-200', currentTheme.textClass)}
              >
                {selectedPoint.pct}% RECOVERED
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={isPlaying ? stopPlayback : startPlayback}
            className={cn(
              'grid h-8 w-8 place-items-center rounded-full text-white shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              currentTheme.buttonClass
            )}
            aria-label={isPlaying ? 'Pause timeline' : 'Play timeline'}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
          </motion.button>
        </div>
      </motion.div>
    </Card>
  )
}
