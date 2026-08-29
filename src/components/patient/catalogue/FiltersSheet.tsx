import { motion } from 'motion/react'
import { Check, Loader2, SlidersHorizontal } from 'lucide-react'
import { SheetShell } from '@/components/patient/onboarding/SheetShell'
import { filterDefs } from '@/data/patientCatalogue'
import type { FilterKey } from '@/data/patientCatalogue'
import { cn } from '@/lib/utils'
import { FilterToggleRow } from './FilterToggleRow'

export type ApplyState = 'idle' | 'working' | 'done'

export function FiltersSheet({
  toggles,
  applyState,
  activeCount,
  onToggle,
  onApply,
  onClose,
}: {
  toggles: Record<FilterKey, boolean>
  applyState: ApplyState
  activeCount: number
  onToggle: (key: FilterKey) => void
  onApply: () => void
  onClose: () => void
}) {
  const working = applyState === 'working'
  const done = applyState === 'done'
  return (
    <SheetShell
      icon={SlidersHorizontal}
      tileTone={done ? 'success' : 'info'}
      title={done ? 'Filters applied' : 'Search filters'}
      subtitle={
        done
          ? 'Your preferences now shape every search'
          : 'Applied to every search and category'
      }
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <motion.button
            type="button"
            whileTap={applyState === 'idle' ? { scale: 0.97 } : undefined}
            onClick={applyState === 'idle' ? onApply : undefined}
            disabled={applyState !== 'idle'}
            aria-disabled={applyState !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold tracking-tight text-white transition-colors duration-300',
              done
                ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.8)]'
                : working
                  ? 'cursor-wait bg-emerald-600/60 text-white/80'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            )}
          >
            {working && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />}
            {done ? (
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            ) : (
              !working && <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            )}
            {applyState === 'idle'
              ? activeCount > 0
                ? `Apply ${activeCount} ${activeCount === 1 ? 'filter' : 'filters'}`
                : 'Apply filters'
              : working
                ? 'Applying your preferences'
                : 'Filters applied'}
          </motion.button>
          <p className="text-center text-[10px] font-bold text-[#0B211B]/45">
            Toggles take effect the moment you apply
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        {filterDefs.map((def) => (
          <FilterToggleRow
            key={def.key}
            def={def}
            on={toggles[def.key]}
            onToggle={() => onToggle(def.key)}
          />
        ))}
      </div>
    </SheetShell>
  )
}
