import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import { OptionRow } from '@/components/phone/OptionRow'
import { cn } from '@/lib/utils'
import { dayOptions, fmtINR, scheduleTypes } from '@/data/patientBooking'
import type { TimeWindow } from '@/data/patientBooking'
import { Radio } from './Radio'

export function ScheduleCard({
  schedule,
  days,
  win,
  durationLabel,
  durationPrice,
  onSchedule,
  onPickDay,
  onOpenTime,
}: {
  schedule: string
  days: string[]
  win: TimeWindow
  durationLabel: string
  durationPrice: number
  onSchedule: (id: string) => void
  onPickDay: (d: string) => void
  onOpenTime: () => void
}) {
  const WinIcon = win.icon
  return (
    <Card intent="info">
      <div className="p-5">
        <div className="flex flex-col gap-2">
          {scheduleTypes.map((t) => {
            const active = schedule === t.id
            return (
              <OptionRow
                key={t.id}
                selected={active}
                onSelect={() => onSchedule(t.id)}
                fullWidth={false}
                leading={<Radio active={active} />}
                title={t.label}
                sub={t.sub}
                subClassName="block text-pretty text-[11px] font-semibold leading-snug text-[#0B211B]/45"
              />
            )
          })}
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
              {schedule === 'one' ? 'Day of visit' : 'Days each week'}
            </span>
            <span
              className={cn(
                'text-[10px] font-extrabold tabular-nums',
                days.length > 0 ? 'text-emerald-700' : 'text-amber-700',
              )}
            >
              {schedule === 'one' ? (days[0] ?? 'none') : `${days.length} selected`}
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-7 gap-1.5">
            {dayOptions.map((d) => {
              const on = days.includes(d)
              return (
                <motion.button
                  key={d}
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onPickDay(d)}
                  aria-label={`${d} ${on ? 'selected' : 'not selected'}`}
                  className={cn(
                    'grid h-9 place-items-center rounded-xl text-[10px] font-extrabold uppercase tracking-wide transition-colors',
                    on
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-400 text-[#0B231C] shadow-[0_6px_14px_-8px_rgba(16,185,129,0.9)]'
                      : 'bg-[#0B211B]/[0.04] text-[#0B211B]/40 hover:bg-[#0B211B]/[0.07]',
                  )}
                >
                  {d}
                </motion.button>
              )
            })}
          </div>
          {schedule !== 'one' && days.length === 0 && (
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700/70">
              Pick at least one day to continue
            </p>
          )}
        </div>

        <div className="mt-4">
          <Row
            leading={
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-700">
                <WinIcon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
            }
            title={`${win.label}, ${win.time}`}
            subtitle={`${durationLabel} per visit, ${fmtINR(durationPrice)}`}
            surface="inset"
            className="gap-3.5 px-4 py-3.5"
            hoverClassName=""
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
            onClick={onOpenTime}
          />
        </div>
      </div>
    </Card>
  )
}
