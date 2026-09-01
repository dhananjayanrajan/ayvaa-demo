import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BadgeCheck, Check, CheckCircle2, ChevronDown, Clock, FileText, Fingerprint, Gavel, HeartPulse, IdCard, ListChecks, Loader2, Lock, ShieldCheck, Smartphone, XCircle } from 'lucide-react'
import { Row } from '@/components/phone/Row'
import { cn } from '@/lib/utils'
import { termsDocs, trustPoints } from '@/data/patientOnboarding'
import { Card, Chip, Hero, Kicker, Meter } from '@/components/phone/kit'
import { useState } from 'react'

export function ConsentBlock({
  accepted,
  onToggle,
  openDocId,
  onSelectDoc,
}: {
  accepted: boolean
  onToggle: () => void
  openDocId: string | null
  onSelectDoc: (id: string | null) => void
}) {
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_16px_36px_-24px_rgba(11,33,27,0.25)]">
      <button
        type="button"
        role="checkbox"
        aria-checked={accepted}
        onClick={onToggle}
        className="flex w-full items-start gap-3 text-left"
      >
        <span
          className={cn(
            'mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-xl transition-colors duration-300',
            accepted ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
          )}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
        </span>
        <span className="min-w-0 flex-1 text-pretty text-[12.5px] font-semibold leading-relaxed text-[#0B211B]/75">
          I accept both documents below and consent to identity verification.
        </span>
      </button>

      <div className="mt-3 flex flex-col gap-2">
        {termsDocs.map((doc) => {
          const open = openDocId === doc.id
          return (
            <div key={doc.id} className="rounded-2xl bg-[#0B211B]/[0.03]">
              <Row
                padding="px-3 py-2.5"
                leading={
                  <span
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors duration-300',
                      open ? 'bg-blue-500 text-white' : 'bg-blue-500/[0.1] text-blue-600',
                    )}
                  >
                    <FileText className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </span>
                }
                title={doc.title}
                titleClassName="text-[12px]"
                subtitle="Versioned document"
                subtitleClassName="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40"
                expandable
                open={open}
                onToggle={() => onSelectDoc(open ? null : doc.id)}
                chevronVisible={false}
                hoverClassName=""
                whileTapDisabled
                trailing={
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
                  </motion.span>
                }
                expansionPadded={false}
                expansion={
                  <p className="px-3.5 pb-3 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                    {doc.summary}
                  </p>
                }
              />
            </div>
          )
        })}
      </div>

      <div
        className={cn(
          'mt-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors duration-300',
          accepted ? 'bg-emerald-500/[0.08]' : 'bg-amber-500/[0.08]',
        )}
      >
        <span
          className={cn(
            'grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-300',
            accepted ? 'bg-emerald-500 text-white' : 'bg-amber-500/[0.2] text-amber-600',
          )}
        >
          {accepted ? (
            <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
          ) : (
            <Clock className="h-3 w-3" strokeWidth={2.6} aria-hidden />
          )}
        </span>
        <p
          className={cn(
            'min-w-0 flex-1 text-pretty text-[10px] font-bold leading-snug transition-colors duration-300',
            accepted ? 'text-emerald-700' : 'text-amber-700',
          )}
        >
          {accepted
            ? 'Written to your consent record'
            : 'Acceptance pending — written to your consent record once checked'}
        </p>
      </div>
    </div>
  )
}

const cell = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

export function PatientHero() {
  const [first, second, third] = trustPoints
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="text-[22px] font-black leading-none tracking-tight text-white">
            ayvaa<span className="text-emerald-300">+</span>
          </div>
          <Chip intent="success" light icon={ShieldCheck} className="border-transparent">
            Guardian plan
          </Chip>
        </div>

        <div className="mt-7 flex flex-col items-center">
          <div className="relative">
            <span aria-hidden className="absolute -inset-2.5 rounded-[26px] bg-emerald-400/20 blur-lg" />
            <motion.span
              className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_16px_32px_-14px_rgba(16,185,129,0.8)]"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HeartPulse className="h-7 w-7 text-white" strokeWidth={2.2} aria-hidden />
            </motion.span>
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-[#0B231C] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.6)]">
              <ShieldCheck className="h-3 w-3 text-emerald-300" strokeWidth={2.4} aria-hidden />
            </span>
          </div>
          <div className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
            Guardian onboarding
          </div>
          <h1 className="mt-2 text-balance text-center text-[19px] font-extrabold leading-snug tracking-tight text-white">
            One account,{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
              every loved one covered
            </span>
          </h1>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
          className="mt-6 grid grid-cols-2 gap-2"
        >
          <motion.div variants={cell}>
            <TrustCell icon={first.icon} label={first.label} />
          </motion.div>
          <motion.div variants={cell}>
            <TrustCell icon={second.icon} label={second.label} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-2"
        >
          <TrustCell wide icon={third.icon} label={third.label} />
        </motion.div>
      </div>
    </div>
  )
}

interface OnboardingFooterProps {
  allAgreed: boolean
  remaining: number
  total: number
  onAccept: () => void
}

export function OnboardingFooter({ allAgreed, remaining, total, onAccept }: OnboardingFooterProps) {
  const [loading, setLoading] = useState(false)
  const isZero = remaining === total

  const handleClick = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onAccept()
    }, 800)
  }

  return (
    <motion.button
      type="button"
      whileTap={loading || isZero ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={handleClick}
      disabled={loading || isZero}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-shadow',
        allAgreed
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : isZero
            ? 'bg-rose-600/80 cursor-not-allowed'
            : 'bg-[#0B211B]/[0.4]',
        loading && 'opacity-80',
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {allAgreed ? 'Accepting terms…' : 'Saving progress…'}
        </>
      ) : isZero ? (
        <>
          <Lock className="h-4 w-4 shrink-0 opacity-70" strokeWidth={2.4} aria-hidden />
          Accept at least one term to continue
        </>
      ) : (
        <>
          <Lock className={cn('h-4 w-4 shrink-0', !allAgreed && 'opacity-70')} strokeWidth={2.4} aria-hidden />
          {allAgreed ? 'Accept terms and start' : `Accept remaining ${remaining} to start`}
        </>
      )}
    </motion.button>
  )
}

interface OnboardingHeroProps {
  name: string
  role: string
  licence: string
  initials: string
}

const identityFacts = [
  { icon: ShieldCheck, label: 'Licence verified', detail: 'Karnataka Nursing Council confirmed active status.' },
  { icon: IdCard, label: 'ID matched', detail: 'Government ID and selfie matched at 99.2% confidence.' },
  { icon: Fingerprint, label: 'Biometric ready', detail: 'Fingerprint unlock enabled for instant sign-in.' },
]

export function OnboardingHero({ name, role, licence, initials }: OnboardingHeroProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Hero>
      <div className="flex items-start gap-3.5">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[15px] font-black tracking-tight text-emerald-100">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <Kicker>Onboarding · final step</Kicker>
          <h2 className="mt-1.5 text-[19px] font-extrabold leading-tight tracking-tight text-white">
            {name}
          </h2>
          <p className="mt-0.5 text-[12px] font-semibold leading-snug text-emerald-100/55">
            {role} · licence {licence}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50 rounded-full"
        >
          <Chip intent="success" light icon={BadgeCheck} className="border-transparent">
            Verified
          </Chip>
        </button>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <Fingerprint className="h-5 w-5 shrink-0 text-emerald-300" strokeWidth={2} aria-hidden />
        <p className="min-w-0 flex-1 text-[11px] font-bold leading-snug text-emerald-50/80">
          Your identity is the credential. Families see verified facts — never documents.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50 transition-colors hover:bg-white/[0.07]"
      >
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-200/70">
          Identity breakdown
        </span>
        <ChevronDown
          className={cn('h-4 w-4 text-emerald-200/50 transition-transform', expanded && 'rotate-180')}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex flex-col gap-2">
              {identityFacts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-2.5 rounded-xl bg-white/[0.05] px-3.5 py-2.5">
                  <fact.icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-extrabold text-emerald-50">{fact.label}</div>
                    <div className="mt-0.5 text-[10.5px] font-medium leading-snug text-emerald-100/60">{fact.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Hero>
  )
}

export function PrimaryAction({
  ready,
  onPress,
}: {
  ready: boolean
  onPress: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={ready ? { scale: 0.97 } : undefined}
      onClick={ready ? onPress : undefined}
      disabled={!ready}
      aria-disabled={!ready}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-4 text-[15px] font-extrabold tracking-tight transition-colors duration-300',
        ready
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_20px_40px_-18px_rgba(5,150,105,0.8)]'
          : 'cursor-not-allowed bg-[#0B211B]/[0.06] text-[#0B211B]/40',
      )}
    >
      {ready ? (
        <>
          Review &amp; create
          <ArrowRight className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} aria-hidden />
        </>
      ) : (
        <>
          <ListChecks className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Complete your details to continue
        </>
      )}
    </motion.button>
  )
}

export type ReviewEntry = { label: string; value: string }

export function ReviewSummary({
  entries,
  note,
}: {
  entries: ReviewEntry[]
  note: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-[#0B231C] p-4">
        <div className="flex flex-col gap-3.5">
          {entries.map((entry) => (
            <div key={entry.label} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
                  {entry.label}
                </div>
                <div className="mt-0.5 break-words text-[13px] font-bold tracking-tight text-emerald-50/90">
                  {entry.value}
                </div>
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

interface SafetyCheck {
  title: string
  body: string
  when: string
}

interface SafetyChecksCardProps {
  checks: SafetyCheck[]
  onCheckClick: (check: SafetyCheck) => void
}

export function SafetyChecksCard({ checks, onCheckClick }: SafetyChecksCardProps) {
  return (
    <Card>
      {checks.map((c) => (
        <div key={c.title}>
          <Row
            icon={ShieldCheck}
            tone="success"
            align="start"
            title={c.title}
            titleClassName="text-[13.5px] font-bold leading-snug tracking-tight"
            subtitle={c.body}
            subtitleClassName="text-[11px] font-semibold leading-snug text-[#0B211B]/45"
            trailing={
              <span className="flex shrink-0 flex-col items-end gap-1.5">
                <Chip intent="success" icon={Check} className="border-transparent">Done</Chip>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#0B211B]/35">{c.when}</span>
              </span>
            }
            showChevron={false}
            surface="none"
            padding="none"
            hoverClassName=""
            onClick={() => onCheckClick(c)}
          />
        </div>
      ))}
    </Card>
  )
}

export function SectionHeader({
  label,
  done,
  trailing,
}: {
  label: string
  done: boolean
  trailing: string
}) {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <span
        aria-hidden
        className={cn(
          'h-4 w-1 shrink-0 rounded-full transition-colors duration-300',
          done ? 'bg-emerald-500' : 'bg-amber-500',
        )}
      />
      <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">
        {label}
      </span>
      <span aria-hidden className="h-px min-w-0 flex-1 bg-[#0B211B]/[0.07]" />
      <span className="shrink-0 rounded-full bg-[#0B211B]/[0.05] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/45">
        {trailing}
      </span>
    </div>
  )
}

interface TermsAcceptanceCardProps {
  terms: string[]
  agreed: string[]
  onToggle: (term: string) => void
  allAgreed: boolean
  progress: number
}

export function TermsAcceptanceCard({ terms, agreed, onToggle, allAgreed, progress }: TermsAcceptanceCardProps) {
  const isZero = progress === 0
  const cardIntent = allAgreed ? 'success' : isZero ? 'danger' : 'warning'
  const meterIntent = allAgreed ? 'success' : isZero ? 'danger' : 'warning'

  return (
    <Card intent={cardIntent}>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Acceptance progress</span>
          <span className={cn('text-[10px] font-extrabold tabular-nums', isZero ? 'text-rose-700' : 'text-emerald-700')}>
            {Math.round(progress * 100)}%
          </span>
        </div>
        <Meter value={progress} intent={meterIntent} delay={0.2} className="mt-2.5" />
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4">
        {terms.map((t) => {
          const on = agreed.includes(t)
          return (
            <motion.button
              key={t}
              type="button"
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => onToggle(t)}
              className={cn(
                'flex items-start gap-3 rounded-2xl px-3.5 py-3 text-left outline-none transition-colors',
                'focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                on ? 'bg-emerald-500/[0.1]' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
              )}
            >
              <span
                className={cn(
                  'grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg transition-colors',
                  on ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.1] text-transparent',
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 text-[12.5px] font-semibold leading-snug',
                  on ? 'text-emerald-800' : 'text-[#0B211B]/70',
                )}
              >
                {t}
              </span>
            </motion.button>
          )
        })}
      </div>

      <div
        className={cn(
          'flex items-start gap-2 px-4 py-3.5',
          allAgreed ? 'bg-emerald-500/[0.08]' : isZero ? 'bg-rose-500/[0.08]' : 'bg-amber-500/[0.1]',
        )}
      >
        {allAgreed ? (
          <>
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.6} aria-hidden />
            <span className="min-w-0 flex-1 text-[11.5px] font-extrabold leading-snug text-emerald-700">
              All terms accepted · ready to start
            </span>
          </>
        ) : isZero ? (
          <>
            <XCircle className="h-4 w-4 shrink-0 text-rose-600" strokeWidth={2.6} aria-hidden />
            <span className="min-w-0 flex-1 text-[11.5px] font-extrabold leading-snug text-rose-700">
              No terms accepted yet — please review below
            </span>
          </>
        ) : (
          <>
            <Gavel className="h-4 w-4 shrink-0 text-amber-600" strokeWidth={2.6} aria-hidden />
            <span className="min-w-0 flex-1 text-[11.5px] font-extrabold leading-snug text-amber-700">
              {terms.length - agreed.length} term{terms.length - agreed.length > 1 ? 's' : ''} still need your agreement
            </span>
          </>
        )}
      </div>
    </Card>
  )
}

export function TrustCell({
  icon: Icon,
  label,
  wide = false,
}: {
  icon: LucideIcon
  label: string
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3 py-2.5',
        wide && 'bg-white/[0.04]',
      )}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/15">
        <Icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2.2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1 text-[10px] font-bold leading-tight text-emerald-100/75">
        {label}
      </span>
    </div>
  )
}
