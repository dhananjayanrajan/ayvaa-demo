import { useEffect, useRef, useState } from 'react'
import { CalendarCheck, Check, Download, Loader2, Lock, Quote } from 'lucide-react'
import { IconLifecycleButton } from '@/components/phone/LifecycleButton'
import { REPORTS, REPORTS_LATEST, downloadAllLines, downloadTextFile, reportFileLines, reportFileName, totalReportedVisits, type CareReport } from '@/data/patientReports'
import { useDemo } from '@/lib/store'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { FactRows } from '@/components/phone/FactRows'
import { useRouter } from '@/lib/router'
import { AccentHero } from '@/components/phone/AccentHero'
import { HeroHighlight, HeroTopRow } from '@/components/phone/HeroCells'
import { ExpandRow } from '@/components/phone/ExpandRow'

export function DownloadAllButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        downloadTextFile(downloadAllLines(), 'ayvaa-care-reports-archive.txt')
        setPhase('done')
      }, 800),
    )
    timers.current.push(
      setTimeout(() => {
        notify({ title: 'Archive saved', body: `All ${REPORTS.length} sealed reports downloaded as one file`, kind: 'ok' })
      }, 900),
    )
  }

  return (
    <IconLifecycleButton
      phase={phase}
      icon={Download}
      revert={false}
      ariaLabel={phase === 'done' ? 'Archive saved' : 'Download all reports'}
      onPress={run}
    />
  )
}

interface DownloadReportButtonProps {
  report: CareReport
  variant?: 'primary' | 'ghost'
  label?: string
}

type Phase = 'idle' | 'working' | 'done'

export function DownloadReportButton({ report, variant = 'primary', label = 'Download report' }: DownloadReportButtonProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        downloadTextFile(reportFileLines(report), reportFileName(report))
        setPhase('done')
      }, 700),
    )
    timers.current.push(
      setTimeout(() => {
        notify({ title: 'Report saved', body: `${report.month} downloaded and the view logged in your audit record`, kind: 'ok' })
      }, 800),
    )
  }

  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
      onClick={run}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-extrabold transition-colors',
        variant === 'primary'
          ? phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-600/60 text-white'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : phase === 'done'
            ? 'bg-emerald-500/[0.14] text-emerald-700'
            : phase === 'working'
              ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/40'
              : 'bg-emerald-500/[0.12] text-emerald-700',
      )}
    >
      {phase === 'idle' && (
        <>
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          {label}
        </>
      )}
      {phase === 'working' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Preparing…
        </>
      )}
      {phase === 'done' && (
        <>
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          Saved
        </>
      )}
    </motion.button>
  )
}

export function LatestReportCard() {
  const { navigate } = useRouter()
  const report = REPORTS_LATEST

  return (
    <Card intent="success">
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={CalendarCheck} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{report.label}</span>
              <Chip intent="success">{report.trendLabel}</Chip>
            </div>
            <p className="mt-1 text-[11px] font-medium leading-snug text-[#0B211B]/50">
              Sealed {report.sealedOn}, signed by {report.author}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
          <FactRows rows={report.highlights} tone="light" />
        </div>

        <div className="mt-3">
          <QuotePanel
            kicker="Conclusion"
            kickerIcon={Quote}
            quote={report.conclusion}
            author={report.author}
            authorInitial={report.authorInitial}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          <DownloadReportButton report={report} />
          <button
            type="button"
            onClick={() => navigate('/patient/p13')}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-extrabold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08]"
          >
            <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Open care plan
          </button>
        </div>
      </div>
    </Card>
  )
}

export function ReportsHero() {
  const visits = totalReportedVisits()

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        icon={Lock}
        label="Sealed archive"
        trailing={
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums text-emerald-100/40">
            {REPORTS.length} reports
          </span>
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Three months, <HeroHighlight>steadily better</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        Written by the caregiver, sealed when written, never edited after.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl bg-white/[0.06]">
        {REPORTS.map((report, i) => (
          <div key={report.id}>
            {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
            <div className="flex items-center gap-3 px-3.5 py-3">
              <span
                aria-hidden
                className={cn(
                  'h-2 w-2 shrink-0 rounded-full',
                  i === 0 ? 'bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]' : 'bg-emerald-300/25',
                )}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-extrabold tracking-tight text-white">
                  {report.month}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">
                  {report.visitsCount} visits
                </span>
              </span>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em]',
                  report.trend === 'improving' ? 'bg-emerald-400/[0.16] text-emerald-200' : 'bg-white/[0.08] text-white/50',
                )}
              >
                {report.trendLabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Visits covered</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">{visits}</span>
      </div>
    </AccentHero>
  )
}

function ReportRow({ report, open, onToggle }: { report: CareReport; open: boolean; onToggle: () => void }) {
  return (
    <ExpandRow
      icon={CalendarCheck}
      tone={report.trend === 'improving' ? 'success' : 'neutral'}
      dense={false}
      open={open}
      onToggle={onToggle}
      title={report.month}
      sub={`${report.visitsCount} visits, sealed ${report.sealedOn}`}
      trailing={
        <Chip intent={report.trend === 'improving' ? 'success' : 'neutral'}>{report.trendLabel}</Chip>
      }
    >
      <div className="rounded-2xl bg-white/[0.55] px-4 py-3.5">
        <FactRows rows={report.highlights} tone="light" />
      </div>

      <div className="mt-3">
        <QuotePanel
          quote={report.conclusion}
          author={report.author}
          authorInitial={report.authorInitial}
          badge="Sealed"
        />
      </div>

      <div className="mt-3">
        <DownloadReportButton report={report} variant="ghost" />
      </div>
    </ExpandRow>
  )
}

export function ReportsListCard() {
  const [openId, setOpenId] = useState<string | null>(null)
  const earlier = REPORTS.slice(1)

  return (
    <Card>
      <div className="flex flex-col gap-2.5 p-3">
        {earlier.map((report) => (
          <ReportRow
            key={report.id}
            report={report}
            open={openId === report.id}
            onToggle={() => setOpenId((prev) => (prev === report.id ? null : report.id))}
          />
        ))}
      </div>
    </Card>
  )
}