import { Fingerprint } from 'lucide-react'
import { StaticButton } from '@/components/phone/LifecycleButton'

export function SignInAction({ onSignIn }: { onSignIn: () => void }) {
  return (
    <StaticButton tone="neutral" icon={Fingerprint} onClick={onSignIn}>
      Already have an account? Sign in
    </StaticButton>
  )
}
