import { Bell, ChevronRight } from 'lucide-react'
import { Card } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import { takenIntent, type Prescription } from '@/data/patientPrescriptions'
import { cn } from '@/lib/utils'

export function PrescriptionList({
  prescriptions,
  reminded,
  onSelect,
}: {
  prescriptions: Prescription[]
  reminded: string[]
  onSelect: (rx: Prescription) => void
}) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-2">
        {prescriptions.map((rx) => {
          const hasReminder = reminded.includes(rx.id)
          return (
            <Row
              key={rx.id}
              icon={rx.icon}
              tone={hasReminder ? 'success' : takenIntent(rx.takenToday)}
              title={`${rx.name} ${rx.dose}`}
              subtitle={rx.schedule}
              body={<span className="block text-[11px] font-medium leading-snug text-[#0B211B]/50">{rx.stock}</span>}
              chip={
                hasReminder
                  ? { label: 'Reminder set', intent: 'success', icon: Bell }
                  : { label: rx.takenToday ? 'Taken' : 'Due', intent: takenIntent(rx.takenToday) }
              }
              surface="none"
              padding="roomy"
              className={cn('py-3', hasReminder && 'rounded-2xl bg-emerald-500/[0.09]')}
              hoverClassName={hasReminder ? '' : 'hover:bg-[#0B211B]/[0.03]'}
              showChevron={false}
              trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />}
              onClick={() => onSelect(rx)}
            />
          )
        })}
      </div>
    </Card>
  )
}
