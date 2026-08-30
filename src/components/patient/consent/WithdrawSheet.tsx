import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Gavel, Loader2, PhoneCall, ScrollText } from 'lucide-react'
import { SheetShell } from '@/components/patient/matching/SheetShell'
import { CONSENT, WITHDRAW_CONSEQUENCES } from '@/data/patientConsent'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

interface WithdrawSheetProps {
  onRequested: () => void
  onClose: () => void
}

export function WithdrawSheet({ onRequested, onClose }: WithdrawSheetProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const request = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        setPhase('done')
        onRequested()
      }, 1000),
    )
    timers.current.push(
      setTimeout(
        () =>
          notify({
            title: 'Withdrawal requested',
            body: `A supervisor will call within 10 minutes to confirm for ${CONSENT.patientName}`,
            kind: 'warn',
          }),
        1100,
      ),
    )
    timers.current.push(setTimeout(() => onClose(), 2400))
  }

  return (
    <SheetShell
      icon={Gavel}
      tone={phase === 'done' ? 'success' : 'danger'}
      title={phase === 'done' ? 'Withdrawal requested' : 'Withdraw all consent?'}
      subtitle={
        phase === 'done'
          ? 'A supervisor call is the final seal'
          : `This stops all care for ${CONSENT.patientFirst} immediately`
      }
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.97 } : undefined}
            onClick={request}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
              phase === 'done'
                ? 'bg-emerald-600'
                : phase === 'working'
                  ? 'cursor-wait bg-rose-500/60'
                  : 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]',
            )}
          >
            {phase === 'working' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span className="truncate">Requesting withdrawal…</span>
              </>
            ) : phase === 'done' ? (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Withdrawal requested</span>
              </>
            ) : (
              <>
                <Gavel className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Yes, withdraw everything</span>
              </>
            )}
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            disabled={phase === 'working'}
            aria-disabled={phase === 'working'}
            className={cn(
              'w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.08]',
              phase === 'working' && 'cursor-wait opacity-50',
            )}
          >
            Keep consent active
          </motion.button>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pb-2">
        <div className="rounded-2xl bg-[#230D14] p-4">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
            <ScrollText className="h-3 w-3" aria-hidden />
            What happens immediately
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {WITHDRAW_CONSEQUENCES.map((line) => (
              <div key={line} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" aria-hidden />
                <span className="min-w-0 break-words text-[12px] font-semibold leading-snug text-rose-50/85">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
          <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[#0B211B]/50" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/60">
            Nothing is sealed by this tap alone. A supervisor calls you first, and only your verbal confirmation with
            them completes the withdrawal. You can cancel the request any time before that call.
          </span>
        </div>

        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.1] px-3.5 py-3"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </span>
              <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
                Request logged to the consent record. Expect the supervisor call within 10 minutes.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SheetShell>
  )
}
