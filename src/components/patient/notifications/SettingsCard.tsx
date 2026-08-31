import { motion } from 'motion/react'
import { Settings2 } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'

export function SettingsCard({ onPress }: { onPress: () => void }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.99 }} onClick={onPress} className="block w-full text-left">
      <Card>
        <Row
          icon={Settings2}
          tone="info"
          tileSize="lg"
          title="Notification settings"
          titleClassName="truncate text-[14px] font-extrabold"
          subtitle="Choose what pings you and what stays quiet"
          subtitleClassName="truncate text-[11px]"
          className="gap-3.5 p-4"
          hoverClassName="hover:bg-transparent"
          whileTapDisabled
        />
      </Card>
    </motion.button>
  )
}
