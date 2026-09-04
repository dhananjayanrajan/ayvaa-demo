import { motion } from 'motion/react'
import { Camera, Check, FileImage, Pencil, ShieldAlert, ShieldCheck } from 'lucide-react'
import type { Severity, SeverityConfig } from '@/data/incidentData'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/base/ui/textarea'
import { Chip } from '@/components/base/phone/kit'
import { PhaseHero } from '@/components/base/phone/phase-hero'
import { useRef } from 'react'

type Props_CausePicker = {
  causes: string[]
  cause: string
  config: SeverityConfig
  onSelect: (cause: string) => void
}

export function CausePicker({ causes, cause, config, onSelect }: Props_CausePicker) {
  return (
    <div>
      <div className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">What happened</div>
      <div className="flex flex-wrap gap-2">
        {causes.map((c) => {
          const active = cause === c
          return (
            <motion.button
              key={c}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(c)}
              aria-pressed={active}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold transition-colors',
                active ? config.causeActive : 'bg-[#0B211B]/[0.045] text-[#0B211B]/55',
              )}
            >
              {active && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
              {c}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

type Props_DescriptionInput = {
  draft: string
  config: SeverityConfig
  onChange: (value: string) => void
}

export function DescriptionInput({ draft, config, onChange }: Props_DescriptionInput) {
  const filled = draft.trim().length > 0
  return (
    <div
      className={cn(
        'rounded-2xl p-4 transition-colors',
        filled ? config.attach.activeBg : 'bg-[#0B211B]/[0.035]',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]',
          filled ? config.attach.overline : 'text-[#0B211B]/40',
        )}
      >
        <Pencil className="h-3 w-3" aria-hidden />
        Description
      </div>

      <Textarea
        value={draft}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe what happened…"
        className="mt-2.5 min-h-24 w-full resize-none rounded-2xl border-0 bg-white p-3.5 text-[13px] font-medium leading-relaxed text-[#0B211B] shadow-inner placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B211B]/15"
      />

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5 truncate text-[10px] font-bold text-[#0B211B]/40">
          <ShieldCheck className="h-3 w-3 shrink-0" aria-hidden />
          Sealed on submit · logged with your name
        </span>
        <span
          className={cn(
            'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] transition-colors',
            filled ? config.attach.overline : 'bg-[#0B211B]/[0.05] text-[#0B211B]/40',
          )}
        >
          {filled ? 'Attached' : 'Required'}
        </span>
      </div>
    </div>
  )
}

type Props_IncidentHero = {
  config: SeverityConfig
}

export function IncidentHero({ config }: Props_IncidentHero) {
  return (
    <PhaseHero
      theme={{
        border: config.shell.border,
        shell: config.shell.bg,
        orbA: config.shell.glowA,
        orbB: config.shell.glowB,
        hairline: 'via-white/20',
      }}
    >
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-current">
        <ShieldAlert className="h-3 w-3" aria-hidden />
        <span className={config.shell.overline}>Visit on hold</span>
      </div>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Care holds until{' '}
        <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', config.shell.gradient)}>this is filed</span>
      </h2>

      <div className="mt-5 rounded-2xl bg-white/[0.06] p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className={cn('min-w-0 flex-1 truncate font-mono text-[10px] font-bold uppercase tracking-[0.14em]', config.shell.overline)}>
            Guided walk · 8 of 15 min
          </span>
          <Chip intent="warning" dot>
            Paused
          </Chip>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '53%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full bg-gradient-to-r', config.shell.meter)}
          />
        </div>
      </div>
    </PhaseHero>
  )
}

type Props_PhotoAttach = {
  photo: { name: string; size: string } | null
  config: SeverityConfig
  onAttach: (file: { name: string; size: string; url: string }) => void
}

export function PhotoAttach({ photo, config, onAttach }: Props_PhotoAttach) {
  const inputRef = useRef<HTMLInputElement>(null)

  const pick = () => inputRef.current?.click()

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const size = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`
    onAttach({ name: file.name, size, url: URL.createObjectURL(file) })
    e.target.value = ''
  }

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} aria-label="Attach photo of the area" />
      {photo ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.985 }}
          onClick={pick}
          className={cn('flex w-full items-center gap-3 rounded-2xl p-3 text-left', config.attach.activeBg)}
        >
          <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-2xl', config.attach.photoBg)}>
            <FileImage className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]', config.attach.overline)}>
              Photo attached
              <Check className="h-2.5 w-2.5 shrink-0" strokeWidth={4} aria-hidden />
            </span>
            <span className="mt-0.5 block truncate text-[12.5px] font-bold text-[#0B211B]/75">{photo.name}</span>
            <span className={cn('mt-0.5 block text-[10.5px] font-semibold', config.attach.sub)}>
              {photo.size} · tap to replace · access is logged
            </span>
          </span>
        </motion.button>
      ) : (
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={pick}
          className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#0B211B]/[0.05] px-4 text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.08]"
        >
          <Camera className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate text-[13px] font-bold">Attach photo of the area</span>
        </motion.button>
      )}
    </>
  )
}

type Props_SeveritySelector = {
  severities: Severity[]
  severity: Severity
  onSelect: (severity: Severity) => void
}

const activeTint: Record<Severity, string> = {
  Minor: 'bg-blue-500/[0.12] text-blue-700',
  Moderate: 'bg-amber-500/[0.16] text-amber-700',
  Critical: 'bg-rose-500/[0.14] text-rose-600',
}

export function SeveritySelector({ severities, severity, onSelect }: Props_SeveritySelector) {
  return (
    <div className="flex gap-2">
      {severities.map((s) => {
        const active = severity === s
        return (
          <motion.button
            key={s}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(s)}
            aria-pressed={active}
            className={cn(
              'flex flex-1 items-center justify-center rounded-2xl py-3 text-[13px] font-extrabold tracking-tight transition-colors',
              active ? activeTint[s] : 'bg-[#0B211B]/[0.04] text-[#0B211B]/45',
            )}
          >
            {s}
          </motion.button>
        )
      })}
    </div>
  )
}

type Props_SubmittedPanel = {
  severity: string
  config: SeverityConfig
  photo: string | null
}

export function SubmittedPanel({ severity, config, photo }: Props_SubmittedPanel) {
  return (
    <div className="flex flex-col gap-3.5 pb-2">
      <div className={cn('relative overflow-hidden rounded-2xl p-4', config.panel.bg)}>
        <div aria-hidden className={cn('pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl', config.panel.glow)} />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em]', config.panel.overline)}>What happens now</span>
            <Chip intent={config.chipLight} light className="border-transparent">
              {severity}
            </Chip>
          </div>
          <div className="mt-3 flex flex-col gap-2.5">
            {config.effects.map((e) => {
              const Icon = e.icon
              return (
                <div key={e.text} className="flex items-start gap-3">
                  <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-lg', config.panel.dot)}>
                    <Icon className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                  </span>
                  <span className={cn('min-w-0 flex-1 pt-0.5 text-[12.5px] font-semibold leading-snug', config.panel.text)}>
                    {e.text}
                  </span>
                </div>
              )
            })}
          </div>
          {photo && (
            <div className={cn('mt-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5 text-[10.5px] font-bold', config.panel.text)}>
              Photo evidence sealed · {photo} · access is logged
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type Props_TriggerPreview = {
  config: SeverityConfig
  severity: string
}

export function TriggerPreview({ config, severity }: Props_TriggerPreview) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl p-4', config.panel.bg)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl', config.panel.glow)} />
      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em]', config.panel.overline)}>
            What submitting triggers
          </span>
          <Chip intent={config.chipLight} light dot={severity !== 'Minor'} className="border-transparent">
            {severity}
          </Chip>
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          {config.effects.map((e) => {
            const Icon = e.icon
            return (
              <div key={e.text} className="flex items-start gap-3">
                <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-lg', config.panel.dot)}>
                  <Icon className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                </span>
                <span className={cn('min-w-0 flex-1 pt-0.5 text-[12.5px] font-semibold leading-snug', config.panel.text)}>
                  {e.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}