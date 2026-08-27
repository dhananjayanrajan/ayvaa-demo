import { useState } from 'react'
import { motion } from 'motion/react'
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Edit3,
  History,
  ImagePlus,
  Search,
  Send,
} from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Chip, Field, Pill } from '@/components/phone/Controls'
import { caregivers, supportTickets, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const topics = ['Scheduling', 'Caregiver', 'Billing', 'Records', 'Something else']

export function P26() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nurse = caregivers[0]
  const linkedVisit = visits.find((v) => v.status === 'live')
  const [topic, setTopic] = useState('Scheduling')
  const [linked, setLinked] = useState(true)

  return (
    <Screen>
      <AppBar title="Open a new request" onBack={() => navigate('/patient/p25')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SectionHeader label="What is this about" />
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <Chip key={t} on={topic === t} onClick={() => setTopic(t)}>
                {t}
              </Chip>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Link to a visit · optional" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className={cn('flex items-center gap-3', linked && 'border border-primary')}>
              <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-mint">
                <CalendarDays className="size-5 text-brand-ink" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">
                  {linkedVisit ? `${linkedVisit.day}, ${linkedVisit.date} · 2:00 PM` : 'Friday, March 15 · 10:00 AM'}
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  {nurse.name} · completed visit
                </div>
              </div>
              <button onClick={() => setLinked((v) => !v)} aria-label="Toggle visit link">
                {linked ? (
                  <CheckCircle2 className="size-5 shrink-0 fill-current text-primary" />
                ) : (
                  <span className="grid size-5 place-items-center rounded-full border-2 border-border" />
                )}
              </button>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <Field
              icon={Search}
              hint="Link a different visit or report"
              onClick={() => notify({ title: 'Visit picker', body: 'Choose from your last 30 visits', kind: 'info' })}
            />
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Tell us what you need" />
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Message', body: 'Your words go straight to the care team', kind: 'info' })}
              className="flex min-h-[110px] w-full items-start gap-2.5 rounded-[14px] border border-border bg-card p-3.5 text-left"
            >
              <Edit3 className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <span className="text-[13px] font-medium leading-snug text-muted-foreground">
                Please move all Friday visits to 10:00 AM going forward, starting this week. Thank you.
              </span>
            </button>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Attach photos · optional" />
          </motion.div>
          <motion.div variants={item}>
            <Field
              icon={ImagePlus}
              value=""
              hint="Add photos to this request"
              onClick={() => notify({ title: 'Attachments', body: 'Camera or gallery · up to five photos', kind: 'info' })}
            />
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={History}
              body="Your request and every reply is kept as a permanent record, linked to the visit you choose."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of request" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => {
            notify({
              title: 'Request submitted',
              body: `${topic} · ${linked ? 'linked to a visit' : 'no visit linked'} · care team replies in ~5 min`,
              kind: 'ok',
            })
            navigate('/patient/p27')
          }}
        >
          <Send className="size-4" /> Submit request
        </SmoothButton>
        <div className="text-center text-xs font-medium text-muted-foreground">
          {supportTickets.length > 0
            ? 'You have one other open request with the care team.'
            : 'The care team usually replies within five minutes.'}
        </div>
      </FootBar>
    </Screen>
  )
}
