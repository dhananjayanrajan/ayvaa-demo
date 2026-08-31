import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Ban, Check, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import { rise } from '@/components/phone/kit'
import { StepList } from '@/components/phone/StepList'
import { consentWithdrawal } from '@/data/seed'
import { cn } from '@/lib/utils'

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

  const isSealed = sealState === 'sealed'

  const closure = checklistDetails.map((item) => ({
    ...item,
    done: item.label === 'Seal the record' ? isSealed : item.done,
    state: item.label === 'Seal the record' && isSealed ? 'Sealed' : item.state,
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
      <div
        className={`relative overflow-hidden rounded-[26px] border transition-all duration-500 ${
          isSealed
            ? 'border-emerald-400/20 bg-[#062419] shadow-[0_28px_64px_-30px_rgba(5,150,105,0.6)]'
            : 'border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]'
        }`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500 ${
            isSealed ? 'bg-emerald-500/30' : 'bg-rose-500/25'
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl transition-colors duration-500 ${
            isSealed ? 'bg-teal-400/20' : 'bg-orange-400/10'
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r transition-colors duration-500 ${
            isSealed ? 'from-transparent via-emerald-300/50 to-transparent' : 'from-transparent via-rose-300/40 to-transparent'
          }`}
        />
        <div className="relative p-5">
          <div
            className={`flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-500 ${
              isSealed ? 'text-emerald-300' : 'text-rose-200/50'
            }`}
          >
            {isSealed ? (
              <Check className="h-3 w-3 stroke-[3]" aria-hidden />
            ) : (
              <Ban className="h-3 w-3" aria-hidden />
            )}
            {isSealed ? 'Withdrawal · record sealed' : 'Withdrawal · consent revoked'}
          </div>
          <h3 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {consentWithdrawal.name}{' '}
            <span
              className={`bg-clip-text text-transparent transition-all duration-500 ${
                isSealed
                  ? 'bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400'
                  : 'bg-gradient-to-r from-rose-300 to-orange-200'
              }`}
            >
              {isSealed ? 'record sealed' : 'withdrew consent'}
            </span>
          </h3>
          <p
            className={`mt-1.5 text-pretty break-words text-[12px] font-medium leading-relaxed transition-colors duration-500 ${
              isSealed ? 'text-emerald-100/70' : 'text-rose-100/60'
            }`}
          >
            {consentWithdrawal.body}
          </p>

          <div
            className={`mt-4 flex items-center gap-2.5 rounded-2xl px-3.5 py-3 transition-colors duration-500 ${
              isSealed ? 'bg-emerald-400/[0.15]' : 'bg-rose-400/[0.12]'
            }`}
          >
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
                  isSealed ? 'bg-emerald-300' : 'bg-rose-300'
                }`}
              />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isSealed ? 'bg-emerald-300' : 'bg-rose-300'}`} />
            </span>
            <span
              className={`min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] ${
                isSealed ? 'text-emerald-100' : 'text-rose-100'
              }`}
            >
              {isSealed ? 'Care closure completed' : 'Care paused instantly'}
            </span>
            <span
              className={`shrink-0 text-[10px] font-extrabold tabular-nums ${
                isSealed ? 'text-emerald-200/80' : 'text-rose-200/70'
              }`}
            >
              {consentWithdrawal.time}
            </span>
          </div>

          <div
            className={`mt-3 rounded-2xl p-4 transition-colors duration-500 ${
              isSealed ? 'bg-emerald-400/[0.08]' : 'bg-white/[0.06]'
            }`}
          >
            <div
              className={`text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500 ${
                isSealed ? 'text-emerald-200/70' : 'text-rose-200/60'
              }`}
            >
              What happens now
            </div>
            <p className="mt-1.5 break-words text-[12.5px] font-medium leading-relaxed text-white/80">
              {consentWithdrawal.option}
            </p>
          </div>

          <div
            className={`mt-3 rounded-2xl p-4 transition-colors duration-500 ${
              isSealed ? 'bg-emerald-400/[0.08]' : 'bg-white/[0.06]'
            }`}
          >
            <div
              className={`text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500 ${
                isSealed ? 'text-emerald-200/70' : 'text-rose-200/60'
              }`}
            >
              Closure checklist
            </div>
            <div className="mt-3 flex flex-col">
              <StepList
                nodeStyle="circle"
                nodeSize="md"
                theme="dark"
                steps={closure.map((c, i) => {
                  const last = i === closure.length - 1
                  const isExpanded = expandedItem === c.label
                  return {
                    key: c.label,
                    state: c.done ? 'done' : 'pending',
                    node: c.done ? (
                      <span
                        className={cn(
                          'grid h-5 w-5 shrink-0 place-items-center rounded-full text-white transition-all duration-500',
                          isSealed ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]' : 'bg-emerald-400/90'
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                      </span>
                    ) : (
                      <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                        <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/40" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-rose-400" />
                      </span>
                    ),
                    railClassName: isSealed ? 'bg-emerald-400/20' : 'bg-white/15',
                    title: c.label,
                    titleWrap: true,
                    titleClassName: 'text-[13px] leading-snug tracking-tight',
                    body: c.state,
                    bodyClassName: cn(
                      'text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-500',
                      isSealed ? 'text-emerald-300' : 'text-rose-100/45'
                    ),
                    trailingTitle: (
                      <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown
                          className={cn('h-4 w-4 shrink-0 transition-colors duration-500', isSealed ? 'text-emerald-200/50' : 'text-rose-100/40')}
                          aria-hidden
                        />
                      </motion.span>
                    ),
                    expandable: true,
                    open: isExpanded,
                    onToggle: () => setExpandedItem(isExpanded ? null : c.label),
                    expansion: (
                      <p
                        className={cn(
                          'mt-2 break-words text-[11.5px] font-medium leading-relaxed transition-colors duration-500',
                          isSealed ? 'text-emerald-100/70' : 'text-rose-100/60'
                        )}
                      >
                        {c.detail}
                      </p>
                    ),
                    contentClassName: last ? 'pb-0.5' : undefined,
                  }
                })}
              />
            </div>
          </div>

          <div
            className={`mt-4 rounded-2xl p-4 transition-colors duration-500 ${
              isSealed ? 'bg-emerald-400/[0.08]' : 'bg-white/[0.06]'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <button
                type="button"
                onClick={() => setConfirmedReady((v) => !v)}
                className={`relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  confirmedReady
                    ? 'border-emerald-400 bg-emerald-500 text-white'
                    : isSealed
                      ? 'border-emerald-300/30 bg-transparent'
                      : 'border-rose-200/40 bg-transparent'
                }`}
                aria-checked={confirmedReady}
                role="checkbox"
                aria-label="Confirm ready to seal"
              >
                {confirmedReady && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
              </button>
              <span
                className={`break-words text-[11px] font-semibold leading-relaxed transition-colors duration-500 ${
                  isSealed ? 'text-emerald-100/80' : 'text-rose-100/70'
                }`}
              >
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
            className={`mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
              isSealed
                ? 'bg-emerald-500 text-emerald-950 shadow-[0_18px_36px_-12px_rgba(16,185,129,0.8)]'
                : sealState === 'sealing'
                  ? 'cursor-wait bg-emerald-700/80'
                  : confirmedReady
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105'
                    : 'cursor-not-allowed bg-white/10 text-rose-100/40'
            }`}
          >
            <AnimatePresence mode="wait">
              {sealState === 'idle' && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2"
                >
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
              {isSealed && (
                <motion.span key="sealed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 font-black">
                  <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden />
                  <span className="break-words">Record sealed</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <p
            className={`mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed transition-colors duration-500 ${
              isSealed ? 'text-emerald-200/60' : 'text-rose-100/40'
            }`}
          >
            Sealing writes the final entry to the audit record — family and caregiver are notified.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
