import { Bell, CheckCircle2, ChevronRight, Group, ReceiptText, UserPlus } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from '@/lib/router'
import { useDemo } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Fade, Screen } from '@/components/phone/Screen'
import { Avatar, Pill, SectionLabel } from '@/components/phone/Controls'
import { partner, referrals } from '@/data/seed'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function PT02() {
  const { navigate } = useRouter()
  const { notify } = useDemo()

  return (
    <Screen>
      <AppBar
        title="Care partnership"
        subtitle={`${partner.name} · partner account`}
        onBack={() => navigate('/')}
        trailing={
          <button
            onClick={() => notify({ title: 'Notifications', body: '2 new updates from your referred patients', kind: 'info' })}
            className="relative grid size-10.5 place-items-center rounded-full bg-tonal text-foreground/70"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-2">
            <Card className="flex-1 rounded-[20px] border-0 bg-mint p-3.5">
              <UserPlus className="size-5.5 text-brand-ink" />
              <div className="mt-1.5 text-xl font-bold text-brand-ink">14</div>
              <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-ink/70">Patients referred</div>
            </Card>
            <Card className="flex-1 rounded-[20px] p-3.5">
              <CheckCircle2 className="size-5.5 text-primary" />
              <div className="mt-1.5 text-xl font-bold text-foreground">9</div>
              <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">In active care</div>
            </Card>
          </motion.div>
          <motion.div variants={item} className="flex gap-2">
            <Card className="flex-1 rounded-[20px] p-3.5">
              <Group className="size-5.5 text-primary" />
              <div className="mt-1.5 text-xl font-bold text-foreground">6</div>
              <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Your staff on Ayvaa</div>
            </Card>
            <Card className="flex-1 rounded-[20px] p-3.5">
              <ReceiptText className="size-5.5 text-primary" />
              <div className="mt-1.5 text-xl font-bold text-foreground">42</div>
              <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Sessions this month</div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => navigate('/partner/pt03')}
              className="flex w-full items-center gap-3 rounded-[20px] bg-mint p-4 text-left"
            >
              <UserPlus className="size-5.5 shrink-0 text-brand-ink" />
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold text-brand-ink">Refer a patient for home care</span>
                <span className="block text-xs font-medium text-brand-ink/70">Send a discharge straight into Ayvaa care</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-brand-ink" />
            </button>
          </motion.div>
          <motion.div variants={item} className="flex items-center justify-between">
            <SectionLabel>Referred patients</SectionLabel>
            <button onClick={() => navigate('/partner/pt04')} className="text-xs font-bold text-primary">
              See all
            </button>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] p-2">
              {referrals.map((r, i) => (
                <div key={r.id}>
                  {i > 0 && <div className="mx-3 h-px bg-border" />}
                  <button
                    onClick={() => navigate('/partner/pt04')}
                    className="flex w-full items-center gap-3 rounded-[14px] p-2 text-left"
                  >
                    <Avatar tone={i === 0 ? 'soft' : 'alt'}>
                      <UserPlus className="size-5" />
                    </Avatar>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-foreground">
                        {r.name} · {r.condition.toLowerCase()}
                      </span>
                      <span className="block truncate text-xs font-medium text-muted-foreground">
                        {r.status === 'active' ? `Referred ${r.referred} · care active with Ayvaa` : `Referred ${r.referred} · matching in progress`}
                      </span>
                    </span>
                    <Pill tone={r.status === 'active' ? 'ok' : 'warn'}>{r.progress}</Pill>
                  </button>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => navigate('/partner/pt07')}
              className="flex w-full items-center gap-3 rounded-[20px] border border-border bg-card p-4 text-left"
            >
              <ReceiptText className="size-5.5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-foreground">February invoice ready</span>
                <span className="block text-xs font-medium text-muted-foreground">42 sessions under your corporate plan</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </button>
          </motion.div>
        </motion.div>
      </BodyArea>
      <Fade />
    </Screen>
  )
}