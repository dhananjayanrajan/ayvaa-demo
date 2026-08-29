import { motion } from 'motion/react'
import { ChevronRight, Settings2 } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'

export function SettingsCard({ onPress }: { onPress: () => void }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.99 }} onClick={onPress} className="block w-full text-left">
      <Card>
        <div className="flex items-center gap-3.5 p-4">
          <Tile icon={Settings2} tone="info" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">
              Notification settings
            </div>
            <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
              Choose what pings you and what stays quiet
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
        </div>
      </Card>
    </motion.button>
  )
}
