import { motion } from 'motion/react'
import type { AuditEntry, AuditKind } from '@/data/patientRecords'
import { cn } from '@/lib/utils'

const SEGMENT: Record<AuditKind, string> = {
  view: 'bg-sky-500',
  change: 'bg-emerald-500',
  denied: 'bg-rose-500',
}

const GLOW: Record<AuditKind, string> = {
  view: 'shadow-[0_0_12px_rgba(14,165,233,0.55)]',
  change: 'shadow-[0_0_12px_rgba(16,185,129,0.55)]',
  denied: 'shadow-[0_0_12px_rgba(244,63,94,0.55)]',
}

interface LedgerBarProps {
  entries: AuditEntry[]
  freshId: string | null
  onSelect: (id: string) => void
}

export function LedgerBar({ entries, freshId, onSelect }: LedgerBarProps) {
  const oldestFirst = [...entries].reverse()

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
          Entry mix, oldest to latest
        </span>
        <span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/40">{entries.length}</span>
      </div>

      <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-[#0B211B]/[0.05]">
        {oldestFirst.map((entry, i) => {
          const isLatest = entry.id === entries[0].id
          return (
            <motion.button
              key={entry.id}
              type="button"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.05 * i, duration: 0.35, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(entry.id)}
              aria-label={`Open entry, ${entry.title}`}
              className={cn(
                'h-full min-w-0 flex-1 transition-shadow duration-300',
                SEGMENT[entry.kind],
                isLatest && GLOW[entry.kind],
                entry.id === freshId && 'brightness-125',
              )}
            />
          )
        })}
      </div>

      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/30">Oldest</span>
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/30">Just now</span>
      </div>
    </div>
  )
}
