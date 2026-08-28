import { useState } from 'react'
import { motion } from 'motion/react'
import { Card, Chip, rise } from '@/components/phone/kit'
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
                  whileHover={{ x: 4 }}
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
