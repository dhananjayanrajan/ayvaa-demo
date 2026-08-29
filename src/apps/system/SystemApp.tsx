import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Activity, BellRing, Database, SearchCheck, Sparkles, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PhoneFrame } from '@/components/phone/PhoneFrame'
import { Splash } from '@/components/phone/Splash'
import { useRouter } from '@/lib/router'
import { S01 } from './S01'
import { S02 } from './S02'
import { S03 } from './S03'
import { S04 } from './S04'
import { S05 } from './S05'
import { cn } from '@/lib/utils'

type Tab = { id: string; label: string; icon: LucideIcon }

const tabs: Tab[] = [
  { id: 's01', label: 'Trail', icon: Activity },
  { id: 's02', label: 'Dispatch', icon: Workflow },
  { id: 's03', label: 'Alerts', icon: BellRing },
  { id: 's04', label: 'Ledger', icon: Database },
  { id: 's05', label: 'Recheck', icon: SearchCheck },
]

function TabBar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <nav className="relative z-10 shrink-0 border-t border-[#0B211B]/[0.06] bg-white/85 pb-2 pt-2 backdrop-blur-xl">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="flex items-stretch gap-1 px-4">
        {tabs.map((t) => {
          const isActive = active === t.id
          return (
            <motion.button
              key={t.id}
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelect(t.id)}
              className="flex flex-1 flex-col items-center gap-1.5 py-1"
            >
              <span className="relative flex h-8 w-16 items-center justify-center">
                {isActive && (
                  <motion.span
                    layoutId="tabbar-chip"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)]"
                  />
                )}
                <t.icon
                  className={cn(
                    'relative h-[17px] w-[17px] transition-colors duration-200',
                    isActive ? 'text-white' : 'text-[#0B211B]/35',
                  )}
                  strokeWidth={isActive ? 2.4 : 2}
                />
              </span>
              <span
                className={cn(
                  'text-[9.5px] font-extrabold uppercase tracking-[0.12em] transition-colors duration-200',
                  isActive ? 'text-emerald-700' : 'text-[#0B211B]/35',
                )}
              >
                {t.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}

export function SystemApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/system/', '') || 's01'
  const bootRef = useRef(true)

  useEffect(() => {
    bootRef.current = false
  }, [])

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
      <div className="absolute bottom-6 right-6 hidden rounded-full bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-50/40 backdrop-blur-sm sm:block">
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
            <Splash key={screen} boot={bootRef.current} />
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
                {screen === 's04' && <S04 />}
                {screen === 's05' && <S05 />}
              </motion.div>
            </AnimatePresence>
            <TabBar active={screen} onSelect={(id) => navigate(`/system/${id}`)} />
          </PhoneFrame>
        </div>
      </motion.div>
    </div>
  )
}
