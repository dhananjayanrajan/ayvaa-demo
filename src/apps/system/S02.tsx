import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  AlertTriangle,
  Ban,
  BellRing,
  CheckCircle2,
  Hourglass,
  RefreshCw,
  Workflow,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Pill, SectionLabel } from '@/components/phone/Controls'
import { useDemo } from '@/lib/store'
import { dispatchOffers } from '@/data/seed'
import { cn } from '@/lib/utils'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function S02() {
  const { dispatch } = useDemo()
  const [left, setLeft] = useState(dispatch.minutesLeft)

  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  const states = {
    waiting: { icon: Hourglass, tile: 'bg-warn-bg text-warn-ink' },
    declined: { icon: Ban, tile: 'bg-tonal text-foreground/70' },
    recheck: { icon: CheckCircle2, tile: 'bg-mint text-brand-ink' },
  }

  return (
    <Screen>
      <AppBar
        title="Dispatch engine"
        subtitle="Friday visits · matching round two · live"
        trailing={
          <span className="grid size-10.5 place-items-center rounded-full bg-brand-ink text-white">
            <Workflow className="size-5" />
          </span>
        }
      />
      <BodyArea>
        <motion.div variants={list} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-3 rounded-[20px] bg-mint p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-white/60 text-brand-ink">
              <RefreshCw className="size-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-brand-ink">Round one expired · round two running</div>
              <div className="mt-0.5 text-xs font-medium text-brand-ink/80">
                Offers re-sent to 8 nurses at 8:16 AM · search widened to 10 km at 9:00 AM
              </div>
            </div>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Offer states · round two</SectionLabel>
          </motion.div>
          <motion.div variants={item} className="overflow-hidden rounded-[20px] border border-border bg-card">
            {dispatchOffers.map((o, i) => {
              const s = states[o.state]
              const Icon = s.icon
              return (
                <div key={o.id} className={cn('flex gap-3 p-4', i > 0 && 'border-t border-border')}>
                  <span className={cn('grid size-11 shrink-0 place-items-center rounded-[14px]', s.tile)}>
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{o.label}</span>
                      {o.state === 'recheck' && <Pill tone="warn">Checking</Pill>}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                      {o.state === 'waiting' ? `Expire 9:45 AM · ${left} minutes remaining` : o.detail}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Re-check rules</SectionLabel>
          </motion.div>
          <motion.div variants={item} className="overflow-hidden rounded-[20px] border border-border bg-card">
            <div className="flex gap-3 p-4">
              <CheckCircle2 className="size-5 shrink-0 text-primary" />
              <div>
                <div className="text-sm font-bold text-foreground">Free in the window</div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">Acceptance confirmed instantly</div>
              </div>
            </div>
            <div className="flex gap-3 border-t border-border p-4">
              <AlertTriangle className="size-5 shrink-0 text-warn-ink" />
              <div>
                <div className="text-sm font-bold text-foreground">New conflict found</div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                  Offer reversed, session re-dispatched
                </div>
              </div>
            </div>
            <div className="flex gap-3 border-t border-border p-4">
              <CheckCircle2 className="size-5 shrink-0 text-primary" />
              <div>
                <div className="text-sm font-bold text-foreground">Every outcome is logged</div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                  Shown to the family transparently
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="flex gap-3 rounded-[20px] bg-tonal p-4">
            <BellRing className="size-5 shrink-0 text-brand-ink" />
            <p className="text-xs font-medium text-foreground/80">
              At 9:45 AM with no acceptance, the care team is paged personally. The family sees each step on their
              re-dispatch screen.
            </p>
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}