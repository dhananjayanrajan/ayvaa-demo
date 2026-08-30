import { Check, SlidersHorizontal } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton, CtaNote } from '@/components/phone/LifecycleButton'
import { filterDefs } from '@/data/patientCatalogue'
import type { FilterKey } from '@/data/patientCatalogue'
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
  return (
    <SheetShell
      icon={SlidersHorizontal}
      tone={applyState === 'done' ? 'success' : 'info'}
      title={applyState === 'done' ? 'Filters applied' : 'Search filters'}
      subtitle={
        applyState === 'done'
          ? 'Your preferences now shape every search'
          : 'Applied to every search and category'
      }
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <LifecycleButton
            phase={applyState}
            idleIcon={Check}
            idleLabel={
              activeCount > 0
                ? `Apply ${activeCount} ${activeCount === 1 ? 'filter' : 'filters'}`
                : 'Apply filters'
            }
            workingLabel="Applying your preferences"
            doneLabel="Filters applied"
            onPress={onApply}
          />
          <CtaNote>Toggles take effect the moment you apply</CtaNote>
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
