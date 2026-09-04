import { ChevronRight } from 'lucide-react'
import { Card, Tile } from '@/components/base/phone/kit'
import { CreditCard } from 'lucide-react'
import { paymentMethod } from '@/data/patientReview'
import { useRouter } from '@/lib/router'

export function PaymentCard() {
  const { navigate } = useRouter()

  return (
    <button type="button" onClick={() => navigate('/patient/p24')} className="block w-full text-left">
      <Card>
        <div className="flex items-center gap-3.5 p-4">
          <Tile icon={CreditCard} tone="info" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">
              {paymentMethod.label} ending {paymentMethod.last4}
            </div>
            <div className="mt-0.5 text-[11px] font-medium leading-snug text-[#0B211B]/55">{paymentMethod.note}</div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
        </div>
      </Card>
    </button>
  )
}
