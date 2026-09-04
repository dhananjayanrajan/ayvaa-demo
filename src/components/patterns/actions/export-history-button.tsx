import { Download } from 'lucide-react'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'

export type ExportStatus = 'idle' | 'preparing' | 'saved'

type Props = {
  status: ExportStatus
  onPress: () => void
}

export function ExportHistoryButton({ status, onPress }: Props) {
  return (
    <LifecycleButton
      phase={status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working'}
      idleIcon={Download}
      idleLabel="Export session records"
      workingLabel="Preparing export…"
      doneLabel="Export saved to downloads"
      onPress={onPress}
    />
  )
}
