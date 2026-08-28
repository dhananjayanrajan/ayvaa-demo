import { motion } from 'motion/react'
import { Star, TrendingUp, UserCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import PriceFlow from '@/components/smoothui/price-flow'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Hero,
  Kicker,
  Panel,
  Section,
  Stat,
  rise,
  stagger,
} from '@/components/phone/kit'
import { analytics } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const mixColors: { dot: string; bar: string }[] = [
  { dot: 'bg-emerald-500', bar: 'from-emerald-500 to-teal-400' },
  { dot: 'bg-sky-500', bar: 'from-sky-500 to-blue-400' },
  { dot: 'bg-amber-500', bar: 'from-amber-400 to-orange-400' },
  { dot: 'bg-[#0B231C]', bar: 'from-[#0B231C] to-[#3E5C51]' },
  { dot: 'bg-indigo-500', bar: 'from-indigo-500 to-violet-400' },
]

function Sparkline() {
  const max = Math.max(...analytics.weekly)
  const pts = analytics.weekly.map((v, i) => [
    (i / (analytics.weekly.length - 1)) * 100,
    36 - (v / max) * 28,
  ] as const)
  const line = pts.map((p) => p.join(',')).join(' ')
  const area = `0,40 ${line} 100,40`
  const last = pts[pts.length - 1]

  return (
    <div className="relative mt-4 h-24">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rev-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={area}
          fill="url(#rev-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />
        <motion.polyline
          points={line}
          fill="none"
          stroke="url(#rev-line)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 18 }}
        className="absolute -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-teal-300 shadow-[0_0_0_3px_rgba(45,212,191,0.25)]"
        style={{ top: `${(last[1] / 40) * 100}%` }}
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-teal-300/60" />
      </motion.span>
    </div>
  )
}

function WatchHero({ body }: { body: string }) {
  const bars = [30, 42, 36, 54, 60, 55, 76]
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,42,8,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
      <div className="relative p-5">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
          <TrendingUp className="h-3 w-3" aria-hidden />
          Watchlist · week over week
        </div>
        <h3 className="mt-2 text-balance text-[17px] font-extrabold leading-snug tracking-tight text-white">
          One trend is{' '}
          <span className="bg-gradient-to-r from-amber-200 to-orange-100 bg-clip-text text-transparent">creeping up</span>
        </h3>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/60">{body}</p>

        <div className="mt-4 flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
              className={cn(
                'min-w-0 flex-1 rounded-t-md bg-gradient-to-t',
                i === bars.length - 1 ? 'from-orange-500 to-amber-300' : 'from-amber-500/50 to-amber-300/50',
              )}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[8px] font-extrabold uppercase tracking-[0.14em] text-amber-100/35">
          <span>Wk 1</span>
          <span>Wk 4</span>
          <span>Now</span>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <Chip intent="warning" light className="border-transparent">Rising · 6 weeks</Chip>
          <Chip intent="neutral" light className="border-transparent">Auto-escalates at 8%</Chip>
        </div>
      </div>
    </div>
  )
}

export function A09() {
  const { notify } = useDemo()
  const maxWeek = Math.max(...analytics.weekly)
  const totalWeek = analytics.weekly.reduce((a, b) => a + b, 0)

  return (
    <Screen>
      <AppBar
        title="Analytics"
        subtitle="March · platform wide"
        trailing={<AgentAvatar seed="ayvaa-analytics" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Kicker>Revenue · March</Kicker>
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                      <span className="text-[17px] font-extrabold text-emerald-200/80">₹</span>
                      <PriceFlow value={48.6} className="text-[32px] font-extrabold leading-none tracking-tight text-white" />
                      <span className="text-[13px] font-bold text-emerald-100/55">lakh</span>
                    </div>
                  </div>
                  <Chip intent="success" light icon={TrendingUp} className="mt-1 border-transparent">
                    {analytics.delta}
                  </Chip>
                </div>
                <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-emerald-100/55">{analytics.sessions}</p>

                <Sparkline />

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Utilisation" value={analytics.utilisation} dot="bg-emerald-300" />
                  <Stat label="Avg rating" value={analytics.quality} dot="bg-teal-300" />
                  <Stat label="Miss rate" value={analytics.missRate} dot="bg-rose-300/80" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light icon={UserCheck} className="border-transparent">1,012 sessions</Chip>
                  <Chip intent="success" light icon={Star} className="border-transparent">4.8 quality</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Sessions per week" trailing={<Chip intent="neutral">{totalWeek} total</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-4 pb-3">
                  <div className="flex h-32 items-end gap-2.5">
                    {analytics.weekly.map((v, i) => {
                      const peak = v === maxWeek
                      return (
                        <motion.button
                          key={i}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => notify({ title: `Week ${i + 1}`, body: `${v} sessions · tap peers for a breakdown`, kind: 'info' })}
                          className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
                        >
                          <span className={cn('text-[10px] font-extrabold tabular-nums', peak ? 'text-emerald-600' : 'text-[#0B211B]/40')}>
                            {v}
                          </span>
                          <span className="flex h-full w-full items-end overflow-hidden rounded-t-xl bg-[#0B211B]/[0.04]">
                            <motion.span
                              initial={{ height: 0 }}
                              animate={{ height: `${(v / maxWeek) * 100}%` }}
                              transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                              className={cn(
                                'w-full rounded-t-xl bg-gradient-to-t',
                                peak ? 'from-emerald-600 to-teal-400 shadow-[0_-6px_18px_-6px_rgba(16,185,129,0.6)]' : 'from-emerald-500/70 to-teal-400/70',
                              )}
                            />
                          </span>
                          <span className={cn('text-[9px] font-extrabold uppercase tracking-wide', peak ? 'text-emerald-600' : 'text-[#0B211B]/35')}>
                            Wk {i + 1}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care category mix" trailing={<Chip intent="neutral">March</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="flex flex-col gap-3.5 p-4">
                  {analytics.mix.map((m, i) => {
                    const c = mixColors[i % mixColors.length]
                    const pct = Number(m.value.replace('%', ''))
                    return (
                      <motion.button
                        key={m.label}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => notify({ title: m.label, body: `${m.value} of this month's sessions · ${m.label} care`, kind: 'info' })}
                        className="group flex items-center gap-3 text-left"
                      >
                        <span aria-hidden className={cn('h-2.5 w-2.5 shrink-0 rounded-full', c.dot)} />
                        <span className="w-[92px] shrink-0 truncate text-[12.5px] font-bold tracking-tight text-[#0B211B]">{m.label}</span>
                        <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                          <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                            className={cn('block h-full rounded-full bg-gradient-to-r', c.bar)}
                          />
                        </span>
                        <span className="w-9 shrink-0 text-right text-[11px] font-extrabold tabular-nums text-[#0B211B]/60">{m.value}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <WatchHero body={analytics.watch} />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="neutral" className="p-3.5">
                <p className="text-center text-[11px] font-medium leading-relaxed text-[#0B211B]/45">
                  Numbers refresh live from the operations ledger · audit grade
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of analytics" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
