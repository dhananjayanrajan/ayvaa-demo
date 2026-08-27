import { Database, FileDown, KeyRound, Lock, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Pill } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDemo } from '@/lib/store'
import { deletionQueue, retentionPolicies } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function A07() {
  const { notify } = useDemo()

  return (
    <Screen>
      <AppBar title="Retention policies" subtitle="How long records live · enforced automatically" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <Lock className="size-5" />
              </span>
              <span className="text-xs font-medium leading-relaxed text-foreground/70">
                Admins can lengthen a period with justification. They can never shorten one. Deletions run automatically and are
                logged.
              </span>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <div className="px-1 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Retention periods</div>
            <Card className="rounded-[20px] border-border p-2">
              {retentionPolicies.map((p) => (
                <div key={p.type} className="flex items-center gap-3 px-2 py-2.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                    <Database className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-foreground">{p.type}</span>
                    <span className="block truncate text-xs font-medium text-muted-foreground">Retained for {p.period}</span>
                  </span>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <div className="px-1 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Deletion queue</div>
            <Card className="rounded-[20px] border-border p-2">
              {deletionQueue.map((d) => (
                <div key={d.label} className="flex items-center gap-3 px-2 py-2.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-error-bg text-destructive">
                    <Trash2 className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-foreground">{d.label}</span>
                    <span className="block truncate text-xs font-medium text-muted-foreground">{d.detail}</span>
                  </span>
                  <Pill tone={d.state === 'Running' ? 'warn' : 'grey'}>{d.state}</Pill>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <KeyRound className="size-5" />
              </span>
              <span className="text-xs font-medium leading-relaxed text-foreground/70">
                All record types are encrypted at rest and in transit. Encryption keys outlive deletions, so expired records are
                unrecoverable by design.
              </span>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <Button
          variant="secondary"
          className="h-13 w-full rounded-full"
          onClick={() => notify({ title: 'Export started', body: 'Policy compliance report · sealed PDF · 7 policies', kind: 'ok' })}
        >
          <FileDown className="size-4" />
          Export policy compliance report
        </Button>
      </FootBar>
    </Screen>
  )
}