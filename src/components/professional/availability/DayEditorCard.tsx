import { AnimatePresence, motion } from 'motion/react'
import { Card, Chip } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import { WINDOWS, type DayAvailability } from './availabilityData'
import { DayToggle } from './DayToggle'
import { WindowOption } from './WindowOption'

type Props = {
  day: DayAvailability
  onToggle: () => void
  onSelectWindow: (time: string) => void
}

export function DayEditorCard({ day, onToggle, onSelectWindow }: Props) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm font-extrabold tracking-tight text-[#0B211B]">{day.day}</div>
            <div className="mt-0.5 text-xs font-semibold text-[#0B211B]/50">
              {day.off ? 'No offers will be sent' : `Offers matched · ${day.hours}`}
            </div>
          </div>
          <Chip intent={day.off ? 'neutral' : 'success'} dot={!day.off}>
            {day.off ? 'Off' : 'Open'}
          </Chip>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5">
          <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', day.off ? 'bg-[#0B211B]/20' : 'bg-emerald-500')} />
          <span className="min-w-0 flex-1 text-[13px] font-bold text-[#0B211B]/75">Available for offers</span>
          <DayToggle on={!day.off} label={day.day} onToggle={onToggle} />
        </div>

        <AnimatePresence initial={false}>
          {!day.off && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex flex-col gap-2">
                {WINDOWS.map((w) => (
                  <WindowOption
                    key={w.label}
                    label={w.label}
                    time={w.time}
                    active={day.hours === w.time}
                    onSelect={() => onSelectWindow(w.time)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
