import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Clock, ShieldCheck, Undo2 } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Section, rise, stagger } from '@/components/base/phone/kit'
import { useRouter } from '@/lib/router'
import { useDemo } from '@/lib/store'
import { CONSENT, LOCATION_DEFAULT, SCOPES, changeCountOf } from '@/data/patientConsent'
import { ConsentHero } from '@/components/patterns/heroes/consent-hero'
import { ScopesCard } from '@/components/patterns/cards/scopes-card'
import { WithdrawCard } from '@/components/patterns/cards/withdraw-card'
import { WithdrawSheet } from '@/components/patterns/sheets/withdraw-sheet'

type SealPhase = 'idle' | 'working' | 'done'

export function P22() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [grantedIds, setGrantedIds] = useState<string[]>(SCOPES.map((s) => s.id))
  const [location, setLocation] = useState(LOCATION_DEFAULT)
  const [edits, setEdits] = useState(0)
  const [sealPhase, setSealPhase] = useState<SealPhase>('idle')
  const [withdrawRequested, setWithdrawRequested] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const locked = withdrawRequested || sealPhase !== 'idle'
  const pending = changeCountOf(grantedIds, location)

  const toggleScope = (id: string) => {
    if (locked) return
    setGrantedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleLocation = () => {
    if (locked) return
    setLocation((v) => !v)
  }

  const undoChanges = () => {
    if (locked || pending === 0) return
    setGrantedIds(SCOPES.map((s) => s.id))
    setLocation(LOCATION_DEFAULT)
    notify({
      title: 'Changes undone',
      body: 'Back to the consent as it was last sealed',
      kind: 'info',
    })
  }

  const seal = () => {
    if (sealPhase !== 'idle' || pending === 0 || withdrawRequested) return
    setSealPhase('working')
    timers.current.push(
      setTimeout(() => {
        setSealPhase('done')
        setEdits((n) => n + 1)
        notify({
          title: 'Consent sealed',
          body: `${SCOPES.filter((s) => grantedIds.includes(s.id)).length} scopes approved, sealed and logged`,
          kind: 'ok',
        })
      }, 1100),
    )
    timers.current.push(setTimeout(() => setSealPhase('idle'), 2400))
  }

  return (
    <Screen>
      <AppBar
        title="Care consent"
        subtitle={`${CONSENT.patientFirst}, sealed record`}
        onBack={() => navigate('/patient/p21')}
      />
      <BodyArea>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl"
          />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <ConsentHero
                patientFirst={CONSENT.patientFirst}
                grantedCount={grantedIds.length}
                totalScopes={SCOPES.length}
                edits={edits}
                pending={pending > 0}
                withdrawalRequested={withdrawRequested}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="What you are approving"
                trailing={
                  withdrawRequested ? (
                    <Chip intent="danger" dot>
                      Locked
                    </Chip>
                  ) : pending > 0 ? (
                    <Chip intent="warning" dot>
                      {pending} pending
                    </Chip>
                  ) : (
                    <Chip intent="success">As sealed</Chip>
                  )
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <ScopesCard
                grantedIds={grantedIds}
                location={location}
                disabled={locked}
                onToggleScope={toggleScope}
                onToggleLocation={toggleLocation}
              />
            </motion.div>

            <AnimatePresence>
              {withdrawRequested ? (
                <motion.div
                  key="withdraw-strip"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-start gap-2.5 rounded-xl bg-rose-500/[0.1] px-3.5 py-3"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-500 text-white">
                    <Clock className="h-3 w-3" strokeWidth={2.8} aria-hidden />
                  </span>
                  <span className="min-w-0 break-words text-[10.5px] font-bold leading-snug text-rose-700">
                    Consent edits are locked until the withdrawal is confirmed or cancelled.
                  </span>
                </motion.div>
              ) : pending > 0 ? (
                <motion.div
                  key="pending-block"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/[0.12] px-3.5 py-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-500 text-white">
                      <Clock className="h-3 w-3" strokeWidth={2.8} aria-hidden />
                    </span>
                    <span className="min-w-0 break-words text-[10.5px] font-bold leading-snug text-amber-800">
                      {pending} {pending === 1 ? 'change waits' : 'changes wait'} to be sealed. Care keeps running on
                      the sealed version until then.
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={undoChanges}
                    className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-bold text-[#0B211B]/70 transition-colors duration-200 hover:bg-[#0B211B]/[0.09]"
                  >
                    <Undo2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Undo {pending} {pending === 1 ? 'change' : 'changes'}</span>
                  </motion.button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.div variants={rise}>
              <Section label="Ending consent" />
            </motion.div>

            <motion.div variants={rise}>
              <WithdrawCard
                requested={withdrawRequested}
                onOpen={() => setWithdrawOpen(true)}
                onCancel={() => setWithdrawRequested(false)}
              />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa consent, sealed record" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        {sealPhase === 'done' ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setSealPhase('idle')}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-emerald-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.8)]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            <span className="truncate">Consent sealed, keep editing</span>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileTap={pending > 0 && sealPhase === 'idle' && !withdrawRequested ? { scale: 0.97 } : undefined}
            onClick={seal}
            disabled={pending === 0 || sealPhase !== 'idle' || withdrawRequested}
            aria-disabled={pending === 0 || sealPhase !== 'idle' || withdrawRequested}
            className={`flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors ${
              sealPhase === 'working'
                ? 'cursor-wait bg-emerald-600/60 text-white/80'
                : pending === 0 || withdrawRequested
                  ? 'cursor-not-allowed bg-[#0B211B]/[0.06] text-[#0B211B]/30'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
            }`}
          >
            {sealPhase === 'working' && <Clock className="h-4 w-4 shrink-0 animate-pulse" aria-hidden />}
            {sealPhase === 'idle' && <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
            {withdrawRequested
              ? 'Sealing locked during withdrawal'
              : pending === 0
                ? 'No pending changes to seal'
                : sealPhase === 'idle'
                  ? `Seal ${pending} ${pending === 1 ? 'change' : 'changes'}`
                  : 'Sealing your consent'}
          </motion.button>
        )}
      </FootBar>

      <AnimatePresence>
        {withdrawOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setWithdrawOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {withdrawOpen && (
          <WithdrawSheet
            key="withdraw-sheet"
            onRequested={() => setWithdrawRequested(true)}
            onClose={() => setWithdrawOpen(false)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
