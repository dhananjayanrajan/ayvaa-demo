import { motion } from 'motion/react'
import { Activity, Clock3, Moon, TimerReset } from 'lucide-react'
import { Card, Chip, Meter, Ring, Tile, rise } from '@/components/base/phone/kit'

const rules = [
  { icon: TimerReset, label: 'Reminder cadence', value: '30 min before each visit' },
  { icon: Moon, label: 'Quiet hours', value: '10:00 PM – 6:00 AM · urgent only' },
  { icon: Clock3, label: 'Retry policy', value: '3 attempts · 2 min apart · then pager' },
]

const destinations = 5

function PanelStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[18px] font-extrabold tabular-nums leading-none text-white">
          {value}
        </span>
        {sub ? (
          <span className="text-[10px] font-bold tabular-nums text-emerald-300/60">{sub}</span>
        ) : null}
      </div>
    </div>
  )
}

interface DeliveryHealthCardProps {
  pushes: number
  latency: string
  live: boolean
}

export function DeliveryHealthCard({ pushes, latency, live }: DeliveryHealthCardProps) {
  return (
    <motion.div variants={rise}>
      <Card intent="success">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={Activity} tone="success" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-sm font-extrabold leading-tight tracking-tight text-[#0B211B]">
                Delivery health
              </div>
              <div className="mt-1 truncate text-[11px] font-medium text-[#0B211B]/50">
                Last 24 hours · Hyderabad region
              </div>
            </div>
            {live ? (
              <Chip intent="warning" dot className="mt-0.5 border-transparent">Fanning out</Chip>
            ) : (
              <Chip intent="success" dot className="mt-0.5 border-transparent">Healthy</Chip>
            )}
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl bg-[#0B231C]">
            <div className="flex items-center gap-5 p-4">
              <Ring value={0.992} size={84} stroke={7} id="delivery-ring">
                <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">
                  99.2<span className="text-[10px]">%</span>
                </span>
                <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.18em] text-emerald-100/50">
                  delivered
                </span>
              </Ring>
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <PanelStat label="Avg latency" value={latency} sub="p95 · 1.1s" />
                <PanelStat label="Pushes / day" value={pushes.toLocaleString('en-IN')} sub="+8%" />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white/[0.04] px-4 py-2.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">
                Destinations
              </span>
              <span className="flex items-center gap-1.5">
                {Array.from({ length: destinations }).map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                ))}
                <span className="ml-1.5 text-[11px] font-extrabold tabular-nums text-white">
                  {destinations}/{destinations}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/45">
                Delivery success
              </span>
              <span className="text-[11px] font-extrabold tabular-nums text-emerald-700">99.2%</span>
            </div>
            <Meter value={0.992} intent="success" className="mt-2" />
            <div className="mt-2 text-[10px] font-semibold text-[#0B211B]/40">
              Target ≥ 99.0% · 14 dips recovered by retry
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {rules.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0B211B]/[0.05]">
                  <r.icon className="h-3.5 w-3.5 text-[#0B211B]/55" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
                    {r.label}
                  </div>
                  <div className="mt-0.5 text-[12px] font-bold leading-snug text-[#0B211B]/80">
                    {r.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
