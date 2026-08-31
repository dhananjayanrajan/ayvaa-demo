import { motion } from 'motion/react'
import { Search, X } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
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
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="shrink-0 px-5 pb-3.5 pt-4">
          <div aria-hidden className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
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
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3">
          {!searching && (
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#0B211B]/[0.03] px-5 py-8 text-center">
              <p className="text-[13px] font-bold text-[#0B211B]/60">Type to search this patient history</p>
              <p className="text-[11px] font-medium text-[#0B211B]/40">Every visit, note and incident is covered</p>
            </div>
          )}

          {searching && results.length === 0 && (
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#0B211B]/[0.03] px-5 py-8 text-center">
              <p className="text-[13px] font-bold text-[#0B211B]/60">No records match {query}</p>
              <p className="text-[11px] font-medium text-[#0B211B]/40">Search covers dates, care notes and incidents</p>
            </div>
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
        </div>

        <div className="shrink-0 px-5 pb-6 pt-3.5">
          <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
            Searching is private. Queries are never logged against the patient.
          </p>
        </div>
      </motion.div>
    </>
  )
}
