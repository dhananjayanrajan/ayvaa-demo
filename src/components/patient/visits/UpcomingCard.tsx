import { CalendarDays } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import { useRouter } from '@/lib/router'
import { applyVisitFilters, upcomingSubtitle, upcomingVisits, type VisitFilters } from '@/data/patientVisits'
import { EmptyTabState } from './EmptyTabState'

export function UpcomingCard({ filters, onClearFilters }: { filters: VisitFilters; onClearFilters: () => void }) {
  const { navigate } = useRouter()
  const list = applyVisitFilters(upcomingVisits(), filters)

  if (list.length === 0) {
    return <EmptyTabState cause="filters" label="upcoming visits" onClearFilters={onClearFilters} />
  }

  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {list.map((v) => {
          const pending = v.status === 'pending'
          return (
            <Row
              key={v.id}
              icon={CalendarDays}
              tone={pending ? 'warning' : 'success'}
              title={`${v.day}, ${v.date}`}
              subtitle={upcomingSubtitle(v)}
              subtitleClassName="text-[11px] font-semibold leading-snug text-[#0B211B]/45"
              chip={{ label: pending ? 'Pending' : 'Confirmed', intent: pending ? 'warning' : 'success', dot: pending }}
              surface="inset"
              surfaceTone="rounded-2xl bg-[#0B211B]/[0.03]"
              wrapSurface
              className="p-3.5"
              hoverClassName="hover:bg-[#0B211B]/[0.05]"
              onClick={() => navigate(v.status === 'live' ? '/patient/p16' : '/patient/p17')}
            />
          )
        })}
      </div>
    </Card>
  )
}
