import { Check, Loader2, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  selectedId: string
  assigning: boolean
  assigned: boolean
  onAssign: () => void
}

export function CaseAssignAction({ selectedId, assigning, assigned, onAssign }: Props) {
  return (
    <button
      type="button"
      onClick={onAssign}
      disabled={!selectedId || assigning || assigned}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all',
        assigned
          ? 'bg-emerald-500/[0.1] text-emerald-700'
          : selectedId && !assigning
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
            : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
      )}
    >
      {assigning ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> Assigning…
        </>
      ) : assigned ? (
        <>
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} /> Investigator assigned
        </>
      ) : (
        <>
          <UserRound className="h-4 w-4 shrink-0" strokeWidth={2.4} /> Assign investigator
        </>
      )}
    </button>
  )
}
