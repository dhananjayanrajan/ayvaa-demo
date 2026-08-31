import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Loader2, ReceiptText } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { FactRows } from '@/components/phone/FactRows'
import { payment, paymentBreakdown, paymentMethodLabel } from '@/data/patientVisitSummary'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

export function PaymentSheet({ onClose }: { onClose: () => void }) {
  const { notify } = useDemo()
  const [reason, setReason] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const dirty = reason.trim().length > 0

  const submit = () => {
    if (phase !== 'idle' || !dirty) return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(
      setTimeout(() => notify({ title: 'Dispute filed', body: 'Our billing team will review it within 2 days', kind: 'ok' }), 1200),
    )
  }

  return (
    <SheetShell
      icon={ReceiptText}
      title="Payment breakdown"
      subtitle={`Visit charge on ${paymentMethodLabel()}`}
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <motion.button
          type="button"
          whileTap={phase === 'idle' && dirty ? { scale: 0.985 } : undefined}
          onClick={submit}
          disabled={phase !== 'idle' || !dirty}
          aria-disabled={phase !== 'idle' || !dirty}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-emerald-600/60'
                : dirty
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                  : 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/40',
          )}
        >
          {phase === 'idle' && (dirty ? 'Submit dispute' : 'Write a reason first')}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Submitting…
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              Dispute filed
            </>
          )}
        </motion.button>
      }
    >
      <div className="flex flex-col gap-3 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Breakdown</div>
            <div className="mt-3.5">
              <FactRows rows={paymentBreakdown()} />
            </div>
            <p className="mt-3 text-[10px] font-bold text-emerald-100/45">
              Captured only after this visit was verified and sealed.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Dispute this charge</div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tell us what looks wrong…"
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border border-[#0B211B]/[0.08] bg-white px-3.5 py-3 text-[12.5px] font-semibold leading-snug text-[#0B211B] placeholder:text-[#0B211B]/35 focus:border-emerald-500/40 focus:outline-none"
          />
          <div className="mt-1.5 text-[10px] font-semibold text-[#0B211B]/40">
            {dirty ? 'Our billing team reviews every dispute within 2 days.' : 'A reason is required before filing.'}
          </div>
        </div>
      </div>
    </SheetShell>
  )
}
