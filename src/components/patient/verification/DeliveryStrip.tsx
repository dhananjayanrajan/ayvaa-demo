import { MailCheck } from 'lucide-react'
import { StatusStrip } from '@/components/phone/StatusStrip'

export function DeliveryStrip({ email }: { email: string }) {
  return (
    <StatusStrip icon={MailCheck} title="Email fallback delivered" align="start" className="px-3.5">
      {email}
    </StatusStrip>
  )
}
