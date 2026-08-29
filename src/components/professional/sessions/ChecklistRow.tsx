import { motion } from 'motion/react'
import { Check, Lock, Play, type LucideIcon } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import type { StepState } from './sessionExecution'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  body: string
  icon: LucideIcon
  state: StepState
  onPress: () => void
}

const tileFor = (state: StepState): { tone: TileTone; pulse?: boolean } => {
  if (state === 'done') return { tone: 'success' }
  if (state === 'active') return { tone: 'live', pulse: true }
  if (state === 'todo') return { tone: 'info' }
  return { tone: 'neutral' }
}

const chipFor = (state: StepState) => {
  switch (state) {
    case 'done':
      return <Chip intent="success" icon={Check}>Done</Chip>
    case 'active':
      return <Chip intent="live" dot>Running</Chip>
    case 'todo':
      return <Chip intent="info" icon={Play}>Start</Chip>
    case 'locked':
      return <Chip intent="neutral" icon={Lock}>Locked</Chip>
  }
}

export function ChecklistRow({ title, body, icon, state, onPress }: Props) {
  const t = tileFor(state)
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onPress}
      disabled={state === 'locked'}
      aria-disabled={state === 'locked'}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 text-left transition-colors',
        state !== 'locked' && 'hover:bg-[#0B211B]/[0.02]',
        state === 'locked' && 'cursor-not-allowed',
        state === 'active' && 'bg-blue-500/[0.05]',
      )}
    >
      <span className="relative shrink-0">
        <Tile icon={icon} tone={t.tone} />
        {state === 'active' && (
          <span aria-hidden className="absolute -inset-1 -z-10 rounded-[18px] bg-blue-500/20 blur-md" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]',
            state === 'locked' && 'text-[#0B211B]/40',
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'mt-0.5 block truncate text-[11px] font-semibold',
            state === 'locked' ? 'text-[#0B211B]/35' : 'text-[#0B211B]/50',
          )}
        >
          {body}
        </span>
      </span>
      {chipFor(state)}
    </motion.button>
  )
}
