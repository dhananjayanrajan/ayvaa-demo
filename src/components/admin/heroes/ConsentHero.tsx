import { Hero, Kicker } from '@/components/phone/kit'
import { ConsentMetrics } from '@/components/admin/metrics/ConsentMetrics'
import { ConsentStatus } from '@/components/admin/status/ConsentStatus'

type Props = {
  active: string | number
  due: string | number
  withdrawn: string | number
}

export function ConsentHero({ active, due, withdrawn }: Props) {
  return (
    <Hero>
      <Kicker>Consent ledger · 90-day cycle</Kicker>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Consent, <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">never stale</span>
      </h2>
      <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">Every consent renews on a clock the system enforces.</p>
      <ConsentMetrics active={active} due={due} withdrawn={withdrawn} />
      <ConsentStatus />
    </Hero>
  )
}
