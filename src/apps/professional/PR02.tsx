import { useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, CheckCircle2, Gavel, History } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Avatar, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { professional } from '@/data/seed'
import { proTerms } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const checks = [
  { title: 'Nursing licence confirmed', body: 'Checked with the council · renews March 2025' },
  { title: 'Background screening cleared', body: 'Police check and two references' },
  { title: 'Government ID and selfie matched', body: 'Verified at sign up' },
]

export function PR02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [agreed, setAgreed] = useState<string[]>(proTerms)
  const initials = professional.name.split(' ').map((w) => w[0]).join('')

  const toggle = (t: string) =>
    setAgreed((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const allAgreed = agreed.length === proTerms.length

  return (
    <Screen>
      <AppBar title="Before your first session" onBack={() => navigate('/professional/pr01')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <Avatar tone="ink" className="size-[46px]">
                {initials}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">{professional.name}</div>
                <div className="text-xs font-medium text-muted-foreground">
                  {professional.role} · licence number {professional.licence}
                </div>
              </div>
              <Pill tone="ok">
                <BadgeCheck className="size-3.5" /> Verified
              </Pill>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Identity and safety checks" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {checks.map((c, i) => (
                <div key={c.title}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <IconTile icon={CheckCircle2} tone="mint" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-foreground">{c.title}</div>
                      <div className="text-xs font-medium text-muted-foreground">{c.body}</div>
                    </div>
                    <Pill tone="ok">Done</Pill>
                  </div>
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Professional terms of care" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              {proTerms.map((t) => (
                <button key={t} onClick={() => toggle(t)} className="flex w-full items-center gap-2.5 text-left">
                  <span
                    className={cn(
                      'grid size-[22px] shrink-0 place-items-center rounded-[7px] border-2 transition-colors',
                      agreed.includes(t) ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-ink/40 bg-white/60',
                    )}
                  >
                    {agreed.includes(t) && <CheckCircle2 className="size-4" />}
                  </span>
                  <span className="text-xs font-medium text-brand-ink">{t}</span>
                </button>
              ))}
              <div
                className={cn(
                  'flex items-center gap-1.5 text-[11px] font-bold',
                  allAgreed ? 'text-brand-ink' : 'text-warn-ink',
                )}
              >
                {allAgreed ? (
                  <>
                    <CheckCircle2 className="size-3.5" /> All terms accepted · ready to start
                  </>
                ) : (
                  <>
                    <Gavel className="size-3.5" /> {proTerms.length - agreed.length} terms still need your agreement
                  </>
                )}
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={History}
              body="Accepting these terms is timestamped and sealed. Every session you deliver is covered by them."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa professional onboarding" />
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
            notify({
              title: allAgreed ? 'Terms accepted' : 'Accepted with gaps',
              body: allAgreed ? 'Timestamped and sealed · offers unlocked' : 'You can accept the rest before your first session',
              kind: allAgreed ? 'ok' : 'warn',
            })
            navigate('/professional/pr03')
          }}
        >
          <BadgeCheck className="size-4" /> Accept terms and start
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
