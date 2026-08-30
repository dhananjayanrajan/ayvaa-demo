import { Pill } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/patient/matching/StatusPill'
import { HeroTopRow, HeroHighlight } from '@/components/phone/HeroCells'
import { Meter } from '@/components/phone/kit'
import type { PartCell } from '@/data/patientMeds'
import { cn } from '@/lib/utils'

interface MedsHeroProps {
  patientFirst: string
  sealedCount: number
  total: number
  complete: boolean
  partCells: PartCell[]
}

export function MedsHero({ patientFirst, sealedCount, total, complete, partCells }: MedsHeroProps) {
  const n = partCells.length
  const doneCount = partCells.filter((c) => c.status === 'done').length
  const startPct = 100 / n / 2
  const endPct = doneCount > 0 ? (100 / n) * (doneCount - 0.5) : startPct

  return (
    <AccentHero tone={complete ? 'emerald' : 'amber'}>
      <HeroTopRow
        icon={Pill}
        label={`${patientFirst}'s doses today`}
        labelClass={complete ? 'text-emerald-200/50' : 'text-amber-200/50'}
        trailing={
          complete ? (
            <StatusPill tone="emerald" label="Day complete" />
          ) : (
            <StatusPill tone="amber" label="In progress" live />
          )
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {sealedCount} of {total} doses taken,{' '}
        <HeroHighlight tone={complete ? 'emerald' : 'amber'}>
          {complete ? 'day sealed' : `${total - sealedCount} to go`}
        </HeroHighlight>
      </h2>
      <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">
        Round by round, sealed as they happen
      </p>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
          <span className={complete ? 'text-emerald-100/50' : 'text-amber-100/50'}>Day progress</span>
          <span className={cn('tabular-nums', complete ? 'text-emerald-200' : 'text-amber-200')}>
            {Math.round((sealedCount / total) * 100)}%
          </span>
        </div>
        <Meter value={sealedCount / total} intent={complete ? 'success' : 'warning'} delay={0.2} className="mt-2" />
      </div>

      <div className="relative mt-5">
        <div
          aria-hidden
          className="absolute top-[7px] h-0.5 rounded-full bg-white/[0.12]"
          style={{ left: `${startPct}%`, right: `${startPct}%` }}
        />
        {doneCount > 0 && (
          <div
            aria-hidden
            className="absolute top-[7px] h-0.5 rounded-full bg-emerald-300"
            style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }}
          />
        )}
        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {partCells.map((cell) => (
            <div key={cell.id} className="flex flex-col items-center">
              {cell.status === 'done' ? (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden>
                    <path
                      d="M20 6 9 17l-5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : cell.status === 'due' ? (
                <span className="relative grid h-4 w-4 place-items-center">
                  <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-amber-300/50" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-amber-300" />
                </span>
              ) : (
                <span className="mt-[3px] h-2.5 w-2.5 rounded-full bg-white/25" />
              )}
              <span className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/70">
                {cell.label}
              </span>
              <span
                className={cn(
                  'text-[9px] font-bold tabular-nums',
                  cell.status === 'due' ? 'text-amber-200' : cell.status === 'done' ? 'text-emerald-100/70' : 'text-white/35',
                )}
              >
                {cell.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AccentHero>
  )
}
