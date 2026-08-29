import { motion } from 'motion/react'
import { Check, ScrollText, UserCheck, Users } from 'lucide-react'
import { Chip, rise } from '@/components/phone/kit'
import { reversalEvents } from '@/data/systemRecheck'

interface ReversedOfferTraceCardProps {
  onEventTap: (title: string, body: string) => void
}

export function ReversedOfferTraceCard({ onEventTap }: ReversedOfferTraceCardProps) {
  return (
    <motion.div variants={rise}>
      <div className="relative overflow-hidden rounded-[26px] border border-sky-200/15 bg-[#0B1E2B] shadow-[0_28px_64px_-30px_rgba(8,32,48,0.7)]">
        <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-sky-500/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />

        <div className="relative p-5">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-sky-200/50">
            <ScrollText className="h-3 w-3" aria-hidden />
            Reversal trace · 9:42 AM
          </div>
          <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            Reversed,{' '}
            <span className="bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
              nothing broken
            </span>
          </h3>
          <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-sky-100/60">
            The conflict was caught before it could touch the family or the professional's record.
          </p>

          <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
            <div className="flex flex-col">
              {reversalEvents.map((e, i) => {
                const last = i === reversalEvents.length - 1
                return (
                  <motion.button
                    key={e.title}
                    type="button"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => onEventTap(e.title, `${e.time} · ${e.body}`)}
                    className="flex gap-3 text-left outline-none focus-visible:outline-none"
                  >
                    <div className="flex flex-col items-center">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-400/90 text-white">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                      {!last && <span aria-hidden className="my-1 w-px flex-1 bg-white/15" />}
                    </div>
                    <div className={last ? 'min-w-0 flex-1 pb-0.5' : 'min-w-0 flex-1 pb-4'}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="break-words text-[13px] font-bold tracking-tight text-white">{e.title}</span>
                        <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-wide text-sky-200/50">
                          {e.time}
                        </span>
                      </div>
                      <div className="mt-0.5 break-words text-[11px] font-medium leading-relaxed text-sky-100/60">
                        {e.body}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5 rounded-2xl bg-white/[0.05] px-3.5 py-3">
              <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-sky-200/70">
                  What Suresh sees
                </div>
                <p className="mt-1 break-words text-[11.5px] font-medium leading-relaxed text-sky-100/70">
                  Offer reversed · no penalty · his Friday window stays intact for shorter visits.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl bg-white/[0.05] px-3.5 py-3">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-sky-200/70">
                  What the family sees
                </div>
                <p className="mt-1 break-words text-[11.5px] font-medium leading-relaxed text-sky-100/70">
                  New offers going out · nothing else changed · the visit time never moved.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <Chip intent="success" light className="border-transparent">No penalty applied</Chip>
            <Chip intent="info" light className="border-transparent">Re-offered round 3</Chip>
            <Chip intent="success" light className="border-transparent">Audit sealed</Chip>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
