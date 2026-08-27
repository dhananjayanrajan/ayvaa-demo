import { AlertTriangle, CheckCircle2, ChevronRight, Eye, FileDown, Gavel, Lock, ShieldCheck, UserCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Chip } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDemo } from '@/lib/store'
import { auditEntries } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const iconMap = {
  ok: { icon: CheckCircle2, cls: 'bg-mint text-brand-ink' },
  view: { icon: Eye, cls: 'bg-tonal text-foreground/70' },
  approve: { icon: UserCheck, cls: 'bg-mint text-brand-ink' },
  error: { icon: AlertTriangle, cls: 'bg-error-bg text-destructive' },
  gavel: { icon: Gavel, cls: 'bg-warn-bg text-warn-ink' },
}

export function A05() {
  const { notify } = useDemo()
  const [range, setRange] = useState('Today')

  return (
    <Screen>
      <AppBar title="Audit log" subtitle="Every consequential action · immutable" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="flex items-center gap-3 rounded-[20px] border-0 bg-mint p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/70 text-brand-ink">
                <ShieldCheck className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-brand-ink">Audit health 100 percent</div>
                <div className="text-xs font-medium text-brand-ink/70">No gaps in the last 90 days · verified continuously</div>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item} className="flex gap-2">
            {['Today', 'This week', 'Custom'].map((r) => (
              <Chip key={r} on={range === r} onClick={() => setRange(r)}>
                {r}
              </Chip>
            ))}
          </motion.div>
          <motion.div variants={item}>
            <div className="px-1 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Live feed</div>
            <Card className="rounded-[20px] border-border p-2">
              {auditEntries.map((e) => {
                const meta = iconMap[e.icon]
                const Icon = meta.icon
                return (
                  <div key={e.id} className="flex items-center gap-3 px-2 py-2.5">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-[14px] ${meta.cls}`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-foreground">{e.title}</span>
                      <span className="block truncate text-xs font-medium text-muted-foreground">{e.body}</span>
                    </span>
                    <Lock className="size-4 shrink-0 text-muted-foreground" />
                  </div>
                )
              })}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <ShieldCheck className="size-5" />
              </span>
              <span className="text-xs font-medium leading-relaxed text-foreground/70">
                Entries cannot be edited or deleted by anyone, including administrators. Corrections are written as new entries.
              </span>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <div className="px-1 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Compliance tools</div>
            <Card className="rounded-[20px] border-border p-2">
              <button
                onClick={() => (window.location.hash = '/admin/a06')}
                className="flex w-full items-center gap-3 px-2 py-2.5 text-left"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                  <CheckCircle2 className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-foreground">Consent tracking</span>
                  <span className="block truncate text-xs font-medium text-muted-foreground">Active · due · withdrawn records</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </button>
              <button
                onClick={() => (window.location.hash = '/admin/a07')}
                className="flex w-full items-center gap-3 px-2 py-2.5 text-left"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                  <Lock className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-foreground">Retention policies</span>
                  <span className="block truncate text-xs font-medium text-muted-foreground">How long records live · enforced automatically</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </button>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <Button
          variant="secondary"
          className="h-13 w-full rounded-full"
          onClick={() => notify({ title: 'Export started', body: "Today's audit log · 214 entries · sealed PDF", kind: 'ok' })}
        >
          <FileDown className="size-4" />
          Export today's log
        </Button>
      </FootBar>
    </Screen>
  )
}