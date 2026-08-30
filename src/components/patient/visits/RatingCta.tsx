import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { useRouter } from '@/lib/router'

export function RatingCta() {
  const { navigate } = useRouter()

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate('/patient/p18')}
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-amber-500/[0.14] py-3.5 text-sm font-extrabold text-amber-800 transition-colors hover:bg-amber-500/[0.2]"
    >
      <Star className="h-4 w-4 shrink-0 fill-amber-600 text-amber-600" aria-hidden />
      Rate this visit
    </motion.button>
  )
}
