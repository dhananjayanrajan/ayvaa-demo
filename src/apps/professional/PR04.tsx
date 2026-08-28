import { motion } from 'motion/react'
import { Activity, ArrowRight, CalendarDays, Home, MapPin, Syringe } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Panel, Section, Tile, TimeChip, rise, stagger } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { sessions } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

function sessionIcon(title: string) {
  if (title.includes('insulin')) return Syringe
  if (title.includes('wellness')) return Home
  if (title.includes('physio')) return Activity
  return CalendarDays
}

const timeline: { label: string; slot: string }[] = [
  { label: 'Morning', slot: '9:00 AM' },
  { label: 'Midday', slot: '12:30 PM' },
  { label: 'Evening', slot: '5:30 PM' },
]

export function PR04() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const live = sessions.find((s) => s.status === 'live')
  const upcoming = sessions.filter((s) => s.status === 'upcoming')
  const tomorrow = upcoming[upcoming.length - 1]
  const today = upcoming.slice(0, -1)

  return (
    <Screen>
      <AppBar title="My sessions" subtitle="Wednesday, March 13 · three scheduled" />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-3">
                  <Kicker>Wednesday · March 13</Kicker>
                  <Chip intent="live" light dot className="shrink-0 border-transparent">
                    Live now
                  </Chip>
                </div>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  One live, two to go,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">all confirmed</span>
                </h2>
                <div className="mt-5 flex items-start">
                  {timeline.map((t, i) => {
                    const isLive = i === 0
                    const isDone = false
                    return (
                      <div key={t.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                        {isLive ? (
                          <span className="relative grid h-3.5 w-3.5 place-items-center">
                            <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400/50" />
                            <span className="relative h-3 w-3 rounded-full bg-emerald-300 ring-4 ring-emerald-300/25" />
                          </span>
                        ) : (
                          <span className="h-3 w-3 rounded-full bg-white/20" />
                        )}
                        <span
                          className={
                            isLive
                              ? 'text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-emerald-200'
                              : 'text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-emerald-100/40'
                          }
                        >
                          {t.label}
                        </span>
                        <span className="font-mono text-[9px] font-bold text-emerald-100/35">{t.slot}</span>
                        <span aria-hidden className="hidden" />
                        {isDone && null}
                      </div>
                    )
                  })}
                </div>
              </Hero>
            </motion.div>

            {live && (
              <motion.div variants={rise}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    notify({ title: 'Opening live session', body: `${live.title} · checklist continues from step 3`, kind: 'ok' })
                    navigate('/professional/pr06')
                  }}
                  className="block w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-emerald-600 to-teal-600 p-5 shadow-[0_24px_52px_-24px_rgba(5,150,105,0.8)]">
                    <span aria-hidden className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                          <Activity className="h-3 w-3" aria-hidden />
                          Right now · {live.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.16] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-white opacity-70" />
                            <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                          </span>
                          Checked in
                        </span>
                      </div>

                      <div className="mt-3.5 flex items-center gap-3.5">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.16] text-white">
                          <Activity className="h-6 w-6" strokeWidth={2.2} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[16px] font-extrabold tracking-tight text-white">{live.title}</div>
                          <div className="truncate text-[11.5px] font-semibold text-white/70">{live.detail}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/[0.14] px-4 py-3">
                        <span className="text-[12px] font-bold text-white">Resume checklist from step 3</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-white" strokeWidth={2.6} aria-hidden />
                      </div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Section label="Later today" trailing={<Chip intent="neutral">{today.length} visits</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {today.map((s, i) => {
                  const Icon = sessionIcon(s.title)
                  return (
                    <div key={s.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => notify({ title: s.title, body: `${s.time} · ${s.detail} · confirmed with the family`, kind: 'info' })}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={Icon} tone="success" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <TimeChip>{s.time}</TimeChip>
                            <span className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{s.title}</span>
                          </div>
                          <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                            {s.detail}
                            {s.distance ? ` · ${s.distance}` : ''}
                          </div>
                        </div>
                        <Chip intent="success">Confirmed</Chip>
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            {tomorrow && (
              <>
                <motion.div variants={rise}>
                  <Section label="Tomorrow · field task" trailing={<Chip intent="warning">Report required</Chip>} />
                </motion.div>

                <motion.div variants={rise}>
                  <Card intent="warning">
                    <div className="p-5">
                      <div className="flex items-center gap-3.5">
                        <Tile icon={MapPin} tone="warning" size="lg" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <TimeChip>{tomorrow.time}</TimeChip>
                            <span className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{tomorrow.title}</span>
                          </div>
                          <div className="mt-0.5 truncate text-[11.5px] font-semibold text-[#0B211B]/55">
                            {tomorrow.detail} · report due same day
                          </div>
                        </div>
                      </div>
                      <Panel intent="warning" className="mt-4 p-3.5">
                        <p className="text-pretty text-[12px] font-medium leading-relaxed text-[#0B211B]/70">
                          Field tasks are scheduled outside your home visits. Completing the report keeps your dispatch priority intact.
                        </p>
                      </Panel>
                    </div>
                  </Card>
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => notify({ title: 'Full week', body: 'Weekly session calendar opens here', kind: 'info' })}
                className="block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={CalendarDays} tone="ink" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">View full week</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">All confirmed sessions and field tasks</div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600/60" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={CalendarDays} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Every session was availability-checked when you accepted. Missing one affects your matching priority.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of sessions" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
