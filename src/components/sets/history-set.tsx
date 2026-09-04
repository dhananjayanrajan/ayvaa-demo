import { motion } from 'motion/react'
import { dayOf, downloadFile, groupByMonth, recordToFileLines, searchSessions, timeOf } from '@/data/historyData'
import type { HistorySession } from '@/data/historyData'
import { cn } from '@/lib/utils'
import { BellRing, Check, ChevronRight, Download, FileText, Loader2, Search, ShieldAlert, ShieldCheck, Siren, X } from 'lucide-react'
import { Chip, Kicker, Tile } from '@/components/base/phone/kit'
import { PHASE_THEME, PhaseHero } from '@/components/base/phone/phase-hero'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'
import { StepList } from '@/components/base/phone/step-list'
import { QuotePanel } from '@/components/base/phone/quote-panel'
import { useEffect, useRef, useState } from 'react'
import { EmptyState } from '@/components/base/phone/empty-state'
import { SheetShell } from '@/components/base/phone/sheet-shell'

type Props_CareRibbon = {
  sessions: HistorySession[]
  onOpenSession: (s: HistorySession) => void
}

export function CareRibbon({ sessions, onOpenSession }: Props_CareRibbon) {
  return (
    <div>
      <div className="flex h-11 gap-0.5 overflow-hidden rounded-xl bg-white/[0.06]">
        {sessions.map((s, i) => {
          const latest_CareRibbon = i === sessions.length - 1
          return (
            <motion.button
              key={s.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenSession(s)}
              aria-label={`Open visit on ${s.date}`}
              className="relative min-w-0 flex-1"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
                className={cn(
                  'absolute inset-0 origin-left',
                  s.incident
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300'
                    : latest_CareRibbon
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300 shadow-[0_0_18px_rgba(52,211,153,0.5)]'
                      : 'bg-emerald-500/75',
                )}
              />
              {s.note && <span aria-hidden className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white/80" />}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-1.5 flex gap-0.5">
        {sessions.map((s, i) => {
          const latest_CareRibbon = i === sessions.length - 1
          return (
            <span
              key={s.id}
              className={cn(
                'min-w-0 flex-1 text-center font-mono text-[9.5px] font-bold tabular-nums',
                latest_CareRibbon ? 'text-white' : s.incident ? 'text-amber-200/90' : 'text-emerald-100/40',
              )}
            >
              {dayOf(s)}
            </span>
          )
        })}
      </div>
    </div>
  )
}

type Props_DossierHero = {
  sessions: HistorySession[]
  totals: { sessions: number; notes: number; incidents: number }
  sinceMonth: string
  chartId: string
  onOpenSession: (s: HistorySession) => void
}

const accents = {
  clean: {
    theme: PHASE_THEME.emerald,
    chip: 'success' as const,
    StatusIcon: ShieldCheck,
    status: 'All visits clean',
    label: 'text-emerald-200/60',
  },
  resolved: {
    theme: PHASE_THEME.amber,
    chip: 'warning' as const,
    StatusIcon: ShieldCheck,
    status: 'Incidents resolved',
    label: 'text-emerald-200/60',
  },
  open: {
    theme: PHASE_THEME.rose,
    chip: 'danger' as const,
    StatusIcon: ShieldAlert,
    status: 'Incident under review',
    label: 'text-rose-200/60',
  },
} as const

export function DossierHero({ sessions, totals, sinceMonth, chartId, onOpenSession }: Props_DossierHero) {
  const hasOpen = false
  const a = accents[hasOpen ? 'open' : totals.incidents > 0 ? 'resolved' : 'clean']

  return (
    <PhaseHero theme={a.theme}>
      <div className="flex items-center justify-between gap-3">
        <Kicker>Patient dossier</Kicker>
        <Chip intent={a.chip} light icon={a.StatusIcon} className="shrink-0 border-transparent">
          {a.status}
        </Chip>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[18px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[15px] font-black tabular-nums tracking-tight text-emerald-100">
          RS
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[19px] font-extrabold leading-tight tracking-tight text-white">Ramesh Sharma</h2>
          <p className="mt-0.5 text-[11px] font-medium text-emerald-100/50">Elderly care, weekly visits</p>
        </div>
      </div>

      <div className="mt-5">
        <CareRibbon sessions={sessions} onOpenSession={onOpenSession} />
      </div>

      <div className="mt-4 rounded-2xl bg-white/[0.04] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className={cn('text-[9px] font-bold uppercase tracking-[0.16em]', a.label)}>
            {totals.sessions} visits since {sinceMonth}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">{chartId}</span>
        </div>
        <div className="mt-2.5">
          <span className="text-[10.5px] font-semibold text-white/45">
            {totals.notes} notes sent, {totals.incidents} incident{totals.incidents === 1 ? '' : 's'} resolved
          </span>
        </div>
      </div>
    </PhaseHero>
  )
}

export type ExportStatus = 'idle' | 'preparing' | 'saved'

type Props_ExportHistoryButton = {
  status: ExportStatus
  onPress: () => void
}

export function ExportHistoryButton({ status, onPress }: Props_ExportHistoryButton) {
  return (
    <LifecycleButton
      phase={status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working'}
      idleIcon={Download}
      idleLabel="Export session records"
      workingLabel="Preparing export…"
      doneLabel="Export saved to downloads"
      onPress={onPress}
    />
  )
}

type Props_IncidentPanel = {
  incident: string
  resolved?: boolean
}

export function IncidentPanel({ incident, resolved = false }: Props_IncidentPanel) {
  const shell = resolved
    ? { bg: 'bg-[#241A0B]', glow: 'bg-amber-400/15', overline: 'text-amber-200/60', icon: 'text-amber-200/60', text: 'text-amber-50/90', stripBg: 'bg-white/[0.06]', stripText: 'text-amber-50/80' }
    : { bg: 'bg-[#230D14]', glow: 'bg-rose-400/15', overline: 'text-rose-200/60', icon: 'text-rose-200/60', text: 'text-rose-50/90', stripBg: 'bg-rose-400/[0.12]', stripText: 'text-rose-50/85' }
  const OverlineIcon = resolved ? Siren : BellRing

  return (
    <div className={cn('relative overflow-hidden rounded-2xl p-4', shell.bg)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full blur-3xl', shell.glow)} />
      <div className="relative">
        <div className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em]', shell.overline)}>
          <OverlineIcon className="h-3 w-3" strokeWidth={2.5} aria-hidden />
          {resolved ? 'Incident, resolved' : 'Incident, open'}
        </div>
        <p className={cn('mt-2 text-pretty text-[12.5px] font-semibold leading-relaxed', shell.text)}>{incident}</p>

        {resolved ? (
          <div className={cn('mt-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5', shell.stripBg)}>
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400">
              <Check className="h-3 w-3 text-[#062419]" strokeWidth={3.5} aria-hidden />
            </span>
            <span className={cn('min-w-0 flex-1 text-[10.5px] font-bold leading-snug', shell.stripText)}>
              Closed after review. Care resumed the same visit.
            </span>
          </div>
        ) : (
          <div className={cn('mt-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5', shell.stripBg)}>
            <span className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-400">
              <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/50" />
              <Siren className="relative h-3 w-3 text-[#230D14]" strokeWidth={3} aria-hidden />
            </span>
            <span className={cn('min-w-0 flex-1 text-[10.5px] font-bold leading-snug', shell.stripText)}>
              Supervisor and senior ops paged. Care paused until review.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

type Props_MonthTimeline = {
  monthFull: string
  sessions: HistorySession[]
  openId: string | null
  onToggle: (id: string | null) => void
}

export function MonthTimeline({ monthFull, sessions, openId, onToggle }: Props_MonthTimeline) {
  return (
    <div className="flex flex-col gap-3">
      <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
        <div className="flex items-center gap-3 px-1">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">{monthFull}</span>
          <span className="h-px flex-1 bg-[#0B211B]/[0.07]" />
          <Chip intent="neutral">
            {sessions.length} visit{sessions.length > 1 ? 's' : ''}
          </Chip>
        </div>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
        <div className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
          <StepList
            nodeStyle="dot"
            steps={sessions.map((s, i) => {
              const last = i === sessions.length - 1
              const open = openId === s.id
              return {
                key: s.id,
                state: 'done',
                node: (
                  <span
                    className={cn(
                      'relative mt-1.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                      s.incident ? 'bg-amber-400' : 'bg-emerald-500',
                    )}
                  >
                    {open && (
                      <>
                        <span
                          aria-hidden
                          className={cn('absolute h-4 w-4 animate-ping rounded-full', s.incident ? 'bg-amber-400/40' : 'bg-emerald-400/40')}
                        />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                      </>
                    )}
                  </span>
                ),
                railClassName: s.incident ? 'bg-amber-400/[0.25]' : 'bg-emerald-500/[0.18]',
                title: `${monthFull.slice(0, 3)} ${dayOf(s)}`,
                titleClassName: 'font-mono text-[13px] font-extrabold tabular-nums tracking-tight',
                titleMeta:
                  timeOf(s) && (
                    <span className="ml-1.5 font-bold text-[#0B211B]/40">{timeOf(s)}</span>
                  ),
                trailingTitle: (
                  <Chip
                    intent={s.incident ? 'warning' : 'success'}
                    dot={Boolean(s.incident)}
                    className="shrink-0 whitespace-nowrap"
                  >
                    {s.incident ? 'Incident' : 'Complete'}
                  </Chip>
                ),
                body: s.detail,
                bodyClassName: 'line-clamp-2 text-[12px] font-medium leading-relaxed',
                contentClassName: last ? '' : 'pb-5',
                expandable: true,
                open,
                onToggle: () => onToggle(open ? null : s.id),
                expansion: <RecordExpansion session={s} />,
              }
            })}
          />
        </div>
      </motion.div>
    </div>
  )
}

type Props_NotePanel = {
  note: string
}

export function NotePanel({ note }: Props_NotePanel) {
  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <QuotePanel
        bare
        kicker="Your note"
        kickerIcon={ShieldCheck}
        quote={note}
        headerTrailing={
          <Chip intent="success" light className="border-transparent">
            Verbatim
          </Chip>
        }
        footer={
          <p className="mt-2 text-[9.5px] font-semibold text-emerald-100/45">
            Delivered to the family exactly as written.
          </p>
        }
      />
    </PhaseHero>
  )
}

type Status = 'idle' | 'preparing' | 'saved'

type Props_RecordExpansion = {
  session: HistorySession
}

export function RecordExpansion({ session }: Props_RecordExpansion) {
  const [status, setStatus] = useState<Status>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const exportRecord = () => {
    if (status !== 'idle') return
    setStatus('preparing')
    timers.current.push(
      setTimeout(() => {
        downloadFile(
          `ayvaa-session-${session.date.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`,
          recordToFileLines(session),
        )
        setStatus('saved')
      }, 900),
    )
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="flex flex-col gap-2.5 pt-3">
        <div className="rounded-2xl bg-[#0B211B]/[0.035] p-4">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">What was done</div>
          <p className="mt-2 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{session.detail}</p>
        </div>

        {session.note && <NotePanel note={session.note} />}
        {session.incident && <IncidentPanel incident={session.incident} />}

        <button
          type="button"
          onClick={exportRecord}
          disabled={status !== 'idle'}
          aria-disabled={status !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[11.5px] font-bold transition-colors duration-300',
            status === 'saved'
              ? 'bg-emerald-500/[0.14] text-emerald-700'
              : status === 'preparing'
                ? 'cursor-wait bg-[#0B211B]/[0.08] text-[#0B211B]/40'
                : 'bg-[#0B211B]/[0.05] text-[#0B211B]/65 hover:bg-[#0B211B]/[0.09]',
          )}
        >
          {status === 'preparing' ? (
            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden />
          ) : status === 'saved' ? (
            <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.8} aria-hidden />
          ) : (
            <Download className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
          )}
          {status === 'preparing' ? 'Preparing…' : status === 'saved' ? 'Saved to downloads' : 'Export this record'}
        </button>
      </div>
    </motion.div>
  )
}

type Props_SearchSheet = {
  sessions: HistorySession[]
  query: string
  onQueryChange: (q: string) => void
  onClose: () => void
  onOpenSession: (s: HistorySession) => void
}

export function SearchSheet({ sessions, query, onQueryChange, onClose, onOpenSession }: Props_SearchSheet) {
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

type Props_SessionRecordCard = {
  session: HistorySession
  onOpen: () => void
}

export function SessionRecordCard({ session, onOpen }: Props_SessionRecordCard) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onOpen}
      className="block w-full rounded-2xl bg-white p-5 text-left shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)] transition-shadow hover:shadow-[0_1px_2px_rgba(11,33,27,0.06),0_24px_52px_-22px_rgba(11,33,27,0.35)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[15px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">{session.date}</span>
        {session.incident ? (
          <Chip intent="warning" dot className="whitespace-nowrap">
            Incident
          </Chip>
        ) : (
          <Chip intent="success" icon={Check} className="whitespace-nowrap">
            Complete
          </Chip>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/65">{session.detail}</p>

      <div className="mt-3.5 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {session.note && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/[0.1] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-sky-700">
              <FileText className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
              Note sent
            </span>
          )}
          {session.incident && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/[0.1] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-emerald-700">
              <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
              Resolved
            </span>
          )}
        </div>
        <span className="flex shrink-0 items-center gap-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
          Record
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
        </span>
      </div>
    </motion.button>
  )
}