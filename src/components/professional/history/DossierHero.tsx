import { motion } from 'motion/react'
import { ShieldAlert, ShieldCheck } from 'lucide-react'
import { Chip, Kicker } from '@/components/phone/kit'
import { CareRibbon } from './CareRibbon'
import type { HistorySession } from './historyData'
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
    shell: 'border-emerald-200/10 bg-[#0B231C]',
    glowA: 'bg-emerald-400/25',
    glowB: 'bg-teal-300/15',
    chip: 'success' as const,
    StatusIcon: ShieldCheck,
    status: 'All visits clean',
    label: 'text-emerald-200/60',
  },
  resolved: {
    shell: 'border-amber-200/10 bg-[#0B231C]',
    glowA: 'bg-emerald-400/20',
    glowB: 'bg-amber-300/15',
    chip: 'warning' as const,
    StatusIcon: ShieldCheck,
    status: 'Incidents resolved',
    label: 'text-emerald-200/60',
  },
  open: {
    shell: 'border-rose-200/10 bg-[#230D14]',
    glowA: 'bg-rose-400/25',
    glowB: 'bg-emerald-300/10',
    chip: 'danger' as const,
    StatusIcon: ShieldAlert,
    status: 'Incident under review',
    label: 'text-rose-200/60',
  },
} as const

export function DossierHero({ sessions, totals, sinceMonth, chartId, onOpenSession }: Props) {
  const hasOpen = false
  const accent = hasOpen ? 'open' : totals.incidents > 0 ? 'resolved' : 'clean'
  const a = accents[hasOpen ? 'open' : accent]

  return (
    <div className={cn('relative overflow-hidden rounded-[26px] border p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]', a.shell)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl', a.glowA)} />
      <div aria-hidden className={cn('pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl', a.glowB)} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative">
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
          <div className="mt-2.5 flex items-center justify-between gap-3 border-none pl-0">
            <span className="text-[10.5px] font-semibold text-white/45">
              {totals.notes} notes sent, {totals.incidents} incident{totals.incidents === 1 ? '' : 's'} resolved
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
