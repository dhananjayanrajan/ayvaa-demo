import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ClipboardCheck, Download, ReceiptText, X } from 'lucide-react'
import PriceFlow from '@/components/smoothui/price-flow'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Section, rise, stagger } from '@/components/phone/kit'
import { invoices, partner, usage } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Invoice = (typeof invoices)[number]

export function PT07() {
  const { notify } = useDemo()
  const latest = invoices.find((i) => i.status === 'paid') ?? invoices[0]
  const latestAmount = Number(latest.amount.replace(/[^\d.]/g, ''))
  const maxAmount = Math.max(...invoices.map((i) => Number(i.amount.replace(/[^\d.]/g, '')) || 0))
  const [sheet, setSheet] = useState<{ kind: 'invoice'; inv: Invoice } | { kind: 'report' } | 'none'>('none')

  const close = () => setSheet('none')

  return (
    <Screen>
      <AppBar title="Billing" subtitle={partner.name} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
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
                        <div key={inv.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
                          <span className="text-[8.5px] font-extrabold tabular-nums text-emerald-100/50">{inv.amount.replace('₹', '')}</span>
                          <motion.span
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(8, (amt / maxAmount) * 100)}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={cn('w-full rounded-t-md', paid ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-white/[0.12]')}
                          />
                          <span className="text-[8px] font-extrabold uppercase tracking-wide text-emerald-100/40">{inv.month}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Itemized ledger" trailing={<Chip intent="neutral">{usage.length} lines</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-5">
                  <div className="flex flex-col gap-3.5">
                    {usage.map((u) => (
                      <div key={u.label} className="flex items-baseline">
                        <span className="shrink-0 text-[12.5px] font-semibold text-[#0B211B]/60">{u.label}</span>
                        <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
                        <span className="shrink-0 font-mono text-[13px] font-bold tabular-nums tracking-tight text-[#0B211B]">{u.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t-2 border-[#0B211B]/50 pt-[3px]">
                    <div className="flex items-baseline justify-between border-t border-[#0B211B]/50 pt-3">
                      <span className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]">Amount billed</span>
                      <span className="font-mono text-[16px] font-black tabular-nums tracking-tight text-emerald-700">{latest.amount}</span>
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
            </motion.div>

            <motion.div variants={rise}>
              <Section label="All statements" trailing={<Chip intent="neutral">Tap to inspect</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {invoices.map((inv, i) => {
                  const paid = inv.status === 'paid'
                  return (
                    <motion.button
                      key={inv.month}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSheet({ kind: 'invoice', inv })}
                      className={cn(
                        'w-[148px] shrink-0 snap-start rounded-3xl p-4 text-left',
                        i === 0 ? 'bg-[#0B231C] shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]' : 'bg-white ring-1 ring-inset ring-[#0B211B]/[0.08]',
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <ReceiptText
                          className={cn('h-4.5 w-4.5', i === 0 ? 'text-emerald-300' : paid ? 'text-emerald-600' : 'text-[#0B211B]/35')}
                          strokeWidth={2.2}
                          aria-hidden
                        />
                        <Chip
                          intent={paid ? 'success' : 'neutral'}
                          className={cn(i === 0 && 'border-transparent bg-white/[0.1] text-emerald-200')}
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
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of billing" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setSheet({ kind: 'invoice', inv: latest })}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">{latest.month} invoice</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setSheet({ kind: 'report' })}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ReceiptText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Usage report</span>
          </motion.button>
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

            {sheet.kind === 'invoice' ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-7 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/40">Statement</div>
                    <div className="mt-1 text-[19px] font-extrabold tracking-tight text-[#0B211B]">{sheet.inv.month}</div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={close}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    aria-label="Close sheet"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>

                <div className="mt-4 flex items-end justify-between rounded-3xl bg-[#0B231C] p-4">
                  <div>
                    <div className="font-mono text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Amount</div>
                    <div className="mt-1 font-mono text-[26px] font-black leading-none tracking-tight text-white">{sheet.inv.amount}</div>
                  </div>
                  <Chip intent={sheet.inv.status === 'paid' ? 'success' : 'warning'}>
                    {sheet.inv.status === 'paid' ? `Paid ${sheet.inv.paidOn ?? ''}` : 'Projected'}
                  </Chip>
                </div>

                <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] p-4">
                  <div className="flex flex-col gap-3">
                    {usage.map((u) => (
                      <div key={u.label} className="flex items-baseline">
                        <span className="shrink-0 text-[12px] font-semibold text-[#0B211B]/60">{u.label}</span>
                        <span aria-hidden className="mx-2 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
                        <span className="shrink-0 font-mono text-[12.5px] font-bold tabular-nums text-[#0B211B]">{u.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3.5 flex items-baseline justify-between border-t border-[#0B211B]/15 pt-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/60">Total</span>
                    <span className="font-mono text-[15px] font-black tabular-nums text-emerald-700">{sheet.inv.amount}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2.5 px-1">
                  <ClipboardCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
                  <p className="min-w-0 flex-1 text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/50">
                    Generated from {sheet.inv.sessions} verified sessions. Each one has a signed visit record.
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    close()
                    notify({ title: 'Download ready', body: `${sheet.inv.month} invoice PDF saved`, kind: 'ok' })
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  Download PDF
                </motion.button>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-7 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/40">Usage report</div>
                    <div className="mt-1 text-[19px] font-extrabold tracking-tight text-[#0B211B]">This month at a glance</div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={close}
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
                  onClick={() => {
                    close()
                    notify({ title: 'Report queued', body: `Usage report will be emailed to ${partner.name}`, kind: 'info' })
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <ReceiptText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  Email me the full report
                </motion.button>
                <p className="mt-2.5 text-center text-[10.5px] font-semibold text-[#0B211B]/45">
                  Delivered as PDF · breaks down every session and caregiver hour
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
