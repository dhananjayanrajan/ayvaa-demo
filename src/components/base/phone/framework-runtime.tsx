import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export type NotifyEvent = { title: string; description?: string; tone?: 'success' | 'info' | 'warning' | 'danger' }

export interface FrameworkRuntime {
  notify(event: NotifyEvent): void
  navigate(route: string): void
  emit(event: string, payload?: unknown): void
  on(event: string, handler: (payload: unknown) => void): () => void
}

const FrameworkContext = createContext<FrameworkRuntime | null>(null)

type BusHandler = (payload: unknown) => void

export function FrameworkProvider({ children }: { children: ReactNode }) {
  const { notify: demoNotify } = useDemo()
  const { navigate: routerNavigate } = useRouter()
  const busRef = useRef<Map<string, Set<BusHandler>>>(new Map())

  const notify = useCallback((event: NotifyEvent) => {
    const kind = event.tone === 'danger' ? 'error' as const : event.tone === 'warning' ? 'warn' as const : event.tone === 'info' ? 'info' as const : 'ok' as const
    demoNotify({ title: event.title, body: event.description, kind })
  }, [demoNotify])

  const navigate = useCallback((route: string) => {
    routerNavigate(route)
  }, [routerNavigate])

  const emit = useCallback((event: string, payload?: unknown) => {
    const set = busRef.current.get(event)
    if (!set) return
    for (const h of Array.from(set)) h(payload)
  }, [])

  const on = useCallback((event: string, handler: BusHandler) => {
    let set = busRef.current.get(event)
    if (!set) {
      set = new Set()
      busRef.current.set(event, set)
    }
    set.add(handler)
    return () => {
      set!.delete(handler)
      if (set!.size === 0) busRef.current.delete(event)
    }
  }, [])

  const value = useMemo<FrameworkRuntime>(() => ({
    notify, navigate, emit, on,
  }), [notify, navigate, emit, on])

  return (
    <FrameworkContext.Provider value={value}>
      {children}
    </FrameworkContext.Provider>
  )
}

export function useFramework(): FrameworkRuntime {
  const ctx = useContext(FrameworkContext)
  if (!ctx) {
    if (import.meta.env.DEV) console.warn('[FrameworkRuntime] missing provider — wrap app shell with <FrameworkProvider>. Using fallback.')
    // fallback that still works in demo shells without provider
    const fallback: FrameworkRuntime = {
      notify: () => {},
      navigate: () => {},
      emit: () => {},
      on: () => () => {},
    }
    return fallback
  }
  return ctx
}

export function useFrameworkEvent(event: string, handler: BusHandler) {
  const { on } = useFramework()
  useEffect(() => on(event, handler), [event, handler, on])
}
