import { Wallet } from 'lucide-react'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'

export type WithdrawStatus = 'idle' | 'processing' | 'confirmed'

type Props = {
  amount: string
  status: WithdrawStatus
  onPress: () => void
}

export function WithdrawButton({ amount, status, onPress }: Props) {
  return (
    <LifecycleButton
      phase={status === 'processing' ? 'working' : status === 'confirmed' ? 'done' : 'idle'}
      tone="accent"
      idleIcon={Wallet}
      idleLabel={`Withdraw ${amount} to bank`}
      workingLabel="Processing…"
      doneLabel="Withdrawal confirmed"
      onPress={onPress}
    />
  )
}
