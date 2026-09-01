import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, Check, CheckCircle2, ChevronDown, Fingerprint, Gavel, IdCard, Loader2, Lock, ShieldCheck, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, Chip, Hero, Kicker, Meter } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'

// ── OnboardingFooter.tsx ──
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

// ── OnboardingHero.tsx ──
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

// ── SafetyChecksCard.tsx ──
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

// ── TermsAcceptanceCard.tsx ──
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
