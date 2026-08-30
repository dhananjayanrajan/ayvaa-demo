import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Activity } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { METRICS, axisLabels, formatValue, type MetricId } from '@/data/patientCarePlan'
import { cn } from '@/lib/utils'

const cx = (index: number, count: number) => (300 / count) * (index + 0.5)

const headerLabel: Record<MetricId, string> = {
  bp: 'Higher reading',
  steps: 'Daily average',
  weight: 'Weekly reading',
}

function makeScale(values: number[], target?: number) {
  const all = target != null ? [...values, target] : values
  const min = Math.min(...all)
  const max = Math.max(...all)
  const pad = (max - min) * 0.25 || 1
  return (v: number) => 98 - ((v - min + pad) / (max - min + pad * 2)) * 78
}

export function TrendsCard() {
  const [metricId, setMetricId] = useState<MetricId>('bp')
  const metric = METRICS.find((m) => m.id === metricId) ?? METRICS[0]
  const pointCount = metric.seriesA.values.length
  const [week, setWeek] = useState(pointCount - 1)
  useEffect(() => setWeek(pointCount - 1), [metricId, pointCount])

  const values = [...metric.seriesA.values, ...(metric.seriesB?.values ?? [])]
  const scale = makeScale(values, metric.target)
  const aPts = metric.seriesA.values.map((v, i) => `${cx(i, pointCount)},${scale(v)}`).join(' ')
  const bPts = metric.seriesB?.values.map((v, i) => `${cx(i, pointCount)},${scale(v)}`).join(' ')
  const labels = axisLabels(pointCount)
  const labelX = Math.min(272, Math.max(48, cx(week, pointCount)))

  return (
    <Card intent="info">
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-sky-400 to-teal-400" />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={Activity} tone="info" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Recovery metrics</span>
              <Chip intent="info">4 weeks</Chip>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Recorded by the caregiver at each visit. Tap a week to read its value.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-1 rounded-full bg-[#0B211B]/[0.06] p-1">
          {METRICS.map((m) => {
            const active = metricId === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMetricId(m.id)}
                role="tab"
                aria-selected={active}
                className="relative flex-1 rounded-full px-2 py-2"
              >
                {active && (
                  <motion.span
                    layoutId="p13-metric-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(11,33,27,0.4)]"
                  />
                )}
                <span
                  className={cn(
                    'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors duration-200',
                    active ? 'text-sky-700' : 'text-[#0B211B]/40',
                  )}
                >
                  {m.tab}
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={metricId}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mt-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
                {headerLabel[metricId]}
              </span>
              <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-emerald-700">{metric.delta}</span>
            </div>

            <svg viewBox="0 0 300 116" className="mt-2 h-[124px] w-full" aria-hidden>
              {[30, 56, 82].map((y) => (
                <line key={y} x1={14} x2={288} y1={y} y2={y} stroke="rgba(11,33,27,0.06)" strokeWidth="1" strokeDasharray="3 4" />
              ))}

              {metric.target != null && (
                <>
                  <motion.line
                    x1={14}
                    x2={288}
                    y1={scale(metric.target)}
                    y2={scale(metric.target)}
                    stroke="rgba(5,150,105,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                  />
                  <motion.text
                    x={16}
                    y={scale(metric.target) - 5}
                    className="fill-emerald-700/80 text-[7.5px] font-extrabold uppercase"
                    letterSpacing="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {metric.targetLabel}
                  </motion.text>
                </>
              )}

              {bPts && (
                <motion.polyline
                  points={bPts}
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.45 }}
                />
              )}

              <motion.polyline
                points={aPts}
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />

              {metric.seriesB?.values.map((v, i) => (
                <motion.circle
                  key={`b-${i}`}
                  cx={cx(i, pointCount)}
                  cy={scale(v)}
                  r={3}
                  fill={i === week ? '#0d9488' : '#0B231C'}
                  stroke="#fff"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 320, damping: 17 }}
                />
              ))}

              {metric.seriesA.values.map((v, i) => (
                <motion.circle
                  key={`a-${i}`}
                  cx={cx(i, pointCount)}
                  cy={scale(v)}
                  r={i === week ? 5.5 : 3.5}
                  fill={i === week ? '#059669' : '#0B231C'}
                  stroke="#fff"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.1, type: 'spring', stiffness: 320, damping: 17 }}
                />
              ))}

              <motion.text
                key={`label-${metricId}-${week}`}
                x={labelX}
                y={scale(metric.seriesA.values[week]) - 11}
                textAnchor="middle"
                className="fill-emerald-800 text-[9.5px] font-extrabold tabular-nums"
                initial={{ opacity: 0, y: scale(metric.seriesA.values[week]) - 7 }}
                animate={{ opacity: 1, y: scale(metric.seriesA.values[week]) - 11 }}
                transition={{ duration: 0.2 }}
              >
                {formatValue(metric, week)}
                {metric.unit}
              </motion.text>
            </svg>

            <div className="grid" style={{ gridTemplateColumns: `repeat(${pointCount}, 1fr)` }}>
              {labels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setWeek(i)}
                  aria-pressed={i === week}
                  className={cn(
                    'py-1 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] transition-colors',
                    i === week ? 'text-emerald-700' : 'text-[#0B211B]/35',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  )
}
