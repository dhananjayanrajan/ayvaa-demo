import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, Loader2 } from 'lucide-react'
import { REPORTS, downloadAllLines, downloadTextFile } from '@/data/patientReports'
import { useDemo } from '@/lib/store'

type Phase = 'idle' | 'working' | 'done'

export function DownloadAllButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        downloadTextFile(downloadAllLines(), 'ayvaa-care-reports-archive.txt')
        setPhase('done')
      }, 800),
    )
    timers.current.push(
      setTimeout(() => {
        notify({ title: 'Archive saved', body: `All ${REPORTS.length} sealed reports downloaded as one file`, kind: 'ok' })
      }, 900),
    )
  }

  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.9 } : undefined}
      onClick={run}
      disabled={phase !== 'idle'}
      aria-label={phase === 'done' ? 'Archive saved' : 'Download all reports'}
      className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${
        phase === 'done'
          ? 'bg-emerald-500/[0.14] text-emerald-700'
          : phase === 'working'
            ? 'cursor-wait bg-[#0B211B]/[0.03] text-[#0B211B]/40'
            : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60 hover:bg-[#0B211B]/[0.09]'
      }`}
    >
      {phase === 'idle' && <Download className="size-[18px]" strokeWidth={2.2} aria-hidden />}
      {phase === 'working' && <Loader2 className="size-[18px] animate-spin" aria-hidden />}
      {phase === 'done' && <Check className="size-[18px]" strokeWidth={2.6} aria-hidden />}
    </motion.button>
  )
}
