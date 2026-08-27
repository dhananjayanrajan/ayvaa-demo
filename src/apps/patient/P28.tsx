import { motion } from 'motion/react'
import {
  BadgeCheck,
  ChevronRight,
  CreditCard,
  HeartPulse,
  KeyRound,
  LifeBuoy,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  User,
} from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Avatar, Field, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { guardian, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P28() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  const rows = [
    {
      icon: HeartPulse,
      title: 'Loved ones on your plan',
      subtitle: `${lovedOnes.length} people · ${lovedOnes[0].name.split(' ')[0]} and ${lovedOnes[1].name.split(' ')[0]}`,
      onClick: () => navigate('/patient/p30'),
    },
    {
      icon: LifeBuoy,
      title: 'Notifications and privacy',
      subtitle: 'Reminders, location and consent controls',
      onClick: () => navigate('/patient/p29'),
    },
    {
      icon: CreditCard,
      title: 'Payments',
      subtitle: 'Billing history and cards',
      onClick: () => navigate('/patient/p23'),
    },
    {
      icon: KeyRound,
      title: 'Change password',
      subtitle: 'Last changed 3 months ago',
      onClick: () => notify({ title: 'Password change', body: 'Reset link sent to your email · valid 30 minutes', kind: 'info' }),
    },
  ]

  return (
    <Screen>
      <AppBar
        title="Profile"
        trailing={
          <button
            onClick={() => notify({ title: 'Editing enabled', body: 'Name and phone changes are re-verified before they take effect', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Edit profile"
          >
            <Pencil className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <Avatar tone="soft" className="size-[58px]">
                <User className="size-7 fill-current text-brand-ink" />
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-base font-bold text-foreground">{guardian.name}</div>
                <div className="text-xs font-medium text-muted-foreground">Guardian account · joined {guardian.joined}</div>
              </div>
              {guardian.verified && (
                <Pill tone="ok">
                  <BadgeCheck className="size-3.5" /> Verified
                </Pill>
              )}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Pencil}
              body="Editing your details: name and phone changes are verified again before they take effect, and every change is logged."
            />
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Personal information" />
          </motion.div>
          <motion.div variants={item} className="flex flex-col gap-2">
            <Field icon={User} value={guardian.name} hint="Your full name" />
            <Field icon={Mail} value={guardian.email} hint="Email address" />
            <Field icon={Phone} value={guardian.phone} hint="Phone number" />
            <Field icon={MapPin} value={guardian.address} hint="Home address for visits" />
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Account" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {rows.map((r, i) => {
                const Icon = r.icon
                return (
                  <div key={r.title}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <button onClick={r.onClick} className="flex w-full items-center gap-3 px-2 py-1.5 text-left">
                      <IconTile icon={Icon} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-foreground">{r.title}</div>
                        <div className="truncate text-xs font-medium text-muted-foreground">{r.subtitle}</div>
                      </div>
                      <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
                    </button>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body="Your data is encrypted at rest. Guardians alone control who in the family can see what."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of profile" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => notify({ title: 'Changes saved', body: 'Profile updated · logged in your audit record', kind: 'ok' })}
        >
          <Save className="size-4" /> Save changes
        </SmoothButton>
        <SmoothButton
          variant="outline"
          shape="pill"
          size="lg"
          className="w-full text-destructive"
          onClick={() => {
            notify({ title: 'Signed out', body: 'Your records stay sealed until you return', kind: 'info' })
            navigate('/patient/p02')
          }}
        >
          <LogOut className="size-4" /> Sign out
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
