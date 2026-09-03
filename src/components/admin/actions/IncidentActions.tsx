import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { StaticButton } from '@/components/phone/LifecycleButton'

type Props = {
  onEscalate: () => void
  onClose: () => void
}

export function IncidentActions({ onEscalate, onClose }: Props) {
  return (
    <div className="flex gap-2.5">
      <StaticButton tone="danger" icon={ArrowUpRight} onClick={onEscalate}>
        Escalate higher
      </StaticButton>
      <StaticButton tone="success" icon={CheckCircle2} onClick={onClose}>
        Close incident
      </StaticButton>
    </div>
  )
}
