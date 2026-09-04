import { Chip } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import type { Metric, MetricId } from '@/data/admin/a10Data'
import { changeChipIntent } from '@/data/admin/a10Data'

type Props = { metrics: Metric[]; selected: MetricId; onSelect: (id: MetricId) => void }

export function CommandStrip({ metrics, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {metrics.map((m) => {
        const isSelected = selected === m.id
        return (
          <button key={m.id} type="button" onClick={() => onSelect(m.id)} className={cn('shrink-0 rounded-2xl p-4 text-left transition-colors', isSelected ? 'bg-[#0B231C] shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]' : 'bg-white ring-1 ring-inset ring-[#0B211B]/[0.08]')}>
            <div className="flex items-center gap-2">
              <m.icon className={cn('h-4 w-4', isSelected ? 'text-emerald-300' : 'text-[#0B211B]/45')} strokeWidth={2.2} />
              <span className={cn('text-[11px] font-extrabold uppercase tracking-[0.12em]', isSelected ? 'text-emerald-100/70' : 'text-[#0B211B]/45')}>{m.label}</span>
            </div>
            <div className={cn('mt-2 font-mono text-lg font-black', isSelected ? 'text-white' : 'text-[#0B211B]')}>{m.value}</div>
            <div className="mt-1 flex items-center gap-1.5"><Chip intent={changeChipIntent(m.change)} dot={!isSelected} light={isSelected} className={cn(isSelected ? 'border-transparent' : '')}>{m.change}</Chip></div>
          </button>
        )
      })}
    </div>
  )
}
