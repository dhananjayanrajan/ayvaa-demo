import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, Loader2 } from 'lucide-react'
import type { HistorySession } from '@/data/historyData'
import { downloadFile, recordToFileLines } from '@/data/historyData'
import { NotePanel } from './NotePanel'
import { IncidentPanel } from './IncidentPanel'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'preparing' | 'saved'

type Props = {
  session: HistorySession
}

export function RecordExpansion({ session }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const exportRecord = () => {
    if (status !== 'idle') return
    setStatus('preparing')
    timers.current.push(
      setTimeout(() => {
        downloadFile(
          `ayvaa-session-${session.date.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`,
          recordToFileLines(session),
        )
        setStatus('saved')
      }, 900),
    )
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="flex flex-col gap-2.5 pt-3">
        <div className="rounded-2xl bg-[#0B211B]/[0.035] p-4">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">What was done</div>
          <p className="mt-2 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{session.detail}</p>
        </div>

        {session.note && <NotePanel note={session.note} />}
        {session.incident && <IncidentPanel incident={session.incident} />}

        <button
          type="button"
          onClick={exportRecord}
          disabled={status !== 'idle'}
          aria-disabled={status !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[11.5px] font-bold transition-colors duration-300',
            status === 'saved'
              ? 'bg-emerald-500/[0.14] text-emerald-700'
              : status === 'preparing'
                ? 'cursor-wait bg-[#0B211B]/[0.08] text-[#0B211B]/40'
                : 'bg-[#0B211B]/[0.05] text-[#0B211B]/65 hover:bg-[#0B211B]/[0.09]',
          )}
        >
          {status === 'preparing' ? (
            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden />
          ) : status === 'saved' ? (
            <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.8} aria-hidden />
          ) : (
            <Download className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
          )}
          {status === 'preparing' ? 'Preparing…' : status === 'saved' ? 'Saved to downloads' : 'Export this record'}
        </button>
      </div>
    </motion.div>
  )
}
