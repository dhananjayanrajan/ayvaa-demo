import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FrameworkProvider } from '@/framework/runtime/FrameworkProvider'
import { useFramework, useFrameworkEvent } from '@/framework/runtime/hooks'
import type { FrameworkRuntime, RuntimeCounts } from '@/framework/runtime/contracts'
import { CalibrationUnit, CalibrationWatcher } from './calibration/CalibrationUnit'
import type { CalibrationDefects } from './calibration/defects'
import {
  expectFanOut,
  expectNoHandlerLeaks,
  expectNoTimerLeaks,
  expectNoUrlLeaks,
  expectToneDistinct,
} from './checks'
import { liveTimerCount, setConsoleErrorsAllowed, takeConsoleErrors } from './probes'

function renderCalibration(defects: CalibrationDefects) {
  const box: { current: { runtime: FrameworkRuntime; baseline: RuntimeCounts } | null } = { current: null }

  function Probe() {
    const runtime = useFramework()
    if (box.current === null) {
      box.current = { runtime, baseline: runtime.counts() }
    }
    return null
  }

  const view = render(
    <FrameworkProvider>
      <Probe />
      <CalibrationUnit defects={defects} />
      <CalibrationWatcher defects={defects} />
    </FrameworkProvider>,
  )

  return { ...view, box }
}

describe('self-proof — checks pass on the clean unit', () => {
  it('clean calibration passes every dynamic check', async () => {
    const timersBefore = liveTimerCount()
    const { box } = renderCalibration({})
    const surface = screen.getByTestId('calibration')

    expect(surface.dataset.state).toBe('idle')
    const tones: string[] = [surface.dataset.tone!]
    const beforeCount = screen.getByTestId('watch-count').textContent

    fireEvent.click(screen.getByTestId('start'))
    await waitFor(() => expect(surface.dataset.state).toBe('working'))
    tones.push(surface.dataset.tone!)
    await waitFor(() => expect(surface.dataset.state).toBe('done'))
    tones.push(surface.dataset.tone!)

    expectToneDistinct(tones)
    expectFanOut(beforeCount, screen.getByTestId('watch-count').textContent)

    const errors = takeConsoleErrors()
    expect(errors).toEqual([])

    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.getByTestId('calibration').dataset.state).toBe('idle')

    cleanup()
    expectNoHandlerLeaks(box.current!.runtime, box.current!.baseline)
    expectNoTimerLeaks(timersBefore)
    expectNoUrlLeaks()
    expect(takeConsoleErrors()).toEqual([])
  })
})

describe('self-proof — each check catches its seeded defect', () => {
  it('timer-leak check catches the leaked timer', () => {
    const timersBefore = liveTimerCount()
    renderCalibration({ leakTimer: true })
    cleanup()
    expect(() => expectNoTimerLeaks(timersBefore)).toThrow(/timer leak/)
  })

  it('handler-leak check catches the dropped subscription', () => {
    const { box } = renderCalibration({ droppedSubscription: true })
    cleanup()
    expect(() => expectNoHandlerLeaks(box.current!.runtime, box.current!.baseline)).toThrow(/handler leak/)
  })

  it('fan-out check catches the broken subscriber', async () => {
    renderCalibration({ brokenFanOut: true })
    const before = screen.getByTestId('watch-count').textContent
    fireEvent.click(screen.getByTestId('start'))
    await waitFor(() => expect(screen.getByTestId('calibration').dataset.state).toBe('done'))
    expect(() => expectFanOut(before, screen.getByTestId('watch-count').textContent)).toThrow(/fan-out/)
    cleanup()
  })

  it('tone-distinctness check catches the silent state', async () => {
    renderCalibration({ silentState: true })
    const surface = screen.getByTestId('calibration')
    const tones: string[] = [surface.dataset.tone!]
    fireEvent.click(screen.getByTestId('start'))
    await waitFor(() => expect(surface.dataset.state).toBe('working'))
    tones.push(surface.dataset.tone!)
    await waitFor(() => expect(surface.dataset.state).toBe('done'))
    tones.push(surface.dataset.tone!)
    expect(() => expectToneDistinct(tones)).toThrow(/silent states/)
    cleanup()
  })

  it('console policy catches duplicate streamed keys', () => {
    setConsoleErrorsAllowed(true)
    renderCalibration({ duplicateKeys: true })
    cleanup()
    expect(takeConsoleErrors().join('\n')).toMatch(/same key|duplicate/i)
    setConsoleErrorsAllowed(false)
  })

  it('url-leak check catches the unrevoked object URL', () => {
    renderCalibration({ unrevokedURL: true })
    cleanup()
    expect(() => expectNoUrlLeaks()).toThrow(/object URL/)
  })
})

describe('self-proof — runtime substrate behavior', () => {
  it('every catalog event is delivered through the relay actor', async () => {
    const received: string[] = []

    function Collector() {
      useFrameworkEvent('calibration.completed', () => received.push('completed'))
      useFrameworkEvent('calibration.reset', () => received.push('reset'))
      return null
    }

    render(
      <FrameworkProvider>
        <CalibrationUnit defects={{}} />
        <Collector />
      </FrameworkProvider>,
    )

    fireEvent.click(screen.getByTestId('reset'))
    fireEvent.click(screen.getByTestId('start'))
    await waitFor(() => expect(screen.getByTestId('calibration').dataset.state).toBe('done'))

    expect(received).toEqual(['reset', 'completed'])
    cleanup()
  })

  it('renders isolated with a warning outside the provider', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<CalibrationUnit defects={{}} />)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
    cleanup()
  })
})
