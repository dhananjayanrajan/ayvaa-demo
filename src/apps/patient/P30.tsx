import { motion } from 'motion/react'
import {
  Baby,
  Check,
  ChevronRight,
  HeartPulse,
  Mail,
  UserPlus,
  UsersRound,
} from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Field, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { guardian, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P30() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [father, daughter] = lovedOnes
  const [consents, setConsents] = useState<string[]>(['guardian'])

  const toggle = (key: string) =>
    setConsents((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]))

  const consentRows = [
    { key: 'guardian', label: 'I am the legal guardian of ' + daughter.name.split(' ')[0] },
    { key: 'care', label: 'I consent to pediatric care visits at home' },
    { key: 'meds', label: 'I consent to medication management' },
  ]

  return (
    <Screen>
      <AppBar title="Loved ones" subtitle="People under your family plan" onBack={() => navigate('/patient/p28')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-mint">
                  <HeartPulse className="size-5 fill-current text-brand-ink" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{father.name}</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Father · age {father.age} · {father.category.toLowerCase()}
                  </div>
                </div>
                <Pill tone="ok">Care active</Pill>
              </div>
              <Separator className="mx-3 my-0 bg-border/70" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Lakshmi Reddy · Mon, Wed, Fri</span>
                <button
                  onClick={() => navigate('/patient/p13')}
                  className="text-xs font-bold text-primary"
                >
                  Manage care
                </button>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-[#33739E] text-white">
                  <Baby className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{daughter.name}</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Daughter · age {daughter.age} · {daughter.category.toLowerCase()}
                  </div>
                </div>
                <Pill tone="warn">Setup pending</Pill>
              </div>
              <Separator className="mx-3 my-0 bg-border/70" />
              <div className="text-[13px] font-medium leading-snug text-foreground/80">
                Complete her health details and sign the guardian consent to begin booking visits.
              </div>
              <SmoothButton
                variant="default"
                shape="pill"
                className="w-full"
                onClick={() => notify({ title: 'Setup continues', body: 'Health details form opens · then guardian consent', kind: 'info' })}
              >
                Finish setup
              </SmoothButton>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label={`Guardian consent for ${daughter.name.split(' ')[0]}`} />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              {consentRows.map((r) => (
                <button key={r.key} onClick={() => toggle(r.key)} className="flex w-full items-center gap-2.5 text-left">
                  <span
                    className={cn(
                      'grid size-[22px] shrink-0 place-items-center rounded-[7px] border-2 transition-colors',
                      consents.includes(r.key) ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-ink/40 bg-white/60',
                    )}
                  >
                    {consents.includes(r.key) && <Check className="size-4" />}
                  </span>
                  <span className="text-xs font-medium text-brand-ink">{r.label}</span>
                </button>
              ))}
              {consents.length === consentRows.length && (
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-ink">
                  <Check className="size-3.5" /> Ready to submit with the setup form
                </div>
              )}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Add someone new" />
          </motion.div>
          <motion.div variants={item}>
            <Field
              icon={UserPlus}
              hint="Add a loved one to this plan"
              onClick={() => notify({ title: 'Add a loved one', body: 'Name, age and care category to begin', kind: 'info' })}
            />
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="p-2">
              <ActionRow
                icon={Mail}
                title="Invite relative with view access"
                subtitle="They see visit summaries only · never records"
                onClick={() => notify({ title: 'Invite sent', body: `${guardian.name} can manage invites from settings`, kind: 'info' })}
              />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={UsersRound}
              body="Each loved one gets their own care category, consent record and separate medical history. Guardians control everything."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of family plan" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
