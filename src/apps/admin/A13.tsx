import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  User,
  UserRound,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Panel, Tile } from '@/components/phone/kit'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { CredentialCard } from '@/components/patient/onboarding/CredentialCard'
import { Field } from '@/components/phone/Field'
import { SectionHeader } from '@/components/patient/onboarding/SectionHeader'
import { SheetShell } from '@/components/phone/SheetShell'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { fieldState, isValidEmail, isValidPhone } from '@/data/patientOnboarding'

type UserStatus = 'active' | 'suspended'
type Form = { name: string; phone: string; email: string; address: string }
type MergeState = 'idle' | 'selecting' | 'merged'

const user = {
  id: 'USR-20240312-018',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98450 12345',
  address: '42, Palm Grove Road, Indiranagar, Bengaluru',
  role: 'Guardian',
  joined: 'Mar 12, 2024',
  initials: 'PS',
  status: 'active' as UserStatus,
}

const mergeTargets = [
  { id: 'USR-20240108-003', name: 'Rahul Sharma', email: 'rahul.sharma@example.com' },
  { id: 'USR-20240219-011', name: 'Anita Sharma', email: 'anita.sharma@example.com' },
]

const TONE = {
  active: {
    hero: 'emerald' as const,
    pill: 'emerald' as const,
    overline: 'text-emerald-200/60',
    subText: 'text-emerald-100/55',
    label: 'text-emerald-200/50',
    statusLabel: 'Active',
  },
  suspended: {
    hero: 'rose' as const,
    pill: 'rose' as const,
    overline: 'text-rose-200/60',
    subText: 'text-rose-100/55',
    label: 'text-rose-200/50',
    statusLabel: 'Suspended',
  },
}

export function A13() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [form, setForm] = useState<Form>({
    name: user.name,
    phone: user.phone,
    email: user.email,
    address: user.address,
  })
  const [status, setStatus] = useState<UserStatus>(user.status)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [suspendSheetOpen, setSuspendSheetOpen] = useState(false)
  const [suspending, setSuspending] = useState(false)
  const [mergeState, setMergeState] = useState<MergeState>('idle')
  const [selectedTarget, setSelectedTarget] = useState<string>('')
  const [merging, setMerging] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const tone = TONE[status]
  const changes =
    form.name !== user.name ||
    form.phone !== user.phone ||
    form.email !== user.email ||
    form.address !== user.address

  const nameState = fieldState(form.name, form.name.trim().length >= 2)
  const emailState = fieldState(form.email, isValidEmail(form.email))
  const phoneState = fieldState(form.phone, isValidPhone(form.phone))
  const addressState = fieldState(form.address, form.address.trim().length >= 5)

  const stepsDone = [nameState, emailState, phoneState, addressState].filter((s) => s === 'valid').length
  const stepsTotal = 4

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [])

  const updateField = (key: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const saveProfile = () => {
    if (saving || saved || !changes) return
    setSaving(true)
    timersRef.current.push(
      setTimeout(() => {
        setSaving(false)
        setSaved(true)
        notify({ title: 'Profile saved', body: `${form.name} · changes sealed in audit log`, kind: 'ok' })
      }, 1200),
    )
  }

  const confirmSuspend = () => {
    if (suspending) return
    setSuspending(true)
    timersRef.current.push(
      setTimeout(() => {
        setSuspending(false)
        setSuspendSheetOpen(false)
        setStatus('suspended')
        notify({ title: 'Account suspended', body: `${user.name} · all access revoked · audit updated`, kind: 'warn' })
      }, 1400),
    )
  }

  const confirmMerge = () => {
    if (merging || !selectedTarget) return
    setMerging(true)
    timersRef.current.push(
      setTimeout(() => {
        setMerging(false)
        setMergeState('merged')
        notify({
          title: 'Accounts merged',
          body: `${user.name} merged into ${mergeTargets.find((t) => t.id === selectedTarget)?.name} · audit updated`,
          kind: 'ok',
        })
      }, 1400),
    )
  }

  return (
    <Screen>
      <AppBar title="User details" subtitle={`Record #${user.id}`} onBack={() => navigate('/admin/a04')} />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />

          <AccentHero tone={tone.hero}>
            <div className="flex items-start justify-between gap-3">
              <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.22em]', tone.overline)}>
                Record #{user.id}
              </span>
              <StatusPill tone={tone.pill} label={tone.statusLabel} live={status === 'active'} />
            </div>

            <div className="mt-4 flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-black text-white">
                {user.initials}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">{user.name}</h2>
                <p className={cn('mt-0.5 text-[12px] font-medium leading-relaxed', tone.subText)}>{user.role}</p>
                <p className={cn('text-[12px] font-medium leading-relaxed', tone.subText)}>Joined {user.joined}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                <span className={cn('shrink-0 text-[9px] font-bold uppercase tracking-[0.14em]', tone.label)}>Email</span>
                <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{form.email}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                <span className={cn('shrink-0 text-[9px] font-bold uppercase tracking-[0.14em]', tone.label)}>Phone</span>
                <span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{form.phone}</span>
              </div>
            </div>
          </AccentHero>

          <SectionHeader
            label="Edit profile"
            done={saved}
            trailing={changes ? 'Unsaved' : saved ? 'Saved' : 'Current'}
          />
          <CredentialCard
            stepsDone={stepsDone}
            stepsTotal={stepsTotal}
            footerNote="Changes are sealed in the audit log after saving."
          >
            <Field
              icon={User}
              label="Full name"
              htmlFor="a13-name"
              value={form.name}
              placeholder="Enter full name"
              state={nameState}
              invalidHint="Name must be at least 2 characters"
              onChange={(v) => updateField('name', v)}
            />
            <Field
              icon={Phone}
              label="Phone number"
              htmlFor="a13-phone"
              type="tel"
              value={form.phone}
              placeholder="98765 43210"
              state={phoneState}
              invalidHint="Enter a valid phone number"
              onChange={(v) => updateField('phone', v)}
            />
            <Field
              icon={Mail}
              label="Email address"
              htmlFor="a13-email"
              type="email"
              value={form.email}
              placeholder="you@example.com"
              state={emailState}
              invalidHint="Enter a valid email address"
              onChange={(v) => updateField('email', v)}
            />
            <Field
              icon={MapPin}
              label="Address"
              htmlFor="a13-address"
              value={form.address}
              placeholder="Enter full address"
              state={addressState}
              invalidHint="Address must be at least 5 characters"
              onChange={(v) => updateField('address', v)}
            />
          </CredentialCard>

          <SectionHeader label="Account actions" done={false} trailing="Role" />
          <Card>
            <div className="flex flex-col gap-2 p-2">
              <button
                type="button"
                onClick={() => setSuspendSheetOpen(true)}
                disabled={status === 'suspended'}
                className={cn(
                  'flex items-center gap-3 rounded-2xl bg-rose-500/[0.06] px-3 py-3 text-left transition-colors',
                  status !== 'suspended' && 'hover:bg-rose-500/[0.1]',
                  status === 'suspended' && 'cursor-not-allowed opacity-60',
                )}
              >
                <Tile icon={ShieldAlert} tone="danger" />
                <div className="min-w-0 flex-1">
                  <div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">Suspend account</div>
                  <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">
                    {status === 'suspended' ? 'Account is suspended' : 'Revoke all access immediately'}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" />
              </button>

              <button
                type="button"
                onClick={() => setMergeState(mergeState === 'idle' ? 'selecting' : 'idle')}
                disabled={mergeState === 'merged'}
                className={cn(
                  'flex items-center gap-3 rounded-2xl bg-amber-500/[0.06] px-3 py-3 text-left transition-colors',
                  mergeState !== 'merged' && 'hover:bg-amber-500/[0.1]',
                  mergeState === 'merged' && 'cursor-not-allowed opacity-60',
                )}
              >
                <Tile icon={UserRound} tone="warning" />
                <div className="min-w-0 flex-1">
                  <div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">Merge account</div>
                  <div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">
                    {mergeState === 'merged' ? 'Accounts merged' : 'Combine with another guardian record'}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" />
              </button>

              {mergeState === 'selecting' && (
                <div className="rounded-2xl bg-amber-500/[0.06] p-3">
                  <p className="break-words text-[12px] font-medium leading-relaxed text-[#0B211B]/65">
                    Select a record to merge this account into. This cannot be undone.
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {mergeTargets.map((target) => (
                      <button
                        key={target.id}
                        type="button"
                        onClick={() => setSelectedTarget(target.id)}
                        className={cn(
                          'flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-left transition-colors',
                          selectedTarget === target.id ? 'ring-2 ring-amber-500/40' : 'hover:bg-white/70',
                        )}
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 shrink-0 place-items-center rounded-full',
                            selectedTarget === target.id ? 'bg-amber-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
                          )}
                        >
                          {selectedTarget === target.id && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[12px] font-bold text-[#0B211B]">{target.name}</div>
                          <div className="truncate text-[10px] font-medium text-[#0B211B]/55">{target.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={confirmMerge}
                    disabled={!selectedTarget || merging}
                    className={cn(
                      'mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[11px] font-bold text-white',
                      selectedTarget
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]'
                        : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
                      merging && 'cursor-wait opacity-60',
                    )}
                  >
                    {merging ? <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" /> : <UserRound className="h-3.5 w-3.5" strokeWidth={2.4} />}
                    {merging ? 'Merging…' : 'Merge'}
                  </button>
                </div>
              )}

              {mergeState === 'merged' && (
                <div className="rounded-xl bg-emerald-500/[0.08] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" strokeWidth={2.6} />
                    <span className="text-[11px] font-bold text-emerald-700">Accounts merged successfully</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Panel intent="info" className="flex items-start gap-3 p-4">
            <Tile icon={ShieldAlert} tone="info" />
            <p className="min-w-0 flex-1 pt-0.5 text-pretty break-words text-xs font-medium leading-relaxed text-[#0B211B]/65">
              All actions on this screen are recorded in the immutable audit log.
            </p>
          </Panel>

          <EndOfScroll label="End of user details" />
        </div>
      </BodyArea>

      <FootBar>
        <button
          type="button"
          onClick={saveProfile}
          disabled={saving || saved || !changes}
          className={cn(
            'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all',
            saved
              ? 'bg-emerald-500/[0.1] text-emerald-700'
              : changes
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
          )}
        >
          {saving ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} />}
          {saving ? 'Saving…' : saved ? 'Saved' : 'Save'}
        </button>
      </FootBar>

      <AnimatePresence>
        {suspendSheetOpen && (
          <motion.div
            key="suspend-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSuspendSheetOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {suspendSheetOpen && (
          <SheetShell
            key="suspend-sheet"
            icon={ShieldAlert}
            tone="info"
            title="Suspend account"
            subtitle={user.name}
            onClose={() => setSuspendSheetOpen(false)}
            footer={
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSuspendSheetOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmSuspend}
                  disabled={suspending}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-all',
                    suspending
                      ? 'cursor-wait bg-rose-500/60'
                      : 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]',
                  )}
                >
                  {suspending ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <ShieldAlert className="h-4 w-4" strokeWidth={2.4} />}
                  {suspending ? 'Suspending…' : 'Suspend'}
                </button>
              </div>
            }
          >
            <AccentHero tone="rose">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/60">
                  Irreversible action
                </span>
              </div>
              <h2 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
                Suspend {user.name}?
              </h2>
              <p className="mt-1 text-[12px] font-medium leading-relaxed text-rose-100/55">
                All access will be revoked immediately. This action is permanent.
              </p>
              <div className="mt-4 space-y-2">
                <div className="rounded-2xl bg-white/[0.06] p-3">
                  <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-rose-200/50">Consequence</div>
                  <p className="mt-1 break-words text-[12px] font-medium leading-relaxed text-white/85">
                    Login disabled, sessions cancelled, consent frozen.
                  </p>
                </div>
              </div>
            </AccentHero>
          </SheetShell>
        )}
      </AnimatePresence>
    </Screen>
  )
}
