import { motion } from 'motion/react'
import {
  AlertTriangle,
  Phone,
  SlidersHorizontal,
} from 'lucide-react'
import { Card, Chip, Panel, Tile, rise } from '@/components/phone/kit'
import { Overline } from '@/components/phone/Overline'
import { flaggedAccount } from '@/data/seed'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface FlaggedAccountCardProps {
  notify: NotifyFn
  onMoreActions: () => void
}

export function FlaggedAccountCard({ notify, onMoreActions }: FlaggedAccountCardProps) {
  return (
    <motion.div variants={rise}>
      <Card intent="danger">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={AlertTriangle} tone="danger" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
                  {flaggedAccount.name}
                </span>
                <Chip intent="danger" dot>Flagged</Chip>
              </div>
              <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/60">
                {flaggedAccount.body}
              </p>
            </div>
          </div>

          <Panel intent="warning" className="mt-4 p-3.5">
            <Overline icon={AlertTriangle}>Active flags · {flaggedAccount.flags.length}</Overline>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {flaggedAccount.flags.map((t) => (
                <Chip key={t} intent="warning">
                  {t}
                </Chip>
              ))}
            </div>
          </Panel>

          
          <div className="flex gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => notify({ title: 'Family contacted', body: 'Guardian called · outcome logged', kind: 'ok' })}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-3.5 text-[13px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)] transition-all duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Contact family</span>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={onMoreActions}
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#0B231C] to-[#123229] text-emerald-200 shadow-[0_12px_24px_-14px_rgba(6,40,30,0.7)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              aria-label="More actions"
            >
              <SlidersHorizontal className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
