import { Loader2, UserCheck, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Decision = 'approved' | 'rejected' | null
type Props = { decision: Decision; working: boolean; onDecide: (approve: boolean) => void }

export function ApplicationDecision({ decision, working, onDecide }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button type="button" onClick={() => onDecide(false)} disabled={working || decision !== null} className={cn('flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', decision === 'rejected' ? 'bg-rose-500/[0.1] text-rose-700' : 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]', (working || decision) && 'cursor-not-allowed opacity-50')}>
          {working && decision === null ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <X className="h-4 w-4 shrink-0" strokeWidth={2.4} />} Reject
        </button>
        <button type="button" onClick={() => onDecide(true)} disabled={working || decision !== null} className={cn('flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', decision === 'approved' ? 'bg-emerald-500/[0.1] text-emerald-700' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]', (working || decision) && 'cursor-not-allowed opacity-50')}>
          {working && decision === null ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} />} Approve
        </button>
      </div>
      {decision && <p className="text-center text-[10px] font-bold text-[#0B211B]/50">Decision recorded · audit log updated</p>}
    </div>
  )
}
