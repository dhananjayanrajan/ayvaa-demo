import { motion } from 'motion/react'
import { BadgeCheck, Download, Lock, Star, Target, TrendingUp, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Ring, Section, rise, stagger } from '@/components/phone/kit'
import { staff, staffFeedback } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const kpis: { icon: LucideIcon; value: string; label: string; tint: string; iconBg: string }[] = [
  { icon: UserCheck, value: '27', label: 'Sessions', tint: 'bg-emerald-500/[0.09]', iconBg: 'bg-emerald-500/15 text-emerald-600' },
  { icon: TrendingUp, value: '100%', label: 'On time', tint: 'bg-sky-500/[0.08]', iconBg: 'bg-sky-500/15 text-sky-600' },
  { icon: Target, value: '9/11', label: 'Goals met', tint: 'bg-amber-500/[0.09]', iconBg: 'bg-amber-500/15 text-amber-600' },
  { icon: Star, value: '4.9', label: 'Rating', tint: 'bg-teal-500/[0.09]', iconBg: 'bg-teal-500/15 text-teal-600' },
]

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label="5 star rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-300 text-amber-300" aria-hidden />
      ))}
    </span>
  )
}

export function PT06() {
  const { notify } = useDemo()
  const dr = staff[1]
  const goalsMet = 9
  const goalsTotal = 11

  return (
    <Screen>
      <AppBar title="Performance" subtitle="Dr. Venkatesh · Physiotherapist" />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <AgentAvatar seed="Dr. Venkatesh" size={56} />
                    <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[#0B231C] shadow-md">
                      <BadgeCheck className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Performance · March</div>
                    <h2 className="mt-1.5 text-[18px] font-extrabold leading-tight tracking-tight text-white">Dr. Venkatesh</h2>
                    <p className="mt-0.5 text-[11.5px] font-semibold text-emerald-100/55">Physiotherapist · Sunrise panel</p>
                    <p className="text-[10.5px] font-medium text-emerald-100/40">{dr.week}</p>
                  </div>
                  <Ring value={4.9 / 5} size={72} stroke={6} id="pt06-ring">
                    <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">4.9</span>
                    <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.16em] text-emerald-200/50">rating</span>
                  </Ring>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/[0.06] px-3.5 py-3">
                  <div className="min-w-0">
                    <Stars />
                    <div className="mt-1 truncate text-[10.5px] font-bold text-emerald-100/60">
                      Family-rated across every completed visit
                    </div>
                  </div>
                  <Chip intent="success" light icon={TrendingUp} className="shrink-0 border-transparent">
                    +0.2 MoM
                  </Chip>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Chip intent="success" light className="border-transparent">2/2 incidents resolved</Chip>
                  <Chip intent="warning" light className="border-transparent">2 goals in progress</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <div className="grid grid-cols-2 gap-2.5">
                {kpis.map((k) => (
                  <div key={k.label} className={cn('rounded-2xl p-4', k.tint)}>
                    <span className={cn('flex h-8 w-8 items-center justify-center rounded-xl', k.iconBg)}>
                      <k.icon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                    </span>
                    <div className="mt-3 text-[22px] font-extrabold tabular-nums leading-none tracking-tight text-[#0B211B]">{k.value}</div>
                    <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/45">{k.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care goals" trailing={<Chip intent="warning">{goalsTotal - goalsMet} open</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">Recovery plan</span>
                    <span className="text-[13px] font-extrabold tabular-nums text-[#0B211B]/60">
                      {goalsMet}
                      <span className="text-[#0B211B]/35">/{goalsTotal} met</span>
                    </span>
                  </div>
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: goalsTotal }, (_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.2 + i * 0.04, duration: 0.25 }}
                        className={cn(
                          'h-2.5 min-w-0 flex-1 rounded-full',
                          i < goalsMet ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-amber-400/80',
                        )}
                      />
                    ))}
                  </div>
                  <div className="mt-3.5 flex flex-col gap-2">
                    {[
                      { label: 'Mobility restored', done: true },
                      { label: 'Post-op pain down', done: true },
                      { label: 'Endurance milestone', done: false },
                      { label: 'Home exercise adherence', done: false },
                    ].map((g) => (
                      <div key={g.label} className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            'grid h-4 w-4 shrink-0 place-items-center rounded-full',
                            g.done ? 'bg-emerald-500 text-white' : 'bg-amber-400/25',
                          )}
                        >
                          {g.done ? (
                            <Star className="h-2.5 w-2.5 fill-white" aria-hidden />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          )}
                        </span>
                        <span
                          className={cn(
                            'min-w-0 flex-1 truncate text-[12px] font-bold',
                            g.done ? 'text-[#0B211B]/70' : 'text-[#0B211B]/45',
                          )}
                        >
                          {g.label}
                        </span>
                        <Chip intent={g.done ? 'success' : 'warning'}>{g.done ? 'Met' : 'Open'}</Chip>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Family feedback" trailing={<Chip intent="success">Shared with consent</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[22px] bg-[#0B231C] p-5 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <Stars />
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">5.0 · verbatim</span>
                  </div>
                  <p className="mt-2.5 text-pretty text-[14px] font-semibold leading-relaxed text-white/90">
                    &ldquo;{staffFeedback.quote}&rdquo;
                  </p>
                  <div className="mt-3.5 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] font-extrabold text-emerald-200">
                      {staffFeedback.family.slice(0, 1)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/80">{staffFeedback.family}</span>
                    <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-100/30" aria-hidden />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
                <p className="min-w-0 flex-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                  Feedback reaches partners only after the family approves sharing. Reviews are never edited.
                </p>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of performance" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => notify({ title: 'Report queued', body: 'Performance report will be emailed to Sunrise', kind: 'info' })}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Export performance report
        </motion.button>
      </FootBar>
    </Screen>
  )
}
