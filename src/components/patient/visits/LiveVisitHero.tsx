import { motion } from 'motion/react'
import { BellRing } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { HeroTopRow, HeroHighlight, StatCell } from '@/components/phone/HeroCells'
import { formatElapsed } from '@/data/patientLiveVisit'
import { cn } from '@/lib/utils'

interface LiveVisitHeroProps {
  patientFirst: string
  startedAt: string
  signOffEta: string
  elapsedSeconds: number
  windowMinutes: number
  notifyAtSignOff: boolean
  onToggleNotify: () => void
}

export function LiveVisitHero({
  patientFirst,
  startedAt,
  signOffEta,
  elapsedSeconds,
  windowMinutes,
  notifyAtSignOff,
  onToggleNotify,
}: LiveVisitHeroProps) {
  const ratio = Math.min(1, elapsedSeconds / (windowMinutes * 60))

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Visit in progress"
        trailing={<StatusPill tone="emerald" label="Live" live />}
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Care underway with <HeroHighlight>{patientFirst}</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        Logged step by step and sealed as it happens.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/45">
          <span>Visit window</span>
          <span className="tabular-nums text-emerald-200">
            {formatElapsed(elapsedSeconds)} of {windowMinutes} min
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-[width] duration-1000"
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatCell label="Checked in" value={startedAt} />
        <StatCell label="Sign-off" value={signOffEta} />
      </div>

      <button
        type="button"
        onClick={onToggleNotify}
        aria-pressed={notifyAtSignOff}
        className={cn(
          'mt-2 flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors',
          notifyAtSignOff ? 'bg-emerald-400/[0.16]' : 'bg-white/[0.06] hover:bg-white/[0.1]',
        )}
      >
        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-xl',
            notifyAtSignOff ? 'bg-emerald-400/[0.2] text-emerald-100' : 'bg-white/[0.08] text-white/60',
          )}
        >
          <BellRing className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-bold tracking-tight text-white">Ping me at sign-off</span>
          <span className="block text-[10.5px] font-semibold text-emerald-100/55">
            {notifyAtSignOff ? 'A push arrives the moment the visit closes' : 'Tap to get one push when the visit closes'}
          </span>
        </span>
        <span
          className={cn(
            'relative h-6 w-10 shrink-0 rounded-full transition-colors duration-300',
            notifyAtSignOff ? 'bg-emerald-400' : 'bg-white/[0.15]',
          )}
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 34 }}
            className={cn(
              'absolute top-0.5 h-5 w-5 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.3)]',
              notifyAtSignOff ? 'left-[18px] bg-[#062419]' : 'left-0.5 bg-white',
            )}
          />
        </span>
      </button>
    </AccentHero>
  )
}
