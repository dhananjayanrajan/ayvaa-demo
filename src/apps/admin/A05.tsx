import { useState } from 'react'
import { motion } from 'motion/react'
import AgentAvatar from '@/components/base/smoothui/agent-avatar'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, Screen } from '@/components/base/phone/screen'
import { Card, Chip, Section, rise, stagger } from '@/components/base/phone/kit'
import { auditEntries, PAGE_SIZE } from '@/data/admin/a05Data'
import { useDemo } from '@/lib/store'
import { Pager } from '@/components/base/phone/pager'
import { LedgerChainHero } from '@/components/patterns/heroes/ledger-chain-hero'
import { AuditEntryList } from '@/components/patterns/lists/audit-entry-list'
import { CustomRangePicker } from '@/components/patterns/pickers/custom-range-picker'
import { ComplianceToolsList } from '@/components/patterns/lists/compliance-tools-list'
import { LedgerRangeFilter } from '@/components/patterns/forms/ledger-range-filter'
import { ExportActionButton } from '@/components/patterns/actions'
import { AppendOnlyCard } from '@/components/patterns/cards/compliance-info-cards'

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
              <LedgerRangeFilter value={range} onChange={setRange} onResetPage={() => setPage(1)} />
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

            <motion.div variants={rise}>
              <AppendOnlyCard />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Compliance tools" trailing={<Chip intent="info">Deep dives</Chip>} />
            </motion.div>

            <ComplianceToolsList />

            <motion.div variants={rise}>
              <ExportActionButton label="Export today's log" onClick={() => notify({ title: 'Export queued', body: "Today's log will be emailed to you", kind: 'info' })} />
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
