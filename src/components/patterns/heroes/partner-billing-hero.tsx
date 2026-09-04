import { motion } from 'motion/react'
import { Hero, Chip } from '@/components/base/phone/kit'
import PriceFlow from '@/components/base/smoothui/price-flow'
import { cn } from '@/lib/utils'
import type { Invoice } from '@/data/partnerBillingTypes'

interface BillingHeroProps {
  latest: Invoice
  invoices: Invoice[]
  onSelectInvoice: (invoice: Invoice) => void
}

export function BillingHero({ latest, invoices, onSelectInvoice }: BillingHeroProps) {
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
