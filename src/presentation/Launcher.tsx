import { motion } from 'motion/react'
import { Activity, Building2, ChevronRight, HeartPulse, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const apps = [
  {
    id: 'patient',
    name: 'Patient & Guardian',
    desc: 'Book care, track visits, manage plans',
    screens: 34,
    icon: HeartPulse,
    home: '/patient/p01',
    accent: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.55)',
    chip: 'bg-emerald-500/[0.15] text-emerald-200',
    live: '2,480 caregivers',
  },
  {
    id: 'professional',
    name: 'Professional',
    desc: 'Offers, sessions, earnings',
    screens: 12,
    icon: Stethoscope,
    home: '/professional/pr01',
    accent: 'from-teal-500 to-sky-500',
    glow: 'rgba(45,212,191,0.5)',
    chip: 'bg-teal-500/[0.15] text-teal-200',
    live: '1,120 active',
  },
  {
    id: 'partner',
    name: 'Partner',
    desc: 'Referrals, staff, corporate billing',
    screens: 7,
    icon: Building2,
    home: '/partner/pt01',
    accent: 'from-sky-500 to-indigo-500',
    glow: 'rgba(56,189,248,0.5)',
    chip: 'bg-sky-500/[0.15] text-sky-200',
    live: '18 hospitals',
  },
  {
    id: 'admin',
    name: 'Admin',
    desc: 'Console, compliance, analytics',
    screens: 9,
    icon: ShieldCheck,
    home: '/admin/a01',
    accent: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.5)',
    chip: 'bg-amber-500/[0.15] text-amber-200',
    live: '3 on duty',
  },
  {
    id: 'system',
    name: 'System',
    desc: 'Event trail, dispatch, notifications',
    screens: 3,
    icon: Activity,
    home: '/system/s01',
    accent: 'from-emerald-400 to-teal-300',
    glow: 'rgba(52,211,153,0.55)',
    chip: 'bg-emerald-400/[0.15] text-emerald-200',
    live: 'zero handoffs',
    badge: 'Automated',
    badgeTone: 'bg-emerald-400 text-[#0B231C]',
  },
]

export function Launcher() {
  const { navigate } = useRouter()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden bg-[#07130F] px-8 py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full bg-emerald-500/[0.15] blur-[130px]"
          animate={{ y: [0, -18, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-56 -right-40 h-[600px] w-[600px] rounded-full bg-teal-400/[0.12] blur-[140px]"
          animate={{ y: [0, 16, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute left-1/2 top-[38%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/[0.08] blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 25%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 25%, transparent 78%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="relative flex flex-col items-center gap-3 text-center"
      >
        <span className="relative grid size-16 place-items-center">
          <span aria-hidden className="absolute inset-0 rounded-[24px] bg-emerald-400/20 blur-lg" />
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative grid size-14 place-items-center rounded-[22px] bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_16px_32px_-12px_rgba(16,185,129,0.8)]"
          >
            <HeartPulse className="size-7 fill-current text-white" aria-hidden />
          </motion.span>
        </span>
        <div className="flex items-center gap-2.5">
          <h1 className="text-3xl font-black tracking-tight text-white">
            ayvaa<span className="text-emerald-300">+</span>
          </h1>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/60">
            Caregiver
          </span>
        </div>
        <p className="max-w-md text-sm font-medium text-white/50">
          On-demand homecare platform · Hyderabad · five applications, one presentation
        </p>
        <div className="mt-1 flex items-center gap-1.5 rounded-full bg-emerald-400/[0.08] px-3.5 py-1.5">
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/80">
            65 screens · all live demos
          </span>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="relative grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {apps.map((a) => {
          const Icon = a.icon
          return (
            <motion.button
              key={a.id}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(a.home)}
              className={cn(
                'group relative flex flex-col gap-4 overflow-hidden rounded-[26px] bg-white/[0.04] p-5 text-left backdrop-blur-sm transition-colors hover:bg-white/[0.07]',
                a.id === 'system' && 'sm:col-span-2 lg:col-span-1',
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: a.glow }}
              />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative flex items-start justify-between gap-3">
                <span className={cn('grid size-11 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg', a.accent)}>
                  <Icon className="size-5" strokeWidth={2.4} aria-hidden />
                </span>
                {a.badge ? (
                  <span className={cn('rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em]', a.badgeTone)}>
                    {a.badge}
                  </span>
                ) : (
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                    {a.screens} screens
                  </span>
                )}
              </div>

              <div className="relative">
                <span className="block text-base font-extrabold tracking-tight text-white">{a.name}</span>
                <span className="mt-0.5 block text-xs font-medium leading-relaxed text-white/50">{a.desc}</span>
              </div>

              <div className="relative mt-auto flex items-center justify-between gap-3">
                <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide', a.chip)}>
                  <span className="h-1 w-1 rounded-full bg-current opacity-70" aria-hidden />
                  {a.live}
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-white/[0.06] text-white/50 transition-all duration-200 group-hover:bg-white/[0.12] group-hover:text-white">
                  <ChevronRight className="size-4" strokeWidth={2.6} aria-hidden />
                </span>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative flex items-center gap-2.5"
      >
        <Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-50/50">
          Ayvaa · one platform · every point of care
        </span>
      </motion.div>
    </div>
  )
}
