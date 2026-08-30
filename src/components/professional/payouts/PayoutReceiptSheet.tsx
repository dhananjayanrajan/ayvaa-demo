import { useEffect, useRef, useState } from 'react'
import { Check, Download, Loader2, ReceiptText } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { SheetShell } from './SheetShell'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'generating' | 'saved'

type Props = {
  date: string
  amount: string
  sessions: number
  paid: boolean
  bankName: string
  last4: string
  holder: string
  onClose: () => void
}

export function PayoutReceiptSheet({ date, amount, sessions, paid, bankName, last4, holder, onClose }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const download = () => {
    if (status !== 'idle') return
    setStatus('generating')
    timers.current.push(
      setTimeout(() => {
        const lines = [
          'AYVAA CAREGIVER - PAYOUT RECEIPT',
          '',
          `Period: ${date}`,
          `Amount: ${amount}`,
          `Sessions included: ${sessions}`,
          `Destination: ${bankName} account ••${last4}`,
          `Account holder: ${holder}`,
          `Status: ${paid ? 'Paid' : 'In transit'}`,
          '',
          'Sealed record. Every rupee traces to a completed, family-signed-off session.',
        ]
        const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `ayvaa-payout-${date.replace(/\s+/g, '-').toLowerCase()}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setStatus('saved')
      }, 1000),
    )
  }

  return (
    <SheetShell
      icon={ReceiptText}
      tone={paid ? 'success' : 'warning'}
      title={`Payout, ${date}`}
      subtitle={paid ? 'Settled to your bank' : 'In transit, arrives by 6 PM'}
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={download}
          disabled={status !== 'idle'}
          aria-disabled={status !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
            status === 'saved'
              ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            status === 'generating' && 'opacity-80',
          )}
        >
          {status === 'generating' ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden />
          ) : status === 'saved' ? (
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
          ) : (
            <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          )}
          {status === 'generating' ? 'Preparing receipt…' : status === 'saved' ? 'Receipt saved to downloads' : 'Download receipt'}
        </button>
      }
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Amount</div>
              <div className="mt-1.5 font-mono text-[24px] font-black leading-none tracking-tight text-white">{amount}</div>
            </div>
            <Chip intent={paid ? 'success' : 'warning'} dot={!paid} className="shrink-0 whitespace-nowrap">
              {paid ? 'Paid' : 'In transit'}
            </Chip>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Sessions included</span>
              <span className="min-w-0 text-right text-[12px] font-bold tabular-nums text-emerald-50/90">{sessions}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Destination</span>
              <span className="min-w-0 truncate text-right text-[12px] font-bold text-emerald-50/90">{bankName}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Account</span>
              <span className="min-w-0 font-mono text-[12px] font-bold tabular-nums text-emerald-50/90">{`••${last4}`}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Session log</span>
              <span className="min-w-0 text-right text-[12px] font-bold text-emerald-50/90">{paid ? 'Matched' : 'Pending match'}</span>
            </div>
          </div>
        </div>
      </div>
    </SheetShell>
  )
}
