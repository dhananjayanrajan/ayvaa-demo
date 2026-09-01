import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { BadgeCheck, Bell, CalendarDays, Check, ChevronRight, ClipboardList, Clock, Droplets, Eye, FileImage, HeartPulse, Loader2, Lock, MessageSquare, Package, Pill, Pill as PillIcon, Plus, RefreshCw, Send, ShieldCheck, ShoppingCart, Stethoscope, Upload } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { Field } from '@/components/phone/Field'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { OptionRow } from '@/components/phone/OptionRow'
import { Card, Meter, MiniBadge, TimeChip } from '@/components/phone/kit'
import { PRESCRIBERS, RX_DOCUMENTS, RX_LEDGER_STRIP, RX_MESSAGES, RX_SCHEDULES, activeOf, lowOf, newPrescription, takenIntent, type Prescription, weekTakenOf } from '@/data/patientPrescriptions'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { Row } from '@/components/phone/Row'
import { formatFileSize } from '@/data/patientIdentity'
import { FactRows } from '@/components/phone/FactRows'
import { AccentHero } from '@/components/phone/AccentHero'
import { HeroHighlight, HeroTopRow } from '@/components/phone/HeroCells'

// ── AddPrescriptionSheet.tsx ──
type Phase_AddPrescriptionSheet = 'idle' | 'working' | 'done'

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
  const [phase, setPhase] = useState<Phase_AddPrescriptionSheet>('idle')
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
            <Field
              bare
              labelFor="tile"
              ariaInvalid={false}
              icon={Pill}
              label="Medication"
              htmlFor="add-rx-medication"
              value={name}
              onChange={setName}
              placeholder="e.g. Amlodipine"
              state={nameOk ? 'valid' : 'empty'}
              tileTone={{
                empty: 'bg-[#0B211B]/[0.06] text-[#0B211B]/45',
                valid:
                  'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.55)]',
              }}
              iconClassName="h-[18px] w-[18px]"
              labelClassName="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40"
              inputClassName="mt-0.5 w-full bg-transparent text-[13px] font-bold tracking-tight text-[#0B211B] outline-none placeholder:font-semibold placeholder:text-[#0B211B]/25 focus:outline-none"
              trailing={
                nameOk ? (
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                  </span>
                ) : undefined
              }
            />
            <Field
              bare
              labelFor="tile"
              ariaInvalid={false}
              icon={Droplets}
              label="Dose"
              htmlFor="add-rx-dose"
              value={dose}
              onChange={setDose}
              placeholder="e.g. 5 mg"
              state={doseOk ? 'valid' : 'empty'}
              tileTone={{
                empty: 'bg-[#0B211B]/[0.06] text-[#0B211B]/45',
                valid:
                  'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.55)]',
              }}
              iconClassName="h-[18px] w-[18px]"
              labelClassName="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40"
              inputClassName="mt-0.5 w-full bg-transparent text-[13px] font-bold tracking-tight text-[#0B211B] outline-none placeholder:font-semibold placeholder:text-[#0B211B]/25 focus:outline-none"
              trailing={
                doseOk ? (
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                  </span>
                ) : undefined
              }
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

// ── DocumentsCard.tsx ──
type Phase_DocumentsCard = 'idle' | 'scanning' | 'done'

interface UploadedFile {
  name: string
  size: string
}

export function DocumentsCard() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase_DocumentsCard>('idle')
  const [file, setFile] = useState<UploadedFile | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    e.target.value = ''
    if (!selected) return
    setFile({ name: selected.name, size: formatFileSize(selected.size) })
    setPhase('scanning')
    timers.current.push(setTimeout(() => setPhase('done'), 1400))
    timers.current.push(
      setTimeout(() => notify({ title: 'Prescription uploaded', body: 'Nurse verifies it before the next dose', kind: 'ok' }), 1900),
    )
  }

  return (
    <Card>
      <div className="flex flex-col gap-1.5 p-4">
        {RX_DOCUMENTS.map((doc) => (
          <Row
            key={doc.title}
            icon={ClipboardList}
            tone="neutral"
            tileSize="lg"
            title={doc.title}
            titleClassName="text-[14px] font-extrabold"
            subtitle={doc.doctor}
            subtitleClassName="text-[11px] text-[#0B211B]/55"
            trailing={
              <span className="flex shrink-0 flex-col items-end gap-1.5">
                <MiniBadge icon={Lock} tone="amber">
                  Locked
                </MiniBadge>
                <TimeChip>{doc.uploadedAt}</TimeChip>
              </span>
            }
            surface="inset"
            padding="even"
            className="gap-3.5"
            hoverClassName="hover:bg-[#0B211B]/[0.05]"
            showChevron={false}
            onClick={() => notify({ title: doc.title, body: 'View logged to the audit trail', kind: 'info' })}
          />
        ))}

        {phase === 'idle' && (
          <Row
            leading={
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.06] text-[#0B211B]/60">
                <Upload className="h-5 w-5" strokeWidth={2.4} aria-hidden />
              </span>
            }
            title="Upload prescription"
            titleClassName="text-[14px] font-extrabold"
            subtitle="Photo or PDF, nurse checked"
            subtitleClassName="text-[11px] text-[#0B211B]/45"
            surface="inset"
            padding="even"
            className="gap-3.5"
            hoverClassName="hover:bg-[#0B211B]/[0.05]"
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
            onClick={() => inputRef.current?.click()}
          />
        )}

        {phase === 'scanning' && (
          <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.12] text-emerald-600">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-extrabold tracking-tight text-[#0B211B]">Checking with the nurse</span>
                <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/45">Verifying the prescription before use</span>
              </span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#0B211B]/[0.07]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              />
            </div>
          </div>
        )}

        {phase === 'done' && file && (
          <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white">
                <Check className="h-5 w-5" strokeWidth={2.6} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-extrabold tracking-tight text-[#0B211B]">Uploaded</span>
                <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/45">Nurse checks it before the next dose</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-3 w-full rounded-xl bg-white px-3 py-2.5 text-left transition-colors hover:bg-white/80"
            >
              <span className="flex items-center gap-2">
                <FileImage className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-[#0B211B]">{file.name}</span>
              </span>
              <span className="mt-2 flex items-center gap-1.5 pl-6">
                <MiniBadge icon={FileImage} tone="neutral">
                  {file.size}
                </MiniBadge>
                <MiniBadge icon={RefreshCw} tone="neutral">
                  Replace
                </MiniBadge>
              </span>
            </button>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFile} />
    </Card>
  )
}

// ── MessageSheet.tsx ──
type ChatMessage = { from: 'doctor' | 'family'; text: string; time: string }

export function MessageSheet({ prescriber, onClose }: { prescriber: string; onClose: () => void }) {
  const { notify } = useDemo()
  const [messages, setMessages] = useState<ChatMessage[]>(RX_MESSAGES)
  const [draft, setDraft] = useState('')

  const canSend = draft.trim().length > 0

  const send = () => {
    if (!canSend) return
    setMessages((cur) => [...cur, { from: 'family', text: draft.trim(), time: 'Now' }])
    setDraft('')
    notify({ title: 'Message sent', body: `${prescriber} replies within a few hours`, kind: 'ok' })
  }

  return (
    <SheetShell
      icon={MessageSquare}
      title={prescriber}
      subtitle="Replies within a few hours"
      tone="info"
      onClose={onClose}
      footer={
        <div className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send()
            }}
            placeholder="Ask about this prescription…"
            className="min-w-0 flex-1 rounded-2xl border border-[#0B211B]/[0.08] bg-white px-4 py-3 text-[12.5px] font-semibold text-[#0B211B] placeholder:text-[#0B211B]/35 focus:border-emerald-500/40 focus:outline-none"
          />
          <motion.button
            type="button"
            whileTap={canSend ? { scale: 0.94 } : undefined}
            onClick={send}
            disabled={!canSend}
            aria-disabled={!canSend}
            aria-label="Send message"
            className={cn(
              'grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors',
              canSend
                ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_12px_24px_-12px_rgba(16,185,129,0.8)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/35',
            )}
          >
            <Send className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </motion.button>
        </div>
      }
    >
      <div className="flex flex-col gap-2.5 pb-2">
        <div className="flex items-center gap-2 rounded-xl bg-[#0B211B]/[0.03] px-3 py-2.5">
          <Lock className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 text-[10.5px] font-bold text-[#0B211B]/55">
            Messages stay in your Ayvaa record, attached to this prescription
          </span>
        </div>

        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'max-w-[85%] rounded-2xl px-3.5 py-2.5',
              m.from === 'doctor' ? 'self-start bg-[#0B211B]/[0.04]' : 'self-end bg-emerald-500/[0.12]',
            )}
          >
            <p className="text-[12px] font-semibold leading-snug text-[#0B211B]/80">{m.text}</p>
            <div
              className={cn(
                'mt-1 text-[9px] font-bold tabular-nums',
                m.from === 'doctor' ? 'text-[#0B211B]/35' : 'text-emerald-700/60',
              )}
            >
              {m.time}
            </div>
          </motion.div>
        ))}
      </div>
    </SheetShell>
  )
}

// ── PrescriptionList.tsx ──
export function PrescriptionList({
  prescriptions,
  reminded,
  onSelect,
}: {
  prescriptions: Prescription[]
  reminded: string[]
  onSelect: (rx: Prescription) => void
}) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-2">
        {prescriptions.map((rx) => {
          const hasReminder = reminded.includes(rx.id)
          return (
            <Row
              key={rx.id}
              icon={rx.icon}
              tone={hasReminder ? 'success' : takenIntent(rx.takenToday)}
              title={`${rx.name} ${rx.dose}`}
              subtitle={rx.schedule}
              body={<span className="block text-[11px] font-medium leading-snug text-[#0B211B]/50">{rx.stock}</span>}
              chip={
                hasReminder
                  ? { label: 'Reminder set', intent: 'success', icon: Bell }
                  : { label: rx.takenToday ? 'Taken' : 'Due', intent: takenIntent(rx.takenToday) }
              }
              surface="none"
              padding="roomy"
              className={cn('py-3', hasReminder && 'rounded-2xl bg-emerald-500/[0.09]')}
              hoverClassName={hasReminder ? '' : 'hover:bg-[#0B211B]/[0.03]'}
              showChevron={false}
              trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />}
              onClick={() => onSelect(rx)}
            />
          )
        })}
      </div>
    </Card>
  )
}

// ── PrescriptionSheet.tsx ──
type Phase_PrescriptionSheet = 'idle' | 'working' | 'done'

const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function PrescriptionSheet({
  rx,
  onClose,
  onRefilled,
  onMessage,
  onReminded,
}: {
  rx: Prescription
  onClose: () => void
  onRefilled: () => void
  onMessage: () => void
  onReminded: () => void
}) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase_PrescriptionSheet>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const done = phase === 'done'

  const orderRefill = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        setPhase('done')
        onRefilled()
      }, 700),
    )
    timers.current.push(
      setTimeout(() => notify({ title: 'Refill ordered', body: 'Sunrise pharmacy delivers within 24 hours', kind: 'ok' }), 1200),
    )
  }

  const setReminder = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        setPhase('done')
        onReminded()
      }, 700),
    )
    timers.current.push(
      setTimeout(() => {
        notify({ title: 'Reminder set', body: `${rx.name}, ${rx.schedule}`, kind: 'ok' })
        onClose()
      }, 1200),
    )
  }

  return (
    <SheetShell
      icon={rx.icon}
      title={`${rx.name} ${rx.dose}`}
      subtitle={rx.purpose}
      tone={rx.low ? (done ? 'success' : 'danger') : 'info'}
      onClose={onClose}
      footer={
        rx.low ? (
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
            onClick={orderRefill}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
              phase === 'done'
                ? 'bg-emerald-600'
                : phase === 'working'
                  ? 'cursor-wait bg-rose-500/60'
                  : 'bg-gradient-to-r from-rose-600 to-red-600 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.75)]',
            )}
          >
            {phase === 'idle' && (
              <>
                <ShoppingCart className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Order refill</span>
              </>
            )}
            {phase === 'working' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Ordering…
              </>
            )}
            {phase === 'done' && (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Ordered</span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
            onClick={setReminder}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
              phase === 'done'
                ? 'bg-emerald-600'
                : phase === 'working'
                  ? 'cursor-wait bg-emerald-600/60'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            )}
          >
            {phase === 'idle' && (
              <>
                <Bell className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Set reminder</span>
              </>
            )}
            {phase === 'working' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Setting…
              </>
            )}
            {phase === 'done' && (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Reminder set</span>
              </>
            )}
          </motion.button>
        )
      }
    >
      <div className="flex flex-col gap-3 pb-2">
        <div className={cn('relative overflow-hidden rounded-2xl p-4', rx.low ? 'bg-[#230D14]' : 'bg-[#0B231C]')}>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl',
              rx.low ? 'bg-rose-400/20' : 'bg-emerald-400/20',
            )}
          />
          <div className="relative">
            <div
              className={cn(
                'text-[9px] font-extrabold uppercase tracking-[0.22em]',
                rx.low ? 'text-rose-200/50' : 'text-emerald-200/50',
              )}
            >
              Prescription record
            </div>
            <div className="mt-3.5">
              <FactRows
                rows={[
                  { label: 'Prescriber', value: rx.prescriber },
                  { label: 'Schedule', value: rx.schedule },
                  { label: 'Next dose', value: rx.nextDose },
                  { label: 'Stock', value: rx.stock },
                  { label: 'Verified', value: rx.verifiedBy },
                ]}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <MiniBadge icon={Clock} tone={rx.low ? 'rose' : 'emerald'} dark>
                Uploaded {rx.uploadedAt}
              </MiniBadge>
              <MiniBadge icon={Eye} tone={rx.low ? 'rose' : 'emerald'} dark>
                {rx.viewsLogged} views logged
              </MiniBadge>
              <MiniBadge icon={RefreshCw} tone={rx.low ? 'rose' : 'emerald'} dark>
                Refilled {rx.lastRefill}
              </MiniBadge>
            </div>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Last 7 days</span>
            </span>
            <span className="text-[12px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
              {weekTakenOf(rx.week)} of 7 taken
            </span>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl bg-[#0B211B]/[0.05]">
            <div className="flex">
              {rx.week.map((taken, i) => (
                <motion.span
                  key={i}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                  className={cn('h-2.5 min-w-0 flex-1', i > 0 && 'ml-px', taken ? 'bg-emerald-500' : 'bg-transparent')}
                />
              ))}
            </div>
          </div>
          <div className="mt-1.5 grid grid-cols-7">
            {DAY_LETTERS.map((d, i) => (
              <span key={i} className="text-center text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/35">
                {d}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Stock level</span>
              </span>
              <span className="text-[12px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
                {rx.low ? rx.stock : `${Math.round(rx.stockPct * 100)}%`}
              </span>
            </div>
            <Meter value={rx.stockPct} intent={rx.low ? 'danger' : 'success'} delay={0.15} className="mt-2.5" />
            <div className="mt-2 text-[10px] font-semibold text-[#0B211B]/45">
              {rx.low ? 'Refill on the way' : 'Stocked past next month'}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <span className="flex items-center gap-1.5">
            <Pill className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">How it is given</span>
          </span>
          <p className="mt-1.5 text-[12px] font-semibold leading-snug text-[#0B211B]/70">{rx.detail}</p>

          <div className="mt-3.5">
            <span className="flex items-center gap-1.5">
              <HeartPulse className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Why it matters</span>
            </span>
            <p className="mt-1.5 text-[12px] font-semibold leading-snug text-[#0B211B]/70">{rx.meaning}</p>
          </div>
        </Card>

        <Card className="p-0">
          <Row
            leading={
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.12] text-emerald-700">
                <MessageSquare className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </span>
            }
            title="Questions about this prescription?"
            titleClassName="text-[12px]"
            subtitle={`${rx.prescriber} replies within a few hours`}
            subtitleClassName="text-[10.5px]"
            surface="none"
            padding="none"
            className="p-4"
            hoverClassName="hover:bg-[#0B211B]/[0.02]"
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
            onClick={onMessage}
          />
        </Card>

        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0">
            <span className="block text-[10.5px] font-bold text-emerald-800">Verified by {rx.verifiedBy}</span>
            <span className="block text-[10px] font-semibold text-emerald-700/70">Sealed to the Rx ledger</span>
          </span>
        </div>
      </div>
    </SheetShell>
  )
}

// ── RefillCard.tsx ──
type Phase_RefillCard = 'idle' | 'working' | 'done'

export function RefillCard({ rx, onRefilled }: { rx: Prescription; onRefilled: () => void }) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase_RefillCard>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const done = phase === 'done'

  const order = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        setPhase('done')
        onRefilled()
      }, 700),
    )
    timers.current.push(
      setTimeout(() => notify({ title: 'Refill ordered', body: 'Sunrise pharmacy delivers within 24 hours', kind: 'ok' }), 1200),
    )
  }

  return (
    <AccentHero tone={done ? 'emerald' : 'rose'}>
      <div
        className={cn(
          'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em]',
          done ? 'text-emerald-200/50' : 'text-rose-200/50',
        )}
      >
        <PillIcon className="h-3 w-3" aria-hidden />
        {done ? 'Refill ordered' : 'Running low'}
      </div>
      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {rx.name},{' '}
        <span
          className={cn(
            'bg-clip-text text-transparent',
            done ? 'bg-gradient-to-r from-emerald-300 to-teal-200' : 'bg-gradient-to-r from-rose-300 to-red-200',
          )}
        >
          {done ? 'on the way' : 'refill ready'}
        </span>
      </h3>
      <p className={cn('mt-1.5 text-pretty text-[12px] font-medium leading-relaxed', done ? 'text-emerald-100/60' : 'text-rose-100/60')}>
        {rx.stock} left
      </p>
      <p className={cn('mt-0.5 text-[11px] font-semibold', done ? 'text-emerald-100/45' : 'text-rose-100/45')}>
        Prescribed by {rx.prescriber}
      </p>

      {done ? (
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-emerald-400/[0.12] px-3.5 py-3">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">
            Refill on the way
          </span>
          <MiniBadge icon={Clock} tone="emerald" dark>
            24 h
          </MiniBadge>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-400/[0.12] px-3.5 py-3">
          <span aria-hidden className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
          </span>
          <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-100">
            Care is not interrupted
          </span>
          <MiniBadge icon={Clock} tone="rose" dark>
            24 h
          </MiniBadge>
        </div>
      )}

      <motion.button
        type="button"
        whileTap={phase === 'idle' ? { scale: 0.97 } : undefined}
        onClick={order}
        disabled={phase !== 'idle'}
        aria-disabled={phase !== 'idle'}
        className={cn(
          'mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
          phase === 'done'
            ? 'bg-emerald-600'
            : phase === 'working'
              ? 'cursor-wait bg-rose-500/60'
              : 'bg-gradient-to-r from-rose-500 to-red-500 shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]',
        )}
      >
        {phase === 'idle' && (
          <>
            <ShoppingCart className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Order refill</span>
          </>
        )}
        {phase === 'working' && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Ordering…
          </>
        )}
        {phase === 'done' && (
          <>
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            <span className="truncate">Ordered</span>
          </>
        )}
      </motion.button>
      <p
        className={cn(
          'mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed',
          done ? 'text-emerald-100/40' : 'text-rose-100/40',
        )}
      >
        Refills follow the prescribing doctor&apos;s instruction — never guessed.
      </p>
    </AccentHero>
  )
}

// ── RxHero.tsx ──
type HeroTone = 'emerald' | 'sky' | 'amber' | 'rose'

const TONE: Record<
  HeroTone,
  {
    kicker: string
    highlight: 'emerald' | 'sky' | 'gold' | 'rose'
    stockBg: string
    stockLabel: string
    stockValue: string
    meter: 'success' | 'info' | 'warning' | 'danger'
    stripBg: string
    stripIconBg: string
    badge: 'emerald' | 'sky' | 'amber' | 'rose'
    lock: string
    lockText: string
  }
> = {
  emerald: {
    kicker: 'text-emerald-200/50',
    highlight: 'emerald',
    stockBg: 'bg-emerald-400/[0.1]',
    stockLabel: 'text-emerald-100/50',
    stockValue: 'text-emerald-200',
    meter: 'success',
    stripBg: 'bg-emerald-400/[0.12]',
    stripIconBg: 'bg-emerald-400/[0.16] text-emerald-200',
    badge: 'emerald',
    lock: 'text-emerald-300/70',
    lockText: 'text-emerald-100/55',
  },
  sky: {
    kicker: 'text-sky-200/50',
    highlight: 'sky',
    stockBg: 'bg-sky-400/[0.1]',
    stockLabel: 'text-sky-100/50',
    stockValue: 'text-sky-200',
    meter: 'info',
    stripBg: 'bg-sky-400/[0.12]',
    stripIconBg: 'bg-sky-400/[0.16] text-sky-200',
    badge: 'sky',
    lock: 'text-sky-300/70',
    lockText: 'text-sky-100/55',
  },
  amber: {
    kicker: 'text-amber-200/50',
    highlight: 'gold',
    stockBg: 'bg-amber-400/[0.1]',
    stockLabel: 'text-amber-100/50',
    stockValue: 'text-amber-200',
    meter: 'warning',
    stripBg: 'bg-amber-400/[0.12]',
    stripIconBg: 'bg-amber-400/[0.16] text-amber-200',
    badge: 'amber',
    lock: 'text-amber-300/70',
    lockText: 'text-amber-100/55',
  },
  rose: {
    kicker: 'text-rose-200/50',
    highlight: 'rose',
    stockBg: 'bg-rose-400/[0.1]',
    stockLabel: 'text-rose-100/50',
    stockValue: 'text-rose-200',
    meter: 'danger',
    stripBg: 'bg-rose-400/[0.12]',
    stripIconBg: 'bg-rose-400/[0.16] text-rose-200',
    badge: 'rose',
    lock: 'text-rose-300/70',
    lockText: 'text-rose-100/55',
  },
}

export function RxHero({ prescriptions, refilled }: { prescriptions: Prescription[]; refilled: boolean }) {
  const active = activeOf(prescriptions)
  const low = lowOf(prescriptions)
  const lowCount = refilled ? 0 : low.length
  const tone: HeroTone = lowCount === 0 ? 'emerald' : lowCount === 1 ? 'sky' : lowCount === 2 ? 'amber' : 'rose'
  const t = TONE[tone]
  const stocked = lowCount === 0

  const strip = refilled
    ? { Icon: Check, title: 'Refill on the way', sub: 'Sunrise pharmacy delivers within 24 hours', badge: '24 h' }
    : !stocked
      ? { Icon: ShoppingCart, title: 'Refill prescribed', sub: 'Order now so care is not interrupted', badge: '24 h' }
      : { Icon: Check, title: 'Every prescription stocked', sub: 'Next refills tracked automatically', badge: 'Ok' }

  return (
    <AccentHero tone={tone}>
      <HeroTopRow
        icon={ShieldCheck}
        label="Rx ledger"
        labelClass={t.kicker}
        trailing={
          <MiniBadge icon={ShieldCheck} tone={t.badge} dark>
            Verified
          </MiniBadge>
        }
      />
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {active.length} active,{' '}
        <HeroHighlight tone={t.highlight}>
          {stocked ? 'all stocked' : lowCount === 1 ? '1 needs refill' : `${lowCount} need refill`}
        </HeroHighlight>
      </h2>

      <div className={cn('mt-4 rounded-2xl p-3.5', t.stockBg)}>
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
          <span className={t.stockLabel}>Stock health</span>
          <span className={cn('tabular-nums', t.stockValue)}>
            {stocked ? 'All ok' : lowCount === 1 ? '1 low' : `${lowCount} low`}
          </span>
        </div>
        <Meter
          value={(prescriptions.length - lowCount) / prescriptions.length}
          intent={t.meter}
          delay={0.2}
          className="mt-2"
        />
      </div>

      <div className={cn('mt-2 flex items-center gap-2.5 rounded-2xl px-3.5 py-3', t.stripBg)}>
        <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-lg', t.stripIconBg)}>
          <strip.Icon className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">{strip.title}</span>
          <span className="block text-[10px] font-semibold text-white/55">{strip.sub}</span>
        </span>
        <MiniBadge icon={Clock} tone={t.badge} dark>
          {strip.badge}
        </MiniBadge>
      </div>

      <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
        <Lock className={cn('h-3.5 w-3.5 shrink-0', t.lock)} strokeWidth={2.4} aria-hidden />
        <span className={cn('min-w-0 flex-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em]', t.lockText)}>
          {RX_LEDGER_STRIP}
        </span>
      </div>
    </AccentHero>
  )
}
