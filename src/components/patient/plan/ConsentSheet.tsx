import { ScrollText, ShieldCheck, ShieldOff } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { FactRows } from './FactRows'
import { consentScopeRows } from '@/data/patientCarePlan'
import { useRouter } from '@/lib/router'

interface ConsentSheetProps {
  onClose: () => void
}

export function ConsentSheet({ onClose }: ConsentSheetProps) {
  const { navigate } = useRouter()

  return (
    <SheetShell
      icon={ShieldCheck}
      title="Consent, active"
      subtitle="Signed by you, governs who sees this plan"
      tone="success"
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                onClose()
                navigate('/patient/p22')
              }}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Consent records</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose()
                navigate('/patient/p21')
              }}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
            >
              <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Audit log</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/patient/p22')
            }}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.07] py-3.5 text-[13px] font-bold text-rose-600"
          >
            <ShieldOff className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Withdraw consent</span>
          </button>
        </div>
      }
    >
      <DarkPanel kicker="Consent scope">
        <FactRows rows={consentScopeRows()} />
      </DarkPanel>

      <p className="mt-3 pb-2 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
        Withdrawing pauses care at the next visit boundary. Every access to these records is in your audit log.
      </p>
    </SheetShell>
  )
}
