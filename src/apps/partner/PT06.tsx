import { FileDown, Lock, Star, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useDemo } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Avatar, SectionLabel } from '@/components/phone/Controls'
import { staff, staffFeedback } from '@/data/seed'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const indicators = [
  { label: 'Visits verified on first attempt', value: '27 of 27' },
  { label: 'Care plan goals met', value: '9 of 11' },
  { label: 'Incidents raised by him', value: '2 · both resolved' },
  { label: 'Notes rated helpful by families', value: '96%' },
]

export function PT06() {
  const { notify } = useDemo()
  const doctor = staff[1]

  return (
    <Screen>
      <AppBar title={doctor.name} subtitle={`${doctor.role} · ${doctor.since}`} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="flex items-center gap-3 rounded-[20px] p-4">
              <Avatar tone="alt" className="size-[58px] text-2xl">
                <Users className="size-7" />
              </Avatar>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold text-foreground">Performance this month</span>
                <span className="block text-xs font-medium text-muted-foreground">March 1 to March 13 · verified by Ayvaa</span>
              </span>
            </Card>
          </motion.div>
          <motion.div variants={item} className="flex gap-2">
            <Card className="flex-1 rounded-[20px] p-3.5 text-center">
              <div className="text-xl font-bold text-foreground">27</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Sessions</div>
            </Card>
            <Card className="flex-1 rounded-[20px] p-3.5 text-center">
              <div className="text-xl font-bold text-foreground">4.9</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Family rating</div>
            </Card>
            <Card className="flex-1 rounded-[20px] p-3.5 text-center">
              <div className="text-xl font-bold text-foreground">100%</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">On time</div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Quality indicators</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] p-2">
              {indicators.map((ind, i) => (
                <div key={ind.label}>
                  {i > 0 && <div className="mx-3 h-px bg-border" />}
                  <div className="flex items-center justify-between gap-3 rounded-[14px] px-3 py-2.5">
                    <span className="text-sm font-medium text-foreground">{ind.label}</span>
                    <span className="shrink-0 text-sm font-bold text-foreground">{ind.value}</span>
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Recent family feedback</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex flex-col gap-2 rounded-[20px] border-0 bg-tonal p-4">
              <div className="flex gap-1">
                {Array.from({ length: staffFeedback.stars }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[#DBA800] text-[#DBA800]" />
                ))}
              </div>
              <p className="text-[13px] font-medium leading-[19px] text-muted-foreground">{staffFeedback.quote}</p>
              <span className="text-xs font-medium text-muted-foreground">{staffFeedback.family}</span>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <Lock className="mt-0.5 size-5.5 shrink-0 text-primary" />
              <p className="text-[13px] font-medium leading-[19px] text-muted-foreground">
                These numbers come from verified session records, not self-reporting. They update live as visits are
                signed off.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <Button
          onClick={() => notify({ title: 'Report exported', body: `${doctor.name} · March performance report ready to download`, kind: 'ok' })}
          className="h-13 w-full rounded-full bg-[#DCF3EC] text-[15px] font-bold text-brand-ink hover:bg-[#DCF3EC]/80"
        >
          <FileDown className="size-5" />
          Export performance report
        </Button>
      </FootBar>
    </Screen>
  )
}