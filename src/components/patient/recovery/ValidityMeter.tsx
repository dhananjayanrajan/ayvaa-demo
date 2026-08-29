import { Meter } from '@/components/phone/kit'
import { VALIDITY_SECONDS, formatValidity } from '@/data/patientRecovery'

export function ValidityMeter({ remaining }: { remaining: number }) {
  const expired = remaining <= 0
  return (
    <div>
      <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
        <span>Link validity</span>
        <span
          className={
            expired
              ? 'text-rose-600'
              : 'tabular-nums text-emerald-700'
          }
        >
          {expired ? 'expired' : `expires in ${formatValidity(remaining)}`}
        </span>
      </div>
      <Meter
        value={Math.max(0, remaining) / VALIDITY_SECONDS}
        intent={expired ? 'danger' : 'success'}
        delay={0.2}
        className="mt-2"
      />
    </div>
  )
}
