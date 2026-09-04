import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, Loader2 } from 'lucide-react'
import { buildStatementLines, downloadStatement, type Receipt } from '@/data/patientBilling'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

interface StatementButtonProps {
  receipts: Receipt[]
  variant?: 'primary' | 'ghost'
}

export function StatementButton({ receipts, variant = 'primary' }: StatementButtonProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        downloadStatement(buildStatementLines(receipts))
        setPhase('done')
      }, 800),
    )
    timers.current.push(
      setTimeout(
        () => notify({ title: 'Statement saved', body: 'March statement downloaded and the export logged', kind: 'ok' }),
        900,
      ),
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
              : 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.09]',
      )}
    >
      {phase === 'working' ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span className="truncate">Preparing statement…</span>
        </>
      ) : phase === 'done' ? (
        <>
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          <span className="truncate">Statement saved</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Download March statement</span>
        </>
      )}
    </motion.button>
  )
}
