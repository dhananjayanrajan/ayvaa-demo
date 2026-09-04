import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Filter, Loader2 } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { USUAL_CAREGIVER, filterOptions, type VisitFilters } from '@/data/patientVisits'
import { cn } from '@/lib/utils'

interface FilterSheetProps {
  initial: VisitFilters
  visibleCount: number
  onApply: (filters: VisitFilters) => void
  onClose: () => void
}

type Phase = 'idle' | 'working' | 'done'

export function FilterSheet({ initial, visibleCount, onApply, onClose }: FilterSheetProps) {
  const [draft, setDraft] = useState<VisitFilters>(initial)
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const unchanged = draft.caregiverOnly === initial.caregiverOnly && draft.confirmedOnly === initial.confirmedOnly

  const toggle = (id: keyof VisitFilters) => {
    if (phase !== 'idle') return
    setDraft((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const apply = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 550))
    timers.current.push(setTimeout(() => onApply(draft), 1200))
  }

  return (
    <SheetShell
      icon={Filter}
      title="Filter visits"
      subtitle="Toggles cut every tab as soon as you apply"
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <motion.button
          type="button"
          whileTap={!unchanged && phase === 'idle' ? { scale: 0.985 } : undefined}
          onClick={apply}
          disabled={unchanged || phase !== 'idle'}
          aria-disabled={unchanged || phase !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-emerald-600/60'
                : unchanged
                  ? 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/40'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
          )}
        >
          {phase === 'idle' && (unchanged ? 'No changes to apply' : `Show ${visibleCount} visits`)}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Applying…
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              Filters applied
            </>
          )}
        </motion.button>
      }
    >
      <div className="flex flex-col gap-2 pb-2">
        {filterOptions.map((option) => {
          const on = draft[option.id]
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              aria-pressed={on}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                on ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.035]',
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{option.label}</span>
                <span className="mt-0.5 block text-[10.5px] font-semibold leading-snug text-[#0B211B]/45">{option.sub}</span>
              </span>
              <span
                className={cn(
                  'relative h-6 w-10 shrink-0 rounded-full transition-colors duration-300',
                  on ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.12]',
                )}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.25)]',
                    on ? 'left-[18px]' : 'left-0.5',
                  )}
                />
              </span>
            </button>
          )
        })}

        <div className="mt-1 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Always on</div>
          <div className="mt-1 text-[12px] font-bold leading-snug text-[#0B211B]/70">
            GPS verification runs on every visit with {USUAL_CAREGIVER} and cannot be turned off.
          </div>
        </div>
      </div>
    </SheetShell>
  )
}
