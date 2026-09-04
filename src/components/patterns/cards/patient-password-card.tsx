import { KeyRound, Mail } from 'lucide-react'
import { Field, EyeToggle } from '@/components/base/phone/field'
import type { FieldState } from '@/data/patientOnboarding'
import { BiometricNote } from './biometric-note'
import { SignInButton } from '../actions/sign-in-button'
import type { SignInState } from '../actions/sign-in-button'

export function PasswordCard({
  email,
  emailState,
  onEmailChange,
  password,
  passwordState,
  onPasswordChange,
  showPass,
  onTogglePass,
  signInReady,
  signInState,
  onSignIn,
  onForgot,
}: {
  email: string
  emailState: FieldState
  onEmailChange: (value: string) => void
  password: string
  passwordState: FieldState
  onPasswordChange: (value: string) => void
  showPass: boolean
  onTogglePass: () => void
  signInReady: boolean
  signInState: SignInState
  onSignIn: () => void
  onForgot: () => void
}) {
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
          Or use your password
        </span>
        <button
          type="button"
          onClick={onForgot}
          className="rounded-xl bg-[#0B211B]/[0.05] px-3 py-1.5 text-[10px] font-extrabold text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.08]"
        >
          Forgot?
        </button>
      </div>
      <div className="mt-2">
        <Field
          icon={Mail}
          label="Email address"
          htmlFor="p02-email"
          type="email"
          value={email}
          placeholder="you@example.com"
          state={emailState}
          invalidHint="Enter a valid email address"
          onChange={onEmailChange}
        />
        <Field
          icon={KeyRound}
          label="Password"
          htmlFor="p02-password"
          type={showPass ? 'text' : 'password'}
          mono
          value={password}
          placeholder="••••••••"
          state={passwordState}
          invalidHint="Passwords are at least 8 characters"
          onChange={onPasswordChange}
          trailing={<EyeToggle shown={showPass} onToggle={onTogglePass} />}
        />
      </div>
      <div className="p-4 pt-2">
        <SignInButton ready={signInReady} state={signInState} onPress={onSignIn} />
      </div>
      <BiometricNote />
    </div>
  )
}

export { PasswordCard as PasswordCard_Patient }
export type { SignInState } from '../actions/sign-in-button'
