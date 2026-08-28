import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronRight, Download, FileText, Lock, Search, ShieldCheck, Star, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Kicker, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { pastSessions } from '@/data/professionalHistory'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const MONTH_FULL: Record<string, string> = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December',
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'notes', label: 'With notes' },
  { id: 'incidents', label: 'Incidents' },
] as const

type FilterId = (typeof filters)[number]['id']
type Session = (typeof pastSessions)[number]

export function PR12() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [filter, setFilter] = useState<FilterId>('all')
  const [sheet, setSheet] = useState<'none' | 'search' | 'detail'>('none')
  const [detail, setDetail] = useState<Session | null>(null)
  const [query, setQuery] = useState('')
  const close = () => setSheet('none')

  const openRecord = (s: Session) => {
    setDetail(s)
    setSheet('detail')
  }

  const filtered = pastSessions.filter((s) => {
    if (filter === 'notes') return Boolean(s.note)
    if (filter === 'incidents') return Boolean(s.incident)
    return true
  })

  const groups = filtered.reduce<Record<string, Session[]>>((acc, s) => {
    const m = s.date.split(' ')[0]
    ;(acc[m] ??= []).push(s)
    return acc
  }, {})
  const groupEntries = Object.entries(groups).sort(
    (a, b) => Object.keys(MONTH_FULL).indexOf(a[0]) - Object.keys(MONTH_FULL).indexOf(b[0]),
  )

  const results = query.trim()
    ? pastSessions.filter((s) =>
        `${s.date} ${s.detail} ${s.note ?? ''} ${s.incident ?? ''}`.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : []

  const totals = {
    sessions: pastSessions.length,
    notes: pastSessions.filter((s) => s.note).length,
    incidents: pastSessions.filter((s) => s.incident).length,
  }

  return (
    <Screen>
      <AppBar
        title="Past sessions"
        subtitle="Ramesh Sharma · completed with you"
        onBack={() => navigate('/professional/pr04')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setSheet('search')}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60"
            aria-label="Search sessions"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <Kicker>Patient dossier · sealed</Kicker>
                    <Chip intent="neutral" light icon={Lock} className="shrink-0 border-transparent">
                      Sealed
                    </Chip>
                  </div>

                  <div className="mt-3.5 flex items-center gap-3.5">
                    <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[18px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[15px] font-black tracking-tight text-emerald-100">
                      RS
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-[18px] font-extrabold leading-tight tracking-tight text-white">Ramesh Sharma</h2>
                      <p className="mt-0.5 truncate font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-100/45">
                        Chart RM-0417 · with you since Jan
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white/[0.05] p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/50">
                        Visit map · tap any visit
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-300/70">
                        {totals.sessions} logged
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pastSessions.map((s, i) => (
                        <motion.button
                          key={s.id}
                          type="button"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          whileTap={{ scale: 0.8 }}
                          transition={{ delay: 0.25 + i * 0.03, type: 'spring', stiffness: 340, damping: 18 }}
                          onClick={() => openRecord(s)}
                          aria-label={`Open session ${s.date}`}
                          className={cn(
                            'relative grid h-6 w-6 place-items-center rounded-lg font-mono text-[8px] font-black',
                            s.incident
                              ? 'bg-amber-300/90 text-[#241A0B] shadow-[0_0_10px_rgba(252,211,77,0.5)]'
                              : 'bg-emerald-400/85 text-[#0B231C]',
                          )}
                        >
                          {i + 1}
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-100/50">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Clean visit
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-100/50">
                        <span className="h-2 w-2 rounded-full bg-amber-300" />
                        Incident · resolved
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.08]">
                    {[
                      { v: totals.sessions, l: 'Sessions' },
                      { v: totals.notes, l: 'Notes sent' },
                      { v: totals.incidents, l: 'Incidents' },
                    ].map((s) => (
                      <div key={s.l} className="flex min-w-0 flex-col items-center gap-1 px-2">
                        <span className="text-[17px] font-extrabold tabular-nums leading-none text-white">{s.v}</span>
                        <span className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
                {filters.map((f) => {
                  const active = filter === f.id
                  return (
                    <motion.button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter(f.id)}
                      className="relative flex-1 rounded-full py-2.5"
                    >
                      {active && (
                        <motion.span
                          layoutId="pr12-filter"
                          transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
                        />
                      )}
                      <span
                        className={cn(
                          'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.08em]',
                          active ? 'text-white' : 'text-[#0B211B]/45',
                        )}
                      >
                        {f.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            {groupEntries.length === 0 ? (
              <motion.div variants={rise}>
                <div className="flex flex-col items-center gap-3 rounded-[26px] bg-white px-6 py-10 text-center shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/35">
                    <Search className="h-6 w-6" strokeWidth={2.2} aria-hidden />
                  </span>
                  <p className="text-[14px] font-extrabold tracking-tight text-[#0B211B]/70">Nothing matches this filter</p>
                  <p className="text-xs font-medium text-[#0B211B]/45">Try “All” to see the full history</p>
                </div>
              </motion.div>
            ) : (
              groupEntries.map(([month, sessions]) => (
                <div key={month} className="flex flex-col gap-3">
                  <motion.div variants={rise}>
                    <Section
                      label={MONTH_FULL[month] ?? month}
                      trailing={<Chip intent="neutral">{sessions.length} visit{sessions.length > 1 ? 's' : ''}</Chip>}
                    />
                  </motion.div>
                  {sessions.map((s) => (
                    <motion.div key={s.id} variants={rise}>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => openRecord(s)}
                        className="block w-full rounded-3xl bg-white p-5 text-left shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)] transition-shadow hover:shadow-[0_1px_2px_rgba(11,33,27,0.06),0_24px_52px_-22px_rgba(11,33,27,0.35)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2.5">
                            <span className="font-mono text-[15px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
                              {s.date}
                            </span>
                            {s.incident ? (
                              <Chip intent="warning">Incident</Chip>
                            ) : (
                              <Chip intent="success" icon={Check}>
                                Complete
                              </Chip>
                            )}
                          </span>
                          <span className="flex shrink-0 items-center gap-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                            Record
                            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-2 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/65">
                          {s.detail}
                        </p>

                        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                          {s.note && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/[0.1] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-sky-700">
                              <FileText className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                              Note to family
                            </span>
                          )}
                          {s.incident && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/[0.1] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-emerald-700">
                              <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                              Resolved
                            </span>
                          )}
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#0B211B]/[0.05] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/50">
                            <Lock className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                            Sealed
                          </span>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              ))
            )}

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Lock} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Past records are sealed — your evidence of care delivered, shareable with hospitals or partners only with consent.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of history" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => notify({ title: 'Export queued', body: 'Your session records will be emailed as a PDF', kind: 'info' })}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Export session records
        </motion.button>
      </FootBar>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>

            {sheet === 'detail' && detail ? (
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-7 pt-3">
                <div className="flex items-start gap-3">
                  <Tile icon={FileText} tone="ink" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
                      Session record · {detail.date}
                    </div>
                    <div className="mt-0.5 text-[15px] font-extrabold tracking-tight text-[#0B211B]">Ramesh Sharma</div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={close}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    aria-label="Close record"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {detail.incident ? <Chip intent="warning">Incident raised</Chip> : <Chip intent="success" icon={Check}>All steps done</Chip>}
                  {detail.note && <Chip intent="info" icon={FileText}>Note sent</Chip>}
                  <Chip intent="neutral" icon={Lock}>Sealed</Chip>
                </div>

                <Panel intent="neutral" className="p-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">
                    <FileText className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                    What was done
                  </div>
                  <p className="mt-2 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/80">{detail.detail}</p>
                </Panel>

                {detail.note && (
                  <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
                    <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">
                        <ShieldCheck className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                        Your note · visible to the family
                      </div>
                      <p className="mt-2 font-serif text-pretty text-[14px] font-medium leading-relaxed text-white/90">
                        &ldquo;{detail.note}&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {detail.incident && (
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/[0.08] p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 text-[12.5px] font-bold leading-snug text-emerald-800">{detail.incident}</span>
                    <Chip intent="success">Resolved</Chip>
                  </div>
                )}

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    close()
                    notify({ title: 'Record saved', body: `${detail.date} record exported as PDF`, kind: 'ok' })
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  Export this record
                </motion.button>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-5 pb-7 pt-3">
                <div className="flex shrink-0 items-start gap-3">
                  <Tile icon={Search} tone="ink" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Search your records</div>
                    <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Dates, notes and incidents across all sessions</div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={close}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “wound” or “Mar 12”…"
                  autoFocus
                  className="w-full shrink-0 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5 text-[13.5px] font-semibold text-[#0B211B] placeholder:text-[#0B211B]/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />

                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
                  {query.trim() && results.length === 0 && (
                    <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#0B211B]/[0.03] px-5 py-6 text-center">
                      <p className="text-[13px] font-bold text-[#0B211B]/60">No records for “{query}”</p>
                      <p className="text-[11px] font-medium text-[#0B211B]/40">Search covers dates, notes and incidents</p>
                    </div>
                  )}
                  {results.map((s) => (
                    <motion.button
                      key={s.id}
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => openRecord(s)}
                      className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3 text-left"
                    >
                      <Tile icon={s.incident ? Star : Check} tone={s.incident ? 'warning' : 'success'} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-mono text-[12.5px] font-bold tabular-nums text-[#0B211B]">{s.date}</span>
                        <span className="block truncate text-[11px] font-medium text-[#0B211B]/50">{s.incident ?? s.detail}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                    </motion.button>
                  ))}
                </div>

                <p className="shrink-0 text-center text-[10.5px] font-semibold text-[#0B211B]/45">
                  Searching is private · queries are never logged against the patient
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
