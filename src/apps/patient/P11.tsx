import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, BadgeCheck, Check, Loader2, Lock, Route } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { InfoListCard } from '@/components/ui/UiSet'
import { ProfileHero_Patient as ProfileHero } from '@/components/profile/ProfileSet'
import { CredentialCard } from '@/components/profile/ProfileSet'
import { ReviewShell } from '@/components/profile/ProfileSet'
import { CareHistoryCard } from '@/components/profile/ProfileSet'
import { OfferSheet } from '@/components/profile/ProfileSet'
import {
  PROFILE,
  CREDENTIALS,
  REVIEWS,
  offerPathItems,
  totalSessions,
} from '@/data/patientCaregiverProfile'
import type { OfferState } from '@/data/patientMatching'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P11() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [offer, setOffer] = useState<OfferState>('none')
  const [sheet, setSheet] = useState(false)
  const [navPhase, setNavPhase] = useState<'idle' | 'working' | 'done'>('idle')

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    if (offer !== 'pending') return
    const t = setTimeout(() => {
      setOffer((prev) => (prev === 'pending' ? 'accepted' : prev))
      notify({
        title: 'Offer accepted',
        body: `${PROFILE.name} passed the availability re-check. Continue to review.`,
        kind: 'ok',
      })
    }, 4500)
    timers.current.push(t)
    return () => clearTimeout(t)
  }, [offer, notify])

  const sessions = totalSessions()
  const offerRows = [
    { label: 'Caregiver', value: PROFILE.name },
    { label: 'Role', value: PROFILE.role },
    { label: 'RN licence', value: PROFILE.licenceId },
    { label: 'Typical response', value: PROFILE.responseTime },
  ]

  const sendOffer = () => {
    setSheet(false)
    setOffer('pending')
    notify({
      title: 'Offer sent',
      body: `${PROFILE.name} usually responds within minutes. Availability is re-checked on acceptance.`,
      kind: 'ok',
    })
  }

  const continueToReview = () => {
    if (offer !== 'accepted' || navPhase !== 'idle') return
    setNavPhase('working')
    timers.current.push(setTimeout(() => setNavPhase('done'), 800))
    timers.current.push(setTimeout(() => navigate('/patient/p12'), 1500))
  }

  return (
    <Screen>
      <AppBar
        title="Caregiver profile"
        subtitle="Credentials, record and offer in one place"
        onBack={() => navigate('/patient/p10')}
      />
      <BodyArea>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={rise}>
            <ProfileHero
              name={PROFILE.name}
              role={PROFILE.role}
              years={PROFILE.years}
              rating={PROFILE.rating}
              visits={PROFILE.visits}
              onTime={PROFILE.onTime}
              offer={offer}
            />
          </motion.div>

          <motion.div variants={rise}>
            <Section
              label="Credentials"
              trailing={<Chip intent="success">{CREDENTIALS.length} of {CREDENTIALS.length} verified</Chip>}
            />
          </motion.div>

          <motion.div variants={rise}>
            <CredentialCard credentials={CREDENTIALS} />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="What families say" trailing={<Chip intent="neutral">{REVIEWS.length} recent reviews</Chip>} />
          </motion.div>

          {REVIEWS.map((review) => (
            <motion.div key={review.id} variants={rise}>
              <ReviewShell review={review} />
            </motion.div>
          ))}

          <motion.div variants={rise}>
            <Section label="Recent care delivered" trailing={<Chip intent="neutral">{sessions} sessions</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <CareHistoryCard />
          </motion.div>

          <motion.div variants={rise}>
            <NoteStrip intent="success" icon={Lock}>
              {PROFILE.firstName} delivers care only under your signed consent and care plan. Every visit is verified and logged.
            </NoteStrip>
          </motion.div>

          <motion.div variants={rise}>
            <InfoListCard
              accent={offer === 'accepted' ? 'emerald' : 'amber'}
              icon={offer === 'accepted' ? BadgeCheck : Route}
              title={offer === 'accepted' ? 'The offer is accepted' : 'What happens after the offer'}
              subtitle={
                offer === 'accepted'
                  ? 'Every step is complete. Review confirms the series and locks the schedule.'
                  : 'Each step completes as the offer moves. Your review unlocks the moment she accepts.'
              }
              items={offerPathItems(offer)}
            />
          </motion.div>

          <motion.div variants={rise}>
            <EndOfScroll label="End of profile" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        {offer === 'none' && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setSheet(true)}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            Send offer to {PROFILE.firstName}
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          </motion.button>
        )}
        {offer === 'pending' && (
          <button
            type="button"
            disabled
            aria-disabled
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-amber-500/[0.14] py-3.5 text-sm font-bold text-amber-800"
          >
            <motion.span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-amber-600"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            Offer out, waiting for {PROFILE.firstName} to respond
          </button>
        )}
        {offer === 'accepted' && (
          <motion.button
            type="button"
            whileTap={navPhase === 'idle' ? { scale: 0.97 } : undefined}
            onClick={continueToReview}
            disabled={navPhase !== 'idle'}
            aria-disabled={navPhase !== 'idle'}
            className={`flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors ${
              navPhase === 'done'
                ? 'bg-emerald-600'
                : navPhase === 'working'
                  ? 'cursor-wait bg-emerald-600/60'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
            }`}
          >
            {navPhase === 'idle' && (
              <>
                Continue to review
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              </>
            )}
            {navPhase === 'working' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Opening review…
              </>
            )}
            {navPhase === 'done' && (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                Opening review
              </>
            )}
          </motion.button>
        )}
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
        {sheet && (
          <OfferSheet
            key="offer-sheet"
            firstName={PROFILE.firstName}
            rows={offerRows}
            onSent={sendOffer}
            onClose={() => setSheet(false)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
