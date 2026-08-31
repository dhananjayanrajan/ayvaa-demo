import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { HeroTopRow, HeroHighlight, StatCell } from '@/components/phone/HeroCells'
import { dispatchFacts } from '@/data/patientReview'

export function ConfirmedHero({ patientFirstName }: { patientFirstName: string }) {
  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="Dispatch live"
        trailing={<StatusPill tone="emerald" label="Sealed" />}
      />

      <div className="mt-4 flex flex-col items-center text-center">
        <span className="relative grid h-[72px] w-[72px] place-items-center">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_16px_32px_-12px_rgba(16,185,129,0.8)]">
            <Check className="h-8 w-8 text-white" strokeWidth={3} aria-hidden />
          </span>
        </span>
        <motion.h2
          key="confirmed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="mt-3 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white"
        >
          Recurring care for <HeroHighlight>{patientFirstName}</HeroHighlight> is booked
        </motion.h2>
        <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/55">
          Consent is sealed and caregivers near you are seeing the offer right now.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {dispatchFacts.map((fact) => (
          <StatCell key={fact.label} label={fact.label} value={fact.value} />
        ))}
      </div>
    </AccentHero>
  )
}
