import { useState } from 'react'
import { motion } from 'motion/react'
import { Card, Chip, Hero, Kicker, StatStrip, rise } from '@/components/phone/kit'
import { analytics } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Star, TrendingUp, UserCheck } from 'lucide-react'
import PriceFlow from '@/components/smoothui/price-flow'

const mixColors: { dot: string; bar: string }[] = [
  { dot: 'bg-emerald-500', bar: 'from-emerald-500 to-teal-400' },
  { dot: 'bg-sky-500', bar: 'from-sky-500 to-blue-400' },
  { dot: 'bg-amber-500', bar: 'from-amber-400 to-orange-400' },
  { dot: 'bg-[#0B231C]', bar: 'from-[#0B231C] to-[#3E5C51]' },
  { dot: 'bg-indigo-500', bar: 'from-indigo-500 to-violet-400' },
]

type SortMode = 'value' | 'name'

export function CategoryMixCard() {
  const { notify } = useDemo()
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
  const [sortMode, setSortMode] = useState<SortMode>('value')

  const sortedMix = [...analytics.mix].sort((a, b) => {
    if (sortMode === 'value') {
      return Number(b.value.replace('%', '')) - Number(a.value.replace('%', ''))
    }
    return a.label.localeCompare(b.label)
  })

  const selectedMix = sortedMix.find((m) => m.label === selectedLabel)

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/40">Sort by</span>
            <div className="flex rounded-full bg-[#0B211B]/[0.05] p-1">
              {(['value', 'name'] as SortMode[]).map((mode) => {
                const active = sortMode === mode
                return (
                  <motion.button
                    key={mode}
                    type="button"
                    onClick={() => setSortMode(mode)}
                    className="relative rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  >
                    {active && (
                      <motion.span
                        layoutId="a09-mix-sort"
                        transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      />
                    )}
                    <span className={cn('relative block', active ? 'text-white' : 'text-[#0B211B]/45')}>
                      {mode}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-3.5">
            {sortedMix.map((m, i) => {
              const c = mixColors[i % mixColors.length]
              const pct = Number(m.value.replace('%', ''))
              const isSelected = selectedLabel === m.label
              return (
                <motion.button
                  key={m.label}
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    setSelectedLabel(isSelected ? null : m.label)
                    notify({ title: m.label, body: `${m.value} of this month's sessions · ${m.label} care`, kind: 'info' })
                  }}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                  )}
                  aria-pressed={isSelected}
                >
                  <span aria-hidden className={cn('h-2.5 w-2.5 shrink-0 rounded-full', c.dot)} />
                  <span className="w-[92px] shrink-0 truncate text-[12.5px] font-bold tracking-tight text-[#0B211B]">{m.label}</span>
                  <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                      className={cn(
                        'block h-full rounded-full bg-gradient-to-r transition-all duration-200',
                        c.bar,
                        isSelected ? 'brightness-110' : 'group-hover:brightness-110',
                      )}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right text-[11px] font-extrabold tabular-nums text-[#0B211B]/60">{m.value}</span>
                </motion.button>
              )
            })}
          </div>

          {selectedMix && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden"
            >
              <div className="rounded-2xl bg-[#0B211B]/[0.04] p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-extrabold text-[#0B211B]">{selectedMix.label}</span>
                  <Chip intent="info">{selectedMix.value}</Chip>
                </div>
                <p className="mt-2 text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                  {selectedMix.label} represents {selectedMix.value} of total sessions this month.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

type Range = 'week' | 'month'

export function RevenueHero() {
  const [range, setRange] = useState<Range>('month')
  const monthRevenue = 48.6
  const weekRevenue = 12.15

  const activeRevenue = range === 'month' ? monthRevenue : weekRevenue
  const rangeLabel = range === 'month' ? 'Revenue · March' : 'Revenue · This week'
  const rangeSessions = range === 'month' ? analytics.sessions : 'Last 7 days · 253 sessions'
  const sparkData = range === 'month' ? analytics.weekly : analytics.weekly.slice(-4)
  const totalSessions = range === 'month' ? analytics.weekly.reduce((a, b) => a + b, 0) : sparkData.reduce((a, b) => a + b, 0)

  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Kicker>{rangeLabel}</Kicker>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
              <span className="text-[17px] font-extrabold text-emerald-200/80">₹</span>
              <PriceFlow value={activeRevenue} className="text-[32px] font-extrabold leading-none tracking-tight text-white" />
              <span className="text-[13px] font-bold text-emerald-100/55">lakh</span>
            </div>
          </div>
          <Chip intent="success" light icon={TrendingUp}>
            {analytics.delta}
          </Chip>
        </div>
        <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-emerald-100/55">{rangeSessions}</p>

        <div className="mt-3 flex w-fit gap-1 rounded-full bg-white/[0.07] p-1">
          {(['week', 'month'] as Range[]).map((r) => {
            const active = range === r
            return (
              <motion.button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className="relative rounded-full px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                {active && (
                  <motion.span
                    layoutId="a09-revenue-range"
                    transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  />
                )}
                <span className={cn('relative block', active ? 'text-white' : 'text-emerald-100/60')}>
                  {r === 'week' ? 'Week' : 'Month'}
                </span>
              </motion.button>
            )
          })}
        </div>

        <Sparkline data={sparkData} />

        <StatStrip
          className="mt-5"
          cells={[
            { key: 'utilisation', value: analytics.utilisation, label: 'Utilisation', dot: 'bg-emerald-300' },
            { key: 'quality', value: analytics.quality, label: 'Avg rating', dot: 'bg-teal-300' },
            { key: 'miss', value: analytics.missRate, label: 'Miss rate', dot: 'bg-rose-300/80' },
          ]}
        />

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip intent="neutral" light icon={UserCheck}>{totalSessions} sessions</Chip>
          <Chip intent="success" light icon={Star}>4.8 quality</Chip>
        </div>
      </Hero>
    </motion.div>
  )
}

interface SparklineProps {
  data: number[]
}

export function Sparkline({ data }: SparklineProps) {
  const safeData = data.length > 0 ? data : [0]
  const max = Math.max(...safeData) || 1
  const denominator = Math.max(safeData.length - 1, 1)

  const pts = safeData.map((v, i) => [
    (i / denominator) * 100,
    36 - (v / max) * 28,
  ] as const)

  const line = pts.map((p) => p.join(',')).join(' ')
  const area = `0,40 ${line} 100,40`
  const last = pts[pts.length - 1]

  return (
    <div className="relative mt-4 h-24 w-full overflow-hidden">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
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
        className="pointer-events-none absolute -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-teal-300 shadow-[0_0_0_3px_rgba(45,212,191,0.25)]"
        style={{ top: `${(last[1] / 40) * 100}%` }}
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-teal-300/60" />
      </motion.span>
    </div>
  )
}

const bars = [30, 42, 36, 54, 60, 55, 76]

export function WatchHero() {
  const [threshold, setThreshold] = useState(8)
  const currentBar = bars[bars.length - 1]
  const isAboveThreshold = currentBar > threshold

  return (
    <motion.div variants={rise}>
      <Hero tone="amber">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
          <TrendingUp className="h-3 w-3" aria-hidden />
          Watchlist · week over week
        </div>
        <h3 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
          One trend is{' '}
          <span className="bg-gradient-to-r from-amber-200 to-orange-100 bg-clip-text text-transparent">creeping up</span>
        </h3>
        <p className="mt-1.5 text-pretty break-words text-[12px] font-medium leading-relaxed text-amber-100/60">{analytics.watch}</p>

        <div className="mt-4 flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="group relative flex h-full min-w-0 flex-1 items-end"
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
                className={cn(
                  'w-full origin-bottom rounded-t-md bg-gradient-to-t transition-all duration-200 group-hover:brightness-110',
                  i === bars.length - 1
                    ? isAboveThreshold
                      ? 'from-orange-600 to-amber-400'
                      : 'from-amber-500 to-amber-300'
                    : 'from-amber-500/50 to-amber-300/50',
                )}
              />
              <span className="pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-[#0B231C] px-2 py-1 text-[10px] font-extrabold tabular-nums text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {h}%
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[8px] font-extrabold uppercase tracking-[0.14em] text-amber-100/35">
          <span>Wk 1</span>
          <span>Wk 4</span>
          <span>Now</span>
        </div>

        <div className="mt-3.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em] text-amber-100/50">
            <span>Auto-escalate threshold</span>
            <span className="tabular-nums">{threshold}%</span>
          </div>
          <input
            type="range"
            min={2}
            max={15}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="mt-2 h-1.5 w-full appearance-none rounded-full bg-amber-400/20 accent-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip intent="warning" light>{isAboveThreshold ? 'Above threshold' : 'Below threshold'}</Chip>
          <Chip intent="neutral" light>{`Auto-escalates at ${threshold}%`}</Chip>
        </div>
      </Hero>
    </motion.div>
  )
}

type Mode = 'total' | 'avg'

export function WeeklySessionsCard() {
  const { notify } = useDemo()
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const [mode, setMode] = useState<Mode>('total')

  const weekly = analytics.weekly
  const displayed = mode === 'total' ? weekly : weekly.map((v) => Math.round(v / 7))
  const maxVal = Math.max(...displayed)
  const totalSum = weekly.reduce((a, b) => a + b, 0)
  const avgSum = Math.round(totalSum / 7)

  const selectedValue = selectedWeek !== null ? displayed[selectedWeek] : null
  const previousValue = selectedWeek !== null && selectedWeek > 0 ? displayed[selectedWeek - 1] : null
  const delta = selectedValue !== null && previousValue !== null ? selectedValue - previousValue : null

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-4 pb-3">
          <div className="flex h-32 items-end gap-2.5">
            {displayed.map((v, i) => {
              const peak = v === maxVal
              const isSelected = selectedWeek === i
              return (
                <motion.button
                  key={i}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedWeek(isSelected ? null : i)
                    notify({
                      title: `Week ${i + 1} · ${mode === 'total' ? v : `${v}/day`} sessions`,
                      body: `Tap for breakdown`,
                      kind: 'info',
                    })
                  }}
                  className={cn(
                    'group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                  )}
                  aria-pressed={isSelected}
                >
                  <span className={cn('text-[10px] font-extrabold tabular-nums', peak ? 'text-emerald-600' : 'text-[#0B211B]/40')}>
                    {v}
                  </span>
                  <span className="flex h-full w-full items-end overflow-hidden rounded-t-xl bg-[#0B211B]/[0.04]">
                    <motion.span
                      initial={{ height: 0 }}
                      animate={{ height: `${(v / maxVal) * 100}%` }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                      className={cn(
                        'w-full rounded-t-xl bg-gradient-to-t transition-all duration-200 group-hover:brightness-110',
                        isSelected
                          ? 'from-emerald-700 to-teal-500 shadow-[0_-8px_20px_-8px_rgba(52,211,153,0.7)]'
                          : peak
                            ? 'from-emerald-600 to-teal-400 shadow-[0_-6px_18px_-6px_rgba(16,185,129,0.6)]'
                            : 'from-emerald-500/60 to-teal-400/50',
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

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex rounded-full bg-[#0B211B]/[0.05] p-1">
              {(['total', 'avg'] as Mode[]).map((m) => {
                const active = mode === m
                return (
                  <motion.button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className="relative rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  >
                    {active && (
                      <motion.span
                        layoutId="a09-weekly-mode"
                        transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      />
                    )}
                    <span className={cn('relative block', active ? 'text-white' : 'text-[#0B211B]/45')}>
                      {m === 'total' ? 'Total' : 'Avg/day'}
                    </span>
                  </motion.button>
                )
              })}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
              {mode === 'total' ? `${totalSum} total` : `${avgSum} avg/day`}
            </span>
          </div>

          {selectedValue !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden"
            >
              <div className="rounded-2xl bg-emerald-500/[0.07] p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-extrabold text-[#0B211B]">Week {selectedWeek! + 1} breakdown</span>
                  <Chip intent="success">{selectedValue} {mode === 'avg' ? 'avg/day' : 'sessions'}</Chip>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 text-[11px] font-semibold text-[#0B211B]/60">
                  <span>vs previous week</span>
                  <span className={cn('font-extrabold tabular-nums', delta !== null && delta >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                    {delta !== null ? `${delta >= 0 ? '+' : ''}${delta}` : 'First week'}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-3 text-[11px] font-semibold text-[#0B211B]/60">
                  <span>Actual total</span>
                  <span className="font-extrabold tabular-nums">{weekly[selectedWeek!]}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
