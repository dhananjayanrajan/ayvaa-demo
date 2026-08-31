import { motion } from 'motion/react'
import { RotateCcw, X } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'
import type { Offer } from '@/data/seed'

interface DeclinedOffersCardProps {
  declined: Offer[]
  onUndoDecline: (offer: Offer) => void
}

export function DeclinedOffersCard({ declined, onUndoDecline }: DeclinedOffersCardProps) {
  return (
    <Card>
      {declined.map((o) => (
        <div key={o.id} className="flex items-center gap-3 px-4 py-3.5">
          <Tile icon={X} tone="neutral" />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{o.title}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/45">
              Declined politely · family matched elsewhere
            </div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => onUndoDecline(o)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.1] focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            aria-label={`Undo decline for ${o.title}`}
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>
      ))}
    </Card>
  )
}
