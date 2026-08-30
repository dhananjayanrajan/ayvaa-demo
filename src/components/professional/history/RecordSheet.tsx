import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, FileText, Loader2, Lock, ShieldCheck, X } from 'lucide-react'
import { Chip, Panel, Tile } from '@/components/phone/kit'
import { downloadSessionFile, recordToFileLines, type HistorySession } from './historyData'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'preparing' | 'saved'

type Props = {
  session: HistorySession
  onClose: () => void
}

export function RecordSheet({ session, onClose }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const exportRecord = () => {
    if (status !== 'idle') return
    setStatus('preparing')
    timers.current.push(
      setTimeout(() => {
        downloadSessionFile(
          `ayvaa-session-${session.date.replace(/\s+/g, '-').toLowerCase()}.txt`,
          recordToFileLines(session),
        )
        setStatus('saved')
      }, 1000),
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="shrink-0 px-5 pb-3.5 pt-4">
          <div aria-hidden className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
          <div className="flex items-start gap-3">
            <Tile icon={FileText} tone="ink" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="font-mono text-[10px] font-extrabold uppercase tabular-nums tracking-[0.18em] text-[#0B211B]/40">
                Session record
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
                {session.date}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09]"
              aria-label="Close record"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3.5">
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap gap-1.5">
              {session.incident ? (
                <Chip intent="warning" dot>
                  Incident raised
                </Chip>
              ) : (
                <Chip intent="success" icon={Check}>
                  All steps done
                </Chip>
              )}
              {session.note && (
                <Chip intent="info" icon={FileText}>
                  Note sent
                </Chip>
              )}
              <Chip intent="neutral" icon={Lock}>
                Sealed
              </Chip>
            </div>

            <Panel intent="neutral" className="p-4">
              <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">
                <FileText className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                What was done
              </div>
              <p className="mt-2 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/80">{session.detail}</p>
            </Panel>

            {session.note && (
              <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">
                    <ShieldCheck className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                    Your note, visible to the family
                  </div>
                  <p className="mt-2 font-serif text-pretty text-[14px] font-medium leading-relaxed text-white/90">
                    &ldquo;{session.note}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {session.incident && (
              <div className="flex items-start gap-3 rounded-2xl bg-emerald-500/[0.08] p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 pt-1 text-[12.5px] font-bold leading-snug text-emerald-800">{session.incident}</span>
                <Chip intent="success" className="shrink-0 whitespace-nowrap">
                  Resolved
                </Chip>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 px-5 pb-6 pt-3.5">
          <button
            type="button"
            onClick={exportRecord}
            disabled={status !== 'idle'}
            aria-disabled={status !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors duration-300',
              status === 'saved'
                ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
                : status === 'preparing'
                  ? 'cursor-wait bg-[#0B211B]/[0.25]'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            )}
          >
            {status === 'preparing' ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white/70" strokeWidth={2.4} aria-hidden />
            ) : status === 'saved' ? (
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
            ) : (
              <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            )}
            {status === 'preparing'
              ? 'Preparing record…'
              : status === 'saved'
                ? 'Record saved to downloads'
                : 'Export this record'}
          </button>
        </div>
      </motion.div>
    </>
  )
}
