import { useState } from 'react'
import { Check, ScrollText } from 'lucide-react'
import { Card, Chip } from '@/components/base/phone/kit'
import { ExpandRow } from '@/components/base/phone/expand-row'
import { FactRows } from '@/components/base/phone/fact-rows'
import { useRouter } from '@/lib/router'
import { USUAL_CAREGIVER, applyVisitFilters, completedVisits, timeRange, type VisitFilters } from '@/data/patientVisits'
import { EmptyTabState } from './empty-tab-state'

interface CompletedCardProps {
  filters: VisitFilters
  onClearFilters: () => void
}

const EVIDENCE = [
  { label: 'Blood pressure', value: '126/78' },
  { label: 'Pulse', value: '72 bpm' },
  { label: 'Note', value: 'Walked the full loop, appetite improving' },
]

function CompletedRow({ visitId }: { visitId: string }) {
  const visit = completedVisits().find((v) => v.id === visitId)
  const { navigate } = useRouter()
  const [open, setOpen] = useState(false)
  if (!visit) return null

  return (
    <ExpandRow
      icon={Check}
      tone="success"
      dense={false}

      open={open}
      onToggle={() => setOpen((v) => !v)}
      title={
        <>
          {visit.day}, {visit.date}
        </>
      }
      sub={`${USUAL_CAREGIVER}, ${timeRange(visit)}`}
      trailing={
        <span className="flex shrink-0 items-center gap-1.5">
          <Chip intent="success" icon={Check}>
            Done
          </Chip>
        </span>
      }
    >
      <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5">
        <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
          Evidence from this visit
        </div>
        <div className="mt-3">
          <FactRows rows={EVIDENCE} tone="light" />
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {visit.vitals && <Chip intent="info">Vitals logged</Chip>}
        {visit.note && <Chip intent="neutral">Note added</Chip>}
        <Chip intent="success">GPS verified</Chip>
      </div>

      <button
        type="button"
        onClick={() => navigate('/patient/p17')}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500/[0.12] py-3 text-[12.5px] font-extrabold text-emerald-700 transition-colors hover:bg-emerald-500/[0.16]"
      >
        <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Open full visit summary
      </button>
    </ExpandRow>
  )
}

export function CompletedCard({ filters, onClearFilters }: CompletedCardProps) {
  const list = applyVisitFilters(completedVisits(), filters)

  if (list.length === 0) {
    return <EmptyTabState cause="filters" label="completed visits" onClearFilters={onClearFilters} />
  }

  return (
    <Card>
      <div className="flex flex-col gap-2.5 p-3">
        {list.map((v) => (
          <CompletedRow key={v.id} visitId={v.id} />
        ))}
      </div>
    </Card>
  )
}
