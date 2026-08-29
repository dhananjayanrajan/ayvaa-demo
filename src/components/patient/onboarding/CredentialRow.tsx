import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FieldState } from '@/data/patientOnboarding'

const stateTile: Record<FieldState, string> = {
  empty: 'bg-[#0B211B]/[0.05] text-[#0B211B]/60',
  invalid:
    'bg-rose-500 text-white shadow-[0_10px_20px_-10px_rgba(244,63,94,0.7)]',
  valid:
    'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)]',
}

export function CredentialRow({
  icon: Icon,
  label,
  htmlFor,
  value,
  placeholder,
  type = 'text',
  state,
  invalidHint,
  mono = false,
  onChange,
  trailing,
  below,
}: {
  icon: LucideIcon
  label: string
  htmlFor: string
  value: string
  placeholder: string
  type?: 'text' | 'email' | 'tel' | 'password'
  state: FieldState
  invalidHint?: string
  mono?: boolean
  onChange: (value: string) => void
  trailing?: ReactNode
  below?: ReactNode
}) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300',
            stateTile[state],
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <label
            htmlFor={htmlFor}
            className="block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40"
          >
            {label}
          </label>
          <input
            id={htmlFor}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={state === 'invalid'}
            className={cn(
              'mt-0.5 w-full bg-transparent text-[14px] font-bold tracking-tight text-[#0B211B] outline-none placeholder:font-semibold placeholder:tracking-tight placeholder:text-[#0B211B]/25',
              mono && 'font-mono tracking-normal',
            )}
          />
          {state === 'invalid' && invalidHint && (
            <p className="mt-0.5 text-[10px] font-bold text-rose-500">{invalidHint}</p>
          )}
        </div>
        {trailing}
      </div>
      {below && <div className="mt-2.5 pl-[52px]">{below}</div>}
    </div>
  )
}
