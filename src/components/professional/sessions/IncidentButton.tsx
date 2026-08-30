import { ShieldAlert } from 'lucide-react'
import { StaticButton } from '@/components/phone/LifecycleButton'

export function IncidentButton({ onPress }: { onPress: () => void }) {
  return (
    <StaticButton tone="neutral" icon={ShieldAlert} full={false} className="flex-1" onClick={onPress}>
      Incident
    </StaticButton>
  )
}
