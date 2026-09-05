import { motion } from 'motion/react'
import {
  ArrowUpRight, Check, CheckCircle2, Download, Loader2, Phone, RefreshCw, RotateCcw, UserCheck, X,
} from 'lucide-react'
import { QuietLifecycleButton, StaticButton } from '@/components/base/phone/lifecycle-button'
import { cn } from '@/lib/utils'
import { guardian } from '@/data/seed'
import type { CallState } from './types'

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
