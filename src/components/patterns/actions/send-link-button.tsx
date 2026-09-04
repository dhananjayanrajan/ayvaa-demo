import { MailCheck } from 'lucide-react'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'
import type { SendState } from '@/data/patientRecovery'

export function SendLinkButton({
  state,
  expired,
  onPress,
}: {
  state: SendState
  expired: boolean
  onPress: () => void
}) {
  return (
    <LifecycleButton
      phase={state}
      idleIcon={MailCheck}
      idleLabel={expired ? 'Send a new link' : 'Send reset link'}
      workingLabel="Generating your link"
      doneLabel="Link sent"
      onPress={onPress}
    />
  )
}
