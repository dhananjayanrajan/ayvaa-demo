import { motion } from 'motion/react'
import { CalendarCheck, CheckCheck, ClipboardCheck, Pill as PillIcon, ReceiptText, ShieldCheck, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { consent, lovedOnes, medications, payouts, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

type Entry = {
  icon: LucideIcon
  title: string
  body: string
  to: string
  fresh?: boolean
  read?: boolean
  open?: boolean
}

export function P07() {
  const { notify, markAllRead } = useDemo()
  const { navigate } = useRouter()

  const father = lovedOnes[0]
  const confirmed = visits.find((v) => v.status === 'confirmed')
  const doseNames = `${medications[0].name} and ${medications[1].name}`
  const receipt = payouts.find((p) => p.status === 'paid') ?? payouts[0]

  const today: Entry[] = [
    {
      icon: CalendarCheck,
      title: `${confirmed?.caregiver?.split(' ')[0] ?? 'Your nurse'} confirmed today's visit`,
      body: 'Accepted at 7:44 AM · arrives 2:00 PM',
      to: '/patient/p15',
      fresh: true,
    },
    {
      icon: PillIcon,
      title: 'Morning doses logged',
      body: `${doseNames} · given 8:10 AM`,
      to: '/patient/p19',
      read: true,
    },
    {
      icon: ReceiptText,
      title: `Receipt for ${receipt.date}`,
      body: `${receipt.amount} · saved to your records`,
      to: '/patient/p23',
      read: true,
    },
  ]

  const yesterday: Entry[] = [
    {
      icon: ClipboardCheck,
      title: 'Visit summary ready',
      body: 'All five care steps completed and signed',
      to: '/patient/p17',
      read: true,
    },
    {
      icon: ShieldCheck,
      title: 'Consent review coming up',
      body: `Re-confirm ${father.name.split(' ')[0]}'s care consent by ${consent.reviewDue}`,
      to: '/patient/p22',
      open: true,
    },
  ]

  const thisWeek: Entry[] = [
    {
      icon: Star,
      title: 'How was Monday\u2019s visit?',
      body: 'Your rating helps match the right caregivers',
      to: '/patient/p17',
      open: true,
    },
  ]

  const renderList = (entries: Entry[]) => (
    <ScreenCard className="p-2">
      {entries.map((e, i) => {
        const Icon = e.icon
        return (
          <div key={e.title}>
            {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
            <button onClick={() => navigate(e.to)} className="flex w-full items-center gap-3 px-2 py-1.5 text-left">
              <IconTile icon={Icon} tone={e.fresh ? 'mint' : 'tonal'} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-foreground">{e.title}</div>
                <div className="mt-0.5 truncate text-xs font-medium text-muted-foreground">{e.body}</div>
              </div>
              {e.read && <Pill tone="grey">Read</Pill>}
              {e.open && <span className="text-xs font-bold text-primary">Open</span>}
            </button>
          </div>
        )
      })}
    </ScreenCard>
  )

  return (
    <Screen>
      <AppBar
        title="Notifications"
        trailing={
          <button
            onClick={() => {
              markAllRead()
              notify({ title: 'All caught up', body: 'Every notification marked as read', kind: 'ok' })
            }}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Mark all read"
          >
            <CheckCheck className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SectionHeader label="Today" />
          </motion.div>
          <motion.div variants={item}>{renderList(today)}</motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Yesterday" />
          </motion.div>
          <motion.div variants={item}>{renderList(yesterday)}</motion.div>

          <motion.div variants={item}>
            <SectionHeader label="This week" />
          </motion.div>
          <motion.div variants={item}>{renderList(thisWeek)}</motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of notifications" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
