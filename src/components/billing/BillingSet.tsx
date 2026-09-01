import type { LucideIcon } from 'lucide-react'
import { BadgeCheck, Check, Clock, Download, Loader2, Lock, ReceiptText, Undo2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { AccentHero } from '@/components/phone/AccentHero'
import { Row } from '@/components/phone/Row'
import { StatusPill } from '@/components/phone/StatusPill'
import { Meter, MiniBadge } from '@/components/phone/kit'
import { MARCH, budgetPct, buildLedgerRows, buildStatementLines, chargedOf, downloadStatement, fmtINR, netOf, refundedOf, type Receipt } from '@/data/patientBilling'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

// ── BillingHero.tsx ──
interface BillingHeroProps {
  receipts: Receipt[]
}

export function BillingHero({ receipts }: BillingHeroProps) {
  const charged = chargedOf(receipts)
  const refunded = refundedOf(receipts)
  const net = netOf(receipts)
  const pct = Math.round(budgetPct(receipts) * 100)

  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <ReceiptText className="h-3 w-3" aria-hidden />
          Cash flow, {MARCH.label}
        </span>
        <StatusPill tone="emerald" label="All settled" />
      </div>

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Two visits charged,{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
          one refunded
        </span>
      </h2>
      <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">
        The refund is already on its way back to your card
      </p>

      <div className="mt-4 overflow-hidden rounded-2xl bg-emerald-400/[0.12]">
        <div className="p-4">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/60">
            Where the money moved
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/[0.06] px-3.5 py-3">
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Charged</div>
              <div className="mt-1.5 text-[18px] font-extrabold leading-none tracking-tight text-white tabular-nums">
                {fmtINR(charged)}
              </div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/35 tabular-nums">
                2 sealed visits
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.06] px-3.5 py-3">
              <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/60">
                <Undo2 className="h-3 w-3" aria-hidden />
                Returned
              </div>
              <div className="mt-1.5 text-[18px] font-extrabold leading-none tracking-tight text-emerald-300 tabular-nums">
                {fmtINR(refunded)}
              </div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-100/40">
                Missed visit
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 bg-white/[0.04] px-4 py-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Net to card</span>
          <span className="text-[15px] font-extrabold leading-none tabular-nums text-white">{fmtINR(net)}</span>
        </div>
        <div className="bg-white/[0.04] px-4 pb-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
              Budget usage
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-200 tabular-nums">
              {pct}% of {fmtINR(MARCH.budget)}
            </span>
          </div>
          <Meter value={budgetPct(receipts)} intent="success" delay={0.2} className="mt-2" />
        </div>
      </div>

      <div className="mt-2 flex items-start gap-2 rounded-2xl bg-white/[0.04] px-4 py-2.5">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300/70" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/55">
          Charged only after verified visits
        </span>
      </div>
    </AccentHero>
  )
}

// ── LedgerCard.tsx ──
interface LedgerCardProps {
  receipts: Receipt[]
}

export function LedgerCard({ receipts }: LedgerCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
        <div className="flex flex-col gap-3">
          {buildLedgerRows(receipts).map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">
                {row.label}
              </span>
              <span className="min-w-0 text-right text-[12.5px] font-bold tabular-nums text-[#0B211B]/80">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <StatementButton receipts={receipts} />
    </div>
  )
}

// ── ReceiptList.tsx ──
interface ReceiptListProps {
  receipts: Receipt[]
}

export function ReceiptList({ receipts }: ReceiptListProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-2.5">
      {receipts.map((receipt) => (
        <ReceiptRow
          key={receipt.id}
          receipt={receipt}
          open={openId === receipt.id}
          onToggle={() => setOpenId((cur) => (cur === receipt.id ? null : receipt.id))}
        />
      ))}
    </div>
  )
}

// ── ReceiptRow.tsx ──
interface ReceiptRowProps {
  receipt: Receipt
  open: boolean
  onToggle: () => void
}

export function ReceiptRow({ receipt, open, onToggle }: ReceiptRowProps) {
  const Icon = receipt.icon

  if (receipt.state === 'planned') {
    return (
      <Row
        leading={
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.07] text-[#0B211B]/50">
            <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </span>
        }
        title={`${receipt.day}, ${receipt.date}`}
        titleClassName="text-[13px] font-bold text-[#0B211B]/70"
        subtitle={receipt.note}
        subtitleClassName="break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/45"
        chip={{ label: receipt.chip, intent: 'neutral' }}
        className="rounded-2xl bg-[#0B211B]/[0.03] gap-3.5 p-4"
        showChevron={false}
      />
    )
  }

  const live = receipt.state === 'live'
  const refund = receipt.state === 'refund'

  return (
    <Row
      icon={Icon}
      tone={refund ? 'warning' : live ? 'success' : 'neutral'}
      liveDot={live}
      title={`${receipt.day}, ${receipt.date}`}
      titleClassName="text-[13px] font-extrabold"
      subtitle={receipt.note}
      subtitleClassName="break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/55"
      chip={{
        label: receipt.chip,
        intent: refund ? 'warning' : live ? 'live' : 'success',
        dot: live,
      }}
      amount={!refund ? fmtINR(receipt.amount) : undefined}
      expandable
      open={open}
      onToggle={onToggle}
      hoverClassName="hover:bg-[#0B211B]/[0.06]"
      surface="tint"
      surfaceTone={live ? 'rounded-2xl bg-emerald-500/[0.06]' : 'rounded-2xl bg-[#0B211B]/[0.03]'}
      wrapSurface
      className="items-start gap-3.5 p-4"
      showChevron={false}
      expansion={<ReceiptTicket receipt={receipt} />}
    />
  )
}

// ── ReceiptTicket.tsx ──
const BADGE_TONE: Record<Receipt['ticket']['badgeTone'], { icon: LucideIcon; tone: 'emerald' | 'amber' | 'sky' }> = {
  emerald: { icon: BadgeCheck, tone: 'emerald' },
  amber: { icon: Undo2, tone: 'amber' },
  sky: { icon: Clock, tone: 'sky' },
}

const FOOT_LINE: Record<Receipt['state'], string> = {
  sealed: 'Sealed to the billing ledger, never edited',
  live: 'Nothing is billed for unfinished time',
  refund: 'Automatic refund, no action needed from you',
  planned: '',
}

interface ReceiptTicketProps {
  receipt: Receipt
}

export function ReceiptTicket({ receipt }: ReceiptTicketProps) {
  const t = receipt.ticket
  const badge = BADGE_TONE[t.badgeTone]
  const BadgeIcon = badge.icon

  return (
    <div className="overflow-hidden rounded-2xl bg-[#0B231C]">
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
            {t.badgeLabel} {receipt.number}
          </span>
          <MiniBadge icon={BadgeIcon} tone={badge.tone} dark>
            {receipt.state === 'live' ? 'Live' : receipt.state === 'refund' ? 'Refund' : 'Verified'}
          </MiniBadge>
        </div>

        <div className="mt-3.5 flex flex-col gap-3">
          {t.rows.map((row) => (
            <div key={row.label}>
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">{row.label}</div>
              <div className="mt-0.5 break-words text-[12.5px] font-bold leading-snug text-emerald-50/90">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-4 bg-white/[0.04] px-4 py-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">{t.finalLabel}</span>
        <span className="text-right text-[13px] font-extrabold tabular-nums text-emerald-50/90">
          {t.finalValue}
        </span>
      </div>

      <div className="bg-white/[0.04] px-4 pb-3">
        <p className="break-words text-[10px] font-semibold leading-snug text-white/35">
          {FOOT_LINE[receipt.state]}
        </p>
      </div>
    </div>
  )
}

// ── StatementButton.tsx ──
type Phase = 'idle' | 'working' | 'done'

interface StatementButtonProps {
  receipts: Receipt[]
  variant?: 'primary' | 'ghost'
}

export function StatementButton({ receipts, variant = 'primary' }: StatementButtonProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        downloadStatement(buildStatementLines(receipts))
        setPhase('done')
      }, 800),
    )
    timers.current.push(
      setTimeout(
        () => notify({ title: 'Statement saved', body: 'March statement downloaded and the export logged', kind: 'ok' }),
        900,
      ),
    )
  }

  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
      onClick={run}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-extrabold transition-colors',
        variant === 'primary'
          ? phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-600/60 text-white'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : phase === 'done'
            ? 'bg-emerald-500/[0.14] text-emerald-700'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/40'
              : 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.09]',
      )}
    >
      {phase === 'working' ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span className="truncate">Preparing statement…</span>
        </>
      ) : phase === 'done' ? (
        <>
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          <span className="truncate">Statement saved</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Download March statement</span>
        </>
      )}
    </motion.button>
  )
}
