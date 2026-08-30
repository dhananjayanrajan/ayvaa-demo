import { useState } from 'react'
import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Section, rise, stagger } from '@/components/phone/kit'
import { auditEntries } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { FilterBar } from '@/components/admin/ui/FilterBar'
import { Pager } from '@/components/phone/Pager'
import { LedgerChainHero } from '@/components/admin/audit/LedgerChainHero'
import { AuditEntryList } from '@/components/admin/audit/AuditEntryList'
import { CustomRangePicker } from '@/components/admin/audit/CustomRangePicker'
import { AppendOnlyCard } from '@/components/admin/audit/AppendOnlyCard'
import { ComplianceToolsList } from '@/components/admin/audit/ComplianceToolsList'

const ranges = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'custom', label: 'Custom' },
]

const PAGE_SIZE = 4

export function A05() {
  const { notify } = useDemo()
  const [page, setPage] = useState(1)
  const [range, setRange] = useState('today')

  const allEntries = range === 'week' ? auditEntries.slice(0, 8) : range === 'today' ? auditEntries : []
  const totalEntries = allEntries.length
  const totalPages = Math.max(1, Math.ceil(totalEntries / PAGE_SIZE))
  const pageEntries = allEntries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const rangeLabel = range === 'today' ? 'Live feed · today' : 'Live feed · this week'

  return (
    <Screen>
      <AppBar
        title="Audit log"
        subtitle="Every action · every access"
        trailing={<AgentAvatar seed="ayvaa-audit" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <LedgerChainHero todayCount={totalEntries} />
            </motion.div>

            <motion.div variants={rise}>
              <FilterBar
                value={range}
                onChange={(r) => {
                  setRange(r)
                  setPage(1)
                }}
                layoutId="a05-range"
                items={ranges}
              />
            </motion.div>

            {range !== 'custom' ? (
              <>
                <AuditEntryList
                  entries={pageEntries}
                  totalEntries={totalEntries}
                  rangeLabel={rangeLabel}
                  notify={notify}
                />
                <motion.div variants={rise}>
                  <Card>
                    <Pager page={page} totalPages={totalPages} onPageChange={setPage} layoutId="a05-page" />
                  </Card>
                </motion.div>
              </>
            ) : (
              <CustomRangePicker notify={notify} />
            )}

            <AppendOnlyCard />

            <motion.div variants={rise}>
              <Section label="Compliance tools" trailing={<Chip intent="info">Deep dives</Chip>} />
            </motion.div>

            <ComplianceToolsList />

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => notify({ title: 'Export queued', body: "Today's log will be emailed to you", kind: 'info' })}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)]"
              >
                <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Export today's log
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of audit log" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
