import { cn } from '@/lib/utils'
import type { FilterDef } from '@/data/patientCatalogue'

export function FilterToggleRow({
  def,
  on,
  onToggle,
}: {
  def: FilterDef
  on: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-bold tracking-tight text-[#0B211B]">{def.label}</div>
        <div className="mt-0.5 text-pretty text-[10.5px] font-semibold leading-snug text-[#0B211B]/45">
          {def.sub}
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={on}
        aria-label={def.label}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
          on ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
        )}
      >
        <span
          className={cn(
            'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
            on ? 'left-6' : 'left-1',
          )}
        />
      </button>
    </div>
  )
}
