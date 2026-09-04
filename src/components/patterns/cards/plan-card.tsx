import { motion } from 'motion/react'
import { ClipboardList } from 'lucide-react'
import { Card } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import { VISIT_STEPS } from '@/data/patientLiveVisit'
import { useRouter } from '@/lib/router'

export function PlanCard() {
  const { navigate } = useRouter()

  return (
    <motion.button type="button" whileTap={{ scale: 0.99 }} onClick={() => navigate('/patient/p13')} className="block w-full text-left">
      <Card>
        <Row
          icon={ClipboardList}
          tone="info"
          tileSize="lg"
          title="Today's plan"
          titleClassName="text-[14px] font-extrabold"
          subtitle={`${VISIT_STEPS.length} steps from the elderly care plan`}
          subtitleClassName="text-[11.5px] font-medium leading-snug text-[#0B211B]/55"
          className="gap-3.5 p-4"
          hoverClassName="hover:bg-transparent"
          whileTapDisabled
        />
      </Card>
    </motion.button>
  )
}
