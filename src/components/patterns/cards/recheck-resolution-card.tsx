import { AnimatePresence, motion } from 'motion/react'
import {
  CalendarCheck,
  CalendarClock,
  CalendarX2,
  Loader2,
  ScanSearch,
  SearchCheck,
} from 'lucide-react'
import { Card, Chip, Tile } from '@/components/base/phone/kit'
import { StepList } from '@/components/base/phone/step-list'
import { probeSteps, recheckSubject } from '@/data/system/recheck'
import type { RecheckPhase } from '@/data/system/recheck'


type ProbeVisual = 'pending' | 'active' | 'done'

interface RecheckResolutionCardProps {
  phase: RecheckPhase
  probeIndex: number
  onRun: () => void
  onRowTap: (title: string, body: string) => void
}

export function RecheckResolutionCard({ phase, probeIndex, onRun }: RecheckResolutionCardProps) {
  const probeStateFor = (i: number): ProbeVisual => {
    if (phase === 'reversed') return 'done'
    if (phase === 'probing') {
      if (i < probeIndex) return 'done'
      if (i === probeIndex) return 'active'
      return 'pending'
    }
    return 'pending'
  }

  return (
    <Card intent={phase === 'probing' ? 'warning' : phase === 'reversed' ? 'info' : 'neutral'}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Tile
            icon={phase === 'probing' ? Loader2 : phase === 'reversed' ? CalendarX2 : ScanSearch}
            tone={phase === 'probing' ? 'warning' : phase === 'reversed' ? 'info' : 'neutral'}
            className={phase === 'probing' ? '[&_svg]:animate-spin' : undefined}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">
                Availability re-check
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  {phase === 'monitoring' && (
                    <Chip intent="warning" dot className="border-transparent">
                      Pending
                    </Chip>
                  )}
                  {phase === 'probing' && (
                    <Chip intent="warning" dot className="border-transparent">
                      Checking
                    </Chip>
                  )}
                  {phase === 'reversed' && (
                    <Chip intent="info" className="border-transparent">
                      Reversed
                    </Chip>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              {phase === 'reversed'
                ? recheckSubject.conflict
                : `${recheckSubject.offer} · accepted ${recheckSubject.acceptedAt}`}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] px-3.5 py-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2.5">
              <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
              <span className="min-w-0 flex-1 text-[11.5px] font-semibold leading-snug text-[#0B211B]/75">
                Visit needs · {recheckSubject.visitWindow}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CalendarCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" aria-hidden />
              <span className="min-w-0 flex-1 text-[11.5px] font-semibold leading-snug text-[#0B211B]/75">
                Personal window · {recheckSubject.personalWindow}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <StepList
            nodeStyle="circle"
            nodeSize="md"
            theme="light"
            activeStyle="spinner"
            railClassName="bg-[#0B211B]/[0.08]"
            steps={probeSteps.map((step, i) => {
              const state = probeStateFor(i)
              return {
                key: step.title,
                state: state === 'active' ? 'active' : state,
                title: step.title,
                titleClassName: 'text-[12.5px]',
                body: step.body,
                bodyClassName: 'text-[11px]',
                contentClassName: i === probeSteps.length - 1 ? 'pb-0.5' : 'pb-3',
              }
            })}
          />
        </div>

        {phase === 'reversed' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-4 flex items-start gap-2.5 rounded-2xl bg-sky-500/[0.08] px-3.5 py-3"
          >
            <SearchCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.4} aria-hidden />
            <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-sky-700">
              Acceptance reversed within seconds. The slot re-entered dispatch and Suresh keeps a clean record.
            </p>
          </motion.div>
        )}

        {phase === 'monitoring' && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onRun}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            <ScanSearch className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Run availability re-check
          </motion.button>
        )}
      </div>
    </Card>
  )
}
