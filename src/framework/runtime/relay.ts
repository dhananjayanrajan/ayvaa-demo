import { assign, setup } from 'xstate'
import type { ActorRefFrom } from 'xstate'
import type { FrameworkEvent } from './events'

interface RelayContext {
  seq: number
  last: FrameworkEvent | null
}

export const relayMachine = setup({
  types: {
    context: {} as RelayContext,
    events: {} as FrameworkEvent,
  },
}).createMachine({
  id: 'relay',
  initial: 'live',
  context: { seq: 0, last: null },
  states: {
    live: {
      on: {
        '*': {
          actions: assign({
            seq: ({ context }) => context.seq + 1,
            last: ({ event }) => event,
          }),
        },
      },
    },
  },
})

export type RelayActor = ActorRefFrom<typeof relayMachine>
