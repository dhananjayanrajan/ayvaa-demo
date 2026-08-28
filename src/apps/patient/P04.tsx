import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, Camera, Check, ChevronDown, Lock, ScanLine, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Kicker, Meter, Panel, Ring, Section, Tile, TimeChip, rise, stagger } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const journey: { title: string; body: string; time: string }[] = [
  { title: 'Phone code verified', body: 'Matched on first attempt', time: '2:11 PM' },
  { title: 'Aadhaar card captured', body: 'Front and back · sharp and readable', time: '2:12 PM' },
]

const privacyFacts: { title: string; body: string }[] = [
  {
    title: 'Encrypted on capture',
    body: 'Your ID is encrypted the moment it is taken — before it ever leaves the device. Even Ayvaa staff see only sealed metadata.',
  },
  {
    title: 'Every view is logged',
    body: 'Anyone who opens your ID, for any reason, is recorded in the audit trail. You can read that log any time in Records.',
  },
  {
    title: 'Selfie is disposable',
    body: 'The selfie is compared and deleted immediately. It is never stored, shared or used for anything beyond this match.',
  },
]

export function P04() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle')
  const [openFact, setOpenFact] = useState<string | null>(null)

  const capture = () => {
    if (phase !== 'idle') return
    setPhase('scanning')
    setTimeout(() => {
      setPhase('done')
      notify({ title: 'Selfie captured', body: 'Face matched with your ID at 99.2% · selfie deleted', kind: 'ok' })
    }, 1400)
  }

  return (
    <Screen>
      <AppBar
        title="Confirm your identity"
        subtitle="Final step · then your family plan is ready"
        onBack={() => navigate('/patient/p03')}
        trailing={<Chip intent="neutral">Step 2 of 2</Chip>}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <Kicker>Identity · final check</Kicker>
                    <Chip
                      intent={phase === 'done' ? 'success' : 'warning'}
                      light
                      dot={phase !== 'done'}
                      className="shrink-0 border-transparent"
                    >
                      {phase === 'done' ? 'Matched' : 'Selfie left'}
                    </Chip>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <Ring value={phase === 'done' ? 1 : 2 / 3} size={84} stroke={7} id="p04-progress">
                      <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">
                        {phase === 'done' ? '3/3' : '2/3'}
                      </span>
                      <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.16em] text-emerald-200/50">checks</span>
                    </Ring>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-balance text-[17px] font-extrabold leading-snug tracking-tight text-white">
                        Two cleared,{' '}
                        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">one to go</span>
                      </h2>
                      <p className="mt-1 text-[11px] font-medium leading-relaxed text-emerald-100/55">
                        {phase === 'done'
                          ? 'Fully verified · your family plan is live.'
                          : 'Take one live selfie and verification completes.'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    {journey.map((s) => (
                      <div key={s.title} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                        <Tile icon={Check} tone="success" size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[12px] font-bold tracking-tight text-emerald-50/90">{s.title}</div>
                          <div className="mt-0.5 truncate text-[9.5px] font-semibold text-emerald-100/45">{s.body}</div>
                        </div>
                        <TimeChip>{s.time}</TimeChip>
                      </div>
                    ))}
                    <div
                      className={cn(
                        'flex items-center gap-3 rounded-2xl px-3.5 py-2.5',
                        phase === 'done' ? 'bg-emerald-400/[0.15]' : 'bg-white/[0.06]',
                      )}
                    >
                      <Tile icon={Camera} tone={phase === 'done' ? 'white' : 'warning'} size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12px] font-bold tracking-tight text-emerald-50/90">Live selfie match</div>
                        <div className="mt-0.5 truncate text-[9.5px] font-semibold text-emerald-100/45">
                          {phase === 'done' ? '99.2% confidence · passed' : 'In progress below'}
                        </div>
                      </div>
                      {phase === 'done' ? (
                        <Chip intent="success" light className="border-transparent">
                          Passed
                        </Chip>
                      ) : (
                        <span aria-hidden className="relative flex h-2 w-2">
                          <span className="absolute h-full w-full animate-ping rounded-full bg-amber-300 opacity-70" />
                          <span className="relative h-2 w-2 rounded-full bg-amber-300" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Match it with a selfie" trailing={<Chip intent="info">Live camera</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="flex flex-col items-center gap-4 p-6">
                  <motion.button
                    type="button"
                    whileTap={phase === 'idle' ? { scale: 0.94 } : undefined}
                    onClick={capture}
                    aria-label="Take a live selfie"
                    className="relative grid place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 p-1 shadow-[0_20px_40px_-18px_rgba(16,185,129,0.8)]"
                  >
                    <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white">
                      {phase === 'idle' && (
                        <>
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-emerald-400/20"
                            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                          />
                          <Camera className="h-9 w-9 text-emerald-600" strokeWidth={2} aria-hidden />
                        </>
                      )}
                      {phase === 'scanning' && (
                        <>
                          <span aria-hidden className="absolute inset-0 rounded-full bg-emerald-500/[0.12]" />
                          <ScanLine className="h-9 w-9 animate-pulse text-emerald-600" aria-hidden />
                        </>
                      )}
                      {phase === 'done' && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 340, damping: 16 }}
                          className="grid h-full w-full place-items-center rounded-full bg-emerald-500 text-white"
                        >
                          <Check className="h-10 w-10" strokeWidth={3} aria-hidden />
                        </motion.span>
                      )}
                    </span>
                  </motion.button>

                  <div className="text-center">
                    <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                      {phase === 'idle' && 'Take a live selfie'}
                      {phase === 'scanning' && 'Matching with your ID…'}
                      {phase === 'done' && 'Selfie matched'}
                    </div>
                    <p className="mx-auto mt-1 max-w-[260px] text-pretty text-[12px] font-medium leading-relaxed text-[#0B211B]/50">
                      {phase === 'idle' &&
                        'Look straight ahead in good light. We compare it with your ID and delete the selfie right after.'}
                      {phase === 'scanning' && 'Hold still · checking face geometry against your Aadhaar photo.'}
                      {phase === 'done' && 'Your ID and selfie match. Verification is complete.'}
                    </p>
                  </div>

                  {phase === 'scanning' && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 1.3, ease: 'easeInOut' }}
                      className="h-1 overflow-hidden rounded-full bg-[#0B211B]/[0.07]"
                    >
                      <span className="block h-full w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {phase === 'done' && (
                      <motion.div
                        key="match"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full rounded-2xl bg-[#0B211B]/[0.04] p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/45">
                            Face match confidence
                          </span>
                          <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">99.2%</span>
                        </div>
                        <Meter value={0.992} intent="success" delay={0.1} className="mt-2.5" />
                        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/45">
                          <Check className="h-3 w-3 text-emerald-600" strokeWidth={3.5} aria-hidden />
                          Threshold passed · selfie deleted after matching
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="How your data is protected" trailing={<Chip intent="success">Guaranteed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="info">
                <div className="p-4">
                  <div className="flex flex-col">
                    {privacyFacts.map((f, i) => {
                      const open = openFact === f.title
                      return (
                        <div key={f.title}>
                          {i > 0 && <div aria-hidden className="my-3 h-px bg-sky-500/10" />}
                          <button
                            type="button"
                            onClick={() => setOpenFact(open ? null : f.title)}
                            className="flex w-full items-center gap-3 text-left"
                          >
                            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[10px] bg-sky-500/[0.12] text-sky-600">
                              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1 text-[12.5px] font-bold tracking-tight text-[#0B211B]">{f.title}</span>
                            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                              <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                            </motion.span>
                          </button>
                          <Expand open={open}>
                            <p className="pl-10 pt-1.5 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{f.body}</p>
                          </Expand>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Lock} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Verification usually takes under two minutes. You can also finish later from your profile.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa identity check" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notify({ title: 'Identity verified', body: 'Welcome to Ayvaa · your family plan is ready', kind: 'ok' })
              navigate('/patient/p06')
            }}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all',
              phase === 'done'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.4]',
            )}
          >
            {phase === 'done' ? (
              <>
                <BadgeCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Finish verification
              </>
            ) : (
              'Continue · finish selfie later'
            )}
          </motion.button>
        </div>
      </FootBar>
    </Screen>
  )
}
