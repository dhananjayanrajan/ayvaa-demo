import { CalendarCheck, Quote } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import { DownloadReportButton } from './DownloadReportButton'
import { REPORTS_LATEST } from '@/data/patientReports'

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
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">
            <Quote className="h-3 w-3" aria-hidden />
            Conclusion
          </span>
          <p className="mt-2.5 font-serif text-pretty text-[13px] font-medium leading-relaxed text-white/90">
            &ldquo;{report.conclusion}&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-extrabold text-emerald-200">
              {report.authorInitial}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/80">{report.author}</span>
            <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
              Verified
            </span>
          </div>
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
