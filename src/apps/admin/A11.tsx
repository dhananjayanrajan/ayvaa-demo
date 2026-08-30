import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, ShieldAlert, UserRound } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Panel, Section, Tile } from '@/components/phone/kit'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { incidents } from '@/data/seed'

type Investigator = {
  id: string
  name: string
  role: string
  expertise: string
  activeCases: number
  availability: string
}

const investigators: Investigator[] = [
  { id: 'inv1', name: 'Dr. Ananya Rao', role: 'Senior supervisor', expertise: 'Medication incidents', activeCases: 2, availability: 'Available now' },
  { id: 'inv2', name: 'Meera Nair', role: 'Clinical lead', expertise: 'Fall risk, mobility', activeCases: 4, availability: 'In 30 mins' },
  { id: 'inv3', name: 'Kavya Menon', role: 'Care team lead', expertise: 'Caregiver conduct', activeCases: 1, availability: 'Available now' },
]

export function A11() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const incident = incidents[0] ?? {
    id: 'INC-20250315-01',
    title: 'Near fall during transfer',
    severity: 'Critical',
    patient: 'Mrs. Iyer',
    location: 'Ward B',
    raised: '9:40 AM',
    by: 'Caregiver Lakshmi',
    summary: 'Patient lost balance while moving from bed to chair. Caregiver prevented a fall but patient complained of dizziness.',
    tags: ['Fall risk', 'Dizziness', 'Transfer'],
  }
  const [selectedInv, setSelectedInv] = useState<string>('')
  const [assigned, setAssigned] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  const selectedInvestigator = investigators.find((i) => i.id === selectedInv)

  const assignInvestigator = () => {
    if (!selectedInv || assigning || assigned) return
    setAssigning(true)
    const timer = setTimeout(() => {
      setAssigning(false)
      setAssigned(true)
      notify({
        title: 'Investigator assigned',
        body: `${selectedInvestigator?.name} assigned · audit updated`,
        kind: 'ok',
      })
    }, 1400)
    timersRef.current.push(timer)
  }

  const heroFactRows = [
    { label: 'Patient', value: incident.patient ?? 'Unknown patient' },
    { label: 'Location', value: incident.location ?? 'Unknown location' },
    { label: 'Raised', value: incident.raised ?? 'Today' },
    { label: 'Reported by', value: incident.by ?? 'Staff' },
  ]

  return (
    <Screen>
      <AppBar
        title="Incident case file"
        subtitle={`Case #${incident.id}`}
        onBack={() => navigate('/admin/a02')}
      />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-400/[0.16] blur-3xl" />

          <AccentHero tone="rose">
            <div className="flex items-start justify-between gap-3">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/60">
                Case #{incident.id}
              </span>
              <StatusPill tone="rose" label={incident.severity ?? 'Critical'} live />
            </div>
            <h2 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
              {incident.title ?? 'Untitled incident'}
            </h2>
            <div className="mt-4 space-y-2">
              {heroFactRows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-rose-200/50">
                    {row.label}
                  </span>
                  <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </AccentHero>

          <Section label="What happened" />
          <Card>
            <div className="p-4">
              <p className="text-pretty break-words text-[13px] font-medium leading-relaxed text-[#0B211B]/75">
                {incident.summary ?? 'No summary provided.'}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(incident.tags ?? []).map((tag: string) => (
                  <Chip key={tag} intent="neutral">
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>
          </Card>

          <Section label="Timeline" />
          <Card>
            <div className="p-4">
              <div className="flex flex-col">
                <div className="flex items-start gap-3">
                  <span className="relative mt-1 flex h-3 w-3 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-bold tracking-tight text-[#0B211B]">Incident raised</span>
                      <span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/40">
                        {incident.raised ?? 'Now'}
                      </span>
                    </div>
                    <p className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">
                      {incident.by ?? 'Staff'} reported via patient app
                    </p>
                  </div>
                </div>
                <div className="ml-1.5 h-6 w-px bg-[#0B211B]/10" />
                <div className="flex items-start gap-3">
                  <span className="relative mt-1 flex h-3 w-3 shrink-0">
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-bold tracking-tight text-[#0B211B]">Escalated to supervisor</span>
                      <span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/40">Auto</span>
                    </div>
                    <p className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">
                      Dr. Ananya Rao paged · awaiting assignment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Section
            label="Assign investigator"
            trailing={
              assigned ? (
                <Chip intent="success">Assigned</Chip>
              ) : selectedInv ? (
                <Chip intent="warning">Ready</Chip>
              ) : (
                <Chip intent="warning" dot>Required</Chip>
              )
            }
          />
          <Card>
            <div className="flex flex-col gap-2 p-2">
              {investigators.map((inv) => {
                const isSelected = selectedInv === inv.id
                return (
                  <button
                    key={inv.id}
                    type="button"
                    onClick={() => setSelectedInv(inv.id)}
                    disabled={assigned || assigning}
                    className={cn(
                      'flex items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors',
                      isSelected
                        ? 'bg-rose-500/[0.06] ring-2 ring-rose-500/40'
                        : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
                      (assigned || assigning) && 'cursor-not-allowed opacity-60',
                    )}
                  >
                    <Tile icon={UserRound} tone={isSelected ? 'danger' : 'neutral'} />
                    <div className="min-w-0 flex-1">
                      <div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">{inv.name}</div>
                      <div className="mt-0.5 break-words text-[11px] font-semibold text-[#0B211B]/55">{inv.role}</div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-start gap-2">
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">
                            Expertise
                          </span>
                          <span className="min-w-0 break-words text-[11px] font-medium text-[#0B211B]/55">
                            {inv.expertise}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">
                            Active cases
                          </span>
                          <span className="min-w-0 break-words text-[11px] font-medium text-[#0B211B]/55">
                            {inv.activeCases}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">
                            Availability
                          </span>
                          <span className="min-w-0 break-words text-[11px] font-medium text-[#0B211B]/55">
                            {inv.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-500 text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.08] text-[#0B211B]/40">
                        <UserRound className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </Card>

          <Panel intent="info" className="flex items-start gap-3 p-4">
            <Tile icon={ShieldAlert} tone="info" />
            <p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">
              Assigning an investigator starts the formal review. Every assignment is written to the audit log.
            </p>
          </Panel>

          <EndOfScroll label="End of incident case file" />
        </div>
      </BodyArea>
      <FootBar>
        <button
          type="button"
          onClick={assignInvestigator}
          disabled={!selectedInv || assigning || assigned}
          className={cn(
            'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all',
            assigned
              ? 'bg-emerald-500/[0.1] text-emerald-700'
              : selectedInv && !assigning
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
          )}
        >
          {assigning ? (
            <>
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              Assigning…
            </>
          ) : assigned ? (
            <>
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} />
              Investigator assigned
            </>
          ) : (
            <>
              <UserRound className="h-4 w-4 shrink-0" strokeWidth={2.4} />
              Assign investigator
            </>
          )}
        </button>
      </FootBar>
    </Screen>
  )
}
