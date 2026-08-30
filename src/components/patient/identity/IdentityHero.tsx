import { Camera, Check } from 'lucide-react'
import { Chip, Hero, Ring, Tile } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import { clearedSteps } from '@/data/patientIdentity'
import type { CapturePhase } from '@/data/patientIdentity'
import { JourneyTime } from './JourneyTime'

export function IdentityHero({ phase }: { phase: CapturePhase }) {
  const done = phase === 'done'
  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          Identity check
        </div>
        <Chip
          intent={done ? 'success' : 'warning'}
          light
          dot={!done}
          className="shrink-0 border-transparent"
        >
          {done ? 'Matched' : 'Selfie left'}
        </Chip>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Ring value={done ? 1 : 2 / 3} size={84} stroke={7} id="p04-progress">
          <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">
            {done ? '3/3' : '2/3'}
          </span>
          <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.16em] text-emerald-200/50">
            checks
          </span>
        </Ring>
        <div className="min-w-0 flex-1">
          <h2 className="text-balance text-[17px] font-extrabold leading-snug tracking-tight text-white">
            {done ? (
              <>
                Fully verified,{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  family plan live
                </span>
              </>
            ) : (
              <>
                Just your{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  face left
                </span>
              </>
            )}
          </h2>
          <p className="mt-1 text-[11px] font-medium leading-relaxed text-emerald-100/70">
            {done
              ? 'Your ID and selfie match. Verification is complete.'
              : 'One live selfie and verification completes.'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {clearedSteps.map((step) => (
          <div key={step.key} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <Tile icon={Check} tone="success" size="sm" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-bold tracking-tight text-emerald-50/90">
                {step.title}
              </div>
              <div className="mt-0.5 truncate text-[9.5px] font-semibold text-emerald-100/70">
                {step.detail}
              </div>
            </div>
            <JourneyTime value={step.time} />
          </div>
        ))}
        <div
          className={cn(
            'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-colors duration-300',
            done ? 'bg-emerald-400/[0.15]' : 'bg-white/[0.06]',
          )}
        >
          <Tile icon={Camera} tone={done ? 'white' : 'warning'} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-bold tracking-tight text-emerald-50/90">
              Live selfie match
            </div>
            <div className="mt-0.5 truncate text-[9.5px] font-semibold text-emerald-100/70">
              {done ? 'Passed with high confidence' : 'Awaiting your capture below'}
            </div>
          </div>
          {done ? (
            <Chip intent="success" light className="border-transparent">
              Passed
            </Chip>
          ) : (
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span className="absolute h-full w-full animate-ping rounded-full bg-amber-300 opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-amber-300" />
            </span>
          )}
        </div>
      </div>
    </Hero>
  )
}
