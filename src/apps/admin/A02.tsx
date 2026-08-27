import { AlertTriangle, ArrowUpRight, CheckCircle2, FileText, Lock, ShieldAlert } from 'lucide-react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Pill } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from '@/lib/router'
import { useDemo } from '@/lib/store'
import { incidents } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function A02() {
  const { navigate } = useRouter()
  const { notify } = useDemo()
  const incident = incidents[0]

  return (
    <Screen>
      <AppBar
        title={`Near fall · ${incident.patient}`}
        subtitle={`Raised ${incident.raised} by ${incident.by}`}
        trailing={<Pill tone="error">Critical</Pill>}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-0 bg-error-bg p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-destructive text-white">
                  <ShieldAlert className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-destructive">Care plan paused automatically</div>
                  <div className="text-xs font-medium text-destructive/80">
                    Post-operative care plan · week 4 of 6 · paused until a supervisor closes this incident
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-border p-4">
              <div className="text-sm font-medium leading-relaxed text-foreground/80">{incident.summary}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {incident.tags.map((t) => (
                  <Pill key={t} tone="grey">
                    {t}
                  </Pill>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Photo access logged', body: 'hallway-rug.jpg · viewed by you · audit record updated', kind: 'info' })}
              className="flex w-full items-center gap-3 rounded-[20px] border border-border bg-card p-3 text-left"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-error-bg text-destructive">
                <FileText className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-foreground">{incident.photo}</span>
                <span className="block truncate text-xs font-medium text-muted-foreground">View is logged with your name</span>
              </span>
              <Lock className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-border p-2">
              <div className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">
                Linked records
              </div>
              <div className="flex items-center gap-3 px-2 py-2.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                  <CheckCircle2 className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-foreground">{incident.linkedVisit}</span>
                  <span className="block truncate text-xs font-medium text-muted-foreground">Visit record · sealed</span>
                </span>
              </div>
              <div className="flex items-center gap-3 px-2 py-2.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                  <AlertTriangle className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-foreground">{incident.linkedPlan}</span>
                  <span className="block truncate text-xs font-medium text-muted-foreground">Care plan · paused</span>
                </span>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-border p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Supervisor decision</div>
              <Textarea
                defaultValue={incident.decision}
                className="mt-2 min-h-[88px] rounded-[14px] border-border bg-background text-sm"
              />
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <Button
          variant="destructive"
          className="h-13 w-full rounded-full"
          onClick={() => notify({ title: 'Escalated higher', body: 'Senior supervisor paged · family notified of the escalation', kind: 'warn' })}
        >
          <ArrowUpRight className="size-4" />
          Escalate higher
        </Button>
        <Button
          className="h-13 w-full rounded-full"
          onClick={() => {
            notify({ title: 'Incident closed', body: 'Care plan resumed · family and caregiver notified', kind: 'ok' })
            navigate('/admin/a01')
          }}
        >
          <CheckCircle2 className="size-4" />
          Close incident
        </Button>
        <div className="text-center text-[11px] font-medium text-muted-foreground">
          Closing resumes the care plan and notifies the family and caregiver.
        </div>
      </FootBar>
    </Screen>
  )
}