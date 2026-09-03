import { Card, Tile } from '@/components/phone/kit'
import type { Metric } from '@/data/admin/a10Data'

type Props = { metric: Metric }

export function MetricDetailCard({ metric }: Props) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Tile icon={metric.icon} tone={metric.intent} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{metric.label}</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Live breakdown</div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {metric.details.map((d) => (
            <div key={d.k} className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate text-[12.5px] font-semibold text-[#0B211B]/65">{d.k}</span>
              <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{d.v}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
