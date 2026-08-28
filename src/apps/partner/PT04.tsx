import { motion } from 'motion/react'
import { Eye, FileText, Lock, MessageSquare, Stethoscope } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Section, rise, stagger } from '@/components/phone/kit'
import { latestVisit, referralJourney, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const trajectory: { wk: number; pct: number; proj?: boolean }[] = [
  { wk: 0, pct: 0 },
  { wk: 1, pct: 8 },
  { wk: 2, pct: 22 },
  { wk: 3, pct: 33 },
  { wk: 4, pct: 58, proj: true },
  { wk: 5, pct: 82, proj: true },
  { wk: 6, pct: 100, proj: true },
]

const X = (wk: number) => 10 + (wk / 6) * 280
const Y = (pct: number) => 118 - pct * 0.95

export function PT04() {
  const { notify } = useDemo()
  const r = referrals[0]

  const journey = referralJourney.map((s, i) => ({
    ...s,
    state: i < 3 ? 'done' : i === 3 ? 'now' : 'next',
  }))

  const solidPts = trajectory.filter((t) => !t.proj).map((t) => `${X(t.wk)},${Y(t.pct)}`).join(' ')
  const projPts = [
    `${X(3)},${Y(33)}`,
    ...trajectory.filter((t) => t.proj).map((t) => `${X(t.wk)},${Y(t.pct)}`),
  ].join(' ')

  return (
    <Screen>
      <AppBar title={r.name} subtitle={`${r.condition} · referred by ${r.by}`} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-5 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Patient chart</div>
                      <h2 className="mt-1.5 truncate text-[20px] font-extrabold leading-tight tracking-tight text-white">{r.name}</h2>
                      <p className="mt-0.5 truncate text-[11.5px] font-semibold text-emerald-100/55">
                        {r.condition} · age {r.age} · referred by {r.by}
                      </p>
                    </div>
                    <AgentAvatar seed={r.name} size={48} />
                  </div>

                  <div className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-100/70">REF · AYVAA-2026-0417</span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { v: 'Day 18', l: 'of 42' },
                      { v: '7', l: 'visits done' },
                      { v: r.caregiver.split(' ')[0], l: 'caregiver' },
                    ].map((t) => (
                      <div key={t.l} className="rounded-2xl bg-white/[0.06] px-3 py-2.5">
                        <div className="truncate text-[13px] font-extrabold tabular-nums leading-none text-white">{t.v}</div>
                        <div className="mt-1 truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/40">{t.l}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                      <Stethoscope className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/85">{r.caregiver}</span>
                    <Chip intent="live" light dot>
                      {r.progress}
                    </Chip>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Recovery trajectory" trailing={<Chip intent="success">On plan</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => notify({ title: 'Recovery 33%', body: 'Tracking to plan · full trajectory in the visit notes', kind: 'info' })}
                  className="block w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">6-week plan</span>
                    <span className="text-[13px] font-extrabold tabular-nums text-emerald-700">33%</span>
                  </div>
                  <svg viewBox="0 0 300 130" className="mt-2 h-32 w-full" aria-hidden>
                    {[25, 50, 75, 100].map((g) => (
                      <line key={g} x1={10} x2={290} y1={Y(g)} y2={Y(g)} stroke="rgba(11,33,27,0.07)" strokeWidth="1" strokeDasharray="3 4" />
                    ))}
                    <line x1={X(3)} x2={X(3)} y1={16} y2={122} stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
                    <motion.polyline
                      points={solidPts}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                    <motion.polyline
                      points={projPts}
                      fill="none"
                      stroke="#5eead4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="5 5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    />
                    {trajectory.slice(0, 4).map((t, i) => (
                      <motion.circle
                        key={t.wk}
                        cx={X(t.wk)}
                        cy={Y(t.pct)}
                        r={i === 3 ? 5 : 3.5}
                        fill={i === 3 ? '#10b981' : '#0B231C'}
                        stroke="#fff"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 300, damping: 16 }}
                      />
                    ))}
                    <text x={X(3)} y={10} textAnchor="middle" className="fill-emerald-600 text-[8px] font-extrabold uppercase" letterSpacing="1">
                      today
                    </text>
                  </svg>
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/35">
                    <span>Admission</span>
                    <span>Week 3</span>
                    <span>Week 6 · discharge</span>
                  </div>
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care pathway" trailing={<Chip intent="neutral">Step 4 live</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="px-1">
                {journey.map((s, i) => {
                  const last = i === journey.length - 1
                  return (
                    <div key={s.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span
                          className={cn(
                            'grid h-9 w-9 shrink-0 place-items-center rounded-xl font-mono text-[11px] font-extrabold',
                            s.state === 'done' && 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_8px_16px_-8px_rgba(16,185,129,0.7)]',
                            s.state === 'now' && 'bg-[#0B231C] text-emerald-300 ring-4 ring-emerald-500/20',
                            s.state === 'next' && 'bg-white text-[#0B211B]/35 ring-1 ring-inset ring-[#0B211B]/[0.08]',
                          )}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {!last && (
                          <span
                            aria-hidden
                            className={cn(
                              'my-1 w-0.5 flex-1 rounded-full',
                              s.state === 'done' ? 'bg-gradient-to-b from-emerald-400 to-emerald-300/40' : 'bg-[#0B211B]/10',
                            )}
                          />
                        )}
                      </div>
                      <div className={cn('min-w-0 flex-1 pb-6', last && 'pb-1')}>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'text-[14px] font-extrabold tracking-tight',
                              s.state === 'now' ? 'text-emerald-700' : s.state === 'next' ? 'text-[#0B211B]/40' : 'text-[#0B211B]',
                            )}
                          >
                            {s.title}
                          </span>
                          {s.state === 'now' && <Chip intent="live" dot>Now</Chip>}
                          {s.state === 'done' && <Chip intent="success">Done</Chip>}
                        </div>
                        <p
                          className={cn(
                            'mt-1 text-pretty text-xs font-medium leading-relaxed',
                            s.state === 'next' ? 'text-[#0B211B]/35' : 'text-[#0B211B]/55',
                          )}
                        >
                          {s.body}
                        </p>

                        {s.state === 'now' && (
                          <div className="relative mt-3 overflow-hidden rounded-[20px] bg-[#0B231C] p-4 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
                            <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-emerald-400/15 blur-3xl" />
                            <div className="relative">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">
                                  <FileText className="h-3 w-3" aria-hidden />
                                  Chart entry · {latestVisit.date}
                                </span>
                                <Lock className="h-3.5 w-3.5 text-emerald-100/30" aria-hidden />
                              </div>
                              <p className="mt-2.5 font-serif text-pretty text-[14px] font-medium leading-relaxed text-white/90">
                                &ldquo;{latestVisit.quote}&rdquo;
                              </p>
                              <div className="mt-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3">
                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-extrabold text-emerald-200">
                                  {latestVisit.by.slice(0, 1)}
                                </span>
                                <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/80">{latestVisit.by}</span>
                                <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-300/60">Verified</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3">
                <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
                <p className="min-w-0 flex-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                  Sunrise sees this chart because the guardian consented to sharing. Entries are verbatim and visible only after each visit
                  is verified.
                </p>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of referral" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => notify({ title: 'Discharge file', body: 'Latest summary PDF opened', kind: 'info' })}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
          >
            <FileText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Discharge file</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => notify({ title: 'Care team messaged', body: 'Ayvaa care team will reply within the hour', kind: 'ok' })}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Message care team</span>
          </motion.button>
        </div>
      </FootBar>
    </Screen>
  )
}
