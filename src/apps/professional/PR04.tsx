import { motion } from 'motion/react'
import { Activity, ArrowRight, CalendarDays, Home, MapPin, Syringe } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { sessions } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

function sessionIcon(title: string) {
  if (title.includes('insulin')) return Syringe
  if (title.includes('wellness')) return Home
  if (title.includes('physio')) return Activity
  return CalendarDays
}

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
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          {live && (
            <motion.div variants={item}>
              <ScreenCard tone="mint" className="flex flex-col gap-3 border-l-4 border-l-primary">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">
                    Right now · {live.time}
                  </span>
                  <Pill tone="ok" className="bg-white/80">
                    Checked in
                  </Pill>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-white text-brand-ink">
                    <Activity className="size-5 fill-current" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-brand-ink">{live.title}</div>
                    <div className="text-xs font-medium text-brand-ink/80">{live.detail}</div>
                  </div>
                </div>
                <SmoothButton
                  variant="default"
                  shape="pill"
                  className="w-full"
                  onClick={() => {
                    notify({ title: 'Opening live session', body: `${live.title} · checklist continues from step 3`, kind: 'ok' })
                    navigate('/professional/pr06')
                  }}
                >
                  Open live session <ArrowRight className="size-4" />
                </SmoothButton>
              </ScreenCard>
            </motion.div>
          )}

          <motion.div variants={item}>
            <SectionHeader label="Later today" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {today.map((s, i) => {
                const Icon = sessionIcon(s.title)
                return (
                  <div key={s.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <div className="flex items-center gap-3 px-2 py-1.5">
                      <IconTile icon={Icon} tone="mint" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-foreground">
                          {s.time} · {s.title}
                        </div>
                        <div className="truncate text-xs font-medium text-muted-foreground">
                          {s.detail}
                          {s.distance ? ` · ${s.distance}` : ''}
                        </div>
                      </div>
                      <Pill tone="ok">Confirmed</Pill>
                    </div>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          {tomorrow && (
            <>
              <motion.div variants={item}>
                <SectionHeader label="Tomorrow · field task" />
              </motion.div>
              <motion.div variants={item}>
                <ScreenCard className="flex items-center gap-3">
                  <IconTile icon={sessionIcon(tomorrow.title)} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-foreground">
                      {tomorrow.time} · {tomorrow.title}
                    </div>
                    <div className="truncate text-xs font-medium text-muted-foreground">{tomorrow.detail} · report required</div>
                  </div>
                  <Pill tone="warn">
                    <MapPin className="size-3.5" /> Field
                  </Pill>
                </ScreenCard>
              </motion.div>
            </>
          )}

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="p-2">
              <button
                onClick={() => notify({ title: 'Full week', body: 'Weekly session calendar opens here', kind: 'info' })}
                className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
              >
                <IconTile icon={CalendarDays} tone="mint" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-foreground">View full week</span>
                  <span className="block text-xs font-medium text-muted-foreground">All confirmed sessions and field tasks</span>
                </span>
                <ArrowRight className="size-4.5 shrink-0 text-muted-foreground" />
              </button>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={CalendarDays}
              body="Every session was availability-checked when you accepted. Missing one affects your matching priority."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of sessions" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
