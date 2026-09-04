import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { CalendarClock, CheckCircle2, ChevronDown, Clock, FileText, KeyRound, Loader2, Lock, ShieldCheck, Trash2 } from 'lucide-react'
import type { TileTone } from '@/components/base/phone/kit'
import { Card, Chip, Hero, Panel, Tile, TimeChip, rise } from '@/components/base/phone/kit'
import { useState } from 'react'
import { deletionQueue, retentionPolicies } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { Row } from '@/components/base/phone/row'

const cryptoRules: { icon: LucideIcon; text: string }[] = [
  { icon: Trash2, text: 'Files shredded beyond recovery' },
  { icon: KeyRound, text: 'Keys rotated after every purge' },
  { icon: Lock, text: 'Unrecoverable — by design' },
]

export function CryptoDeletionCard() {
  return (
    <motion.div variants={rise}>
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-5 shadow-[0_28px_64px_-30px_rgba(5,40,30,0.85)]">
        <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-[0_10px_20px_-12px_rgba(5,40,30,0.8)]">
              <KeyRound className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-sm font-extrabold leading-snug tracking-tight text-white">Cryptographic deletion</div>
              <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
                Nothing is recoverable — not by us, not by anyone.
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
            {cryptoRules.map((rule, i) => (
              <div key={rule.text}>
                {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
                <div className="flex items-center gap-3 px-3.5 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                    <rule.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 break-words text-[12.5px] font-semibold leading-snug text-emerald-50/80">{rule.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

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

const periodTones: TileTone[] = ['success', 'info', 'warning', 'ink']

export function RetentionPeriodsList() {
  const { notify } = useDemo()
  const [openId, setOpenId] = useState<string | null>(null)
  const [purgedTypes, setPurgedTypes] = useState<string[]>([])

  const handleSimulatePurge = (type: string) => {
    setPurgedTypes((prev) => (prev.includes(type) ? prev : [...prev, type]))
    notify({
      title: 'Purge simulated',
      body: `${type} policy executed · audit log updated`,
      kind: 'ok',
    })
  }

  return (
    <motion.div variants={rise}>
      <Card>
        {retentionPolicies.map((policy, i) => {
          const open = openId === policy.type
          const purged = purgedTypes.includes(policy.type)
          return (
            <div key={policy.type}>
              <Row
                icon={FileText}
                tone={periodTones[i % periodTones.length]}
                tileClassName="transition-transform duration-200 group-hover:scale-105"
                title={policy.type}
                titleClassName="text-[13.5px] leading-snug"
                subtitle="Auto-purge · audit logged"
                subtitleClassName="mt-0.5 text-[11px] font-medium text-[#0B211B]/45"
                expandable
                open={open}
                onToggle={() => setOpenId(open ? null : policy.type)}
                chevronVisible={false}
                expansionPadded={false}
                hoverClassName="hover:bg-[#0B211B]/[0.02]"
                trailing={
                  <span className="flex shrink-0 items-center gap-2">
                    {purged ? (
                      <Chip intent="success" icon={ShieldCheck}>
                        Purged
                      </Chip>
                    ) : (
                      <TimeChip>{policy.period}</TimeChip>
                    )}
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                      <ChevronDown className="h-4 w-4 text-[#0B211B]/25" aria-hidden />
                    </motion.span>
                  </span>
                }
                expansion={
                  <div className="px-4 pb-4">
                    <Panel intent="neutral" className="p-3.5">
                      <p className="text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/70">
                        Retained for {policy.period}. Deletion runs automatically and is logged in the audit trail.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Chip intent="success">Automated</Chip>
                        <Chip intent="neutral">Audit logged</Chip>
                        {purged && <Chip intent="success" icon={ShieldCheck}>Purged</Chip>}
                      </div>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSimulatePurge(policy.type)}
                        disabled={purged}
                        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                          purged
                            ? 'cursor-not-allowed bg-emerald-50 text-emerald-600/60'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105'
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                        <span>{purged ? 'Purge complete' : 'Simulate purge'}</span>
                      </motion.button>
                    </Panel>
                  </div>
                }
              />
            </div>
          )
        })}
      </Card>
    </motion.div>
  )
}

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
    <Hero tone="rose">
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
        <Lock className="h-3 w-3" aria-hidden />
        Data vault · lifecycle engine
      </div>
      <h2 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Deleted{' '}
        <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">means deleted</span>
      </h2>
      <p className="mt-1.5 text-pretty break-words text-[12px] font-medium leading-relaxed text-rose-100/60">
        When a period ends, data purges itself. No manual deletion exists.
      </p>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {vaultSteps.map((step, index) => {
          const Icon = step.icon
          const isLast = index === vaultSteps.length - 1
          return (
            <div
              key={step.label}
              className={`relative overflow-hidden rounded-2xl p-3 ${
                isLast ? 'bg-rose-400/[0.15]' : 'bg-white/[0.06]'
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
                      : 'bg-rose-300/10 text-rose-200/80'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
                <span
                  className={`text-[8px] font-extrabold uppercase tracking-[0.14em] ${
                    isLast ? 'text-rose-200/90' : 'text-rose-100/50'
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

      <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
            Queue in motion
          </span>
          <span className="text-[10px] font-extrabold tabular-nums text-rose-100">
            {runningCount} shredding
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rose-200/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-orange-300"
            animate={{ width: `${queueProgress * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span aria-hidden className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
          </span>
          <span className="truncate text-[11px] font-bold text-rose-100/90">
            {runningLabel}
          </span>
          <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-200/50">
            {scheduledItems.length} scheduled
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { v: retentionPolicies.length, l: 'Policies', d: 'bg-rose-300' },
          { v: queueTotal, l: 'In queue', d: 'bg-orange-300' },
          { v: runningCount, l: 'Shredding', d: 'bg-rose-400' },
        ].map((stat) => (
          <div key={stat.l} className="rounded-2xl bg-white/[0.06] p-3">
            <span className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${stat.d}`} />
              {stat.v}
            </span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-rose-200/50">{stat.l}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-rose-400/[0.12] px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-rose-100">
          <KeyRound className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
          Crypto-shredded
        </span>
        <span className="inline-flex shrink-0 items-center rounded-full bg-white/[0.07] px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-rose-100/70">
          Zero manual deletion
        </span>
      </div>
    </Hero>
  )
}
