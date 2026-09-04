import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { AppBar } from '@/components/base/phone/app-bar'
import { Screen } from '@/components/base/phone/screen'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { ESCALATIONS } from '@/data/admin/a17Data'
import { SlaHero } from '@/components/patterns/heroes/sla-hero'
import { EscalationRail } from '@/components/patterns/lists/escalation-rail'
import { ContactSheet, AssignSheet } from '@/components/patterns/sheets/sla-sheets'

export function A17() {
  const { navigate } = useRouter()
  const { notify } = useDemo()
  const [contactOpen, setContactOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const openCount = ESCALATIONS.filter((e) => e.status !== 'resolved').length
  const slaBreaches = ESCALATIONS.filter((e) => e.priority === 'P1' && e.status === 'open').length
  const handleAssign = (id: string) => { setSelectedId(id); setAssignOpen(true) }
  const handleResolve = (id: string) => notify({ title: 'Ticket resolved', body: `${id} marked as handled`, kind: 'ok' })
  const confirmAssign = (name: string) => notify({ title: 'Agent assigned', body: `${name} handling ${selectedId}`, kind: 'ok' })
  return (
    <Screen>
      <AppBar title="Escalation desk" onBack={() => navigate('/admin/a08')} />
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 pb-8 pt-3">
        <SlaHero openCount={openCount} slaBreaches={slaBreaches} />
        <EscalationRail onAssign={handleAssign} onResolve={handleResolve} />
        <div className="flex gap-2"><button type="button" onClick={() => setContactOpen(true)} className="flex flex-1 items-center justify-center rounded-2xl bg-emerald-500/[0.08] py-3 text-sm font-bold text-emerald-700">Contact</button><button type="button" onClick={() => setAssignOpen(true)} className="flex flex-1 items-center justify-center rounded-2xl bg-[#0B211B]/[0.06] py-3 text-sm font-bold text-[#0B211B]/70">Assign</button></div>
      </div>
      <AnimatePresence>
        {contactOpen && <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />}
        {assignOpen && <AssignSheet open={assignOpen} onClose={() => setAssignOpen(false)} onConfirm={confirmAssign} />}
      </AnimatePresence>
    </Screen>
  )
}
