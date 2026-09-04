import { ChevronRight, Stethoscope } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'

interface PartnerSessionsSheetProps {
  sessionsCount: number
  onClose: () => void
  onViewHistory: () => void
}

export function PartnerSessionsSheet({ sessionsCount, onClose, onViewHistory }: PartnerSessionsSheetProps) {
  return (
    <SheetShell
      icon={Stethoscope}
      tone="ink"
      title="Sessions this month"
      subtitle={`${sessionsCount} verified sessions`}
      onClose={onClose}
      height="auto"
    >
      <div className="flex items-center justify-between rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <span className="text-[13px] font-bold text-[#0B211B]">Completed</span>
        <span className="font-mono text-lg font-black text-[#0B211B]">{sessionsCount}</span>
      </div>
      <button
        type="button"
        onClick={onViewHistory}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
      >
        View session history
        <ChevronRight className="h-4 w-4" />
      </button>
    </SheetShell>
  )
}
