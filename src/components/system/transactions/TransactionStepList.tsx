import { AnimatePresence, motion } from 'motion/react'
import {
  AlertTriangle,
  CalendarCheck,
  CalendarPlus,
  Check,
  Repeat,
  ScrollText,
  Send,
  Undo2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, LiveDot, Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import { postCommitStep, transactionSteps } from '@/data/system/transactions'
import type { PostCommitState, StepVisual, TransactionStep } from '@/data/system/transactions'
import { cn } from '@/lib/utils'

const ICONS: Record<string, LucideIcon> = {
  booking: CalendarPlus,
  series: Repeat,
  sessions: CalendarCheck,
  audit: ScrollText,
  dispatch: Send,
}

const STATE_TILE: Record<StepVisual, TileTone> = {
  pending: 'neutral',
  writing: 'info',
  done: 'success',
  failed: 'danger',
  undone: 'neutral',
}

const BODY_BY_STATE: Record<StepVisual, (step: TransactionStep) => string> = {
  pending: (s) => s.body,
  writing: (s) => `Writing to ${s.table}`,
  done: (s) => s.body,
  failed: (s) => `Write to ${s.table} was rejected`,
  undone: (s) => s.undoBody,
}

const POST_BODY: Record<PostCommitState, string> = {
  pending: 'Waits for the commit before sending',
  emitting: 'Emitting offers to five licensed nurses',
  done: postCommitStep.body,
  failed: 'Delivery failed · retry ladder active',
}

function StateChip({ state }: { state: StepVisual }) {
  if (state === 'done')
    return (
      <Chip intent="success" icon={Check} className="border-transparent">
        Sealed
      </Chip>
    )
  if (state === 'writing')
    return (
      <Chip intent="live" dot className="border-transparent">
        Writing
      </Chip>
    )
  if (state === 'failed')
    return (
      <Chip intent="danger" icon={AlertTriangle} className="border-transparent">
        Failed
      </Chip>
    )
  if (state === 'undone')
    return (
      <Chip intent="neutral" icon={Undo2} className="border-transparent">
        Undone
      </Chip>
    )
  return (
    <Chip intent="info" className="border-transparent">
      Queued
    </Chip>
  )
}

function PostCommitChip({ state }: { state: PostCommitState }) {
  if (state === 'done')
    return (
      <Chip intent="success" icon={Check} className="border-transparent">
        Emitted
      </Chip>
    )
  if (state === 'emitting')
    return (
      <Chip intent="live" dot className="border-transparent">
        Emitting
      </Chip>
    )
  if (state === 'failed')
    return (
      <Chip intent="warning" icon={AlertTriangle} className="border-transparent">
        Retrying
      </Chip>
    )
  return (
    <Chip intent="info" className="border-transparent">
      Waiting
    </Chip>
  )
}

interface TransactionStepListProps {
  stepStates: StepVisual[]
  postCommitState: PostCommitState
  onStepTap: (step: TransactionStep, state: StepVisual) => void
  onPostCommitTap: () => void
}

function MonoTable({ children }: { children: string }) {
  return (
    <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#0B211B]/35">
      {children}
    </span>
  )
}

export function TransactionStepList({
  stepStates,
  postCommitState,
  onStepTap,
  onPostCommitTap,
}: TransactionStepListProps) {
  return (
    <Card>
      {transactionSteps.map((step, i) => {
        const state = stepStates[i]
        const Icon = ICONS[step.icon]
        return (
          <div key={step.id}>
            <Row
              align="start"
              padding="px-4 py-3.5"
              leading={
                <span className="relative shrink-0">
                  <Tile icon={Icon} tone={STATE_TILE[state]} />
                  {state === 'writing' && <LiveDot className="absolute -right-1 -top-1 text-sky-500" />}
                </span>
              }
              title={step.title}
              titleClassName={cn(
                'text-[13.5px]',
                state === 'undone' && 'text-[#0B211B]/35 line-through decoration-[#0B211B]/25',
              )}
              onClick={() => onStepTap(step, state)}
              hoverClassName=""
              showChevron={false}
              body={
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={state}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/55"
                  >
                    {BODY_BY_STATE[state](step)}
                  </motion.span>
                </AnimatePresence>
              }
              trailing={
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <StateChip state={state} />
                  <MonoTable>{step.table}</MonoTable>
                </span>
              }
            />
          </div>
        )
      })}

      <div className="flex items-center gap-2.5 px-4 pt-3.5">
        <span aria-hidden className="h-px flex-1 bg-[#0B211B]/[0.05]" />
        <Chip intent="info" icon={Send} className="border-transparent">
          After commit
        </Chip>
        <span aria-hidden className="h-px flex-1 bg-[#0B211B]/[0.05]" />
      </div>

      <Row
        align="start"
        padding="px-4 py-3.5"
        icon={Send}
        tone={
          postCommitState === 'done'
            ? 'success'
            : postCommitState === 'failed'
              ? 'warning'
              : postCommitState === 'emitting'
                ? 'info'
                : 'neutral'
        }
        title={postCommitStep.title}
        titleClassName="text-[13.5px]"
        onClick={onPostCommitTap}
        hoverClassName=""
        showChevron={false}
        body={
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={postCommitState}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/55"
            >
              {POST_BODY[postCommitState]}
            </motion.span>
          </AnimatePresence>
        }
        trailing={
          <span className="flex shrink-0 flex-col items-end gap-1.5">
            <PostCommitChip state={postCommitState} />
            <MonoTable>{postCommitStep.table}</MonoTable>
          </span>
        }
      />
    </Card>
  )
}
