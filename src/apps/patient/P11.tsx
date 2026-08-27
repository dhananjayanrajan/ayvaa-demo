import { motion } from 'motion/react'
import { ArrowRight, BadgeCheck, FileCheck2, Lock, Quote, ShieldCheck, Star, Stethoscope, Users } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader, StatRow } from '@/components/phone/ScreenBlocks'
import { Avatar, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { caregivers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P11() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const c = caregivers[0]
  const initials = c.name.split(' ').map((w) => w[0]).join('')

  return (
    <Screen>
      <AppBar title="Caregiver profile" onBack={() => navigate('/patient/p10')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <Avatar tone="soft" className="size-[58px] text-base">
                {initials}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-base font-bold text-foreground">{c.name}</span>
                  <BadgeCheck className="size-4 shrink-0 fill-current text-primary" />
                </div>
                <div className="truncate text-xs font-medium text-muted-foreground">{c.role}</div>
                <div className="mt-0.5 flex items-center gap-1 text-xs font-bold text-foreground/70">
                  <Star className="size-3.5 fill-current text-[#DBA800]" /> {c.rating} · {c.visits} visits
                </div>
              </div>
              <Pill tone="ok">
                <Stethoscope className="size-3.5" /> {c.years} yrs
              </Pill>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Credentials · all verified by Ayvaa" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTileShield />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Registered Nurse licence</div>
                  <div className="text-xs font-medium text-muted-foreground">{c.licence}</div>
                </div>
                <Pill tone="ok">Valid</Pill>
              </div>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTileShield />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Background screening</div>
                  <div className="text-xs font-medium text-muted-foreground">Police and reference checks cleared</div>
                </div>
                <Pill tone="ok">Cleared</Pill>
              </div>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTileShield />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Advanced first aid</div>
                  <div className="text-xs font-medium text-muted-foreground">Certificate renewed January 2024</div>
                </div>
                <Pill tone="ok">Valid</Pill>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="What families say" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="tonal">
              <div className="flex items-start gap-2.5">
                <Quote className="size-4 shrink-0 fill-current text-brand-ink" />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium leading-snug text-foreground/80">
                    "Cared for my mother for four months. Punctual every single day, and her notes helped her doctors a lot."
                  </div>
                  <div className="mt-2 text-xs font-bold text-muted-foreground">Iyer family · post-operative care · Feb 2024</div>
                </div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Recent care delivered" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="px-2 py-1.5">
                <StatRow icon={Users} label="Elderly care · recurring visits" value="41 sessions" />
              </div>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="px-2 py-1.5">
                <StatRow icon={FileCheck2} label="Post-operative recovery" value="29 sessions" />
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body={`${c.name.split(' ')[0]} delivers care only under your signed consent and care plan. Every visit is verified and logged.`}
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of profile" />
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
            notify({ title: 'Offer sent', body: `${c.name} will respond within minutes · availability re-checked on acceptance`, kind: 'ok' })
            navigate('/patient/p12')
          }}
        >
          Send offer to {c.name.split(' ')[0]} <ArrowRight className="size-4" />
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}

function IconTileShield() {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-mint text-brand-ink">
      <ShieldCheck className="size-5" />
    </span>
  )
}
