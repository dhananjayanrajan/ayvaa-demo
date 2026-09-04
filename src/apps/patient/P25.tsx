import { motion } from 'motion/react'
import {
  CalendarClock,
  ChevronRight,
  CreditCard,
  LifeBuoy,
  MessageSquare,
  Phone,
  Siren,
  UserSearch,
} from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, Screen } from '@/components/base/phone/screen'
import { Card, Chip, Hero, Kicker, Panel, Section, Stat, Tile, TimeChip, rise, stagger } from '@/components/base/phone/kit'
import { supportTickets } from '@/data/seed'
import { supportQuickRequests } from '@/data/patientBilling'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const quickIcons = [CalendarClock, UserSearch, CreditCard]

export function P25() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  return (
    <Screen>
      <AppBar
        title="Support"
        subtitle="We reply within minutes, day or night"
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => notify({ title: 'Calling Ayvaa', body: 'Voice support · 24 hours a day', kind: 'info' })}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60"
            aria-label="Call support"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-3">
                  <Kicker>Care team · always on</Kicker>
                  <Chip intent="live" light dot className="shrink-0 border-transparent">
                    Online now
                  </Chip>
                </div>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Real humans,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">real answers</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Median first reply under 4 minutes — even at 3 AM.
                </p>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Avg reply" value="<4m" dot="bg-emerald-300" />
                  <Stat label="Open" value={supportTickets.length} dot="bg-amber-300" />
                  <Stat label="Resolved" value="100%" dot="bg-teal-300" />
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate('/patient/p27')}
                  className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-left"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-200">
                    <MessageSquare className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-bold text-emerald-50/90">Message our care team</span>
                    <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-100/45">
                      One thread keeps your whole history
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-emerald-200/60" aria-hidden />
                </motion.button>
              </Hero>
            </motion.div>

            {supportTickets.length > 0 && (
              <>
                <motion.div variants={rise}>
                  <Section label="Your open requests" trailing={<Chip intent="warning" dot>{supportTickets.length} active</Chip>} />
                </motion.div>

                {supportTickets.map((t) => (
                  <motion.div key={t.id} variants={rise}>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => navigate('/patient/p27')}
                      className="block w-full text-left"
                    >
                      <Card intent="warning">
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="min-w-0 truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{t.title}</span>
                            <Chip intent="warning" dot>
                              {t.status}
                            </Chip>
                          </div>
                          <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/60">
                            Requested to move Friday's visit from 2:00 PM to 10:00 AM.
                          </p>
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <span className="flex min-w-0 items-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
                              <TimeChip>Today {t.updated}</TimeChip>
                              <span className="truncate">Coordinator reviewing</span>
                            </span>
                            <span className="flex shrink-0 items-center gap-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                              Open thread
                              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.button>
                  </motion.div>
                ))}
              </>
            )}

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/patient/p26')}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Open a new request
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Common requests" trailing={<Chip intent="neutral">Self-serve</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {supportQuickRequests.map((q, i) => {
                  const Icon = quickIcons[i] ?? LifeBuoy
                  return (
                    <div key={q.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => navigate('/patient/p26')}
                        className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={Icon} tone={i === 0 ? 'info' : i === 1 ? 'success' : 'warning'} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{q.label}</div>
                          <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">{q.detail}</div>
                        </div>
                        <ChevronRight
                          className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                          aria-hidden
                        />
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  notify({ title: 'Urgent safety line', body: 'A supervisor is joining now · stay on this screen', kind: 'error' })
                  navigate('/patient/p32')
                }}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]"
              >
                <Siren className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Raise urgent safety concern
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="neutral" className="p-3.5">
                <p className="text-center text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/45">
                  Urgent line is for safety issues only · billing and scheduling go through the thread.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa care team · always on" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
