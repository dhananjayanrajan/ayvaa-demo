import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, HeartPulse, Home, LifeBuoy, Sparkles, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PhoneFrame } from '@/components/base/phone/phone-frame'
import { ScreenshotButton } from '@/components/base/phone/screenshot-button'
import { Splash } from '@/components/base/phone/splash'
import { useRouter } from '@/lib/router'
import { P01 } from './P01'
import { P02 } from './P02'
import { P03 } from './P03'
import { P04 } from './P04'
import { P05 } from './P05'
import { P06 } from './P06'
import { P07 } from './P07'
import { P08 } from './P08'
import { P09 } from './P09'
import { P10 } from './P10'
import { P11 } from './P11'
import { P12 } from './P12'
import { P13 } from './P13'
import { P14 } from './P14'
import { P15 } from './P15'
import { P16 } from './P16'
import { P17 } from './P17'
import { P18 } from './P18'
import { P19 } from './P19'
import { P20 } from './P20'
import { P21 } from './P21'
import { P22 } from './P22'
import { P23 } from './P23'
import { P24 } from './P24'
import { P25 } from './P25'
import { P26 } from './P26'
import { P27 } from './P27'
import { P28 } from './P28'
import { P29 } from './P29'
import { P30 } from './P30'
import { P31 } from './P31'
import { P31b } from './P31b'
import { P32 } from './P32'
import { P33 } from './P33'
import { P34 } from './P34'
import { cn } from '@/lib/utils'

type Tab = { id: string; label: string; icon: LucideIcon }

const tabs: Tab[] = [
  { id: 'p06', label: 'Home', icon: Home },
  { id: 'p15', label: 'Visits', icon: CalendarDays },
  { id: 'p21', label: 'Records', icon: HeartPulse },
  { id: 'p25', label: 'Support', icon: LifeBuoy },
  { id: 'p28', label: 'Profile', icon: User },
]

const withNav = [
  'p06',
  'p07',
  'p13',
  'p14',
  'p15',
  'p17',
  'p19',
  'p20',
  'p21',
  'p23',
  'p25',
  'p28',
  'p29',
  'p30',
]

function TabBar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <nav className="relative z-10 shrink-0 border-t border-[#0B211B]/[0.06] bg-white/85 pb-2 pt-2 backdrop-blur-xl">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="flex items-stretch gap-0.5 px-3">
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
              <span className="relative flex h-8 w-14 items-center justify-center">
                {isActive && (
                  <motion.span
                    layoutId="patient-tab-chip"
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
                  'text-[8.5px] font-extrabold uppercase tracking-[0.08em] transition-colors duration-200',
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

export function PatientApp({ path }: { path: string }) {
  const { navigate } = useRouter()
  const screen = path.replace('/patient/', '') || 'p01'
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

      <div className="absolute left-6 top-6 hidden items-center gap-2.5 rounded-full bg-white/[0.04] px-4 py-2 backdrop-blur-sm sm:flex">
        <Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-50/70">Ayvaa · Family app</span>
      </div>
      <div className="absolute bottom-6 right-6 hidden sm:block">
        <ScreenshotButton targetRef={frameRef} fileName={`ayvaa-patient-${screen}`} expandPx={13} cornerRadiusPx={57} />
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
                  {screen === 'p01' && <P01 />}
                  {screen === 'p02' && <P02 />}
                  {screen === 'p03' && <P03 />}
                  {screen === 'p04' && <P04 />}
                  {screen === 'p05' && <P05 />}
                  {screen === 'p06' && <P06 />}
                  {screen === 'p07' && <P07 />}
                  {screen === 'p08' && <P08 />}
                  {screen === 'p09' && <P09 />}
                  {screen === 'p10' && <P10 />}
                  {screen === 'p11' && <P11 />}
                  {screen === 'p12' && <P12 />}
                  {screen === 'p13' && <P13 />}
                  {screen === 'p14' && <P14 />}
                  {screen === 'p15' && <P15 />}
                  {screen === 'p16' && <P16 />}
                  {screen === 'p17' && <P17 />}
                  {screen === 'p18' && <P18 />}
                  {screen === 'p19' && <P19 />}
                  {screen === 'p20' && <P20 />}
                  {screen === 'p21' && <P21 />}
                  {screen === 'p22' && <P22 />}
                  {screen === 'p23' && <P23 />}
                  {screen === 'p24' && <P24 />}
                  {screen === 'p25' && <P25 />}
                  {screen === 'p26' && <P26 />}
                  {screen === 'p27' && <P27 />}
                  {screen === 'p28' && <P28 />}
                  {screen === 'p29' && <P29 />}
                  {screen === 'p30' && <P30 />}
                  {screen === 'p31' && <P31 />}
                  {screen === 'p31b' && <P31b />}
                  {screen === 'p32' && <P32 />}
                  {screen === 'p33' && <P33 />}
                  {screen === 'p34' && <P34 />}
                </motion.div>
              </AnimatePresence>
              {withNav.includes(screen) && (
                <TabBar active={screen} onSelect={(id) => navigate(`/patient/${id}`)} />
              )}
            </PhoneFrame>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
