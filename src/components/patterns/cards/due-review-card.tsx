import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CalendarClock, ChevronDown, FileText, Phone } from 'lucide-react'
import { Card, Chip, Panel, StatStrip, Tile, rise } from '@/components/base/phone/kit'
import { Overline } from '@/components/base/phone/overline'
import { StaticButton } from '@/components/base/phone/lifecycle-button'
import { CycleStep } from '@/components/patterns/misc/cycle-step'
import { consentReview } from '@/data/seed'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface DueReviewCardProps {
  notify: NotifyFn
  onViewRecord: () => void
}

const CYCLE_DAYS = 90
const ELAPSED_DAYS = 78

const reminderHistory = [
  { date: 'Mar 28', note: 'Reminder sent via push + SMS' },
  { date: 'Mar 21', note: 'Guardian acknowledged' },
  { date: 'Mar 14', note: 'Email reminder opened' },
]

export function DueReviewCard({ notify, onViewRecord }: DueReviewCardProps) {
  const [historyOpen, setHistoryOpen] = useState(false)
  const daysLeft = CYCLE_DAYS - ELAPSED_DAYS
  const progress = ELAPSED_DAYS / CYCLE_DAYS

  const facts = [
    { key: 'Signed', value: consentReview.signed },
    { key: 'Pauses', value: consentReview.pauses },
    { key: 'Reminded', value: consentReview.reminded },
  ]

  const dueSteps = [
    { label: 'Signed', sub: consentReview.signed, done: true },
    { label: 'Reminded', sub: `${consentReview.reminded}x`, done: true },
    { label: 'Due now', sub: consentReview.due, done: false },
  ]

  return (
    <motion.div variants={rise}>
      <Card intent="warning" className="bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={CalendarClock} tone="warning" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">{consentReview.name}</span>
                <Chip intent="warning" dot>{consentReview.due}</Chip>
              </div>
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{consentReview.category}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between gap-2">
              <Overline>90-day cycle</Overline>
              <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-700">
                {daysLeft} days left
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mt-2 h-2 overflow-hidden rounded-full bg-amber-500/20"
            >
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
            </motion.div>

            <div className="mt-4 flex items-start justify-between">
              {dueSteps.map((s) => (
                <CycleStep key={s.label} label={s.label} sub={s.sub} done={s.done} />
              ))}
            </div>
          </div>

          <Panel intent="neutral" className="mt-4">
            <StatStrip
              light
              cells={facts.map((f) => ({ key: f.key, value: f.value, label: f.key }))}
            />
          </Panel>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {consentReview.pills.map((p) => (
              <Chip key={p} intent="neutral">
                {p}
              </Chip>
            ))}
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => setHistoryOpen((v) => !v)}
            className="mt-4 flex w-full items-center justify-between rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
          >
            <span className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/60">
              Recent reminders
            </span>
            <motion.span animate={{ rotate: historyOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="h-4 w-4 text-[#0B211B]/40" aria-hidden />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {historyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-2xl bg-[#0B211B]/[0.03] p-3">
                  {reminderHistory.map((r, i) => (
                    <div key={r.date} className={i > 0 ? 'mt-2 border-t border-[#0B211B]/[0.05] pt-2' : ''}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[11.5px] font-bold text-[#0B211B]">{r.date}</span>
                        <span className="break-words text-[11px] font-medium text-[#0B211B]/55">{r.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex gap-2.5">
            <StaticButton
              tone="neutral"
              icon={FileText}
              onClick={onViewRecord}
            >
              View record
            </StaticButton>
            <StaticButton
              tone="success"
              icon={Phone}
              onClick={() => notify({ title: 'Guardian called', body: 'Priya Sharma reached · review scheduled', kind: 'ok' })}
            >
              Call guardian
            </StaticButton>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
