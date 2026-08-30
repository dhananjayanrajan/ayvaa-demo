import { HeartPulse, MapPin, ScrollText } from 'lucide-react'
import { SheetShell } from '@/components/patient/matching/SheetShell'
import { FactRows } from './FactRows'
import { CAREGIVER, GOALS_LOGGED, VITALS, visitFacts, type VisitDay } from '@/data/patientCarePlan'
import { useRouter } from '@/lib/router'

interface VisitSheetProps {
  day: VisitDay
  onOpenCaregiver: () => void
  onClose: () => void
}

export function VisitSheet({ day, onOpenCaregiver, onClose }: VisitSheetProps) {
  const { navigate } = useRouter()

  return (
    <SheetShell
      icon={MapPin}
      title={day.full}
      subtitle={`${CAREGIVER.name} at ${day.time}, ${day.minutes} minutes on site`}
      tone="success"
      onClose={onClose}
      footer={
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/patient/p17')
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Visit summary</span>
          </button>
          <button
            type="button"
            onClick={onOpenCaregiver}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <HeartPulse className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Caregiver</span>
          </button>
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4">
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="relative">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Vitals recorded</div>
          <div className="mt-3">
            <FactRows rows={VITALS} />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">All goals logged</span>
            <span className="text-[10px] font-bold tabular-nums text-emerald-200/70">
              {GOALS_LOGGED.done} of {GOALS_LOGGED.total}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl bg-[#0B211B]/[0.03]">
        {visitFacts(day).map((row, i) => (
          <div key={row.label}>
            {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />}
            <div className="flex items-baseline justify-between gap-3 px-3.5 py-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">{row.label}</span>
              <span className="truncate text-[12.5px] font-bold tabular-nums text-[#0B211B]/80">{row.value}</span>
            </div>
          </div>
        ))}
      </div>
    </SheetShell>
  )
}
