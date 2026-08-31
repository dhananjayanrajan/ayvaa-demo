import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, Loader2, Workflow } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { MatchHero } from '@/components/patient/matching/MatchHero'
import { MatchCard } from '@/components/patient/matching/MatchCard'
import { ActiveFilterStrip } from '@/components/patient/matching/ActiveFilterStrip'
import { EmptyMatches } from '@/components/patient/matching/EmptyMatches'
import { LanguageSheet } from '@/components/patient/matching/LanguageSheet'
import {
  MATCH_CAREGIVERS,
  MATCH_REQUEST,
  filterByLanguage,
  offerSummary,
  sortMatches,
  type OfferState,
} from '@/data/patientMatching'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P10() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const leading = MATCH_CAREGIVERS[0]

  const [offers, setOffers] = useState<Record<string, OfferState>>(() => ({ [leading.id]: 'pending' }))
  const [language, setLanguage] = useState('Any language')
  const [sheet, setSheet] = useState(false)
  const [navPhase, setNavPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])

  const leadingState = offers[leading.id]
  useEffect(() => {
    if (leadingState !== 'pending') return
    const t = setTimeout(() => {
      setOffers((prev) => (prev[leading.id] === 'pending' ? { ...prev, [leading.id]: 'accepted' } : prev))
      notify({ title: 'Offer accepted', body: `${leading.name} passed the availability re-check`, kind: 'ok' })
    }, 4200)
    timers.current.push(t)
    return () => clearTimeout(t)
  }, [leadingState, leading.id, leading.name, notify])

  const inRangeList = useMemo(() => filterByLanguage(MATCH_CAREGIVERS, language), [language])
  const sorted = useMemo(() => sortMatches(inRangeList, offers), [inRangeList, offers])
  const { matched } = offerSummary(offers, MATCH_CAREGIVERS.length)
  const nearestLabel = inRangeList.length
    ? `${Math.min(...inRangeList.map((c) => c.distanceKm)).toFixed(1)} km`
    : '—'

  const sendOffer = (id: string) => {
    const caregiver = MATCH_CAREGIVERS.find((c) => c.id === id)
    if (!caregiver) return
    setOffers((prev) => ({ ...prev, [id]: 'pending' }))
    notify({
      title: 'Offer sent',
      body: `${caregiver.name} usually responds within minutes. Availability is re-checked on acceptance.`,
      kind: 'ok',
    })
  }

  const applyLanguage = (lang: string) => {
    setSheet(false)
    setLanguage(lang)
    notify({
      title: 'Language filter applied',
      body:
        lang === 'Any language'
          ? 'Caregivers speaking any language are back in the match list'
          : `Matching ${lang} speakers within ${MATCH_REQUEST.radius}`,
      kind: 'info',
    })
  }

  const clearLanguage = () => {
    if (language === 'Any language') return
    setLanguage('Any language')
    notify({ title: 'Language filter cleared', body: 'Every caregiver in range is shown again', kind: 'info' })
  }

  const continueToReview = () => {
    if (!matched || navPhase !== 'idle') return
    setNavPhase('working')
    timers.current.push(setTimeout(() => setNavPhase('done'), 800))
    timers.current.push(setTimeout(() => navigate('/patient/p12'), 1500))
  }

  return (
    <Screen>
      <AppBar
        title="Nearby caregivers"
        subtitle="Offers go out live and update instantly"
        onBack={() => navigate('/patient/p09')}
      />
      <BodyArea>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={rise}>
            <MatchHero
              inRange={inRangeList.length}
              total={MATCH_CAREGIVERS.length}
              nearestLabel={nearestLabel}
              language={language}
              offers={offers}
              radiusLabel={MATCH_REQUEST.radius}
              cadenceLabel={MATCH_REQUEST.cadence}
              visitsLabel={MATCH_REQUEST.visits}
              priceLabel={MATCH_REQUEST.price}
              onOpenLanguage={() => setSheet(true)}
            />
          </motion.div>

          {language !== 'Any language' && (
            <motion.div variants={rise} initial="hidden" animate="show">
              <ActiveFilterStrip label={language} onClear={clearLanguage} />
            </motion.div>
          )}

          {sorted.length === 0 ? (
            <motion.div variants={rise} initial="hidden" animate="show">
              <EmptyMatches language={language} onClear={clearLanguage} />
            </motion.div>
          ) : (
            <>
              <motion.div variants={rise}>
                <Section label="Match list" trailing={<Chip intent="neutral">Sorted by match</Chip>} />
              </motion.div>
              {sorted.map((c) => (
                <motion.div key={c.id} variants={rise}>
                  <MatchCard
                    caregiver={c}
                    state={offers[c.id] ?? 'none'}
                    leading={c.id === leading.id}
                    highlightLanguage={language === 'Any language' ? null : language}
                    onSend={sendOffer}
                  />
                </motion.div>
              ))}
            </>
          )}

          <motion.div variants={rise}>
            <NoteStrip intent="info" icon={Workflow}>
              When a caregiver accepts, we re-check their current availability before confirming your session.
            </NoteStrip>
          </motion.div>
          <motion.div variants={rise}>
            <EndOfScroll label="End of matches" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-1.5">
          {!matched && (
            <div className="text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
              Locked until an offer is accepted
            </div>
          )}
          <motion.button
            type="button"
            whileTap={matched && navPhase === 'idle' ? { scale: 0.97 } : undefined}
            onClick={continueToReview}
            disabled={!matched || navPhase !== 'idle'}
            aria-disabled={!matched || navPhase !== 'idle'}
            className={`flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors ${
              navPhase === 'done'
                ? 'bg-emerald-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : navPhase === 'working'
                  ? 'cursor-wait bg-emerald-600/60'
                  : matched
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                    : 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/35'
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
                Confirming match…
              </>
            )}
            {navPhase === 'done' && (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                Opening review
              </>
            )}
          </motion.button>
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
        {sheet && (
          <LanguageSheet
            current={language}
            list={MATCH_CAREGIVERS}
            onApply={applyLanguage}
            onClose={() => setSheet(false)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
