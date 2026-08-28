import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  Lock,
  Pill as PillIcon,
  ScanLine,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Tile } from '@/components/phone/kit'
import { lovedOnes } from '@/data/seed'
import { medVerification, quickTags, sessionNote } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Mode = 'vitals' | 'meds' | 'notes'

const modes: { id: Mode; label: string; icon: typeof HeartPulse }[] = [
  { id: 'vitals', label: 'Vitals', icon: HeartPulse },
  { id: 'meds', label: 'Meds', icon: PillIcon },
  { id: 'notes', label: 'Notes', icon: ClipboardList },
]

const modeMeta: Record<Mode, { title: string; subtitle: string; tile: 'success' | 'warning' | 'info' }> = {
  vitals: { title: 'Record vital signs', subtitle: 'Saved to the visit log and compared with last visit', tile: 'success' },
  meds: { title: 'Give Amlodipine 5 mg', subtitle: 'Once daily, morning · prescribed by Dr. Venkatesh', tile: 'warning' },
  notes: { title: 'Session notes', subtitle: 'The family sees these in the visit summary', tile: 'info' },
}

const vitals: { key: string; label: string; value: string; delta: string; down: boolean }[] = [
  { key: 'bp', label: 'Blood pressure', value: '128/76', delta: '4 pts lower than Monday', down: true },
  { key: 'pulse', label: 'Pulse', value: '72 bpm', delta: 'Steady vs Monday', down: true },
  { key: 'spo2', label: 'Oxygen', value: '97%', delta: 'Stable all week', down: false },
  { key: 'temp', label: 'Temperature', value: '36.7°C', delta: 'Normal range', down: true },
]

export function PR07() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [mode, setMode] = useState<Mode>('vitals')
  const [checks, setChecks] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>(['Good mobility', 'Good appetite'])
  const [saved, setSaved] = useState<Mode[]>([])

  const toggleCheck = (v: string) =>
    setChecks((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const allChecked = checks.length === medVerification.length
  const canSave = mode !== 'meds' || allChecked

  const save = () => {
    const messages: Record<Mode, { title: string; body: string }> = {
      vitals: { title: 'Readings saved', body: '128/76 · 72 bpm · 97% · sealed at sign off', kind: 'ok' },
      meds: {
        title: allChecked ? 'Dose confirmed' : 'Verification incomplete',
        body: allChecked
          ? 'Amlodipine 5 mg given · recorded permanently'
          : 'Complete all three checks before giving the dose',
        kind: allChecked ? 'ok' : 'warn',
      },
      notes: { title: 'Notes saved', body: 'Written by you alone · sealed at sign off', kind: 'ok' },
    }
    setSaved((prev) => (prev.includes(mode) ? prev : [...prev, mode]))
    notify(messages[mode])
  }

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle="Entry sheets · live during the visit"
        onBack={() => navigate('/professional/pr06')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Entry sheets</span>
                    <Chip intent="success" light dot className="border-transparent">
                      Visit live
                    </Chip>
                  </div>
                  <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    {saved.length} of 3 sheets{' '}
                    <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">recorded</span>
                  </h2>

                  <div className="mt-4 flex gap-1.5">
                    {modes.map((m) => {
                      const done = saved.includes(m.id)
                      return (
                        <span
                          key={m.id}
                          className={
                            done
                              ? 'flex h-1.5 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-300'
                              : 'h-1.5 flex-1 rounded-full bg-white/10'
                          }
                        />
                      )
                    })}
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {modes.map((m) => {
                      const done = saved.includes(m.id)
                      return (
                        <div key={m.id} className="rounded-2xl bg-white/[0.06] px-3 py-2.5">
                          <div className="flex items-center justify-between">
                            <m.icon
                              className={done ? 'h-3.5 w-3.5 text-emerald-300' : 'h-3.5 w-3.5 text-emerald-100/40'}
                              strokeWidth={2.4}
                              aria-hidden
                            />
                            {done && <Check className="h-3 w-3 text-emerald-300" strokeWidth={3.5} aria-hidden />}
                          </div>
                          <div
                            className={
                              done
                                ? 'mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100'
                                : 'mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/45'
                            }
                          >
                            {m.label}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Lock} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Tap the sheet below to record. Entries open as sheets and are sealed once the visit is signed off.
                </p>
              </Panel>
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        <motion.div
          key="dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-50 flex max-h-[90%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.4)]">
        <div className="shrink-0 px-5 pt-4">
          <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
        </div>

        <div className="shrink-0 px-5 pb-3 pt-2">
          <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
            {modes.map((m) => {
              const active = mode === m.id
              const done = saved.includes(m.id)
              return (
                <motion.button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMode(m.id)}
                  className="relative flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5"
                >
                  {active && (
                    <motion.span
                      layoutId="pr07-mode"
                      transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
                    />
                  )}
                  <m.icon
                    className={cn('relative h-3.5 w-3.5', active ? 'text-white' : 'text-[#0B211B]/45')}
                    strokeWidth={2.4}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      'relative text-[10px] font-extrabold uppercase tracking-[0.08em]',
                      active ? 'text-white' : 'text-[#0B211B]/45',
                    )}
                  >
                    {m.label}
                  </span>
                  {done && !active && <Check className="relative h-3 w-3 text-emerald-600" strokeWidth={3.5} aria-hidden />}
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-4">
          <div className="flex items-start gap-3">
            <Tile icon={modeMeta[mode].tile === 'success' ? HeartPulse : modeMeta[mode].tile === 'warning' ? PillIcon : ClipboardList} tone={modeMeta[mode].tile} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{modeMeta[mode].title}</div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{modeMeta[mode].subtitle}</div>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate('/professional/pr06')}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              aria-label="Close entry sheet"
            >
              <X className="h-4 w-4" aria-hidden />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'vitals' && (
              <motion.div key="vitals" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  {vitals.map((v) => (
                    <button
                      key={v.key}
                      type="button"
                      onClick={() => notify({ title: v.label, body: `${v.value} · ${v.delta}`, kind: 'info' })}
                      className="flex flex-col items-start rounded-2xl bg-[#0B211B]/[0.04] p-3.5 text-left"
                    >
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/40">{v.label}</span>
                      <span className="mt-1.5 text-[19px] font-extrabold tabular-nums leading-none tracking-tight text-[#0B211B]">
                        {v.value}
                      </span>
                      <span className="mt-2 flex items-center gap-1">
                        {v.down ? (
                          <TrendingDown className="h-3 w-3 text-emerald-600" strokeWidth={2.6} aria-hidden />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-sky-600" strokeWidth={2.6} aria-hidden />
                        )}
                        <span className="text-[9px] font-bold text-[#0B211B]/45">{v.delta}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <Panel intent="success" className="flex items-start gap-2.5 p-3.5">
                  <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.6} aria-hidden />
                  <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-semibold leading-relaxed text-[#0B211B]/70">
                    Blood pressure is 4 points lower than Monday and within normal range for his plan.
                  </p>
                </Panel>
              </motion.div>
            )}

            {mode === 'meds' && (
              <motion.div key="meds" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex flex-col gap-2.5">
                <Panel intent="warning" className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/80">
                      Verification · all three required
                    </span>
                    <Chip intent={allChecked ? 'success' : 'warning'} dot={!allChecked}>
                      {checks.length}/{medVerification.length}
                    </Chip>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {medVerification.map((v) => {
                      const on = checks.includes(v)
                      return (
                        <motion.button
                          key={v}
                          type="button"
                          whileTap={{ scale: 0.985 }}
                          onClick={() => toggleCheck(v)}
                          className={cn(
                            'flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors',
                            on ? 'bg-emerald-500/[0.1]' : 'bg-white',
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
                            {v}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                </Panel>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => notify({ title: 'Barcode matched', body: 'Pack label verified against the prescription', kind: 'ok' })}
                  className="flex items-center gap-3 rounded-2xl bg-emerald-500/[0.1] px-4 py-3.5 text-left"
                >
                  <ScanLine className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2.2} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold tracking-tight text-emerald-800">Pack barcode scanned · matched</span>
                    <span className="mt-0.5 block text-[10.5px] font-semibold text-emerald-700/60">Tap to rescan</span>
                  </span>
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />
                </motion.button>

                {!allChecked && (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
                    <Lock className="h-3.5 w-3.5" aria-hidden />
                    Confirm stays locked · complete all three checks first
                  </div>
                )}
              </motion.div>
            )}

            {mode === 'notes' && (
              <motion.div key="notes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex flex-col gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => notify({ title: 'Notes', body: 'Your words go to the family verbatim', kind: 'info' })}
                  className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4 text-left shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]"
                >
                  <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">
                      <ClipboardList className="h-3 w-3" aria-hidden />
                      Your note · verbatim to family
                    </div>
                    <p className="mt-2 font-serif text-pretty text-[13.5px] font-medium leading-relaxed text-white/90">
                      &ldquo;{sessionNote}&rdquo;
                    </p>
                  </div>
                </motion.button>

                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Quick tags</div>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((t) => {
                    const on = tags.includes(t)
                    return (
                      <motion.button
                        key={t}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleTag(t)}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold transition-colors',
                          on ? 'bg-emerald-500/[0.14] text-emerald-700' : 'bg-[#0B211B]/[0.045] text-[#0B211B]/55',
                        )}
                      >
                        {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
                        {t}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            whileTap={canSave ? { scale: 0.97 } : undefined}
            onClick={() => canSave && save()}
            className={cn(
              'mt-auto flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all',
              canSave
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.15]',
            )}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            {mode === 'vitals' ? 'Save readings' : mode === 'meds' ? 'Confirm dose given' : 'Save notes'}
          </motion.button>
          <p className="text-center text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/45">
            {mode === 'meds'
              ? 'Dose recording is permanent once saved and cannot be edited later.'
              : 'Sealed once the visit is signed off.'}
          </p>
        </div>
      </div>
    </Screen>
  )
}
