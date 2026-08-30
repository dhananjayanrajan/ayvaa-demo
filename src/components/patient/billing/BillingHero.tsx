import { Lock, ReceiptText, Undo2 } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { Meter } from '@/components/phone/kit'
import { MARCH, budgetPct, chargedOf, fmtINR, netOf, refundedOf, type Receipt } from '@/data/patientBilling'

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
