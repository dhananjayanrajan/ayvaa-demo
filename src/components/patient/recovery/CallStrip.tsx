import { PhoneCall } from 'lucide-react'
import { StatusStrip } from '@/components/phone/StatusStrip'

export function CallStrip() {
  return (
    <StatusStrip icon={PhoneCall} title="Call requested" align="start" className="mt-3 px-3.5">
      A coordinator calls you within 10 minutes
    </StatusStrip>
  )
}
