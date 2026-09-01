import { BadgeCheck, Camera, Check, FileImage, RefreshCw, ScanLine, ShieldOff } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { Row } from '@/components/phone/Row'
import { Card, Chip, Hero, Meter, Ring, Tile } from '@/components/phone/kit'
import type { CapturePhase } from '@/data/patientIdentity'
import { clearedSteps, faceMatchConfidence, faceMatchLabel, formatFileSize, privacyFacts } from '@/data/patientIdentity'
import { cn } from '@/lib/utils'

export function CaptureFileTile({
  name,
  size,
  onReplace,
}: {
  name: string
  size: string
  onReplace: () => void
}) {
  return (
    <button
      type="button"
      onClick={onReplace}
      className="flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.05]"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.12] text-emerald-600">
        <FileImage className="h-4 w-4" strokeWidth={2.2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-bold tracking-tight text-[#0B211B]">
          {name}
        </span>
        <span className="mt-0.5 block text-[10px] font-bold tabular-nums text-[#0B211B]/45">
          {size} · encrypted on capture
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#0B211B]/[0.05] px-3 py-1.5 text-[10px] font-extrabold text-[#0B211B]/55">
        <RefreshCw className="h-3 w-3" strokeWidth={2.4} aria-hidden />
        Retake
      </span>
    </button>
  )
}

export function CaptureTile({ phase, onPress }: { phase: CapturePhase; onPress: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.94 } : undefined}
      onClick={phase === 'idle' ? onPress : undefined}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      aria-label="Take a live selfie"
      className="relative grid place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 p-1 shadow-[0_20px_40px_-18px_rgba(16,185,129,0.8)] disabled:cursor-default"
    >
      <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white">
        {phase === 'idle' && (
          <>
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-emerald-400/20"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
            <Camera className="h-9 w-9 text-emerald-600" strokeWidth={2} aria-hidden />
          </>
        )}
        {phase === 'scanning' && (
          <>
            <span aria-hidden className="absolute inset-0 rounded-full bg-emerald-500/[0.12]" />
            <ScanLine className="h-9 w-9 animate-pulse text-emerald-600" aria-hidden />
          </>
        )}
        {phase === 'done' && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 340, damping: 16 }}
            className="grid h-full w-full place-items-center rounded-full bg-emerald-500 text-white"
          >
            <Check className="h-10 w-10" strokeWidth={3} aria-hidden />
          </motion.span>
        )}
      </span>
    </motion.button>
  )
}

export function ConfidencePanel() {
  return (
    <motion.div
      key="match"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-2xl bg-[#0B211B]/[0.04] p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/45">
          Face match confidence
        </span>
        <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">
          {faceMatchLabel}
        </span>
      </div>
      <Meter value={faceMatchConfidence} intent="success" delay={0.1} className="mt-2.5" />
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/45">
          <Check className="h-3 w-3 shrink-0 text-emerald-600" strokeWidth={3.5} aria-hidden />
          Threshold passed
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/45">
          <ShieldOff className="h-3 w-3 shrink-0 text-emerald-600" strokeWidth={2.6} aria-hidden />
          Selfie deleted after matching
        </span>
      </div>
    </motion.div>
  )
}

export type FinishState = 'idle' | 'working' | 'done'

export function FinishBar({
  verified,
  state,
  onFinish,
  onSkip,
}: {
  verified: boolean
  state: FinishState
  onFinish: () => void
  onSkip: () => void
}) {
  if (!verified) {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onSkip}
        className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.4] py-3.5 text-sm font-bold text-white transition-all"
      >
        Continue · finish selfie later
      </motion.button>
    )
  }
  return (
    <LifecycleButton
      phase={state}
      idleIcon={BadgeCheck}
      idleLabel="Finish verification"
      workingLabel="Sealing your identity"
      doneLabel="Identity verified"
      onPress={onFinish}
    />
  )
}

export function IdentityHero({ phase }: { phase: CapturePhase }) {
  const done = phase === 'done'
  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          Identity check
        </div>
        <Chip
          intent={done ? 'success' : 'warning'}
          light
          dot={!done}
          className="shrink-0 border-transparent"
        >
          {done ? 'Matched' : 'Selfie left'}
        </Chip>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Ring value={done ? 1 : 2 / 3} size={84} stroke={7} id="p04-progress">
          <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">
            {done ? '3/3' : '2/3'}
          </span>
          <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.16em] text-emerald-200/50">
            checks
          </span>
        </Ring>
        <div className="min-w-0 flex-1">
          <h2 className="text-balance text-[17px] font-extrabold leading-snug tracking-tight text-white">
            {done ? (
              <>
                Fully verified,{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  family plan live
                </span>
              </>
            ) : (
              <>
                Just your{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  face left
                </span>
              </>
            )}
          </h2>
          <p className="mt-1 text-[11px] font-medium leading-relaxed text-emerald-100/70">
            {done
              ? 'Your ID and selfie match. Verification is complete.'
              : 'One live selfie and verification completes.'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {clearedSteps.map((step) => (
          <div key={step.key} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <Tile icon={Check} tone="success" size="sm" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-bold tracking-tight text-emerald-50/90">
                {step.title}
              </div>
              <div className="mt-0.5 truncate text-[9.5px] font-semibold text-emerald-100/70">
                {step.detail}
              </div>
            </div>
            <JourneyTime value={step.time} />
          </div>
        ))}
        <div
          className={cn(
            'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-colors duration-300',
            done ? 'bg-emerald-400/[0.15]' : 'bg-white/[0.06]',
          )}
        >
          <Tile icon={Camera} tone={done ? 'white' : 'warning'} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-bold tracking-tight text-emerald-50/90">
              Live selfie match
            </div>
            <div className="mt-0.5 truncate text-[9.5px] font-semibold text-emerald-100/70">
              {done ? 'Passed with high confidence' : 'Awaiting your capture below'}
            </div>
          </div>
          {done ? (
            <Chip intent="success" light className="border-transparent">
              Passed
            </Chip>
          ) : (
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span className="absolute h-full w-full animate-ping rounded-full bg-amber-300 opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-amber-300" />
            </span>
          )}
        </div>
      </div>
    </Hero>
  )
}

export type JourneyTone = 'emerald' | 'amber'

const tones: Record<JourneyTone, string> = {
  emerald: 'bg-white/[0.08] text-emerald-100/80',
  amber: 'bg-white/[0.08] text-amber-200/80',
}

export function JourneyTime({
  value,
  tone = 'emerald',
}: {
  value: string
  tone?: JourneyTone
}) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2.5 py-1 text-[9px] font-extrabold tabular-nums',
        tones[tone],
      )}
    >
      {value}
    </span>
  )
}

export function PrivacyFactsCard() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  return (
    <Card intent="info">
      <div className="flex flex-col gap-2 p-4">
        {privacyFacts.map((fact) => {
          const open = openKey === fact.key
          const Icon = fact.icon
          return (
            <Row
              key={fact.key}
              leading={
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-sky-500/[0.12] text-sky-600">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                </span>
              }
              title={fact.title}
              titleClassName="text-[12.5px] font-bold tracking-tight"
              expandable
              open={open}
              onToggle={() => setOpenKey(open ? null : fact.key)}
              chevronInTrailing
              surface="none"
              className="rounded-2xl bg-sky-500/[0.06] px-3 py-2.5"
              hoverClassName=""
              expansion={<p className="text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{fact.body}</p>}
              expansionClassName="px-3 pb-3"
            />
          )
        })}
      </div>
    </Card>
  )
}

type CapturedFile = { name: string; size: string; url: string }

export function SelfieCaptureCard({
  phase,
  onCaptured,
}: {
  phase: CapturePhase
  onCaptured: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<CapturedFile | null>(null)

  useEffect(
    () => () => {
      if (file) URL.revokeObjectURL(file.url)
    },
    [file],
  )

  function handleFile(selected: File | null) {
    if (!selected) return
    if (file) URL.revokeObjectURL(file.url)
    setFile({
      name: selected.name,
      size: formatFileSize(selected.size),
      url: URL.createObjectURL(selected),
    })
    onCaptured()
  }

  const copy: Record<CapturePhase, { title: string; body: string }> = {
    idle: {
      title: 'Take a live selfie',
      body: 'Look straight ahead in good light. We compare it with your ID and delete the selfie right after.',
    },
    scanning: {
      title: 'Matching with your ID',
      body: 'Hold still while we check face geometry against your Aadhaar photo.',
    },
    done: {
      title: 'Selfie matched',
      body: 'Your ID and selfie match. Verification is complete.',
    },
  }

  return (
    <Card>
      <div className="flex flex-col items-center gap-4 p-6">
        <CaptureTile phase={phase} onPress={() => inputRef.current?.click()} />

        <div className="text-center">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
            {copy[phase].title}
          </div>
          <p className="mx-auto mt-1 max-w-[260px] text-pretty text-[12px] font-medium leading-relaxed text-[#0B211B]/50">
            {copy[phase].body}
          </p>
        </div>

        {phase === 'scanning' && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
            className="h-1 overflow-hidden rounded-full bg-[#0B211B]/[0.07]"
          >
            <span className="block h-full w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </motion.div>
        )}

        {phase === 'done' && <ConfidencePanel />}

        {file && (
          <CaptureFileTile
            name={file.name}
            size={file.size}
            onReplace={() => inputRef.current?.click()}
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0] ?? null)
          e.target.value = ''
        }}
      />
    </Card>
  )
}