import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { FRAMEWORK_EVENT_TYPES } from '@/framework/runtime/events'
import {
  findLineComments,
  findLowercaseJsxProps,
  findMagicHex,
  findSuffixForks,
  findTransitionAll,
  findUncataloguedEvents,
  parseEventTypes,
} from './static'

describe('static scanners catch seeded defects', () => {
  it('magic hex outside tokens', () => {
    expect(findMagicHex("className 'bg-[#0B211B]'")).toHaveLength(1)
    expect(findMagicHex("className 'bg-rose-500'")).toHaveLength(0)
  })

  it('line comments', () => {
    expect(findLineComments('const a = 1 // drift')).toHaveLength(1)
    expect(findLineComments('const url = "https://x.y"')).toHaveLength(0)
  })

  it('suffix forks', () => {
    expect(findSuffixForks('interface BillingHeroProps_Patient {}')).toHaveLength(1)
    expect(findSuffixForks('interface BillingHeroProps {}')).toHaveLength(0)
  })

  it('transition all', () => {
    expect(findTransitionAll('style={{ transition: "all 200ms" }}')).toHaveLength(1)
    expect(findTransitionAll('transition-colors duration-300')).toHaveLength(0)
  })

  it('lowercase jsx props', () => {
    expect(findLowercaseJsxProps('return <icon />')).toHaveLength(1)
    expect(findLowercaseJsxProps('<label htmlFor="a" />')).toHaveLength(0)
  })

  it('uncatalogued events', () => {
    const catalog = parseEventTypes(
      "export type FrameworkEvent = | { type: 'calibration.completed' } | { type: 'calibration.reset' }",
    )
    expect([...catalog].sort()).toEqual(['calibration.completed', 'calibration.reset'])
    expect(findUncataloguedEvents("runtime.emit({ type: 'calibration.rogue' })", catalog)).toHaveLength(1)
    expect(findUncataloguedEvents("runtime.emit({ type: 'calibration.completed' })", catalog)).toHaveLength(0)
  })

  it('live event catalog stays in sync with its typed union', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/framework/runtime/events.ts'), 'utf8')
    expect([...parseEventTypes(source)].sort()).toEqual([...FRAMEWORK_EVENT_TYPES].sort())
  })
})
