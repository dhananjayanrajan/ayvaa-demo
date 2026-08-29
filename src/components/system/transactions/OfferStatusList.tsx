import { motion } from 'motion/react'
import {
  Ban,
  CheckCircle2,
  Hourglass,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Card,
  Chip,
  Meter,
  Tile,
  rise,
} from '@/components/phone/kit'
import type { Intent, TileTone } from '@/components/phone/kit'
import { dispatchOffers } from '@/data/seed'

type OfferState = 'waiting' | 'declined' | 'recheck'

type NotifyFn = (payload: {
  title: string
  body: string
  kind: 'ok' | 'warn' | 'info'
}) => void

const stateStyle: Record<OfferState, { icon: LucideIcon; tile: TileTone; intent: Intent; chip: string; live: boolean }> = {
  waiting: { icon: Hourglass, tile: 'warning', intent: 'warning', chip: 'Deciding', live: true },
  declined: { icon: Ban, tile: 'neutral', intent: 'neutral', chip: 'Re-offered', live: false },
  recheck: { icon: CheckCircle2, tile: 'info', intent: 'info', chip: 'Checking', live: true },
}

interface OfferStatusListProps {
  waiting: number
  declined: number
  recheck: number
  mmss: string
  expiresAt: string
  notify: NotifyFn
}

export function OfferStatusList({ waiting, declined, recheck, mmss, expiresAt, notify }: OfferStatusListProps) {
  const totalOffers = waiting + declined + recheck

  const countOf = (s: OfferState) =>
    s === 'waiting' ? waiting : s === 'declined' ? declined : recheck

  return (
    <motion.div variants={rise}>
      <Card>
        {dispatchOffers.map((o, i) => {
          const s = stateStyle[o.state as OfferState] ?? stateStyle.waiting
          const count = countOf(o.state as OfferState)
          return (
            <div key={o.id}>
              {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />}
              <motion.button
                whileTap={{ scale: 0.985 }}
                onClick={() =>
                  notify(
                    o.state === 'waiting'
                      ? { title: 'Offer still open', body: `${count} nurses deciding · expires ${expiresAt}`, kind: 'info' }
                      : o.state === 'declined'
                        ? { title: 'Offer declined', body: 'Nurse declined · slot re-offered in round two', kind: 'warn' }
                        : { title: 'Re-checking availability', body: 'Conflict found · availability re-verified now', kind: 'info' },
                  )
                }
                className="group flex w-full items-center gap-3 px-3.5 py-3 text-left"
              >
                <Tile icon={s.icon} tone={s.tile} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold tracking-tight text-[#0B211B]">
                    {count} {o.label.replace(/^\d+ /, '')}
                  </div>
                  <div className="mt-0.5 truncate text-xs font-medium leading-snug text-[#0B211B]/55">
                    {o.state === 'waiting' ? `Expires ${expiresAt} · ${mmss} left` : o.detail}
                  </div>
                  <Meter value={count / totalOffers} intent={s.intent} delay={0.2 + i * 0.1} className="mt-2 max-w-[160px]" />
                </div>
                <Chip intent={s.intent} dot={s.live}>{s.chip}</Chip>
              </motion.button>
            </div>
          )
        })}
      </Card>
    </motion.div>
  )
}
