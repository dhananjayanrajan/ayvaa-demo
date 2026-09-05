import { ActionTile } from './tile-button'
import { QUICK_ACTIONS, STEP_ICONS } from '@/data/sessionExecution'

export function QuickActionsGrid({ onPressAction }: { onPressAction: (label: string, body: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {QUICK_ACTIONS.map((q) => {
        const Icon = STEP_ICONS[q.key]
        return (
          <ActionTile
            key={q.label}
            icon={Icon}
            tone="info"
            label={q.label}
            onClick={() => onPressAction(q.label, q.body)}
          />
        )
      })}
    </div>
  )
}
