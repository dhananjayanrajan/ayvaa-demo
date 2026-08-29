import { Card } from '@/components/phone/kit'
import { STEP_ICONS, type SessionStep } from './sessionExecution'
import { ChecklistRow } from './ChecklistRow'

type Props = {
  steps: SessionStep[]
  onPressStep: (step: SessionStep) => void
}

export function ChecklistCard({ steps, onPressStep }: Props) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-2">
        {steps.map((s) => {
          const Icon = STEP_ICONS[s.icon]
          return (
            <ChecklistRow
              key={s.id}
              title={s.title}
              body={s.body}
              icon={Icon}
              state={s.state}
              onPress={() => onPressStep(s)}
            />
          )
        })}
      </div>
    </Card>
  )
}
