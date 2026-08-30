import { CalendarCheck, Quote } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { FactRows } from '@/components/patient/plan/FactRows'
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
