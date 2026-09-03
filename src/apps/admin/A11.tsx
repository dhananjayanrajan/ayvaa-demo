import { useEffect, useRef, useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Panel, Section, Tile } from '@/components/phone/kit'
import { CaseHero } from '@/components/admin/heroes/CaseHero'
import { InvestigatorPicker } from '@/components/admin/pickers/InvestigatorPicker'
import { CaseAssignAction } from '@/components/admin/actions/CaseAssignAction'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { incidents } from '@/data/seed'
import { a11IncidentFallback, investigators } from '@/data/admin/a11Data'

export function A11() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const incident = incidents[0] ?? a11IncidentFallback
  const [selectedInv, setSelectedInv] = useState('')
  const [assigned, setAssigned] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [])

  const selectedInvestigator = investigators.find((i) => i.id === selectedInv)

  const assignInvestigator = () => {
    if (!selectedInv || assigning || assigned) return
    setAssigning(true)
    const timer = setTimeout(() => {
      setAssigning(false)
      setAssigned(true)
      notify({ title: 'Investigator assigned', body: `${selectedInvestigator?.name} assigned · audit updated`, kind: 'ok' })
    }, 1400)
    timersRef.current.push(timer)
  }

  return (
    <Screen>
      <AppBar title="Incident case file" subtitle={`Case #${incident.id}`} onBack={() => navigate('/admin/a02')} />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-400/[0.16] blur-3xl" />
          <CaseHero id={incident.id} title={incident.title ?? 'Untitled incident'} severity={incident.severity ?? 'Critical'} patient={incident.patient ?? 'Unknown patient'} location={incident.location ?? 'Unknown location'} raised={incident.raised ?? 'Today'} by={incident.by ?? 'Staff'} />
          <Section label="What happened" />
          <Card>
            <div className="p-4">
              <p className="text-pretty break-words text-[13px] font-medium leading-relaxed text-[#0B211B]/75">{incident.summary ?? 'No summary provided.'}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{(incident.tags ?? []).map((tag: string) => <Chip key={tag} intent="neutral">{tag}</Chip>)}</div>
            </div>
          </Card>
          <Section label="Timeline" />
          <Card>
            <div className="p-4">
              <div className="flex flex-col">
                <div className="flex items-start gap-3">
                  <span className="relative mt-1 flex h-3 w-3 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" /><span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" /></span>
                  <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="text-[13px] font-bold tracking-tight text-[#0B211B]">Incident raised</span><span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/40">{incident.raised ?? 'Now'}</span></div><p className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{incident.by ?? 'Staff'} reported via patient app</p></div>
                </div>
                <div className="ml-1.5 h-6 w-px bg-[#0B211B]/10" />
                <div className="flex items-start gap-3">
                  <span className="relative mt-1 flex h-3 w-3 shrink-0"><span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" /></span>
                  <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="text-[13px] font-bold tracking-tight text-[#0B211B]">Escalated to supervisor</span><span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/40">Auto</span></div><p className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">Dr. Ananya Rao paged · awaiting assignment</p></div>
                </div>
              </div>
            </div>
          </Card>
          <InvestigatorPicker investigators={investigators} selectedId={selectedInv} assigned={assigned} assigning={assigning} onSelect={setSelectedInv} />
          <Panel intent="info" className="flex items-start gap-3 p-4"><Tile icon={ShieldAlert} tone="info" /><p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">Assigning an investigator starts the formal review. Every assignment is written to the audit log.</p></Panel>
          <EndOfScroll label="End of incident case file" />
        </div>
      </BodyArea>
      <FootBar><CaseAssignAction selectedId={selectedInv} assigning={assigning} assigned={assigned} onAssign={assignInvestigator} /></FootBar>
    </Screen>
  )
}
