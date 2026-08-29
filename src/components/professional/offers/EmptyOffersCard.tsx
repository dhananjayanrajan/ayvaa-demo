import { CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/phone/kit'

export function EmptyOffersCard() {
  return (
    <Card>
      <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/[0.1] text-emerald-600">
          <CheckCircle2 className="h-6 w-6" strokeWidth={2.2} aria-hidden />
        </span>
        <p className="text-[14px] font-extrabold tracking-tight text-[#0B211B]/70">No open offers right now</p>
        <p className="text-xs font-medium leading-relaxed text-[#0B211B]/45">
          You will be the first to know when one matches your windows
        </p>
      </div>
    </Card>
  )
}
