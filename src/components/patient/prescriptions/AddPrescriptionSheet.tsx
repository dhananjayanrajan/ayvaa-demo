import { useEffect, useRef, useState } from 'react'
import { Check, Clock, Droplets, HeartPulse, Pill, Plus, ShieldCheck, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { OptionRow } from '@/components/phone/OptionRow'
import { Meter, MiniBadge } from '@/components/phone/kit'
import { PRESCRIBERS, RX_SCHEDULES, newPrescription, type Prescription } from '@/data/patientPrescriptions'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

function FieldRow({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  valid,
}: {
  icon: LucideIcon
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  valid: boolean
}) {
  const inputId = `add-rx-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={inputId}
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300',
          valid
            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.55)]'
            : 'bg-[#0B211B]/[0.06] text-[#0B211B]/45',
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
      </label>
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">{label}</span>
        <input
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-0.5 w-full bg-transparent text-[13px] font-bold tracking-tight text-[#0B211B] placeholder:font-semibold placeholder:text-[#0B211B]/25 focus:outline-none"
        />
      </span>
      {valid && (
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
        </span>
      )}
    </div>
  )
}

export function AddPrescriptionSheet({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (rx: Prescription) => void
}) {
  const { notify } = useDemo()
  const [name, setName] = useState('')
  const [dose, setDose] = useState('')
  const [schedule, setSchedule] = useState(RX_SCHEDULES[0])
  const [prescriber, setPrescriber] = useState(PRESCRIBERS[0])
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const nameOk = name.trim().length > 0
  const doseOk = dose.trim().length > 0
  const ready = nameOk && doseOk
  const filled = (nameOk ? 1 : 0) + (doseOk ? 1 : 0)

  const submit = () => {
    if (phase !== 'idle' || !ready) return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(
      setTimeout(() => {
        onAdd(newPrescription(name.trim(), dose.trim(), schedule, prescriber))
        notify({ title: 'Prescription added', body: 'Nurse verifies it before the next dose', kind: 'ok' })
      }, 1200),
    )
  }

  return (
    <SheetShell
      icon={Plus}
      title="Add prescription"
      subtitle="Only verified doctors can prescribe"
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <LifecycleButton
          phase={phase}
          gated={!ready}
          idleLabel={ready ? 'Add prescription' : 'Fill medication and dose first'}
          workingLabel="Adding…"
          doneLabel="Added"
          onPress={submit}
        />
      }
    >
      <div className="flex flex-col gap-3 pb-2">
        <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
              Prescription details
            </span>
            <span
              className={cn(
                'text-[10px] font-extrabold tabular-nums',
                filled === 2 ? 'text-emerald-700' : 'text-amber-700',
              )}
            >
              {filled} of 2 fields
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-3.5">
            <FieldRow
              icon={Pill}
              label="Medication"
              value={name}
              onChange={setName}
              placeholder="e.g. Amlodipine"
              valid={nameOk}
            />
            <FieldRow
              icon={Droplets}
              label="Dose"
              value={dose}
              onChange={setDose}
              placeholder="e.g. 5 mg"
              valid={doseOk}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Schedule</span>
          </span>
          <div className="mt-2.5 flex gap-1.5" role="radiogroup" aria-label="Schedule">
            {RX_SCHEDULES.map((s) => {
              const on = schedule === s
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setSchedule(s)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[12px] font-bold transition-colors',
                    on ? 'bg-[#0B211B] text-white' : 'bg-white text-[#0B211B]/55 hover:bg-white/80',
                  )}
                >
                  {on && <Check className="h-3 w-3 shrink-0" strokeWidth={3.2} aria-hidden />}
                  <span className="truncate">{s}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
          <span className="flex items-center gap-1.5">
            <Stethoscope className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
              Prescribing doctor
            </span>
          </span>
          <div className="mt-2.5 flex flex-col gap-1.5" role="radiogroup" aria-label="Prescribing doctor">
            {PRESCRIBERS.map((d) => {
              const on = prescriber === d
              return (
                <OptionRow
                  key={d}
                  role="radio"
                  selected={on}
                  onSelect={() => setPrescriber(d)}
                  tone="neutral"
                  className="px-3 py-2.5"
                  leading={
                    <span
                      className={cn(
                        'grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[12px] font-extrabold transition-colors',
                        on ? 'bg-[#0B211B] text-white' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/55',
                      )}
                    >
                      {d.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                    </span>
                  }
                  title={d}
                  titleClassName="block truncate text-[13px] font-bold tracking-tight"
                  unselectedTitleClassName="text-[#0B211B]"
                  sub="Verified prescriber"
                  subClassName="block text-[10px] font-semibold text-[#0B211B]/45"
                  trailing={
                    on ? (
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0B211B] text-white">
                        <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                      </span>
                    ) : (
                      <MiniBadge icon={ShieldCheck} tone="emerald">
                        Verified
                      </MiniBadge>
                    )
                  }
                />
              )
            })}
          </div>
        </div>

        <DarkPanel kicker="Ledger preview" kickerTrailing={
          <MiniBadge icon={Clock} tone="amber" dark>
            Awaiting nurse check
          </MiniBadge>
        }>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.16]">
              <HeartPulse className="h-5 w-5 text-emerald-200" strokeWidth={2.2} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-extrabold tracking-tight text-white">
                {name.trim() || 'New medication'}
              </span>
              <span className="mt-0.5 block truncate text-[11px] font-semibold text-emerald-100/55">
                {dose.trim() || 'Dose pending'}
              </span>
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/[0.06] px-3 py-2">
              <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Schedule</div>
              <div className="mt-0.5 truncate text-[11px] font-extrabold text-white">{schedule}</div>
            </div>
            <div className="rounded-xl bg-white/[0.06] px-3 py-2">
              <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Prescriber</div>
              <div className="mt-0.5 truncate text-[11px] font-extrabold text-white">{prescriber}</div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
              <span className={filled === 2 ? 'text-emerald-100/60' : 'text-amber-200/70'}>
                {ready ? 'Ready for the nurse' : 'Details missing'}
              </span>
              <span className={cn('tabular-nums', ready ? 'text-emerald-200' : 'text-amber-200')}>
                {Math.round((filled / 2) * 100)}%
              </span>
            </div>
            <Meter value={filled / 2} intent={ready ? 'success' : 'warning'} delay={0.2} className="mt-2" />
          </div>
        </DarkPanel>
      </div>
    </SheetShell>
  )
}
