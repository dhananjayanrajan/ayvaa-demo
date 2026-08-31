import { motion } from 'motion/react'
import { ShieldAlert } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { PhaseHero } from '@/components/phone/PhaseHero'
import type { SeverityConfig } from '@/data/incidentData'
import { cn } from '@/lib/utils'

type Props = {
  config: SeverityConfig
}

export function IncidentHero({ config }: Props) {
  return (
    <PhaseHero
      theme={{
        border: config.shell.border,
        shell: config.shell.bg,
        orbA: config.shell.glowA,
        orbB: config.shell.glowB,
        hairline: 'via-white/20',
      }}
    >
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-current">
        <ShieldAlert className="h-3 w-3" aria-hidden />
        <span className={config.shell.overline}>Visit on hold</span>
      </div>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Care holds until{' '}
        <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', config.shell.gradient)}>this is filed</span>
      </h2>

      <div className="mt-5 rounded-2xl bg-white/[0.06] p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className={cn('min-w-0 flex-1 truncate font-mono text-[10px] font-bold uppercase tracking-[0.14em]', config.shell.overline)}>
            Guided walk · 8 of 15 min
          </span>
          <Chip intent="warning" dot>
            Paused
          </Chip>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '53%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full bg-gradient-to-r', config.shell.meter)}
          />
        </div>
      </div>
    </PhaseHero>
  )
}
