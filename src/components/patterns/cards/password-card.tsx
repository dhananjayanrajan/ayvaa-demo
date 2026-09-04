import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Eye, EyeOff, KeyRound, Loader2, Mail } from 'lucide-react'
import { Chip, LiveDot } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

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
