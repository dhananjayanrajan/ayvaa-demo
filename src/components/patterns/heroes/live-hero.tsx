import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { Hero } from '@/components/base/phone/kit'
import { CallButton } from '../actions/call-button'
import { LiveStepper } from '../misc/live-stepper'
import type { DashboardFacts } from '@/data/patientDashboard'

export function LiveHero({
  facts,
  onOpenSheet,
  onTrack,
}: {
  facts: DashboardFacts
  onOpenSheet: () => void
  onTrack: () => void
}) {
  return (
    <Hero>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
          </span>
          Care happening now
        </div>
        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          {facts.caregiverFirstName} is with {facts.lovedFirstName},{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            right now
          </span>
        </h2>
        <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/70">
          RN on the {facts.planCategory} plan, GPS-checked arrival
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
            Arrived
          </div>
          <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
            2:04 PM
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
            Duration
          </div>
          <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
            2 hours
          </div>
        </div>
      </div>

      <div className="mt-4">
        <LiveStepper onPress={onOpenSheet} />
      </div>

      <div className="mt-3 flex gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onTrack}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-[12.5px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
        >
          <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Track visit</span>
        </motion.button>
        <CallButton name={facts.caregiverFirstName} />
      </div>
    </Hero>
  )
}
