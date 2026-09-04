import { motion } from 'motion/react'
import type { HistorySession } from '@/data/historyData'
import { dayOf } from '@/data/historyData'
import { cn } from '@/lib/utils'

type Props = {
  sessions: HistorySession[]
  onOpenSession: (s: HistorySession) => void
}

export function CareRibbon({ sessions, onOpenSession }: Props) {
  return (
    <div>
      <div className="flex h-11 gap-0.5 overflow-hidden rounded-xl bg-white/[0.06]">
        {sessions.map((s, i) => {
          const latest = i === sessions.length - 1
          return (
            <motion.button
              key={s.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenSession(s)}
              aria-label={`Open visit on ${s.date}`}
              className="relative min-w-0 flex-1"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
                className={cn(
                  'absolute inset-0 origin-left',
                  s.incident
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300'
                    : latest
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300 shadow-[0_0_18px_rgba(52,211,153,0.5)]'
                      : 'bg-emerald-500/75',
                )}
              />
              {s.note && <span aria-hidden className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white/80" />}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-1.5 flex gap-0.5">
        {sessions.map((s, i) => {
          const latest = i === sessions.length - 1
          return (
            <span
              key={s.id}
              className={cn(
                'min-w-0 flex-1 text-center font-mono text-[9.5px] font-bold tabular-nums',
                latest ? 'text-white' : s.incident ? 'text-amber-200/90' : 'text-emerald-100/40',
              )}
            >
              {dayOf(s)}
            </span>
          )
        })}
      </div>
    </div>
  )
}
