import { motion } from 'motion/react'
import { Check, ShieldCheck, Undo2 } from 'lucide-react'
import { Card, Chip, Panel, rise } from '@/components/phone/kit'
import { refund, refundEvents } from '@/data/system/payments'
import { cn } from '@/lib/utils'

function RefundRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
        {label}
      </span>
      <span className="min-w-0 truncate text-right font-mono text-[12.5px] font-bold text-[#0B211B]">
        {value}
      </span>
    </div>
  )
}

interface RefundCardProps {
  onTap: (time: string, title: string, detail: string) => void
}

export function RefundCard({ onTap }: RefundCardProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
                Refund issued
              </div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {refund.visit}
              </div>
              <div className="text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {refund.visitCause}
              </div>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sky-500/[0.1] text-sky-600">
              <Undo2 className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
          </div>

          <div className="mt-3.5 flex items-baseline justify-between gap-3 rounded-2xl bg-sky-500/[0.07] px-4 py-3">
            <span className="flex min-w-0 items-baseline gap-1">
              <span className="text-[14px] font-extrabold text-sky-600/70">₹</span>
              <span className="font-mono text-[26px] font-extrabold leading-none tracking-tight text-sky-700">
                {refund.amountNum}
              </span>
            </span>
            <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-sky-700/60">
              returned in full
            </span>
          </div>

          <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] p-4">
            <RefundRow label="Reference" value={refund.id} />
            <div className="mt-2">
              <RefundRow label="Returned to" value={refund.card} />
            </div>
            <div className="mt-2">
              <RefundRow label="Reason" value={refund.reason} />
            </div>
            <div className="mt-2">
              <RefundRow label="Settled" value={refund.settled} />
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
              How it happened
            </div>
            <div className="mt-3">
              {refundEvents.map((e, i) => {
                const last = i === refundEvents.length - 1
                return (
                  <motion.button
                    key={e.title}
                    type="button"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => onTap(e.time, e.title, e.detail)}
                    className="flex w-full gap-3.5 text-left outline-none focus-visible:outline-none"
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          'relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                          last ? 'bg-sky-500' : 'bg-emerald-500',
                        )}
                      >
                        {last && <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-sky-400/50" />}
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} aria-hidden />
                      </span>
                      {!last && (
                        <span aria-hidden className="my-1 w-px flex-1 bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15" />
                      )}
                    </div>
                    <div className={cn('min-w-0 flex-1', !last && 'pb-5')}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">{e.title}</span>
                        <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wide text-[#0B211B]/40">
                          {e.time}
                        </span>
                      </div>
                      <p className="mt-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{e.detail}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <Panel intent="info" className="mt-3.5 flex items-start gap-2.5 p-3.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.4} aria-hidden />
            <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-medium leading-relaxed text-[#0B211B]/65">
              Care that never happened never charges. The guarantee is a system rule.
            </p>
          </Panel>
        </div>
      </Card>
    </motion.div>
  )
}
