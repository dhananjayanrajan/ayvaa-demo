import { useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, ArrowUpRight, CheckCircle2, FileText, Lock, ShieldAlert } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import Dialog from '@/components/smoothui/dialog'
import Drawer from '@/components/smoothui/drawer'
import DropdownMenu from '@/components/smoothui/dropdown-menu'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Textarea } from '@/components/ui/textarea'
import { incidents } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function A02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [photoOpen, setPhotoOpen] = useState(false)
  const [closeOpen, setCloseOpen] = useState(false)
  const inc = incidents[0]

  return (
    <Screen>
      <AppBar
        title={`Near fall · ${inc.patient}`}
        subtitle={`Raised ${inc.raised} by ${inc.by}`}
        trailing={<Pill tone="error">Critical</Pill>}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="error" className="flex items-start gap-3">
              <IconTile icon={ShieldAlert} tone="destructive" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-destructive">Care plan paused automatically</div>
                <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">
                  Post-operative care plan · week 4 of 6 · paused until a supervisor closes this incident
                </div>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard>
              <div className="text-[13px] font-medium leading-snug text-foreground/80">{inc.summary}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {inc.tags.map((t) => (
                  <Pill key={t} tone="grey">{t}</Pill>
                ))}
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <Drawer
              open={photoOpen}
              onOpenChange={setPhotoOpen}
              title="Incident photo"
              description="Access is logged with your name and reason"
              trigger={
                <button className="flex w-full items-center gap-3 rounded-[20px] border border-border bg-card p-4 text-left">
                  <IconTile icon={FileText} tone="error" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-foreground">{inc.photo}</span>
                    <span className="block text-xs font-medium text-muted-foreground">View is logged with your name</span>
                  </span>
                  <Lock className="size-4.5 shrink-0 text-muted-foreground" />
                </button>
              }
            >
              <div className="grid aspect-[4/3] w-full place-items-center rounded-[14px] bg-tonal">
                <FileText className="size-10 text-muted-foreground" />
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-muted-foreground">Captured</span>
                  <span className="font-bold text-foreground">9:38 AM · hallway camera</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-muted-foreground">Viewed by</span>
                  <span className="font-bold text-foreground">You · logged in audit</span>
                </div>
              </div>
            </Drawer>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Linked records" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={CheckCircle2} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{inc.linkedVisit}</div>
                  <div className="text-xs font-medium text-muted-foreground">Visit record · sealed</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={AlertTriangle} tone="warn" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{inc.linkedPlan}</div>
                  <div className="text-xs font-medium text-muted-foreground">Care plan · paused</div>
                </div>
              </div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Supervisor decision" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard>
              <Textarea defaultValue={inc.decision} className="min-h-24 rounded-[14px] border-border bg-background text-[13px]" />
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard
              icon={ShieldAlert}
              body="Closing resumes the care plan and notifies the family and caregiver."
            />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of incident" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <DropdownMenu
          items={[
            { key: 'page', label: 'Page supervisor on call', icon: <ArrowUpRight className="size-4" />, onSelect: () => notify({ title: 'Supervisor paged', body: 'On-call supervisor notified immediately', kind: 'info' }) },
            { key: 'family', label: 'Notify family', icon: <AlertTriangle className="size-4" />, onSelect: () => notify({ title: 'Family notified', body: 'Guardian updated on the incident', kind: 'info' }) },
            { key: 'escalate', label: 'Escalate to senior ops', icon: <ArrowUpRight className="size-4" />, variant: 'destructive', onSelect: () => notify({ title: 'Escalated', body: 'Senior operations team now owns this incident', kind: 'warn' }) },
          ]}
        >
          <SmoothButton variant="destructive" shape="pill" size="lg" className="w-full">
            Escalate higher
          </SmoothButton>
        </DropdownMenu>
        <Dialog
          open={closeOpen}
          onOpenChange={setCloseOpen}
          title="Close this incident?"
          description="Closing resumes the care plan and notifies the family and caregiver."
          trigger={
            <SmoothButton variant="default" shape="pill" size="lg" className="w-full">
              Close incident
            </SmoothButton>
          }
          footer={
            <SmoothButton
              variant="default"
              shape="pill"
              className="w-full"
              onClick={() => {
                setCloseOpen(false)
                notify({ title: 'Incident closed', body: 'Care plan resumed · family and caregiver notified', kind: 'ok' })
                navigate('/admin/a01')
              }}
            >
              Confirm close
            </SmoothButton>
          }
        />
      </FootBar>
    </Screen>
  )
}