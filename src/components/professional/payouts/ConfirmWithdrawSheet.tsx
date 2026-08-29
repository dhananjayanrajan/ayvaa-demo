import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, ShieldCheck } from 'lucide-react'
import { Panel } from '@/components/phone/kit'
import { SheetShell } from './SheetShell'
import { cn } from '@/lib/utils'

type Props = {
  amount: string
  bankName: string
  last4: string
  sessions: number
  onClose: () => void
  onConfirmed: () => void
}

type Status = 'idle' | 'processing' | 'confirmed'

export function ConfirmWithdrawSheet({ amount, bankName, last4, sessions, onClose, onConfirmed }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const confirm = () => {
    if (status !== 'idle') return
    setStatus('processing')
    timers.current.push(
      setTimeout(() => {
        setStatus('confirmed')
        timers.current.push(setTimeout(onConfirmed, 1400))
      }, 1200),
    )
  }

  const cta =
    status === 'confirmed'
      ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
      : status === 'processing'
        ? 'bg-[#0B211B]/[0.25] shadow-none cursor-wait'
        : 'bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_18px_36px_-18px_rgba(37,99,235,0.6)]'

  return (
    <SheetShell
      icon={status === 'confirmed' ? Check : ShieldCheck}
      tone={status === 'confirmed' ? 'success' : 'info'}
      title={status === 'confirmed' ? 'Transfer confirmed' : 'Confirm withdrawal'}
      subtitle={status === 'confirmed' ? 'The transfer is on its way to your bank' : 'Review the transfer before it moves'}
      onClose={onClose}
      footer={
        status === 'confirmed' ? (
          <p className="text-center text-[10.5px] font-semibold text-emerald-700/80">Returning you to earnings.</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={confirm}
              disabled={status === 'processing'}
              aria-disabled={status === 'processing'}
              className={cn(
                'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors duration-300',
                cta,
              )}
            >
              {status === 'processing' ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white/70" strokeWidth={2.4} aria-hidden />
              ) : (
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              )}
              {status === 'processing' ? 'Sending transfer…' : 'Confirm transfer'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.09]"
            >
              Not now
            </button>
          </div>
        )
      }
    >
      <div className="flex flex-col gap-3.5">
        <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Amount</div>
            <div className="mt-1.5 font-mono text-[24px] font-black leading-none tracking-tight text-white">{amount}</div>

            <div className="mt-4 flex flex-col gap-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">To bank</span>
                <span className="min-w-0 truncate text-right text-[12px] font-bold text-emerald-50/90">{bankName}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Account</span>
                <span className="min-w-0 font-mono text-[12px] font-bold tabular-nums text-emerald-50/90">{`••${last4}`}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Sessions verified</span>
                <span className="min-w-0 text-right text-[12px] font-bold tabular-nums text-emerald-50/90">{sessions}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Fee</span>
                <span className="min-w-0 text-right text-[12px] font-bold tabular-nums text-emerald-50/90">₹0</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Arrives</span>
                <span className="min-w-0 text-right text-[12px] font-bold text-emerald-50/90">By 6:00 PM today</span>
              </div>
            </div>
          </div>
        </div>

        <Panel intent="info" className="flex items-start gap-2.5 p-3.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.4} aria-hidden />
          <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-medium leading-relaxed text-[#0B211B]/65">
            Once confirmed, this transfer cannot be recalled. You can track it under payout history.
          </p>
        </Panel>
      </div>
    </SheetShell>
  )
}
