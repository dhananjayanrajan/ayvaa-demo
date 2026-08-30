import { CheckCircle2 } from 'lucide-react'
import { LifecycleButton } from '@/components/phone/LifecycleButton'

export type SaveStatus = 'idle' | 'saving' | 'saved'

type Props = {
  label: string
  disabled: boolean
  status: SaveStatus
  onPress: () => void
}

export function SaveSheetButton({ label, disabled, status, onPress }: Props) {
  return (
    <LifecycleButton
      phase={status}
      className="mt-auto"
      gated={disabled && status === 'idle'}
      idleIcon={CheckCircle2}
      idleLabel={label}
      workingLabel="Saving…"
      doneLabel="Saved · sealed at sign off"
      onPress={onPress}
    />
  )
}
