import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

interface TrajectoryPoint {
  wk: number
  pct: number
  proj?: boolean
}

interface PartnerRecoveryTrajectoryProps {
  trajectory: TrajectoryPoint[]
}

const X = (wk: number) => 10 + (wk / 6) * 280
const Y = (pct: number) => 118 - pct * 0.95

type ViewMode = 'actual' | 'projected' | 'combined'

interface StatusTheme {
  label: string
  bgSoft: string
  borderClass: string
  textClass: string
  strokeColor: string
  buttonClass: string
  badgeClass: string
  isFull: boolean
}

function getTheme(pct: number): StatusTheme {
  if (pct >= 100) {
    return {
      label: 'Optimal',
      bgSoft: 'rgba(16, 185, 129, 0.08)',
      borderClass: 'border-emerald-500/50 shadow-sm',
      textClass: 'text-emerald-700',
      strokeColor: '#10b981',
      buttonClass: 'bg-emerald-600 hover:bg-emerald-500 focus-visible:ring-emerald-500/40',
      badgeClass: 'bg-emerald-600 text-white',
      isFull: true,
    }
  }

  if (pct < 30) {
    return {
      label: 'Critical',
      bgSoft: 'rgba(244, 63, 94, 0.04)',
      borderClass: 'border-rose-200/40 shadow-sm',
      textClass: 'text-rose-600',
      strokeColor: '#f43f5e',
      buttonClass: 'bg-rose-600 hover:bg-rose-500 focus-visible:ring-rose-500/40',
      badgeClass: 'bg-rose-500/10 text-rose-700',
      isFull: false,
    }
  }

  if (pct < 60) {
    return {
      label: 'Moderate',
      bgSoft: 'rgba(245, 158, 11, 0.04)',
      borderClass: 'border-amber-200/40 shadow-sm',
      textClass: 'text-amber-600',
      strokeColor: '#f59e0b',
      buttonClass: 'bg-amber-500 hover:bg-amber-400 focus-visible:ring-amber-500/40',
      badgeClass: 'bg-amber-500/10 text-amber-700',
      isFull: false,
    }
  }

  return {
    label: 'Advanced',
    bgSoft: 'rgba(2, 132, 199, 0.04)',
    borderClass: 'border-sky-200/40 shadow-sm',
    textClass: 'text-sky-600',
    strokeColor: '#0284c7',
    buttonClass: 'bg-sky-600 hover:bg-sky-500 focus-visible:ring-sky-500/40',
    badgeClass: 'bg-sky-500/10 text-sky-700',
    isFull: false,
  }
}

export function PartnerRecoveryTrajectory({ trajectory }: PartnerRecoveryTrajectoryProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('combined')
  const [selectedWeek, setSelectedWeek] = useState(3)
  const [isPlaying, setIsPlaying] = useState(false)
  const animationRef = useRef<number | null>(null)

  const visibleActual = viewMode !== 'projected'
  const visibleProjected = viewMode !== 'actual'

  const selectedPoint = trajectory.find((t) => t.wk === selectedWeek) || trajectory[0]
  const currentTheme = getTheme(selectedPoint.pct)

  const solidPts = trajectory.filter((t) => !t.proj).map((t) => `${X(t.wk)},${Y(t.pct)}`).join(' ')
  const projPts = [
    `${X(3)},${Y(33)}`,
    ...trajectory.filter((t) => t.proj).map((t) => `${X(t.wk)},${Y(t.pct)}`),
  ].join(' ')

  const stopPlayback = () => {
    if (animationRef.current !== null) {
      clearInterval(animationRef.current)
      animationRef.current = null
    }
    setIsPlaying(false)
  }

  const startPlayback = () => {
    if (isPlaying) return
    setIsPlaying(true)

    if (selectedWeek >= 6) {
      setSelectedWeek(0)
    }

    animationRef.current = window.setInterval(() => {
      setSelectedWeek((prev) => {
        if (prev >= trajectory.length - 1) {
          stopPlayback()
          return prev
        }
        return prev + 1
      })
    }, 1100)
  }

  useEffect(() => {
    return () => stopPlayback()
  }, [])

  const tabs = [
    { key: 'actual', label: 'ACTUAL' },
    { key: 'projected', label: 'PROJECTED' },
    { key: 'combined', label: 'COMBINED' },
  ] as const

  return (
    <Card className={cn('transition-all duration-300 border overflow-hidden', currentTheme.borderClass)}>
      <motion.div
        className="p-4 rounded-[inherit]"
        animate={{ backgroundColor: currentTheme.bgSoft }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/50">
              6-WEEK PLAN
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={selectedPoint.wk}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em]',
                  currentTheme.badgeClass
                )}
              >
                {currentTheme.isFull && <CheckCircle2 className="h-2.5 w-2.5" />}
                {currentTheme.label}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.div
            className="flex items-baseline gap-1"
            key={selectedPoint.pct}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <span className={cn('text-[15px] font-extrabold tabular-nums transition-colors duration-300', currentTheme.textClass)}>
              {selectedPoint.pct}%
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">TARGET</span>
          </motion.div>
        </div>

        <div className="mt-3 flex rounded-xl bg-[#0B211B]/[0.05] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setViewMode(tab.key)}
              className="relative flex-1 rounded-lg py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              {viewMode === tab.key && (
                <motion.span
                  layoutId="trajectoryView"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              <span
                className={cn(
                  'relative z-10 transition-colors duration-200',
                  viewMode === tab.key ? 'text-[#0B211B]' : 'text-[#0B211B]/50 hover:text-[#0B211B]/80'
                )}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <svg viewBox="0 0 300 130" className="mt-2 h-32 w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="clinicalGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {[25, 50, 75, 100].map((g) => (
            <line
              key={g}
              x1={10}
              x2={290}
              y1={Y(g)}
              y2={Y(g)}
              stroke="rgba(11,33,27,0.07)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          ))}

          <line
            x1={X(3)}
            x2={X(3)}
            y1={16}
            y2={122}
            stroke={selectedWeek === 3 ? currentTheme.strokeColor : 'rgba(11,33,27,0.15)'}
            strokeWidth={selectedWeek === 3 ? '2' : '1.5'}
            strokeDasharray="4 3"
          />

          {visibleActual && (
            <motion.polyline
              points={solidPts}
              fill="none"
              stroke="url(#clinicalGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {visibleProjected && (
            <motion.polyline
              points={projPts}
              fill="none"
              stroke="url(#clinicalGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {trajectory.map((t) => {
            const isSelected = t.wk === selectedWeek
            const theme = getTheme(t.pct)

            return (
              <g key={t.wk} onClick={() => setSelectedWeek(t.wk)} className="cursor-pointer">
                {isSelected && (
                  <motion.circle
                    cx={X(t.wk)}
                    cy={Y(t.pct)}
                    r={10}
                    fill={theme.strokeColor}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <motion.circle
                  cx={X(t.wk)}
                  cy={Y(t.pct)}
                  r={isSelected ? 6.5 : 4}
                  fill={theme.strokeColor}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? '2' : '1.5'}
                  animate={{ scale: isSelected ? 1.15 : 1 }}
                  whileHover={{ scale: 1.25 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                />
              </g>
            )
          })}

          <text
            x={X(3)}
            y={10}
            textAnchor="middle"
            className={cn(
              'text-[8px] font-extrabold uppercase transition-colors duration-200',
              selectedWeek === 3 ? currentTheme.textClass : 'fill-[#0B211B]/40'
            )}
            letterSpacing="1"
          >
            TODAY
          </text>
        </svg>

        <div className="mt-2 flex items-center justify-between">
          {trajectory.map((t) => {
            const isSelected = selectedWeek === t.wk
            const theme = getTheme(t.pct)
            return (
              <motion.button
                key={t.wk}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedWeek(t.wk)}
                className={cn(
                  'rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
                  isSelected
                    ? `${theme.buttonClass} text-white shadow-sm`
                    : 'text-[#0B211B]/40 hover:bg-[#0B211B]/[0.05] hover:text-[#0B211B]/80'
                )}
              >
                W{t.wk}
              </motion.button>
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#0B211B]/[0.04] p-2.5 px-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/50">
              WEEK {selectedPoint.wk} TARGET
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={selectedPoint.wk}
                initial={{ opacity: 0, x: -3 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 3 }}
                transition={{ duration: 0.15 }}
                className={cn('text-[13px] font-extrabold tabular-nums transition-colors duration-200', currentTheme.textClass)}
              >
                {selectedPoint.pct}% RECOVERED
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isPlaying ? stopPlayback : startPlayback}
            className={cn(
              'grid h-8 w-8 place-items-center rounded-full text-white shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              currentTheme.buttonClass
            )}
            aria-label={isPlaying ? 'Pause timeline' : 'Play timeline'}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
          </motion.button>
        </div>
      </motion.div>
    </Card>
  )
}
