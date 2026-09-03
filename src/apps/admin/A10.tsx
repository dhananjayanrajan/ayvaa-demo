import { useState } from 'react'
import { Activity, Pencil } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { defaultVisible, heroStats, metrics } from '@/data/admin/a10Data'
import type { MetricId } from '@/data/admin/a10Data'
import { CommandHero } from '@/components/admin/heroes/CommandHero'
import { CommandStrip } from '@/components/admin/metrics/CommandStrip'
import { CommandEditor } from '@/components/admin/metrics/CommandEditor'
import { MetricDetailCard } from '@/components/admin/assurance/MetricDetailCard'
import { CommandActions } from '@/components/admin/actions/CommandActions'

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
  const selectMetric = (id: MetricId) => { if (!editMode) setSelected(id) }
  const toggleEditMode = () => {
    setEditMode((v) => {
      if (!v && !visible.includes(selected)) {
        const firstVisible = metrics.find((m) => visible.includes(m.id))
        setSelected(firstVisible ? firstVisible.id : (visible[0] ?? 'quality'))
      }
      return !v
    })
  }
  const saveDashboard = () => { notify({ title: 'Dashboard saved', body: `${visibleMetrics.length} metrics on your command center · changes sealed in admin audit`, kind: 'ok' }) }
  const resetDashboard = () => { setVisible(defaultVisible); setSelected(defaultVisible[0]); notify({ title: 'Dashboard reset', body: 'Default metric set restored', kind: 'info' }) }

  return (
    <Screen>
      <AppBar title="Command center" subtitle="Your custom admin dashboard" onBack={() => navigate('/admin/a01')} trailing={<button type="button" onClick={toggleEditMode} className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors', editMode ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60')} aria-label="Toggle metric selection"><Pencil className="h-[18px] w-[18px]" strokeWidth={2.2} /></button>} />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <CommandHero stats={heroStats} />
          {editMode ? <Section label="Customise metrics" trailing={<Chip intent="warning">Editing</Chip>} /> : <Section label="Your metrics" trailing={<Chip intent="success">{visibleMetrics.length} active</Chip>} />}
          {editMode ? <CommandEditor metrics={metrics} visible={visible} onToggle={toggleMetric} /> : <>
            <CommandStrip metrics={visibleMetrics} selected={selected} onSelect={selectMetric} />
            <Section label="Drill-down" trailing={<Chip intent="info">Selected metric</Chip>} />
            <MetricDetailCard metric={selectedMetric} />
          </>}
          <Panel intent="info" className="flex items-start gap-3 p-4"><Tile icon={Activity} tone="info" /><p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">Select any metric above to see its current operational detail. Use the pencil icon to add or remove metrics.</p></Panel>
          <EndOfScroll label="End of command center" />
        </div>
      </BodyArea>
      <FootBar><CommandActions changed={changed} onReset={resetDashboard} onSave={saveDashboard} /></FootBar>
    </Screen>
  )
}
