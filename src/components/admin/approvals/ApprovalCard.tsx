import { motion } from 'motion/react'
import {
  AlertTriangle,
  Lock,
  ScrollText,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import {
  Card,
  Chip,
  Meter,
  Panel,
  rise,
} from '@/components/phone/kit'
import type { Intent } from '@/components/phone/kit'
import { Overline } from '@/components/admin/ui/Overline'
import { CheckTile } from '@/components/admin/approvals/CheckTile'
import type { Approval } from '@/data/types'
import { cn } from '@/lib/utils'

const checkMeta: Record<string, { chip: string; intent: Intent; dot: boolean; sub: string }> = {
  ok: { chip: 'Verified', intent: 'success', dot: false, sub: 'Evidence attached to file' },
  running: { chip: 'Running', intent: 'warning', dot: true, sub: 'System checking right now' },
  pending: { chip: 'Pending', intent: 'neutral', dot: false, sub: 'Awaiting manual input' },
}

interface ApprovalCardProps {
  a: Approval
  onDecide: (id: string, approve: boolean) => void
}

export function ApprovalCard({ a, onDecide }: ApprovalCardProps) {
  const verified = a.checks.filter((c) => c.state === 'ok').length
  const running = a.checks.some((c) => c.state === 'running')
  const progress = a.checks.length ? verified / a.checks.length : 0

  return (
    <motion.div variants={rise}>
      <Card intent={a.urgent ? 'warning' : 'neutral'}>
        <div
          aria-hidden
          className={cn(
            'h-1 w-full bg-gradient-to-r',
            a.urgent ? 'from-amber-400 to-orange-400' : 'from-emerald-500 to-teal-400',
          )}
        />
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <AgentAvatar seed={a.name} size={52} />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{a.name}</span>
                {a.urgent && <Chip intent="warning" dot>{a.waiting}</Chip>}
              </div>
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {a.role} · licence {a.licence}
              </p>
              <p className="text-[11px] font-semibold text-[#0B211B]/40">Applied {a.applied}</p>
            </div>
          </div>

          <Panel intent="neutral" className="mt-4 p-4">
            <div className="flex items-center justify-between gap-2">
              <Overline icon={ShieldCheck}>Auto verification</Overline>
              <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-[#0B211B]/50">
                {verified}/{a.checks.length}
              </span>
            </div>
            <Meter value={progress} intent={running ? 'warning' : 'success'} delay={0.2} className="mt-2.5" />

            <div className="mt-4 flex flex-col">
              {a.checks.map((c, i) => {
                const meta = checkMeta[c.state] ?? checkMeta.pending
                const last = i === a.checks.length - 1
                return (
                  <div key={c.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckTile state={c.state} />
                      {!last && <span aria-hidden className="my-1 w-px flex-1 bg-[#0B211B]/10" />}
                    </div>
                    <div className={cn('min-w-0 flex-1 pt-1', !last && 'pb-4')}>
                      <div className="text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{c.label}</div>
                      <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/45">{meta.sub}</div>
                    </div>
                    <span className="shrink-0 pt-1">
                      <Chip intent={meta.intent} dot={meta.dot}>
                        {meta.chip}
                      </Chip>
                    </span>
                  </div>
                )
              })}
            </div>
          </Panel>

          {a.history && (
            <Panel intent="warning" className="mt-3 p-3.5">
              <Overline icon={AlertTriangle}>Prior history</Overline>
              <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{a.history}</p>
            </Panel>
          )}

          {a.note && (
            <Panel intent="neutral" className="mt-3 p-3.5">
              <Overline icon={ScrollText}>Reviewer note</Overline>
              <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{a.note}</p>
            </Panel>
          )}

          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/40">
            <Lock className="h-3 w-3" aria-hidden />
            Evidence sealed with the decision
          </div>

          <div className="mt-3.5 flex gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onDecide(a.id, false)}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-all duration-200 hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B211B]/20"
              aria-label={`Reject ${a.name}`}
            >
              <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Reject</span>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onDecide(a.id, true)}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all duration-200 hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              aria-label={`Approve ${a.name}`}
            >
              <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Approve</span>
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
