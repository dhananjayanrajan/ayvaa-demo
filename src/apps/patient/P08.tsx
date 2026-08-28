import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Accessibility,
  Activity,
  ArrowUpDown,
  Baby,
  Brain,
  Check,
  ChevronRight,
  Flower2,
  HeartHandshake,
  Search,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Hero, Kicker, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { serviceCategories, services, type Service } from '@/data/services'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

function iconFor(s: Service): LucideIcon {
  if (s.name.startsWith('Certified')) return Stethoscope
  if (s.name.startsWith('Post-operative')) return HeartHandshake
  if (s.name.startsWith('Physio')) return Activity
  if (s.name.startsWith('Pediatric')) return Baby
  if (s.name.startsWith('Chronic')) return Brain
  if (s.name.startsWith('Palliative')) return Flower2
  if (s.name.startsWith('Disability')) return Accessibility
  if (s.name.startsWith('Special')) return Sparkles
  return HeartHandshake
}

function toneFor(s: Service): TileTone {
  if (s.name.startsWith('Chronic')) return 'warning'
  if (s.name.startsWith('Palliative')) return 'warning'
  if (s.name.startsWith('Physio')) return 'info'
  if (s.name.startsWith('Pediatric')) return 'info'
  return 'success'
}

function LeaderRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline">
      <span className="shrink-0 text-[11.5px] font-semibold text-[#0B211B]/55">{k}</span>
      <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
      <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{v}</span>
    </div>
  )
}

export function P08() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [query, setQuery] = useState('home care')
  const [category, setCategory] = useState('All services')
  const [selected, setSelected] = useState<Service | null>(null)
  const [filters, setFilters] = useState(false)
  const [nearFirst, setNearFirst] = useState(true)
  const [budget, setBudget] = useState(false)
  const [femalePref, setFemalePref] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return services.filter((s) => {
      const inCat = category === 'All services' || s.category === category
      const inQuery = q === '' || s.name.toLowerCase().includes(q) || s.detail.toLowerCase().includes(q)
      return inCat && inQuery
    })
  }, [query, category])

  const activeFilters = [nearFirst, budget, femalePref].filter(Boolean).length

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
            onClick={() => setFilters(true)}
            aria-label="Filters"
            className="relative grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <SlidersHorizontal className="size-[18px]" strokeWidth={2.2} aria-hidden />
            {activeFilters > 0 && (
              <span className="absolute right-2 top-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-emerald-500 text-[7px] font-extrabold text-white">
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
              <Hero>
                <Kicker>
                  <Search className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Service catalogue
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {filtered.length} services match,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                    all caregiver-verified
                  </span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Every category is delivered by licence-checked professionals near you.
                </p>

                <div className="mt-4 flex h-11 items-center gap-2.5 rounded-2xl bg-white/[0.08] px-3.5 transition-colors focus-within:bg-white/[0.12]">
                  <Search className="h-4 w-4 shrink-0 text-emerald-100/50" strokeWidth={2.4} aria-hidden />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search care, nurses, medicine"
                    className="min-w-0 flex-1 bg-transparent text-[13px] font-bold tracking-tight text-white outline-none placeholder:text-emerald-100/35"
                  />
                  {query && (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuery('')}
                      aria-label="Clear search"
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.1] text-emerald-100/60"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden />
                    </motion.button>
                  )}
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {serviceCategories.map((c) => {
                  const active = category === c
                  return (
                    <motion.button
                      key={c}
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setCategory(c)}
                      className={cn(
                        'flex h-8 shrink-0 items-center rounded-full px-3.5 text-[10.5px] font-extrabold uppercase tracking-[0.08em] transition-colors',
                        active
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]'
                          : 'bg-[#0B211B]/[0.05] text-[#0B211B]/50 hover:bg-[#0B211B]/[0.08]',
                      )}
                    >
                      {c}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label={`${filtered.length} found`} trailing={<Chip intent="info">{nearFirst ? 'Nearest first' : 'Listed'}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
                {filtered.map((s, i) => {
                  const Icon = iconFor(s)
                  return (
                    <div key={s.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelected(s)}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={Icon} tone={toneFor(s)} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{s.name}</span>
                          <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">{s.detail}</span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className="font-mono text-[11.5px] font-bold tabular-nums text-[#0B211B]">{s.from}</span>
                          <span className="text-[8.5px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/35">from / visit</span>
                        </span>
                      </motion.button>
                    </div>
                  )
                })}
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center gap-2 px-5 py-8 text-center">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0B211B]/[0.05] text-[#0B211B]/35">
                      <Search className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                    </span>
                    <span className="max-w-full truncate text-[13px] font-bold text-[#0B211B]/70">Nothing matches "{query}"</span>
                    <span className="text-[11px] font-medium text-[#0B211B]/45">Try a different word or clear the category</span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setQuery('')
                        setCategory('All services')
                      }}
                      className="mt-1 rounded-full bg-emerald-500/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-700"
                    >
                      Reset search
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start gap-3.5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.7)]">
                      <Sparkles className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-white">
                        Not sure what you need?
                      </div>
                      <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/55">
                        Describe the situation — a few questions and Ayvaa picks the service, schedule and caregivers for you.
                      </p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      notify({ title: 'Guided matching', body: 'A few questions and we will suggest the right care', kind: 'info' })
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                  >
                    <ArrowUpDown className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Let Ayvaa match the care for me</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Stethoscope} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Prices shown are starting points — the final estimate appears in booking and never changes after you confirm.
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
        {(selected || filters) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelected(null)
              setFilters(false)
            }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="service"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  {(() => {
                    const Icon = iconFor(selected)
                    return <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                  })()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{selected.name}</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">{selected.category}</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelected(null)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <p className="text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/65">{selected.detail}</p>

              <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <div className="flex flex-col gap-2.5">
                  <LeaderRow k="Starting price" v={`${selected.from} / visit`} />
                  <LeaderRow k="First visit" v="Includes assessment" />
                  <LeaderRow k="Caregivers nearby" v="14 available" />
                  <LeaderRow k="Cancellation" v="Free till 24 h" />
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  notify({ title: selected.name, body: 'Starting a booking for this service', kind: 'ok' })
                  setSelected(null)
                  navigate('/patient/p09')
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Start booking</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {filters && (
          <motion.div
            key="filters"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <SlidersHorizontal className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Search filters</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Applied to every search and category</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setFilters(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              {[
                {
                  on: nearFirst,
                  set: setNearFirst,
                  label: 'Nearest caregivers first',
                  sub: 'Sorted by distance from the care address',
                },
                {
                  on: budget,
                  set: setBudget,
                  label: 'Budget under ₹1,000 per visit',
                  sub: 'Only services starting below this',
                },
                {
                  on: femalePref,
                  set: setFemalePref,
                  label: 'Prefer female caregivers',
                  sub: 'Applied when offers go out, never guaranteed',
                },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{f.label}</div>
                    <div className="mt-0.5 truncate text-[10.5px] font-semibold text-[#0B211B]/45">{f.sub}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => f.set(!f.on)}
                    aria-label={f.label}
                    className={cn(
                      'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
                      f.on ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
                        f.on ? 'left-6' : 'left-1',
                      )}
                    />
                  </button>
                </div>
              ))}

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setFilters(false)
                  notify({ title: 'Filters applied', body: 'Search now respects your preferences', kind: 'ok' })
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Apply filters</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
