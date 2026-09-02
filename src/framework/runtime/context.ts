import { createContext } from 'react'
import type { FrameworkRuntime } from './contracts'

export const FrameworkContext = createContext<FrameworkRuntime | null>(null)
