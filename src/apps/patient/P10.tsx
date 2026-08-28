import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Hourglass,
  Languages,
  MapPin,
  Send,
  Star,
  Workflow,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { caregivers, pricing } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function P10() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [first, second, third] = caregivers
  const [sheet, setSheet] = useState<'none' | 'language'>('none')
  const close = () => setSheet('none')

  const initials = (name: string) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)

  const sendOffer = (name: string) => {
    notify({ title: 'Offer sent', body: `${name} will respond within minutes · availability re-checked on acceptance`, kind: 'ok' })
  }

  return (
    <Screen>
      <AppBar
        title="Nearby caregivers"
        subtitle="Offers go out live and update instantly"
        onBack={() => navigate('/patient/p09')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Booking · step 2 of 3</div>
                      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                        3 caregivers{' '}
                        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">in range</span>
                      </h2>
                    </div>
                    <Chip intent="live" light dot className="shrink-0 border-transparent">
                      Matching
                    </Chip>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                      { icon: MapPin, l: 'Radius', v: '5 km' },
                      { icon: BadgeCheck, l: 'Licensed', v: '3 of 3' },
                      { icon: Languages, l: 'Language', v: 'Any' },
                    ].map((f) => (
                      <div key={f.l} className="rounded-2xl bg-white/[0.06] px-3 py-2.5">
                        <f.icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2.4} aria-hidden />
                        <div className="mt-1.5 truncate text-[12px] font-extrabold leading-none text-white">{f.v}</div>
                        <div className="mt-1 truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/40">{f.l}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
                    <span>Match progress</span>
                    <span className="text-emerald-200">66%</span>
                  </div>
                  <Meter value={0.66} intent="success" delay={0.2} className="mt-2" />

                  <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                    <span className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-100/55">
                      Weekly · 6 visits · {pricing.weekly}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex flex-wrap gap-2">
                <Chip intent="success" icon={MapPin}>
                  Within 5 km
                </Chip>
                <Chip intent="success" icon={BadgeCheck}>
                  Licensed
                </Chip>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSheet('language')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.12] px-3.5 py-2 text-[10px] font-bold tracking-wide text-emerald-700"
                >
                  <Languages className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                  Language · any
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Match list" trailing={<Chip intent="neutral">Best first</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <span className="grid h-14 w-14 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-500 to-teal-500 text-[15px] font-black tracking-tight text-white shadow-[0_12px_24px_-12px_rgba(16,185,129,0.8)]">
                        {initials(first.name)}
                      </span>
                      <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                        <BadgeCheck className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{first.name}</div>
                      <div className="truncate text-[11.5px] font-semibold text-[#0B211B]/55">{first.role}</div>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                        <span className="text-[11px] font-extrabold tabular-nums text-[#0B211B]/70">{first.rating}</span>
                        <span className="text-[10px] font-bold text-[#0B211B]/40">· {first.years} yrs · 70 sessions</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.1] px-3.5 py-3">
                    <Tile icon={Hourglass} tone="success" size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] font-bold tracking-tight text-emerald-800">Offer sent · leading match</span>
                      <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-700/60">
                        Usually responds within minutes
                      </span>
                    </span>
                    <Chip intent="success" dot>
                      Waiting
                    </Chip>
                  </div>
                </div>
              </Card>
            </motion.div>

            {[second, third].map((c) => (
              <motion.div key={c.id} variants={rise}>
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-[18px] bg-[#0B211B]/[0.06] text-[13px] font-black tracking-tight text-[#0B211B]/60">
                      {initials(c.name)}
                      <span className="absolute -bottom-1 -right-1 grid h-[18px] w-[18px] place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                        <BadgeCheck className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{c.name}</div>
                      <div className="truncate text-[11px] font-semibold text-[#0B211B]/50">{c.role}</div>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
                        <span className="text-[10.5px] font-extrabold tabular-nums text-[#0B211B]/60">{c.rating}</span>
                        <span className="text-[9.5px] font-bold text-[#0B211B]/40">· {c.years} yrs</span>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendOffer(c.name)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/[0.12] px-3.5 py-2.5 text-[11.5px] font-extrabold text-emerald-700"
                    >
                      <Send className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                      Offer
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Workflow} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  When a caregiver accepts, we re-check their current availability before confirming your session.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of matches" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            notify({ title: 'Moving to review', body: `${first.name} leads the match list`, kind: 'info' })
            navigate('/patient/p12')
          }}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          Continue to review
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        </motion.button>
      </FootBar>

      <AnimatePresence>
        {sheet === 'language' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'language' && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-start gap-3">
              <Tile icon={Languages} tone="info" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Preferred language</div>
                <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                  We only match caregivers who speak your choice
                </div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close sheet"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="flex flex-col gap-2">
              {['Any language', 'Telugu', 'Hindi', 'English'].map((lang, i) => (
                <motion.button
                  key={lang}
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    close()
                    notify({
                      title: 'Language filter',
                      body: `Matching ${lang === 'Any language' ? 'all languages' : lang} speakers`,
                      kind: 'info',
                    })
                  }}
                  className="flex items-center justify-between rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3.5 text-left"
                >
                  <span className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">{lang}</span>
                  {i === 0 ? (
                    <Chip intent="success" icon={Check}>
                      Current
                    </Chip>
                  ) : (
                    <ChevronRight className="h-4 w-4 text-[#0B211B]/20" aria-hidden />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
