import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Ban, Check, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import { rise } from '@/components/phone/kit'
import { consentWithdrawal } from '@/data/seed'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface WithdrawalCardProps {
  notify: NotifyFn
}

type SealState = 'idle' | 'sealing' | 'sealed'

const checklistDetails = [
  {
    label: 'Care stopped',
    state: consentWithdrawal.time,
    done: true,
    detail: 'All scheduled visits cancelled. Professionals notified via app and SMS.',
  },
  {
    label: 'Family informed',
    state: 'Immediate',
    done: true,
    detail: 'Guardian and emergency contact received push notification and call.',
  },
  {
    label: 'Seal the record',
    state: 'Pending your confirm',
    done: false,
    detail: 'Final entry will be written to the immutable audit record.',
  },
]

export function WithdrawalCard({ notify }: WithdrawalCardProps) {
  const [sealState, setSealState] = useState<SealState>('idle')
  const [confirmedReady, setConfirmedReady] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const closure = checklistDetails.map((item) => ({
    ...item,
    done: item.label === 'Seal the record' ? sealState === 'sealed' : item.done,
    state: item.label === 'Seal the record' && sealState === 'sealed' ? 'Sealed' : item.state,
  }))

  const handleSeal = () => {
    if (sealState !== 'idle' || !confirmedReady) return
    setSealState('sealing')
    setTimeout(() => {
      setSealState('sealed')
      notify({ title: 'Checklist confirmed', body: 'Closure checklist completed · record sealed', kind: 'ok' })
    }, 1200)
  }

  return (
    <motion.div variants={rise}>
      <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
        <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
        <div className="relative p-5">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Ban className="h-3 w-3" aria-hidden />
            Withdrawal · consent revoked
          </div>
          <h3 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {consentWithdrawal.name}{' '}
            <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">withdrew consent</span>
          </h3>
          <p className="mt-1.5 text-pretty break-words text-[12px] font-medium leading-relaxed text-rose-100/60">
            {consentWithdrawal.body}
          </p>

          <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-400/[0.12] px-3.5 py-3">
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
            </span>
            <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-100">
              Care paused instantly
            </span>
            <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-rose-200/70">
              {consentWithdrawal.time}
            </span>
          </div>

          <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">What happens now</div>
            <p className="mt-1.5 break-words text-[12.5px] font-medium leading-relaxed text-white/80">
              {consentWithdrawal.option}
            </p>
          </div>

          <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">Closure checklist</div>
            <div className="mt-3 flex flex-col">
              {closure.map((c, i) => {
                const last = i === closure.length - 1
                const isExpanded = expandedItem === c.label
                return (
                  <div key={c.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {c.done ? (
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-white">
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                        </span>
                      ) : (
                        <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                          <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/40" />
                          <span className="relative h-2.5 w-2.5 rounded-full bg-rose-400" />
                        </span>
                      )}
                      {!last && <span aria-hidden className="my-1 w-px flex-1 bg-white/15" />}
                    </div>
                    <div className={last ? 'min-w-0 flex-1 pb-0.5' : 'min-w-0 flex-1 pb-4'}>
                      <motion.button
                        type="button"
                        onClick={() => setExpandedItem(isExpanded ? null : c.label)}
                        className="flex w-full items-start justify-between gap-2 text-left focus-visible:outline-none"
                      >
                        <span className="min-w-0">
                          <span className="block break-words text-[13px] font-bold leading-snug tracking-tight text-white">{c.label}</span>
                          <span className="mt-0.5 block break-words text-[10px] font-bold uppercase tracking-[0.12em] text-rose-100/45">{c.state}</span>
                        </span>
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                          <ChevronDown className="h-4 w-4 shrink-0 text-rose-100/40" aria-hidden />
                        </motion.span>
                      </motion.button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2 break-words text-[11.5px] font-medium leading-relaxed text-rose-100/60">{c.detail}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <button
                type="button"
                onClick={() => setConfirmedReady((v) => !v)}
                className={`relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  confirmedReady ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-rose-200/40 bg-transparent'
                }`}
                aria-checked={confirmedReady}
                role="checkbox"
                aria-label="Confirm ready to seal"
              >
                {confirmedReady && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
              </button>
              <span className="break-words text-[11px] font-semibold leading-relaxed text-rose-100/70">
                I confirm all details are accurate and the record is ready to be sealed.
              </span>
            </label>
          </div>

          <motion.button
            type="button"
            whileHover={sealState === 'idle' && confirmedReady ? { scale: 1.02 } : undefined}
            whileTap={sealState === 'idle' && confirmedReady ? { scale: 0.97 } : undefined}
            onClick={handleSeal}
            disabled={sealState !== 'idle' || !confirmedReady}
            className={`mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
              sealState === 'sealed'
                ? 'bg-emerald-600/90 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.6)]'
                : sealState === 'sealing'
                  ? 'cursor-wait bg-emerald-700/80'
                  : confirmedReady
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105'
                    : 'cursor-not-allowed bg-white/10 text-rose-100/40'
            }`}
          >
            <AnimatePresence mode="wait">
              {sealState === 'idle' && (
                <motion.span key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="break-words">{consentWithdrawal.action}</span>
                </motion.span>
              )}
              {sealState === 'sealing' && (
                <motion.span key="sealing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
                  <span className="break-words">Sealing record…</span>
                </motion.span>
              )}
              {sealState === 'sealed' && (
                <motion.span key="sealed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden />
                  <span className="break-words">Record sealed</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <p className="mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed text-rose-100/40">
            Sealing writes the final entry to the audit record — family and caregiver are notified.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
