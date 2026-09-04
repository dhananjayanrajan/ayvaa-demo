import type { ReactNode } from 'react'
import { Clock, Save, Umbrella } from 'lucide-react'
import { Card, Chip, Hero, Kicker, Tile } from '@/components/base/phone/kit'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { WINDOWS, hoursFor, type DayAvailability } from '@/data/availabilityData'
import { Switch } from '@/components/base/phone/switch'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'

type Props_AvailabilityHero = {
  openCount: number
  weeklyHours: number
  peakDay: string
  dirty: boolean
  children: ReactNode
}

export function AvailabilityHero({ openCount, weeklyHours, peakDay, dirty, children }: Props_AvailabilityHero) {
  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Kicker>
            <Clock className="h-3 w-3" aria-hidden />
            Matching window · this week
          </Kicker>
          <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {openCount} of 7 days{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">open</span>
          </h2>
          <p className="mt-0.5 text-[11px] font-semibold text-emerald-100/50">
            {dirty ? 'Unsaved edits · save to apply' : 'Tap a day below to edit its window'}
          </p>
        </div>
        <Chip intent={dirty ? 'info' : 'live'} light dot className="shrink-0">
          {dirty ? 'Draft' : 'Matching'}
        </Chip>
      </div>

      <div className="mt-5">{children}</div>

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-white/[0.04] px-4 py-3">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-200/60">Weekly hours</span>
          <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">{weeklyHours}h</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-200/60">Longest day</span>
          <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">{peakDay}</span>
        </div>
      </div>
    </Hero>
  )
}

type Props_DayEditorCard = {
  day: DayAvailability
  onToggle: () => void
  onSelectWindow: (time: string) => void
}

export function DayEditorCard({ day, onToggle, onSelectWindow }: Props_DayEditorCard) {
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
          <Switch on={!day.off} ariaLabel={`Toggle ${day.day}`} onToggle={onToggle} />
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

export type SaveStatus = 'idle' | 'saving' | 'saved'

type Props_SaveAvailabilityButton = {
  label: string
  status: SaveStatus
  disabled: boolean
  onPress: () => void
}

export function SaveAvailabilityButton({ label, status, disabled, onPress }: Props_SaveAvailabilityButton) {
  return (
    <LifecycleButton
      phase={status === 'saving' ? 'working' : status === 'saved' ? 'done' : 'idle'}
      gated={disabled && status === 'idle'}
      idleIcon={Save}
      idleLabel={label}
      workingLabel="Saving…"
      doneLabel="Saved · live now"
      onPress={onPress}
    />
  )
}

type Props_TimeOffCard = {
  range: string
  note: string
  onPress: () => void
}

export function TimeOffCard({ range, note, onPress }: Props_TimeOffCard) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="block w-full text-left">
      <Card>
        <div className="flex items-center gap-3 p-4">
          <Tile icon={Umbrella} tone="info" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">{range}</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">{note}</div>
          </div>
          <Chip intent="success">Set</Chip>
        </div>
      </Card>
    </motion.button>
  )
}

type Props_WeekBars = {
  days: DayAvailability[]
  selected: number
  onSelect: (index: number) => void
}

export function WeekBars({ days, selected, onSelect }: Props_WeekBars) {
  return (
    <div className="flex h-28 items-end gap-2">
      {days.map((d, i) => {
        const hrs = hoursFor(d.hours)
        const isActive = i === selected
        const pct = Math.max(6, (hrs / 12) * 100)
        return (
          <motion.button
            key={d.day}
            type="button"
            whileTap={{ scale: 0.93 }}
            onClick={() => onSelect(i)}
            aria-label={`${d.day}, ${d.off ? 'off' : d.hours}`}
            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
          >
            <span
              className={cn(
                'text-[9px] font-extrabold tabular-nums',
                isActive ? 'text-white' : d.off ? 'text-emerald-100/25' : 'text-emerald-100/55',
              )}
            >
              {d.off ? '—' : `${hrs}h`}
            </span>
            <span className="flex h-full w-full items-end overflow-hidden rounded-t-xl bg-white/[0.06]">
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: d.off ? '6%' : `${pct}%` }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
                className={cn(
                  'w-full rounded-t-xl',
                  d.off
                    ? 'bg-white/[0.1]'
                    : isActive
                      ? 'bg-gradient-to-t from-emerald-400 to-teal-300 shadow-[0_-8px_20px_-8px_rgba(52,211,153,0.7)]'
                      : 'bg-gradient-to-t from-emerald-500/60 to-teal-400/50',
                )}
              />
            </span>
            <span
              className={cn(
                'text-[9px] font-extrabold uppercase tracking-wide',
                isActive ? 'text-white' : 'text-emerald-100/40',
              )}
            >
              {d.day.slice(0, 3)}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

type Props_WindowOption = {
  label: string
  time: string
  active: boolean
  onSelect: () => void
}

export function WindowOption({ label, time, active, onSelect }: Props_WindowOption) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
        active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
      )}
    >
      <span
        className={cn(
          'grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full',
          active ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.12]',
        )}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span
        className={cn(
          'min-w-0 flex-1 text-[13px] font-bold tracking-tight',
          active ? 'text-emerald-800' : 'text-[#0B211B]/70',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'shrink-0 font-mono text-[11px] font-bold tabular-nums',
          active ? 'text-emerald-700' : 'text-[#0B211B]/45',
        )}
      >
        {time}
      </span>
    </motion.button>
  )
}