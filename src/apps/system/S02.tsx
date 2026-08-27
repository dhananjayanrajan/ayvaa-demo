import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, Ban, BellRing, CheckCircle2, Hourglass, RefreshCw } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { dispatchOffers } from '@/data/seed'
import { useDemo } from '@/lib/store'

const states = {
  waiting: { icon: Hourglass, tile: 'warn' as const },
  declined: { icon: Ban, tile: 'tonal' as const },
  recheck: { icon: CheckCircle2, tile: 'mint' as const },
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function S02() {
  const { dispatch, setDispatch, notify } = useDemo()
  const [left, setLeft] = useState(dispatch.minutesLeft)

  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 60000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (left === 0) {
      setDispatch({ minutesLeft: 0 })
      notify({ title: 'Offers expired', body: 'No acceptance yet · care team paged personally', kind: 'warn' })
    }
  }, [left, setDispatch, notify])

  return (
    <Screen>
      <AppBar
        title="Dispatch engine"
        subtitle="Friday visits · matching round two · live"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed="ayvaa-dispatch" size={42} />
            <Pill tone="ok">Live</Pill>
          </div>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex items-start gap-3">
              <IconTile icon={RefreshCw} tone="white" className="animate-spin [animation-duration:3s]" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">Round one expired · round two running</div>
                <div className="mt-0.5 text-[13px] font-medium leading-snug text-brand-ink/80">
                  Offers re-sent to 8 nurses at 8:16 AM · search widened to 10 km at 9:00 AM
                </div>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {dispatchOffers.map((o, i) => {
                const s = states[o.state]
                const Icon = s.icon
                const count = o.state === 'waiting' ? dispatch.waiting : o.state === 'declined' ? dispatch.declined : dispatch.recheck
                return (
                  <div key={o.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <div className="flex items-center gap-3 px-2 py-1.5">
                      <IconTile icon={Icon} tone={s.tile} />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-foreground">
                          {count} {o.label.replace(/^\d+ /, '')}
                        </div>
                        <div className="mt-0.5 text-xs font-medium leading-snug text-muted-foreground">
                          {o.state === 'waiting' ? `Expire ${dispatch.expiresAt} · ${left} minutes remaining` : o.detail}
                        </div>
                      </div>
                      {o.state === 'recheck' && <Pill tone="warn">Checking</Pill>}
                    </div>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard>
              <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Re-check rules</div>
              <div className="mt-3 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <IconTile icon={CheckCircle2} tone="mint" />
                  <span className="text-[13px] font-medium text-foreground/80">Free in the window · acceptance confirmed instantly</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconTile icon={AlertTriangle} tone="warn" />
                  <span className="text-[13px] font-medium text-foreground/80">New conflict found · offer reversed, session re-dispatched</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconTile icon={CheckCircle2} tone="mint" />
                  <span className="text-[13px] font-medium text-foreground/80">Every outcome is logged and shown to the family transparently</span>
                </div>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard
              icon={BellRing}
              body="At 9:45 AM with no acceptance, the care team is paged personally. The family sees each step on their re-dispatch screen."
            />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}