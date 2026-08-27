import { Ban, CalendarClock, CheckCircle2, FileCheck, Phone, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Pill, StatCard } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDemo } from '@/lib/store'
import { consentReview, consentTracking, consentWithdrawal } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function A06() {
  const { notify } = useDemo()

  return (
    <Screen>
      <AppBar title="Consent tracking" subtitle="Active · due · withdrawn" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={FileCheck} value={consentTracking.active} label="Active records" tone="mint" />
            <StatCard icon={CalendarClock} value={consentTracking.due} label="Due for review" tone="warn" />
          </motion.div>
          <motion.div variants={item} className="flex gap-3">
            <StatCard icon={Ban} value={consentTracking.withdrawn} label="Withdrawn" tone="error" />
            <StatCard icon={ShieldCheck} value="90" label="Day cycle" />
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-border p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-foreground">{consentReview.name}</div>
                  <div className="truncate text-xs font-medium text-muted-foreground">{consentReview.category}</div>
                </div>
                <Pill tone="warn">{consentReview.due}</Pill>
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="text-xs font-medium text-foreground/70">{consentReview.signed}</div>
                <div className="text-xs font-medium text-foreground/70">{consentReview.pauses}</div>
                <div className="text-xs font-medium text-foreground/70">{consentReview.reminded}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {consentReview.pills.map((p) => (
                  <Pill key={p} tone="grey">
                    {p}
                  </Pill>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                {consentReview.actions.map((a) => (
                  <Button
                    key={a}
                    variant={a === 'View record' ? 'secondary' : 'default'}
                    className="h-11 flex-1 rounded-full"
                    onClick={() =>
                      notify({
                        title: a,
                        body: `${consentReview.name} · ${a === 'View record' ? 'record access logged' : 'guardian call queued'}`,
                        kind: 'info',
                      })
                    }
                  >
                    {a === 'Call guardian' && <Phone className="size-4" />}
                    {a}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-0 bg-error-bg p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-destructive text-white">
                  <Ban className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-destructive">
                    {consentWithdrawal.name} · withdrawn {consentWithdrawal.time}
                  </div>
                  <div className="text-xs font-medium text-destructive/80">{consentWithdrawal.category}</div>
                </div>
              </div>
              <div className="mt-3 rounded-[14px] bg-white/60 p-3 text-xs font-medium leading-relaxed text-foreground/70">
                {consentWithdrawal.body}
              </div>
              <div className="mt-2 text-xs font-medium text-destructive/80">{consentWithdrawal.option}</div>
              <Button
                variant="outline"
                className="mt-3 h-11 w-full rounded-full border-destructive/30 text-destructive hover:bg-destructive/5"
                onClick={() => notify({ title: 'Closure confirmed', body: `${consentWithdrawal.name} · checklist sealed in the audit log`, kind: 'ok' })}
              >
                <CheckCircle2 className="size-4" />
                {consentWithdrawal.action}
              </Button>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <ShieldCheck className="size-5" />
              </span>
              <span className="text-xs font-medium leading-relaxed text-foreground/70">
                Every consent renews every ninety days by policy. The system enforces this — an admin cannot extend care past an
                expired consent.
              </span>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}