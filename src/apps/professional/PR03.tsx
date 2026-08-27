import { useState } from 'react'
import { motion } from 'motion/react'
import { Bell, CheckCircle2, Clock, Lock, Send, X } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { offers, type Offer } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PR03() {
  const { notify, dispatch } = useDemo()
  const { navigate } = useRouter()
  const [list, setList] = useState<Offer[]>(offers)
  const [accepting, setAccepting] = useState(true)

  const active = list.filter((o) => o.status === 'active')
  const declined = list.filter((o) => o.status === 'declined')

  const decide = (o: Offer, accept: boolean) => {
    setList((prev) => prev.map((x) => (x.id === o.id ? { ...x, status: accept ? 'active' : 'declined' } : x)))
    if (accept) {
      notify({
        title: 'Offer accepted',
        body: `${o.title} · availability re-checked · session confirmed`,
        kind: 'ok',
      })
    } else {
      notify({ title: 'Offer declined', body: `${o.title} · no penalty · slot re-offered`, kind: 'warn' })
    }
  }

  return (
    <Screen>
      <AppBar
        title="New care offers"
        subtitle={`Round ${dispatch.round} · expires ${dispatch.expiresAt}`}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex items-center gap-3">
              <IconTile icon={Bell} tone="white" className={cn(accepting && 'animate-pulse')} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">{accepting ? 'Accepting offers' : 'Paused'}</div>
                <div className="text-xs font-medium text-brand-ink/80">
                  {accepting ? 'Dispatches arrive in realtime' : 'You receive nothing until you resume'}
                </div>
              </div>
              <button
                onClick={() => {
                  setAccepting((v) => !v)
                  notify({
                    title: accepting ? 'Offers paused' : 'Accepting again',
                    body: accepting ? 'You will not receive new dispatches' : 'Realtime dispatches resumed',
                    kind: 'info',
                  })
                }}
                className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', accepting ? 'bg-primary' : 'bg-[#CBD9D3]')}
                aria-label="Toggle accepting offers"
              >
                <span className={cn('absolute top-1 size-5 rounded-full bg-white transition-all', accepting ? 'left-6' : 'left-1')} />
              </button>
            </ScreenCard>
          </motion.div>

          {active.map((o) => (
            <motion.div key={o.id} variants={item}>
              <ScreenCard className="flex flex-col gap-3 border-l-4 border-l-primary">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{o.title}</span>
                  <Pill tone="warn">
                    <Clock className="size-3.5" /> {o.expiresIn}
                  </Pill>
                </div>
                <div className="text-[13px] font-medium leading-snug text-foreground/80">
                  {o.type === 'recurring' ? 'Recurring care' : o.type === 'one-time' ? 'One-time visit' : 'Ongoing care'} ·{' '}
                  {o.distance} away · {o.rate}
                </div>
                <div className="flex flex-wrap gap-2">
                  {o.consentSigned && (
                    <Pill tone="ok">
                      <CheckCircle2 className="size-3.5" /> Consent signed
                    </Pill>
                  )}
                  <Pill tone="grey">{o.rate}</Pill>
                </div>
                <div className="flex gap-2.5">
                  <SmoothButton variant="outline" shape="pill" className="flex-1" onClick={() => decide(o, false)}>
                    Decline
                  </SmoothButton>
                  <SmoothButton variant="default" shape="pill" className="flex-[1.3]" onClick={() => decide(o, true)}>
                    <Send className="size-4" /> Accept
                  </SmoothButton>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Lock className="size-3.5 shrink-0" />
                  Acceptance is re-checked against your live availability.
                </div>
              </ScreenCard>
            </motion.div>
          ))}

          {active.length === 0 && (
            <motion.div variants={item}>
              <InfoCard
                icon={CheckCircle2}
                body="No open offers right now. You will be the first to know when one matches your windows."
              />
            </motion.div>
          )}

          {declined.length > 0 && (
            <>
              <motion.div variants={item}>
                <SectionHeader label="Declined · yesterday" />
              </motion.div>
              <motion.div variants={item}>
                <ScreenCard className="p-2 opacity-65">
                  {declined.map((o) => (
                    <div key={o.id} className="flex items-center gap-3 px-2 py-1.5">
                      <IconTile icon={X} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-foreground">{o.title}</div>
                        <div className="truncate text-xs font-medium text-muted-foreground">
                          Declined politely · family matched elsewhere
                        </div>
                      </div>
                    </div>
                  ))}
                </ScreenCard>
              </motion.div>
            </>
          )}

          <motion.div variants={item}>
            <EndOfScroll label="End of offers" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
