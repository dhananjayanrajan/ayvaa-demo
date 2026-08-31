import { ChevronRight } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import { VITAL_READINGS, vitalIntent, type VitalReading } from '@/data/patientVisitSummary'

interface VitalsCardProps {
  onSelect: (reading: VitalReading) => void
}

function ReadingRow({ reading, onPress }: { reading: VitalReading; onPress: () => void }) {
  return (
    <Row
      icon={reading.icon}
      tone={vitalIntent(reading.trend) === 'success' ? 'success' : 'neutral'}
      label={reading.label}
      labelClassName="font-bold tracking-[0.14em]"
      title={reading.value}
      titleClassName="text-[14px] font-extrabold tabular-nums tracking-tight"
      chip={{ label: reading.shortTrend, intent: vitalIntent(reading.trend) }}
      surface="inset"
      padding="even"
      className="p-4"
      hoverClassName="hover:bg-[#0B211B]/[0.05]"
      showChevron={false}
      trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
      onClick={onPress}
    />
  )
}

export function VitalsCard({ onSelect }: VitalsCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {VITAL_READINGS.map((r) => (
          <ReadingRow key={r.id} reading={r} onPress={() => onSelect(r)} />
        ))}
      </div>
    </Card>
  )
}
