import { motion } from 'motion/react'
import { Search, X } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
import { EmptyState } from '@/components/phone/EmptyState'
import { SheetShell } from '@/components/phone/SheetShell'
import { groupByMonth, searchSessions, type HistorySession } from '@/data/historyData'

type Props = {
  sessions: HistorySession[]
  query: string
  onQueryChange: (q: string) => void
  onClose: () => void
  onOpenSession: (s: HistorySession) => void
}

export function SearchSheet({ sessions, query, onQueryChange, onClose, onOpenSession }: Props) {
  const results = searchSessions(sessions, query)
  const groups = groupByMonth(results)
  const searching = query.trim().length > 0

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <SheetShell
        onClose={onClose}
        height="full"
        header={
          <>
            <div className="flex items-start gap-3">
              <Tile icon={Search} tone="ink" size="lg" />
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Search this history</div>
                <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                  Dates, care notes and incidents
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09]"
                aria-label="Close search"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Try wound, or a date"
              autoFocus
              className="mt-3 w-full rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5 text-[13.5px] font-semibold text-[#0B211B] placeholder:text-[#0B211B]/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </>
        }
        footer={
          <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
            Searching is private. Queries are never logged against the patient.
          </p>
        }
      >
        {!searching && (
          <EmptyState
            container="soft"
            spacing="gap"
            gap="sm"
            padding="sm"
            title="Type to search this patient history"
            titleClassName="text-[13px] text-[#0B211B]/60"
            body="Every visit, note and incident is covered"
            bodyClassName="text-[11px] text-[#0B211B]/40"
          />
        )}

        {searching && results.length === 0 && (
          <EmptyState
            container="soft"
            spacing="gap"
            gap="sm"
            padding="sm"
            title={`No records match ${query}`}
            titleClassName="text-[13px] text-[#0B211B]/60"
            body="Search covers dates, care notes and incidents"
            bodyClassName="text-[11px] text-[#0B211B]/40"
          />
        )}

        {searching &&
          groups.map((g) => (
            <div key={g.monthFull} className="mb-4">
              <div className="flex items-center gap-3 px-1 pb-2">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">{g.monthFull}</span>
                <span className="h-px flex-1 bg-[#0B211B]/[0.07]" />
                <span className="text-[9px] font-extrabold tabular-nums text-[#0B211B]/35">{g.sessions.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {g.sessions.map((s) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => onOpenSession(s)}
                    className="flex items-start gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
                  >
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${s.incident ? 'bg-amber-400' : 'bg-emerald-500'}`}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-mono text-[12.5px] font-bold tabular-nums text-[#0B211B]">
                        {s.date}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                        {s.incident ?? s.detail}
                      </span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
      </SheetShell>
    </>
  )
}
