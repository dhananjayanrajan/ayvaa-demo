import { AnimatePresence, motion } from 'motion/react'
import { Ban, CalendarClock, Check, CheckCircle2, ChevronDown, ChevronRight, FileText, Gavel, Loader2, MapPin, Phone, PhoneCall, ScrollText, ShieldCheck } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { HeroHighlight, HeroTopRow } from '@/components/phone/HeroCells'
import { Card, Chip, Meter, Panel, StatStrip, Tile, rise } from '@/components/phone/kit'
import { CONSENT, SCOPES, WITHDRAW_CONSEQUENCES } from '@/data/patientConsent'
import { cn } from '@/lib/utils'
import { OptionCheckBox, OptionRow } from '@/components/phone/OptionRow'
import { useDemo } from '@/lib/store'
import { useEffect, useRef, useState } from 'react'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton, StaticButton } from '@/components/phone/LifecycleButton'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { Overline } from '@/components/phone/Overline'
import { consentReview, consentWithdrawal } from '@/data/seed'
import { StepList } from '@/components/phone/StepList'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'

const HERO_TONE = {
  sealed: {
    pillTone: 'emerald' as const,
    pillLabel: 'Active',
    pillLive: false,
    highlight: 'emerald' as const,
    panel: 'bg-emerald-400/[0.12]',
    panelValue: 'text-emerald-200',
    meter: 'success' as const,
    hint: 'Sealed record, renewing automatically on review',
  },
  pending: {
    pillTone: 'amber' as const,
    pillLabel: 'Changes pending',
    pillLive: true,
    highlight: 'amber' as const,
    panel: 'bg-amber-400/[0.12]',
    panelValue: 'text-amber-200',
    meter: 'warning' as const,
    hint: 'Your edits take effect only after you seal them',
  },
  withdrawal: {
    pillTone: 'rose' as const,
    pillLabel: 'Withdrawal pending',
    pillLive: true,
    highlight: 'rose' as const,
    panel: 'bg-rose-400/[0.14]',
    panelValue: 'text-rose-200',
    meter: 'danger' as const,
    hint: 'Care stops once the supervisor call confirms your request',
  },
}

function FactBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">{label}</div>
      <div className="mt-0.5 break-words text-[12.5px] font-extrabold leading-snug text-white">{value}</div>
    </div>
  )
}

interface ConsentHeroProps {
  patientFirst: string
  grantedCount: number
  totalScopes: number
  edits: number
  pending: boolean
  withdrawalRequested: boolean
}

export function ConsentHero({
  patientFirst,
  grantedCount,
  totalScopes,
  edits,
  pending,
  withdrawalRequested,
}: ConsentHeroProps) {
  const tone = withdrawalRequested ? HERO_TONE.withdrawal : pending ? HERO_TONE.pending : HERO_TONE.sealed
  const progress = (CONSENT.cycleDays - CONSENT.daysLeft) / CONSENT.cycleDays

  return (
    <AccentHero tone={withdrawalRequested ? 'rose' : pending ? 'amber' : 'emerald'}>
      <HeroTopRow
        icon={ShieldCheck}
        label="Consent ledger"
        trailing={<StatusPill tone={tone.pillTone} label={tone.pillLabel} live={tone.pillLive} />}
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {patientFirst}&apos;s care, <HeroHighlight tone={tone.highlight}>on your terms</HeroHighlight>
      </h2>
      <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">{tone.hint}</p>

      {withdrawalRequested && (
        <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-400/[0.2] text-rose-200">
              <PhoneCall className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </span>
            <span className="text-[12.5px] font-extrabold tracking-tight text-white">
              Supervisor call expected soon
            </span>
          </div>
          <p className="mt-2 break-words text-[10.5px] font-semibold leading-snug text-rose-100/60">
            Care continues on the sealed consent until you confirm the withdrawal on that call.
          </p>
        </div>
      )}

      <div className={cn('mt-4 rounded-2xl p-4 transition-colors duration-500', tone.panel)}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/50">
            {CONSENT.cycleDays}-day consent cycle
          </span>
          <span className={cn('text-[10px] font-extrabold uppercase tracking-[0.12em]', tone.panelValue)}>
            {CONSENT.daysLeft} days left
          </span>
        </div>
        <Meter value={progress} intent={tone.meter} delay={0.2} className="mt-2.5" />
        <div className="mt-3 grid grid-cols-2 gap-x-4">
          <FactBlock label="Signed" value={CONSENT.signed} />
          <FactBlock label="Renewal due" value={CONSENT.reviewDue} />
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Scopes granted</div>
          <motion.div
            key={grantedCount}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-1.5 text-[20px] font-extrabold leading-none tracking-tight text-white tabular-nums"
          >
            {grantedCount} of {totalScopes}
          </motion.div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Edits sealed</div>
          <motion.div
            key={edits}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-1.5 text-[20px] font-extrabold leading-none tracking-tight text-white tabular-nums"
          >
            {edits}
          </motion.div>
        </div>
      </div>

      <div className="mt-2 flex items-start gap-2 rounded-2xl bg-white/[0.04] px-4 py-2.5">
        <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300/70" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.12em] text-white/55">
          Care pauses automatically if a review is missed
        </span>
      </div>
    </AccentHero>
  )
}

interface ScopesCardProps {
  grantedIds: string[]
  location: boolean
  disabled: boolean
  onToggleScope: (id: string) => void
  onToggleLocation: () => void
}

export function ScopesCard({ grantedIds, location, disabled, onToggleScope, onToggleLocation }: ScopesCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {SCOPES.map((scope) => {
          const Icon = scope.icon
          const granted = grantedIds.includes(scope.id)
          return (
            <OptionRow
              key={scope.id}
              selected={granted}
              onSelect={() => onToggleScope(scope.id)}
              disabled={disabled}
              align="start"
              tapScale={0.99}
              className={cn('gap-3.5 p-4 duration-200', disabled && 'cursor-not-allowed opacity-60')}
              selectedClassName="bg-emerald-500/[0.06] hover:bg-emerald-500/[0.1]"
              unselectedClassName="bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.06]"
              leading={<Tile icon={Icon} tone={granted ? 'success' : 'neutral'} />}
              title={scope.label}
              titleClassName="block text-[13.5px] font-extrabold tracking-tight"
              selectedTitleClassName="text-[#0B211B]"
              unselectedTitleClassName="text-[#0B211B]/55"
              sub={scope.detail}
              subClassName="mt-1 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/50"
              trailing={<OptionCheckBox on={granted} />}
            />
          )
        })}

        <div
          className={cn(
            'flex items-center gap-3.5 rounded-2xl p-4 transition-colors duration-200',
            disabled && 'opacity-60',
            location ? 'bg-emerald-500/[0.06]' : 'bg-[#0B211B]/[0.03]',
          )}
        >
          <Tile icon={MapPin} tone={location ? 'success' : 'neutral'} />
          <span className="min-w-0 flex-1">
            <span
              className={cn(
                'block text-[13.5px] font-extrabold tracking-tight',
                location ? 'text-[#0B211B]' : 'text-[#0B211B]/55',
              )}
            >
              Location tracking during visits
            </span>
            <span className="mt-1 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/50">
              Optional. Verifies arrivals against the care address on the visit log.
            </span>
          </span>
          <button
            type="button"
            onClick={disabled ? undefined : onToggleLocation}
            disabled={disabled}
            aria-pressed={location}
            aria-label="Toggle location tracking"
            className={cn(
              'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300',
              disabled && 'cursor-not-allowed opacity-60',
              location ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
            )}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 34 }}
              className={cn(
                'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)]',
                location ? 'left-6' : 'left-1',
              )}
            />
          </button>
        </div>
      </div>
    </Card>
  )
}

interface WithdrawCardProps {
  requested: boolean
  onOpen: () => void
  onCancel: () => void
}

export function WithdrawCard({ requested, onOpen, onCancel }: WithdrawCardProps) {
  const { notify } = useDemo()

  if (requested) {
    return (
      <AccentHero tone="rose">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Gavel className="h-3 w-3" aria-hidden />
            Withdrawal request
          </span>
          <StatusPill tone="rose" label="Awaiting call" live />
        </div>

        <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Request received,{' '}
          <span className="bg-gradient-to-r from-rose-300 to-red-200 bg-clip-text text-transparent">not yet final</span>
        </h2>
        <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">
          The supervisor call is the final seal. You can still cancel until then.
        </p>

        <button
          type="button"
          onClick={() => {
            onCancel()
            notify({
              title: 'Withdrawal cancelled',
              body: `Consent for ${CONSENT.patientFirst} stays fully active`,
              kind: 'ok',
            })
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.08] py-3.5 text-[13px] font-bold text-white transition-colors duration-200 hover:bg-white/[0.14]"
        >
          <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Keep consent, cancel request</span>
        </button>
      </AccentHero>
    )
  }

  return (
    <motion.button type="button" whileTap={{ scale: 0.99 }} onClick={onOpen} className="block w-full text-left">
      <AccentHero tone="rose">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Gavel className="h-3 w-3" aria-hidden />
            End consent
          </span>
          <StatusPill tone="rose" label="Irreversible path" />
        </div>

        <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Withdraw all consent for{' '}
          <span className="bg-gradient-to-r from-rose-300 to-red-200 bg-clip-text text-transparent">
            {CONSENT.patientFirst}
          </span>
        </h2>
        <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">
          Stops all care immediately. Nothing is deleted, and the record stays yours.
        </p>

        <div className="mt-4 rounded-2xl bg-rose-400/[0.14] p-4 text-left">
          <div className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-400/[0.2] text-rose-200">
                <PhoneCall className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="text-[12px] font-extrabold tracking-tight text-rose-50">
                Supervisor call confirms first
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-rose-200/70" aria-hidden />
          </div>
          <p className="mt-2 break-words text-[10.5px] font-semibold leading-snug text-rose-100/60">
            Nothing seals from this screen. You confirm verbally on the call, and you can cancel the request any time
            before it.
          </p>
        </div>
      </AccentHero>
    </motion.button>
  )
}

type Phase = 'idle' | 'working' | 'done'

interface WithdrawSheetProps {
  onRequested: () => void
  onClose: () => void
}

export function WithdrawSheet({ onRequested, onClose }: WithdrawSheetProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const request = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        setPhase('done')
        onRequested()
      }, 1000),
    )
    timers.current.push(
      setTimeout(
        () =>
          notify({
            title: 'Withdrawal requested',
            body: `A supervisor will call within 10 minutes to confirm for ${CONSENT.patientName}`,
            kind: 'warn',
          }),
        1100,
      ),
    )
    timers.current.push(setTimeout(() => onClose(), 2400))
  }

  return (
    <SheetShell
      icon={Gavel}
      tone={phase === 'done' ? 'success' : 'danger'}
      title={phase === 'done' ? 'Withdrawal requested' : 'Withdraw all consent?'}
      subtitle={
        phase === 'done'
          ? 'A supervisor call is the final seal'
          : `This stops all care for ${CONSENT.patientFirst} immediately`
      }
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <LifecycleButton
            phase={phase}
            tone="danger"
            idleIcon={Gavel}
            idleLabel="Yes, withdraw everything"
            workingLabel="Requesting withdrawal…"
            doneLabel="Withdrawal requested"
            onPress={request}
          />
          <button
            type="button"
            onClick={onClose}
            disabled={phase === 'working'}
            aria-disabled={phase === 'working'}
            className={cn(
              'w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.08]',
              phase === 'working' && 'cursor-wait opacity-50',
            )}
          >
            Keep consent active
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pb-2">
        <DarkPanel tone="rose" kicker="What happens immediately" kickerIcon={ScrollText} glow={false}>
          <div className="flex flex-col gap-3">
            {WITHDRAW_CONSEQUENCES.map((line) => (
              <div key={line} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" aria-hidden />
                <span className="min-w-0 break-words text-[12px] font-semibold leading-snug text-rose-50/85">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </DarkPanel>

        <div className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
          <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[#0B211B]/50" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/60">
            Nothing is sealed by this tap alone. A supervisor calls you first, and only your verbal confirmation with
            them completes the withdrawal. You can cancel the request any time before that call.
          </span>
        </div>

        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.1] px-3.5 py-3"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </span>
              <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
                Request logged to the consent record. Expect the supervisor call within 10 minutes.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SheetShell>
  )
}

interface CycleStepProps {
  label: string
  sub: string
  done: boolean
}

export function CycleStep({ label, sub, done }: CycleStepProps) {
  return (
    <div className="flex min-w-[84px] flex-col items-center">
      {done ? (
        <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
          <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />
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

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface DueReviewCardProps {
  notify: NotifyFn
  onViewRecord: () => void
}

const CYCLE_DAYS = 90
const ELAPSED_DAYS = 78

const reminderHistory = [
  { date: 'Mar 28', note: 'Reminder sent via push + SMS' },
  { date: 'Mar 21', note: 'Guardian acknowledged' },
  { date: 'Mar 14', note: 'Email reminder opened' },
]

export function DueReviewCard({ notify, onViewRecord }: DueReviewCardProps) {
  const [historyOpen, setHistoryOpen] = useState(false)
  const daysLeft = CYCLE_DAYS - ELAPSED_DAYS
  const progress = ELAPSED_DAYS / CYCLE_DAYS

  const facts = [
    { key: 'Signed', value: consentReview.signed },
    { key: 'Pauses', value: consentReview.pauses },
    { key: 'Reminded', value: consentReview.reminded },
  ]

  const dueSteps = [
    { label: 'Signed', sub: consentReview.signed, done: true },
    { label: 'Reminded', sub: `${consentReview.reminded}x`, done: true },
    { label: 'Due now', sub: consentReview.due, done: false },
  ]

  return (
    <motion.div variants={rise}>
      <Card intent="warning" className="bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={CalendarClock} tone="warning" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">{consentReview.name}</span>
                <Chip intent="warning" dot>{consentReview.due}</Chip>
              </div>
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{consentReview.category}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between gap-2">
              <Overline>90-day cycle</Overline>
              <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-700">
                {daysLeft} days left
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mt-2 h-2 overflow-hidden rounded-full bg-amber-500/20"
            >
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
            </motion.div>

            <div className="mt-4 flex items-start justify-between">
              {dueSteps.map((s) => (
                <CycleStep key={s.label} label={s.label} sub={s.sub} done={s.done} />
              ))}
            </div>
          </div>

          <Panel intent="neutral" className="mt-4">
            <StatStrip
              light
              cells={facts.map((f) => ({ key: f.key, value: f.value, label: f.key }))}
            />
          </Panel>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {consentReview.pills.map((p) => (
              <Chip key={p} intent="neutral">
                {p}
              </Chip>
            ))}
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => setHistoryOpen((v) => !v)}
            className="mt-4 flex w-full items-center justify-between rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
          >
            <span className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/60">
              Recent reminders
            </span>
            <motion.span animate={{ rotate: historyOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="h-4 w-4 text-[#0B211B]/40" aria-hidden />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {historyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-2xl bg-[#0B211B]/[0.03] p-3">
                  {reminderHistory.map((r, i) => (
                    <div key={r.date} className={i > 0 ? 'mt-2 border-t border-[#0B211B]/[0.05] pt-2' : ''}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[11.5px] font-bold text-[#0B211B]">{r.date}</span>
                        <span className="break-words text-[11px] font-medium text-[#0B211B]/55">{r.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex gap-2.5">
            <StaticButton
              tone="neutral"
              icon={FileText}
              onClick={onViewRecord}
            >
              View record
            </StaticButton>
            <StaticButton
              tone="success"
              icon={Phone}
              onClick={() => notify({ title: 'Guardian called', body: 'Priya Sharma reached · review scheduled', kind: 'ok' })}
            >
              Call guardian
            </StaticButton>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}



interface WithdrawalCardProps {
  notify: NotifyFn
}

type SealState = 'idle' | 'sealing' | 'sealed'

const checklistDetails = [
  {
    label: 'Care stopped',
    state: consentWithdrawal.time,
    done: true,
    detail: 'All scheduled visits cancelled. Professionals notified via app and SMS.',
  },
  {
    label: 'Family informed',
    state: 'Immediate',
    done: true,
    detail: 'Guardian and emergency contact received push notification and call.',
  },
  {
    label: 'Seal the record',
    state: 'Pending your confirm',
    done: false,
    detail: 'Final entry will be written to the immutable audit record.',
  },
]

export function WithdrawalCard({ notify }: WithdrawalCardProps) {
  const [sealState, setSealState] = useState<SealState>('idle')
  const [confirmedReady, setConfirmedReady] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const isSealed = sealState === 'sealed'

  const closure = checklistDetails.map((item) => ({
    ...item,
    done: item.label === 'Seal the record' ? isSealed : item.done,
    state: item.label === 'Seal the record' && isSealed ? 'Sealed' : item.state,
  }))

  const handleSeal = () => {
    if (sealState !== 'idle' || !confirmedReady) return
    setSealState('sealing')
    setTimeout(() => {
      setSealState('sealed')
      notify({ title: 'Checklist confirmed', body: 'Closure checklist completed · record sealed', kind: 'ok' })
    }, 1200)
  }

  return (
    <motion.div variants={rise}>
      <PhaseHero
        theme={
          isSealed
            ? { ...PHASE_THEME.emeraldBright, border: 'border-emerald-400/20', orbA: 'bg-emerald-500/30', orbB: 'bg-teal-400/20', shadow: 'shadow-[0_28px_64px_-30px_rgba(5,150,105,0.6)]' }
            : { ...PHASE_THEME.rose, shadow: 'shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]' }
        }
        className="transition-all duration-500"
      >
          <div
            className={`flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-500 ${
              isSealed ? 'text-emerald-300' : 'text-rose-200/50'
            }`}
          >
            {isSealed ? (
              <Check className="h-3 w-3 stroke-[3]" aria-hidden />
            ) : (
              <Ban className="h-3 w-3" aria-hidden />
            )}
            {isSealed ? 'Withdrawal · record sealed' : 'Withdrawal · consent revoked'}
          </div>
          <h3 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {consentWithdrawal.name}{' '}
            <span
              className={`bg-clip-text text-transparent transition-all duration-500 ${
                isSealed
                  ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400'
                  : 'bg-gradient-to-r from-rose-300 to-orange-200'
              }`}
            >
              {isSealed ? 'record sealed' : 'withdrew consent'}
            </span>
          </h3>
          <p
            className={`mt-1.5 text-pretty break-words text-[12px] font-medium leading-relaxed transition-colors duration-500 ${
              isSealed ? 'text-emerald-100/70' : 'text-rose-100/60'
            }`}
          >
            {consentWithdrawal.body}
          </p>

          <div
            className={`mt-4 flex items-center gap-2.5 rounded-2xl px-3.5 py-3 transition-colors duration-500 ${
              isSealed ? 'bg-emerald-400/[0.15]' : 'bg-rose-400/[0.12]'
            }`}
          >
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
                  isSealed ? 'bg-emerald-300' : 'bg-rose-300'
                }`}
              />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isSealed ? 'bg-emerald-300' : 'bg-rose-300'}`} />
            </span>
            <span
              className={`min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] ${
                isSealed ? 'text-emerald-100' : 'text-rose-100'
              }`}
            >
              {isSealed ? 'Care closure completed' : 'Care paused instantly'}
            </span>
            <span
              className={`shrink-0 text-[10px] font-extrabold tabular-nums ${
                isSealed ? 'text-emerald-200/80' : 'text-rose-200/70'
              }`}
            >
              {consentWithdrawal.time}
            </span>
          </div>

          <div
            className={`mt-3 rounded-2xl p-4 transition-colors duration-500 ${
              isSealed ? 'bg-emerald-400/[0.08]' : 'bg-white/[0.06]'
            }`}
          >
            <div
              className={`text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500 ${
                isSealed ? 'text-emerald-200/70' : 'text-rose-200/60'
              }`}
            >
              What happens now
            </div>
            <p className="mt-1.5 break-words text-[12.5px] font-medium leading-relaxed text-white/80">
              {consentWithdrawal.option}
            </p>
          </div>

          <div
            className={`mt-3 rounded-2xl p-4 transition-colors duration-500 ${
              isSealed ? 'bg-emerald-400/[0.08]' : 'bg-white/[0.06]'
            }`}
          >
            <div
              className={`text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500 ${
                isSealed ? 'text-emerald-200/70' : 'text-rose-200/60'
              }`}
            >
              Closure checklist
            </div>
            <div className="mt-3 flex flex-col">
              <StepList
                nodeStyle="circle"
                nodeSize="md"
                theme="dark"
                steps={closure.map((c, i) => {
                  const last = i === closure.length - 1
                  const isExpanded = expandedItem === c.label
                  return {
                    key: c.label,
                    state: c.done ? 'done' : 'pending',
                    node: c.done ? (
                      <span
                        className={cn(
                          'grid h-5 w-5 shrink-0 place-items-center rounded-full text-white transition-all duration-500',
                          isSealed ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]' : 'bg-emerald-400/90'
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                      </span>
                    ) : (
                      <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                        <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/40" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-rose-400" />
                      </span>
                    ),
                    railClassName: isSealed ? 'bg-emerald-400/20' : 'bg-white/15',
                    title: c.label,
                    titleWrap: true,
                    titleClassName: 'text-[13px] leading-snug tracking-tight',
                    body: c.state,
                    bodyClassName: cn(
                      'text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-500',
                      isSealed ? 'text-emerald-300' : 'text-rose-100/45'
                    ),
                    trailingTitle: (
                      <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown
                          className={cn('h-4 w-4 shrink-0 transition-colors duration-500', isSealed ? 'text-emerald-200/50' : 'text-rose-100/40')}
                          aria-hidden
                        />
                      </motion.span>
                    ),
                    expandable: true,
                    open: isExpanded,
                    onToggle: () => setExpandedItem(isExpanded ? null : c.label),
                    expansion: (
                      <p
                        className={cn(
                          'mt-2 break-words text-[11.5px] font-medium leading-relaxed transition-colors duration-500',
                          isSealed ? 'text-emerald-100/70' : 'text-rose-100/60'
                        )}
                      >
                        {c.detail}
                      </p>
                    ),
                    contentClassName: last ? 'pb-0.5' : undefined,
                  }
                })}
              />
            </div>
          </div>

          <div
            className={`mt-4 rounded-2xl p-4 transition-colors duration-500 ${
              isSealed ? 'bg-emerald-400/[0.08]' : 'bg-white/[0.06]'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <button
                type="button"
                onClick={() => setConfirmedReady((v) => !v)}
                className={`relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  confirmedReady
                    ? 'border-emerald-400 bg-emerald-500 text-white'
                    : isSealed
                      ? 'border-emerald-300/30 bg-transparent'
                      : 'border-rose-200/40 bg-transparent'
                }`}
                aria-checked={confirmedReady}
                role="checkbox"
                aria-label="Confirm ready to seal"
              >
                {confirmedReady && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
              </button>
              <span
                className={`break-words text-[11px] font-semibold leading-relaxed transition-colors duration-500 ${
                  isSealed ? 'text-emerald-100/80' : 'text-rose-100/70'
                }`}
              >
                I confirm all details are accurate and the record is ready to be sealed.
              </span>
            </label>
          </div>

          <motion.button
            type="button"
            whileTap={sealState === 'idle' && confirmedReady ? { scale: 0.97 } : undefined}
            onClick={handleSeal}
            disabled={sealState !== 'idle' || !confirmedReady}
            className={`mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
              isSealed
                ? 'bg-emerald-500 text-emerald-950 shadow-[0_18px_36px_-12px_rgba(16,185,129,0.8)]'
                : sealState === 'sealing'
                  ? 'cursor-wait bg-emerald-700/80'
                  : confirmedReady
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105'
                    : 'cursor-not-allowed bg-white/10 text-rose-100/40'
            }`}
          >
            <AnimatePresence mode="wait">
              {sealState === 'idle' && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="break-words">{consentWithdrawal.action}</span>
                </motion.span>
              )}
              {sealState === 'sealing' && (
                <motion.span key="sealing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
                  <span className="break-words">Sealing record…</span>
                </motion.span>
              )}
              {isSealed && (
                <motion.span key="sealed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 font-black">
                  <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden />
                  <span className="break-words">Record sealed</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <p
            className={`mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed transition-colors duration-500 ${
              isSealed ? 'text-emerald-200/60' : 'text-rose-100/40'
            }`}
          >
            Sealing writes the final entry to the audit record — family and caregiver are notified.
          </p>
      </PhaseHero>
    </motion.div>
  )
}
