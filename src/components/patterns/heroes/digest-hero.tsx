import { Chip } from '@/components/base/phone/kit'
import { Hero } from '@/components/base/phone/kit'
import { digestEntries } from '@/data/patientAuth'
import type { DigestEntry } from '@/data/patientAuth'
import { DigestRow } from '../lists/digest-row'

export function DigestHero({
  reviewedKeys,
  onOpenEntry,
}: {
  reviewedKeys: string[]
  onOpenEntry: (entry: DigestEntry) => void
}) {
  return (
    <Hero>
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-black leading-none tracking-tight text-white">
          ayvaa<span className="text-emerald-300">+</span>
        </div>
        <Chip intent="live" light dot className="border-transparent">
          Care moving
        </Chip>
      </div>

      <div className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/80">
        While you were away
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {digestEntries.map((entry) => (
          <DigestRow
            key={entry.key}
            entry={entry}
            reviewed={reviewedKeys.includes(entry.key)}
            onPress={onOpenEntry}
          />
        ))}
      </div>
    </Hero>
  )
}
