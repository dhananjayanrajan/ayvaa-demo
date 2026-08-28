import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Activity,
  CalendarCheck,
  CalendarClock,
  ChevronDown,
  ChevronRight,
  Footprints,
  HeartPulse,
  MapPin,
  Salad,
  ScrollText,
  ShieldCheck,
  ShieldOff,
  SlidersHorizontal,
  UserRoundCheck,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Hero, Kicker, Meter, Panel, Section, Stat, Tile, rise, stagger } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { carePlan, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Goal = {
  icon: LucideIcon
  tone: TileTone
  title: string
  body: string
  chip: string
  chipIntent: 'success' | 'warning'
  sessions: { d: string; v: string; ok: boolean; pending?: boolean }[]
  note: string
}

const goals: Goal[] = [
  {
    icon: Footprints,
    tone: 'success',
    title: 'Walk fifteen minutes unaided',
    body: 'Achieved at all three visits this week',
    chip: 'Met',
    chipIntent: 'success',
    sessions: [
      { d: 'Mon', v: '12 min', ok: true },
      { d: 'Wed', v: '15 min', ok: true },
      { d: 'Fri', v: '15 min', ok: true },
    ],
    note: 'Full park loop without the cane on Friday — steady stride the whole way.',
  },
  {
    icon: HeartPulse,
    tone: 'success',
    title: 'Blood pressure below 130 over 80',
    body: 'Average this week 126 over 78',
    chip: 'Met',
    chipIntent: 'success',
    sessions: [
      { d: 'Mon', v: '128/79', ok: true },
      { d: 'Wed', v: '124/76', ok: true },
      { d: 'Fri', v: '126/78', ok: true },
    ],
    note: 'Every reading under target since Tuesday. Keep the morning dose timing as is.',
  },
  {
    icon: Salad,
    tone: 'warning',
    title: 'Low salt diet every day',
    body: 'Four of five days · Saturday pending',
    chip: 'In progress',
    chipIntent: 'warning',
    sessions: [
      { d: 'Mon', v: 'On plan', ok: true },
      { d: 'Tue', v: 'Over', ok: false },
      { d: 'Wed', v: 'On plan', ok: true },
      { d: 'Thu', v: 'On plan', ok: true },
      { d: 'Fri', v: 'On plan', ok: true },
      { d: 'Sat', v: 'Pending', ok: false, pending: true },
    ],
    note: "Tuesday's takeaway pushed sodium over — logged honestly, family cooking the rest of the week.",
  },
]

type VisitDay = { d: string; full: string; done: boolean; time?: string; mins?: number }

const week: VisitDay[] = [
  { d: 'Mon', full: 'Monday', done: true, time: '9:00 AM', mins: 62 },
  { d: 'Tue', full: 'Tuesday', done: false },
  { d: 'Wed', full: 'Wednesday', done: true, time: '9:15 AM', mins: 58 },
  { d: 'Thu', full: 'Thursday', done: false },
  { d: 'Fri', full: 'Friday', done: true, time: '9:00 AM', mins: 64 },
  { d: 'Sat', full: 'Saturday', done: false },
  { d: 'Sun', full: 'Sunday', done: false },
]

type MetricId = 'bp' | 'steps' | 'weight'

const metrics: Record<MetricId, { tab: string; unit: string; a: number[]; b?: number[]; target?: number; targetLabel?: string; legendA: string; legendB?: string; delta: string }> = {
  bp: {
    tab: 'Blood pressure',
    unit: '',
    a: [138, 134, 130, 126],
    b: [86, 82, 80, 78],
    target: 130,
    targetLabel: 'target 130',
    legendA: 'Systolic',
    legendB: 'Diastolic',
    delta: '−12 pts',
  },
  steps: {
    tab: 'Steps',
    unit: '',
    a: [420, 900, 1450, 2100],
    target: 1500,
    targetLabel: 'goal 1,500',
    legendA: 'Daily average',
    delta: '+1,680',
  },
  weight: {
    tab: 'Weight',
    unit: ' kg',
    a: [78.4, 77.6, 77.1, 76.5],
    target: 76,
    targetLabel: 'goal 76 kg',
    legendA: 'Weekly reading',
    delta: '−1.9 kg',
  },
}

const metricOrder: MetricId[] = ['bp', 'steps', 'weight']

const cx = (i: number) => 26 + i * 82.5

function makeScale(vals: number[], target?: number) {
  const all = target != null ? [...vals, target] : vals
  const min = Math.min(...all)
  const max = Math.max(...all)
  const pad = (max - min) * 0.25 || 1
  return (v: number) => 98 - ((v - min + pad) / (max - min + pad * 2)) * 78
}

function Overline({ children }: { children: ReactNode }) {
  return <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">{children}</div>
}

function CycleStep({ label, sub, done }: { label: string; sub: string; done: boolean }) {
  return (
    <div className="flex min-w-[84px] flex-col items-center">
      {done ? (
        <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden>
            <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : (
        <span className="relative grid h-4 w-4 place-items-center">
          <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-amber-400/50" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
        </span>
      )}
      <span className="mt-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/60">{label}</span>
      <span className="text-center text-[9px] font-bold text-[#0B211B]/35">{sub}</span>
    </div>
  )
}

function GradButton({ icon: Icon, onClick, children }: { icon: LucideIcon; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="truncate">{children}</span>
    </motion.button>
  )
}

function TonButton({ icon: Icon, onClick, children }: { icon: LucideIcon; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="truncate">{children}</span>
    </motion.button>
  )
}

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

function LeaderRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline">
      <span className="shrink-0 text-[11.5px] font-semibold text-[#0B211B]/55">{k}</span>
      <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
      <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{v}</span>
    </div>
  )
}

function SheetHead({
  icon,
  tone,
  title,
  sub,
  onClose,
}: {
  icon: LucideIcon
  tone: TileTone
  title: string
  sub: string
  onClose: () => void
}) {
  return (
    <div className="flex items-start gap-3">
      <Tile icon={icon} tone={tone} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{title}</div>
        <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">{sub}</div>
      </div>
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={onClose}
        aria-label="Close sheet"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
      >
        <X className="h-4 w-4" aria-hidden />
      </motion.button>
    </div>
  )
}

export function P13() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [openGoal, setOpenGoal] = useState<string | null>(goals[2].title)
  const [metric, setMetric] = useState<MetricId>('bp')
  const [day, setDay] = useState(0)
  const [sheet, setSheet] = useState<'none' | 'visit' | 'consent' | 'caregiver'>('none')
  const close = () => setSheet('none')

  const father = lovedOnes[0]
  const firstName = father.name.split(' ')[0]
  const met = goals.filter((g) => g.chipIntent === 'success').length
  const sel = week[day]
  const m = metrics[metric]

  const scale = makeScale(m.b ? [...m.a, ...m.b] : m.a, m.target)
  const aPts = m.a.map((v, i) => `${cx(i)},${scale(v)}`).join(' ')
  const bPts = m.b?.map((v, i) => `${cx(i)},${scale(v)}`).join(' ')
  const last = m.a[m.a.length - 1]

  return (
    <Screen>
      <AppBar
        title="Care plan"
        subtitle={`${father.name} · ${carePlan.weeks}-week recovery plan`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setSheet('caregiver')}
            aria-label="Caregiver"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <UserRoundCheck className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>Recovery plan · elderly care</Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Week {carePlan.week} of {carePlan.weeks},{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                    {carePlan.status.toLowerCase()}
                  </span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Every goal below is logged by the caregiver at each visit.
                </p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                    <span>Plan progress</span>
                    <span className="tabular-nums">{carePlan.progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                      initial={{ width: 0 }}
                      animate={{ width: `${carePlan.progress}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Visits done" value={carePlan.visitsDone} dot="bg-emerald-300" />
                  <Stat label="Goals met" value={`${met}/3`} dot="bg-teal-300" />
                  <Stat label="Incidents" value={0} dot="bg-rose-300/70" />
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Kicker>
                        <CalendarCheck className="h-3 w-3 text-emerald-300/80" aria-hidden />
                        This week's visits
                      </Kicker>
                      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                        3 of 3{' '}
                        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">completed</span>
                      </h2>
                      <p className="mt-0.5 text-[11px] font-semibold text-emerald-100/50">Tap a day to see its visit</p>
                    </div>
                    <Chip intent="success" light dot className="shrink-0">
                      GPS-checked
                    </Chip>
                  </div>

                  <div className="mt-5 flex h-28 items-end gap-2">
                    {week.map((w, i) => {
                      const isActive = i === day
                      const pct = Math.max(6, ((w.mins ?? 0) / 70) * 100)
                      return (
                        <motion.button
                          key={w.full}
                          type="button"
                          whileTap={{ scale: 0.93 }}
                          onClick={() => setDay(i)}
                          aria-label={`${w.full}, ${w.done ? `visit completed, ${w.mins} minutes` : 'no visit'}`}
                          className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
                        >
                          <span
                            className={cn(
                              'text-[9px] font-extrabold tabular-nums',
                              isActive ? 'text-white' : w.done ? 'text-emerald-100/55' : 'text-emerald-100/25',
                            )}
                          >
                            {w.done ? `${w.mins}m` : '—'}
                          </span>
                          <span className="flex h-full w-full items-end overflow-hidden rounded-t-xl bg-white/[0.06]">
                            <motion.span
                              initial={{ height: 0 }}
                              animate={{ height: w.done ? `${pct}%` : '6%' }}
                              transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
                              className={cn(
                                'w-full rounded-t-xl',
                                w.done
                                  ? isActive
                                    ? 'bg-gradient-to-t from-emerald-400 to-teal-300 shadow-[0_-8px_20px_-8px_rgba(52,211,153,0.7)]'
                                    : 'bg-gradient-to-t from-emerald-500/60 to-teal-400/50'
                                  : 'bg-white/[0.1]',
                              )}
                            />
                          </span>
                          <span
                            className={cn(
                              'text-[9px] font-extrabold uppercase tracking-wide',
                              isActive ? 'text-white' : 'text-emerald-100/40',
                            )}
                          >
                            {w.d}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Card intent={sel.done ? 'success' : 'neutral'}>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{sel.full}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[#0B211B]/50">
                        {sel.done
                          ? `Meera R. · ${sel.time} · ${sel.mins} minutes`
                          : 'No visit scheduled · next Monday 9:00 AM'}
                      </div>
                    </div>
                    <Chip intent={sel.done ? 'success' : 'neutral'} dot={sel.done}>
                      {sel.done ? 'Completed' : 'Off day'}
                    </Chip>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5">
                    <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', sel.done ? 'bg-emerald-500' : 'bg-[#0B211B]/20')} />
                    <span className="min-w-0 flex-1 text-[13px] font-bold text-[#0B211B]/75">
                      {sel.done ? 'GPS-checked arrival · all goals logged' : 'Recovery rest day · plan continues Monday'}
                    </span>
                  </div>

                  {sel.done && (
                    <div className="mt-3 flex gap-2.5">
                      <TonButton icon={ScrollText} onClick={() => setSheet('visit')}>Visit detail</TonButton>
                      <GradButton icon={MapPin} onClick={() => navigate('/patient/p17')}>Full summary</GradButton>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="This week's goals" trailing={<Chip intent="warning" dot>1 open</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent={met === 3 ? 'success' : 'warning'}>
                <div aria-hidden className={cn('h-1 w-full', met === 3 ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-amber-400 to-orange-400')} />
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <Tile icon={Salad} tone={met === 3 ? 'success' : 'warning'} size="lg" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Goal completion</span>
                        <Chip intent={met === 3 ? 'success' : 'warning'} dot={met < 3}>{met} of 3 met</Chip>
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        Diet goal completes Saturday · the other two are sealed for the week.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <Overline>Goal-days achieved</Overline>
                      <span className={cn('shrink-0 text-[10px] font-extrabold tabular-nums', met === 3 ? 'text-emerald-700' : 'text-amber-700')}>
                        8 of 9
                      </span>
                    </div>
                    <Meter value={8 / 9} intent={met === 3 ? 'success' : 'warning'} delay={0.2} className="mt-2" />
                  </div>

                  <div className="mt-4 flex flex-col">
                    {goals.map((g, i) => {
                      const open = openGoal === g.title
                      return (
                        <div key={g.title} className={i > 0 ? 'mt-1' : ''}>
                          {i > 0 && <div aria-hidden className="mb-1 h-px bg-[#0B211B]/[0.05]" />}
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.99 }}
                            onClick={() => setOpenGoal(open ? null : g.title)}
                            className="flex w-full items-center gap-3 py-2.5 text-left"
                          >
                            <Tile icon={g.icon} tone={g.tone} />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{g.title}</span>
                              <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">{g.body}</span>
                            </span>
                            <span className="flex shrink-0 items-center gap-1.5">
                              <Chip intent={g.chipIntent}>{g.chip}</Chip>
                              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22, ease: 'easeOut' }}>
                                <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                              </motion.span>
                            </span>
                          </motion.button>
                          <Expand open={open}>
                            <div className="px-0.5 pb-3">
                              <div className="grid grid-cols-3 gap-1.5">
                                {g.sessions.map((s) => (
                                  <motion.button
                                    key={s.d + s.v}
                                    type="button"
                                    whileTap={{ scale: 0.93 }}
                                    onClick={() => setSheet('visit')}
                                    className={cn(
                                      'rounded-xl px-2 py-2 text-center',
                                      s.pending ? 'bg-amber-500/[0.09]' : s.ok ? 'bg-emerald-500/[0.08]' : 'bg-rose-500/[0.07]',
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        'block text-[8px] font-extrabold uppercase tracking-[0.14em]',
                                        s.pending ? 'text-amber-700/60' : s.ok ? 'text-emerald-700/60' : 'text-rose-500/70',
                                      )}
                                    >
                                      {s.d}
                                    </span>
                                    <span
                                      className={cn(
                                        'mt-0.5 block truncate text-[11px] font-bold tabular-nums',
                                        s.pending ? 'text-amber-700' : s.ok ? 'text-emerald-800' : 'text-rose-600',
                                      )}
                                    >
                                      {s.v}
                                    </span>
                                  </motion.button>
                                ))}
                              </div>

                              <div className="relative mt-2.5 overflow-hidden rounded-[20px] bg-[#0B231C] p-4 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
                                <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-emerald-400/15 blur-3xl" />
                                <div className="relative">
                                  <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">
                                      <ScrollText className="h-3 w-3" aria-hidden />
                                      Caregiver note
                                    </span>
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-100/30" aria-hidden />
                                  </div>
                                  <p className="mt-2.5 font-serif text-pretty text-[13px] font-medium leading-relaxed text-white/90">
                                    &ldquo;{g.note}&rdquo;
                                  </p>
                                  <div className="mt-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3">
                                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-extrabold text-emerald-200">
                                      M
                                    </span>
                                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/80">Meera R. · caregiver</span>
                                    <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                                      Verified
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Expand>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Consent lifecycle" trailing={<Chip intent="warning" dot>Day 78 of 90</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="warning">
                <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <Tile icon={CalendarClock} tone="warning" size="lg" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Consent renewal</span>
                        <Chip intent="warning" dot>Auto-renews 12 May</Chip>
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        Signed by you · renews automatically unless you review it first.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <Overline>90-day cycle</Overline>
                      <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-700">Day 78 of 90</span>
                    </div>
                    <Meter value={78 / 90} intent="warning" delay={0.2} className="mt-2" />

                    <div className="mt-4 flex items-start justify-between">
                      <CycleStep label="Signed" sub="12 Feb" done />
                      <CycleStep label="Reminded" sub="2x" done />
                      <CycleStep label="Renews" sub="12 May" done={false} />
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <TonButton icon={ShieldCheck} onClick={() => setSheet('consent')}>Review scope</TonButton>
                    <GradButton icon={ShieldCheck} onClick={() => navigate('/patient/p22')}>Manage consent</GradButton>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Health trends" trailing={<Chip intent="info">4 weeks</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="info">
                <div aria-hidden className="h-1 w-full bg-gradient-to-r from-sky-400 to-teal-400" />
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <Tile icon={Activity} tone="info" size="lg" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Recovery metrics</span>
                        <Chip intent="success">All trending well</Chip>
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        Recorded by the caregiver at each visit · tap a point for the latest.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-1 rounded-full bg-[#0B211B]/[0.05] p-1">
                    {metricOrder.map((id) => {
                      const active = metric === id
                      return (
                        <button key={id} type="button" onClick={() => setMetric(id)} className="relative flex-1 rounded-full px-2 py-2">
                          {active && (
                            <motion.span
                              layoutId="p13-metric-pill"
                              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                              className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(11,33,27,0.4)]"
                            />
                          )}
                          <span
                            className={cn(
                              'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors duration-200',
                              active ? 'text-sky-700' : 'text-[#0B211B]/40',
                            )}
                          >
                            {metrics[id].tab}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={metric}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="mt-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Overline>{m.targetLabel ? m.legendA : m.tab}</Overline>
                        <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-emerald-700">{m.delta}</span>
                      </div>

                      <svg viewBox="0 0 300 116" className="mt-2 h-[124px] w-full" aria-hidden>
                        {[30, 56, 82].map((y) => (
                          <line key={y} x1={14} x2={288} y1={y} y2={y} stroke="rgba(11,33,27,0.06)" strokeWidth="1" strokeDasharray="3 4" />
                        ))}

                        {m.target != null && (
                          <>
                            <motion.line
                              x1={14}
                              x2={288}
                              y1={scale(m.target)}
                              y2={scale(m.target)}
                              stroke="rgba(16,185,129,0.45)"
                              strokeWidth="1.5"
                              strokeDasharray="5 4"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                            />
                            <motion.text
                              x={16}
                              y={scale(m.target) - 5}
                              className="fill-emerald-600/70 text-[7.5px] font-extrabold uppercase"
                              letterSpacing="1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                            >
                              {m.targetLabel}
                            </motion.text>
                          </>
                        )}

                        {bPts && (
                          <motion.polyline
                            points={bPts}
                            fill="none"
                            stroke="#5eead4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.45 }}
                          />
                        )}

                        <motion.polyline
                          points={aPts}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                        />

                        {m.a.map((v, i) => (
                          <motion.circle
                            key={i}
                            cx={cx(i)}
                            cy={scale(v)}
                            r={i === m.a.length - 1 ? 5 : 3.5}
                            fill={i === m.a.length - 1 ? '#10b981' : '#0B231C'}
                            stroke="#fff"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.25 + i * 0.1, type: 'spring', stiffness: 320, damping: 17 }}
                          />
                        ))}

                        <motion.text
                          x={286}
                          y={scale(last) - 9}
                          textAnchor="end"
                          className="fill-emerald-700 text-[9px] font-extrabold tabular-nums"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.75 }}
                        >
                          {last}
                          {m.unit}
                          {m.b ? `/${m.b[m.b.length - 1]}` : ''}
                        </motion.text>
                      </svg>

                      <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/35">
                        <span>Wk 1</span>
                        <span>Wk 2</span>
                        <span>Wk 3</span>
                        <span>Wk 4 · now</span>
                      </div>

                      <div className="mt-3 flex items-center gap-3 border-t border-[#0B211B]/[0.05] pt-3">
                        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/45">
                          <span className="h-1.5 w-4 rounded-full bg-emerald-500" aria-hidden />
                          {m.legendA}
                        </span>
                        {m.legendB && (
                          <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/45">
                            <span className="h-1.5 w-4 rounded-full bg-teal-300" aria-hidden />
                            {m.legendB}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/45">
                          <span className="h-0 w-4 border-t-2 border-dashed border-emerald-500/50" aria-hidden />
                          {m.targetLabel}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Plan history" trailing={<Chip intent="info">Sealed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="info">
                <div aria-hidden className="h-1 w-full bg-gradient-to-r from-teal-400 to-sky-400" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate('/patient/p14')}
                  className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left"
                >
                  <Tile icon={CalendarCheck} tone="info" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">Weekly reports</span>
                    <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/50">One sealed report per completed month · 3 available</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                </motion.button>
                <div aria-hidden className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate('/patient/p15')}
                  className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left"
                >
                  <Tile icon={MapPin} tone="neutral" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">Visit timeline</span>
                    <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/50">Next · Monday 9:00 AM with Meera R.</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                </motion.button>
                <div aria-hidden className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate('/patient/p34')}
                  className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left"
                >
                  <Tile icon={SlidersHorizontal} tone="neutral" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">Manage plan</span>
                    <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/50">Change days, pause with auto-resume, end series</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Activity} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  This plan guides every visit. {firstName}'s caregiver sees these goals at each session and logs evidence against
                  them — the notes above are hers, verbatim and verified.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of care plan" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>

            {sheet === 'visit' ? (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                <SheetHead
                  icon={MapPin}
                  tone="success"
                  title={`${sel.full} · ${sel.time}`}
                  sub={`Meera R. · ${sel.mins} minutes · GPS-checked arrival`}
                  onClose={close}
                />

                <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
                  <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                  <div className="relative">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Vitals recorded</div>
                    <div className="mt-3 flex flex-col gap-2.5">
                      <DarkRow k="Blood pressure" v="126/78" />
                      <DarkRow k="Pulse" v="72 bpm" />
                      <DarkRow k="Walk" v="15 min unaided" />
                    </div>
                    <div aria-hidden className="my-3 h-px bg-white/[0.08]" />
                    <div className="flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">All goals logged</span>
                      <span className="font-mono text-[10px] font-bold text-emerald-200/70">3 of 3</span>
                    </div>
                  </div>
                </div>

                <Panel intent="neutral" className="p-4">
                  <div className="flex flex-col gap-2.5">
                    <LeaderRow k="Checked in" v="8:58 AM · 120 m radius" />
                    <LeaderRow k="Checked out" v="10:04 AM" />
                    <LeaderRow k="Diet logged" v="On plan" />
                    <LeaderRow k="Payment" v="₹1,240 · captured" />
                  </div>
                </Panel>

                <div className="flex gap-2.5">
                  <GradButton icon={ScrollText} onClick={() => navigate('/patient/p17')}>Visit summary</GradButton>
                  <TonButton icon={HeartPulse} onClick={() => setSheet('caregiver')}>Caregiver</TonButton>
                </div>
              </div>
            ) : sheet === 'consent' ? (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                <SheetHead
                  icon={ShieldCheck}
                  tone="success"
                  title="Consent · active"
                  sub="Signed by you · governs who sees this plan"
                  onClose={close}
                />

                <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
                  <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                  <div className="relative">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Consent scope</div>
                    <div className="mt-3 flex flex-col gap-2.5">
                      <DarkRow k="Signed" v="12 Feb 2026" />
                      <DarkRow k="Renews" v="12 May 2026" />
                      <DarkRow k="Caregiver" v="Meera R. · visits only" />
                      <DarkRow k="Partner" v="Sunrise Hospital" />
                    </div>
                  </div>
                </div>

                <Panel intent="info" className="flex items-start gap-2.5 p-3.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.4} aria-hidden />
                  <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-medium leading-relaxed text-[#0B211B]/65">
                    Withdrawing pauses care at the next visit boundary. Every access to these records is in your audit log.
                  </p>
                </Panel>

                <div className="flex gap-2.5">
                  <GradButton icon={ScrollText} onClick={() => navigate('/patient/p22')}>Consent records</GradButton>
                  <TonButton icon={ScrollText} onClick={() => navigate('/patient/p21')}>Audit log</TonButton>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    close()
                    navigate('/patient/p22')
                  }}
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.07] py-3.5 text-[13px] font-bold text-rose-600"
                >
                  <ShieldOff className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  Withdraw consent
                </motion.button>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                <SheetHead
                  icon={UserRoundCheck}
                  tone="info"
                  title="Meera R."
                  sub="Assigned caregiver · with this plan since week 1"
                  onClose={close}
                />

                <div className="flex items-center gap-3 rounded-3xl bg-[#0B231C] p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[15px] font-extrabold text-white">
                    M
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-extrabold tracking-tight text-white">Meera R.</div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">
                      Elderly care · licence verified
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/[0.1] px-2.5 py-1 text-[10px] font-extrabold text-emerald-100">4.9 ★</span>
                </div>

                <Panel intent="neutral" className="p-4">
                  <div className="flex flex-col gap-2.5">
                    <LeaderRow k="Visits with this plan" v="24" />
                    <LeaderRow k="Goals logged" v="72 of 72" />
                    <LeaderRow k="On-time arrivals" v="100%" />
                    <LeaderRow k="Next visit" v="Mon 9:00 AM" />
                  </div>
                </Panel>

                <div className="flex gap-2.5">
                  <GradButton icon={UserRoundCheck} onClick={() => navigate('/patient/p11')}>Full profile</GradButton>
                  <TonButton icon={ScrollText} onClick={() => navigate('/patient/p17')}>Last summary</TonButton>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
