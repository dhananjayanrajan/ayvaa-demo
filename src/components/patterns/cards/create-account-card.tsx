import { motion } from 'motion/react'
import { ArrowRight, Lock } from 'lucide-react'
import { Card } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'

export function CreateAccountCard({ onPress }: { onPress: () => void }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="block w-full text-left">
      <Card>
        <Row
          icon={Lock}
          tone="ink"
          tileSize="lg"
          title="Create a guardian account"
          titleClassName="text-[15px] font-extrabold leading-snug"
          subtitle="Cover every loved one under one verified plan"
          subtitleClassName="text-xs"
          trailing={<ArrowRight className="h-4 w-4 shrink-0 text-emerald-600/60" aria-hidden />}
          showChevron={false}
          className="gap-3.5 p-4"
          hoverClassName="hover:bg-transparent"
          whileTapDisabled
        />
      </Card>
    </motion.button>
  )
}
