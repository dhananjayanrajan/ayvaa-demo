import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useRouter } from '@/lib/router'

export function AddVisitButton() {
  const { navigate } = useRouter()

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate('/patient/p09')}
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
    >
      <Plus className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      Book another service
    </motion.button>
  )
}
