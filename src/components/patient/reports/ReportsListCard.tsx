import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarCheck, ChevronDown } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { DownloadReportButton } from './DownloadReportButton'
import { REPORTS, type CareReport } from '@/data/patientReports'

function ReportRow({ report, open, onToggle }: { report: CareReport; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl bg-[#0B211B]/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
      >
        <Tile icon={CalendarCheck} tone={report.trend === 'improving' ? 'success' : 'neutral'} />
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">{report.month}</span>
          <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/50">
            {report.visitsCount} visits, sealed {report.sealedOn}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <Chip intent={report.trend === 'improving' ? 'success' : 'neutral'}>{report.trendLabel}</Chip>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="rounded-2xl bg-white/[0.55] px-4 py-3.5">
                <div className="flex flex-col gap-3">
                  {report.highlights.map((h) => (
                    <div key={h.label} className="flex items-baseline justify-between gap-4">
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">{h.label}</span>
                      <span className="text-right text-[12.5px] font-bold tabular-nums leading-snug text-[#0B211B]/80">{h.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 rounded-[20px] bg-[#0B231C] p-4">
                <p className="font-serif text-pretty text-[12.5px] font-medium leading-relaxed text-white/90">
                  &ldquo;{report.conclusion}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-extrabold text-emerald-200">
                    {report.authorInitial}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/80">{report.author}</span>
                  <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                    Sealed
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <DownloadReportButton report={report} variant="ghost" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
