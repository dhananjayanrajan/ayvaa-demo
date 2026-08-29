import { motion } from 'motion/react'
import { Fingerprint } from 'lucide-react'

export function SignInAction({ onSignIn }: { onSignIn: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onSignIn}
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
    >
      <Fingerprint className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      Already have an account? Sign in
    </motion.button>
  )
}
