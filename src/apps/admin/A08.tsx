import { Link2, MessageSquare, UserCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Fade, Screen } from '@/components/phone/Screen'
import { Pill } from '@/components/phone/Controls'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useDemo } from '@/lib/store'
import { escalatedTickets } from '@/data/seed'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function A08() {
  const { notify } = useDemo()
  const [primary, ...rest] = escalatedTickets

  return (
    <Screen>
      <AppBar title="Escalated tickets" subtitle="Needs a human decision" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="rounded-[20px] border-border p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-foreground">{primary.title}</div>
                  <div className="truncate text-xs font-medium text-muted-foreground">{primary.meta}</div>
                </div>
                <Pill tone="warn">{primary.waiting}</Pill>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {primary.chips.map((c) => (
                  <Pill key={c} tone="grey">
                    {c}
                  </Pill>
                ))}
              </div>
              <div className="mt-3 rounded-[14px] bg-tonal p-3">
                <div className="text-xs font-medium leading-relaxed text-foreground/80">{primary.quote}</div>
                <div className="mt-1.5 text-[11px] font-bold text-muted-foreground">{primary.quoteBy}</div>
              </div>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Your decision</div>
              <Textarea
                defaultValue="Match a calmer nurse for Friday visits and reply to Priya with the new schedule."
                className="mt-2 min-h-[72px] rounded-[14px] border-border bg-background text-sm"
              />
              <div className="mt-3 flex gap-2">
                <Button
                  variant="secondary"
                  className="h-11 flex-1 rounded-full"
                  onClick={() => notify({ title: 'Re-match queued', body: 'Quiet re-match · family not notified until confirmed', kind: 'info' })}
                >
                  <UserCheck className="size-4" />
                  Re-match quietly
                </Button>
                <Button
                  className="h-11 flex-1 rounded-full"
                  onClick={() => notify({ title: 'Reply sent', body: 'Priya notified · reply logged on the ticket', kind: 'ok' })}
                >
                  <MessageSquare className="size-4" />
                  Reply to family
                </Button>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <div className="px-1 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">Also escalated</div>
            <Card className="rounded-[20px] border-border p-2">
              {rest.map((t) => (
                <button
                  key={t.id}
                  onClick={() => notify({ title: t.title, body: t.meta, kind: 'info' })}
                  className="flex w-full items-center gap-3 px-2 py-2.5 text-left"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                    <Link2 className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-foreground">{t.title}</span>
                    <span className="block truncate text-xs font-medium text-muted-foreground">{t.meta}</span>
                  </span>
                  <Pill tone="grey">Open</Pill>
                </button>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <Link2 className="size-5" />
              </span>
              <span className="text-xs font-medium leading-relaxed text-foreground/70">
                Every ticket carries links to its people, sessions and incidents, so decisions are made with the full record in
                view.
              </span>
            </Card>
          </motion.div>
        </motion.div>
      </BodyArea>
      <Fade />
    </Screen>
  )
}