import { motion } from 'motion/react'
import { ChevronRight, Lock } from 'lucide-react'
import { Card, Tile, rise } from '@/components/base/phone/kit'
import type { Incident } from '@/data/types'

interface PhotoEvidenceCardProps {
  inc: Incident
  onClick: () => void
}

export function PhotoEvidenceCard({ inc, onClick }: PhotoEvidenceCardProps) {
  return (
    <motion.div variants={rise}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={onClick}
        className="group block w-full text-left"
      >
        <Card intent="danger">
          <div className="flex items-center gap-3 p-4">
            <Tile icon={Lock} tone="danger" />
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.photo}</span>
              <span className="mt-0.5 block text-xs font-medium leading-relaxed text-[#0B211B]/55">
                View is logged with your name
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-rose-500/60 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </div>
        </Card>
      </motion.button>
    </motion.div>
  )
}
