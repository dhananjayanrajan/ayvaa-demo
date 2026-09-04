import { HeartPulse, MapPin, ScrollText } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { DarkPanel } from '@/components/base/phone/dark-panel'
import { FactRows } from '@/components/base/phone/fact-rows'
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
      <DarkPanel kicker="Vitals recorded">
        <FactRows rows={VITALS} />
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">All goals logged</span>
          <span className="text-[10px] font-bold tabular-nums text-emerald-200/70">
            {GOALS_LOGGED.done} of {GOALS_LOGGED.total}
          </span>
        </div>
      </DarkPanel>

      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <FactRows rows={visitFacts(day)} tone="light" />
      </div>
    </SheetShell>
  )
}
