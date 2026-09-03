import { Check, Plus } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { Metric, MetricId } from '@/data/admin/a10Data'

type Props = { metrics: Metric[]; visible: MetricId[]; onToggle: (id: MetricId) => void }

export function CommandEditor({ metrics, visible, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {metrics.map((m) => {
        const isVisible = visible.includes(m.id)
        return (
          <Card key={m.id}>
            <button type="button" onClick={() => onToggle(m.id)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
              <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', m.intent === 'success' && 'bg-emerald-500/[0.12] text-emerald-600', m.intent === 'warning' && 'bg-amber-500/[0.12] text-amber-600', m.intent === 'danger' && 'bg-rose-500/[0.12] text-rose-600', m.intent === 'info' && 'bg-sky-500/[0.12] text-sky-600', m.intent === 'neutral' && 'bg-[#0B211B]/[0.05] text-[#0B211B]/60')}>
                <m.icon className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{m.label}</div>
                <div className="mt-0.5 text-[11px] font-medium text-[#0B211B]/55">{m.value} · {m.change}</div>
              </div>
              {isVisible ? <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span> : <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.08] text-[#0B211B]/40"><Plus className="h-3.5 w-3.5" strokeWidth={3} /></span>}
            </button>
          </Card>
        )
      })}
    </div>
  )
}
