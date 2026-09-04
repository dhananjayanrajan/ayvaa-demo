import { BadgeCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'

export type FinishState = 'idle' | 'working' | 'done'

export function FinishBar({
  verified,
  state,
  onFinish,
  onSkip,
}: {
  verified: boolean
  state: FinishState
  onFinish: () => void
  onSkip: () => void
}) {
  if (!verified) {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onSkip}
        className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.4] py-3.5 text-sm font-bold text-white transition-all"
      >
        Continue · finish selfie later
      </motion.button>
    )
  }
  return (
    <LifecycleButton
      phase={state}
      idleIcon={BadgeCheck}
      idleLabel="Finish verification"
      workingLabel="Sealing your identity"
      doneLabel="Identity verified"
      onPress={onFinish}
    />
  )
}
