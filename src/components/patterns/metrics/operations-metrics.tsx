import { Stat } from '@/components/base/phone/kit'

type Props = {
  activeBookings: string
  sessionsToday: string
  verified: string
}

export function OperationsMetrics({ activeBookings, sessionsToday, verified }: Props) {
  return (
    <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
      <Stat label="Active" value={activeBookings} dot="bg-emerald-300" />
      <Stat label="Today" value={sessionsToday} dot="bg-teal-300" />
      <Stat label="Verified" value={verified} dot="bg-sky-300/80" />
    </div>
  )
}
