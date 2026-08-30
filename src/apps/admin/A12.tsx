import { useRef, useState } from 'react'
import { Check, ChevronDown, FileText, Loader2, ShieldCheck, UserCheck, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Meter, Panel, Section, Tile } from '@/components/phone/kit'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type DocumentDetail = { label: string; value: string }

type Document = {
  id: string
  name: string
  type: string
  size: string
  status: 'verified' | 'pending'
  details: DocumentDetail[]
}

type CheckItem = {
  id: string
  label: string
  status: 'ok' | 'running' | 'pending'
  sub: string
}

const application = {
  id: 'APP-20250315-04',
  name: 'Lakshmi Reddy',
  role: 'Registered Nurse',
  licence: 'RN-KA-2241',
  experience: '5 years',
  applied: 'Mar 14, 2025',
  initials: 'LR',
}

const documents: Document[] = [
  {
    id: 'doc1',
    name: 'Nursing degree certificate',
    type: 'PDF',
    size: '1.2 MB',
    status: 'verified',
    details: [
      { label: 'Institution', value: 'Rajiv Gandhi University' },
      { label: 'Degree', value: 'Bachelor of Science in Nursing' },
      { label: 'Graduated', value: '2019' },
    ],
  },
  {
    id: 'doc2',
    name: 'Karnataka Nursing Council licence',
    type: 'PDF',
    size: '0.8 MB',
    status: 'verified',
    details: [
      { label: 'Licence number', value: 'RN-KA-2241' },
      { label: 'Valid until', value: 'March 2027' },
    ],
  },
  {
    id: 'doc3',
    name: 'Background check consent form',
    type: 'PDF',
    size: '0.4 MB',
    status: 'pending',
    details: [
      { label: 'Agency', value: 'Third-party screening' },
      { label: 'Expected', value: 'Within 24 hours' },
    ],
  },
]

const checks: CheckItem[] = [
  { id: 'chk1', label: 'Identity verification', status: 'ok', sub: 'Aadhaar matched with selfie' },
  { id: 'chk2', label: 'Licence verification', status: 'ok', sub: 'Confirmed with state council' },
  { id: 'chk3', label: 'Background check', status: 'running', sub: 'Third-party screening in progress' },
  { id: 'chk4', label: 'Experience verification', status: 'pending', sub: 'Awaiting employer response' },
]

type Decision = 'approved' | 'rejected' | null

const TONE = {
  pending: {
    hero: 'amber' as const,
    pill: 'amber' as const,
    meterIntent: 'warning' as const,
  },
  approved: {
    hero: 'emerald' as const,
    pill: 'emerald' as const,
    meterIntent: 'success' as const,
  },
  rejected: {
    hero: 'rose' as const,
    pill: 'rose' as const,
    meterIntent: 'danger' as const,
  },
}

export function A12() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [openDocId, setOpenDocId] = useState<string | null>(null)
  const [decision, setDecision] = useState<Decision>(null)
  const [working, setWorking] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const tone = decision === 'approved' ? TONE.approved : decision === 'rejected' ? TONE.rejected : TONE.pending
  const verifiedCount = checks.filter((c) => c.status === 'ok').length
  const verificationProgress = verifiedCount / checks.length

  const cleanup = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const decide = (approve: boolean) => {
    if (working || decision) return
    setWorking(true)
    const timer = setTimeout(() => {
      setWorking(false)
      setDecision(approve ? 'approved' : 'rejected')
      notify({
        title: approve ? 'Application approved' : 'Application rejected',
        body: `${application.name} · audit log updated`,
        kind: 'ok',
      })
    }, 1400)
    timersRef.current.push(timer)
  }

  const toggleDoc = (id: string) => {
    setOpenDocId((prev) => (prev === id ? null : id))
  }

  return (
    <Screen>
      <AppBar
        title="Application review"
        subtitle={`Case #${application.id}`}
        onBack={() => navigate('/admin/a03')}
      />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-amber-400/[0.16] blur-3xl" />

          <AccentHero tone={tone.hero}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/60">
                Application #{application.id}
              </span>
              <StatusPill
                tone={tone.pill}
                label={decision === 'approved' ? 'Approved' : decision === 'rejected' ? 'Rejected' : 'Pending'}
                live={!decision}
              />
            </div>

            <div className="mt-4 flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-black text-white">
                {application.initials}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {application.name}
                </h2>
                <p className="mt-0.5 text-[12px] font-medium leading-relaxed text-amber-100/55">
                  {application.role}
                </p>
                <p className="text-[12px] font-medium leading-relaxed text-amber-100/55">
                  {application.experience}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-amber-100/50">
                <span>Verification progress</span>
                <span className="tabular-nums text-amber-200">{verifiedCount}/{checks.length}</span>
              </div>
              <Meter value={verificationProgress} intent={tone.meterIntent} delay={0.2} className="mt-2" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-200/50">
                  Licence
                </span>
                <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">
                  {application.licence}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-200/50">
                  Applied
                </span>
                <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">
                  {application.applied}
                </span>
              </div>
            </div>
          </AccentHero>

          <Section
            label="Documents"
            trailing={<Chip intent="warning">{documents.filter((d) => d.status === 'pending').length} pending</Chip>}
          />
          <Card>
            <div className="flex flex-col gap-2 p-2">
              {documents.map((doc) => {
                const isOpen = openDocId === doc.id
                const isPending = doc.status === 'pending'
                return (
                  <div key={doc.id} className="rounded-2xl bg-[#0B211B]/[0.035]">
                    <button
                      type="button"
                      onClick={() => toggleDoc(doc.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-3 px-3 py-3 text-left"
                    >
                      <Tile icon={FileText} tone={isPending ? 'warning' : 'success'} />
                      <div className="min-w-0 flex-1">
                        <div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">{doc.name}</div>
                        <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/55">
                          {doc.type} · {doc.size}
                        </div>
                        <div className="mt-1.5">
                          <Chip intent={isPending ? 'warning' : 'success'} dot={isPending}>
                            {isPending ? 'Pending' : 'Verified'}
                          </Chip>
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
                        <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3">
                          <div className="flex flex-col gap-2.5">
                            {doc.details.map((detail) => (
                              <div key={detail.label} className="flex items-baseline justify-between gap-3">
                                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
                                  {detail.label}
                                </span>
                                <span className="min-w-0 break-words text-right text-[12px] font-bold text-[#0B211B]/80">
                                  {detail.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Expand>
                  </div>
                )
              })}
            </div>
          </Card>

          <Section
            label="Auto verification"
            trailing={<Chip intent="info">{verifiedCount} of {checks.length} complete</Chip>}
          />
          <Card>
            <div className="p-4">
              <div className="flex flex-col gap-3">
                {checks.map((check) => {
                  const isOk = check.status === 'ok'
                  const isRunning = check.status === 'running'
                  return (
                    <div key={check.id} className="flex items-start gap-3">
                      <span
                        className={cn(
                          'grid h-5 w-5 shrink-0 place-items-center rounded-full',
                          isOk ? 'bg-emerald-500 text-white' : isRunning ? 'bg-amber-400' : 'bg-[#0B211B]/[0.1]',
                        )}
                      >
                        {isOk ? (
                          <Check className="h-3 w-3" strokeWidth={3.5} />
                        ) : isRunning ? (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                          </span>
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-[#0B211B]/30" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">{check.label}</div>
                        <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{check.sub}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          <Panel intent="info" className="flex items-start gap-3 p-4">
            <Tile icon={ShieldCheck} tone="info" />
            <p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">
              Review all documents and verification checks before making a decision. Decisions are recorded in the audit log.
            </p>
          </Panel>

          <EndOfScroll label="End of application review" />
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => decide(false)}
              disabled={working || decision !== null}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all',
                decision === 'rejected'
                  ? 'bg-rose-500/[0.1] text-rose-700'
                  : 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]',
                (working || decision) && 'cursor-not-allowed opacity-50',
              )}
            >
              {working && decision === null ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              ) : (
                <X className="h-4 w-4 shrink-0" strokeWidth={2.4} />
              )}
              Reject
            </button>
            <button
              type="button"
              onClick={() => decide(true)}
              disabled={working || decision !== null}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all',
                decision === 'approved'
                  ? 'bg-emerald-500/[0.1] text-emerald-700'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
                (working || decision) && 'cursor-not-allowed opacity-50',
              )}
            >
              {working && decision === null ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              ) : (
                <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} />
              )}
              Approve
            </button>
          </div>
          {decision && (
            <p className="text-center text-[10px] font-bold text-[#0B211B]/50">
              Decision recorded · audit log updated
            </p>
          )}
        </div>
      </FootBar>
    </Screen>
  )
}
