import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AlertTriangle, BadgeCheck, BellRing, Check, ClipboardCheck, Pill, ScrollText, ShieldCheck, Syringe } from 'lucide-react'
import { AccentHero } from '@/components/base/phone/accent-hero'
import { StatusPill } from '@/components/base/phone/status-pill'
import { HeroTopRow, HeroHighlight } from '@/components/base/phone/hero-cells'
import { Card, Chip, Tile, TimeChip, Meter } from '@/components/base/phone/kit'
import { ExpandRow } from '@/components/base/phone/expand-row'
import { FactRows } from '@/components/base/phone/fact-rows'
import { Row } from '@/components/base/phone/row'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { DarkPanel } from '@/components/base/phone/dark-panel'
import { LifecycleButton, StaticButton } from '@/components/base/phone/lifecycle-button'
import { buildDoseFacts, formatWindow, type MedDose, type PartCell } from '@/data/patientMeds'
import { cn } from '@/lib/utils'

export function MedsHero({ patientFirst, sealedCount, total, complete, partCells }: { patientFirst: string; sealedCount: number; total: number; complete: boolean; partCells: PartCell[] }) {
  const n = partCells.length
  const doneCount = partCells.filter((c) => c.status === 'done').length
  const startPct = 100 / n / 2
  const endPct = doneCount > 0 ? (100 / n) * (doneCount - 0.5) : startPct
  return (
    <AccentHero tone={complete ? 'emerald' : 'amber'}>
      <HeroTopRow icon={Pill} label={`${patientFirst}'s doses today`} labelClass={complete ? 'text-emerald-200/50' : 'text-amber-200/50'} trailing={complete ? <StatusPill tone="emerald" label="Day complete" /> : <StatusPill tone="amber" label="In progress" live />} />
      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">{sealedCount} of {total} doses taken, <HeroHighlight tone={complete ? 'emerald' : 'amber'}>{complete ? 'day sealed' : `${total - sealedCount} to go`}</HeroHighlight></h2>
      <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">Round by round, sealed as they happen</p>
      <div className="mt-5">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]"><span className={complete ? 'text-emerald-100/50' : 'text-amber-100/50'}>Day progress</span><span className={cn('tabular-nums', complete ? 'text-emerald-200' : 'text-amber-200')}>{Math.round((sealedCount / total) * 100)}%</span></div>
        <Meter value={sealedCount / total} intent={complete ? 'success' : 'warning'} delay={0.2} className="mt-2" />
      </div>
      <div className="relative mt-5">
        <div aria-hidden className="absolute top-[7px] h-0.5 rounded-full bg-white/[0.12]" style={{ left: `${startPct}%`, right: `${startPct}%` }} />
        {doneCount > 0 && <div aria-hidden className="absolute top-[7px] h-0.5 rounded-full bg-emerald-300" style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }} />}
        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>{partCells.map((cell) => (<div key={cell.id} className="flex flex-col items-center">{cell.status === 'done' ? <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#04241A]"><svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg></span> : cell.status === 'due' ? <span className="relative grid h-4 w-4 place-items-center"><span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-amber-300/50" /><span className="relative h-2.5 w-2.5 rounded-full bg-amber-300" /></span> : <span className="mt-[3px] h-2.5 w-2.5 rounded-full bg-white/25" />}<span className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/70">{cell.label}</span><span className={cn('text-[9px] font-bold tabular-nums', cell.status === 'due' ? 'text-amber-200' : cell.status === 'done' ? 'text-emerald-100/70' : 'text-white/35')}>{cell.sub}</span></div>))}</div>
      </div>
    </AccentHero>
  )
}

export function MedRow({ med, open = false, onToggle }: { med: MedDose; open?: boolean; onToggle?: () => void }) {
  const Icon = med.icon
  if (med.state === 'scheduled') return <Row leading={<span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.07] text-[#0B211B]/50"><Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden /></span>} title={`${med.name} ${med.dose}`} titleClassName="text-[13px] text-[#0B211B]/70" subtitle={`${med.purpose}, nurse administered`} subtitleClassName="text-[11px] text-[#0B211B]/45" chip={{ label: med.window, intent: 'neutral' }} surface="inset" padding="even" />
  return (
    <ExpandRow icon={Icon} tone="success" fresh={med.fresh} open={open} onToggle={onToggle} title={`${med.name} ${med.dose}`} sub={med.purpose} trailing={<span className="flex shrink-0 flex-col items-end gap-1.5"><Chip intent="success" icon={BadgeCheck}>Sealed</Chip>{med.takenAt && <TimeChip>{med.takenAt}</TimeChip>}</span>}>
      <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5"><FactRows rows={buildDoseFacts(med)} tone="light" /><div className="mt-3.5"><div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">Instruction</div><p className="mt-1 text-[11.5px] font-medium leading-snug text-[#0B211B]/60">{med.instruction}</p></div></div>
      <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5"><BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden /><span className="min-w-0 text-[10.5px] font-bold text-emerald-800">Verified against {med.rxId} and sealed to the visit record</span></div>
    </ExpandRow>
  )
}

export function MedLogCard({ sealed, upcoming, nurseFirst }: { sealed: MedDose[]; upcoming: MedDose[]; nurseFirst: string }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))
  return (
    <Card intent="success">
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400" />
      <div className="p-5">
        <div className="flex items-start gap-3.5"><Tile icon={ClipboardCheck} tone="success" size="lg" /><div className="min-w-0 flex-1 pt-0.5"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Medication log</span><Chip intent="success" icon={ClipboardCheck}>Rx-verified</Chip></div><p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">Tap a sealed dose for its verification detail.</p></div></div>
        <div className="mt-4 flex items-center justify-between gap-3"><span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700">Sealed and verified</span><span className="text-[10px] font-extrabold tabular-nums text-emerald-700">{sealed.length}</span></div>
        <div className="mt-2 flex flex-col gap-2">{sealed.map((med) => (<MedRow key={med.id} med={med} open={openId === med.id} onToggle={() => toggle(med.id)} />))}</div>
        <div className="mt-5 flex items-center justify-between gap-3"><span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/45">Coming up</span><span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/45">{upcoming.length}</span></div>
        <div className="mt-2 flex flex-col gap-2">{upcoming.map((med) => (<MedRow key={med.id} med={med} />))}<p className="px-1 pt-1 text-[11px] font-medium leading-snug text-[#0B211B]/45">{nurseFirst} administers these at the evening visit.</p></div>
      </div>
    </Card>
  )
}

export function DueDoseCard({ med, stepIndex, stepsTotal, nurseFirst, nudgePhase, onNudge, onDetail }: { med: MedDose; stepIndex: number; stepsTotal: number; nurseFirst: string; nudgePhase: 'idle' | 'working' | 'done'; onNudge: () => void; onDetail: () => void }) {
  const [left, setLeft] = useState(18 * 60 + 24)
  useEffect(() => { const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(id) }, [])
  const Icon = med.icon
  return (
    <Card>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Afternoon dose</span><Chip intent="live" dot>Dose {stepIndex} of {stepsTotal}</Chip></div>
        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{nurseFirst} administers and verifies it during the live visit.</p>
        <div className="mt-4 overflow-hidden rounded-2xl bg-[#241A0B]"><div className="p-4"><div className="flex items-center gap-3"><span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/[0.2] text-amber-100"><span aria-hidden className="absolute inset-0 animate-ping rounded-xl bg-amber-400/20" /><Icon className="relative h-4 w-4" strokeWidth={2.4} aria-hidden /></span><div className="min-w-0 flex-1"><div className="truncate text-[14px] font-extrabold tracking-tight text-white">{med.name} {med.dose}</div><div className="mt-0.5 text-[11px] font-medium leading-snug text-amber-100/60">{med.purpose}</div></div></div></div><div className="flex items-center justify-between gap-3 bg-white/[0.04] px-4 py-2.5"><span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-100/45">Window closes in</span><span className={cn('text-[15px] font-extrabold leading-none tabular-nums', left > 0 ? 'text-amber-200' : 'text-rose-300')}>{left > 0 ? formatWindow(left) : 'Closing now'}</span></div></div>
        {med.interaction && <div className="mt-3 rounded-2xl bg-rose-500/[0.08] px-4 py-3"><div className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-600" strokeWidth={2.4} aria-hidden /><span className="text-[12px] font-extrabold tracking-tight text-rose-700">{med.interaction.title}</span></div><p className="mt-1 text-[11px] font-medium leading-snug text-[#0B211B]/60">{med.interaction.body}</p></div>}
        <div className="mt-4 flex gap-2.5"><StaticButton tone="neutral" icon={ScrollText} className="flex-1" onClick={onDetail}>Detail</StaticButton><LifecycleButton phase={nudgePhase} tone="warning" idleIcon={BellRing} idleLabel={`Nudge ${nurseFirst}`} workingLabel="Notifying…" doneLabel="Nurse notified" onPress={onNudge} /></div>
      </div>
    </Card>
  )
}

export function RefillCard({ medName, dose, dosesLeft, eveningWindow }: { medName: string; dose: string; dosesLeft: number; eveningWindow: string }) {
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const request = () => { if (phase !== 'idle') return; setPhase('working'); timers.current.push(setTimeout(() => setPhase('done'), 850)) }
  return (
    <Card>
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
      <div className="p-5">
        <div className="flex items-start gap-3.5"><Tile icon={Syringe} tone="warning" size="lg" /><div className="min-w-0 flex-1 pt-0.5"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Refill needed</span><Chip intent="warning" dot>Low stock</Chip></div><p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{medName} {dose} has {dosesLeft} doses left before the {eveningWindow} round.</p></div></div>
        <LifecycleButton phase={phase} tone="warning" className="mt-4" idleLabel="Request refill" workingLabel="Sending request…" doneLabel="Refill requested" onPress={request} />
        <AnimatePresence>{phase === 'done' && <motion.div key="confirmed" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.1] px-3.5 py-3"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"><Check className="h-3 w-3" strokeWidth={3.5} aria-hidden /></span><span className="min-w-0 text-[10.5px] font-bold text-emerald-800">Order sent to the pharmacy and the nurse can adjust tonight if it lands late</span></motion.div>}</AnimatePresence>
      </div>
    </Card>
  )
}

export function DoseDetailSheet({ med, nurseFirst, nudgePhase, onNudge, onClose }: { med: MedDose; nurseFirst: string; nudgePhase: 'idle' | 'working' | 'done'; onNudge: () => void; onClose: () => void }) {
  return (
    <SheetShell icon={Pill} tone="info" title={med.name} subtitle={`${med.dose}, due ${med.dueAt ?? med.window}`} onClose={onClose} footer={<div><LifecycleButton phase={nudgePhase} tone="warning" idleIcon={BellRing} idleLabel={`Nudge ${nurseFirst}`} workingLabel="Notifying…" doneLabel="Nurse notified" onPress={onNudge} /><p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">Given only after verification against the prescription</p></div>}>
      <DarkPanel tone="amber" kicker="Dose record"><div className="flex flex-col gap-2.5">{buildDoseFacts(med).map((row) => (<div key={row.label} className="flex items-baseline justify-between gap-3"><span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-100/45">{row.label}</span><span className="text-right text-[12px] font-bold text-amber-50/90">{row.value}</span></div>))}</div><div className="mt-3.5 rounded-xl bg-white/[0.05] px-3.5 py-3"><div className="text-[9px] font-bold uppercase tracking-[0.14em] text-amber-100/45">Instruction</div><p className="mt-1 text-[11.5px] font-medium leading-snug text-amber-50/80">{med.instruction}</p></div></DarkPanel>
      {med.interaction && <div className="mt-3 rounded-2xl bg-rose-500/[0.08] px-4 py-3.5"><div className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-600" strokeWidth={2.4} aria-hidden /><span className="text-[12px] font-extrabold tracking-tight text-rose-700">{med.interaction.title}</span></div><p className="mt-1 text-[11px] font-medium leading-snug text-[#0B211B]/60">{med.interaction.body}</p></div>}
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#0B211B]/[0.03] px-3 py-2.5"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden /><span className="min-w-0 text-[10.5px] font-bold text-[#0B211B]/55">{nurseFirst} verifies the dose against {med.rxId} before giving it</span></div>
    </SheetShell>
  )
}