import { useState } from 'react'
import { motion } from 'motion/react'
import { CalendarDays, Lock, MapPin, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Section, rise, stagger } from '@/components/phone/kit'
import { SegmentedTabs } from '@/components/phone/SegmentedTabs'
import { SessionSummaryHero } from '@/components/professional/sessions/SessionSummaryHero'
import { LiveSessionCard } from '@/components/professional/sessions/LiveSessionCard'
import { SessionListCard } from '@/components/professional/sessions/SessionListCard'
import { SessionDetailSheet } from '@/components/professional/sessions/SessionDetailSheet'
import { FieldTaskRow } from '@/components/professional/sessions/FieldTaskRow'
import { ReportSheet } from '@/components/professional/sessions/ReportSheet'
import { InfoListCard } from '@/components/admin/ui/InfoListCard'
import { sessions } from '@/data/seed'
import type { Session } from '@/data/types'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function PR04() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [selectedDay, setSelectedDay] = useState('thu')
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [reportOpen, setReportOpen] = useState(false)

  const live = sessions.find((s) => s.status === 'live')
  const upcoming = sessions.filter((s) => s.status === 'upcoming')
  const todaysSessions = selectedDay === 'thu' ? upcoming : []
  const tomorrowTask = upcoming.find((s) => s.title.includes('Field'))

  const hasLive = selectedDay === 'thu' && Boolean(live)
  const liveCount = hasLive ? 1 : 0
  const upcomingCount = todaysSessions.length
  const totalCount = liveCount + upcomingCount

  const handleSessionClick = (session: Session) => setSelectedSession(session)

  const handleCall = (session: Session) => {
    notify({ title: 'Calling', body: `${session.title} · patient phone opens`, kind: 'info' })
    setSelectedSession(null)
  }

  const handleDirections = (session: Session) => {
    notify({ title: 'Directions', body: `${session.title} · map opens`, kind: 'info' })
    setSelectedSession(null)
  }

  return (
    <Screen>
      <AppBar title="My sessions" subtitle="Thursday, March 13 · three scheduled" />
      <BodyArea>
        <div className="relative">
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full blur-3xl ${
              hasLive ? 'bg-emerald-400/[0.16]' : 'bg-amber-400/[0.16]'
            }`}
          />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <SegmentedTabs
                tabs={[
                  { id: 'mon', label: 'Mon', sub: '10' },
                  { id: 'tue', label: 'Tue', sub: '11' },
                  { id: 'wed', label: 'Wed', sub: '12' },
                  { id: 'thu', label: 'Thu', sub: '13' },
                  { id: 'fri', label: 'Fri', sub: '14' },
                  { id: 'sat', label: 'Sat', sub: '15' },
                  { id: 'sun', label: 'Sun', sub: '16' },
                ]}
                value={selectedDay}
                onChange={setSelectedDay}
                layoutId="pr04-day-filter"
                twoLine
                role={false}
              />
            </motion.div>

            <motion.div variants={rise}>
              <SessionSummaryHero
                dateLabel={selectedDay === 'thu' ? 'Thursday · March 13' : 'Selected day'}
                liveCount={liveCount}
                upcomingCount={upcomingCount}
                totalCount={totalCount}
                hasLive={hasLive}
              />
            </motion.div>

            {hasLive && live && (
              <motion.div variants={rise}>
                <LiveSessionCard
                  title={live.title}
                  detail={live.detail}
                  time={live.time}
                  checklistProgress={60}
                  onResume={() => {
                    notify({ title: 'Opening live session', body: `${live.title} · checklist continues from step 3`, kind: 'ok' })
                    navigate('/professional/pr06')
                  }}
                  onCallFamily={() => {
                    notify({ title: 'Calling family', body: `${live.title} · guardian phone opens`, kind: 'info' })
                  }}
                />
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Section label={selectedDay === 'thu' ? 'Today' : 'No sessions'} />
            </motion.div>

            <motion.div variants={rise}>
              <SessionListCard sessions={todaysSessions} onSessionClick={handleSessionClick} />
            </motion.div>

            {selectedDay === 'fri' && tomorrowTask && (
              <>
                <motion.div variants={rise}>
                  <Section label="Field task" />
                </motion.div>
                <motion.div variants={rise}>
                  <FieldTaskRow
                    title={tomorrowTask.title}
                    time={tomorrowTask.time}
                    detail={tomorrowTask.detail}
                    onReportClick={() => setReportOpen(true)}
                  />
                </motion.div>
              </>
            )}

            <InfoListCard
              icon={CalendarDays}
              title="Session integrity"
              subtitle="Every visit is availability-checked and logged. Missing a session changes how future offers are ranked."
              items={[
                { icon: MapPin, text: 'Locations are shared only after acceptance' },
                { icon: ShieldCheck, text: 'Attendance affects matching priority' },
                { icon: Lock, text: 'Session records are sealed and timestamped' },
              ]}
            />

            <motion.div variants={rise}>
              <EndOfScroll label="End of sessions" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <SessionDetailSheet
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
        onCall={handleCall}
        onDirections={handleDirections}
      />

      <ReportSheet
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={(note) => notify({ title: 'Report submitted', body: note || 'Field task report sent', kind: 'ok' })}
      />
    </Screen>
  )
}
