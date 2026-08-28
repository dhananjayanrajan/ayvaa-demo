import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Edit3, Star } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Hero, Kicker, Meter, rise, stagger } from '@/components/phone/kit'
import { caregivers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const tags = ['Punctual', 'Kind manner', 'Clear notes', 'Careful with dad', 'Explained everything']

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'] as const

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
      <AppBar title="Rate visit" subtitle="Wednesday, March 13 · private feedback" onBack={() => navigate('/patient/p17')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <Star className="h-3 w-3 text-amber-300" aria-hidden />
                  Quality team only
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Rate {nurseFirst}&apos;s visit,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">privately</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Ratings shape matching quality and are never shown to the patient.
                </p>

                <div className="mt-5 rounded-2xl bg-white/[0.06] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                    <span>Visit record</span>
                    <span className="tabular-nums">5 of 5 · 3 goals</span>
                  </div>
                  <Meter value={1} intent="success" delay={0.2} className="mt-2.5" />
                  <div className="mt-3 flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[11px] font-extrabold text-white">
                      {nurseFirst[0]}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/85">{nurse.name}</span>
                    <span className="shrink-0 rounded-full bg-white/[0.1] px-2.5 py-1 text-[9.5px] font-extrabold text-emerald-100">
                      {nurse.rating} ★
                    </span>
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-700">
                    <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">Arrival verified</span>
                    <span className="block truncate text-[11px] font-medium text-[#0B211B]/50">
                      GPS matched 2:02 PM · rating is separate from the verified log
                    </span>
                  </span>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Rating sheet below" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {!submitted && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
            onClick={() => navigate('/patient/p17')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[86%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <motion.button
                      key={n}
                      type="button"
                      whileTap={{ scale: 0.8 }}
                      onClick={() => {
                        setStars(n)
                        notify({ title: `${n} star${n > 1 ? 's' : ''}`, body: `Rated ${ratingLabels[n]} · submit when ready`, kind: 'info' })
                      }}
                      aria-label={`${n} star`}
                      className="grid h-10 w-10 place-items-center"
                    >
                      <motion.span animate={{ scale: n <= stars ? 1.05 : 0.9 }} transition={{ type: 'spring', stiffness: 400, damping: 16 }}>
                        <Star
                          className={cn(
                            'h-8 w-8 transition-colors',
                            n <= stars ? 'fill-amber-400 text-amber-400' : 'fill-[#0B211B]/[0.07] text-[#0B211B]/[0.07]',
                          )}
                          aria-hidden
                        />
                      </motion.span>
                    </motion.button>
                  ))}
                </div>
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                  {stars} of 5 · <span className="text-amber-600">{ratingLabels[stars]}</span>
                </div>
                <div className="text-[11px] font-medium text-[#0B211B]/50">
                  How was {nurseFirst} today?
                </div>
              </div>

              <div>
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">What went well</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tags.map((t) => {
                    const on = selected.includes(t)
                    return (
                      <motion.button
                        key={t}
                        type="button"
                        whileTap={{ scale: 0.93 }}
                        onClick={() => toggle(t)}
                        className={cn(
                          'flex items-center gap-1.5 rounded-full px-3 py-2 text-[10.5px] font-bold transition-colors',
                          on ? 'bg-amber-400 text-[#0B231C]' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55 hover:bg-[#0B211B]/[0.08]',
                        )}
                      >
                        {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
                        {t}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => notify({ title: 'Note', body: 'Free-form note attaches to the private feedback', kind: 'info' })}
                className="flex min-h-[64px] w-full items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.03] p-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.055]"
              >
                <Edit3 className="mt-0.5 h-4 w-4 shrink-0 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
                <span className="min-w-0 flex-1 text-[12px] font-medium leading-snug text-[#0B211B]/45">
                  Anything else Ayvaa or the caregiver should know?
                </span>
              </motion.button>

              <div className="flex flex-col gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSubmitted(true)
                    notify({ title: 'Feedback submitted', body: `${stars} stars · ${selected.length} highlights`, kind: 'ok' })
                  }}
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]"
                >
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                  <span className="truncate">Submit</span>
                </motion.button>
                <div className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
                  Goes to the quality team only, never the patient.
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex flex-col gap-3.5 px-5 pb-7 pt-4">
              <div className="flex flex-col items-center gap-2.5 text-center">
                <span className="relative grid h-16 w-16 place-items-center">
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_14px_28px_-12px_rgba(16,185,129,0.8)]">
                    <Check className="h-7 w-7 text-white" strokeWidth={3} aria-hidden />
                  </span>
                </span>
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                  {stars} of 5 · <span className="text-emerald-700">sealed</span>
                </div>
                <div className="max-w-[260px] text-[12px] font-medium leading-relaxed text-[#0B211B]/55">
                  Thank you. Ratings shape matching quality and are never shown to the patient.
                </div>
              </div>

              <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <div className="flex flex-col gap-2.5">
                  {[
                    ['Rating', `${stars} of 5`],
                    ['Highlights', `${selected.length}`],
                    ['Visible to', 'Quality team'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline">
                      <span className="shrink-0 text-[11.5px] font-semibold text-[#0B211B]/55">{k}</span>
                      <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
                      <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/patient/p15')}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <span className="truncate">Back to visits</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/patient/p06')}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                >
                  <span className="truncate">Home</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
