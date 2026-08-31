import { useEffect, useRef, useState } from 'react'
import { Download, ReceiptText } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { FactRows } from '@/components/phone/FactRows'

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
        <LifecycleButton
          phase={status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working'}
          idleIcon={Download}
          idleLabel="Download receipt"
          workingLabel="Preparing receipt…"
          doneLabel="Receipt saved to downloads"
          onPress={download}
        />
      }
    >
      <DarkPanel
        kicker="Amount"
        kickerTrailing={
          <Chip intent={paid ? 'success' : 'warning'} dot={!paid} className="shrink-0 whitespace-nowrap">
            {paid ? 'Paid' : 'In transit'}
          </Chip>
        }
      >
        <div className="font-mono text-[24px] font-black leading-none tracking-tight text-white">{amount}</div>
        <div className="mt-4">
          <FactRows
            rows={[
              { label: 'Sessions included', value: String(sessions) },
              { label: 'Destination', value: bankName },
              { label: 'Account', value: `••${last4}` },
              { label: 'Session log', value: paid ? 'Matched' : 'Pending match' },
            ]}
          />
        </div>
      </DarkPanel>
    </SheetShell>
  )
}
