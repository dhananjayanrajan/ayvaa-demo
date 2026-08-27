import { motion } from 'motion/react'
import { Download, KeyRound, Lock, Trash2 } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import SmoothButton from '@/components/smoothui/smooth-button'
import BasicAccordion from '@/components/smoothui/basic-accordion'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { deletionQueue, retentionPolicies } from '@/data/seed'
import { useDemo } from '@/lib/store'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function A07() {
  const { notify } = useDemo()
  return (
    <Screen>
      <AppBar
        title="Retention policies"
        subtitle="How long Ayvaa keeps data"
        trailing={<AgentAvatar seed="ayvaa-retention" size={42} />}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <InfoCard icon={Lock} body="Data is deleted automatically when its retention period ends. No manual deletion exists." />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Retention periods" />
          </motion.div>
          <motion.div variants={item}>
            <BasicAccordion
              items={retentionPolicies.map((p) => ({
                id: p.type,
                title: p.type,
                content: `Retained for ${p.period}. Deletion runs automatically and is logged in the audit trail.`,
              }))}
              allowMultiple
            />
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Deletion queue" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {deletionQueue.map((d, i) => (
                <div key={d.label}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <button
                    onClick={() =>
                      notify(
                        d.state === 'Running'
                          ? { title: d.label, body: `${d.detail} · shredding in progress`, kind: 'info' }
                          : { title: d.label, body: `${d.detail} · scheduled for deletion`, kind: 'warn' },
                      )
                    }
                    className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                  >
                    <IconTile icon={Trash2} tone="error" size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">{d.label}</div>
                      <div className="truncate text-xs font-medium text-muted-foreground">{d.detail}</div>
                    </div>
                    <Pill tone={d.state === 'Running' ? 'warn' : 'grey'}>{d.state}</Pill>
                  </button>
                </div>
              ))}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={KeyRound} body="Deletion is cryptographic — files are shredded and keys rotated. Nothing is recoverable." />
          </motion.div>
          <motion.div variants={item}>
            <EndOfScroll label="End of retention" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => notify({ title: 'Policy export queued', body: 'Full retention policy will be emailed to you', kind: 'info' })}>
          <Download className="size-4" /> Export policy
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}