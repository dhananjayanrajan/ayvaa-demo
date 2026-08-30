import { motion } from 'motion/react'
import { ChevronRight, Landmark } from 'lucide-react'
import { Chip } from '@/components/phone/kit'

type Props = {
  bankName: string
  last4: string
  holder: string
  verified: string | null
  extraCount: number
  onPress: () => void
}

export function AccountCard({ bankName, last4, holder, verified, extraCount, onPress }: Props) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="block w-full text-left">
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0B231C] via-[#123B2E] to-[#0F5138] p-5 shadow-[0_24px_56px_-26px_rgba(6,40,30,0.8)]">
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
              <Landmark className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="truncate text-[14px] font-extrabold tracking-tight text-white">{bankName}</div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Savings account</div>
            </div>
            <Chip intent="success" light className="shrink-0 border-transparent">
              Default
            </Chip>
          </div>

          <div className="mt-4 font-mono text-[20px] font-black tracking-[0.18em] text-emerald-50">{`•••• •••• ${last4}`}</div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Account holder</div>
              <div className="mt-1 truncate font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-100/70">{holder}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Verified</div>
              <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-100/70">{verified ?? 'Pending'}</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.08] px-4 py-3">
            <span className="min-w-0 flex-1 text-[11px] font-bold text-emerald-50/90">
              {extraCount > 0 ? `Manage ${extraCount + 1} linked accounts` : 'Manage payout accounts'}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-emerald-100/70" aria-hidden />
          </div>
        </div>
      </div>
    </motion.button>
  )
}
