import { useEffect, useRef, useState } from 'react'
import { Check, ShieldCheck } from 'lucide-react'
import { Panel } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton, CtaNote } from '@/components/phone/LifecycleButton'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { FactRows } from '@/components/patient/plan/FactRows'

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

  return (
    <SheetShell
      icon={status === 'confirmed' ? Check : ShieldCheck}
      tone={status === 'confirmed' ? 'success' : 'info'}
      title={status === 'confirmed' ? 'Transfer confirmed' : 'Confirm withdrawal'}
      subtitle={
        status === 'confirmed'
          ? 'The transfer is on its way to your bank'
          : 'Review the transfer before it moves'
      }
      onClose={onClose}
      footer={
        status === 'confirmed' ? (
          <CtaNote className="text-[10.5px] font-semibold text-emerald-700/80">Returning you to earnings.</CtaNote>
        ) : (
          <div className="flex flex-col gap-2.5">
            <LifecycleButton
              phase={status === 'processing' ? 'working' : 'idle'}
              tone="accent"
              idleIcon={Check}
              idleLabel="Confirm transfer"
              workingLabel="Sending transfer…"
              doneLabel="Transfer confirmed"
              onPress={confirm}
            />
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
        <DarkPanel kicker="Amount">
          <div className="font-mono text-[24px] font-black leading-none tracking-tight text-white">{amount}</div>
          <div className="mt-4">
            <FactRows
              rows={[
                { label: 'To bank', value: bankName },
                { label: 'Account', value: `••${last4}` },
                { label: 'Sessions verified', value: String(sessions) },
                { label: 'Fee', value: '₹0' },
                { label: 'Arrives', value: 'By 6:00 PM today' },
              ]}
            />
          </div>
        </DarkPanel>

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
