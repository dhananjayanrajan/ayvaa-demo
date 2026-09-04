import { Check, Lock, Play, type LucideIcon } from 'lucide-react'
import { Tile } from '@/components/base/phone/kit'
import { Row, type RowChip } from '@/components/base/phone/row'
import type { TileTone } from '@/components/base/phone/kit'
import type { StepState } from '@/data/sessionExecution'
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

const chipFor = (state: StepState): RowChip => {
  switch (state) {
    case 'done':
      return { label: 'Done', intent: 'success', icon: Check }
    case 'active':
      return { label: 'Running', intent: 'live', dot: true }
    case 'todo':
      return { label: 'Start', intent: 'info', icon: Play }
    case 'locked':
      return { label: 'Locked', intent: 'neutral', icon: Lock }
  }
}

export function ChecklistRow({ title, body, icon, state, onPress }: Props) {
  const t = tileFor(state)
  const locked = state === 'locked'
  return (
    <Row
      leading={
        <span className="relative shrink-0">
          <Tile icon={icon} tone={t.tone} />
          {state === 'active' && (
            <span aria-hidden className="absolute -inset-1 -z-10 rounded-[18px] bg-blue-500/20 blur-md" />
          )}
        </span>
      }
      title={title}
      titleClassName={locked ? 'text-[#0B211B]/40' : undefined}
      subtitle={body}
      subtitleClassName={cn('text-[11px] font-semibold', locked ? 'text-[#0B211B]/35' : 'text-[#0B211B]/50')}
      chip={chipFor(state)}
      padding="roomy"
      className={cn(locked && 'cursor-not-allowed', state === 'active' && 'bg-blue-500/[0.05]')}
      hoverClassName={locked ? undefined : 'hover:bg-[#0B211B]/[0.02]'}
      disabled={locked}
      onClick={onPress}
    />
  )
}
