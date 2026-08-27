import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, Ban, BellRing, CheckCircle2, Hourglass, RefreshCw } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { Pill } from '@/components/phone/Controls'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { dispatchOffers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const row = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function S02() {
  const { dispatch } = useDemo()
  const [left, setLeft] = useState(dispatch.minutesLeft)

  useEffect(() => {
    const t = setInterval(() => setLeft((v) => Math.max(0, v - 1)), 60000)
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
        trailing={<Pill tone="ok">Live</Pill>}
      />
      <BodyArea>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col gap-3"
        >
          <motion.div variants={row}>
            <Card className="rounded-[20px] border-0 bg-mint p-4 shadow-none">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/70 text-brand-ink">
                  <RefreshCw className="size-5" />
                </span>
                <div>
                  <div className="text-sm font-bold text-brand-ink">Round one expired · round two running</div>
                  <div className="mt-0.5 text-xs font-medium text-brand-ink/70">
                    Offers re-sent to 8 nurses at 8:16 AM · search widened to 10 km at 9:00 AM
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={row}>
            <Card className="rounded-[20px] border-border p-2 shadow-none">
              {dispatchOffers.map((o, i) => {
                const s = states[o.state]
                const Icon = s.icon
                const count = o.state === 'waiting' ? dispatch.waiting : o.state === 'declined' ? dispatch.declined : dispatch.recheck
                return (
                  <div key={o.id}>
                    <div className="flex items-start gap-3 p-3">
                      <span className={cn('grid size-11 shrink-0 place-items-center rounded-[14px]', s.tile)}>
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">
                            {count} {o.label.replace(/^\d+ /, '')}
                          </span>
                          {o.state === 'recheck' && <Pill tone="warn">Checking</Pill>}
                        </div>
                        <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                          {o.state === 'waiting' ? `Expire ${dispatch.expiresAt} · ${left} minutes remaining` : o.detail}
                        </div>
                      </div>
                    </div>
                    {i < dispatchOffers.length - 1 && <Separator className="mx-3" />}
                  </div>
                )
              })}
            </Card>
          </motion.div>
          <motion.div variants={row}>
            <Card className="rounded-[20px] border-border p-2 shadow-none">
              <div className="px-3 pt-3 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">
                Re-check rules
              </div>
              {[
                { icon: CheckCircle2, tile: 'bg-mint text-brand-ink', text: 'Free in the window · acceptance confirmed instantly' },
                { icon: AlertTriangle, tile: 'bg-warn-bg text-warn-ink', text: 'New conflict found · offer reversed, session re-dispatched' },
                { icon: CheckCircle2, tile: 'bg-mint text-brand-ink', text: 'Every outcome is logged and shown to the family transparently' },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex items-start gap-3 p-3">
                    <span className={cn('grid size-11 shrink-0 place-items-center rounded-[14px]', r.tile)}>
                      <r.icon className="size-5" />
                    </span>
                    <span className="pt-1 text-xs font-medium text-foreground/80">{r.text}</span>
                  </div>
                  {i < 2 && <Separator className="mx-3" />}
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={row}>
            <Card className="rounded-[20px] border-0 bg-tonal p-4 shadow-none">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                  <BellRing className="size-5" />
                </span>
                <p className="text-xs font-medium text-foreground/80">
                  At 9:45 AM with no acceptance, the care team is paged personally. The family sees each step on their
                  re-dispatch screen.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}