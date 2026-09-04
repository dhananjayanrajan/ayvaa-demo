import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, Loader2 } from 'lucide-react'
import {
  downloadTextFile,
  reportFileLines,
  reportFileName,
  type CareReport,
} from '@/data/patientReports'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

interface DownloadReportButtonProps {
  report: CareReport
  variant?: 'primary' | 'ghost'
  label?: string
}

type Phase = 'idle' | 'working' | 'done'

export function DownloadReportButton({ report, variant = 'primary', label = 'Download report' }: DownloadReportButtonProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        downloadTextFile(reportFileLines(report), reportFileName(report))
        setPhase('done')
      }, 700),
    )
    timers.current.push(
      setTimeout(() => {
        notify({ title: 'Report saved', body: `${report.month} downloaded and the view logged in your audit record`, kind: 'ok' })
      }, 800),
    )
  }

  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
      onClick={run}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-extrabold transition-colors',
        variant === 'primary'
          ? phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-600/60 text-white'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : phase === 'done'
            ? 'bg-emerald-500/[0.14] text-emerald-700'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/40'
              : 'bg-emerald-500/[0.12] text-emerald-700',
      )}
    >
      {phase === 'idle' && (
        <>
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          {label}
        </>
      )}
      {phase === 'working' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Preparing…
        </>
      )}
      {phase === 'done' && (
        <>
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          Saved
        </>
      )}
    </motion.button>
  )
}
