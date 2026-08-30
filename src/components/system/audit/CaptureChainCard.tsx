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

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/45">
        {label}
      </span>
      <span className="min-w-0 truncate text-right font-mono text-[12.5px] font-bold text-emerald-50/90">
        {value}
      </span>
    </div>
  )
}

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

        <div className="mt-4">
          {captureSteps.map((step, i) => {
            const state = stateFor(i)
            const Icon = STEP_ICONS[step.icon]
            const last = i === captureSteps.length - 1
            return (
              <div key={step.title} className="flex gap-3">
                <div className="flex flex-col items-center">
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
                  {!last && (
                    <span
                      aria-hidden
                      className={cn(
                        'my-1 w-px flex-1',
                        state === 'done'
                          ? 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15'
                          : 'bg-[#0B211B]/[0.1]',
                      )}
                    />
                  )}
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onStepTap(step.title, step.detail)}
                  className={cn('min-w-0 flex-1 text-left outline-none focus-visible:outline-none', !last && 'pb-5')}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'text-[13.5px] font-bold tracking-tight transition-colors duration-300',
                        state === 'pending' ? 'text-[#0B211B]/35' : 'text-[#0B211B]',
                      )}
                    >
                      {step.title}
                    </span>
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
                  </div>
                  <p
                    className={cn(
                      'mt-1 text-pretty text-[11px] font-medium leading-relaxed transition-colors duration-300',
                      state === 'pending' ? 'text-[#0B211B]/30' : 'text-[#0B211B]/55',
                    )}
                  >
                    {step.detail}
                  </p>
                </motion.button>
              </div>
            )
          })}
        </div>

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
                <ReceiptRow label="Visit" value={paymentMeta.session} />
                <div className="mt-2">
                  <ReceiptRow label="Card" value={`${paymentMeta.card} ··${paymentMeta.cardLast4}`} />
                </div>
                <div className="mt-2">
                  <ReceiptRow label="Charges" value="One" />
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

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={() => navigate('/patient/p23')}
          aria-label="Open family billing history"
          className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5 text-left outline-none transition-colors hover:bg-[#0B211B]/[0.07] focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-mint text-brand-ink">
            <Wallet className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
              Family billing
            </span>
            <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/55">
              The same charge, as Priya sees it
            </span>
          </span>
          <span className="shrink-0 text-[11px] font-bold text-emerald-600">Open</span>
        </motion.button>
      </div>
    </Card>
  )
}
