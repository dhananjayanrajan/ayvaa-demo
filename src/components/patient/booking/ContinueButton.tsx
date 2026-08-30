import { ArrowRight } from 'lucide-react'
import { LifecycleButton } from '@/components/phone/LifecycleButton'

export type ContinueState = 'idle' | 'working' | 'done'

export function ContinueButton({
  blocked,
  state,
  onPress,
}: {
  blocked: boolean
  state: ContinueState
  onPress: () => void
}) {
  return (
    <LifecycleButton
      phase={blocked ? 'idle' : state}
      gated={blocked}
      idleIcon={ArrowRight}
      idleLabel={blocked ? 'Pick at least one day to continue' : 'Continue to matching'}
      workingLabel="Saving your details"
      doneLabel="Details saved"
      onPress={onPress}
    />
  )
}
