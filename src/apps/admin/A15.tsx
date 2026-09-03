import { useEffect, useRef, useState } from 'react'
import { Check, Download, FileClock, Link2, Loader2, Lock, UserRound, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Panel, Tile } from '@/components/phone/kit'
import { SectionHeader } from '@/components/onboarding/OnboardingSet'
import { ConsentRecordHero } from '@/components/admin/heroes/ConsentRecordHero'
import { VersionHistory } from '@/components/admin/lists/VersionHistory'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { accessEntries, record, stateTone, versions } from '@/data/admin/a15Data'

export function A15() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [openVersionId, setOpenVersionId] = useState(`v${record.activeVersion}`)
  const [compareVersionId, setCompareVersionId] = useState<string | null>(null)
  const [selectedAccessId, setSelectedAccessId] = useState<string | null>(null)
  const [exportState, setExportState] = useState<'idle' | 'working' | 'done'>('idle')
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const tone = stateTone('active')
  const label = 'Active'

  useEffect(() => { const t = timersRef.current; return () => t.forEach(clearTimeout) }, [])

  const exportRecord = () => {
    if (exportState !== 'idle') return
    setExportState('working')
    timersRef.current.push(setTimeout(() => { setExportState('done'); notify({ title: 'Consent record exported', body: `${record.patient} · full history downloaded · access logged`, kind: 'ok' }) }, 1400))
  }

  const compareVersion = compareVersionId ? versions.find((v) => v.id === compareVersionId) : null
  const selectedAccess = selectedAccessId ? accessEntries.find((a) => a.id === selectedAccessId) : null

  return (
    <Screen>
      <AppBar title="Consent detail" subtitle={`Record #${record.id}`} onBack={() => navigate('/admin/a06')} />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <ConsentRecordHero id={record.id} patient={record.patient} guardian={record.guardian} activeVersion={record.activeVersion} lastSigned={record.lastSigned} renewalDue={record.renewalDue} tone={tone} label={label} />
          <SectionHeader label="Version history" done={false} trailing={`${versions.length} versions`} />
          <VersionHistory versions={versions} activeVersion={record.activeVersion} openId={openVersionId} onToggle={setOpenVersionId} onCompare={setCompareVersionId} />
          <Card>
            <div className="p-4">
              <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Access log</div>
              <div className="mt-2 flex flex-col gap-1.5">
                {accessEntries.map((entry) => (
                  <button key={entry.id} type="button" onClick={() => setSelectedAccessId(entry.id)} className="flex items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-[#0B211B]/[0.02]">
                    <Tile icon={entry.role === 'Automated' ? FileClock : UserRound} tone="neutral" className="size-7 shrink-0" />
                    <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-bold text-[#0B211B]/80">{entry.actor}</div><div className="mt-0.5 truncate text-[10px] font-medium text-[#0B211B]/55">{entry.role} · {entry.reason}</div><div className="font-mono text-[9px] font-bold tabular-nums text-[#0B211B]/35">{entry.time}</div></div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
          <Panel intent="info" className="flex items-start gap-3 p-4"><Tile icon={Lock} tone="info" /><p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">Every version and access is sealed into the consent record. Changes require witness or guardian signature.</p></Panel>
          <EndOfScroll label="End of consent record" />
        </div>
      </BodyArea>
      <FootBar><button type="button" onClick={exportRecord} disabled={exportState !== 'idle'} className={cn('flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', exportState === 'done' ? 'bg-emerald-500/[0.1] text-emerald-700' : exportState === 'working' ? 'cursor-wait bg-emerald-500/10 text-emerald-600/70' : 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.6)]')}>{exportState === 'working' ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : exportState === 'done' ? <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} /> : <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} />}{exportState === 'idle' ? 'Export record' : exportState === 'working' ? 'Preparing export' : 'Export complete'}</button></FootBar>
      <AnimatePresence>{compareVersion && <motion.div key="compare-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCompareVersionId(null)} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />}</AnimatePresence>
      <AnimatePresence>{compareVersion && <motion.div key="compare-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 380, damping: 40 }} className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white"><div className="shrink-0 px-5 pt-4"><div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" /></div><div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3"><div className="flex items-start gap-3"><Tile icon={Link2} tone="info" size="lg" /><div className="min-w-0 flex-1"><div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Compare versions</div><div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">v{compareVersion.version} vs previous</div></div><button type="button" onClick={() => setCompareVersionId(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50" aria-label="Close"><X className="h-4 w-4" /></button></div><div className="flex flex-col gap-3"><div className="rounded-2xl bg-[#0B211B]/[0.04] p-3"><div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Scopes</div>{compareVersion.scopes.map((scope) => { const prev = versions.find((v) => v.version === compareVersion.version - 1); const prevScope = prev?.scopes.find((s) => s.name === scope.name); const changed = (prevScope?.granted ?? false) !== scope.granted; return <div key={scope.id} className="mt-2 flex items-center gap-2"><span className={cn('grid h-4 w-4 shrink-0 place-items-center rounded-full', scope.granted ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent')}>{scope.granted && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}</span><span className="min-w-0 flex-1 break-words text-[11px] font-semibold text-[#0B211B]/75">{scope.name}</span>{changed && <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.1em] text-amber-600">Changed</span>}</div> })}</div><div className="rounded-2xl bg-[#0B211B]/[0.04] p-3"><div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Changes</div>{compareVersion.changes.map((c) => <p key={c} className="mt-1 break-words text-[11px] font-medium text-[#0B211B]/65">{c}</p>)}</div></div><div className="mt-auto"><button type="button" onClick={() => setCompareVersionId(null)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75">Close</button></div></div></motion.div>}</AnimatePresence>
      <AnimatePresence>{selectedAccess && <motion.div key="access-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedAccessId(null)} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />}</AnimatePresence>
      <AnimatePresence>{selectedAccess && <motion.div key="access-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 380, damping: 40 }} className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white"><div className="shrink-0 px-5 pt-4"><div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" /></div><div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3"><div className="flex items-start gap-3"><Tile icon={UserRound} tone="info" size="lg" /><div className="min-w-0 flex-1"><div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{selectedAccess.actor}</div><div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">{selectedAccess.role} · {selectedAccess.time}</div></div><button type="button" onClick={() => setSelectedAccessId(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50" aria-label="Close"><X className="h-4 w-4" /></button></div><div className="flex flex-col gap-3"><div className="rounded-2xl bg-[#0B211B]/[0.04] p-3"><div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Reason</div><p className="mt-1 break-words text-[12px] font-medium text-[#0B211B]/65">{selectedAccess.reason}</p></div><div className="rounded-2xl bg-[#0B211B]/[0.04] p-3"><div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Detail</div><p className="mt-1 break-words text-[12px] font-medium text-[#0B211B]/65">{selectedAccess.detail}</p></div></div><div className="mt-auto"><button type="button" onClick={() => setSelectedAccessId(null)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75">Close</button></div></div></motion.div>}</AnimatePresence>
    </Screen>
  )
}
