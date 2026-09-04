import { CalendarCheck, ChevronRight } from 'lucide-react'
import { Card } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import type { VisitRow } from '@/data/patientDashboard'

export function UpcomingVisitsCard({
  rows,
  onOpen,
}: {
  rows: VisitRow[]
  onOpen: () => void
}) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-4">
        {rows.map((row) => (
          <Row
            key={row.id}
            icon={CalendarCheck}
            tone={row.waiting ? 'warning' : 'success'}
            title={row.title}
            titleClassName="text-[13px]"
            subtitle={row.detail}
            subtitleClassName="text-[11px] text-[#0B211B]/50"
            chip={{
              label: row.waiting ? 'Waiting' : 'Confirmed',
              intent: row.waiting ? 'warning' : 'success',
              dot: row.waiting,
            }}
            surface="inset"
            padding="comfortable"
            hoverClassName="hover:bg-[#0B211B]/[0.05]"
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
            onClick={onOpen}
          />
        ))}
      </div>
    </Card>
  )
}
