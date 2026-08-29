import { motion } from 'motion/react'
import { ChevronRight, Plus } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

type Props = {
  onPress: () => void
}

export function AddCertificationRow({ onPress }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onPress}
      className="flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-2 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
    >
      <Tile icon={Plus} tone="ink" />
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">Add a certification</span>
        <span className="mt-0.5 block truncate text-[10.5px] font-semibold text-[#0B211B]/45">
          Unlocks new care categories once verified
        </span>
      </span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20" aria-hidden />
    </motion.button>
  )
}
