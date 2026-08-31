import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Quote, Salad } from 'lucide-react'
import { Card, Chip, Meter, Tile } from '@/components/phone/kit'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { GOALS, CAREGIVER, goalSummary, type Goal, type GoalSession } from '@/data/patientCarePlan'
import { cn } from '@/lib/utils'

const sessionTone: Record<GoalSession['state'], { wrap: string; day: string; value: string }> = {
  met: { wrap: 'bg-emerald-500/[0.08]', day: 'text-emerald-700/60', value: 'text-emerald-800' },
  missed: { wrap: 'bg-rose-500/[0.07]', day: 'text-rose-500/70', value: 'text-rose-600' },
  pending: { wrap: 'bg-amber-500/[0.09]', day: 'text-amber-700/60', value: 'text-amber-700' },
}

function GoalRow({
  goal,
  open,
  onToggle,
  onOpenSession,
}: {
  goal: Goal
  open: boolean
  onToggle: () => void
  onOpenSession: () => void
}) {
  const Icon = goal.icon
  const tone = goal.state === 'met' ? 'success' : 'warning'

  return (
    <div className="rounded-2xl bg-[#0B211B]/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
      >
        <span
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
            goal.state === 'met' ? 'bg-emerald-500/[0.1] text-emerald-600' : 'bg-amber-500/[0.12] text-amber-600',
          )}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{goal.title}</span>
          <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/50">{goal.result}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <Chip intent={tone} dot={goal.state === 'open'}>
            {goal.state === 'met' ? 'Met' : 'Open'}
          </Chip>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-3.5">
              <div className="grid grid-cols-3 gap-1.5">
                {goal.sessions.map((s) => {
                  const t = sessionTone[s.state]
                  return (
                    <motion.button
                      key={`${s.day}-${s.value}`}
                      type="button"
                      whileTap={{ scale: 0.93 }}
                      onClick={onOpenSession}
                      className={cn('rounded-xl px-2 py-2 text-center', t.wrap)}
                    >
                      <span className={cn('block text-[8px] font-extrabold uppercase tracking-[0.14em]', t.day)}>{s.day}</span>
                      <span className={cn('mt-0.5 block text-[11px] font-bold tabular-nums', t.value)}>{s.value}</span>
                    </motion.button>
                  )
                })}
              </div>

              <QuotePanel
                kicker="Verbatim"
                kickerIcon={Quote}
                quote={goal.note}
                author={`${CAREGIVER.name}, caregiver`}
                authorInitial={CAREGIVER.firstName[0]}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function GoalsCard({ onOpenSession }: { onOpenSession: () => void }) {
  const [openId, setOpenId] = useState<string | null>('diet')
  const summary = goalSummary()
  const allMet = summary.open === 0

  return (
    <Card intent={allMet ? 'success' : 'warning'}>
      <div aria-hidden className={cn('h-1 w-full', allMet ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-amber-400 to-orange-400')} />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={Salad} tone={allMet ? 'success' : 'warning'} size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Goal completion</span>
              <Chip intent={allMet ? 'success' : 'warning'} dot={!allMet}>
                {summary.met} of {summary.total} met
              </Chip>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              {allMet
                ? 'Every goal sealed for the week.'
                : 'Diet completes Saturday, the other two are sealed for the week.'}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">Goal-days achieved</span>
            <span className={cn('shrink-0 text-[10px] font-extrabold tabular-nums', allMet ? 'text-emerald-700' : 'text-amber-700')}>
              {summary.achieved} of {summary.scored}
            </span>
          </div>
          <Meter value={summary.achieved / summary.scored} intent={allMet ? 'success' : 'warning'} delay={0.2} className="mt-2" />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {GOALS.map((goal) => (
            <GoalRow
              key={goal.id}
              goal={goal}
              open={openId === goal.id}
              onToggle={() => setOpenId((prev) => (prev === goal.id ? null : goal.id))}
              onOpenSession={onOpenSession}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
