import { useContext, useEffect, useRef } from 'react'
import { FrameworkContext } from './context'
import { createIsolatedRuntime } from './runtime'
import type { FrameworkEventHandler, FrameworkRuntime } from './contracts'

const warned = new Set<string>()

function warnOnce(key: string, message: string): void {
  if (warned.has(key)) return
  warned.add(key)
  console.warn(message)
}

export function useFramework(): FrameworkRuntime {
  const runtime = useContext(FrameworkContext)
  if (!runtime) {
    warnOnce(
      'missing-runtime',
      'FrameworkRuntime missing — rendered outside FrameworkProvider, falling back to an isolated runtime',
    )
    return createIsolatedRuntime()
  }
  return runtime
}

export function useFrameworkEvent<K extends Parameters<FrameworkRuntime['on']>[0]>(
  type: K,
  handler: FrameworkEventHandler<K>,
): void {
  const runtime = useFramework()
  const latest = useRef(handler)
  latest.current = handler
  useEffect(() => {
    return runtime.on(type, (event) => latest.current(event))
  }, [runtime, type])
}
