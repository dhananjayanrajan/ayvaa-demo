import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  BadgeCheck,
  Check,
  ChevronRight,
  CreditCard,
  HeartPulse,
  KeyRound,
  LifeBuoy,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Pencil,
  ScrollText,
  ShieldCheck,
  User,
  Users,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { guardian, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type FieldId = 'name' | 'email' | 'phone' | 'address'

const fields: { id: FieldId; icon: LucideIcon; label: string; value: string; editable: boolean }[] = [
  { id: 'name', icon: User, label: 'Your full name', value: guardian.name, editable: true },
  { id: 'email', icon: Mail, label: 'Email address', value: guardian.email, editable: false },
  { id: 'phone', icon: Phone, label: 'Phone number', value: guardian.phone, editable: true },
  { id: 'address', icon: MapPin, label: 'Home address for visits', value: guardian.address, editable: true },
]

const rows: { icon: LucideIcon; title: string; subtitle: string; to: string }[] = [
  {
    icon: HeartPulse,
    title: 'Loved ones on your plan',
    subtitle: `${lovedOnes.length} people · ${lovedOnes[0].name.split(' ')[0]} and ${lovedOnes[1].name.split(' ')[0]}`,
    to: '/patient/p30',
  },
  { icon: LifeBuoy, title: 'Notifications and privacy', subtitle: 'Reminders, location and consent controls', to: '/patient/p29' },
  { icon: CreditCard, title: 'Payments', subtitle: 'Billing history and cards', to: '/patient/p23' },
]

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

export function P28() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  const [values, setValues] = useState<Record<FieldId, string>>(
    Object.fromEntries(fields.map((f) => [f.id, f.value])) as Record<FieldId, string>,
  )
  const [dirty, setDirty] = useState<Record<FieldId, boolean>>({ name: false, email: false, phone: false, address: false })
  const [editing, setEditing] = useState<FieldId | null>(null)
  const [signOut, setSignOut] = useState(false)

  const dirtyCount = fields.filter((f) => dirty[f.id] && f.editable && values[f.id] !== f.value).length
  const completion =
    (fields.filter((f) => values[f.id].trim().length > 0).length / fields.length) * 0.5 + (guardian.verified ? 0.5 : 0)

  const startEdit = (f: (typeof fields)[number]) => {
    if (!f.editable) {
      notify({ title: 'Email locked', body: 'Email changes need support verification to protect your account', kind: 'info' })
      return
    }
    setEditing(f.id)
  }

  const saveEdit = () => {
    if (!editing) return
    const f = fields.find((x) => x.id === editing)!
    setDirty((prev) => ({ ...prev, [editing]: true }))
    setEditing(null)
    if (values[editing] !== f.value) {
      notify({
        title: 'Change pending verification',
        body: `${f.label} updated · OTP verification before it takes effect`,
        kind: 'info',
      })
    }
  }

  return (
    <Screen>
      <AppBar
        title="Profile"
        subtitle="Guardian account"
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              notify({
                title: 'Edit mode',
                body: 'Name, phone and address are editable · changes re-verified before taking effect',
                kind: 'info',
              })
            }
            aria-label="Edit profile"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Pencil className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-center gap-3.5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-400 to-teal-500 text-[18px] font-black text-white shadow-[0_12px_26px_-12px_rgba(16,185,129,0.8)]">
                    {guardian.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="truncate text-[16px] font-extrabold tracking-tight text-white">{guardian.name}</span>
                      {guardian.verified && (
                        <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-[11.5px] font-semibold text-emerald-100/55">
                      Guardian · joined {guardian.joined} · {lovedOnes.length} on plan
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-emerald-400/[0.1] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                    <span className="text-emerald-100/50">Profile completeness</span>
                    <span className="tabular-nums text-emerald-200">{Math.round(completion * 100)}%</span>
                  </div>
                  <Meter value={completion} intent="success" delay={0.2} className="mt-2" />
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200/70">
                    <BadgeCheck className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    Verified · every change re-verified before it applies
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Personal information"
                trailing={
                  <Chip intent={dirtyCount > 0 ? 'warning' : 'neutral'} dot={dirtyCount > 0}>
                    {dirtyCount > 0 ? `${dirtyCount} pending` : 'Tap to edit'}
                  </Chip>
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {fields.map((f, i) => {
                  const isEditing = editing === f.id
                  const changed = dirty[f.id] && values[f.id] !== f.value
                  return (
                    <div key={f.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      {isEditing ? (
                        <div className="px-4 py-3">
                          <div className="flex h-11 items-center gap-2.5 rounded-2xl bg-emerald-500/[0.07] px-3.5 transition-colors focus-within:bg-emerald-500/[0.1] focus-within:shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)]">
                            <f.icon className="h-4 w-4 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
                            <input
                              value={values[f.id]}
                              onChange={(e) => setValues((prev) => ({ ...prev, [f.id]: e.target.value }))}
                              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                              className="min-w-0 flex-1 bg-transparent text-[13px] font-bold tracking-tight text-[#0B211B] outline-none"
                            />
                          </div>
                          <div className="mt-2 flex gap-2">
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              onClick={saveEdit}
                              className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-white"
                            >
                              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                              Save
                            </motion.button>
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              onClick={() => {
                                setValues((prev) => ({ ...prev, [f.id]: f.value }))
                                setEditing(null)
                              }}
                              className="flex items-center gap-1.5 rounded-full bg-[#0B211B]/[0.06] px-3.5 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/55"
                            >
                              <X className="h-3 w-3" strokeWidth={3} aria-hidden />
                              Cancel
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.99 }}
                          onClick={() => startEdit(f)}
                          className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                        >
                          <Tile icon={f.icon} tone={changed ? 'warning' : 'neutral'} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">
                              {f.label}
                            </span>
                            <span className="mt-0.5 block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                              {values[f.id]}
                            </span>
                          </span>
                          {changed ? (
                            <Chip intent="warning" dot>Verifying</Chip>
                          ) : f.editable ? (
                            <Pencil className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/25" aria-hidden />
                          ) : (
                            <Lock className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/25" aria-hidden />
                          )}
                        </motion.button>
                      )}
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Account" />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {rows.map((r, i) => (
                  <div key={r.title}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.99 }}
                      onClick={() => navigate(r.to)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <Tile icon={r.icon} tone="info" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{r.title}</span>
                        <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">{r.subtitle}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
                    </motion.button>
                  </div>
                ))}
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => notify({ title: 'Password change', body: 'Reset link sent to your email · valid 30 minutes', kind: 'info' })}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={KeyRound} tone="neutral" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">Change password</span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">Last changed 3 months ago</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Lock} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Your data is encrypted at rest. Guardians alone control who in the family can see what — every change is
                  logged to the audit record.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of profile" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              notify({
                title: 'Changes saved',
                body: dirtyCount > 0 ? `${dirtyCount} change(s) pending OTP verification` : 'Profile already up to date',
                kind: dirtyCount > 0 ? 'info' : 'ok',
              })
            }
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">{dirtyCount > 0 ? `Save ${dirtyCount} change${dirtyCount > 1 ? 's' : ''}` : 'Save'}</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setSignOut(true)}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.07] py-3.5 text-[13px] font-bold text-rose-600 transition-colors hover:bg-rose-500/[0.11]"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Sign out</span>
          </motion.button>
        </div>
      </FootBar>

      <AnimatePresence>
        {signOut && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSignOut(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {signOut && (
          <motion.div
            key="signout"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-500/10 text-rose-600">
                <LogOut className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Sign out?</div>
                <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Care continues exactly as scheduled</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setSignOut(false)}
                aria-label="Close sheet"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="relative">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">What stays intact</div>
                <div className="mt-3 flex flex-col gap-2.5">
                  <DarkRow k="Scheduled visits" v="Run as planned" />
                  <DarkRow k="Dose reminders" v="Keep firing" />
                  <DarkRow k="Records" v="Sealed · untouched" />
                  <DarkRow k="Emergency access" v="Always available" />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setSignOut(false)}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
              >
                <span className="truncate">Stay signed in</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSignOut(false)
                  notify({ title: 'Signed out', body: 'Your records stay sealed until you return', kind: 'info' })
                  navigate('/patient/p02')
                }}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]"
              >
                <LogOut className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Sign out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
