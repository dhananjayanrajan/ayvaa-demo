import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, ShieldAlert } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Panel, Tile } from '@/components/base/phone/kit'
import { AccentHero } from '@/components/base/phone/accent-hero'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { UserDetailHero } from '@/components/patterns/heroes/user-detail-hero'
import { ProfileEditor } from '@/components/patterns/forms/profile-editor'
import { AccountActions } from '@/components/patterns/actions'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { fieldState, isValidEmail, isValidPhone } from '@/data/patientOnboarding'
import { mergeTargets, user } from '@/data/admin/a13Data'

type Form = { name: string; phone: string; email: string; address: string }
type MergeState = 'idle' | 'selecting' | 'merged'

export function A13() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [form, setForm] = useState<Form>({ name: user.name, phone: user.phone, email: user.email, address: user.address })
  const [status, setStatus] = useState(user.status)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [suspendSheetOpen, setSuspendSheetOpen] = useState(false)
  const [suspending, setSuspending] = useState(false)
  const [mergeState, setMergeState] = useState<MergeState>('idle')
  const [selectedTarget, setSelectedTarget] = useState('')
  const [merging, setMerging] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const changes = form.name !== user.name || form.phone !== user.phone || form.email !== user.email || form.address !== user.address
  const nameState = fieldState(form.name, form.name.trim().length >= 2)
  const emailState = fieldState(form.email, isValidEmail(form.email))
  const phoneState = fieldState(form.phone, isValidPhone(form.phone))
  const addressState = fieldState(form.address, form.address.trim().length >= 5)
  const stepsDone = [nameState, emailState, phoneState, addressState].filter((s) => s === 'valid').length

  useEffect(() => { const t = timersRef.current; return () => t.forEach(clearTimeout) }, [])

  const updateField = (key: keyof Form, value: string) => { setForm((p) => ({ ...p, [key]: value })); setSaved(false) }
  const saveProfile = () => {
    if (saving || saved || !changes) return
    setSaving(true)
    timersRef.current.push(setTimeout(() => { setSaving(false); setSaved(true); notify({ title: 'Profile saved', body: `${form.name} · changes sealed in audit log`, kind: 'ok' }) }, 1200))
  }
  const confirmSuspend = () => {
    if (suspending) return
    setSuspending(true)
    timersRef.current.push(setTimeout(() => { setSuspending(false); setSuspendSheetOpen(false); setStatus('suspended'); notify({ title: 'Account suspended', body: `${user.name} · all access revoked · audit updated`, kind: 'warn' }) }, 1400))
  }
  const confirmMerge = () => {
    if (merging || !selectedTarget) return
    setMerging(true)
    timersRef.current.push(setTimeout(() => { setMerging(false); setMergeState('merged'); notify({ title: 'Accounts merged', body: `${user.name} merged into ${mergeTargets.find((t) => t.id === selectedTarget)?.name} · audit updated`, kind: 'ok' }) }, 1400))
  }

  return (
    <Screen>
      <AppBar title="User details" subtitle={`Record #${user.id}`} onBack={() => navigate('/admin/a04')} />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <UserDetailHero id={user.id} name={user.name} initials={user.initials} role={user.role} joined={user.joined} email={form.email} phone={form.phone} status={status} />
          <ProfileEditor form={form} saved={saved} changes={changes} stepsDone={stepsDone} nameState={nameState} phoneState={phoneState} emailState={emailState} addressState={addressState} onChange={updateField} />
          <AccountActions status={status} mergeState={mergeState} mergeTargets={mergeTargets} selectedTarget={selectedTarget} merging={merging} onSuspend={() => setSuspendSheetOpen(true)} onToggleMerge={() => setMergeState(mergeState === 'idle' ? 'selecting' : 'idle')} onSelectTarget={setSelectedTarget} onConfirmMerge={confirmMerge} />
          <Panel intent="info" className="flex items-start gap-3 p-4"><Tile icon={ShieldAlert} tone="info" /><p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">All actions on this screen are recorded in the immutable audit log.</p></Panel>
          <EndOfScroll label="End of user details" />
        </div>
      </BodyArea>
      <FootBar><button type="button" onClick={saveProfile} disabled={saving || saved || !changes} className={cn('flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', saved ? 'bg-emerald-500/[0.1] text-emerald-700' : changes ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30')}>{saving ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} />}{saving ? 'Saving…' : saved ? 'Saved' : 'Save'}</button></FootBar>
      <AnimatePresence>{suspendSheetOpen && <motion.div key="suspend-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSuspendSheetOpen(false)} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />}</AnimatePresence>
      <AnimatePresence>{suspendSheetOpen && <SheetShell key="suspend-sheet" icon={ShieldAlert} tone="info" title="Suspend account" subtitle={user.name} onClose={() => setSuspendSheetOpen(false)} footer={<div className="flex gap-2"><button type="button" onClick={() => setSuspendSheetOpen(false)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75">Cancel</button><button type="button" onClick={confirmSuspend} disabled={suspending} className={cn('flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-all', suspending ? 'cursor-wait bg-rose-500/60' : 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]')}>{suspending ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <ShieldAlert className="h-4 w-4" strokeWidth={2.4} />}{suspending ? 'Suspending…' : 'Suspend'}</button></div>}><AccentHero tone="rose"><div className="flex items-start justify-between gap-3"><span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/60">Irreversible action</span></div><h2 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">Suspend {user.name}?</h2><p className="mt-1 text-[12px] font-medium leading-relaxed text-rose-100/55">All access will be revoked immediately. This action is permanent.</p><div className="mt-4 space-y-2"><div className="rounded-2xl bg-white/[0.06] p-3"><div className="text-[9px] font-bold uppercase tracking-[0.14em] text-rose-200/50">Consequence</div><p className="mt-1 break-words text-[12px] font-medium leading-relaxed text-white/85">Login disabled, sessions cancelled, consent frozen.</p></div></div></AccentHero></SheetShell>}</AnimatePresence>
    </Screen>
  )
}
