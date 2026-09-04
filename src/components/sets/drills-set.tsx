import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Activity, Check, ChevronDown, Clock3, FlaskConical, Loader2, Moon, Play, RotateCcw, Route, ScrollText, Settings2, Siren, Smartphone, Stethoscope, TimerReset, TrendingUp, TriangleAlert } from 'lucide-react'
import { Card, Chip, Hero, Meter, Panel, Ring, Tile, TimeChip, rise } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Row } from '@/components/base/phone/row'
import { OUTCOME_THEMES } from '@/data/drillOutcomeTheme'
import type { DrillRun, TransactionPhase } from '@/data/system/transactions'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'
import { BottomSheet } from '@/components/base/phone/sheet-shell'

const rules = [
  { icon: TimerReset, label: 'Reminder cadence', value: '30 min before each visit' },
  { icon: Moon, label: 'Quiet hours', value: '10:00 PM – 6:00 AM · urgent only' },
  { icon: Clock3, label: 'Retry policy', value: '3 attempts · 2 min apart · then pager' },
]

const destinations = 5

function PanelStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[18px] font-extrabold tabular-nums leading-none text-white">
          {value}
        </span>
        {sub ? (
          <span className="text-[10px] font-bold tabular-nums text-emerald-300/60">{sub}</span>
        ) : null}
      </div>
    </div>
  )
}

interface DeliveryHealthCardProps {
  pushes: number
  latency: string
  live: boolean
}

export function DeliveryHealthCard({ pushes, latency, live }: DeliveryHealthCardProps) {
  return (
    <motion.div variants={rise}>
      <Card intent="success">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={Activity} tone="success" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-sm font-extrabold leading-tight tracking-tight text-[#0B211B]">
                Delivery health
              </div>
              <div className="mt-1 truncate text-[11px] font-medium text-[#0B211B]/50">
                Last 24 hours · Hyderabad region
              </div>
            </div>
            {live ? (
              <Chip intent="warning" dot className="mt-0.5 border-transparent">Fanning out</Chip>
            ) : (
              <Chip intent="success" dot className="mt-0.5 border-transparent">Healthy</Chip>
            )}
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl bg-[#0B231C]">
            <div className="flex items-center gap-5 p-4">
              <Ring value={0.992} size={84} stroke={7} id="delivery-ring">
                <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">
                  99.2<span className="text-[10px]">%</span>
                </span>
                <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.18em] text-emerald-100/50">
                  delivered
                </span>
              </Ring>
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <PanelStat label="Avg latency" value={latency} sub="p95 · 1.1s" />
                <PanelStat label="Pushes / day" value={pushes.toLocaleString('en-IN')} sub="+8%" />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white/[0.04] px-4 py-2.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">
                Destinations
              </span>
              <span className="flex items-center gap-1.5">
                {Array.from({ length: destinations }).map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                ))}
                <span className="ml-1.5 text-[11px] font-extrabold tabular-nums text-white">
                  {destinations}/{destinations}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/45">
                Delivery success
              </span>
              <span className="text-[11px] font-extrabold tabular-nums text-emerald-700">99.2%</span>
            </div>
            <Meter value={0.992} intent="success" className="mt-2" />
            <div className="mt-2 text-[10px] font-semibold text-[#0B211B]/40">
              Target ≥ 99.0% · 14 dips recovered by retry
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {rules.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0B211B]/[0.05]">
                  <r.icon className="h-3.5 w-3.5 text-[#0B211B]/55" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
                    {r.label}
                  </div>
                  <div className="mt-0.5 text-[12px] font-bold leading-snug text-[#0B211B]/80">
                    {r.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const destinationsEvent: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Smartphone, label: "Family's phone", sub: 'Instant push' },
  { icon: Stethoscope, label: "Caregiver's app", sub: 'Live shift' },
  { icon: TrendingUp, label: "Partner's metrics", sub: 'Realtime' },
  { icon: ScrollText, label: 'Audit log', sub: 'Immutable record' },
  { icon: Siren, label: 'Escalation pager', sub: 'Supervisors, in seconds' },
]

export function EventFanOutCard() {
  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-center gap-3">
          <Tile icon={Route} tone="white" />
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight text-white">Single source of truth</div>
            <div className="mt-0.5 text-[11px] font-medium text-emerald-100/55">One event fans out · zero drift</div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <Chip intent="live" light dot>1 event emitted</Chip>
          <span aria-hidden className="my-1 h-4 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />
          <div className="grid w-full grid-cols-2 gap-2">
            {destinationsEvent.map((d, i) => (
              <motion.div
                key={d.label}
                className={cn(
                  'rounded-2xl bg-white/[0.06] p-3',
                  i === destinationsEvent.length - 1 && 'col-span-2',
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                    <d.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[11px] font-bold text-white">{d.label}</div>
                    <div className="truncate text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{d.sub}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Hero>
    </motion.div>
  )
}

const failsafeSteps: { time: string; dot: string; text: string }[] = [
  { time: '9:45', dot: 'bg-amber-500', text: 'Care team paged personally' },
  { time: '9:46', dot: 'bg-sky-500', text: 'Wider radius re-broadcast' },
  { time: '9:47', dot: 'bg-emerald-500', text: 'Family sees steps live' },
]

export function FailsafeCard() {
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={rise}>
      <Card intent="warning">
        <Row
          icon={Siren}
          tone="warning"
          padding="p-4"
          title="The 9:45 failsafe"
          titleClassName="text-sm"
          subtitle="No acceptance by 9:45 · the team gets paged personally"
          subtitleClassName="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55"
          expandable
          open={open}
          onToggle={() => setOpen((v) => !v)}
          chevronVisible={false}
          expansionPadded={false}
          hoverClassName=""
          whileTapDisabled
          trailing={
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
              <ChevronDown className="h-4 w-4 text-amber-600/70" aria-hidden />
            </motion.span>
          }
          expansion={
            <div className="px-4 pb-4">
              <Panel intent="warning" className="p-3.5">
                <div className="flex flex-col gap-2.5">
                  {failsafeSteps.map((s) => (
                    <div key={s.time} className="flex items-center gap-2.5">
                      <TimeChip>{s.time}</TimeChip>
                      <span aria-hidden className={cn('h-1.5 w-1.5 shrink-0 rounded-full', s.dot)} />
                      <span className="min-w-0 flex-1 truncate text-xs font-semibold text-[#0B211B]/80">{s.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
                  The family watches each step unfold on their re-dispatch screen.
                </p>
              </Panel>
            </div>
          }
        />
      </Card>
    </motion.div>
  )
}

const TARGETS: Record<number, string> = {
  0: 'Clean run · every write lands',
  1: 'Fails at step 1 · Booking record',
  2: 'Fails at step 2 · Recurring series',
  3: 'Fails at step 3 · Session stubs',
  4: 'Fails at step 4 · Audit event',
  5: 'Fails after commit · Dispatch',
}

interface FailureDrillCardProps {
  selected: number
  phase: TransactionPhase
  lastRun: DrillRun | null
  onOpen: () => void
}

export function FailureDrillCard({ selected, phase, lastRun, onOpen }: FailureDrillCardProps) {
  const destructive = selected > 0
  const busy =
    phase === 'running' || phase === 'failing' || phase === 'rolling-back'
  const outcome = lastRun ? OUTCOME_THEMES[lastRun.outcome] : null
  const intent = outcome ? outcome.intent : destructive ? 'danger' : 'info'
  const tileTone = outcome ? outcome.tile : destructive ? 'danger' : 'info'

  return (
    <Card intent={intent}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Tile icon={FlaskConical} tone={tileTone} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">Failure drill</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={outcome ? outcome.chipLabel : destructive ? 'armed' : 'idle'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  {outcome ? (
                    <Chip intent={outcome.intent} dot={lastRun?.outcome !== 'committed'} className="border-transparent">
                      {outcome.chipLabel}
                    </Chip>
                  ) : destructive ? (
                    <Chip intent="danger" dot className="border-transparent">
                      Step {selected} armed
                    </Chip>
                  ) : (
                    <Chip intent="info" className="border-transparent">
                      No failure armed
                    </Chip>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={outcome ? `run-${lastRun?.outcome}` : `armed-${selected}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55"
              >
                {outcome
                  ? outcome.body
                  : TARGETS[selected]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {outcome && (
          <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.035] px-3.5 py-3">
            <p className="text-[11.5px] font-medium leading-relaxed text-[#0B211B]/70">
              {outcome.detail}
            </p>
          </div>
        )}

        <motion.button
          type="button"
          whileTap={busy ? undefined : { scale: 0.985 }}
          onClick={onOpen}
          disabled={busy}
          className={cn(
            'mt-3.5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[13px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
            busy
              ? 'cursor-wait bg-[#0B211B]/[0.06] text-[#0B211B]/40'
              : 'bg-[#0B211B]/[0.06] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.1]',
          )}
        >
          <Settings2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          {outcome ? 'Drill again' : 'Choose where it fails'}
        </motion.button>
      </div>
    </Card>
  )
}

const OPTIONS = [
  { value: 0, label: 'No failure' },
  { value: 1, label: 'Step 1 · Booking' },
  { value: 2, label: 'Step 2 · Series' },
  { value: 3, label: 'Step 3 · Sessions' },
  { value: 4, label: 'Step 4 · Audit' },
  { value: 5, label: 'After commit · Dispatch' },
]

function copyFor(selected: number) {
  if (selected === 0)
    return 'Clean run. Every write lands, the record seals, and dispatch offers go out.'
  if (selected < 5)
    return `Step ${selected} fails mid-transaction. Later writes never happen and completed writes unwind in reverse order.`
  return 'Dispatch fails after the commit. The booking stays sealed — only delivery retries.'
}

interface FailureDrillSheetProps {
  open: boolean
  onClose: () => void
  selected: number
  onSelect: (value: number) => void
  phase: TransactionPhase
  lastRun: DrillRun | null
  onRun: () => void
}

export function FailureDrillSheet({
  open,
  onClose,
  selected,
  onSelect,
  phase,
  lastRun,
  onRun,
}: FailureDrillSheetProps) {
  const busy =
    phase === 'running' || phase === 'failing' || phase === 'rolling-back'
  const destructive = selected > 0
  const outcome = lastRun ? OUTCOME_THEMES[lastRun.outcome] : null
  const idleIcon = lastRun ? RotateCcw : destructive ? TriangleAlert : Play
  const idleLabel = lastRun ? 'Run again' : destructive ? 'Run until it fails' : 'Run the transaction'

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      icon={FlaskConical}
      title="Failure drill"
      subtitle={lastRun ? 'Last run complete · arm the next one' : 'Arm a failure, then run the transaction'}
    >
      <AnimatePresence initial={false}>
        {outcome && lastRun && (
          <motion.div
            key={`result-${lastRun.outcome}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Panel intent={outcome.intent} className="p-4">
              <div className="flex items-start gap-3">
                <Tile icon={FlaskConical} tone={outcome.tile} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                      {outcome.title}
                    </span>
                    <Chip
                      intent={outcome.intent}
                      dot={lastRun.outcome !== 'committed'}
                      className="border-transparent"
                    >
                      {outcome.chipLabel}
                    </Chip>
                  </div>
                  <p className="mt-0.5 text-[11.5px] font-medium leading-relaxed text-[#0B211B]/60">
                    {lastRun.failureAt === 0
                      ? 'Drill ran clean · no failure armed'
                      : `Drill armed · ${OPTIONS[lastRun.failureAt]?.label}`}
                  </p>
                  <p className="mt-2 text-[11.5px] font-medium leading-relaxed text-[#0B211B]/70">
                    {outcome.detail}
                  </p>
                </div>
              </div>
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn('flex flex-wrap gap-1.5', outcome && 'mt-4')}>
        {OPTIONS.map((o) => {
          const isActive = o.value === selected
          return (
            <button
              key={o.value}
              type="button"
              disabled={busy}
              onClick={() => onSelect(o.value)}
              className={cn(
                'relative rounded-full px-3.5 py-1.5 text-[12px] font-bold outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-emerald-500/50',
                isActive ? 'text-white' : 'text-[#0B211B]/55 hover:text-[#0B211B]/80',
                busy && !isActive && 'opacity-50',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="failure-option"
                  transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  className={cn(
                    'absolute inset-0 rounded-full',
                    o.value === 0
                      ? 'bg-[#0B211B]'
                      : o.value === 5
                        ? 'bg-amber-500 shadow-[0_8px_16px_-8px_rgba(245,158,11,0.7)]'
                        : 'bg-rose-600 shadow-[0_8px_16px_-8px_rgba(225,29,72,0.7)]',
                  )}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.035] px-3.5 py-3">
        <p className="text-[11.5px] font-medium leading-relaxed text-[#0B211B]/70">
          {copyFor(selected)}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {destructive ? (
          <Chip intent="danger" dot className="border-transparent">
            Fails at {OPTIONS.find((o) => o.value === selected)?.label}
          </Chip>
        ) : (
          <Chip intent="info" className="border-transparent">
            Clean transaction ahead
          </Chip>
        )}
        <Chip intent="success" className="border-transparent">
          Family never sees a broken state
        </Chip>
      </div>

      <LifecycleButton
        phase={busy ? 'working' : 'idle'}
        tone={destructive ? 'danger' : 'success'}
        className="mt-4"
        idleIcon={idleIcon}
        idleLabel={idleLabel}
        workingLabel="Transaction in motion"
        doneLabel="Run complete"
        onPress={onRun}
      />
    </BottomSheet>
  )
}

type DestState = 'idle' | 'delivering' | 'done'

const destinationsLive: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Smartphone, label: "Family's phone", sub: 'Instant push' },
  { icon: Stethoscope, label: "Caregiver's app", sub: 'Live shift' },
  { icon: TrendingUp, label: "Partner's metrics", sub: 'Realtime' },
  { icon: ScrollText, label: 'Audit log', sub: 'Immutable record' },
  { icon: Siren, label: 'Escalation pager', sub: 'Supervisors, in seconds' },
]

const STEP_MS = 420

interface LiveFanOutCardProps {
  run: number
}

export function LiveFanOutCard({ run }: LiveFanOutCardProps) {
  const [states, setStates] = useState<DestState[]>(() => destinationsLive.map(() => 'idle'))

  useEffect(() => {
    if (run === 0) {
      setStates(destinationsLive.map(() => 'idle'))
      return
    }
    setStates(destinationsLive.map(() => 'idle'))
    const timers: number[] = []
    destinationsLive.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setStates((prev) => prev.map((s, j) => (j === i ? 'delivering' : s)))
        }, i * STEP_MS),
      )
      timers.push(
        window.setTimeout(() => {
          setStates((prev) => prev.map((s, j) => (j === i ? 'done' : s)))
        }, i * STEP_MS + 260),
      )
    })
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [run])

  const allDone = states.every((s) => s === 'done')
  const anyActive = states.some((s) => s === 'delivering')

  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-center gap-3">
          <Tile icon={Route} tone="white" />
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight text-white">Single source of truth</div>
            <div className="mt-0.5 text-[11px] font-medium text-emerald-100/55">
              One event fans out · zero drift
            </div>
          </div>
          <div className="ml-auto shrink-0">
            {allDone ? (
              <Chip intent="success" light icon={Check}>Delivered</Chip>
            ) : anyActive ? (
              <Chip intent="live" light dot>Fanning out</Chip>
            ) : (
              <Chip intent="neutral" light>Idle</Chip>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <span aria-hidden className="my-1 h-4 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />
          <div className="grid w-full grid-cols-2 gap-2">
            {destinationsLive.map((d, i) => {
              const s = states[i]
              return (
                <motion.div
                  key={d.label}
                  className={cn(
                    'rounded-2xl p-3 transition-colors duration-300',
                    s === 'done'
                      ? 'bg-emerald-400/[0.16]'
                      : s === 'delivering'
                        ? 'bg-white/[0.1]'
                        : 'bg-white/[0.06]',
                    i === destinationsLive.length - 1 && 'col-span-2',
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-300',
                        s === 'done'
                          ? 'bg-emerald-400/25 text-emerald-100'
                          : 'bg-emerald-400/15 text-emerald-200',
                      )}
                    >
                      {s === 'done' ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                      ) : s === 'delivering' ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.4} aria-hidden />
                      ) : (
                        <d.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="break-words text-[11px] font-bold leading-snug text-white">{d.label}</div>
                      <div className="break-words text-[9px] font-bold uppercase leading-snug tracking-[0.14em] text-emerald-100/40">
                        {s === 'done' ? 'Delivered' : s === 'delivering' ? 'Sending…' : d.sub}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Hero>
    </motion.div>
  )
}
