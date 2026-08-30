import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown, ScrollText } from 'lucide-react'
import { Card, Chip, Tile, TimeChip } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import { USUAL_CAREGIVER, applyVisitFilters, completedVisits, timeRange, type VisitFilters } from '@/data/patientVisits'
import { EmptyTabState } from './EmptyTabState'

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
    <div className="rounded-2xl bg-[#0B211B]/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
      >
        <Tile icon={Check} tone="success" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">
            {visit.day}, {visit.date}
          </span>
          <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#0B211B]/45">
            {USUAL_CAREGIVER}, {timeRange(visit)}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <Chip intent="success" icon={Check}>
            Done
          </Chip>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5">
                <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                  Evidence from this visit
                </div>
                <div className="mt-3 flex flex-col gap-2.5">
                  {EVIDENCE.map((item) => (
                    <div key={item.label} className="flex items-baseline justify-between gap-4">
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">
                        {item.label}
                      </span>
                      <span className="text-right text-[12px] font-bold leading-snug text-[#0B211B]/80">{item.value}</span>
                    </div>
                  ))}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
