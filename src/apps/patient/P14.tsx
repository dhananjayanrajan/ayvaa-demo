import { motion } from 'motion/react'
import { Lock } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { ReportsHero } from '@/components/reports/ReportsSet'
import { LatestReportCard } from '@/components/reports/ReportsSet'
import { ReportsListCard } from '@/components/reports/ReportsSet'
import { DownloadAllButton } from '@/components/reports/ReportsSet'
import { REPORTS } from '@/data/patientReports'
import { useRouter } from '@/lib/router'

export function P14() {
  const { navigate } = useRouter()

  return (
    <Screen>
      <AppBar
        title="Care reports"
        subtitle="One sealed report per completed month"
        onBack={() => navigate('/patient/p13')}
        trailing={<DownloadAllButton />}
      />
      <BodyArea>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={rise}>
            <ReportsHero />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Latest report" trailing={<Chip intent="success" dot>Month {REPORTS.length}</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <LatestReportCard />
          </motion.div>

          <motion.div variants={rise}>
            <Section label="Earlier reports" trailing={<Chip intent="neutral">{REPORTS.length - 1} sealed</Chip>} />
          </motion.div>

          <motion.div variants={rise}>
            <ReportsListCard />
          </motion.div>

          <motion.div variants={rise}>
            <NoteStrip intent="info" icon={Lock}>
              Reports are sealed when written and can never be edited afterwards. Opening or downloading one is always
              logged in your audit record.
            </NoteStrip>
          </motion.div>

          <motion.div variants={rise}>
            <EndOfScroll label="End of reports" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
