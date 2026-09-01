import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BadgeCheck, CalendarClock, Check, Eye, EyeOff, Fingerprint, KeyRound, Loader2, LogOut, Mail, Monitor, ScanLine, ScrollText, Smartphone, Stethoscope, X } from 'lucide-react'
import { Chip, Hero, LiveDot, Tile } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Row } from '@/components/phone/Row'

const credentials = [
  { k: 'RN licence', v: 'KNC-RN-88214 · Karnataka Nursing Council', fresh: true },
  { k: 'Licence expiry', v: 'March 2027 · auto-reminder at 90 days', fresh: true },
  { k: 'Background check', v: 'Cleared · January 2026', fresh: true },
  { k: 'First aid & BLS', v: 'Renewed · December 2025', fresh: true },
  { k: 'Last audit', v: 'February 2026 · zero findings', fresh: true },
]

interface CredentialsSheetProps {
  onClose: () => void
}

export function CredentialsSheet({ onClose }: CredentialsSheetProps) {
  return (
    <SheetShell onClose={onClose} height="scroll">
      <div className="flex flex-col gap-3.5">
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
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
            aria-label="Close sheet"
          >
            <X className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>

        <div className="rounded-2xl bg-[#0B231C] p-4">
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
              {c.fresh && <Chip intent="success" className="border-transparent">Valid</Chip>}
            </div>
          ))}
        </div>

        <p className="text-left text-[10.5px] font-semibold text-[#0B211B]/45">
          Documents stay sealed with Ayvaa · families only ever see the verified facts.
        </p>
      </div>
    </SheetShell>
  )
}

const devices: { icon: LucideIcon; name: string; where: string; when: string; current: boolean }[] = [
  { icon: Smartphone, name: 'This phone', where: 'Hyderabad · Ayvaa app', when: 'Active now', current: true },
  { icon: Monitor, name: 'Sunrise partner kiosk', where: 'Banjara Hills · staff desk', when: 'Mar 1 · 2:14 PM', current: false },
  { icon: Smartphone, name: 'Backup phone', where: 'Hyderabad · Ayvaa app', when: 'Feb 28 · 7:03 AM', current: false },
]

interface DevicesSheetProps {
  onClose: () => void
  onSignOutOthers: () => void
}

export function DevicesSheet({ onClose, onSignOutOthers }: DevicesSheetProps) {
  const [signOutLoading, setSignOutLoading] = useState(false)

  const handleSignOut = () => {
    if (signOutLoading) return
    setSignOutLoading(true)
    setTimeout(() => {
      setSignOutLoading(false)
      onSignOutOthers()
    }, 1000)
  }

  return (
    <SheetShell onClose={onClose} height="scroll">
      <div className="flex flex-col gap-3.5">
        <div className="flex items-start gap-3">
          <Tile icon={Smartphone} tone="ink" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Devices & sessions</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Every place your account is signed in</div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
            aria-label="Close sheet"
          >
            <X className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>

        <div className="flex flex-col">
          {devices.map((d) => (
            <div key={d.name}>
              <div className="flex items-center gap-3 px-1 py-3.5">
                <Tile icon={d.icon} tone={d.current ? 'success' : 'neutral'} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{d.name}</div>
                  <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/50">{d.where}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  {d.current ? (
                    <Chip intent="success" dot className="border-transparent">Active now</Chip>
                  ) : (
                    <Chip intent="neutral" className="border-transparent">{d.when}</Chip>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          whileTap={signOutLoading ? undefined : { scale: 0.97 }}
          onClick={handleSignOut}
          disabled={signOutLoading}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.65)]',
            signOutLoading && 'opacity-80',
          )}
        >
          {signOutLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Signing out…
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Sign out other devices
            </>
          )}
        </motion.button>
        <div className="flex items-center justify-start gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
          <CalendarClock className="h-3 w-3" aria-hidden />
          Sessions auto-expire after 30 days of inactivity
        </div>
      </div>
    </SheetShell>
  )
}

function AuthRow({ icon, tone, label, value, mono, onClick, trailing }: {
  icon: LucideIcon
  tone: 'info' | 'success'
  label: string
  value: string
  mono?: boolean
  onClick: () => void
  trailing?: ReactNode
}) {
  return (
    <Row
      icon={icon}
      tone={tone}
      label={label}
      labelClassName="font-extrabold"
      title={value}
      titleClassName={mono ? 'mt-0.5 font-mono tracking-normal' : 'mt-0.5'}
      onClick={onClick}
      trailing={trailing}
      hoverClassName="hover:bg-transparent"
      showChevron={false}
    />
  )
}

interface PasswordCardProps {
  email: string
  showPass: boolean
  onTogglePass: () => void
  onSignIn: () => void
  onForgot: () => void
}

export function PasswordCard({ email, showPass, onTogglePass, onSignIn, onForgot }: PasswordCardProps) {
  const [forgotLoading, setForgotLoading] = useState(false)
  const [signInLoading, setSignInLoading] = useState(false)

  const handleForgot = () => {
    if (forgotLoading) return
    setForgotLoading(true)
    setTimeout(() => {
      setForgotLoading(false)
      onForgot()
    }, 900)
  }

  const handleSignIn = () => {
    if (signInLoading) return
    setSignInLoading(true)
    setTimeout(() => {
      setSignInLoading(false)
      onSignIn()
    }, 900)
  }

  return (
    <div className="rounded-2xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Prefer your password?</span>
        <button
          type="button"
          onClick={handleForgot}
          disabled={forgotLoading}
          className={cn(
            'flex items-center gap-1.5 rounded-full bg-amber-500/[0.1] px-3 py-1.5 text-[11px] font-bold text-amber-700 transition-colors hover:bg-amber-500/[0.15]',
            forgotLoading && 'opacity-70',
          )}
        >
          {forgotLoading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            'Forgot?'
          )}
        </button>
      </div>
      <div className="mt-2">
        <AuthRow
          icon={Mail}
          tone="info"
          label="Work email"
          value={email}
          onClick={handleForgot}
        />
        <AuthRow
          icon={KeyRound}
          tone="success"
          label="Password"
          value={showPass ? 'ayvaa-care-2026' : '••••••••••'}
          mono
          onClick={onTogglePass}
          trailing={
            <span
              role="button"
              tabIndex={0}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              onClick={(e) => {
                e.stopPropagation()
                onTogglePass()
              }}
              onKeyDown={(e) => e.key === 'Enter' && onTogglePass()}
              className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
            >
              {showPass ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
            </span>
          }
        />
      </div>
      <div className="p-4 pt-3">
        <button
          type="button"
          onClick={handleSignIn}
          disabled={signInLoading}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            signInLoading && 'opacity-80',
          )}
        >
          {signInLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Signing in…
            </>
          ) : (
            <>
              Sign in with password
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            </>
          )}
        </button>
      </div>
      <div className="flex items-center justify-between bg-[#0B211B]/[0.03] px-4 py-3">
        <span className="flex min-w-0 items-center gap-1.5">
          <LiveDot className="text-emerald-500" />
          <span className="truncate text-[10.5px] font-semibold text-[#0B211B]/55">Fingerprint is your default unlock</span>
        </span>
        <Chip intent="success">Biometrics on</Chip>
      </div>
    </div>
  )
}

interface ProfessionalHeroProps {
  scanning: boolean
  onUnlock: () => void
}

export function ProfessionalHero({ scanning, onUnlock }: ProfessionalHeroProps) {
  return (
    <Hero>
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

      <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-6">
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={onUnlock}
          aria-label="Unlock with fingerprint"
          className="relative grid h-24 w-24 place-items-center rounded-full bg-white/[0.08] text-emerald-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
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
    </Hero>
  )
}

interface SecurityDevicesCardProps {
  onOpenDevices: () => void
}

export function SecurityDevicesCard({ onOpenDevices }: SecurityDevicesCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onOpenDevices}
      className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded-2xl"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-[#0B211B]/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
        <Tile icon={Smartphone} tone="ink" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">Devices & sessions</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">3 devices · 1 active right now</div>
        </div>
        <Chip intent="success" dot className="border-transparent">Live</Chip>
      </div>
    </motion.button>
  )
}

const standing = [
  { value: '1,204', label: 'Sessions delivered' },
  { value: '4.9', label: 'Family rating' },
  { value: '100%', label: 'On-time rate' },
]

interface StandingCardProps {
  onViewCredentials: () => void
}

export function StandingCard({ onViewCredentials }: StandingCardProps) {
  return (
    <div className="rounded-2xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <div className="p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Your standing</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {standing.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 rounded-xl bg-[#0B211B]/[0.03] px-3 py-3 text-left">
              <span className="text-[15px] font-extrabold tabular-nums leading-none text-[#0B211B]">{s.value}</span>
              <span className="text-[8.5px] font-bold uppercase leading-tight tracking-[0.12em] text-[#0B211B]/45">{s.label}</span>
            </div>
          ))}
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={onViewCredentials}
          className="mt-4 flex w-full items-center justify-start gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/[0.12] to-teal-500/[0.12] px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
        >
          <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.6} aria-hidden />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
            Verified professional · view credentials
          </span>
        </motion.button>
      </div>
    </div>
  )
}