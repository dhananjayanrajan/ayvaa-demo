import { motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { useFramework } from '@/components/base/phone/framework-runtime'
import { cn } from '@/lib/utils'

export type FieldState = 'empty' | 'invalid' | 'valid'

const DEFAULT_TILE: Record<FieldState, string> = {
  empty: 'bg-[#0B211B]/[0.05] text-[#0B211B]/60',
  invalid:
    'bg-rose-500 text-white shadow-[0_10px_20px_-10px_rgba(244,63,94,0.7)]',
  valid:
    'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)]',
}

const TILE_BASE =
  'grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300'

const LABEL_BASE =
  'block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40'

const INPUT_BASE =
  'mt-0.5 w-full bg-transparent text-[14px] font-bold tracking-tight text-[#0B211B] outline-none placeholder:font-semibold placeholder:tracking-tight placeholder:text-[#0B211B]/25'

export function Field({
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
  tileTone,
  iconClassName,
  labelClassName,
  inputClassName,
  labelFor = 'text',
  ariaInvalid = 'auto',
  bare = false,
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
  /** Per-state tile tone overrides, merged over the defaults. */
  tileTone?: Partial<Record<FieldState, string>>
  /** REPLACE: icon size classes (default 'h-5 w-5'). */
  iconClassName?: string
  /** REPLACE: full label classes. */
  labelClassName?: string
  /** REPLACE: full input classes. */
  inputClassName?: string
  /** Which element is the focus-association label: text label (default) or tile. */
  labelFor?: 'text' | 'tile'
  /** 'auto' renders aria-invalid from state; false omits the attribute. */
  ariaInvalid?: 'auto' | false
  /** bare: no outer px-4 py-3 padding (embedded rows own their spacing). */
  bare?: boolean
}) {
  const { emit } = useFramework()
  const tones = { ...DEFAULT_TILE, ...tileTone }

  const tileInner = (
    <Icon className={iconClassName ?? 'h-5 w-5'} strokeWidth={2.2} aria-hidden />
  )
  const tile =
    labelFor === 'tile' ? (
      <label htmlFor={htmlFor} className={cn(TILE_BASE, tones[state])}>
        {tileInner}
      </label>
    ) : (
      <span className={cn(TILE_BASE, tones[state])}>{tileInner}</span>
    )

  const labelCls = labelClassName ?? LABEL_BASE
  const textLabel =
    labelFor === 'text' ? (
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
    ) : (
      <span className={labelCls}>{label}</span>
    )

  const body = (
    <>
      <div className="flex items-center gap-3">
        {tile}
        <div className="min-w-0 flex-1">
          {textLabel}
          <input
            id={htmlFor}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => { const v = e.target.value; emit('field.changed', { id: htmlFor, value: v, state }); onChange(v) }}
            onFocus={() => emit('field.focus', { id: htmlFor })}
            aria-invalid={ariaInvalid === false ? undefined : state === 'invalid'}
            className={cn(inputClassName ?? INPUT_BASE, mono && 'font-mono tracking-normal')}
          />
          {state === 'invalid' && invalidHint && (
            <p className="mt-0.5 text-[10px] font-bold text-rose-500">{invalidHint}</p>
          )}
        </div>
        {trailing}
      </div>
      {below && <div className="mt-2.5 pl-[52px]">{below}</div>}
    </>
  )

  return bare ? body : <div className="px-4 py-3">{body}</div>
}

export function EyeToggle({
  shown,
  onToggle,
}: {
  shown: boolean
  onToggle: () => void
}) {
  const Icon = shown ? EyeOff : Eye
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      aria-label={shown ? 'Hide password' : 'Show password'}
      className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors duration-300 hover:bg-[#0B211B]/[0.08]"
    >
      <Icon className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden />
    </motion.button>
  )
}

const METER_SEGMENT = ['bg-rose-500', 'bg-amber-500', 'bg-emerald-500']
const METER_LABEL = ['text-rose-500', 'text-amber-600', 'text-emerald-600']

export function PasswordMeter({ score, label }: { score: number; label: string }) {
  const s = Math.min(3, Math.max(1, score))
  return (
    <div className="flex items-center gap-3">
      <div aria-hidden className="flex flex-1 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              i < s ? METER_SEGMENT[s - 1] : 'bg-[#0B211B]/[0.07]',
            )}
          />
        ))}
      </div>
      <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.16em]', METER_LABEL[s - 1])}>
        {label}
      </span>
    </div>
  )
}
