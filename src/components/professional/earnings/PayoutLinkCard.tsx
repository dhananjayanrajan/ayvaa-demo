import { motion } from 'motion/react'
import { ChevronRight, Landmark } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'

type Props = {
  bank: string
  account: string
  payoutCount: number
  onPress: () => void
}

export function PayoutLinkCard({ bank, account, payoutCount, onPress }: Props) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="group block w-full text-left">
      <Card>
        <div className="p-5 pb-4">
          <div className="flex items-start gap-3.5">
            <Tile icon={Landmark} tone="ink" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Payout history & withdrawal</div>
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
