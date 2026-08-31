import { motion } from 'motion/react'
import { CalendarClock, PhoneCall, ShieldCheck } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { HeroTopRow, HeroHighlight } from '@/components/phone/HeroCells'
import { Meter } from '@/components/phone/kit'
import { CONSENT } from '@/data/patientConsent'
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
