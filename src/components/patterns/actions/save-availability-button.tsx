import { Save } from 'lucide-react'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'

export type SaveStatus = 'idle' | 'saving' | 'saved'

type Props = {
  label: string
  status: SaveStatus
  disabled: boolean
  onPress: () => void
}

export function SaveAvailabilityButton({ label, status, disabled, onPress }: Props) {
  return (
    <LifecycleButton
      phase={status === 'saving' ? 'working' : status === 'saved' ? 'done' : 'idle'}
      gated={disabled && status === 'idle'}
      idleIcon={Save}
      idleLabel={label}
      workingLabel="Saving…"
      doneLabel="Saved · live now"
      onPress={onPress}
    />
  )
}
