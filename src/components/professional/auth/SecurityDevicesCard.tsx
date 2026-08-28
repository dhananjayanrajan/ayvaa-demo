import { motion } from 'motion/react'
import { Smartphone } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'

interface SecurityDevicesCardProps {
  onOpenDevices: () => void
}

export function SecurityDevicesCard({ onOpenDevices }: SecurityDevicesCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onOpenDevices}
      className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded-3xl"
    >
      <div className="flex items-center gap-3.5 rounded-3xl border border-[#0B211B]/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
        <Tile icon={Smartphone} tone="ink" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Devices & sessions</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">3 devices · 1 active right now</div>
        </div>
        <Chip intent="success" dot className="border-transparent">Live</Chip>
      </div>
    </motion.button>
  )
}
