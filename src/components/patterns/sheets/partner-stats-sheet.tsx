import { motion } from 'motion/react'
import { BarChart3, X } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'

interface PartnerStatsSheetProps {
  weeklySessions: number[]
  onClose: () => void
}

export function PartnerStatsSheet({ weeklySessions, onClose }: PartnerStatsSheetProps) {
  const maxSessions = Math.max(...weeklySessions)

  return (
    <SheetShell onClose={onClose} height="auto">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <BarChart3 className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Weekly sessions</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Last 7 days verified activity</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close details"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="flex items-end justify-between gap-2 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        {weeklySessions.map((s, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(s / maxSessions) * 80}px` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="w-full max-w-6 rounded-lg bg-gradient-to-t from-emerald-500 to-teal-300"
            />
            <span className="text-[8px] font-extrabold uppercase tracking-wide text-[#0B211B]/40">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Total this week</span>
        <span className="font-mono text-lg font-black tabular-nums text-[#0B211B]">
          {weeklySessions.reduce((a, b) => a + b, 0)}
        </span>
      </div>
    </SheetShell>
  )
}
