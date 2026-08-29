import { motion } from 'motion/react'
import {
  Check,
  Link2,
  PauseCircle,
  Siren,
} from 'lucide-react'
import {
  Card,
  Panel,
  Tile,
  rise,
} from '@/components/phone/kit'
import { incidentLinking } from '@/data/seed'

interface IncidentLinkingCardProps {
  delivered?: boolean
}

export function IncidentLinkingCard({ delivered = false }: IncidentLinkingCardProps) {
  const count = delivered ? '4 incidents linked automatically' : incidentLinking.count
  return (
    <motion.div variants={rise}>
      <Card intent="danger">
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <Tile icon={Link2} tone="danger" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                {count} incidents · auto-linked
              </div>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/60">{incidentLinking.body}</p>
            </div>
          </div>

          <Panel intent="danger" className="mt-4 p-4">
            <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-600/70">
              <Siren className="h-3 w-3" strokeWidth={2.5} aria-hidden />
              What supervisors received
            </div>
            <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-[#0B211B]/80">{incidentLinking.paged}</p>
            <div aria-hidden className="my-3 h-px bg-rose-500/10" />
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15">
                <PauseCircle className="h-3.5 w-3.5 text-rose-600" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="min-w-0 flex-1 text-xs font-semibold leading-snug text-rose-600/90">
                {incidentLinking.paused}
              </span>
            </div>
          </Panel>

          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-rose-600/60">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            Closed loop · no manual follow-up needed
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
