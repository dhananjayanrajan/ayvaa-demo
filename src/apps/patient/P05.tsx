import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Check, ChevronDown, Clock, Lock, MailCheck, RotateCcw, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const guarantees: { icon: typeof Clock; title: string; body: string }[] = [
  {
    icon: Clock,
    title: "Today's visits are unaffected",
    body: "Lakshmi's 2:00 PM visit proceeds as planned — caregivers never need your password.",
  },
  {
    icon: ShieldCheck,
    title: 'Your records stay sealed',
    body: 'Nobody can open any record while a reset is in progress, not even support.',
  },
]

const safety: { title: string; body: string }[] = [
  { title: 'Single-use link', body: 'Each link works exactly once, then dies — forwarded links are useless.' },
  { title: '30-minute window', body: 'Unused links expire after 30 minutes and a new one must be requested.' },
  { title: 'Audit-logged change', body: 'The password change itself is written to the audit record with a timestamp.' },
]

export function P05() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sent, setSent] = useState(false)
  const [openFact, setOpenFact] = useState<string | null>(null)

  const send = () => {
    setSent(true)
    notify({ title: 'Reset link sent', body: `Check ${guardian.email} · valid for 30 minutes`, kind: 'ok' })
  }

  return (
    <Screen>
      <AppBar title="Reset password" subtitle="Account recovery · secure" onBack={() => navigate('/patient/p02')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-col items-center pt-2 text-center">
                    <motion.span
                      className="relative grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-200"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald-400/10" />
                      <MailCheck className="relative h-9 w-9" strokeWidth={1.8} aria-hidden />
                    </motion.span>
                    <h2 className="mt-4 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      One secure link,{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">straight to you</span>
                    </h2>
                    <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                      Single use · expires in 30 minutes · nothing else changes.
                    </p>
                    <div className="mt-4 w-full rounded-2xl bg-white/[0.06] px-3.5 py-3">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/45">Recovery destination</div>
                      <div className="mt-1 truncate font-mono text-[13px] font-bold text-emerald-50/90">{guardian.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {!sent && (
              <motion.div variants={rise}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={send}
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <MailCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  Send reset link
                </motion.button>
              </motion.div>
            )}

            <AnimatePresence>
              {sent && (
                <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Card intent="success">
                    <div className="p-4">
                      <div className="flex items-center gap-3.5">
                        <Tile icon={MailCheck} tone="success" size="lg" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Reset link sent</div>
                          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Check your inbox · sent just now</div>
                        </div>
                        <Chip intent="success" dot>
                          Live 30 min
                        </Chip>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">
                          <span>Link validity</span>
                          <span className="text-emerald-700">expires 30:00</span>
                        </div>
                        <Meter value={1} intent="success" delay={0.2} className="mt-2" />
                      </div>

                      <div className="mt-3.5 flex gap-2.5">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            notify({ title: 'Opening mail app', body: `Handing off to your mail for ${guardian.email}`, kind: 'info' })
                          }
                          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-bold text-[#0B211B]/75"
                        >
                          <RotateCcw className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
                          <span className="truncate">Open mail app</span>
                        </motion.button>
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            notify({ title: 'Care team verifying', body: 'A coordinator will call you within 10 minutes', kind: 'info' })
                          }
                          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-bold text-[#0B211B]/75"
                        >
                          <span className="truncate">Call instead</span>
                        </motion.button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={rise}>
              <Section label="While you wait" trailing={<Chip intent="neutral">Good to know</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {guarantees.map((g, i) => (
                  <div key={g.title}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <Tile icon={g.icon} tone={i === 0 ? 'success' : 'info'} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{g.title}</div>
                        <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">{g.body}</div>
                      </div>
                      <Chip intent="success" icon={Check}>
                        OK
                      </Chip>
                    </div>
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Reset safety rules" trailing={<Chip intent="info">Sealed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="info">
                <div className="p-4">
                  <div className="flex flex-col">
                    {safety.map((f, i) => {
                      const open = openFact === f.title
                      return (
                        <div key={f.title}>
                          {i > 0 && <div aria-hidden className="my-3 h-px bg-sky-500/10" />}
                          <button
                            type="button"
                            onClick={() => setOpenFact(open ? null : f.title)}
                            className="flex w-full items-center gap-3 text-left"
                          >
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-500/15 text-sky-600">
                              <Lock className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1 text-[12.5px] font-bold tracking-tight text-[#0B211B]">{f.title}</span>
                            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                              <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                            </motion.span>
                          </button>
                          <Expand open={open}>
                            <p className="pl-9 pt-1.5 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{f.body}</p>
                          </Expand>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa account recovery" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/patient/p02')}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Back to sign in
        </motion.button>
      </FootBar>
    </Screen>
  )
}
