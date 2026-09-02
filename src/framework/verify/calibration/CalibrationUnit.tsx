import { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import { setup } from 'xstate'
import { useFramework } from '@/framework/runtime/hooks'
import type { CalibrationDefects } from './defects'

type CalibrationState = 'idle' | 'working' | 'done'

const CALIBRATION_TONE: Record<CalibrationState, string> = {
  idle: 'neutral',
  working: 'active',
  done: 'positive',
}

const calibrationMachine = setup({
  types: {
    events: {} as { type: 'START' } | { type: 'RESET' },
  },
  delays: { work: 90 },
}).createMachine({
  id: 'calibration',
  initial: 'idle',
  states: {
    idle: {
      on: { START: { target: 'working' } },
    },
    working: {
      after: { work: { target: 'done' } },
      on: { RESET: { target: 'idle' } },
    },
    done: {
      on: { RESET: { target: 'idle' } },
    },
  },
})

export function CalibrationUnit({ defects = {} }: { defects?: CalibrationDefects }) {
  const runtime = useFramework()
  const [snapshot, send] = useMachine(calibrationMachine)
  const calibrationState = snapshot.value as CalibrationState

  useEffect(() => {
    if (calibrationState === 'done') runtime.emit({ type: 'calibration.completed' })
  }, [calibrationState, runtime])

  useEffect(() => {
    if (!defects.leakTimer) return
    setTimeout(() => {}, 10_000)
  }, [defects.leakTimer])

  useEffect(() => {
    if (!defects.unrevokedURL) return
    URL.createObjectURL(new Blob(['calibration']))
  }, [defects.unrevokedURL])

  const tone = defects.silentState ? 'neutral' : CALIBRATION_TONE[calibrationState]

  return (
    <div
      data-testid="calibration"
      data-state={calibrationState}
      data-tone={tone}
      data-magic={defects.magicHex ? 'bg-[#0B211B]' : undefined}
    >
      <span data-testid="state-label">{calibrationState}</span>
      <button type="button" data-testid="start" onClick={() => send({ type: 'START' })}>
        Start
      </button>
      <button
        type="button"
        data-testid="reset"
        onClick={() => {
          send({ type: 'RESET' })
          runtime.emit({ type: 'calibration.reset' })
        }}
      >
        Reset
      </button>
      {defects.duplicateKeys ? (
        <ul>
          {['alpha', 'beta', 'alpha'].map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function CalibrationWatcher({ defects = {} }: { defects?: CalibrationDefects }) {
  const runtime = useFramework()
  const [seen, setSeen] = useState(0)

  useEffect(() => {
    if (defects.droppedSubscription) {
      runtime.on('calibration.completed', () => {})
      return
    }
    return runtime.on('calibration.completed', () => {
      if (!defects.brokenFanOut) setSeen((n) => n + 1)
    })
  }, [runtime, defects])

  return <span data-testid="watch-count">{seen}</span>
}
