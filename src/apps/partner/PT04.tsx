import { Check, Eye, FileText, Home, MessageSquare, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'
import { useDemo } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Avatar, Pill, SectionLabel } from '@/components/phone/Controls'
import { latestVisit, referralJourney, referrals } from '@/data/seed'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function PT04() {
  const { notify } = useDemo()
  const patient = referrals[0]

  return (
    <Screen>
      <AppBar title={patient.name} subtitle={`Referred ${patient.referred} by ${patient.by} · ${patient.condition.toLowerCase()}`} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="flex flex-col gap-3 rounded-[20px] border-0 bg-mint p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-brand-ink/70">Recovery progress</div>
                  <div className="text-2xl font-black tracking-tight text-brand-ink">{patient.progress}</div>
                </div>
                <Pill tone="ok" className="bg-white">
                  <TrendingUp className="size-3.5" />
                  On track
                </Pill>
              </div>
              <div className="h-2 rounded-full bg-white/65">
                <div className="h-full w-1/3 rounded-full bg-primary" />
              </div>
              <div className="text-xs font-medium text-brand-ink/80">{patient.visits} · consent signed by her son</div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Referral journey</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] p-2">
              {referralJourney.map((j, i) => (
                <div key={j.title}>
                  {i > 0 && <div className="mx-3 h-px bg-border" />}
                  <div className="flex items-center gap-3 rounded-[14px] p-2">
                    <Avatar tone={i === 3 ? 'brand' : 'soft'}>
                      {i === 3 ? <Home className="size-5" /> : <Check className="size-5" />}
                    </Avatar>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-foreground">{j.title}</span>
                      <span className="block truncate text-xs font-medium text-muted-foreground">{j.body}</span>
                    </span>
                    {i === 3 && <Pill tone="ok">Now</Pill>}
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Latest visit summary · shared with you</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex flex-col gap-2 rounded-[20px] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{latestVisit.date}</span>
                <Pill tone="ok">All steps done</Pill>
              </div>
              <p className="text-[13px] font-medium leading-[19px] text-muted-foreground">{latestVisit.quote}</p>
              <span className="text-xs font-medium text-muted-foreground">{latestVisit.by}</span>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <Eye className="mt-0.5 size-5.5 shrink-0 text-primary" />
              <p className="text-[13px] font-medium leading-[19px] text-muted-foreground">
                You see progress because the guardian allowed it. Every document you open from this page is logged in
                the audit record.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <Button
            variant="secondary"
            onClick={() => notify({ title: 'Discharge file', body: 'shanta-discharge.pdf · access logged in audit record', kind: 'info' })}
            className="h-13 flex-1 rounded-full text-[15px] font-bold"
          >
            <FileText className="size-5" />
            Discharge file
          </Button>
          <Button
            onClick={() => notify({ title: 'Care team', body: 'Conversation opened with Suresh Kumar and the care team', kind: 'ok' })}
            className="h-13 flex-[1.4] rounded-full text-[15px] font-bold"
          >
            <MessageSquare className="size-5" />
            Message care team
          </Button>
        </div>
      </FootBar>
    </Screen>
  )
}