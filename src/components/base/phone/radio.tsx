import { useFramework } from '@/components/base/phone/framework-runtime'
import { cn } from '@/lib/utils'

export function Radio({ active, value, onSelect }: { active: boolean; value?: string; onSelect?: (v: string) => void }) {
  const { emit } = useFramework()
  const handle = () => {
    if (value && onSelect) {
      emit('radio.selected', { value })
      onSelect(value)
    } else {
      emit('radio.toggled', { active: !active })
    }
  }
  return (
    <span
      aria-hidden={onSelect ? undefined : true}
      role={onSelect ? 'radio' : undefined}
      aria-checked={onSelect ? active : undefined}
      onClick={onSelect ? handle : undefined}
      className={cn(
        'grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full transition-colors duration-200',
        active ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.12]',
        onSelect && 'cursor-pointer',
      )}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
    </span>
  )
}
