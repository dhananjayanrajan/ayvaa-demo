import { motion } from 'motion/react'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

interface SheetHeaderProps {
  icon: LucideIcon
  tone: 'success' | 'warning'
  title: string
  sub: string
  onClose: () => void
}

export function SheetHeader({ icon, tone, title, sub, onClose }: SheetHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <Tile icon={icon} tone={tone} size="lg" />
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{title}</h3>
        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{sub}</p>
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
  )
}
