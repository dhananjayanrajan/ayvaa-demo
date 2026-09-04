import { motion } from 'motion/react'
import { BadgeCheck, Camera, Check, Loader2, Mail, Smile } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { CODE_LENGTH, emailFallbackSubtitle, journeySteps, nextSteps } from '@/data/patientVerification'
import { Fragment, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Meter, Tile } from '@/components/base/phone/kit'

export type EmailSendState = 'idle' | 'working' | 'done'

export function EmailCodeButton({
  state,
  onPress,
}: {
  state: EmailSendState
  onPress: () => void
}) {
  const working = state === 'working'
  const done = state === 'done'
  return (
    <motion.button
      type="button"
      whileTap={state === 'idle' ? { scale: 0.97 } : undefined}
      onClick={state === 'idle' ? onPress : undefined}
      disabled={state !== 'idle'}
      aria-disabled={state !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold tracking-tight transition-colors duration-300',
        done
          ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.8)]'
          : working
            ? 'cursor-wait bg-emerald-600/60 text-white/80'
            : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
      )}
    >
      {working && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />}
      {done ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
      ) : (
        !working && <Mail className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {state === 'idle' ? 'Email me the code' : working ? 'Sending to your inbox' : 'Code sent by email'}
    </motion.button>
  )
}

export function EmailFallbackSheet({
  email,
  sendState,
  onSend,
  onClose,
}: {
  email: string
  sendState: EmailSendState
  onSend: () => void
  onClose: () => void
}) {
  return (
    <SheetShell
      icon={Mail}
      tone={sendState === 'done' ? 'success' : 'info'}
      title={sendState === 'done' ? 'Code sent by email' : 'Get the code by email'}
      subtitle={sendState === 'done' ? 'Check your inbox for the six digits' : emailFallbackSubtitle}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <EmailCodeButton state={sendState} onPress={onSend} />
          <motion.button
            type="button"
            whileTap={sendState === 'idle' ? { scale: 0.97 } : undefined}
            onClick={onClose}
            disabled={sendState !== 'idle'}
            aria-disabled={sendState !== 'idle'}
            className={cn(
              'w-full rounded-2xl py-3 text-sm font-bold transition-colors',
              sendState === 'idle'
                ? 'bg-[#0B211B]/[0.05] text-[#0B211B]/70'
                : 'cursor-not-allowed bg-[#0B211B]/[0.03] text-[#0B211B]/30',
            )}
          >
            Keep waiting for SMS
          </motion.button>
        </div>
      }
    >
      <div className="rounded-2xl bg-[#0B231C] p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
          Destination
        </div>
        <div className="mt-0.5 break-words font-mono text-[13px] font-bold tracking-tight text-emerald-50/90">
          {email}
        </div>
      </div>
    </SheetShell>
  )
}

export function JourneyRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex items-start">
      {journeySteps.map((step, i) => {
        const state = i < activeIndex ? 'done' : i === activeIndex ? 'now' : 'next'
        const Icon = step.icon
        return (
          <Fragment key={step.title}>
            {i > 0 && (
              <span
                aria-hidden
                className={cn(
                  'mt-[17px] h-px w-6 shrink-0 transition-colors duration-300',
                  state === 'done' ? 'bg-emerald-300/60' : 'bg-white/15',
                )}
              />
            )}
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
              {state === 'done' ? (
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/25 text-emerald-100">
                  <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
              ) : state === 'now' ? (
                <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/20 text-emerald-100">
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-xl bg-emerald-400/20" />
                  <Icon className="relative h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
              ) : (
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.07] text-emerald-100/40">
                  <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
              )}
              <span
                className={cn(
                  'text-[8.5px] font-extrabold uppercase tracking-[0.1em]',
                  state === 'next' ? 'text-emerald-100/40' : 'text-emerald-200',
                )}
              >
                {step.title}
              </span>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

const stepIcons: Record<string, LucideIcon> = {
  id: Camera,
  selfie: Smile,
}

export function NextStepsCard({ doneSteps, totalSteps }: { doneSteps: number; totalSteps: number }) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-4">
        {nextSteps.map((step) => {
          const Icon = stepIcons[step.key]
          return (
            <div key={step.key} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3">
              <Tile icon={Icon} tone={step.chipIntent === 'success' ? 'success' : 'neutral'} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                  {step.title}
                </div>
                <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                  {step.detail}
                </div>
              </div>
              <Chip intent={step.chipIntent}>{step.chip}</Chip>
            </div>
          )
        })}
      </div>
      <div className="mx-4 mb-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
          <span>Verification progress</span>
          <span className="tabular-nums text-emerald-700">
            {doneSteps} of {totalSteps}
          </span>
        </div>
        <Meter value={doneSteps / totalSteps} intent="warning" delay={0.3} className="mt-2" />
      </div>
    </Card>
  )
}

export function OtpInput({
  value,
  onChange,
}: {
  value: string[]
  onChange: (next: string[]) => void
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const [active, setActive] = useState(0)

  function focusCell(index: number) {
    const target = Math.min(CODE_LENGTH - 1, Math.max(0, index))
    refs.current[target]?.focus()
  }

  function setDigit(index: number, digit: string) {
    const next = [...value]
    next[index] = digit
    onChange(next)
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1)
    setDigit(index, digit)
    if (digit && index < CODE_LENGTH - 1) focusCell(index + 1)
  }

  function handleKeyDown(index: number, key: string) {
    if (key === 'Backspace' && !value[index] && index > 0) focusCell(index - 1)
  }

  function handlePaste(_index: number, raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, CODE_LENGTH).split('')
    if (!digits.length) return
    const next = Array.from({ length: CODE_LENGTH }, (_, i) => digits[i] ?? '')
    onChange(next)
    focusCell(digits.length)
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: CODE_LENGTH }, (_, i) => {
        const filled = value[i] !== ''
        return (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={value[i]}
            aria-label={`Digit ${i + 1} of ${CODE_LENGTH}`}
            onFocus={() => setActive(i)}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e.key)}
            onPaste={(e) => {
              e.preventDefault()
              handlePaste(i, e.clipboardData.getData('text'))
            }}
            className={cn(
              'h-16 w-12 rounded-xl text-center text-[26px] font-black tabular-nums outline-none transition-colors duration-200',
              filled
                ? 'bg-[#0B231C] text-emerald-200 shadow-[0_16px_32px_-16px_rgba(6,40,30,0.7)]'
                : active === i
                  ? 'bg-emerald-500/[0.12] caret-emerald-600'
                  : 'bg-[#0B211B]/[0.05]',
            )}
          />
        )
      })}
    </div>
  )
}

export type VerifyState = 'idle' | 'working' | 'done'

export function VerifyButton({
  ready,
  state,
  onPress,
}: {
  ready: boolean
  state: VerifyState
  onPress: () => void
}) {
  const working = state === 'working'
  const done = state === 'done'
  return (
    <motion.button
      type="button"
      whileTap={ready && state === 'idle' ? { scale: 0.97 } : undefined}
      onClick={ready && state === 'idle' ? onPress : undefined}
      disabled={!ready || state !== 'idle'}
      aria-disabled={!ready || state !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-extrabold tracking-tight transition-colors duration-300',
        done
          ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.8)]'
          : working
            ? 'cursor-wait bg-emerald-600/60 text-white/80'
            : ready
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
              : 'cursor-not-allowed bg-[#0B211B]/[0.06] text-[#0B211B]/40',
      )}
    >
      {working && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />}
      {done ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
      ) : (
        !working && <BadgeCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {state === 'idle'
        ? ready
          ? 'Verify and continue'
          : 'Enter all six digits to continue'
        : working
          ? 'Matching your code'
          : 'Phone verified'}
    </motion.button>
  )
}