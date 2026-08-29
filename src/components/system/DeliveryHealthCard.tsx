import { motion } from 'motion/react'
import { Activity, Clock3, Moon, TimerReset } from 'lucide-react'
import { Card, Chip, Meter, Ring, Stat, rise } from '@/components/phone/kit'

const rules = [
  { icon: TimerReset, label: 'Reminder cadence', value: '30 min before each visit' },
  { icon: Moon, label: 'Quiet hours', value: '10:00 PM – 6:00 AM · urgent only' },
  { icon: Clock3, label: 'Retry policy', value: '3 attempts · 2 min apart · then pager' },
]

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
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/[0.12]">
              <Activity className="h-4 w-4 text-emerald-600" strokeWidth={2.2} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">
                Delivery health
              </div>
              <div className="mt-0.5 text-[11px] font-medium text-[#0B211B]/50">
                Last 24 hours · Hyderabad region
              </div>
            </div>
            {live ? (
              <Chip intent="warning" dot className="border-transparent">Fanning out</Chip>
            ) : (
              <Chip intent="success" dot className="border-transparent">Healthy</Chip>
            )}
          </div>

          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#0B231C] p-4">
            <Ring value={0.99} size={72} stroke={6} id="delivery-ring">
              <span className="text-[15px] font-extrabold tabular-nums text-white">99%</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">
                delivered
              </span>
            </Ring>
            <div className="grid min-w-0 flex-1 grid-cols-3 gap-1">
              <Stat label="Avg latency" value={latency} />
              <Stat label="Destinations" value="5/5" dot="bg-emerald-400" />
              <Stat label="Pushes / day" value={pushes.toLocaleString('en-IN')} />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">
              <span>Delivery success</span>
              <span className="tabular-nums text-emerald-700">99.2%</span>
            </div>
            <Meter value={0.99} intent="success" className="mt-2" />
          </div>

          <div className="mt-4 space-y-2.5 border-t border-[#0B211B]/[0.06] pt-4">
            {rules.map((r) => (
              <div key={r.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0B211B]/[0.05]">
                  <r.icon className="h-3 w-3 text-[#0B211B]/55" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold text-[#0B211B]/55">{r.label}</div>
                  <div className="mt-0.5 break-words text-[11px] font-bold leading-snug text-[#0B211B]/80">
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
