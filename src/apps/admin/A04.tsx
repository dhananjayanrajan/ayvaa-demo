import { AlertTriangle, Building2, ChevronRight, Eye, Search, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Fade, Screen } from '@/components/phone/Screen'
import { Avatar, Chip, Field, Pill } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDemo } from '@/lib/store'
import { flaggedAccount, recentActivity } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const pillTone = { Healthy: 'ok', None: 'grey', Renewal: 'warn' } as const

export function A04() {
  const { notify } = useDemo()
  const [filter, setFilter] = useState('All accounts')

  return (
    <Screen>
      <AppBar title="Accounts" subtitle="Patients · professionals · partners" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Field icon={Search} hint="Search by name, phone or licence" onClick={() => notify({ title: 'Search', body: 'Type to search across all verified accounts', kind: 'info' })} />
          </motion.div>
          <motion.div variants={item} className="flex gap-2">
            {['All accounts', 'Patients', 'Professionals', 'Partners'].map((f) => (
              <Chip key={f} on={filter === f} onClick={() => setFilter(f)}>
                {f}
              </Chip>
            ))}
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-border p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-error-bg text-destructive">
                  <AlertTriangle className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-foreground">
                    {flaggedAccount.name} · {flaggedAccount.category.toLowerCase()}
                  </div>
                  <div className="truncate text-xs font-medium text-muted-foreground">{flaggedAccount.body}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {flaggedAccount.flags.map((f) => (
                  <Pill key={f} tone="warn">
                    {f}
                  </Pill>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                {flaggedAccount.actions.map((a) => (
                  <Button
                    key={a}
                    variant={a === 'Contact family' ? 'secondary' : 'default'}
                    className="h-11 flex-1 rounded-full"
                    onClick={() => notify({ title: a, body: `${flaggedAccount.name} · action queued for the care team`, kind: 'info' })}
                  >
                    {a}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <div className="px-1 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Recent activity</div>
            <Card className="rounded-[20px] border-border p-2">
              {recentActivity.map((r) => (
                <button
                  key={r.name}
                  onClick={() => notify({ title: r.name, body: `${r.role} · full record access is logged`, kind: 'info' })}
                  className="flex w-full items-center gap-3 px-2 py-2.5 text-left"
                >
                  <Avatar tone={r.role === 'Partner' ? 'alt' : r.role === 'Guardian' ? 'soft' : 'ink'}>
                    {r.role === 'Partner' ? <Building2 className="size-5" /> : <User className="size-5" />}
                  </Avatar>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-foreground">{r.name}</span>
                    <span className="block truncate text-xs font-medium text-muted-foreground">{r.body}</span>
                  </span>
                  {r.pill !== 'None' && <Pill tone={pillTone[r.pill as keyof typeof pillTone]}>{r.pill}</Pill>}
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <Eye className="size-5" />
              </span>
              <span className="text-xs font-medium leading-relaxed text-foreground/70">
                Opening any account's records from here is logged with your name, the reason, and the exact records viewed.
              </span>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <Fade />
    </Screen>
  )
}