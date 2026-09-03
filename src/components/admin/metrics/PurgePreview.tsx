import { motion } from 'motion/react'
import { Trash2 } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { RecordType } from '@/data/admin/a16Data'

function SectionMarker({ label, trail, tone = 'emerald' }: { label: string; trail?: React.ReactNode; tone?: 'emerald' | 'rose' | 'blue' }) {
  const toneClass = tone === 'rose' ? 'bg-rose-500' : tone === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className={cn('h-3 w-1 rounded-full', toneClass)} />
      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/55">{label}</span>
      <div className="h-px flex-1 bg-[#0B211B]/[0.08]" />
      {trail}
    </div>
  )
}

export function PurgePreview({ policy: _policy }: { policy: RecordType }) {
  const windows = [
    { label: 'Next 30 days', count: 124, pct: 14 },
    { label: 'Next 60 days', count: 318, pct: 37 },
    { label: 'Next 90 days', count: 842, pct: 100 },
  ]
  return (
    <div className="shrink-0 flex flex-col gap-3">
      <SectionMarker label="Purge preview" trail={<Chip intent="info" dot className="border-transparent">Scheduled</Chip>} tone="blue" />
      <Card>
        <div className="p-5">
          <div className="mb-4 flex items-start gap-3">
            <Tile icon={Trash2} tone="info" size="md" />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">Upcoming deletions</div>
              <p className="mt-1 text-[11px] font-medium leading-relaxed text-[#0B211B]/55">Records past the retention window are auto-sealed before purge.</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {windows.map((w) => (
              <div key={w.label} className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-[11.5px] font-bold text-[#0B211B]/75">{w.label}</span>
                  <span className="text-[13px] font-extrabold tabular-nums text-[#0B211B]">{w.count}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${w.pct}%` }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
