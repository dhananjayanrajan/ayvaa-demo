import { motion } from 'motion/react'
import {
  CalendarClock,
  FileText,
  KeyRound,
  Lock,
  Trash2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { deletionQueue, retentionPolicies } from '@/data/seed'

const vaultSteps: { icon: LucideIcon; label: string; danger?: boolean }[] = [
  { icon: FileText, label: 'Written' },
  { icon: Lock, label: 'Sealed' },
  { icon: CalendarClock, label: 'Retained' },
  { icon: Trash2, label: 'Shredded', danger: true },
]

export function VaultHeroCard() {
  const runningItems = deletionQueue.filter((d) => d.state === 'Running')
  const scheduledItems = deletionQueue.filter((d) => d.state !== 'Running')
  const runningLabel = runningItems[0]?.label ?? 'Idle'
  const runningCount = runningItems.length
  const queueTotal = deletionQueue.length
  const queueProgress = queueTotal > 0 ? runningCount / queueTotal : 0

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-5 shadow-[0_32px_72px_-32px_rgba(2,12,24,0.9)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-indigo-400/15 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-sky-200/60">
          <Lock className="h-3 w-3" aria-hidden />
          Data vault · lifecycle engine
        </div>
        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Deleted{' '}
          <span className="bg-gradient-to-r from-sky-200 to-teal-100 bg-clip-text text-transparent">means deleted</span>
        </h2>
        <p className="mt-1 text-[12px] font-medium leading-relaxed text-sky-100/60">
          When a period ends, data purges itself. No manual deletion exists.
        </p>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {vaultSteps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === vaultSteps.length - 1
            return (
              <div
                key={step.label}
                className={`relative overflow-hidden rounded-2xl p-3 ${
                  isLast ? 'bg-rose-500/15' : 'bg-white/[0.06]'
                }`}
              >
                {isLast && runningCount > 0 && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-rose-300/25 to-transparent"
                    animate={{ x: ['-100%', '220%'] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <div className="relative flex flex-col items-center gap-1.5">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl ${
                      isLast
                        ? 'bg-rose-400/20 text-rose-200'
                        : 'bg-sky-400/20 text-sky-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </span>
                  <span
                    className={`text-[8px] font-extrabold uppercase tracking-[0.14em] ${
                      isLast ? 'text-rose-200/80' : 'text-sky-100/60'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className={`text-[10px] font-extrabold tabular-nums ${isLast ? 'text-rose-100' : 'text-white'}`}>
                    {isLast ? runningCount : index === 0 ? retentionPolicies.length : index === 1 ? retentionPolicies.length : queueTotal}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-white/[0.06] p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-sky-100/50">
              Queue in motion
            </span>
            <span className="text-[10px] font-extrabold tabular-nums text-sky-200">
              {runningCount} shredding
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sky-400/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-teal-300"
              animate={{ width: `${queueProgress * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
            </span>
            <span className="truncate text-[11px] font-bold text-sky-100/80">
              {runningLabel}
            </span>
            <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-100/40">
              {scheduledItems.length} scheduled
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { v: retentionPolicies.length, l: 'Policies', d: 'bg-sky-300' },
            { v: queueTotal, l: 'In queue', d: 'bg-amber-300' },
            { v: runningCount, l: 'Shredding', d: 'bg-rose-300' },
          ].map((stat) => (
            <div key={stat.l} className="rounded-2xl bg-white/[0.06] p-3">
              <span className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${stat.d}`} />
                {stat.v}
              </span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-sky-100/45">{stat.l}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sky-400/15 px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-sky-100">
            <KeyRound className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
            Crypto-shredded
          </span>
          <span className="inline-flex shrink-0 items-center rounded-full bg-white/[0.07] px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-sky-100/70">
            Zero manual deletion
          </span>
        </div>
      </div>
    </div>
  )
}
