import { motion } from 'motion/react'
import { CalendarClock, ChevronRight, CreditCard, LifeBuoy, MessageSquare, Phone, Siren, UserSearch } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { supportTickets } from '@/data/seed'
import { supportQuickRequests } from '@/data/patientBilling'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const quickIcons = [CalendarClock, UserSearch, CreditCard]

export function P25() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  return (
    <Screen>
      <AppBar
        title="Support"
        subtitle="We reply within minutes, day or night"
        trailing={
          <button
            onClick={() => notify({ title: 'Calling Ayvaa', body: 'Voice support · 24 hours a day', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Call support"
          >
            <Phone className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="p-2">
              <ActionRow
                icon={MessageSquare}
                title="Message our care team"
                subtitle="One thread keeps your whole history"
                onClick={() => navigate('/patient/p27')}
                className="[&>span:last-child]:text-brand-ink [&>svg:last-child]:text-brand-ink"
              />
            </ScreenCard>
          </motion.div>

          {supportTickets.map((t) => (
            <motion.div key={t.id} variants={item}>
              <ScreenCard className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{t.title}</span>
                  <Pill tone="warn">{t.status}</Pill>
                </div>
                <div className="text-[13px] font-medium leading-snug text-foreground/80">
                  Requested to move Friday's visit from 2:00 PM to 10:00 AM.
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span>Updated today at {t.updated}</span>
                  <button onClick={() => navigate('/patient/p27')} className="font-bold text-primary">
                    Open conversation
                  </button>
                </div>
              </ScreenCard>
            </motion.div>
          ))}

          <motion.div variants={item}>
            <SmoothButton
              variant="default"
              shape="pill"
              size="lg"
              className="w-full"
              onClick={() => navigate('/patient/p26')}
            >
              Open a new request
            </SmoothButton>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Common requests" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {supportQuickRequests.map((q, i) => {
                const Icon = quickIcons[i] ?? LifeBuoy
                return (
                  <div key={q.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <button
                      onClick={() => navigate(q.to)}
                      className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                    >
                      <IconTile icon={Icon} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-foreground">{q.title}</div>
                        <div className="truncate text-xs font-medium text-muted-foreground">{q.subtitle}</div>
                      </div>
                      <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
                    </button>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SmoothButton
              variant="outline"
              shape="pill"
              size="lg"
              className="w-full border-destructive text-destructive"
              onClick={() => {
                notify({ title: 'Urgent safety line', body: 'A supervisor is joining now · stay on this screen', kind: 'error' })
                navigate('/patient/p32')
              }}
            >
              <Siren className="size-4" /> Raise urgent safety concern
            </SmoothButton>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa care team · always on" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
