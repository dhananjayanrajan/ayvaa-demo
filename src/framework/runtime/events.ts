export type FrameworkEvent =
  | { type: 'calibration.completed' }
  | { type: 'calibration.reset' }

export const FRAMEWORK_EVENT_TYPES: readonly FrameworkEvent['type'][] = [
  'calibration.completed',
  'calibration.reset',
]
