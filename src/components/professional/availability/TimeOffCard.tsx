import { motion } from 'motion/react'
import { Umbrella } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'

type Props = {
  range: string
  note: string
  onPress: () => void
}

export function TimeOffCard({ range, note, onPress }: Props) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="block w-full text-left">
      <Card>
        <div className="flex items-center gap-3 p-4">
          <Tile icon={Umbrella} tone="info" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">{range}</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">{note}</div>
          </div>
          <Chip intent="success">Set</Chip>
        </div>
      </Card>
    </motion.button>
  )
}
