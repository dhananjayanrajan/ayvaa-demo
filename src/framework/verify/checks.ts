import { liveTimerCount, unrevokedUrlCount } from './probes'
import type { FrameworkRuntime, RuntimeCounts } from '@/framework/runtime/contracts'

export function expectNoHandlerLeaks(runtime: FrameworkRuntime, baseline: RuntimeCounts): void {
  const now = runtime.counts()
  if (now.handlers !== baseline.handlers) {
    throw new Error(`handler leak — baseline ${baseline.handlers}, now ${now.handlers}`)
  }
  if (now.targets !== baseline.targets) {
    throw new Error(`target leak — baseline ${baseline.targets}, now ${now.targets}`)
  }
}

export function expectNoTimerLeaks(baseline: number): void {
  const now = liveTimerCount()
  if (now !== baseline) {
    throw new Error(`timer leak — baseline ${baseline}, now ${now}`)
  }
}

export function expectNoUrlLeaks(): void {
  const pending = unrevokedUrlCount()
  if (pending !== 0) {
    throw new Error(`object URL leak — ${pending} unrevoked`)
  }
}

export function expectToneDistinct(tones: string[]): void {
  if (new Set(tones).size !== tones.length) {
    throw new Error(`silent states — tones not distinct: [${tones.join(', ')}]`)
  }
}

export function expectFanOut(before: string | null, after: string | null): void {
  if (before === after) {
    throw new Error(`fan-out broken — subscriber surface unchanged ("${before}")`)
  }
}
