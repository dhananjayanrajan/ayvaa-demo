import { motion } from 'motion/react'
import { Chip } from '@/components/base/phone/kit'
import { StepList } from '@/components/base/phone/step-list'
import { RecordExpansion } from '../cards/record-expansion'
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
          <StepList
            nodeStyle="dot"
            steps={sessions.map((s, i) => {
              const last = i === sessions.length - 1
              const open = openId === s.id
              return {
                key: s.id,
                state: 'done',
                node: (
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
                ),
                railClassName: s.incident ? 'bg-amber-400/[0.25]' : 'bg-emerald-500/[0.18]',
                title: `${monthFull.slice(0, 3)} ${dayOf(s)}`,
                titleClassName: 'font-mono text-[13px] font-extrabold tabular-nums tracking-tight',
                titleMeta:
                  timeOf(s) && (
                    <span className="ml-1.5 font-bold text-[#0B211B]/40">{timeOf(s)}</span>
                  ),
                trailingTitle: (
                  <Chip
                    intent={s.incident ? 'warning' : 'success'}
                    dot={Boolean(s.incident)}
                    className="shrink-0 whitespace-nowrap"
                  >
                    {s.incident ? 'Incident' : 'Complete'}
                  </Chip>
                ),
                body: s.detail,
                bodyClassName: 'line-clamp-2 text-[12px] font-medium leading-relaxed',
                contentClassName: last ? '' : 'pb-5',
                expandable: true,
                open,
                onToggle: () => onToggle(open ? null : s.id),
                expansion: <RecordExpansion session={s} />,
              }
            })}
          />
        </div>
      </motion.div>
    </div>
  )
}
