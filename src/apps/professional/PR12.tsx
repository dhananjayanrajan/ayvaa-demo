import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Lock, Search } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { rise, stagger } from '@/components/phone/kit'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { pastSessions } from '@/data/professionalHistory'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { DossierHero } from '@/components/history/HistorySet'
import { SegmentedTabs } from '@/components/phone/SegmentedTabs'
import { MonthTimeline } from '@/components/history/HistorySet'
import { EmptyState } from '@/components/phone/EmptyState'
import { ExportHistoryButton, type ExportStatus } from '@/components/history/HistorySet'
import { SearchSheet } from '@/components/history/HistorySet'
import {
  buildTotals,
  downloadFile,
  FILTERS,
  filterCounts,
  groupByMonth,
  matchesFilter,
  recordToFileLines,
  type FilterId,
} from '@/data/historyData'

type Sheet = 'none' | 'search'

export function PR12() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [filter, setFilter] = useState<FilterId>('all')
  const [sheet, setSheet] = useState<Sheet>('none')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const close = () => setSheet('none')
  const totals = buildTotals(pastSessions)
  const counts = filterCounts(pastSessions)
  const filtered = pastSessions.filter((s) => matchesFilter(s, filter))
  const groups = groupByMonth(filtered)
  const sinceMonth = groupByMonth(pastSessions)[0]?.monthFull ?? ''

  const openRecord = (id: string) => {
    setFilter('all')
    setOpenId(id)
    close()
  }

  const exportAll = () => {
    if (exportStatus !== 'idle') return
    setExportStatus('preparing')
    timers.current.push(
      setTimeout(() => {
        const lines = ['AYVAA CAREGIVER - SESSION HISTORY', '', ...pastSessions.flatMap((s) => [...recordToFileLines(s), ''])]
        downloadFile('ayvaa-session-history.txt', lines)
        setExportStatus('saved')
        notify({
          title: 'Export saved',
          body: `${totals.sessions} session records written to your downloads.`,
          kind: 'ok',
        })
      }, 1200),
    )
  }

  return (
    <Screen>
      <AppBar
        title="Past sessions"
        subtitle="Ramesh Sharma, completed with you"
        onBack={() => navigate('/professional/pr04')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setSheet('search')}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
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
              <DossierHero
                sessions={pastSessions}
                totals={totals}
                sinceMonth={sinceMonth}
                chartId="RM-0417"
                onOpenSession={(s) => openRecord(s.id)}
              />
            </motion.div>

            <motion.div variants={rise}>
              <SegmentedTabs
                tabs={FILTERS.map((f) => ({ id: f.id, label: f.label, count: counts[f.id] }))}
                value={filter}
                onChange={(id) => setFilter(id as FilterId)}
                layoutId="pr12-filter"
                badgeSize="8.5px"
                count="badge"
              />
            </motion.div>

            {groups.length === 0 ? (
              <motion.div variants={rise}>
                <EmptyState
                  container="plain"
                  icon={Search}
                  tone="neutral"
                  badge="round"
                  size="lg"
                  title="Nothing matches this filter"
                  titleClassName="text-[14px] font-extrabold tracking-tight text-[#0B211B]/70"
                  body="Try All to see the full history"
                  bodyClassName="text-xs text-[#0B211B]/45"
                />
              </motion.div>
            ) : (
              groups.map((g) => (
                <MonthTimeline
                  key={g.monthFull}
                  monthFull={g.monthFull}
                  sessions={g.sessions}
                  openId={openId}
                  onToggle={setOpenId}
                />
              ))
            )}

            <motion.div variants={rise}>
              <NoteStrip intent="info" icon={Lock}>
                Past records are sealed. Your evidence of care delivered, shareable with hospitals or partners only with consent.
              </NoteStrip>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of history" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <ExportHistoryButton status={exportStatus} onPress={exportAll} />
      </FootBar>

      <AnimatePresence>
        {sheet === 'search' && (
          <SearchSheet
            key="search"
            sessions={pastSessions}
            query={query}
            onQueryChange={setQuery}
            onClose={close}
            onOpenSession={(s) => openRecord(s.id)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
