import { motion } from 'motion/react'
import {
  Activity,
  CalendarDays,
  ChevronRight,
  Flag,
  Footprints,
  HeartPulse,
  Salad,
  TrendingUp,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { carePlan, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P13() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]

  const goals = [
    { icon: Footprints, title: 'Walk fifteen minutes unaided', body: 'Achieved three times this week', met: true },
    { icon: HeartPulse, title: 'Blood pressure below 130 over 80', body: 'Average this week 126 over 78', met: true },
    { icon: Salad, title: 'Low salt diet every day', body: 'Four of six days so far', met: false },
  ]

  return (
    <Screen>
      <AppBar
        title="Elderly care plan"
        subtitle={`${father.name} · nine week recovery plan`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <button
            onClick={() => navigate('/patient/p34')}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Plan options"
          >
            <Flag className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Overall progress</div>
                  <div className="mt-0.5 text-2xl font-black text-brand-ink">
                    Week {carePlan.week} of {carePlan.weeks}
                  </div>
                </div>
                <Pill tone="ok" className="bg-white/80">
                  <TrendingUp className="size-3.5" /> {carePlan.status}
                </Pill>
              </div>
              <div className="h-2 rounded-full bg-white/65">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${carePlan.progress}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-brand-ink/90">
                <span>{carePlan.visitsDone} visits completed</span>
                <span>Consent active</span>
                <span>No open incidents</span>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Weekly goals" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {goals.map((g, i) => {
                const Icon = g.icon
                return (
                  <div key={g.title}>
                    {i > 0 && <div className="mx-3 my-2.5 h-px bg-border" />}
                    <div className="flex items-center gap-3 px-2 py-1.5">
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-[14px] ${g.met ? 'bg-mint text-brand-ink' : 'bg-tonal text-foreground/70'}`}
                      >
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-foreground">{g.title}</div>
                        <div className="text-xs font-medium text-muted-foreground">{g.body}</div>
                      </div>
                      <Pill tone={g.met ? 'ok' : 'warn'}>
                        {g.met ? 'Met' : 'In progress'}
                      </Pill>
                    </div>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Recent readings trend" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">Blood pressure · four weeks</span>
                <Pill tone="ok">
                  <TrendingUp className="size-3.5 rotate-90" /> Steadily lower
                </Pill>
              </div>
              <div className="flex h-20 items-end gap-2.5">
                {[52, 44, 38, 32].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-lg rounded-b-sm"
                      style={{
                        height: h,
                        backgroundColor: i === 3 ? 'var(--primary)' : i === 2 ? '#BFE5DA' : 'var(--tonal)',
                      }}
                    />
                    <span className="text-[11px] font-bold text-muted-foreground">Wk {i + 3}</span>
                  </div>
                ))}
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="p-2">
              <button
                onClick={() => navigate('/patient/p14')}
                className="flex w-full items-center gap-3 text-left"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-mint text-brand-ink">
                  <CalendarDays className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-foreground">View weekly reports</span>
                  <span className="block text-xs font-medium text-muted-foreground">One sealed report per completed month</span>
                </span>
                <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
              </button>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Activity}
              body={`This plan guides every visit. ${father.name.split(' ')[0]}'s caregiver sees these goals at each session.`}
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of care plan" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
