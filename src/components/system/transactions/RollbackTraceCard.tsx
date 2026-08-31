import { motion } from 'motion/react'
import { ShieldCheck, Undo2 } from 'lucide-react'
import { Chip, rise } from '@/components/phone/kit'
import { StepList } from '@/components/phone/StepList'
import { transactionMeta, transactionSteps } from '@/data/system/transactions'

interface RollbackTraceCardProps {
  failedAt: number
}

export function RollbackTraceCard({ failedAt }: RollbackTraceCardProps) {
  const undone = transactionSteps.filter((s) => s.id < failedAt).slice().reverse()

  return (
    <motion.div variants={rise}>
      <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
        <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />

        <div className="relative p-5">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Undo2 className="h-3 w-3" aria-hidden />
            Rollback trace · complete
          </div>
          <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            Nothing was{' '}
            <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">
              written
            </span>
          </h3>
          <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/60">
            The failed write triggered an automatic unwind. Records returned to their previous state in reverse order.
          </p>

          <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
            <StepList
              nodeStyle="circle"
              nodeSize="md"
              theme="dark"
              steps={[
                ...undone.map((s, i) => ({
                  key: `${s.id}`,
                  state: 'done' as const,
                  node: (
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-400/90 text-white">
                      <Undo2 className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    </span>
                  ),
                  title: s.undoTitle,
                  titleWrap: true,
                  titleClassName: 'text-[13px]',
                  time: `${40 + i * 80} ms`,
                  timeTrailing: true,
                  timeTrailingClassName: 'text-[9px] text-rose-200/50',
                  body: s.undoBody,
                  bodyClassName: 'text-[11px] leading-relaxed text-rose-100/60',
                })),
                {
                  key: 'attempt-logged',
                  state: 'done',
                  node: (
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-white shadow-[0_0_12px_rgba(52,211,153,0.5)]">
                      <ShieldCheck className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    </span>
                  ),
                  title: 'Attempt logged',
                  titleWrap: true,
                  titleClassName: 'text-[13px]',
                  time: 'Sealed',
                  timeTrailing: true,
                  timeTrailingClassName: 'text-[9px] text-emerald-200/60',
                  body: 'Even a rolled-back transaction leaves an immutable trace in the audit log.',
                  bodyClassName: 'text-[11px] leading-relaxed text-emerald-100/60',
                  contentClassName: 'pb-0.5',
                },
              ]}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <Chip intent="danger" light className="border-transparent">0 partial records</Chip>
            <Chip intent="success" light className="border-transparent">Audit intact</Chip>
            <Chip intent="neutral" light className="border-transparent">{transactionMeta.rollbackMs}</Chip>
          </div>
          <p className="mt-2.5 text-[10.5px] font-semibold leading-relaxed text-rose-100/40">
            The family never saw a broken booking. Screens stayed calm while the database healed itself.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
