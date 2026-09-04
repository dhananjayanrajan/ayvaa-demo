import { Check, Clock } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'
import { OptionRow } from '@/components/base/phone/option-row'
import { fmtINR, timeWindows } from '@/data/patientBooking'
import type { DurationOption, TimeWindow } from '@/data/patientBooking'
import { Radio } from '@/components/base/phone/radio'

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
  const durationLabel = durationOptions.find((d) => d.option.id === duration)?.option.label
  return (
    <SheetShell
      icon={Clock}
      tone="info"
      title="Visit window and duration"
      subtitle={`${visitCount} ${visitCount === 1 ? 'visit' : 'visits'}, caregivers matched to this exact window`}
      onClose={onClose}
      footer={
        <LifecycleButton
          phase="idle"
          idleIcon={Check}
          idleLabel={`Set ${win.label.toLowerCase()}, ${durationLabel}`}
          workingLabel="Setting"
          doneLabel="Set"
          onPress={onSet}
        />
      }
    >
      <div className="flex flex-col gap-2">
        {timeWindows.map((w) => {
          const active = win.id === w.id
          return (
            <OptionRow
              key={w.id}
              selected={active}
              onSelect={() => onWindow(w.id)}
              icon={w.icon}
              title={w.label}
              sub={w.time}
              trailing={<Radio active={active} />}
            />
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
            <OptionRow
              key={option.id}
              selected={active}
              onSelect={() => onDuration(option.id)}
              title={option.label}
              sub={visitCount > 1 ? `${fmtINR(weekly)} per week` : fmtINR(option.price)}
              trailing={<Radio active={active} />}
            />
          )
        })}
      </div>
    </SheetShell>
  )
}
