import { useState } from 'react'
import { motion } from 'motion/react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { SegmentedTabs } from '@/components/phone/SegmentedTabs'
import { FlaggedAccountCard } from '@/components/admin/accounts/FlaggedAccountCard'
import { RecentActivityList } from '@/components/admin/accounts/RecentActivityList'
import { PrivacyRulesCard } from '@/components/admin/accounts/PrivacyRulesCard'
import { AccountActionsSheet } from '@/components/admin/sheets/AccountActionsSheet'
import { recentActivity, flaggedAccount, accountFilters, filterRoleMap } from '@/data/admin/a04Data'
import { DirectoryHero } from '@/components/admin/heroes/DirectoryHero'

export function A04() {
  const { notify } = useDemo()
  const [filter, setFilter] = useState('all')
  const [sheetOpen, setSheetOpen] = useState(false)

  const visibleCount = filter === 'all' ? recentActivity.length : recentActivity.filter((a) => filterRoleMap[filter].includes(a.role)).length

  return (
    <Screen>
      <AppBar
        title="Accounts"
        subtitle="Patients · professionals · partners"
        trailing={<AgentAvatar seed="ayvaa-accounts" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <DirectoryHero onSelect={(name: string) => notify({ title: 'Account opened', body: `Viewing ${name} · access logged`, kind: 'info' })} />
            </motion.div>

            <motion.div variants={rise}>
              <SegmentedTabs
                tabs={accountFilters}
                value={filter}
                onChange={setFilter}
                layoutId="a04-filter"
              />
            </motion.div>

            {filter === 'all' && <FlaggedAccountCard notify={notify} onMoreActions={() => setSheetOpen(true)} />}

            <motion.div variants={rise}>
              <Section label="Recent activity" trailing={<Chip intent="neutral">{visibleCount} shown</Chip>} />
            </motion.div>

            <RecentActivityList filter={filter} notify={notify} />

            <PrivacyRulesCard />

            <motion.div variants={rise}>
              <EndOfScroll label="End of accounts" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AccountActionsSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        notify={notify}
        accountName={flaggedAccount.name}
      />
    </Screen>
  )
}
