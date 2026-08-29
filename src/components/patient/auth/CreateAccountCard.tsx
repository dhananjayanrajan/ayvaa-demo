import { motion } from 'motion/react'
import { ArrowRight, Lock } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'

export function CreateAccountCard({ onPress }: { onPress: () => void }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="block w-full text-left">
      <Card>
        <div className="flex items-center gap-3.5 p-4">
          <Tile icon={Lock} tone="ink" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
              Create a guardian account
            </div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
              Cover every loved one under one verified plan
            </div>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600/60" aria-hidden />
        </div>
      </Card>
    </motion.button>
  )
}
