import { ArrowRight, Check, Eye, Fingerprint, KeyRound, Loader2, Lock, Mail, MailCheck, ScanLine, Smartphone } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { EyeToggle, Field } from '@/components/phone/Field'
import { Row } from '@/components/phone/Row'
import { Card, Chip, Hero, LiveDot } from '@/components/phone/kit'
import type { DigestEntry } from '@/data/patientAuth'
import { digestEntries } from '@/data/patientAuth'
import type { FieldState } from '@/data/patientOnboarding'
import { cn } from '@/lib/utils'

export function BiometricNote() {
  return (
    <div className="flex items-center justify-between bg-[#0B211B]/[0.03] px-4 py-3">
      <span className="flex min-w-0 items-center gap-1.5">
        <LiveDot className="shrink-0 text-emerald-500" />
        <span className="truncate text-[10.5px] font-semibold text-[#0B211B]/55">
          Fingerprint unlocks by default
        </span>
      </span>
      <Chip intent="success">Biometrics on</Chip>
    </div>
  )
}

export type ScanState = 'idle' | 'scanning' | 'matched'

export function BiometricUnlock({
  state,
  onPress,
}: {
  state: ScanState
  onPress: () => void
}) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      <div className="relative flex flex-col items-center gap-3">
        <motion.button
          type="button"
          whileTap={state === 'idle' ? { scale: 0.94 } : undefined}
          onClick={state === 'idle' ? onPress : undefined}
          disabled={state !== 'idle'}
          aria-disabled={state !== 'idle'}
          aria-label="Unlock with fingerprint"
          className={cn(
            'relative grid h-24 w-24 place-items-center rounded-3xl transition-colors duration-300',
            state === 'matched'
              ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-16px_rgba(16,185,129,0.9)]'
              : 'bg-white/[0.08] text-emerald-200',
          )}
        >
          {state === 'idle' && (
            <>
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-3xl bg-emerald-400/15"
                animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-3xl bg-emerald-400/10"
                animate={{ scale: [1, 1.35], opacity: [0.4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
              />
            </>
          )}
          {state === 'matched' ? (
            <Check className="h-9 w-9" strokeWidth={2.6} aria-hidden />
          ) : state === 'scanning' ? (
            <ScanLine className="h-9 w-9 animate-pulse text-emerald-300" aria-hidden />
          ) : (
            <Fingerprint className="h-9 w-9" strokeWidth={1.8} aria-hidden />
          )}
        </motion.button>

        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/60">
          {state === 'matched'
            ? 'Welcome back'
            : state === 'scanning'
              ? 'Matching fingerprint'
              : 'Tap to unlock instantly'}
        </span>

        <AnimatePresence>
          {state === 'scanning' && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '80%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="h-1 overflow-hidden rounded-full bg-white/10"
            >
              <span className="block h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function CreateAccountCard({ onPress }: { onPress: () => void }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="block w-full text-left">
      <Card>
        <Row
          icon={Lock}
          tone="ink"
          tileSize="lg"
          title="Create a guardian account"
          titleClassName="text-[15px] font-extrabold leading-snug"
          subtitle="Cover every loved one under one verified plan"
          subtitleClassName="text-xs"
          trailing={<ArrowRight className="h-4 w-4 shrink-0 text-emerald-600/60" aria-hidden />}
          showChevron={false}
          className="gap-3.5 p-4"
          hoverClassName="hover:bg-transparent"
          whileTapDisabled
        />
      </Card>
    </motion.button>
  )
}

export function DigestDetail({
  summary,
  facts,
  note,
}: {
  summary: string
  facts: { label: string; value: string }[]
  note: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-[#0B231C] p-4">
        <p className="text-pretty text-[12px] font-medium leading-relaxed text-emerald-50/80">
          {summary}
        </p>
        <div className="mt-4 flex flex-col gap-3.5">
          {facts.map((fact) => (
            <div key={fact.label}>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
                {fact.label}
              </div>
              <div className="mt-0.5 break-words text-[13px] font-bold tracking-tight text-emerald-50/90">
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-xl bg-blue-500/[0.08] px-3.5 py-2.5">
        <Smartphone className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
        <p className="min-w-0 flex-1 text-pretty text-[10px] font-bold leading-snug text-blue-700">
          {note}
        </p>
      </div>
    </div>
  )
}

export function DigestHero({
  reviewedKeys,
  onOpenEntry,
}: {
  reviewedKeys: string[]
  onOpenEntry: (entry: DigestEntry) => void
}) {
  return (
    <Hero>
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-black leading-none tracking-tight text-white">
          ayvaa<span className="text-emerald-300">+</span>
        </div>
        <Chip intent="live" light dot className="border-transparent">
          Care moving
        </Chip>
      </div>

      <div className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/80">
        While you were away
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {digestEntries.map((entry) => (
          <DigestRow
            key={entry.key}
            entry={entry}
            reviewed={reviewedKeys.includes(entry.key)}
            onPress={onOpenEntry}
          />
        ))}
      </div>
    </Hero>
  )
}

const toneTile: Record<DigestEntry['tone'], string> = {
  emerald: 'bg-emerald-400/15 text-emerald-200',
  teal: 'bg-teal-400/15 text-emerald-200',
  inverse: 'bg-white/[0.12] text-emerald-100',
}

export function DigestRow({
  entry,
  reviewed,
  onPress,
}: {
  entry: DigestEntry
  reviewed: boolean
  onPress: (entry: DigestEntry) => void
}) {
  const live = entry.marker.kind === 'live' && !reviewed
  const Icon = entry.icon

  return (
    <Row
      leading={
        <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', toneTile[entry.tone])}>
          <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
      }
      title={entry.title}
      titleClassName="text-[12px] font-bold text-emerald-50/90"
      subtitle={entry.detail}
      subtitleClassName="truncate text-[10px] font-semibold text-emerald-100/70"
      trailing={
        reviewed ? (
          <span
            aria-label="Reviewed"
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-200"
          >
            <Check className="h-3 w-3" strokeWidth={3.2} aria-hidden />
          </span>
        ) : live ? (
          <LiveDot className="shrink-0 text-emerald-300" />
        ) : null
      }
      time={reviewed || live ? undefined : entry.marker.kind === 'time' ? entry.marker.value : undefined}
      dark
      liveDot={false}
      hoverClassName="hover:bg-transparent"
      surface="tint"
      surfaceTone={cn('rounded-2xl', live ? 'bg-emerald-400/[0.14]' : 'bg-white/[0.06]')}
      wrapSurface
      className="px-3.5 py-3"
      onClick={() => onPress(entry)}
      showChevron={false}
    />
  )
}

export type SeenState = 'idle' | 'working' | 'done'

export function MarkSeenButton({
  state,
  onPress,
}: {
  state: SeenState
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
        !working && <Eye className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {state === 'idle' ? 'Open the full record' : working ? 'Fetching the record' : 'Opened and reviewed'}
    </motion.button>
  )
}

export function PasswordCard({
  email,
  emailState,
  onEmailChange,
  password,
  passwordState,
  onPasswordChange,
  showPass,
  onTogglePass,
  signInReady,
  signInState,
  onSignIn,
  onForgot,
}: {
  email: string
  emailState: FieldState
  onEmailChange: (value: string) => void
  password: string
  passwordState: FieldState
  onPasswordChange: (value: string) => void
  showPass: boolean
  onTogglePass: () => void
  signInReady: boolean
  signInState: SignInState
  onSignIn: () => void
  onForgot: () => void
}) {
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
          Or use your password
        </span>
        <button
          type="button"
          onClick={onForgot}
          className="rounded-xl bg-[#0B211B]/[0.05] px-3 py-1.5 text-[10px] font-extrabold text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.08]"
        >
          Forgot?
        </button>
      </div>
      <div className="mt-2">
        <Field
          icon={Mail}
          label="Email address"
          htmlFor="p02-email"
          type="email"
          value={email}
          placeholder="you@example.com"
          state={emailState}
          invalidHint="Enter a valid email address"
          onChange={onEmailChange}
        />
        <Field
          icon={KeyRound}
          label="Password"
          htmlFor="p02-password"
          type={showPass ? 'text' : 'password'}
          mono
          value={password}
          placeholder="••••••••"
          state={passwordState}
          invalidHint="Passwords are at least 8 characters"
          onChange={onPasswordChange}
          trailing={<EyeToggle shown={showPass} onToggle={onTogglePass} />}
        />
      </div>
      <div className="p-4 pt-2">
        <SignInButton ready={signInReady} state={signInState} onPress={onSignIn} />
      </div>
      <BiometricNote />
    </div>
  )
}

export function ResetInfo({ email, validity }: { email: string; validity: string }) {
  return (
    <div className="rounded-2xl bg-[#0B231C] p-4">
      <div className="flex flex-col gap-3.5">
        <div>
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
            Sending to
          </div>
          <div className="mt-0.5 break-words text-[13px] font-bold tracking-tight text-emerald-50/90">
            {email}
          </div>
        </div>
        <div>
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
            Link validity
          </div>
          <div className="mt-0.5 break-words text-[13px] font-bold tracking-tight text-emerald-50/90">
            {validity}
          </div>
        </div>
      </div>
    </div>
  )
}

export type SendState = 'idle' | 'working' | 'done'

export function SendResetButton({
  state,
  onPress,
}: {
  state: SendState
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
        !working && <MailCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {state === 'idle' ? 'Send reset link' : working ? 'Sending your link' : 'Link sent'}
    </motion.button>
  )
}

export type SignInState = 'idle' | 'working' | 'done'

export function SignInButton({
  ready,
  state,
  onPress,
}: {
  ready: boolean
  state: SignInState
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
        'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold tracking-tight transition-colors duration-300',
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
      {done && <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />}
      {!working && !done && <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
      {state === 'idle'
        ? ready
          ? 'Sign in'
          : 'Enter your password to continue'
        : working
          ? 'Signing you in'
          : 'Signed in'}
    </motion.button>
  )
}