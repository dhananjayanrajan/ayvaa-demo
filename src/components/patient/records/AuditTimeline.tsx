import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown, Eye, PenLine, ScrollText, ShieldAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Tile, TimeChip } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import type { AuditEntry, AuditKind } from '@/data/patientRecords'
import { cn } from '@/lib/utils'
import { LedgerBar } from './LedgerBar'

const KIND_UI: Record<AuditKind, { icon: LucideIcon; tile: string }> = {
  view: { icon: Eye, tile: 'bg-sky-500/[0.12] text-sky-600' },
  change: { icon: PenLine, tile: 'bg-emerald-500 text-white' },
  denied: { icon: ShieldAlert, tile: 'bg-rose-500/[0.12] text-rose-600' },
}

interface AuditTimelineProps {
  entries: AuditEntry[]
  freshId: string | null
  onOpenAll: () => void
}

function FactBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">{label}</div>
      <div className="mt-0.5 break-words text-[12.5px] font-bold leading-snug text-[#0B211B]/80">{value}</div>
    </div>
  )
}

export function AuditTimeline({ entries, freshId, onOpenAll }: AuditTimelineProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const openEntry = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={ScrollText} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Audit ledger</span>
              <Chip intent="success">Immutable</Chip>
            </div>
            <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Tap a segment or an entry to open its sealed record.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <LedgerBar entries={entries} freshId={freshId} onSelect={openEntry} />
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          {entries.map((entry) => {
            const ui = KIND_UI[entry.kind]
            const open = openId === entry.id
            const fresh = entry.id === freshId
            return (
              <motion.div
                key={entry.id}
                layout
                initial={fresh ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={cn('rounded-2xl', fresh ? 'bg-sky-500/[0.09]' : 'bg-[#0B211B]/[0.03]')}
              >
                <Row
                  align="start"
                  padding="p-4"
                  leading={
                    <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', ui.tile)}>
                      <ui.icon className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
                    </span>
                  }
                  title={entry.title}
                  titleClassName="text-[13px] font-extrabold"
                  subtitle={entry.detail}
                  subtitleClassName="mt-1 text-[11.5px] font-medium leading-snug text-[#0B211B]/55"
                  expandable
                  open={open}
                  onToggle={() => openEntry(entry.id)}
                  chevronVisible={false}
                  hoverClassName="hover:bg-[#0B211B]/[0.06]"
                  trailing={
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      {fresh && (
                        <Chip intent="live" dot>
                          New
                        </Chip>
                      )}
                      <TimeChip>{entry.time}</TimeChip>
                      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="h-4 w-4 text-[#0B211B]/40" aria-hidden />
                      </motion.span>
                    </span>
                  }
                  expansionPadded={false}
                  expansion={
                    <div className="px-4 pb-4">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-[0_1px_2px_rgba(11,33,27,0.05)]">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <FactBlock label="Actor" value={entry.actor} />
                          <FactBlock label="Recorded" value={entry.time} />
                        </div>
                        <div className="mt-3.5">
                          <FactBlock
                            label="Sealed"
                            value={
                              entry.kind === 'denied'
                                ? 'Blocked by the consent gate, refusal kept permanently'
                                : 'Written to the immutable ledger, locked against edits'
                            }
                          />
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            )
          })}
        </div>

        <button
          type="button"
        onClick={onOpenAll}
          className="mt-5 w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-colors duration-200 hover:bg-[#0B211B]/[0.09]"
        >
          View all {entries.length} entries with filters
        </button>
      </div>
    </Card>
  )
}
