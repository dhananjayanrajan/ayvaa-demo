import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BarChart3, LayoutDashboard, ShieldCheck, Sparkles, Ticket, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PhoneFrame } from '@/components/phone/PhoneFrame'
import { ScreenshotButton } from '@/components/phone/ScreenshotButton'
import { Splash } from '@/components/phone/Splash'
import { useRouter } from '@/lib/router'
import { A01 } from './A01'
import { A02 } from './A02'
import { A03 } from './A03'
import { A04 } from './A04'
import { A05 } from './A05'
import { A06 } from './A06'
import { A07 } from './A07'
import { A08 } from './A08'
import { A09 } from './A09'
import { cn } from '@/lib/utils'

type Tab = { id: string; label: string; icon: LucideIcon }

const tabs: Tab[] = [
  { id: 'a01', label: 'Console', icon: LayoutDashboard },
  { id: 'a04', label: 'Users', icon: Users },
  { id: 'a05', label: 'Compliance', icon: ShieldCheck },
  { id: 'a08', label: 'Tickets', icon: Ticket },
  { id: 'a09', label: 'Analytics', icon: BarChart3 },
]

const withNav = ['a01', 'a03', 'a04', 'a05', 'a06', 'a08', 'a09']

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
                    layoutId="admin-tab-chip"
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

export function AdminApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/admin/', '') || 'a01'
  const bootRef = useRef(true)
  const frameRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bootRef.current = false
  }, [])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07130F] p-6 sm:p-9">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full bg-emerald-500/[0.15] blur-[130px]"
          animate={{ y: [0, -18, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-56 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-400/[0.1] blur-[140px]"
          animate={{ y: [0, 16, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute left-1/2 top-[38%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/[0.08] blur-[110px]" />
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
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-50/70">Ayvaa · Admin console</span>
      </div>
      <div className="absolute bottom-6 right-6 hidden sm:block">
        <ScreenshotButton targetRef={frameRef} fileName={`ayvaa-admin-${screen}`} expandPx={13} cornerRadiusPx={57} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="relative"
      >
        <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-[96px] bg-emerald-400/[0.14] blur-3xl" />
        <div className="relative">
          <div ref={frameRef} className="relative">
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
                  {screen === 'a01' && <A01 />}
                  {screen === 'a02' && <A02 />}
                  {screen === 'a03' && <A03 />}
                  {screen === 'a04' && <A04 />}
                  {screen === 'a05' && <A05 />}
                  {screen === 'a06' && <A06 />}
                  {screen === 'a07' && <A07 />}
                  {screen === 'a08' && <A08 />}
                  {screen === 'a09' && <A09 />}
                </motion.div>
              </AnimatePresence>
              {withNav.includes(screen) && (
                <TabBar active={screen} onSelect={(id) => navigate(`/admin/${id}`)} />
              )}
            </PhoneFrame>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
