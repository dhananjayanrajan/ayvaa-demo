import { useState } from 'react'
import {
  Activity,
  BarChart3,
  Check,
  DollarSign,
  Gauge,
  Pencil,
  Plus,
  RefreshCw,
  ShieldAlert,
  Users,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Hero,
  Kicker,
  Panel,
  Section,
  Stat,
  Tile,
} from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import {
  carePlan,
  escalatedTickets,
  flaggedAccount,
  professional,
  retentionPolicies,
  supportTickets,
} from '@/data/seed'

type MetricId = 'escalated' | 'flagged' | 'retention' | 'quality' | 'support' | 'careplan'

type Metric = {
  id: MetricId
  label: string
  value: string
  change: string
  intent: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  icon: typeof Activity
  details: { k: string; v: string }[]
}

const metrics: Metric[] = [
  {
    id: 'escalated',
    label: 'Escalated tickets',
    value: String(escalatedTickets.length),
    change: 'judgment',
    intent: 'warning',
    icon: ShieldAlert,
    details: escalatedTickets.map((t) => ({ k: t.title, v: t.waiting ?? '—' })),
  },
  {
    id: 'flagged',
    label: 'Flagged accounts',
    value: String(flaggedAccount.flags.length),
    change: 'review',
    intent: 'danger',
    icon: Users,
    details: flaggedAccount.flags.map((f) => ({ k: f, v: flaggedAccount.name })),
  },
  {
    id: 'retention',
    label: 'Retention policies',
    value: String(retentionPolicies.length),
    change: 'enforced',
    intent: 'info',
    icon: BarChart3,
    details: retentionPolicies.map((p) => ({ k: p.type, v: p.period })),
  },
  {
    id: 'quality',
    label: 'Professional quality',
    value: String(professional.rating),
    change: `${professional.visits} visits`,
    intent: 'success',
    icon: Activity,
    details: [
      { k: 'Rating', v: String(professional.rating) },
      { k: 'Visits completed', v: String(professional.visits) },
      { k: 'Years experience', v: String(professional.years) },
    ],
  },
  {
    id: 'support',
    label: 'Open support tickets',
    value: String(supportTickets.length),
    change: 'active',
    intent: 'neutral',
    icon: Gauge,
    details: supportTickets.map((t) => ({ k: t.title, v: t.status })),
  },
  {
    id: 'careplan',
    label: 'Care plan progress',
    value: `${carePlan.progress}%`,
    change: `${carePlan.week}/${carePlan.weeks} weeks`,
    intent: 'success',
    icon: DollarSign,
    details: [
      { k: 'Visits done', v: String(carePlan.visitsDone) },
      { k: 'Remaining', v: carePlan.remaining },
      { k: 'Caregiver', v: carePlan.caregiver },
      { k: 'Schedule', v: carePlan.schedule },
    ],
  },
]

const defaultVisible: MetricId[] = ['escalated', 'flagged', 'retention', 'quality']

function changeChipIntent(change: string) {
  if (change === 'active' || change === `${professional.visits} visits` || change === `${carePlan.week}/${carePlan.weeks} weeks`) {
    return 'info' as const
  }
  if (change === 'review') return 'warning' as const
  if (change === 'judgment') return 'warning' as const
  if (change === 'enforced') return 'info' as const
  return 'neutral' as const
}

export function A10() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [visible, setVisible] = useState<MetricId[]>(defaultVisible)
  const [selected, setSelected] = useState<MetricId>(defaultVisible[0])
  const [editMode, setEditMode] = useState(false)

  const visibleMetrics = metrics.filter((m) => visible.includes(m.id))
  const selectedMetric = metrics.find((m) => m.id === selected) ?? visibleMetrics[0] ?? metrics[0]
  const changed = visible.length !== defaultVisible.length || visible.some((id) => !defaultVisible.includes(id))

  const toggleMetric = (id: MetricId) => {
    setVisible((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      if (!next.includes(selected)) {
        const firstVisible = metrics.find((m) => next.includes(m.id))
        setSelected(firstVisible ? firstVisible.id : (next[0] ?? 'quality'))
      }
      return next
    })
  }

  const selectMetric = (id: MetricId) => {
    if (!editMode) setSelected(id)
  }

  const toggleEditMode = () => {
    setEditMode((v) => {
      if (!v && !visible.includes(selected)) {
        const firstVisible = metrics.find((m) => visible.includes(m.id))
        setSelected(firstVisible ? firstVisible.id : (visible[0] ?? 'quality'))
      }
      return !v
    })
  }

  const saveDashboard = () => {
    notify({
      title: 'Dashboard saved',
      body: `${visibleMetrics.length} metrics on your command center · changes sealed in admin audit`,
      kind: 'ok',
    })
  }

  const resetDashboard = () => {
    setVisible(defaultVisible)
    setSelected(defaultVisible[0])
    notify({ title: 'Dashboard reset', body: 'Default metric set restored', kind: 'info' })
  }

  const heroStats = [
    { label: 'Escalated', value: escalatedTickets.length, dot: 'bg-amber-300' },
    { label: 'Flagged', value: flaggedAccount.flags.length, dot: 'bg-rose-300' },
    { label: 'Rating', value: professional.rating, dot: 'bg-emerald-300' },
  ]

  return (
    <Screen>
      <AppBar
        title="Command center"
        subtitle="Your custom admin dashboard"
        onBack={() => navigate('/admin/a01')}
        trailing={
          <button
            type="button"
            onClick={toggleEditMode}
            className={cn(
              'grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors',
              editMode ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60',
            )}
            aria-label="Toggle metric selection"
          >
            <Pencil className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>
        }
      />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />

          <Hero>
            <div className="flex items-start justify-between gap-3">
              <Kicker>Live overview</Kicker>
              <Chip intent="live" light dot className="shrink-0 border-transparent">
                Real-time
              </Chip>
            </div>
            <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
              Admin command center,{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                all systems nominal
              </span>
            </h2>
            <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
              Oversight metrics derived from live operational data.
            </p>

            <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.08]">
              {heroStats.map((s) => (
                <Stat key={s.label} label={s.label} value={s.value} dot={s.dot} />
              ))}
            </div>
          </Hero>

          {editMode ? (
            <Section label="Customise metrics" trailing={<Chip intent="warning">Editing</Chip>} />
          ) : (
            <Section label="Your metrics" trailing={<Chip intent="success">{visibleMetrics.length} active</Chip>} />
          )}

          {editMode ? (
            <div className="flex flex-col gap-2">
              {metrics.map((m) => {
                const isVisible = visible.includes(m.id)
                return (
                  <Card key={m.id}>
                    <button
                      type="button"
                      onClick={() => toggleMetric(m.id)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                          m.intent === 'success' && 'bg-emerald-500/[0.12] text-emerald-600',
                          m.intent === 'warning' && 'bg-amber-500/[0.12] text-amber-600',
                          m.intent === 'danger' && 'bg-rose-500/[0.12] text-rose-600',
                          m.intent === 'info' && 'bg-sky-500/[0.12] text-sky-600',
                          m.intent === 'neutral' && 'bg-[#0B211B]/[0.05] text-[#0B211B]/60',
                        )}
                      >
                        <m.icon className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{m.label}</div>
                        <div className="mt-0.5 text-[11px] font-medium text-[#0B211B]/55">
                          {m.value} · {m.change}
                        </div>
                      </div>
                      {isVisible ? (
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.08] text-[#0B211B]/40">
                          <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  </Card>
                )
              })}
            </div>
          ) : (
            <>
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {visibleMetrics.map((m) => {
                  const isSelected = selected === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => selectMetric(m.id)}
                      className={cn(
                        'shrink-0 rounded-2xl p-4 text-left transition-colors',
                        isSelected
                          ? 'bg-[#0B231C] shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]'
                          : 'bg-white ring-1 ring-inset ring-[#0B211B]/[0.08]',
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <m.icon
                          className={cn('h-4 w-4', isSelected ? 'text-emerald-300' : 'text-[#0B211B]/45')}
                          strokeWidth={2.2}
                        />
                        <span
                          className={cn(
                            'text-[11px] font-extrabold uppercase tracking-[0.12em]',
                            isSelected ? 'text-emerald-100/70' : 'text-[#0B211B]/45',
                          )}
                        >
                          {m.label}
                        </span>
                      </div>
                      <div className={cn('mt-2 font-mono text-lg font-black', isSelected ? 'text-white' : 'text-[#0B211B]')}>
                        {m.value}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Chip
                          intent={changeChipIntent(m.change)}
                          dot={!isSelected}
                          light={isSelected}
                          className={cn(isSelected ? 'border-transparent' : '')}
                        >
                          {m.change}
                        </Chip>
                      </div>
                    </button>
                  )
                })}
              </div>

              <Section label="Drill-down" trailing={<Chip intent="info">Selected metric</Chip>} />

              <Card>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <Tile icon={selectedMetric.icon} tone={selectedMetric.intent} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{selectedMetric.label}</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Live breakdown</div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2.5">
                    {selectedMetric.details.map((d) => (
                      <div key={d.k} className="flex items-center justify-between gap-3">
                        <span className="min-w-0 truncate text-[12.5px] font-semibold text-[#0B211B]/65">{d.k}</span>
                        <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{d.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          )}

          <Panel intent="info" className="flex items-start gap-3 p-4">
            <Tile icon={Activity} tone="info" />
            <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
              Select any metric above to see its current operational detail. Use the pencil icon to add or remove metrics.
            </p>
          </Panel>

          <EndOfScroll label="End of command center" />
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetDashboard}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75"
          >
            <RefreshCw className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Reset
          </button>
          <button
            type="button"
            onClick={saveDashboard}
            disabled={!changed}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all',
              changed
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
            )}
          >
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Save dashboard
          </button>
        </div>
      </FootBar>
    </Screen>
  )
}
