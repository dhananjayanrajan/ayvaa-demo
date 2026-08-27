import { motion } from 'motion/react'
import {
  ArrowRight,
  HeartPulse,
  Hourglass,
  MessageSquare,
  RefreshCw,
  Search,
  ShieldCheck,
  Undo2,
  UserSearch,
} from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { redispatch } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P31b() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  const steps = [
    { icon: Search, title: 'Widening the search', body: 'If no one accepts by 9:00 AM, we search 10 km instead of 5 km' },
    { icon: UserSearch, title: 'Care team joins at 9:00 AM', body: 'A coordinator personally finds a replacement nurse' },
    { icon: Undo2, title: 'You pay nothing if it fails', body: 'Automatic full refund, like your March 4 visit', guaranteed: true },
  ]

  return (
    <Screen>
      <AppBar
        title="Friday's visit needs a nurse"
        subtitle="March 15 · 10:00 AM · we are on it"
        onBack={() => navigate('/patient/p15')}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="error" className="flex items-start gap-3">
              <IconTile icon={Hourglass} tone="destructive" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-destructive">First offer expired</div>
                <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">
                  No nurse accepted within 30 minutes · re-dispatch started automatically at {redispatch.firstOfferExpired}
                </div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex items-start gap-3">
              <IconTile icon={RefreshCw} tone="white" className="animate-spin [animation-duration:3s]" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">Re-dispatch in progress</div>
                <div className="mt-0.5 text-[13px] font-medium leading-snug text-brand-ink/80">
                  New offers sent to {redispatch.redispatched} · widened to {redispatch.widened}
                </div>
              </div>
              <Pill tone="ok" className="bg-white/80">
                Live
              </Pill>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="What happens next" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {steps.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={s.title}>
                    {i > 0 && <div className="mx-3 my-2.5 h-px bg-border" />}
                    <div className="flex items-center gap-3 px-2 py-1.5">
                      <IconTile icon={Icon} tone={s.guaranteed ? 'mint' : 'tonal'} />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-foreground">{s.title}</div>
                        <div className="text-xs font-medium text-muted-foreground">{s.body}</div>
                      </div>
                      {s.guaranteed && <Pill tone="ok">Guaranteed</Pill>}
                    </div>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={ShieldCheck}
              body="You will be notified the moment a nurse accepts, and again when the visit is confirmed. No action is needed from you."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa reliability promise" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <SmoothButton
            variant="outline"
            shape="pill"
            size="lg"
            className="flex-1"
            onClick={() => notify({ title: 'Visit cancelled', body: 'Nothing was charged · your regular series continues', kind: 'info' })}
          >
            Cancel visit
          </SmoothButton>
          <SmoothButton
            variant="default"
            shape="pill"
            size="lg"
            className="flex-[1.4]"
            onClick={() => {
              notify({ title: 'Care team joining', body: 'A coordinator is connecting now', kind: 'ok' })
              navigate('/patient/p25')
            }}
          >
            <MessageSquare className="size-4" /> Talk to care team
          </SmoothButton>
        </div>
      </FootBar>
    </Screen>
  )
}
