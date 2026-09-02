import { useEffect, useRef, type ReactNode } from 'react'
import { useActorRef } from '@xstate/react'
import { relayMachine } from './relay'
import { createRuntime } from './runtime'
import { FrameworkContext } from './context'

export function FrameworkProvider({ children }: { children: ReactNode }) {
  const relay = useActorRef(relayMachine)
  const bundleRef = useRef<ReturnType<typeof createRuntime> | null>(null)
  if (bundleRef.current === null) {
    bundleRef.current = createRuntime(relay)
  }
  useEffect(() => bundleRef.current!.attach(), [relay])
  return (
    <FrameworkContext.Provider value={bundleRef.current.runtime}>
      {children}
    </FrameworkContext.Provider>
  )
}
