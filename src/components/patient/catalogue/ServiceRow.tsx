import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
import type { LucideIcon } from 'lucide-react'
import type { TileTone } from '@/components/phone/kit'
import type { Service } from '@/data/services'

export function ServiceRow({
  service,
  icon: Icon,
  tone,
  onPress,
}: {
  service: Service
  icon: LucideIcon
  tone: TileTone
  onPress: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.99 }}
      onClick={onPress}
      className="flex w-full items-start gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.05]"
    >
      <Tile icon={Icon} tone={tone} />
      <span className="min-w-0 flex-1">
        <span className="block text-pretty text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">
          {service.name}
        </span>
        <span className="mt-1 block text-pretty text-[11px] font-medium leading-snug text-[#0B211B]/50">
          {service.detail}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end pt-0.5">
        <span className="text-[12.5px] font-extrabold tabular-nums text-[#0B211B]">
          {service.from}
        </span>
        <span className="mt-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/35">
          from / visit
        </span>
      </span>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
    </motion.button>
  )
}
