import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Check, CheckCircle2, CheckCheck, Download, Eye,
  Mail, MailCheck, Plus, RefreshCw, Save, ShieldCheck, UserCheck, UserRound, Wallet, X, Phone,
  Loader2, Share2, ListChecks, RotateCcw,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LifecycleButton, IconLifecycleButton, QuietLifecycleButton, StaticButton } from '@/components/base/phone/lifecycle-button'
import { cn } from '@/lib/utils'
import { useDemo } from '@/lib/store'
import { summaryShareText } from '@/data/patientVisitSummary'
import { REPORTS, downloadAllLines, downloadTextFile, reportFileLines, reportFileName, type CareReport } from '@/data/patientReports'
import { buildStatementLines, downloadStatement, type Receipt } from '@/data/patientBilling'
import { guardian } from '@/data/seed'

export type EmailSendState = 'idle' | 'working' | 'done'
export type SeenState = 'idle' | 'working' | 'done'
export type SendState = 'idle' | 'working' | 'done'
export type SignInState = 'idle' | 'working' | 'done'
export type VerifyState = 'idle' | 'working' | 'done'
export type ContinueState = 'idle' | 'working' | 'done'
export type ExportStatus = 'idle' | 'preparing' | 'saved'
export type SaveStatus = 'idle' | 'saving' | 'saved'
export type WithdrawStatus = 'idle' | 'processing' | 'confirmed'
export type SignOffStatus = 'idle' | 'signing' | 'signed'
export type CallState = 'idle' | 'working' | 'done'

export function EmailCodeButton({ state, onPress }: { state: EmailSendState; onPress: () => void }) {
  return <LifecycleButton phase={state} idleIcon={Mail} idleLabel="Email me the code" workingLabel="Sending to your inbox" doneLabel="Code sent by email" onPress={onPress} />
}

export function MarkSeenButton({ state, onPress }: { state: SeenState; onPress: () => void }) {
  return <LifecycleButton phase={state} idleIcon={Eye} idleLabel="Open the full record" workingLabel="Fetching the record" doneLabel="Opened and reviewed" onPress={onPress} />
}

export function SendResetButton({ state, onPress }: { state: SendState; onPress: () => void }) {
  return <LifecycleButton phase={state} idleIcon={MailCheck} idleLabel="Send reset link" workingLabel="Sending your link" doneLabel="Link sent" onPress={onPress} />
}

export function SignInButton({ ready, state, onPress }: { ready: boolean; state: SignInState; onPress: () => void }) {
  return <LifecycleButton phase={state} gated={!ready} idleIcon={ArrowRight} idleLabel={ready ? 'Sign in' : 'Enter your password to continue'} workingLabel="Signing you in" doneLabel="Signed in" onPress={onPress} />
}

export function VerifyButton({ ready, state, onPress }: { ready: boolean; state: VerifyState; onPress: () => void }) {
  return <LifecycleButton phase={state} gated={!ready} idleIcon={BadgeCheck} idleLabel={ready ? 'Verify and continue' : 'Enter all six digits to continue'} workingLabel="Matching your code" doneLabel="Phone verified" onPress={onPress} />
}

export function ContinueButton({ blocked, state, onPress }: { blocked: boolean; state: ContinueState; onPress: () => void }) {
  return <LifecycleButton phase={blocked ? 'idle' : state} gated={blocked} idleIcon={ArrowRight} idleLabel={blocked ? 'Pick at least one day to continue' : 'Continue to matching'} workingLabel="Saving your details" doneLabel="Details saved" onPress={onPress} />
}

export function ExportHistoryButton({ status, onPress }: { status: ExportStatus; onPress: () => void }) {
  return <LifecycleButton phase={status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working'} idleIcon={Download} idleLabel="Export session records" workingLabel="Preparing export…" doneLabel="Export saved to downloads" onPress={onPress} />
}

export function SaveAvailabilityButton({ label, status, disabled, onPress }: { label: string; status: SaveStatus; disabled: boolean; onPress: () => void }) {
  return <LifecycleButton phase={status === 'saving' ? 'working' : status === 'saved' ? 'done' : 'idle'} gated={disabled && status === 'idle'} idleIcon={Save} idleLabel={label} workingLabel="Saving…" doneLabel="Saved · live now" onPress={onPress} />
}

export function SaveSheetButton({ label, disabled, status, onPress }: { label: string; disabled: boolean; status: SaveStatus; onPress: () => void }) {
  return <LifecycleButton phase={status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working'} className="mt-auto" gated={disabled && status === 'idle'} idleIcon={CheckCircle2} idleLabel={label} workingLabel="Saving…" doneLabel="Saved · sealed at sign off" onPress={onPress} />
}

export function SendLinkButton({ state, expired, onPress }: { state: SendState; expired: boolean; onPress: () => void }) {
  return <LifecycleButton phase={state} idleIcon={MailCheck} idleLabel={expired ? 'Send a new link' : 'Send reset link'} workingLabel="Generating your link" doneLabel="Link sent" onPress={onPress} />
}

export function WithdrawButton({ amount, status, onPress }: { amount: string; status: WithdrawStatus; onPress: () => void }) {
  return <LifecycleButton phase={status === 'processing' ? 'working' : status === 'confirmed' ? 'done' : 'idle'} tone="accent" idleIcon={Wallet} idleLabel={`Withdraw ${amount} to bank`} workingLabel="Processing…" doneLabel="Withdrawal confirmed" onPress={onPress} />
}

export function CaseAssignAction({ selectedId, assigning, assigned, onAssign }: { selectedId: string; assigning: boolean; assigned: boolean; onAssign: () => void }) {
  return <LifecycleButton phase={assigned ? 'done' : assigning ? 'working' : 'idle'} gated={!selectedId && !assigned && !assigning} idleIcon={UserRound} idleLabel="Assign investigator" workingLabel="Assigning…" doneLabel="Investigator assigned" onPress={onAssign} />
}

export function ReportSaveAction({ isValid, saveState, onSave }: { isValid: boolean; saveState: 'idle' | 'working' | 'done'; onSave: () => void }) {
  return <LifecycleButton phase={saveState} gated={!isValid && saveState === 'idle'} idleIcon={Plus} idleLabel={isValid ? 'Save report' : 'Select metrics to save'} workingLabel="Saving…" doneLabel="Report saved" onPress={onSave} />
}

export function SignOffButton({ remaining, status, onPress }: { remaining: number; status: SignOffStatus; onPress: () => void }) {
  return <LifecycleButton phase={status === 'signing' ? 'working' : status === 'signed' ? 'done' : 'idle'} gated={remaining > 0 && status === 'idle'} idleIcon={ShieldCheck} idleLabel={remaining > 0 ? `${remaining} step${remaining === 1 ? '' : 's'} left` : 'Complete and sign off'} workingLabel="Signing off…" doneLabel="Signed off" onPress={onPress} />
}

export function PrimaryAction({ ready, onPress }: { ready: boolean; onPress: () => void }) {
  return <LifecycleButton phase="idle" gated={!ready} idleIcon={ready ? ArrowRight : ListChecks} idleLabel={ready ? 'Review & create' : 'Complete your details to continue'} workingLabel="" doneLabel="" onPress={onPress} />
}

export function MarkAllReadButton({ unreadCount, onPress }: { unreadCount: number; onPress: () => void }) {
  const done = unreadCount === 0
  return <IconLifecycleButton phase={done ? 'done' : 'idle'} icon={CheckCheck} rounded="xl" revert={false} ariaLabel={done ? 'All caught up' : 'Mark all read'} onPress={done ? undefined : onPress} />
}

export function ShareButton() {
  const [phase, setPhase] = useState<'idle' | 'done'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const share = () => {
    if (phase !== 'idle') return
    setPhase('done')
    timer.current = setTimeout(() => setPhase('idle'), 1800)
  }
  return <IconLifecycleButton phase={phase} icon={Share2} revert ariaLabel={phase === 'done' ? 'Booking summary copied' : 'Share booking summary'} onPress={share} />
}

export function ShareSummaryButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const share = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(setTimeout(() => { void navigator.clipboard?.writeText(summaryShareText()); notify({ title: 'Summary copied', body: 'Visit record copied to clipboard', kind: 'ok' }) }, 1200))
    timers.current.push(setTimeout(() => setPhase('idle'), 2600))
  }
  return <IconLifecycleButton phase={phase} icon={Share2} revert ariaLabel="Share visit summary" onPress={share} />
}

export function DownloadAllButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => { downloadTextFile(downloadAllLines(), 'ayvaa-care-reports-archive.txt'); setPhase('done') }, 800))
    timers.current.push(setTimeout(() => notify({ title: 'Archive saved', body: `All ${REPORTS.length} sealed reports downloaded as one file`, kind: 'ok' }), 900))
  }
  return <IconLifecycleButton phase={phase} icon={Download} revert={false} ariaLabel={phase === 'done' ? 'Archive saved' : 'Download all reports'} onPress={run} />
}

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

export type CallPhase = 'idle' | 'connecting' | 'connected'

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

export function ExportActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={onClick} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)]">
      <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      {label}
    </motion.button>
  )
}

export function SentActions({ callState, onCall }: { callState: CallState; onCall: () => void }) {
  return (
    <div className="mt-3.5 flex gap-2.5">
      <motion.a href={`mailto:${guardian.email}`} whileTap={{ scale: 0.97 }} className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-bold text-[#0B211B]/75">
        <RotateCcw className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Open mail app</span>
      </motion.a>
      <QuietLifecycleButton phase={callState} idleIcon={Phone} idleLabel="Call instead" workingLabel="Requesting" doneLabel="Call requested" doneTone="tint" onPress={onCall} />
    </div>
  )
}

export function CommandActions({ changed, onReset, onSave }: { changed: boolean; onReset: () => void; onSave: () => void }) {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onReset} className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75"><RefreshCw className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />Reset</button>
      <button type="button" onClick={onSave} disabled={!changed} className={cn('flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', changed ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30')}><Check className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />Save dashboard</button>
    </div>
  )
}

export function IncidentActions({ onEscalate, onClose }: { onEscalate: () => void; onClose: () => void }) {
  return (
    <div className="flex gap-2.5">
      <StaticButton tone="danger" icon={ArrowUpRight} onClick={onEscalate}>Escalate higher</StaticButton>
      <StaticButton tone="success" icon={CheckCircle2} onClick={onClose}>Close incident</StaticButton>
    </div>
  )
}

export function ApplicationDecision({ decision, working, onDecide }: { decision: 'approved' | 'rejected' | null; working: boolean; onDecide: (approve: boolean) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button type="button" onClick={() => onDecide(false)} disabled={working || decision !== null} className={cn('flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', decision === 'rejected' ? 'bg-rose-500/[0.1] text-rose-700' : 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]', (working || decision) && 'cursor-not-allowed opacity-50')}>
          {working && decision === null ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <X className="h-4 w-4 shrink-0" strokeWidth={2.4} />} Reject
        </button>
        <button type="button" onClick={() => onDecide(true)} disabled={working || decision !== null} className={cn('flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', decision === 'approved' ? 'bg-emerald-500/[0.1] text-emerald-700' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]', (working || decision) && 'cursor-not-allowed opacity-50')}>
          {working && decision === null ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} />} Approve
        </button>
      </div>
      {decision && <p className="text-center text-[10px] font-bold text-[#0B211B]/50">Decision recorded · audit log updated</p>}
    </div>
  )
}
