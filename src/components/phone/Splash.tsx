import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HeartPulse } from 'lucide-react'

const statusLines = ['Verifying', 'Sealing records', 'Almost there']

export function Splash({ boot = false }: { boot?: boolean }) {
  const [done, setDone] = useState(false)
  const [status, setStatus] = useState(0)

  useEffect(() => {
    if (boot) {
      const t1 = setTimeout(() => setStatus(1), 450)
      const t2 = setTimeout(() => setStatus(2), 900)
      const t3 = setTimeout(() => setDone(true), 1400)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
    const t = setTimeout(() => setDone(true), 700)
    return () => clearTimeout(t)
  }, [boot])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: boot ? 0.45 : 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#0B231C]"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/[0.18] blur-[90px]" />
            <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-teal-300/[0.12] blur-[100px]" />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '38px 38px',
                maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 25%, transparent 78%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 25%, transparent 78%)',
              }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-5">
            <span className="relative grid place-items-center" style={{ width: boot ? 88 : 72, height: boot ? 88 : 72 }}>
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-[30px] bg-emerald-400/25 blur-xl"
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.96, 1.06, 0.96] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="relative grid size-full place-items-center rounded-[26px] bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_20px_44px_-14px_rgba(16,185,129,0.85)]"
              >
                <HeartPulse className={boot ? 'size-8' : 'size-7'} fill="currentColor" aria-hidden />
              </motion.span>
            </span>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-[24px] font-black leading-none tracking-tight text-white">
                ayvaa<span className="text-emerald-300">+</span>
              </div>
              {boot && (
                <span className="rounded-full bg-white/[0.07] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-100/60">
                  Caregiver
                </span>
              )}
            </motion.div>

            <div className="flex w-[168px] flex-col items-center gap-2.5">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: boot ? 1.3 : 0.5, ease: 'easeInOut' }}
                />
              </div>
              {boot ? (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/50"
                  >
                    {statusLines[status]}
                  </motion.span>
                </AnimatePresence>
              ) : (
                <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/40">Loading</span>
              )}
            </div>
          </div>

          {boot && (
            <div className="absolute bottom-7 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-300/60" aria-hidden />
              <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-emerald-100/35">
                One platform · every point of care
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
