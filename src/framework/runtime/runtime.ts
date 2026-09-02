import type { FrameworkEvent } from './events'
import type {
  FrameworkEventHandler,
  FrameworkRuntime,
  RuntimeCounts,
  TargetSender,
  Unsubscribe,
} from './contracts'
import type { RelayActor } from './relay'

type AnyHandler = (event: FrameworkEvent) => void

export function createRuntime(relay: RelayActor): {
  runtime: FrameworkRuntime
  attach(): Unsubscribe
} {
  const byType = new Map<string, Set<AnyHandler>>()
  const targets = new Map<string, TargetSender>()

  const fanout = (event: FrameworkEvent): void => {
    const set = byType.get(event.type)
    if (!set) return
    for (const handler of Array.from(set)) handler(event)
  }

  const runtime: FrameworkRuntime = {
    emit(event) {
      relay.send(event)
    },
    on<K extends FrameworkEvent['type']>(type: K, handler: FrameworkEventHandler<K>): Unsubscribe {
      let set = byType.get(type)
      if (!set) {
        set = new Set()
        byType.set(type, set)
      }
      set.add(handler as AnyHandler)
      let active = true
      return () => {
        if (!active) return
        active = false
        set.delete(handler as AnyHandler)
      }
    },
    target(id: string, send: TargetSender): Unsubscribe {
      targets.set(id, send)
      let active = true
      return () => {
        if (!active) return
        active = false
        if (targets.get(id) === send) targets.delete(id)
      }
    },
    sendTo(id: string, event: FrameworkEvent): boolean {
      const send = targets.get(id)
      if (!send) return false
      send(event)
      return true
    },
    counts(): RuntimeCounts {
      let handlers = 0
      for (const set of byType.values()) handlers += set.size
      return { handlers, targets: targets.size }
    },
  }

  const attach = (): Unsubscribe => {
    const sub = relay.subscribe(({ context }) => {
      if (context.last) fanout(context.last)
    })
    return () => sub.unsubscribe()
  }

  return { runtime, attach }
}

export function createIsolatedRuntime(): FrameworkRuntime {
  const nullRelay = {
    send: () => {},
    subscribe: () => ({ unsubscribe: () => {} }),
  } as unknown as RelayActor
  return createRuntime(nullRelay).runtime
}
