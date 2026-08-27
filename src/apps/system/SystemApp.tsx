import { AnimatePresence, motion } from 'motion/react'
import { Activity, BellRing, Sparkles, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PhoneFrame } from '@/components/phone/PhoneFrame'
import { useRouter } from '@/lib/router'
import { S01 } from './S01'
import { S02 } from './S02'
import { S03 } from './S03'
import { cn } from '@/lib/utils'

type Tab = { id: string; label: string; icon: LucideIcon }

const tabs: Tab[] = [
  { id: 's01', label: 'Trail', icon: Activity },
  { id: 's02', label: 'Dispatch', icon: Workflow },
  { id: 's03', label: 'Alerts', icon: BellRing },
]

function Dock({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <nav className="relative z-10 mx-3 mb-3 flex items-center gap-1 rounded-[26px] bg-[#0B231C]/90 p-1.5 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/[0.08]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
      {tabs.map((t) => {
        const isActive = active === t.id
        return (
          <motion.button
            key={t.id}
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => onSelect(t.id)}
            className="relative flex flex-1 flex-col items-center gap-1 rounded-[19px] px-2 py-2.5"
          >
            {isActive && (
              <motion.span
                layoutId="dock-active"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-[19px] bg-white/[0.08]"
              />
            )}
            {isActive && (
              <span aria-hidden className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
            )}
            <span className="relative flex h-5 items-center">
              <t.icon
                className={cn('h-[18px] w-[18px] transition-colors duration-200', isActive ? 'text-emerald-300' : 'text-emerald-100/35')}
                strokeWidth={isActive ? 2.4 : 2}
              />
            </span>
            <span
              className={cn(
                'relative text-[9px] font-extrabold uppercase tracking-[0.14em] transition-colors duration-200',
                isActive ? 'text-emerald-200' : 'text-emerald-100/35',
              )}
            >
              {t.label}
            </span>
          </motion.button>
        )
      })}
    </nav>
  )
}

export function SystemApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/system/', '') || 's01'

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07130F] p-6 sm:p-9">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full bg-emerald-500/[0.16] blur-[130px]"
          animate={{ y: [0, -18, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-56 -right-40 h-[600px] w-[600px] rounded-full bg-teal-400/[0.12] blur-[140px]"
          animate={{ y: [0, 16, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
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

      <div className="absolute left-6 top-6 hidden items-center gap-2.5 rounded-full bg-white/[0.04] px-4 py-2 backdrop-blur-sm sm:flex">
        <Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-50/70">Ayvaa · Care operations</span>
      </div>
      <div className="absolute bottom-6 right-6 hidden bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-50/40 backdrop-blur-sm sm:block rounded-full">
        System console
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="relative"
      >
        <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-[96px] bg-emerald-400/[0.14] blur-3xl" />
        <div className="relative">
          <PhoneFrame>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="flex h-full min-h-0 flex-1 flex-col"
              >
                {screen === 's01' && <S01 />}
                {screen === 's02' && <S02 />}
                {screen === 's03' && <S03 />}
              </motion.div>
            </AnimatePresence>
            <Dock active={screen} onSelect={(id) => navigate(`/system/${id}`)} />
          </PhoneFrame>
        </div>
      </motion.div>
    </div>
  )
}
