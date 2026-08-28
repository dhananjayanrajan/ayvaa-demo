import { motion } from 'motion/react'
import { Send, UserPlus } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'

interface PartnerReferralCardProps {
  onStartReferral: () => void
}

export function PartnerReferralCard({ onStartReferral }: PartnerReferralCardProps) {
  return (
    <Card intent="success">
      <div className="p-4">
        <div className="flex items-center gap-3.5">
          <Tile icon={UserPlus} tone="live" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
              Refer a patient for home care
            </div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              4-step wizard · guardian consents before matching
            </div>
          </div>
          <Chip intent="success">2 min</Chip>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onStartReferral}
          className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Start referral
        </motion.button>
      </div>
    </Card>
  )
}
