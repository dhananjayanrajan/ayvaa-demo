import { Check, ChevronRight, Clock, Landmark, ShieldCheck, Star, Wallet } from 'lucide-react'
import { Row } from '@/components/base/phone/row'
import { Card, Chip, Tile } from '@/components/base/phone/kit'
import { PHASE_THEME, PhaseHero } from '@/components/base/phone/phase-hero'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { paidAverage, type SessionRecord } from '@/data/sessionRecords'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'

type Props_EarningRow = {
  patient: string
  day: string
  time: string
  amount: string
  onPress: () => void
}

export function EarningRow({ patient, day, time, amount, onPress }: Props_EarningRow) {
  return (
    <Row
      icon={Check}
      tone="success"
      tileSize="sm"
      title={patient}
      titleClassName="text-[13px] font-extrabold"
      metaLabel={day}
      amount={amount}
      amountNote={time}
      bodyClassName="pt-0.5"
      className="items-start rounded-2xl px-2 py-3"
      onClick={onPress}
      showChevron={false}
    />
  )
}

type Props_EarningsHero = {
  available: string
  status: WithdrawStatus
  thisWeek: string
  sessions: number
  nextPayout: string
  payoutSessions: number
  payoutAmount: string
}

export function EarningsHero({ available, status, thisWeek, sessions, nextPayout, payoutSessions, payoutAmount }: Props_EarningsHero) {
  const confirmed = status === 'confirmed'
  const theme = confirmed ? PHASE_THEME.emeraldBright : PHASE_THEME.blueDeep
  const labelTone = confirmed ? 'text-emerald-200/50' : 'text-blue-200/50'

  return (
    <PhaseHero theme={theme}>
      <div className="flex items-center justify-between gap-3">
        <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.22em]', labelTone)}>
          Available to withdraw
        </span>
        <Chip
          intent={confirmed ? 'success' : 'info'}
          light
          icon={confirmed ? Check : ShieldCheck}
          className="shrink-0 border-transparent"
        >
          {confirmed ? 'Withdrawn' : 'All verified'}
        </Chip>
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className={cn('text-[18px] font-extrabold', confirmed ? 'text-emerald-200/80' : 'text-blue-200/80')}>₹</span>
        <span className="text-[38px] font-extrabold leading-none tracking-tight text-white">{available.replace('₹', '')}</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
          <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', labelTone)}>This week</div>
          <div className="mt-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{thisWeek}</div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
          <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', labelTone)}>Sessions</div>
          <div className="mt-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{sessions}</div>
        </div>
      </div>

      <div className="mt-2 flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5">
        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-xl',
            confirmed ? 'bg-emerald-400/15 text-emerald-200' : 'bg-blue-400/15 text-blue-200',
          )}
        >
          <Wallet className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', labelTone)}>Next payout</div>
          <div className="mt-1 text-[13px] font-extrabold tracking-tight text-white">{nextPayout}</div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 rounded-2xl bg-white/[0.06] px-4 py-3">
        <div>
          <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', labelTone)}>Sessions</div>
          <div className="mt-1 text-[13px] font-extrabold tabular-nums leading-none text-white">{payoutSessions}</div>
        </div>
        <div>
          <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', labelTone)}>Worth</div>
          <div className="mt-1 text-[13px] font-extrabold tabular-nums leading-none text-white">{payoutAmount}</div>
        </div>
        <div>
          <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', labelTone)}>Fee</div>
          <div className="mt-1 text-[13px] font-extrabold uppercase leading-none text-white">Zero</div>
        </div>
      </div>
    </PhaseHero>
  )
}

type Props_PayoutLinkCard = {
  bank: string
  account: string
  payoutCount: number
  onPress: () => void
}

export function PayoutLinkCard({ bank, account, payoutCount, onPress }: Props_PayoutLinkCard) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="group block w-full text-left">
      <Card>
        <div className="p-5 pb-4">
          <div className="flex items-start gap-3">
            <Tile icon={Landmark} tone="ink" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">Payout history & withdrawal</div>
              <div className="mt-1 text-xs font-medium text-[#0B211B]/55">Your bank, payouts and withdrawals</div>
            </div>
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#0B211B]/20 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </div>

          <div className="mt-4 flex flex-col gap-2.5 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Bank</span>
              <span className="min-w-0 truncate text-right text-[12.5px] font-bold text-[#0B211B]">{bank}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Account</span>
              <span className="min-w-0 font-mono text-[12.5px] font-bold tabular-nums text-[#0B211B]">{account}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Payouts</span>
              <span className="min-w-0 text-right text-[12.5px] font-bold tabular-nums text-[#0B211B]">{payoutCount}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.button>
  )
}

type Props_PendingSessionRow = {
  patient: string
  when: string
  note: string
}

export function PendingSessionRow({ patient, when, note }: Props_PendingSessionRow) {
  return (
    <Row
      icon={Clock}
      tone="neutral"
      tileSize="sm"
      title={patient}
      titleClassName="text-[13px] font-extrabold"
      metaLabel="Upcoming"
      metaValue={when}
      metaNote={note}
      chip={{ label: 'Pending', intent: 'neutral' }}
      surface="inset"
      surfaceTone="rounded-2xl bg-[#0B211B]/[0.03]"
      wrapSurface
      showChevron={false}
      className="items-start"
    />
  )
}

type Props_RatingStrip = {
  rating: number
  count: number
}

export function RatingStrip({ rating, count }: Props_RatingStrip) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-amber-500/[0.08] px-5 py-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-400/20 text-amber-600">
          <Star className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </span>
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-amber-700/70">Average rating</div>
          <div className="mt-0.5 text-[10.5px] font-semibold text-amber-800/60">From {count} family sign-offs</div>
        </div>
      </div>
      <span className="text-[19px] font-extrabold tabular-nums leading-none text-amber-800">{rating}</span>
    </div>
  )
}

type Props_SessionEarningsCard = {
  sessions: SessionRecord[]
  onPressSession: (session: SessionRecord) => void
}

export function SessionEarningsCard({ sessions, onPressSession }: Props_SessionEarningsCard) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-3">
        {sessions.map((s) => (
          <EarningRow
            key={s.id}
            patient={s.patient}
            day={s.day}
            time={s.time}
            amount={s.amount}
            onPress={() => onPressSession(s)}
          />
        ))}
        <div className="mt-1">
          <PendingSessionRow patient="Ramesh Sharma" when="Tonight, 6:00 PM" note="Pays only after the family signs off" />
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#0B211B]/[0.03] px-5 py-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Average per session</span>
        <span className="text-[13px] font-extrabold tabular-nums text-[#0B211B]">₹{paidAverage.toLocaleString('en-IN')}</span>
      </div>
    </Card>
  )
}

export type WithdrawStatus = 'idle' | 'processing' | 'confirmed'

type Props_WithdrawButton = {
  amount: string
  status: WithdrawStatus
  onPress: () => void
}

export function WithdrawButton({ amount, status, onPress }: Props_WithdrawButton) {
  return (
    <LifecycleButton
      phase={status === 'processing' ? 'working' : status === 'confirmed' ? 'done' : 'idle'}
      tone="accent"
      idleIcon={Wallet}
      idleLabel={`Withdraw ${amount} to bank`}
      workingLabel="Processing…"
      doneLabel="Withdrawal confirmed"
      onPress={onPress}
    />
  )
}