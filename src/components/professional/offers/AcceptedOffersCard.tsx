import { CheckCircle2 } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import type { Offer } from '@/data/seed'

interface AcceptedOffersCardProps {
  accepted: Offer[]
}

export function AcceptedOffersCard({ accepted }: AcceptedOffersCardProps) {
  return (
    <Card>
      {accepted.map((o) => (
        <div key={o.id} className="flex items-center gap-3 px-4 py-3.5">
          <Tile icon={CheckCircle2} tone="success" />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{o.title}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/45">
              Accepted · availability confirmed
            </div>
          </div>
          <Chip intent="success" className="border-transparent">
            Accepted
          </Chip>
        </div>
      ))}
    </Card>
  )
}
