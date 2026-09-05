import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, Loader2, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDemo } from '@/lib/store'
import { downloadTextFile, reportFileLines, reportFileName, type CareReport } from '@/data/patientReports'
import { buildStatementLines, downloadStatement, type Receipt } from '@/data/patientBilling'
import type { CallPhase } from './types'

interface ConnectButtonProps {
  icon: LucideIcon
  label: string
  workingLabel: string
  doneLabel: string
  variant?: 'soft' | 'solid'
  notifyTitle: string
  notifyBody: string
}

export function ConnectButton({ icon: Icon, label, workingLabel, doneLabel, variant = 'soft', notifyTitle, notifyBody }: ConnectButtonProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 900))
    timers.current.push(setTimeout(() => notify({ title: notifyTitle, body: notifyBody, kind: 'ok' }), 1000))
  }
  return (
    <motion.button type="button" whileTap={phase === 'idle' ? { scale: 0.985 } : undefined} onClick={run} disabled={phase !== 'idle'} aria-disabled={phase !== 'idle'} className={cn('flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-bold transition-colors', variant === 'solid' ? phase === 'done' ? 'bg-emerald-600 text-white' : phase === 'working' ? 'cursor-wait bg-emerald-600/60 text-white' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]' : phase === 'done' ? 'bg-emerald-500/[0.16] text-emerald-800' : phase === 'working' ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/50' : 'bg-emerald-500/[0.12] text-emerald-700')}>
      {phase === 'idle' && <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      {phase === 'idle' && <span className="truncate">{label}</span>}
      {phase === 'working' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {phase === 'working' && <span className="truncate">{workingLabel}</span>}
      {phase === 'done' && <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />}
      {phase === 'done' && <span className="truncate">{doneLabel}</span>}
    </motion.button>
  )
}

export function CallButton({ name, light = false, label = 'Call' }: { name: string; light?: boolean; label?: string }) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<CallPhase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  function call() {
    if (phase !== 'idle') return
    setPhase('connecting')
    timers.current.push(setTimeout(() => { setPhase('connected'); notify({ title: `Calling ${name}`, body: 'Connected over the secure Ayvaa line, number never shared', kind: 'info' }) }, 900))
  }
  const styles: Record<CallPhase, { className: string }> = {
    idle: { className: 'bg-white/[0.1] text-white hover:bg-white/[0.16]' },
    connecting: { className: 'cursor-wait bg-white/[0.16] text-white/80' },
    connected: { className: 'bg-emerald-500/[0.2] text-emerald-100' },
  }
  return (
    <motion.button type="button" whileTap={phase === 'idle' ? { scale: 0.97 } : undefined} onClick={phase === 'idle' ? call : undefined} disabled={phase !== 'idle'} aria-disabled={phase !== 'idle'} className={cn('flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3 text-[12.5px] font-bold transition-colors duration-300', light && phase === 'idle' && 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.08]', !light && styles[phase].className)}>
      {phase === 'connecting' ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden /> : phase === 'connected' ? <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden /> : <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      <span className="truncate">{phase === 'idle' ? label : phase === 'connecting' ? 'Connecting' : 'On the call'}</span>
    </motion.button>
  )
}

export function DownloadReportButton({ report, variant = 'primary', label = 'Download report' }: { report: CareReport; variant?: 'primary' | 'ghost'; label?: string }) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => { downloadTextFile(reportFileLines(report), reportFileName(report)); setPhase('done') }, 700))
    timers.current.push(setTimeout(() => notify({ title: 'Report saved', body: `${report.month} downloaded and the view logged in your audit record`, kind: 'ok' }), 800))
  }
  return (
    <motion.button type="button" whileTap={phase === 'idle' ? { scale: 0.985 } : undefined} onClick={run} disabled={phase !== 'idle'} aria-disabled={phase !== 'idle'} className={cn('flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-extrabold transition-colors', variant === 'primary' ? phase === 'done' ? 'bg-emerald-600 text-white' : phase === 'working' ? 'cursor-wait bg-emerald-600/60 text-white' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]' : phase === 'done' ? 'bg-emerald-500/[0.14] text-emerald-700' : phase === 'working' ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/40' : 'bg-emerald-500/[0.12] text-emerald-700')}>
      {phase === 'idle' && <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      {phase === 'idle' && <span>{label}</span>}
      {phase === 'working' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {phase === 'working' && <span>Preparing…</span>}
      {phase === 'done' && <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />}
      {phase === 'done' && <span>Saved</span>}
    </motion.button>
  )
}

export function StatementButton({ receipts, variant = 'primary' }: { receipts: Receipt[]; variant?: 'primary' | 'ghost' }) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => { downloadStatement(buildStatementLines(receipts)); setPhase('done') }, 800))
    timers.current.push(setTimeout(() => notify({ title: 'Statement saved', body: 'March statement downloaded and the export logged', kind: 'ok' }), 900))
  }
  return (
    <motion.button type="button" whileTap={phase === 'idle' ? { scale: 0.985 } : undefined} onClick={run} disabled={phase !== 'idle'} aria-disabled={phase !== 'idle'} className={cn('flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-extrabold transition-colors', variant === 'primary' ? phase === 'done' ? 'bg-emerald-600 text-white' : phase === 'working' ? 'cursor-wait bg-emerald-600/60 text-white' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]' : phase === 'done' ? 'bg-emerald-500/[0.14] text-emerald-700' : phase === 'working' ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/40' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.09]')}>
      {phase === 'working' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : phase === 'done' ? <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden /> : <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      <span className="truncate">{phase === 'working' ? 'Preparing statement…' : phase === 'done' ? 'Statement saved' : 'Download March statement'}</span>
    </motion.button>
  )
}
