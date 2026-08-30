import { useEffect, useRef, useState } from 'react'
import { Check, Download, FileClock, Link2, Loader2, Lock, ShieldCheck, UserRound } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Tile } from '@/components/phone/kit'
import { StatusPill } from '@/components/patient/matching/StatusPill'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type RecordKind = 'event' | 'access'

type RecordEntry = {
  id: string
  kind: RecordKind
  step: number
  timestamp: string
  actor: string
  role: string
  action: string
  reference: string
  isCurrent: boolean
}

const sealedRecord = {
  id: 'AUD-20250315-0842',
  fingerprint: '0x8f3a…c2d1e9b7a4f6c8d2b1a3e5f7',
}

const recordEntries: RecordEntry[] = [
  {
    id: 'ent-1',
    kind: 'event',
    step: 1,
    timestamp: '10:15 AM',
    actor: 'Lakshmi Reddy',
    role: 'Registered Nurse',
    action: 'Session check-in',
    reference: '0x2b6e…f8a1',
    isCurrent: false,
  },
  {
    id: 'ent-2',
    kind: 'event',
    step: 2,
    timestamp: '10:22 AM',
    actor: 'Lakshmi Reddy',
    role: 'Registered Nurse',
    action: 'Vitals recorded',
    reference: '0x4e7b…a9e3',
    isCurrent: false,
  },
  {
    id: 'ent-3',
    kind: 'event',
    step: 3,
    timestamp: '10:30 AM',
    actor: 'Lakshmi Reddy',
    role: 'Registered Nurse',
    action: 'Session completed',
    reference: '0x8f3a…c2d1',
    isCurrent: true,
  },
  {
    id: 'ent-4',
    kind: 'access',
    step: 4,
    timestamp: '10:31 AM',
    actor: 'Priya Sharma',
    role: 'Guardian',
    action: 'Viewed session summary',
    reference: '0x1c9d…77f0',
    isCurrent: false,
  },
  {
    id: 'ent-5',
    kind: 'access',
    step: 5,
    timestamp: '10:45 AM',
    actor: 'Dr. Ananya Rao',
    role: 'Supervisor',
    action: 'Quality review',
    reference: '0x3a5e…b2c4',
    isCurrent: false,
  },
]

type VerifyState = 'idle' | 'working' | 'done'

export function A14() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [verifyState, setVerifyState] = useState<VerifyState>('idle')
  const [exportState, setExportState] = useState<'idle' | 'working' | 'done'>('idle')
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [])

  const verifyRecord = () => {
    if (verifyState !== 'idle') return
    setVerifyState('working')
    timersRef.current.push(
      setTimeout(() => {
        setVerifyState('done')
        notify({ title: 'Record verified', body: 'All entries match · no tampering detected', kind: 'ok' })
      }, 1600),
    )
  }

  const exportRecord = () => {
    if (exportState !== 'idle') return
    setExportState('working')
    timersRef.current.push(
      setTimeout(() => {
        setExportState('done')
        notify({ title: 'Record exported', body: 'Lifecycle record downloaded · access logged', kind: 'ok' })
      }, 1400),
    )
  }

  return (
    <Screen>
      <AppBar
        title="Record history"
        subtitle={`Record #${sealedRecord.id}`}
        onBack={() => navigate('/admin/a05')}
      />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />

          <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#062419] shadow-[0_28px_64px_-30px_rgba(5,150,105,0.6)]">
            <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-500/25 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
            <div className="relative flex items-center justify-between gap-3 p-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
                  <Lock className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
                    Sealed record
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[11px] font-bold text-emerald-100/80">
                    {sealedRecord.fingerprint}
                  </span>
                </span>
              </div>
              <StatusPill tone="emerald" label="Sealed" />
            </div>
          </div>

          <Card>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <span className="block text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
                  Lifecycle timeline
                </span>
                <span className="mt-0.5 block text-[13px] font-bold tracking-tight text-[#0B211B]">
                  {recordEntries.length} linked entries
                </span>
              </div>
              <button
                type="button"
                onClick={verifyRecord}
                disabled={verifyState !== 'idle'}
                className={cn(
                  'flex shrink-0 items-center justify-center gap-2 rounded-2xl px-3.5 py-2.5 text-[11px] font-bold transition-all',
                  verifyState === 'done'
                    ? 'bg-emerald-500/[0.1] text-emerald-700'
                    : verifyState === 'working'
                      ? 'cursor-wait bg-emerald-500/10 text-emerald-600/70'
                      : 'bg-emerald-500 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)]',
                )}
              >
                {verifyState === 'working' ? (
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
                ) : verifyState === 'done' ? (
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
                )}
                {verifyState === 'done' ? 'Verified' : verifyState === 'working' ? 'Verifying' : 'Verify record'}
              </button>
            </div>

            <div className="px-4 pb-4">
              <div className="flex flex-col">
                {recordEntries.map((entry, i) => {
                  const isLast = i === recordEntries.length - 1
                  const isAccess = entry.kind === 'access'
                  return (
                    <div key={entry.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={cn(
                            'relative mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full',
                            entry.isCurrent
                              ? 'bg-emerald-500 text-white'
                              : 'bg-emerald-500/[0.15] text-emerald-600',
                          )}
                        >
                          {verifyState === 'done' ? (
                            <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                          ) : entry.isCurrent ? (
                            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                          ) : (
                            <Lock className="h-3.5 w-3.5" strokeWidth={2.4} />
                          )}
                        </span>
                        {!isLast && (
                          <span
                            className={cn(
                              'my-1 w-px flex-1',
                              verifyState === 'done'
                                ? 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15'
                                : 'bg-gradient-to-b from-emerald-500/30 via-emerald-400/15 to-transparent',
                            )}
                          />
                        )}
                      </div>
                      <div
                        className={cn(
                          'min-w-0 flex-1 rounded-2xl p-3',
                          entry.isCurrent ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03]',
                          !isLast && 'mb-3',
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[13px] font-bold tracking-tight text-[#0B211B]">
                            Step {entry.step}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/40">
                            {entry.timestamp}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-start gap-2">
                          <Tile
                            icon={isAccess ? FileClock : UserRound}
                            tone={entry.isCurrent ? 'success' : 'neutral'}
                            className="size-7 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="break-words text-[12px] font-bold leading-snug text-[#0B211B]/80">
                              {entry.action}
                            </div>
                            <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">
                              {entry.actor} · {entry.role}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-white/60 px-2.5 py-1.5">
                          <Link2 className="h-3 w-3 shrink-0 text-[#0B211B]/40" strokeWidth={2} />
                          <span className="font-mono text-[10px] font-bold text-[#0B211B]/70">{entry.reference}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          <div className="rounded-2xl bg-emerald-500/[0.06] p-3.5">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} />
              <p className="min-w-0 flex-1 text-pretty break-words text-[11px] font-bold leading-snug text-emerald-900/80">
                Each action on this record is appended to the timeline. The record cannot be altered without detection.
              </p>
            </div>
          </div>

          <EndOfScroll label="End of record history" />
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
    </Screen>
  )
}
