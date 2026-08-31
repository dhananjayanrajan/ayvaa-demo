import { AnimatePresence, motion } from 'motion/react'
import {
  BellRing,
  Check,
  ClipboardCheck,
  CreditCard,
  Download,
  Lock,
  RotateCcw,
  Wallet,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { FactRows } from '@/components/phone/FactRows'
import { Row } from '@/components/phone/Row'
import { StepList } from '@/components/phone/StepList'
import { captureSteps, paymentMeta } from '@/data/system/payments'
import type { CaptureIcon, PaymentPhase } from '@/data/system/payments'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const STEP_ICONS: Record<CaptureIcon, LucideIcon> = {
  signoff: ClipboardCheck,
  auth: CreditCard,
  capture: Wallet,
  receipt: BellRing,
}

type StepVisual = 'pending' | 'active' | 'done' | 'failed'


interface CaptureChainCardProps {
  phase: PaymentPhase
  doneSteps: number
  failedAt: number | null
  drill: boolean
  onDrill: (v: boolean) => void
  onStepTap: (title: string, detail: string) => void
  onDownloadReceipt: () => void
  onReplay: () => void
}

export function CaptureChainCard({
  phase,
  doneSteps,
  failedAt,
  drill,
  onDrill,
  onStepTap,
  onDownloadReceipt,
  onReplay,
}: CaptureChainCardProps) {
  const { navigate } = useRouter()
  const busy = phase === 'capturing' || phase === 'retrying'

  const chipFor = () => {
    if (phase === 'captured') return { intent: 'success' as const, label: 'Settled', dot: false }
    if (phase === 'capturing') return { intent: 'warning' as const, label: 'In motion', dot: true }
    if (phase === 'retrying') return { intent: 'warning' as const, label: 'Retrying', dot: true }
    return { intent: 'info' as const, label: 'Not charged', dot: false }
  }
  const chip = chipFor()

  const stateFor = (i: number): StepVisual => {
    if (phase === 'awaiting') return 'pending'
    if (phase === 'captured') return 'done'
    if (failedAt !== null && i === failedAt) return 'failed'
    if (phase === 'capturing') {
      if (i < doneSteps) return 'done'
      if (i === doneSteps) return 'active'
      return 'pending'
    }
    if (phase === 'retrying') return i < 2 ? 'done' : 'pending'
    return 'pending'
  }

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
              Capture chain
            </div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Four automatic steps after the sign-off
            </div>
          </div>
          <Chip intent={chip.intent} dot={chip.dot} className="shrink-0 border-transparent">
            {chip.label}
          </Chip>
        </div>

        <StepList
          className="mt-4"
          nodeStyle="circle"
          nodeSize="sm"
          theme="light"
          steps={captureSteps.map((step, i) => {
            const state = stateFor(i)
            const Icon = STEP_ICONS[step.icon]
            const last = i === captureSteps.length - 1
            return {
              key: step.title,
              state: state === 'pending' ? 'pending' : state === 'active' ? 'active' : 'done',
              node: (
                <span
                  className={cn(
                    'relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                    state === 'done' && 'bg-emerald-500',
                    state === 'active' && 'bg-white',
                    state === 'failed' && 'bg-rose-500',
                    state === 'pending' && 'bg-white ring-1 ring-[#0B211B]/15',
                  )}
                >
                  {state === 'done' && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} aria-hidden />}
                  {state === 'active' && (
                    <>
                      <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-400/50" />
                      <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                    </>
                  )}
                  {state === 'failed' && <Lock className="h-2 w-2 text-white" strokeWidth={3.5} aria-hidden />}
                </span>
              ),
              railClassName:
                state === 'done'
                  ? 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15'
                  : 'bg-[#0B211B]/[0.1]',
              title: step.title,
              titleClassName: 'transition-colors duration-300',
              trailingTitle: (
                <span className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={cn(
                      'font-mono text-[10px] font-bold uppercase tracking-wide transition-colors duration-300',
                      state === 'pending' ? 'text-[#0B211B]/25' : 'text-[#0B211B]/40',
                    )}
                  >
                    {step.time}
                  </span>
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5 transition-colors duration-300',
                      state === 'done' && 'text-emerald-600',
                      state === 'active' && 'text-emerald-600',
                      state === 'failed' && 'text-rose-500',
                      state === 'pending' && 'text-[#0B211B]/20',
                    )}
                    strokeWidth={2.2}
                    aria-hidden
                  />
                </span>
              ),
              body: step.detail,
              bodyClassName: 'transition-colors duration-300',
              contentClassName: last ? '' : 'pb-5',
              onClick: () => onStepTap(step.title, step.detail),
            }
          })}
        />

        <div className="mt-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
            Tonight's run
          </div>
          <div className="mt-2 flex rounded-xl bg-[#0B211B]/[0.05] p-1">
            {[
              { value: false, label: 'Clean run', icon: Zap },
              { value: true, label: 'Forced failure', icon: Lock },
            ].map((opt) => {
              const active = drill === opt.value
              return (
                <button
                  key={opt.label}
                  type="button"
                  disabled={busy}
                  onClick={() => onDrill(opt.value)}
                  className={cn(
                    'relative flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                    active ? 'text-white' : 'text-[#0B211B]/50 hover:text-[#0B211B]/80',
                    busy && !active && 'opacity-40',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="drill-mode"
                      transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                      className={cn(
                        'absolute inset-0 rounded-lg',
                        drill ? 'bg-rose-600 shadow-[0_6px_14px_-6px_rgba(225,29,72,0.7)]' : 'bg-[#0B211B]',
                      )}
                    />
                  )}
                  <opt.icon className="relative h-3 w-3" strokeWidth={2.6} aria-hidden />
                  <span className="relative">{opt.label}</span>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
            {drill
              ? 'The bank will not answer at first. The ladder climbs on its own.'
              : 'The charge lands on the first attempt. The receipt goes out.'}
          </p>
        </div>

        <AnimatePresence>
          {phase === 'captured' && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-4"
            >
              <div className="rounded-3xl bg-[#0B231C] p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">
                    Receipt {paymentMeta.id}
                  </span>
                  <span className="shrink-0 font-mono text-[20px] font-black tracking-tight text-white">
                    {paymentMeta.amount}
                  </span>
                </div>
                <div aria-hidden className="my-3 h-px bg-white/[0.08]" />
<FactRows mono labelClassName="text-[10px]" rows={[{ label: "Visit", value: paymentMeta.session }]} />
                <div className="mt-2">
<FactRows mono labelClassName="text-[10px]" rows={[{ label: "Card", value: `${paymentMeta.card} ··${paymentMeta.cardLast4}` }]} />
                </div>
                <div className="mt-2">
<FactRows mono labelClassName="text-[10px]" rows={[{ label: "Charges", value: "One" }]} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">
                      Linked to the session
                    </span>
                  </span>
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={3} aria-hidden />
                </div>
              </div>

              <div className="mt-2.5 flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={onDownloadReceipt}
                  aria-label="Download payment receipt"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] px-3 py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-all hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Receipt</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={onReplay}
                  aria-label="Replay the capture"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] px-3 py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-all hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Replay</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Row
          leading={
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-mint text-brand-ink">
              <Wallet className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </span>
          }
          title="Family billing"
          subtitle="The same charge, as Priya sees it"
          trailing={<span className="shrink-0 text-[11px] font-bold text-emerald-600">Open</span>}
          surface="none"
          padding="none"
          className="mt-4 rounded-2xl bg-[#0B211B]/[0.04]"
          hoverClassName="hover:bg-[#0B211B]/[0.07]"
          showChevron={false}
          onClick={() => navigate('/patient/p23')}
        />
      </div>
    </Card>
  )
}
