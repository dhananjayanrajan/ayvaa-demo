import { useState } from 'react'
import { motion } from 'motion/react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Hero,
  Kicker,
  Section,
  Stat,
  rise,
  stagger,
} from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { FilterBar } from '@/components/admin/ui/FilterBar'
import { AccountSearch } from '@/components/admin/accounts/AccountSearch'
import { FlaggedAccountCard } from '@/components/admin/accounts/FlaggedAccountCard'
import { RecentActivityList } from '@/components/admin/accounts/RecentActivityList'
import { PrivacyRulesCard } from '@/components/admin/accounts/PrivacyRulesCard'
import { AccountActionsSheet } from '@/components/admin/sheets/AccountActionsSheet'
import { recentActivity, flaggedAccount } from '@/data/seed'

const accountFilters = [
  { id: 'all', label: 'All' },
  { id: 'patients', label: 'Patients' },
  { id: 'pros', label: 'Pros' },
  { id: 'partners', label: 'Partners' },
]

const filterRoleMap: Record<string, string[]> = {
  all: ['Partner', 'Guardian', 'RN'],
  patients: ['Guardian'],
  pros: ['RN'],
  partners: ['Partner'],
}

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
              <Hero className="overflow-visible">
                <Kicker>Directory · live</Kicker>
                <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  One console,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">every account</span>
                </h2>

                <div className="relative z-30 mt-4">
                  <AccountSearch
                    onSelect={(name) =>
                      notify({ title: 'Account opened', body: `Viewing ${name} · access logged`, kind: 'info' })
                    }
                  />
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Patients" value="1,284" dot="bg-emerald-300" />
                  <Stat label="Pros" value="642" dot="bg-teal-300" />
                  <Stat label="Partners" value="415" dot="bg-sky-300/80" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="danger" light dot>1 flagged</Chip>
                  <Chip intent="warning" light>3 reviews pending</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <FilterBar
                value={filter}
                onChange={setFilter}
                layoutId="a04-filter"
                items={accountFilters}
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
