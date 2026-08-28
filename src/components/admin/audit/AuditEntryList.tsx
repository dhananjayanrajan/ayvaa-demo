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
import { Card, Chip, Section, rise } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { ListRow } from '@/components/admin/ui/ListRow'

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
  totalEntries: number
  rangeLabel: string
  notify: NotifyFn
}

export function AuditEntryList({ entries, totalEntries, rangeLabel, notify }: AuditEntryListProps) {
  return (
    <>
      <motion.div variants={rise}>
        <Section label={rangeLabel} trailing={<Chip intent="neutral">{totalEntries} entries</Chip>} />
      </motion.div>

      <motion.div variants={rise}>
        <Card>
          {entries.map((e, i) => {
            const { icon, tone } = iconMap[e.icon] ?? iconMap.view
            return (
              <div key={e.id}>
                {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                <ListRow
                  icon={icon}
                  tone={tone}
                  title={e.title}
                  subtitle={e.body}
                  onClick={() =>
                    notify(
                      e.icon === 'error'
                        ? { title: e.title, body: `${e.body} · flagged for review`, kind: 'warn' }
                        : { title: e.title, body: `${e.body} · opened from ${rangeLabel} log`, kind: 'info' },
                    )
                  }
                  trailing={
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/35 transition-colors group-hover:bg-[#0B211B]/[0.08]">
                      <Lock className="h-3 w-3" strokeWidth={2.4} aria-hidden />
                    </span>
                  }
                  showChevron={false}
                />
              </div>
            )
          })}
        </Card>
      </motion.div>
    </>
  )
}
