import { useState } from 'react'
import { ClipboardCheck } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/base/phone/kit'
import { MedRow } from '../lists/med-row'
import type { MedDose } from '@/data/patientMeds'

interface MedLogCardProps {
  sealed: MedDose[]
  upcoming: MedDose[]
  nurseFirst: string
}

export function MedLogCard({ sealed, upcoming, nurseFirst }: MedLogCardProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <Card intent="success">
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400" />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={ClipboardCheck} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Medication log</span>
              <Chip intent="success" icon={ClipboardCheck}>
                Rx-verified
              </Chip>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Tap a sealed dose for its verification detail.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700">Sealed and verified</span>
          <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">{sealed.length}</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {sealed.map((med) => (
            <MedRow key={med.id} med={med} open={openId === med.id} onToggle={() => toggle(med.id)} />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/45">Coming up</span>
          <span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/45">{upcoming.length}</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {upcoming.map((med) => (
            <MedRow key={med.id} med={med} />
          ))}
          <p className="px-1 pt-1 text-[11px] font-medium leading-snug text-[#0B211B]/45">
            {nurseFirst} administers these at the evening visit.
          </p>
        </div>
      </div>
    </Card>
  )
}
