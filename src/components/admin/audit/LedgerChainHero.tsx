import { Fragment } from 'react'
import { motion } from 'motion/react'
import { LiveDot } from '@/components/phone/kit'
import { Chip, Hero, Kicker } from '@/components/phone/kit'
import type { ReactNode } from 'react'

const blocks = ['1F', '20', '21', '22', '23']

function HeroCell({ v, l }: { v: ReactNode; l: string }) {
  return (
    <div className="flex flex-col gap-1.5 px-3 first:pl-0">
      <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">{v}</span>
      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/45">{l}</span>
    </div>
  )
}

interface LedgerChainHeroProps {
  todayCount: number
}

export function LedgerChainHero({ todayCount }: LedgerChainHeroProps) {
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
            return (
              <Fragment key={b}>
                {i > 0 && <span aria-hidden className="h-px w-3 shrink-0 bg-emerald-300/30" />}
                {writing ? (
                  <span className="relative grid h-9 min-w-0 flex-1 place-items-center overflow-hidden rounded-xl bg-emerald-400/20 text-[10px] font-extrabold tabular-nums text-emerald-100 ring-1 ring-inset ring-emerald-300/30">
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent"
                      animate={{ x: ['-100%', '220%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className="relative">{b}</span>
                  </span>
                ) : (
                  <span className="grid h-9 min-w-0 flex-1 place-items-center rounded-xl bg-white/[0.06] text-[10px] font-extrabold tabular-nums text-emerald-100/60 ring-1 ring-inset ring-white/10">
                    {b}
                  </span>
                )}
              </Fragment>
            )
          })}
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-100/35">
          <span>1F · sealed</span>
          <span>23 · writing…</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
        <HeroCell v={todayCount} l="Today" />
        <HeroCell v="100%" l="Health" />
        <HeroCell v="0" l="Gaps · 90 d" />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Chip intent="neutral" light className="border-transparent">Append-only</Chip>
        <Chip intent="success" light className="border-transparent">SHA-sealed</Chip>
      </div>
    </Hero>
  )
}
