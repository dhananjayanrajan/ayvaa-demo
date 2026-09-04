import { useState } from 'react'
import { motion } from 'motion/react'
import { Card, Chip, rise } from '@/components/base/phone/kit'
import { analytics } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

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
