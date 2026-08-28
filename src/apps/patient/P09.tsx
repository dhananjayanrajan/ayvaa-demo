import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Accessibility,
  ArrowRight,
  Baby,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Footprints,
  HeartHandshake,
  HeartPulse,
  MoonStar,
  ShieldCheck,
  Sun,
  Sunrise,
  UserRoundCheck,
  Users,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Panel, Section, rise, stagger } from '@/components/phone/kit'
import { lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const categories: { label: string; icon: LucideIcon; hint: string }[] = [
  { label: 'Elderly care', icon: Users, hint: 'Daily living · mobility · company' },
  { label: 'Post-operative', icon: HeartPulse, hint: 'Recovery support after surgery' },
  { label: 'Pediatric', icon: Baby, hint: 'Child care trained' },
  { label: 'Chronic care', icon: Clock, hint: 'Diabetes · BP · long-term' },
  { label: 'Palliative', icon: HeartHandshake, hint: 'Comfort-focused care' },
  { label: 'Disability', icon: Accessibility, hint: 'Mobility · independence' },
]

const scheduleTypes: { id: string; label: string; sub: string }[] = [
  { id: 'one', label: 'One time', sub: 'Single visit · no series' },
  { id: 'recurring', label: 'Recurring', sub: 'Weekly series · auto-scheduled' },
  { id: 'ongoing', label: 'Ongoing', sub: 'Open-ended · billed monthly' },
]

const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const timeWindows: { id: string; label: string; time: string; icon: LucideIcon }[] = [
  { id: 'morning', label: 'Morning', time: '8 AM – 11 AM', icon: Sunrise },
  { id: 'afternoon', label: 'Afternoon', time: '2 PM – 5 PM', icon: Sun },
  { id: 'evening', label: 'Evening', time: '5 PM – 8 PM', icon: MoonStar },
]

const durations: { id: string; label: string; price: number }[] = [
  { id: '60', label: '1 hour', price: 700 },
  { id: '120', label: '2 hours', price: 1240 },
  { id: '180', label: '3 hours', price: 1740 },
]

const wizardSteps = ['Details', 'Matching', 'Confirm']

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

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

function SheetHead({
  icon: Icon,
  title,
  sub,
  onClose,
}: {
  icon: LucideIcon
  title: string
  sub: string
  onClose: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
        <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
      </span>
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

function ReceiptRow({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0 text-[11.5px] font-semibold text-emerald-100/55">{k}</span>
      <span aria-hidden className="min-w-0 flex-1 -translate-y-1 border-b border-dotted border-white/15" />
      <span
        className={cn(
          'shrink-0 font-mono text-[12.5px] font-bold tabular-nums',
          highlight ? 'text-emerald-300' : 'text-emerald-50/90',
        )}
      >
        {v}
      </span>
    </div>
  )
}

function Radio({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        'grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full',
        active ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.12]',
      )}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
    </span>
  )
}

export function P09() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  const [who, setWho] = useState(0)
  const [category, setCategory] = useState('Elderly care')
  const [schedule, setSchedule] = useState('recurring')
  const [days, setDays] = useState<string[]>(['Mon', 'Wed', 'Fri'])
  const [winId, setWinId] = useState('afternoon')
  const [duration, setDuration] = useState('120')
  const [sheet, setSheet] = useState<'none' | 'who' | 'time'>('none')
  const close = () => setSheet('none')

  const person = lovedOnes[who]
  const cat = categories.find((c) => c.label === category)!
  const dur = durations.find((d) => d.id === duration)!
  const win = timeWindows.find((w) => w.id === winId)!

  const visitCount = schedule === 'one' ? 1 : Math.max(days.length, 1)
  const weekly = dur.price * visitCount
  const hours = visitCount * (Number(duration) / 60)
  const blocked = schedule !== 'one' && days.length === 0
  const daysLabel = days.length > 0 ? days.map((d) => d[0]).join('·') : '—'

  const pickDay = (d: string) => {
    if (schedule === 'one') {
      setDays([d])
      return
    }
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]))
  }

  return (
    <Screen>
      <AppBar title="Book care" subtitle="Step 1 of 3 · care details" onBack={() => navigate('/patient/p06')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <CalendarDays className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  New request · live estimate
                </Kicker>

                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[18px] font-extrabold text-emerald-200/80">₹</span>
                  <motion.span
                    key={weekly}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="text-[36px] font-extrabold leading-none tracking-tight text-white"
                  >
                    {weekly.toLocaleString('en-IN')}
                  </motion.span>
                  <span className="text-[12px] font-bold text-emerald-100/50">/ {schedule === 'one' ? 'visit' : 'week'}</span>
                </div>

                <p className="mt-1.5 text-[11.5px] font-semibold leading-snug text-emerald-100/55">
                  {person.name.split(' ')[0]} · {category} · {visitCount} {visitCount === 1 ? 'visit' : 'visits'} · {dur.label} each
                </p>

                <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSheet('who')}
                    className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 transition-colors hover:bg-white/[0.12]"
                  >
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[8px] font-extrabold text-white">
                      {person.name.charAt(0)}
                    </span>
                    <span className="whitespace-nowrap text-[10px] font-bold text-emerald-50/85">{person.name.split(' ')[0]}</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => notify({ title: category, body: `${cat.hint} · matching will key off this`, kind: 'info' })}
                    className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 transition-colors hover:bg-white/[0.12]"
                  >
                    <cat.icon className="h-3 w-3 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="whitespace-nowrap text-[10px] font-bold text-emerald-50/85">{category}</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() =>
                      notify({
                        title: days.length > 0 ? `${days.length} day${days.length > 1 ? 's' : ''} selected` : 'No days yet',
                        body: days.length > 0 ? `${days.join(', ')} · ${schedule === 'one' ? 'single visit' : 'weekly series'}` : 'Pick at least one day below to continue',
                        kind: days.length > 0 ? 'ok' : 'info',
                      })
                    }
                    className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 transition-colors hover:bg-white/[0.12]"
                  >
                    <CalendarDays className="h-3 w-3 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="whitespace-nowrap text-[10px] font-bold tracking-wide text-emerald-50/85">{daysLabel}</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSheet('time')}
                    className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 transition-colors hover:bg-white/[0.12]"
                  >
                    <Clock className="h-3 w-3 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="whitespace-nowrap text-[10px] font-bold text-emerald-50/85">{win.label}</span>
                  </motion.button>
                </div>

                <div className="mt-5 flex items-start">
                  {wizardSteps.map((s, i) => {
                    const current = i === 0
                    return (
                      <span key={s} className="flex min-w-0 flex-1 items-start">
                        <span className="flex min-w-0 flex-col items-center gap-1.5">
                          {current ? (
                            <span className="relative grid h-4 w-4 shrink-0 place-items-center">
                              <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-300/50" />
                              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300 ring-4 ring-emerald-300/20" />
                            </span>
                          ) : (
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
                          )}
                          <span
                            className={cn(
                              'max-w-full truncate text-[8px] font-extrabold uppercase tracking-[0.12em]',
                              current ? 'text-emerald-100/80' : 'text-emerald-100/30',
                            )}
                          >
                            {s}
                          </span>
                        </span>
                        {i < wizardSteps.length - 1 && (
                          <span aria-hidden className={cn('mt-[7px] h-px flex-1', current ? 'bg-emerald-300/50' : 'bg-white/15')} />
                        )}
                      </span>
                    )
                  })}
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Who receives the care" trailing={<Chip intent="neutral">{lovedOnes.length} on plan</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                <div className="p-5">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSheet('who')}
                    className="flex w-full items-center gap-3.5 text-left"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[16px] font-extrabold text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.7)]">
                      {person.name.charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{person.name}</span>
                        <Chip intent="success">Selected</Chip>
                      </span>
                      <span className="mt-0.5 block truncate text-xs font-semibold text-[#0B211B]/50">
                        Age {person.age} · {person.category} · consent on file
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                  </motion.button>

                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.06] px-4 py-3.5">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
                    <span className="min-w-0 flex-1 text-[12px] font-semibold leading-snug text-[#0B211B]/70">
                      Your confirmation becomes a signed consent record before any caregiver is dispatched.
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Type of support needed" />
            </motion.div>

            <motion.div variants={rise}>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((c) => {
                  const active = category === c.label
                  return (
                    <motion.button
                      key={c.label}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setCategory(c.label)
                        notify({ title: c.label, body: `${c.hint} · matching will key off this`, kind: 'info' })
                      }}
                      className={cn(
                        'relative flex h-[72px] items-center gap-2.5 rounded-2xl p-3.5 text-left transition-colors',
                        active
                          ? 'bg-emerald-500/[0.1] shadow-[0_10px_24px_-14px_rgba(16,185,129,0.8)]'
                          : 'bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.25)] hover:bg-emerald-500/[0.04]',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                          active ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
                        )}
                      >
                        <c.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block truncate text-[12px] font-bold leading-tight tracking-tight',
                            active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                          )}
                        >
                          {c.label}
                        </span>
                        <span className="mt-1 block truncate text-[9.5px] font-semibold leading-snug text-[#0B211B]/40">{c.hint}</span>
                      </span>
                      {active && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_4px_10px_-4px_rgba(16,185,129,0.8)]"
                        >
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Schedule" trailing={<Chip intent="info">{visitCount} × {dur.label}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="info">
                <div className="p-5">
                  <div className="flex flex-col gap-2">
                    {scheduleTypes.map((t) => {
                      const active = schedule === t.id
                      return (
                        <motion.button
                          key={t.id}
                          type="button"
                          whileTap={{ scale: 0.985 }}
                          onClick={() => {
                            setSchedule(t.id)
                            if (t.id === 'one' && days.length > 1) setDays([days[0]])
                          }}
                          className={cn(
                            'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                            active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
                          )}
                        >
                          <Radio active={active} />
                          <span className="min-w-0 flex-1">
                            <span
                              className={cn(
                                'block text-[13px] font-bold leading-snug tracking-tight',
                                active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                              )}
                            >
                              {t.label}
                            </span>
                            <span className="block truncate text-[11px] font-semibold text-[#0B211B]/45">{t.sub}</span>
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
                        {schedule === 'one' ? 'Day of visit' : 'Days each week'}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] font-extrabold tabular-nums',
                          days.length > 0 ? 'text-emerald-700' : 'text-amber-700',
                        )}
                      >
                        {schedule === 'one' ? (days[0] ?? 'none') : `${days.length} selected`}
                      </span>
                    </div>
                    <div className="mt-2.5 grid grid-cols-7 gap-1.5">
                      {dayOptions.map((d) => {
                        const on = days.includes(d)
                        return (
                          <motion.button
                            key={d}
                            type="button"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => pickDay(d)}
                            aria-label={`${d} ${on ? 'selected' : 'not selected'}`}
                            className={cn(
                              'grid h-9 place-items-center rounded-xl text-[10px] font-extrabold uppercase tracking-wide transition-colors',
                              on
                                ? 'bg-gradient-to-br from-emerald-400 to-teal-400 text-[#0B231C] shadow-[0_6px_14px_-8px_rgba(16,185,129,0.9)]'
                                : 'bg-[#0B211B]/[0.04] text-[#0B211B]/40 hover:bg-[#0B211B]/[0.07]',
                            )}
                          >
                            {d}
                          </motion.button>
                        )
                      })}
                    </div>
                    {schedule !== 'one' && days.length === 0 && (
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700/70">
                        Pick at least one day to continue
                      </p>
                    )}
                  </div>

                  <div aria-hidden className="my-4 h-px bg-[#0B211B]/[0.05]" />

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSheet('time')}
                    className="flex w-full items-center gap-3.5 text-left"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                      <win.icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">
                        {win.label} · {win.time}
                      </span>
                      <span className="block truncate text-[11px] font-semibold text-[#0B211B]/50">
                        {dur.label} per visit · {fmt(dur.price)}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                  </motion.button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="How this adds up" trailing={<Chip intent="success">Live</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
                    {[
                      { v: String(visitCount), k: 'Visits / week' },
                      { v: String(hours), k: 'Care hours' },
                      { v: fmt(dur.price), k: 'Per visit' },
                    ].map((f) => (
                      <div key={f.k} className="flex min-w-0 flex-col items-center gap-1.5 py-1">
                        <span className="max-w-full truncate text-[15px] font-extrabold tabular-nums leading-none text-white">{f.v}</span>
                        <span className="max-w-full truncate text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-100/45">{f.k}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl bg-white/[0.04] p-3.5">
                    <div className="flex flex-col gap-2.5">
                      <ReceiptRow k={`${visitCount} × ${dur.label}`} v={fmt(dur.price * visitCount)} />
                      <ReceiptRow k="Caregiver matching" v="Included" />
                      <ReceiptRow k="Platform fee" v="₹0" highlight />
                      <ReceiptRow k="Cancellation" v="Free till 24 h" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3.5 py-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">
                      Total / {schedule === 'one' ? 'visit' : 'week'}
                    </span>
                    <motion.span
                      key={weekly}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="font-mono text-[15px] font-black tabular-nums tracking-tight text-white"
                    >
                      {fmt(weekly)}
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-700">
                  <Footprints className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
                <p className="min-w-0 flex-1 pt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Matching starts the moment you continue — nearby, licence-verified caregivers get the offer with these exact
                  details, and you watch every response live.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of care details" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={blocked ? undefined : { scale: 0.97 }}
            disabled={blocked}
            onClick={() => {
              notify({
                title: 'Care details saved',
                body: `${category} · ${visitCount} visit${visitCount > 1 ? 's' : ''} · ${win.label.toLowerCase()} · matching nearby caregivers`,
                kind: 'ok',
              })
              navigate('/patient/p10')
            }}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all duration-300',
              blocked
                ? 'bg-[#0B211B]/[0.06] text-[#0B211B]/30'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            )}
          >
            Continue to matching
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          </motion.button>
          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
            <ShieldCheck className="h-3 w-3" aria-hidden />
            Nothing is charged until you confirm a matched caregiver
          </div>
        </div>
      </FootBar>

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

            {sheet === 'who' ? (
              <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-5 pb-7 pt-3">
                <SheetHead
                  icon={UserRoundCheck}
                  title="Who is this booking for"
                  sub="Anyone on your family plan · consent applies per person"
                  onClose={close}
                />
                {lovedOnes.map((p, i) => {
                  const active = who === i
                  return (
                    <motion.button
                      key={p.name}
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        setWho(i)
                        notify({ title: p.name, body: `Age ${p.age} · ${p.category} · booking moved to this profile`, kind: 'info' })
                        close()
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors',
                        active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
                      )}
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[14px] font-extrabold text-white">
                        {p.name.charAt(0)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{p.name}</span>
                        <span className="block truncate text-[11px] font-medium text-[#0B211B]/50">
                          Age {p.age} · {p.category}
                        </span>
                      </span>
                      {active && (
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                        </span>
                      )}
                    </motion.button>
                  )
                })}
                <div className="mt-1.5 flex gap-2.5">
                  <TonButton
                    icon={UserRoundCheck}
                    onClick={() => notify({ title: 'Add loved one', body: 'Invite a family member from profile · loved ones management', kind: 'info' })}
                  >
                    Add someone new
                  </TonButton>
                </div>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                <SheetHead
                  icon={Clock}
                  title="Visit window & duration"
                  sub={`${visitCount} visit${visitCount > 1 ? 's' : ''} · caregivers matched to this exact window`}
                  onClose={close}
                />

                <div className="flex flex-col gap-2">
                  {timeWindows.map((w) => {
                    const active = winId === w.id
                    return (
                      <motion.button
                        key={w.id}
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => setWinId(w.id)}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                          active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
                        )}
                      >
                        <span
                          className={cn(
                            'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                            active ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
                          )}
                        >
                          <w.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              'block text-[13px] font-bold leading-snug tracking-tight',
                              active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                            )}
                          >
                            {w.label}
                          </span>
                          <span className="block font-mono text-[11px] font-bold tabular-nums leading-snug text-[#0B211B]/45">{w.time}</span>
                        </span>
                        <Radio active={active} />
                      </motion.button>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Duration per visit</span>
                  <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">{fmt(dur.price)} now</span>
                </div>
                <div className="flex flex-col gap-2">
                  {durations.map((d) => {
                    const active = duration === d.id
                    return (
                      <motion.button
                        key={d.id}
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => setDuration(d.id)}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                          active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              'block text-[13px] font-bold leading-snug tracking-tight',
                              active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                            )}
                          >
                            {d.label}
                          </span>
                          <span className="block truncate text-[10.5px] font-semibold leading-snug text-[#0B211B]/40">
                            {schedule === 'one' ? fmt(d.price) : `${fmt(d.price * visitCount)} / week`}
                          </span>
                        </span>
                        <Radio active={active} />
                      </motion.button>
                    )
                  })}
                </div>

                <div className="flex gap-2.5">
                  <GradButton icon={Check} onClick={close}>
                    Set {win.label.toLowerCase()} · {dur.label}
                  </GradButton>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
