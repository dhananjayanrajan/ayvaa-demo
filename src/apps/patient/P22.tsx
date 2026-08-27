import { useState } from 'react'
import { motion } from 'motion/react'
import { CalendarDays, Check, ChevronRight, Gavel, Lock, MapPin, ShieldCheck } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { consent, guardian, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P22() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [scopes, setScopes] = useState<string[]>(consent.covers)
  const [location, setLocation] = useState(consent.locationTracking)

  const toggleScope = (s: string) =>
    setScopes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  return (
    <Screen>
      <AppBar
        title="Care consent"
        subtitle={`${father.name} · review due ${consent.reviewDue}`}
        onBack={() => navigate('/patient/p21')}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">
                  Current consent record
                </span>
                <Pill tone="ok" className="bg-white/80">
                  <Lock className="size-3.5" /> Active
                </Pill>
              </div>
              <div className="text-xs font-medium text-brand-ink/90">
                Signed {consent.signed} · sealed permanently · covers {consent.covers.length} scopes of care
              </div>
              <div className="text-xs font-medium text-brand-ink/90">
                {guardian.name} · verified guardian account
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="What you are approving" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {consent.covers.map((s, i) => (
                <div key={s}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <button onClick={() => toggleScope(s)} className="flex w-full items-center gap-3 px-2 py-1.5 text-left">
                    <span
                      className={cn(
                        'grid size-[22px] shrink-0 place-items-center rounded-[7px] border-2 transition-colors',
                        scopes.includes(s) ? 'border-primary bg-primary text-white' : 'border-border bg-card',
                      )}
                    >
                      {scopes.includes(s) && <Check className="size-4" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-foreground">{s}</div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {s === 'Personal care'
                          ? 'Mobility, meals, hygiene and companionship'
                          : s === 'Medication management'
                            ? 'Nurse gives and records prescribed doses'
                            : 'Vitals logged and shared with your care team'}
                      </div>
                    </div>
                  </button>
                </div>
              ))}
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="flex items-center gap-3 px-2 py-1.5">
                <span
                  className={cn(
                    'grid size-[22px] shrink-0 place-items-center rounded-[7px] border-2 transition-colors',
                    !location && 'border-border bg-card',
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className={cn('text-sm font-bold', location ? 'text-foreground' : 'text-foreground/60')}>
                    Location tracking during visits
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Optional · verifies arrivals on the visit log
                  </div>
                </div>
                <button
                  onClick={() => setLocation((v) => !v)}
                  className={cn(
                    'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                    location ? 'bg-primary' : 'bg-[#CBD9D3]',
                  )}
                  aria-label="Toggle location tracking"
                >
                  <span
                    className={cn(
                      'absolute top-1 size-5 rounded-full bg-white transition-all',
                      location ? 'left-6' : 'left-1',
                    )}
                  />
                </button>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={CalendarDays}
              body={`Consent is re-confirmed every ${consent.cycleDays} days. Care pauses automatically if a review is missed, so nothing happens without your approval.`}
            />
          </motion.div>

          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Withdraw consent', body: 'A supervisor will call to confirm before care stops', kind: 'warn' })}
              className="flex w-full items-center gap-3 rounded-[20px] bg-error-bg p-4 text-left"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-white/70 text-destructive">
                <Gavel className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-destructive">Withdraw consent</div>
                <div className="text-xs font-medium text-destructive/80">
                  Stops all care immediately · sealed record kept
                </div>
              </div>
              <ChevronRight className="size-4.5 shrink-0 text-destructive/70" />
            </button>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="Ayvaa consent · sealed record" />
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
            notify({ title: 'Consent re-confirmed', body: `${scopes.length} scopes approved · sealed and logged`, kind: 'ok' })
            navigate('/patient/p21')
          }}
        >
          <ShieldCheck className="size-4" /> Re-confirm and seal
        </SmoothButton>
        <div className="text-center text-xs font-medium text-muted-foreground">
          Signed electronically · sealed and logged in the audit trail.
        </div>
      </FootBar>
    </Screen>
  )
}
