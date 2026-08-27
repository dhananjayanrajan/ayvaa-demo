import { motion } from 'motion/react'
import { AlertTriangle, Building2, Droplets, History, MapPin, Phone, Siren, Users, X } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { emergency, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P32() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const first = father.name.split(' ')[0]

  return (
    <Screen>
      <AppBar
        title="Emergency help"
        subtitle={`For ${father.name} · stay calm, help is here`}
        trailing={
          <button
            onClick={() => navigate('/patient/p06')}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-error-bg text-destructive"
            aria-label="Close emergency screen"
          >
            <X className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SmoothButton
              variant="destructive"
              shape="pill"
              size="lg"
              className="h-16 w-full rounded-full text-base"
              onClick={() => notify({ title: `Calling ${emergency.ambulance}`, body: 'Ambulance dispatched to your address', kind: 'error' })}
            >
              <Phone className="size-5" /> Call {emergency.ambulance} · Ambulance now
            </SmoothButton>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Immediate help" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={Siren} tone="error" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{emergency.caregiverOnSite} is on site now</div>
                  <div className="text-xs font-medium text-muted-foreground">Your nurse · first aid trained · call her first</div>
                </div>
                <button
                  onClick={() => notify({ title: `Calling ${emergency.caregiverOnSite.split(' ')[0]}`, body: 'Priority line · connecting immediately', kind: 'error' })}
                  className="grid size-[46px] shrink-0 place-items-center rounded-[14px] bg-destructive text-white transition-transform active:scale-95"
                  aria-label="Call nurse"
                >
                  <Phone className="size-5" />
                </button>
              </div>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={Building2} tone="error" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-foreground">{emergency.hospital}</div>
                  <div className="truncate text-xs font-medium text-muted-foreground">24 hour emergency · {first}'s records ready</div>
                </div>
                <MapPin className="size-5 shrink-0 text-muted-foreground" />
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="While you wait" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={Droplets} tone="mint" />
                <span className="min-w-0 flex-1 text-sm font-medium text-foreground/80">
                  Blood type {emergency.blood} · noted on his care record
                </span>
              </div>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={AlertTriangle} tone="mint" />
                <span className="min-w-0 flex-1 text-sm font-medium text-foreground/80">
                  Allergic to {emergency.allergy} · shown to every caregiver
                </span>
              </div>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={Users} tone="mint" />
                <span className="min-w-0 flex-1 text-sm font-medium text-foreground/80">
                  Emergency contacts auto-notified: {emergency.contacts.join(', ')}
                </span>
                <Pill tone="ok">Notified</Pill>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={History}
              body="Opening this screen and calling for help is logged with the time, so there is a record of exactly what happened."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="Emergency record sealed" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => navigate('/patient/p06')}>
          I am safe · close this screen
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
