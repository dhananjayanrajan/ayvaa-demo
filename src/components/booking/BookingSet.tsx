import { ArrowRight, CalendarDays, Check, ChevronRight, Clock, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { AccentHero } from '@/components/phone/AccentHero'
import { HeroHighlight, HeroTopRow, StatCell, TapCell } from '@/components/phone/HeroCells'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { OptionCheck, OptionRow } from '@/components/phone/OptionRow'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { Radio } from '@/components/phone/Radio'
import { Row } from '@/components/phone/Row'
import { SheetShell } from '@/components/phone/SheetShell'
import { Card, Chip } from '@/components/phone/kit'
import type { DurationOption, Estimate, TimeWindow } from '@/data/patientBooking'
import { bookingCategories, dayOptions, fmtINR, scheduleTypes, timeWindows, wizardSteps } from '@/data/patientBooking'
import { lovedOnes } from '@/data/seed'
import { cn } from '@/lib/utils'

interface BookingHeroProps {
  estimate: Estimate
  summaryLine: string
  lovedFirstName: string
  category: string
  days: string[]
  windowLabel: string
  durationLabel: string
  cadence: 'visit' | 'week'
  onOpenWho: () => void
  onOpenTime: () => void
}

export function BookingHero({
  estimate,
  summaryLine,
  lovedFirstName,
  category,
  days,
  windowLabel,
  durationLabel,
  cadence,
  onOpenWho,
  onOpenTime,
}: BookingHeroProps) {
  const daysValue = days.length > 0 ? days.join(', ') : 'Not set'
  const visitsValue = cadence === 'week' ? `${estimate.visitCount} per week` : 'Single visit'
  const priceLabel = cadence === 'week' ? 'Est. weekly total' : 'Est. total'

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="New care request"
        trailing={
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums text-emerald-100/40">
            Step 1 of 3
          </span>
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Care for <HeroHighlight>{lovedFirstName}</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">{summaryLine}</p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <StatCell label="Category" value={category} />
        <StatCell label="Days" value={daysValue} />
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <TapCell label="Receiving care" value={lovedFirstName} onClick={onOpenWho} />
        <TapCell label="Time window" value={windowLabel} onClick={onOpenTime} />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <StatCell label="Visits" value={visitsValue} />
        <StatCell label="Session length" value={durationLabel} />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{priceLabel}</span>
        <motion.span
          key={estimate.weekly}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white"
        >
          ₹{estimate.weekly.toLocaleString('en-IN')}
        </motion.span>
      </div>
    </AccentHero>
  )
}

export function CategoryGrid({
  category,
  onSelect,
}: {
  category: string
  onSelect: (label: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {bookingCategories.map((c) => {
        const active = category === c.label
        const Icon = c.icon
        return (
          <motion.button
            key={c.label}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(c.label)}
            aria-pressed={active}
            className={cn(
              'relative flex min-h-[76px] items-center gap-2.5 rounded-2xl p-3.5 text-left transition-colors',
              active
                ? 'bg-emerald-500/[0.1] shadow-[0_10px_24px_-14px_rgba(16,185,129,0.8)]'
                : 'bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.25)] hover:bg-emerald-500/[0.04]',
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
                  'block text-[12px] font-bold leading-tight tracking-tight',
                  active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                )}
              >
                {c.label}
              </span>
              <span className="mt-1 block text-pretty text-[9.5px] font-semibold leading-snug text-[#0B211B]/40">
                {c.hint}
              </span>
            </span>
            {active && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_4px_10px_-4px_rgba(16,185,129,0.8)]"
              >
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

export function ContextPills({
  lovedFirstName,
  category,
  days,
  windowLabel,
  onOpenWho,
  onOpenTime,
}: {
  lovedFirstName: string
  category: string
  days: string[]
  windowLabel: string
  onOpenWho: () => void
  onOpenTime: () => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onOpenWho}
        className="flex items-center justify-between gap-2 rounded-2xl bg-emerald-400/[0.14] px-3.5 py-2.5 text-left transition-colors hover:bg-emerald-400/[0.2]"
      >
        <span className="min-w-0">
          <span className="block text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/60">
            Receiving care
          </span>
          <span className="mt-0.5 block truncate text-[12px] font-extrabold leading-none text-white">
            {lovedFirstName}
          </span>
        </span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-200/70" aria-hidden />
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onOpenTime}
        className="flex items-center justify-between gap-2 rounded-2xl bg-emerald-400/[0.14] px-3.5 py-2.5 text-left transition-colors hover:bg-emerald-400/[0.2]"
      >
        <span className="min-w-0">
          <span className="block text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/60">
            Visit window
          </span>
          <span className="mt-0.5 block truncate text-[12px] font-extrabold leading-none text-white">
            {windowLabel}
          </span>
        </span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-200/70" aria-hidden />
      </motion.button>

      <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
        <span className="block text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
          Support type
        </span>
        <span className="mt-0.5 block truncate text-[12px] font-extrabold leading-none text-emerald-50/85">
          {category}
        </span>
      </div>

      <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
          <CalendarDays className="h-2.5 w-2.5" aria-hidden />
          Days
        </span>
        <span
          className={cn(
            'mt-0.5 block truncate text-[12px] font-extrabold leading-none',
            days.length > 0 ? 'text-emerald-50/85' : 'text-amber-300/90',
          )}
        >
          {days.length > 0 ? days.join(', ') : 'Pick below'}
        </span>
      </div>
    </div>
  )
}

export type ContinueState = 'idle' | 'working' | 'done'

export function ContinueButton({
  blocked,
  state,
  onPress,
}: {
  blocked: boolean
  state: ContinueState
  onPress: () => void
}) {
  return (
    <LifecycleButton
      phase={blocked ? 'idle' : state}
      gated={blocked}
      idleIcon={ArrowRight}
      idleLabel={blocked ? 'Pick at least one day to continue' : 'Continue to matching'}
      workingLabel="Saving your details"
      doneLabel="Details saved"
      onPress={onPress}
    />
  )
}

export function EstimateCard({
  estimate,
  cadence,
  lineLabel,
}: {
  estimate: Estimate
  cadence: 'visit' | 'week'
  lineLabel: string
}) {
  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <div className="relative">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
              Visits per week
            </div>
            <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {estimate.visitCount}
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
              Care hours
            </div>
            <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {estimate.hours}
            </div>
          </div>
        </div>
        <div className="mt-2 rounded-2xl bg-white/[0.04] px-4 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
              Price per visit
            </span>
            <span className="text-[12px] font-extrabold tabular-nums text-emerald-200">
              {fmtINR(estimate.perVisit)}
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white/[0.04] p-4">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/60">
            What is included
          </div>
          <div className="mt-2.5 flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-[11.5px] font-semibold text-emerald-100/70">{lineLabel}</span>
              <span className="shrink-0 text-[12.5px] font-bold tabular-nums text-emerald-50/90">
                {fmtINR(estimate.weekly)}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-[11.5px] font-semibold text-emerald-100/70">Caregiver matching</span>
              <span className="shrink-0 text-[12.5px] font-bold text-emerald-50/90">Included</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-[11.5px] font-semibold text-emerald-100/70">Platform fee</span>
              <span className="shrink-0 text-[12.5px] font-bold text-emerald-300">₹0</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-[11.5px] font-semibold text-emerald-100/70">Cancellation</span>
              <span className="shrink-0 text-[12.5px] font-bold text-emerald-50/90">Free till 24 h</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3.5 py-3">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">
            Total per {cadence}
          </span>
          <motion.span
            key={estimate.weekly}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-[15px] font-black tabular-nums tracking-tight text-white"
          >
            {fmtINR(estimate.weekly)}
          </motion.span>
        </div>
      </div>
    </PhaseHero>
  )
}

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

export function WhoCard({ who, onOpen }: { who: number; onOpen: () => void }) {
  const person = lovedOnes[who]
  return (
    <Card intent="success">
      <div className="p-5">
        <Row
          leading={
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[16px] font-extrabold text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.7)]">
              {person.name.charAt(0)}
            </span>
          }
          title={person.name}
          titleClassName="text-[15px] font-extrabold leading-snug tracking-tight"
          titleMeta={<Chip intent="success">Selected</Chip>}
          subtitle={`Age ${person.age}, ${person.category}, consent on file`}
          subtitleClassName="text-xs font-semibold leading-snug text-[#0B211B]/50"
          trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
          showChevron={false}
          surface="none"
          padding="none"
          className="gap-3.5"
          onClick={onOpen}
        />

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.06] px-4 py-3.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 flex-1 text-pretty text-[12px] font-semibold leading-snug text-[#0B211B]/70">
            Your confirmation becomes a signed consent record before any caregiver is dispatched.
          </span>
        </div>
      </div>
    </Card>
  )
}

export function WhoSheet({
  who,
  onPick,
  onAdd,
  onClose,
}: {
  who: number
  onPick: (index: number) => void
  onAdd: () => void
  onClose: () => void
}) {
  return (
    <SheetShell
      icon={UserRoundCheck}
      tone="success"
      title="Who is this booking for"
      subtitle="Anyone on your family plan, consent applies per person"
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onAdd}
          className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08]"
        >
          Add someone new from your profile
        </button>
      }
    >
      <div className="flex flex-col gap-2">
        {lovedOnes.map((p, i) => {
          const active = who === i
          return (
            <OptionRow
              key={p.name}
              selected={active}
              onSelect={() => onPick(i)}
              initial={p.name.charAt(0)}
              title={p.name}
              sub={`Age ${p.age}, ${p.category}`}
              trailing={<OptionCheck on={active} />}
            />
          )
        })}
      </div>
    </SheetShell>
  )
}

export function WizardStepper({ activeIndex }: { activeIndex: number }) {
  return (
    <div>
      <div className="relative h-4">
        <span
          aria-hidden
          className="absolute top-1/2 h-px bg-white/15"
          style={{ left: '16.67%', right: '16.67%' }}
        />
        <span
          aria-hidden
          className="absolute top-1/2 h-px bg-emerald-300/60 transition-all duration-500"
          style={{ left: '16.67%', width: `${(activeIndex / (wizardSteps.length - 1)) * 66.66}%` }}
        />
        <div className="absolute inset-0 grid grid-cols-3">
          {wizardSteps.map((step, i) => (
            <span key={step} className="flex items-center justify-center">
              {i === activeIndex ? (
                <span className="relative grid h-4 w-4 place-items-center">
                  <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-300/50" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(52,211,153,0.2)]" />
                </span>
              ) : i < activeIndex ? (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#0B231C] shadow-[0_0_0_3px_rgba(52,211,153,0.15)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B231C]" />
                </span>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-white/20 shadow-[0_0_0_3px_rgba(255,255,255,0.04)]" />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-1.5 grid grid-cols-3">
        {wizardSteps.map((step, i) => (
          <span
            key={step}
            className={cn(
              'text-center text-[8px] font-extrabold uppercase tracking-[0.12em]',
              i === activeIndex ? 'text-emerald-100/80' : i < activeIndex ? 'text-emerald-100/60' : 'text-emerald-100/30',
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}