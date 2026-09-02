import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { consoleErrorsAllowed, installProbes, takeConsoleErrors } from './probes'

installProbes()

afterEach(() => {
  cleanup()
  const errors = takeConsoleErrors()
  if (errors.length > 0 && !consoleErrorsAllowed()) {
    throw new Error(`console.error during test (strict policy):\n${errors.join('\n')}`)
  }
})
