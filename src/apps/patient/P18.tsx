import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, Edit3, Star } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { ScreenCard } from '@/components/phone/ScreenBlocks'
import { Chip } from '@/components/phone/Controls'
import { caregivers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const tags = ['Punctual', 'Kind manner', 'Clear notes', 'Careful with dad', 'Explained everything']

export function P18() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nurse = caregivers[0]
  const nurseFirst = nurse.name.split(' ')[0]
  const [stars, setStars] = useState(4)
  const [selected, setSelected] = useState<string[]>(['Punctual', 'Kind manner'])
  const [submitted, setSubmitted] = useState(false)

  const toggle = (t: string) =>
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  return (
    <Screen>
      <AppBar title="Visit completed" subtitle="Wednesday, March 13" onBack={() => navigate('/patient/p17')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <Check className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">Arrival verified</div>
                <div className="text-xs font-medium text-muted-foreground">Location matched at 2:02 PM</div>
              </div>
            </ScreenCard>
          </motion.div>
        </motion.div>
      </BodyArea>

      <AnimatePresence>
        {!submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)]"
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          'absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3 rounded-t-[24px] border border-border bg-card p-5 pb-7 shadow-[0_-10px_40px_rgba(0,0,0,0.22)]',
        )}
      >
        <div className="mx-auto h-1 w-[34px] rounded-full bg-border" />
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <span className="grid size-14 place-items-center rounded-full bg-mint">
                <Check className="size-7 text-brand-ink" />
              </span>
              <div className="text-base font-bold text-foreground">Feedback sent</div>
              <div className="max-w-[260px] text-center text-[13px] font-medium text-muted-foreground">
                Thank you. Ratings shape matching quality and are never shown to the patient.
              </div>
              <SmoothButton
                variant="default"
                shape="pill"
                size="lg"
                className="mt-2 w-full"
                onClick={() => navigate('/patient/p15')}
              >
                Back to visits
              </SmoothButton>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <span className="grid size-[58px] place-items-center rounded-full bg-mint text-brand-ink">
                  <Star className="size-7 fill-current" />
                </span>
                <div className="text-base font-bold text-foreground">How did {nurseFirst} do today?</div>
                <div className="text-xs font-medium text-muted-foreground">Your feedback shapes her matching quality</div>
              </div>
              <div className="flex justify-center gap-2.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setStars(n)} aria-label={`${n} star`}>
                    <Star
                      className={cn(
                        'size-9 transition-colors',
                        n <= stars ? 'fill-[#DBA800] text-[#DBA800]' : 'fill-border text-border',
                      )}
                    />
                  </button>
                ))}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">What went well</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Chip key={t} on={selected.includes(t)} onClick={() => toggle(t)}>
                    {selected.includes(t) && <Check className="size-3.5" />}
                    {t}
                  </Chip>
                ))}
              </div>
              <button
                onClick={() => notify({ title: 'Note', body: 'Free-form note attaches to the private feedback', kind: 'info' })}
                className="flex min-h-[74px] w-full items-start gap-2.5 rounded-[14px] border border-border bg-background p-3.5 text-left"
              >
                <Edit3 className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <span className="text-[13px] font-medium leading-snug text-muted-foreground">
                  Anything else you would like Ayvaa or the caregiver to know?
                </span>
              </button>
              <SmoothButton
                variant="default"
                shape="pill"
                size="lg"
                className="w-full"
                onClick={() => {
                  setSubmitted(true)
                  notify({ title: 'Feedback submitted', body: `${stars} stars · ${selected.length} highlights`, kind: 'ok' })
                }}
              >
                Submit feedback
              </SmoothButton>
              <div className="text-center text-xs font-medium text-muted-foreground">
                Feedback goes to the Ayvaa quality team, never to the patient.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Screen>
  )
}
