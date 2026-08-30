import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Section, rise, stagger } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import { useDemo } from '@/lib/store'
import { RATED_VISIT } from '@/data/patientRating'
import { RatingHero } from '@/components/patient/review/RatingHero'
import { VisitRecordCard } from '@/components/patient/review/VisitRecordCard'
import { RateVisitSheet } from '@/components/patient/review/RateVisitSheet'

export function P18() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheetOpen, setSheetOpen] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [stars, setStars] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [note, setNote] = useState('')

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))

  const confirm = () => {
    setSubmitted(true)
    notify({
      title: 'Feedback sealed',
      body: `${stars} of 5 with ${selectedTags.length} highlight${selectedTags.length === 1 ? '' : 's'} sent to the quality team`,
      kind: 'ok',
    })
  }

  return (
    <Screen>
      <AppBar
        title="Rate visit"
        subtitle={RATED_VISIT.dateLabel}
        onBack={() => navigate('/patient/p17')}
      />
      <BodyArea>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-amber-400/[0.14] blur-3xl"
          />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <RatingHero
                submitted={submitted}
                stars={stars}
                highlightCount={selectedTags.length}
                note={note}
                onOpenSheet={() => setSheetOpen(true)}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Visit record" />
            </motion.div>

            <motion.div variants={rise}>
              <VisitRecordCard />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Your feedback stays private to the quality team" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheetOpen && !submitted && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/patient/p17')}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen && (
          <RateVisitSheet
            key="rate-sheet"
            submitted={submitted}
            stars={stars}
            selectedTags={selectedTags}
            note={note}
            onStars={setStars}
            onToggleTag={toggleTag}
            onNote={setNote}
            onConfirmed={confirm}
            onClose={() => (submitted ? setSheetOpen(false) : navigate('/patient/p17'))}
            onBackToVisits={() => navigate('/patient/p15')}
            onHome={() => navigate('/patient/p06')}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
