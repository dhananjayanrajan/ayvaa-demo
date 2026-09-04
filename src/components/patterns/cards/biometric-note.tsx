import { Chip, LiveDot } from '@/components/base/phone/kit'

export function BiometricNote() {
  return (
    <div className="flex items-center justify-between bg-[#0B211B]/[0.03] px-4 py-3">
      <span className="flex min-w-0 items-center gap-1.5">
        <LiveDot className="shrink-0 text-emerald-500" />
        <span className="truncate text-[10.5px] font-semibold text-[#0B211B]/55">
          Fingerprint unlocks by default
        </span>
      </span>
      <Chip intent="success">Biometrics on</Chip>
    </div>
  )
}
