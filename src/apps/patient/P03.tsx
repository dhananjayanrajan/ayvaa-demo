import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, Camera, Check, Mail, ScanLine, ShieldCheck, Smartphone, Smile, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const code = ['4', '7', '2', '9', '', '']
const maskedPhone = `${guardian.phone.slice(0, 9)} ••• ${guardian.phone.slice(-4)}`

const journey: { icon: typeof Smartphone; title: string; state: 'now' | 'next' }[] = [
  { icon: Smartphone, title: 'Phone code', state: 'now' },
  { icon: Camera, title: 'ID photo', state: 'next' },
  { icon: Smile, title: 'Live selfie', state: 'next' },
]

export function P03() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [seconds, setSeconds] = useState(42)
  const [emailOpen, setEmailOpen] = useState(false)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const resend = () => {
    setSeconds(42)
    notify({ title: 'Code re-sent', body: `New six-digit code sent to ${maskedPhone}`, kind: 'info' })
  }

  const activeIndex = code.findIndex((d) => d === '')

  return (
    <Screen>
      <AppBar
        title="Verify it is you"
        subtitle="Guardian identity · protects every record"
        onBack={() => navigate('/patient/p02')}
        trailing={<Chip intent="neutral">Step 1 of 2</Chip>}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 text-center shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <Kicker>Verification journey · step 1 of 3</Kicker>

                  <div className="mt-4 font-mono text-[20px] font-black tracking-[0.14em] text-white">{maskedPhone}</div>
                  <p className="mt-1 text-[11px] font-semibold text-emerald-100/50">
                    We sent a six-digit code there just now
                  </p>

                  <div className="mt-5 flex items-start justify-center">
                    {journey.map((s, i) => (
                      <div key={s.title} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                        {i > 0 && <span aria-hidden className={cn('mt-[7px] h-px w-6 shrink-0', s.state === 'done' ? 'bg-emerald-300/60' : 'bg-white/15')} />}
                        {s.state === 'now' ? (
                          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/20 text-emerald-100">
                            <span aria-hidden className="absolute inset-0 animate-ping rounded-xl bg-emerald-400/20" />
                            <s.icon className="relative h-4 w-4" strokeWidth={2.2} aria-hidden />
                          </span>
                        ) : (
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.07] text-emerald-100/40">
                            <s.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                          </span>
                        )}
                        <span
                          className={cn(
                            'text-[8.5px] font-extrabold uppercase tracking-[0.1em]',
                            s.state === 'now' ? 'text-emerald-200' : 'text-emerald-100/40',
                          )}
                        >
                          {s.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex justify-center gap-2">
                {code.map((d, i) => {
                  const filled = d !== ''
                  const isActive = i === activeIndex
                  return (
                    <motion.span
                      key={i}
                      initial={filled ? { scale: 0.4, opacity: 0 } : { opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 340, damping: 18 }}
                      className={cn(
                        'grid h-16 w-12 place-items-center rounded-2xl text-[26px] font-black tabular-nums',
                        filled
                          ? 'bg-[#0B231C] text-emerald-200 shadow-[0_16px_32px_-16px_rgba(6,40,30,0.7)]'
                          : isActive
                            ? 'bg-emerald-500/[0.12]'
                            : 'bg-[#0B211B]/[0.05]',
                      )}
                    >
                      {filled ? (
                        d
                      ) : isActive ? (
                        <motion.span
                          className="h-2 w-2 rounded-full bg-emerald-500"
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0B211B]/20" />
                      )}
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              {seconds > 0 ? (
                <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-[#0B211B]/45">
                  <ScanLine className="h-3.5 w-3.5" aria-hidden />
                  Resend code in 00:{String(seconds).padStart(2, '0')}
                </div>
              ) : (
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={resend}
                  className="mx-auto block rounded-full bg-emerald-500/[0.12] px-4 py-2 text-[12px] font-extrabold text-emerald-700"
                >
                  Resend code now
                </motion.button>
              )}
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  notify({ title: 'Phone verified', body: 'Code matched · continue to ID check', kind: 'ok' })
                  navigate('/patient/p04')
                }}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <BadgeCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Verify and continue
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Mail} tone="info" />
                <button
                  type="button"
                  onClick={() => setEmailOpen(true)}
                  className="min-w-0 flex-1 pt-0.5 text-left text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65"
                >
                  Did not get a code? <span className="font-bold text-emerald-700">Send it by email instead</span> — it arrives instantly.
                </button>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="What comes next" trailing={<Chip intent="neutral">2 min total</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <Tile icon={Camera} tone="success" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">A photo of your ID card</div>
                    <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                      Front and back · takes under a minute
                    </div>
                  </div>
                  <Chip intent="success">Up next</Chip>
                </div>
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <Tile icon={Smile} tone="neutral" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">A short selfie to match it</div>
                    <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                      Deleted after matching, never stored
                    </div>
                  </div>
                  <Chip intent="neutral">After</Chip>
                </div>
                <div className="mx-4 mb-4">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    <span>Verification progress</span>
                    <span className="text-emerald-700">1 of 3</span>
                  </div>
                  <Meter value={1 / 3} intent="warning" delay={0.3} className="mt-2" />
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa identity check" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {emailOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEmailOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {emailOpen && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-start gap-3">
              <Tile icon={Mail} tone="info" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Get the code by email</div>
                <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Same six digits · arrives instantly</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setEmailOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close sheet"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="rounded-3xl bg-[#0B231C] p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">Destination</span>
                <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{guardian.email}</span>
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setEmailOpen(false)
                notify({ title: 'Code sent by email', body: `Six-digit code sent to ${guardian.email}`, kind: 'info' })
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <Mail className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Email me the code
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setEmailOpen(false)}
              className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
            >
              Keep waiting for SMS
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
