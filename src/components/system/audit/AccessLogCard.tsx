import { AnimatePresence, motion } from 'motion/react'
import {
  CalendarCheck,
  Eye,
  FileClock,
  FilePenLine,
  Flag,
  Search,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import { accessEntries } from '@/data/system/auditLog'
import type { AccessEntry, AccessKind } from '@/data/system/auditLog'
import { cn } from '@/lib/utils'

const KIND_ICON: Record<AccessKind, LucideIcon> = {
  view: Eye,
  change: FilePenLine,
  consent: ShieldCheck,
}

const KIND_TILE: Record<AccessKind, 'info' | 'warning' | 'success'> = {
  view: 'info',
  change: 'warning',
  consent: 'success',
}

const KIND_CHIP: Record<AccessKind, { intent: 'info' | 'warning' | 'success'; label: string }> = {
  view: { intent: 'info', label: 'Viewed' },
  change: { intent: 'warning', label: 'Changed' },
  consent: { intent: 'success', label: 'Consented' },
}

type Filter = 'all' | AccessKind

const FILTERS: { value: Filter; label: string; icon: LucideIcon }[] = [
  { value: 'all', label: 'All', icon: FileClock },
  { value: 'view', label: 'Views', icon: Eye },
  { value: 'change', label: 'Changes', icon: FilePenLine },
  { value: 'consent', label: 'Consents', icon: ShieldCheck },
]

interface AccessLogCardProps {
  filter: Filter
  flagged: string[]
  onFilter: (f: Filter) => void
  onEntryTap: (entry: AccessEntry) => void
}

export function AccessLogCard({ filter, flagged, onFilter, onEntryTap }: AccessLogCardProps) {
  const visible = accessEntries.filter((e) => filter === 'all' || e.kind === filter)

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <Tile icon={FileClock} tone="ink" />
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold tracking-tight text-[#0B211B]">Access log</span>
            <span className="block text-xs font-medium text-[#0B211B]/55">
              Every read of a sensitive record is written down
            </span>
          </div>
          <Chip intent="info" className="border-transparent">
            {visible.length} shown
          </Chip>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const active = filter === f.value
            const count =
              f.value === 'all' ? accessEntries.length : accessEntries.filter((e) => e.kind === f.value).length
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => onFilter(f.value)}
                className={cn(
                  'relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500/50',
                  active ? 'text-white' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55 hover:bg-[#0B211B]/[0.09]',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="access-filter"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    className="absolute inset-0 rounded-full bg-[#0B211B]"
                  />
                )}
                <f.icon className="relative h-3 w-3" strokeWidth={2.6} aria-hidden />
                <span className="relative">
                  {f.label} · {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {visible.map((entry) => {
            const Icon = KIND_ICON[entry.kind]
            const chip = KIND_CHIP[entry.kind]
            const isFlagged = flagged.includes(entry.id)
            return (
              <div key={entry.id}>
                <Row
                  icon={Icon}
                  tone={KIND_TILE[entry.kind]}
                  align="start"
                  title={entry.action}
                  subtitle={entry.who}
                  subtitleClassName="text-[11px] font-medium"
                  body={
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/45">
                      {entry.document}
                    </span>
                  }
                  trailing={
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      <Chip intent={chip.intent} className="border-transparent">
                        {chip.label}
                      </Chip>
                      {isFlagged && (
                        <Chip intent="warning" icon={Flag} className="border-transparent">
                          Flagged
                        </Chip>
                      )}
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#0B211B]/35">
                        {entry.time}
                      </span>
                    </span>
                  }
                  onClick={() => onEntryTap(entry)}
                  showChevron={false}
                />
              </div>
            )
          })}
          {visible.length === 0 && (
            <div className="flex items-center justify-center gap-2 px-4 pb-5 pt-1">
              <Search className="h-4 w-4 text-[#0B211B]/30" aria-hidden />
              <span className="text-xs font-medium text-[#0B211B]/40">No entries of this kind yet</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 px-4 pb-4 pt-1">
        <CalendarCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
        <span className="min-w-0 flex-1 text-[10.5px] font-semibold leading-snug text-emerald-700/80">
          Access entries live for ten years. Deleting one is impossible by design.
        </span>
      </div>
    </Card>
  )
}
