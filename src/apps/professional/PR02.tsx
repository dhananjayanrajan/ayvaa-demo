import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, Check, CheckCircle2, Fingerprint, Gavel, IdCard, Lock, ScrollText, ShieldCheck, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { professional } from '@/data/seed'
import { proTerms } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const checks: { title: string; body: string; when: string }[] = [
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
              <Hero>
                <div className="flex items-center gap-3.5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[15px] font-black tracking-tight text-emerald-100">
                    {initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Kicker>Onboarding · final step</Kicker>
                    <h2 className="mt-1.5 truncate text-[18px] font-extrabold leading-tight tracking-tight text-white">
                      {professional.name}
                    </h2>
                    <p className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">
                      RN · licence {professional.licence}
                    </p>
                  </div>
                  <Chip intent="success" light icon={BadgeCheck} className="shrink-0 border-transparent">
                    Verified
                  </Chip>
                </div>

                <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
                  <Fingerprint className="h-5 w-5 shrink-0 text-emerald-300" strokeWidth={2} aria-hidden />
                  <span className="min-w-0 flex-1 text-[11px] font-bold leading-snug text-emerald-50/80">
                    Your identity is the credential. Families see verified facts — never documents.
                  </span>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Identity & safety checks" trailing={<Chip intent="success">3 of 3 cleared</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {checks.map((c, i) => (
                  <div key={c.title}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => notify({ title: c.title, body: `${c.body} · verified ${c.when}`, kind: 'ok' })}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <Tile icon={ShieldCheck} tone="success" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{c.title}</div>
                        <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">{c.body}</div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <Chip intent="success" icon={Check}>
                          Done
                        </Chip>
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#0B211B]/35">{c.when}</span>
                      </div>
                    </motion.button>
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Professional terms of care"
                trailing={<Chip intent={allAgreed ? 'success' : 'warning'} dot={!allAgreed}>{agreed.length}/{proTerms.length}</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent={allAgreed ? 'success' : 'warning'}>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Acceptance progress</span>
                    <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">
                      {Math.round(progress * 100)}%
                    </span>
                  </div>
                  <Meter value={progress} intent={allAgreed ? 'success' : 'warning'} delay={0.2} className="mt-2.5" />
                </div>

                <div className="flex flex-col gap-2 px-4 pb-4">
                  {proTerms.map((t) => {
                    const on = agreed.includes(t)
                    return (
                      <motion.button
                        key={t}
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => toggle(t)}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors',
                          on ? 'bg-emerald-500/[0.1]' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
                        )}
                      >
                        <span
                          className={cn(
                            'grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg transition-colors',
                            on ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.1] text-transparent',
                          )}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
                        </span>
                        <span className={cn('min-w-0 flex-1 text-[12.5px] font-semibold leading-snug', on ? 'text-emerald-800' : 'text-[#0B211B]/70')}>
                          {t}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>

                <div
                  className={cn(
                    'flex items-center gap-2 px-4 py-3.5',
                    allAgreed ? 'bg-emerald-500/[0.08]' : 'bg-amber-500/[0.1]',
                  )}
                >
                  {allAgreed ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.6} aria-hidden />
                      <span className="min-w-0 flex-1 text-[11.5px] font-extrabold text-emerald-700">
                        All terms accepted · ready to start
                      </span>
                    </>
                  ) : (
                    <>
                      <Gavel className="h-4 w-4 shrink-0 text-amber-600" strokeWidth={2.6} aria-hidden />
                      <span className="min-w-0 flex-1 text-[11.5px] font-extrabold text-amber-700">
                        {proTerms.length - agreed.length} term{proTerms.length - agreed.length > 1 ? 's' : ''} still need your agreement
                      </span>
                    </>
                  )}
                </div>
              </Card>
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
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            notify({
              title: allAgreed ? 'Terms accepted' : 'Accepted with gaps',
              body: allAgreed ? 'Timestamped and sealed · offers unlocked' : 'You can accept the rest before your first session',
              kind: allAgreed ? 'ok' : 'warn',
            })
            navigate('/professional/pr03')
          }}
          className={cn(
            'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-shadow',
            allAgreed
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
              : 'bg-[#0B211B]/[0.4]',
          )}
        >
          <Lock className={cn('h-4 w-4 shrink-0', !allAgreed && 'opacity-70')} strokeWidth={2.4} aria-hidden />
          {allAgreed ? 'Accept terms and start' : `Accept remaining ${proTerms.length - agreed.length} to start`}
        </motion.button>
      </FootBar>
    </Screen>
  )
}
