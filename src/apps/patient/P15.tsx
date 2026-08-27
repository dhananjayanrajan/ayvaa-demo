import { useState } from 'react'
import { motion } from 'motion/react'
import { CalendarDays, ChevronRight, CircleCheck, CircleX, Plus, Undo2 } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { carePlan, lovedOnes, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

type Tab = 'upcoming' | 'completed' | 'missed'

export function P15() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [tab, setTab] = useState<Tab>('upcoming')

  const upcoming = visits.filter((v) => v.status === 'confirmed' || v.status === 'pending' || v.status === 'live')
  const missed = visits.filter((v) => v.status === 'missed')
  const completed = [
    {
      id: 'vc1',
      day: 'Tuesday',
      date: 'Mar 12',
      time: '2:00 PM to 4:30 PM',
      caregiver: 'Lakshmi Reddy',
    },
  ]

  const openVisit = (id: string) => {
    const v = visits.find((x) => x.id === id)
    if (v?.status === 'live') {
      navigate('/patient/p16')
      return
    }
    notify({ title: 'Visit details', body: 'Full visit view opens here', kind: 'info' })
    navigate('/patient/p17')
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { id: 'completed', label: 'Completed', count: completed.length },
    { id: 'missed', label: 'Missed', count: missed.length },
  ]

  return (
    <Screen>
      <AppBar
        title="Visits"
        subtitle={`${carePlan.category} plan for ${father.name}`}
        trailing={
          <button
            onClick={() => notify({ title: 'Filters', body: 'Filter by caregiver, category or month', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Filter visits"
          >
            <CalendarDays className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-2">
            {tabs.map((t) => (
              <SmoothButton
                key={t.id}
                variant={tab === t.id ? 'default' : 'secondary'}
                shape="pill"
                className={cn('flex-1', tab === t.id && 'bg-primary')}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </SmoothButton>
            ))}
          </motion.div>

          {tab === 'upcoming' && (
            <>
              {visits.find((v) => v.status === 'live') && (
                <motion.div variants={item}>
                  <ScreenCard tone="mint" className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Happening today</span>
                      <Pill tone="ok" className="bg-white/80">
                        In progress
                      </Pill>
                    </div>
                    <button
                      onClick={() => navigate('/patient/p16')}
                      className="flex w-full items-center gap-3 text-left"
                    >
                      <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-white">
                        <CircleCheck className="size-5 text-brand-ink" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-brand-ink">Lakshmi arrived at 2:02 PM</div>
                        <div className="text-xs font-medium text-brand-ink/80">Location matched your home address</div>
                      </div>
                      <ChevronRight className="size-4.5 shrink-0 text-brand-ink" />
                    </button>
                  </ScreenCard>
                </motion.div>
              )}

              <motion.div variants={item}>
                <ScreenCard className="p-2">
                  {upcoming.map((v, i) => (
                    <div key={v.id}>
                      {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                      <button
                        onClick={() => openVisit(v.id)}
                        className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                      >
                        <IconTile icon={CalendarDays} tone="tonal" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold text-foreground">
                            {v.day}, {v.date}
                          </div>
                          <div className="truncate text-xs font-medium text-muted-foreground">
                            {v.caregiver ? `${v.caregiver} · ${v.time}` : 'Offer out to nearby nurses'}
                          </div>
                        </div>
                        <Pill tone={v.status === 'confirmed' ? 'ok' : v.status === 'pending' ? 'warn' : 'grey'}>
                          {v.status === 'confirmed' ? 'Confirmed' : v.status === 'pending' ? 'Pending' : 'Waiting'}
                        </Pill>
                      </button>
                    </div>
                  ))}
                </ScreenCard>
              </motion.div>
            </>
          )}

          {tab === 'completed' && (
            <motion.div variants={item}>
              <ScreenCard className="p-2">
                {completed.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => navigate('/patient/p17')}
                    className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                  >
                    <IconTile icon={CircleCheck} tone="mint" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">
                        {v.day}, {v.date}
                      </div>
                      <div className="truncate text-xs font-medium text-muted-foreground">
                        {v.caregiver} · {v.time}
                      </div>
                    </div>
                    <Pill tone="ok">Signed off</Pill>
                  </button>
                ))}
              </ScreenCard>
            </motion.div>
          )}

          {tab === 'missed' && (
            <>
              <motion.div variants={item}>
                <ScreenCard tone="error" className="flex items-start gap-3">
                  <IconTile icon={CircleX} tone="destructive" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-destructive">
                      {missed[0]?.day}, {missed[0]?.date} · missed
                    </div>
                    <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">
                      {missed[0]?.note ?? 'No nurse accepted in time'}
                    </div>
                  </div>
                </ScreenCard>
              </motion.div>
              <motion.div variants={item}>
                <ScreenCard className="flex items-center gap-3">
                  <IconTile icon={Undo2} tone="mint" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-foreground">Refund processed automatically</div>
                    <div className="text-xs font-medium text-muted-foreground">
                      Missed visits are never charged · returned to your card
                    </div>
                  </div>
                  <Pill tone="ok">Guaranteed</Pill>
                </ScreenCard>
              </motion.div>
            </>
          )}

          <motion.div variants={item}>
            <InfoCard
              icon={CircleCheck}
              body="Every visit on this list is verified by GPS check-in. What happened is recorded, sealed and shared with you."
            />
          </motion.div>

          <motion.div variants={item}>
            <SmoothButton
              variant="soft"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => navigate('/patient/p09')}
            >
              <Plus className="size-4" /> Book another service
            </SmoothButton>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of visits" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
