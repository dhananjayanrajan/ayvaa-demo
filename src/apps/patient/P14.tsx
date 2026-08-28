import { useState } from 'react'
import { motion } from 'motion/react'
import {
  CalendarCheck,
  ChevronDown,
  Download,
  FileText,
  Lock,
  Quote,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Hero, Kicker, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { lovedOnes, reports } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

function LeaderRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline">
      <span className="shrink-0 text-[11.5px] font-semibold text-[#0B211B]/60">{k}</span>
      <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
      <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{v}</span>
    </div>
  )
}

export function P14() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [latest, ...earlier] = reports
  const [openIdx, setOpenIdx] = useState<string | null>(null)

  return (
    <Screen>
      <AppBar
        title="Care reports"
        subtitle={`${father.name} · one report per completed month`}
        onBack={() => navigate('/patient/p13')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => notify({ title: 'Download queued', body: 'All reports emailed as one PDF', kind: 'info' })}
            aria-label="Download all"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Download className="size-[18px]" strokeWidth={2.2} aria-hidden />
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
                  <Lock className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Sealed month by month
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Three months,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">steadily better</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Written by the caregiver, sealed when written, never edited after.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { icon: CalendarCheck, l: 'Latest', v: latest.month },
                    { icon: TrendingUp, l: 'Trend', v: 'Improving' },
                    { icon: Lock, l: 'Sealed', v: 'All 3' },
                  ].map((f) => (
                    <div key={f.l} className="rounded-2xl bg-white/[0.06] px-3 py-2.5">
                      <f.icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2.4} aria-hidden />
                      <div className="mt-1.5 truncate text-[12px] font-extrabold leading-none text-white">{f.v}</div>
                      <div className="mt-1 truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/40">{f.l}</div>
                    </div>
                  ))}
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Latest report" trailing={<Chip intent="success" dot>Month 3</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <Tile icon={FileText} tone="success" size="lg" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{latest.label}</span>
                        <Chip intent="success">Improving</Chip>
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        {latest.month} · sealed 1 April · signed by the caregiver
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
                    <div className="flex flex-col gap-2.5">
                      <LeaderRow k="Visits completed" v={latest.visits} />
                      {latest.highlights.map((h) => (
                        <LeaderRow key={h} k={h.split('·')[0].trim()} v={h.split('·')[1]?.trim() ?? 'Recorded'} />
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-3 overflow-hidden rounded-[20px] bg-[#0B231C] p-4 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
                    <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-emerald-400/15 blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">
                          <Quote className="h-3 w-3" aria-hidden />
                          Conclusion
                        </span>
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-100/30" aria-hidden />
                      </div>
                      <p className="mt-2.5 font-serif text-pretty text-[13px] font-medium leading-relaxed text-white/90">
                        &ldquo;Ramesh walked the full fifteen minutes without support. Recommend continuing the current plan into
                        month four.&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-extrabold text-emerald-200">
                          L
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/80">Lakshmi Reddy</span>
                        <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/patient/p13')}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                    >
                      <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Open plan</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => notify({ title: 'Report saved', body: `${latest.month} report downloaded · view logged`, kind: 'ok' })}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                    >
                      <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Download</span>
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Earlier reports" trailing={<Chip intent="neutral">{earlier.length} sealed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {earlier.map((r, i) => {
                  const open = openIdx === r.month
                  return (
                    <div key={r.month}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          setOpenIdx(open ? null : r.month)
                          notify({ title: `${r.month} opened`, body: 'Opening a report is logged in the audit record', kind: 'info' })
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={FileText} tone={r.trend === 'improving' ? 'success' : 'neutral'} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{r.month}</span>
                          <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                            {r.visits} · {r.highlights[0]}
                          </span>
                        </span>
                        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="shrink-0">
                          <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                        </motion.span>
                      </motion.button>
                      <Expand open={open}>
                        <div className="px-4 pb-4">
                          <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
                            <div className="flex flex-col gap-2.5">
                              <LeaderRow k="Visits completed" v={r.visits} />
                              {r.highlights.map((h) => (
                                <LeaderRow key={h} k={h.split('·')[0].trim()} v={h.split('·')[1]?.trim() ?? 'Recorded'} />
                              ))}
                              <LeaderRow k="Status" v="Sealed · immutable" />
                            </div>
                          </div>
                        </div>
                      </Expand>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Lock} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Reports are sealed when written and can never be edited afterwards. Opening one is always logged.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of reports" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
