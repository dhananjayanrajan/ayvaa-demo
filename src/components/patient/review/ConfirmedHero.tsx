import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/patient/matching/StatusPill'
import { dispatchFacts } from '@/data/patientReview'

export function ConfirmedHero({ patientFirstName }: { patientFirstName: string }) {
  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Dispatch live</span>
        <StatusPill tone="emerald" label="Sealed" />
      </div>

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
          Recurring care for{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">{patientFirstName}</span>{' '}
          is booked
        </motion.h2>
        <p className="mt-1 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/55">
          Consent is sealed and caregivers near you are seeing the offer right now.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {dispatchFacts.map((fact) => (
          <div key={fact.label} className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{fact.label}</div>
            <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none text-white">{fact.value}</div>
          </div>
        ))}
      </div>
    </AccentHero>
  )
}
