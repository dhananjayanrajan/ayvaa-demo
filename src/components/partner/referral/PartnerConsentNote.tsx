import { Card } from '@/components/phone/kit'
import { User } from 'lucide-react'

export function PartnerConsentNote() {
  return (
    <Card intent="info">
      <div className="flex items-start gap-3 p-4">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/15">
          <User className="h-3.5 w-3.5 text-sky-600" strokeWidth={2.4} aria-hidden />
        </span>
        <p className="min-w-0 flex-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
          Referrals are shared only with Ayvaa's care team. Nothing reaches caregivers until the guardian consents.
        </p>
      </div>
    </Card>
  )
}
