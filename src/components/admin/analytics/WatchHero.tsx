import { useState } from 'react'
import { motion } from 'motion/react'
import { TrendingUp } from 'lucide-react'
import { Chip, rise } from '@/components/phone/kit'
import { analytics } from '@/data/seed'
import { cn } from '@/lib/utils'

const bars = [30, 42, 36, 54, 60, 55, 76]

export function WatchHero() {
  const [threshold, setThreshold] = useState(8)
  const currentBar = bars[bars.length - 1]
  const isAboveThreshold = currentBar > threshold

  return (
    <motion.div variants={rise}>
      <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,42,8,0.7)]">
        <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
        <div className="relative p-5">
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
                whileHover={{ scaleY: 1.05 }}
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
        </div>
      </div>
    </motion.div>
  )
}
