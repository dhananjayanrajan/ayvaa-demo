import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Filter, Plus, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { NoteStrip } from '@/components/phone/NoteStrip'
import { StaticButton } from '@/components/phone/LifecycleButton'
import { VisitsHero } from '@/components/visits/VisitsSet'
import { SegmentedTabs } from '@/components/phone/SegmentedTabs'

type VisitTab = 'upcoming' | 'completed' | 'missed'
import { LiveVisitCard } from '@/components/visits/VisitsSet'
import { UpcomingCard } from '@/components/visits/VisitsSet'
import { CompletedCard } from '@/components/visits/VisitsSet'
import { MissedCard } from '@/components/visits/VisitsSet'
import { EmptyTabState } from '@/components/visits/VisitsSet'
import { FilterSheet } from '@/components/visits/VisitsSet'
import {
  activeFilterCount,
  applyVisitFilters,
  completedVisits,
  emptyVisitFilters,
  missedVisits,
  upcomingVisits,
  type VisitFilters,
} from '@/data/patientVisits'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

export function P15() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [tab, setTab] = useState<VisitTab>('upcoming')
  const [filters, setFilters] = useState<VisitFilters>(emptyVisitFilters)
  const [sheet, setSheet] = useState(false)

  const filterCount = activeFilterCount(filters)
  const counts: Record<VisitTab, number> = {
    upcoming: applyVisitFilters(upcomingVisits(), filters).length,
    completed: applyVisitFilters(completedVisits(), filters).length,
    missed: missedVisits().length,
  }

  const applyFilters = (next: VisitFilters) => {
    setSheet(false)
    setFilters(next)
    const n = activeFilterCount(next)
    notify({
      title: n > 0 ? 'Filters applied' : 'Filters cleared',
      body: n > 0 ? `${n} filter${n > 1 ? 's' : ''} now shape every tab` : 'The full visit ledger is shown again',
      kind: 'info',
    })
  }

  return (
    <Screen>
      <AppBar
        title="Visits"
        subtitle="Every session delivered, verified and sealed"
        onBack={() => navigate('/patient/p13')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setSheet(true)}
            aria-label={`Filter visits, ${filterCount} active`}
            className={cn(
              'relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors',
              filterCount > 0 ? 'bg-sky-500/[0.14] text-sky-700' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60',
            )}
          >
            <Filter className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
            {filterCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-sky-600 text-[9px] font-extrabold tabular-nums text-white">
                {filterCount}
              </span>
            )}
          </motion.button>
        }
      />
      <BodyArea>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={rise}>
            <VisitsHero />
          </motion.div>

          <motion.div variants={rise}>
            <SegmentedTabs
              tabs={[
                { id: 'upcoming', label: 'Upcoming' },
                { id: 'completed', label: 'Done' },
                { id: 'missed', label: 'Missed' },
              ]}
              value={tab}
              onChange={(id) => setTab(id as VisitTab)}
              layoutId="p15-tab"
              tone="emeraldSolid"
              labelSize="10px"
              tracking="0.08em"
              count="badge"
              badgeClassName="leading-none"
            />
          </motion.div>

          {tab === 'upcoming' && (
            <>
              <motion.div variants={rise}>
                <LiveVisitCard />
              </motion.div>

              <motion.div variants={rise}>
                <Section label="Scheduled" trailing={<Chip intent="neutral">{counts.upcoming} visits</Chip>} />
              </motion.div>

              <motion.div variants={rise}>
                <UpcomingCard filters={filters} onClearFilters={() => applyFilters(emptyVisitFilters)} />
              </motion.div>
            </>
          )}

          {tab === 'completed' && (
            <motion.div variants={rise}>
              <CompletedCard filters={filters} onClearFilters={() => applyFilters(emptyVisitFilters)} />
            </motion.div>
          )}

          {tab === 'missed' && (
            <motion.div variants={rise}>
              {counts.missed > 0 ? <MissedCard /> : <EmptyTabState cause="all-good" label="missed visits" onClearFilters={() => {}} />}
            </motion.div>
          )}

          <motion.div variants={rise}>
            <NoteStrip intent="info" icon={ShieldCheck}>
              Every visit on this list is verified by GPS check-in. What happened is recorded, sealed and shared with you.
            </NoteStrip>
          </motion.div>

          <motion.div variants={rise}>
            <StaticButton tone="success" icon={Plus} onClick={() => navigate('/patient/p09')}>
              Book another service
            </StaticButton>
          </motion.div>

          <motion.div variants={rise}>
            <EndOfScroll label="End of visits" />
          </motion.div>
        </motion.div>
      </BodyArea>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSheet(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && (
          <FilterSheet
            key="filter-sheet"
            initial={filters}
            visibleCount={counts[tab]}
            onApply={applyFilters}
            onClose={() => setSheet(false)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
