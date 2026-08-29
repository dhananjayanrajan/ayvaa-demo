import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
import type { LucideIcon } from 'lucide-react'
import type { TileTone } from '@/components/phone/kit'

type Props = {
  icon: LucideIcon
  tone: TileTone
  title: string
  metaLabel: string
  metaValue: string
  onPress: () => void
}

export function PreferenceRow({ icon, tone, title, metaLabel, metaValue, onPress }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onPress}
      className="flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
    >
      <Tile icon={icon} tone={tone} />
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">{title}</span>
        <span className="mt-0.5 flex items-baseline gap-2">
          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">{metaLabel}</span>
          <span className="min-w-0 truncate text-[11px] font-semibold text-[#0B211B]/45">{metaValue}</span>
        </span>
      </span>
      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B211B]/20" aria-hidden />
    </motion.button>
  )
}
