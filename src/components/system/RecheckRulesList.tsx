import { motion } from 'motion/react'
import {
  AlertTriangle,
  ChevronRight,
  ScrollText,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Card,
  Tile,
  rise,
} from '@/components/phone/kit'
import type { Intent } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

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
          <motion.button
            key={r.title}
            whileTap={{ scale: 0.985 }}
            onClick={() => notify({ title: `Rule: ${r.title.toLowerCase()}`, body: r.notifyBody, kind: r.kind })}
            className={cn('group flex w-full items-center gap-3 px-4 py-3 text-left', i > 0 && 'border-t border-[#0B211B]/[0.05]')}
          >
            <span className="flex w-6 shrink-0 flex-col items-center">
              <span className="text-[10px] font-extrabold tabular-nums text-emerald-600/60">{String(i + 1).padStart(2, '0')}</span>
              {i < rules.length - 1 && <span aria-hidden className="mt-1 w-px flex-1 bg-[#0B211B]/10" />}
            </span>
            <Tile icon={r.icon} tone={r.intent} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{r.title}</span>
              <span className="mt-0.5 block text-xs font-medium leading-snug text-[#0B211B]/55">{r.body}</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
          </motion.button>
        ))}
      </Card>
    </motion.div>
  )
}
