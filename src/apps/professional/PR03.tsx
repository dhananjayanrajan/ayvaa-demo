import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Check, Clock, Lock, MapPin, Send, Wallet, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { offers, type Offer } from '@/data/seed'
import { useDemo } from '@/lib/store'

const typeLabel: Record<string, string> = {
  recurring: 'Recurring care',
  'one-time': 'One-time visit',
  ongoing: 'Ongoing care',
}

export function PR03() {
  const { notify, dispatch } = useDemo()
  const [list, setList] = useState<Offer[]>(offers)
  const [accepting, setAccepting] = useState(true)
  const [confirming, setConfirming] = useState<Offer | null>(null)

  const active = list.filter((o) => o.status === 'active')
  const declined = list.filter((o) => o.status === 'declined')

  const decide = (o: Offer, accept: boolean) => {
    setList((prev) => prev.map((x) => (x.id === o.id ? { ...x, status: accept ? 'active' : 'declined' } : x)))
    setConfirming(null)
    if (accept) {
      notify({ title: 'Offer accepted', body: `${o.title} · availability re-checked · session confirmed`, kind: 'ok' })
    } else {
      notify({ title: 'Offer declined', body: `${o.title} · no penalty · slot re-offered`, kind: 'warn' })
    }
  }

  return (
    <Screen>
      <AppBar title="New care offers" subtitle={`Round ${dispatch.round} · expires ${dispatch.expiresAt}`} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-3">
                  <Kicker>Dispatch · realtime</Kicker>
                  <Chip intent={accepting ? 'live' : 'warning'} light dot={accepting} className="shrink-0 border-transparent">
                    {accepting ? 'Accepting' : 'Paused'}
                  </Chip>
                </div>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {active.length} offer{active.length === 1 ? '' : 's'}{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">waiting on you</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Round {dispatch.round} · offers expire at {dispatch.expiresAt}. First to accept wins the slot.
                </p>

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5">
                  <span className={accepting ? 'h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-300' : 'h-2.5 w-2.5 shrink-0 rounded-full bg-amber-300'} />
                  <span className="min-w-0 flex-1 text-[13px] font-bold text-emerald-50/90">
                    {accepting ? 'Accepting offers' : 'Paused — you receive nothing until you resume'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAccepting((v) => !v)
                      notify({
                        title: accepting ? 'Offers paused' : 'Accepting again',
                        body: accepting ? 'You will not receive new dispatches' : 'Realtime dispatches resumed',
                        kind: 'info',
                      })
                    }}
                    aria-label="Toggle accepting offers"
                    className={accepting ? 'relative h-7 w-12 shrink-0 rounded-full bg-emerald-400' : 'relative h-7 w-12 shrink-0 rounded-full bg-white/20'}
                  >
                    <span className={accepting ? 'absolute top-1 left-6 h-5 w-5 rounded-full bg-white' : 'absolute top-1 left-1 h-5 w-5 rounded-full bg-white'} />
                  </button>
                </div>
              </Hero>
            </motion.div>

            {active.map((o) => (
              <motion.div key={o.id} variants={rise}>
                <Card>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{o.title}</div>
                        <div className="mt-0.5 truncate text-xs font-semibold text-[#0B211B]/55">{typeLabel[o.type] ?? 'Care visit'}</div>
                      </div>
                      <Chip intent="warning" dot icon={Clock}>
                        {o.expiresIn}
                      </Chip>
                    </div>

                    <div className="mt-3.5 grid grid-cols-3 gap-2">
                      {[
                        { icon: MapPin, v: o.distance, l: 'away' },
                        { icon: Wallet, v: o.rate, l: 'per visit' },
                        { icon: CheckCircle2, v: o.consentSigned ? 'Signed' : 'Pending', l: 'consent' },
                      ].map((f) => (
                        <div key={f.l} className="rounded-2xl bg-[#0B211B]/[0.04] px-3 py-2.5">
                          <f.icon className="h-3.5 w-3.5 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
                          <div className="mt-1.5 truncate text-[12px] font-extrabold tabular-nums leading-none text-[#0B211B]">{f.v}</div>
                          <div className="mt-1 truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">{f.l}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
                      <Lock className="h-3 w-3 shrink-0" aria-hidden />
                      Acceptance is re-checked against your live availability.
                    </div>

                    <div className="mt-3.5 flex gap-2.5">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setConfirming(o)}
                        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                      >
                        <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                        <span className="truncate">Decline</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => decide(o, true)}
                        className="flex flex-[1.3] items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                      >
                        <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                        <span className="truncate">Accept</span>
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {active.length === 0 && (
              <motion.div variants={rise}>
                <Card>
                  <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/[0.1] text-emerald-600">
                      <CheckCircle2 className="h-6 w-6" strokeWidth={2.2} aria-hidden />
                    </span>
                    <p className="text-[14px] font-extrabold tracking-tight text-[#0B211B]/70">No open offers right now</p>
                    <p className="text-xs font-medium leading-relaxed text-[#0B211B]/45">
                      You will be the first to know when one matches your windows
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {declined.length > 0 && (
              <>
                <motion.div variants={rise}>
                  <Section label="Declined · yesterday" trailing={<Chip intent="neutral">No penalty</Chip>} />
                </motion.div>

                <motion.div variants={rise}>
                  <Card>
                    {declined.map((o) => (
                      <div key={o.id} className="flex items-center gap-3 px-4 py-3.5 opacity-70">
                        <Tile icon={X} tone="neutral" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{o.title}</div>
                          <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                            Declined politely · family matched elsewhere
                          </div>
                        </div>
                      </div>
                    ))}
                  </Card>
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <EndOfScroll label="End of offers" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {confirming && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirming(null)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirming && (
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
              <Tile icon={Check} tone="warning" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Decline this offer?</div>
                <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                  {confirming.title} · the slot is re-offered to other professionals immediately. No penalty on your priority.
                </div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setConfirming(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Keep offer"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => decide(confirming, true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Actually, accept it
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => decide(confirming, false)}
              className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
            >
              Yes, decline
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
