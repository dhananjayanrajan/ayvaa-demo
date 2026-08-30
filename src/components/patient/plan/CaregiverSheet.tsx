import { ScrollText, UserRoundCheck } from 'lucide-react'
import { SheetShell } from '@/components/patient/matching/SheetShell'
import { FactRows } from './FactRows'
import { CAREGIVER } from '@/data/patientCarePlan'
import { useRouter } from '@/lib/router'

interface CaregiverSheetProps {
  onClose: () => void
}

export function CaregiverSheet({ onClose }: CaregiverSheetProps) {
  const { navigate } = useRouter()

  const facts = [
    { label: 'Visits with this plan', value: String(CAREGIVER.visitsWithPlan) },
    { label: 'Goals logged', value: CAREGIVER.goalsLogged },
    { label: 'On-time arrivals', value: CAREGIVER.onTime },
    { label: 'Next visit', value: CAREGIVER.nextVisit },
  ]

  return (
    <SheetShell
      icon={UserRoundCheck}
      title={CAREGIVER.name}
      subtitle={`Assigned caregiver, with this plan since week ${CAREGIVER.sinceWeek}`}
      tone="info"
      onClose={onClose}
      footer={
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/patient/p11')
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-sky-600 py-3.5 text-[13px] font-bold text-white"
          >
            <UserRoundCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Full profile</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/patient/p17')
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Last summary</span>
          </button>
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4">
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[15px] font-extrabold text-white">
            {CAREGIVER.firstName[0]}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-white">{CAREGIVER.name}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">
              {CAREGIVER.role}, licence verified
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-white/[0.1] px-2.5 py-1 text-[10px] font-extrabold tabular-nums text-emerald-100">
            {CAREGIVER.rating}
          </span>
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl bg-[#0B211B]/[0.03]">
        {facts.map((row, i) => (
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
