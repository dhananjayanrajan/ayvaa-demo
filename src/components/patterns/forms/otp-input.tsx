import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { CODE_LENGTH } from '@/data/patientVerification'

export function OtpInput({
  value,
  onChange,
}: {
  value: string[]
  onChange: (next: string[]) => void
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const [active, setActive] = useState(0)

  function focusCell(index: number) {
    const target = Math.min(CODE_LENGTH - 1, Math.max(0, index))
    refs.current[target]?.focus()
  }

  function setDigit(index: number, digit: string) {
    const next = [...value]
    next[index] = digit
    onChange(next)
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1)
    setDigit(index, digit)
    if (digit && index < CODE_LENGTH - 1) focusCell(index + 1)
  }

  function handleKeyDown(index: number, key: string) {
    if (key === 'Backspace' && !value[index] && index > 0) focusCell(index - 1)
  }

  function handlePaste(_index: number, raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, CODE_LENGTH).split('')
    if (!digits.length) return
    const next = Array.from({ length: CODE_LENGTH }, (_, i) => digits[i] ?? '')
    onChange(next)
    focusCell(digits.length)
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: CODE_LENGTH }, (_, i) => {
        const filled = value[i] !== ''
        return (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={value[i]}
            aria-label={`Digit ${i + 1} of ${CODE_LENGTH}`}
            onFocus={() => setActive(i)}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e.key)}
            onPaste={(e) => {
              e.preventDefault()
              handlePaste(i, e.clipboardData.getData('text'))
            }}
            className={cn(
              'h-16 w-12 rounded-xl text-center text-[26px] font-black tabular-nums outline-none transition-colors duration-200',
              filled
                ? 'bg-[#0B231C] text-emerald-200 shadow-[0_16px_32px_-16px_rgba(6,40,30,0.7)]'
                : active === i
                  ? 'bg-emerald-500/[0.12] caret-emerald-600'
                  : 'bg-[#0B211B]/[0.05]',
            )}
          />
        )
      })}
    </div>
  )
}
