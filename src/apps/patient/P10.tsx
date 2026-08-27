import { motion } from 'motion/react'
import { ArrowRight, BadgeCheck, Hourglass, MapPin, Send, Star, Workflow } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Avatar, Chip, Pill } from '@/components/phone/Controls'
import { caregivers, pricing } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P10() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [first, second, third] = caregivers

  const sendOffer = (name: string) => {
    notify({ title: 'Offer sent', body: `${name} will respond within minutes · availability re-checked on acceptance`, kind: 'ok' })
  }

  return (
    <Screen>
      <AppBar title="Nearby caregivers" subtitle="Offers go out live and update instantly" onBack={() => navigate('/patient/p09')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex items-center justify-between px-1">
            <SectionHeader label="Step 2 of 3 · Matching" />
            <span className="text-xs font-bold text-primary">66 percent</span>
          </motion.div>
          <motion.div variants={item}>
            <div className="h-2 rounded-full bg-tonal">
              <div className="h-2 w-2/3 rounded-full bg-primary" />
            </div>
          </motion.div>

          <motion.div variants={item} className="flex gap-2">
            <Chip on>
              <MapPin className="size-3.5" /> Within 5 km
            </Chip>
            <Chip on>
              <BadgeCheck className="size-3.5" /> Licensed
            </Chip>
            <Chip onClick={() => notify({ title: 'Language filter', body: 'Match caregivers by spoken language', kind: 'info' })}>
              Language
            </Chip>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <Avatar tone="soft" className="size-[46px]">
                  {first.name.split(' ').map((w) => w[0]).join('')}
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-bold text-brand-ink">{first.name}</span>
                    <BadgeCheck className="size-4 shrink-0 fill-current text-brand-ink" />
                  </div>
                  <div className="truncate text-xs font-medium text-brand-ink/80">{first.role}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-bold text-brand-ink">
                  <Star className="size-3.5 fill-current" /> {first.rating} rating · {first.years} years
                </span>
                <Pill tone="ok" className="bg-white/80">
                  <Hourglass className="size-3.5" /> Offer sent
                </Pill>
              </div>
            </ScreenCard>
          </motion.div>

          {[second, third].map((c) => (
            <motion.div key={c.id} variants={item}>
              <ScreenCard className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <Avatar tone="alt" className="size-[46px]">
                    {c.name.split(' ').map((w) => w[0]).join('')}
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-bold text-foreground">{c.name}</span>
                      <BadgeCheck className="size-4 shrink-0 fill-current text-primary" />
                    </div>
                    <div className="truncate text-xs font-medium text-muted-foreground">{c.role}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-bold text-foreground/80">
                    <Star className="size-3.5 fill-current text-[#DBA800]" /> {c.rating} rating · {c.years} years
                  </span>
                  <SmoothButton variant="soft" shape="pill" onClick={() => sendOffer(c.name)}>
                    <Send className="size-4" /> Send offer
                  </SmoothButton>
                </div>
              </ScreenCard>
            </motion.div>
          ))}

          <motion.div variants={item}>
            <InfoCard
              icon={Workflow}
              body="When a caregiver accepts, we re-check their current availability before confirming your session."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of matches" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => {
            notify({ title: 'Moving to review', body: `${first.name} leads the match list`, kind: 'info' })
            navigate('/patient/p12')
          }}
        >
          Continue to review <ArrowRight className="size-4" />
        </SmoothButton>
        <div className="text-center text-xs font-medium text-muted-foreground">
          Weekly total · 6 visits · {pricing.weekly}
        </div>
      </FootBar>
    </Screen>
  )
}
