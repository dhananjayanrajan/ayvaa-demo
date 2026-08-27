import { motion } from 'motion/react'
import { Activity, Bell, CalendarDays, Folder, Home, Phone, Pill, Plus, Repeat, Siren } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Field, Pill as PillTag, Tile } from '@/components/phone/Controls'
import { carePlan, guardian, lovedOnes, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const quickActions = [
  { label: 'Book care', icon: Plus, to: '/patient/p09' },
  { label: 'Medicine', icon: Pill, to: '/patient/p19' },
  { label: 'Records', icon: Folder, to: '/patient/p21' },
]

export function P06() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const nextVisit = visits.find((v) => v.status === 'live') ?? visits[0]
  const upcoming = visits.filter((v) => v.status === 'confirmed' || v.status === 'pending')

  return (
    <Screen>
      <AppBar
        title={guardian.name}
        subtitle="Good morning"
        trailing={
          <div className="flex items-center gap-2">
            <AgentAvatar seed={guardian.name} size={42} />
            <button
              onClick={() => {
                notify({ title: '2 new notifications', body: 'Visit confirmed · receipt ready', kind: 'info' })
                navigate('/patient/p07')
              }}
              className="relative grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive" />
            </button>
          </div>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Field icon={Activity} hint="Search care, nurses and medicine" onClick={() => navigate('/patient/p08')} />
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Next home visit</span>
                <PillTag tone="ok" className="bg-white/80">
                  <CalendarDays className="size-3.5" /> Today
                </PillTag>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-white">
                  <Pill className="size-5 text-brand-ink" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-brand-ink">{nextVisit.caregiver ?? carePlan.caregiver.split(' · ')[0]}</div>
                  <div className="text-xs font-medium text-brand-ink/80">
                    RN · {carePlan.category} for {father.name.split(' ')[0]}
                  </div>
                </div>
                <button
                  onClick={() =>
                    notify({
                      title: `Calling ${nextVisit.caregiver?.split(' ')[0] ?? 'your nurse'}`,
                      body: 'Connecting securely over Ayvaa · not shared with anyone',
                      kind: 'info',
                    })
                  }
                  className="grid size-[46px] shrink-0 place-items-center rounded-[14px] bg-white text-brand-ink transition-transform active:scale-95"
                  aria-label="Call caregiver"
                >
                  <Phone className="size-5" />
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-brand-ink/15 pt-2.5">
                <span className="flex items-center gap-1.5 text-xs font-medium text-brand-ink">
                  <Pill className="size-3.5" /> {nextVisit.time} to 4:00 PM
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-brand-ink">
                  <Repeat className="size-3.5" /> Mon, Wed, Fri
                </span>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-4 gap-2.5">
            {quickActions.map((q) => (
              <button key={q.label} onClick={() => navigate(q.to)} className="flex flex-col items-center gap-1.5">
                <Tile icon={q.icon} className="w-full" />
                <span className="text-xs font-medium text-muted-foreground">{q.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                notify({ title: 'Emergency help opened', body: 'Ambulance 108 · your nurse is on site', kind: 'error' })
                navigate('/patient/p32')
              }}
              className="flex flex-col items-center gap-1.5"
            >
              <Tile icon={Siren} className="w-full bg-error-bg text-destructive hover:bg-error-bg" />
              <span className="text-xs font-medium text-muted-foreground">Emergency</span>
            </button>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Upcoming visits" action="See all" onAction={() => navigate('/patient/p15')} />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {upcoming.map((v, i) => (
                <div key={v.id}>
                  {i > 0 && <div className="mx-3 my-2.5 h-px bg-border" />}
                  <ActionRow
                    icon={CalendarDays}
                    title={`${v.day}, ${v.date}`}
                    subtitle={v.caregiver ? `${v.caregiver} · ${v.time}` : 'Awaiting caregiver · offer out'}
                    trailing={
                      <PillTag tone={v.status === 'confirmed' ? 'ok' : 'grey'}>
                        {v.status === 'confirmed' ? 'Confirmed' : 'Waiting'}
                      </PillTag>
                    }
                    onClick={() => navigate('/patient/p15')}
                  />
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="p-2">
              <ActionRow
                icon={Activity}
                title={`Care plan · week ${carePlan.week} of ${carePlan.weeks}`}
                subtitle={`${carePlan.status} · ${carePlan.visitsDone} visits completed`}
                onClick={() => navigate('/patient/p13')}
              />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of today" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
