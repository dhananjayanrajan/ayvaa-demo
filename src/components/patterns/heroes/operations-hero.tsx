import { Activity } from 'lucide-react'
import { Hero, Kicker } from '@/components/base/phone/kit'
import { OperationsMetrics } from '@/components/patterns/metrics/operations-metrics'
import { OperationsStatus } from '@/components/patterns/misc/operations-status'

type Props = {
  activeBookings: string
  sessionsToday: string
  verified: string
  openIncidents: number
}

export function OperationsHero({ activeBookings, sessionsToday, verified, openIncidents }: Props) {
  return (
    <Hero>
      <Kicker>
        <Activity className="h-3 w-3 text-emerald-300/80" aria-hidden />
        Operations console · live
      </Kicker>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Friday is running{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">on rails</span>
      </h2>
      <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
        Every queue is moving, verified and accounted for.
      </p>
      <OperationsMetrics activeBookings={activeBookings} sessionsToday={sessionsToday} verified={verified} />
      <OperationsStatus openIncidents={openIncidents} />
    </Hero>
  )
}
