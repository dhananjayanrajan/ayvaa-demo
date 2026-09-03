import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { Screen } from '@/components/phone/Screen'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { INITIAL_POLICY, INITIAL_HOLDS, PATIENTS } from '@/data/admin/a16Data'
import type { RecordType, LegalHold } from '@/data/admin/a16Data'
import { RetentionHero } from '@/components/admin/heroes/RetentionHero'
import { HoldsList } from '@/components/admin/lists/HoldsList'
import { PurgePreview } from '@/components/admin/metrics/PurgePreview'
import { RetentionAuditTimeline } from '@/components/admin/lists/RetentionAuditTimeline'
import { EditPolicySheet } from '@/components/admin/sheets/EditPolicySheet'
import { PlaceHoldSheet } from '@/components/admin/sheets/PlaceHoldSheet'

export function A16() {
  const { navigate } = useRouter()
  const { notify } = useDemo()
  const [policy, setPolicy] = useState<RecordType>(INITIAL_POLICY)
  const [holds, setHolds] = useState<LegalHold[]>(INITIAL_HOLDS)
  const [editOpen, setEditOpen] = useState(false)
  const [holdOpen, setHoldOpen] = useState(false)
  const activeHoldsCount = holds.filter((h) => h.status === 'active').length

  const handleSavePolicy = (years: number) => {
    setPolicy((prev) => ({ ...prev, years, lastEdited: 'Just now', purgeCount: Math.round(prev.purgeCount * (years / prev.years)) }))
    notify({ title: 'Policy sealed', body: `Retention updated to ${years} years`, kind: 'ok' })
    setEditOpen(false)
  }
  const handlePlaceHold = (patient: string, reason: string) => {
    const p = PATIENTS.find((pt) => pt.name === patient)
    const newHold: LegalHold = { id: `h-${Date.now()}`, patient, initials: p?.initials ?? 'XX', caseRef: `LGL-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`, reason, placedOn: 'Today', status: 'active' }
    setHolds((prev) => [newHold, ...prev])
    notify({ title: 'Hold sealed', body: `${patient}'s records are frozen`, kind: 'ok' })
    setHoldOpen(false)
  }
  const handleLiftHold = (id: string) => {
    setHolds((prev) => prev.map((h) => (h.id === id ? { ...h, status: 'lifted' as const } : h)))
    notify({ title: 'Hold lifted', body: 'Records will resume normal retention', kind: 'info' })
  }
  return (
    <Screen>
      <AppBar title="Policy editor" onBack={() => navigate('/admin/a07')} trailing={<motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => setHoldOpen(true)} className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_8px_16px_-8px_rgba(16,185,129,0.6)]" aria-label="Place new hold"><Plus className="h-4 w-4" strokeWidth={2.6} aria-hidden /></motion.button>} />
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 pb-8 pt-3">
        <RetentionHero policy={policy} holdsCount={activeHoldsCount} onEdit={() => setEditOpen(true)} />
        <HoldsList holds={holds} onLift={handleLiftHold} />
        <PurgePreview policy={policy} />
        <RetentionAuditTimeline />
        <div className="h-2 shrink-0" />
      </div>
      <AnimatePresence>{editOpen && <EditPolicySheet open={editOpen} policy={policy} onClose={() => setEditOpen(false)} onSave={handleSavePolicy} />}{holdOpen && <PlaceHoldSheet open={holdOpen} onClose={() => setHoldOpen(false)} onConfirm={handlePlaceHold} />}</AnimatePresence>
    </Screen>
  )
}
