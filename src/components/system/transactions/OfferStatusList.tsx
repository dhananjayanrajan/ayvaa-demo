import { motion } from 'motion/react'
import {
  Ban,
  CheckCircle2,
  Hourglass,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Card,
  Meter,
  rise,
} from '@/components/phone/kit'
import type { Intent, TileTone } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
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
              <Row
                icon={s.icon}
                tone={s.tile}
                title={`${count} ${o.label.replace(/^\d+ /, '')}`}
                titleClassName="text-sm"
                subtitle={o.state === 'waiting' ? `Expires ${expiresAt} · ${mmss} left` : o.detail}
                subtitleClassName="text-xs"
                body={
                  <Meter value={count / totalOffers} intent={s.intent} delay={0.2 + i * 0.1} className="mt-2 max-w-[160px]" />
                }
                chip={{ label: s.chip, intent: s.intent, dot: s.live }}
                showChevron={false}
                onClick={() =>
                  notify(
                    o.state === 'waiting'
                      ? { title: 'Offer still open', body: `${count} nurses deciding · expires ${expiresAt}`, kind: 'info' }
                      : o.state === 'declined'
                        ? { title: 'Offer declined', body: 'Nurse declined · slot re-offered in round two', kind: 'warn' }
                        : { title: 'Re-checking availability', body: 'Conflict found · availability re-verified now', kind: 'info' },
                  )
                }
              />
            </div>
          )
        })}
      </Card>
    </motion.div>
  )
}
