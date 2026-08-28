import { motion } from 'motion/react'
import { Check, ClipboardList, HeartPulse, Lock, Pill as PillIcon, ShieldAlert, ShieldCheck, Utensils } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, LiveDot, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { lovedOnes, sessions } from '@/data/seed'
import { sessionChecklist, type ChecklistStep } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const stepIcons = {
  arrived: Check,
  vitals: HeartPulse,
  meds: PillIcon,
  walk: ClipboardList,
  meal: Utensils,
} as const

const quickActions: { key: keyof typeof stepIcons; label: string; body: string }[] = [
  { key: 'vitals', label: 'Vitals', body: 'Pressure, pulse, oxygen and temperature · compared with last visit' },
  { key: 'meds', label: 'Meds', body: 'Three-point verification before any dose is given' },
  { key: 'walk', label: 'Notes', body: 'The family sees your notes in the visit summary' },
]

export function PR06() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const live = sessions.find((s) => s.status === 'live')
  const father = lovedOnes[0]
  const doneCount = sessionChecklist.filter((s) => s.done).length
  const activeStep = sessionChecklist.find((s) => s.active)
  const progress = doneCount / sessionChecklist.length

  const tileFor = (s: ChecklistStep): { tone: TileTone; pulse?: boolean } => {
    if (s.done) return { tone: 'success' }
    if (s.active) return { tone: 'live', pulse: true }
    return { tone: 'neutral' }
  }

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle={`${live?.title ?? 'Elderly care'} · step ${doneCount + 1} of ${sessionChecklist.length}`}
        onBack={() => navigate('/professional/pr04')}
        trailing={
          <Chip intent="live" dot>
            Live
          </Chip>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-3">
                  <Kicker>Live visit · GPS verified</Kicker>
                  <Chip intent="success" light icon={Lock} className="shrink-0 border-transparent">
                    Logged
                  </Chip>
                </div>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Checked in at{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">2:02 PM</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  GPS matched the care address · this check-in is written permanently to the visit record.
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/50">Checklist progress</span>
                    <span className="text-[10px] font-extrabold tabular-nums text-emerald-200">
                      {doneCount}/{sessionChecklist.length}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {sessionChecklist.map((s) => (
                      <span
                        key={s.id}
                        className={
                          s.done
                            ? 'h-1.5 flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300'
                            : s.active
                              ? 'relative h-1.5 flex-1 overflow-hidden rounded-full bg-emerald-300/25'
                              : 'h-1.5 flex-1 rounded-full bg-white/10'
                        }
                      >
                        {s.active && (
                          <motion.span
                            className="absolute inset-0 rounded-full bg-emerald-300"
                            animate={{ opacity: [1, 0.25, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
                    <LiveDot className="text-emerald-300" />
                    <span className="min-w-0 flex-1 truncate text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/70">
                      {activeStep ? `Running · ${activeStep.title}` : 'All steps complete'}
                    </span>
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care plan checklist" trailing={<Chip intent="success">{Math.round(progress * 100)}%</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {sessionChecklist.map((s, i) => {
                  const Icon = stepIcons[s.icon] ?? Check
                  const t = tileFor(s)
                  const last = i === sessionChecklist.length - 1
                  return (
                    <div key={s.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <div className="flex items-center gap-3 px-4 py-3.5">
                        <span className="relative shrink-0">
                          <Tile icon={Icon} tone={t.tone} />
                          {s.active && (
                            <span aria-hidden className="absolute -inset-1 -z-10 rounded-[18px] bg-emerald-500/20 blur-md" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{s.title}</div>
                          <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/50">{s.body}</div>
                        </div>
                        {s.done && <Chip intent="success" icon={Check}>Done</Chip>}
                        {s.active && (
                          <Chip intent="live" dot>
                            Active
                          </Chip>
                        )}
                        {s.locked && <Chip intent="neutral" icon={Lock}>Locked</Chip>}
                      </div>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Quick actions" trailing={<Chip intent="neutral">During visit</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="grid grid-cols-3 gap-2.5">
                {quickActions.map((q) => (
                  <motion.button
                    key={q.label}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => notify({ title: `${q.label} entry`, body: q.body, kind: 'info' })}
                    className="flex flex-col items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] p-3.5 transition-colors hover:bg-[#0B211B]/[0.07]"
                  >
                    <Tile icon={stepIcons[q.key]} tone="info" size="sm" />
                    <span className="text-[12px] font-extrabold tracking-tight text-[#0B211B]">{q.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="warning" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldAlert} tone="warning" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Patient safety first. If anything looks wrong with {father.name.split(' ')[0]}, use Report incident — care stops until it
                  is handled.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label={activeStep ? `Running: ${activeStep.title}` : 'All steps done'} />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notify({
                title: 'Incident report opened',
                body: 'Severity, description and photo · supervisors paged for moderate or worse',
                kind: 'warn',
              })
              navigate('/professional/pr08')
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <ShieldAlert className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Incident</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notify({ title: 'Visit signed off', body: 'All steps sealed · payment released · family notified', kind: 'ok' })
              navigate('/professional/pr09')
            }}
            className="flex flex-[1.4] items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Complete and sign off</span>
          </motion.button>
        </div>
      </FootBar>
    </Screen>
  )
}
