import { CalendarClock, Check, ChevronRight, Gavel, MapPin, PhoneCall, ScrollText, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { AccentHero } from '@/components/phone/AccentHero'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { HeroHighlight, HeroTopRow } from '@/components/phone/HeroCells'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { OptionCheckBox, OptionRow } from '@/components/phone/OptionRow'
import { SheetShell } from '@/components/phone/SheetShell'
import { StatusPill } from '@/components/phone/StatusPill'
import { Card, Meter, Tile } from '@/components/phone/kit'
import { CONSENT, SCOPES, WITHDRAW_CONSEQUENCES } from '@/data/patientConsent'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

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