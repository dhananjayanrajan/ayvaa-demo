import { useEffect, useRef, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Panel, Section, Tile } from '@/components/base/phone/kit'
import { ApplicationHero } from '@/components/patterns/heroes/application-hero'
import { DocumentList } from '@/components/patterns/lists/document-list'
import { VerificationList } from '@/components/patterns/lists/verification-list'
import { ApplicationDecision } from '@/components/patterns/actions'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { TONE, application, checks, documents } from '@/data/admin/a12Data'

type Decision = 'approved' | 'rejected' | null

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
  const label = decision === 'approved' ? 'Approved' : decision === 'rejected' ? 'Rejected' : 'Pending'

  useEffect(() => () => { timersRef.current.forEach(clearTimeout); timersRef.current = [] }, [])

  const decide = (approve: boolean) => {
    if (working || decision) return
    setWorking(true)
    const timer = setTimeout(() => {
      setWorking(false)
      setDecision(approve ? 'approved' : 'rejected')
      notify({ title: approve ? 'Application approved' : 'Application rejected', body: `${application.name} · audit log updated`, kind: 'ok' })
    }, 1400)
    timersRef.current.push(timer)
  }

  return (
    <Screen>
      <AppBar title="Application review" subtitle={`Case #${application.id}`} onBack={() => navigate('/admin/a03')} />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-amber-400/[0.16] blur-3xl" />
          <ApplicationHero id={application.id} name={application.name} initials={application.initials} role={application.role} experience={application.experience} licence={application.licence} applied={application.applied} verifiedCount={verifiedCount} total={checks.length} progress={verificationProgress} tone={tone} label={label} live={!decision} />
          <Section label="Documents" trailing={<Chip intent="warning">{documents.filter((d) => d.status === 'pending').length} pending</Chip>} />
          <DocumentList documents={documents} openId={openDocId} onToggle={(id) => setOpenDocId((p) => (p === id ? null : id))} />
          <Section label="Auto verification" trailing={<Chip intent="info">{verifiedCount} of {checks.length} complete</Chip>} />
          <VerificationList checks={checks} />
          <Panel intent="info" className="flex items-start gap-3 p-4"><Tile icon={ShieldCheck} tone="info" /><p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">Review all documents and verification checks before making a decision. Decisions are recorded in the audit log.</p></Panel>
          <EndOfScroll label="End of application review" />
        </div>
      </BodyArea>
      <FootBar><ApplicationDecision decision={decision} working={working} onDecide={decide} /></FootBar>
    </Screen>
  )
}
