import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SlidersHorizontal, Stethoscope } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { CatalogueHero } from '@/components/patient/catalogue/CatalogueHero'
import { CategoryRail } from '@/components/patient/catalogue/CategoryRail'
import { ServiceList } from '@/components/patient/catalogue/ServiceList'
import type { ListedService } from '@/components/patient/catalogue/ServiceList'
import { MatchCard } from '@/components/patient/catalogue/MatchCard'
import type { LifecyclePhase } from '@/components/phone/LifecycleButton'
import { FiltersSheet } from '@/components/patient/catalogue/FiltersSheet'
import type { ApplyState } from '@/components/patient/catalogue/FiltersSheet'
import { ServiceSheet } from '@/components/patient/catalogue/ServiceSheet'
import type { BookingState } from '@/components/patient/catalogue/ServiceSheet'
import {
  BUDGET_LIMIT,
  buildCategoryChips,
  iconFor,
  parseFromPrice,
  toneFor,
} from '@/data/patientCatalogue'
import type { FilterKey } from '@/data/patientCatalogue'
import { services } from '@/data/services'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const defaultToggles: Record<FilterKey, boolean> = {
  nearFirst: true,
  budget: false,
  femalePref: false,
}

export function P08() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [category, setCategory] = useState('All services')
  const [selected, setSelected] = useState<ListedService | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [toggles, setToggles] = useState<Record<FilterKey, boolean>>(defaultToggles)
  const [applyState, setApplyState] = useState<ApplyState>('idle')
  const [matchState, setMatchState] = useState<LifecyclePhase>('idle')
  const [bookingState, setBookingState] = useState<BookingState>('idle')

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 180)
    return () => clearTimeout(t)
  }, [query])

  function stage(delay: number, run: () => void) {
    timers.current.push(setTimeout(run, delay))
  }

  const chips = useMemo(() => buildCategoryChips(), [])

  const activeFilters = Object.values(toggles).filter(Boolean).length
  const appliedBudget = toggles.budget
  const appliedNear = toggles.nearFirst
  const appliedFemale = toggles.femalePref

  const listed: ListedService[] = useMemo(
    () =>
      services.map((service) => ({ service, icon: iconFor(service), tone: toneFor(service) })),
    [],
  )

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    return listed.filter(({ service }) => {
      const inCat = category === 'All services' || service.category === category
      const inQuery =
        q === '' || service.name.toLowerCase().includes(q) || service.detail.toLowerCase().includes(q)
      const inBudget = !appliedBudget || parseFromPrice(service.from) <= BUDGET_LIMIT
      return inCat && inQuery && inBudget
    })
  }, [listed, debouncedQuery, category, appliedBudget])

  const notes: string[] = []
  if (appliedBudget) notes.push('Budget filter on — only services under ₹1,000 per visit are shown.')
  if (appliedFemale)
    notes.push('Offers will prefer female caregivers where rosters allow, never guaranteed.')

  function closeSheets() {
    if (applyState === 'working' || bookingState === 'working' || matchState === 'working') {
      timers.current.forEach(clearTimeout)
      timers.current = []
      setApplyState('idle')
      setBookingState('idle')
      setMatchState('idle')
    }
    setFiltersOpen(false)
    setSelected(null)
  }

  function toggleFilter(key: FilterKey) {
    setToggles((t) => ({ ...t, [key]: !t[key] }))
  }

  function clearFilters() {
    setToggles(defaultToggles)
    notify({ title: 'Filters cleared', body: 'Every service is visible again', kind: 'info' })
  }

  function applyFilters() {
    if (applyState !== 'idle') return
    setApplyState('working')
    stage(850, () => setApplyState('done'))
    stage(1400, () => {
      setApplyState('idle')
      setFiltersOpen(false)
      notify({
        title: 'Filters applied',
        body: 'Search now respects your preferences',
        kind: 'ok',
      })
    })
  }

  function startMatch() {
    if (matchState !== 'idle') return
    setMatchState('working')
    stage(950, () => setMatchState('done'))
    stage(1550, () => navigate('/patient/p09'))
  }

  function startBooking() {
    if (!selected || bookingState !== 'idle') return
    setBookingState('working')
    stage(900, () => setBookingState('done'))
    stage(1500, () => {
      notify({
        title: selected.service.name,
        body: 'Starting a booking for this service',
        kind: 'ok',
      })
      navigate('/patient/p09')
    })
  }

  return (
    <Screen>
      <AppBar
        title="Find care"
        subtitle={`${services.length} services · verified caregivers only`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setFiltersOpen(true)}
            aria-label="Filters"
            className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <SlidersHorizontal className="size-[18px]" strokeWidth={2.2} aria-hidden />
            {activeFilters > 0 && (
              <span className="absolute right-2 top-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-emerald-500 text-[7px] font-extrabold tabular-nums text-white">
                {activeFilters}
              </span>
            )}
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <CatalogueHero query={query} matchCount={filtered.length} onQuery={setQuery} />
            </motion.div>

            <motion.div variants={rise}>
              <CategoryRail chips={chips} category={category} onSelect={setCategory} />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label={`${filtered.length} found`}
                trailing={<Chip intent="info">{appliedNear ? 'Nearest first' : 'Listed'}</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <ServiceList
                items={filtered}
                note={notes.length > 0 ? notes.join(' ') : undefined}
                query={query}
                filterCount={activeFilters}
                onPress={setSelected}
                onReset={() => {
                  setQuery('')
                  setDebouncedQuery('')
                  setCategory('All services')
                }}
                onClearFilters={clearFilters}
              />
            </motion.div>

            <motion.div variants={rise}>
              <MatchCard state={matchState} onPress={startMatch} />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Stethoscope} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Prices shown are starting points — the final estimate appears in booking and never
                  changes after you confirm.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of catalogue" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {(selected || filtersOpen) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSheets}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <ServiceSheet
            key="service-sheet"
            service={selected.service}
            icon={selected.icon}
            bookingState={bookingState}
            onStart={startBooking}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {filtersOpen && (
          <FiltersSheet
            key="filters-sheet"
            toggles={toggles}
            applyState={applyState}
            activeCount={activeFilters}
            onToggle={toggleFilter}
            onApply={applyFilters}
            onClose={() => setFiltersOpen(false)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
