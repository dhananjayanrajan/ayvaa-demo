import { motion } from 'motion/react'
import { Activity, CheckCircle2, HeartPulse, Lock, Quote, ReceiptText, Share2, Star, Wind } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { caregivers, pricing, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P17() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nurse = caregivers[0]
  const completed = visits.find((v) => v.status === 'live')

  const readings = [
    { icon: HeartPulse, value: '128 / 76', label: 'Pressure' },
    { icon: Activity, value: '72 bpm', label: 'Pulse' },
    { icon: Wind, value: '97 %', label: 'Oxygen' },
  ]

  const care = [
    'Recorded vital signs and compared with last visit',
    'Gave morning medication, two doses verified',
    'Completed fifteen minute guided walk',
    'Prepared low salt lunch from nutrition plan',
  ]

  return (
    <Screen>
      <AppBar
        title="Visit completed"
        subtitle="Wednesday, March 13 · 2:02 PM to 4:30 PM"
        onBack={() => navigate('/patient/p15')}
        trailing={
          <button
            onClick={() => notify({ title: 'Summary shared', body: 'Visit summary copied for your family or doctor', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Share summary"
          >
            <Share2 className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex items-center gap-3">
              <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-white">
                <CheckCircle2 className="size-5 fill-current text-brand-ink" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">All five steps completed</div>
                <div className="text-xs font-medium text-brand-ink/80">
                  Signed off by {nurse.name.split(' ')[0]} at 4:30 PM
                </div>
              </div>
              <Lock className="size-4 shrink-0 text-brand-ink" />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Health readings recorded" />
          </motion.div>
          <motion.div variants={item} className="flex gap-2.5">
            {readings.map((r) => {
              const Icon = r.icon
              return (
                <ScreenCard key={r.label} className="flex-1 p-3.5 text-center">
                  <Icon className="mx-auto size-5.5 fill-current text-primary" />
                  <div className="mt-1.5 text-base font-bold text-foreground">{r.value}</div>
                  <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{r.label}</div>
                </ScreenCard>
              )
            })}
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Care delivered today" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {care.map((c, i) => (
                <div key={c}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <CheckCircle2 className="size-5 shrink-0 fill-current text-primary" />
                    <span className="min-w-0 flex-1 text-sm font-medium text-foreground/80">{c}</span>
                  </div>
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Note from your caregiver" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="tonal">
              <div className="flex items-start gap-2.5">
                <Quote className="size-4 shrink-0 fill-current text-brand-ink" />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium leading-snug text-foreground/80">
                    "Walked steadier than Monday and appetite was good. Recommend keeping the current walk length until Friday."
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    {nurse.name} · sealed record
                  </div>
                </div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <IconTile icon={ReceiptText} tone="mint" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">{pricing.elderly} charged</div>
                <div className="text-xs font-medium text-muted-foreground">HDFC Card ending 8842 · receipt saved</div>
              </div>
              <Pill tone="ok">Paid</Pill>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of summary" />
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
            notify({ title: 'Thanks for the feedback', body: 'Your rating shapes matching quality', kind: 'ok' })
            navigate('/patient/p15')
          }}
        >
          <Star className="size-4 fill-current" /> Rate this visit
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
