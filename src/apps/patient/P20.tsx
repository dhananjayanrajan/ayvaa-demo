import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  BedDouble,
  Check,
  ChevronRight,
  ClipboardList,
  Droplets,
  HeartPulse,
  Lock,
  Pill as PillIcon,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { lovedOnes, medications, prescribers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

function iconFor(purpose: string): LucideIcon {
  if (purpose.includes('Blood pressure')) return HeartPulse
  if (purpose.includes('Diabetes')) return Droplets
  if (purpose.includes('Cholesterol')) return BedDouble
  return ClipboardList
}

export function P20() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const active = medications.filter((m) => !m.low)
  const low = medications.find((m) => m.low)
  const [sheet, setSheet] = useState<string | null>(null)
  const [refillOrdered, setRefillOrdered] = useState(false)

  return (
    <Screen>
      <AppBar
        title="Prescriptions"
        subtitle={`${father.name} · ${medications.length} active prescriptions`}
        onBack={() => navigate('/patient/p19')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => notify({ title: 'Add prescription', body: 'Only prescriptions from verified doctors can be added', kind: 'info' })}
            aria-label="Add prescription"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Plus className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-500/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] p-5 text-white shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-red-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                <div className="relative">
                  <Kicker>
                    <ShieldCheck className="h-3 w-3 text-rose-300/80" aria-hidden />
                    Rx ledger · doctor-verified only
                  </Kicker>
                  <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    {active.length} active,{' '}
                    <span className="bg-gradient-to-r from-rose-300 to-red-200 bg-clip-text text-transparent">
                      {low ? '1 needs refill' : 'all stocked'}
                    </span>
                  </h2>

                  <div className="mt-4 rounded-2xl bg-rose-400/[0.1] p-3.5">
                    <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                      <span className="text-rose-100/50">Stock health</span>
                      <span className="tabular-nums text-rose-200">
                        {low ? 'Low · 1 item' : 'All ok'}
                      </span>
                    </div>
                    <Meter value={active.length / medications.length} intent="danger" delay={0.2} className="mt-2" />
                    <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-200/70">
                      {low ? (
                        <>
                          <ShoppingCart className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                          Refill prescribed · 24 h pharmacy delivery
                        </>
                      ) : (
                        <>
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                          Every prescription stocked past next month
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-rose-300/70" strokeWidth={2.4} aria-hidden />
                    <span className="min-w-0 flex-1 truncate font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-rose-100/55">
                      Insulin rx · uploaded Mar 10 · views logged
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Active prescriptions" trailing={<Chip intent="danger">{active.length} verified</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {active.map((m, i) => {
                  const Icon = iconFor(m.purpose)
                  return (
                    <div key={m.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSheet(`${m.name} ${m.dose}`)}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={Icon} tone="danger" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                            {m.name} {m.dose}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                            {m.schedule} · {m.stock}
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            {low && (
              <motion.div variants={rise}>
                <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                  <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-red-400/10 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                  <div className="relative p-5">
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
                      <PillIcon className="h-3 w-3" aria-hidden />
                      Running low
                    </div>
                    <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      {low.name},{' '}
                      <span className="bg-gradient-to-r from-rose-300 to-red-200 bg-clip-text text-transparent">refill ready</span>
                    </h3>
                    <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/60">
                      {low.stock} · refill already prescribed by {low.prescriber}
                    </p>

                    <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-400/[0.12] px-3.5 py-3">
                      <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
                      </span>
                      <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-100">
                        Care is not interrupted
                      </span>
                      <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-rose-200/70">24 h delivery</span>
                    </div>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      disabled={refillOrdered}
                      onClick={() => {
                        setRefillOrdered(true)
                        notify({ title: 'Refill ordered', body: 'Sunrise pharmacy delivers within 24 hours', kind: 'ok' })
                      }}
                      className={cn(
                        'mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all duration-300',
                        refillOrdered
                          ? 'bg-white/[0.1] text-white'
                          : 'bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]',
                      )}
                    >
                      {refillOrdered ? (
                        <>
                          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                          <span className="truncate">Ordered</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                          <span className="truncate">Order refill</span>
                        </>
                      )}
                    </motion.button>
                    <p className="mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed text-rose-100/40">
                      Refills follow the prescribing doctor&apos;s instruction — never guessed.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Section label="Documents" trailing={<Chip intent="neutral">2 files</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => notify({ title: 'Insulin prescription', body: 'Uploaded March 10 · this view is now in the audit log', kind: 'info' })}
                  className="flex w-full items-center gap-3.5 p-4 text-left"
                >
                  <Tile icon={ClipboardList} tone="danger" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">Insulin prescription</div>
                    <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                      {prescribers[1].split(' · ')[0]} · uploaded March 10 · views logged
                    </div>
                  </div>
                  <Lock className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                </motion.button>
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => notify({ title: 'Upload', body: 'Camera or file picker opens here', kind: 'info' })}
                  className="flex w-full items-center gap-3.5 p-4 text-left"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-[0_8px_18px_-8px_rgba(244,63,94,0.7)]">
                    <Upload className="h-5 w-5" strokeWidth={2.4} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">Upload prescription</div>
                    <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                      Photo or PDF · verified before use
                    </div>
                  </div>
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="danger" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="danger" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Only prescriptions from verified doctors can be added. Every change is checked by the nurse before the next
                  dose.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of prescriptions" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet(null)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              {(() => {
                const m = medications.find((x) => `${x.name} ${x.dose}` === sheet)
                if (!m) return null
                const Icon = iconFor(m.purpose)
                return (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-500/10 text-rose-700">
                        <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                          {m.name} {m.dose}
                        </div>
                        <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">{m.purpose}</div>
                      </div>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setSheet(null)}
                        aria-label="Close sheet"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                      >
                        <X className="h-4 w-4" aria-hidden />
                      </motion.button>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl bg-[#230D14] p-4">
                      <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-rose-400/20 blur-3xl" />
                      <div className="relative">
                        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/50">Prescription record</div>
                        <div className="mt-3 flex flex-col gap-2.5">
                          {[
                            ['Prescriber', m.prescriber],
                            ['Schedule', m.schedule],
                            ['Stock', m.stock],
                            ['Verified', 'Doctor + nurse'],
                          ].map(([k, v]) => (
                            <div key={k} className="flex items-baseline justify-between gap-3">
                              <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-rose-100/45">{k}</span>
                              <span className="truncate font-mono text-[12px] font-bold text-rose-50/90">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/patient/p19')}
                        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.75)]"
                      >
                        <ClipboardList className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                        <span className="truncate">Schedule</span>
                      </motion.button>
                    </div>
                  </>
                )
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
