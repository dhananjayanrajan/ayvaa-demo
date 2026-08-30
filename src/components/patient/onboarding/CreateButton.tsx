import { LifecycleButton } from '@/components/phone/LifecycleButton'

export type CreateState = 'idle' | 'working' | 'done'

export function CreateButton({ state, onPress }: { state: CreateState; onPress: () => void }) {
  return (
    <LifecycleButton
      phase={state}
      idleLabel="Create my account"
      workingLabel="Creating your account"
      doneLabel="Account created"
      onPress={onPress}
    />
  )
}
