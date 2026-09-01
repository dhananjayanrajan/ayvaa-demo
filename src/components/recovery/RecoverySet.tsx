import { Card, Hero, Meter, Tile } from '@/components/phone/kit'
import { VALIDITY_SECONDS, formatValidity, guarantees, safetyRules } from '@/data/patientRecovery'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Lock, MailCheck, Phone, PhoneCall, RotateCcw } from 'lucide-react'
import { guardian } from '@/data/seed'
import { useState } from 'react'
import { Row } from '@/components/phone/Row'
import { LifecycleButton, QuietLifecycleButton } from '@/components/phone/LifecycleButton'
import type { SendState } from '@/data/patientRecovery'
import { StatusStrip } from '@/components/phone/StatusStrip'

export function GuaranteesCard() {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-4">
        {guarantees.map((g) => {
          const Icon = g.icon
          return (
            <div key={g.key} className="flex items-start gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3">
              <Tile icon={Icon} tone={g.key === 'visits' ? 'success' : 'info'} />
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                  {g.title}
                </div>
                <p className="mt-0.5 text-pretty text-[11px] font-semibold leading-snug text-[#0B211B]/45">
                  {g.body}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export function RecoveryFoot({ onBack }: { onBack: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onBack}
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
    >
      <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      Back to sign in
    </motion.button>
  )
}

export function RecoveryHero() {
  return (
    <Hero>
      <div className="flex flex-col items-center pt-2 text-center">
        <motion.span
          className="relative grid h-20 w-20 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-200"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span aria-hidden className="absolute inset-0 animate-ping rounded-2xl bg-emerald-400/10" />
          <MailCheck className="relative h-9 w-9" strokeWidth={1.8} aria-hidden />
        </motion.span>
        <h2 className="mt-4 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          One secure link,{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            straight to you
          </span>
        </h2>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
          The link works once and expires in 30 minutes. Nothing else changes.
        </p>
        <div className="mt-4 w-full rounded-2xl bg-white/[0.06] px-3.5 py-3">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/45">
            Recovery destination
          </div>
          <div className="mt-1 truncate font-mono text-[13px] font-bold text-emerald-50/90">
            {guardian.email}
          </div>
        </div>
      </div>
    </Hero>
  )
}

export function SafetyCard() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  return (
    <Card intent="info">
      <div className="flex flex-col gap-2 p-4">
        {safetyRules.map((rule) => {
          const open = openKey === rule.key
          return (
            <Row
              key={rule.key}
              leading={
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-sky-500/[0.12] text-sky-600">
                  <Lock className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                </span>
              }
              title={rule.title}
              titleClassName="text-[12.5px] font-bold tracking-tight"
              expandable
              open={open}
              onToggle={() => setOpenKey(open ? null : rule.key)}
              chevronInTrailing
              surface="none"
              className="rounded-2xl bg-sky-500/[0.06] px-3 py-2.5"
              hoverClassName=""
              expansion={<p className="text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{rule.body}</p>}
              expansionClassName="px-3 pb-3"
            />
          )
        })}
      </div>
    </Card>
  )
}

export function SendLinkButton({
  state,
  expired,
  onPress,
}: {
  state: SendState
  expired: boolean
  onPress: () => void
}) {
  return (
    <LifecycleButton
      phase={state}
      idleIcon={MailCheck}
      idleLabel={expired ? 'Send a new link' : 'Send reset link'}
      workingLabel="Generating your link"
      doneLabel="Link sent"
      onPress={onPress}
    />
  )
}

export type CallState = 'idle' | 'working' | 'done'

export function SentActions({
  callState,
  onCall,
}: {
  callState: CallState
  onCall: () => void
}) {
  return (
    <div className="mt-3.5 flex gap-2.5">
      <motion.a
        href={`mailto:${guardian.email}`}
        whileTap={{ scale: 0.97 }}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-bold text-[#0B211B]/75"
      >
        <RotateCcw className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Open mail app</span>
      </motion.a>
      <QuietLifecycleButton
        phase={callState}
        idleIcon={Phone}
        idleLabel="Call instead"
        workingLabel="Requesting"
        doneLabel="Call requested"
        doneTone="tint"
        onPress={onCall}
      />
    </div>
  )
}

export function SentCard({
  remaining,
  callState,
  onCall,
}: {
  remaining: number
  callState: CallState
  onCall: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Card intent="success">
        <div className="p-4">
          <div className="flex items-center gap-3.5">
            <Tile icon={MailCheck} tone="success" size="lg" />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                Reset link sent
              </div>
              <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                Check your inbox, sent just now
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ValidityMeter remaining={remaining} />
          </div>

          <SentActions callState={callState} onCall={onCall} />

          <AnimatePresence>
            {callState === 'done' && (
              <StatusStrip icon={PhoneCall} title="Call requested" align="start" className="mt-3 px-3.5">
                A coordinator calls you within 10 minutes
              </StatusStrip>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

export function ValidityMeter({ remaining }: { remaining: number }) {
  const expired = remaining <= 0
  return (
    <div>
      <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
        <span>Link validity</span>
        <span
          className={
            expired
              ? 'text-rose-600'
              : 'tabular-nums text-emerald-700'
          }
        >
          {expired ? 'expired' : `expires in ${formatValidity(remaining)}`}
        </span>
      </div>
      <Meter
        value={Math.max(0, remaining) / VALIDITY_SECONDS}
        intent={expired ? 'danger' : 'success'}
        delay={0.2}
        className="mt-2"
      />
    </div>
  )
}