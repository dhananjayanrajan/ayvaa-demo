import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronRight, FileClock, ScrollText, Wallet } from 'lucide-react'
import AgentAvatar from '@/components/base/smoothui/agent-avatar'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, Screen } from '@/components/base/phone/screen'
import { Card, Chip, Panel, Section, Tile, rise, stagger } from '@/components/base/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { TransactionHero } from '@/components/patterns/heroes/transaction-hero'
import { TransactionStepList } from '@/components/patterns/lists/transaction-step-list'
import { FailureDrillCard } from '@/components/patterns/cards/failure-drill-card'
import { FailureDrillSheet } from '@/components/patterns/sheets/failure-drill-sheet'
import { RollbackTraceCard } from '@/components/patterns/cards/rollback-trace-card'
import { PostCommitRetryCard } from '@/components/patterns/cards/post-commit-retry-card'
import { transactionSteps } from '@/data/system/transactions'
import type {
  DrillRun,
  PostCommitState,
  StepVisual,
  TransactionPhase,
  TransactionStep,
} from '@/data/system/transactions'

const WRITE_MS = 850
const FAIL_MS = 750
const UNDO_MS = 620

const POST_COMMIT_COPY: Record<PostCommitState, { title: string; body: string; kind: 'ok' | 'warn' | 'info' }> = {
  pending: {
    title: 'Waiting for commit',
    body: 'Offers emit only after the transaction seals',
    kind: 'info',
  },
  emitting: {
    title: 'Emitting offers',
    body: 'Five licensed nurses near the care address · expiring 9:45 AM',
    kind: 'info',
  },
  done: {
    title: 'Offers emitted',
    body: 'Dispatch round one · expiry 9:45 AM · availability re-checked on acceptance',
    kind: 'ok',
  },
  failed: {
    title: 'Dispatch delivery failed',
    body: 'Retry ladder active · the booking stays sealed',
    kind: 'warn',
  },
}

export function S04() {
  const { notify, pushTrail } = useDemo()
  const { navigate } = useRouter()
  const [phase, setPhase] = useState<TransactionPhase>('idle')
  const [failureAt, setFailureAt] = useState(0)
  const [writingStep, setWritingStep] = useState<number | null>(null)
  const [failedAt, setFailedAt] = useState(0)
  const [undoneCount, setUndoneCount] = useState(0)
  const [postCommitState, setPostCommitState] = useState<PostCommitState>('pending')
  const [lastRun, setLastRun] = useState<DrillRun | null>(null)
  const [drillOpen, setDrillOpen] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const run = () => {
    clearTimers()
    setFailedAt(0)
    setUndoneCount(0)
    setWritingStep(null)
    setPostCommitState('pending')
    setLastRun(null)
    setPhase('running')

    const fail = failureAt
    let t = 250

    for (let i = 1; i <= 4; i++) {
      schedule(() => setWritingStep(i), t)
      t += WRITE_MS
      if (fail === i) {
        schedule(() => {
          setWritingStep(null)
          setFailedAt(i)
          setPhase('failing')
        }, t)
        t += FAIL_MS
        schedule(() => setPhase('rolling-back'), t)
        const undos = i - 1
        for (let k = 1; k <= undos; k++) {
          schedule(() => setUndoneCount(k), t + k * UNDO_MS)
        }
        t += undos * UNDO_MS + 250
        schedule(() => {
          setPhase('rolled-back')
          setLastRun({ failureAt: fail, outcome: 'rolled-back' })
          notify({
            title: 'Transaction rolled back',
            body: '240 ms · nothing written · attempt logged',
            kind: 'error',
          })
        }, t)
        return
      }
    }

    schedule(() => {
      setWritingStep(null)
      setPhase('committed')
    }, t)
    t += 350
    schedule(() => setPostCommitState('emitting'), t)
    if (fail === 5) {
      t += 1100
      schedule(() => {
        setPostCommitState('failed')
        setLastRun({ failureAt: fail, outcome: 'dispatch-failed' })
        notify({
          title: 'Dispatch failed after commit',
          body: 'Booking stays sealed · delivery retries automatically',
          kind: 'warn',
        })
      }, t)
    } else {
      t += 1000
      schedule(() => {
        setPostCommitState('done')
        setLastRun({ failureAt: fail, outcome: 'committed' })
        pushTrail({
          time: '9:38 AM',
          title: 'Booking sealed',
          body: 'Booking and recurring series written in one safe step',
          state: 'done',
        })
        notify({
          title: 'Transaction committed',
          body: '94 ms · booking sealed · offers emitted',
          kind: 'ok',
        })
      }, t)
    }
  }

  const stepStateFor = (id: number): StepVisual => {
    if (phase === 'idle') return 'pending'
    if (phase === 'committed') return 'done'
    if (phase === 'running') {
      if (writingStep === null) return 'pending'
      if (id < writingStep) return 'done'
      if (id === writingStep) return 'writing'
      return 'pending'
    }
    if (failedAt > 0) {
      if (id === failedAt) return 'failed'
      if (id < failedAt) {
        const floor = phase === 'rolled-back' ? 1 : failedAt - undoneCount
        return id >= floor ? 'undone' : 'done'
      }
      return 'pending'
    }
    return 'pending'
  }

  const stepStates = transactionSteps.map((s) => stepStateFor(s.id))
  const doneWrites = stepStates.filter((s) => s === 'done').length
  const busy = phase === 'running' || phase === 'failing' || phase === 'rolling-back'

  const onStepTap = (step: TransactionStep, state: StepVisual) => {
    if (state === 'done')
      notify({ title: step.title, body: `${step.table} · ${step.body}`, kind: 'ok' })
    else if (state === 'writing')
      notify({ title: `${step.title} · writing`, body: `${step.table} · mid-transaction`, kind: 'info' })
    else if (state === 'failed')
      notify({
        title: `${step.title} failed`,
        body: `Write to ${step.table} rejected · rollback begins`,
        kind: 'error',
      })
    else if (state === 'undone')
      notify({ title: step.undoTitle, body: step.undoBody, kind: 'warn' })
    else
      notify({ title: step.title, body: `Queued behind the current write · ${step.table}`, kind: 'info' })
  }

  const onPostCommitTap = () => {
    const copy = POST_COMMIT_COPY[postCommitState]
    notify({ title: copy.title, body: copy.body, kind: copy.kind })
  }

  const writesChip = () => {
    if (phase === 'committed')
      return <Chip intent="success" className="border-transparent">4 of 4 sealed</Chip>
    if (phase === 'rolled-back')
      return <Chip intent="danger" className="border-transparent">0 of 4</Chip>
    if (phase === 'failing' || phase === 'rolling-back')
      return <Chip intent="danger" dot className="border-transparent">unwinding</Chip>
    if (phase === 'running')
      return <Chip intent="warning" dot className="border-transparent">{doneWrites} of 4</Chip>
    return <Chip intent="info">4 writes</Chip>
  }

  return (
    <Screen>
      <AppBar
        title="One booking, one safe write"
        subtitle="Transactional booking · commit or roll back"
        trailing={<AgentAvatar seed="ayvaa-system" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <TransactionHero phase={phase} doneWrites={doneWrites} failedStep={failedAt} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Transaction writes" trailing={writesChip()} />
            </motion.div>

            <motion.div variants={rise}>
              <TransactionStepList
                stepStates={stepStates}
                postCommitState={postCommitState}
                onStepTap={onStepTap}
                onPostCommitTap={onPostCommitTap}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Failure drill"
                trailing={
                  lastRun ? (
                    <Chip
                      intent={
                        lastRun.outcome === 'committed'
                          ? 'success'
                          : lastRun.outcome === 'dispatch-failed'
                            ? 'warning'
                            : 'danger'
                      }
                      className="border-transparent"
                    >
                      {lastRun.outcome === 'committed'
                        ? 'Last run committed'
                        : lastRun.outcome === 'dispatch-failed'
                          ? 'Last run · dispatch failed'
                          : 'Last run rolled back'}
                    </Chip>
                  ) : failureAt > 0 ? (
                    <Chip intent="danger" dot className="border-transparent">
                      Fails at step {failureAt}
                    </Chip>
                  ) : (
                    <Chip intent="info">No failure armed</Chip>
                  )
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <FailureDrillCard
                selected={failureAt}
                phase={phase}
                lastRun={lastRun}
                onOpen={() => setDrillOpen(true)}
              />
            </motion.div>

            {phase === 'rolled-back' && <RollbackTraceCard failedAt={failedAt} />}
            {postCommitState === 'failed' && <PostCommitRetryCard />}

            <motion.div variants={rise}>
              <Section label="Deeper records" trailing={<Chip intent="info">Audit tools</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate('/system/s06')}
                  className="group flex w-full items-center gap-3 px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500/40"
                >
                  <Tile icon={FileClock} tone="ink" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                      Access log & diff viewer
                    </span>
                    <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/55">
                      Every read, change and seal · proof you can replay
                    </span>
                  </span>
                  <Chip intent="info" className="border-transparent">
                    Open
                  </Chip>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
                </motion.button>

                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate('/system/s07')}
                  className="group flex w-full items-center gap-3 px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500/40"
                >
                  <Tile icon={Wallet} tone="ink" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                      Payment status & refunds
                    </span>
                    <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/55">
                      Capture, retry and the refund guarantee · live
                    </span>
                  </span>
                  <Chip intent="info" className="border-transparent">
                    Open
                  </Chip>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ScrollText} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Half a booking is worse than none. Ayvaa commits everything at once or nothing at all — a family can never hold a series without its sessions, or a receipt without care.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of transaction console" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <FailureDrillSheet
        open={drillOpen}
        onClose={() => setDrillOpen(false)}
        selected={failureAt}
        onSelect={(v) => {
          if (!busy) setFailureAt(v)
        }}
        phase={phase}
        lastRun={lastRun}
        onRun={() => {
          setDrillOpen(false)
          run()
        }}
      />
    </Screen>
  )
}
