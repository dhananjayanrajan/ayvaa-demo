import { UserRoundCheck } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { DarkPanel } from '@/components/phone/DarkPanel'
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
            Last summary
          </button>
        </div>
      }
    >
      <DarkPanel>
        <div className="flex items-center gap-3">
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
      </DarkPanel>

      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <FactRows rows={facts} tone="light" />
      </div>
    </SheetShell>
  )
}
