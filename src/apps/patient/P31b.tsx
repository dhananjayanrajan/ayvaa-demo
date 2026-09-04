import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Undo2,
  UserSearch,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Card, Chip, Kicker, Meter, Panel, Section, Stat, Tile, rise, stagger } from '@/components/base/phone/kit'
import { redispatch } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const steps: { icon: LucideIcon; t: string; s: string; when: string; active?: boolean; done?: boolean }[] = [
  { icon: Undo2, t: 'First offer expired', s: 'No nurse accepted within 30 minutes', when: '8:30 AM', done: true },
  { icon: RefreshCw, t: 'Re-dispatch started', s: `New offers sent to ${redispatch.redispatched} · widened to ${redispatch.widened}`, when: 'now', active: true },
  { icon: Search, t: 'Search widens to 10 km', s: 'If no one accepts by 9:00 AM, we widen automatically', when: '9:00 AM' },
  { icon: UserSearch, t: 'Care team joins personally', s: 'A coordinator finds a replacement nurse by phone', when: '9:00 AM' },
]

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-rose-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-rose-50/90">{v}</span>
    </div>
  )
}

export function P31b() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [cancelOpen, setCancelOpen] = useState(false)

  return (
    <Screen>
      <AppBar
        title="Re-dispatch live"
        subtitle="March 15 · 10:00 AM · we are on it"
        onBack={() => navigate('/patient/p15')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-500/[0.14] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] p-5 text-white shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-red-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                <div className="relative">
                  <Kicker>
                    <span className="relative flex h-2 w-2" aria-hidden>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
                    </span>
                    Reliability promise · live
                  </Kicker>
                  <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    Finding a nurse,{' '}
                    <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">you pay nothing</span>
                  </h2>
                  <p className="mt-1 text-[12px] font-medium leading-relaxed text-rose-100/60">
                    If we cannot fill this visit, the full amount refunds automatically — like your March 4 visit.
                  </p>

                  <div className="mt-4 rounded-2xl bg-rose-400/[0.12] p-3.5">
                    <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                      <span className="text-rose-100/50">Dispatch window</span>
                      <span className="tabular-nums text-rose-200">30 of 30 min</span>
                    </div>
                    <Meter value={1} intent="danger" delay={0.2} className="mt-2" />
                    <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-200/70">
                      <RefreshCw className="h-3 w-3 shrink-0 animate-spin [animation-duration:3s]" strokeWidth={2.6} aria-hidden />
                      {redispatch.redispatched} nurses seeing the offer now
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.08]">
                    <Stat label="Offered" value={redispatch.redispatched} dot="bg-rose-300/80" />
                    <Stat label="Radius" value={redispatch.widened} dot="bg-orange-300" />
                    <Stat label="You pay" value="₹0" dot="bg-emerald-300" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="What happens next" trailing={<Chip intent="live" dot>Live</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
                    <Search className="h-3 w-3" aria-hidden />
                    Automatic escalation · nobody waits on you
                  </div>
                  <div className="mt-3 flex flex-col">
                    {steps.map((s, i) => {
                      const last = i === steps.length - 1
                      return (
                        <div key={s.t} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            {s.done ? (
                              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-400/90 text-white">
                                <Undo2 className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                              </span>
                            ) : s.active ? (
                              <span className="relative mt-1 grid h-5 w-5 shrink-0 place-items-center">
                                <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/40" />
                                <span className="relative h-2.5 w-2.5 rounded-full bg-rose-300" />
                              </span>
                            ) : (
                              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
                            )}
                            {!last && <span aria-hidden className="my-1 w-px flex-1 bg-white/12" />}
                          </div>
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.99 }}
                            onClick={() => notify({ title: s.t, body: `${s.s} · ${s.when}`, kind: 'info' })}
                            className={last ? 'min-w-0 flex-1 pb-0.5 text-left' : 'min-w-0 flex-1 pb-4 text-left'}
                          >
                            <div className="flex items-center gap-2">
                              <span className="truncate text-[13px] font-bold leading-snug tracking-tight text-white">{s.t}</span>
                              <span className="ml-auto shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-wide text-rose-100/40">
                                {s.when}
                              </span>
                            </div>
                            <div className="mt-0.5 text-[10.5px] font-semibold text-rose-100/50">{s.s}</div>
                          </motion.button>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                    <div className="flex flex-col gap-2.5">
                      <DarkRow k="If unfilled" v="Full auto-refund" />
                      <DarkRow k="Refund speed" v="3 days to card" />
                      <DarkRow k="Series" v="Unaffected" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <Tile icon={ShieldCheck} tone="success" size="lg" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">You will be notified</span>
                        <Chip intent="success">Automatic</Chip>
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        The moment a nurse accepts, and again when the visit is confirmed. No action needed from you.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  96 percent of re-dispatches fill within the first window. Your series stays exactly as scheduled either way.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa reliability promise" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setCancelOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.08] py-3.5 text-[13px] font-bold text-rose-600 transition-colors hover:bg-rose-500/[0.12]"
          >
            <span className="truncate">Cancel visit</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notify({ title: 'Care team joining', body: 'A coordinator is connecting now', kind: 'ok' })
              navigate('/patient/p25')
            }}
            className="flex flex-[1.4] items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Talk to care team</span>
          </motion.button>
        </div>
      </FootBar>

      <AnimatePresence>
        {cancelOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCancelOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cancelOpen && (
          <motion.div
            key="cancel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-500/10 text-rose-600">
                <Phone className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Cancel this visit?</div>
                <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Only this one · the series continues</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setCancelOpen(false)}
                aria-label="Close sheet"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[#230D14] p-4">
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-rose-400/20 blur-3xl" />
              <div className="relative">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/50">Cancellation terms</div>
                <div className="mt-3 flex flex-col gap-2.5">
                  <DarkRow k="Charged" v="₹0 · nothing yet" />
                  <DarkRow k="Series" v="Continues as normal" />
                  <DarkRow k="Notice" v="After 24 h · fee applies" />
                  <DarkRow k="Logged" v="Visit history · sealed" />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setCancelOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
              >
                <span className="truncate">Keep looking</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCancelOpen(false)
                  notify({ title: 'Visit cancelled', body: 'Nothing was charged · your regular series continues', kind: 'info' })
                  navigate('/patient/p15')
                }}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]"
              >
                <span className="truncate">Cancel visit</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
