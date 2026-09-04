import { motion, AnimatePresence } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { PhoneFrame } from '@/components/base/phone/phone-frame'
import { ScreenshotButton } from '@/components/base/phone/screenshot-button'
import { Splash } from '@/components/base/phone/splash'
import { AdminTabBar, withNav } from '@/components/patterns/navigation/admin-tab-bar'
import type { RefObject } from 'react'

export function AdminShell({ screen, boot, frameRef, children, onTabSelect }: {
  screen: string; boot: boolean; frameRef: RefObject<HTMLDivElement | null>; children: React.ReactNode; onTabSelect: (id: string) => void
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07130F] p-6 sm:p-9">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full bg-emerald-500/[0.15] blur-[130px]" animate={{ y: [0, -18, 0], opacity: [0.8, 1, 0.8] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute -bottom-56 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-400/[0.1] blur-[140px]" animate={{ y: [0, 16, 0], opacity: [0.7, 1, 0.7] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute left-1/2 top-[38%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/[0.08] blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 25%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 25%, transparent 78%)' }} />
      </div>
      <div className="absolute left-6 top-6 hidden items-center gap-2.5 rounded-full bg-white/[0.04] px-4 py-2 backdrop-blur-sm sm:flex"><Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden /><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-50/70">Ayvaa · Admin console</span></div>
      <div className="absolute bottom-6 right-6 hidden sm:block"><ScreenshotButton targetRef={frameRef} fileName={`ayvaa-admin-${screen}`} expandPx={13} cornerRadiusPx={57} /></div>
      <motion.div initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} className="relative">
        <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-[96px] bg-emerald-400/[0.14] blur-3xl" />
        <div className="relative">
          <div ref={frameRef} className="relative">
            <PhoneFrame>
              <Splash key={screen} boot={boot} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={screen} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24, ease: 'easeOut' }} className="flex h-full min-h-0 flex-1 flex-col">
                  {children}
                </motion.div>
              </AnimatePresence>
              {withNav.includes(screen) && <AdminTabBar active={screen} onSelect={onTabSelect} />}
            </PhoneFrame>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
