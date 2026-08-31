import { Loader2, ScanLine } from 'lucide-react'
import { ActionButton } from '@/components/phone/ActionButton'
import { formatCountdown } from '@/data/patientVerification'

export function ResendRow({
  seconds,
  sending,
  onResend,
}: {
  seconds: number
  sending: boolean
  onResend: () => void
}) {
  if (sending) {
    return (
      <div className="flex items-center justify-center gap-2 text-[11.5px] font-semibold text-[#0B211B]/45">
        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />
        Sending a fresh code
      </div>
    )
  }
  if (seconds > 0) {
    return (
      <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-[#0B211B]/45">
        <ScanLine className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Resend code in <span className="tabular-nums">{formatCountdown(seconds)}</span>
      </div>
    )
  }
  return (
    <ActionButton
      status="idle"
      onPress={onResend}
      idleLabel="Resend code now"
      tapScale={0.95}
      className="mx-auto block rounded-full bg-emerald-500/[0.12] px-4 py-2 text-[12px] font-extrabold text-emerald-700"
    />
  )
}
