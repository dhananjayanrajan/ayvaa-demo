import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  House,
  Lock,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { carePlan, caregivers, guardian, lovedOnes, pricing } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P12() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [confirmed, setConfirmed] = useState(false)
  const [consentCare, setConsentCare] = useState(true)
  const [consentMeds, setConsentMeds] = useState(true)

  const caregiver = caregivers[0]
  const father = lovedOnes[0]
  const first = father.name.split(' ')[0]

  if (confirmed) {
    return (
      <Screen>
        <AppBar
          title="Booking confirmed"
          trailing={
            <button
              onClick={() => notify({ title: 'Summary shared', body: 'Booking details copied for your family', kind: 'info' })}
              className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
              aria-label="Share"
            >
              <Share2 className="size-5" />
            </button>
          }
        />
        <BodyArea>
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
            <motion.div variants={item}>
              <ScreenCard tone="mint" className="flex flex-col items-center gap-2.5 py-6">
                <span className="grid size-[76px] place-items-center rounded-full bg-white">
                  <CheckCircle2 className="size-9 fill-current text-primary" />
                </span>
                <span className="text-base font-bold text-brand-ink">Your recurring care is booked</span>
                <span className="max-w-[250px] text-center text-[13px] font-medium leading-snug text-brand-ink/80">
                  Offers are going out to caregivers near you right now.
                </span>
              </ScreenCard>
            </motion.div>
            <motion.div variants={item}>
              <ScreenCard className="p-2">
                <SummaryRow label="Caregiver" value={caregiver.name} />
                <Separator className="mx-3 my-2.5 bg-border/70" />
                <SummaryRow label="Schedule" value="Mon, Wed, Fri · 2:00 PM" />
                <Separator className="mx-3 my-2.5 bg-border/70" />
                <SummaryRow label="Duration" value="Two hours per visit" />
                <Separator className="mx-3 my-2.5 bg-border/70" />
                <SummaryRow label="Consent record" value="Signed today" locked />
              </ScreenCard>
            </motion.div>
            <motion.div variants={item}>
              <ScreenCard tone="tonal" className="flex flex-col gap-2.5">
                <SectionHeader label="What happens next" />
                <NextLine icon={ShieldCheck} body="You will get a reminder before every visit." />
                <NextLine icon={BadgeCheck} body="Every arrival and task is checked and logged." />
                <NextLine icon={CreditCard} body="Payment is taken after each completed visit." />
              </ScreenCard>
            </motion.div>
            <motion.div variants={item}>
              <EndOfScroll label="End of confirmation" />
            </motion.div>
          </motion.div>
        </BodyArea>
        <FootBar>
          <SmoothButton variant="default" shape="pill" size="lg" className="w-full" onClick={() => navigate('/patient/p15')}>
            View my visits
          </SmoothButton>
          <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => navigate('/patient/p06')}>
            <House className="size-4" /> Back to home
          </SmoothButton>
        </FootBar>
      </Screen>
    )
  }

  return (
    <Screen>
      <AppBar title="Review booking" subtitle="Step 3 of 3 · final check" onBack={() => navigate('/patient/p10')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <SummaryRow label="Caregiver" value={`${caregiver.name} · RN`} />
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <SummaryRow label="Person cared for" value={`${father.name} · Father`} />
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <SummaryRow label="Category" value={carePlan.category} />
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <SummaryRow label="Schedule" value="Mon, Wed, Fri · 2:00 PM" />
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <SummaryRow label="Duration" value="Two hours per visit" />
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <SummaryRow label="Weekly price" value={pricing.weekly} />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Consent agreement" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              <ConsentToggle
                checked={consentCare}
                onToggle={() => setConsentCare((v) => !v)}
                label={`I approve care for ${first} under this plan`}
              />
              <ConsentToggle
                checked={consentMeds}
                onToggle={() => setConsentMeds((v) => !v)}
                label="I approve medication management by the nurse"
              />
              <div className="flex items-center gap-2">
                <Lock className="size-4 shrink-0 text-brand-ink" />
                <span className="text-xs font-medium text-brand-ink">Signed electronically and sealed permanently</span>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <IconTileCard />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">HDFC Card ending 8842</div>
                <div className="text-xs font-medium text-muted-foreground">
                  Charged {pricing.elderly} after each completed visit
                </div>
              </div>
              <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard icon={ShieldCheck} body={`Every consent is tied to ${guardian.name}'s verified guardian account.`} />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of review" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => {
            setConfirmed(true)
            notify({ title: 'Booking confirmed', body: 'Offers dispatched · consent sealed permanently', kind: 'ok' })
          }}
        >
          Confirm booking <ArrowRight className="size-4" />
        </SmoothButton>
        <div className="text-center text-xs font-medium text-muted-foreground">
          Caregiver offers go out the moment you confirm.
        </div>
      </FootBar>
    </Screen>
  )
}

function SummaryRow({ label, value, locked }: { label: string; value: string; locked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 px-2 py-1.5">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.9px] text-muted-foreground">{label}</span>
      <span className="flex min-w-0 items-center gap-1.5 text-sm font-bold text-foreground">
        {value}
        {locked && <Lock className="size-3.5 shrink-0 text-primary" />}
      </span>
    </div>
  )
}

function ConsentToggle({
  checked,
  onToggle,
  label,
}: {
  checked: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button onClick={onToggle} className="flex w-full items-center gap-2.5 text-left">
      <span
        className={cn(
          'grid size-[22px] shrink-0 place-items-center rounded-[7px] border-2 transition-colors',
          checked ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-ink/40 bg-white/60',
        )}
      >
        {checked && <Check className="size-4" />}
      </span>
      <span className="text-xs font-medium text-brand-ink">{label}</span>
    </button>
  )
}

function NextLine({ icon: Icon, body }: { icon: typeof Clock; body: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 shrink-0 fill-current text-primary" />
      <span className="text-xs font-medium text-brand-ink/90">{body}</span>
    </div>
  )
}

function IconTileCard() {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-mint text-brand-ink">
      <CreditCard className="size-5" />
    </span>
  )
}
