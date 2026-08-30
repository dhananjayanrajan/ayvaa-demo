import { BadgeCheck, Clock, Undo2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MiniBadge } from '@/components/phone/kit'
import type { Receipt } from '@/data/patientBilling'

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
