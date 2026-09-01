import type { LucideIcon } from 'lucide-react'
import { ArrowUpDown, Check, ChevronRight, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { motion } from 'motion/react'
import { EmptyState } from '@/components/phone/EmptyState'
import { CtaNote, LifecycleButton, type LifecyclePhase } from '@/components/phone/LifecycleButton'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { Row } from '@/components/phone/Row'
import { SheetShell } from '@/components/phone/SheetShell'
import { Switch } from '@/components/phone/Switch'
import type { TileTone } from '@/components/phone/kit'
import { Hero } from '@/components/phone/kit'
import type { CategoryChip, FilterKey } from '@/data/patientCatalogue'
import { factNearby, filterDefs, nearbyByService, sheetFacts } from '@/data/patientCatalogue'
import type { Service } from '@/data/services'
import { cn } from '@/lib/utils'

// ── CatalogueHero.tsx ──
export function CatalogueHero({
  query,
  matchCount,
  onQuery,
}: {
  query: string
  matchCount: number
  onQuery: (q: string) => void
}) {
  return (
    <Hero>
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
        <Search className="h-3 w-3" aria-hidden />
        Service catalogue
      </div>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {matchCount} services match, <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">all caregiver-verified</span>
      </h2>
      <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
        Every category is delivered by licence-checked professionals near you.
      </p>

      <div className="mt-4 flex h-11 items-center gap-2.5 rounded-2xl bg-white/[0.08] px-3.5 transition-colors focus-within:bg-white/[0.12]">
        <Search className="h-4 w-4 shrink-0 text-emerald-100/50" strokeWidth={2.4} aria-hidden />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search care, nurses, medicine"
          aria-label="Search services"
          className="min-w-0 flex-1 bg-transparent text-[13px] font-bold tracking-tight text-white outline-none placeholder:text-emerald-100/35"
        />
        {query && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuery('')}
            aria-label="Clear search"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.1] text-emerald-100/60"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </motion.button>
        )}
      </div>
    </Hero>
  )
}

// ── CategoryRail.tsx ──
export function CategoryRail({
  chips,
  category,
  onSelect,
}: {
  chips: CategoryChip[]
  category: string
  onSelect: (c: string) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chips.map((chip) => {
        const active = category === chip.label
        return (
          <motion.button
            key={chip.label}
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => onSelect(chip.label)}
            aria-pressed={active}
            className={cn(
              'flex h-9 shrink-0 items-center gap-2 rounded-full pl-4 pr-3 text-[11px] font-extrabold tracking-tight transition-colors',
              active
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]'
                : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60 hover:bg-[#0B211B]/[0.08]',
            )}
          >
            {chip.label}
            <span
              className={cn(
                'grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[9.5px] font-extrabold tabular-nums',
                active ? 'bg-white/[0.2] text-white' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/45',
              )}
            >
              {chip.count}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

// ── FiltersSheet.tsx ──
export type ApplyState = 'idle' | 'working' | 'done'

export function FiltersSheet({
  toggles,
  applyState,
  activeCount,
  onToggle,
  onApply,
  onClose,
}: {
  toggles: Record<FilterKey, boolean>
  applyState: ApplyState
  activeCount: number
  onToggle: (key: FilterKey) => void
  onApply: () => void
  onClose: () => void
}) {
  return (
    <SheetShell
      icon={SlidersHorizontal}
      tone={applyState === 'done' ? 'success' : 'info'}
      title={applyState === 'done' ? 'Filters applied' : 'Search filters'}
      subtitle={
        applyState === 'done'
          ? 'Your preferences now shape every search'
          : 'Applied to every search and category'
      }
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <LifecycleButton
            phase={applyState}
            idleIcon={Check}
            idleLabel={
              activeCount > 0
                ? `Apply ${activeCount} ${activeCount === 1 ? 'filter' : 'filters'}`
                : 'Apply filters'
            }
            workingLabel="Applying your preferences"
            doneLabel="Filters applied"
            onPress={onApply}
          />
          <CtaNote>Toggles take effect the moment you apply</CtaNote>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        {filterDefs.map((def) => (
          <div
            key={def.key}
            className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-bold tracking-tight text-[#0B211B]">{def.label}</div>
              <div className="mt-0.5 text-pretty text-[10.5px] font-semibold leading-snug text-[#0B211B]/45">
                {def.sub}
              </div>
            </div>
            <Switch on={toggles[def.key]} onToggle={() => onToggle(def.key)} ariaLabel={def.label} />
          </div>
        ))}
      </div>
    </SheetShell>
  )
}

// ── MatchCard.tsx ──
export function MatchCard({
  state,
  onPress,
}: {
  state: LifecyclePhase
  onPress: () => void
}) {
  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <div className="relative">
        <div className="flex items-start gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.7)]">
            <Sparkles className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">
              Not sure what you need?
            </div>
            <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
              Describe the situation — a few questions and Ayvaa picks the service, schedule and
              caregivers for you.
            </p>
          </div>
        </div>
        <LifecycleButton
          phase={state}
          className="mt-4"
          idleIcon={ArrowUpDown}
          idleLabel="Let Ayvaa match the care for me"
          workingLabel="Preparing your questions"
          doneLabel="Ready in booking"
          onPress={onPress}
        />
      </div>
    </PhaseHero>
  )
}

// ── ServiceList.tsx ──
export type ListedService = {
  service: Service
  icon: LucideIcon
  tone: TileTone
}

export function ServiceList({
  items,
  note,
  query,
  filterCount,
  onPress,
  onReset,
  onClearFilters,
}: {
  items: ListedService[]
  note?: string
  query: string
  filterCount: number
  onPress: (item: ListedService) => void
  onReset: () => void
  onClearFilters: () => void
}) {
  const filteredOut = filterCount > 0
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      {note && (
        <div className="mb-3 rounded-xl bg-blue-500/[0.08] px-3.5 py-2.5">
          <p className="text-pretty text-[10px] font-bold leading-snug text-blue-700">{note}</p>
        </div>
      )}
      {items.length === 0 ? (
        <EmptyState
          container="bare"
          spacing="gap"
          gap="sm"
          padding="sm"
          icon={filteredOut ? SlidersHorizontal : Search}
          tone="emerald"
          badge="soft"
          size="sm"
          title={filteredOut ? 'Your filters hide every service' : `Nothing matches "${query}"`}
          titleClassName="text-[13px] tracking-tight text-[#0B211B]/70"
          body={
            filteredOut
              ? 'The budget cap or another preference excludes this category. Loosen a filter to see more care.'
              : 'Try a different word or clear the category'
          }
          bodyClassName="text-[11px] leading-snug text-[#0B211B]/45"
          action={
            filteredOut
              ? { label: 'Clear all filters', onClick: onClearFilters }
              : { label: 'Reset search', onClick: onReset }
          }
          actionStyle="pill"
        />
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <ServiceRow
              key={item.service.id}
              service={item.service}
              icon={item.icon}
              tone={item.tone}
              onPress={() => onPress(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── ServiceRow.tsx ──
export function ServiceRow({
  service,
  icon: Icon,
  tone,
  onPress,
}: {
  service: Service
  icon: LucideIcon
  tone: TileTone
  onPress: () => void
}) {
  return (
    <Row
      icon={Icon}
      tone={tone}
      align="start"
      title={service.name}
      titleClassName="text-[13px] leading-snug"
      subtitle={service.detail}
      subtitleClassName="text-[11px] leading-snug text-[#0B211B]/50"
      surface="inset"
      padding="comfortable"
      hoverClassName="hover:bg-[#0B211B]/[0.05]"
      showChevron={false}
      trailing={
        <>
          <span className="flex shrink-0 flex-col items-end pt-0.5">
            <span className="text-[12.5px] font-extrabold tabular-nums text-[#0B211B]">{service.from}</span>
            <span className="mt-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/35">
              from / visit
            </span>
          </span>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
        </>
      }
      onClick={onPress}
    />
  )
}

// ── ServiceSheet.tsx ──
export type BookingState = 'idle' | 'working' | 'done'

export function ServiceSheet({
  service,
  icon: Icon,
  bookingState,
  onStart,
  onClose,
}: {
  service: Service
  icon: LucideIcon
  bookingState: BookingState
  onStart: () => void
  onClose: () => void
}) {
  const facts = [factNearby(nearbyByService), ...sheetFacts]
  return (
    <SheetShell
      icon={Icon}
      tone="success"
      title={service.name}
      subtitle={service.category}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <LifecycleButton
            phase={bookingState}
            idleIcon={ChevronRight}
            idleLabel="Start booking"
            workingLabel="Opening your request"
            doneLabel="Booking started"
            onPress={onStart}
          />
          <CtaNote>The estimate you confirm in booking never changes</CtaNote>
        </div>
      }
    >
      <p className="text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/65">
        {service.detail}
      </p>

      <div className="mt-3.5 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">
          Starting price
        </div>
        <div className="mt-1 text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-[#0B211B]">
          {service.from}
          <span className="ml-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">
            per visit
          </span>
        </div>
        <div className="mt-3.5 flex flex-col gap-2.5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">
                {fact.label}
              </span>
              <span className="min-w-0 truncate text-right text-[12px] font-bold text-[#0B211B]/80">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SheetShell>
  )
}
