import { motion } from 'motion/react'
import { Check, Link2, PauseCircle, Siren, UserRound } from 'lucide-react'
import { Card, Chip, Tile, rise } from '@/components/phone/kit'
import { Overline } from '@/components/admin/ui/Overline'
import { incidentLinking } from '@/data/seed'

interface IncidentLinkingCardProps {
  delivered?: boolean
}

export function IncidentLinkingCard({ delivered = false }: IncidentLinkingCardProps) {
  const count = delivered ? '4 incidents linked automatically' : incidentLinking.count
  return (
    <motion.div variants={rise}>
      <Card intent="danger">
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-rose-500 to-red-500" />
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <Tile icon={Link2} tone="danger" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                  {count}
                </span>
                <Chip intent="danger" dot>Auto-linked</Chip>
              </div>
              <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {incidentLinking.body}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] p-4">
            <Overline icon={Siren}>What supervisors received</Overline>
            <div className="mt-2.5 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15">
                  <UserRound className="h-3 w-3 text-rose-600" strokeWidth={2.4} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-pretty text-[12.5px] font-semibold leading-snug text-[#0B211B]/80">
                  {incidentLinking.paged}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15">
                  <PauseCircle className="h-3 w-3 text-rose-600" strokeWidth={2.4} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-pretty text-[12.5px] font-semibold leading-snug text-rose-600/90">
                  {incidentLinking.paused}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-rose-600/60">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            Closed loop · no manual follow-up needed
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
