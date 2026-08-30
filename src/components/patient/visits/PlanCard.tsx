import { motion } from 'motion/react'
import { ChevronRight, ClipboardList } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'
import { VISIT_STEPS } from '@/data/patientLiveVisit'
import { useRouter } from '@/lib/router'

export function PlanCard() {
  const { navigate } = useRouter()

  return (
    <motion.button type="button" whileTap={{ scale: 0.99 }} onClick={() => navigate('/patient/p13')} className="block w-full text-left">
      <Card>
        <div className="flex items-center gap-3.5 p-4">
          <Tile icon={ClipboardList} tone="info" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">Today's plan</div>
            <div className="mt-0.5 text-[11.5px] font-medium leading-snug text-[#0B211B]/55">
              {VISIT_STEPS.length} steps from the elderly care plan
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
        </div>
      </Card>
    </motion.button>
  )
}
