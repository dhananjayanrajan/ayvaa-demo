import { motion } from 'motion/react'
import { Bell, CheckCircle2, ChevronRight, Link2, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Textarea } from '@/components/ui/textarea'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Section,
  Tile,
  rise,
  stagger,
} from '@/components/phone/kit'
import { escalatedTickets } from '@/data/seed'
import { useDemo } from '@/lib/store'

const guarantees: { icon: LucideIcon; text: string }[] = [
  { icon: Link2, text: 'Sessions, receipts and messages stay linked' },
  { icon: ShieldCheck, text: 'Decisions logged with your name' },
  { icon: Bell, text: 'The family sees the outcome' },
]

function Overline({ icon: Icon, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
      {Icon && <Icon className="h-3 w-3" strokeWidth={2.5} aria-hidden />}
      <span>{children}</span>
    </div>
  )
}

function WarnHero({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,42,8,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
      <div className="relative p-5">{children}</div>
    </div>
  )
}

export function A08() {
  const { notify } = useDemo()
  const [e1, e2, e3] = escalatedTickets

  return (
    <Screen>
      <AppBar
        title="Escalated tickets"
        subtitle="Needs a human decision"
        trailing={<AgentAvatar seed="ayvaa-tickets" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-amber-400/[0.14] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <WarnHero>
                <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
                  Escalation · judgment call
                </div>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  This one needs{' '}
                  <span className="bg-gradient-to-r from-amber-200 to-orange-100 bg-clip-text text-transparent">your judgment</span>
                </h2>
                <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/55">
                  The system did its part — a human now closes the loop.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="warning" light dot className="border-transparent">
                    Waiting {e1.waiting}
                  </Chip>
                  <Chip intent="neutral" light className="border-transparent">Human decision required</Chip>
                </div>
              </WarnHero>
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <Tile icon={MessageSquare} tone="warning" size="lg" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{e1.title}</span>
                        <Chip intent="warning" dot>{e1.waiting}</Chip>
                      </div>
                      <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/55">{e1.meta}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e1.chips.map((c) => (
                      <Chip key={c} intent="neutral">
                        {c}
                      </Chip>
                    ))}
                  </div>

                  <div className="relative mt-4 overflow-hidden rounded-[22px] bg-[#0B231C] p-5 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
                    <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">In her words</span>
                        <span className="select-none font-serif text-4xl leading-none text-emerald-300/40" aria-hidden>
                          &ldquo;
                        </span>
                      </div>
                      <p className="mt-1 text-pretty text-[14px] font-semibold leading-relaxed text-white/90">{e1.quote}</p>
                      <div aria-hidden className="my-3.5 h-px bg-white/[0.08]" />
                      <div className="flex items-center justify-between gap-2">
                        <span className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">
                          {e1.quoteBy}
                        </span>
                        <Chip intent="success" icon={CheckCircle2}>Verbatim</Chip>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] p-4">
                    <Overline icon={ShieldCheck}>Your decision</Overline>
                    <Textarea
                      placeholder="Write a note for the care team…"
                      className="mt-2.5 min-h-24 w-full resize-none rounded-2xl border border-[#0B211B]/[0.08] bg-white p-3.5 text-[13px] font-medium leading-relaxed text-[#0B211B] shadow-inner placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                    />
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-[10px] font-bold text-[#0B211B]/40">
                        Written to the audit record with your name
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/[0.12] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                        <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                        Auto-saved
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => notify({ title: 'Reply sent', body: 'Priya Sharma notified · decision shared', kind: 'ok' })}
                      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                    >
                      <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      Reply to family
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        notify({ title: 'Re-match queued', body: 'A calmer nurse will be offered Friday slot · family not told yet', kind: 'ok' })
                      }
                      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                    >
                      <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      Re-match quietly instead
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Also escalated" trailing={<Chip intent="neutral">2 more</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {[e2, e3].map((e, i) => (
                  <div key={e.title}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() =>
                        notify({
                          title: 'Ticket opened',
                          body: `${e.title} · ${i === 0 ? 'linked receipts attached' : 'usage report attached'}`,
                          kind: 'info',
                        })
                      }
                      className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <Tile icon={Link2} tone="neutral" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{e.title}</span>
                        <span className="mt-0.5 block line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{e.meta}</span>
                      </span>
                      <ChevronRight
                        className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                        aria-hidden
                      />
                    </motion.button>
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <WarnHero>
                <div className="flex items-start gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-[0_10px_20px_-12px_rgba(60,42,8,0.8)]">
                    <ShieldCheck className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Every call is on the record</div>
                    <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-amber-100/55">
                      Linking is automatic — so is accountability.
                    </p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
                  {guarantees.map((r, i) => (
                    <div key={r.text}>
                      {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
                      <div className="flex items-center gap-3 px-3.5 py-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-amber-400/15 text-amber-200">
                          <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-amber-50/80">{r.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </WarnHero>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of escalations" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
