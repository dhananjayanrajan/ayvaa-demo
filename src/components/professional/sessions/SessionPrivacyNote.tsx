import { InfoListCard } from '@/components/admin/ui/InfoListCard'
import { CalendarDays, Lock, MapPin, ShieldCheck } from 'lucide-react'

const items = [
  { icon: MapPin, text: 'Locations are shared only after acceptance' },
  { icon: ShieldCheck, text: 'Attendance affects matching priority' },
  { icon: Lock, text: 'Session records are sealed and timestamped' },
]

export function SessionPrivacyNote() {
  return (
    <InfoListCard
      icon={CalendarDays}
      title="Session integrity"
      subtitle="Every visit is availability-checked and logged. Missing a session changes how future offers are ranked."
      items={items}
    />
  )
}
