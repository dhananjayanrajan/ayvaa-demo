import { motion } from 'motion/react'
import {
  Building2,
  Eye,
  HeartHandshake,
  Inbox,
  Stethoscope,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, rise } from '@/components/base/phone/kit'
import type { Intent, TileTone } from '@/components/base/phone/kit'
import { recentActivity } from '@/data/seed'
import { ListRow } from '@/components/patterns/lists/list-row'

const iconMap: Record<string, LucideIcon> = {
  Partner: Building2,
  Guardian: HeartHandshake,
  RN: Stethoscope,
}

const statusStyle: Record<string, { tile: TileTone; intent: Intent }> = {
  Healthy: { tile: 'success', intent: 'success' },
  None: { tile: 'neutral', intent: 'neutral' },
}

const filterRoleMap: Record<string, string[]> = {
  all: ['Partner', 'Guardian', 'RN'],
  patients: ['Guardian'],
  pros: ['RN'],
  partners: ['Partner'],
}

type NotifyFn = (payload: { title: string; body: string; kind: 'info' }) => void

interface RecentActivityListProps {
  filter: string
  notify: NotifyFn
}

export function RecentActivityList({ filter, notify }: RecentActivityListProps) {
  const allowedRoles = filterRoleMap[filter] ?? []
  const visible = filter === 'all' ? recentActivity : recentActivity.filter((a) => allowedRoles.includes(a.role))

  return (
    <motion.div variants={rise}>
      <Card>
        {visible.length === 0 ? (
          <div className="p-4">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-600/20 bg-emerald-500/[0.04] px-6 py-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600">
                <Inbox className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-bold tracking-tight text-[#0B211B]/70">No {filter} activity yet</p>
                <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/45">
                  Nothing in this filter for the past 7 days
                </p>
              </div>
              <Chip intent="success">Try the All tab</Chip>
            </div>
          </div>
        ) : (
          visible.map((a, i) => {
            const Icon = iconMap[a.role] ?? Eye
            const s = statusStyle[a.pill] ?? { tile: 'warning' as TileTone, intent: 'warning' as Intent }
            return (
              <div key={i}>
                <ListRow
                  icon={Icon}
                  tone={s.tile}
                  title={a.name}
                  subtitle={a.body}
                  onClick={() => notify({ title: 'Account opened', body: `${a.name} · access logged`, kind: 'info' })}
                  trailing={<Chip intent={s.intent}>{a.pill}</Chip>}
                  showChevron={false}
                />
              </div>
            )
          })
        )}
      </Card>
    </motion.div>
  )
}
