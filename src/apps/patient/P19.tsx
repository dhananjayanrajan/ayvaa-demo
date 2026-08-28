import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  Clock,
  MoonStar,
  Pill,
  Plus,
  ScrollText,
  ShieldCheck,
  Sun,
  Sunrise,
  Syringe,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, rise, stagger } from '@/components/phone/kit'
import { lovedOnes, medications } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const dayParts: { id: string; label: string; icon: LucideIcon; window: string }[] = [
  { id: 'morning', label: 'Morning', icon: Sunrise, window: '8 AM' },
  { id: 'afternoon', label: 'Afternoon', icon: Sun, window: '2 PM' },
  { id: 'evening', label: 'Evening', icon: MoonStar, window: '8 PM' },
]

function MedRow({
  icon: Icon,
  name,
  dose,
  sub,
  time,
  state,
  onClick,
}: {
  icon: LucideIcon
  name: string
  dose: string
  sub: string
  time: string
  state: 'taken' | 'upcoming'
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
    >
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-2xl',
          state === 'taken'
            ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-[0_8px_18px_-8px_rgba(245,158,11,0.7)]'
            : 'bg-[#0B211B]/[0.05] text-[#0B211B]/50',
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
          {name} {dose}
        </span>
        <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">{sub}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1.5">
        <Chip intent={state === 'taken' ? 'warning' : 'neutral'}>{state === 'taken' ? 'Taken' : time}</Chip>
        {state === 'taken' && (
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-wide text-[#0B211B]/35">{time}</span>
        )}
      </span>
    </motion.button>
  )
}

export function P19() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [sheet, setSheet] = useState(false)

  const taken = medications.filter((m) => m.takenToday)
  const due = medications.find((m) => !m.takenToday && !m.low)
  const evening = medications.filter((m) => !m.takenToday && m.low)
  const total = medications.length
  const remaining = total - taken.length
  const pct = taken.length / total
  const complete = remaining === 0

  return (
    <Screen>
      <AppBar
        title="Medicine schedule"
        subtitle={`${father.name} · Wednesday, March 13`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/patient/p20')}
            aria-label="Prescriptions"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Plus className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-amber-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] p-5 text-white shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                <div className="relative">
                  <Kicker>
                    <Pill className="h-3 w-3 text-amber-300/80" aria-hidden />
                    Daily doses · round by round
                  </Kicker>
                  <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    {taken.length} of {total} taken,{' '}
                    <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
                      {complete ? 'all done' : `${remaining} to go`}
                    </span>
                  </h2>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {dayParts.map((p) => {
                      const isDue = p.id === 'afternoon' && !!due
                      const done = p.id === 'morning'
                      return (
                        <motion.button
                          key={p.id}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            notify({
                              title: p.label,
                              body: done
                                ? 'Both doses given and sealed'
                                : isDue
                                  ? `${due?.name} due ${p.window} · window open`
                                  : 'Nurse-administered round · scheduled',
                              kind: done ? 'ok' : isDue ? 'info' : 'info',
                            })
                          }
                          className={cn(
                            'flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3',
                            isDue ? 'bg-amber-400/[0.25]' : done ? 'bg-amber-400/[0.12]' : 'bg-white/[0.05]',
                          )}
                        >
                          <span
                            className={cn(
                              'grid h-8 w-8 place-items-center rounded-xl',
                              isDue ? 'bg-amber-400 text-[#241A0B]' : done ? 'bg-amber-400/20 text-amber-200' : 'bg-white/[0.08] text-amber-100/40',
                            )}
                          >
                            <p.icon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                          </span>
                          <span className="max-w-full truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-white">
                            {p.label}
                          </span>
                          <span
                            className={cn(
                              'max-w-full truncate font-mono text-[9px] font-bold uppercase tracking-[0.1em]',
                              isDue ? 'text-amber-200' : 'text-amber-100/45',
                            )}
                          >
                            {isDue ? 'due now' : done ? `${taken.length} given` : p.window}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="mt-4 rounded-2xl bg-amber-400/[0.12] p-3.5">
                    <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                      <span className="text-amber-100/50">
                        {complete ? 'Day complete' : 'Next dose · 2:15 PM'}
                      </span>
                      <span className="tabular-nums text-amber-200">
                        {Math.round(pct * 100)}%
                      </span>
                    </div>
                    <Meter value={pct} intent="warning" delay={0.2} className="mt-2" />
                    <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-200/70">
                      <ShieldCheck className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                      {complete ? 'Every dose verified and sealed' : 'Nurse verifies before each dose is logged'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Morning · given by nurse" trailing={<Chip intent="warning">Sealed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {taken.map((m, i) => (
                  <div key={m.id}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <MedRow
                      icon={Check}
                      name={m.name}
                      dose={m.dose}
                      sub={`${m.purpose} · given by Lakshmi · Rx-verified`}
                      time="8:05 AM"
                      state="taken"
                      onClick={() => notify({ title: `${m.name} ${m.dose}`, body: `${m.purpose} · given 8:05 AM · sealed in the visit log`, kind: 'ok' })}
                    />
                  </div>
                ))}
              </Card>
            </motion.div>

            {due && (
              <motion.div variants={rise}>
                <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]">
                  <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                  <div className="relative p-5">
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
                      <Clock className="h-3 w-3" aria-hidden />
                      Afternoon · due now
                    </div>
                    <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      {due.name} {due.dose},{' '}
                      <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">with lunch</span>
                    </h3>
                    <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/60">
                      {due.purpose} · nurse administers and verifies during the live visit
                    </p>

                    <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.12] px-3.5 py-3">
                      <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
                      </span>
                      <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-100">
                        Dose window 2 – 3 PM
                      </span>
                      <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-200/70">~20 min</span>
                    </div>

                    <div className="mt-4 flex gap-2.5">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSheet(true)}
                        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
                      >
                        <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                        <span className="truncate">Detail</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          notify({ title: 'Nurse notified', body: `${due.name} added to this visit's medication round`, kind: 'ok' })
                        }
                        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]"
                      >
                        <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                        <span className="truncate">Notify</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Section label="Evening · 8:00 PM" trailing={<Chip intent="neutral">Scheduled</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {evening.map((m, i) => (
                  <div key={m.id}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <MedRow
                      icon={Syringe}
                      name={m.name}
                      dose={m.dose}
                      sub={`${m.purpose} · nurse administered · ${m.low ? 'refill prescribed' : 'stock ok'}`}
                      time="8:30 PM"
                      state="upcoming"
                      onClick={() => navigate('/patient/p20')}
                    />
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="warning" className="flex items-start gap-3 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-700">
                  <ShieldCheck className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
                <p className="min-w-0 flex-1 pt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Every nurse-given dose is checked against the prescription and logged permanently. Missed or refused doses
                  become incidents automatically.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of medicine schedule" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheet && due && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && due && (
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
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-400/15 text-amber-600">
                  <Pill className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                    {due.name} {due.dose}
                  </div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Due 2:15 PM · with lunch</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSheet(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[#241A0B] p-4">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-200/50">Dose record</div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {[
                      ['Prescribed by', due.prescriber],
                      ['Schedule', due.schedule],
                      ['Administered by', 'Nurse · Rx-verified'],
                      ['Logged', 'Automatically'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-3">
                        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-amber-100/45">{k}</span>
                        <span className="truncate font-mono text-[12px] font-bold text-amber-50/90">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSheet(false)
                    notify({ title: 'Nurse notified', body: `${due.name} added to this visit's medication round`, kind: 'ok' })
                  }}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Notify</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/patient/p20')}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                >
                  <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Rx record</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
