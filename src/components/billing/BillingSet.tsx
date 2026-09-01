import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { BadgeCheck, Check, ClipboardCheck, Clock, Download, Loader2, Lock, ReceiptText, Undo2, X } from 'lucide-react'
import type { Invoice, UsageItem } from '@/data/partnerBillingTypes'
import { Card, Chip, Hero, Meter, MiniBadge } from '@/components/phone/kit'
import PriceFlow from '@/components/smoothui/price-flow'
import { cn } from '@/lib/utils'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import type { Receipt } from '@/data/patientBilling'
import { MARCH, budgetPct, buildLedgerRows, buildStatementLines, chargedOf, downloadStatement, fmtINR, netOf, refundedOf } from '@/data/patientBilling'
import { SheetShell } from '@/components/phone/SheetShell'
import { useEffect, useRef, useState } from 'react'
import { Row } from '@/components/phone/Row'
import { useDemo } from '@/lib/store'

interface BillingFooterProps {
  latest: Invoice
  onDownloadInvoice: () => void
  onUsageReport: () => void
}

export function BillingFooter({ latest, onDownloadInvoice, onUsageReport }: BillingFooterProps) {
  return (
    <div className="flex gap-2.5">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={onDownloadInvoice}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08]"
      >
        <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">{latest.month} invoice</span>
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={onUsageReport}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <ReceiptText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Usage report</span>
      </motion.button>
    </div>
  )
}

interface BillingHeroProps {
  latest: Invoice
  invoices: Invoice[]
  onSelectInvoice: (invoice: Invoice) => void
}

export function BillingHero_Partner({ latest, invoices, onSelectInvoice }: BillingHeroProps) {
  const latestAmount = Number(latest.amount.replace(/[^\d.]/g, ''))
  const maxAmount = Math.max(...invoices.map((i) => Number(i.amount.replace(/[^\d.]/g, '')) || 0))

  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <div className="font-mono text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          Statement · {latest.month}
        </div>
        <Chip intent="success" light className="shrink-0 border-transparent">
          {latest.status === 'paid' ? `Paid ${latest.paidOn ?? ''}` : 'Projected'}
        </Chip>
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[18px] font-extrabold text-emerald-200/80">₹</span>
        <PriceFlow value={latestAmount} className="text-[36px] font-extrabold leading-none tracking-tight text-white" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { k: 'Issued', v: latest.paidOn ?? '—' },
          { k: 'Sessions', v: String(latest.sessions) },
          { k: 'Status', v: latest.status === 'paid' ? 'Settled' : 'Projected' },
        ].map((f) => (
          <div key={f.k} className="rounded-xl bg-white/[0.06] px-2.5 py-2">
            <div className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">{f.k}</div>
            <div className="mt-0.5 truncate font-mono text-[11px] font-bold text-emerald-50/85">{f.v}</div>
          </div>
        ))}
      </div>

      <div aria-hidden className="my-4 border-t border-dashed border-white/15" />

      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">6-month trend</div>
      <div className="mt-3 flex h-14 items-end gap-2">
        {invoices.map((inv) => {
          const amt = Number(inv.amount.replace(/[^\d.]/g, '')) || 0
          const paid = inv.status === 'paid'
          return (
            <motion.button
              key={inv.month}
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => onSelectInvoice(inv)}
              className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
              aria-label={`View ${inv.month} invoice`}
            >
              <span className="text-[8.5px] font-extrabold tabular-nums text-emerald-100/50 transition-colors group-hover:text-white">
                {inv.amount.replace('₹', '')}
              </span>
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(8, (amt / maxAmount) * 100)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={cn(
                  'w-full rounded-t-md transition-opacity group-hover:opacity-80',
                  paid ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-white/[0.12]',
                )}
              />
              <span className="text-[8px] font-extrabold uppercase tracking-wide text-emerald-100/40 transition-colors group-hover:text-emerald-100/70">
                {inv.month}
              </span>
            </motion.button>
          )
        })}
      </div>
    </Hero>
  )
}

interface BillingHeroProps {
  receipts: Receipt[]
}

export function BillingHero_Patient({ receipts }: BillingHeroProps) {
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

interface BillingInvoiceSheetProps {
  invoice: Invoice
  usage: UsageItem[]
  onClose: () => void
  onDownload: () => void
}

export function BillingInvoiceSheet({ invoice, usage, onClose, onDownload }: BillingInvoiceSheetProps) {
  return (
    <SheetShell onClose={onClose} height="scroll">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/40">Statement</div>
          <div className="mt-1 text-[19px] font-extrabold tracking-tight text-[#0B211B]">{invoice.month}</div>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close sheet"
        >
          <X className="h-4 w-4" aria-hidden />
        </motion.button>
      </div>

      <div className="mt-4 flex items-end justify-between rounded-3xl bg-[#0B231C] p-4">
        <div>
          <div className="font-mono text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Amount</div>
          <div className="mt-1 font-mono text-[26px] font-black leading-none tracking-tight text-white">{invoice.amount}</div>
        </div>
        <Chip intent={invoice.status === 'paid' ? 'success' : 'warning'} className="border-transparent">
          {invoice.status === 'paid' ? `Paid ${invoice.paidOn ?? ''}` : 'Projected'}
        </Chip>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] p-4">
        <div className="flex flex-col gap-3.5">
          {usage.map((u) => (
            <div key={u.label} className="flex items-center justify-between gap-4">
              <span className="text-[12px] font-semibold leading-snug text-[#0B211B]/60">{u.label}</span>
              <span className="shrink-0 font-mono text-[12.5px] font-bold tabular-nums text-[#0B211B]">{u.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-[#0B211B]/[0.04] px-3.5 py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/60">Total</span>
            <span className="font-mono text-[15px] font-black tabular-nums text-emerald-700">{invoice.amount}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2.5 px-1">
        <ClipboardCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
        <p className="min-w-0 flex-1 text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/50">
          Generated from {invoice.sessions} verified sessions. Each one has a signed visit record.
        </p>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onDownload}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Download PDF
      </motion.button>
    </SheetShell>
  )
}

interface BillingUsageReportSheetProps {
  usage: UsageItem[]
  onClose: () => void
  onEmailReport: () => void
}

export function BillingUsageReportSheet({ usage, onClose, onEmailReport }: BillingUsageReportSheetProps) {
  return (
    <SheetShell onClose={onClose} height="scroll">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/40">Usage report</div>
          <div className="mt-1 text-[19px] font-extrabold tracking-tight text-[#0B211B]">This month at a glance</div>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close sheet"
        >
          <X className="h-4 w-4" aria-hidden />
        </motion.button>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {usage.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3.5">
            <span className="font-mono text-[10px] font-extrabold tabular-nums text-emerald-600/60">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{u.label}</span>
            <span className="shrink-0 font-mono text-[13px] font-black tabular-nums text-[#0B211B]">{u.value}</span>
          </div>
        ))}
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onEmailReport}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <ReceiptText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Email me the full report
      </motion.button>
      <p className="mt-2.5 text-center text-[10.5px] font-semibold text-[#0B211B]/45">
        Delivered as PDF · breaks down every session and caregiver hour
      </p>
    </SheetShell>
  )
}

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

interface StatementCarouselProps {
  invoices: Invoice[]
  onSelect: (invoice: Invoice) => void
}

export function StatementCarousel({ invoices, onSelect }: StatementCarouselProps) {
  return (
    <div className="-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {invoices.map((inv, i) => {
        const paid = inv.status === 'paid'
        return (
          <motion.button
            key={inv.month}
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => onSelect(inv)}
            className={cn(
              'w-[148px] shrink-0 snap-start rounded-2xl p-4 text-left outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-emerald-500/40',
              i === 0 ? 'bg-[#0B231C] shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]' : 'bg-white ring-1 ring-inset ring-[#0B211B]/[0.08]',
            )}
          >
            <div className="flex items-center justify-between">
              <ReceiptText
                className={cn('h-4 w-4', i === 0 ? 'text-emerald-300' : paid ? 'text-emerald-600' : 'text-[#0B211B]/35')}
                strokeWidth={2.2}
                aria-hidden
              />
              <Chip
                intent={paid ? 'success' : 'neutral'}
                className={cn('border-transparent', i === 0 && 'bg-white/[0.1] text-emerald-200')}
              >
                {paid ? 'Paid' : 'Proj.'}
              </Chip>
            </div>
            <div className={cn('mt-3 font-mono text-[17px] font-black tabular-nums tracking-tight', i === 0 ? 'text-white' : 'text-[#0B211B]')}>
              {inv.amount}
            </div>
            <div className={cn('mt-0.5 truncate text-[10px] font-bold', i === 0 ? 'text-emerald-100/50' : 'text-[#0B211B]/45')}>
              {inv.month} · {inv.sessions} sessions
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

interface UsageLedgerCardProps {
  usage: UsageItem[]
  total: string
}

export function UsageLedgerCard({ usage, total }: UsageLedgerCardProps) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex flex-col gap-4">
          {usage.map((u) => (
            <div key={u.label} className="flex items-center justify-between gap-4">
              <span className="text-[12.5px] font-semibold leading-snug text-[#0B211B]/60">{u.label}</span>
              <span className="shrink-0 font-mono text-[13px] font-bold tabular-nums tracking-tight text-[#0B211B]">{u.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-[#0B211B]/[0.04] px-3.5 py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/70">Amount billed</span>
            <span className="font-mono text-[16px] font-black tabular-nums tracking-tight text-emerald-700">{total}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.07] px-3 py-2.5">
          <ClipboardCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 flex-1 text-[10.5px] font-bold leading-snug text-[#0B211B]/60">
            Every line traces to a signed visit record. Unverified sessions never appear here.
          </span>
        </div>
      </div>
    </Card>
  )
}
