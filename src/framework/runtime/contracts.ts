import type { FrameworkEvent } from './events'

export type Unsubscribe = () => void

export type FrameworkEventHandler<K extends FrameworkEvent['type']> = (
  event: Extract<FrameworkEvent, { type: K }>
) => void

export type TargetSender = (event: FrameworkEvent) => void

export interface RuntimeCounts {
  handlers: number
  targets: number
}

export interface FrameworkRuntime {
  emit(event: FrameworkEvent): void
  on<K extends FrameworkEvent['type']>(type: K, handler: FrameworkEventHandler<K>): Unsubscribe
  target(id: string, send: TargetSender): Unsubscribe
  sendTo(id: string, event: FrameworkEvent): boolean
  counts(): RuntimeCounts
}
