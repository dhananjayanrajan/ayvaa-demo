import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  FilePenLine,
  PhoneCall,
  Scale,
  ShieldCheck,
  Ticket,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Panel, Tile, rise } from '@/components/phone/kit'
import type { Intent, TileTone } from '@/components/phone/kit'
import { Overline } from '@/components/admin/ui/Overline'
import { scheduleDiff } from '@/data/system/auditLog'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const approvalTrail: { icon: LucideIcon; tone: string; title: string; body: string; detail: string; meta: string }[] = [
  {
    icon: UserRound,
    tone: 'bg-amber-400',
    title: 'Requested by the guardian',
    body: scheduleDiff.requestedVia,
    detail: 'Asked for mornings because Friday afternoons felt anxious for her father. The original request is kept word for word.',
    meta: 'Ticket t1 · 11:40 AM',
  },
  {
    icon: PhoneCall,
    tone: 'bg-sky-500',
    title: 'Verified with a call-back',
    body: `${scheduleDiff.requestedBy} confirmed the request on the registered number`,
    detail: 'Kavya called back and Priya confirmed the change in her own words before anything moved.',
    meta: 'Call · 11:52 AM',
  },
  {
    icon: Check,
    tone: 'bg-emerald-500',
    title: 'Approved and applied',
    body: `${scheduleDiff.approvedBy} · applied ${scheduleDiff.changed}`,
    detail: "The series was updated, both versions sealed, and Lakshmi's schedule refreshed instantly.",
    meta: `Effective ${scheduleDiff.effective}`,
  },
]

type DiffTheme = {
  intent: Intent
  strip: string
  tile: TileTone
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
}

const THEMES: Record<string, DiffTheme> = {
  sealed: {
    intent: 'warning',
    strip: 'from-amber-400 to-orange-400',
    tile: 'warning',
    chipIntent: 'warning',
    chipLabel: 'Changed',
    chipDot: true,
  },
  verifying: {
    intent: 'warning',
    strip: 'from-amber-400 to-orange-400',
    tile: 'warning',
    chipIntent: 'warning',
    chipLabel: 'Re-hashing',
    chipDot: true,
  },
  verified: {
    intent: 'success',
    strip: 'from-emerald-500 to-teal-400',
    tile: 'success',
    chipIntent: 'success',
    chipLabel: 'Seal verified',
    chipDot: false,
  },
}

interface StateDiffCardProps {
  verifyPhase: 'sealed' | 'verifying' | 'verified'
}

export function StateDiffCard({ verifyPhase }: StateDiffCardProps) {
  const { navigate } = useRouter()
  const [expanded, setExpanded] = useState<number | null>(null)
  const t = THEMES[verifyPhase]
  const changed = scheduleDiff.fields.filter((f) => !f.unchanged)
  const unchanged = scheduleDiff.fields.filter((f) => f.unchanged)

  return (
    <motion.div variants={rise}>
      <Card intent={t.intent}>
        <div aria-hidden className={cn('h-1 w-full bg-gradient-to-r transition-colors duration-500', t.strip)} />
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <Tile icon={FilePenLine} tone={t.tile} size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                  {scheduleDiff.title}
                </span>
                <Chip intent={t.chipIntent} dot={t.chipDot} className="border-transparent">
                  {t.chipLabel}
                </Chip>
              </div>
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                Applied {scheduleDiff.changed}
              </p>
              <p className="text-[11px] font-semibold text-[#0B211B]/40">
                Effective {scheduleDiff.effective}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {verifyPhase === 'verified' && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-4 flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.08] px-3.5 py-3"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
                <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-emerald-700">
                  This change's seal was re-verified against the chain. Both versions are intact.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Panel intent={t.intent} className="mt-4 p-4">
            <div className="flex items-center justify-between gap-2">
              <Overline>What changed</Overline>
              <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-[#0B211B]/50">
                {changed.length} field{changed.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2.5">
              {changed.map((f) => (
                <div key={f.label} className="rounded-2xl bg-white p-3.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
                    <FilePenLine className="h-3 w-3" aria-hidden />
                    {f.label}
                  </div>
                  <div className="mt-2.5 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
                    <div className="rounded-xl bg-rose-500/[0.06] px-3 py-2.5">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-rose-500/80">
                        Before
                      </div>
                      <div className="mt-1 break-words text-[14px] font-extrabold tabular-nums leading-none text-rose-600 line-through decoration-rose-300">
                        {f.from}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-emerald-600" strokeWidth={2.6} aria-hidden />
                    </div>
                    <div className="rounded-xl bg-emerald-500/[0.08] px-3 py-2.5">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-600">
                        Now
                      </div>
                      <div className="mt-1 break-words text-[14px] font-extrabold tabular-nums leading-none text-emerald-700">
                        {f.to}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel intent="neutral" className="mt-3 p-4">
            <Overline icon={ShieldCheck}>Deliberately untouched</Overline>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {unchanged.map((f) => (
                <div key={f.label} className="rounded-2xl bg-white p-3">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
                    <CalendarCheck className="h-3 w-3 shrink-0" aria-hidden />
                    <span className="truncate">{f.label}</span>
                  </div>
                  <div className="mt-1 truncate text-[13px] font-extrabold tabular-nums text-[#0B211B]" title={f.from}>
                    {f.from}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
              The diff records what stayed the same with the same care as what moved.
            </p>
          </Panel>

          <Panel intent="neutral" className="mt-3 p-4">
            <Overline>Approval trail</Overline>
            <div className="mt-4 flex flex-col">
              {approvalTrail.map((step, i) => {
                const last = i === approvalTrail.length - 1
                const Icon = step.icon
                const open = expanded === i
                return (
                  <div key={step.title} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full text-white', step.tone)}>
                        <Icon className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                      {!last && <span aria-hidden className="my-1 w-px flex-1 bg-[#0B211B]/10" />}
                    </div>
                    <div className={cn('min-w-0 flex-1', last ? 'pb-0.5' : 'pb-4')}>
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : i)}
                        className="flex w-full items-baseline justify-between gap-2 text-left outline-none focus-visible:outline-none"
                      >
                        <span className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">
                          {step.title}
                        </span>
                        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 self-center">
                          <ChevronDown className="h-4 w-4 text-[#0B211B]/30" aria-hidden />
                        </motion.span>
                      </button>
                      <div className="mt-0.5 break-words text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                        {step.body}
                      </div>
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2.5 rounded-xl bg-amber-500/[0.08] p-3">
                              <p className="break-words text-[11.5px] font-medium leading-relaxed text-[#0B211B]/80">
                                {step.detail}
                              </p>
                              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/40">
                                <Check className="h-3 w-3 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />
                                {step.meta}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>

          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            onClick={() => navigate('/patient/p25')}
            aria-label="Open ticket t1 in support"
            className="group mt-4 flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5 text-left outline-none transition-colors hover:bg-[#0B211B]/[0.07] focus-visible:ring-2 focus-visible:ring-amber-500/50"
          >
            <Tile icon={Ticket} tone="warning" size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                Open ticket t1 in support
              </span>
              <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/55">
                The conversation that started this change
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden />
          </motion.button>

          <div
            className={cn(
              'mt-3.5 flex items-start gap-2.5 rounded-2xl px-3.5 py-3 transition-colors duration-500',
              verifyPhase === 'verified' ? 'bg-emerald-500/[0.08]' : 'bg-amber-500/[0.1]',
            )}
          >
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" strokeWidth={2.4} aria-hidden />
            <p
              className={cn(
                'min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed transition-colors duration-500',
                verifyPhase === 'verified' ? 'text-emerald-700' : 'text-amber-700',
              )}
            >
              {scheduleDiff.outcome}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
