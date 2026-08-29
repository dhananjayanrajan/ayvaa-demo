import { motion } from 'motion/react'
import { Chip } from '@/components/phone/kit'
import { digestEntries } from '@/data/patientAuth'
import type { DigestEntry } from '@/data/patientAuth'
import { DigestRow } from './DigestRow'

export function DigestHero({
  reviewedKeys,
  onOpenEntry,
}: {
  reviewedKeys: string[]
  onOpenEntry: (entry: DigestEntry) => void
}) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      <div className="relative">
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
      </div>
    </div>
  )
}
