import { Fragment, useState } from 'react'
import { motion } from 'motion/react'
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Gavel,
  Lock,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Hero,
  Kicker,
  LiveDot,
  Section,
  Tile,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { auditEntries } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const ranges = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'custom', label: 'Custom' },
]

const blocks = ['1F', '20', '21', '22', '23']

const iconMap: Record<string, { icon: LucideIcon; tone: TileTone }> = {
  ok: { icon: CheckCircle2, tone: 'success' },
  view: { icon: Eye, tone: 'neutral' },
  approve: { icon: UserCheck, tone: 'success' },
  error: { icon: AlertTriangle, tone: 'danger' },
  gavel: { icon: Gavel, tone: 'warning' },
}

const promises: { icon: LucideIcon; text: string }[] = [
  { icon: Lock, text: 'No edits, no deletes — for anyone' },
  { icon: ShieldCheck, text: 'Sealed and timestamped on write' },
  { icon: Download, text: 'Full export, anytime' },
]

function Overline({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
      <span>{children}</span>
    </div>
  )
}

function HeroCell({ v, l }: { v: ReactNode; l: string }) {
  return (
    <div className="flex flex-col gap-1.5 px-3 first:pl-0">
      <span className="text-[15px] font-extrabold tabular-nums leading-none text-white">{v}</span>
      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100/45">{l}</span>
    </div>
  )
}

function FilterBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
      {ranges.map((r) => {
        const active = value === r.id
        return (
          <motion.button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={active}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(r.id)}
            className="relative flex-1 rounded-full py-2.5"
          >
            {active && (
              <motion.span
                layoutId="a05-range"
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
              />
            )}
            <span
              className={cn(
                'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.08em]',
                active ? 'text-white' : 'text-[#0B211B]/45',
              )}
            >
              {r.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

function Pager({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const btn =
    'grid h-10 w-10 place-items-center rounded-2xl transition-colors aria-disabled:opacity-40 aria-disabled:pointer-events-none'
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5">
      <span className="min-w-0 truncate text-[13.5px] font-extrabold tracking-tight text-[#0B211B]">
        Page <span className="tabular-nums text-emerald-700">{page}</span>
        <span className="font-bold text-[#0B211B]/35"> of </span>
        <span className="tabular-nums">{totalPages}</span>
      </span>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          aria-disabled={page === 1}
          className={cn(btn, page === 1 ? 'bg-[#0B211B]/[0.04] text-[#0B211B]/25' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/70')}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </button>
        {pages.map((p) => (
          <button key={p} type="button" onClick={() => onPageChange(p)} className="relative grid h-10 w-10 place-items-center rounded-2xl">
            {p === page && (
              <motion.span
                layoutId="a05-page"
                transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)]"
              />
            )}
            <span
              className={cn('relative text-[13px] font-extrabold tabular-nums', p === page ? 'text-white' : 'text-[#0B211B]/55')}
            >
              {p}
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          aria-disabled={page === totalPages}
          className={cn(
            btn,
            page === totalPages ? 'bg-[#0B211B]/[0.04] text-[#0B211B]/25' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/70',
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </button>
      </div>
    </div>
  )
}

export function A05() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [page, setPage] = useState(1)
  const [range, setRange] = useState('today')

  const entries = range === 'week' ? auditEntries.slice(0, 4) : range === 'today' ? auditEntries : []
  const totalPages = range === 'today' ? 3 : 2
  const rangeLabel = range === 'today' ? 'Live feed · today' : 'Live feed · this week'

  return (
    <Screen>
      <AppBar
        title="Audit log"
        subtitle="Every action · every access"
        trailing={<AgentAvatar seed="ayvaa-audit" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>The ledger · sealed on write</Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Nothing here can be{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">erased</span>
                </h2>

                <div className="mt-4 rounded-2xl bg-white/[0.05] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/50">Ledger chain</span>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-300">
                      <LiveDot className="text-emerald-300" />
                      Appending
                    </span>
                  </div>
                  <div className="mt-3 flex items-center">
                    {blocks.map((b, i) => {
                      const writing = i === blocks.length - 1
                      return (
                        <Fragment key={b}>
                          {i > 0 && <span aria-hidden className="h-px w-3 shrink-0 bg-emerald-300/30" />}
                          {writing ? (
                            <span className="relative grid h-9 min-w-0 flex-1 place-items-center overflow-hidden rounded-xl bg-emerald-400/20 text-[10px] font-extrabold tabular-nums text-emerald-100 ring-1 ring-inset ring-emerald-300/30">
                              <motion.span
                                aria-hidden
                                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent"
                                animate={{ x: ['-100%', '220%'] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                              />
                              <span className="relative">{b}</span>
                            </span>
                          ) : (
                            <span className="grid h-9 min-w-0 flex-1 place-items-center rounded-xl bg-white/[0.06] text-[10px] font-extrabold tabular-nums text-emerald-100/60 ring-1 ring-inset ring-white/10">
                              {b}
                            </span>
                          )}
                        </Fragment>
                      )
                    })}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-100/35">
                    <span>1F · sealed</span>
                    <span>23 · writing…</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <HeroCell v={auditEntries.length} l="Today" />
                  <HeroCell v="100%" l="Health" />
                  <HeroCell v="0" l="Gaps · 90 d" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light className="border-transparent">Append-only</Chip>
                  <Chip intent="success" light className="border-transparent">SHA-sealed</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <FilterBar
                value={range}
                onChange={(r) => {
                  setRange(r)
                  setPage(1)
                }}
              />
            </motion.div>

            {range !== 'custom' ? (
              <>
                <motion.div variants={rise}>
                  <Section label={rangeLabel} trailing={<Chip intent="neutral">{entries.length} entries</Chip>} />
                </motion.div>

                <motion.div variants={rise}>
                  <Card>
                    {entries.map((e, i) => {
                      const { icon: Icon, tone } = iconMap[e.icon] ?? iconMap.view
                      return (
                        <div key={e.id}>
                          {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.985 }}
                            onClick={() =>
                              notify(
                                e.icon === 'error'
                                  ? { title: e.title, body: `${e.body} · flagged for review`, kind: 'warn' }
                                  : { title: e.title, body: `${e.body} · opened from ${range} log`, kind: 'info' },
                              )
                            }
                            className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                          >
                            <Tile icon={Icon} tone={tone} size="sm" />
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{e.title}</span>
                              <span className="mt-0.5 block truncate text-[11.5px] font-medium text-[#0B211B]/55">{e.body}</span>
                            </span>
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/35">
                              <Lock className="h-3 w-3" strokeWidth={2.4} aria-hidden />
                            </span>
                          </motion.button>
                        </div>
                      )
                    })}
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card>
                    <Pager page={page} totalPages={totalPages} onPageChange={setPage} />
                  </Card>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={rise}>
                  <Section label="Custom range" trailing={<Chip intent="info">Picker</Chip>} />
                </motion.div>

                <motion.div variants={rise}>
                  <Card>
                    <div className="p-4">
                      <Overline>Pick a window</Overline>
                      <div className="mt-3 grid grid-cols-2 gap-2.5">
                        {[
                          { k: 'From', v: 'Mar 1' },
                          { k: 'To', v: 'Mar 7' },
                        ].map((d) => (
                          <button
                            key={d.k}
                            type="button"
                            onClick={() => notify({ title: 'Range picker', body: `${d.k} · ${d.v} · demo picker`, kind: 'info' })}
                            className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.07]"
                          >
                            <span className="block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">{d.k}</span>
                            <span className="mt-0.5 block text-[13px] font-bold tabular-nums text-[#0B211B]">{d.v}</span>
                          </button>
                        ))}
                      </div>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => notify({ title: 'Range applied', body: 'Mar 1 – Mar 7 · 42 sealed entries loaded', kind: 'info' })}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                      >
                        <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                        Apply range
                      </motion.button>
                    </div>
                  </Card>
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start gap-3.5">
                  <Tile icon={ShieldCheck} tone="white" size="lg" />
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Append-only by design</div>
                    <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
                      Writes are forever — edits are impossible.
                    </p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
                  {promises.map((r, i) => (
                    <div key={r.text}>
                      {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
                      <div className="flex items-center gap-3 px-3.5 py-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                          <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-emerald-50/80">{r.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Compliance tools" trailing={<Chip intent="info">Deep dives</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate('/admin/a06')}
                  className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={ShieldCheck} tone="success" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">Consent tracking</span>
                    <span className="mt-0.5 block text-xs font-medium text-[#0B211B]/55">1,102 active · 18 due · 2 withdrawn</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
                </motion.button>
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate('/admin/a07')}
                  className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={Lock} tone="ink" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">Retention policies</span>
                    <span className="mt-0.5 block text-xs font-medium text-[#0B211B]/55">7 policies · deletion queue running</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => notify({ title: 'Export queued', body: "Today's log will be emailed to you", kind: 'info' })}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)]"
              >
                <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Export today's log
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of audit log" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
