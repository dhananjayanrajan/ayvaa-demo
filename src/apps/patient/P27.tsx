import { useRef } from 'react'
import { motion } from 'motion/react'
import { Check, CheckCheck, Paperclip, Send } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Chip, Field } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { supportChat, supportTickets } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P27() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const ticket = supportTickets[0]
  const endRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
    notify({ title: 'Message sent', body: 'Kavya will reply in a few minutes', kind: 'ok' })
  }

  return (
    <Screen>
      <AppBar
        title="Ayvaa care team"
        subtitle={`${ticket.title} · replies in ~5 min`}
        onBack={() => navigate('/patient/p25')}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          {supportChat.map((m, i) => {
            const mine = m.from === 'Priya'
            return (
              <motion.div
                key={i}
                variants={item}
                className={cn('flex w-full', mine ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[280px] rounded-[20px] p-3.5',
                    mine ? 'bg-mint' : 'border border-border bg-tonal',
                  )}
                >
                  <div className={cn('text-[13px] font-medium leading-snug', mine ? 'text-brand-ink' : 'text-foreground/85')}>
                    {m.text}
                  </div>
                  <div className={cn('mt-1 text-[11px] font-bold', mine ? 'text-right text-brand-ink/70' : 'text-muted-foreground')}>
                    {m.from} · {m.time}
                  </div>
                </div>
              </motion.div>
            )
          })}

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="flex items-start gap-3">
              <IconTile icon={CheckCheck} tone="mint" className="size-9" />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium leading-snug text-foreground/85">
                  <span className="font-bold text-foreground">Update:</span> all Friday visits now start at 10:00 AM. Your
                  consent record and visit log were updated automatically at 12:20 PM.
                </div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item} className="flex gap-2">
            <Chip on>
              <Check className="size-3.5" /> Resolved
            </Chip>
            <Chip onClick={() => notify({ title: 'Still open', body: 'The care team stays on this request', kind: 'info' })}>
              Still needs help
            </Chip>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Visit details · linked" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={CheckCheck} tone="mint" className="size-9" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Friday, March 15 · 10:00 AM</div>
                  <div className="text-xs font-medium text-muted-foreground">Lakshmi Reddy · recurring visit · confirmed</div>
                </div>
              </div>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={CheckCheck} tone="mint" className="size-9" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Consent record · re-confirmed</div>
                  <div className="text-xs font-medium text-muted-foreground">Updated automatically with this change</div>
                </div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of conversation" />
          </motion.div>
          <div ref={endRef} />
        </motion.div>
      </BodyArea>
      <FootBar>
        <Field icon={Paperclip} hint="Write a message…" onClick={scrollToBottom} />
      </FootBar>
    </Screen>
  )
}
