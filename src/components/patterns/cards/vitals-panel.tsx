import { motion } from 'motion/react'
import { Check, TrendingDown, TrendingUp } from 'lucide-react'
import { Chip, Panel } from '@/components/base/phone/kit'
import { VITAL_READINGS, type VitalReading } from '@/data/sheetData'
import { cn } from '@/lib/utils'

type Props = {
  recorded: string[]
  onRecord: (reading: VitalReading) => void
}

export function VitalsPanel({ recorded, onRecord }: Props) {
  const allRecorded = recorded.length === VITAL_READINGS.length
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        {VITAL_READINGS.map((v) => {
          const on = recorded.includes(v.key)
          return (
            <motion.button
              key={v.key}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onRecord(v)}
              aria-pressed={on}
              className={cn(
                'relative flex flex-col items-start rounded-2xl p-3.5 text-left transition-colors',
                on ? 'bg-emerald-500/[0.09]' : 'bg-[#0B211B]/[0.04] hover:bg-[#0B211B]/[0.07]',
              )}
            >
              {on && (
                <span className="absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full bg-emerald-500">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} aria-hidden />
                </span>
              )}
              <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.12em]', on ? 'text-emerald-700/70' : 'text-[#0B211B]/40')}>
                {v.label}
              </span>
              <span
                className={cn(
                  'mt-1.5 text-[19px] font-extrabold tabular-nums leading-none tracking-tight',
                  on ? 'text-emerald-900' : 'text-[#0B211B]',
                )}
              >
                {v.value}
              </span>
              <span className="mt-2 flex items-center gap-1">
                {v.down ? (
                  <TrendingDown className="h-3 w-3 text-emerald-600" strokeWidth={2.6} aria-hidden />
                ) : (
                  <TrendingUp className="h-3 w-3 text-sky-600" strokeWidth={2.6} aria-hidden />
                )}
                <span className="text-[9px] font-bold text-[#0B211B]/45">{v.delta}</span>
              </span>
            </motion.button>
          )
        })}
      </div>

      <Panel intent={allRecorded ? 'success' : 'info'} className="flex items-start gap-2.5 p-3.5">
        {allRecorded ? (
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />
        ) : (
          <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.6} aria-hidden />
        )}
        <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-semibold leading-relaxed text-[#0B211B]/70">
          {allRecorded
            ? 'All four readings logged. Blood pressure is 4 points lower than Monday and within normal range for his plan.'
            : 'Tap each reading to log it. Blood pressure is tracking 4 points lower than Monday so far.'}
        </p>
        <Chip intent={allRecorded ? 'success' : 'info'} dot={!allRecorded}>
          {recorded.length}/{VITAL_READINGS.length}
        </Chip>
      </Panel>
    </div>
  )
}
