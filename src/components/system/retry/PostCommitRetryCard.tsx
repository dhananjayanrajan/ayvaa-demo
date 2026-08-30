import { motion } from 'motion/react'
import { Send, ShieldCheck } from 'lucide-react'
import { Card, Panel, Tile, TimeChip, rise } from '@/components/phone/kit'

const RETRY_LADDER = [
  { time: '9:39 AM', text: 'Retry one · same five licensed nurses' },
  { time: '9:40 AM', text: 'Retry two · radius widened to 10 km' },
  { time: '9:43 AM', text: 'Care team paged personally' },
]

export function PostCommitRetryCard() {
  return (
    <motion.div variants={rise}>
      <Card intent="warning">
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={Send} tone="warning" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
                Dispatch failed after commit
              </div>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/60">
                The transaction had already sealed. Booking, series, sessions and audit stay — only offer delivery retries.
              </p>
            </div>
          </div>

          <Panel intent="warning" className="mt-4 p-4">
            <div className="flex flex-col gap-2.5">
              {RETRY_LADDER.map((r) => (
                <div key={r.time} className="flex items-center gap-2.5">
                  <TimeChip>{r.time}</TimeChip>
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span className="min-w-0 flex-1 text-xs font-semibold text-[#0B211B]/80">{r.text}</span>
                </div>
              ))}
            </div>
            <div aria-hidden className="my-3 h-px bg-amber-500/15" />
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="min-w-0 flex-1 text-xs font-semibold leading-snug text-amber-700/90">
                The booking itself was never at risk.
              </span>
            </div>
          </Panel>
        </div>
      </Card>
    </motion.div>
  )
}
