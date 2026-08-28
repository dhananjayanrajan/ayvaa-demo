import { motion } from 'motion/react'
import { AlertTriangle, ChevronRight } from 'lucide-react'
import { Card, Tile, rise } from '@/components/phone/kit'
import { adminMetrics } from '@/data/seed'
import { useRouter } from '@/lib/router'

export function IncidentOverviewCard() {
  const { navigate } = useRouter()
  return (
    <motion.div variants={rise}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={() => navigate('/admin/a02')}
        className="group block w-full text-left"
      >
        <Card intent="danger">
          <div className="flex items-center gap-3 p-4">
            <Tile icon={AlertTriangle} tone="danger" size="lg" />
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                {adminMetrics.openIncidents} open incidents
              </span>
              <span className="mt-0.5 block text-xs font-medium text-[#0B211B]/55">
                One is critical · tap to open the incident room
              </span>
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-rose-500/60 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
        </Card>
      </motion.button>
    </motion.div>
  )
}
