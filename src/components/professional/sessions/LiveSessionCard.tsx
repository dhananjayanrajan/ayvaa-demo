import { useState } from 'react'
import { motion } from 'motion/react'
import { Activity, ArrowRight, Loader2, Phone } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'

interface LiveSessionCardProps {
  title: string
  detail: string
  time: string
  checklistProgress: number
  onResume: () => void
  onCallFamily: () => void
}

export function LiveSessionCard({
  title,
  detail,
  time,
  checklistProgress,
  onResume,
  onCallFamily,
}: LiveSessionCardProps) {
  const [loading, setLoading] = useState(false)

  const handleResume = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onResume()
    }, 700)
  }

  return (
    <Card intent="success" className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <Tile icon={Activity} tone="success" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">{title}</span>
              <Chip intent="success" dot>Live</Chip>
            </div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/60">{detail}</p>
            <div className="mt-1 text-[11px] font-bold text-[#0B211B]/45">{time}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#0B211B]/50">
            <span>Checklist progress</span>
            <span>{checklistProgress}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${checklistProgress}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={handleResume}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
            {loading ? 'Opening…' : 'Resume checklist'}
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onCallFamily}
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            aria-label="Call family"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        </div>
      </div>
    </Card>
  )
}
