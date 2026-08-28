import { motion } from 'motion/react'
import { ChevronRight, Lock, ShieldCheck } from 'lucide-react'
import { Card, Tile, rise } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'

export function ComplianceToolsList() {
  const { navigate } = useRouter()
  return (
    <motion.div variants={rise}>
      <Card>
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={() => navigate('/admin/a06')}
          className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
        >
          <Tile icon={ShieldCheck} tone="success" />
          <span className="min-w-0 flex-1">
            <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">Consent tracking</span>
            <span className="mt-0.5 block text-xs font-medium text-[#0B211B]/55">1,102 active · 18 due · 2 withdrawn</span>
          </span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
        </motion.button>
        <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={() => navigate('/admin/a07')}
          className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
        >
          <Tile icon={Lock} tone="ink" />
          <span className="min-w-0 flex-1">
            <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">Retention policies</span>
            <span className="mt-0.5 block text-xs font-medium text-[#0B211B]/55">7 policies · deletion queue running</span>
          </span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
        </motion.button>
      </Card>
    </motion.div>
  )
}
