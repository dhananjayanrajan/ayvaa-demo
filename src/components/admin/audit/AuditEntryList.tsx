import { motion } from 'motion/react'
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  Gavel,
  Lock,
  UserCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Section, Tile, rise } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'

const iconMap: Record<string, { icon: LucideIcon; tone: TileTone }> = {
  ok: { icon: CheckCircle2, tone: 'success' },
  view: { icon: Eye, tone: 'neutral' },
  approve: { icon: UserCheck, tone: 'success' },
  error: { icon: AlertTriangle, tone: 'danger' },
  gavel: { icon: Gavel, tone: 'warning' },
}

type AuditEntry = {
  id: string
  title: string
  body: string
  icon: string
}

type NotifyFn = (payload: { title: string; body: string; kind: 'info' | 'warn' }) => void

interface AuditEntryListProps {
  entries: AuditEntry[]
  rangeLabel: string
  notify: NotifyFn
}

export function AuditEntryList({ entries, rangeLabel, notify }: AuditEntryListProps) {
  return (
    <>
      <motion.div variants={rise}>
        <Section label={rangeLabel} trailing={<Chip intent="neutral">{entries.length} entries</Chip>} />
      </motion.div>

      <motion.div variants={rise}>
        <Card>
          {entries.map((e, i) => {
            const { icon: Icon, tone } = iconMap[e.icon] ?? iconMap.view
            return (
              <div key={e.id}>
                {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() =>
                    notify(
                      e.icon === 'error'
                        ? { title: e.title, body: `${e.body} · flagged for review`, kind: 'warn' }
                        : { title: e.title, body: `${e.body} · opened from ${rangeLabel} log`, kind: 'info' },
                    )
                  }
                  className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={Icon} tone={tone} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{e.title}</span>
                    <span className="mt-0.5 block truncate text-[11.5px] font-medium text-[#0B211B]/55">{e.body}</span>
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/35">
                    <Lock className="h-3 w-3" strokeWidth={2.4} aria-hidden />
                  </span>
                </motion.button>
              </div>
            )
          })}
        </Card>
      </motion.div>
    </>
  )
}
