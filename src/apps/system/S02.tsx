import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Hourglass,
  MapPin,
  RefreshCw,
  ScrollText,
  Siren,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Expand,
  Hero,
  Kicker,
  LiveChip,
  Meter,
  Ring,
  Section,
  Tile,
  TimeChip,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { Intent, TileTone } from '@/components/phone/kit'
import { dispatchOffers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type OfferState = 'waiting' | 'declined' | 'recheck'

const stateStyle: Record<OfferState, { icon: LucideIcon; tile: TileTone; intent: Intent; chip: string; live: boolean }> = {
  waiting: { icon: Hourglass, tile: 'warning', intent: 'warning', chip: 'Deciding', live: true },
  declined: { icon: Ban, tile: 'neutral', intent: 'neutral', chip: 'Re-offered', live: false },
  recheck: { icon: CheckCircle2, tile: 'info', intent: 'info', chip: 'Checking', live: true },
}

const rules: { icon: LucideIcon; intent: Intent; title: string; body: string; notifyBody: string; kind: 'ok' | 'warn' }[] = [
  {
    icon: Zap,
    intent: 'success',
    title: 'Instant acceptance',
    body: 'Free in the window · confirmed on the spot',
    notifyBody: 'Free in the window · acceptance confirmed instantly',
    kind: 'ok',
  },
  {
    icon: AlertTriangle,
    intent: 'warning',
    title: 'Conflict reversal',
    body: 'New conflict · offer reversed, session re-dispatched',
    notifyBody: 'New conflict found · offer reversed, session re-dispatched',
    kind: 'warn',
  },
  {
    icon: ScrollText,
    intent: 'info',
    title: 'Transparent logging',
    body: 'Every outcome logged · visible to the family',
    notifyBody: 'Every outcome is logged and shown to the family transparently',
    kind: 'ok',
  },
]

const failsafeSteps: { time: string; dot: string; text: string }[] = [
  { time: '9:45', dot: 'bg-amber-500', text: 'Care team paged personally' },
  { time: '9:46', dot: 'bg-sky-500', text: 'Wider radius re-broadcast' },
  { time: '9:47', dot: 'bg-emerald-500', text: 'Family sees every step live' },
]

export function S02() {
  const { dispatch, setDispatch, notify } = useDemo()
  const [tick, setTick] = useState(0)
  const [openFailsafe, setOpenFailsafe] = useState(false)
  const totalRef = useRef(Math.max(1, dispatch.minutesLeft * 60))
  const firedRef = useRef(false)

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const remain = Math.max(0, dispatch.minutesLeft * 60 - tick)
  const left = Math.floor(remain / 60)
  const sec = remain % 60
  const mmss = `${left}:${String(sec).padStart(2, '0')}`

  useEffect(() => {
    if (remain === 0 && !firedRef.current) {
      firedRef.current = true
      setDispatch({ minutesLeft: 0 })
      notify({ title: 'Offers expired', body: 'No acceptance yet · care team paged personally', kind: 'warn' })
    }
  }, [remain, setDispatch, notify])

  const totalOffers = dispatch.waiting + dispatch.declined + dispatch.recheck
  const countOf = (s: OfferState) =>
    s === 'waiting' ? dispatch.waiting : s === 'declined' ? dispatch.declined : dispatch.recheck

  return (
    <Screen>
      <AppBar
        title="Dispatch engine"
        subtitle="Friday visits · matching round two"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-dispatch" size={42} />
            <LiveChip />
          </div>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-center gap-4">
                  <Ring value={remain / totalRef.current} size={84} stroke={7} id="ring-dispatch">
                    <span className="text-[15px] font-extrabold tabular-nums text-white">{mmss}</span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-emerald-200/50">to expiry</span>
                  </Ring>
                  <div className="min-w-0 flex-1">
                    <Kicker>
                      <RefreshCw className="h-3 w-3 animate-spin text-emerald-300/70 [animation-duration:3s]" aria-hidden />
                      Round two · live
                    </Kicker>
                    <h2 className="mt-1.5 text-[17px] font-extrabold leading-snug tracking-tight text-white">
                      Matching continues{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">automatically</span>
                    </h2>
                    <p className="mt-1 text-[11.5px] font-medium leading-relaxed text-emerald-100/55">
                      8 nurses re-offered at 8:16 AM · radius widened to 10 km at 9:00 AM
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <Chip intent="neutral" light>Round 1 · expired 8:16</Chip>
                  <Chip intent="live" light dot>Round 2 · live</Chip>
                  <Chip intent="neutral" light icon={MapPin}>Radius → 10 km</Chip>
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">
                    Expires {dispatch.expiresAt}
                  </span>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Offer status" trailing={<Chip intent="neutral">{totalOffers} offers</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {dispatchOffers.map((o, i) => {
                  const s = stateStyle[o.state as OfferState] ?? stateStyle.waiting
                  const count = countOf(o.state as OfferState)
                  return (
                    <div key={o.id}>
                      {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        whileTap={{ scale: 0.985 }}
                        onClick={() =>
                          notify(
                            o.state === 'waiting'
                              ? { title: 'Offer still open', body: `${count} nurses deciding · expires ${dispatch.expiresAt}`, kind: 'info' }
                              : o.state === 'declined'
                                ? { title: 'Offer declined', body: 'Nurse declined · slot re-offered in round two', kind: 'warn' }
                                : { title: 'Re-checking availability', body: 'Conflict found · availability re-verified now', kind: 'info' },
                          )
                        }
                        className="group flex w-full items-center gap-3 px-3.5 py-3 text-left"
                      >
                        <Tile icon={s.icon} tone={s.tile} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold tracking-tight text-[#0B211B]">
                            {count} {o.label.replace(/^\d+ /, '')}
                          </div>
                          <div className="mt-0.5 truncate text-xs font-medium leading-snug text-[#0B211B]/55">
                            {o.state === 'waiting' ? `Expires ${dispatch.expiresAt} · ${mmss} left` : o.detail}
                          </div>
                          <Meter value={count / totalOffers} intent={s.intent} delay={0.2 + i * 0.1} className="mt-2 max-w-[160px]" />
                        </div>
                        <Chip intent={s.intent} dot={s.live}>{s.chip}</Chip>
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Re-check rules" trailing={<Chip intent="success">Auto</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {rules.map((r, i) => (
                  <motion.button
                    key={r.title}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => notify({ title: `Rule: ${r.title.toLowerCase()}`, body: r.notifyBody, kind: r.kind })}
                    className={cn('group flex w-full items-center gap-3 px-4 py-3 text-left', i > 0 && 'border-t border-[#0B211B]/[0.05]')}
                  >
                    <span className="flex w-6 shrink-0 flex-col items-center">
                      <span className="text-[10px] font-extrabold tabular-nums text-emerald-600/60">{String(i + 1).padStart(2, '0')}</span>
                      {i < rules.length - 1 && <span aria-hidden className="mt-1 w-px flex-1 bg-[#0B211B]/10" />}
                    </span>
                    <Tile icon={r.icon} tone={r.intent} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">{r.title}</span>
                      <span className="mt-0.5 block text-xs font-medium leading-snug text-[#0B211B]/55">{r.body}</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
                  </motion.button>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="warning" rail>
                <button
                  onClick={() => setOpenFailsafe((v) => !v)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <Tile icon={Siren} tone="warning" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold tracking-tight text-[#0B211B]">The 9:45 failsafe</span>
                    <span className="mt-0.5 block text-xs font-medium leading-relaxed text-[#0B211B]/55">
                      No acceptance by 9:45 AM · care team paged personally
                    </span>
                  </span>
                  <motion.span animate={{ rotate: openFailsafe ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="h-4 w-4 text-amber-600/70" aria-hidden />
                  </motion.span>
                </button>
                <Expand open={openFailsafe}>
                  <div className="px-4 pb-4">
                    <div className="space-y-2.5 rounded-2xl border border-amber-500/15 bg-white/70 p-3.5">
                      {failsafeSteps.map((s) => (
                        <div key={s.time} className="flex items-center gap-2.5">
                          <TimeChip>{s.time}</TimeChip>
                          <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
                          <span className="text-xs font-semibold text-[#0B211B]/75">{s.text}</span>
                        </div>
                      ))}
                      <p className="border-t border-amber-500/10 pt-2.5 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
                        The family watches each step on their re-dispatch screen.
                      </p>
                    </div>
                  </div>
                </Expand>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of dispatch view" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="outline"
          shape="pill"
          size="lg"
          className="w-full border-emerald-700/15 bg-white/85 text-[#0B211B] shadow-[0_10px_26px_-14px_rgba(11,33,27,0.35)] backdrop-blur"
          onClick={() => notify({ title: 'Escalation policy', body: 'No acceptance by 9:45 AM · care team paged personally', kind: 'warn' })}
        >
          <Siren className="h-4 w-4 text-amber-500" aria-hidden />
          Open escalation policy
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
