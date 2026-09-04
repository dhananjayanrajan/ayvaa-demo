import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Loader2, Lock, Wallet } from 'lucide-react'
import AgentAvatar from '@/components/base/smoothui/agent-avatar'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Section, rise, stagger } from '@/components/base/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { PaymentHero } from '@/components/patterns/heroes/payment-hero'
import { CaptureChainCard } from '@/components/patterns/cards/capture-chain-card'
import { RetryLadderCard } from '@/components/patterns/cards/retry-ladder-card'
import { RefundCard } from '@/components/patterns/cards/refund-card'
import { paymentMeta, retryLadder } from '@/data/system/payments'
import type { PaymentPhase } from '@/data/system/payments'

const STEP_MS = 650
const RETRY_MS = 900

export function S07() {
  const { notify, pushTrail } = useDemo()
  const { navigate } = useRouter()
  const [phase, setPhase] = useState<PaymentPhase>('awaiting')
  const [doneSteps, setDoneSteps] = useState(0)
  const [failedAt, setFailedAt] = useState<number | null>(null)
  const [ladderStep, setLadderStep] = useState(0)
  const [drill, setDrill] = useState(false)
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

  const downloadReceipt = () => {
    const receipt = [
      'AYVAA PAYMENT RECEIPT',
      '================================',
      `Payment: ${paymentMeta.id}`,
      `Amount: ${paymentMeta.amount}`,
      `Session: ${paymentMeta.session}`,
      `Professional: ${paymentMeta.careName}`,
      `Family: ${paymentMeta.family}`,
      `Card: ${paymentMeta.card} ··${paymentMeta.cardLast4}`,
      'One charge linked to exactly one signed-off session',
      'Sealed to the Ayvaa immutable ledger',
    ].join('\n')
    const blob = new Blob([receipt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ayvaa-receipt-${paymentMeta.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
    notify({
      title: 'Receipt downloaded',
      body: `${paymentMeta.id} · session linkage included`,
      kind: 'ok',
    })
  }

  const run = () => {
    clearTimers()
    setFailedAt(null)
    setLadderStep(0)
    setDoneSteps(0)
    setPhase('capturing')
    notify({
      title: 'Capture started',
      body: `${paymentMeta.amount} against the signed-off visit`,
      kind: 'info',
    })

    if (drill) {
      schedule(() => setDoneSteps(2), STEP_MS)
      schedule(() => setDoneSteps(3), 2 * STEP_MS)
      schedule(() => {
        setFailedAt(2)
        setPhase('retrying')
        notify({
          title: 'Gateway did not answer',
          body: 'Card not charged · retry ladder climbing on its own',
          kind: 'warn',
        })
      }, 2 * STEP_MS + 500)

      const failT = 2 * STEP_MS + 900
      for (let k = 1; k <= retryLadder.length; k++) {
        schedule(() => setLadderStep(k), failT + k * RETRY_MS)
      }
      schedule(() => {
        setFailedAt(null)
        setPhase('captured')
        pushTrail({
          time: '4:34 PM',
          title: 'Payment captured on retry',
          body: '₹4,800 linked to the signed-off session after two retries',
          state: 'done',
        })
        notify({
          title: 'Captured on retry two',
          body: `${paymentMeta.amount} · receipt pushed`,
          kind: 'ok',
        })
      }, failT + retryLadder.length * RETRY_MS + 300)
      return
    }

    for (let i = 1; i <= 4; i++) {
      schedule(() => setDoneSteps(i), i * STEP_MS)
    }
    schedule(() => {
      setPhase('captured')
      pushTrail({
        time: '4:31 PM',
        title: 'Payment captured',
        body: '₹4,800 linked to exactly one signed-off session',
        state: 'done',
      })
      notify({
        title: 'Payment captured',
        body: `${paymentMeta.amount} · receipt pushed to Priya`,
        kind: 'ok',
      })
    }, 4 * STEP_MS + 250)
  }

  const replay = () => {
    clearTimers()
    setFailedAt(null)
    setLadderStep(0)
    setDoneSteps(0)
    setPhase('awaiting')
    notify({
      title: 'Console reset',
      body: 'The chain is ready to capture again',
      kind: 'info',
    })
  }

  const onStepTap = (title: string, detail: string) => {
    notify({ title, body: detail, kind: 'info' })
  }

  const onLadderTap = (time: string, head: string, detail: string) => {
    notify({ title: `${head} · ${time}`, body: detail, kind: 'info' })
  }

  const onRefundTap = (time: string, title: string, detail: string) => {
    notify({ title: `${title} · ${time}`, body: detail, kind: 'info' })
  }

  const busy = phase === 'capturing' || phase === 'retrying'

  const captureChip = () => {
    if (phase === 'captured')
      return <Chip intent="success" className="border-transparent">Settled</Chip>
    if (phase === 'capturing')
      return <Chip intent="warning" dot className="border-transparent">In motion</Chip>
    if (phase === 'retrying')
      return <Chip intent="warning" dot className="border-transparent">Ladder climbing</Chip>
    return <Chip intent="info">Not charged</Chip>
  }

  return (
    <Screen>
      <AppBar
        title="Money that behaves"
        subtitle="Payment capture · retry · refund"
        onBack={() => navigate('/system/s04')}
        trailing={<AgentAvatar seed="ayvaa-system" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <PaymentHero phase={phase} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Capture chain" trailing={captureChip()} />
            </motion.div>

            <motion.div variants={rise}>
              <CaptureChainCard
                phase={phase}
                doneSteps={doneSteps}
                failedAt={failedAt}
                drill={drill}
                onDrill={setDrill}
                onStepTap={onStepTap}
                onDownloadReceipt={downloadReceipt}
                onReplay={replay}
              />
            </motion.div>

            {phase === 'retrying' && (
              <RetryLadderCard current={ladderStep} onTap={onLadderTap} />
            )}

            <motion.div variants={rise}>
              <Section
                label="Refunds"
                trailing={
                  <Chip intent="success" className="border-transparent">
                    Settled
                  </Chip>
                }
              />
            </motion.div>

            <RefundCard onTap={onRefundTap} />

            <motion.div variants={rise}>
              <EndOfScroll label="End of payment console" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        {phase === 'captured' ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={replay}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70 transition-all hover:bg-[#0B211B]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            Replay capture
          </motion.button>
        ) : (
          <div className="flex flex-col gap-2">
            <motion.button
              type="button"
              whileTap={busy ? undefined : { scale: 0.97 }}
              onClick={run}
              disabled={busy}
              className={cn(
                'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
                busy
                  ? 'cursor-wait bg-[#0B211B]/[0.35]'
                  : drill
                    ? 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
              )}
            >
              {busy ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
              ) : drill ? (
                <Lock className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              ) : (
                <Wallet className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              )}
              {busy ? 'Capturing' : drill ? 'Run failure drill' : 'Capture now'}
            </motion.button>
            <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
              <Lock className="h-3 w-3" aria-hidden />
              Charges only after sign-off · refunds automatic
            </div>
          </div>
        )}
      </FootBar>
    </Screen>
  )
}
