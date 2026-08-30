import { useState } from 'react'
import { Eye, PenLine, ScrollText, ShieldAlert, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { TimeChip } from '@/components/phone/kit'
import {
  AUDIT_FILTERS,
  FILTER_LABELS,
  VAULT_FACTS,
  changeCount,
  deniedCount,
  filterCountOf,
  filterEntries,
  viewCount,
  type AuditEntry,
  type AuditFilter,
  type AuditKind,
} from '@/data/patientRecords'
import { FilterTabs } from './FilterTabs'
import { cn } from '@/lib/utils'

const KIND_ICON: Record<AuditKind, LucideIcon> = {
  view: Eye,
  change: PenLine,
  denied: ShieldAlert,
}

const KIND_TILE: Record<AuditKind, string> = {
  view: 'bg-sky-500/[0.12] text-sky-600',
  change: 'bg-emerald-500 text-white',
  denied: 'bg-rose-500/[0.12] text-rose-600',
}

interface AuditLogSheetProps {
  entries: AuditEntry[]
  initialFilter: AuditFilter
  onClose: () => void
  onOpenConsent: () => void
}

export function AuditLogSheet({ entries, initialFilter, onClose, onOpenConsent }: AuditLogSheetProps) {
  const [filter, setFilter] = useState<AuditFilter>(initialFilter)
  const rows = filterEntries(entries, filter)

  const tabs = AUDIT_FILTERS.map((f) => ({
    id: f,
    label: FILTER_LABELS[f],
    count: filterCountOf(entries, f),
  }))

  return (
    <SheetShell
      icon={ScrollText}
      tone="info"
      title="Full audit log"
      subtitle={`${entries.length} entries since ${VAULT_FACTS.since}`}
      onClose={onClose}
      footer={
        <div>
          <button
            type="button"
            onClick={onOpenConsent}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Open consent records</span>
          </button>
          <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">{VAULT_FACTS.retention}</p>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pb-2">
        <FilterTabs tabs={tabs} value={filter} onChange={(id) => setFilter(id as AuditFilter)} layoutId="audit-tabs" />

        <div className="flex flex-col gap-2.5">
          {rows.map((entry) => {
            const Icon = KIND_ICON[entry.kind]
            return (
              <div
                key={entry.id}
                className={cn(
                  'flex items-start gap-3.5 rounded-2xl p-4 transition-colors duration-200 hover:bg-[#0B211B]/[0.06]',
                  entry.id === initialFilter ? 'bg-[#0B211B]/[0.03]' : 'bg-[#0B211B]/[0.03]',
                )}
              >
                <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', KIND_TILE[entry.kind])}>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-[13px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                    {entry.title}
                  </span>
                  <span className="mt-1 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/55">
                    {entry.detail}
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-3">
                    <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
                      {entry.actor}
                    </span>
                    <TimeChip>{entry.time}</TimeChip>
                  </span>
                </span>
              </div>
            )
          })}
        </div>

        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">Ledger totals</div>
          <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                  <span className="text-[12px] font-semibold text-[#0B211B]/65">Views logged</span>
                </span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {viewCount(entries)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span className="text-[12px] font-semibold text-[#0B211B]/65">Changes sealed</span>
                </span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {changeCount(entries)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  <span className="text-[12px] font-semibold text-[#0B211B]/65">Accesses denied</span>
                </span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {deniedCount(entries)}
                </span>
              </div>
            </div>
            <p className="mt-3.5 break-words text-[10.5px] font-medium leading-snug text-[#0B211B]/50">
              Denied entries stay in the ledger permanently, including who was blocked and why.
            </p>
          </div>
        </div>
      </div>
    </SheetShell>
  )
}
