import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ChevronRight,
  Eye,
  FileText,
  Lock,
  ScrollText,
  ShieldCheck,
  Undo2,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Stat, Tile, rise, stagger } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { carePlan, lovedOnes } from '@/data/seed'
import { patientAuditEntries, patientDocuments } from '@/data/patientAudit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

export function P21() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [sheet, setSheet] = useState(false)

  const views = patientAuditEntries.filter((e) => e.kind === 'view').length
  const writes = patientAuditEntries.filter((e) => e.kind !== 'view').length

  return (
    <Screen>
      <AppBar
        title="Care records"
        subtitle={`${father.name} · ${carePlan.category.toLowerCase()} plan`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => notify({ title: 'Records menu', body: 'Export, share with doctor, request changes', kind: 'info' })}
            aria-label="Records menu"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <FileText className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <ShieldCheck className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Vault · sealed records
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Every file,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                    every view logged
                  </span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Consent gates who opens what — and the audit ledger remembers forever.
                </p>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Documents" value={patientDocuments.length} dot="bg-emerald-300" />
                  <Stat label="Views this week" value={views} dot="bg-teal-300" />
                  <Stat label="Changes" value={writes} dot="bg-amber-300" />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                    <span>Plan progress</span>
                    <span className="tabular-nums text-emerald-200">{carePlan.progress}%</span>
                  </div>
                  <Meter value={carePlan.progress / 100} intent="success" delay={0.2} className="mt-2" />
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Documents and consent" trailing={<Chip intent="success" icon={Lock}>Consent active</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {patientDocuments.map((d, i) => {
                  const locked = 'locked' in d && d.locked
                  const chevron = 'chevron' in d && d.chevron
                  const tone: TileTone = locked ? 'neutral' : 'success'
                  const Icon: LucideIcon = locked ? Lock : FileText
                  return (
                    <div key={d.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() =>
                          notify({
                            title: d.name,
                            body: locked ? 'Decrypting for you · access logged in the audit record' : 'Opening record',
                            kind: 'info',
                          })
                        }
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={Icon} tone={tone} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{d.name}</span>
                          <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">{d.meta}</span>
                        </span>
                        {locked && <Lock className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/30" aria-hidden />}
                        {chevron && <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />}
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Audit ledger" trailing={<Chip intent="neutral">{patientAuditEntries.length} entries</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <ScrollText className="h-3 w-3" aria-hidden />
                    Recent activity · immutable
                  </div>
                  <div className="mt-3 flex flex-col">
                    {patientAuditEntries.map((e, i) => {
                      const last = i === patientAuditEntries.length - 1
                      const isView = e.kind === 'view'
                      return (
                        <div key={e.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            {isView ? (
                              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-200">
                                <Eye className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                              </span>
                            ) : (
                              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-white">
                                <Undo2 className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                              </span>
                            )}
                            {!last && <span aria-hidden className="my-1 w-px flex-1 bg-white/10" />}
                          </div>
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.99 }}
                            onClick={() => notify({ title: e.title, body: `${e.body} · entry sealed`, kind: 'info' })}
                            className={last ? 'min-w-0 flex-1 pb-0.5 text-left' : 'min-w-0 flex-1 pb-4 text-left'}
                          >
                            <div className="truncate text-[13px] font-bold leading-snug tracking-tight text-white">{e.title}</div>
                            <div className="mt-0.5 truncate text-[10.5px] font-semibold text-emerald-100/50">{e.body}</div>
                          </motion.button>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
                    <div className="flex flex-col gap-2.5">
                      <DarkRow k="Retention" v="10 years minimum" />
                      <DarkRow k="Early deletion" v="Blocked by system" />
                      <DarkRow k="Ledger" v="Immutable" />
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSheet(true)}
                    className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
                  >
                    <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Full audit log</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Undo2} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Medical records are kept for ten years. Deleting early is blocked by the system itself.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of records" />
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
            onClick={() => setSheet(false)}
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
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <ScrollText className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Full audit log</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Every access since plan start</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSheet(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Ledger summary</div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <DarkRow k="Total entries" v="142" />
                    <DarkRow k="Since" v="20 Jan 2026" />
                    <DarkRow k="Viewed by" v="You · nurse · partner" />
                    <DarkRow k="Denied accesses" v="3 · consent withdrawn" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <div className="flex flex-col gap-2.5">
                  {patientAuditEntries.map((e) => (
                    <div key={e.id} className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 shrink-0 truncate text-[11.5px] font-semibold text-[#0B211B]/55">{e.title}</span>
                      <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{e.body}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/patient/p22')}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Consent records</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
