import { Check, Loader2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ReportSaveAction({ isValid, saveState, onSave }: { isValid: boolean; saveState: 'idle' | 'working' | 'done'; onSave: () => void }) {
  return (
    <button type="button" onClick={onSave} disabled={!isValid || saveState !== 'idle'} className={cn('flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', saveState === 'done' ? 'bg-emerald-500/[0.1] text-emerald-700' : saveState === 'working' ? 'cursor-wait bg-emerald-500/10 text-emerald-600/70' : isValid ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.6)]' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30')}>
      {saveState === 'working' ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : saveState === 'done' ? <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} /> : <Plus className="h-4 w-4 shrink-0" strokeWidth={2.4} />}
      {saveState === 'idle' ? (isValid ? 'Save report' : 'Select metrics to save') : saveState === 'working' ? 'Saving…' : 'Report saved'}
    </button>
  )
}
