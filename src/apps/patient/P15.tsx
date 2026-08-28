import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CalendarDays, Check, ChevronRight, Filter, Plus, ShieldCheck, Undo2, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Kicker, Meter, Panel, Section, Tile, TimeChip, rise, stagger } from '@/components/phone/kit'
import { carePlan, lovedOnes, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Tab = 'upcoming' | 'completed' | 'missed'

const completed = [
  { id: 'vc1', day: 'Tuesday', date: 'Mar 12', time: '2:00 PM – 4:30 PM', caregiver: 'Lakshmi Reddy', note: true, vitals: true },
]

export function P15() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [tab, setTab] = useState<Tab>('upcoming')
  const [filterOpen, setFilterOpen] = useState(false)

  const live = visits.find((v) => v.status === 'live')
  const upcoming = visits.filter((v) => v.status === 'confirmed' || v.status === 'pending' || v.status === 'live')
  const missed = visits.filter((v) => v.status === 'missed')

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { id: 'completed', label: 'Done', count: completed.length },
    { id: 'missed', label: 'Missed', count: missed.length },
  ]

  const openVisit = (id: string) => {
    const v = visits.find((x) => x.id === id)
    if (v?.status === 'live') {
      navigate('/patient/p16')
      return
    }
    notify({ title: 'Visit details', body: 'Full visit view opens here', kind: 'info' })
    navigate('/patient/p17')
  }

  const confirmedCount = upcoming.filter((v) => v.status === 'confirmed').length

  return (
    <Screen>
      <AppBar
        title="Visits"
        subtitle={`${carePlan.category} plan for ${father.name.split(' ')[0]}`}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setFilterOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60"
            aria-label="Filter visits"
          >
            <Filter className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <Kicker>This week · care calendar</Kicker>
                    <Chip intent="success" light icon={ShieldCheck} className="shrink-0 border-transparent">
                      GPS verified
                    </Chip>
                  </div>
                  <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    {upcoming.length} visits ahead,{' '}
                    <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                      {confirmedCount} confirmed
                    </span>
                  </h2>

                  <div className="mt-5 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
                    <span>Week confirmation</span>
                    <span className="text-emerald-200">
                      {confirmedCount}/{upcoming.length}
                    </span>
                  </div>
                  <Meter value={confirmedCount / Math.max(1, upcoming.length)} intent="success" delay={0.2} className="mt-2" />

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <Chip intent="neutral" light className="border-transparent">Weekly plan · Mon–Fri</Chip>
                    {missed.length > 0 && (
                      <Chip intent="danger" light className="border-transparent">
                        {missed.length} missed · refunded
                      </Chip>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
                {tabs.map((t) => {
                  const active = tab === t.id
                  return (
                    <motion.button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTab(t.id)}
                      className="relative flex-1 rounded-full py-2.5"
                    >
                      {active && (
                        <motion.span
                          layoutId="p15-tab"
                          transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
                        />
                      )}
                      <span
                        className={cn(
                          'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.08em]',
                          active ? 'text-white' : 'text-[#0B211B]/45',
                        )}
                      >
                        {t.label} · {t.count}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            {tab === 'upcoming' && (
              <>
                {live && (
                  <motion.div variants={rise}>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => navigate('/patient/p16')}
                      className="block w-full text-left"
                    >
                      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-emerald-600 to-teal-600 p-5 shadow-[0_24px_52px_-24px_rgba(5,150,105,0.8)]">
                        <span aria-hidden className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
                        <div className="relative">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                              Happening today
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.16] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute h-full w-full animate-ping rounded-full bg-white opacity-70" />
                                <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                              </span>
                              In progress
                            </span>
                          </div>
                          <div className="mt-3.5 flex items-center gap-3.5">
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.16] text-white">
                              <Check className="h-6 w-6" strokeWidth={2.4} aria-hidden />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[15px] font-extrabold tracking-tight text-white">
                                Lakshmi arrived at 2:02 PM
                              </div>
                              <div className="truncate text-[11.5px] font-semibold text-white/70">
                                Location matched your home address
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 shrink-0 text-white" strokeWidth={2.4} aria-hidden />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                )}

                <motion.div variants={rise}>
                  <Section label="Scheduled" trailing={<Chip intent="neutral">{upcoming.length} visits</Chip>} />
                </motion.div>

                <motion.div variants={rise}>
                  <Card>
                    {upcoming.map((v, i) => {
                      const pending = v.status === 'pending'
                      return (
                        <div key={v.id}>
                          {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.985 }}
                            onClick={() => openVisit(v.id)}
                            className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                          >
                            <Tile icon={CalendarDays} tone={pending ? 'warning' : 'success'} />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                                {v.day}, {v.date}
                              </div>
                              <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                                {v.caregiver ? `${v.caregiver} · ${v.time}` : 'Offer out to nearby nurses'}
                              </div>
                            </div>
                            <span className="flex shrink-0 items-center gap-1.5">
                              <Chip intent={pending ? 'warning' : 'success'} dot={pending}>
                                {pending ? 'Pending' : 'Confirmed'}
                              </Chip>
                              <ChevronRight
                                className="h-3.5 w-3.5 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                                aria-hidden
                              />
                            </span>
                          </motion.button>
                        </div>
                      )
                    })}
                  </Card>
                </motion.div>
              </>
            )}

            {tab === 'completed' && (
              <motion.div variants={rise}>
                <Card>
                  {completed.map((v) => (
                    <motion.button
                      key={v.id}
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => navigate('/patient/p17')}
                      className="group flex w-full items-start gap-3 px-4 py-3.5 text-left"
                    >
                      <Tile icon={Check} tone="success" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <TimeChip>{v.date}</TimeChip>
                          <span className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{v.day}</span>
                        </div>
                        <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                          {v.caregiver} · {v.time}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <Chip intent="success" icon={Check}>
                            Signed off
                          </Chip>
                          {v.note && <Chip intent="info">Note from caregiver</Chip>}
                          {v.vitals && <Chip intent="neutral">Vitals logged</Chip>}
                        </div>
                      </div>
                      <ChevronRight
                        className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                        aria-hidden
                      />
                    </motion.button>
                  ))}
                </Card>
              </motion.div>
            )}

            {tab === 'missed' && (
              <motion.div variants={rise}>
                <Card intent="danger">
                  <div className="p-5">
                    <div className="flex items-start gap-3.5">
                      <Tile icon={X} tone="danger" size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                            {missed[0]?.day}, {missed[0]?.date}
                          </span>
                          <Chip intent="danger">Missed</Chip>
                        </div>
                        <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/60">
                          {missed[0]?.note ?? 'No nurse accepted in time'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.08] px-3.5 py-3">
                      <Tile icon={Undo2} tone="success" size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12.5px] font-bold tracking-tight text-emerald-800">Refund processed automatically</div>
                        <div className="mt-0.5 truncate text-[10.5px] font-semibold text-emerald-700/60">
                          Missed visits are never charged · returned to your card
                        </div>
                      </div>
                      <Chip intent="success" icon={Check}>
                        Paid
                      </Chip>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Every visit on this list is verified by GPS check-in. What happened is recorded, sealed and shared with you.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/patient/p09')}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <Plus className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Book another service
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of visits" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {filterOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFilterOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {filterOpen && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-start gap-3">
              <Tile icon={Filter} tone="ink" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Filter visits</div>
                <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Narrow the list · applies instantly</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setFilterOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close filters"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { icon: CalendarDays, label: 'This month', sub: '14 visits logged' },
                { icon: Check, label: 'By caregiver · Lakshmi Reddy', sub: '9 visits together' },
                { icon: ShieldCheck, label: 'GPS-verified only', sub: 'Always on for your plan' },
              ].map((f) => (
                <motion.button
                  key={f.label}
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    setFilterOpen(false)
                    notify({ title: 'Filter applied', body: f.label, kind: 'info' })
                  }}
                  className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3.5 text-left"
                >
                  <Tile icon={f.icon} tone="info" size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{f.label}</span>
                    <span className="mt-0.5 block truncate text-[10.5px] font-semibold text-[#0B211B]/45">{f.sub}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
