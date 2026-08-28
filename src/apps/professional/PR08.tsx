import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Camera, Check, Pencil, Send, ShieldAlert, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Tile } from '@/components/phone/kit'
import type { Intent, TileTone } from '@/components/phone/kit'
import { incidents, lovedOnes } from '@/data/seed'
import { incidentCauses } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Severity = 'Minor' | 'Moderate' | 'Critical'

const severities: Severity[] = ['Minor', 'Moderate', 'Critical']

const severityConfig: Record<
  Severity,
  { tile: TileTone; chip: Intent; effects: string[]; cta: string; note: string }
> = {
  Minor: {
    tile: 'neutral',
    chip: 'neutral',
    effects: ['Added to this visit record', 'Reviewed in the weekly quality audit', 'Care plan stays active'],
    cta: 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
    note: 'Filed and sealed · minor notes never interrupt anyone’s day',
  },
  Moderate: {
    tile: 'warning',
    chip: 'warning',
    effects: ['Supervisor paged immediately', 'Care plan paused until reviewed', 'Family sees it on their timeline'],
    cta: 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_18px_36px_-18px_rgba(234,88,12,0.6)]',
    note: 'A supervisor is paged the second you submit — expect a call within minutes',
  },
  Critical: {
    tile: 'danger',
    chip: 'danger',
    effects: ['Supervisor and senior ops paged now', 'Care plan paused instantly', 'Family notified within minutes'],
    cta: 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]',
    note: 'This is the highest channel — senior ops picks it up live, day or night',
  },
}

export function PR08() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const reference = incidents[0]
  const [severity, setSeverity] = useState<Severity>('Moderate')
  const [cause, setCause] = useState(incidentCauses[0])
  const [photo, setPhoto] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const cfg = severityConfig[severity]

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle="Reporting an incident"
        onBack={() => navigate('/professional/pr06')}
      />
      <BodyArea>
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="show" className="flex flex-col gap-4 pt-1">
          <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
            <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] p-5 shadow-[0_28px_64px_-30px_rgba(60,42,8,0.7)]">
              <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
                  <ShieldAlert className="h-3 w-3" aria-hidden />
                  Visit on hold
                </div>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Care holds until{' '}
                  <span className="bg-gradient-to-r from-amber-200 to-orange-100 bg-clip-text text-transparent">this is filed</span>
                </h2>
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
                  <span className="min-w-0 flex-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-amber-100/50">
                    Guided walk · 8 of 15 min
                  </span>
                  <Chip intent="warning" dot>
                    Paused
                  </Chip>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '53%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </BodyArea>

      <AnimatePresence>
        {!submitted && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-50 flex max-h-[90%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.4)]">
        <div className="shrink-0 px-5 pt-4">
          <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3"
            >
              <div className="flex items-start gap-3">
                <Tile icon={ShieldAlert} tone={cfg.chip === 'danger' ? 'danger' : cfg.chip === 'warning' ? 'warning' : 'success'} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{severity} incident filed</div>
                  <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                    Sealed on submission · linked to this visit and {father.name.split(' ')[0]}'s care plan
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[#0B231C] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">What happens now</span>
                  <Chip intent={cfg.chip === 'danger' ? 'danger' : cfg.chip === 'warning' ? 'warning' : 'success'} light className="border-transparent">
                    {severity}
                  </Chip>
                </div>
                <div className="mt-3 flex flex-col gap-2.5">
                  {cfg.effects.map((e) => (
                    <div key={e} className="flex items-center gap-2.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-200">
                        <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-emerald-50/85">{e}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(severity === 'Minor' ? '/professional/pr06' : '/professional/pr04')}
                className={cn('flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white', cfg.cta)}
              >
                {severity === 'Minor' ? 'Resume the visit' : 'Back to sessions'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-start gap-3">
                <Tile icon={ShieldAlert} tone="danger" size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Report patient incident</div>
                  <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                    Links to this visit and his care plan automatically
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => navigate('/professional/pr06')}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                  aria-label="Close and resume visit"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="flex gap-2">
                {severities.map((s) => {
                  const active = severity === s
                  const sc = severityConfig[s]
                  return (
                    <motion.button
                      key={s}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSeverity(s)}
                      className={cn(
                        'flex flex-1 items-center justify-center rounded-2xl py-3 text-[13px] font-extrabold tracking-tight transition-colors',
                        active && s === 'Critical' && 'bg-rose-500/[0.14] text-rose-600',
                        active && s === 'Moderate' && 'bg-amber-500/[0.16] text-amber-700',
                        active && s === 'Minor' && 'bg-[#0B211B]/[0.08] text-[#0B211B]',
                        !active && 'bg-[#0B211B]/[0.04] text-[#0B211B]/45',
                      )}
                    >
                      {s}
                    </motion.button>
                  )
                })}
              </div>

              <Panel
                intent={cfg.chip === 'danger' ? 'danger' : cfg.chip === 'warning' ? 'warning' : 'neutral'}
                className="p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/45">What submitting triggers</span>
                  <Chip intent={cfg.chip} dot={severity !== 'Minor'}>
                    {severity}
                  </Chip>
                </div>
                <div className="mt-2.5 flex flex-col gap-2">
                  {cfg.effects.map((e) => (
                    <div key={e} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
                      <span className="min-w-0 flex-1 text-[12px] font-semibold leading-snug text-[#0B211B]/75">{e}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <div>
                <div className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">What happened</div>
                <div className="flex flex-wrap gap-2">
                  {incidentCauses.map((c) => {
                    const active = cause === c
                    return (
                      <motion.button
                        key={c}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCause(c)}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold transition-colors',
                          active ? 'bg-emerald-500/[0.14] text-emerald-700' : 'bg-[#0B211B]/[0.045] text-[#0B211B]/55',
                        )}
                      >
                        {active && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
                        {c}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() =>
                  notify({ title: 'Description', body: `${cause} · ${severity.toLowerCase()} · logged with your location`, kind: 'info' })
                }
                className="flex min-h-[86px] w-full items-start gap-3 rounded-2xl bg-[#0B211B]/[0.035] p-4 text-left"
              >
                <Tile icon={Pencil} tone="neutral" size="sm" />
                <span className="min-w-0 flex-1 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/75">
                  {reference.summary}
                </span>
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  setPhoto(true)
                  notify({ title: 'Photo attached', body: reference.photo ?? 'hallway-rug.jpg · access is logged', kind: 'info' })
                }}
                className={cn(
                  'flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl px-4 transition-colors',
                  photo ? 'bg-emerald-500/[0.12] text-emerald-700' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/70',
                )}
              >
                <Camera className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate text-[13px] font-bold">
                  {photo ? `${reference.photo ?? 'photo'} attached` : 'Attach photo of the area'}
                </span>
                {photo && <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden />}
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSubmitted(true)
                  notify({
                    title: `${severity} incident submitted`,
                    body: 'Sealed on submission · due within one hour of the event',
                    kind: severity === 'Minor' ? 'warn' : 'error',
                  })
                }}
                className={cn(
                  'mt-1 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white',
                  cfg.cta,
                )}
              >
                <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Submit {severity.toLowerCase()} report
              </motion.button>

              <p className="text-center text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/45">
                Due within one hour of the event · {cfg.note}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Screen>
  )
}
