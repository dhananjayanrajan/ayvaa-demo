import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Info, Stethoscope } from 'lucide-react'
import AgentAvatar from '@/components/base/smoothui/agent-avatar'
import { Hero, Chip } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'

interface PartnerPatientHeroProps {
  patient: {
    name: string
    condition: string
    age: number
    referredBy: string
    caregiver: string
    progress: string
    refCode: string
    day: number
    totalDays: number
    visitsDone: number
  }
  onInfo: () => void
}

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const progress = Math.min((timestamp - startRef.current) / duration, 1)
      setValue(Math.round(progress * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return value
}

function getProgressTheme(pct: number) {
  if (pct >= 75) return { bar: 'from-emerald-400 to-teal-300', text: 'text-emerald-300', ring: 'ring-emerald-400/40' }
  if (pct >= 50) return { bar: 'from-sky-400 to-blue-300', text: 'text-sky-300', ring: 'ring-sky-400/40' }
  if (pct >= 25) return { bar: 'from-amber-400 to-orange-300', text: 'text-amber-300', ring: 'ring-amber-400/40' }
  return { bar: 'from-rose-400 to-red-300', text: 'text-rose-300', ring: 'ring-rose-400/40' }
}

export function PartnerPatientHero({ patient, onInfo }: PartnerPatientHeroProps) {
  const recoveryPercent = Math.round((patient.day / patient.totalDays) * 100)
  const theme = getProgressTheme(recoveryPercent)
  const animatedDay = useCountUp(patient.day)
  const animatedVisits = useCountUp(patient.visitsDone)

  const stats = [
    { value: `Day ${animatedDay}`, label: `of ${patient.totalDays}` },
    { value: `${animatedVisits}`, label: 'visits done' },
    { value: patient.caregiver.split(' ')[0], label: 'caregiver' },
  ]

  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Patient chart</div>
          <h2 className="mt-1.5 truncate text-[19px] font-extrabold leading-tight tracking-tight text-white">{patient.name}</h2>
          <div className="mt-0.5">
            <p className="text-[11.5px] font-semibold text-emerald-100/55">
              {patient.condition} · age {patient.age}
            </p>
            <p className="text-[11.5px] font-semibold text-emerald-100/55 mt-0.5">
              Referred by {patient.referredBy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onInfo}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] text-emerald-200/70 transition-colors hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            aria-label="View patient details"
          >
            <Info className="h-4 w-4" aria-hidden />
          </motion.button>
          <AgentAvatar seed={patient.name} size={48} />
        </div>
      </div>

      <div className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
        </span>
        <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-100/70">{patient.refCode}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.4, ease: 'easeOut' }}
            className="rounded-2xl bg-white/[0.06] px-3 py-2.5"
          >
            <div className="truncate text-[13px] font-extrabold tabular-nums leading-none text-white">{stat.value}</div>
            <div className="mt-1 truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
          <Stethoscope className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/85">{patient.caregiver}</span>
        <Chip intent="live" light dot className="border-transparent">
          {patient.progress}
        </Chip>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-100/40">
          <span>Recovery progress</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={recoveryPercent}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className={cn('text-emerald-100/70', theme.text)}
            >
              {recoveryPercent}%
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${recoveryPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full bg-gradient-to-r', theme.bar)}
          />
        </div>
      </div>
    </Hero>
  )
}
