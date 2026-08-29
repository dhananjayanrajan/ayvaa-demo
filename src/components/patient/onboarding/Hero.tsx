import { motion } from 'motion/react'
import { HeartPulse, ShieldCheck } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { trustPoints } from '@/data/patientOnboarding'
import { TrustCell } from './TrustCell'

const cell = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
  const [first, second, third] = trustPoints
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
          <Chip intent="success" light icon={ShieldCheck} className="border-transparent">
            Guardian plan
          </Chip>
        </div>

        <div className="mt-7 flex flex-col items-center">
          <div className="relative">
            <span aria-hidden className="absolute -inset-2.5 rounded-[26px] bg-emerald-400/20 blur-lg" />
            <motion.span
              className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_16px_32px_-14px_rgba(16,185,129,0.8)]"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HeartPulse className="h-7 w-7 text-white" strokeWidth={2.2} aria-hidden />
            </motion.span>
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-[#0B231C] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.6)]">
              <ShieldCheck className="h-3 w-3 text-emerald-300" strokeWidth={2.4} aria-hidden />
            </span>
          </div>
          <div className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
            Guardian onboarding
          </div>
          <h1 className="mt-2 text-balance text-center text-[19px] font-extrabold leading-snug tracking-tight text-white">
            One account,{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
              every loved one covered
            </span>
          </h1>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
          className="mt-6 grid grid-cols-2 gap-2"
        >
          <motion.div variants={cell}>
            <TrustCell icon={first.icon} label={first.label} />
          </motion.div>
          <motion.div variants={cell}>
            <TrustCell icon={second.icon} label={second.label} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-2"
        >
          <TrustCell wide icon={third.icon} label={third.label} />
        </motion.div>
      </div>
    </div>
  )
}
