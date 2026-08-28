import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  Landmark,
  Lock,
  LogOut,
  Mail,
  Monitor,
  ScanLine,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, LiveDot, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { professional } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const standing: { value: string; label: string }[] = [
  { value: '1,204', label: 'Sessions delivered' },
  { value: '4.9', label: 'Family rating' },
  { value: '100%', label: 'On-time rate' },
]

const credentials: { k: string; v: string; fresh: boolean }[] = [
  { k: 'RN licence', v: 'KNC-RN-88214 · Karnataka Nursing Council', fresh: true },
  { k: 'Licence expiry', v: 'March 2027 · auto-reminder at 90 days', fresh: true },
  { k: 'Background check', v: 'Cleared · January 2026', fresh: true },
  { k: 'First aid & BLS', v: 'Renewed · December 2025', fresh: true },
  { k: 'Last audit', v: 'February 2026 · zero findings', fresh: true },
]

const devices: { icon: LucideIcon; name: string; where: string; when: string; current: boolean }[] = [
  { icon: Smartphone, name: 'This phone', where: 'Hyderabad · Ayvaa app', when: 'Active now', current: true },
  { icon: Monitor, name: 'Sunrise partner kiosk', where: 'Banjara Hills · staff desk', when: 'Mar 1 · 2:14 PM', current: false },
  { icon: Smartphone, name: 'Backup phone', where: 'Hyderabad · Ayvaa app', when: 'Feb 28 · 7:03 AM', current: false },
]

function AuthRow({
  icon,
  tone,
  label,
  value,
  mono = false,
  onClick,
  trailing,
}: {
  icon: LucideIcon
  tone: 'info' | 'success'
  label: string
  value: string
  mono?: boolean
  onClick: () => void
  trailing?: React.ReactNode
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
    >
      <Tile icon={icon} tone={tone} />
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">{label}</span>
        <span
          className={cn(
            'mt-0.5 block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]',
            mono && 'font-mono tracking-normal',
          )}
        >
          {value}
        </span>
      </span>
      {trailing}
    </motion.button>
  )
}

export function PR01() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [sheet, setSheet] = useState<'none' | 'creds' | 'devices'>('none')
  const close = () => setSheet('none')

  const unlock = () => {
    if (scanning) return
    setScanning(true)
    setTimeout(() => {
      notify({ title: 'Unlocked', body: 'Fingerprint matched · welcome back, Arjun', kind: 'ok' })
      navigate('/professional/pr02')
    }, 1100)
  }

  return (
    <Screen>
      <AppBar
        title="ayvaa+"
        subtitle="Professional access"
        trailing={
          <Chip intent="success" icon={Lock}>
            Secure
          </Chip>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3.5">
                    <Tile icon={Stethoscope} tone="white" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Professional access</div>
                      <h2 className="mt-1.5 text-[19px] font-extrabold leading-tight tracking-tight text-white">
                        Good morning,{' '}
                        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">Arjun</span>
                      </h2>
                      <p className="mt-0.5 text-[11.5px] font-semibold text-emerald-100/55">RN · General care · licence verified</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col items-center gap-3 rounded-3xl bg-white/[0.05] px-4 py-6">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={unlock}
                      aria-label="Unlock with fingerprint"
                      className="relative grid h-24 w-24 place-items-center rounded-full bg-white/[0.08] text-emerald-200"
                    >
                      {!scanning && (
                        <>
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-emerald-400/15"
                            animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                          />
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-emerald-400/10"
                            animate={{ scale: [1, 1.45], opacity: [0.4, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
                          />
                        </>
                      )}
                      {scanning ? (
                        <ScanLine className="h-9 w-9 animate-pulse text-emerald-300" aria-hidden />
                      ) : (
                        <Fingerprint className="h-9 w-9" strokeWidth={1.8} aria-hidden />
                      )}
                    </motion.button>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/60">
                      {scanning ? 'Matching fingerprint…' : 'Tap to unlock instantly'}
                    </span>
                    {scanning && (
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: '80%' }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        className="h-1 overflow-hidden rounded-full bg-white/10"
                      >
                        <span className="block h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
                      </motion.span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <Chip intent="neutral" light className="border-transparent">Encrypted session</Chip>
                    <Chip intent="success" light className="border-transparent">Every sign-in logged</Chip>
                    <Chip intent="success" light icon={Check} className="border-transparent">Licence verified</Chip>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
                <div className="flex items-center justify-between px-4 pt-4">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Prefer your password?</span>
                  <button
                    type="button"
                    onClick={() => notify({ title: 'Reset link sent', body: `Check ${professional.email} · valid 30 minutes`, kind: 'info' })}
                    className="text-[11px] font-bold text-emerald-700"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="mt-2">
                  <AuthRow
                    icon={Mail}
                    tone="info"
                    label="Work email"
                    value={professional.email}
                    onClick={() => notify({ title: 'Work email', body: `${professional.email} · last used today`, kind: 'info' })}
                  />
                  <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                  <AuthRow
                    icon={KeyRound}
                    tone="success"
                    label="Password"
                    value={showPass ? 'ayvaa-care-2026' : '••••••••••'}
                    mono
                    onClick={() => setShowPass((v) => !v)}
                    trailing={
                      <motion.span
                        whileTap={{ scale: 0.9 }}
                        role="button"
                        tabIndex={0}
                        aria-label={showPass ? 'Hide password' : 'Show password'}
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowPass((v) => !v)
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && setShowPass((v) => !v)}
                        className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                      >
                        {showPass ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                      </motion.span>
                    }
                  />
                </div>
                <div className="p-4 pt-3">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      notify({ title: 'Welcome back', body: `Signed in as ${professional.name}`, kind: 'ok' })
                      navigate('/professional/pr02')
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                  >
                    Sign in with password
                    <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  </motion.button>
                </div>
                <div className="flex items-center justify-between bg-[#0B211B]/[0.03] px-4 py-3">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <LiveDot className="text-emerald-500" />
                    <span className="truncate text-[10.5px] font-semibold text-[#0B211B]/55">Fingerprint is your default unlock</span>
                  </span>
                  <Chip intent="success">Biometrics on</Chip>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
                <div className="p-4">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Your standing</div>
                  <div className="mt-3 grid grid-cols-3 divide-x divide-[#0B211B]/[0.08]">
                    {standing.map((s) => (
                      <div key={s.label} className="flex min-w-0 flex-col items-center gap-1 px-2 text-center">
                        <span className="text-[15px] font-extrabold tabular-nums leading-none text-[#0B211B]">{s.value}</span>
                        <span className="text-[8.5px] font-bold uppercase leading-tight tracking-[0.12em] text-[#0B211B]/45">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setSheet('creds')}
                    className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-500/[0.08] px-3 py-2.5"
                  >
                    <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.6} aria-hidden />
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                      Verified professional · view credentials
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Security" trailing={<Chip intent="neutral">Managed by you</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={() => setSheet('devices')} className="block w-full text-left">
                <div className="flex items-center gap-3.5 rounded-3xl border border-[#0B211B]/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
                  <Tile icon={Smartphone} tone="ink" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Devices & sessions</div>
                    <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">3 devices · 1 active right now</div>
                  </div>
                  <Chip intent="success" dot>Live</Chip>
                </div>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="success" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="success" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Your licence and screening stay visible to families as verified facts — never as documents.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa · Hyderabad" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[86%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>

            {sheet === 'creds' ? (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                <div className="flex items-start gap-3">
                  <Tile icon={ScrollText} tone="success" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Your credentials</div>
                    <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                      What families see as verified facts on your profile
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={close}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    aria-label="Close sheet"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>

                <div className="rounded-3xl bg-[#0B231C] p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
                      <BadgeCheck className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13.5px] font-extrabold text-white">All checks cleared</div>
                      <div className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">
                        Audited February 2026
                      </div>
                    </div>
                    <Check className="h-5 w-5 shrink-0 text-emerald-300" strokeWidth={3} aria-hidden />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {credentials.map((c) => (
                    <div key={c.k} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3.5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">{c.k}</span>
                        <span className="mt-0.5 block truncate text-[12.5px] font-bold text-[#0B211B]">{c.v}</span>
                      </span>
                      {c.fresh && <Chip intent="success">Valid</Chip>}
                    </div>
                  ))}
                </div>

                <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
                  Documents stay sealed with Ayvaa · families only ever see the verified facts.
                </p>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                <div className="flex items-start gap-3">
                  <Tile icon={Smartphone} tone="ink" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Devices & sessions</div>
                    <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Every place your account is signed in</div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={close}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    aria-label="Close sheet"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>

                <div className="flex flex-col">
                  {devices.map((d, i) => (
                    <div key={d.name}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <div className="flex items-center gap-3 px-1 py-3.5">
                        <Tile icon={d.icon} tone={d.current ? 'success' : 'neutral'} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{d.name}</div>
                          <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/50">{d.where}</div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          {d.current ? (
                            <Chip intent="success" dot>Active now</Chip>
                          ) : (
                            <Chip intent="neutral">{d.when}</Chip>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    close()
                    notify({ title: 'Signed out everywhere', body: '2 other devices signed out · this phone stays active', kind: 'ok' })
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <LogOut className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  Sign out other devices
                </motion.button>
                <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
                  <CalendarClock className="h-3 w-3" aria-hidden />
                  Sessions auto-expire after 30 days of inactivity
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
