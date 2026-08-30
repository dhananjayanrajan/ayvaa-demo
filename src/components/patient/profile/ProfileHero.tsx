import { BadgeCheck, Stethoscope } from 'lucide-react'
import { Ring } from '@/components/phone/kit'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { HeroTopRow } from '@/components/phone/HeroCells'
import { initialsOf, type OfferState } from '@/data/patientMatching'

interface ProfileHeroProps {
  name: string
  role: string
  years: number
  rating: number
  visits: number
  onTime: string
  offer: OfferState
}

export function ProfileHero({ name, role, years, rating, visits, onTime, offer }: ProfileHeroProps) {
  const tone = offer === 'accepted' ? 'emerald' : offer === 'pending' ? 'amber' : 'sky'

  return (
    <AccentHero tone={tone}>
      <HeroTopRow
        label="Ayvaa verified caregiver"
        labelClass="text-white/50"
        trailing={
          offer === 'accepted' ? (
            <StatusPill tone="emerald" label="Accepted" />
          ) : offer === 'pending' ? (
            <StatusPill tone="amber" label="Offer out" live />
          ) : (
            <StatusPill tone="sky" label="Available" />
          )
        }
      />

      <div className="mt-4 flex items-start gap-4">
        <div className="relative shrink-0">
          <span className="grid h-16 w-16 place-items-center rounded-[22px] bg-white/[0.1] text-[18px] font-black tracking-tight text-white">
            {initialsOf(name)}
          </span>
          <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} aria-hidden />
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-[19px] font-extrabold leading-tight tracking-tight text-white">{name}</h2>
          <p className="mt-1 flex items-start gap-1.5 text-[11.5px] font-semibold leading-snug text-white/55">
            <Stethoscope className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
            {role}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <Ring value={rating / 5} size={68} stroke={6} id="p11-rating">
          <span className="text-[14px] font-extrabold tabular-nums leading-none text-white">{rating}</span>
          <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.14em] text-white/50">rating</span>
        </Ring>
        <div className="min-w-0 flex-1">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Sessions delivered</div>
            <div className="mt-0.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{visits}</div>
          </div>
          <div className="mt-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Experience</div>
            <div className="mt-0.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{years} yrs</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">On-time arrivals</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">{onTime}</span>
      </div>
    </AccentHero>
  )
}
