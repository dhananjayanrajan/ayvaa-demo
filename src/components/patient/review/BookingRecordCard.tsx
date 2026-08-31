import { Lock } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { HeroTopRow } from '@/components/phone/HeroCells'
import { FactRows } from '@/components/phone/FactRows'
import { recordRows } from '@/data/patientReview'

export function BookingRecordCard() {
  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Your booking"
        trailing={
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
            <Lock className="h-3 w-3" aria-hidden />
            Sealed
          </span>
        }
      />

      <div className="mt-4">
        <FactRows rows={recordRows()} />
      </div>
    </AccentHero>
  )
}
