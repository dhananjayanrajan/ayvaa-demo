import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFramework } from '@/components/phone/FrameworkRuntime'

type PillTone = 'sky' | 'amber' | 'emerald' | 'rose'

const pillTones: Record<PillTone, { bg: string; text: string; dot: string }> = {
  sky: { bg: 'bg-sky-300', text: 'text-[#082535]', dot: 'bg-[#082535]/70' },
  amber: { bg: 'bg-amber-300', text: 'text-[#2B1D05]', dot: 'bg-[#2B1D05]/70' },
  emerald: { bg: 'bg-emerald-300', text: 'text-[#04241A]', dot: 'bg-[#04241A]/70' },
  rose: { bg: 'bg-rose-300', text: 'text-[#2B0813]', dot: 'bg-[#2B0813]/70' },
}

interface StatusPillProps {
  tone: PillTone
  label: string
  live?: boolean
  icon?: LucideIcon
  className?: string
}

export function StatusPill({ tone, label, live = false, icon, className }: StatusPillProps) {
  const t = pillTones[tone]
  const { emit } = useFramework()
  const hasMountedRef = useRef(false)
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      emit('statusPill.mounted', { tone, label, live })
    }
  }, [emit, label, live, tone])
  useEffect(() => {
    if (live) emit('statusPill.live', { tone, label })
  }, [emit, live, tone, label])
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-extrabold tracking-wide',
        t.bg,
        t.text,
        className,
      )}
    >
      {live && (
        <motion.span
          aria-hidden
          className={cn('h-1.5 w-1.5 rounded-full', t.dot)}
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {icon && <PillIcon Icon={icon} />}
      {label}
    </span>
  )
}

function PillIcon({ Icon }: { Icon: LucideIcon }) {
  return <Icon className="h-3 w-3" strokeWidth={3} aria-hidden />
}
