import { Fragment } from 'react'
import { motion } from 'motion/react'
import { Chip, Hero, Kicker, LiveDot, StatStrip } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

const blocks = ['1F', '20', '21', '22', '23']

interface LedgerChainHeroProps {
  todayCount: number
}

export function LedgerChainHero({ todayCount }: LedgerChainHeroProps) {
  const sealedCount = 4
  const totalBlocks = blocks.length
  const health = Math.round((sealedCount / totalBlocks) * 100)

  return (
    <Hero>
      <Kicker>The ledger · sealed on write</Kicker>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Nothing here can be{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">erased</span>
      </h2>

      <div className="mt-4 rounded-2xl bg-white/[0.05] p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/50">Ledger chain</span>
          <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-300">
            <LiveDot className="text-emerald-300" />
            Appending
          </span>
        </div>
        <div className="mt-3 flex items-center">
          {blocks.map((b, i) => {
            const writing = i === blocks.length - 1
            const sealed = i < sealedCount
            return (
              <Fragment key={b}>
                {i > 0 && <span aria-hidden className="h-px w-3 shrink-0 bg-emerald-300/30" />}
                {writing ? (
                  <motion.span
                    className="relative grid h-9 min-w-0 flex-1 place-items-center overflow-hidden rounded-xl bg-emerald-400/20 text-[10px] font-extrabold tabular-nums text-emerald-100 ring-1 ring-inset ring-emerald-300/30"
                    animate={{ boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 12px rgba(16,185,129,0.35)', '0 0 0px rgba(16,185,129,0)'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent"
                      animate={{ x: ['-100%', '220%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className="relative">{b}</span>
                  </motion.span>
                ) : (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      'grid h-9 min-w-0 flex-1 place-items-center rounded-xl text-[10px] font-extrabold tabular-nums ring-1 ring-inset transition-transform duration-200',
                      sealed
                        ? 'bg-white/[0.06] text-emerald-100/60 ring-white/10'
                        : 'bg-white/[0.02] text-emerald-100/30 ring-white/5',
                    )}
                  >
                    {b}
                  </motion.span>
                )}
              </Fragment>
            )
          })}
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-100/35">
          <span>{sealedCount} of {totalBlocks} sealed</span>
          <span>{health}% health</span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
            animate={{ width: `${health}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      <StatStrip
        className="mt-5"
        cells={[
          { key: 'today', value: todayCount, label: 'Today' },
          { key: 'health', value: `${health}%`, label: 'Health' },
          { key: 'gaps', value: '0', label: 'Gaps · 90 d' },
        ]}
      />

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Chip intent="neutral" light className="border-transparent">Append-only</Chip>
        <Chip intent="success" light className="border-transparent">SHA-sealed</Chip>
      </div>
    </Hero>
  )
}
