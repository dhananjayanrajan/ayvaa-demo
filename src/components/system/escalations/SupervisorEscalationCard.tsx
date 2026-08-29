import { motion } from 'motion/react'
import { Check, Loader2, PhoneCall, ShieldAlert, UserRound } from 'lucide-react'
import { Card, Chip, Panel, Tile, rise } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

type NotifyFn = (payload: {
  title: string
  body: string
  kind: 'ok' | 'warn' | 'info'
}) => void

const onCall = {
  name: 'Dr. Ananya Rao',
  role: 'On-call supervisor',
  window: '8:00 AM – 8:00 PM',
}

type EscState = 'idle' | 'paging' | 'paged' | 'done'

const escalation: { label: string; value: string }[] = [
  { label: 'Primary pager', value: 'Dr. Ananya Rao' },
  { label: 'Backup pager', value: 'Meera Nair' },
  { label: 'Care team lead', value: 'Kavya' },
]

interface SupervisorEscalationCardProps {
  notify: NotifyFn
  live: boolean
  delivered: boolean
}

export function SupervisorEscalationCard({ notify, live, delivered }: SupervisorEscalationCardProps) {
  const states: EscState[] = delivered
    ? ['done', 'paged', 'paged']
    : live
      ? ['paging', 'idle', 'idle']
      : ['idle', 'idle', 'idle']

  const ackText = delivered ? 'Acknowledged in 42s' : live ? 'Paging…' : 'Awaiting alert'

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <Tile icon={ShieldAlert} tone="warning" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                Supervisor escalation
              </div>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/60">
                Every critical incident pages a human. No alert is left to a machine alone.
              </p>
            </div>
          </div>

          <Panel intent="warning" className="mt-4 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_8px_16px_-8px_rgba(245,158,11,0.6)]">
                <UserRound className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="break-words text-[13px] font-bold leading-snug text-[#0B211B]">{onCall.name}</div>
                <div className="break-words text-[11px] font-medium leading-snug text-[#0B211B]/50">
                  {onCall.role} · {onCall.window}
                </div>
              </div>
              {delivered ? (
                <Chip intent="success" icon={Check} className="shrink-0">{ackText}</Chip>
              ) : live ? (
                <Chip intent="warning" dot className="shrink-0">{ackText}</Chip>
              ) : (
                <Chip intent="neutral" className="shrink-0">{ackText}</Chip>
              )}
            </div>
          </Panel>

          <div className="mt-4 space-y-2">
            {escalation.map((e, i) => {
              const s = states[i]
              return (
                <motion.button
                  key={e.label}
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() =>
                    notify({
                      title: `${e.label} · ${e.value}`,
                      body:
                        s === 'done'
                          ? 'Already acknowledged this incident'
                          : s === 'paged'
                            ? 'Paged · awaiting acknowledgement'
                            : s === 'paging'
                              ? 'Paging now · ringing the on-call line'
                              : 'Standing by · will page on the next critical alert',
                      kind: s === 'done' ? 'ok' : s === 'paging' ? 'warn' : 'info',
                    })
                  }
                  className="flex w-full items-center gap-2.5 rounded-xl border border-[#0B211B]/[0.05] bg-white p-2.5 text-left transition-colors hover:border-[#0B211B]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                      s === 'done'
                        ? 'bg-emerald-500/15'
                        : s === 'paging'
                          ? 'bg-amber-400/20'
                          : 'bg-[#0B211B]/[0.05]',
                    )}
                  >
                    {s === 'done' ? (
                      <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} aria-hidden />
                    ) : s === 'paging' ? (
                      <Loader2 className="h-3 w-3 animate-spin text-amber-600" strokeWidth={2.4} aria-hidden />
                    ) : (
                      <PhoneCall className="h-3 w-3 text-[#0B211B]/45" strokeWidth={2.2} aria-hidden />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 break-words text-[11px] font-semibold leading-snug text-[#0B211B]/60">
                    {e.label}
                  </span>
                  <span className="shrink-0 text-[11px] font-bold text-[#0B211B]/80">{e.value}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
