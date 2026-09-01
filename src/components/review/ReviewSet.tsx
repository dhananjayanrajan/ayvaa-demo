import { BadgeCheck, Check, ChevronRight, CreditCard, Languages, Loader2, Lock, Quote, Scale, ScrollText, Send, Share2, ShieldCheck, Star } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { HeroHighlight, HeroTopRow, StatCell } from '@/components/phone/HeroCells'
import { FactRows } from '@/components/phone/FactRows'
import { CONSENT_ITEMS, REVIEW_GUARDIAN, REVIEW_MATCH, REVIEW_PATIENT, REVIEW_SCHEDULE, REVIEW_WEEK, activeDayNames, bookingRows, consentProgress, consentScopeRows, dispatchFacts, dispatchSteps, paymentMethod, recordRows, type ConsentId } from '@/data/patientReview'
import { motion } from 'motion/react'
import { StatusPill } from '@/components/phone/StatusPill'
import { Row } from '@/components/phone/Row'
import { OfferMeter } from '@/components/patient/matching/OfferMeter'
import { cn } from '@/lib/utils'
import { SheetShell } from '@/components/phone/SheetShell'
import { useRouter } from '@/lib/router'
import { StepList } from '@/components/phone/StepList'
import { HIGHLIGHT_TAGS, RATED_VISIT, buildFeedbackRows, ratingLabel } from '@/data/patientRating'
import { Card, Tile } from '@/components/phone/kit'
import { initialsOf } from '@/data/patientMatching'
import { useEffect, useRef, useState } from 'react'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { IconLifecycleButton } from '@/components/phone/LifecycleButton'

export function BookingRecordCard() {
  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Your booking"
        trailing={
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
            <Lock className="h-3 w-3" aria-hidden />
            Sealed
          </span>
        }
      />

      <div className="mt-4">
        <FactRows rows={recordRows()} />
      </div>
    </AccentHero>
  )
}

export function ConfirmedHero({ patientFirstName }: { patientFirstName: string }) {
  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Dispatch live"
        trailing={<StatusPill tone="emerald" label="Sealed" />}
      />

      <div className="mt-4 flex flex-col items-center text-center">
        <span className="relative grid h-[72px] w-[72px] place-items-center">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_16px_32px_-12px_rgba(16,185,129,0.8)]">
            <Check className="h-8 w-8 text-white" strokeWidth={3} aria-hidden />
          </span>
        </span>
        <motion.h2
          key="confirmed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="mt-3 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white"
        >
          Recurring care for <HeroHighlight>{patientFirstName}</HeroHighlight> is booked
        </motion.h2>
        <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/55">
          Consent is sealed and caregivers near you are seeing the offer right now.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {dispatchFacts.map((fact) => (
          <StatCell key={fact.label} label={fact.label} value={fact.value} />
        ))}
      </div>
    </AccentHero>
  )
}

interface ConsentCardProps {
  approvals: Record<ConsentId, boolean>
  onToggle: (id: ConsentId) => void
  onOpenScope: () => void
}

export function ConsentCard({ approvals, onToggle, onOpenScope }: ConsentCardProps) {
  const { done, total, ready } = consentProgress(approvals)

  return (
    <AccentHero tone={ready ? 'emerald' : 'amber'}>
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="h-3 w-3" aria-hidden />
        <span
          className={cn(
            'text-[9px] font-extrabold uppercase tracking-[0.22em]',
            ready ? 'text-emerald-200/50' : 'text-amber-200/50',
          )}
        >
          Consent agreement
        </span>
      </div>

      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {ready ? (
          <>
            Both approvals signed,{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">ready to seal</span>
          </>
        ) : (
          <>
            Two approvals{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">required to book</span>
          </>
        )}
      </h3>
      <p
        className={cn(
          'mt-1.5 text-pretty text-[12px] font-medium leading-relaxed',
          ready ? 'text-emerald-100/60' : 'text-amber-100/60',
        )}
      >
        Signed electronically as {REVIEW_GUARDIAN.name}, sealed permanently in your records.
      </p>

      <div className="mt-4 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
        <span className={ready ? 'text-emerald-100/50' : 'text-amber-100/50'}>Approval progress</span>
        <span className={cn('tabular-nums', ready ? 'text-emerald-200' : 'text-amber-200')}>
          {ready ? 'Complete' : `${done} of ${total}`}
        </span>
      </div>
      <OfferMeter value={total > 0 ? done / total : 0} fillClass={ready ? 'bg-emerald-300' : 'bg-amber-300'} className="mt-2" />

      <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
        {CONSENT_ITEMS.map((item) => {
          const on = approvals[item.id]
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              aria-pressed={on}
              className="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
            >
              <motion.span
                animate={{
                  backgroundColor: on ? 'rgb(16,185,129)' : 'rgba(255,255,255,0.12)',
                  scale: on ? 1 : 0.92,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg"
              >
                {on && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} aria-hidden />}
              </motion.span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold leading-snug tracking-tight text-white">{item.label}</span>
                <span className="block text-[10.5px] font-semibold leading-snug text-white/45">{item.sub}</span>
              </span>
            </button>
          )
        })}
      </div>

      <Row
        className="mt-3 rounded-2xl bg-white/[0.06] px-3.5 py-3"
        dark="white"
        padding="none"
        leading={
          <span
            className={cn(
              'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
              ready ? 'bg-emerald-400/[0.14] text-emerald-200' : 'bg-amber-400/[0.14] text-amber-200',
            )}
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </span>
        }
        title="What each consent grants"
        titleClassName="text-[12.5px]"
        subtitle="Withdraw anytime, pauses next visit"
        subtitleClassName="text-[10.5px] font-semibold text-white/45"
        onClick={onOpenScope}
        ariaExpanded={false}
        hoverClassName="hover:bg-white/[0.1]"
        whileTapDisabled
        showChevron={false}
        trailing={<ChevronRight className="h-4 w-4 shrink-0 text-white/25" aria-hidden />}
      />
    </AccentHero>
  )
}

interface ConsentScopeSheetProps {
  onClose: () => void
}

export function ConsentScopeSheet({ onClose }: ConsentScopeSheetProps) {
  const { navigate } = useRouter()

  return (
    <SheetShell
      icon={ScrollText}
      title="Consent scope"
      subtitle="Exactly what each approval allows"
      tone="info"
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={() => {
            onClose()
            navigate('/patient/p22')
          }}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-sky-600 py-3.5 text-[13px] font-bold text-white"
        >
          <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Full consent records
        </button>
      }
    >
      <div className="overflow-hidden rounded-2xl bg-[#0B211B]/[0.03]">
        {consentScopeRows().map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-3 px-3.5 py-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">{row.label}</span>
              <span className="truncate text-[12.5px] font-bold text-[#0B211B]/80">{row.value}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 pb-2 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
        Every consent is tied to your verified guardian account and visible in your records forever.
      </p>
    </SheetShell>
  )
}

export function DispatchSequence() {
  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <Send className="h-3 w-3" aria-hidden />
          Automatic sequence
        </span>
        <StatusPill tone="emerald" label="Live" />
      </div>

      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        The system{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">takes it from here</span>
      </h3>
      <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/60">
        Every step below fires on its own, and you get a push for each.
      </p>

      <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
        <StepList
          nodeStyle="circle"
          nodeSize="md"
          theme="dark"
          steps={dispatchSteps.map((step, i) => {
            const last = i === dispatchSteps.length - 1
            return {
              key: step.title,
              state: step.done ? 'done' : 'pending',
              node: step.done ? (
                <span className="relative mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-white">
                  {step.live && (
                    <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400/40" />
                  )}
                  <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                </span>
              ) : (
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
              ),
              title: step.title,
              titleClassName: 'text-[13px] leading-snug tracking-tight',
              body: step.note,
              bodyClassName: 'text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/45',
              contentClassName: last ? 'pb-0.5' : undefined,
            }
          })}
        />
      </div>
      <p className="mt-3 text-center text-[10.5px] font-semibold leading-relaxed text-emerald-100/40">
        Family and partner were notified the moment you confirmed.
      </p>
    </AccentHero>
  )
}

interface HighlightTagsProps {
  selected: string[]
  onToggle: (tag: string) => void
}

export function HighlightTags({ selected, onToggle }: HighlightTagsProps) {
  return (
    <div>
      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">What went well</div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {HIGHLIGHT_TAGS.map((tag) => {
          const on = selected.includes(tag)
          return (
            <motion.button
              key={tag}
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => onToggle(tag)}
              aria-pressed={on}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-2 text-[10.5px] font-bold transition-colors duration-200',
                on ? 'bg-amber-400 text-[#0B231C]' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55 hover:bg-[#0B211B]/[0.08]',
              )}
            >
              {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
              {tag}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export function PatientCard() {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.06] text-[13px] font-black tracking-tight text-[#0B211B]/60">
            {initialsOf(REVIEW_PATIENT.name)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{REVIEW_PATIENT.name}</div>
            <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/50">
              {REVIEW_PATIENT.relation} on your family plan
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Age</div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-[#0B211B]">
              {REVIEW_PATIENT.age}
            </div>
          </div>
          <div className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-2.5">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
              <Languages className="h-3 w-3" aria-hidden />
              Speaks
            </div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none text-[#0B211B]">
              {REVIEW_PATIENT.language}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.08] px-3 py-2.5">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
            Guardian consent on file, signed by {REVIEW_GUARDIAN.name}
          </span>
        </div>
      </div>
    </Card>
  )
}

export function PaymentCard() {
  const { navigate } = useRouter()

  return (
    <button type="button" onClick={() => navigate('/patient/p24')} className="block w-full text-left">
      <Card>
        <div className="flex items-center gap-3.5 p-4">
          <Tile icon={CreditCard} tone="info" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">
              {paymentMethod.label} ending {paymentMethod.last4}
            </div>
            <div className="mt-0.5 text-[11px] font-medium leading-snug text-[#0B211B]/55">{paymentMethod.note}</div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
        </div>
      </Card>
    </button>
  )
}

interface RateVisitSheetProps {
  submitted: boolean
  stars: number
  selectedTags: string[]
  note: string
  onStars: (stars: number) => void
  onToggleTag: (tag: string) => void
  onNote: (note: string) => void
  onConfirmed: () => void
  onClose: () => void
  onBackToVisits: () => void
  onHome: () => void
}

export function RateVisitSheet({
  submitted,
  stars,
  selectedTags,
  note,
  onStars,
  onToggleTag,
  onNote,
  onConfirmed,
  onClose,
  onBackToVisits,
  onHome,
}: RateVisitSheetProps) {
  const [phase, setPhase] = useState<'idle' | 'working'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const submit = () => {
    if (phase !== 'idle' || stars === 0) return
    setPhase('working')
    timers.current.push(setTimeout(() => onConfirmed(), 1000))
  }

  const rows = buildFeedbackRows(stars, selectedTags.length, note)

  return (
    <SheetShell
      icon={submitted ? BadgeCheck : Star}
      tone={submitted ? 'success' : 'info'}
      title={submitted ? 'Feedback sealed' : 'Rate the visit'}
      subtitle={
        submitted
          ? `${stars} of 5 recorded privately`
          : `${RATED_VISIT.caregiver.first}'s visit, ${RATED_VISIT.dateLabel}`
      }
      onClose={onClose}
      footer={
        submitted ? (
          <div className="flex gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onBackToVisits}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <span className="truncate">Back to visits</span>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onHome}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
            >
              <span className="truncate">Home</span>
            </motion.button>
          </div>
        ) : (
          <div>
            <motion.button
              type="button"
              whileTap={stars > 0 && phase === 'idle' ? { scale: 0.97 } : undefined}
              onClick={submit}
              disabled={stars === 0 || phase === 'working'}
              aria-disabled={stars === 0 || phase === 'working'}
              className={cn(
                'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
                stars === 0
                  ? 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/35'
                  : phase === 'working'
                    ? 'cursor-wait bg-amber-500/60'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]',
              )}
            >
              {phase === 'working' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  <span className="truncate">Sealing feedback…</span>
                </>
              ) : stars === 0 ? (
                <span className="truncate">Choose a rating first</span>
              ) : (
                <>
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                  <span className="truncate">Submit private feedback</span>
                </>
              )}
            </motion.button>
            <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">
              Goes to the quality team only, never the patient
            </p>
          </div>
        )
      }
    >
      {submitted ? (
        <div className="flex flex-col gap-5 pt-2">
          <div className="rounded-2xl bg-amber-500/[0.1] px-4 py-5">
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={cn(
                    'h-6 w-6',
                    n <= stars ? 'fill-amber-400 text-amber-400' : 'fill-[#0B211B]/[0.07] text-[#0B211B]/[0.07]',
                  )}
                  aria-hidden
                />
              ))}
            </div>
            <div className="mt-2.5 text-center text-[15px] font-extrabold tracking-tight text-[#0B211B]">
              {stars} of 5, <span className="text-amber-600">{ratingLabel(stars).toLowerCase()}</span>
            </div>
            <p className="mt-1 text-center text-[11px] font-medium text-[#0B211B]/55">
              For {RATED_VISIT.caregiver.first}, {RATED_VISIT.dateLabel}
            </p>
          </div>

          <div>
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
              Your feedback
            </div>
            <div className="mt-2.5 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5">
              <div className="flex flex-col gap-2.5">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-3">
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                      {row.label}
                    </span>
                    <span className="text-right text-[12.5px] font-bold text-[#0B211B]/80">{row.value}</span>
                  </div>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-amber-400/[0.16] px-3 py-1.5 text-[10.5px] font-bold text-amber-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {note.trim().length > 0 && (
            <div>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Your note</div>
              <QuotePanel className="mt-2" kicker="Verbatim" kickerIcon={Quote} quote={note.trim()} />
            </div>
          )}

          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
            <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
              Sealed to your feedback record. The caregiver sees aggregated scores only, never your words.
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 pt-2">
          <div className="rounded-2xl bg-amber-500/[0.1] px-4 py-5">
            <div className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/70">
              Your rating
            </div>
            <div className="mt-3">
              <StarPicker value={stars} onChange={onStars} />
            </div>
            <div className="mt-3 text-center">
              {stars > 0 ? (
                <span className="text-[15px] font-extrabold tracking-tight text-amber-600">
                  {ratingLabel(stars)}
                </span>
              ) : (
                <span className="text-[13px] font-bold text-[#0B211B]/40">Tap a star to begin</span>
              )}
            </div>
            <p className="mt-1 text-center text-[11px] font-medium text-[#0B211B]/50">
              How was {RATED_VISIT.caregiver.first} today?
            </p>
          </div>

          <HighlightTags selected={selectedTags} onToggle={onToggleTag} />

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
                Anything else, optional
              </span>
              {note.trim().length > 0 && (
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-700">Added</span>
              )}
            </div>
            <textarea
              value={note}
              onChange={(e) => onNote(e.target.value)}
              rows={4}
              placeholder="A line for Ayvaa or the caregiver, kept private…"
              className="mt-2 w-full resize-none rounded-2xl bg-[#0B211B]/[0.06] p-4 text-[12.5px] font-medium leading-relaxed text-[#0B211B]/85 transition-colors placeholder:text-[#0B211B]/40 focus:bg-[#0B211B]/[0.09] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2.5 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3">
            <Scale className="h-4 w-4 shrink-0 text-[#0B211B]/40" strokeWidth={2.2} aria-hidden />
            <span className="min-w-0 flex-1 text-[11px] font-medium leading-snug text-[#0B211B]/55">
              Ratings feed matching weights. Low scores trigger a quality review of the professional.
            </span>
          </div>
        </div>
      )}
    </SheetShell>
  )
}

interface RatingHeroProps {
  submitted: boolean
  stars: number
  highlightCount: number
  note: string
  onOpenSheet: () => void
}

export function RatingHero({ submitted, stars, highlightCount, onOpenSheet }: RatingHeroProps) {
  return (
    <AccentHero tone={submitted ? 'emerald' : 'amber'}>
      <HeroTopRow
        label="Private feedback"
        labelClass={submitted ? 'text-emerald-200/50' : 'text-amber-200/50'}
        trailing={
          submitted ? (
            <StatusPill tone="emerald" label="Sealed" />
          ) : (
            <StatusPill tone="amber" label="Awaiting rating" live />
          )
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        How was {RATED_VISIT.caregiver.first}&apos;s visit{' '}
        <HeroHighlight tone={submitted ? 'emerald' : 'amber'}>today</HeroHighlight>?
      </h2>
      <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">
        {submitted
          ? 'Your rating is sealed. It shapes matching quality only.'
          : 'Your rating reaches the quality team only, never the patient record.'}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatCell label="Visit" value={RATED_VISIT.dateLabel} labelClass="text-white/40" />
        <StatCell label="Caregiver" value={RATED_VISIT.caregiver.first} labelClass="text-white/40" />
      </div>

      {submitted ? (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-amber-400/[0.14] px-3.5 py-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
              <Star className="h-3 w-3 fill-amber-300 text-amber-300" aria-hidden />
              Your rating
            </div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">
              {stars} of {5} <span className="font-bold text-amber-200">{ratingLabel(stars)}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-amber-400/[0.14] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Highlights</div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">
              {highlightCount}
            </div>
          </div>
        </div>
      ) : (
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onOpenSheet}
          className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-amber-400/[0.14] px-4 py-3.5 text-left transition-colors hover:bg-amber-400/[0.2]"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-bold tracking-tight text-white">Rate this visit now</span>
            <span className="block text-[10.5px] font-semibold text-white/50">Stars, highlights and an optional note</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white/40" aria-hidden />
        </motion.button>
      )}
    </AccentHero>
  )
}

export function ReviewHero({ guardianFirstName }: { guardianFirstName: string }) {
  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Final check"
        trailing={
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums text-emerald-100/40">
            Step 3 of 3
          </span>
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        One tap and <HeroHighlight>care begins</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        {guardianFirstName} is approving a recurring plan, charged only after each completed visit.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <StatCell label="Visits" value={`${REVIEW_SCHEDULE.visitsPerWeek} per week`} />
        <StatCell label="Session length" value={REVIEW_SCHEDULE.duration} />
      </div>

      <div className="mt-2 rounded-2xl bg-white/[0.06] p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">Your week</span>
          <span className="truncate text-[10px] font-bold tabular-nums text-emerald-100/70">
            {activeDayNames()}, {REVIEW_SCHEDULE.time}
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-7 gap-1.5">
          {REVIEW_WEEK.map((day, i) => (
            <span
              key={`${day.full}-${i}`}
              className={`grid h-8 place-items-center rounded-xl text-[10px] font-extrabold uppercase ${
                day.active
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-400 text-[#0B231C] shadow-[0_6px_14px_-8px_rgba(16,185,129,0.9)]'
                  : 'bg-white/[0.06] text-emerald-100/25'
              }`}
            >
              {day.short}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Est. weekly total</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">
          {REVIEW_SCHEDULE.weeklyPrice}
        </span>
      </div>
    </AccentHero>
  )
}

export function ReviewMatchCard() {
  const { navigate } = useRouter()

  return (
    <AccentHero tone="emerald">
      <div className="flex items-start gap-3.5">
        <div className="relative shrink-0">
          <span className="grid h-14 w-14 place-items-center rounded-[20px] bg-white/[0.1] text-[15px] font-black tracking-tight text-white">
            {initialsOf(REVIEW_MATCH.name)}
          </span>
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-white">
            <BadgeCheck className="h-3 w-3 text-emerald-600" strokeWidth={3} aria-hidden />
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="truncate text-[15px] font-extrabold tracking-tight text-white">{REVIEW_MATCH.name}</div>
          <div className="truncate text-[11.5px] font-semibold text-emerald-100/55">{REVIEW_MATCH.role}</div>
        </div>
        <StatusPill tone="emerald" label="Primary" className="mt-0.5" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-white/70 text-white/70" aria-hidden />
          <span className="text-[11.5px] font-extrabold tabular-nums text-white/85">{REVIEW_MATCH.rating}</span>
        </span>
        <span className="text-[11px] font-bold tabular-nums text-white/55">{REVIEW_MATCH.years} yrs experience</span>
        <span className="text-[11px] font-bold tabular-nums text-white/55">{REVIEW_MATCH.sessions} sessions</span>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-200">
          <Send className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-bold tracking-tight text-white">Leading match for this booking</span>
          <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-100/55">
            Availability re-checked on acceptance
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => navigate('/patient/p11')}
        className="mt-2 flex w-full items-center justify-between gap-3 rounded-2xl bg-emerald-400/[0.12] px-3.5 py-3 text-left transition-colors duration-300 hover:bg-emerald-400/[0.18]"
      >
        <span className="min-w-0 text-[12px] font-extrabold text-emerald-50">View full profile</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-emerald-200/70" aria-hidden />
      </button>
    </AccentHero>
  )
}

export function ShareButton() {
  const [phase, setPhase] = useState<'idle' | 'done'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const share = () => {
    if (phase !== 'idle') return
    setPhase('done')
    timer.current = setTimeout(() => setPhase('idle'), 1800)
  }

  return (
    <IconLifecycleButton
      phase={phase}
      icon={Share2}
      revert
      ariaLabel={phase === 'done' ? 'Booking summary copied' : 'Share booking summary'}
      onPress={share}
    />
  )
}

interface StarPickerProps {
  value: number | null
  onChange: (stars: number) => void
}

export function StarPicker({ value, onChange }: StarPickerProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const on = value !== null && n <= value
        return (
          <motion.button
            key={n}
            type="button"
            whileTap={{ scale: 0.8 }}
            onClick={() => onChange(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            aria-pressed={value === n}
            className="grid h-10 w-10 place-items-center"
          >
            <motion.span
              animate={{ scale: on ? 1.05 : 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 16 }}
            >
              <Star
                className={cn(
                  'h-8 w-8 transition-colors duration-200',
                  on ? 'fill-amber-400 text-amber-400' : 'fill-[#0B211B]/[0.07] text-[#0B211B]/[0.07]',
                )}
                aria-hidden
              />
            </motion.span>
          </motion.button>
        )
      })}
    </div>
  )
}

export function SummaryCard() {
  return (
    <Card>
      <div className="p-5">
        <FactRows rows={bookingRows()} tone="light" />
      </div>
    </Card>
  )
}

const visitRecordRows = [
  { label: 'Checked in', value: RATED_VISIT.checkInAt },
  { label: 'Sign-off', value: RATED_VISIT.signOffAt },
  { label: 'Steps sealed', value: `${RATED_VISIT.stepsSealed} of ${RATED_VISIT.stepsSealed}` },
  { label: 'Goals met', value: `${RATED_VISIT.goalsMet} of ${RATED_VISIT.goalsMet}` },
]

export function VisitRecordCard() {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={BadgeCheck} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
              Verified visit record
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Sealed before you rate. Your feedback never alters it.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <FactRows rows={visitRecordRows} tone="light" />
        </div>
      </div>
    </Card>
  )
}