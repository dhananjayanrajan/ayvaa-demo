import { useState } from 'react'
import { motion } from 'motion/react'
import { ScrollText } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { OnboardingHero } from '@/components/onboarding/OnboardingSet'
import { SafetyChecksCard } from '@/components/onboarding/OnboardingSet'
import { TermsAcceptanceCard } from '@/components/onboarding/OnboardingSet'
import { OnboardingFooter } from '@/components/onboarding/OnboardingSet'
import { professional } from '@/data/seed'
import { proTerms } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const checks = [
  { title: 'Nursing licence confirmed', body: 'Checked with the Karnataka council', when: 'Renews Mar 2027' },
  { title: 'Background screening cleared', body: 'Police check and two references', when: 'Jan 2026' },
  { title: 'Government ID and selfie matched', body: 'Face match at 99.2% confidence', when: 'At sign up' },
]

export function PR02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [agreed, setAgreed] = useState<string[]>(proTerms.slice(0, 1))
  const initials = professional.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  const toggle = (t: string) =>
    setAgreed((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const allAgreed = agreed.length === proTerms.length
  const progress = agreed.length / proTerms.length

  return (
    <Screen>
      <AppBar title="Before your first session" onBack={() => navigate('/professional/pr01')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <OnboardingHero
                name={professional.name}
                role="RN"
                licence={professional.licence}
                initials={initials}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Identity & safety checks" trailing={<Chip intent="success" className="border-transparent">3 of 3 cleared</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <SafetyChecksCard
                checks={checks}
                onCheckClick={(c) => notify({ title: c.title, body: `${c.body} · verified ${c.when}`, kind: 'ok' })}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Professional terms of care"
                trailing={<Chip intent={allAgreed ? 'success' : agreed.length === 0 ? 'danger' : 'warning'} dot={agreed.length === 0} className="border-transparent">{agreed.length}/{proTerms.length}</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <TermsAcceptanceCard
                terms={proTerms}
                agreed={agreed}
                onToggle={toggle}
                allAgreed={allAgreed}
                progress={progress}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ScrollText} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Accepting these terms is timestamped and sealed. Every session you deliver is covered by them.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa professional onboarding" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <OnboardingFooter
          allAgreed={allAgreed}
          remaining={proTerms.length - agreed.length}
          total={proTerms.length}
          onAccept={() => {
            notify({
              title: allAgreed ? 'Terms accepted' : 'Accepted with gaps',
              body: allAgreed ? 'Timestamped and sealed · offers unlocked' : 'You can accept the rest before your first session',
              kind: allAgreed ? 'ok' : 'warn',
            })
            navigate('/professional/pr03')
          }}
        />
      </FootBar>
    </Screen>
  )
}
