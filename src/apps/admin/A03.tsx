import { Check, Gavel, UserCheck, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import AILoader from '@/components/smoothui/ai-loader'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Avatar, Chip, Pill } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDemo } from '@/lib/store'
import { approvals } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const checkTone = {
  ok: { icon: Check, cls: 'bg-mint text-brand-ink' },
  running: { icon: null, cls: 'bg-warn-bg text-warn-ink' },
  none: { icon: null, cls: 'bg-tonal text-foreground/40' },
}

export function A03() {
  const { notify } = useDemo()
  const [filter, setFilter] = useState('Awaiting')
  const [list, setList] = useState(approvals)

  const decide = (id: string, approve: boolean) => {
    const a = list.find((x) => x.id === id)
    setList((prev) => prev.filter((x) => x.id !== id))
    notify(
      approve
        ? { title: `${a?.name} approved`, body: 'Decision recorded with your name and evidence · onboarding started', kind: 'ok' }
        : { title: `${a?.name} rejected`, body: 'Written reason required · guardian and partner notified', kind: 'warn' },
    )
  }

  return (
    <Screen>
      <AppBar title="Approve professionals" subtitle="Awaiting decisions · 2" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item} className="flex gap-2">
            {['Awaiting', 'Approved', 'Rejected'].map((f) => (
              <Chip key={f} on={filter === f} onClick={() => setFilter(f)}>
                {f}
              </Chip>
            ))}
          </motion.div>
          {list.map((a) => (
            <motion.div key={a.id} variants={item}>
              <Card className={`rounded-[20px] border-border p-4 ${a.urgent ? 'border-l-4 border-l-primary' : ''}`}>
                <div className="flex items-center gap-3">
                  <Avatar tone={a.urgent ? 'brand' : 'alt'}>
                    <UserCheck className="size-5" />
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-foreground">{a.name}</div>
                    <div className="truncate text-xs font-medium text-muted-foreground">
                      {a.role}
                      {a.licence ? ` · licence ${a.licence}` : ''}
                    </div>
                  </div>
                  <Pill tone={a.urgent ? 'warn' : 'grey'}>{a.waiting}</Pill>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {a.checks.map((c) => (
                    <div key={c.label} className="flex items-center gap-2.5">
                      <span className={`grid size-6 shrink-0 place-items-center rounded-full ${checkTone[c.state].cls}`}>
                        {c.state === 'ok' ? <Check className="size-3.5" /> : c.state === 'running' ? <AILoader variant="dots" className="size-3.5" /> : null}
                      </span>
                      <span className="flex-1 text-[13px] font-medium text-foreground/80">{c.label}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                        {c.state === 'ok' ? 'Verified' : c.state === 'running' ? 'Running' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
                {a.history && (
                  <div className="mt-3 rounded-[14px] bg-warn-bg px-3 py-2 text-xs font-medium text-warn-ink">{a.history}</div>
                )}
                {a.note && (
                  <div className="mt-3 rounded-[14px] bg-tonal px-3 py-2 text-xs font-medium text-muted-foreground">{a.note}</div>
                )}
                <div className="mt-3 flex gap-2">
                  <Button variant="secondary" className="h-11 flex-1 rounded-full" onClick={() => decide(a.id, false)}>
                    <X className="size-4" />
                    Reject
                  </Button>
                  <Button className="h-11 flex-1 rounded-full" onClick={() => decide(a.id, true)}>
                    <Check className="size-4" />
                    Approve
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <Gavel className="size-5" />
              </span>
              <span className="text-xs font-medium leading-relaxed text-foreground/70">
                Every approval or rejection records who decided, when, and on what evidence. Rejections require a written reason.
              </span>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}