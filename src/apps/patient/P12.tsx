import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Bell, CalendarCheck, Check, House, Loader2, Send } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/base/phone/kit'
import { ReviewHero } from '@/components/patterns/heroes/review-hero'
import { ReviewMatchCard } from '@/components/patterns/cards/review-match-card'
import { PatientCard } from '@/components/patterns/cards/patient-card'
import { SummaryCard } from '@/components/patterns/cards/summary-card'
import { ConsentCard } from '@/components/patterns/cards/consent-card'
import { PaymentCard } from '@/components/patterns/cards/review-payment-card'
import { ConsentScopeSheet } from '@/components/patterns/sheets/consent-scope-sheet'
import { ConfirmedHero } from '@/components/patterns/heroes/confirmed-hero'
import { BookingRecordCard } from '@/components/patterns/cards/booking-record-card'
import { DispatchSequence } from '@/components/patterns/misc/dispatch-sequence'
import { ShareButton } from '@/components/patterns/actions/share-button'
import {
  REVIEW_GUARDIAN,
  REVIEW_PATIENT,
  consentProgress,
  type ConsentId,
} from '@/data/patientReview'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

type ConfirmPhase = 'idle' | 'working' | 'done'

export function P12() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [approvals, setApprovals] = useState<Record<ConsentId, boolean>>({ care: false, meds: false })
  const [sheet, setSheet] = useState(false)
  const [phase, setPhase] = useState<ConfirmPhase>('idle')
  const [confirmed, setConfirmed] = useState(false)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const { ready } = consentProgress(approvals)

  const toggleConsent = (id: ConsentId) => {
    setApprovals((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const confirmBooking = () => {
    if (!ready || phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 950))
    timers.current.push(
      setTimeout(() => {
        setConfirmed(true)
        notify({ title: 'Booking confirmed', body: 'Consent sealed permanently and offers dispatched to 14 caregivers', kind: 'ok' })
      }, 1600),
    )
  }

  if (confirmed) {
    return (
      <Screen>
        <AppBar
          title="Booking confirmed"
          trailing={<ShareButton />}
        />
        <BodyArea>
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <ConfirmedHero patientFirstName={REVIEW_PATIENT.name.split(' ')[0]} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Your booking" />
            </motion.div>

            <motion.div variants={rise}>
              <BookingRecordCard />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="What happens next" />
            </motion.div>

            <motion.div variants={rise}>
              <DispatchSequence />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of confirmation" />
            </motion.div>
          </motion.div>
        </BodyArea>
        <FootBar>
          <div className="flex gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/patient/p15')}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">View my visits</span>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/patient/p06')}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
            >
              <House className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Back to home</span>
            </motion.button>
          </div>
        </FootBar>
      </Screen>
    )
  }

  return (
    <Screen>
      <AppBar
        title="Review booking"
        subtitle="Final check before the offer goes out"
        onBack={() => navigate('/patient/p10')}
      />
      <BodyArea>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={rise}>
            <ReviewHero guardianFirstName={REVIEW_GUARDIAN.name.split(' ')[0]} />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Your match" trailing={<Chip intent="neutral">Best first</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <ReviewMatchCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Who receives the care" />
          </motion.div>

          <motion.div variants={rise}>
            <PatientCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Booking summary" trailing={<Chip intent="neutral">From your selections</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <SummaryCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Consent agreement" />
          </motion.div>

          <motion.div variants={rise}>
            <ConsentCard
              approvals={approvals}
              onToggle={toggleConsent}
              onOpenScope={() => setSheet(true)}
            />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Payment" trailing={<Chip intent="success">Verified method</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <PaymentCard />
          </motion.div>

          <motion.div variants={rise}>
            <Panel intent="info" className="flex items-start gap-3 p-4">
              <Tile icon={Bell} tone="info" />
              <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                Every consent is tied to your verified guardian account and visible in your records forever.
              </p>
            </Panel>
          </motion.div>

          <motion.div variants={rise}>
            <EndOfScroll label="End of review" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={ready && phase === 'idle' ? { scale: 0.97 } : undefined}
            disabled={!ready || phase !== 'idle'}
            aria-disabled={!ready || phase !== 'idle'}
            onClick={confirmBooking}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-all duration-300 ${
              phase === 'done'
                ? 'bg-emerald-600 text-white'
                : phase === 'working'
                  ? 'cursor-wait bg-emerald-600/60 text-white'
                  : ready
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                    : 'cursor-not-allowed bg-[#0B211B]/[0.06] text-[#0B211B]/30'
            }`}
          >
            {phase === 'idle' && (
              <>
                <span className="truncate">{ready ? 'Confirm booking' : 'Approve both consents to continue'}</span>
                {ready && <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
              </>
            )}
            {phase === 'working' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Sealing consent…
              </>
            )}
            {phase === 'done' && (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                Booking confirmed
              </>
            )}
          </motion.button>
          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
            <Send className="h-3 w-3 shrink-0" aria-hidden />
            Caregiver offers go out the moment you confirm
          </div>
        </div>
      </FootBar>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSheet(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && <ConsentScopeSheet key="scope-sheet" onClose={() => setSheet(false)} />}
      </AnimatePresence>
    </Screen>
  )
}
