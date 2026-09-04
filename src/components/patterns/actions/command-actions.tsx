import { Check, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = { changed: boolean; onReset: () => void; onSave: () => void }

export function CommandActions({ changed, onReset, onSave }: Props) {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onReset} className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75">
        <RefreshCw className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Reset
      </button>
      <button type="button" onClick={onSave} disabled={!changed} className={cn('flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', changed ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30')}>
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Save dashboard
      </button>
    </div>
  )
}
