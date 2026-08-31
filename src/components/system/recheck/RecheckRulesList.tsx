import { motion } from 'motion/react'
import {
  AlertTriangle,
  ScrollText,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Card,
  Tile,
  rise,
} from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import type { Intent } from '@/components/phone/kit'

type NotifyFn = (payload: {
  title: string
  body: string
  kind: 'ok' | 'warn'
}) => void

const rules: { icon: LucideIcon; intent: Intent; title: string; body: string; notifyBody: string; kind: 'ok' | 'warn' }[] = [
  {
    icon: Zap,
    intent: 'success',
    title: 'Instant acceptance',
    body: 'Free in the window · confirmed on the spot',
    notifyBody: 'Free in the window · acceptance confirmed instantly',
    kind: 'ok',
  },
  {
    icon: AlertTriangle,
    intent: 'warning',
    title: 'Conflict reversal',
    body: 'New conflict · offer reversed, re-dispatched',
    notifyBody: 'New conflict found · offer reversed, session re-dispatched',
    kind: 'warn',
  },
  {
    icon: ScrollText,
    intent: 'info',
    title: 'Transparent logging',
    body: 'Every outcome logged · visible to family',
    notifyBody: 'Every outcome is logged and shown to the family transparently',
    kind: 'ok',
  },
]

interface RecheckRulesListProps {
  notify: NotifyFn
}

export function RecheckRulesList({ notify }: RecheckRulesListProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        {rules.map((r, i) => (
          <Row
            key={r.title}
            leading={
              <span className="flex shrink-0 items-center gap-3">
                <span className="flex w-6 shrink-0 flex-col items-center">
                  <span className="text-[10px] font-extrabold tabular-nums text-emerald-600/60">{String(i + 1).padStart(2, '0')}</span>
                  {i < rules.length - 1 && <span aria-hidden className="mt-1 w-px flex-1 bg-[#0B211B]/10" />}
                </span>
                <Tile icon={r.icon} tone={r.intent} size="sm" />
              </span>
            }
            title={r.title}
            titleClassName="text-[13px]"
            subtitle={r.body}
            subtitleClassName="text-xs text-[#0B211B]/55"
            surface="none"
            padding="none"
            className='py-3'
            hoverClassName=""
            onClick={() => notify({ title: `Rule: ${r.title.toLowerCase()}`, body: r.notifyBody, kind: r.kind })}
          />
        ))}
      </Card>
    </motion.div>
  )
}
