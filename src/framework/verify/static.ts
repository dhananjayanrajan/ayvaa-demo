export interface Finding {
  rule: string
  line: number
  text: string
}

export const LOWERCASE_PROP_DENYLIST = [
  'icon', 'tile', 'chip', 'hero', 'row', 'field', 'radio', 'switch',
  'note', 'panel', 'meter', 'ring', 'badge',
] as const

const EVENT_LITERAL = /type:\s*'([a-z]+(?:[-.][a-z0-9]+)+)'/g

function scanLines(text: string, rule: string, pattern: RegExp): Finding[] {
  const out: Finding[] = []
  text.split('\n').forEach((line, index) => {
    if (pattern.test(line)) out.push({ rule, line: index + 1, text: line.trim() })
  })
  return out
}

export function findMagicHex(text: string): Finding[] {
  return scanLines(text, 'magic-hex', /#[0-9a-fA-F]{3,8}\b/)
}

export function findLineComments(text: string): Finding[] {
  return scanLines(text, 'line-comment', /(^|\s)\/\//)
}

export function findSuffixForks(text: string): Finding[] {
  return scanLines(text, 'suffix-fork', /\b[A-Za-z]+_(Patient|Professional|Partner|Admin|System)\b/)
}

export function findTransitionAll(text: string): Finding[] {
  return scanLines(text, 'transition-all', /transition(-property)?\s*:\s*[^;]*\ball\b/)
}

export function findLowercaseJsxProps(text: string): Finding[] {
  return scanLines(text, 'lowercase-jsx-prop', new RegExp(`<(${LOWERCASE_PROP_DENYLIST.join('|')})[\\s/>]`))
}

export function parseEventTypes(source: string): Set<string> {
  const types = new Set<string>()
  for (const match of source.matchAll(EVENT_LITERAL)) types.add(match[1])
  return types
}

export function findUncataloguedEvents(componentSource: string, catalog: Set<string>): Finding[] {
  const out: Finding[] = []
  for (const type of parseEventTypes(componentSource)) {
    if (!catalog.has(type)) out.push({ rule: 'uncatalogued-event', line: 0, text: type })
  }
  return out
}
