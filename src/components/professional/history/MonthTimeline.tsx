import { AnimatePresence, motion } from 'motion/react'
import { Chip } from '@/components/phone/kit'
import { RecordExpansion } from './RecordExpansion'
import { dayOf, timeOf, type HistorySession } from '@/data/historyData'
import { cn } from '@/lib/utils'

type Props = {
  monthFull: string
  sessions: HistorySession[]
  openId: string | null
  onToggle: (id: string | null) => void
}

export function MonthTimeline({ monthFull, sessions, openId, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
        <div className="flex items-center gap-3 px-1">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">{monthFull}</span>
          <span className="h-px flex-1 bg-[#0B211B]/[0.07]" />
          <Chip intent="neutral">
            {sessions.length} visit{sessions.length > 1 ? 's' : ''}
          </Chip>
        </div>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
        <div className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
          {sessions.map((s, i) => {
            const last = i === sessions.length - 1
            const open = openId === s.id
            return (
              <div key={s.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'relative mt-1.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                      s.incident ? 'bg-amber-400' : 'bg-emerald-500',
                    )}
                  >
                    {open && (
                      <>
                        <span
                          aria-hidden
                          className={cn('absolute h-4 w-4 animate-ping rounded-full', s.incident ? 'bg-amber-400/40' : 'bg-emerald-400/40')}
                        />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                      </>
                    )}
                  </span>
                  {!last && (
                    <span
                      aria-hidden
                      className={cn('my-1 w-px flex-1', s.incident ? 'bg-amber-400/[0.25]' : 'bg-emerald-500/[0.18]')}
                    />
                  )}
                </div>

                <div className={cn('min-w-0 flex-1', !last && 'pb-5')}>
                  <button
                    type="button"
                    onClick={() => onToggle(open ? null : s.id)}
                    aria-expanded={open}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate font-mono text-[13px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
                        {monthFull.slice(0, 3)} {dayOf(s)}
                        {timeOf(s) && <span className="ml-1.5 font-bold text-[#0B211B]/40">{timeOf(s)}</span>}
                      </span>
                      <Chip
                        intent={s.incident ? 'warning' : 'success'}
                        dot={Boolean(s.incident)}
                        className="shrink-0 whitespace-nowrap"
                      >
                        {s.incident ? 'Incident' : 'Complete'}
                      </Chip>
                    </div>
                    <p className="mt-1 line-clamp-2 text-pretty text-[12px] font-medium leading-relaxed text-[#0B211B]/55">
                      {s.detail}
                    </p>
                  </button>

                  <AnimatePresence initial={false}>{open && <RecordExpansion key="expansion" session={s} />}</AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
