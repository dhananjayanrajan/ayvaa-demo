import { ShieldAlert, ShieldCheck } from 'lucide-react'
import { Chip, Kicker } from '@/components/phone/kit'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { CareRibbon } from './CareRibbon'
import type { HistorySession } from '@/data/historyData'
import { cn } from '@/lib/utils'

type Props = {
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

export function DossierHero({ sessions, totals, sinceMonth, chartId, onOpenSession }: Props) {
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
