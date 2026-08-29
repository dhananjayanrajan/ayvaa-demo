import { motion } from 'motion/react'
import { Check, Clock } from 'lucide-react'
import { SheetShell } from '@/components/patient/onboarding/SheetShell'
import { fmtINR, timeWindows } from '@/data/patientBooking'
import type { DurationOption, TimeWindow } from '@/data/patientBooking'
import { cn } from '@/lib/utils'
import { Radio } from './Radio'

export function TimeSheet({
  win,
  duration,
  durationOptions,
  visitCount,
  onWindow,
  onDuration,
  onSet,
  onClose,
}: {
  win: TimeWindow
  duration: string
  durationOptions: { option: DurationOption; weekly: number }[]
  visitCount: number
  onWindow: (id: string) => void
  onDuration: (id: string) => void
  onSet: () => void
  onClose: () => void
}) {
  return (
    <SheetShell
      icon={Clock}
      tileTone="info"
      title="Visit window and duration"
      subtitle={`${visitCount} ${visitCount === 1 ? 'visit' : 'visits'}, caregivers matched to this exact window`}
      onClose={onClose}
      footer={
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onSet}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          Set {win.label.toLowerCase()}, {durationOptions.find((d) => d.option.id === duration)?.option.label}
        </motion.button>
      }
    >
      <div className="flex flex-col gap-2">
        {timeWindows.map((w) => {
          const active = win.id === w.id
          const Icon = w.icon
          return (
            <motion.button
              key={w.id}
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => onWindow(w.id)}
              aria-pressed={active}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
              )}
            >
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                  active
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]'
                    : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block text-[13px] font-bold leading-snug tracking-tight',
                    active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                  )}
                >
                  {w.label}
                </span>
                <span className="block text-[11px] font-bold tabular-nums leading-snug text-[#0B211B]/45">
                  {w.time}
                </span>
              </span>
              <Radio active={active} />
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
          Duration per visit
        </span>
        <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">
          {visitCount > 1 ? 'Weekly totals shown' : 'Per visit shown'}
        </span>
      </div>
      <div className="mt-2.5 flex flex-col gap-2">
        {durationOptions.map(({ option, weekly }) => {
          const active = duration === option.id
          return (
            <motion.button
              key={option.id}
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => onDuration(option.id)}
              aria-pressed={active}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
              )}
            >
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block text-[13px] font-bold leading-snug tracking-tight',
                    active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                  )}
                >
                  {option.label}
                </span>
                <span className="block text-pretty text-[10.5px] font-semibold leading-snug text-[#0B211B]/40">
                  {visitCount > 1 ? `${fmtINR(weekly)} per week` : fmtINR(option.price)}
                </span>
              </span>
              <Radio active={active} />
            </motion.button>
          )
        })}
      </div>
    </SheetShell>
  )
}
