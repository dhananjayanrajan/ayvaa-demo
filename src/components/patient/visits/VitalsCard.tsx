import { ChevronRight } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { VITAL_READINGS, vitalIntent, type VitalReading } from '@/data/patientVisitSummary'

interface VitalsCardProps {
  onSelect: (reading: VitalReading) => void
}

function ReadingRow({ reading, onPress }: { reading: VitalReading; onPress: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={`${reading.label}, ${reading.value}, ${reading.shortTrend}`}
      className="flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-4 text-left transition-colors hover:bg-[#0B211B]/[0.05]"
    >
      <Tile icon={reading.icon} tone={vitalIntent(reading.trend) === 'success' ? 'success' : 'neutral'} />
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
          {reading.label}
        </span>
        <span className="mt-0.5 block text-[14px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
          {reading.value}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5">
        <Chip intent={vitalIntent(reading.trend)}>{reading.shortTrend}</Chip>
        <ChevronRight className="h-4 w-4 text-[#0B211B]/25" aria-hidden />
      </span>
    </button>
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
