import { ArrowUpDown } from 'lucide-react'
import { LifecycleButton } from '@/components/phone/LifecycleButton'

export type MatchState = 'idle' | 'working' | 'done'

export function MatchButton({ state, onPress }: { state: MatchState; onPress: () => void }) {
  return (
    <LifecycleButton
      phase={state}
      className="mt-4"
      idleIcon={ArrowUpDown}
      idleLabel="Let Ayvaa match the care for me"
      workingLabel="Preparing your questions"
      doneLabel="Ready in booking"
      onPress={onPress}
    />
  )
}
