import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Trash2,
} from 'lucide-react'
import { Card, Chip, Tile, rise } from '@/components/phone/kit'
import { deletionQueue } from '@/data/seed'
import { useDemo } from '@/lib/store'

type QueueItem = {
  label: string
  detail: string
  state: 'Running' | 'Scheduled'
  progress?: number
}

export function DeletionQueueList() {
  const { notify } = useDemo()
  const [queue, setQueue] = useState<QueueItem[]>(
    deletionQueue.map((item) => ({
      ...item,
      progress: item.state === 'Running' ? 42 : 0,
    })),
  )
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const handleToggleExpand = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label))
  }

  const handleSimulateCompletion = (label: string) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.label === label ? { ...item, state: 'Scheduled', progress: 100 } : item,
      ),
    )
    notify({
      title: 'Shred complete',
      body: `${label} has been crypto-shredded and logged`,
      kind: 'ok',
    })
  }

  const handleStartScheduled = (label: string) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.label === label ? { ...item, state: 'Running', progress: 12 } : item,
      ),
    )
    notify({
      title: 'Shred started',
      body: `${label} is now being purged`,
      kind: 'info',
    })
  }

  return (
    <motion.div variants={rise}>
      <Card>
        {queue.map((item) => {
          const isRunning = item.state === 'Running'
          const isExpanded = expandedItem === item.label
          const progress = item.progress ?? 0

          return (
            <div key={item.label}>
              <div className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Tile
                    icon={isRunning ? Loader2 : Trash2}
                    tone={isRunning ? 'warning' : 'neutral'}
                    className={isRunning ? 'animate-pulse' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleExpand(item.label)}
                    className="group min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded-lg"
                  >
                    <span className="flex items-center gap-2">
                      <span className="block truncate text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">
                        {item.label}
                      </span>
                      {isRunning ? (
                        <Chip intent="warning" dot>Running</Chip>
                      ) : (
                        <Chip intent="neutral">Scheduled</Chip>
                      )}
                    </span>
                    <span className="mt-0.5 block break-words text-xs font-medium leading-relaxed text-[#0B211B]/55">
                      {item.detail}
                    </span>
                  </button>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-4 w-4 text-[#0B211B]/25" aria-hidden />
                  </motion.span>
                </div>

                {isRunning && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-amber-500/20">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-700">
                      {progress}%
                    </span>
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
                        <div className="flex items-start gap-2.5">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#0B211B]/40" aria-hidden />
                          <p className="break-words text-[11.5px] font-medium leading-relaxed text-[#0B211B]/60">
                            {isRunning
                              ? 'Shredding in progress. The original file is being overwritten and keys rotated.'
                              : 'Waiting for retention window to close. Deletion will start automatically.'}
                          </p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          {isRunning ? (
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleSimulateCompletion(item.label)}
                              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_12px_24px_-12px_rgba(5,150,105,0.75)]"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
                              Complete
                            </motion.button>
                          ) : (
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleStartScheduled(item.label)}
                              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.06] py-2.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/70"
                            >
                              <Loader2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
                              Start now
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </Card>
    </motion.div>
  )
}
