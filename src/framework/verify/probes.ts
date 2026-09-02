type TimerHandle = ReturnType<typeof setTimeout>

const state = {
  liveTimers: new Set<unknown>(),
  consoleErrors: [] as string[],
  consoleErrorsAllowed: false,
  urlsCreated: [] as string[],
  urlsRevoked: [] as string[],
  installed: false,
}

export function installProbes(): void {
  if (state.installed) return
  state.installed = true

  const nativeSetTimeout = globalThis.setTimeout.bind(globalThis) as (
    handler: (...args: unknown[]) => void,
    timeout?: number,
    ...args: unknown[]
  ) => TimerHandle
  const nativeClearTimeout = globalThis.clearTimeout.bind(globalThis)

  const patchedSetTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]): TimerHandle => {
    const id = nativeSetTimeout((...inner: unknown[]) => {
      state.liveTimers.delete(id)
      if (typeof handler === 'function') (handler as (...a: unknown[]) => void)(...inner)
    }, timeout, ...(args as unknown[]))
    state.liveTimers.add(id)
    return id
  }) as unknown as typeof setTimeout

  const patchedClearTimeout = ((id?: unknown): void => {
    if (id !== undefined && id !== null) state.liveTimers.delete(id)
    nativeClearTimeout(id as TimerHandle)
  }) as typeof clearTimeout

  Object.defineProperty(globalThis, 'setTimeout', { value: patchedSetTimeout, writable: true, configurable: true })
  Object.defineProperty(globalThis, 'clearTimeout', { value: patchedClearTimeout, writable: true, configurable: true })

  const nativeConsoleError = console.error.bind(console)
  console.error = (...args: unknown[]): void => {
    state.consoleErrors.push(args.map((a) => (a instanceof Error ? a.message : String(a))).join(' '))
    nativeConsoleError(...args)
  }

  let urlSeq = 0
  URL.createObjectURL = (() => {
    const url = `blob:verify-${urlSeq++}`
    state.urlsCreated.push(url)
    return url
  }) as typeof URL.createObjectURL
  URL.revokeObjectURL = ((url: string) => {
    state.urlsRevoked.push(url)
  }) as typeof URL.revokeObjectURL

  ;(globalThis as unknown as Record<string, unknown>).__AYVAA_VERIFY__ = state
}

export function setConsoleErrorsAllowed(allowed: boolean): void {
  state.consoleErrorsAllowed = allowed
}

export function consoleErrorsAllowed(): boolean {
  return state.consoleErrorsAllowed
}

export function takeConsoleErrors(): string[] {
  const out = [...state.consoleErrors]
  state.consoleErrors.length = 0
  return out
}

export function liveTimerCount(): number {
  return state.liveTimers.size
}

export function unrevokedUrlCount(): number {
  return state.urlsCreated.length - state.urlsRevoked.length
}
