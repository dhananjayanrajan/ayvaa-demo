import { useState } from 'react'
import { CalendarCheck } from 'lucide-react'
import { Card, Chip } from '@/components/base/phone/kit'
import { ExpandRow } from '@/components/base/phone/expand-row'
import { QuotePanel } from '@/components/base/phone/quote-panel'
import { FactRows } from '@/components/base/phone/fact-rows'
import { DownloadReportButton } from '../actions'
import { REPORTS, type CareReport } from '@/data/patientReports'

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
