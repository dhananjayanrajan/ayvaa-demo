import { Clock } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'

type Props = {
  patient: string
  when: string
  note: string
}

export function PendingSessionRow({ patient, when, note }: Props) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-2 py-3">
      <Tile icon={Clock} tone="neutral" size="sm" />
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">{patient}</div>
        <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Upcoming</div>
        <div className="mt-1 text-[10.5px] font-semibold text-[#0B211B]/45">{when}</div>
        <div className="mt-0.5 text-pretty text-[10.5px] font-semibold text-[#0B211B]/45">{note}</div>
      </div>
      <Chip intent="neutral">Pending</Chip>
    </div>
  )
}
