import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  ChevronDown,
  Download,
  FileClock,
  FileText,
  Link2,
  Loader2,
  Lock,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Panel, Tile } from '@/components/phone/kit'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { SectionHeader } from '@/components/patient/onboarding/SectionHeader'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type ConsentState = 'active' | 'pending' | 'withdrawn' | 'expired'
type VersionStatus = 'current' | 'superseded' | 'withdrawn'
type Scope = { id: string; name: string; granted: boolean }
type Version = {
  id: string
  version: number
  date: string
  status: VersionStatus
  summary: string
  signatories: string[]
  changes: string[]
  scopes: Scope[]
}
type AccessEntry = { id: string; actor: string; role: string; time: string; reason: string; detail: string }

const consentState: ConsentState = 'active'
const record = {
  id: 'CON-20240312-014',
  patient: 'Ramesh Rao',
  guardian: 'Priya Sharma',
  lastSigned: 'Mar 12, 2025',
  renewalDue: 'Jun 10, 2025',
  activeVersion: 3,
}

const versions: Version[] = [
  {
    id: 'v3',
    version: 3,
    date: 'Mar 12, 2025',
    status: 'current',
    summary: 'Renewed with reduced scope after hospital discharge',
    signatories: ['Priya Sharma', 'Dr. Ananya Rao'],
    changes: ['Removed wound care', 'Added mobility assistance', 'Extended to June 2025'],
    scopes: [
      { id: 's1', name: 'Personal care', granted: true },
      { id: 's2', name: 'Medication management', granted: true },
      { id: 's3', name: 'Mobility assistance', granted: true },
      { id: 's4', name: 'Health monitoring', granted: true },
      { id: 's5', name: 'Wound care', granted: false },
    ],
  },
  {
    id: 'v2',
    version: 2,
    date: 'Dec 01, 2024',
    status: 'superseded',
    summary: 'Added wound care after surgery',
    signatories: ['Priya Sharma'],
    changes: ['Added wound care', 'Extended schedule'],
    scopes: [
      { id: 's1', name: 'Personal care', granted: true },
      { id: 's2', name: 'Medication management', granted: true },
      { id: 's5', name: 'Wound care', granted: true },
    ],
  },
  {
    id: 'v1',
    version: 1,
    date: 'Aug 15, 2024',
    status: 'superseded',
    summary: 'Initial consent for home care',
    signatories: ['Priya Sharma', 'Lakshmi Reddy'],
    changes: ['Initial scope set'],
    scopes: [
      { id: 's1', name: 'Personal care', granted: true },
      { id: 's2', name: 'Medication management', granted: true },
    ],
  },
]

const accessEntries: AccessEntry[] = [
  { id: 'acc1', actor: 'Dr. Ananya Rao', role: 'Supervisor', time: '10:45 AM', reason: 'Renewal review', detail: 'Opened record to review consent scopes before renewal approval.' },
  { id: 'acc2', actor: 'Priya Sharma', role: 'Guardian', time: '10:31 AM', reason: 'Viewed consent summary', detail: 'Guardian reviewed the active consent after session completion.' },
  { id: 'acc3', actor: 'System', role: 'Automated', time: '10:30 AM', reason: 'Version update logged', detail: 'Consent record updated to v3 after discharge.' },
]

function stateTone(state: ConsentState) {
  if (state === 'active') return 'emerald' as const
  if (state === 'pending') return 'amber' as const
  if (state === 'withdrawn') return 'rose' as const
  return 'neutral' as const
}

function versionStatusTone(status: VersionStatus) {
  if (status === 'current') return 'emerald' as const
  if (status === 'withdrawn') return 'rose' as const
  return 'neutral' as const
}

export function A15() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [openVersionId, setOpenVersionId] = useState<string>(`v${record.activeVersion}`)
  const [compareVersionId, setCompareVersionId] = useState<string | null>(null)
  const [selectedAccessId, setSelectedAccessId] = useState<string | null>(null)
  const [exportState, setExportState] = useState<'idle' | 'working' | 'done'>('idle')
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const tone = stateTone(consentState)

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [])

  const exportRecord = () => {
    if (exportState !== 'idle') return
    setExportState('working')
    timersRef.current.push(
      setTimeout(() => {
        setExportState('done')
        notify({
          title: 'Consent record exported',
          body: `${record.patient} · full history downloaded · access logged`,
          kind: 'ok',
        })
      }, 1400),
    )
  }

  const openCompare = (versionId: string) => setCompareVersionId(versionId)
  const closeCompare = () => setCompareVersionId(null)
  const openAccessDetail = (accessId: string) => setSelectedAccessId(accessId)
  const closeAccessDetail = () => setSelectedAccessId(null)

  const compareVersion = compareVersionId ? versions.find((v) => v.id === compareVersionId) : null
  const selectedAccess = selectedAccessId ? accessEntries.find((a) => a.id === selectedAccessId) : null

  return (
    <Screen>
      <AppBar
        title="Consent detail"
        subtitle={`Record #${record.id}`}
        onBack={() => navigate('/admin/a06')}
      />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />

          <AccentHero tone={tone}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
                Consent record
              </span>
              <StatusPill
                tone={tone}
                label={consentState === 'active' ? 'Active' : consentState === 'pending' ? 'Pending renewal' : consentState === 'withdrawn' ? 'Withdrawn' : 'Expired'}
              />
            </div>

            <div className="mt-3 flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-black text-white">
                {record.patient.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {record.patient}
                </h2>
                <p className="mt-0.5 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Guardian: {record.guardian}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">
                  Active version
                </span>
                <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">
                  v{record.activeVersion}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">
                  Last signed
                </span>
                <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">
                  {record.lastSigned}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">
                  Renewal due
                </span>
                <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">
                  {record.renewalDue}
                </span>
              </div>
            </div>
          </AccentHero>

          <SectionHeader label="Version history" done={false} trailing={`${versions.length} versions`} />

          <Card>
            <div className="p-4">
              <div className="flex flex-col gap-2">
                {versions.map((version) => {
                  const isOpen = openVersionId === version.id
                  const isCurrent = version.version === record.activeVersion
                  const versionTone = versionStatusTone(version.status)
                  return (
                    <div
                      key={version.id}
                      className={cn(
                        'rounded-2xl border-l-4',
                        isCurrent ? 'border-emerald-500 bg-emerald-500/[0.06]' : version.status === 'withdrawn' ? 'border-rose-500 bg-rose-500/[0.04]' : 'border-[#0B211B]/10 bg-[#0B211B]/[0.03]',
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenVersionId(isOpen ? '' : version.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center gap-3 px-3 py-3 text-left"
                      >
                        <span
                          className={cn(
                            'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                            isCurrent ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/60',
                          )}
                        >
                          <FileText className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold tracking-tight text-[#0B211B]">
                              v{version.version}
                            </span>
                            {isCurrent && (
                              <Chip intent={versionTone} className="border-transparent">
                                Current
                              </Chip>
                            )}
                            {version.status === 'withdrawn' && (
                              <Chip intent="danger" className="border-transparent">
                                Withdrawn
                              </Chip>
                            )}
                          </div>
                          <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">
                            {version.summary}
                          </div>
                          <div className="mt-0.5 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/40">
                            {version.date}
                          </div>
                        </div>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 shrink-0 text-[#0B211B]/30 transition-transform duration-200',
                            isOpen && 'rotate-180',
                          )}
                        />
                      </button>

                      <Expand open={isOpen}>
                        <div className="px-3 pb-3">
                          <div className="rounded-2xl bg-white/60 p-3">
                            <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                              Signatories
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {version.signatories.map((signatory) => (
                                <span
                                  key={signatory}
                                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0B211B]/[0.05] px-2.5 py-1 text-[10px] font-bold text-[#0B211B]/70"
                                >
                                  <UserRound className="h-3 w-3" strokeWidth={2.4} />
                                  {signatory}
                                </span>
                              ))}
                            </div>

                            <div className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                              Scopes granted
                            </div>
                            <div className="mt-1.5 flex flex-col gap-1.5">
                              {version.scopes.map((scope) => (
                                <div key={scope.id} className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'grid h-4 w-4 shrink-0 place-items-center rounded-full',
                                      scope.granted ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
                                    )}
                                  >
                                    {scope.granted && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                                  </span>
                                  <span className={cn('text-[11px] font-semibold', scope.granted ? 'text-[#0B211B]/75' : 'text-[#0B211B]/35')}>
                                    {scope.name}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                              Changes
                            </div>
                            <div className="mt-1.5 flex flex-col gap-1">
                              {version.changes.map((change) => (
                                <span key={change} className="text-[11px] font-medium text-[#0B211B]/65">
                                  {change}
                                </span>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => openCompare(version.id)}
                              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B211B]/[0.05] py-2.5 text-[11px] font-bold text-[#0B211B]/70"
                            >
                              <Link2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                              Compare with previous
                            </button>
                          </div>
                        </div>
                      </Expand>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 border-t border-[#0B211B]/[0.05] pt-4">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                  Access log
                </div>
                <div className="mt-2 flex flex-col gap-1.5">
                  {accessEntries.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => openAccessDetail(entry.id)}
                      className="flex items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
                    >
                      <Tile
                        icon={entry.role === 'Automated' ? FileClock : UserRound}
                        tone="neutral"
                        className="size-7 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12px] font-bold text-[#0B211B]/80">{entry.actor}</div>
                        <div className="mt-0.5 truncate text-[10px] font-medium text-[#0B211B]/55">
                          {entry.role} · {entry.reason}
                        </div>
                        <div className="font-mono text-[9px] font-bold tabular-nums text-[#0B211B]/35">
                          {entry.time}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Panel intent="info" className="flex items-start gap-3 p-4">
            <Tile icon={Lock} tone="info" />
            <p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">
              Every version and access is sealed into the consent record. Changes require witness or guardian signature.
            </p>
          </Panel>

          <EndOfScroll label="End of consent record" />
        </div>
      </BodyArea>
      <FootBar>
        <button
          type="button"
          onClick={exportRecord}
          disabled={exportState !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all',
            exportState === 'done'
              ? 'bg-emerald-500/[0.1] text-emerald-700'
              : exportState === 'working'
                ? 'cursor-wait bg-emerald-500/10 text-emerald-600/70'
                : 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.6)]',
          )}
        >
          {exportState === 'working' ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
          ) : exportState === 'done' ? (
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} />
          ) : (
            <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} />
          )}
          {exportState === 'idle' ? 'Export record' : exportState === 'working' ? 'Preparing export' : 'Export complete'}
        </button>
      </FootBar>

      <AnimatePresence>
        {compareVersion && (
          <motion.div
            key="compare-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCompare}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {compareVersion && (
          <motion.div
            key="compare-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3">
              <div className="flex items-start gap-3">
                <Tile icon={Link2} tone="info" size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Compare versions</div>
                  <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">v{compareVersion.version} vs previous</div>
                </div>
                <button
                  type="button"
                  onClick={closeCompare}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="rounded-2xl bg-[#0B211B]/[0.04] p-3">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    Scopes
                  </div>
                  {compareVersion.scopes.map((scope) => {
                    const prev = versions.find((v) => v.version === compareVersion.version - 1)
                    const prevScope = prev?.scopes.find((s) => s.name === scope.name)
                    const wasGranted = prevScope?.granted ?? false
                    const changed = wasGranted !== scope.granted
                    return (
                      <div key={scope.id} className="mt-2 flex items-center gap-2">
                        <span
                          className={cn(
                            'grid h-4 w-4 shrink-0 place-items-center rounded-full',
                            scope.granted ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
                          )}
                        >
                          {scope.granted && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                        </span>
                        <span className="min-w-0 flex-1 break-words text-[11px] font-semibold text-[#0B211B]/75">
                          {scope.name}
                        </span>
                        {changed && (
                          <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.1em] text-amber-600">
                            Changed
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="rounded-2xl bg-[#0B211B]/[0.04] p-3">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    Changes
                  </div>
                  {compareVersion.changes.map((change) => (
                    <p key={change} className="mt-1 break-words text-[11px] font-medium text-[#0B211B]/65">
                      {change}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <button
                  type="button"
                  onClick={closeCompare}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedAccess && (
          <motion.div
            key="access-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAccessDetail}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedAccess && (
          <motion.div
            key="access-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-7 pt-3">
              <div className="flex items-start gap-3">
                <Tile icon={UserRound} tone="info" size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{selectedAccess.actor}</div>
                  <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                    {selectedAccess.role} · {selectedAccess.time}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeAccessDetail}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="rounded-2xl bg-[#0B211B]/[0.04] p-3">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    Reason
                  </div>
                  <p className="mt-1 break-words text-[12px] font-medium text-[#0B211B]/65">
                    {selectedAccess.reason}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#0B211B]/[0.04] p-3">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    Detail
                  </div>
                  <p className="mt-1 break-words text-[12px] font-medium text-[#0B211B]/65">
                    {selectedAccess.detail}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  type="button"
                  onClick={closeAccessDetail}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
