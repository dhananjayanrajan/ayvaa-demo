import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  MapPin,
  RefreshCw,
} from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Hero,
  Kicker,
  LiveChip,
  Ring,
  Section,
  rise,
  stagger,
} from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { OfferStatusList } from '@/components/transactions/TransactionsSet'
import { RecheckRulesList } from '@/components/recheck/RecheckSet'
import { FailsafeCard } from '@/components/drills/DrillsSet'

export function S02() {
  const { dispatch, setDispatch, notify } = useDemo()
  const [tick, setTick] = useState(0)
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
                    <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
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

            <OfferStatusList
              waiting={dispatch.waiting}
              declined={dispatch.declined}
              recheck={dispatch.recheck}
              mmss={mmss}
              expiresAt={dispatch.expiresAt}
              notify={notify}
            />

            <motion.div variants={rise}>
              <Section label="Re-check rules" trailing={<Chip intent="success">Auto</Chip>} />
            </motion.div>

            <RecheckRulesList notify={notify} />

            <FailsafeCard />

            <motion.div variants={rise}>
              <EndOfScroll label="End of dispatch view" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
